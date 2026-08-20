export const DESTINATION_WEATHER = [
  { city: "Kashmir", temp: "14°C", condition: "Sunny & Crisp", icon: "❄️" },
  { city: "Swiss Alps", temp: "12°C", condition: "Alpine Cool", icon: "🏔️" },
  { city: "Bali", temp: "29°C", condition: "Tropical Breeze", icon: "🌴" },
  { city: "Dubai", temp: "31°C", condition: "Clear Skies", icon: "☀️" },
  { city: "Iceland", temp: "-2°C", condition: "Aurora Night", icon: "🌌" },
  { city: "Amalfi Coast", temp: "24°C", condition: "Coastal Sun", icon: "🌊" },
  { city: "Kenya", temp: "26°C", condition: "Savannah Warmth", icon: "🦁" },
  { city: "Andaman", temp: "28°C", condition: "Azure Waters", icon: "🏖️" },
  { city: "Japan", temp: "19°C", condition: "Sakura Spring", icon: "🌸" }
];

export const HERO_SLIDES = [
  {
    id: "kashmir",
    tag: "Mountain Royalty",
    title: "Kashmir: Crown of the Himalayas",
    subtitle: "Carved wooden houseboats on Dal Lake, snow peaks in Gulmarg & private Shikara cruises.",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1920&q=85",
    location: "Srinagar & Gulmarg, India",
    startingPrice: 18999
  },
  {
    id: "swiss-alps",
    tag: "European Signature",
    title: "Swiss Alps & Titlis Glacier",
    subtitle: "Glacier Express panoramic rail, Mt. Titlis rotating cable car & Lake Lucerne yacht cruise.",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1920&q=85",
    location: "Interlaken, Lucerne & Zurich",
    startingPrice: 129999
  },
  {
    id: "bali",
    tag: "Tropical Paradise",
    title: "Exotic Bali & Nusa Penida",
    subtitle: "Ubud jungle pool villas, T-Rex cliff ocean views & clifftop Uluwatu sunset dances.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=85",
    location: "Ubud & Seminyak, Indonesia",
    startingPrice: 34999
  },
  {
    id: "dubai",
    tag: "Futuristic Luxury",
    title: "Dubai Skyline & Red Dunes",
    subtitle: "Burj Khalifa 124th floor, VIP desert safaris & private Marina yacht dinner cruises.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=85",
    location: "Dubai & Abu Dhabi, UAE",
    startingPrice: 42999
  },
  {
    id: "iceland",
    tag: "Adrenaline & Wonders",
    title: "Iceland Aurora & Ice Caves",
    subtitle: "Blue Lagoon geothermal spa, Golden Circle geysers & glacier snowmobiling under northern lights.",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1920&q=85",
    location: "Reykjavik & Vik, Iceland",
    startingPrice: 185000
  },
  {
    id: "amalfi",
    tag: "Mediterranean Romance",
    title: "Amalfi Coast & Rome Dolce Vita",
    subtitle: "Cliffside Positano luxury hotels, private yacht to Capri & VIP fast-track Colosseum tour.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=85",
    location: "Positano, Capri & Rome, Italy",
    startingPrice: 165000
  }
];

