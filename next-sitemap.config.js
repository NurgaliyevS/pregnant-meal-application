const path = require('path');
const fs = require('fs');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://pregnantmeal.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: '/meal/' },
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      'https://pregnantmeal.com/sitemap-pregnancy.xml',
    ],
  },
  exclude: ["/meal", "/meal/*", "/blocked"],
  sitemapSize: 7000,
  generateIndexSitemap: true,
  outDir: "public",
  additionalPaths: async (config) => {
    const result = [];
    const postsDirectory = path.join(process.cwd(), "blog-posts");
    const filenames = fs.readdirSync(postsDirectory);

    filenames.forEach((filename) => {
      result.push({
        loc: `/blog/${filename.replace(".md", "")}`,
        changefreq: "daily",
        priority: 0.7,
      });
    });

    // Add pregnancy week pages
    for (let week = 1; week <= 42; week++) {
      result.push({
        loc: `/pregnancy/${week}-weeks-pregnant-in-months`,
        lastmod: new Date('2025-03-01').toISOString(),
        changefreq: "monthly",
        priority: 0.8,
      });
    }

    return result;
  },
};
