// =========================================================================
// COMFORT JOURNEY - DYNAMIC SITEMAP GENERATOR SCRIPT
// Generates public/sitemap.xml with XML Schema & Image Metadata
// =========================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_URL = 'https://www.comfortjourneyy.com';

// 1. Static Pages
const STATIC_PAGES = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/#/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/#/blog', priority: '0.9', changefreq: 'daily' },
  { url: '/#/landing-hub', priority: '0.8', changefreq: 'weekly' }
];

// 2. 15 Specialty Campaign Landing Pages
const CAMPAIGN_PAGES = [
  'solo-travel',
  'family-travel',
  'couple-honeymoon',
  'group-travel',
  'corporate-travel',
  'school-college-trips',
  'weekend-getaways',
  'fixed-departures',
  'india-packages',
  'international-packages',
  'adventure-tours',
  'beach-vacations',
  'mountain-escapes',
  'summer-packages',
  'winter-packages'
];

// 3. Import dynamic seed data
async function generateSitemap() {
  const blogsDataPath = path.resolve(__dirname, '../src/data/blogsData.js');
  const toursDataPath = path.resolve(__dirname, '../src/data/toursData.js');

  const { BLOGS_DATA } = await import(`file://${blogsDataPath}`);
  const { TOURS_DATA } = await import(`file://${toursDataPath}`);

  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
`;

  // Add Static Core Pages
  for (const page of STATIC_PAGES) {
    xml += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  // Add Campaign Pages
  for (const slug of CAMPAIGN_PAGES) {
    xml += `  <url>
    <loc>${BASE_URL}/#/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
`;
  }

  // Add Blog Posts with Image Meta
  for (const blog of BLOGS_DATA) {
    xml += `  <url>
    <loc>${BASE_URL}/#/blog/${blog.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${blog.coverImage}</image:loc>
      <image:title><![CDATA[${blog.title}]]></image:title>
    </image:image>
  </url>
`;
  }

  // Add Tour Packages with Image Meta
  for (const tour of TOURS_DATA) {
    const tourSlug = tour.slug || tour.id;
    xml += `  <url>
    <loc>${BASE_URL}/#/tour/${tourSlug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
    <image:image>
      <image:loc>${tour.image}</image:loc>
      <image:title><![CDATA[${tour.name}]]></image:title>
    </image:image>
  </url>
`;
  }

  xml += `</urlset>\n`;

  const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`✅ [Sitemap] Successfully generated public/sitemap.xml with ${STATIC_PAGES.length + CAMPAIGN_PAGES.length + BLOGS_DATA.length + TOURS_DATA.length} URLs!`);
}

generateSitemap().catch(err => {
  console.error('❌ [Sitemap] Error generating sitemap:', err);
});
