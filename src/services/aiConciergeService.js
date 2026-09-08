import { TOURS_DATA } from '../data/toursData';
import { BLOGS_DATA } from '../data/blogsData';
import { LANDING_PAGES_DATA } from '../data/landingPagesData';

/**
 * Comfort Journey AI Concierge Service
 * Strict brand guardrails: Only answers for Comfort Journey (Est. 1992).
 * Answers tour packages, luxury stays, travel tips, weather, packing, and FAQs.
 * Connects securely to /api/ai-planner (Gemini 1.5/2.0 Flash) with an embedded
 * high-intelligence offline fallback engine.
 */

// Common quick questions visitors ask across the travel lifecycle
export const QUICK_PROMPTS = [
  {
    category: 'Before Travel',
    icon: 'Compass',
    questions: [
      'What is the best time to visit Kashmir for snow?',
      'Suggest a 5-day luxury Bali honeymoon with private pool villa',
      'Is vegetarian or Jain food available on your Vietnam tour?',
      'How does VIP Kedarnath helicopter darshan work?'
    ]
  },
  {
    category: 'Tours & Pricing',
    icon: 'Sparkles',
    questions: [
      'Show top international packages under ₹1,00,000',
      'What luxury stays are included in the Essence of Europe trip?',
      'Do you provide dedicated private AC chauffeurs on all tours?',
      'Can you tailor-make a custom multi-country itinerary?'
    ]
  },
  {
    category: 'During & Post Travel',
    icon: 'ShieldCheck',
    questions: [
      'How does your 24/7 dedicated concierge assist during the trip?',
      'What packing tips do you recommend for Gulmarg winter?',
      'Tips for traveling with senior citizen parents and kids'
    ]
  }
];

