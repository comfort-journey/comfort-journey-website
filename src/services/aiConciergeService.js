import { TOURS_DATA } from '../data/toursData';
import { BLOGS_DATA } from '../data/blogsData';
import { DESTINATION_WAYPOINTS, resolveDestinationWaypoints } from '../data/destinationWaypoints';

/**
 * Comfy.ai - Comfort Journey's AI Travel Assistant (Est. 1992)
 * Inspired by KAYAK's conversational natural-language freedom and Trip.com's split-screen map & route engine.
 * Understands free-text prompts like:
 * "7 days in Kashmir for parents who need relaxed pacing, pure veg meals, and a private Innova Hycross"
 */

// Popular conversational prompts travelers can click or type
export const QUICK_PROMPTS = [
  {
    category: 'Conversational Ideas',
    icon: 'Compass',
    questions: [
      '7 days in Kashmir for parents: relaxed pacing, pure veg meals & private Innova Hycross',
      '5 days Bali honeymoon with private pool villa, sunset dinner & temple tour',
      '4 days Dubai family vacation with kids: desert safari, aquarium & Burj Khalifa',
      '6 days Switzerland scenic train holiday with cozy mountain chalets'
    ]
  },
  {
    category: 'Stays & Pacing',
    icon: 'Sparkles',
    questions: [
      'Show relaxed trips for senior citizens with minimal walking and easy car travel',
      'What hotels are included in your 5-star packages?',
      'Do you provide private AC cars with courteous drivers on all tours?',
      'Can you personalize our daily schedule to include pure vegetarian or Jain meals?'
    ]
  },
  {
    category: 'Travel Help & Tips',
    icon: 'ShieldCheck',
    questions: [
      'What is the best month to visit Kashmir for snow?',
      'How does your 24/7 travel manager assist during the trip?',
      'What should I pack for Gulmarg in winter?'
    ]
  }
];

// Helper: Extract relevant tours from TOURS_DATA based on user query
export function findMatchingTours(query, limit = 3) {
  if (!query) return [];
  const q = query.toLowerCase().trim();

  const scored = TOURS_DATA.map(tour => {
    let score = 0;
    const name = (tour.name || '').toLowerCase();
    const loc = (tour.location || '').toLowerCase();
    const country = (tour.country || '').toLowerCase();
    const desc = (tour.desc || tour.tagline || '').toLowerCase();
    const cats = (tour.categories || []).map(c => c.toLowerCase());
    const tags = (tour.tags || []).map(t => t.toLowerCase());

    if (name.includes(q)) score += 10;
    if (country.includes(q) || loc.includes(q)) score += 8;
    if (q.includes(country) || q.includes(loc)) score += 6;
    if (cats.some(c => q.includes(c) || c.includes(q))) score += 4;
    if (tags.some(t => q.includes(t) || t.includes(q))) score += 3;
    if (desc.includes(q)) score += 2;

    const keywords = ['kashmir', 'bali', 'dubai', 'vietnam', 'europe', 'switzerland', 'phuket', 'thailand', 'japan', 'shimla', 'manali', 'rajasthan', 'kerala', 'kedarnath', 'singapore', 'sri lanka', 'goa'];
    for (const kw of keywords) {
      if (q.includes(kw) && (name.includes(kw) || loc.includes(kw) || country.includes(kw))) {
        score += 7;
      }
    }

    if ((q.includes('honeymoon') || q.includes('romantic') || q.includes('couple')) && (name.includes('honeymoon') || cats.includes('honeymoon') || tags.includes('couple'))) score += 5;
    if ((q.includes('family') || q.includes('kids')) && (cats.includes('family') || tags.includes('family'))) score += 5;
    if ((q.includes('snow') || q.includes('ski') || q.includes('winter')) && (name.includes('snow') || loc.includes('kashmir') || loc.includes('swiss'))) score += 5;
    if ((q.includes('beach') || q.includes('island')) && (loc.includes('bali') || loc.includes('phuket') || loc.includes('goa') || loc.includes('andaman'))) score += 5;

    return { tour, score };
  });

  const filtered = scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score);
  return filtered.slice(0, limit).map(s => s.tour);
}

// Helper: Extract relevant blog insights
export function findMatchingBlogs(query, limit = 2) {
  if (!query) return [];
  const q = query.toLowerCase().trim();

  return BLOGS_DATA.filter(blog => {
    const title = (blog.title || '').toLowerCase();
    const excerpt = (blog.excerpt || '').toLowerCase();
    const tags = (blog.tags || []).map(t => t.toLowerCase());
    return title.includes(q) || excerpt.includes(q) || tags.some(t => q.includes(t) || t.includes(q));
  }).slice(0, limit);
}

