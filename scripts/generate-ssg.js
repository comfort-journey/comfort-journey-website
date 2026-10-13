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

  const { BLOGS_DATA: seedBlogs } = await import(`file://${blogsDataPath}`);
  const { TOURS_DATA: seedTours } = await import(`file://${toursDataPath}`);
  const { LANDING_PAGES_DATA } = await import(`file://${landingPagesDataPath}`);

  // Check if live-content.json exists for CMS updates
  const liveContentPath = path.resolve(__dirname, '../public/live-content.json');
  let BLOGS_DATA = seedBlogs;
  let TOURS_DATA = seedTours;

  if (fs.existsSync(liveContentPath)) {
    try {
      const liveJson = JSON.parse(fs.readFileSync(liveContentPath, 'utf8'));
      if (Array.isArray(liveJson.blogs) && liveJson.blogs.length > 0) BLOGS_DATA = liveJson.blogs;
      if (Array.isArray(liveJson.tours) && liveJson.tours.length > 0) TOURS_DATA = liveJson.tours;
    } catch (e) {
      console.warn('Could not read live-content.json:', e);
    }
  }

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

  const esc = (v) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  // Inject crawlable, human-readable content into #root. React replaces it on
  // boot, but crawlers and AI engines that do not run JS still read the page.
  const injectRootContent = (html, innerHtml) => html.replace('<div id="root"></div>', `<div id="root">${innerHtml}</div>`);

  const writeStaticPage = (relativeDir, htmlContent) => {
    // Pages live in sub folders (/solo-travel/, /blog/<slug>/), so "./assets"
    // must climb back to the site root or the app bundle 404s.
    const depth = relativeDir.split('/').filter(Boolean).length;
    const up = '../'.repeat(depth);
    htmlContent = htmlContent
      .replace(/(src|href)="\.\/(?!\/)/g, `$1="${up}`);
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
    url: `${BASE_URL}/blog/`,
    canonicalUrl: `${BASE_URL}/blog/`
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
      title: esc(blog.seo?.metaTitle || `${blog.title} | Comfort Journey`),
      description: esc(blog.seo?.metaDescription || blog.excerpt),
      image: /^https?:/.test(blog.coverImage || '') ? blog.coverImage : `${BASE_URL}/${String(blog.coverImage || '').replace(/^\.?\//, '')}`,
      url: `${BASE_URL}/blog/${blog.slug}/`,
      canonicalUrl: `${BASE_URL}/blog/${blog.slug}/`,
      schema: blogSchema
    });
    const cleanBlogHtml = String(blog.content || '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/ style="[^"]*"/gi, '');
    const blogBody = `
      <main class="ssg-snapshot"><article>
        <nav aria-label="Breadcrumb"><a href="${BASE_URL}/">Home</a> / <a href="${BASE_URL}/blog/">Travel journal</a></nav>
        <h1>${esc(blog.title)}</h1>
        <p>${esc(blog.excerpt)}</p>
        <p>By ${esc(blog.author?.name || 'Comfort Journey')}${blog.publishedDate ? ` · ${esc(blog.publishedDate)}` : ''}</p>
        ${cleanBlogHtml}
      </article></main>`;
    writeStaticPage(`blog/${blog.slug}`, injectRootContent(blogHtml, blogBody));
    pageCount++;
  }

  // 3. Pre-render All Tour Packages
  for (const tour of TOURS_DATA) {
    const tourSlug = tour.slug || tour.id;
    const tourSchema = {
      "@context": "https://schema.org",
      "@type": ["TouristTrip", "Product"],
      "name": tour.name,
      "description": tour.description ? tour.description.replace(/<[^>]*>/g, '').slice(0, 280) : tour.tagline,
      "image": [tour.image].filter(Boolean),
      "offers": {
        "@type": "Offer",
        "price": tour.price,
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      },
      ...(tour.itinerary && tour.itinerary.length > 0 ? {
        "itinerary": {
          "@type": "ItemList",
          "numberOfItems": tour.itinerary.length,
          "itemListElement": tour.itinerary.map((d, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": d.title || `Day ${d.day || i + 1}`,
            "description": (d.desc || '').replace(/<[^>]*>/g, '').slice(0, 250)
          }))
        }
      } : {})
    };

    const tourHtml = injectHtmlMetadata(baseHtml, {
      title: esc(`${tour.name} | Comfort Journey Tour Packages`),
      description: esc(String(tour.tagline || '').replace(/<[^>]*>/g, '')),
      image: tour.image,
      url: `${BASE_URL}/tour/${tourSlug}/`,
      canonicalUrl: `${BASE_URL}/tour/${tourSlug}/`,
      schema: tourSchema
    });
    const strip = (v) => String(v || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    const tourBody = `
      <main class="ssg-snapshot">
        <nav aria-label="Breadcrumb"><a href="${BASE_URL}/">Home</a> / ${esc(tour.category || 'Tour packages')}</nav>
        <h1>${esc(tour.name)}</h1>
        <p>${esc(tour.location)} · ${esc(tour.duration)}${tour.price ? ` · from ₹${Number(tour.price).toLocaleString('en-IN')} per person` : ''}</p>
        <p>${esc(strip(tour.tagline))}</p>
        ${tour.description ? `<section><h2>About this trip</h2><p>${esc(strip(tour.description).slice(0, 1400))}</p></section>` : ''}
        ${Array.isArray(tour.itinerary) && tour.itinerary.length ? `<section><h2>Day by day plan</h2><ol>${tour.itinerary.map((d, i) => `<li><h3>Day ${esc(d.day || i + 1)}: ${esc(strip(d.title))}</h3><p>${esc(strip(d.desc).slice(0, 400))}</p></li>`).join('')}</ol></section>` : ''}
        ${Array.isArray(tour.inclusions) && tour.inclusions.length ? `<section><h2>What is included</h2><ul>${tour.inclusions.map((x) => `<li>${esc(strip(x))}</li>`).join('')}</ul></section>` : ''}
        <p><a href="https://wa.me/919203931912?text=${encodeURIComponent(`Hi Comfort Journey, I would like a quote for ${tour.name}.`)}">Ask for a quote on WhatsApp</a> · <a href="tel:+919203931912">+91 92039 31912</a></p>
      </main>`;
    writeStaticPage(`tour/${tourSlug}`, injectRootContent(tourHtml, tourBody));
    pageCount++;
  }

  // 4. Pre-render all audience landing pages with real, crawlable content
  const tourIndex = {};
  for (const t of TOURS_DATA) { tourIndex[t.id] = t; if (t.slug) tourIndex[t.slug] = t; }
  for (const [slug, pageData] of Object.entries(LANDING_PAGES_DATA)) {
    const url = `${BASE_URL}/${slug}/`;
    const tours = [...(pageData.packageIdsIndia || []), ...(pageData.packageIdsIntl || [])].map((id) => tourIndex[id]).filter(Boolean);
    const faqs = [pageData.quickAnswer && { q: pageData.quickAnswer.question, a: pageData.quickAnswer.answer }, ...(pageData.faqs || [])].filter(Boolean);
    const heroImg = /^https?:/.test(pageData.theme?.heroImage || '') ? pageData.theme.heroImage : `${BASE_URL}/${(pageData.theme?.heroImage || '').replace(/^\.?\//, '')}`;
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: pageData.metaTitle, description: pageData.metaDesc, inLanguage: 'en', about: pageData.focusKeyword,
          primaryImageOfPage: heroImg, publisher: { '@type': 'TravelAgency', name: 'Comfort Journey', url: `${BASE_URL}/`, telephone: '+919203931912' } },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: pageData.eyebrow, item: url } ] },
        { '@type': 'ItemList', name: pageData.packagesHeading, itemListElement: tours.map((t, i) => ({ '@type': 'ListItem', position: i + 1,
          item: { '@type': 'TouristTrip', name: t.name, description: t.tagline, url: `${BASE_URL}/tour/${t.slug || t.id}/`,
            ...(t.price ? { offers: { '@type': 'Offer', price: t.price, priceCurrency: 'INR' } } : {}) } })) },
        { '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
      ]
    };
    const body = `
      <main class="ssg-snapshot">
        <nav aria-label="Breadcrumb"><a href="${BASE_URL}/">Home</a> / ${esc(pageData.eyebrow)}</nav>
        <h1>${esc(pageData.heroHeadline)}</h1>
        <p>${esc(pageData.heroSubline)}</p>
        <p><a href="https://wa.me/919203931912?text=${encodeURIComponent(pageData.whatsAppMsg || '')}">${esc(pageData.ctaPrimary)}</a> · <a href="tel:+919203931912">+91 92039 31912</a></p>
        <section><h2>${esc(pageData.packagesHeading)}</h2><p>${esc(pageData.packagesIntro)}</p>
          <ul>${tours.map((t) => `<li><a href="${BASE_URL}/tour/${esc(t.slug || t.id)}/">${esc(t.name)}</a>, ${esc(t.location)}, ${esc(t.duration)}${t.price ? `, from ₹${Number(t.price).toLocaleString('en-IN')} per person` : ''}</li>`).join('')}</ul>
        </section>
        ${pageData.quickAnswer ? `<section><h2>${esc(pageData.quickAnswer.question)}</h2><p>${esc(pageData.quickAnswer.answer)}</p></section>` : ''}
        <section><h2>${esc(pageData.storyHeading)}</h2>${(pageData.storyParagraphs || []).map((p) => `<p>${esc(p)}</p>`).join('')}</section>
        <section><h2>${esc(pageData.reasonsHeading)}</h2>${(pageData.reasons || []).map((r) => `<h3>${esc(r.title)}</h3><p>${esc(r.desc)}</p>`).join('')}</section>
        <section><h2>${esc(pageData.includedHeading)}</h2><ul>${(pageData.included || []).map((r) => `<li><strong>${esc(r.title)}</strong>: ${esc(r.desc)}</li>`).join('')}</ul></section>
        <section><h2>Questions people ask us</h2>${(pageData.faqs || []).map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}</section>
        <section><h2>${esc(pageData.finalHeading)}</h2><p>${esc(pageData.finalText)}</p></section>
        <nav aria-label="More trip types"><h2>More ways to travel</h2><ul>${Object.values(LANDING_PAGES_DATA).filter((p) => p.slug !== slug).map((p) => `<li><a href="${BASE_URL}/${p.slug}/">${esc(p.eyebrow)}</a></li>`).join('')}</ul></nav>
      </main>`;
    let pageHtml = injectHtmlMetadata(baseHtml, {
      title: esc(pageData.metaTitle),
      description: esc(pageData.metaDesc),
      image: heroImg,
      url,
      canonicalUrl: url,
      schema
    });
    pageHtml = injectRootContent(pageHtml, body);
    writeStaticPage(slug, pageHtml);
    pageCount++;
  }

  // 5. Pre-render About Us Page
  const aboutHtml = injectHtmlMetadata(baseHtml, {
    title: "About Comfort Journey | Bhopal Travel Agency Since 1992",
    description: "Meet Comfort Journey, a family-run travel company in Bhopal planning trips since 1992. Rated 4.8 on Google by 85+ travellers.",
    url: `${BASE_URL}/about/`,
    canonicalUrl: `${BASE_URL}/about/`
  });
  writeStaticPage('about', aboutHtml);
  pageCount++;

  console.log(`✅ [SSG] Successfully pre-rendered ${pageCount} static HTML pages in /dist ready for instant bot crawling and AWS S3 hosting!`);
}

generateSSG().catch(err => {
  console.error('❌ [SSG] Pre-render error:', err);
});
