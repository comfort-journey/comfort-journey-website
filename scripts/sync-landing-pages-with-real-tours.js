import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toursDataPath = path.resolve(__dirname, '../src/data/toursData.js');
const { TOURS_DATA } = await import(`file://${toursDataPath}`);

const nationalTours = TOURS_DATA.filter(t => t.category === 'National Tours');
const intlTours = TOURS_DATA.filter(t => t.category === 'International Tours');

console.log(`📦 [Sync] Loaded ${TOURS_DATA.length} real tour packages (${nationalTours.length} National, ${intlTours.length} International).`);

// Helper to pick matching tours
function pickTours(keywords, isIntl = false, count = 6) {
  const source = isIntl ? intlTours : nationalTours;
  const lowerKeys = (keywords || []).map(k => k.toLowerCase());
  
  let matches = source.filter(t => {
    const combined = `${t.name} ${t.location} ${t.tagline} ${(t.categories || []).join(' ')}`.toLowerCase();
    return lowerKeys.some(k => combined.includes(k));
  });

  if (matches.length < count) {
    // Fill with remaining from source
    const remaining = source.filter(t => !matches.includes(t));
    matches = [...matches, ...remaining];
  }

  return matches.slice(0, count).map(t => ({
    name: t.name,
    tag: t.tagline,
    price: t.price,
    origPrice: t.origPrice || Math.round(t.price * 1.25),
    duration: t.duration,
    tourId: t.id,
    img: t.image
  }));
}

// 1. Update landingPagesData.js
const landingPagesDataPath = path.resolve(__dirname, '../src/data/landingPagesData.js');
let lpContent = fs.readFileSync(landingPagesDataPath, 'utf8');

const categoryKeywordMap = {
  "solo-travel": { india: ['goa', 'spiti', 'pines', 'hills', 'vibe', 'explorer'], intl: ['bali', 'vietnam', 'phuket', 'singapore'] },
  "family-travel": { india: ['karnataka', 'pachmarhi', 'bhopal', 'ganga', 'hills', 'heritage'], intl: ['singapore', 'dubai', 'asia', 'phuket'] },
  "couple-honeymoon": { india: ['goa', 'pines', 'hills', 'ganga', 'affair', 'heritage'], intl: ['bali', 'phuket', 'vietnam', 'colombo'] },
  "group-travel": { india: ['goa', 'rajasthan', 'karnataka', 'pines', 'hills', 'bhopal'], intl: ['dubai', 'asia', 'singapore', 'phuket'] },
  "corporate-travel": { india: ['goa', 'karnataka', 'bhopal', 'rajasthan', 'hills'], intl: ['dubai', 'singapore', 'asia', 'vietnam'] },
  "school-college-trips": { india: ['pachmarhi', 'bhopal', 'ganga', 'pines', 'karnataka', 'goa'], intl: ['singapore', 'dubai', 'asia'] },
  "weekend-getaways": { india: ['goa', 'ganga', 'pachmarhi', 'bhopal', 'hills'], intl: ['dubai', 'colombo', 'phuket'] },
  "fixed-departures": { india: ['ganga', 'pines', 'karnataka', 'rajasthan', 'bhopal'], intl: ['asia', 'dubai', 'singapore', 'bali'] },
  "india-packages": { india: ['pines', 'karnataka', 'goa', 'ganga', 'rajasthan', 'pachmarhi'], intl: [] },
  "international-packages": { india: [], intl: ['phuket', 'vietnam', 'bali', 'cherry blossom', 'colombo', 'singapore', 'asia', 'europe', 'dubai'] },
  "adventure-tours": { india: ['spiti', 'pines', 'hills', 'ganga', 'madhai', 'goa'], intl: ['vietnam', 'bali', 'phuket', 'dubai'] },
  "beach-vacations": { india: ['goa'], intl: ['phuket', 'bali', 'colombo', 'asia'] },
  "mountain-escapes": { india: ['pines', 'hills', 'ganga', 'dharamshala', 'dalhousie', 'mussoorie'], intl: ['europe', 'colombo'] },
  "summer-packages": { india: ['pines', 'hills', 'ganga', 'dharamshala', 'goa'], intl: ['cherry blossom', 'bali', 'phuket', 'europe'] },
  "winter-packages": { india: ['pines', 'rajasthan', 'karnataka', 'bhopal', 'ganga'], intl: ['dubai', 'vietnam', 'singapore', 'colombo'] }
};

console.log('🔄 [Sync] Updating Landing Pages with Real Tour Packages...');

// For each landing page slug, update destinationsIndia and destinationsIntl
for (const [slug, keyw] of Object.entries(categoryKeywordMap)) {
  const indiaTours = pickTours(keyw.india, false, 6);
  const intlToursList = pickTours(keyw.intl, true, 6);

  // Match the block for this slug
  const slugRegex = new RegExp(`("${slug}":\\s*{[\\s\\S]*?destinationsIndia:\\s*\\[)[\\s\\S]*?(\\]\\s*,\\s*destinationsIntl:\\s*\\[)[\\s\\S]*?(\\])`);
  
  if (slugRegex.test(lpContent)) {
    const formattedIndia = JSON.stringify(indiaTours, null, 8).slice(1, -1).trim();
    const formattedIntl = JSON.stringify(intlToursList, null, 8).slice(1, -1).trim();
    
    lpContent = lpContent.replace(slugRegex, `$1\n        ${formattedIndia}\n      $2\n        ${formattedIntl}\n      $3`);
  }
}

fs.writeFileSync(landingPagesDataPath, lpContent, 'utf8');
console.log('✅ [Updated] Successfully updated src/data/landingPagesData.js with Real Wix Tours!');
