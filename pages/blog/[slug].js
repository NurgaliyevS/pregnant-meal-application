import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import React from "react";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import rehypeRaw from "rehype-raw";
import { unified } from "unified";
import BlogPostContent from "../../components/BlogPostContent";
import processShortcodes from "@/utils/processShortcodes";

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "blog-posts");
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  return { paths, fallback: false };
}

export default function BlogPost({ post, relatedPosts }) {
  return <BlogPostContent post={post} relatedPosts={relatedPosts} />;
}

export async function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), "blog-posts");
  const filePath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContents);
  // Process shortcodes in the content
  const processedContent = processShortcodes(content);
  // Use unified with rehypeRaw to preserve HTML in markdown
  const processedHtml = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw) // This preserves raw HTML
    .use(rehypeStringify)
    .process(processedContent);
  const contentHtml = processedHtml.toString();

  // Get all posts to find related ones
  const filenames = fs.readdirSync(postsDirectory);
  const allPosts = filenames
    .filter((filename) => filename !== `${params.slug}.md`)
    .map((filename) => {
      const postPath = path.join(postsDirectory, filename);
      const postContent = fs.readFileSync(postPath, "utf8");
      const { data } = matter(postContent);
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
  // Find related posts based on matching tags
  let relatedPosts = allPosts
    .map((post) => ({
      ...post,
      matchingTags: post.tags.filter((tag) => data.tags.includes(tag)).length,
    }))
    .filter((post) => post.matchingTags > 0)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .sort((a, b) => b.matchingTags - a.matchingTags)
    .slice(0, 6); // Limit to 6 related posts

  // If no related posts found, use the 6 latest posts instead
  if (relatedPosts.length === 0) {
    relatedPosts = allPosts
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6);
  }

  return {
    props: {
      post: {
        slug: params.slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        author: data.author,
        tags: data.tags,
        image: data.image,
        alt: data.alt,
        contentHtml,
      },
      relatedPosts,
    },
  };
}