/**
 * KAYAK-Style Natural Language Intent & Entity Parser
 * Understands conversational sentences like:
 * "7 days in Kashmir for parents who need relaxed pacing, pure veg meals, and a private Innova Hycross"
 */
export function parseTravelIntent(prompt) {
  if (!prompt) return null;
  const q = prompt.toLowerCase();

  // 1. Destination
  let destination = 'Kashmir';
  let destKey = 'kashmir';
  if (q.includes('bali') || q.includes('indonesia')) { destination = 'Bali, Indonesia'; destKey = 'bali'; }
  else if (q.includes('dubai') || q.includes('uae') || q.includes('abu dhabi')) { destination = 'Dubai, UAE'; destKey = 'dubai'; }
  else if (q.includes('swiss') || q.includes('switzerland') || q.includes('lucerne') || q.includes('interlaken') || q.includes('alps')) { destination = 'Switzerland'; destKey = 'switzerland'; }
  else if (q.includes('europe') || q.includes('paris') || q.includes('rome') || q.includes('italy') || q.includes('france')) { destination = 'Essence of Europe'; destKey = 'europe'; }
  else if (q.includes('vietnam') || q.includes('hanoi') || q.includes('da nang') || q.includes('halong')) { destination = 'Vietnam'; destKey = 'vietnam'; }
  else if (q.includes('thailand') || q.includes('phuket') || q.includes('krabi') || q.includes('bangkok')) { destination = 'Phuket & Krabi, Thailand'; destKey = 'thailand'; }
  else if (q.includes('japan') || q.includes('tokyo') || q.includes('kyoto') || q.includes('fuji')) { destination = 'Tokyo & Kyoto, Japan'; destKey = 'japan'; }
  else if (q.includes('singapore')) { destination = 'Singapore'; destKey = 'singapore'; }
  else if (q.includes('kerala') || q.includes('munnar') || q.includes('alleppey') || q.includes('cochin')) { destination = 'Kerala Backwaters'; destKey = 'kerala'; }
  else if (q.includes('rajasthan') || q.includes('jaipur') || q.includes('udaipur') || q.includes('jodhpur')) { destination = 'Rajasthan Heritage'; destKey = 'rajasthan'; }
  else if (q.includes('himachal') || q.includes('manali') || q.includes('shimla') || q.includes('solang')) { destination = 'Himachal Hills'; destKey = 'himachal'; }
  else if (q.includes('kedarnath') || q.includes('char dham') || q.includes('rishikesh') || q.includes('uttarakhand')) { destination = 'Kedarnath & Uttarakhand'; destKey = 'kedarnath'; }
  else if (q.includes('maldives')) { destination = 'Maldives'; destKey = 'maldives'; }
  else if (q.includes('andaman') || q.includes('havelock')) { destination = 'Andaman Islands'; destKey = 'andaman'; }
  else if (q.includes('goa')) { destination = 'Goa Beaches'; destKey = 'goa'; }
  else {
    // Check if user specified another country or city in TOURS_DATA
    const matched = findMatchingTours(prompt, 1);
    if (matched.length > 0) {
      destination = matched[0].location || matched[0].country || matched[0].name;
      destKey = destination.toLowerCase().replace(/[^a-z0-9]/g, '_');
    }
  }

  // 2. Duration (e.g. "7 days", "5 nights", "4d3n")
  let durationDays = 5;
  const daysMatch = q.match(/(\d+)\s*(days|day|d\b|nights|night|n\b)/i);
  if (daysMatch) {
    const num = parseInt(daysMatch[1], 10);
    if (num >= 2 && num <= 21) durationDays = num;
  } else if (q.includes('weekend')) {
    durationDays = 3;
  } else if (q.includes('week')) {
    durationDays = 7;
  }

  // 3. Travelers / Party Type
  let party = 'Family / Couple';
  if (q.includes('parent') || q.includes('senior') || q.includes('elderly') || q.includes('mom') || q.includes('dad')) {
    party = 'Parents & Seniors';
  } else if (q.includes('honeymoon') || q.includes('couple') || q.includes('romantic') || q.includes('anniversary')) {
    party = 'Couple / Honeymoon';
  } else if (q.includes('kid') || q.includes('children') || q.includes('child') || q.includes('family')) {
    party = 'Family with Children';
  } else if (q.includes('friend') || q.includes('group') || q.includes('bachelor') || q.includes('colleague')) {
    party = 'Friends & Group';
  } else if (q.includes('solo')) {
    party = 'Solo Traveler';
  }

  // 4. Pacing
  let pacing = 'Relaxed';
  if (q.includes('fast') || q.includes('packed') || q.includes('everything') || q.includes('all places') || q.includes('sightseer')) {
    pacing = 'Active Sightseer';
  } else if (q.includes('moderate') || q.includes('balanced') || q.includes('standard')) {
    pacing = 'Balanced Pace';
  } else {
    // Default to relaxed pacing for comfort journey
    pacing = 'Relaxed Pace (Gentle & Comfortable)';
  }

  // 5. Vehicle / Transportation
  let vehicle = 'Private Toyota Innova Crysta (AC)';
  if (q.includes('hycross') || q.includes('innova hycross')) {
    vehicle = 'Private Toyota Innova Hycross (Hybrid AC)';
  } else if (q.includes('sedan') || q.includes('dzire') || q.includes('etios')) {
    vehicle = 'Private AC Sedan (Dzire / Etios)';
  } else if (q.includes('fortuner') || q.includes('luxury car') || q.includes('mercedes') || q.includes('bmw')) {
    vehicle = 'Private Luxury SUV / Mercedes';
  } else if (q.includes('tempo') || q.includes('van') || q.includes('urbania')) {
    vehicle = 'Private AC Tempo Traveler / Urbania';
  }

  // 6. Meals & Dietary
  let dietary = 'Pure Vegetarian & Jain Friendly';
  if (q.includes('jain')) {
    dietary = '100% Jain Food (No Onion, No Garlic)';
  } else if (q.includes('halal')) {
    dietary = '100% Halal Friendly Dining';
  } else if (q.includes('non veg') || q.includes('meat') || q.includes('wazwan')) {
    dietary = 'Authentic Multi-Cuisine & Local Delicacies';
  } else if (q.includes('pure veg') || q.includes('veg') || q.includes('shakahari')) {
    dietary = '100% Pure Vegetarian';
  }

  // 7. Stay Preference
  let stayTier = '4★ Deluxe Boutique Hotel';
  if (q.includes('5 star') || q.includes('5-star') || q.includes('pool villa') || q.includes('resort') || q.includes('palace')) {
    stayTier = '5★ Luxury Resort / Private Pool Villa';
  } else if (q.includes('houseboat') || q.includes('heritage') || q.includes('chalet')) {
    stayTier = 'Heritage Pine Chalet & Dal Lake Houseboat';
  }

  return {
    rawPrompt: prompt,
    destination,
    destKey,
    durationDays,
    party,
    pacing,
    vehicle,
    dietary,
    stayTier,
    isCustomRequest: true
  };
}

