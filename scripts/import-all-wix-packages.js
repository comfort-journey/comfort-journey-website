// =========================================================================
// COMFORT JOURNEY - MASTER WIX DATA MIGRATION & MULTI-CATEGORY ENGINE
// Robust State-Machine CSV Parser handling multi-line quoted fields,
// Clean decimal prices, Wix JSON Itineraries, and Multi-Category Tagging.
// =========================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import destination image resolver
const resolverPath = path.resolve(__dirname, '../src/utils/destinationImageResolver.js');
const { resolveDestinationImage, isWixOrLegacyUrl } = await import(`file://${resolverPath}`);

// Helper to clean Wix array or formatted string like '["Dharamshala"]'
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
  return trimmed.replace(/<[^>]*>?/gm, '').trim();
}

// Clean price with decimal awareness (e.g. " ₹94,011.5*" -> 94012)
function parseCleanPrice(val, fallback = 24999) {
  if (!val) return fallback;
  const str = String(val).replace(/,/g, '').replace(/[^0-9.]/g, '');
  const num = parseFloat(str);
  if (isNaN(num) || num <= 0) return fallback;
  return Math.round(num);
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
        if (text.toLowerCase().startsWith('day ') || text.toLowerCase().startsWith('day:') || text.toLowerCase().startsWith('day -') || text.toLowerCase().startsWith('day: ')) {
          itinerary.push({ day: currentDay++, title: text, desc: '' });
        } else if (itinerary.length > 0 && text) {
          if (!itinerary[itinerary.length - 1].desc) {
            itinerary[itinerary.length - 1].desc = text;
          } else if (itinerary[itinerary.length - 1].desc.length < 350) {
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

// State Machine CSV Parser (Supports Multi-line Quoted Fields)
function parseFullCsv(csvText) {
  const rows = [];
  let currentRow = [];
  let currentVal = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentVal);
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip \n in CRLF
      }
      currentRow.push(currentVal);
      currentVal = '';
      if (currentRow.some(c => c.trim().length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentVal += char;
    }
  }

  if (currentVal.length > 0 || currentRow.length > 0) {
    currentRow.push(currentVal);
    if (currentRow.some(c => c.trim().length > 0)) {
      rows.push(currentRow);
    }
  }

  if (rows.length < 2) return [];
  const headers = rows[0].map(h => h.trim());
  const parsedObjects = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = row[idx] !== undefined ? row[idx] : '';
    });
    parsedObjects.push(obj);
  }

  return parsedObjects;
}

