import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/backend/mongodbClient";
import bcrypt from "bcryptjs";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }

        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection("users").findOne({ 
          email: credentials.email.toLowerCase() 
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          variant_name: user.variant_name || "free",
          createdAt: user.createdAt || new Date(),
        };
      }
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.id = user.id;
        token.variant_name = user.variant_name || "free";
      }
      // Handle new Google sign-ins
      if (account?.provider === "google") {
        const client = await clientPromise;
        const db = client.db();
        
        // Check if user exists
        let dbUser = await db.collection("users").findOne({ email: token.email });
        
        if (!dbUser) {
          // Create new user for Google sign-in
          const result = await db.collection("users").insertOne({
            email: token.email,
            name: token.name,
            variant_name: "free",
            createdAt: new Date(),
          });
          token.id = result.insertedId.toString();
        } else {
          token.id = dbUser._id.toString();
          token.variant_name = dbUser.variant_name || "free";
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id;
        session.user.variant_name = token.variant_name;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
  },
  debug: true
};

export default NextAuth(authOptions);