export const TOURS_DATA = [
  // --- FLAGSHIP 10 PACKAGES (PHASE 1) ---
  {
    id: "kashmir-paradise",
    name: "Kashmir Paradise: Srinagar, Gulmarg & Pahalgam",
    tagline: "Houseboat stays on Dal Lake, Gondola cable car & saffron valleys",
    region: "India",
    country: "India",
    category: "Honeymoon & Couple",
    vibeTags: ["Snow & Alpine", "Royal Luxury"],
    type: ["Honeymoon", "Mountains", "Heritage"],
    durationDays: 6,
    duration: "5 Nights / 6 Days",
    price: 18999,
    originalPrice: 24999,
    currency: "INR",
    rating: 4.96,
    reviews: 184,
    groupSize: "Private Couple / Family",
    difficulty: "Easy",
    badge: "Bestseller",
    featured: true,
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Sunset Shikara ride on serene Dal Lake",
      "Gulmarg Gondola Phase 1 & 2 tickets to snow peaks",
      "Pahalgam Betaab Valley & Aru Valley excursion",
      "Horse trek to Baisaran Meadow (Mini Switzerland)",
      "Traditional Kashmiri Wazwan gourmet dinner"
    ],
    inclusionChips: ["Private AC Cab", "5-Star Houseboat", "Breakfast & Dinner", "VIP Passes", "24/7 Concierge"],
    itinerary: [
      { day: 1, title: "Srinagar Arrival & Dal Lake Houseboat", morning: "VIP airport pickup by private chauffeur", afternoon: "Check-in to carved luxury wooden houseboat with welcome Kahwa", evening: "Sunset golden hour Shikara cruise on Dal Lake", stayTier: "5-Star Deluxe Houseboat", transport: "Private AC Sedan", meals: "Dinner" },
      { day: 2, title: "Gulmarg Gondola Ride & Snow Adventure", morning: "Scenic alpine drive through pine forests to Gulmarg", afternoon: "Ascend to 13,800ft on world-famous Gondola Phase 2", evening: "Snow sports and hot Kashmiri tea overlooking Apharwat", stayTier: "4-Star Mountain Resort", transport: "Private AC Cab", meals: "Breakfast & Dinner" },
      { day: 3, title: "Mughal Terraced Gardens & Old Town", morning: "Visit Nishat Bagh & Shalimar Bagh terraced fountains", afternoon: "Heritage walk through historic Jamia Masjid & Hazratbal", evening: "Artisanal Kashmiri pashmina & walnut craft shopping", stayTier: "5-Star Srinagar Palace", transport: "Private AC Cab", meals: "Breakfast & Dinner" },
      { day: 4, title: "Pahalgam Valley & Betaab Excursion", morning: "Drive past Pampore saffron fields to scenic Pahalgam", afternoon: "Explore Betaab Valley and Chandanwari river rapids", evening: "Riverside stroll along Lidder River with bonfire", stayTier: "4-Star Pine Forest Resort", transport: "Private AC Cab", meals: "Breakfast & Dinner" },
      { day: 5, title: "Baisaran (Mini Switzerland) Meadow Trek", morning: "Scenic pony trek to alpine meadows of Baisaran", afternoon: "Picnic lunch in rolling green meadows surrounded by pine peaks", evening: "Return to Srinagar for farewell dinner party", stayTier: "5-Star Srinagar Palace", transport: "Private AC Cab", meals: "Breakfast & Dinner" },
      { day: 6, title: "Departure with Lifetime Memories", morning: "Buffet breakfast overlooking mountain peaks", afternoon: "Chauffeur transfer to Srinagar Airport with souvenir gift", evening: "Flight departure", stayTier: "Departure", transport: "Private AC Cab", meals: "Breakfast" }
    ],
    inclusions: ["5 Nights accommodation in pre-verified 4/5-star properties", "Daily buffet breakfast and multi-course dinners", "Dedicated private AC vehicle with professional driver", "Shikara boat ride on Dal Lake", "24/7 personal tour concierge"],
    exclusions: ["Airfare / Train tickets (available on request)", "Personal laundry, telephone calls, tips", "Gondola Phase 2 tickets if opted extra on spot"],
    bestSeason: "All Year (Snow: Dec-Mar, Lush: Apr-Oct)"
  },
  {
    id: "exotic-bali",
    name: "Exotic Bali Escape: Ubud Pool Villa & Nusa Penida",
    tagline: "Private pool villas, T-Rex ocean cliffs & jungle swing adventures",
    region: "Asia",
    country: "Indonesia",
    category: "Honeymoon & Couple",
    vibeTags: ["Tropical Islands", "Royal Luxury"],
    type: ["Honeymoon", "Beach", "Culture"],
    durationDays: 7,
    duration: "6 Nights / 7 Days",
    price: 34999,
    originalPrice: 46999,
    currency: "INR",
    rating: 4.98,
    reviews: 240,
    groupSize: "Private Couple",
    difficulty: "Easy",
    badge: "Trending 2026",
    featured: true,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Overnight stay in Ubud luxury private pool villa",
      "VIP Fast boat to Nusa Penida (Kelingking T-Rex Beach)",
      "Iconic jungle swing over Tegalalang rice terraces",
      "Clifftop Uluwatu Temple & sunset Kecak fire dance",
      "2-Hour couple Balinese aromatherapy massage"
    ],
    inclusionChips: ["Private Pool Villa", "Fast Boat Passes", "Daily Breakfast", "English Chauffeur", "24/7 Concierge"],
    itinerary: [
      { day: 1, title: "Denpasar Arrival & Seminyak Resort Check-in", morning: "Arrival at Ngurah Rai Airport with flower garland welcome", afternoon: "Check-in to luxury Seminyak beachfront suite", evening: "Sunset cocktails at iconic Ku De Ta beach club", stayTier: "5-Star Beach Resort", transport: "Private AC Transport", meals: "Dinner" },
      { day: 2, title: "Tanjung Benoa Watersports & Uluwatu Temple", morning: "Banana boat & parasailing adventure at Benoa", afternoon: "Drive along southern cliffs to ancient Uluwatu temple", evening: "Watch sunset Kecak dance overlooking Indian Ocean", stayTier: "5-Star Beach Resort", transport: "Private AC Transport", meals: "Breakfast" },
      { day: 3, title: "Nusa Penida Island VIP Speedboat Tour", morning: "Speedboat to Nusa Penida island", afternoon: "Visit Kelingking T-Rex cliff, Broken Beach & Angel's Billabong", evening: "Snorkeling at Crystal Bay and return cruise", stayTier: "5-Star Beach Resort", transport: "Speedboat + SUV", meals: "Breakfast & Lunch" },
      { day: 4, title: "Transfer to Ubud & Famous Jungle Swing", morning: "Scenic transfer to cultural heartland of Ubud", afternoon: "Experience Bali giant jungle swing & Sacred Monkey Forest", evening: "Check-in to private jungle pool villa with floating dinner", stayTier: "5-Star Private Pool Villa", transport: "Private AC Transport", meals: "Breakfast & Dinner" },
      { day: 5, title: "Kintamani Volcano & Holy Water Temple", morning: "Panoramic breakfast overlooking Mount Batur volcano", afternoon: "Sacred purification bath at Tirta Empul holy spring temple", evening: "Luwak coffee plantation tasting and artisanal woodcraft market", stayTier: "5-Star Private Pool Villa", transport: "Private AC Transport", meals: "Breakfast" },
      { day: 6, title: "Tanah Lot Ocean Temple & Couple Spa", morning: "Leisure morning with floating pool breakfast", afternoon: "2-Hour traditional Balinese aromatherapy spa treatment", evening: "Sunset photos at offshore rock temple of Tanah Lot", stayTier: "5-Star Private Pool Villa", transport: "Private AC Transport", meals: "Breakfast" },
      { day: 7, title: "Departure with Relaxed Mind", morning: "Buffet breakfast in villa pavilion", afternoon: "Souvenir shopping in Kuta and airport transfer", evening: "Departure flight", stayTier: "Departure", transport: "Private AC Transport", meals: "Breakfast" }
    ],
    inclusions: ["3 Nights in 5-Star Seminyak Resort + 3 Nights in Ubud Private Pool Villa", "Daily gourmet breakfast", "Nusa Penida speedboat tickets with private island tour", "English-speaking private chauffeur", "All entry monument tickets"],
    exclusions: ["International flights", "Personal visa on arrival fee", "Personal expenses and alcoholic drinks"],
    bestSeason: "All Year (Dry: Apr-Oct, Lush: Nov-Mar)"
  },
  {
    id: "swiss-alps-dream",
    name: "Swiss Alpine Wonderland: Zurich, Lucerne & Interlaken",
    tagline: "Glacier Express, Mt. Titlis rotating cable car & Lake Lucerne yacht",
    region: "Europe",
    country: "Switzerland",
    category: "International Signature",
    vibeTags: ["Snow & Alpine", "Royal Luxury"],
    type: ["Luxury", "Mountains", "Scenic Rail"],
    durationDays: 7,
    duration: "6 Nights / 7 Days",
    price: 129999,
    originalPrice: 159999,
    currency: "INR",
    rating: 4.99,
    reviews: 88,
    groupSize: "Private / Small Group",
    difficulty: "Easy",
    badge: "Luxury Signature",
    featured: true,
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "1st Class Swiss Travel Pass for scenic rail and lake steamboats",
      "Mt. Titlis Rotair revolving cable car & Glacier Cliff Walk",
      "Jungfraujoch 'Top of Europe' cogwheel train at 11,333 feet",
      "Private 1-hour panoramic yacht cruise on Lake Lucerne",
      "Chalet stays overlooking Eiger and Lauterbrunnen waterfalls"
    ],
    inclusionChips: ["Swiss Travel Pass 1st Cl.", "Chalet Hotels", "Titlis Rotair", "Lake Cruise", "Schengen Concierge"],
    itinerary: [
      { day: 1, title: "Zurich Arrival & Bahnhofstrasse Stroll", morning: "Arrival at Zurich International Airport", afternoon: "Activate 1st Class Swiss Travel Pass and check in to hotel", evening: "Stroll along historic Limmat river and Lake Zurich promenade", stayTier: "5-Star Zurich Grand Hotel", transport: "1st Class Swiss Rail", meals: "Dinner" },
      { day: 2, title: "Scenic Rail to Lucerne & Lake Cruise", morning: "Panoramic rail journey through alpine foothills to Lucerne", afternoon: "Visit Chapel Bridge, Lion Monument & Swiss transport museum", evening: "Private 1-hour scenic lake cruise across Lake Lucerne", stayTier: "4-Star Lucerne Lake Hotel", transport: "1st Class Swiss Rail + Yacht", meals: "Breakfast" },
      { day: 3, title: "Mt. Titlis Glacier & Rotair Cable Car", morning: "Ascend Mt. Titlis on world's first revolving cable car", afternoon: "Walk Europe's highest suspension bridge and explore Ice Grotto", evening: "Swiss cheese fondue dinner in alpine chalet", stayTier: "4-Star Lucerne Lake Hotel", transport: "Cable Car + Rail", meals: "Breakfast & Dinner" },
      { day: 4, title: "Interlaken: Gateway to Alpine Peaks", morning: "Scenic train along Lake Brienz to picturesque Interlaken", afternoon: "Stroll through Hohematte park with paraglider vistas", evening: "Chocolate tasting boutique in historic Old Town", stayTier: "5-Star Interlaken Alpine Resort", transport: "1st Class Swiss Rail", meals: "Breakfast" },
      { day: 5, title: "Jungfraujoch: Top of Europe (3,454m)", morning: "Cogwheel train through Eiger mountain to Jungfraujoch", afternoon: "Marvel at Aletsch Glacier, Ice Palace sculpture galleries", evening: "Descend past scenic Grindelwald valley", stayTier: "5-Star Interlaken Alpine Resort", transport: "Jungfrau Cogwheel Train", meals: "Breakfast" },
      { day: 6, title: "Lauterbrunnen Valley of 72 Waterfalls", morning: "Excursion to Lauterbrunnen postcard valley and Staubbach Falls", afternoon: "Cable car up to car-free village of Murren with Jungfrau views", evening: "Farewell Swiss dinner overlooking Lake Thun", stayTier: "5-Star Interlaken Alpine Resort", transport: "Swiss Rail + Funicular", meals: "Breakfast & Dinner" },
      { day: 7, title: "Zurich Return & Departure", morning: "Scenic train return to Zurich Airport", afternoon: "Duty free shopping and departure flight", evening: "Arrival back home", stayTier: "Departure", transport: "1st Class Swiss Rail", meals: "Breakfast" }
    ],
    inclusions: ["6 Nights in handpicked 4 & 5-star Swiss chalets", "Swiss Travel Pass 1st Class unlimited train, bus & boat access", "Mt. Titlis Rotair and Glacier Cave passes", "Jungfraujoch Top of Europe rail tickets", "Full Schengen visa concierge assistance"],
    exclusions: ["International airfare", "Personal insurance and city tourist tax", "Lunch meals unless specified"],
    bestSeason: "May - Oct (Lush Alpine), Dec - Apr (Snow Wonderland)"
  },
  {
    id: "dubai-extravaganza",
    name: "Dubai Extravaganza: Burj Khalifa, Marina & Desert Safari",
    tagline: "Burj Khalifa 124th floor, VIP desert dune bashing & luxury Marina yacht",
    region: "Asia",
    country: "UAE",
    category: "Family Expedition",
    vibeTags: ["Royal Luxury", "Adrenaline & Adventure"],
    type: ["Family", "Luxury", "Desert"],
    durationDays: 6,
    duration: "5 Nights / 6 Days",
    price: 42999,
    originalPrice: 54999,
    currency: "INR",
    rating: 4.93,
    reviews: 195,
    groupSize: "Family / Couple",
    difficulty: "Easy",
    badge: "Top Rated",
    featured: true,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "VIP At The Top Burj Khalifa 124th & 125th Floor passes",
      "Private 4x4 Land Cruiser Red Dunes Desert Safari with BBQ Buffet",
      "Luxury 2-hour Dhow Dinner Cruise across illuminated Dubai Marina",
      "Full day Abu Dhabi tour with Sheikh Zayed Grand Mosque entry",
      "Miracle Garden flower sculptures & Gold/Spice Souk shopping"
    ],
    inclusionChips: ["4-Star Deluxe Hotel", "UAE Visa Included", "Burj Khalifa Tickets", "Desert Safari BBQ", "Private Transfers"],
    itinerary: [
      { day: 1, title: "Dubai Arrival & Marina Dhow Dinner Cruise", morning: "VIP airport assistance and private transfer to luxury hotel", afternoon: "Relax at hotel rooftop pool", evening: "2-hour illuminated skyscraper yacht dinner cruise along Dubai Marina", stayTier: "4-Star Deluxe Dubai Marina Hotel", transport: "Private AC SUV", meals: "Dinner" },
      { day: 2, title: "Dubai City Highlights & Burj Khalifa At The Top", morning: "Panoramic tour covering Palm Jumeirah, Atlantis & Burj Al Arab", afternoon: "Visit Dubai Mall and ascending to 124th floor of Burj Khalifa", evening: "Watch world-famous dancing fountain spectacle", stayTier: "4-Star Deluxe Dubai Marina Hotel", transport: "Private AC SUV", meals: "Breakfast" },
      { day: 3, title: "4x4 Red Dunes Desert Safari & Bedouin Camp", morning: "Free morning for luxury mall shopping", afternoon: "High-adrenaline 4x4 dune bashing in Lahbab Red Dunes", evening: "Camel rides, sandboarding, live Tanoura fire dance & 5-star BBQ", stayTier: "4-Star Deluxe Dubai Marina Hotel", transport: "4x4 Land Cruiser", meals: "Breakfast & Dinner" },
      { day: 4, title: "Abu Dhabi Full Day & Sheikh Zayed Grand Mosque", morning: "Drive to UAE capital Abu Dhabi", afternoon: "Marvel at pristine white marble Sheikh Zayed Grand Mosque", evening: "Ferrari World photo stop and return drive to Dubai", stayTier: "4-Star Deluxe Dubai Marina Hotel", transport: "Private AC SUV", meals: "Breakfast" },
      { day: 5, title: "Miracle Garden & Heritage Gold Souks", morning: "Stroll through world's largest natural flower garden", afternoon: "Cross Dubai Creek on traditional Abra boat to Gold & Spice Souks", evening: "Leisure evening at La Mer beachfront district", stayTier: "4-Star Deluxe Dubai Marina Hotel", transport: "Private AC SUV", meals: "Breakfast" },
      { day: 6, title: "Departure", morning: "Buffet breakfast at hotel", afternoon: "Private chauffeur transfer to Dubai International Airport", evening: "Flight departure", stayTier: "Departure", transport: "Private AC SUV", meals: "Breakfast" }
    ],
    inclusions: ["5 Nights in 4-Star Deluxe Hotel", "UAE 30-Day Tourist Visa + Insurance", "Burj Khalifa 124th/125th Floor Fast-Track Tickets", "Red Dunes Desert Safari with BBQ dinner", "Private transfers for all itineraries"],
    exclusions: ["International flights", "Dubai Tourism Dirham fee paid at check-in", "Personal shopping expenses"],
    bestSeason: "Oct - Apr (Pleasant Winter & Spring)"
  },
  {
    id: "andaman-islands",
    name: "Andaman Tropical Coral Paradise: Port Blair & Havelock",
    tagline: "Makruzz catamaran cruises, Radhanagar Beach sunsets & coral reef snorkeling",
    region: "India",
    country: "India",
    category: "Family Expedition",
    vibeTags: ["Tropical Islands", "Serene Backwaters"],
    type: ["Beach", "Family", "Island"],
    durationDays: 6,
    duration: "5 Nights / 6 Days",
    price: 22499,
    originalPrice: 28999,
    currency: "INR",
    rating: 4.92,
    reviews: 130,
    groupSize: "Family / Couple",
    difficulty: "Easy",
    badge: "Best Value",
    featured: true,
    image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Radhanagar Beach on Havelock Island (Voted Asia's Best Beach)",
      "High-speed luxury Makruzz Catamaran inter-island cruise",
      "Elephant Beach speedboat trip with complimentary snorkeling",
      "Historic Cellular Jail moving Sound & Light show",
      "Natural Coral Bridge rock formation on Neil Island"
    ],
    inclusionChips: ["Beachfront Resorts", "Makruzz Catamaran", "Snorkeling Tour", "Breakfast & Dinner", "Airport Transfers"],
    itinerary: [
      { day: 1, title: "Port Blair Arrival & Cellular Jail Light Show", morning: "Pickup at Veer Savarkar International Airport", afternoon: "Check-in to ocean view resort; visit historic Cellular Jail", evening: "Witness evening Sound and Light history show", stayTier: "4-Star Ocean Resort Port Blair", transport: "Private AC Cab", meals: "Dinner" },
      { day: 2, title: "Makruzz High-Speed Cruise to Havelock Island", morning: "Board premium Makruzz Catamaran to Havelock Island", afternoon: "Check-in to luxury beachfront cottage surrounded by palms", evening: "Breathtaking sunset at world-famous Radhanagar Beach (Beach No. 7)", stayTier: "4-Star Havelock Beach Resort", transport: "Makruzz Ferry + Cab", meals: "Breakfast & Dinner" },
      { day: 3, title: "Elephant Beach Coral Reefs & Watersports", morning: "Speedboat ride to Elephant Beach", afternoon: "Guided snorkeling over living vibrant coral reefs and marine life", evening: "Leisure beach walk under starlit tropical sky", stayTier: "4-Star Havelock Beach Resort", transport: "Speedboat + Cab", meals: "Breakfast & Dinner" },
      { day: 4, title: "Havelock to Peaceful Neil Island", morning: "Catamaran cruise to lush Neil Island", afternoon: "Explore Natural Coral Bridge and Bharatpur beach water sports", evening: "Sunset viewing at Laxmanpur white sand beach", stayTier: "4-Star Neil Island Resort", transport: "Catamaran + Cab", meals: "Breakfast & Dinner" },
      { day: 5, title: "Return to Port Blair & Souvenir Markets", morning: "Ferry cruise back to Port Blair", afternoon: "Visit Sagarika government emporium for pearl & seashell crafts", evening: "Farewell dinner overlooking Port Blair harbour", stayTier: "4-Star Ocean Resort Port Blair", transport: "Catamaran + Cab", meals: "Breakfast & Dinner" },
      { day: 6, title: "Departure", morning: "Buffet breakfast", afternoon: "Drop at Port Blair Airport for flight back home", evening: "Arrival", stayTier: "Departure", transport: "Private AC Cab", meals: "Breakfast" }
    ],
    inclusions: ["5 Nights accommodation in 4-Star beachfront resorts", "Daily breakfast and multi-course dinners", "High-speed Makruzz catamaran ferry tickets", "Speedboat and snorkeling at Elephant Beach", "All transfers in private vehicle"],
    exclusions: ["Airfare to/from Port Blair", "Scuba diving / Sea karting (available on request)", "Personal expenses"],
    bestSeason: "Oct - May (Crystal Clear Waters)"
  },
  {
    id: "vietnam-heritage",
    name: "Vietnam Dragon & Lanterns: Hanoi, Halong Bay & Da Nang",
    tagline: "5-Star Halong Bay cruise, Ba Na Hills Golden Bridge & Hoi An lanterns",
    region: "Asia",
    country: "Vietnam",
    category: "International Signature",
    vibeTags: ["Tropical Islands", "Royal Luxury"],
    type: ["Culture", "Cruise", "Scenic"],
    durationDays: 7,
    duration: "6 Nights / 7 Days",
    price: 46999,
    originalPrice: 59999,
    currency: "INR",
    rating: 4.95,
    reviews: 112,
    groupSize: "Couple / Group",
    difficulty: "Easy",
    badge: "Trending 2026",
    featured: true,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Overnight 5-Star Halong Bay luxury cruise with private balcony cabin",
      "Walk the giant iconic Golden Hands Bridge in Ba Na Hills",
      "Rowing boat through thousands of glowing silk lanterns in Hoi An",
      "Traditional cyclo ride through historic Hanoi French Quarter",
      "Round basket boat ride through Bay Mau coconut forest"
    ],
    inclusionChips: ["5-Star Halong Cruise", "Ba Na Hills Cable Car", "Internal Flights", "E-Visa Support", "English Guide"],
    itinerary: [
      { day: 1, title: "Hanoi Arrival & Old Quarter French Street", morning: "VIP airport reception in Hanoi", afternoon: "Check-in to boutique hotel in Hanoi French Quarter", evening: "Traditional street cyclo tour and Water Puppet Theater show", stayTier: "5-Star Hanoi Boutique Hotel", transport: "Private AC Coach", meals: "Dinner" },
      { day: 2, title: "Hanoi to Halong Bay 5-Star Cruise", morning: "Scenic expressway drive past Red River delta to Halong harbour", afternoon: "Board 5-star cruise; kayak through Sung Sot limestone cave", evening: "Sunset party on sundeck and 7-course gourmet seafood dinner", stayTier: "5-Star Halong Balcony Cruise", transport: "Luxury Cruise Ship", meals: "Breakfast, Lunch & Dinner" },
      { day: 3, title: "Sunrise Tai Chi & Flight to Da Nang", morning: "Morning Tai Chi on sundeck; explore Titop island beach", afternoon: "Disembark and short internal flight to coastal Da Nang", evening: "Check in to luxury oceanfront resort along My Khe beach", stayTier: "5-Star Da Nang Beach Resort", transport: "Cruise + Flight", meals: "Breakfast & Brunch" },
      { day: 4, title: "Ba Na Hills & Golden Giant Hands Bridge", morning: "World-record cable car ascent to Sun World Ba Na Hills", afternoon: "Walk across the breathtaking Golden Bridge held by giant stone hands", evening: "French Village and Fantasy theme park exploration", stayTier: "5-Star Da Nang Beach Resort", transport: "Cable Car + Coach", meals: "Breakfast & Buffet Lunch" },
      { day: 5, title: "Hoi An Ancient Lantern Town & Coconut Forest", morning: "Round basket boat ride in Cam Thanh coconut forest with fishermen", afternoon: "Guided heritage walk in UNESCO Hoi An Japanese covered bridge", evening: "Night river boat ride releasing glowing floating lanterns", stayTier: "5-Star Hoi An Riverfront Resort", transport: "Private AC Coach", meals: "Breakfast & Dinner" },
      { day: 6, title: "Marble Mountains & Dragon Bridge Fire Show", morning: "Explore ancient cave pagodas inside Marble Mountains", afternoon: "Relaxation along white sands of Da Nang beach", evening: "Witness weekend Dragon Bridge fire & water breathing show", stayTier: "5-Star Da Nang Beach Resort", transport: "Private AC Coach", meals: "Breakfast" },
      { day: 7, title: "Departure", morning: "Buffet breakfast overlooking ocean", afternoon: "Chauffeur transfer to Da Nang International Airport", evening: "Flight departure", stayTier: "Departure", transport: "Private AC Coach", meals: "Breakfast" }
    ],
    inclusions: ["1 Night 5-Star Luxury Halong Bay Cruise with all meals", "5 Nights in 5-Star Resorts in Hanoi, Da Nang & Hoi An", "Ba Na Hills cable car and Golden Bridge entry", "Domestic flight Hanoi to Da Nang", "E-Visa processing assistance"],
    exclusions: ["International flights to/from India", "Personal alcoholic beverages and tips", "Travel insurance"],
    bestSeason: "All Year (Best: Feb - Aug)"
  },
  {
    id: "iceland-aurora",
    name: "Iceland Aurora & Glaciers: Reykjavik, Blue Lagoon & Ice Caves",
    tagline: "Northern lights hunting, geothermal lagoons & snowmobile glacier runs",
    region: "Europe",
    country: "Iceland",
    category: "Adrenaline & Adventure",
    vibeTags: ["Northern Lights", "Snow & Alpine"],
    type: ["Adventure", "Northern Lights", "Glacier"],
    durationDays: 7,
    duration: "6 Nights / 7 Days",
    price: 185000,
    originalPrice: 220000,
    currency: "INR",
    rating: 4.97,
    reviews: 74,
    groupSize: "Small Group / Private",
    difficulty: "Moderate",
    badge: "Bucketlist",
    featured: true,
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Guided Northern Lights (Aurora Borealis) Super-Jeep night hunt",
      "VIP Premium entry to Blue Lagoon geothermal mineral baths",
      "Golden Circle: Gullfoss roaring waterfall & active Strokkur geyser",
      "Glacier snowmobiling on Langjokull ice cap and natural ice caves",
      "Black Sand Beach of Reynisfjara with basalt stone columns"
    ],
    inclusionChips: ["Super-Jeep 4x4", "Blue Lagoon VIP", "Glacier Snowmobile", "Chalet Stays", "Aurora Guide"],
    itinerary: [
      { day: 1, title: "Keflavik Arrival & Blue Lagoon Mineral Bath", morning: "VIP arrival at Keflavik Airport", afternoon: "Soak in milky-blue geothermal waters of Blue Lagoon with silica mask", evening: "Transfer to Reykjavik hotel and welcome dinner", stayTier: "4-Star Reykjavik Boutique Hotel", transport: "Private 4x4 Coach", meals: "Dinner" },
      { day: 2, title: "Golden Circle & Geysir Eruptions", morning: "Explore Thingvellir National Park tectonic rift valley", afternoon: "Witness Strokkur geyser spout boiling water 30 meters high", evening: "Stand beside thunderous Gullfoss golden waterfall", stayTier: "4-Star South Coast Lodge", transport: "4x4 Super-Jeep", meals: "Breakfast" },
      { day: 3, title: "Langjokull Glacier Snowmobiling & Ice Cave", morning: "Drive high onto Langjokull glacier in monster 4x4 truck", afternoon: "1-Hour exhilarating snowmobiling across pristine ice sheets", evening: "Walk inside a natural crystalline blue ice cave", stayTier: "4-Star South Coast Lodge", transport: "Snowmobile + 4x4", meals: "Breakfast & Dinner" },
      { day: 4, title: "South Coast Waterfalls & Black Sand Beach", morning: "Walk behind Seljalandsfoss waterfall veil and Skogafoss rainbows", afternoon: "Explore Reynisfjara volcanic black sand beach & basalt sea stacks", evening: "First Aurora Borealis night watch by coastal lodge", stayTier: "4-Star Vik Coastal Lodge", transport: "4x4 Super-Jeep", meals: "Breakfast" },
      { day: 5, title: "Jokulsarlon Glacier Lagoon & Diamond Beach", morning: "Boat tour among floating blue icebergs in Jokulsarlon lagoon", afternoon: "Walk on Diamond Beach where crystal ice glistens on black sands", evening: "Night Northern Lights expedition with professional astro-photographer", stayTier: "4-Star Glacier Lodge", transport: "4x4 Super-Jeep", meals: "Breakfast & Dinner" },
      { day: 6, title: "Reykjavik Capital Culture & Harpa Center", morning: "Scenic return drive to Reykjavik", afternoon: "Visit Hallgrimskirkja church and Harpa Glass Concert Hall", evening: "Gourmet Nordic farewell dinner", stayTier: "4-Star Reykjavik Boutique Hotel", transport: "Private 4x4 Coach", meals: "Breakfast & Dinner" },
      { day: 7, title: "Departure", morning: "Breakfast in historic old harbour", afternoon: "Transfer to Keflavik Airport", evening: "Departure flight", stayTier: "Departure", transport: "Private 4x4 Coach", meals: "Breakfast" }
    ],
    inclusions: ["6 Nights in scenic Scandinavian boutique hotels & lodges", "Super-Jeep transport for all excursions", "Blue Lagoon premium comfort pass", "Langjokull snowmobiling with thermal suits", "Dedicated Aurora specialist guide"],
    exclusions: ["International airfare", "Schengen visa fees", "Optional helicopter excursions"],
    bestSeason: "Sep - Apr (Peak Northern Lights Season)"
  },
  {
    id: "kenya-safari",
    name: "Kenya Maasai Mara Safari: Big Five, Glamping & Balloon Safari",
    tagline: "Big Five private game drives, luxury tented camps & sunrise hot air balloon",
    region: "Africa",
    country: "Kenya",
    category: "Adrenaline & Adventure",
    vibeTags: ["Wildlife Safari", "Royal Luxury"],
    type: ["Safari", "Wildlife", "Luxury Glamping"],
    durationDays: 6,
    duration: "5 Nights / 6 Days",
    price: 145000,
    originalPrice: 175000,
    currency: "INR",
    rating: 4.98,
    reviews: 62,
    groupSize: "Small Group / Private",
    difficulty: "Easy",
    badge: "Bucketlist",
    featured: true,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Custom 4x4 pop-up roof Safari Land Cruiser with expert tracker",
      "Luxury 5-Star tented safari camp in heart of Maasai Mara",
      "Sunrise hot air balloon safari with champagne bush breakfast",
      "Track lions, leopards, elephants, rhinos & Cape buffalos (Big Five)",
      "Traditional Maasai warrior village cultural experience"
    ],
    inclusionChips: ["4x4 Land Cruiser", "5-Star Tented Camp", "All Park Fees", "Balloon Safari", "All Meals"],
    itinerary: [
      { day: 1, title: "Nairobi Arrival to Lake Naivasha", morning: "VIP greeting at Jomo Kenyatta Airport Nairobi", afternoon: "Scenic drive through Great Rift Valley to Lake Naivasha", evening: "Boat safari spotting hippos and fish eagles", stayTier: "5-Star Naivasha Sopa Resort", transport: "Custom 4x4 Safari Cruiser", meals: "Lunch & Dinner" },
      { day: 2, title: "Lake Naivasha to Maasai Mara National Reserve", morning: "Drive into legendary Maasai Mara savannah", afternoon: "Check-in to luxury 5-star tented camp beside Mara River", evening: "First golden hour sunset game drive tracking lions and cheetahs", stayTier: "5-Star Luxury Mara Tented Camp", transport: "Custom 4x4 Safari Cruiser", meals: "Breakfast, Lunch & Dinner" },
      { day: 3, title: "Full Day Big Five Game Drive in Maasai Mara", morning: "Dawn game drive spotting leopards hunting in morning mist", afternoon: "Picnic lunch under acacia tree overlooking wildebeest herds", evening: "Sundowner drinks on private ridge overlooking infinite savannah", stayTier: "5-Star Luxury Mara Tented Camp", transport: "Custom 4x4 Safari Cruiser", meals: "Breakfast, Lunch & Dinner" },
      { day: 4, title: "Hot Air Balloon Safari & Maasai Village", morning: "Float silently over Maasai Mara plains at sunrise in hot air balloon", afternoon: "Bush champagne breakfast followed by Maasai boma village visit", evening: "Campfire dinner listening to sounds of African wilderness", stayTier: "5-Star Luxury Mara Tented Camp", transport: "Hot Air Balloon + 4x4", meals: "Breakfast, Lunch & Dinner" },
      { day: 5, title: "Mara to Lake Nakuru National Park", morning: "Morning game drive and drive to Lake Nakuru", afternoon: "Spot endangered Rothschild giraffes and white rhinos", evening: "Sunset views over pink flamingo lake", stayTier: "5-Star Nakuru Safari Lodge", transport: "Custom 4x4 Safari Cruiser", meals: "Breakfast, Lunch & Dinner" },
      { day: 6, title: "Return to Nairobi & Departure", morning: "Morning game drive and return drive to Nairobi", afternoon: "Farewell lunch at famous Carnivore restaurant", evening: "Transfer to airport for return flight", stayTier: "Departure", transport: "Custom 4x4 Safari Cruiser", meals: "Breakfast & Lunch" }
    ],
    inclusions: ["5 Nights in luxury 5-Star safari lodges & tented camps", "Exclusive 4x4 pop-up roof safari cruiser with fuel & guide", "All national park entry conservation fees", "Sunrise Hot Air Balloon safari with champagne breakfast", "All meals on safari"],
    exclusions: ["International flights", "Kenya eTA visa fee", "Personal tipping to driver guide"],
    bestSeason: "Jul - Oct (Great Migration), Dec - Mar (Clear Wildlife)"
  },
  {
    id: "chardham-yatra",
    name: "Sacred Char Dham Yatra: Yamunotri, Gangotri, Kedarnath & Badrinath",
    tagline: "Helicopter & SUV pilgrimage across all four sacred Himalayan Dhams",
    region: "India",
    country: "India",
    category: "Sacred Pilgrimage",
    vibeTags: ["Sacred Char Dham", "Snow & Alpine"],
    type: ["Pilgrimage", "Spiritual", "Himalayas"],
    durationDays: 10,
    duration: "9 Nights / 10 Days",
    price: 32500,
    originalPrice: 39999,
    currency: "INR",
    rating: 4.97,
    reviews: 220,
    groupSize: "Family / Group",
    difficulty: "Moderate",
    badge: "Divine Blessing",
    featured: true,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "VIP Darshan coordination at Kedarnath & Badrinath shrines",
      "Helicopter shuttle assistance / premium pony arrangements",
      "Pure vegetarian hygienic meals prepared fresh throughout trip",
      "Sacred Ganga Aarti at Har Ki Pauri Haridwar & Rishikesh",
      "Comfortable sanitized Tempo Traveler / Innova with hill driver"
    ],
    inclusionChips: ["Verified Hotels", "Pure Veg Meals", "Heli Assistance", "Hill Driver SUV", "VIP Darshan"],
    itinerary: [
      { day: 1, title: "Haridwar / Rishikesh to Barkot", morning: "Pickup and drive past Mussoorie and Kempty falls", afternoon: "Scenic drive along Yamuna river valley", evening: "Arrival in Barkot; rest for Yamunotri trek", stayTier: "Deluxe Barkot Camp/Hotel", transport: "Sanitized SUV/Tempo", meals: "Dinner" },
      { day: 2, title: "Barkot to Yamunotri Dham Darshan", morning: "Drive to Janki Chatti; trek/pony ride to Yamunotri Temple", afternoon: "Holy dip in Surya Kund; cook rice in hot springs; offer prayers", evening: "Return to Barkot for overnight rest", stayTier: "Deluxe Barkot Camp/Hotel", transport: "Pony / Trek + SUV", meals: "Breakfast & Dinner" },
      { day: 3, title: "Barkot to Uttarkashi (Kashi Vishwanath)", morning: "Drive to holy town of Uttarkashi along Bhagirathi river", afternoon: "Visit ancient Kashi Vishwanath temple and Shakti temple", evening: "Evening riverbank meditation and aarti", stayTier: "Deluxe Uttarkashi Hotel", transport: "Sanitized SUV/Tempo", meals: "Breakfast & Dinner" },
      { day: 4, title: "Uttarkashi to Gangotri Dham & Return", morning: "Scenic excursion along Harsil apple orchards to Gangotri", afternoon: "Sacred Darshan at Gangotri Temple and holy dip in Bhagirathi", evening: "Return to Uttarkashi for night stay", stayTier: "Deluxe Uttarkashi Hotel", transport: "Sanitized SUV/Tempo", meals: "Breakfast & Dinner" },
      { day: 5, title: "Uttarkashi to Guptkashi / Sitapur Base", morning: "Drive past Mandakini river valley to Guptkashi", afternoon: "Visit ancient Ardh Narishwar temple", evening: "Helicopter ticket briefing for Kedarnath Darshan", stayTier: "Deluxe Guptkashi Resort", transport: "Sanitized SUV/Tempo", meals: "Breakfast & Dinner" },
      { day: 6, title: "Guptkashi to Kedarnath Shrine", morning: "Helicopter shuttle or 16km scenic trek to Kedarnath", afternoon: "Check-in to temple lodge; holy Darshan of Jyotirlinga", evening: "Attend divine evening temple Maha Aarti amidst snow peaks", stayTier: "Kedarnath Temple Guest House", transport: "Helicopter / Pony", meals: "Breakfast & Dinner" },
      { day: 7, title: "Kedarnath Morning Darshan to Guptkashi", morning: "Early morning Abhishek Darshan of Baba Kedar", afternoon: "Helicopter flight back to base or descend trek", evening: "Rest and rejuvenation at Guptkashi resort", stayTier: "Deluxe Guptkashi Resort", transport: "Helicopter / Cab", meals: "Breakfast & Dinner" },
      { day: 8, title: "Guptkashi to Badrinath Dham", morning: "Drive via Chopta / Joshimath to sacred Badrinath", afternoon: "Holy dip in Tapt Kund natural hot springs", evening: "Witness evening golden hour Maha Aarti at Badrinath Temple", stayTier: "Deluxe Badrinath Hotel", transport: "Sanitized SUV/Tempo", meals: "Breakfast & Dinner" },
      { day: 9, title: "Badrinath to Rudraprayag via Mana Village", morning: "Visit Mana (Last Indian Village), Vyas Cave & Bheem Pul", afternoon: "Drive along river confluences of Alaknanda & Mandakini", evening: "Overnight stay at Rudraprayag riverside hotel", stayTier: "Deluxe Rudraprayag Hotel", transport: "Sanitized SUV/Tempo", meals: "Breakfast & Dinner" },
      { day: 10, title: "Rudraprayag to Haridwar / Dehradun Departure", morning: "Drive to Rishikesh; visit Ram Jhula & Laxman Jhula", afternoon: "Drop at Haridwar Railway Station or Dehradun Airport", evening: "Departure with divine Himalayan blessings", stayTier: "Departure", transport: "Sanitized SUV/Tempo", meals: "Breakfast" }
    ],
    inclusions: ["9 Nights accommodation in verified clean hotels & camps", "Daily pure vegetarian breakfast and multi-course dinners", "Dedicated vehicle with experienced mountain driver", "VIP Darshan and helicopter booking coordination", "24/7 dedicated tour manager"],
    exclusions: ["Helicopter / Pony / Palki charges (assisted on spot)", "Personal laundry, pooja dakshina, tips", "Train/Flight to Haridwar"],
    bestSeason: "May - Jun & Sep - Oct (Favorable Weather)"
  },
  {
    id: "amalfi-coast",
    name: "Amalfi Coast & Rome Dolce Vita: Positano, Capri & Colosseum",
    tagline: "Cliffside Positano luxury suites, private yacht to Capri & VIP Colosseum access",
    region: "Europe",
    country: "Italy",
    category: "Honeymoon & Couple",
    vibeTags: ["Royal Luxury", "Tropical Islands"],
    type: ["Luxury", "Honeymoon", "Coast"],
    durationDays: 7,
    duration: "6 Nights / 7 Days",
    price: 165000,
    originalPrice: 195000,
    currency: "INR",
    rating: 4.96,
    reviews: 58,
    groupSize: "Private Couple",
    difficulty: "Easy",
    badge: "Luxury Signature",
    featured: true,
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Cliffside luxury hotel stay in iconic Positano overlooking Mediterranean",
      "Private speedboat yacht charter around Capri Island & Blue Grotto",
      "VIP skip-the-line underground tour of Roman Colosseum & Vatican",
      "Sunset limoncello tasting on private yacht along Ravello cliffs",
      "First class high-speed Frecciarossa train from Rome to Naples"
    ],
    inclusionChips: ["5-Star Positano Suite", "Capri Private Yacht", "VIP Colosseum Pass", "1st Class Rail", "Schengen Concierge"],
    itinerary: [
      { day: 1, title: "Rome Arrival & Trastevere Dolce Vita Walk", morning: "VIP arrival at Rome Fiumicino Airport; Mercedes chauffeur transfer", afternoon: "Check-in to 5-star hotel near Spanish Steps", evening: "Walking culinary tasting in historic cobblestone Trastevere", stayTier: "5-Star Rome Boutique Palace", transport: "Mercedes S-Class", meals: "Dinner" },
      { day: 2, title: "VIP Vatican Museums & Colosseum Underground", morning: "Private skip-the-line tour of Sistine Chapel & St. Peter's", afternoon: "Exclusive underground arena access at Roman Colosseum", evening: "Sunset gelato at Trevi Fountain and Piazza Navona", stayTier: "5-Star Rome Boutique Palace", transport: "Private AC Mercedes", meals: "Breakfast" },
      { day: 3, title: "1st Class Rail to Naples & Drive to Positano", morning: "High-speed Frecciarossa train to Naples", afternoon: "Private chauffeur along dramatic cliffside Amalfi Drive to Positano", evening: "Check in to luxury cliffside balcony suite with sea panorama", stayTier: "5-Star Positano Cliff Resort", transport: "1st Class Train + Mercedes", meals: "Breakfast & Dinner" },
      { day: 4, title: "Private Yacht Charter to Capri Island & Grottoes", morning: "Board private Riva yacht from Positano pier", afternoon: "Cruise around Faraglioni rocks, swim in Blue & Green Grottoes", evening: "Champagne lunch in Capri town and return sunset sail", stayTier: "5-Star Positano Cliff Resort", transport: "Private Riva Yacht", meals: "Breakfast & Lunch" },
      { day: 5, title: "Amalfi Town, Ravello & Villa Cimbrone Gardens", morning: "Chauffeur drive to historic maritime town of Amalfi", afternoon: "Ascend to mountaintop Ravello and Infinity Terrace at Villa Cimbrone", evening: "Private cliffside candlelight dinner overlooking sea", stayTier: "5-Star Positano Cliff Resort", transport: "Private AC Mercedes", meals: "Breakfast & Dinner" },
      { day: 6, title: "Pompeii Ruins & Return to Rome", morning: "Private guided tour of ancient preserved city of Pompeii", afternoon: "Fast rail journey back to Rome for last-minute boutique shopping", evening: "Farewell rooftop dinner overlooking illuminated Roman ruins", stayTier: "5-Star Rome Boutique Palace", transport: "1st Class Train + Mercedes", meals: "Breakfast & Dinner" },
      { day: 7, title: "Departure", morning: "Buffet breakfast at hotel", afternoon: "Private chauffeur transfer to Rome Airport", evening: "Departure flight", stayTier: "Departure", transport: "Mercedes S-Class", meals: "Breakfast" }
    ],
    inclusions: ["6 Nights in handpicked 5-Star luxury hotels in Rome & Positano", "Private Riva yacht charter to Capri with skipper", "1st Class high-speed train tickets in Italy", "VIP skip-the-line passes for Vatican & Colosseum", "Full Schengen visa concierge"],
    exclusions: ["International airfare", "Italian city tourist tax", "Personal shopping"],
    bestSeason: "May - Oct (Mediterranean Summer & Autumn)"
  }
];

