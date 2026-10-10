/**
 * Destination Climatological Database & Weather Intelligence Engine
 * 
 * Provides 12-month historical temperature, precipitation, and seasonal classification 
 * modelled after Stippl.io, Lonely Planet, and meteorological averages (NOAA / WorldClim).
 * 
 * Classifications:
 * - 'best': Optimal weather, clear skies, peak comfort (Emerald / Green)
 * - 'good': Pleasant conditions, great sightseeing, shoulder value (Teal / Mint)
 * - 'hot': High season / warm sun / bustling festive energy (Amber / Golden)
 * - 'rainy': Monsoonal rains or heavy winter chill / snow (Sky Blue / Slate)
 */

export const DESTINATION_CLIMATES = {
  // ── HIMACHAL PRADESH (Dalhousie, Dharamshala, Manali, Shimla) ──
  'dalhousie': {
    region: 'Himachal Pradesh, Western Himalayas',
    bestTimeHeadline: 'April, May, June and September',
    bestMonths: ['Apr', 'May', 'Jun', 'Sep'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: 8, highTempC: 11, lowTempC: 2, status: 'rainy', statusLabel: 'Snow / Winter Chill', rainfallMm: 85, desc: 'Crisp winter snow blankets higher ridges; scenic pine trees dusted in white.' },
      { month: 'Feb', name: 'February', avgTempC: 10, highTempC: 13, lowTempC: 4, status: 'rainy', statusLabel: 'Crisp Snow Melt', rainfallMm: 90, desc: 'Snow begins melting in lower valleys; sunny afternoons with chilly evenings.' },
      { month: 'Mar', name: 'March', avgTempC: 15, highTempC: 18, lowTempC: 8, status: 'good', statusLabel: 'Pleasant Spring', rainfallMm: 70, desc: 'Rhododendrons in full bloom; pleasant walking weather through pine trails.' },
      { month: 'Apr', name: 'April', avgTempC: 20, highTempC: 24, lowTempC: 12, status: 'best', statusLabel: 'Best time', rainfallMm: 45, desc: 'Golden mountain sunshine, clear horizon visibility towards the Pir Panjal range.' },
      { month: 'May', name: 'May', avgTempC: 24, highTempC: 28, lowTempC: 16, status: 'best', statusLabel: 'Best time', rainfallMm: 35, desc: 'Ideal warm climate; perfect for Khajjiar meadows and Dainkund panoramic treks.' },
      { month: 'Jun', name: 'June', avgTempC: 26, highTempC: 30, lowTempC: 18, status: 'best', statusLabel: 'Best time', rainfallMm: 65, desc: 'Peak mountain summer; cool pine breezes shield travelers from plain heatwaves.' },
      { month: 'Jul', name: 'July', avgTempC: 23, highTempC: 26, lowTempC: 17, status: 'hot', statusLabel: 'Misty Monsoon', rainfallMm: 290, desc: 'Romantic misty clouds drifting through pine valleys; lush green carpet across meadows.' },
      { month: 'Aug', name: 'August', avgTempC: 22, highTempC: 25, lowTempC: 16, status: 'hot', statusLabel: 'Monsoon Greenery', rainfallMm: 280, desc: 'Cascading waterfalls at full roar; vibrant fresh greenery everywhere.' },
      { month: 'Sep', name: 'September', avgTempC: 21, highTempC: 25, lowTempC: 14, status: 'best', statusLabel: 'Best time', rainfallMm: 80, desc: 'Crystal clear post-monsoon skies, lush green hills, and cool refreshing breezes.' },
      { month: 'Oct', name: 'October', avgTempC: 17, highTempC: 21, lowTempC: 10, status: 'good', statusLabel: 'Crisp Autumn', rainfallMm: 25, desc: 'Crisp autumn air, golden foliage, and exceptional mountain peak photography.' },
      { month: 'Nov', name: 'November', avgTempC: 13, highTempC: 17, lowTempC: 6, status: 'good', statusLabel: 'Early Winter', rainfallMm: 18, desc: 'Quiet, serene ambiance; cool sunny afternoons and starry campfire nights.' },
      { month: 'Dec', name: 'December', avgTempC: 9, highTempC: 13, lowTempC: 3, status: 'rainy', statusLabel: 'Snow / Winter Chill', rainfallMm: 40, desc: 'Winter snowfall begins; cozy colonial fireplaces and festive holiday charm.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'April, May and September',
      desc: 'Warm enough for Khajjiar meadows, cool enough for the alpine passes, and the only time the undiscovered charm is completely serene on the pine trails.'
    },
    peakSeason: {
      title: 'Peak Season',
      months: 'May, June and Late December',
      desc: 'Pleasantly warm, vibrant mountain promenade walks, with domestic summer holidays. Advance bookings for luxury view suites are highly recommended.'
    },
    lowSeason: {
      title: 'Low Season',
      months: 'January to March',
      desc: 'Colonial heritage retreats hibernate in peace, upper ridges are blanketed in winter snow, and peaceful quiet descends upon the town.'
    }
  },

  // ── KASHMIR & LADAKH (Srinagar, Gulmarg, Pahalgam, Leh) ──
  'kashmir': {
    region: 'Kashmir Valley & Great Himalayas',
    bestTimeHeadline: 'April to June & September to October',
    bestMonths: ['Apr', 'May', 'Jun', 'Sep', 'Oct'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: -2, highTempC: 4, lowTempC: -6, status: 'rainy', statusLabel: 'Sub-Zero Snow', rainfallMm: 60, desc: 'Gulmarg ski slopes open; Dal Lake freezes into glass; enchanting snow wonderland.' },
      { month: 'Feb', name: 'February', avgTempC: 2, highTempC: 7, lowTempC: -3, status: 'rainy', statusLabel: 'Snow Season', rainfallMm: 70, desc: 'Heavy powdery snow; ideal for Gondola rides and cozy houseboat stays with Kangri.' },
      { month: 'Mar', name: 'March', avgTempC: 9, highTempC: 14, lowTempC: 4, status: 'good', statusLabel: 'Tulip Awakening', rainfallMm: 80, desc: 'Snow starts receding, world-famous Asia largest Tulip garden opens in Srinagar.' },
      { month: 'Apr', name: 'April', avgTempC: 15, highTempC: 20, lowTempC: 8, status: 'best', statusLabel: 'Best time', rainfallMm: 65, desc: 'Millions of blooming tulips, apple blossoms, and snow-capped peaks in backdrop.' },
      { month: 'May', name: 'May', avgTempC: 19, highTempC: 24, lowTempC: 11, status: 'best', statusLabel: 'Best time', rainfallMm: 50, desc: 'Perfect sunny days; Shikara rides on Dal Lake; Betaab Valley at its most picturesque.' },
      { month: 'Jun', name: 'June', avgTempC: 24, highTempC: 29, lowTempC: 15, status: 'best', statusLabel: 'Best time', rainfallMm: 35, desc: 'Pristine mountain climate; pleasant cool breeze escaping the Indian summer heat.' },
      { month: 'Jul', name: 'July', avgTempC: 26, highTempC: 31, lowTempC: 18, status: 'hot', statusLabel: 'Warm Sunshine', rainfallMm: 45, desc: 'Warmest month; high alpine lakes trekking; vibrant local saffron and walnut harvest.' },
      { month: 'Aug', name: 'August', avgTempC: 25, highTempC: 30, lowTempC: 17, status: 'hot', statusLabel: 'Sunny Days', rainfallMm: 55, desc: 'Abundant orchards of fresh apples and pears; clear skies and tranquil waterways.' },
      { month: 'Sep', name: 'September', avgTempC: 21, highTempC: 26, lowTempC: 12, status: 'best', statusLabel: 'Best time', rainfallMm: 30, desc: 'Crisp autumn clarity; golden Chinar leaves begin their majestic transformation.' },
      { month: 'Oct', name: 'October', avgTempC: 15, highTempC: 21, lowTempC: 6, status: 'best', statusLabel: 'Best time', rainfallMm: 20, desc: 'Spectacular red-gold Chinar trees; crisp cool evenings and crystal-clear mountain vistas.' },
      { month: 'Nov', name: 'November', avgTempC: 8, highTempC: 14, lowTempC: 1, status: 'good', statusLabel: 'Crisp Autumn Chill', rainfallMm: 25, desc: 'First snowfall graces the mountain peaks; cozy wood-paneled heritage suites.' },
      { month: 'Dec', name: 'December', avgTempC: 2, highTempC: 7, lowTempC: -4, status: 'rainy', statusLabel: 'Winter Wonderland', rainfallMm: 40, desc: 'Chillai Kalan winter period begins; roaring bukhari heaters and snowy panoramas.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'March, September and October',
      desc: 'Spectacular transition seasons — either colorful spring tulip blooms or flaming red Chinar leaves with crisp, cool mountain breezes.'
    },
    peakSeason: {
      title: 'Peak Season',
      months: 'April to June & Dec-Jan (Snow)',
      desc: 'Shikara rides on sunlit waters, lush green Lidder River meadows, and thrilling Gondola cable car ascents to snow summits.'
    },
    lowSeason: {
      title: 'Low Season',
      months: 'Late November & February',
      desc: 'Quiet mountain tranquility, minimal crowds on heritage houseboats, and romantic fireplace dinners.'
    }
  },

  // ── RAJASTHAN & GOLDEN TRIANGLE (Jaipur, Udaipur, Jodhpur, Jaisalmer) ──
  'rajasthan': {
    region: 'Rajasthan & Thar Desert, Western India',
    bestTimeHeadline: 'October to March (Royal Winter)',
    bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: 16, highTempC: 23, lowTempC: 8, status: 'best', statusLabel: 'Best time', rainfallMm: 5, desc: 'Crisp, sunny desert days; chilly royal evenings; peak palace sightseeing comfort.' },
      { month: 'Feb', name: 'February', avgTempC: 19, highTempC: 26, lowTempC: 11, status: 'best', statusLabel: 'Best time', rainfallMm: 6, desc: 'Pleasant golden sun; cultural desert festivals, folk music and camel safaris.' },
      { month: 'Mar', name: 'March', avgTempC: 25, highTempC: 32, lowTempC: 17, status: 'good', statusLabel: 'Warm Spring', rainfallMm: 4, desc: 'Vibrant Holi celebrations; warmer afternoons with comfortable royal palace tours.' },
      { month: 'Apr', name: 'April', avgTempC: 31, highTempC: 38, lowTempC: 23, status: 'hot', statusLabel: 'Warm & Sunny', rainfallMm: 4, desc: 'Summer arrives; morning fort visits recommended followed by luxury palace pools.' },
      { month: 'May', name: 'May', avgTempC: 35, highTempC: 41, lowTempC: 27, status: 'hot', statusLabel: 'Dry Summer', rainfallMm: 8, desc: 'Desert warmth; excellent off-peak luxury palace resort pricing and private treatment.' },
      { month: 'Jun', name: 'June', avgTempC: 34, highTempC: 40, lowTempC: 28, status: 'hot', statusLabel: 'High Summer', rainfallMm: 35, desc: 'Pre-monsoon skies; relaxed indoor museum explorations and royal spa retreats.' },
      { month: 'Jul', name: 'July', avgTempC: 30, highTempC: 35, lowTempC: 26, status: 'hot', statusLabel: 'Desert Rains', rainfallMm: 140, desc: 'Monsoon breathes emerald life into the Aravalli hills surrounding Udaipur lakes.' },
      { month: 'Aug', name: 'August', avgTempC: 28, highTempC: 33, lowTempC: 25, status: 'good', statusLabel: 'Emerald Monsoon', rainfallMm: 160, desc: 'Lakes brim full; romantic monsoon atmosphere at Lake Palace and Monsoon Palace.' },
      { month: 'Sep', name: 'September', avgTempC: 29, highTempC: 34, lowTempC: 24, status: 'good', statusLabel: 'Post-Monsoon', rainfallMm: 60, desc: 'Lush countryside; pleasant evening rooftop dining overlooking illuminated forts.' },
      { month: 'Oct', name: 'October', avgTempC: 26, highTempC: 33, lowTempC: 19, status: 'best', statusLabel: 'Best time', rainfallMm: 10, desc: 'Royal season begins; Diwali festivities, crisp evenings, and clear desert skies.' },
      { month: 'Nov', name: 'November', avgTempC: 21, highTempC: 28, lowTempC: 13, status: 'best', statusLabel: 'Best time', rainfallMm: 3, desc: 'Comfortable 24°C days; Pushkar Fair vibe; desert luxury glamping under the Milky Way.' },
      { month: 'Dec', name: 'December', avgTempC: 17, highTempC: 24, lowTempC: 9, status: 'best', statusLabel: 'Best time', rainfallMm: 3, desc: 'Peak luxury heritage season; crisp starlit fort dinners and festive royal galas.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'August, September and March',
      desc: 'Monsoon transforms the desert into an emerald wonderland around Udaipur, while March brings colorful folk festivals with moderate crowds.'
    },
    peakSeason: {
      title: 'Peak Season',
      months: 'November to February',
      desc: 'Warm, golden daytime sunshine and chilly desert nights — the quintessential royal Maharaja experience with full access to outdoor courtyard dinners.'
    },
    lowSeason: {
      title: 'Low Season',
      months: 'May to July',
      desc: 'Warm desert summer offering unbeatable VIP rates at India’s finest 5-star palace hotels with private plunge pools.'
    }
  },

  // ── KERALA & SOUTH INDIA (Munnar, Alleppey, Kochi, Wayanad) ──
  'kerala': {
    region: 'Kerala & Western Ghats, South India',
    bestTimeHeadline: 'September to March (Pleasant Breeze)',
    bestMonths: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: 25, highTempC: 29, lowTempC: 20, status: 'best', statusLabel: 'Best time', rainfallMm: 15, desc: 'Sunny and breezy backwaters; crisp cool mist in Munnar tea plantations.' },
      { month: 'Feb', name: 'February', avgTempC: 26, highTempC: 30, lowTempC: 21, status: 'best', statusLabel: 'Best time', rainfallMm: 20, desc: 'Clear skies for private houseboat cruises and tranquil Arabian Sea sunsets.' },
      { month: 'Mar', name: 'March', avgTempC: 28, highTempC: 32, lowTempC: 23, status: 'good', statusLabel: 'Warm Spring', rainfallMm: 40, desc: 'Warm afternoons, pleasant morning spice plantation strolls.' },
      { month: 'Apr', name: 'April', avgTempC: 29, highTempC: 33, lowTempC: 24, status: 'hot', statusLabel: 'Tropical Warmth', rainfallMm: 110, desc: 'Vishu festival; refreshing coconut water and luxury infinity pool retreats.' },
      { month: 'May', name: 'May', avgTempC: 29, highTempC: 32, lowTempC: 24, status: 'hot', statusLabel: 'Warm Pre-Monsoon', rainfallMm: 220, desc: 'Evening summer showers; lush spice valleys and Ayurvedic body rejuvenation.' },
      { month: 'Jun', name: 'June', avgTempC: 26, highTempC: 29, lowTempC: 23, status: 'rainy', statusLabel: 'Southwest Monsoon', rainfallMm: 550, desc: 'Peak monsoon; prime season for authentic Ayurvedic treatments (Panchakarma).' },
      { month: 'Jul', name: 'July', avgTempC: 25, highTempC: 28, lowTempC: 22, status: 'rainy', statusLabel: 'Monsoon Rains', rainfallMm: 480, desc: 'Cascading Athirappilly waterfalls; dramatic mist wrapping Munnar tea estates.' },
      { month: 'Aug', name: 'August', avgTempC: 26, highTempC: 28, lowTempC: 22, status: 'good', statusLabel: 'Onam Festivities', rainfallMm: 320, desc: 'Traditional Snake Boat races; Onam cultural feasts; vibrant green backwaters.' },
      { month: 'Sep', name: 'September', avgTempC: 26, highTempC: 29, lowTempC: 23, status: 'best', statusLabel: 'Best time', rainfallMm: 180, desc: 'Post-monsoon freshness; tranquil backwaters cruising and pristine beaches.' },
      { month: 'Oct', name: 'October', avgTempC: 26, highTempC: 29, lowTempC: 23, status: 'best', statusLabel: 'Best time', rainfallMm: 250, desc: 'Pleasant tropical breeze; light evening showers followed by clear starry skies.' },
      { month: 'Nov', name: 'November', avgTempC: 26, highTempC: 30, lowTempC: 22, status: 'best', statusLabel: 'Best time', rainfallMm: 140, desc: 'Mild tropical sunshine; peak backwaters houseboat luxury with private chef.' },
      { month: 'Dec', name: 'December', avgTempC: 25, highTempC: 29, lowTempC: 21, status: 'best', statusLabel: 'Best time', rainfallMm: 35, desc: 'Holiday energy; Kochi Biennale art festival; ideal beach & hill combo weather.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'April and August',
      desc: 'August brings the thrilling snake boat races and Onam cultural grandeur, while April offers serene hill-station respites in Munnar.'
    },
    peakSeason: {
      title: 'Peak Season',
      months: 'September to March',
      desc: 'Sunlit canal cruises, gentle sea breezes, and cool mist rolling over high-altitude tea hills without heavy rain.'
    },
    lowSeason: {
      title: 'Low Season (Monsoon Wellness)',
      months: 'June and July',
      desc: 'The celebrated Ayurvedic Monsoon season — traditional masters consider this the most therapeutic time for herbal oil rejuvenation.'
    }
  },

  // ── BALI & INDONESIA (Ubud, Seminyak, Nusa Penida) ──
  'bali': {
    region: 'Bali & Lesser Sunda Islands, Indonesia',
    bestTimeHeadline: 'April to October (Dry & Sunny)',
    bestMonths: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: 27, highTempC: 30, lowTempC: 24, status: 'rainy', statusLabel: 'Tropical Rains', rainfallMm: 280, desc: 'Tropical morning showers clearing for sunny afternoons; emerald green rice terraces.' },
      { month: 'Feb', name: 'February', avgTempC: 27, highTempC: 30, lowTempC: 24, status: 'rainy', statusLabel: 'Tropical Rains', rainfallMm: 260, desc: 'Warm ocean water; waterfalls at peak flow; serene private pool villa relaxation.' },
      { month: 'Mar', name: 'March', avgTempC: 27, highTempC: 31, lowTempC: 24, status: 'good', statusLabel: 'Nyepi & Renewal', rainfallMm: 210, desc: 'Balinese Day of Silence (Nyepi); peaceful soul rejuvenation and cultural rituals.' },
      { month: 'Apr', name: 'April', avgTempC: 28, highTempC: 32, lowTempC: 24, status: 'best', statusLabel: 'Best time', rainfallMm: 95, desc: 'Dry season begins; brilliant sunny skies and calm turquoise seas for snorkeling.' },
      { month: 'May', name: 'May', avgTempC: 28, highTempC: 31, lowTempC: 24, status: 'best', statusLabel: 'Best time', rainfallMm: 75, desc: 'Warm sunshine, low humidity; ideal for clifftop Uluwatu sunset fire dances.' },
      { month: 'Jun', name: 'June', avgTempC: 27, highTempC: 30, lowTempC: 23, status: 'best', statusLabel: 'Best time', rainfallMm: 60, desc: 'Pleasant gentle trade winds; clear skies for Mount Batur sunrise volcanic treks.' },
      { month: 'Jul', name: 'July', avgTempC: 26, highTempC: 29, lowTempC: 22, status: 'best', statusLabel: 'Best time', rainfallMm: 50, desc: 'Crisp cool ocean breezes; world-class surfing and beach club sunset sessions.' },
      { month: 'Aug', name: 'August', avgTempC: 26, highTempC: 29, lowTempC: 22, status: 'best', statusLabel: 'Best time', rainfallMm: 45, desc: 'Driest month of the year; brilliant azure waters and endless sunny days.' },
      { month: 'Sep', name: 'September', avgTempC: 27, highTempC: 30, lowTempC: 23, status: 'best', statusLabel: 'Best time', rainfallMm: 55, desc: 'Peak conditions continue with thinner shoulder crowds and relaxed island vibes.' },
      { month: 'Oct', name: 'October', avgTempC: 28, highTempC: 31, lowTempC: 24, status: 'best', statusLabel: 'Best time', rainfallMm: 90, desc: 'Warm tropical sun; excellent underwater visibility for manta ray diving in Nusa Penida.' },
      { month: 'Nov', name: 'November', avgTempC: 28, highTempC: 31, lowTempC: 24, status: 'good', statusLabel: 'Spring Transitions', rainfallMm: 155, desc: 'Warm seas; light tropical showers; rich spa days and temple blessings.' },
      { month: 'Dec', name: 'December', avgTempC: 27, highTempC: 30, lowTempC: 24, status: 'good', statusLabel: 'Festive Season', rainfallMm: 240, desc: 'Festive holiday celebrations; bustling beach parties and luxury New Year galas.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'April, May and September',
      desc: 'The sweet spot of Bali travel — sunny dry skies, pleasant breezes, and easy reservations at top clifftop dining spots.'
    },
    peakSeason: {
      title: 'Peak Season',
      months: 'July, August & Christmas/New Year',
      desc: 'Vibrant beach clubs, dry sunny weather every day, and energetic island nightlife across Seminyak and Canggu.'
    },
    lowSeason: {
      title: 'Low Season',
      months: 'January to March',
      desc: 'Warm tropical rains typically fall in short afternoon bursts, keeping the island lush and private villas peaceful.'
    }
  },

  // ── DUBAI & UAE (Dubai, Abu Dhabi, Desert Dunes) ──
  'dubai': {
    region: 'United Arab Emirates & Arabian Gulf',
    bestTimeHeadline: 'November to April (Golden Winter)',
    bestMonths: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: 20, highTempC: 24, lowTempC: 15, status: 'best', statusLabel: 'Best time', rainfallMm: 10, desc: 'Glorious 24°C sunshine; Dubai Shopping Festival; beach loungers and dune safaris.' },
      { month: 'Feb', name: 'February', avgTempC: 21, highTempC: 25, lowTempC: 16, status: 'best', statusLabel: 'Best time', rainfallMm: 12, desc: 'Crisp pleasant evenings; yacht cruises around Dubai Marina and Burj Al Arab.' },
      { month: 'Mar', name: 'March', avgTempC: 24, highTempC: 29, lowTempC: 18, status: 'best', statusLabel: 'Best time', rainfallMm: 15, desc: 'Warm beach weather, luxury rooftop clubs, and clear desert nights.' },
      { month: 'Apr', name: 'April', avgTempC: 28, highTempC: 33, lowTempC: 22, status: 'best', statusLabel: 'Best time', rainfallMm: 5, desc: 'Pleasant warm sunshine; perfect waterpark and private beach club season.' },
      { month: 'May', name: 'May', avgTempC: 32, highTempC: 38, lowTempC: 26, status: 'hot', statusLabel: 'Summer Sun', rainfallMm: 1, desc: 'Warm summer arrives; air-conditioned luxury mega malls and indoor ski slopes.' },
      { month: 'Jun', name: 'June', avgTempC: 35, highTempC: 40, lowTempC: 28, status: 'hot', statusLabel: 'High Summer', rainfallMm: 0, desc: 'Hot desert sunshine; sunrise dune buggy adventures followed by chilled pool cabanas.' },
      { month: 'Jul', name: 'July', avgTempC: 37, highTempC: 42, lowTempC: 30, status: 'hot', statusLabel: 'High Summer', rainfallMm: 0, desc: 'Mid-summer; unbeatable VIP luxury hotel suites at 50% discount and indoor attractions.' },
      { month: 'Aug', name: 'August', avgTempC: 37, highTempC: 42, lowTempC: 31, status: 'hot', statusLabel: 'High Summer', rainfallMm: 0, desc: 'Ultra-luxury dining indoors, Dubai Frame VIP lounges, and temperature-controlled pools.' },
      { month: 'Sep', name: 'September', avgTempC: 34, highTempC: 39, lowTempC: 28, status: 'hot', statusLabel: 'Warm Evenings', rainfallMm: 0, desc: 'Warm evenings return; seaside sunset dining and evening desert barbecues.' },
      { month: 'Oct', name: 'October', avgTempC: 30, highTempC: 35, lowTempC: 24, status: 'good', statusLabel: 'Winter Prelude', rainfallMm: 1, desc: 'Outdoor terraces re-open; beach weather returns with comfortable afternoon warmth.' },
      { month: 'Nov', name: 'November', avgTempC: 26, highTempC: 31, lowTempC: 20, status: 'best', statusLabel: 'Best time', rainfallMm: 3, desc: 'Magnificent weather; Abu Dhabi Grand Prix F1 weekend; alfresco dining everywhere.' },
      { month: 'Dec', name: 'December', avgTempC: 22, highTempC: 26, lowTempC: 17, status: 'best', statusLabel: 'Best time', rainfallMm: 8, desc: 'World-famous New Year fireworks; Burj Khalifa light shows; flawless 25°C warmth.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'May & September to October',
      desc: 'Comfortable mornings and evenings with warm midday sunshine, offering great balance of outdoor dining and luxury hotel value.'
    },
    peakSeason: {
      title: 'Peak Season',
      months: 'November to March',
      desc: 'Flawless blue skies, 24°C daytime temperatures, outdoor beach clubs, and starlit desert safari dinners.'
    },
    lowSeason: {
      title: 'Low Season',
      months: 'June to August',
      desc: 'Warm desert summer where Dubai shifts indoors to air-conditioned marvels, private refrigerated infinity pools, and Michelin dining.'
    }
  },

  // ── EUROPE & SWITZERLAND (Zurich, Lucerne, Interlaken, Rome, Paris) ──
  'europe': {
    region: 'Central Europe & Alpine Switzerland',
    bestTimeHeadline: 'May to September & Dec-Feb (Snow)',
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: 1, highTempC: 4, lowTempC: -2, status: 'rainy', statusLabel: 'Alpine Snow', rainfallMm: 65, desc: 'World-class Swiss skiing; glacier trains; Matterhorn peaks blanketed in winter snow.' },
      { month: 'Feb', name: 'February', avgTempC: 2, highTempC: 6, lowTempC: -2, status: 'rainy', statusLabel: 'Ski Season', rainfallMm: 60, desc: 'Winter sports peak; cozy fondue chalets in Zermatt and Lucerne.' },
      { month: 'Mar', name: 'March', avgTempC: 6, highTempC: 11, lowTempC: 2, status: 'good', statusLabel: 'Early Spring', rainfallMm: 70, desc: 'Spring blooms along Lake Geneva; snow remains on high mountain summits.' },
      { month: 'Apr', name: 'April', avgTempC: 10, highTempC: 15, lowTempC: 5, status: 'good', statusLabel: 'Spring Blossom', rainfallMm: 75, desc: 'Lakeside promenades come alive with tulips; scenic cogwheel trains open.' },
      { month: 'May', name: 'May', avgTempC: 15, highTempC: 20, lowTempC: 9, status: 'best', statusLabel: 'Best time', rainfallMm: 95, desc: 'Lush green alpine meadows; snow-capped peak contrasts; pleasant mild days.' },
      { month: 'Jun', name: 'June', avgTempC: 18, highTempC: 23, lowTempC: 13, status: 'best', statusLabel: 'Best time', rainfallMm: 115, desc: 'Long daylight hours (sunlight till 9:30 PM); Lake Lucerne steamship cruises.' },
      { month: 'Jul', name: 'July', avgTempC: 21, highTempC: 26, lowTempC: 15, status: 'best', statusLabel: 'Best time', rainfallMm: 120, desc: 'Warm alpine summer; hiking trails open; Jungfraujoch Top of Europe visits.' },
      { month: 'Aug', name: 'August', avgTempC: 20, highTempC: 25, lowTempC: 15, status: 'best', statusLabel: 'Best time', rainfallMm: 115, desc: 'Swiss National Day festivities; vibrant outdoor cafe culture in Zurich and Geneva.' },
      { month: 'Sep', name: 'September', avgTempC: 16, highTempC: 21, lowTempC: 11, status: 'best', statusLabel: 'Best time', rainfallMm: 85, desc: 'Crisp autumn clarity; wine harvest along Lavaux terraces; golden mountain trees.' },
      { month: 'Oct', name: 'October', avgTempC: 11, highTempC: 15, lowTempC: 7, status: 'good', statusLabel: 'Golden Autumn', rainfallMm: 75, desc: 'Spectacular fall foliage; cultural museums and peaceful historic town walks.' },
      { month: 'Nov', name: 'November', avgTempC: 5, highTempC: 9, lowTempC: 2, status: 'good', statusLabel: 'Late Autumn', rainfallMm: 70, desc: 'First winter snow dusts the hills; Christmas markets begin preparations.' },
      { month: 'Dec', name: 'December', avgTempC: 2, highTempC: 5, lowTempC: -1, status: 'rainy', statusLabel: 'Festive Lights', rainfallMm: 75, desc: 'Enchanting Christmas markets, fairy-tale illuminated cobblestones, and hot mulled wine.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'April, May and September',
      desc: 'Mild comfortable temperatures, lush green meadows, and much smaller queues at scenic mountain cable cars.'
    },
    peakSeason: {
      title: 'Peak Season',
      months: 'June to August & Christmas/New Year',
      desc: 'Glorious long summer days, open alpine passes, warm lakeside swimming, and bustling holiday markets.'
    },
    lowSeason: {
      title: 'Low Season',
      months: 'November & March',
      desc: 'Quiet transitional months offering authentic local life, peaceful museums, and excellent boutique hotel availability.'
    }
  }
};