// Helper: Extract relevant tours from TOURS_DATA based on user query
export function findMatchingTours(query, limit = 3) {
  if (!query) return [];
  const q = query.toLowerCase().trim();

  // Score matching
  const scored = TOURS_DATA.map(tour => {
    let score = 0;
    const name = (tour.name || '').toLowerCase();
    const loc = (tour.location || '').toLowerCase();
    const country = (tour.country || '').toLowerCase();
    const continent = (tour.continent || '').toLowerCase();
    const desc = (tour.desc || tour.tagline || '').toLowerCase();
    const cats = (tour.categories || []).map(c => c.toLowerCase());
    const tags = (tour.tags || []).map(t => t.toLowerCase());

    if (name.includes(q)) score += 10;
    if (country.includes(q) || loc.includes(q)) score += 8;
    if (q.includes(country) || q.includes(loc)) score += 6;
    if (cats.some(c => q.includes(c) || c.includes(q))) score += 4;
    if (tags.some(t => q.includes(t) || t.includes(q))) score += 3;
    if (desc.includes(q)) score += 2;

    // Destination keywords
    const keywords = ['kashmir', 'bali', 'dubai', 'vietnam', 'europe', 'switzerland', 'phuket', 'thailand', 'japan', 'shimla', 'manali', 'rajasthan', 'kerala', 'kedarnath', 'singapore', 'sri lanka', 'goa'];
    for (const kw of keywords) {
      if (q.includes(kw) && (name.includes(kw) || loc.includes(kw) || country.includes(kw))) {
        score += 7;
      }
    }

    // Vibe keywords
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

// Fallback intelligent responder when Gemini API key is not configured or offline
function generateLocalSmartResponse(prompt) {
  const q = prompt.toLowerCase().trim();

  // 1. Competitor / Third-Party Guardrail
  const competitorMatches = ['makemytrip', 'make my trip', 'thomas cook', 'booking.com', 'expedia', 'viator', 'airbnb', 'tripadvisor', 'yatra', 'goibibo'];
  if (competitorMatches.some(c => q.includes(c))) {
    return {
      reply: `At **Comfort Journey (Est. 1992)**, we are an independent luxury travel house. Unlike commercial aggregation portals, every single vacation with us is **100% private, verified, and bespoke**.\n\n✨ **The Comfort Journey Royal Guarantee:**\n- **Verified 4★ & 5★ Stays:** Handpicked boutique chalets, royal heritage suites, and private pool villas.\n- **Dedicated Chauffeurs & Private AC SUVs:** No crowded buses or sharing.\n- **24/7 Personal VIP Concierge:** A direct senior travel manager assigned to your trip from booking until your flight home.\n\nHow can I help you plan your bespoke journey today?`,
      matchedTours: findMatchingTours('luxury', 2)
    };
  }

  // 2. Off-Topic Guardrail
  const offTopicKeywords = ['python', 'javascript', 'code', 'coding', 'recipe for cake', 'cricket score', 'movie review', 'politics', 'math', 'calculate', 'homework'];
  if (offTopicKeywords.some(kw => q.includes(kw)) && !q.includes('travel') && !q.includes('trip') && !q.includes('tour')) {
    return {
      reply: `I am **Navi**, Senior Luxury AI Concierge for **Comfort Journey (Est. 1992)**. 👑\n\nI am exclusively dedicated to helping travelers plan dream luxury vacations across India and 2,000+ destinations worldwide. I can assist you with:\n- **Tour Packages & Custom Itineraries**\n- **Best Seasons, Weather & What to Pack**\n- **Luxury Hotels, Private Chauffeurs & Visa Support**\n- **Family, Honeymoon & Sacred VIP Journeys**\n\nWhich destination are you dreaming of exploring?`,
      matchedTours: []
    };
  }

  // 3. Multilingual: Hindi / Hinglish detection
  const isHindi = /[\u0900-\u097F]/.test(prompt) || 
    /\b(kaise|kya|kab|jana|hoga|chahiye|kitna|kharcha|batao|kripya|namaste|kashmir|ghoomne)\b/i.test(prompt);

  // 4. Food & Dietary Queries
  if (q.includes('veg') || q.includes('jain') || q.includes('food') || q.includes('khana') || q.includes('halal') || q.includes('dining')) {
    const text = isHindi
      ? `**Comfort Journey पर भोजन व्यवस्था (Dining Care):** 🍲\n\nहाँ, हमारे सभी टूर्स में भारतीय, शुद्ध शाकाहारी (Pure Veg) और जैन भोजन (Jain Food) का विशेष प्रबंध रहता है:\n- **कस्टम रेस्टोरेंट बुकिंग:** चाहे आप वियतनाम, यूरोप, बाली या कश्मीर में हों, हमारे प्राइवेट शॉफ़र आपको जाँचे-परखे भारतीय व शाकाहारी भोजनालयों में ले जाते हैं।\n- **5-स्टार शेफ कोऑर्डिनेशन:** आपके होटलों में बिना प्याज-लहसुन या विशेष डाइटरी ज़रूरतों का पहले से ही ध्यान रखा जाता है।\n- **कश्मीर में रॉयल वाजवान:** शाकाहारी व माँसाहारी दोनों स्वादों में ऑथेंटिक कश्मीरी काहवा और वाजवान का अनुभव!`
      : `**Comfort Journey Dining & Dietary Excellence:** 🍽️\n\nYes! We take culinary preferences very seriously for all domestic and international journeys:\n- **Pure Vegetarian & Jain Meals:** Pre-arranged with verified authentic Indian restaurants and 5-star hotel kitchens across Vietnam, Bali, Europe, Dubai, and India.\n- **Private Chauffeur Flexibility:** Your dedicated chauffeur will take you directly to verified fine dining establishments according to your personal taste.\n- **Kashmiri Wazwan & Kahwa:** In Kashmir, enjoy authentic multi-course Wazwan (both vegetarian and non-vegetarian delicacies) along with piping hot traditional saffron Kahwa.\n\nWould you like to explore a specific package with complete meal inclusions?`;
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
        ? `**कश्मीर घूमने का सबसे बेहतरीन समय (Best Time for Kashmir):** 🏔️\n\n- **सफ़ेद बर्फबारी (Snow & Skiing):** दिसंबर से मार्च (गुलमर्ग में विश्वस्तरीय स्कीइंग, जमी हुई डल झील और गर्म लकड़ी के कॉटेज)।\n- **ट्यूलिप गार्डन और खिलते फूल (Spring Blossoms):** अप्रैल से मई (एशिया का सबसे बड़ा ट्यूलिप गार्डन और बादाम के बाग)।\n- **सुहावना मौसम (Summer Escapes):** जून से अगस्त (पहलगाम व सोनमर्ग की हरी-भरी वादियाँ)।\n- **गोल्डन चिनार (Autumn Chinar):** सितंबर से नवंबर (लाल और सुनहरे चिनार के पत्तों का मनमोहक दृश्य)।`
        : `**Best Time to Visit Kashmir (Curated Guide):** 🏔️\n\n- **For Snow & Winter Romance (Dec – Mar):** Fresh powder snow in Gulmarg, snowmobiling, and heated pine chalets with private butlers.\n- **For Spring Blossoms (Apr – May):** Asia's largest Indira Gandhi Memorial Tulip Garden blooms in Srinagar, paired with almond orchards.\n- **For Pleasant Summer Relief (Jun – Aug):** Verdant meadows of Betaab Valley (Pahalgam) and Thajiwas Glacier (Sonmarg).\n- **For Golden Autumn (Sep – Nov):** Fiery red and gold Chinar foliage, tranquil Dal Lake shikara rides with crisp mountain air.`,
      bali: `**Best Time to Visit Bali & Tropical Islands:** 🌴\n\n- **Dry Season (April to October):** Best weather with sunny skies, low humidity, and calm turquoise waters. Ideal for private pool villas, Uluwatu sunset temple tours, and Nusa Penida island yachting.\n- **Cultural & Festive Season (July - August):** Vibrant Balinese temple festivals and oceanfront dining in Seminyak.`,
      dubai: `**Best Time to Visit Dubai & UAE:** ☀️\n\n- **Peak Luxury Season (November to April):** Delightful daytime temperatures (22°C–28°C), perfect for private Red Dune desert safaris, yacht cruises around Dubai Marina, and Burj Khalifa sky observation.`,
      europe: `**Best Time for European Grandeur:** 🏰\n\n- **May to September:** Warm alpine sunshine, Swiss panoramic cogwheel trains (Mt. Titlis, Jungfraujoch), and romantic gondola rides through Venice canals.\n- **Winter Magic (November to January):** Fairytale Christmas markets, snow-capped Swiss chalets, and private heated transfers across Italy and Switzerland.`,
      general: `**Comfort Journey Seasonal Travel Calendar:** 🌍\n\n- **Winter (Nov - Feb):** Kashmir Snow, Dubai Desert Luxury, Rajasthan Palaces, Kerala Backwaters.\n- **Spring (Mar - May):** Japan Sakura Cherry Blossoms, Kashmir Tulip Festival, European Fairytales.\n- **Monsoon/Scenic (Jun - Aug):** Bali & Thailand Tropical Villas, Swiss Alpine Passes, Meghalaya Living Root Bridges.\n- **Autumn (Sep - Nov):** Vietnam Halong Cruises, Golden Kashmir Chinar, Sri Lanka Hill Country.`
    };

    return {
      reply: replies[dest] || replies.general,
      matchedTours: findMatchingTours(dest !== 'general' ? dest : prompt, 3)
    };
  }

  // 6. Packing & Pre-Travel Advice
  if (q.includes('pack') || q.includes('visa') || q.includes('document') || q.includes('luggage') || q.includes('currency')) {
    const text = `**Comfort Journey Pre-Travel Concierge Guidance:** 🎒\n\n1. **Luggage & Packing:**\n   - **For Snow/Winter (Kashmir, Swiss):** 3-layer thermal innerwear, waterproof down jackets, fleece gloves, and insulated snow boots with firm grip.\n   - **For Tropical Destinations (Bali, Phuket, Vietnam):** Lightweight breathable linen, sun protection (SPF 50+), sunglasses, and waterproof dry bags for boat transfers.\n2. **Visa & Documentation Support:**\n   - Comfort Journey handles hassle-free visa guidance, domestic/international flight coordination, and fast-track permit arrangements (e.g. Kedarnath priority darshan, Lakshadweep entry permits).\n3. **Currency & Cards:**\n   - We assist with international Forex cards and local currency conversion advice to ensure zero transaction hassles on arrival.\n\nOur 24/7 dedicated trip manager is available at **+91 8770403315** to assist with any pre-trip checklist!`;
    return { reply: text, matchedTours: findMatchingTours(prompt, 2) };
  }

  // 7. During Travel & 24/7 Concierge
  if (q.includes('during') || q.includes('chauffeur') || q.includes('concierge') || q.includes('emergency') || q.includes('service')) {
    const text = `**During-Travel VIP Concierge Protocol:** 🛡️\n\nWith Comfort Journey (Est. 1992), your trip doesn't end when your booking is confirmed. We are with you 24/7:\n- **Airport VIP Meet & Greet:** Your dedicated private chauffeur greets you at arrivals with personalized name placards and assists with luggage handling.\n- **Private Sanitized Luxury Fleet:** Brand new AC Innova Crysta, Fortuner, Mercedes, or private luxury coaches dedicated exclusively to your group.\n- **One Direct Hotline:** Any question, route change, restaurant reservation, or local guidance is one WhatsApp/call away (+91 8770403315).\n- **Daily Guest Check-in:** Our senior concierge team monitors your transfers and hotel check-ins in real-time to guarantee perfection.`;
    return { reply: text, matchedTours: findMatchingTours('luxury', 2) };
  }

  // 8. General Destination Matching
  const matched = findMatchingTours(prompt, 3);
  if (matched.length > 0) {
    const top = matched[0];
    const replyText = isHindi
      ? `**Comfort Journey द्वारा सुझाई गई शाही यात्रा:** ✨\n\nआपके अनुरोध के लिए हमारे पास **"${top.name}"** का बेहतरीन पैकेज उपलब्ध है!\n\n- **अवधि (Duration):** ${top.duration}\n- **अनुमानित मूल्य (Starting Price):** ₹${top.price?.toLocaleString('en-IN') || '28,999'} / व्यक्ति\n- **विशेष सुविधाएँ:** प्रमाणित 4★/5★ डीलक्स स्टे, प्राइवेट एसी कैब व शॉफ़र, दैनिक नाश्ता व डिनर, और 24/7 पर्सनल कॉन्सिएर्ज सहायता।\n\nक्या आप इस पैकेज का पूरा डे-बाय-डे शेड्यूल देखना चाहेंगे या इसमें अपने अनुसार बदलाव करवाना चाहते हैं?`
      : `**Handcrafted Royal Itinerary by Comfort Journey (Est. 1992):** ✨\n\nBased on your travel preferences, we highly recommend **"${top.name}"**!\n\n- **Duration:** ${top.duration}\n- **Starting Price:** ₹${top.price?.toLocaleString('en-IN') || '28,999'} per person\n- **Category:** ${top.category || 'Luxury Bespoke Vacation'}\n- **Signature Inclusions:** Handpicked 4★/5★ luxury accommodations, dedicated private AC chauffeur throughout, daily gourmet breakfast & dinner, all sightseeing entries, and 24/7 dedicated concierge assistance.\n\nBelow are the verified package details. Would you like to customize dates, upgrade to royal suites, or book directly via WhatsApp?`;
    return { reply: replyText, matchedTours: matched };
  }

  // 9. Default Helpful Concierge Response
  const defaultText = isHindi
    ? `**नमस्ते! मैं 'नवी' हूँ — कम्फर्ट जर्नी (Comfort Journey, Est. 1992) का शाही AI ट्रेवल कॉन्सिएर्ज।** 👑\n\nहम 1992 से भारत व दुनिया भर के 2,000+ गंतव्यों में 100% प्राइवेट लग्ज़री टूर तैयार करते हैं।\n\nआप मुझसे किसी भी विषय में पूछ सकते हैं:\n- **कश्मीर, बाली, दुबई, यूरोप, वियतनाम, केरल** के टूर पैकेज व असली कीमतें\n- **मौसम, सबसे अच्छा महीना और पैकिंग टिप्स**\n- **शाकाहारी/जैन भोजन और बुजुर्गों या बच्चों के लिए सुगम यात्रा**\n- **प्राइवेट कार, 5-स्टार होटल और वीआईपी दर्शन व्यवस्था**\n\nकृपया अपनी पसंदीदा जगह या बजट बताएं, मैं आपके लिए विशेष शेड्यूल तैयार करूँगा!`
    : `**Welcome to Comfort Journey (Est. 1992 · Luxury Travel Concierge)** 👑\n\nI am **Navi**, your dedicated AI Travel Designer. We specialize in handcrafted, 100% private vacations across 2,000+ destinations worldwide with verified 5-star stays and dedicated chauffeurs.\n\nHere are some popular ways I can assist you today:\n- 🏔️ **Winter & Mountain Getaways:** Kashmir Luxury Houseboats, Himachal Chalets, Swiss Alps\n- 🌴 **Tropical Beach Havens:** Bali Private Pool Villas, Phuket, Andaman, Maldives\n- 🏰 **Royal Heritage & Desert:** Rajasthan Havelis, Dubai Red Dune Luxury\n- 🌿 **Spiritual & Rejuvenation:** Kedarnath VIP Helicopter, Kerala Ayurveda\n\nWhich destination or travel experience are you looking to plan?`;

  return {
    reply: defaultText,
    matchedTours: findMatchingTours('kashmir', 2)
  };
}

/**
 * Main function: Ask AI Concierge
 * Attempts Gemini API via secure server proxy /api/ai-planner.
 * Automatically falls back to high-intelligence local knowledge engine if no key is set.
 */
export async function askAIConcierge({ prompt, conversationHistory = [] }) {
  if (!prompt || !prompt.trim()) {
    return {
      success: false,
      reply: 'Please ask a question about our tour packages, destinations, or travel advice!'
    };
  }

  // Always find matching tours from local catalog to show interactive cards
  const matchedTours = findMatchingTours(prompt, 3);
  const matchedBlogs = findMatchingBlogs(prompt, 2);

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
          model: data.model || 'Gemini 1.5 Flash'
        };
      }
    }
  } catch (err) {
    // Network / dev proxy unavailable, gracefully continue to local knowledge engine
    console.warn('Backend AI proxy offline or not configured, using local Comfort Journey intelligence:', err);
  }

  // High-intelligence local fallback (Guaranteed brand-safe & 100% Comfort Journey accurate)
  const localRes = generateLocalSmartResponse(prompt);
  return {
    success: true,
    reply: localRes.reply,
    matchedTours: localRes.matchedTours.length > 0 ? localRes.matchedTours : matchedTours,
    matchedBlogs,
    model: 'Comfort Journey Royal Intelligence'
  };
}