export const TRAVELER_REELS = [
  {
    id: "reel-1",
    author: "Rohan & Sneha",
    destination: "Kashmir Honeymoon",
    duration: "6 Days",
    tagline: "Waking up to Dal Lake in a royal houseboat was sheer magic!",
    videoThumb: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=500&q=80",
    rating: 5,
    views: "24.5K",
    flag: "🇮🇳"
  },
  {
    id: "reel-2",
    author: "Dr. Alok Verma & Family",
    destination: "Bali Tropical Villa",
    duration: "7 Days",
    tagline: "Our kids loved the Nusa Penida speedboat and Ubud jungle villa!",
    videoThumb: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80",
    rating: 5,
    views: "38.2K",
    flag: "🇮🇩"
  },
  {
    id: "reel-3",
    author: "Kavita & Rajesh",
    destination: "Swiss Alps & Titlis",
    duration: "7 Days",
    tagline: "Glacier Express train and Mt. Titlis cable car were dream come true!",
    videoThumb: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=500&q=80",
    rating: 5,
    views: "42.1K",
    flag: "🇨🇭"
  },
  {
    id: "reel-4",
    author: "Amit & Priya",
    destination: "Dubai Marina & Safari",
    duration: "6 Days",
    tagline: "Red dunes bashing and luxury Marina yacht dinner exceeded all expectations.",
    videoThumb: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&q=80",
    rating: 5,
    views: "31.4K",
    flag: "🇦🇪"
  }
];