function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Multi-category tag generator
function generateMultiCategories(location, title, description, isInternational = false) {
  const combined = `${location} ${title} ${description}`.toLowerCase();
  const categories = new Set();

  if (isInternational) {
    categories.add('International');
    categories.add('International Tours');
  } else {
    categories.add('National');
    categories.add('Domestic');
    categories.add('India Tours');
  }

  // Mountains & Snow
  if (combined.includes('kashmir') || combined.includes('gulmarg') || combined.includes('pahalgam') ||
      combined.includes('himachal') || combined.includes('manali') || combined.includes('shimla') ||
      combined.includes('dharamshala') || combined.includes('dalhousie') || combined.includes('spiti') ||
      combined.includes('ladakh') || combined.includes('leh') || combined.includes('uttarakhand') ||
      combined.includes('mussoorie') || combined.includes('nainital') || combined.includes('swiss') ||
      combined.includes('alps') || combined.includes('snow') || combined.includes('mountain') ||
      combined.includes('pines') || combined.includes('hills')) {
    categories.add('Mountain & Snow');
    categories.add('Hills & Mountains');
    categories.add('Winter Wonderland');
    categories.add('Winter');
    categories.add('Summer');
  }

  // Beach & Coastal / Tropical
  if (combined.includes('goa') || combined.includes('andaman') || combined.includes('havelock') ||
      combined.includes('phuket') || combined.includes('krabi') || combined.includes('phi phi') ||
      combined.includes('bali') || combined.includes('maldives') || combined.includes('beach') ||
      combined.includes('island') || combined.includes('coastal') || combined.includes('snorkeling')) {
    categories.add('Beach & Coastal');
    categories.add('Island Explorer');
    categories.add('Summer Escapes');
    categories.add('Summer');
  }

  // Honeymoon & Romantic
  if (combined.includes('honeymoon') || combined.includes('couple') || combined.includes('romantic') ||
      combined.includes('kashmir') || combined.includes('bali') || combined.includes('maldives') ||
      combined.includes('swiss') || combined.includes('paris') || combined.includes('udaipur') ||
      combined.includes('villa') || combined.includes('escape') || combined.includes('affair')) {
    categories.add('Honeymoon & Romantic');
    categories.add('Couple Trips');
  }

  // Family & Group
  categories.add('Family & Group');
  categories.add('Family Tours');

  // Friends & Solo Travel
  if (combined.includes('goa') || combined.includes('ladakh') || combined.includes('spiti') ||
      combined.includes('manali') || combined.includes('kasol') || combined.includes('thailand') ||
      combined.includes('phuket') || combined.includes('vietnam') || combined.includes('dubai') ||
      combined.includes('adventure') || combined.includes('trekking') || combined.includes('safari') ||
      combined.includes('vibe') || combined.includes('explorer')) {
    categories.add('Friends Travel');
    categories.add('Solo Trips');
    categories.add('Adventure & Trekking');
  }

  // Heritage, Palaces & Culture
  if (combined.includes('rajasthan') || combined.includes('jaipur') || combined.includes('udaipur') ||
      combined.includes('jodhpur') || combined.includes('jaisalmer') || combined.includes('mysore') ||
      combined.includes('hampi') || combined.includes('fort') || combined.includes('palace') ||
      combined.includes('heritage') || combined.includes('culture') || combined.includes('vietnam') ||
      combined.includes('ganga') || combined.includes('haridwar') || combined.includes('kashi')) {
    categories.add('Heritage & Palaces');
    categories.add('Culture & Heritage');
  }

  // Wildlife, Backwaters & Nature
  if (combined.includes('kerala') || combined.includes('munnar') || combined.includes('alleppey') ||
      combined.includes('thekkady') || combined.includes('coorg') || combined.includes('bandipur') ||
      combined.includes('pachmarhi') || combined.includes('madhai') || combined.includes('safari') ||
      combined.includes('national park') || combined.includes('corbett')) {
    categories.add('Wildlife & Nature');
    categories.add('Backwaters & Nature');
    categories.add('Monsoon');
  }

  // Desert Safari & Ultra Luxury
  if (combined.includes('dubai') || combined.includes('abu dhabi') || combined.includes('jaisalmer') ||
      combined.includes('desert') || combined.includes('dunes') || combined.includes('burj')) {
    categories.add('Desert Safari & Dunes');
    categories.add('Ultra Luxury');
  }

  // Destination Specific Tags
  if (combined.includes('kashmir') || combined.includes('srinagar')) categories.add('Kashmir');
  if (combined.includes('himachal') || combined.includes('manali') || combined.includes('dharamshala') || combined.includes('dalhousie')) categories.add('Himachal');
  if (combined.includes('goa')) categories.add('Goa');
  if (combined.includes('kerala') || combined.includes('alleppey') || combined.includes('munnar')) categories.add('Kerala');
  if (combined.includes('rajasthan') || combined.includes('jaipur') || combined.includes('udaipur')) categories.add('Rajasthan');
  if (combined.includes('andaman')) categories.add('Andaman');
  if (combined.includes('karnataka') || combined.includes('coorg') || combined.includes('mysore') || combined.includes('bangalore')) categories.add('Karnataka');
  if (combined.includes('uttarakhand') || combined.includes('rishikesh') || combined.includes('haridwar') || combined.includes('mussoorie')) categories.add('Uttarakhand');
  if (combined.includes('thailand') || combined.includes('phuket') || combined.includes('krabi') || combined.includes('bangkok')) categories.add('Thailand');
  if (combined.includes('bali') || combined.includes('indonesia')) categories.add('Bali');
  if (combined.includes('dubai') || combined.includes('uae')) categories.add('Dubai');
  if (combined.includes('singapore')) categories.add('Singapore');
  if (combined.includes('vietnam')) categories.add('Vietnam');
  if (combined.includes('japan') || combined.includes('tokyo') || combined.includes('kyoto')) categories.add('Japan');
  if (combined.includes('europe') || combined.includes('rome') || combined.includes('zurich') || combined.includes('swiss')) categories.add('Europe');

  // Always add luxury signature tag
  categories.add('Luxury Signature');

  return Array.from(categories);
}


