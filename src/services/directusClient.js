// =========================================================================
// COMFORT JOURNEY - DIRECTUS HEADLESS CMS CLIENT & SYNC BRIDGE
// Connects to local Directus (http://localhost:8055) or AWS Cloud Directus
// With graceful fallback to local data when offline or during setup
// =========================================================================

import { TOURS_DATA } from '../data/toursData';
import { BLOGS_DATA, getBlogBySlug } from '../data/blogsData';
export { resolveDestinationImage, isWixOrLegacyUrl } from '../utils/destinationImageResolver';

const DEFAULT_DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055';
const STORAGE_KEY_URL = 'cj_directus_url';
const STORAGE_KEY_TOKEN = 'cj_directus_token';
const STORAGE_KEY_LOCAL_BLOGS = 'cj_local_custom_blogs';
const STORAGE_KEY_LOCAL_TOURS = 'cj_local_custom_tours';

// Helper function to slugify text
export function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to parse CSV lines with quotes
function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

// Helper to clean Wix array or formatted string like '["Dharamshala"]' or '["4 Nights & 5 Days"]'
function cleanWixField(val, fallback = '') {
  if (!val) return fallback;
  if (typeof val !== 'string') return String(val);
  const trimmed = val.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed.join(', ');
    } catch {
      return trimmed.replace(/[\[\]"']/g, '').trim();
    }
  }
  return trimmed;
}

// Extract rich Wix Itinerary JSON
function extractWixItineraryFromField(raw, location) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;

  if (typeof raw === 'string' && raw.trim().startsWith('{')) {
    try {
      const obj = JSON.parse(raw);
      const itinerary = [];
      let currentDay = 1;

      const extractTextFromNodes = (nodes) => {
        let texts = [];
        for (const n of (nodes || [])) {
          if (n.textData?.text) texts.push(n.textData.text);
          if (n.nodes) texts.push(...extractTextFromNodes(n.nodes));
        }
        return texts;
      };

      for (const node of (obj.nodes || [])) {
        const text = extractTextFromNodes([node]).join(' ').trim();
        if (text.toLowerCase().startsWith('day ') || text.toLowerCase().startsWith('day:')) {
          itinerary.push({ day: currentDay++, title: text, desc: '' });
        } else if (itinerary.length > 0 && text) {
          if (!itinerary[itinerary.length - 1].desc) {
            itinerary[itinerary.length - 1].desc = text;
          } else {
            itinerary[itinerary.length - 1].desc += ' ' + text;
          }
        }
      }
      if (itinerary.length > 0) return itinerary;
    } catch {
      // Fallback
    }
  }
  return [];
}

export function parseWixCsv(csvText) {
  if (!csvText) return [];
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = parseCsvLine(line);
    const row = {};
    headers.forEach((h, idx) => {
      row[h.trim()] = values[idx] ? values[idx].trim() : '';
    });
    rows.push(row);
  }
  return rows;
}

