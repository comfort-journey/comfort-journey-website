// =========================================================================
// COMFORT JOURNEY — LANDING PAGE DATA GENERATOR
// Merges the approved persona copy (content/landing-copy/*.json) with the
// visual persona settings below and writes src/data/landingPagesData.js.
// Run: node scripts/build-landing-pages.js
// Marketing can edit the JSON copy files; developers can edit themes here.
// =========================================================================
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const COPY_DIR = path.join(ROOT, 'content', 'landing-copy');
const OUT = path.join(ROOT, 'src', 'data', 'landingPagesData.js');

const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1920&q=78`;
const L = (name) => `landing/${name}-1920.webp`;
const Lm = (name) => `landing/${name}-960.webp`;

// order = order shown in hubs and menus
const PERSONAS = [
  { slug: 'family-travel', group: 'people', aliases: ['family', 'family-trips', 'kids-vacation'], accent: '#0F9D6E', vibe: 'bubbles', hero: U('photo-1511895426328-dc8714191300'), heroMobile: null, focal: 'center 40%',
    guide: ['Hi. Planning for the whole family? Scroll, I will keep it simple.', 'These trips work well with kids and grandparents. Easy pace, good food, proper rest.', 'Snacks, naps and window seats. We plan around them, promise.', 'Still deciding? Send us your dates on WhatsApp and we will suggest two good options.'] },
  { slug: 'couple-honeymoon', group: 'people', aliases: ['couple', 'honeymoon', 'romance'], accent: '#E11D63', vibe: 'petals', hero: L('couple'), heroMobile: Lm('couple'), focal: '70% center',
    guide: ['Hello, you two. Let us find a place you will both talk about for years.', 'Beach or mountains? This is the fun argument. Pick a favourite each.', 'Tell us your wish list. Late breakfasts are allowed.', 'Send us your dates. We will reply with a plan you can read together.'] },
  { slug: 'group-travel', group: 'people', aliases: ['group', 'friends', 'squad-trips', 'friends-trip'], accent: '#E08A00', vibe: 'confetti', hero: U('photo-1539635278303-d4002c07eae3'), heroMobile: null, focal: 'center 35%',
    guide: ['Hey squad. Before the group chat goes quiet again, have a look.', 'Pick one, screenshot it, send it to the group. Majority wins.', 'Rooms, cabs, per-person cost. We handle the boring part.', 'Got a date? Even a rough one helps. Ping us on WhatsApp.'] },
  { slug: 'solo-travel', group: 'people', aliases: ['solo', 'solo-traveler', 'backpacking'], accent: '#0E7490', vibe: 'fireflies', hero: L('solo'), heroMobile: Lm('solo'), focal: '72% center',
    guide: ['Going on your own? Good choice. We have your back the whole way.', 'These trips are easy to do solo, with friendly stays and safe transfers.', 'You choose the pace. We stay a message away.', 'Nervous about the first trip? Ask us anything on WhatsApp, no pressure.'] },
  { slug: 'corporate-travel', group: 'people', aliases: ['corporate', 'offsites', 'business-retreats', 'mice'], accent: '#2563EB', vibe: 'none', hero: L('corporate'), heroMobile: Lm('corporate'), focal: '68% center',
    guide: ['Planning an offsite? Let us make you look good in front of the team.', 'These places work well for groups, sessions and some proper downtime.', 'One point of contact, clear costs, fewer late-night calls.', 'Share headcount and dates. We will send a clear proposal.'] },
  { slug: 'school-college-trips', group: 'people', aliases: ['school', 'college', 'educational-trips', 'student-travel'], accent: '#7C3AED', vibe: 'planes', hero: L('school'), heroMobile: Lm('school'), focal: '70% center',
    guide: ['Hello teachers. Let us plan a trip parents will happily sign off on.', 'Learning-friendly routes with history, nature and a little adventure.', 'Supervision, meals and timings are planned before anyone boards.', 'Share class size and dates. We will send a plan you can show the principal.'] },
  { slug: 'weekend-getaways', group: 'time', aliases: ['weekend', 'quick-escapes', '48-hours', 'short-trips'], accent: '#E11D48', vibe: 'sun', hero: U('photo-1469854523086-cc02fe5d8800'), heroMobile: null, focal: 'center 55%',
    guide: ['Only have a weekend? That is plenty if someone else plans it.', 'Short trips, short travel time, long naps.', 'Leave Friday, back before the Monday meeting.', 'Tell us your city and dates. We will find the closest good escape.'] },
  { slug: 'fixed-departures', group: 'time', aliases: ['group-tours', 'scheduled-trips'], accent: '#EA580C', vibe: 'flags', hero: L('fixed'), heroMobile: Lm('fixed'), focal: '68% center',
    guide: ['Want a ready trip with fixed dates? Just pick one and pack.', 'Join a friendly group. Solo travellers are welcome too.', 'Dates are set, the plan is set, the fun is up to you.', 'Ask us for current dates and seats on WhatsApp.'] },
  { slug: 'india-packages', group: 'where', aliases: ['india', 'domestic', 'india-tours', 'incredible-india'], accent: '#D97706', vibe: 'marigold', hero: U('photo-1524492412937-b28074a5d7da'), heroMobile: null, focal: 'center 45%',
    guide: ['Namaste. India is big. Let us help you pick the right corner of it.', 'Mountains, palaces, beaches, backwaters. Start with what you love.', 'Visiting from abroad? We sort drivers, hotels and the pace for you.', 'Send us your dates and interests. We will shape the route.'] },
  { slug: 'international-packages', group: 'where', aliases: ['international', 'world-tours', 'passport-holidays', 'abroad'], accent: '#0284C7', vibe: 'planes', hero: 'backgrounds/vietnam-golden-bridge.webp', heroMobile: null, focal: 'center 40%',
    guide: ['Passport ready? Or at least somewhere in the drawer?', 'These trips are friendly for first-time international travellers.', 'Visa papers, flights, food options. We help with all of it.', 'Ask us which country suits your dates and budget.'] },
  { slug: 'adventure-tours', group: 'mood', aliases: ['adventure', 'trek', 'treks', 'hiking', 'expeditions'], accent: '#EA580C', vibe: 'wind', hero: U('photo-1519904981063-b0cf448d479e'), heroMobile: null, focal: 'center 40%',
    guide: ['Want a story worth telling? Start scrolling.', 'Treks, rafting, high passes. Pick your level of thrill.', 'We plan the fun part and the safety part.', 'Tell us your fitness level honestly. We will match the trip.'] },
  { slug: 'beach-vacations', group: 'mood', aliases: ['beach', 'tropical', 'islands', 'ocean'], accent: '#0891B2', vibe: 'bubbles', hero: U('photo-1507525428034-b723cf961d3e'), heroMobile: null, focal: 'center 60%',
    guide: ['Sand, sea and zero emails. Sounds right?', 'Pick your beach mood: busy shacks or quiet islands.', 'Sunscreen is your job. Everything else is ours.', 'Send your dates. We will check the best beach weather for you.'] },
  { slug: 'mountain-escapes', group: 'mood', aliases: ['mountain', 'hills', 'alpine', 'hill-stations'], accent: '#0369A1', vibe: 'mist', hero: U('photo-1464822759023-fed622ff2c3b'), heroMobile: null, focal: 'center 45%',
    guide: ['Need fresh air and a quiet view? You are in the right place.', 'Hill stations, valleys and long scenic drives.', 'Third cup of chai on the balcony. Highly recommended.', 'Ask us which hills suit your month of travel.'] },
  { slug: 'spiritual-journeys', group: 'mood', aliases: ['spiritual', 'pilgrimage', 'yatra', 'temple-tours'], accent: '#C2410C', vibe: 'diya', hero: L('spiritual'), heroMobile: Lm('spiritual'), focal: '70% center',
    guide: ['Namaste. Let us plan a calm, comfortable yatra for your family.', 'Sacred cities with an easy pace, especially for elders.', 'Darshan timings, rest breaks and simple food, planned ahead.', 'Share who is travelling. We will plan around their comfort.'] },
  { slug: 'summer-packages', group: 'season', aliases: ['summer', 'summer-vacations', 'beat-the-heat'], accent: '#059669', vibe: 'sun', hero: L('summer'), heroMobile: Lm('summer'), focal: '65% center',
    guide: ['Too hot at home? Let us find you somewhere cooler.', 'School holidays sorted. These places stay pleasant in summer.', 'Book early for May and June. Good rooms go fast.', 'Tell us your holiday dates. We will suggest the coolest options.'] },
  { slug: 'monsoon-getaways', group: 'season', aliases: ['monsoon', 'rainy-season', 'monsoon-trips'], accent: '#15803D', vibe: 'rain', hero: L('monsoon'), heroMobile: Lm('monsoon'), focal: '72% center',
    guide: ['Love the rain? So do these green valleys.', 'These places look their best when it pours.', 'Bring a raincoat. We bring the plan and the chai stops.', 'Ask us which routes are safe and pretty this monsoon.'] },
  { slug: 'winter-packages', group: 'season', aliases: ['winter', 'snow-trips', 'winter-wonderland', 'december-trips'], accent: '#0E7490', vibe: 'snow', hero: L('winter'), heroMobile: Lm('winter'), focal: '70% center',
    guide: ['Ready for jackets, snow views and hot chocolate?', 'Snowy hills or warm winter sun. Both are here.', 'Snowfall depends on nature. A cosy trip depends on us.', 'December fills up fast. Send us your dates soon.'] }
];

export const GROUPS = {
  people: 'Who is travelling',
  time: 'How much time you have',
  where: 'Where you want to go',
  mood: 'What you are in the mood for',
  season: 'When you want to travel'
};

function build() {
  const out = {};
  for (const p of PERSONAS) {
    const file = path.join(COPY_DIR, `${p.slug}.json`);
    const c = JSON.parse(fs.readFileSync(file, 'utf8'));
    out[p.slug] = {
      id: p.slug,
      slug: p.slug,
      group: p.group,
      aliases: p.aliases,
      metaTitle: c.metaTitle,
      metaDesc: c.metaDesc,
      focusKeyword: c.focusKeyword,
      secondaryKeywords: c.secondaryKeywords,
      categoryBadge: c.eyebrow,
      eyebrow: c.eyebrow,
      heroHeadline: c.heroHeadline,
      heroSubline: c.heroSubline,
      ctaPrimary: c.ctaPrimary,
      ctaSecondary: c.ctaSecondary,
      whatsAppMsg: c.whatsAppMsg,
      vibeTags: c.vibeTags,
      packagesHeading: c.packagesHeading,
      packagesIntro: c.packagesIntro,
      storyHeading: c.storyHeading,
      storyParagraphs: c.storyParagraphs,
      reasonsHeading: c.reasonsHeading,
      reasons: c.reasons,
      includedHeading: c.includedHeading,
      included: c.included,
      quickAnswer: c.quickAnswer,
      faqs: c.faqs,
      packageIdsIndia: c.packageIdsIndia,
      packageIdsIntl: c.packageIdsIntl,
      reviewId: c.reviewId,
      finalHeading: c.finalHeading,
      finalText: c.finalText,
      finalCta: c.finalCta,
      guide: p.guide,
      theme: {
        accentColor: p.accent,
        vibe: p.vibe,
        heroImage: p.hero,
        heroImageMobile: p.heroMobile || p.hero,
        heroFocal: p.focal
      }
    };
  }
  const header = `// =========================================================================