export const TESTIMONIALS = [
  {
    name: "Astha Acharya",
    location: "Bhopal, MP",
    tour: "Kashmir Honeymoon Package",
    comment: "Comfort Journey made our Kashmir honeymoon completely unforgettable! The luxury houseboat stay on Dal Lake and Gulmarg Gondola Phase 2 tickets were managed effortlessly. Sharad ji and team took care of every single minute.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Muskan Parita",
    location: "Indore, MP",
    tour: "Bali 7 Days Private Villa Tour",
    rating: 5,
    comment: "Superb execution by Comfort Journey team! Private speedboat to Nusa Penida and floating breakfast in our Ubud jungle resort made it magical. Best travel agency in central India without a doubt.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Malvika Valecha",
    location: "Bhopal, MP",
    tour: "Andaman Family Trip",
    rating: 5,
    comment: "We booked our Andaman family package with Comfort Journey. Highly professional service, ocean-view beachfront resorts, punctual Makruzz catamaran bookings, and super courteous cab drivers. 10/10 experience!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
  }
];

export const WHY_US_PILLARS = [
  {
    title: "Private Chauffeurs, Luxury SUVs & Helicopters",
    desc: "Sanitized private AC vehicles, Innova Crystas, luxury coaches and helicopter joyrides with verified vetted drivers."
  },
  {
    title: "Handpicked 4/5-Star Stays, Palaces & Overwater Villas",
    desc: "Every hotel, heritage palace, overwater bungalow, and luxury houseboat is physically pre-audited for supreme comfort."
  },
  {
    title: "Personal Trip Designer — 100% Bespoke Itineraries",
    desc: "No cookie-cutter trips. Every single day-wise schedule is custom tailored to your pace, dates, and budget."
  },
  {
    title: "24/7 On-Trip Personal Concierge",
    desc: "Direct line to your personal trip coordinator before, during, and after travel for zero-worry assistance."
  },
  {
    title: "Private & Exclusive VIP Experiences",
    desc: "Fast-track monument passes, private yacht charters, sunrise balloon flights, and candlelight beach dinners."
  },
  {
    title: "Insured, Secure & 100% Price-Transparent Booking",
    desc: "Zero hidden charges, comprehensive travel insurance assistance, and transparent refund & cancellation policies."
  },
  {
    title: "Global Tourist Visa Concierge",
    desc: "Fast-track documentation and application filing for Schengen Europe, UK, US, Dubai, Bali, Singapore & Asia."
  }
];

