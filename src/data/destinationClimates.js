/**
 * Destination Climatological Database & Weather Intelligence Engine
 * 
 * Provides 12-month historical temperature, precipitation, and seasonal classification 
 * modelled after official meteorological averages (IMD, NOAA / WorldClim).
 * 
 * Classifications:
 * - 'best': Optimal weather, clear skies, peak comfort (Emerald / Green)
 * - 'good': Pleasant conditions, great sightseeing, shoulder value (Teal / Mint)
 * - 'hot': High season / warm sun / festive energy (Amber / Golden)
 * - 'rainy': Monsoonal rains / heavy downpours (Royal Blue)
 * - 'cold': Crisp winter chill / snowfall (Ice Sky Blue)
 */

export const DESTINATION_CLIMATES = {
  // ── CENTRAL INDIA & MADHYA PRADESH (Gwalior, Orchha, Bhopal, Indore, Ujjain, Pachmarhi, Jabalpur, Khajuraho) ──
  'central_india': {
    region: 'Madhya Pradesh & Central India Heritage',
    bestTimeHeadline: 'October to March (Royal Winter)',
    bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: 16, highTempC: 23, lowTempC: 8, status: 'best', statusLabel: 'Best time', rainfallMm: 8, desc: 'Pleasant, crisp winter sunshine; ideal for Gwalior Fort exploration, royal palaces, and open-jeep tiger safaris.' },
      { month: 'Feb', name: 'February', avgTempC: 19, highTempC: 26, lowTempC: 10, status: 'best', statusLabel: 'Best time', rainfallMm: 6, desc: 'Warm sunny days and cool refreshing evenings; comfortable sightseeing across Orchha cenotaphs and temples.' },
      { month: 'Mar', name: 'March', avgTempC: 25, highTempC: 32, lowTempC: 16, status: 'good', statusLabel: 'Pleasant Spring', rainfallMm: 4, desc: 'Spring warmth sets in; clear sunny skies and great wildlife sighting opportunities in national parks.' },
      { month: 'Apr', name: 'April', avgTempC: 32, highTempC: 39, lowTempC: 22, status: 'hot', statusLabel: 'Warm & Sunny', rainfallMm: 3, desc: 'Summery heat begins; morning palace tours recommended followed by cool heritage hotel stays.' },
      { month: 'May', name: 'May', avgTempC: 36, highTempC: 42, lowTempC: 27, status: 'hot', statusLabel: 'Dry Summer', rainfallMm: 5, desc: 'Peak summer; prime tiger safari tracking at waterholes, with luxury resort staycations.' },
      { month: 'Jun', name: 'June', avgTempC: 35, highTempC: 41, lowTempC: 28, status: 'hot', statusLabel: 'Pre-Monsoon', rainfallMm: 65, desc: 'Pre-monsoon breezes; scenic cloudscapes forming over central plateau and Vindhya ranges.' },
      { month: 'Jul', name: 'July', avgTempC: 30, highTempC: 34, lowTempC: 25, status: 'rainy', statusLabel: 'Monsoon Showers', rainfallMm: 240, desc: 'Revitalizing monsoons; rivers swell and Betwa river in Orchha and Pachmarhi hills turn lush green.' },
      { month: 'Aug', name: 'August', avgTempC: 28, highTempC: 32, lowTempC: 24, status: 'rainy', statusLabel: 'Lush Greenery', rainfallMm: 260, desc: 'Verdant forests and cascading waterfalls at Bhedaghat marble rocks and Pachmarhi.' },
      { month: 'Sep', name: 'September', avgTempC: 28, highTempC: 33, lowTempC: 23, status: 'good', statusLabel: 'Post-Monsoon', rainfallMm: 120, desc: 'Clear blue skies return, countryside is richly carpeted in green, and weather cools down.' },
      { month: 'Oct', name: 'October', avgTempC: 25, highTempC: 32, lowTempC: 18, status: 'best', statusLabel: 'Best time', rainfallMm: 20, desc: 'Beginning of the golden travel season; pleasant breezes and clear night skies for heritage tours.' },
      { month: 'Nov', name: 'November', avgTempC: 20, highTempC: 28, lowTempC: 12, status: 'best', statusLabel: 'Best time', rainfallMm: 6, desc: 'Crisp autumn weather, ideal outdoor temperatures, and vibrant cultural festivities.' },
      { month: 'Dec', name: 'December', avgTempC: 17, highTempC: 24, lowTempC: 9, status: 'best', statusLabel: 'Best time', rainfallMm: 5, desc: 'Perfect mild winter; sunny comfortable afternoons for palace walking and cozy campfire evenings.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'March, September and October',
      desc: 'Pleasant transition months with great photography light, emerald green countryside, and minimal tourist rush.'
    },
    peakSeason: {
      title: 'Peak Season',
      months: 'November to February (Winter)',
      desc: 'Delightful daytime temperatures, crisp evening air, and ideal sightseeing conditions across palaces and forts.'
    },
    lowSeason: {
      title: 'Low Season',
      months: 'April to June',
      desc: 'Hot daytime temperatures; popular for high-probability tiger sightings and discounted luxury palace suites.'
    }
  },

  // ── HIMACHAL PRADESH (Dalhousie, Dharamshala, Manali, Shimla) ──
  'dalhousie': {
    region: 'Himachal Pradesh, Western Himalayas',
    bestTimeHeadline: 'April, May, June and September',
    bestMonths: ['Apr', 'May', 'Jun', 'Sep'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: 8, highTempC: 11, lowTempC: 2, status: 'cold', statusLabel: 'Snow / Winter Chill', rainfallMm: 85, desc: 'Crisp winter snow blankets higher ridges; scenic pine trees dusted in white.' },
      { month: 'Feb', name: 'February', avgTempC: 10, highTempC: 13, lowTempC: 4, status: 'cold', statusLabel: 'Crisp Snow Melt', rainfallMm: 90, desc: 'Snow begins melting in lower valleys; sunny afternoons with chilly evenings.' },
      { month: 'Mar', name: 'March', avgTempC: 15, highTempC: 18, lowTempC: 8, status: 'good', statusLabel: 'Pleasant Spring', rainfallMm: 70, desc: 'Rhododendrons in full bloom; pleasant walking weather through pine trails.' },
      { month: 'Apr', name: 'April', avgTempC: 20, highTempC: 24, lowTempC: 12, status: 'best', statusLabel: 'Best time', rainfallMm: 45, desc: 'Golden mountain sunshine, clear horizon visibility towards the Pir Panjal range.' },
      { month: 'May', name: 'May', avgTempC: 24, highTempC: 28, lowTempC: 16, status: 'best', statusLabel: 'Best time', rainfallMm: 35, desc: 'Ideal warm climate; perfect for Khajjiar meadows and Dainkund panoramic treks.' },
      { month: 'Jun', name: 'June', avgTempC: 26, highTempC: 30, lowTempC: 18, status: 'best', statusLabel: 'Best time', rainfallMm: 65, desc: 'Peak mountain summer; cool pine breezes shield travelers from plain heatwaves.' },
      { month: 'Jul', name: 'July', avgTempC: 23, highTempC: 26, lowTempC: 17, status: 'rainy', statusLabel: 'Misty Monsoon', rainfallMm: 290, desc: 'Romantic misty clouds drifting through pine valleys; lush green carpet across meadows.' },
      { month: 'Aug', name: 'August', avgTempC: 22, highTempC: 25, lowTempC: 16, status: 'rainy', statusLabel: 'Monsoon Greenery', rainfallMm: 280, desc: 'Cascading waterfalls at full roar; vibrant fresh greenery everywhere.' },
      { month: 'Sep', name: 'September', avgTempC: 21, highTempC: 25, lowTempC: 14, status: 'best', statusLabel: 'Best time', rainfallMm: 80, desc: 'Crystal clear post-monsoon skies, lush green hills, and cool refreshing breezes.' },
      { month: 'Oct', name: 'October', avgTempC: 17, highTempC: 21, lowTempC: 10, status: 'good', statusLabel: 'Crisp Autumn', rainfallMm: 25, desc: 'Crisp autumn air, golden foliage, and exceptional mountain peak photography.' },
      { month: 'Nov', name: 'November', avgTempC: 13, highTempC: 17, lowTempC: 6, status: 'good', statusLabel: 'Early Winter', rainfallMm: 18, desc: 'Quiet, serene ambiance; cool sunny afternoons and starry campfire nights.' },
      { month: 'Dec', name: 'December', avgTempC: 9, highTempC: 13, lowTempC: 3, status: 'cold', statusLabel: 'Snow / Winter Chill', rainfallMm: 40, desc: 'Winter snowfall begins; cozy colonial fireplaces and festive holiday charm.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'April, May and September',
      desc: 'Warm enough for Khajjiar meadows, cool enough for the alpine passes, and serene quiet along pine trails.'
    },
    peakSeason: {
      title: 'Peak Season',
      months: 'May, June and Late December',
      desc: 'Pleasantly warm, vibrant mountain promenade walks. Advance bookings for luxury view suites are highly recommended.'
    },
    lowSeason: {
      title: 'Low Season',
      months: 'January to March',
      desc: 'Colonial heritage retreats hibernate in peace, upper ridges are blanketed in winter snow, and peaceful quiet descends upon the town.'
    }
  },

  // ── UTTARAKHAND (Haridwar, Rishikesh, Mussoorie, Nainital, Jim Corbett) ──
  'uttarakhand': {
    region: 'Uttarakhand & Garhwal / Kumaon Himalayas',
    bestTimeHeadline: 'March to June & September to November',
    bestMonths: ['Mar', 'Apr', 'May', 'Jun', 'Sep', 'Oct', 'Nov'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: 10, highTempC: 15, lowTempC: 3, status: 'cold', statusLabel: 'Winter Snow Chill', rainfallMm: 45, desc: 'Chilly mountain weather; snow in Mussoorie/Nainital peaks, serene Ganga Aarti in Haridwar.' },
      { month: 'Feb', name: 'February', avgTempC: 13, highTempC: 18, lowTempC: 6, status: 'cold', statusLabel: 'Crisp Winter Sun', rainfallMm: 50, desc: 'Pleasant winter sunshine; great for Rishikesh rafting and wildlife safaris in Corbett.' },
      { month: 'Mar', name: 'March', avgTempC: 19, highTempC: 25, lowTempC: 11, status: 'best', statusLabel: 'Best time', rainfallMm: 35, desc: 'Fresh mountain spring; blooming orchards, sparkling turquoise Ganga, and ideal weather.' },
      { month: 'Apr', name: 'April', avgTempC: 24, highTempC: 31, lowTempC: 16, status: 'best', statusLabel: 'Best time', rainfallMm: 25, desc: 'Warm sunny weather; prime rafting and camping conditions on Rishikesh white sand beaches.' },
      { month: 'May', name: 'May', avgTempC: 28, highTempC: 35, lowTempC: 20, status: 'best', statusLabel: 'Best time', rainfallMm: 40, desc: 'Pleasant hill station escape; cool evening lake breezes in Nainital and mall road walks in Mussoorie.' },
      { month: 'Jun', name: 'June', avgTempC: 29, highTempC: 35, lowTempC: 22, status: 'good', statusLabel: 'Summer Mountain', rainfallMm: 120, desc: 'Summer holidays peak; refreshing pine breezes shield travelers from plain heat.' },
      { month: 'Jul', name: 'July', avgTempC: 26, highTempC: 30, lowTempC: 21, status: 'rainy', statusLabel: 'Monsoon Clouds', rainfallMm: 450, desc: 'Heavy monsoon rains; roaring rivers and waterfalls, lush green hills draped in clouds.' },
      { month: 'Aug', name: 'August', avgTempC: 25, highTempC: 29, lowTempC: 21, status: 'rainy', statusLabel: 'Emerald Monsoon', rainfallMm: 420, desc: 'Lush mountain green; misty valley views and quiet indoor luxury spa retreats.' },
      { month: 'Sep', name: 'September', avgTempC: 24, highTempC: 29, lowTempC: 18, status: 'best', statusLabel: 'Best time', rainfallMm: 160, desc: 'Monsoon recedes; crystal clear panoramic views of Himalayan peaks like Nanda Devi.' },
      { month: 'Oct', name: 'October', avgTempC: 20, highTempC: 26, lowTempC: 13, status: 'best', statusLabel: 'Best time', rainfallMm: 25, desc: 'Crisp autumn weather, sparkling blue skies, and optimal conditions for trekking and spiritual retreats.' },
      { month: 'Nov', name: 'November', avgTempC: 15, highTempC: 21, lowTempC: 8, status: 'best', statusLabel: 'Best time', rainfallMm: 10, desc: 'Cool sunny days and campfire nights; peaceful ambiance with low tourist rush.' },
      { month: 'Dec', name: 'December', avgTempC: 11, highTempC: 16, lowTempC: 4, status: 'cold', statusLabel: 'Winter Snow Season', rainfallMm: 20, desc: 'Winter arrives; cozy fireplace dinners and scenic mountain snowfall.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'March and November',
      desc: 'Pleasant daytime temperatures, vibrant mountain colors, and minimal tourist congestion.'
    },
    peakSeason: {
      title: 'Peak Season',
      months: 'April to June & September-October',
      desc: 'Ideal weather for river rafting, Himalayan trekking, and refreshing hill resort vacations.'
    },
    lowSeason: {
      title: 'Low Season',
      months: 'July and August',
      desc: 'Monsoon rains replenish lush vegetation and mountain streams.'
    }
  },

  // ── KASHMIR & LADAKH (Srinagar, Gulmarg, Pahalgam, Leh) ──
  'kashmir': {
    region: 'Kashmir Valley & Great Himalayas',
    bestTimeHeadline: 'April to June & September to October',
    bestMonths: ['Apr', 'May', 'Jun', 'Sep', 'Oct'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: -2, highTempC: 4, lowTempC: -6, status: 'cold', statusLabel: 'Sub-Zero Snow', rainfallMm: 60, desc: 'Gulmarg ski slopes open; Dal Lake freezes into glass; enchanting snow wonderland.' },
      { month: 'Feb', name: 'February', avgTempC: 2, highTempC: 7, lowTempC: -3, status: 'cold', statusLabel: 'Snow Season', rainfallMm: 70, desc: 'Heavy powdery snow; ideal for Gondola rides and cozy houseboat stays with Kangri.' },
      { month: 'Mar', name: 'March', avgTempC: 9, highTempC: 14, lowTempC: 4, status: 'good', statusLabel: 'Tulip Awakening', rainfallMm: 80, desc: 'Snow starts receding, world-famous Asia largest Tulip garden opens in Srinagar.' },
      { month: 'Apr', name: 'April', avgTempC: 15, highTempC: 20, lowTempC: 8, status: 'best', statusLabel: 'Best time', rainfallMm: 65, desc: 'Millions of blooming tulips, apple blossoms, and snow-capped peaks in backdrop.' },
      { month: 'May', name: 'May', avgTempC: 19, highTempC: 24, lowTempC: 11, status: 'best', statusLabel: 'Best time', rainfallMm: 50, desc: 'Perfect sunny days; Shikara rides on Dal Lake; Betaab Valley at its most picturesque.' },
      { month: 'Jun', name: 'June', avgTempC: 24, highTempC: 29, lowTempC: 15, status: 'best', statusLabel: 'Best time', rainfallMm: 35, desc: 'Pristine mountain climate; pleasant cool breeze escaping the Indian summer heat.' },
      { month: 'Jul', name: 'July', avgTempC: 26, highTempC: 31, lowTempC: 18, status: 'hot', statusLabel: 'Warm Sunshine', rainfallMm: 45, desc: 'Warmest month; high alpine lakes trekking; vibrant local saffron and walnut harvest.' },
      { month: 'Aug', name: 'August', avgTempC: 25, highTempC: 30, lowTempC: 17, status: 'hot', statusLabel: 'Sunny Days', rainfallMm: 55, desc: 'Abundant orchards of fresh apples and pears; clear skies and tranquil waterways.' },
      { month: 'Sep', name: 'September', avgTempC: 21, highTempC: 26, lowTempC: 12, status: 'best', statusLabel: 'Best time', rainfallMm: 30, desc: 'Crisp autumn clarity; golden Chinar leaves begin their majestic transformation.' },
      { month: 'Oct', name: 'October', avgTempC: 15, highTempC: 21, lowTempC: 6, status: 'best', statusLabel: 'Best time', rainfallMm: 20, desc: 'Spectacular red-gold Chinar trees; crisp cool evenings and crystal-clear mountain vistas.' },
      { month: 'Nov', name: 'November', avgTempC: 8, highTempC: 14, lowTempC: 1, status: 'good', statusLabel: 'Crisp Autumn Chill', rainfallMm: 25, desc: 'First snowfall graces the mountain peaks; cozy wood-paneled heritage suites.' },
      { month: 'Dec', name: 'December', avgTempC: 2, highTempC: 7, lowTempC: -4, status: 'cold', statusLabel: 'Winter Wonderland', rainfallMm: 40, desc: 'Chillai Kalan winter period begins; roaring bukhari heaters and snowy panoramas.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'March, September and October',
      desc: 'Spectacular transition seasons — either colorful spring tulip blooms or flaming red Chinar leaves with crisp mountain breezes.'
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

  // ── RAJASTHAN & GOLDEN TRIANGLE (Jaipur, Udaipur, Jodhpur, Jaisalmer, Agra) ──
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
      { month: 'Jul', name: 'July', avgTempC: 30, highTempC: 35, lowTempC: 26, status: 'rainy', statusLabel: 'Desert Rains', rainfallMm: 140, desc: 'Monsoon breathes emerald life into the Aravalli hills surrounding Udaipur lakes.' },
      { month: 'Aug', name: 'August', avgTempC: 28, highTempC: 33, lowTempC: 25, status: 'rainy', statusLabel: 'Emerald Monsoon', rainfallMm: 160, desc: 'Lakes brim full; romantic monsoon atmosphere at Lake Palace and Monsoon Palace.' },
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
      desc: 'Warm, golden daytime sunshine and chilly desert nights — the quintessential royal Maharaja experience.'
    },
    lowSeason: {
      title: 'Low Season',
      months: 'May to July',
      desc: 'Warm desert summer offering unbeatable VIP rates at India’s finest 5-star palace hotels with private plunge pools.'
    }
  },

  // ── UTTAR PRADESH & SPIRITUAL GANGA (Ayodhya, Varanasi, Prayagraj, Mathura) ──
  'uttar_pradesh': {
    region: 'Holy Ganga Plains & Heritage Heritage Corridor',
    bestTimeHeadline: 'October to March (Sacred Winter)',
    bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: 15, highTempC: 22, lowTempC: 8, status: 'best', statusLabel: 'Best time', rainfallMm: 12, desc: 'Crisp morning mist over the sacred Ganga; atmospheric Ghat sunrise boat rides and comfortable temple darshan.' },
      { month: 'Feb', name: 'February', avgTempC: 18, highTempC: 25, lowTempC: 11, status: 'best', statusLabel: 'Best time', rainfallMm: 10, desc: 'Pleasant warm sunshine; Mahashivratri festive energy and enchanting evening Ganga Aarti ceremonies.' },
      { month: 'Mar', name: 'March', avgTempC: 24, highTempC: 32, lowTempC: 16, status: 'good', statusLabel: 'Warm Spring', rainfallMm: 6, desc: 'Spring blooms; colorful Holi celebrations in Mathura/Vrindavan and Ayodhya.' },
      { month: 'Apr', name: 'April', avgTempC: 31, highTempC: 38, lowTempC: 22, status: 'hot', statusLabel: 'Warm Sun', rainfallMm: 5, desc: 'Summer arrives; early morning temple visits and evening cultural river strolls.' },
      { month: 'May', name: 'May', avgTempC: 35, highTempC: 42, lowTempC: 27, status: 'hot', statusLabel: 'Peak Summer', rainfallMm: 10, desc: 'High plains summer; peaceful afternoon temple meditations and air-conditioned heritage retreats.' },
      { month: 'Jun', name: 'June', avgTempC: 34, highTempC: 40, lowTempC: 28, status: 'hot', statusLabel: 'Pre-Monsoon', rainfallMm: 90, desc: 'Pre-monsoon breezes; Ganga Dussehra celebrations and dramatic river skies.' },
      { month: 'Jul', name: 'July', avgTempC: 30, highTempC: 34, lowTempC: 26, status: 'rainy', statusLabel: 'Monsoon Rains', rainfallMm: 290, desc: 'Sacred Shravan month; majestic monsoon river flow and devotional spiritual atmosphere.' },
      { month: 'Aug', name: 'August', avgTempC: 29, highTempC: 33, lowTempC: 25, status: 'rainy', statusLabel: 'Monsoon Showers', rainfallMm: 280, desc: 'Full river waters; vibrant Janmashtami celebrations and lush riverbank greenery.' },
      { month: 'Sep', name: 'September', avgTempC: 28, highTempC: 33, lowTempC: 24, status: 'good', statusLabel: 'Post-Monsoon', rainfallMm: 170, desc: 'Skies clear up; evening Aarti on Dashashwamedh Ghat under cool pleasant breezes.' },
      { month: 'Oct', name: 'October', avgTempC: 25, highTempC: 32, lowTempC: 19, status: 'best', statusLabel: 'Best time', rainfallMm: 30, desc: 'Diwali and Dev Deepawali season begins; millions of oil lamps illuminate Varanasi and Ayodhya.' },
      { month: 'Nov', name: 'November', avgTempC: 20, highTempC: 28, lowTempC: 13, status: 'best', statusLabel: 'Best time', rainfallMm: 5, desc: 'Crisp pleasant days, magical Dev Deepawali festival of lights, and optimal walking conditions.' },
      { month: 'Dec', name: 'December', avgTempC: 16, highTempC: 23, lowTempC: 9, status: 'best', statusLabel: 'Best time', rainfallMm: 6, desc: 'Atmospheric winter mornings; clear sunny afternoons for exploring Ram Mandir and Sarnath.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'March, September and October',
      desc: 'Comfortable transition months with devotional festivities and moderate crowds.'
    },
    peakSeason: {
      title: 'Peak Season',
      months: 'October to February',
      desc: 'Dev Deepawali, Ram Navami, clear skies, and deeply spiritual Ghat experiences.'
    },
    lowSeason: {
      title: 'Low Season',
      months: 'May to July',
      desc: 'Hot daytime temperatures; serene low-crowd temple darshans.'
    }
  },

  // ── GUJARAT (Dwarka, Somnath, Gir, Kutch, Ahmedabad) ──
  'gujarat': {
    region: 'Gujarat Coast, Gir Forest & White Rann of Kutch',
    bestTimeHeadline: 'October to March (Rann Utsav & Coastal Winter)',
    bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: 18, highTempC: 26, lowTempC: 11, status: 'best', statusLabel: 'Best time', rainfallMm: 1, desc: 'Full-moon night at White Rann of Kutch; Asiatic lion safaris in Gir and sunny Dwarka coastal breezes.' },
      { month: 'Feb', name: 'February', avgTempC: 21, highTempC: 29, lowTempC: 13, status: 'best', statusLabel: 'Best time', rainfallMm: 1, desc: 'Mild coastal sunshine; Somnath evening light & sound show and peaceful temple visits.' },
      { month: 'Mar', name: 'March', avgTempC: 26, highTempC: 34, lowTempC: 18, status: 'good', statusLabel: 'Pleasant Spring', rainfallMm: 1, desc: 'Warm spring sun; excellent lion sightings around Gir waterholes.' },
      { month: 'Apr', name: 'April', avgTempC: 30, highTempC: 38, lowTempC: 22, status: 'hot', statusLabel: 'Warm Coastal', rainfallMm: 0, desc: 'Warm summer sun; refreshing evening sea breezes along the Arabian Sea.' },
      { month: 'May', name: 'May', avgTempC: 32, highTempC: 39, lowTempC: 25, status: 'hot', statusLabel: 'Dry Summer', rainfallMm: 2, desc: 'High summer; prime lion tracking in Gir and resort staycations.' },
      { month: 'Jun', name: 'June', avgTempC: 32, highTempC: 37, lowTempC: 27, status: 'hot', statusLabel: 'Pre-Monsoon', rainfallMm: 60, desc: 'Coastal clouds gather; scenic Arabian Sea waves crash against Dwarka cliffs.' },
      { month: 'Jul', name: 'July', avgTempC: 29, highTempC: 33, lowTempC: 26, status: 'rainy', statusLabel: 'Monsoon Showers', rainfallMm: 280, desc: 'Lush greenery revitalizes Gir forest; temple towns experience refreshing rains.' },
      { month: 'Aug', name: 'August', avgTempC: 28, highTempC: 32, lowTempC: 25, status: 'rainy', statusLabel: 'Lush Coast', rainfallMm: 240, desc: 'Monsoon season; vibrant Janmashtami celebrations at Dwarkadhish Temple.' },
      { month: 'Sep', name: 'September', avgTempC: 29, highTempC: 33, lowTempC: 24, status: 'good', statusLabel: 'Post-Monsoon', rainfallMm: 95, desc: 'Rains recede, sea calms, and countryside turns lush and scenic.' },
      { month: 'Oct', name: 'October', avgTempC: 28, highTempC: 35, lowTempC: 21, status: 'best', statusLabel: 'Best time', rainfallMm: 15, desc: 'Navratri festive season with vibrant Garba dance celebrations and pleasant coastal evenings.' },
      { month: 'Nov', name: 'November', avgTempC: 24, highTempC: 32, lowTempC: 16, status: 'best', statusLabel: 'Best time', rainfallMm: 3, desc: 'Rann Utsav begins; magical white salt desert under the starlit sky and ideal safari weather.' },
      { month: 'Dec', name: 'December', avgTempC: 20, highTempC: 28, lowTempC: 12, status: 'best', statusLabel: 'Best time', rainfallMm: 1, desc: 'Peak winter tourism; comfortable temperatures for Dwarka darshan and Gir national park.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'March and September',
      desc: 'Moderate temperatures and lower tourist rush along the coastal temples.'
    },
    peakSeason: {
      title: 'Peak Season',
      months: 'November to February',
      desc: 'Rann of Kutch festival, Gir lion safaris, and pleasant ocean breeze in Dwarka and Somnath.'
    },
    lowSeason: {
      title: 'Low Season',
      months: 'May to July',
      desc: 'Warm coastal weather and monsoon rejuvenation.'
    }
  },

  // ── GOA & COASTAL (North Goa, South Goa, Gokarna) ──
  'goa': {
    region: 'Goa & Konkan Arabian Sea Coast',
    bestTimeHeadline: 'October to April (Tropical Sunshine)',
    bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: 25, highTempC: 31, lowTempC: 19, status: 'best', statusLabel: 'Best time', rainfallMm: 1, desc: 'Clear blue skies, dry warm days and pleasant evening sea breezes; peak beach club and water sports season.' },
      { month: 'Feb', name: 'February', avgTempC: 26, highTempC: 31, lowTempC: 20, status: 'best', statusLabel: 'Best time', rainfallMm: 1, desc: 'Goa Carnival festive energy; sunny beach lounging and serene South Goa luxury resorts.' },
      { month: 'Mar', name: 'March', avgTempC: 28, highTempC: 32, lowTempC: 23, status: 'good', statusLabel: 'Sunny Spring', rainfallMm: 2, desc: 'Warm sunny weather; dolphin spotting trips and vibrant night markets.' },
      { month: 'Apr', name: 'April', avgTempC: 30, highTempC: 33, lowTempC: 25, status: 'good', statusLabel: 'Tropical Warmth', rainfallMm: 12, desc: 'Warm ocean water, calm tides for swimming, and relaxed sunset beach shacks.' },
      { month: 'May', name: 'May', avgTempC: 30, highTempC: 33, lowTempC: 26, status: 'hot', statusLabel: 'Pre-Monsoon', rainfallMm: 90, desc: 'Pre-monsoon breezes; dramatic cloud formations and sunset cocktail cruises.' },
      { month: 'Jun', name: 'June', avgTempC: 28, highTempC: 30, lowTempC: 24, status: 'rainy', statusLabel: 'Monsoon Arrives', rainfallMm: 850, desc: 'Dudhsagar falls roar at full glory; lush spice plantations and romantic rain ambiance.' },
      { month: 'Jul', name: 'July', avgTempC: 27, highTempC: 29, lowTempC: 24, status: 'rainy', statusLabel: 'Monsoon Rains', rainfallMm: 900, desc: 'Heavy monsoon downpours; green countryside and peaceful boutique villa stays.' },
      { month: 'Aug', name: 'August', avgTempC: 27, highTempC: 29, lowTempC: 24, status: 'rainy', statusLabel: 'Emerald Monsoon', rainfallMm: 550, desc: 'Lush greenery everywhere, cascading waterfalls, and quiet serene beaches.' },
      { month: 'Sep', name: 'September', avgTempC: 27, highTempC: 30, lowTempC: 24, status: 'good', statusLabel: 'Post-Monsoon', rainfallMm: 260, desc: 'Rains recede; emerald palm trees and fresh clean air across beach villages.' },
      { month: 'Oct', name: 'October', avgTempC: 28, highTempC: 32, lowTempC: 23, status: 'best', statusLabel: 'Best time', rainfallMm: 120, desc: 'Beach shack season re-opens; calm sea and warm golden sunsets.' },
      { month: 'Nov', name: 'November', avgTempC: 27, highTempC: 32, lowTempC: 22, status: 'best', statusLabel: 'Best time', rainfallMm: 30, desc: 'Ideal vacation climate, buzzing beach restaurants and music festivals.' },
      { month: 'Dec', name: 'December', avgTempC: 26, highTempC: 32, lowTempC: 20, status: 'best', statusLabel: 'Best time', rainfallMm: 5, desc: 'World-famous holiday season, Sunburn festival, and starlit New Year beach celebrations.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'April and October',
      desc: 'Warm and sunny with calm seas and much fewer crowds.'
    },
    peakSeason: {
      title: 'Peak Season',
      months: 'November to February',
      desc: 'Flawless beach weather, water sports, vibrant nightlife, and luxury private yachts.'
    },
    lowSeason: {
      title: 'Low Season (Monsoon Magic)',
      months: 'June to August',
      desc: 'Romantic monsoon rains, roaring Dudhsagar waterfalls, and peaceful boutique resort getaways.'
    }
  },

  // ── ANDAMAN & NICOBAR (Port Blair, Havelock, Neil) ──
  'andaman': {
    region: 'Andaman & Nicobar Islands, Bay of Bengal',
    bestTimeHeadline: 'October to May (Turquoise Waters & Diving)',
    bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: 26, highTempC: 29, lowTempC: 22, status: 'best', statusLabel: 'Best time', rainfallMm: 30, desc: 'Crystal clear sea visibility; Radhanagar beach sunset walks and Scuba diving at Elephant Beach.' },
      { month: 'Feb', name: 'February', avgTempC: 26, highTempC: 30, lowTempC: 22, status: 'best', statusLabel: 'Best time', rainfallMm: 20, desc: 'Calm turquoise waters; bioluminescent night kayaking and island hopping.' },
      { month: 'Mar', name: 'March', avgTempC: 27, highTempC: 31, lowTempC: 23, status: 'best', statusLabel: 'Best time', rainfallMm: 15, desc: 'Perfect sunny days; world-class snorkeling with sea turtles and coral reef exploration.' },
      { month: 'Apr', name: 'April', avgTempC: 28, highTempC: 32, lowTempC: 24, status: 'best', statusLabel: 'Best time', rainfallMm: 60, desc: 'Warm calm tropical seas; deep sea game fishing and private speedboat cruises.' },
      { month: 'May', name: 'May', avgTempC: 28, highTempC: 31, lowTempC: 24, status: 'good', statusLabel: 'Pre-Monsoon', rainfallMm: 350, desc: 'Pre-monsoon tropical showers; emerald rainforests and beachfront luxury dining.' },
      { month: 'Jun', name: 'June', avgTempC: 27, highTempC: 30, lowTempC: 24, status: 'rainy', statusLabel: 'Monsoon Seas', rainfallMm: 480, desc: 'Southwest monsoon; dramatic ocean waves and quiet rainforest spa escapes.' },
      { month: 'Jul', name: 'July', avgTempC: 27, highTempC: 29, lowTempC: 24, status: 'rainy', statusLabel: 'Tropical Rains', rainfallMm: 420, desc: 'Monsoon showers; lush island forests and Cellular Jail historic light show.' },
      { month: 'Aug', name: 'August', avgTempC: 27, highTempC: 29, lowTempC: 24, status: 'rainy', statusLabel: 'Monsoon Season', rainfallMm: 390, desc: 'Tropical rains with sunny breaks; relaxed indoor oceanfront villa stays.' },
      { month: 'Sep', name: 'September', avgTempC: 27, highTempC: 30, lowTempC: 23, status: 'good', statusLabel: 'Transition Sun', rainfallMm: 410, desc: 'Sea calms towards late month; ferry services run smoothly between Havelock and Neil.' },
      { month: 'Oct', name: 'October', avgTempC: 27, highTempC: 30, lowTempC: 23, status: 'best', statusLabel: 'Best time', rainfallMm: 280, desc: 'Island season re-opens; diving schools resume and crystal clear blue waters return.' },
      { month: 'Nov', name: 'November', avgTempC: 27, highTempC: 30, lowTempC: 23, status: 'best', statusLabel: 'Best time', rainfallMm: 220, desc: 'Pleasant tropical breeze, pristine white sands, and calm water sports.' },
      { month: 'Dec', name: 'December', avgTempC: 26, highTempC: 29, lowTempC: 22, status: 'best', statusLabel: 'Best time', rainfallMm: 120, desc: 'Peak holiday season; world-famous beaches, scuba diving, and starlit beach dinners.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'May and September to October',
      desc: 'Pleasant warm tropical weather with occasional evening showers and tranquil uncrowded beaches.'
    },
    peakSeason: {
      title: 'Peak Season',
      months: 'December to March',
      desc: 'Pristine underwater visibility, calm seas for catamaran cruises, and radiant sunny days.'
    },
    lowSeason: {
      title: 'Low Season',
      months: 'June to August',
      desc: 'Monsoon sea swells; ideal for travelers seeking private luxury villa isolation and rainforest tranquility.'
    }
  },

  // ── NORTH EAST INDIA (Assam, Shillong, Meghalaya, Kaziranga, Sikkim) ──
  'northeast': {
    region: 'North East India & Eastern Himalayas',
    bestTimeHeadline: 'October to April (Crisp Mountain & Safari)',
    bestMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: 12, highTempC: 18, lowTempC: 6, status: 'best', statusLabel: 'Best time', rainfallMm: 10, desc: 'Crisp pleasant winter; prime rhino safaris in Kaziranga and clear Dawki crystal river boating.' },
      { month: 'Feb', name: 'February', avgTempC: 15, highTempC: 21, lowTempC: 8, status: 'best', statusLabel: 'Best time', rainfallMm: 15, desc: 'Sunny mountain days; scenic living root bridge hikes in Cherrapunji and Shillong cafe culture.' },
      { month: 'Mar', name: 'March', avgTempC: 20, highTempC: 26, lowTempC: 13, status: 'best', statusLabel: 'Best time', rainfallMm: 45, desc: 'Spring blossoms, tea gardens sprout first flush leaves, and sunny pleasant climate.' },
      { month: 'Apr', name: 'April', avgTempC: 23, highTempC: 28, lowTempC: 16, status: 'best', statusLabel: 'Best time', rainfallMm: 180, desc: 'Bihu festive celebrations, vibrant local culture, and lush green hills.' },
      { month: 'May', name: 'May', avgTempC: 25, highTempC: 29, lowTempC: 19, status: 'good', statusLabel: 'Pre-Monsoon', rainfallMm: 360, desc: 'Warm pre-monsoon rains; majestic Nohkalikai falls begin their thunderous roar.' },
      { month: 'Jun', name: 'June', avgTempC: 26, highTempC: 30, lowTempC: 21, status: 'rainy', statusLabel: 'Monsoon Rains', rainfallMm: 550, desc: 'Heavy monsoon season; Scotland of the East shrouded in romantic swirling clouds.' },
      { month: 'Jul', name: 'July', avgTempC: 26, highTempC: 30, lowTempC: 21, status: 'rainy', statusLabel: 'Monsoon Rains', rainfallMm: 520, desc: 'Dramatic waterfalls and deep misty canyons in Meghalaya.' },
      { month: 'Aug', name: 'August', avgTempC: 26, highTempC: 30, lowTempC: 21, status: 'rainy', statusLabel: 'Lush Greenery', rainfallMm: 450, desc: 'Vibrant emerald landscapes and swollen mountain streams.' },
      { month: 'Sep', name: 'September', avgTempC: 25, highTempC: 29, lowTempC: 20, status: 'good', statusLabel: 'Post-Monsoon', rainfallMm: 300, desc: 'Rains recede; clear mountain views towards Bangladesh plains from Cherrapunji rim.' },
      { month: 'Oct', name: 'October', avgTempC: 22, highTempC: 26, lowTempC: 16, status: 'best', statusLabel: 'Best time', rainfallMm: 140, desc: 'Autumn clarity; Kaziranga national park opens; crisp pleasant breezes.' },
      { month: 'Nov', name: 'November', avgTempC: 17, highTempC: 22, lowTempC: 11, status: 'best', statusLabel: 'Best time', rainfallMm: 20, desc: 'Cherry Blossom Festival in Shillong; crystal clear Dawki river transparent as glass.' },
      { month: 'Dec', name: 'December', avgTempC: 13, highTempC: 19, lowTempC: 7, status: 'best', statusLabel: 'Best time', rainfallMm: 10, desc: 'Festive winter charm; Christmas celebrations, campfires, and elephant safaris in Assam.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'April and May',
      desc: 'Lush blooming vegetation, spring wildlife activity, and refreshing afternoon mountain showers.'
    },
    peakSeason: {
      title: 'Peak Season',
      months: 'October to March',
      desc: 'Crystal-clear rivers, open national parks, Cherry Blossom festival, and comfortable sightseeing.'
    },
    lowSeason: {
      title: 'Low Season',
      months: 'June to August',
      desc: 'Monsoon rains transform the region into the wettest wonderland on earth.'
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

  // ── THAILAND & VIETNAM (Phuket, Bangkok, Krabi, Hanoi, Da Nang) ──
  'southeast_asia': {
    region: 'Thailand & Southeast Asia Tropical Coast',
    bestTimeHeadline: 'November to April (Dry Season & Azure Seas)',
    bestMonths: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: 27, highTempC: 32, lowTempC: 23, status: 'best', statusLabel: 'Best time', rainfallMm: 35, desc: 'Flawless beach weather; calm emerald waters of Phi Phi islands and James Bond island cruises.' },
      { month: 'Feb', name: 'February', avgTempC: 28, highTempC: 33, lowTempC: 24, status: 'best', statusLabel: 'Best time', rainfallMm: 25, desc: 'Warm dry sunshine; perfect snorkeling visibility and vibrant night street markets.' },
      { month: 'Mar', name: 'March', avgTempC: 29, highTempC: 34, lowTempC: 25, status: 'best', statusLabel: 'Best time', rainfallMm: 45, desc: 'Sunny and warm; luxury clifftop pool villas in Phuket and yacht sailing.' },
      { month: 'Apr', name: 'April', avgTempC: 30, highTempC: 35, lowTempC: 26, status: 'hot', statusLabel: 'Songkran Festive', rainfallMm: 120, desc: 'Songkran water festival celebrations; refreshing sea breezes and lively festivities.' },
      { month: 'May', name: 'May', avgTempC: 29, highTempC: 33, lowTempC: 26, status: 'good', statusLabel: 'Early Monsoon', rainfallMm: 280, desc: 'Tropical afternoon showers clearing for sunny mornings; great resort spa pricing.' },
      { month: 'Jun', name: 'June', avgTempC: 29, highTempC: 32, lowTempC: 26, status: 'rainy', statusLabel: 'Monsoon Showers', rainfallMm: 290, desc: 'Tropical rains; lush rainforests and uncrowded luxury beach resorts.' },
      { month: 'Jul', name: 'July', avgTempC: 28, highTempC: 32, lowTempC: 25, status: 'rainy', statusLabel: 'Tropical Rains', rainfallMm: 300, desc: 'Warm seas with intermittent showers; rich Thai cooking classes and wellness spas.' },
      { month: 'Aug', name: 'August', avgTempC: 28, highTempC: 32, lowTempC: 25, status: 'rainy', statusLabel: 'Monsoon Greenery', rainfallMm: 320, desc: 'Lush tropical greenery and scenic waterfalls at full roar.' },
      { month: 'Sep', name: 'September', avgTempC: 28, highTempC: 31, lowTempC: 25, status: 'rainy', statusLabel: 'Peak Monsoon', rainfallMm: 390, desc: 'Heaviest rainfall month; quiet beaches and authentic cultural immersions.' },
      { month: 'Oct', name: 'October', avgTempC: 28, highTempC: 32, lowTempC: 25, status: 'good', statusLabel: 'Transition Month', rainfallMm: 310, desc: 'Rains recede toward late month; island speedboats resume full schedules.' },
      { month: 'Nov', name: 'November', avgTempC: 27, highTempC: 32, lowTempC: 24, status: 'best', statusLabel: 'Best time', rainfallMm: 160, desc: 'Loy Krathong lantern festival; calm blue seas return and beach clubs buzz.' },
      { month: 'Dec', name: 'December', avgTempC: 27, highTempC: 31, lowTempC: 23, status: 'best', statusLabel: 'Best time', rainfallMm: 60, desc: 'Peak tropical holiday season; radiant sunshine, dry breezes, and world-class island hopping.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'May and October',
      desc: 'Moderate crowds, tropical warmth, and excellent value at 5-star beachfront resorts.'
    },
    peakSeason: {
      title: 'Peak Season',
      months: 'November to April',
      desc: 'Calm turquoise seas, blue skies, water sports, and energetic coastal beach nightlife.'
    },
    lowSeason: {
      title: 'Low Season',
      months: 'June to September',
      desc: 'Short afternoon tropical rains keeping the islands lush and uncrowded.'
    }
  },

  // ── JAPAN (Tokyo, Kyoto, Osaka, Kanazawa) ──
  'japan': {
    region: 'Japan & Honshu Cultural Route',
    bestTimeHeadline: 'March to May (Sakura) & Oct to Nov (Autumn)',
    bestMonths: ['Mar', 'Apr', 'May', 'Oct', 'Nov'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: 5, highTempC: 10, lowTempC: 1, status: 'cold', statusLabel: 'Winter Snow', rainfallMm: 50, desc: 'Crisp winter weather, Mount Fuji views at highest visibility, and steaming Onsen hot springs.' },
      { month: 'Feb', name: 'February', avgTempC: 6, highTempC: 10, lowTempC: 2, status: 'cold', statusLabel: 'Plum Blossoms', rainfallMm: 60, desc: 'Early plum blossoms appear; traditional tea ceremonies and cozy ramen alleys.' },
      { month: 'Mar', name: 'March', avgTempC: 10, highTempC: 15, lowTempC: 5, status: 'best', statusLabel: 'Sakura Awakening', rainfallMm: 110, desc: 'Early cherry blossoms begin to open in Tokyo and Kyoto; lovely spring strolling weather.' },
      { month: 'Apr', name: 'April', avgTempC: 15, highTempC: 20, lowTempC: 10, status: 'best', statusLabel: 'Best time', rainfallMm: 120, desc: 'Peak Cherry Blossom (Sakura) season; magical pink canopies over historic canals and temples.' },
      { month: 'May', name: 'May', avgTempC: 19, highTempC: 24, lowTempC: 15, status: 'best', statusLabel: 'Best time', rainfallMm: 130, desc: 'Lush green maple leaves, warm sunny days, and vibrant outdoor festivals.' },
      { month: 'Jun', name: 'June', avgTempC: 22, highTempC: 26, lowTempC: 19, status: 'rainy', statusLabel: 'Tsuyu Rains', rainfallMm: 170, desc: 'Hydrangeas in full bloom; romantic rainy temple gardens in Kyoto.' },
      { month: 'Jul', name: 'July', avgTempC: 26, highTempC: 30, lowTempC: 23, status: 'hot', statusLabel: 'Summer Festivals', rainfallMm: 150, desc: 'Gion Matsuri festival; evening fireworks over rivers and bustling street food stalls.' },
      { month: 'Aug', name: 'August', avgTempC: 27, highTempC: 32, lowTempC: 24, status: 'hot', statusLabel: 'Summer Sun', rainfallMm: 160, desc: 'Warm summer weather; high alpine escapes in the Japanese Alps and cool evening beers.' },
      { month: 'Sep', name: 'September', avgTempC: 24, highTempC: 28, lowTempC: 20, status: 'good', statusLabel: 'Early Autumn', rainfallMm: 210, desc: 'Temperatures cool down pleasantly; clear sunny skies and great city exploration.' },
      { month: 'Oct', name: 'October', avgTempC: 18, highTempC: 22, lowTempC: 14, status: 'best', statusLabel: 'Best time', rainfallMm: 180, desc: 'Comfortable mild weather; autumn foliage (Koyo) begins painting temple gardens in fiery red.' },
      { month: 'Nov', name: 'November', avgTempC: 12, highTempC: 17, lowTempC: 8, status: 'best', statusLabel: 'Best time', rainfallMm: 90, desc: 'Spectacular peak red Japanese maple leaves, crisp blue skies, and optimal photography.' },
      { month: 'Dec', name: 'December', avgTempC: 7, highTempC: 12, lowTempC: 3, status: 'cold', statusLabel: 'Illuminations', rainfallMm: 50, desc: 'Dazzling winter illuminations across Tokyo and Kyoto, festive holiday charm.' }
    ],
    shoulderSeason: {
      title: 'Shoulder Season',
      months: 'May and September',
      desc: 'Pleasant temperatures, fewer tourists, and lush green landscapes across castles and gardens.'
    },
    peakSeason: {
      title: 'Peak Season',
      months: 'Late March to April (Sakura) & November (Autumn)',
      desc: 'World-famous cherry blossoms or blazing autumn maples with optimal walking temperatures.'
    },
    lowSeason: {
      title: 'Low Season',
      months: 'January to February',
      desc: 'Snow-capped peaks, steaming natural onsen baths, and crisp clear mountain panoramas.'
    }
  },

  // ── EUROPE & SWITZERLAND (Zurich, Lucerne, Interlaken, Rome, Paris) ──
  'europe': {
    region: 'Central Europe & Alpine Switzerland',
    bestTimeHeadline: 'May to September & Dec-Feb (Snow)',
    bestMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
    months: [
      { month: 'Jan', name: 'January', avgTempC: 1, highTempC: 4, lowTempC: -2, status: 'cold', statusLabel: 'Alpine Snow', rainfallMm: 65, desc: 'World-class Swiss skiing; glacier trains; Matterhorn peaks blanketed in winter snow.' },
      { month: 'Feb', name: 'February', avgTempC: 2, highTempC: 6, lowTempC: -2, status: 'cold', statusLabel: 'Ski Season', rainfallMm: 60, desc: 'Winter sports peak; cozy fondue chalets in Zermatt and Lucerne.' },
      { month: 'Mar', name: 'March', avgTempC: 6, highTempC: 11, lowTempC: 2, status: 'good', statusLabel: 'Early Spring', rainfallMm: 70, desc: 'Spring blooms along Lake Geneva; snow remains on high mountain summits.' },
      { month: 'Apr', name: 'April', avgTempC: 10, highTempC: 15, lowTempC: 5, status: 'good', statusLabel: 'Spring Blossom', rainfallMm: 75, desc: 'Lakeside promenades come alive with tulips; scenic cogwheel trains open.' },
      { month: 'May', name: 'May', avgTempC: 15, highTempC: 20, lowTempC: 9, status: 'best', statusLabel: 'Best time', rainfallMm: 95, desc: 'Lush green alpine meadows; snow-capped peak contrasts; pleasant mild days.' },
      { month: 'Jun', name: 'June', avgTempC: 18, highTempC: 23, lowTempC: 13, status: 'best', statusLabel: 'Best time', rainfallMm: 115, desc: 'Long daylight hours (sunlight till 9:30 PM); Lake Lucerne steamship cruises.' },
      { month: 'Jul', name: 'July', avgTempC: 21, highTempC: 26, lowTempC: 15, status: 'best', statusLabel: 'Best time', rainfallMm: 120, desc: 'Warm alpine summer; hiking trails open; Jungfraujoch Top of Europe visits.' },
      { month: 'Aug', name: 'August', avgTempC: 20, highTempC: 25, lowTempC: 15, status: 'best', statusLabel: 'Best time', rainfallMm: 115, desc: 'Swiss National Day festivities; vibrant outdoor cafe culture in Zurich and Geneva.' },
      { month: 'Sep', name: 'September', avgTempC: 16, highTempC: 21, lowTempC: 11, status: 'best', statusLabel: 'Best time', rainfallMm: 85, desc: 'Crisp autumn clarity; wine harvest along Lavaux terraces; golden mountain trees.' },
      { month: 'Oct', name: 'October', avgTempC: 11, highTempC: 15, lowTempC: 7, status: 'good', statusLabel: 'Golden Autumn', rainfallMm: 75, desc: 'Spectacular fall foliage; cultural museums and peaceful historic town walks.' },
      { month: 'Nov', name: 'November', avgTempC: 5, highTempC: 9, lowTempC: 2, status: 'good', statusLabel: 'Late Autumn', rainfallMm: 70, desc: 'First winter snow dusts the hills; Christmas markets begin preparations.' },
      { month: 'Dec', name: 'December', avgTempC: 2, highTempC: 5, lowTempC: -1, status: 'cold', statusLabel: 'Festive Lights', rainfallMm: 75, desc: 'Enchanting Christmas markets, fairy-tale illuminated cobblestones, and hot mulled wine.' }
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

  // 1. Central India / Madhya Pradesh (Gwalior, Orchha, Bhopal, Indore, Pachmarhi, Jabalpur, Khajuraho)
  if (
    text.includes('gwalior') || 
    text.includes('orchha') || 
    text.includes('bhopal') || 
    text.includes('indore') || 
    text.includes('ujjain') || 
    text.includes('pachmarhi') || 
    text.includes('jabalpur') || 
    text.includes('khajuraho') || 
    text.includes('bandhavgarh') || 
    text.includes('kanha') || 
    text.includes('madhya pradesh')
  ) {
    return { ...DESTINATION_CLIMATES.central_india, destinationName: tour.destination || 'Gwalior, Orchha & Central India' };
  }

  // 2. Uttarakhand (Haridwar, Rishikesh, Mussoorie, Nainital, Corbett)
  if (
    text.includes('haridwar') || 
    text.includes('rishikesh') || 
    text.includes('mussoorie') || 
    text.includes('nainital') || 
    text.includes('nanital') || 
    text.includes('corbett') || 
    text.includes('uttarakhand') || 
    text.includes('dehradun')
  ) {
    return { ...DESTINATION_CLIMATES.uttarakhand, destinationName: tour.destination || 'Uttarakhand & Himalayas' };
  }

  // 3. Himachal Pradesh (Dalhousie, Dharamshala, Manali, Shimla)
  if (
    text.includes('dalhousie') || 
    text.includes('dharamshala') || 
    text.includes('manali') || 
    text.includes('himachal') || 
    text.includes('shimla') || 
    text.includes('spiti')
  ) {
    return { ...DESTINATION_CLIMATES.dalhousie, destinationName: tour.destination || 'Himachal Mountain Royalty' };
  }

  // 4. Kashmir & Ladakh
  if (
    text.includes('kashmir') || 
    text.includes('srinagar') || 
    text.includes('gulmarg') || 
    text.includes('pahalgam') || 
    text.includes('ladakh') || 
    text.includes('leh') || 
    text.includes('son marg') || 
    text.includes('sonamarg')
  ) {
    return { ...DESTINATION_CLIMATES.kashmir, destinationName: tour.destination || 'Kashmir & Himalayas' };
  }

  // 5. Rajasthan & Golden Triangle
  if (
    text.includes('rajasthan') || 
    text.includes('jaipur') || 
    text.includes('udaipur') || 
    text.includes('jodhpur') || 
    text.includes('jaisalmer') || 
    text.includes('golden triangle') || 
    text.includes('ajmer') || 
    text.includes('pushkar')
  ) {
    return { ...DESTINATION_CLIMATES.rajasthan, destinationName: tour.destination || 'Rajasthan Heritage' };
  }

  // 6. Uttar Pradesh & Ganga Heritage (Ayodhya, Varanasi, Agra)
  if (
    text.includes('ayodhya') || 
    text.includes('varanasi') || 
    text.includes('kashi') || 
    text.includes('agra') || 
    text.includes('mathura') || 
    text.includes('prayagraj')
  ) {
    return { ...DESTINATION_CLIMATES.uttar_pradesh, destinationName: tour.destination || 'Ayodhya, Varanasi & Sacred Ganga' };
  }

  // 7. Gujarat (Dwarka, Somnath, Gir, Kutch)
  if (
    text.includes('dwarka') || 
    text.includes('somnath') || 
    text.includes('gir') || 
    text.includes('gujarat') || 
    text.includes('kutch') || 
    text.includes('ahmedabad')
  ) {
    return { ...DESTINATION_CLIMATES.gujarat, destinationName: tour.destination || 'Gujarat & Saurashtra Coast' };
  }

  // 8. North East (Assam, Shillong, Meghalaya, Kaziranga, Sikkim)
  if (
    text.includes('assam') || 
    text.includes('shillong') || 
    text.includes('meghalaya') || 
    text.includes('kaziranga') || 
    text.includes('sikkim') || 
    text.includes('gangtok') || 
    text.includes('darjeeling')
  ) {
    return { ...DESTINATION_CLIMATES.northeast, destinationName: tour.destination || 'North East & Meghalaya' };
  }

  // 9. Andaman & Nicobar
  if (
    text.includes('andaman') || 
    text.includes('nicobar') || 
    text.includes('havelock') || 
    text.includes('neil') || 
    text.includes('port blair')
  ) {
    return { ...DESTINATION_CLIMATES.andaman, destinationName: tour.destination || 'Andaman & Nicobar Islands' };
  }

  // 10. Goa & Coastal
  if (
    text.includes('goa') || 
    text.includes('gokarna') || 
    text.includes('coastal')
  ) {
    return { ...DESTINATION_CLIMATES.goa, destinationName: tour.destination || 'Goa & Tropical Coast' };
  }

  // 11. Kerala & South India
  if (
    text.includes('kerala') || 
    text.includes('munnar') || 
    text.includes('alleppey') || 
    text.includes('kochi') || 
    text.includes('wayanad') || 
    text.includes('south india') || 
    text.includes('coorg') || 
    text.includes('mysore') || 
    text.includes('karnataka')
  ) {
    return { ...DESTINATION_CLIMATES.kerala, destinationName: tour.destination || 'Kerala & Western Ghats' };
  }

  // 12. Bali & Indonesia
  if (text.includes('bali') || text.includes('indonesia') || text.includes('ubud') || text.includes('seminyak')) {
    return { ...DESTINATION_CLIMATES.bali, destinationName: tour.destination || 'Bali Island' };
  }

  // 13. Dubai & UAE
  if (text.includes('dubai') || text.includes('abu dhabi') || text.includes('uae')) {
    return { ...DESTINATION_CLIMATES.dubai, destinationName: tour.destination || 'Dubai & UAE' };
  }

  // 14. Thailand & Southeast Asia (Phuket, Vietnam, Singapore, Sri Lanka)
  if (
    text.includes('phuket') || 
    text.includes('thailand') || 
    text.includes('vietnam') || 
    text.includes('singapore') || 
    text.includes('bangkok') || 
    text.includes('colombo') || 
    text.includes('kuala lumpur')
  ) {
    return { ...DESTINATION_CLIMATES.southeast_asia, destinationName: tour.destination || 'Southeast Asia & Tropical Islands' };
  }

  // 15. Japan
  if (text.includes('japan') || text.includes('tokyo') || text.includes('kyoto') || text.includes('kanazawa') || text.includes('osaka')) {
    return { ...DESTINATION_CLIMATES.japan, destinationName: tour.destination || 'Japan & Honshu Cultural Route' };
  }

  // 16. Europe & Switzerland
  if (
    text.includes('europe') || 
    text.includes('swiss') || 
    text.includes('switzerland') || 
    text.includes('paris') || 
    text.includes('rome') || 
    text.includes('italy') || 
    text.includes('france') || 
    text.includes('zurich') || 
    text.includes('milan')
  ) {
    return { ...DESTINATION_CLIMATES.europe, destinationName: tour.destination || 'Europe & Switzerland' };
  }

  // Default intelligent fallback (uses Central India / Heritage model customized with tour destination)
  return {
    ...DESTINATION_CLIMATES.central_india,
    region: tour.location || 'Curated Vacation Destination',
    destinationName: tour.destination || tour.location || 'Your Destination'
  };
}
