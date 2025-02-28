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

    return result;
  },
  sitemapTransformer: async (config, sitemaps) => {
    const pregnancyUrls = [];
    for (let week = 1; week <= 42; week++) {
      pregnancyUrls.push({
        loc: `${config.siteUrl}/pregnancy/${week}-weeks-pregnant-in-months`,
        lastmod: new Date('2025-03-01').toISOString(),
        changefreq: "monthly",
        priority: 0.8,
      });
    }

    const pregnancySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${pregnancyUrls.map(url => `<url><loc>${url.loc}</loc><lastmod>${url.lastmod}</lastmod><changefreq>${url.changefreq}</changefreq><priority>${url.priority}</priority></url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(config.outDir, 'sitemap-pregnancy.xml'), pregnancySitemap);

    return sitemaps;
  }
};