export const SERVICES_LIST = [
  { num: "01", title: "Custom Itineraries", desc: "Tailor-made day-by-day vacation plans designed around your family or couple preferences." },
  { num: "02", title: "Honeymoon & Couples", desc: "Romantic overwater villas, private candlelight dinners, and sunset yacht cruises." },
  { num: "03", title: "Family & Luxury Group Tours", desc: "Spacious private vehicles, interconnected resort suites, and child-friendly itineraries." },
  { num: "04", title: "Adventure & Safari Expeditions", desc: "Kenya Big 5 safaris, Iceland snowmobiling, and scuba diving adventures." },
  { num: "05", title: "Cruise & Island Getaways", desc: "Halong Bay 5-star cruises, Mediterranean yacht charters, and Andaman catamarans." },
  { num: "06", title: "Wellness & Ayurvedic Retreats", desc: "Holistic yoga retreats, Kerala Ayurvedic healing, and Balinese spa sanctuaries." },
  { num: "07", title: "Business & VIP Corporate Travel", desc: "Executive airport transfers, VIP lounge access, and incentive corporate offsites." },
  { num: "08", title: "Sacred Pilgrimage Tours", desc: "Dedicated Char Dham Yatra, Kedarnath helicopter shuttles, and Varanasi spiritual journeys." }
];

