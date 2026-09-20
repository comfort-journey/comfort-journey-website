// =========================================================================
// COMFORT JOURNEY — DYNAMIC 2026 SEO, AEO & GEO HEAD INJECTOR HOOK
// Automatically updates Document Title, Meta Description, Canonical Link,
// Robots Tags, OpenGraph Cards, and Schema.org JSON-LD Structured Data.
// =========================================================================

import { useEffect } from 'react';
import { siteSettingsService, EVENT_SETTINGS_UPDATED } from '../services/siteSettingsService';

export function usePageSEO(pageKey = 'home', customOverrides = null) {
  useEffect(() => {
    function applySEO() {
      const pageSeo = customOverrides || siteSettingsService.getPageSeo(pageKey);
      const brand = siteSettingsService.getBrandAuthority();
      const hero = siteSettingsService.getHero();

      if (!pageSeo) return;

      // 1. Title Tag
      if (pageSeo.metaTitle) {
        document.title = pageSeo.metaTitle;
      }

      // 2. Helper to set or create meta tags
      const setMeta = (attrName, attrValue, content) => {
        if (!content) return;
        let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute(attrName, attrValue);
          document.head.appendChild(el);
        }
        el.setAttribute('content', content);
      };

      // 3. Primary Meta Tags
      setMeta('name', 'description', pageSeo.metaDescription);
      if (pageSeo.focusKeyword) {
        setMeta('name', 'keywords', pageSeo.focusKeyword);
      }

      // 4. Robots Directives (Crucial for 2026 Indexing)
      const robotsContent = pageSeo.robotsIndex !== false
        ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        : 'noindex, nofollow';
      setMeta('name', 'robots', robotsContent);
      setMeta('name', 'googlebot', robotsContent);

      // 5. Canonical Link
      const canonicalHref = pageSeo.canonicalUrl || window.location.href.split('?')[0];
      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', canonicalHref);

      // 6. OpenGraph Meta Tags (Social Previews & WhatsApp)
      setMeta('property', 'og:title', pageSeo.metaTitle);
      setMeta('property', 'og:description', pageSeo.metaDescription);
      setMeta('property', 'og:url', canonicalHref);
      setMeta('property', 'og:type', pageKey === 'blog' ? 'article' : 'website');
      setMeta('property', 'og:site_name', brand.brandName || 'Comfort Journey');
      if (pageSeo.ogImage) {
        setMeta('property', 'og:image', pageSeo.ogImage);
      }

      // 7. Twitter Card Tags
      setMeta('name', 'twitter:card', 'summary_large_image');
      setMeta('name', 'twitter:title', pageSeo.metaTitle);
      setMeta('name', 'twitter:description', pageSeo.metaDescription);
      if (pageSeo.ogImage) {
        setMeta('name', 'twitter:image', pageSeo.ogImage);
      }

      // 8. 2026 AI Engine & Search Structured Data (JSON-LD)
      const structuredDataId = 'cj-dynamic-jsonld';
      let scriptEl = document.getElementById(structuredDataId);
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = structuredDataId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }

      const structuredSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          // Organization / Travel Agency Entity
          {
            '@type': 'TravelAgency',
            '@id': 'https://www.comfortjourneyy.com/#agency',
            name: brand.brandName || 'Comfort Journey',
            url: 'https://www.comfortjourneyy.com/',
            logo: 'https://static.wixstatic.com/media/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg',
            description: brand.aiCorePhilosophy || pageSeo.metaDescription,
            telephone: hero.supportPhone || '+918770403315',
            foundingDate: brand.foundingYear || '1992',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Main Road 1',
              addressLocality: 'Bhopal',
              addressRegion: 'Madhya Pradesh',
              postalCode: '462016',
              addressCountry: 'IN'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: brand.averageRating || '4.92',
              reviewCount: '1480',
              bestRating: '5',
              worstRating: '1'
            },
            priceRange: '₹₹ - ₹₹₹₹'
          },
          // WebPage with Breadcrumb
          {
            '@type': 'WebPage',
            '@id': `${canonicalHref}#webpage`,
            url: canonicalHref,
            name: pageSeo.metaTitle,
            description: pageSeo.metaDescription,
            isPartOf: {
              '@id': 'https://www.comfortjourneyy.com/#website'
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.comfortjourneyy.com/'
                },
                ...(pageKey !== 'home' ? [{
                  '@type': 'ListItem',
                  position: 2,
                  name: pageSeo.metaTitle.split('|')[0].trim(),
                  item: canonicalHref
                }] : [])
              ]
            }
          }
        ]
      };

      scriptEl.textContent = JSON.stringify(structuredSchema);
    }

    applySEO();

    // Re-apply whenever marketing team updates settings in CMS
    window.addEventListener(EVENT_SETTINGS_UPDATED, applySEO);
    return () => {
      window.removeEventListener(EVENT_SETTINGS_UPDATED, applySEO);
    };
  }, [pageKey, customOverrides]);
}
