import BlogHeader from "./BlogHeader";
import RelatedArticles from "./RelatedArticles";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { format } from "date-fns";
import { customConfig } from "@/project.custom.config";

function BlogPostContent({ post, relatedPosts }) {
  if (!post) {
    return <div>Loading...</div>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    description: post.excerpt,
  };

  return (
    <div className="mx-auto bg-white">
      <Head>
        <title>{`${post.title} | PregnantMeal Blog`}</title>
        <meta name="description" content={post.excerpt} key="description" />
        <meta name="keywords" content={post.tags.join(", ")} key="keywords" />
        <link
          rel="canonical"
          href={`${customConfig.domainWithHttps}/blog/${post.slug}`}
          key="canonical"
        />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content={`${post.title} | PregnantMeal Blog`} key="og:title" />
        <meta property="og:description" content={post.excerpt} key="og:description" />
        <meta
          property="og:url"
          content={`${customConfig.domainWithHttps}/blog/${post.slug}`}
          key="og:url"
        />
        <meta property="og:type" content="article" key="og:type" />
        <meta property="og:site_name" content={customConfig.seo.applicationName} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={post.image || customConfig.seo.og.image} key="og:image" />
        <meta property="og:image:alt" content={post.alt || customConfig.seo.og.imageAlt} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={customConfig.seo.og.articleAuthor} />
        <meta property="article:tag" content={post.tags.join(", ")} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:site" content={customConfig.seo.og.twitterSite} key="twitter:site" />
        <meta name="twitter:creator" content="@tech_nurgaliyev" />
        <meta name="twitter:title" content={`${post.title} | PregnantMeal Blog`} key="twitter:title" />
        <meta name="twitter:description" content={post.excerpt} key="twitter:description" />
        <meta name="twitter:image" content={post.image || customConfig.seo.og.twitterImage} key="twitter:image" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <BlogHeader />
      <main className="min-h-screen max-w-6xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <Link
            href="/blog"
            className="link !no-underline text-base-content/80 hover:text-base-content inline-flex items-center gap-1 transition-colors duration-200"
            title={"Back to Blog"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
                clipRule="evenodd"
              ></path>
            </svg>
            Back to Blog
          </Link>
        </div>
        <article className="max-w-4xl mx-auto">
          <section className="my-8 md:my-12 max-w-screen-md mx-auto">
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="badge badge-sm md:badge-md hover:badge-primary transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
              <span itemProp="datePublished" className="text-gray-600 text-sm md:text-base">
                {format(new Date(post.date), "MMMM d, yyyy")}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 md:mb-8 text-gray-800 leading-tight">
              {post.title}
            </h1>
            <p className="text-gray-600 md:text-lg max-w-screen-md leading-relaxed mb-8">
              {post.excerpt}
            </p>
          </section>
          
          <div className="mb-10">
            <Image
              alt={post.alt || post.title}
              src={post.image}
              className="rounded-xl shadow-md w-full object-cover h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
              width={1200}
              height={600}
              priority
            />
          </div>
          
          <div className="flex flex-col-reverse md:flex-row gap-8 mt-8 md:mt-12">
            <section className="w-full md:w-3/4">
            <div className="blog-content prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </section>
            
            <aside className="md:w-1/4 shrink-0 mb-8 md:mb-0">
              <div className="md:sticky md:top-24 space-y-6 md:space-y-8">
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                  <p className="text-gray-600 text-sm mb-4">
                    Posted by
                  </p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={"/Sabyr_Nurgaliyev.webp"}
                      alt={`Post By ${post.author}`}
                      width={60}
                      height={60}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div className="flex-1">
                      <div className="text-gray-900 font-semibold text-lg">
                        {post.author}
                      </div>
                      <div className="text-gray-600 text-sm">
                        Founder, PregnantMeal
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-4 text-lg">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-blue-800 mb-3 text-lg">Need Help?</h3>
                  <p className="text-sm text-blue-700 mb-4">Get personalized pregnancy meal plans tailored to your needs.</p>
                  <a
                    href="https://cal.com/sabyr-nurgaliyev/15min"
                    className="btn btn-primary btn-sm w-full"
                    role="button"
                  >
                    Book a Consultation
                  </a>
                </div>
              </div>
            </aside>
          </div>
          
          <div className="mt-16">
            <RelatedArticles currentPost={post} relatedPosts={relatedPosts} />
          </div>
        </article>
      </main>
      <footer className="mt-16">
        <Footer />
      </footer>
    </div>
  );
}

export default BlogPostContent;