export const STATS_DATA = [
  { value: "33+", label: "Years of Trust", sub: "Serving Travelers Since 1992" },
  { value: "2,000+", label: "Worldwide Destinations", sub: "Domestic & International" },
  { value: "50,000+", label: "Delighted Travelers", sub: "4.95 Google Rating" },
  { value: "24/7", label: "VIP On-Trip Support", sub: "Personal Tour Concierge" }
];

export const FAQS = [
  {
    q: "Where is Comfort Journey's office located?",
    a: "Our head office is located at Main Road 1, Bhopal, Madhya Pradesh 462016. We have been serving travelers from Bhopal, across India and internationally since 1992."
  },
  {
    q: "How does the custom trip design process work?",
    a: "You can click 'Plan with AI', 'WhatsApp Us', or call +91 8770403315. Tell our trip designer your dream destination, dates, and budget, and we craft a custom day-wise itinerary in under 15 minutes."
  },
  {
    q: "Are flights, hotels, and cabs included in packages?",
    a: "Yes! All Comfort Journey tour packages include pre-verified 4/5-star hotel stays, daily breakfast, private cabs for all transfers, and complete flight/train booking coordination."
  },
  {
    q: "Do you provide visa assistance for international trips?",
    a: "Yes! We handle end-to-end tourist visa applications, insurance, and document filing for Schengen Europe, Dubai, Bali, Singapore, Thailand, Vietnam, and major global destinations."
  },
  {
    q: "What is your cancellation and refund policy?",
    a: "We maintain 100% price transparency. If your plans change, we provide flexible rescheduling options and prompt refunds according to hotel and flight carrier terms."
  }
];

export const LIVE_BOOKINGS_FEED = [
  { name: "Priya & Rahul", from: "Mumbai", tour: "Kashmir Honeymoon Package", time: "3 mins ago" },
  { name: "Amit Sharma", from: "Bhopal", tour: "Bali 7-Day Private Pool Villa", time: "8 mins ago" },
  { name: "Dr. Sanjeev Kapoor", from: "Indore", tour: "Swiss Alps & Titlis Glacier Pass", time: "14 mins ago" },
  { name: "Ananya & Group", from: "Delhi", tour: "Andaman Coral Island Escape", time: "22 mins ago" },
  { name: "Sunil Gupta & Family", from: "Jabalpur", tour: "Sacred Kedarnath & Badrinath", time: "31 mins ago" }
];