/**
 * Generate a complete, ready-to-view Comfy.ai Trip Plan
 * from parsed conversational intent or default settings.
 */
export function generateComfyItinerary(parsedIntent) {
  const intent = parsedIntent || parseTravelIntent('7 days in Kashmir for parents with relaxed pacing');
  const waypointsData = resolveDestinationWaypoints(intent.destination, intent.destKey);

  // Slice or adjust days according to requested durationDays
  const requestedDays = intent.durationDays || 5;
  let rawDays = waypointsData.daysTemplate || [];
  
  // Generate unique daily itineraries and GPS coordinates
  let resultDays = [];
  const centerLat = waypointsData.center[0];
  const centerLng = waypointsData.center[1];

  for (let i = 0; i < requestedDays; i++) {
    if (i < rawDays.length) {
      const dayData = JSON.parse(JSON.stringify(rawDays[i]));
      dayData.day = i + 1;
      resultDays.push(dayData);
    } else {
      // Create a unique, customized exploration day for days beyond the template
      const isLastDay = i === requestedDays - 1;
      const angle = (i * 1.25) % (2 * Math.PI);
      const offsetLat = Math.sin(angle) * (0.04 + (i * 0.015));
      const offsetLng = Math.cos(angle) * (0.05 + (i * 0.015));

      if (isLastDay) {
        resultDays.push({
          day: i + 1,
          title: `Farewell ${intent.destination} & Airport Chauffeur Transfer`,
          travelDistance: '26 km · ~40 mins',
          summary: `Relaxed breakfast at your hotel, morning souvenir shopping for authentic local crafts, and smooth private transfer to the airport.`,
          stops: [
            {
              time: '09:00 AM',
              type: 'meal',
              title: `Farewell Breakfast at ${intent.stayTier.split('&')[0].trim()}`,
              subtitle: `Fresh continental and warm Indian dishes before checkout`,
              ticketStatus: 'Included in hotel package',
              duration: '1 hr',
              lat: centerLat + (offsetLat * 0.5),
              lng: centerLng + (offsetLng * 0.5),
              proximity: {
                transport: [{ name: 'Hotel Lobby Concierge', dist: '20m' }],
                landmarks: [{ name: 'Central Garden Walk', dist: '300m' }],
                dining: [{ name: 'In-House Patisserie', dist: '50m' }],
                shopping: [{ name: 'Hotel Gift Boutique', dist: '40m' }]
              }
            },
            {
              time: '11:00 AM',
              type: 'shopping',
              title: `${intent.destination} Artisan Crafts & Souvenir Bazaar`,
              subtitle: 'Exclusive shopping for genuine regional specialties, teas and handcrafts',
              ticketStatus: 'Complimentary private visit',
              duration: '1 hr 45 mins',
              lat: centerLat + offsetLat,
              lng: centerLng + offsetLng,
              proximity: {
                transport: [{ name: 'Market Valet Parking', dist: '50m' }],
                landmarks: [{ name: 'Old Town Clock Tower', dist: '200m' }],
                dining: [{ name: 'Heritage Sweet & Spice House', dist: '100m' }],
                shopping: [{ name: 'Government Emporium', dist: '150m' }]
              }
            },
            {
              time: '02:30 PM',
              type: 'transport',
              title: `VIP Chauffeur Drop-off at Airport`,
              subtitle: `Dedicated vehicle with luggage assistance for a comfortable departure`,
              ticketStatus: 'Included in package',
              duration: '45 mins',
              lat: centerLat - 0.06,
              lng: centerLng - 0.06,
              proximity: {
                transport: [{ name: 'Airport Departure Gates', dist: '30m' }],
                landmarks: [{ name: 'Aviation Memorial', dist: '800m' }],
                dining: [{ name: 'Airport Premium Lounge', dist: '50m' }],
                shopping: [{ name: 'Duty Free Arcade', dist: '100m' }]
              }
            }
          ]
        });
      } else {
        resultDays.push({
          day: i + 1,
          title: `Day ${i + 1}: Hidden Gems & Cultural Panorama of ${intent.destination}`,
          travelDistance: '38 km · ~1 hr 10 mins',
          summary: `Curated excursion away from the crowds to experience breathtaking viewpoints, local cultural landmarks, and serene countryside scenery.`,
          stops: [
            {
              time: '09:30 AM',
              type: 'sightseeing',
              title: `Panoramic Valley Viewpoint & Nature Walk`,
              subtitle: `Gentle guided walking trail with pristine photo stops and clean air`,
              ticketStatus: 'Entry pass included',
              duration: '2 hrs 15 mins',
              lat: centerLat + offsetLat,
              lng: centerLng + offsetLng,
              proximity: {
                transport: [{ name: 'Scenic Lookout Parking', dist: '60m' }],
                landmarks: [{ name: 'Alpine Viewpoint', dist: '150m' }],
                dining: [{ name: 'Cliffside Organic Tea Lounge', dist: '200m' }],
                shopping: [{ name: 'Handmade Souvenir Kiosks', dist: '250m' }]
              }
            },
            {
              time: '01:00 PM',
              type: 'meal',
              title: `Authentic Regional Lunch Experience`,
              subtitle: `Hand-selected restaurant prepared according to your dietary preferences`,
              ticketStatus: 'Arranged',
              duration: '1 hr 15 mins',
              lat: centerLat + (offsetLat * 0.8),
              lng: centerLng + (offsetLng * 1.1),
              proximity: {
                transport: [{ name: 'Dedicated Valet Bay', dist: '20m' }],
                landmarks: [{ name: 'Historic Fountain Square', dist: '180m' }],
                dining: [{ name: 'Pure Veg & Jain Special Kitchen', dist: 'In-house' }],
                shopping: [{ name: 'Spice & Herbal Market', dist: '300m' }]
              }
            },
            {
              time: '04:00 PM',
              type: 'sightseeing',
              title: `Historic Heritage Monument & Sunset Promenade`,
              subtitle: `Golden hour heritage walk with private chauffeur on standby`,
              ticketStatus: 'VIP entry included',
              duration: '2 hrs',
              lat: centerLat + (offsetLat * 1.2),
              lng: centerLng + (offsetLng * 0.7),
              proximity: {
                transport: [{ name: 'Monument West Gate Chauffeur Bay', dist: '40m' }],
                landmarks: [{ name: 'Royal Garden Promenade', dist: '100m' }],
                dining: [{ name: 'Heritage Courtyard Cafe', dist: '120m' }],
                shopping: [{ name: 'Traditional Craft Guilds', dist: '250m' }]
              }
            },
            {
              time: '07:30 PM',
              type: 'hotel',
              title: `Return to ${intent.stayTier.split('&')[0].trim()}`,
              subtitle: 'Rest, relaxation, and comfortable evening leisure',
              ticketStatus: 'Confirmed booking',
              duration: 'Overnight',
              lat: centerLat + 0.01,
              lng: centerLng + 0.01,
              proximity: {
                transport: [{ name: 'Hotel Porch', dist: '10m' }],
                landmarks: [{ name: 'City Waterfront', dist: '350m' }],
                dining: [{ name: 'Fine Dining Room', dist: 'In-house' }],
                shopping: [{ name: 'Lobby Boutiques', dist: 'In-house' }]
              }
            }
          ]
        });
      }
    }
  }

  // Adjust schedule details according to parsed party, vehicle, and dietary preferences
  resultDays.forEach((d) => {
    d.stops.forEach((stop) => {
      if (stop.type === 'transport' && intent.vehicle) {
        stop.subtitle = `${intent.vehicle} with courteous, verified driver`;
      }
      if (stop.type === 'meal' && intent.dietary) {
        stop.subtitle = `${stop.subtitle} · Arranged with ${intent.dietary}`;
      }
      if (stop.type === 'hotel' && intent.stayTier) {
        stop.subtitle = `${intent.stayTier} with verified hygiene and comfort`;
      }
    });
  });

  const PRICE_MAP = {
    kashmir: 28999,
    bali: 44999,
    dubai: 48999,
    switzerland: 89999,
    europe: 94999,
    vietnam: 46999,
    thailand: 39999,
    japan: 84999,
    singapore: 54999,
    kerala: 24999,
    rajasthan: 22999,
    himachal: 21999,
    kedarnath: 29999,
    maldives: 79999,
    andaman: 34999,
    goa: 18999
  };
  const estimatedPricePerPerson = PRICE_MAP[intent.destKey] || 49999;

  return {
    id: `comfy-trip-${Date.now()}`,
    title: `${intent.durationDays}-Day ${intent.pacing.split(' ')[0]} ${intent.destination} Holiday`,
    subtitle: `Personalized for ${intent.party} · ${intent.vehicle} · ${intent.dietary}`,
    destination: intent.destination,
    destKey: intent.destKey,
    duration: `${intent.durationDays} Days / ${intent.durationDays - 1} Nights`,
    durationDays: intent.durationDays,
    party: intent.party,
    pacing: intent.pacing,
    vehicle: intent.vehicle,
    dietary: intent.dietary,
    stayTier: intent.stayTier,
    price: estimatedPricePerPerson,
    center: waypointsData.center,
    days: resultDays,
    highlights: [
      `100% Private holiday with dedicated ${intent.vehicle}`,
      `Handpicked ${intent.stayTier} verified by Comfort Journey`,
      `Paced for ${intent.party}: ${intent.pacing}`,
      `Carefully planned meals: ${intent.dietary}`,
      `24/7 dedicated personal trip manager on WhatsApp & phone`
    ]
  };
}

