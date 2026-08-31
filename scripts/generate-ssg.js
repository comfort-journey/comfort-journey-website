// =========================================================================
// COMFORT JOURNEY - STATIC SITE GENERATION (SSG) PRE-RENDERER
// Pre-renders static HTML snapshots with pre-baked SEO tags and JSON-LD schemas
// Guarantees 100% zero-latency crawlability for Googlebot, ChatGPT & Social Bots
// =========================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_URL = 'https://www.comfortjourneyy.com';

async function generateSSG() {
  if (!fs.existsSync(DIST_DIR)) {
    console.warn('⚠️ [SSG] dist directory not found. Please run "npm run build" first.');
    return;
  }

  const baseHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(baseHtmlPath)) {
    console.warn('⚠️ [SSG] dist/index.html not found.');
    return;
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

  // Load Seed / Dynamic Data
  const blogsDataPath = path.resolve(__dirname, '../src/data/blogsData.js');
  const toursDataPath = path.resolve(__dirname, '../src/data/toursData.js');
  const landingPagesDataPath = path.resolve(__dirname, '../src/data/landingPagesData.js');

  const { BLOGS_DATA } = await import(`file://${blogsDataPath}`);
  const { TOURS_DATA } = await import(`file://${toursDataPath}`);
  const { LANDING_PAGES_DATA } = await import(`file://${landingPagesDataPath}`);

  // Helper to inject metadata into static HTML
  const injectHtmlMetadata = (template, { title, description, image, url, schema, canonicalUrl }) => {
    let output = template;

    // Replace Title
    output = output.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);

    // Replace or Insert Description
    output = output.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${description}" />`);

    // Replace OpenGraph
    output = output.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${title}" />`);
    output = output.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${description}" />`);
    output = output.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${url}" />`);

    // Add OG Image if present
    if (image && !output.includes('property="og:image"')) {
      output = output.replace('</head>', `  <meta property="og:image" content="${image}" />\n  </head>`);
    }

    // Add Canonical
    if (canonicalUrl && !output.includes('rel="canonical"')) {
      output = output.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`);
    }

    // Replace or Inject Schema
    if (schema) {
      const schemaScript = `  <script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n  </script>`;
      output = output.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, schemaScript);
    }

    return output;
  };

  const writeStaticPage = (relativeDir, htmlContent) => {
    const targetDir = path.join(DIST_DIR, relativeDir);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent, 'utf8');
  };

  let pageCount = 0;

  // 1. Pre-render Blog Magazine Index
  const blogIndexHtml = injectHtmlMetadata(baseHtml, {
    title: "Editorial Travel Journal & Luxury Guides | Comfort Journey",
    description: "Explore handcrafted destination guides, luxury stay reviews, and honeymoon tips curated by Comfort Journey since 1992.",
    url: `${BASE_URL}/blog`,
    canonicalUrl: `${BASE_URL}/blog`
  });
  writeStaticPage('blog', blogIndexHtml);
  pageCount++;

  // 2. Pre-render All Single Blog Posts
  for (const blog of BLOGS_DATA) {
    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blog.seo?.metaTitle || blog.title,
      "description": blog.seo?.metaDescription || blog.excerpt,
      "image": [blog.coverImage],
      "datePublished": blog.publishedDate,
      "author": {
        "@type": "Person",
        "name": blog.author?.name || "Rishabh Mishra"
      }
    };

    const blogHtml = injectHtmlMetadata(baseHtml, {
      title: blog.seo?.metaTitle || `${blog.title} | Comfort Journey`,
      description: blog.seo?.metaDescription || blog.excerpt,
      image: blog.coverImage,
      url: `${BASE_URL}/blog/${blog.slug}`,
      canonicalUrl: `${BASE_URL}/blog/${blog.slug}`,
      schema: blogSchema
    });
    writeStaticPage(`blog/${blog.slug}`, blogHtml);
    pageCount++;
  }

  // 3. Pre-render All Tour Packages
  for (const tour of TOURS_DATA) {
    const tourSlug = tour.slug || tour.id;
    const tourSchema = {
      "@context": "https://schema.org",
      "@type": ["TouristTrip", "Product"],
      "name": tour.name,
      "description": tour.tagline,
      "image": [tour.image],
      "offers": {
        "@type": "Offer",
        "price": tour.price,
        "priceCurrency": "INR"
      }
    };

    const tourHtml = injectHtmlMetadata(baseHtml, {
      title: `${tour.name} | Comfort Journey Tour Packages`,
      description: tour.tagline,
      image: tour.image,
      url: `${BASE_URL}/tour/${tourSlug}`,
      canonicalUrl: `${BASE_URL}/tour/${tourSlug}`,
      schema: tourSchema
    });
    writeStaticPage(`tour/${tourSlug}`, tourHtml);
    pageCount++;
  }

  // 4. Pre-render All 15 Campaign Landing Pages
  for (const [slug, pageData] of Object.entries(LANDING_PAGES_DATA)) {
    const pageHtml = injectHtmlMetadata(baseHtml, {
      title: `${pageData.heroHeadline} | Comfort Journey`,
      description: pageData.heroSubline || pageData.realityCheck?.bad,
      image: pageData.theme?.heroImage,
      url: `${BASE_URL}/${slug}`,
      canonicalUrl: `${BASE_URL}/${slug}`
    });
    writeStaticPage(slug, pageHtml);
    pageCount++;
  }

  // 5. Pre-render About Us Page
  const aboutHtml = injectHtmlMetadata(baseHtml, {
    title: "Who We Are | 30+ Years Legacy | Comfort Journey",
    description: "Learn about the Comfort Journey legacy since 1992. Founded by Sharad Mishra in Bhopal with 4.95/5 star traveler ratings.",
    url: `${BASE_URL}/about`,
    canonicalUrl: `${BASE_URL}/about`
  });
  writeStaticPage('about', aboutHtml);
  pageCount++;

  console.log(`✅ [SSG] Successfully pre-rendered ${pageCount} static HTML pages in /dist ready for instant bot crawling and AWS S3 hosting!`);
}

generateSSG().catch(err => {
  console.error('❌ [SSG] Pre-render error:', err);
});