export function transformWixTourRow(wixRow) {
  const rawTitle = wixRow.Title || wixRow.Name || wixRow.PackageTitle || 'Handcrafted Luxury Tour';
  const name = cleanWixField(rawTitle);
  const slug = slugify(name);
  
  const rawLocation = wixRow.Destination || wixRow.City || wixRow.Location || wixRow.State || 'India';
  const location = cleanWixField(rawLocation, 'India');
  
  const rawCategory = wixRow['Package Category'] || wixRow.Category || wixRow.TourType || 'Luxury Signature';
  const category = cleanWixField(rawCategory, 'Luxury Signature');

  const rawDuration = wixRow.Days || wixRow.Duration || '5 Nights & 6 Days';
  const duration = cleanWixField(rawDuration, '5 Nights & 6 Days');

  // Price calculation
  const rawDiscountedPrice = wixRow['Discounted Total Price'] || wixRow.Price || wixRow.SalePrice || wixRow['Pricing Per Person'] || '24999';
  const price = parseInt(rawDiscountedPrice.toString().replace(/[^0-9]/g, ''), 10) || 24999;
  
  const rawTotalPrice = wixRow['Total Price'] || wixRow.ComparePrice || wixRow.OriginalPrice || '';
  const origPrice = rawTotalPrice ? parseInt(rawTotalPrice.toString().replace(/[^0-9]/g, ''), 10) : Math.round(price * 1.25);

  const rawDescription = wixRow.Description || wixRow.Overview || `Handcrafted ${duration} tour to ${location} curated by Comfort Journey.`;
  const tagline = cleanWixField(rawDescription);

  // Media Migration: Replace Wix CDN URLs with curated photography
  const legacyWixUrl = wixRow.Image || wixRow.WixImageUrl || wixRow.CoverImage || '';
  const cleanImage = resolveDestinationImage(location, name, category, legacyWixUrl);

  // Inclusions parsing
  let inclusions = ['Verified 5-Star Stay', 'Private AC Transfers', 'Daily Breakfast & Dinner', '24/7 VIP Concierge'];
  if (wixRow.Inclusions) {
    if (typeof wixRow.Inclusions === 'string' && wixRow.Inclusions.startsWith('{')) {
      try {
        const parsed = JSON.parse(wixRow.Inclusions);
        const listItems = [];
        const extractList = (nodes) => {
          for (const n of (nodes || [])) {
            if (n.textData?.text) listItems.push(n.textData.text);
            if (n.nodes) extractList(n.nodes);
          }
        };
        extractList(parsed.nodes);
        if (listItems.length > 0) inclusions = listItems.slice(0, 6);
      } catch {
        // Keep default
      }
    } else {
      inclusions = wixRow.Inclusions.split(/[;,|]/).map(s => s.trim()).filter(Boolean);
    }
  }

  // Itinerary parsing
  let itinerary = extractWixItineraryFromField(wixRow.Itinerary, location);

  if (itinerary.length === 0) {
    for (let d = 1; d <= 10; d++) {
      const dayTitle = wixRow[`Day${d}_Title`] || wixRow[`Day_${d}_Title`] || wixRow[`Day${d}`];
      const dayDesc = wixRow[`Day${d}_Desc`] || wixRow[`Day_${d}_Desc`] || wixRow[`Day${d}_Description`];
      if (dayTitle || dayDesc) {
        itinerary.push({
          day: d,
          title: dayTitle || `Day ${d} - Highlights & Exploration`,
          desc: dayDesc || `Explore the scenic beauty and historical heritage of ${location} with private chauffeur assistance.`
        });
      }
    }
  }

  // Fallback itinerary if none provided in CSV
  if (itinerary.length === 0) {
    itinerary.push(
      { day: 1, title: 'Arrival & VIP Check-In', desc: `VIP airport greeting and transfer to 5-star hotel in ${location}.` },
      { day: 2, title: 'Signature Sightseeing & Excursions', desc: `Guided full-day tour covering major attractions and viewpoints.` },
      { day: 3, title: 'Leisure, Cultural Highlights & Departure', desc: `Morning breakfast, souvenir shopping, and chauffeur airport transfer.` }
    );
  }

  return {
    id: `tour-wix-${slug}`,
    wixId: wixRow.ID || wixRow.HandleId || `wix-${Date.now()}`,
    name,
    slug,
    location,
    continent: location.toLowerCase().includes('switz') || location.toLowerCase().includes('europe') || location.toLowerCase().includes('paris') ? 'Europe' : 'Asia',
    country: location.includes(',') ? location.split(',')[1].trim() : (location.toLowerCase().includes('bali') ? 'Indonesia' : 'India'),
    category,
    duration,
    price,
    origPrice,
    tagline,
    image: cleanImage,
    legacyWixUrl: isWixOrLegacyUrl(legacyWixUrl) ? '[REPLACED WIX CDN ASSET]' : legacyWixUrl,
    badge: 'Wix Migrated Signature',
    rating: 4.95,
    reviewsCount: 92,
    inclusions,
    itinerary
  };
}