function extractTextListFromWixJson(rawStr) {
  if (!rawStr) return [];
  if (typeof rawStr !== 'string') return [];
  const trimmed = rawStr.trim();
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
    return trimmed.split(/\r?\n|;/).map(s => s.replace(/^[•\-\*\s]+/, '').trim()).filter(Boolean);
  }
  try {
    const json = JSON.parse(trimmed);
    const items = [];
    function walk(node) {
      if (!node) return;
      if (node.textData && node.textData.text) {
        const t = node.textData.text.replace(/^[•\-\*\s]+/, '').trim();
        if (t && t.length > 1 && !t.includes('font_8') && !t.startsWith('<') && !t.startsWith('{')) {
          items.push(t);
        }
      }
      if (Array.isArray(node.nodes)) {
        node.nodes.forEach(walk);
      }
    }
    walk(json);
    return items;
  } catch {
    return [trimmed.replace(/^[•\-\*\s]+/, '').trim()];
  }
}

function extractRichItineraryFromWixJson(rawStr, defaultLocation) {
  if (!rawStr) return [];
  const list = extractTextListFromWixJson(rawStr);
  if (list.length === 0) return [];

  const days = [];
  let currentDay = null;

  for (const text of list) {
    const dayMatch = text.match(/^(?:Day\s*(\d+)[:\s\-–—]*|(\d+)(?:st|nd|rd|th)\s*Day[:\s\-–—]*)(.*)/i);
    if (dayMatch) {
      const dayNum = parseInt(dayMatch[1] || dayMatch[2], 10);
      const dayTitle = (dayMatch[3] || '').trim();
      currentDay = {
        day: dayNum || (days.length + 1),
        title: dayTitle ? `Day ${dayNum || (days.length + 1)}: ${dayTitle}` : `Day ${dayNum || (days.length + 1)}: Exploration & Sightseeing`,
        desc: ''
      };
      days.push(currentDay);
    } else if (currentDay) {
      if (currentDay.desc) {
        currentDay.desc += ' ' + text;
      } else {
        currentDay.desc = text;
      }
    } else {
      currentDay = {
        day: 1,
        title: `Day 1: ${text}`,
        desc: text
      };
      days.push(currentDay);
    }
  }

  return days.map(d => ({
    day: d.day,
    title: d.title,
    desc: d.desc || `Scenic exploration and guided sightseeing in ${defaultLocation}.`,
    stayTier: '4-Star / 5-Star Luxury Stay',
    transport: 'Dedicated Private AC Cab & Chauffeur',
    meals: 'Daily Breakfast & Dinner'
  }));
}

