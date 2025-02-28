import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format } from "date-fns";
import Image from "next/image";
import Footer from "@/components/Footer";
import { isDevelopment } from "@/utils/isDevelopment";
import { customConfig } from "@/project.custom.config";
import BlogHeader from "@/components/BlogHeader";


export default function BlogIndex({ posts }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="mx-auto">
      <Head>
        <title>{customConfig.blog.title}</title>
        <meta
          name="description"
          content={customConfig.blog.description}
          key="description"
        />
        <meta
          name="keywords"
          content={customConfig.blog.description}
          key="keywords"
        />
        <link rel="canonical" href={`${customConfig.domainWithHttps}/blog`} key="canonical" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content={customConfig.blog.title} key="og:title" />
        <meta property="og:description" content={customConfig.blog.description} key="og:description" />
        <meta property="og:url" content={`${customConfig.domainWithHttps}/blog`} key="og:url" />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:site_name" content={customConfig.seo.applicationName} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={customConfig.seo.og.image} key="og:image" />
        <meta property="og:image:alt" content={customConfig.seo.og.imageAlt} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="article:author" content={customConfig.seo.og.articleAuthor} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:site" content={customConfig.seo.og.twitterSite} key="twitter:site" />
        <meta name="twitter:creator" content="@tech_nurgaliyev" />
        <meta name="twitter:title" content={customConfig.blog.title} key="twitter:title" />
        <meta name="twitter:description" content={customConfig.blog.description} key="twitter:description" />
        <meta name="twitter:image" content={customConfig.seo.og.twitterImage} key="twitter:image" />
      </Head>
      <BlogHeader />
      <main className="min-h-screen max-w-6xl mx-auto p-8">
        <section className="text-center max-w-xl mx-auto mt-12 mb-24 md:mb-32">
          <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-6">
            {customConfig.blog.title}
          </h1>
          <p className="text-lg opacity-80 leading-relaxed pb-5">
            {customConfig.blog.description}
          </p>
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full p-2 mb-4 border rounded-xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </section>
        <section className="grid lg:grid-cols-2 mb-24 md:mb-32 gap-8">
          {filteredPosts.map((post) => (
            <article
              className="card bg-slate-200 rounded-2xl border border-slate-200"
              key={post.slug}
            >
              <figure>
                <img
                  alt={post.alt}
                  src={post.image}
                  width={600}
                  height={338}
                  className="aspect-video object-center object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      className="badge badge-sm md:badge-md hover:badge-primary"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="mb-1 text-xl md:text-2xl font-bold">
                  <Link
                    href={`${
                      isDevelopment()
                        ? `/blog/${post.slug}`
                        : `https://pregnantmeal.com/blog/${post.slug}`
                    }`}
                    className="link link-hover hover:link-primary"
                    title={post.title}
                  >
                    {post.title}
                  </Link>
                </h2>

                <div className="text-base-content/80 space-y-4">
                  <p>{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <Link
                      href={`/blog/author/sabyr`}
                      className="inline-flex items-center gap-2 group"
                      title={`Post By ${post.author}`}
                      rel="author"
                    >
                      <span itemProp="author">
                        <Image
                          src={"/Sabyr_Nurgaliyev.webp"}
                          alt={`Post By ${post.author}`}
                          width={50}
                          height={50}
                          className="w-8 h-8 rounded-full object-cover object-center"
                        />
                      </span>
                      <span className="group-hover:underline">
                        {post.author}
                      </span>
                    </Link>
                    <span itemProp="datePublished">
                      {format(new Date(post.date), "MMMM d, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
      <footer>
        <Footer bgColor={"bg-slate-200"} />
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "blog-posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      author: data.author,
      tags: data.tags,
      image: data.image,
      alt: data.alt,
    };
  });

  return {
    props: {
      posts: posts.sort((a, b) => new Date(b.date) - new Date(a.date)),
    },
  };
}