export const directusService = {
  // Get active Directus base URL
  getBaseUrl() {
    return localStorage.getItem(STORAGE_KEY_URL) || DEFAULT_DIRECTUS_URL;
  },

  // Set active Directus base URL (e.g. when pointing from localhost to AWS)
  setBaseUrl(url) {
    if (url) {
      localStorage.setItem(STORAGE_KEY_URL, url.replace(/\/+$/, ''));
    } else {
      localStorage.removeItem(STORAGE_KEY_URL);
    }
  },

  // Get auth token
  getToken() {
    return localStorage.getItem(STORAGE_KEY_TOKEN) || import.meta.env.VITE_DIRECTUS_TOKEN || '';
  },

  // Set auth token
  setToken(token) {
    if (token) {
      localStorage.setItem(STORAGE_KEY_TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEY_TOKEN);
    }
  },

  // Ping Directus Server Health
  async checkHealth() {
    const url = this.getBaseUrl();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(`${url}/server/ping`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const text = await res.text();
        return { isOnline: true, message: text || 'pong', url };
      }
      return { isOnline: false, message: `Server responded with status ${res.status}`, url };
    } catch (err) {
      return { isOnline: false, message: err.message || 'Directus offline (Using Fallback Data)', url };
    }
  },

  // ─────────────────────────────────────────────────────────────────
  // BLOGS API
  // ─────────────────────────────────────────────────────────────────
  async fetchBlogs() {
    const url = this.getBaseUrl();
    const token = this.getToken();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${url}/items/blogs?fields=*.*&sort=-published_date`, {
        headers,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          // Normalize Directus schema to frontend format
          return json.data.map(item => this.normalizeBlog(item));
        }
      }
    } catch (e) {
      console.warn('[Directus] Live blogs fetch failed, using fallback data:', e.message);
    }

    // Fallback + Local stored custom blogs
    const localCustomBlogs = this.getLocalCustomBlogs();
    return [...localCustomBlogs, ...BLOGS_DATA];
  },

  async fetchBlogBySlug(slug) {
    if (!slug) return null;
    const cleanSlug = slug.replace(/^#\/?/, '').replace(/^blog\/?/, '').toLowerCase().trim();

    const url = this.getBaseUrl();
    const token = this.getToken();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${url}/items/blogs?filter[slug][_eq]=${encodeURIComponent(cleanSlug)}&fields=*.*`, {
        headers,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          return this.normalizeBlog(json.data[0]);
        }
      }
    } catch (e) {
      console.warn('[Directus] Blog by slug fetch failed, checking local data:', e.message);
    }

    // Check locally saved blogs
    const localCustom = this.getLocalCustomBlogs().find(b => b.slug.toLowerCase() === cleanSlug);
    if (localCustom) return localCustom;

    // Check seed blogs
    return getBlogBySlug(cleanSlug);
  },

  async createBlog(blogPayload) {
    const url = this.getBaseUrl();
    const token = this.getToken();

    const newBlog = {
      id: blogPayload.id || `blog-${Date.now()}`,
      slug: blogPayload.slug || slugify(blogPayload.title),
      title: blogPayload.title,
      excerpt: blogPayload.excerpt || blogPayload.content.slice(0, 160) + '...',
      content: blogPayload.content,
      coverImage: blogPayload.coverImage || 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=85',
      category: blogPayload.category || 'Destination Guides',
      author: {
        name: blogPayload.authorName || 'Rishabh Mishra',
        role: blogPayload.authorRole || 'Founder & Lead Curator',
        avatar: 'https://static.wixstatic.com/media/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg/v1/fill/w_192,h_192,lg_1,usm_0.66_1.00_0.01/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg'
      },
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: blogPayload.readTime || `${Math.max(3, Math.round(blogPayload.content.split(' ').length / 200))} min read`,
      featured: Boolean(blogPayload.featured),
      tags: blogPayload.tags || ['Travel', 'Luxury', 'Guides'],
      suggestedTourIds: blogPayload.suggestedTourIds || [],
      seo: {
        metaTitle: blogPayload.seo?.metaTitle || `${blogPayload.title} | Comfort Journey`,
        metaDescription: blogPayload.seo?.metaDescription || blogPayload.excerpt,
        focusKeyword: blogPayload.seo?.focusKeyword || ''
      },
      relatedTourId: blogPayload.relatedTourId || 'kashmir-paradise'
    };

    // Try posting to Directus
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${url}/items/blogs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          status: 'published',
          title: newBlog.title,
          slug: newBlog.slug,
          excerpt: newBlog.excerpt,
          content: newBlog.content,
          cover_image: newBlog.coverImage,
          category: newBlog.category,
          author_name: newBlog.author.name,
          published_date: new Date().toISOString(),
          read_time: newBlog.readTime,
          tags: newBlog.tags,
          suggested_packages: newBlog.suggestedTourIds,
          seo_meta_title: newBlog.seo.metaTitle,
          seo_meta_description: newBlog.seo.metaDescription,
          focus_keywords: newBlog.seo.focusKeyword
        })
      });

      if (res.ok) {
        const json = await res.json();
        return this.normalizeBlog(json.data);
      }
    } catch (e) {
      console.warn('[Directus] Live create blog failed, saving to local store:', e.message);
    }

    // Always save locally so admin can immediately preview on site
    const current = this.getLocalCustomBlogs();
    const updated = [newBlog, ...current.filter(b => b.slug !== newBlog.slug)];
    localStorage.setItem(STORAGE_KEY_LOCAL_BLOGS, JSON.stringify(updated));
    return newBlog;
  },

  // ─────────────────────────────────────────────────────────────────
  // TOUR PACKAGES API
  // ─────────────────────────────────────────────────────────────────
  async fetchTourPackages() {
    const url = this.getBaseUrl();
    const token = this.getToken();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${url}/items/tour_packages?fields=*.*&filter[status][_eq]=published`, {
        headers,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          return json.data.map(item => this.normalizeTour(item));
        }
      }
    } catch (e) {
      console.warn('[Directus] Live tours fetch failed, using fallback TOURS_DATA:', e.message);
    }

    const localCustomTours = this.getLocalCustomTours();
    return [...localCustomTours, ...TOURS_DATA];
  },

  async fetchTourBySlug(slug) {
    if (!slug) return null;
    const cleanSlug = slug.replace(/^#\/?/, '').replace(/^tour\/?/, '').toLowerCase().trim();

    const allTours = await this.fetchTourPackages();
    return allTours.find(t => 
      (t.slug && t.slug.toLowerCase() === cleanSlug) || 
      (t.id && t.id.toLowerCase() === cleanSlug)
    ) || null;
  },

  async createTourPackage(tourPayload) {
    const newTour = {
      id: tourPayload.id || `tour-${Date.now()}`,
      slug: tourPayload.slug || slugify(tourPayload.name),
      name: tourPayload.name,
      tagline: tourPayload.tagline || 'Custom VIP Handcrafted Tour Experience',
      location: tourPayload.location || 'India',
      continent: tourPayload.continent || 'Asia',
      country: tourPayload.country || 'India',
      category: tourPayload.category || 'Luxury Holidays',
      duration: tourPayload.duration || '5N / 6D',
      price: Number(tourPayload.price) || 24999,
      origPrice: Number(tourPayload.origPrice) || Math.round((Number(tourPayload.price) || 24999) * 1.25),
      image: tourPayload.image || 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85',
      badge: tourPayload.badge || 'VIP Experience',
      rating: 4.95,
      reviewsCount: 88,
      inclusions: tourPayload.inclusions || ['Stay', 'Transfers', 'Meals', 'Sightseeing', '24/7 VIP Concierge'],
      itinerary: tourPayload.itinerary || [
        { day: 1, title: 'Arrival & Welcome', desc: 'VIP airport transfer and 5-star hotel check-in.' }
      ]
    };

    // Save locally
    const current = this.getLocalCustomTours();
    const updated = [newTour, ...current.filter(t => t.id !== newTour.id)];
    localStorage.setItem(STORAGE_KEY_LOCAL_TOURS, JSON.stringify(updated));
    return newTour;
  },

  // ─────────────────────────────────────────────────────────────────
  // WIX HISTORICAL DATA BATCH IMPORTER
  // ─────────────────────────────────────────────────────────────────
  async importWixTourPackages(input) {
    let rows = [];
    if (typeof input === 'string') {
      rows = parseWixCsv(input);
    } else if (Array.isArray(input)) {
      rows = input;
    }

    if (rows.length === 0) return { success: false, count: 0, packages: [] };

    const transformed = rows.map(r => (r.slug && r.image) ? r : transformWixTourRow(r));

    // Save to local storage cache
    const current = this.getLocalCustomTours();
    const existingIds = new Set(current.map(t => t.id));
    const merged = [...transformed.filter(t => !existingIds.has(t.id)), ...current];
    localStorage.setItem(STORAGE_KEY_LOCAL_TOURS, JSON.stringify(merged));

    // Attempt pushing to Directus server if online
    const url = this.getBaseUrl();
    const token = this.getToken();
    let directusSynced = 0;

    if (token) {
      for (const pkg of transformed) {
        try {
          const res = await fetch(`${url}/items/tour_packages`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              status: 'published',
              title: pkg.name,
              slug: pkg.slug,
              price: pkg.price,
              orig_price: pkg.origPrice,
              duration: pkg.duration,
              category: pkg.category,
              inclusions: pkg.inclusions,
              itinerary: pkg.itinerary
            })
          });
          if (res.ok) directusSynced++;
        } catch {
          // Directus offline fallback
        }
      }
    }

    return {
      success: true,
      count: transformed.length,
      directusSynced,
      packages: transformed
    };
  },

  // ─────────────────────────────────────────────────────────────────
  // HYBRID SUGGESTED TOUR PACKAGES ENGINE (M2M + AUTOMATED FALLBACK)
  // ─────────────────────────────────────────────────────────────────
  getSuggestedToursForBlog(blog, allTours = TOURS_DATA) {
    if (!blog || !Array.isArray(allTours) || allTours.length === 0) return [];

    // 1. Manual Selection Check (M2M)
    const manualIds = blog.suggestedTourIds || (Array.isArray(blog.suggested_packages) ? blog.suggested_packages.map(p => typeof p === 'object' ? p.id : p) : []);
    
    if (manualIds && manualIds.length > 0) {
      const selected = allTours.filter(t => manualIds.includes(t.id) || manualIds.includes(t.slug));
      if (selected.length >= 3) {
        return selected.slice(0, 3);
      }
    }

    // 2. Automated Fallback Logic (Tag & Category Relevance Scoring)
    const blogTags = (Array.isArray(blog.tags) ? blog.tags : []).map(t => t.toLowerCase());
    const blogCategory = (blog.category || '').toLowerCase();
    const blogTitle = (blog.title || '').toLowerCase();

    const scoredTours = allTours.map(tour => {
      let score = 0;
      const tourName = (tour.name || '').toLowerCase();
      const tourLoc = (tour.location || '').toLowerCase();
      const tourTagline = (tour.tagline || '').toLowerCase();
      const tourCat = (tour.category || '').toLowerCase();

      // Check tag matches (High weight for destination words)
      for (const tag of blogTags) {
        if (tourName.includes(tag)) score += 5;
        if (tourLoc.includes(tag)) score += 5;
        if (tourTagline.includes(tag)) score += 3;
        if (tourCat.includes(tag)) score += 2;
      }

      // Check category match
      if (tourCat.includes(blogCategory) || blogCategory.includes(tourCat)) {
        score += 4;
      }

      // Check title keywords
      if (blogTitle.includes(tourLoc) || blogTitle.includes(tourName)) {
        score += 6;
      }

      return { tour, score };
    });

    // Sort by score descending
    scoredTours.sort((a, b) => b.score - a.score);

    // Pick top 3 unique tours
    const topTours = scoredTours.slice(0, 3).map(item => item.tour);

    // Fallback safeguard: if less than 3, pad with top catalog tours
    if (topTours.length < 3) {
      for (const tour of allTours) {
        if (!topTours.some(t => t.id === tour.id)) {
          topTours.push(tour);
          if (topTours.length === 3) break;
        }
      }
    }

    return topTours;
  },

  // ─────────────────────────────────────────────────────────────────
  // NORMALIZATION HELPERS
  // ─────────────────────────────────────────────────────────────────
  normalizeBlog(item) {
    return {
      id: item.id,
      slug: item.slug || `blog-${item.id}`,
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      coverImage: item.cover_image?.id 
        ? `${this.getBaseUrl()}/assets/${item.cover_image.id}`
        : (item.cover_image || 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85'),
      category: item.category || 'Destination Guides',
      author: {
        name: item.author_name || 'Rishabh Mishra',
        role: item.author_role || 'Founder & Lead Curator',
        avatar: item.author_avatar || 'https://static.wixstatic.com/media/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg/v1/fill/w_192,h_192,lg_1,usm_0.66_1.00_0.01/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg'
      },
      publishedDate: item.published_date 
        ? new Date(item.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : 'Recent',
      readTime: item.read_time || '5 min read',
      featured: Boolean(item.featured),
      tags: Array.isArray(item.tags) ? item.tags : ['Travel', 'Comfort Journey'],
      suggestedTourIds: Array.isArray(item.suggested_packages) ? item.suggested_packages : (item.suggestedTourIds || []),
      seo: {
        metaTitle: item.seo_meta_title || item.title,
        metaDescription: item.seo_meta_description || item.excerpt,
        focusKeyword: item.focus_keywords || ''
      },
      relatedTourId: item.related_tour_id || 'kashmir-paradise'
    };
  },

  normalizeTour(item) {
    return {
      id: item.id,
      slug: item.slug || `tour-${item.id}`,
      name: item.title || item.name,
      tagline: item.tagline || item.overview,
      location: item.location || item.city || 'Worldwide',
      continent: item.continent || 'Asia',
      country: item.country || 'India',
      category: item.category || 'Luxury Signature',
      duration: item.duration || '5N / 6D',
      price: Number(item.price) || 19999,
      origPrice: Number(item.orig_price || item.origPrice) || Math.round((Number(item.price) || 19999) * 1.25),
      image: item.featured_image?.id 
        ? `${this.getBaseUrl()}/assets/${item.featured_image.id}`
        : (item.image || 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85'),
      badge: item.badge || 'VIP Tour',
      rating: item.rating || 4.95,
      reviewsCount: item.reviews_count || 85,
      inclusions: item.inclusions || ['Stay', 'Transfers', 'Meals', 'Sightseeing', '24/7 VIP Concierge'],
      itinerary: item.itinerary || []
    };
  },

  // Local storage cache readers
  getLocalCustomBlogs() {
    try {
      const storedV2 = localStorage.getItem('cj_custom_blogs_v2');
      if (storedV2) {
        const parsed = JSON.parse(storedV2);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      const stored = localStorage.getItem(STORAGE_KEY_LOCAL_BLOGS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  getLocalCustomTours() {
    try {
      const storedMaster = localStorage.getItem('cj_custom_tours_dataset');
      if (storedMaster) {
        const parsed = JSON.parse(storedMaster);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      const stored = localStorage.getItem(STORAGE_KEY_LOCAL_TOURS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
};
