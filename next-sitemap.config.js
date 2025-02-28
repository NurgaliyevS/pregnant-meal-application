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

    // Create pregnancy sitemap XML content
    let pregnancySitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
    pregnancySitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';
    
    // Add pregnancy week pages to the pregnancy sitemap
    for (let week = 1; week <= 42; week++) {
      pregnancySitemapContent += `<url><loc>https://pregnantmeal.com/pregnancy/${week}-weeks-pregnant-in-months</loc><lastmod>${new Date('2025-03-01').toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
    }
    
    pregnancySitemapContent += '</urlset>';
    
    // Write the pregnancy sitemap file
    const pregnancySitemapPath = path.join(process.cwd(), 'public', 'sitemap-pregnancy.xml');
    fs.writeFileSync(pregnancySitemapPath, pregnancySitemapContent);
    
    return result;
  },
  // After the sitemap generation is complete, manually update the sitemap index
  transform: async (config, sitemap) => {
    // This runs for each URL in the sitemap
    return sitemap;
  },
  // This runs after all sitemaps are generated
  postProcess: async (config) => {
    // Check if the sitemap index exists
    const sitemapIndexPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapIndexPath)) {
      // Read the current sitemap index
      let sitemapIndex = fs.readFileSync(sitemapIndexPath, 'utf8');
      
      // If the pregnancy sitemap is not included, add it
      if (!sitemapIndex.includes('sitemap-pregnancy.xml')) {
        // Replace the closing tag with the pregnancy sitemap entry and the closing tag
        sitemapIndex = sitemapIndex.replace('</sitemapindex>', '<sitemap><loc>https://pregnantmeal.com/sitemap-pregnancy.xml</loc></sitemap>\n</sitemapindex>');
        
        // Write the updated sitemap index
        fs.writeFileSync(sitemapIndexPath, sitemapIndex);
      }
    }
  }
};
