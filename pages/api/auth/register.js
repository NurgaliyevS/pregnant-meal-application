import bcrypt from "bcryptjs";
import clientPromise from "@/backend/mongodbClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Basic validation
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ 
      email: email.toLowerCase() 
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const result = await db.collection("users").insertOne({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      variant_name: "free",
      createdAt: new Date(),
    });

    return res.status(201).json({ 
      message: "User created successfully",
      userId: result.insertedId 
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}