/**
 * Resolves climate profile by destination or tour keyword.
 * Fallbacks intelligently based on destination name or category.
 */
export function getDestinationClimate(tour = {}) {
  const text = [
    tour.destination,
    tour.location,
    tour.name,
    tour.city,
    tour.state,
    tour.country,
    ...(tour.tags || [])
  ].filter(Boolean).join(' ').toLowerCase();

  if (text.includes('dalhousie') || text.includes('dharamshala') || text.includes('manali') || text.includes('himachal') || text.includes('shimla')) {
    return { ...DESTINATION_CLIMATES.dalhousie, destinationName: tour.destination || 'Dalhousie & Dharamshala' };
  }
  if (text.includes('kashmir') || text.includes('srinagar') || text.includes('gulmarg') || text.includes('pahalgam') || text.includes('ladakh') || text.includes('leh')) {
    return { ...DESTINATION_CLIMATES.kashmir, destinationName: tour.destination || 'Kashmir & Himalayas' };
  }
  if (text.includes('rajasthan') || text.includes('jaipur') || text.includes('udaipur') || text.includes('jodhpur') || text.includes('jaisalmer') || text.includes('golden triangle') || text.includes('agra')) {
    return { ...DESTINATION_CLIMATES.rajasthan, destinationName: tour.destination || 'Rajasthan Heritage' };
  }
  if (text.includes('kerala') || text.includes('munnar') || text.includes('alleppey') || text.includes('kochi') || text.includes('wayanad') || text.includes('south india') || text.includes('coorg')) {
    return { ...DESTINATION_CLIMATES.kerala, destinationName: tour.destination || 'Kerala & Western Ghats' };
  }
  if (text.includes('bali') || text.includes('indonesia') || text.includes('ubud') || text.includes('seminyak')) {
    return { ...DESTINATION_CLIMATES.bali, destinationName: tour.destination || 'Bali Island' };
  }
  if (text.includes('dubai') || text.includes('abu dhabi') || text.includes('uae')) {
    return { ...DESTINATION_CLIMATES.dubai, destinationName: tour.destination || 'Dubai & UAE' };
  }
  if (text.includes('europe') || text.includes('swiss') || text.includes('switzerland') || text.includes('paris') || text.includes('rome') || text.includes('italy') || text.includes('france') || text.includes('zurich')) {
    return { ...DESTINATION_CLIMATES.europe, destinationName: tour.destination || 'Europe & Switzerland' };
  }

  // Default fallback (uses Himachal temperate mountain model customized with tour destination)
  return {
    ...DESTINATION_CLIMATES.dalhousie,
    region: tour.location || 'Curated Vacation Destination',
    destinationName: tour.destination || tour.location || 'Your Destination'
  };
}