// Convert single row into tour package
function transformWixTourRow(wixRow, isInternational = false) {
  const rawTitle = wixRow.Title || wixRow.Name || wixRow.PackageTitle || '';
  if (!rawTitle || rawTitle.includes('font_8') || rawTitle.includes('disposal') || rawTitle.startsWith('<') || rawTitle.startsWith('{')) {
    return null;
  }

  const cleanName = cleanWixField(rawTitle);
  if (!cleanName || cleanName.length < 3) return null;

  const rawSlug = slugify(cleanName);
  const slug = rawSlug.slice(0, 55).replace(/-+$/, '');
  const name = cleanName;
  
  const rawLocation = wixRow.Destination || wixRow.City || wixRow.Location || wixRow.State || (isInternational ? 'International' : 'India');
  const location = cleanWixField(rawLocation, isInternational ? 'International' : 'India');

  const rawDuration = wixRow.Days || wixRow.Duration || '5 Nights & 6 Days';
  const duration = cleanWixField(rawDuration, '5 Nights & 6 Days');

  // Parse clean numerical price
  const rawDiscountedPrice = wixRow['Discounted Total Price'] || wixRow['Offer Price'] || wixRow.Price || wixRow.SalePrice || wixRow['Pricing Per Person'] || '';
  const price = parseCleanPrice(rawDiscountedPrice, isInternational ? 49999 : 24999);
  
  const rawTotalPrice = wixRow['Total Price'] || wixRow.ComparePrice || wixRow.OriginalPrice || '';
  const origPrice = rawTotalPrice ? parseCleanPrice(rawTotalPrice, Math.round(price * 1.25)) : Math.round(price * 1.25);

  const rawDescription = wixRow.Description || wixRow.Overview || `Handcrafted ${duration} tour to ${location} curated by Comfort Journey since 1992.`;
  const tagline = cleanWixField(rawDescription);

  // Multi-Categories
  const categories = generateMultiCategories(location, name, tagline, isInternational);

  // Media Migration: Replace Wix CDN URLs with curated photography
  const legacyWixUrl = wixRow.Image || wixRow.WixImageUrl || wixRow.CoverImage || '';
  const cleanImage = resolveDestinationImage(location, name, categories[0] || 'Luxury Signature', legacyWixUrl);

  // Exact Inclusions parsing from Wix Rich Text / JSON
  let inclusions = extractTextListFromWixJson(wixRow.Inclusions);
  if (!inclusions || inclusions.length === 0) {
    inclusions = ['Hotel Accommodation', 'Daily Breakfast', 'Sightseeing & Transfers', 'Driver Allowance & Tolls', '24/7 VIP Concierge'];
  }

  // Exact Exclusions parsing from Wix Rich Text / JSON
  let exclusions = extractTextListFromWixJson(wixRow.Exclusions);
  if (!exclusions || exclusions.length === 0) {
    exclusions = ['Personal Expenses & Laundry', 'Monument Entry Tickets', 'Flight / Train Tickets (unless booked)', 'Anything not mentioned in Inclusions'];
  }

  // Exact Itinerary parsing
  let itinerary = extractRichItineraryFromWixJson(wixRow.Itinerary, location);

  if (itinerary.length === 0) {
    for (let d = 1; d <= 10; d++) {
      const dayTitle = wixRow[`Day${d}_Title`] || wixRow[`Day_${d}_Title`] || wixRow[`Day${d}`];
      const dayDesc = wixRow[`Day${d}_Desc`] || wixRow[`Day_${d}_Desc`] || wixRow[`Day${d}_Description`];
      if (dayTitle || dayDesc) {
        itinerary.push({
          day: d,
          title: cleanWixField(dayTitle, `Day ${d} - Highlights & Exploration`),
          desc: cleanWixField(dayDesc, `Explore the scenic beauty and historical heritage of ${location} with private chauffeur assistance.`),
          stayTier: '4-Star / 5-Star Luxury Stay',
          transport: 'Dedicated Private AC Cab & Chauffeur',
          meals: 'Daily Breakfast & Dinner'
        });
      }
    }
  }

  // Fallback itinerary if none provided in CSV
  if (itinerary.length === 0) {
    itinerary.push(
      { day: 1, title: 'Day 1: Arrival & VIP Check-In', desc: `VIP airport greeting and transfer to verified hotel in ${location}.`, stayTier: 'Luxury Property', transport: 'Private AC Cab', meals: 'Dinner' },
      { day: 2, title: 'Day 2: Signature Sightseeing & Excursions', desc: `Guided full-day tour covering major attractions and viewpoints.`, stayTier: 'Luxury Property', transport: 'Private AC Cab', meals: 'Breakfast & Dinner' },
      { day: 3, title: 'Day 3: Leisure, Cultural Highlights & Departure', desc: `Morning breakfast, souvenir shopping, and chauffeur airport transfer.`, stayTier: 'Check-out', transport: 'Private AC Cab', meals: 'Breakfast' }
    );
  }

  const durationDays = parseInt(duration.replace(/[^0-9]/g, '').slice(0, 2), 10) || itinerary.length || 5;

  return {
    id: `tour-wix-${slug}`,
    wixId: wixRow.ID || wixRow.HandleId || `wix-${Date.now()}`,
    name,
    slug,
    location,
    city: cleanWixField(wixRow.City || location),
    state: cleanWixField(wixRow.State || (isInternational ? 'International' : 'India')),
    continent: isInternational ? (location.toLowerCase().includes('switz') || location.toLowerCase().includes('europe') || location.toLowerCase().includes('rome') ? 'Europe' : 'Asia') : 'Asia',
    country: location.includes(',') ? location.split(',')[1].trim() : (isInternational ? (location.toLowerCase().includes('bali') ? 'Indonesia' : (location.toLowerCase().includes('phuket') || location.toLowerCase().includes('thailand') ? 'Thailand' : (location.toLowerCase().includes('dubai') ? 'UAE' : (location.toLowerCase().includes('japan') || location.toLowerCase().includes('tokyo') ? 'Japan' : 'International')))) : 'India'),
    category: isInternational ? 'International Tours' : 'National Tours',
    categories,
    tags: categories,
    duration,
    durationDays,
    price,
    origPrice,
    originalPrice: origPrice,
    tagline,
    description: tagline,
    image: cleanImage,
    legacyWixUrl: isWixOrLegacyUrl(legacyWixUrl) ? '[REPLACED WIX CDN ASSET]' : legacyWixUrl,
    badge: isInternational ? 'International Signature' : 'National Signature',
    rating: 4.95,
    reviews: 96,
    reviewsCount: 96,
    inclusions,
    exclusions,
    itinerary,
    status: 'published',
    isVisible: true
  };
}

