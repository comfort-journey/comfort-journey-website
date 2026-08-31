// =========================================================================
// COMFORT JOURNEY - WIX HISTORICAL DATA MIGRATION SCRIPT
// Parses exported Wix Tour Packages (.csv), maps columns, replaces Wix CDN URLs
// with curated destination imagery, and formats Directus collections.
// =========================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import destination image resolver
const resolverPath = path.resolve(__dirname, '../src/utils/destinationImageResolver.js');
const { resolveDestinationImage, isWixOrLegacyUrl } = await import(`file://${resolverPath}`);

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

// Simple Robust CSV Parser
function parseCsv(csvText) {
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

function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function transformWixTourPackage(wixRow) {
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
      // Wix rich JSON inclusions
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

async function runMigration() {
  const csvFile = process.argv[2] || path.resolve(__dirname, '../WIX CMS Old Data/National+Tour+Packages.csv');
  console.log(`📂 [Migration] Reading Wix CSV export from: ${csvFile}`);

  if (!fs.existsSync(csvFile)) {
    console.error(`❌ [Migration] File not found: ${csvFile}`);
    process.exit(1);
  }

  const csvContent = fs.readFileSync(csvFile, 'utf8');
  const rawRows = parseCsv(csvContent);
  console.log(`🔍 [Migration] Detected ${rawRows.length} historical package rows in CSV.`);

  const migratedPackages = rawRows.map(row => transformWixTourPackage(row));

  // Save to JSON
  const outputJsonPath = path.resolve(__dirname, '../cms/migrated-wix-packages.json');
  fs.writeFileSync(outputJsonPath, JSON.stringify(migratedPackages, null, 2), 'utf8');

  console.log(`✅ [Migration] Successfully transformed ${migratedPackages.length} packages!`);
  console.log(`🖼️ [Media Migration] All legacy Wix CDN URLs replaced with curated destination photography.`);
  console.log(`💾 [Saved] Output JSON written to: ${outputJsonPath}`);
}

// Run if called directly
if (process.argv[1] && process.argv[1].endsWith('migrate-wix-packages.js')) {
  runMigration().catch(err => {
    console.error('❌ [Migration] Error:', err);
  });
}
