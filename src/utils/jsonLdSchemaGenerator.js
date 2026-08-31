// =========================================================================
// COMFORT JOURNEY - ADVANCED JSON-LD SCHEMA.ORG STRUCTURED DATA ENGINE
// Optimized for AEO (Answer Engine Optimization), GEO & Google AI Overviews
// =========================================================================

const BASE_URL = 'https://www.comfortjourneyy.com';

export const jsonLdSchemaGenerator = {
  // 1. Travel Agency / Organization Schema (Site-Wide & Homepage)
  getTravelAgencySchema() {
    return {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "@id": `${BASE_URL}/#organization`,
      "name": "Comfort Journey",
      "alternateName": ["Comfort Journey Tours & Travels", "Comfort Journey Luxury Holidays"],
      "url": BASE_URL,
      "logo": "https://static.wixstatic.com/media/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg",
      "image": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80",
      "description": "Comfort Journey is an award-winning luxury tour and travel company established in 1992, curating handcrafted national and international holidays, VIP honeymoons, solo escapes, and corporate retreats with 24/7 dedicated concierge service.",
      "telephone": "+918770403315",
      "email": "contact@comfortjourneyy.com",
      "foundingDate": "1992-04-15",
      "founder": {
        "@type": "Person",
        "name": "Sharad Mishra",
        "jobTitle": "Managing Director & Founder"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop no 2, Phase 5, Ankur Complex, 6 Number Bus Stop, Shivaji Nagar",
        "addressLocality": "Bhopal",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "462016",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "23.2335",
        "longitude": "77.4344"
      },
      "hasMap": "https://maps.google.com/?q=Comfort+Journey+Bhopal",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "21:00"
        }
      ],
      "priceRange": "₹₹₹",
      "currenciesAccepted": "INR, USD, EUR, GBP, AED",
      "paymentAccepted": "Credit Card, Debit Card, Net Banking, UPI, Bank Wire Transfer",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.95",
        "reviewCount": "840",
        "bestRating": "5",
        "worstRating": "1"
      },
      "sameAs": [
        "https://www.instagram.com/comfortjourneyy",
        "https://www.facebook.com/comfortjourneyy",
        "https://wa.me/918770403315"
      ]
    };
  },

  // 2. Blog Posting / Article Schema (For Editorial Travel Guides)
  getBlogPostingSchema(blog) {
    if (!blog) return null;
    const url = `${BASE_URL}/#/blog/${blog.slug}`;
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      },
      "headline": blog.seo?.metaTitle || blog.title,
      "name": blog.title,
      "description": blog.seo?.metaDescription || blog.excerpt,
      "image": [
        blog.coverImage || "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85"
      ],
      "datePublished": blog.publishedDate ? new Date(blog.publishedDate).toISOString() : new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "author": {
        "@type": "Person",
        "name": blog.author?.name || "Rishabh Mishra",
        "jobTitle": blog.author?.role || "Founder & Lead Curator",
        "url": `${BASE_URL}/#/about`
      },
      "publisher": {
        "@type": "TravelAgency",
        "name": "Comfort Journey",
        "logo": {
          "@type": "ImageObject",
          "url": "https://static.wixstatic.com/media/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg"
        }
      },
      "articleSection": blog.category || "Travel Guides",
      "keywords": Array.isArray(blog.tags) ? blog.tags.join(', ') : (blog.tags || "Travel, Luxury Stays"),
      "inLanguage": "en-US",
      "about": {
        "@type": "Thing",
        "name": blog.seo?.focusKeyword || blog.category || "Luxury Travel"
      }
    };
  },

  // 3. TouristTrip / Product Schema (For Bookable Tour Packages)
  getTouristTripSchema(tour) {
    if (!tour) return null;
    const url = `${BASE_URL}/#/tour/${tour.slug || tour.id}`;
    
    // Parse day-wise itinerary steps for schema
    const itinerarySteps = (tour.itinerary || []).map((step, idx) => ({
      "@type": "Day",
      "position": step.day || (idx + 1),
      "name": step.title || `Day ${idx + 1} Excursion`,
      "description": step.desc || step.schedule || "Private guided sightseeing and luxury leisure."
    }));

    return {
      "@context": "https://schema.org",
      "@type": ["TouristTrip", "Product"],
      "@id": `${url}#tour`,
      "name": tour.name || tour.title,
      "description": tour.tagline || tour.overview || `Handcrafted ${tour.duration || '5N/6D'} luxury tour package to ${tour.location || 'India'} curated by Comfort Journey.`,
      "image": [
        tour.image || "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85"
      ],
      "touristType": [
        "Luxury Travelers",
        "Couples & Honeymooners",
        "Family Travelers",
        "Corporate VIPs"
      ],
      "provider": {
        "@type": "TravelAgency",
        "name": "Comfort Journey",
        "url": BASE_URL,
        "telephone": "+918770403315"
      },
      "offers": {
        "@type": "Offer",
        "url": url,
        "price": tour.price || 19999,
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-01-01",
        "priceValidUntil": "2027-12-31"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": String(tour.rating || 4.95),
        "reviewCount": String(tour.reviewsCount || 85),
        "bestRating": "5",
        "worstRating": "1"
      },
      "itinerary": {
        "@type": "ItemList",
        "itemListElement": itinerarySteps
      }
    };
  },

  // 4. FAQPage Schema (For Objection Handling & Rich Snippets)
  getFaqPageSchema(faqs) {
    if (!faqs || !Array.isArray(faqs) || faqs.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q || faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a || faq.answer
        }
      }))
    };
  },

  // 5. BreadcrumbList Schema (For Hierarchical Crawling)
  getBreadcrumbSchema(items) {
    if (!items || !Array.isArray(items) || items.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": item.name,
        "item": item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
      }))
    };
  }
};
