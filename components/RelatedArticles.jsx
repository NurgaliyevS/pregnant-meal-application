import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

const RelatedArticles = ({ currentPost, relatedPosts }) => {
  if (!Array.isArray(relatedPosts) || relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="related-posts">
      <h2 className="related-posts-title">Related Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {relatedPosts.map((post) => (
          <article 
            key={post.slug} 
            className="related-post-card bg-white shadow-sm overflow-hidden flex flex-col h-full"
          >
            <Link
              href={`/blog/${post.slug}`}
              title={post.title}
              className="flex flex-col h-full hover:no-underline"
            >
              <figure className="h-48 overflow-hidden">
                <img
                  alt={post.alt || post.title}
                  src={post.image}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </figure>
              <div className="flex flex-col p-4 md:p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="badge badge-sm bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mb-3">
                  <h3 className="text-lg md:text-xl font-bold line-clamp-2 text-gray-800 hover:text-primary transition-colors duration-200">
                    {post.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm mt-auto pt-3 border-t border-gray-100">
                  <div className="inline-flex items-center gap-2">
                    <Image
                      src="/Sabyr_Nurgaliyev.webp"
                      alt={`Post By ${post.author}`}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full object-cover object-center border border-white shadow-sm"
                    />
                    <span className="text-gray-700 text-xs md:text-sm">{post.author}</span>
                  </div>
                  <span className="text-gray-500 text-xs">{format(new Date(post.date), "MMM d, yyyy")}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles; 