// Fallback intelligent responder when Gemini API key is offline
function generateLocalSmartResponse(prompt) {
  const q = prompt.toLowerCase().trim();

  // 1. Competitor guardrail
  const competitorMatches = ['makemytrip', 'make my trip', 'thomas cook', 'booking.com', 'expedia', 'viator', 'airbnb', 'tripadvisor', 'yatra', 'goibibo'];
  if (competitorMatches.some(c => q.includes(c))) {
    return {
      reply: `At **Comfort Journey (Est. 1992)**, we are an independent travel house focused on **personalized, comfortable vacations**.\n\n✨ **The Comfort Journey Promise:**\n- **100% Private Trips:** Dedicated private AC car with courteous driver for your family.\n- **Verified Comfortable Stays:** Handpicked 4★ and 5★ hotels, pine chalets, and private pool villas.\n- **Dietary Peace of Mind:** Verified Pure Veg, Jain, and Halal dining arranged throughout.\n- **24/7 Direct Care:** Personal trip manager reachable anytime on WhatsApp (+91 8770403315).\n\nHow may I help plan your dream holiday?`,
      matchedTours: findMatchingTours('luxury', 2)
    };
  }

  // 2. Off-topic guardrail
  const offTopicKeywords = ['python', 'javascript', 'code', 'coding', 'recipe for cake', 'cricket score', 'movie review', 'politics', 'math', 'calculate', 'homework'];
  if (offTopicKeywords.some(kw => q.includes(kw)) && !q.includes('travel') && !q.includes('trip') && !q.includes('tour')) {
    return {
      reply: `Hi! I am **Comfy.ai**, your friendly travel assistant at **Comfort Journey (Est. 1992)**. 🌟\n\nI am exclusively here to help you plan smooth, memorable holidays across India and 2,000+ destinations worldwide. I can help with:\n- **Custom Tour Packages & Itineraries**\n- **Best Weather, Seasons & What to Pack**\n- **Private Cars, Drivers & Hotel Recommendations**\n- **Family, Senior Citizen & Honeymoon Vacations**\n\nWhich destination are you thinking about visiting?`,
      matchedTours: []
    };
  }

  // 3. Multilingual: Hindi / Hinglish detection
  const isHindi = /[\u0900-\u097F]/.test(prompt) || 
    /\b(kaise|kya|kab|jana|hoga|chahiye|kitna|kharcha|batao|kripya|namaste|kashmir|ghoomne)\b/i.test(prompt);

  // 4. Food & Dietary Queries
  if (q.includes('veg') || q.includes('jain') || q.includes('food') || q.includes('khana') || q.includes('halal') || q.includes('dining')) {
    const text = isHindi
      ? `**Comfort Journey पर भोजन व्यवस्था (Dining Care):** 🍲\n\nहाँ, हमारे सभी टूर्स में भारतीय, शुद्ध शाकाहारी (Pure Veg) और जैन भोजन (Jain Food) का पूरा ध्यान रखा जाता है:\n- **कस्टम रेस्टोरेंट बुकिंग:** चाहे आप कश्मीर, बाली, यूरोप या वियतनाम में हों, हमारे प्राइवेट ड्राइवर आपको जाँचे-परखे स्वच्छ भारतीय व शाकाहारी भोजनालयों में ले जाते हैं।\n- **होटल शेफ कोऑर्डिनेशन:** आपके होटल में बिना प्याज-लहसुन या विशेष डाइटरी ज़रूरतों का पहले से ही ध्यान रखा जाता है।\n- **कश्मीर में रॉयल वाजवान:** शाकाहारी व माँसाहारी दोनों स्वादों में ताज़ा काहवा और कश्मीरी ज़ायके!`
      : `**Comfort Journey Dining & Dietary Care:** 🍽️\n\nYes! We take your food preferences very seriously:\n- **Pure Vegetarian & Jain Meals:** Pre-arranged with verified clean Indian restaurants and hotels across Kashmir, Bali, Europe, Dubai, and Vietnam.\n- **Private Car Flexibility:** Your dedicated driver stops at verified vegetarian and family-friendly dining spots.\n- **Kashmiri Wazwan & Kahwa:** In Kashmir, enjoy authentic delicacies (both veg and non-veg options) alongside hot saffron Kahwa.\n\nWould you like a personalized itinerary planned around your dining choices?`;
    return { reply: text, matchedTours: findMatchingTours(prompt, 2) };
  }

  // 5. Best Time to Visit & Weather Queries
  if (q.includes('best time') || q.includes('when to visit') || q.includes('season') || q.includes('weather') || q.includes('winter') || q.includes('snow') || q.includes('summer')) {
    let dest = 'general';
    if (q.includes('kashmir')) dest = 'kashmir';
    else if (q.includes('bali')) dest = 'bali';
    else if (q.includes('dubai')) dest = 'dubai';
    else if (q.includes('europe') || q.includes('swiss')) dest = 'europe';
    else if (q.includes('vietnam')) dest = 'vietnam';

    const replies = {
      kashmir: isHindi
        ? `**कश्मीर घूमने का सबसे बेहतरीन समय (Best Time for Kashmir):** 🏔️\n\n- **सफ़ेद बर्फबारी (Snow & Skiing):** दिसंबर से मार्च (गुलमर्ग में विश्वस्तरीय बर्फ, जमी हुई डल झील और गर्म लकड़ी के कॉटेज)।\n- **ट्यूलिप गार्डन और खिलते फूल (Spring Blossoms):** अप्रैल से मई (एशिया का सबसे बड़ा ट्यूलिप गार्डन)।\n- **सुहावना मौसम (Summer Escapes):** जून से अगस्त (पहलगाम व सोनमर्ग की हरी-भरी वादियाँ)।\n- **गोल्डन चिनार (Autumn Chinar):** सितंबर से नवंबर (लाल और सुनहरे चिनार के पत्तों का शांत दृश्य)।`
        : `**Best Time to Visit Kashmir:** 🏔️\n\n- **Snow & Winter (Dec – Mar):** Fresh snow in Gulmarg, snowmobiling, and cozy heated pine chalets.\n- **Spring Blossoms (Apr – May):** Asia's largest Tulip Garden blooms in Srinagar with almond orchards.\n- **Pleasant Summer (Jun – Aug):** Green meadows of Betaab Valley in Pahalgam and Thajiwas Glacier in Sonmarg.\n- **Golden Autumn (Sep – Nov):** Red and gold Chinar trees, peaceful Dal Lake shikara rides, and crisp mountain air.`,
      bali: `**Best Time to Visit Bali:** 🌴\n\n- **Dry Season (April to October):** Warm sunshine, low humidity, and calm turquoise seas. Ideal for private pool villas, temple sunsets, and island boat rides.\n- **Festive Season (July - August):** Cultural dance festivals and relaxed beachfront dining in Seminyak.`,
      dubai: `**Best Time to Visit Dubai & UAE:** ☀️\n\n- **Pleasant Season (November to April):** Comfortable temperatures (22°C–28°C), perfect for desert safaris, marina walks, and Burj Khalifa observation decks.`,
      europe: `**Best Time for Europe:** 🏰\n\n- **May to September:** Warm alpine sunshine, Swiss scenic trains (Mt. Titlis, Jungfraujoch), and gondola rides in Venice.\n- **Winter Magic (November to January):** Cozy Christmas markets and snow-covered Swiss chalets.`,
      general: `**Comfort Journey Seasonal Travel Calendar:** 🌍\n\n- **Winter (Nov - Feb):** Kashmir Snow, Dubai Desert, Rajasthan Palaces, Kerala Backwaters.\n- **Spring (Mar - May):** Japan Cherry Blossoms, Kashmir Tulips, European Spring.\n- **Summer (Jun - Aug):** Bali & Thailand Tropical Villas, Swiss Mountain Passes.\n- **Autumn (Sep - Nov):** Vietnam Halong Cruises, Golden Kashmir Chinar, Sri Lanka Scenic Hills.`
    };

    return {
      reply: replies[dest] || replies.general,
      matchedTours: findMatchingTours(dest !== 'general' ? dest : prompt, 3)
    };
  }

  // 6. Conversational Itinerary Intent detected (KAYAK style)
  const parsed = parseTravelIntent(prompt);
  if (parsed && (q.includes('day') || q.includes('plan') || q.includes('itinerary') || q.includes('trip') || q.includes('custom') || q.includes('parent') || q.includes('honeymoon'))) {
    const generatedTrip = generateComfyItinerary(parsed);
    const replyText = `**I have handcrafted a personalized ${parsed.durationDays}-day holiday plan for you!** ✈️\n\n` +
      `- **Destination:** ${parsed.destination}\n` +
      `- **Pacing & Party:** ${parsed.pacing} (${parsed.party})\n` +
      `- **Private Vehicle:** ${parsed.vehicle}\n` +
      `- **Food & Dining:** ${parsed.dietary}\n` +
      `- **Accommodation Tier:** ${parsed.stayTier}\n\n` +
      `You can now explore the **interactive split-screen map**, view day-by-day route lines and driving times, check nearby landmarks, or download the plan as an **Excel sheet, Social Share Card, or PDF brochure** below!`;

    return {
      reply: replyText,
      matchedTours: findMatchingTours(parsed.destKey, 2),
      generatedTrip
    };
  }

  // 7. General Destination Matching
  const matched = findMatchingTours(prompt, 3);
  if (matched.length > 0) {
    const top = matched[0];
    const replyText = isHindi
      ? `**Comfort Journey द्वारा सुझाया गया बेहतरीन टूर:** ✨\n\nआपके लिए हमारे पास **"${top.name}"** का पैकेज उपलब्ध है!\n\n- **अवधि (Duration):** ${top.duration}\n- **शुरुआती कीमत:** ₹${top.price?.toLocaleString('en-IN') || '28,999'} / व्यक्ति\n- **सुविधाएँ:** जाँचे-परखे 4★/5★ होटल, प्राइवेट एसी कार व ड्राइवर, रोज़ाना नाश्ता व डिनर, और 24/7 पर्सनल सहायता।\n\nक्या आप इसका पूरा डे-बाय-डे शेड्यूल और मैप देखना चाहते हैं?`
      : `**Recommended Vacation by Comfort Journey (Est. 1992):** ✨\n\nBased on your travel request, we recommend **"${top.name}"**!\n\n- **Duration:** ${top.duration}\n- **Starting Price:** ₹${top.price?.toLocaleString('en-IN') || '28,999'} per person\n- **Includes:** Handpicked comfortable hotels, private AC car with courteous driver throughout, daily breakfast & dinner, and 24/7 personal trip manager support.\n\nWould you like to customize dates, adjust the pacing, or explore the split-screen route map?`;
    return { reply: replyText, matchedTours: matched };
  }

  // 8. Default Greeting
  const defaultText = isHindi
    ? `**नमस्ते! मैं Comfy.ai हूँ — कम्फर्ट जर्नी (Comfort Journey, Est. 1992) का AI ट्रेवल असिस्टेंट।** 🌟\n\nहम 1992 से भारत व दुनिया भर के 2,000+ गंतव्यों में 100% प्राइवेट और आरामदायक हॉलिडे पैकेज तैयार करते हैं।\n\nआप मुझसे बिना किसी झिझक के साधारण भाषा में पूछ सकते हैं:\n- जैसे: *"7 दिन का कश्मीर टूर माता-पिता के लिए, आसान चाल और प्राइवेट इनोवा कार के साथ"*\n- *"5 दिन बाली हनीमून विला और शाकाहारी रेस्टोरेंट के साथ"*\n- मौसम, सही महीना, शुद्ध शाकाहारी/जैन भोजन या होटल की जानकारी\n\nबताइए, आपकी अगली छुट्टी किस जगह के लिए प्लान करें?`
    : `**Welcome to Comfort Journey (Est. 1992 · Travel Personalized for You)** 🌟\n\nI am **Comfy.ai**, your friendly AI travel assistant. We specialize in private, comfortable holidays across 2,000+ destinations with verified stays and dedicated cars.\n\nYou can speak to me naturally just like a friend:\n- 🏔️ *"7 days in Kashmir for parents who need relaxed pacing, pure veg meals, and a private Innova Hycross"*\n- 🌴 *"5 days in Bali for honeymoon with private pool villa and vegetarian cafes"*\n- ☀️ *"4 days in Dubai for family with kids: desert safari and theme parks"*\n\nWhich destination would you like to explore today?`;

  return {
    reply: defaultText,
    matchedTours: findMatchingTours('kashmir', 2)
  };
}

