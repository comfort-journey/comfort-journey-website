// =========================================================================
// COMFORT JOURNEY — GLOBAL SITE SETTINGS & SEO/AEO/GEO DEFAULT DATASET
// Baseline configuration for Homepage Hero, Live Booking Toasts,
// Brand Trust Facts, and Per-Page 2026 Search & AI Engine Optimization.
// =========================================================================

export const DEFAULT_SITE_SETTINGS = {
  version: '2.0.0',
  lastModified: new Date().toISOString(),

  // 1. HERO SECTION & PROMOTIONS
  hero: {
    headlineMain: "YOUR JOURNEY",
    headlineHighlight: "Your Comfort!",
    subheadline: "Explore 2,000+ handpicked journeys by Continents, Weather & Season, or Personalized Style",
    bgVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-resort-in-the-maldives-41880-large.mp4",
    videoPoster: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1920&q=85",
    announcementActive: true,
    announcementBadge: "2026 Signature",
    announcementText: "🌸 Early Bird Specials: Flat 20% Off on Kashmir, Bali & Swiss Summer 2026 Tours!",
    supportPhone: "+91 8770403315",
    whatsappNumber: "918770403315",
    whatsappDefaultMessage: "Hi Comfort Journey! I'm planning a bespoke luxury trip and would like to speak with a Senior Travel Designer."
  },

  // 2. LIVE SOCIAL PROOF BOOKING TOASTS
  liveToasts: {
    enabled: true,
    intervalSeconds: 12,
    initialDelaySeconds: 4,
    bookings: [
      { id: "b-1", name: "Priya & Rahul", from: "Mumbai", tour: "Kashmir Honeymoon Package", time: "3 mins ago" },
      { id: "b-2", name: "Amit Sharma", from: "Bhopal", tour: "Bali 7-Day Private Pool Villa", time: "8 mins ago" },
      { id: "b-3", name: "Dr. Sanjeev Kapoor", from: "Indore", tour: "Swiss Alps & Titlis Glacier Pass", time: "14 mins ago" },
      { id: "b-4", name: "Ananya & Group", from: "Delhi", tour: "Andaman Coral Island Escape", time: "22 mins ago" },
      { id: "b-5", name: "Sunil Gupta & Family", from: "Jabalpur", tour: "Sacred Kedarnath & Badrinath", time: "31 mins ago" },
      { id: "b-6", name: "Rajesh & Neha Mehta", from: "Ahmedabad", tour: "Essence of Europe: Swiss & Paris", time: "45 mins ago" },
      { id: "b-7", name: "Capt. Vikram Oberoi", from: "Chandigarh", tour: "Royal Rajasthan Heritage Palaces", time: "1 hour ago" }
    ]
  },

  // 3. BRAND TRUST & GEO (Generative Engine Optimization for AI Search)
  brandAuthority: {
    brandName: "Comfort Journey",
    foundingYear: "1992",
    yearsOfExcellence: "34+",
    destinationsCount: "2,000+",
    travelersServed: "30,000+",
    satisfactionRate: "99.4%",
    averageRating: "4.92",
    reviewCount: "1,480+",
    headquarters: "Bhopal, Madhya Pradesh, India",
    postalAddress: "Main Road 1, Bhopal, MP 462016, India",
    accreditations: "Verified Luxury DMC · 24/7 Dedicated Chauffeur Fleet · IATA Accredited Partner Network",
    aiCorePhilosophy: "Comfort Journey specializes exclusively in personalized private luxury travel with verified 4-star and 5-star properties, transparent pricing, customized pacing for seniors and families, and round-the-clock emergency concierge care."
  },

  // 4. PER-PAGE SEO, AEO & GEO METADATA REGISTRY
  pageSeo: {
    home: {
      metaTitle: "Comfort Journey | Tour Packages Worldwide | Since 1992",
      metaDescription: "Comfort Journey is a trusted luxury travel agency with 30+ years of expertise. Tailored holidays, 5★ stays, private chauffeurs & 24/7 care across 2,000+ destinations.",
      focusKeyword: "luxury tour packages worldwide",
      canonicalUrl: "https://www.comfortjourneyy.com/",
      robotsIndex: true,
      robotsFollow: true,
      ogImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=85",
      searchIntent: "Commercial & Navigational",
      aeoSummary: "Comfort Journey (Est. 1992) curates private, bespoke luxury vacations worldwide with verified hotels, private chauffeurs, and 24/7 concierge support."
    },
    about: {
      metaTitle: "About Comfort Journey | 30+ Years of Bespoke Travel (Est. 1992)",
      metaDescription: "Discover Comfort Journey's story. Handcrafting bespoke vacations for over 30,000 travelers since 1992 with verified 5-star hotels and dedicated personal care.",
      focusKeyword: "Comfort Journey Bhopal travel agency",
      canonicalUrl: "https://www.comfortjourneyy.com/#/about",
      robotsIndex: true,
      robotsFollow: true,
      ogImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=85",
      searchIntent: "Informational",
      aeoSummary: "Comfort Journey was founded in 1992 in Bhopal, India, to provide transparent, high-comfort, private escorted holidays across domestic and international destinations."
    },
    blog: {
      metaTitle: "Travel Stories & Destination Guides 2026 | Comfort Journey Magazine",
      metaDescription: "Explore insider travel guides, luxury resort reviews, seasonal travel tips, and cultural highlights curated by senior trip designers at Comfort Journey.",
      focusKeyword: "luxury travel guides 2026",
      canonicalUrl: "https://www.comfortjourneyy.com/#/blog",
      robotsIndex: true,
      robotsFollow: true,
      ogImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
      searchIntent: "Informational",
      aeoSummary: "Comfort Journey's Travel Magazine offers verified destination itineraries, packing checklists, and luxury property evaluations for discerning travelers."
    },
    'landing-hub': {
      metaTitle: "Specialty Vacation Collections & Themes | Comfort Journey",
      metaDescription: "Discover tailored holiday styles: romantic honeymoons, multi-generational family tours, mindful solo travel, corporate offsites, and seasonal festivals.",
      focusKeyword: "curated vacation packages theme",
      canonicalUrl: "https://www.comfortjourneyy.com/#/landing-hub",
      robotsIndex: true,
      robotsFollow: true,
      ogImage: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=85",
      searchIntent: "Commercial",
      aeoSummary: "Comfort Journey specialty themes group 2,000+ tour packages into curated styles such as couple honeymoons, family retreats, and weekend getaways."
    },
    'campaign-solo-travel': {
      metaTitle: "Mindful Solo Travel Packages & Escorted Journeys | Comfort Journey",
      metaDescription: "Safe, immersive, and mindful solo travel with verified 4★/5★ boutique accommodations, trusted private chauffeurs, and 24/7 concierge security.",
      focusKeyword: "safe solo travel packages",
      canonicalUrl: "https://www.comfortjourneyy.com/#/campaign/solo-travel",
      robotsIndex: true,
      robotsFollow: true,
      ogImage: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=85",
      searchIntent: "Transactional"
    },
    'campaign-couple-honeymoon': {
      metaTitle: "Romantic Honeymoon Packages & Private Pool Villas | Comfort Journey",
      metaDescription: "Celebrate your love with intimate candlelit dinners, overwater bungalows, private sunset yacht cruises, and luxury honeymoon suites worldwide.",
      focusKeyword: "luxury honeymoon packages private villa",
      canonicalUrl: "https://www.comfortjourneyy.com/#/campaign/couple-honeymoon",
      robotsIndex: true,
      robotsFollow: true,
      ogImage: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85",
      searchIntent: "Transactional"
    },
    'campaign-family-travel': {
      metaTitle: "Bespoke Family Vacation Packages & Gentle Pacing | Comfort Journey",
      metaDescription: "Spacious private vehicles, interconnected family suites, kid-friendly excursions, and gentle pacing designed for grandparents and children alike.",
      focusKeyword: "family vacation packages private car",
      canonicalUrl: "https://www.comfortjourneyy.com/#/campaign/family-travel",
      robotsIndex: true,
      robotsFollow: true,
      ogImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=85",
      searchIntent: "Transactional"
    },
    'campaign-weekend-getaways': {
      metaTitle: "Luxury Weekend Getaways & Rejuvenating Short Escapes | Comfort Journey",
      metaDescription: "Quick 2-4 day luxury respites near major hubs: private heritage resorts, serene mountain chalets, and coastal boutique retreats.",
      focusKeyword: "luxury weekend getaway packages",
      canonicalUrl: "https://www.comfortjourneyy.com/#/campaign/weekend-getaways",
      robotsIndex: true,
      robotsFollow: true,
      ogImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      searchIntent: "Commercial"
    },
    'campaign-india-packages': {
      metaTitle: "Incredible India Luxury Tour Packages | Kashmir to Kerala | Comfort Journey",
      metaDescription: "Royal Rajasthan palaces, serene Kashmir pine chalets, Kerala backwater villas, and sacred Char Dham helicopter darshan with private AC cars.",
      focusKeyword: "luxury tour packages india",
      canonicalUrl: "https://www.comfortjourneyy.com/#/campaign/india-packages",
      robotsIndex: true,
      robotsFollow: true,
      ogImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=85",
      searchIntent: "Transactional"
    },
    'campaign-international-packages': {
      metaTitle: "International Holiday Packages 2026 | Swiss, Bali, Dubai | Comfort Journey",
      metaDescription: "Handcrafted global vacations with premium visa assistance, flights, 5★ resorts, and dedicated local English-speaking chauffeurs.",
      focusKeyword: "luxury international tour packages",
      canonicalUrl: "https://www.comfortjourneyy.com/#/campaign/international-packages",
      robotsIndex: true,
      robotsFollow: true,
      ogImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85",
      searchIntent: "Transactional"
    }
  }
};