async function runFullMigration() {
  console.log('🚀 [Migration] Starting Master Wix Data Migration & Multi-Category Tagging...');

  const nationalCsvPath = path.resolve(__dirname, '../WIX CMS Old Data/National+Tour+Packages.csv');
  const internationalCsvPath = path.resolve(__dirname, '../WIX CMS Old Data/International+Tour+Packages.csv');

  const allPackages = [];
  const seenSlugs = new Set();

  // 1. Process National Packages
  if (fs.existsSync(nationalCsvPath)) {
    console.log(`📂 [National] Reading: ${nationalCsvPath}`);
    const natCsv = fs.readFileSync(nationalCsvPath, 'utf8');
    const natRows = parseFullCsv(natCsv);
    console.log(`🔍 [National] Detected ${natRows.length} real rows.`);

    for (const row of natRows) {
      if (!row.Title && !row.Name) continue;
      const pkg = transformWixTourRow(row, false);
      if (pkg && pkg.slug) {
        let finalSlug = pkg.slug;
        let counter = 2;
        while (seenSlugs.has(finalSlug)) {
          finalSlug = `${pkg.slug}-${counter}`;
          counter++;
        }
        seenSlugs.add(finalSlug);
        pkg.slug = finalSlug;
        pkg.id = `tour-wix-${finalSlug}`;
        allPackages.push(pkg);
      }
    }
  }

  // 2. Process International Packages
  if (fs.existsSync(internationalCsvPath)) {
    console.log(`📂 [International] Reading: ${internationalCsvPath}`);
    const intCsv = fs.readFileSync(internationalCsvPath, 'utf8');
    const intRows = parseFullCsv(intCsv);
    console.log(`🔍 [International] Detected ${intRows.length} real rows.`);

    for (const row of intRows) {
      if (!row.Title && !row.Name) continue;
      const pkg = transformWixTourRow(row, true);
      if (pkg && pkg.slug) {
        let finalSlug = pkg.slug;
        let counter = 2;
        while (seenSlugs.has(finalSlug)) {
          finalSlug = `${pkg.slug}-${counter}`;
          counter++;
        }
        seenSlugs.add(finalSlug);
        pkg.slug = finalSlug;
        pkg.id = `tour-wix-${finalSlug}`;
        allPackages.push(pkg);
      }
    }
  }

  console.log(`✨ [Total Migrated] Successfully processed ${allPackages.length} distinct Real Tour Packages!`);

  // Extract static constants from git history
  const { execSync } = await import('child_process');
  const oldContent = execSync('git show 7367223:src/data/toursData.js', { maxBuffer: 10 * 1024 * 1024 }).toString();
  
  const weatherPart = oldContent.slice(0, oldContent.indexOf('export const HERO_SLIDES = ['));
  const afterTours = oldContent.slice(oldContent.indexOf('export const REELS_DATA = ['));

  const realHeroSlides = `export const HERO_SLIDES = [
  {
    id: "peace-in-the-pines",
    tag: "Himachal Mountain Royalty",
    title: "Peace In The Pines: Dharamshala & Dalhousie",
    subtitle: "Tibetan monasteries, Khajjiar alpine meadows & pine forest retreats with private chauffeur.",
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1920&q=85",
    location: "Dharamshala & Dalhousie, India",
    startingPrice: 94012
  },
  {
    id: "essence-of-europe",
    tag: "European Signature",
    title: "Essence of Europe: Rome, Milan & Zurich",
    subtitle: "Swiss alpine lakes, Italian renaissance architecture & high-speed rail luxury.",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1920&q=85",
    location: "Rome, Milan, Ferrara & Zurich",
    startingPrice: 387104
  },
  {
    id: "bali-tropical-escape",
    tag: "Tropical Paradise",
    title: "Bali Tropical Escape: Ubud & Seminyak",
    subtitle: "Private jungle pool villas, sacred temples & clifftop ocean sunset dinners.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=85",
    location: "Ubud & Seminyak, Indonesia",
    startingPrice: 62710
  },
  {
    id: "dubai-city-sands",
    tag: "Futuristic Luxury",
    title: "Dubai City & Sands: Skyline & Red Dunes",
    subtitle: "Burj Khalifa VIP decks, red dune safari & private yacht dinner cruise.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85",
    location: "Dubai & Abu Dhabi, UAE",
    startingPrice: 113503
  },
  {
    id: "phuket-paradise-getaway",
    tag: "Island Odyssey",
    title: "Phuket Paradise Getaway & Phi Phi",
    subtitle: "Speedboat island hopping, Maya Bay snorkeling & luxury beachfront stays.",
    image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1920&q=85",
    location: "Phuket & Krabi, Thailand",
    startingPrice: 71047
  },
  {
    id: "karnataka-heritage-hills",
    tag: "South India Heritage",
    title: "Karnataka Heritage & Hills: Coorg & Mysore",
    subtitle: "Mysore Royal Palace, lush Coorg coffee plantations & Western Ghats retreats.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1920&q=85",
    location: "Coorg, Mysore & Bangalore",
    startingPrice: 141360
  }
];

`;

  const toursDataFilePath = path.resolve(__dirname, '../src/data/toursData.js');

  const fileContent = `${weatherPart}${realHeroSlides}
export const TOURS_DATA = ${JSON.stringify(allPackages, null, 2)};

export default TOURS_DATA;

${afterTours}
`;

  fs.writeFileSync(toursDataFilePath, fileContent, 'utf8');
  console.log(`✅ [Updated] Successfully wrote ${allPackages.length} real tour packages to: ${toursDataFilePath}`);

  // Also save a directus seed JSON in cms/
  const directusSeedPath = path.resolve(__dirname, '../cms/migrated-wix-packages.json');
  fs.writeFileSync(directusSeedPath, JSON.stringify(allPackages, null, 2), 'utf8');
  console.log(`💾 [Saved] Exported clean JSON seed to: ${directusSeedPath}`);
}

runFullMigration().catch(err => {
  console.error('❌ [Migration] Error:', err);
});