// COMFORT JOURNEY — AUDIENCE LANDING PAGES (generated file, do not hand edit)
// Source copy: content/landing-copy/<slug>.json
// Generator:   scripts/build-landing-pages.js
// Each page is written for one kind of traveller, with its own voice,
// package picks, quick answer (AEO), FAQs (FAQPage schema) and mood effect.
// =========================================================================
`;
  const body = `export const LANDING_GROUPS = ${JSON.stringify(GROUPS, null, 2)};

export const LANDING_PAGES_DATA = ${JSON.stringify(out, null, 2)};

export function getLandingPageBySlug(rawSlug) {
  if (!rawSlug) return null;
  const clean = rawSlug.replace(/^#\\/?/, '').replace(/^landing\\/?/, '').replace(/\\/$/, '').toLowerCase().trim();
  if (LANDING_PAGES_DATA[clean]) return LANDING_PAGES_DATA[clean];
  for (const key in LANDING_PAGES_DATA) {
    const page = LANDING_PAGES_DATA[key];
    if (page.aliases && page.aliases.includes(clean)) return page;
  }
  return null;
}
`;
  fs.writeFileSync(OUT, header + body);
  console.log(`✅ [Landing] Wrote ${Object.keys(out).length} audience landing pages to src/data/landingPagesData.js`);
}

build();