/**
 * Main function: Ask Comfy.ai Concierge
 */
export async function askAIConcierge({ prompt, conversationHistory = [] }) {
  if (!prompt || !prompt.trim()) {
    return {
      success: false,
      reply: 'Please ask a question or describe your dream vacation!'
    };
  }

  const matchedTours = findMatchingTours(prompt, 3);
  const matchedBlogs = findMatchingBlogs(prompt, 2);

  // Parse intent locally first so we always have the structured trip object ready
  const parsedIntent = parseTravelIntent(prompt);
  let localTrip = null;
  if (parsedIntent) {
    localTrip = generateComfyItinerary(parsedIntent);
  }

  try {
    const res = await fetch('/api/ai-planner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, conversationHistory })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.reply) {
        return {
          success: true,
          reply: data.reply,
          matchedTours,
          matchedBlogs,
          parsedIntent,
          generatedTrip: localTrip,
          model: data.model || 'Gemini 1.5 Flash'
        };
      }
    }
  } catch (err) {
    console.warn('Backend proxy offline, using local Comfy.ai intelligence:', err);
  }

  // Fallback to rich local engine
  const localRes = generateLocalSmartResponse(prompt);
  return {
    success: true,
    reply: localRes.reply,
    matchedTours: localRes.matchedTours.length > 0 ? localRes.matchedTours : matchedTours,
    matchedBlogs,
    parsedIntent,
    generatedTrip: localRes.generatedTrip || localTrip,
    model: 'Comfy.ai Intelligence (Est. 1992)'
  };
}
