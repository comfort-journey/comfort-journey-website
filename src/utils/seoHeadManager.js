// =========================================================================
// COMFORT JOURNEY - DYNAMIC HEAD & TECHNICAL SEO INJECTOR
// Manages Title, Canonical, OpenGraph, Twitter Cards & JSON-LD Schemas
// =========================================================================

const DEFAULT_TITLE = "Comfort Journey | Handcrafted Royal Luxury Travel Packages Worldwide";
const DEFAULT_DESC = "Comfort Journey (Est. 1992) crafts bespoke luxury tour packages for 2,000+ destinations worldwide. Handpicked 5-star stays, private sanitized cabs, and 24/7 dedicated concierge.";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=85";
const BASE_URL = "https://www.comfortjourneyy.com";

export const seoHeadManager = {
  updateMetadata({
    title = DEFAULT_TITLE,
    description = DEFAULT_DESC,
    image = DEFAULT_IMAGE,
    url = BASE_URL,
    type = "website",
    schema = null,
    keywords = ""
  }) {
    // 1. Document Title
    document.title = title;

    // 2. Helper to set or create <meta> tags
    const setMetaTag = (attrName, attrVal, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 3. Standard SEO Metas
    setMetaTag('name', 'description', description);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 4. Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url.startsWith('http') ? url : `${BASE_URL}${url}`);

    // 5. OpenGraph Tags (Facebook, LinkedIn, WhatsApp, Reddit)
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', url.startsWith('http') ? url : `${BASE_URL}${url}`);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'Comfort Journey');
    setMetaTag('property', 'og:locale', 'en_US');

    // 6. Twitter Card Tags (X)
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);
    setMetaTag('name', 'twitter:site', '@comfortjourneyy');
    setMetaTag('name', 'twitter:creator', '@comfortjourneyy');

    // 7. Dynamic JSON-LD Structured Data
    if (schema) {
      this.injectJsonLd(schema);
    }
  },

  injectJsonLd(schemaData) {
    if (!schemaData) return;
    const SCRIPT_ID = 'cj-jsonld-schema';
    let script = document.getElementById(SCRIPT_ID);
    if (!script) {
      script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaData, null, 2);
  },

  resetToDefault() {
    this.updateMetadata({
      title: DEFAULT_TITLE,
      description: DEFAULT_DESC,
      image: DEFAULT_IMAGE,
      url: BASE_URL,
      type: "website"
    });
  }
};
