export const DESTINATION_WEATHER = [
  { city: "Kashmir", temp: "14°C", condition: "Sunny & Crisp", icon: "❄️" },
  { city: "Swiss Alps", temp: "12°C", condition: "Alpine Cool", icon: "🏔️" },
  { city: "Bali", temp: "29°C", condition: "Tropical Breeze", icon: "🌴" },
  { city: "Dubai", temp: "31°C", condition: "Clear Skies", icon: "☀️" },
  { city: "Iceland", temp: "-2°C", condition: "Aurora Night", icon: "🌌" },
  { city: "Amalfi Coast", temp: "24°C", condition: "Coastal Sun", icon: "🌊" },
  { city: "Kenya", temp: "26°C", condition: "Savannah Warmth", icon: "🦁" },
  { city: "Andaman", temp: "28°C", condition: "Azure Waters", icon: "🏖️" },
  { city: "Japan", temp: "19°C", condition: "Sakura Spring", icon: "🌸" },
  { city: "Maldives", temp: "30°C", condition: "Lagoon Warmth", icon: "🏝️" },
  { city: "Paris", temp: "18°C", condition: "Mild & Romantic", icon: "🗼" },
  { city: "Norway", temp: "8°C", condition: "Fjord Mist", icon: "⚓" }
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
  // ==========================================
  // 1. INDIA NATIONAL LUXURY & SPIRITUAL
  // ==========================================
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
    id: "char-dham-yatra",
    name: "Sacred Char Dham Yatra: Kedarnath, Badrinath & Yamunotri",
    tagline: "Divine Himalayan pilgrimage with VIP Darshan and optional Kedarnath Helicopter Shuttle",
    region: "India",
    country: "India",
    category: "Sacred Pilgrimage",
    vibeTags: ["Sacred Char Dham", "Snow & Alpine"],
    type: ["Pilgrimage", "Spiritual", "Himalayas"],
    durationDays: 10,
    duration: "9 Nights / 10 Days",
    price: 32500,
    originalPrice: 42000,
    currency: "INR",
    rating: 4.97,
    reviews: 210,
    groupSize: "Family / Pilgrim Group",
    difficulty: "Moderate",
    badge: "Divine Blessing",
    featured: true,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "VIP Priority Darshan pass for Kedarnath Temple & Evening Aarti",
      "Badrinath Temple visit with Mana Village (last Indian village)",
      "Helicopter shuttle booking coordination for Kedarnath trek",
      "Holy dips at Devprayag & Rudraprayag sacred confluences",
      "Pre-booked heated deluxe hotel rooms throughout high-altitude route"
    ],
    inclusionChips: ["VIP Darshan Passes", "Heated Deluxe Hotels", "Breakfast & Dinner", "24/7 Medical Care", "Dedicated Driver"],
    itinerary: [
      { day: 1, title: "Haridwar / Rishikesh to Barkot", morning: "Pickup from Haridwar and drive along Yamuna valley", afternoon: "Arrive in Barkot with view of Bandarpoonch peak", evening: "Evening leisure & briefing for Yamunotri trek", stayTier: "Deluxe Himalayan Camp / Hotel", transport: "Private AC Coach / Innova", meals: "Dinner" },
      { day: 2, title: "Yamunotri Dham Darshan & Holy Thermal Spring", morning: "Drive to Janki Chatti and 6km trek to Yamunotri Temple", afternoon: "Holy bath in Surya Kund and Divya Shila worship", evening: "Return to Barkot for dinner", stayTier: "Deluxe Himalayan Camp", transport: "Innova Crysta", meals: "Breakfast & Dinner" },
      { day: 3, title: "Barkot to Uttarkashi (Kashi Vishwanath)", morning: "Scenic drive along Bhagirathi river to Uttarkashi", afternoon: "Visit ancient Kashi Vishwanath & Shakti Temple", evening: "Riverbank meditation by the Ganges", stayTier: "3-Star Deluxe Hotel", transport: "Innova Crysta", meals: "Breakfast & Dinner" },
      { day: 4, title: "Gangotri Dham Darshan & Bhagirathi Source", morning: "Drive through Harsil Apple Valley to Gangotri Temple", afternoon: "Holy Snan in Bhagirathi river and Special Temple Puja", evening: "Drive back to Uttarkashi", stayTier: "3-Star Deluxe Hotel", transport: "Innova Crysta", meals: "Breakfast & Dinner" },
      { day: 5, title: "Uttarkashi to Guptkashi / Phata", morning: "Long scenic drive via Mandakini river to Kedarnath base", afternoon: "Check-in to hotel in Guptkashi", evening: "Visit historic Kashi Vishwanath temple Guptkashi", stayTier: "Deluxe Resort Guptkashi", transport: "Innova Crysta", meals: "Breakfast & Dinner" },
      { day: 6, title: "Kedarnath Dham Darshan (Heli / Trek)", morning: "Helicopter shuttle / Trek to Kedarnath Temple (3,584m)", afternoon: "VIP Darshan of Lord Shiva Jyotirlinga", evening: "Witness divine evening musical aarti and overnight stay", stayTier: "Kedarnath Temple Lodge / Deluxe Camp", transport: "Helicopter / Trek", meals: "Breakfast & Dinner" },
      { day: 7, title: "Kedarnath to Guptkashi / Chopta", morning: "Morning temple darshan at sunrise with snow backdrop", afternoon: "Descend to Phata / Guptkashi base", evening: "Relaxation and ayurvedic herbal tea", stayTier: "Deluxe Resort Guptkashi", transport: "Helicopter / Chauffeur", meals: "Breakfast & Dinner" },
      { day: 8, title: "Guptkashi to Badrinath via Joshimath", morning: "Drive through high mountain passes to holy Badrinath", afternoon: "Holy dip in Tapt Kund thermal springs", evening: "Evening Swarna Aarti at Badrinath Temple", stayTier: "Deluxe Hotel Badrinath", transport: "Innova Crysta", meals: "Breakfast & Dinner" },
      { day: 9, title: "Mana Village Excursion & Rudraprayag", morning: "Explore Mana Village, Vyas Gufa, Bheem Pul & Saraswati River", afternoon: "Scenic drive to Rudraprayag confluence", evening: "Relax along Alaknanda river", stayTier: "Riverside Resort Rudraprayag", transport: "Innova Crysta", meals: "Breakfast & Dinner" },
      { day: 10, title: "Rishikesh Ram Jhula & Haridwar Drop", morning: "Drive to Rishikesh, visit iconic Ram Jhula & Laxman Jhula", afternoon: "Farewell Ganga aarti and drop at Haridwar station", evening: "Departure", stayTier: "Departure", transport: "Innova Crysta", meals: "Breakfast" }
    ],
    inclusions: ["9 Nights pre-audited hotel and deluxe camp stays", "Pure vegetarian breakfast and multi-course dinners", "Dedicated private vehicle with experienced mountain driver", "All tolls, parking, driver allowances, and passenger permits", "VIP temple darshan coordination"],
    exclusions: ["Helicopter shuttle ticket (booked at cost upon request)", "Pony / Palki charges if opted on trek", "Personal pooja donations"],
    bestSeason: "May - June (Pre-Monsoon) & Sep - Oct (Autumn Clear Skies)"
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
    rating: 4.94,
    reviews: 142,
    groupSize: "Family / Couple",
    difficulty: "Easy",
    badge: "Trending 2026",
    featured: true,
    image: "https://images.unsplash.com/photo-1589136777351-fdc9c9cab193?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "High-speed luxury Makruzz catamaran island transfers",
      "Sunset at Radhanagar Beach (Asia's Best Beach voted by Time)",
      "Elephant Beach speedboat ride with complimentary snorkeling",
      "Cellular Jail Light & Sound emotional historical show",
      "Neil Island Natural Bridge & coral formation walk"
    ],
    inclusionChips: ["Makruzz Luxury Cruise", "Beachfront Resorts", "Snorkeling Included", "Private AC Cab", "Island Concierge"],
    itinerary: [
      { day: 1, title: "Port Blair Arrival & Cellular Jail Light Show", morning: "VIP arrival at Veer Savarkar Airport Port Blair", afternoon: "Check-in to oceanfront resort and relax by the pool", evening: "Visit historic Cellular Jail and watch evening sound & light show", stayTier: "4-Star Port Blair Ocean Resort", transport: "Private AC Cab", meals: "Dinner" },
      { day: 2, title: "Makruzz Cruise to Havelock Island & Radhanagar", morning: "Board luxury Makruzz AC catamaran to Havelock Island", afternoon: "Check-in to barefoot tropical beach resort", evening: "Spectacular golden sunset at world-famous Radhanagar Beach", stayTier: "4-Star Havelock Beach Resort", transport: "Makruzz Cruise + Cab", meals: "Breakfast" },
      { day: 3, title: "Elephant Beach Coral Reefs & Water Sports", morning: "Speedboat ride to Elephant Beach", afternoon: "Explore vibrant live coral reefs with snorkeling and sea walking", evening: "Beachfront candlelight dinner with fresh seafood barbecue", stayTier: "4-Star Havelock Beach Resort", transport: "Speedboat", meals: "Breakfast & Dinner" },
      { day: 4, title: "Cruise to Neil Island & Natural Rock Bridge", morning: "Ferry cruise to tranquil Neil Island", afternoon: "Visit Bharatpur Beach and Laxmanpur Beach sunset point", evening: "Stroll along unique living Natural Coral Bridge", stayTier: "4-Star Neil Island Resort", transport: "Catamaran + Cab", meals: "Breakfast" },
      { day: 5, title: "Return to Port Blair & Sagarika Artisanal Souks", morning: "Morning cruise back to Port Blair", afternoon: "Visit Sagarika government emporium for pearl & shell crafts", evening: "Farewell dinner overlooking illuminated Ross Island", stayTier: "4-Star Port Blair Ocean Resort", transport: "AC Cab", meals: "Breakfast & Dinner" },
      { day: 6, title: "Departure", morning: "Breakfast by the sea", afternoon: "Private chauffeur transfer to airport", evening: "Departure flight", stayTier: "Departure", transport: "AC Cab", meals: "Breakfast" }
    ],
    inclusions: ["5 Nights in beachfront 4-star luxury resorts", "Daily buffet breakfast", "All island transfers via high-speed Makruzz AC catamaran", "Complimentary snorkeling session at Elephant Beach", "Private AC cab for all sightseeings"],
    exclusions: ["Airfare to Port Blair", "Scuba dive / Sea Kart extra sessions", "Personal expenses"],
    bestSeason: "Oct - May (Crystal Clear Waters & Sunny Skies)"
  },
  {
    id: "rajasthan-royals",
    name: "Royal Rajasthan Palaces: Jaipur, Udaipur & Jodhpur",
    tagline: "Live like kings in royal heritage palaces, desert glamping & private fort tours",
    region: "India",
    country: "India",
    category: "Honeymoon & Couple",
    vibeTags: ["Royal Luxury", "Adrenaline & Adventure"],
    type: ["Heritage", "Luxury", "Culture"],
    durationDays: 7,
    duration: "6 Nights / 7 Days",
    price: 26999,
    originalPrice: 34999,
    currency: "INR",
    rating: 4.95,
    reviews: 165,
    groupSize: "Couple / Family",
    difficulty: "Easy",
    badge: "Royal Signature",
    featured: false,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Stay in authentic heritage Haveli and Lake Palace suites",
      "Private boat cruise on Lake Pichola overlooking Jag Mandir",
      "Amber Fort elephant/jeep ride & Sheesh Mahal mirrored hall",
      "Mehrangarh Fort private tour in the Blue City of Jodhpur",
      "Traditional Rajasthani Royal Thali dinner with live folk dance"
    ],
    inclusionChips: ["Heritage Palace Stays", "Lake Pichola Cruise", "Private Chauffeur", "VIP Fort Passes", "Royal Dinners"],
    itinerary: [
      { day: 1, title: "Pink City Jaipur Arrival & Chokhi Dhani", morning: "Private pickup from Jaipur Airport / Railway Station", afternoon: "Check-in to royal heritage palace hotel", evening: "Cultural evening at Chokhi Dhani with folk dance and royal dining", stayTier: "5-Star Heritage Palace Jaipur", transport: "Private AC SUV", meals: "Dinner" },
      { day: 2, title: "Amer Fort, Hawa Mahal & City Palace", morning: "Jeep ascent to monumental Amer Fort", afternoon: "Visit Jal Mahal, Hawa Mahal and Royal City Palace Museum", evening: "Bespoke jewelry & blue pottery shopping in Johari Bazaar", stayTier: "5-Star Heritage Palace Jaipur", transport: "Private AC SUV", meals: "Breakfast" },
      { day: 3, title: "Drive to Jodhpur via Pushkar Brahma Temple", morning: "Scenic highway drive to holy town of Pushkar", afternoon: "Visit world's only Lord Brahma Temple and sacred lake", evening: "Arrive in Blue City Jodhpur and relax at palace hotel", stayTier: "4-Star Heritage Haveli Jodhpur", transport: "Private AC SUV", meals: "Breakfast & Dinner" },
      { day: 4, title: "Mehrangarh Fort & Jaswant Thada", morning: "Explore imposing Mehrangarh Fort towering over blue houses", afternoon: "Visit marble cenotaph Jaswant Thada and Umaid Bhawan Palace", evening: "Spice market walk around historic Clock Tower", stayTier: "4-Star Heritage Haveli Jodhpur", transport: "Private AC SUV", meals: "Breakfast" },
      { day: 5, title: "Drive to Udaipur via Ranakpur Marble Temples", morning: "Drive through Aravalli hills to Ranakpur", afternoon: "Marvel at 1,444 uniquely carved marble pillars at Jain Temple", evening: "Arrive in City of Lakes Udaipur and check in", stayTier: "5-Star Lake View Palace Udaipur", transport: "Private AC SUV", meals: "Breakfast & Dinner" },
      { day: 6, title: "City Palace & Lake Pichola Sunset Cruise", morning: "Tour Rajasthan's largest royal palace complex: Udaipur City Palace", afternoon: "Stroll in Saheliyon-ki-Bari royal garden of maidens", evening: "Romantic private sunset boat cruise across Lake Pichola", stayTier: "5-Star Lake View Palace Udaipur", transport: "Private AC SUV + Boat", meals: "Breakfast" },
      { day: 7, title: "Departure", morning: "Royal breakfast overlooking lake waters", afternoon: "Transfer to Udaipur Airport", evening: "Flight departure", stayTier: "Departure", transport: "Private AC SUV", meals: "Breakfast" }
    ],
    inclusions: ["6 Nights in verified royal heritage palaces", "Daily lavish buffet breakfast", "Dedicated Innova Crysta private chauffeur", "Private Lake Pichola sunset boat ride", "All monument entry passes"],
    exclusions: ["Airfare / Train tickets", "Camera fees at monuments", "Personal shopping"],
    bestSeason: "Oct - March (Pleasant Royal Winter)"
  },
  {
    id: "kerala-backwaters",
    name: "Kerala God's Own Country: Munnar, Thekkady & Alleppey",
    tagline: "Emerald tea plantations, spice wildlife sanctuaries & luxury private houseboat cruises",
    region: "India",
    country: "India",
    category: "Family Expedition",
    vibeTags: ["Serene Backwaters", "Tropical Islands"],
    type: ["Nature", "Backwaters", "Ayurveda"],
    durationDays: 6,
    duration: "5 Nights / 6 Days",
    price: 21999,
    originalPrice: 27999,
    currency: "INR",
    rating: 4.93,
    reviews: 138,
    groupSize: "Family / Couple",
    difficulty: "Easy",
    badge: "Serene Nature",
    featured: false,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Overnight stay on private traditional AC luxury houseboat in Alleppey",
      "Munnar sprawling mist-covered tea gardens & Mattupetty Dam",
      "Periyar Wildlife Sanctuary boat safari to spot wild elephants",
      "Authentic Kalaripayattu martial arts & Kathakali dance performance",
      "Rejuvenating traditional Kerala Ayurvedic herbal massage session"
    ],
    inclusionChips: ["Private AC Houseboat", "Munnar Tea Hills", "Ayurveda Massage", "Private Chauffeur", "All Meals on Boat"],
    itinerary: [
      { day: 1, title: "Cochin Arrival & Scenic Drive to Munnar", morning: "Pickup from Cochin Airport / Ernakulam Station", afternoon: "Drive past Cheeyappara and Valara waterfalls to Munnar", evening: "Check-in to luxury mountain view resort among tea gardens", stayTier: "4-Star Mountain View Resort", transport: "Private AC Cab", meals: "Dinner" },
      { day: 2, title: "Munnar Tea Gardens & Eravikulam National Park", morning: "Visit Eravikulam National Park (home to endangered Nilgiri Tahr)", afternoon: "Explore Tata Tea Museum and Mattupetty Dam eco-point", evening: "Stroll in local aromatic spice markets", stayTier: "4-Star Mountain View Resort", transport: "Private AC Cab", meals: "Breakfast & Dinner" },
      { day: 3, title: "Scenic Drive to Thekkady Spice Plantations", morning: "Drive through cardamon and pepper hill tracts to Thekkady", afternoon: "Guided walk through aromatic organic spice plantations", evening: "Watch live Kalaripayattu martial arts and Kathakali show", stayTier: "4-Star Jungle Lodge Thekkady", transport: "Private AC Cab", meals: "Breakfast" },
      { day: 4, title: "Periyar Lake Safari & Drive to Alleppey", morning: "Boat safari in Periyar Lake watching herds of wild elephants", afternoon: "Drive to backwaters capital Alleppey", evening: "Check-in to luxury private AC Houseboat with welcome coconut water", stayTier: "5-Star Luxury Private Houseboat", transport: "Private AC Cab + Houseboat", meals: "Breakfast, Lunch & Dinner" },
      { day: 5, title: "Backwaters Cruise & Cochin Heritage Walk", morning: "Cruise past tranquil backwater canals and village paddy fields", afternoon: "Disembark and drive to Fort Kochi heritage precinct", evening: "See Chinese Fishing Nets and Jewish Synagogue at sunset", stayTier: "4-Star Fort Kochi Heritage Hotel", transport: "Private AC Cab", meals: "Breakfast" },
      { day: 6, title: "Departure", morning: "Buffet breakfast", afternoon: "Souvenir shopping for banana chips and airport transfer", evening: "Flight departure", stayTier: "Departure", transport: "Private AC Cab", meals: "Breakfast" }
    ],
    inclusions: ["4 Nights 4-Star resort stays + 1 Night Private Houseboat", "All meals on houseboat (Kerala Sadhya style)", "Daily buffet breakfast at hotels", "Dedicated private AC vehicle", "Spice plantation tour & boat safari"],
    exclusions: ["Airfare / Train tickets", "Ayurvedic treatments not mentioned", "Personal laundry"],
    bestSeason: "Sep - March (Cool & Lush Green)"
  },
  {
    id: "ladakh-adventure",
    name: "Ladakh High-Pass Odyssey: Leh, Nubra & Pangong Tso",
    tagline: "Cross Khardung La at 17,982ft, double-humped camel rides & azure Pangong Lake camps",
    region: "India",
    country: "India",
    category: "Adrenaline & Adventure",
    vibeTags: ["Snow & Alpine", "Adrenaline & Adventure"],
    type: ["Adventure", "High Altitude", "Mountains"],
    durationDays: 7,
    duration: "6 Nights / 7 Days",
    price: 28500,
    originalPrice: 36000,
    currency: "INR",
    rating: 4.97,
    reviews: 156,
    groupSize: "Small Group / Couple",
    difficulty: "Challenging",
    badge: "Adrenaline Pure",
    featured: false,
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Drive across Khardung La pass (highest motorable road in world)",
      "Overnight luxury glamping right on the shores of Pangong Lake",
      "Bactrian double-humped camel safari on Hunder sand dunes",
      "Diskit Monastery 106ft Maitreya Buddha statue blessing",
      "Magnetic Hill gravity-defying phenomenon & Sangam confluence"
    ],
    inclusionChips: ["Oxygen Fitted SUVs", "Luxury Swiss Camps", "Inner Line Permits", "Breakfast & Dinner", "Doctor on Call"],
    itinerary: [
      { day: 1, title: "Leh Arrival & Complete Acclimatization", morning: "Arrival at Leh Kushok Bakula Airport (11,500ft)", afternoon: "Mandatory rest in heated luxury hotel room to acclimatize", evening: "Gentle evening stroll in Leh Main Bazaar and Shanti Stupa", stayTier: "4-Star Deluxe Leh Hotel", transport: "Private AC SUV", meals: "Dinner" },
      { day: 2, title: "Indus Valley Monasteries & Magnetic Hill", morning: "Visit Shey Palace and Thiksey 12-storey Gompa", afternoon: "Experience Magnetic Hill gravity pull & Indus-Zanskar Sangam", evening: "Visit Hall of Fame military museum", stayTier: "4-Star Deluxe Leh Hotel", transport: "Private AC SUV", meals: "Breakfast & Dinner" },
      { day: 3, title: "Cross Khardung La Pass to Nubra Valley", morning: "Ascend world-famous Khardung La pass at 17,982 feet", afternoon: "Descend into lush Nubra Valley and visit Diskit Monastery", evening: "Ride double-humped Bactrian camels on Hunder white sand dunes", stayTier: "Luxury Deluxe Camp Nubra", transport: "Private AC SUV", meals: "Breakfast & Dinner" },
      { day: 4, title: "Nubra to Pangong Tso Lake via Shyok River", morning: "Drive along rugged Shyok river route towards Changthang", afternoon: "First breathtaking view of color-changing Pangong Lake", evening: "Sunset photography and starlight stargazing by the lake", stayTier: "Lakefront Luxury Swiss Tents", transport: "Private AC SUV", meals: "Breakfast & Dinner" },
      { day: 5, title: "Sunrise at Pangong Lake & Return to Leh", morning: "Mesmerizing sunrise over Pangong Lake mirror waters", afternoon: "Drive back over Chang La pass (17,590ft) to Leh", evening: "Free time for Ladakhi turquoise and apricot souvenir shopping", stayTier: "4-Star Deluxe Leh Hotel", transport: "Private AC SUV", meals: "Breakfast & Dinner" },
      { day: 6, title: "Sham Valley Heritage & Rancho School", morning: "Visit Spituk Gompa and iconic 3-Idiots school", afternoon: "Leisure lunch at German Bakery in Leh", evening: "Farewell Ladakhi traditional dinner", stayTier: "4-Star Deluxe Leh Hotel", transport: "Private AC SUV", meals: "Breakfast & Dinner" },
      { day: 7, title: "Departure", morning: "Buffet breakfast with mountain views", afternoon: "Airport drop for flight over snow Himalayas", evening: "Arrival home", stayTier: "Departure", transport: "Private AC SUV", meals: "Breakfast" }
    ],
    inclusions: ["6 Nights accommodation with heating and oxygen support", "All Inner Line Permits and Wildlife environmental fees", "Private 4x4 / Innova Crysta throughout with oxygen cylinder", "Daily nutritious breakfast and hot dinners", "Ladakh experienced local driver guide"],
    exclusions: ["Airfare to/from Leh", "Camel ride & rafting charges", "Personal medical medicines"],
    bestSeason: "May - Oct (Open Mountain Passes)"
  },

  // ==========================================
  // 2. ASIA & MIDDLE EAST LUXURY
  // ==========================================
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
    id: "vietnam-dragon",
    name: "Vietnam Dragon & Lanterns: Hanoi, Halong Cruise & Da Nang",
    tagline: "5-Star Halong Bay overnight cruise, Golden Hands Bridge & Hoi An ancient town",
    region: "Asia",
    country: "Vietnam",
    category: "International Signature",
    vibeTags: ["Tropical Islands", "Serene Backwaters"],
    type: ["Cruise", "Culture", "Scenic"],
    durationDays: 7,
    duration: "6 Nights / 7 Days",
    price: 46999,
    originalPrice: 58999,
    currency: "INR",
    rating: 4.95,
    reviews: 112,
    groupSize: "Couple / Family",
    difficulty: "Easy",
    badge: "Trending 2026",
    featured: true,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Overnight stay on luxury 5-star Halong Bay Cruise with private balcony",
      "Walk the giant Golden Bridge held by stone hands in Ba Na Hills",
      "Magical lantern boat ride along Hoi An UNESCO river canals",
      "Explore Sung Sot Surprising Cave & kayak in emerald limestone lagoons",
      "Traditional Vietnamese egg coffee tasting in Hanoi French Quarter"
    ],
    inclusionChips: ["5-Star Halong Cruise", "Ba Na Hills Cable Car", "Domestic Flights", "E-Visa Assistance", "English Guide"],
    itinerary: [
      { day: 1, title: "Hanoi Capital Arrival & Old Quarter Walk", morning: "VIP greeting at Noi Bai Airport Hanoi", afternoon: "Check-in to luxury French boutique hotel", evening: "Cyclo ride through 36 Guilds Old Quarter and water puppet show", stayTier: "4-Star Hanoi Boutique Hotel", transport: "Private AC Van", meals: "Dinner" },
      { day: 2, title: "Halong Bay Luxury Cruise Check-in", morning: "Scenic expressway drive past emerald rice fields to Halong marina", afternoon: "Board 5-star cruise, feast on fresh seafood buffet among karst isles", evening: "Sunset party on sun deck, night squid fishing & cooking class", stayTier: "5-Star Luxury Halong Cruise Ship", transport: "Cruise Ship", meals: "Breakfast, Lunch & Dinner" },
      { day: 3, title: "Sung Sot Cave, Kayaking & Flight to Da Nang", morning: "Sunrise Tai Chi on sundeck and explore Sung Sot Cave", afternoon: "Disembark cruise and fly to coastal resort city of Da Nang", evening: "Marvel at fire-breathing Dragon Bridge at night", stayTier: "5-Star Da Nang Beach Resort", transport: "Flight + Cab", meals: "Breakfast & Brunch" },
      { day: 4, title: "Ba Na Hills & Iconic Golden Hands Bridge", morning: "Ride world's longest single-rope cable car to Ba Na Hills", afternoon: "Walk across iconic Golden Hands Bridge in the clouds", evening: "French Village fairytale castle stroll", stayTier: "5-Star Da Nang Beach Resort", transport: "Cable Car + Van", meals: "Breakfast" },
      { day: 5, title: "Hoi An Ancient Lantern Town & Coconut Forest", morning: "Visit Marble Mountains and stone carving village", afternoon: "Basket boat ride through Cam Thanh water coconut forest", evening: "Release glowing flower lanterns on Hoai River in Hoi An ancient town", stayTier: "5-Star Da Nang Beach Resort", transport: "Private Van", meals: "Breakfast & Dinner" },
      { day: 6, title: "My Khe Beach Leisure & Han Market", morning: "Relax on white sands of My Khe Beach", afternoon: "Souvenir shopping for silk and coffee at Han Market", evening: "Farewell Vietnamese gourmet banquet", stayTier: "5-Star Da Nang Beach Resort", transport: "Private Van", meals: "Breakfast & Dinner" },
      { day: 7, title: "Departure", morning: "Buffet breakfast", afternoon: "Chauffeur transfer to Da Nang International Airport", evening: "Flight departure", stayTier: "Departure", transport: "Private Van", meals: "Breakfast" }
    ],
    inclusions: ["1 Night 5-Star Halong Cruise + 4 Nights 5-Star Da Nang Resort + 1 Night Hanoi Hotel", "Domestic flight Hanoi to Da Nang included", "All meals on cruise + daily breakfasts", "Ba Na Hills cable car & Golden Bridge passes", "Vietnam E-Visa processing assistance"],
    exclusions: ["International flights", "Personal beverages on cruise", "Tips for tour guides"],
    bestSeason: "Sep - April (Pleasant Temperatures & Sunny Coast)"
  },
  {
    id: "japan-cherry-blossom",
    name: "Japan Imperial Sakura: Tokyo, Mt. Fuji & Kyoto",
    tagline: "Shinkansen bullet trains, Mt. Fuji 5th station & Kyoto geisha bamboo groves",
    region: "Asia",
    country: "Japan",
    category: "International Signature",
    vibeTags: ["Royal Luxury", "Snow & Alpine"],
    type: ["Culture", "Bullet Train", "Scenic"],
    durationDays: 8,
    duration: "7 Nights / 8 Days",
    price: 155000,
    originalPrice: 189000,
    currency: "INR",
    rating: 4.99,
    reviews: 76,
    groupSize: "Couple / Small Group",
    difficulty: "Easy",
    badge: "Bucketlist",
    featured: false,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "7-Day 1st Class Japan Rail Pass for high-speed Shinkansen Bullet Trains",
      "Mt. Fuji 5th Station & Lake Ashi pirate ship cruise with ropeway views",
      "Kyoto Arashiyama Bamboo Grove & golden Fushimi Inari 10,000 torii gates",
      "Traditional Ryokan hot spring onsen stay with multi-course Kaiseki dinner",
      "Tokyo Shibuya crossing, teamLab Planets digital art & Asakusa temple"
    ],
    inclusionChips: ["JR Bullet Train Pass", "Ryokan Onsen Stay", "Kaiseki Dinners", "Mt. Fuji Passes", "Japan Visa Concierge"],
    itinerary: [
      { day: 1, title: "Tokyo Arrival & Shinjuku Neon Night", morning: "Arrival at Tokyo Haneda/Narita Airport with VIP escort", afternoon: "Check-in to luxury skyscraper hotel in Shinjuku", evening: "Stroll through illuminated neon alleys of Omoide Yokocho", stayTier: "5-Star Tokyo Hotel", transport: "Private AC Van", meals: "Dinner" },
      { day: 2, title: "Tokyo Highlights & teamLab Planets Art", morning: "Visit ancient Senso-ji temple in Asakusa and Nakamise market", afternoon: "Immerse in world-famous teamLab Planets sensory digital art museum", evening: "Walk across Shibuya crossing and see Hachiko statue", stayTier: "5-Star Tokyo Hotel", transport: "Tokyo Metro Pass", meals: "Breakfast" },
      { day: 3, title: "Hakone, Mt. Fuji 5th Station & Lake Ashi", morning: "Drive towards iconic snow-capped Mount Fuji 5th Station", afternoon: "Cruise Lake Ashi on pirate ship and ride Hakone Ropeway", evening: "Check-in to authentic hot spring Ryokan with Kaiseki banquet", stayTier: "Luxury Hakone Onsen Ryokan", transport: "Private Van + Cruise", meals: "Breakfast & Kaiseki Dinner" },
      { day: 4, title: "Shinkansen Bullet Train to Ancient Kyoto", morning: "Board high-speed 300km/h Shinkansen train to imperial Kyoto", afternoon: "Visit UNESCO Kinkaku-ji (Golden Pavilion)", evening: "Evening walk through historic Gion geisha district", stayTier: "5-Star Kyoto Heritage Hotel", transport: "Shinkansen 1st Class", meals: "Breakfast" },
      { day: 5, title: "Fushimi Inari Torii Gates & Arashiyama Bamboo", morning: "Hike through 10,000 crimson torii gates at Fushimi Inari Shrine", afternoon: "Walk through mystical Arashiyama Bamboo Forest and Tenryu-ji", evening: "Traditional matcha green tea ceremony", stayTier: "5-Star Kyoto Heritage Hotel", transport: "Private Van", meals: "Breakfast" },
      { day: 6, title: "Nara Deer Park & Osaka Dotonbori Street", morning: "Short train to Nara: feed sacred free-roaming deer at Todai-ji", afternoon: "Transfer to vibrant culinary capital Osaka", evening: "Street food feast at Dotonbori under Glico running man sign", stayTier: "5-Star Osaka Hotel", transport: "JR Train", meals: "Breakfast" },
      { day: 7, title: "Osaka Castle & Bullet Train Return to Tokyo", morning: "Explore historic Osaka Castle and surrounding gardens", afternoon: "Shinkansen bullet train back to Tokyo for Ginza luxury shopping", evening: "Farewell Wagyu beef dinner", stayTier: "5-Star Tokyo Hotel", transport: "Shinkansen 1st Class", meals: "Breakfast & Dinner" },
      { day: 8, title: "Departure", morning: "Gourmet buffet breakfast", afternoon: "Airport express transfer", evening: "Departure flight", stayTier: "Departure", transport: "Narita Express", meals: "Breakfast" }
    ],
    inclusions: ["7 Nights in 5-star properties including luxury Onsen Ryokan", "7-Day Japan Rail Pass for unlimited bullet trains", "Authentic multi-course Kaiseki dinner and Wagyu banquet", "All admission tickets (teamLab, temples, Mt. Fuji ropeway)", "Japan tourist visa filing assistance"],
    exclusions: ["International flights", "Personal shopping", "City tourist taxes"],
    bestSeason: "March - May (Sakura Cherry Blossom) & Oct - Nov (Autumn Red Maples)"
  },
  {
    id: "maldives-overwater",
    name: "Maldives Ultra-Luxury: Private Overwater Pool Villa",
    tagline: "Seaplane transfers, private infinity pool villas & sunset dolphin catamaran",
    region: "Asia",
    country: "Maldives",
    category: "Honeymoon & Couple",
    vibeTags: ["Tropical Islands", "Royal Luxury"],
    type: ["Honeymoon", "Overwater Villa", "Ultra Luxury"],
    durationDays: 5,
    duration: "4 Nights / 5 Days",
    price: 110000,
    originalPrice: 145000,
    currency: "INR",
    rating: 5.0,
    reviews: 94,
    groupSize: "Couple Only",
    difficulty: "Easy",
    badge: "Ultra Luxury",
    featured: false,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Roundtrip scenic seaplane flight over turquoise coral atolls",
      "Overnight stay in overwater villa with private glass-floor lagoon slide",
      "All-Inclusive Premium dining with unlimited fine wines & cocktails",
      "Sunset dolphin safari cruise on luxury traditional Dhoni",
      "Complimentary couple 60-minute overwater spa massage"
    ],
    inclusionChips: ["Seaplane Transfers", "All-Inclusive Dining", "Lagoon Pool Villa", "Dolphin Cruise", "Free Spa Massage"],
    itinerary: [
      { day: 1, title: "Male Arrival & Scenic Seaplane Flight", morning: "VIP arrival at Velana International Airport Male", afternoon: "Board scenic seaplane flight over blue atolls to private island", evening: "Check-in to Overwater Pool Villa with chilled Champagne", stayTier: "5-Star Luxury Overwater Villa", transport: "Seaplane", meals: "All Inclusive Dining" },
      { day: 2, title: "Lagoon Snorkeling & Floating Breakfast", morning: "Wake up to floating breakfast in your private infinity pool", afternoon: "Snorkel with gentle reef sharks, turtles and manta rays", evening: "Sunset cocktails on overwater hammock net", stayTier: "5-Star Luxury Overwater Villa", transport: "Resort Buggy", meals: "All Inclusive Dining" },
      { day: 3, title: "Sunset Dolphin Safari & Beach Cinema", morning: "Paddleboarding and crystal kayak photography session", afternoon: "Couple 60-minute aromatherapy massage at Overwater Spa", evening: "Private luxury Dhoni cruise chasing playful spinner dolphins", stayTier: "5-Star Luxury Overwater Villa", transport: "Private Yacht", meals: "All Inclusive Dining" },
      { day: 4, title: "Sandbank Picnic & Candlelight Dinner", morning: "Private speedboat excursion to uninhabited white sandbank", afternoon: "Chef-curated gourmet picnic lunch surrounded by pure ocean", evening: "Private 5-course candlelight dinner under starlit sky", stayTier: "5-Star Luxury Overwater Villa", transport: "Speedboat", meals: "All Inclusive Dining" },
      { day: 5, title: "Seaplane Transfer & Departure", morning: "Leisure buffet breakfast overlooking ocean horizon", afternoon: "Seaplane flight back to Male Airport", evening: "Departure flight", stayTier: "Departure", transport: "Seaplane", meals: "Breakfast" }
    ],
    inclusions: ["4 Nights in 5-Star Private Overwater Pool Villa", "Roundtrip scenic seaplane airport transfers", "All-Inclusive gourmet dining, beverages, and minibar refill", "Sunset dolphin cruise and non-motorized water sports", "Complimentary 30-minute photoshoot"],
    exclusions: ["International flights", "Motorized water sports (Jet Ski / Flyboard)", "Green Tax ($6/night/person)"],
    bestSeason: "Nov - April (Calm Blue Waters & Perfect Sunshine)"
  },
  {
    id: "grand-asia-combo",
    name: "Grand Asia 4-Country VIP Tour: Singapore, Malaysia, Bali & Dubai",
    tagline: "Marina Bay Sands, Petronas Towers, Ubud Villas & Burj Khalifa Mega Combo",
    region: "Asia",
    country: "Singapore, Malaysia, Indonesia, UAE",
    category: "International Signature",
    vibeTags: ["Royal Luxury", "Tropical Islands"],
    type: ["Multi-Country", "Mega Tour", "Luxury"],
    durationDays: 14,
    duration: "13 Nights / 14 Days",
    price: 175000,
    originalPrice: 220000,
    currency: "INR",
    rating: 4.98,
    reviews: 62,
    groupSize: "Family / Couple",
    difficulty: "Easy",
    badge: "Signature Combo",
    featured: true,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "4 Countries in 1 Seamless VIP Itinerary with all flights coordinated",
      "Singapore Gardens by the Bay, Marina Bay Sands SkyPark & Sentosa",
      "Kuala Lumpur Petronas Twin Towers, Batu Caves & Genting cable car",
      "Bali private jungle pool villa, Nusa Penida & Uluwatu Kecak dance",
      "Dubai Burj Khalifa 124th floor, VIP desert safari & Marina yacht dinner"
    ],
    inclusionChips: ["All 4 Country Visas", "All Inter-City Flights", "5-Star Hotels", "Private Chauffeurs", "VIP Fast Track"],
    itinerary: [
      { day: 1, title: "Singapore Arrival & Night Safari", morning: "Arrival at Changi Airport, world's best airport", afternoon: "Check-in to luxury hotel near Marina Bay", evening: "VIP tram tour at world's first Night Safari with wild animals", stayTier: "5-Star Singapore Hotel", transport: "Private AC Van", meals: "Dinner" },
      { day: 2, title: "Gardens by the Bay & Marina Bay Sands", morning: "Marvel at Cloud Forest glass dome & Supertree Observatory", afternoon: "Ride Singapore Flyer and visit Chinatown temples", evening: "Spectra light and water show at Marina Bay Sands", stayTier: "5-Star Singapore Hotel", transport: "Private AC Van", meals: "Breakfast" },
      { day: 3, title: "Sentosa Island & Universal Studios VIP", morning: "Cable car to Sentosa Island", afternoon: "VIP access to Universal Studios Hollywood & Sci-Fi zones", evening: "Wings of Time fireworks ocean spectacle", stayTier: "5-Star Singapore Hotel", transport: "Cable Car + Van", meals: "Breakfast" },
      { day: 4, title: "Scenic Coach / Flight to Kuala Lumpur", morning: "Cross border into Malaysia and drive to Kuala Lumpur", afternoon: "Check-in to luxury skyscraper suite overlooking skyline", evening: "Photo stop at illuminated 88-storey Petronas Twin Towers", stayTier: "5-Star KL Luxury Hotel", transport: "Luxury Coach", meals: "Breakfast & Dinner" },
      { day: 5, title: "Batu Caves & Genting Highlands Cable Car", morning: "Climb colorful 272 steps at limestone Batu Caves", afternoon: "Ride Awana SkyWay glass-bottom cable car to Genting Highlands", evening: "Indoor theme park and casino visit", stayTier: "5-Star KL Luxury Hotel", transport: "Private AC Van", meals: "Breakfast" },
      { day: 6, title: "Flight to Tropical Bali (Indonesia)", morning: "Fly from Kuala Lumpur to Bali Ngurah Rai Airport", afternoon: "Flower garland welcome and transfer to Seminyak beachfront suite", evening: "Sunset dinner at Jimbaran Bay on the beach", stayTier: "5-Star Seminyak Resort", transport: "Flight + Cab", meals: "Breakfast & Dinner" },
      { day: 7, title: "Nusa Penida Island Speedboat Day Tour", morning: "Fast boat to Nusa Penida island", afternoon: "Visit Kelingking T-Rex cliff and Broken Beach", evening: "Return to Bali and relax at beach club", stayTier: "5-Star Seminyak Resort", transport: "Speedboat + SUV", meals: "Breakfast & Lunch" },
      { day: 8, title: "Ubud Private Pool Villa & Giant Swing", morning: "Transfer to cultural Ubud and experience famous giant swing", afternoon: "Check in to private jungle pool villa with floating afternoon tea", evening: "Stroll in Ubud Royal Palace and art market", stayTier: "5-Star Ubud Pool Villa", transport: "Private AC Van", meals: "Breakfast & Dinner" },
      { day: 9, title: "Kintamani Volcano & Couple Spa", morning: "Breakfast overlooking Mount Batur volcanic caldera", afternoon: "2-Hour traditional Balinese aromatherapy spa treatment", evening: "Farewell Balinese dinner with fire dance", stayTier: "5-Star Ubud Pool Villa", transport: "Private AC Van", meals: "Breakfast" },
      { day: 10, title: "Flight to Futuristic Dubai (UAE)", morning: "Flight from Bali to Dubai International Airport", afternoon: "Check-in to 5-star Dubai Marina luxury hotel", evening: "Illuminated 2-hour Dhow Dinner Cruise across Marina skyscrapers", stayTier: "5-Star Dubai Marina Hotel", transport: "Flight + SUV", meals: "Breakfast & Dinner" },
      { day: 11, title: "Burj Khalifa 124th Floor & Dubai Mall", morning: "City tour of Palm Jumeirah, Atlantis and Burj Al Arab", afternoon: "VIP At The Top Burj Khalifa 124th/125th floor tickets", evening: "Watch world-famous dancing fountain show", stayTier: "5-Star Dubai Marina Hotel", transport: "Private AC SUV", meals: "Breakfast" },
      { day: 12, title: "4x4 Red Dunes Desert Safari & Bedouin Camp", morning: "Free time for shopping in Gold Souk and Mall of the Emirates", afternoon: "High-octane 4x4 dune bashing in Lahbab Red Dunes", evening: "Camel rides, belly dance, Tanoura fire show & 5-star BBQ dinner", stayTier: "5-Star Dubai Marina Hotel", transport: "4x4 Land Cruiser", meals: "Breakfast & Dinner" },
      { day: 13, title: "Abu Dhabi Sheikh Zayed Mosque Day Tour", morning: "Drive to UAE capital Abu Dhabi", afternoon: "Marvel at pristine white marble Sheikh Zayed Grand Mosque", evening: "Ferrari World photo stop and return to Dubai", stayTier: "5-Star Dubai Marina Hotel", transport: "Private AC SUV", meals: "Breakfast" },
      { day: 14, title: "Grand Tour Departure", morning: "Buffet breakfast", afternoon: "Private chauffeur transfer to airport", evening: "Departure flight home with unforgettable memories", stayTier: "Departure", transport: "Private AC SUV", meals: "Breakfast" }
    ],
    inclusions: ["13 Nights in handpicked 5-star hotels & private villas", "All 3 connecting international flights between countries included", "All visas processed with full documentation concierge", "All monument tickets, cruises, cable cars, and desert safari", "Private chauffeur transfers in all 4 destinations"],
    exclusions: ["International flights from hometown to start/end cities", "Personal shopping", "Tourist taxes"],
    bestSeason: "Oct - April (Ideal Weather Across All 4 Countries)"
  },

  // ==========================================
  // 3. EUROPE LUXURY & ADVENTURE
  // ==========================================
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
    id: "amalfi-rome-italy",
    name: "Amalfi Coast & Rome Dolce Vita: Positano & Capri Yacht",
    tagline: "Cliffside Positano luxury, private yacht to Capri & VIP Colosseum passes",
    region: "Europe",
    country: "Italy",
    category: "Honeymoon & Couple",
    vibeTags: ["Royal Luxury", "Tropical Islands"],
    type: ["Honeymoon", "Coast", "Luxury Yacht"],
    durationDays: 7,
    duration: "6 Nights / 7 Days",
    price: 165000,
    originalPrice: 199000,
    currency: "INR",
    rating: 4.97,
    reviews: 79,
    groupSize: "Private Couple",
    difficulty: "Easy",
    badge: "Italian Romance",
    featured: true,
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Stay in cliffside sea-view hotel overlooking Positano pastel houses",
      "Private 1-day Riva yacht cruise around Capri Island & Blue Grotto",
      "VIP Fast-Track skip-the-line Colosseum & Roman Forum tour",
      "Tuscan wine tasting and handmade pasta culinary masterclass",
      "Trevi Fountain private early morning photoshoot session"
    ],
    inclusionChips: ["Cliffside Stays", "Capri Private Yacht", "High-Speed Rail", "VIP Colosseum Pass", "Schengen Visa"],
    itinerary: [
      { day: 1, title: "Eternal City Rome Arrival & Piazza Navona", morning: "Arrival at Rome Fiumicino Airport with private Mercedes transfer", afternoon: "Check-in to luxury boutique hotel near Spanish Steps", evening: "Stroll to illuminated Trevi Fountain and Piazza Navona with gelato", stayTier: "5-Star Rome Boutique Hotel", transport: "Private Mercedes Chauffeur", meals: "Dinner" },
      { day: 2, title: "VIP Colosseum, Roman Forum & Vatican City", morning: "VIP skip-the-line access inside Colosseum Arena floor", afternoon: "Private guided tour of Vatican Museums & Sistine Chapel", evening: "Trastevere neighborhood romantic candlelit dinner", stayTier: "5-Star Rome Boutique Hotel", transport: "Private Chauffeur", meals: "Breakfast & Dinner" },
      { day: 3, title: "Frecciarossa High-Speed Train to Naples & Sorrento", morning: "High-speed Frecciarossa train to Naples", afternoon: "Private cliffside scenic drive along Amalfi Drive to Sorrento", evening: "Limoncello tasting overlooking Bay of Naples and Mt. Vesuvius", stayTier: "5-Star Sorrento Sea View Resort", transport: "1st Class Rail + Mercedes", meals: "Breakfast" },
      { day: 4, title: "Private Yacht Charter to Capri Island", morning: "Board private luxury motor yacht from Sorrento marina", afternoon: "Cruise past Faraglioni rocks and swim in Blue & Green Grottoes", evening: "Stroll through designer boutiques in Capri town and return", stayTier: "5-Star Sorrento Sea View Resort", transport: "Private Motor Yacht", meals: "Breakfast & Champagne Lunch" },
      { day: 5, title: "Positano & Amalfi Cliffside Villages", morning: "Scenic coastal drive to postcard village of Positano", afternoon: "Relax on Spiaggia Grande beach and browse linen boutiques", evening: "Sunset dinner on cliffside terrace in Amalfi town", stayTier: "5-Star Positano Cliff Resort", transport: "Private Mercedes", meals: "Breakfast & Dinner" },
      { day: 6, title: "Ravello Villa Rufolo Gardens & Wine Tasting", morning: "Drive up to cliff-perched town of Ravello", afternoon: "Marvel at infinite sea vistas from Villa Rufolo gardens", evening: "Farewell gourmet seafood dining under lemon groves", stayTier: "5-Star Positano Cliff Resort", transport: "Private Mercedes", meals: "Breakfast & Dinner" },
      { day: 7, title: "Naples Airport Transfer & Departure", morning: "Buffet breakfast on terrace", afternoon: "Private transfer to Naples / Rome International Airport", evening: "Flight departure", stayTier: "Departure", transport: "Private Mercedes", meals: "Breakfast" }
    ],
    inclusions: ["6 Nights in handpicked 5-star Italian luxury sea-view properties", "Private full-day Capri motor yacht charter with skipper & drinks", "1st Class high-speed Frecciarossa rail tickets", "VIP skip-the-line Colosseum and Vatican passes", "Full Schengen visa concierge assistance"],
    exclusions: ["International flights", "Local city hotel tax (paid at checkout)", "Personal shopping"],
    bestSeason: "April - Oct (Warm Mediterranean Sunshine)"
  },
  {
    id: "iceland-aurora",
    name: "Iceland Aurora & Glaciers: Blue Lagoon & Ice Caves",
    tagline: "Northern lights hunts, Blue Lagoon geothermal spa & glacier snowmobiling",
    region: "Europe",
    country: "Iceland",
    category: "Adrenaline & Adventure",
    vibeTags: ["Northern Lights", "Snow & Alpine"],
    type: ["Northern Lights", "Adventure", "Glaciers"],
    durationDays: 7,
    duration: "6 Nights / 7 Days",
    price: 185000,
    originalPrice: 225000,
    currency: "INR",
    rating: 4.98,
    reviews: 68,
    groupSize: "Small Group / Couple",
    difficulty: "Moderate",
    badge: "Bucketlist",
    featured: true,
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Guided Super Jeep Northern Lights hunts with professional night photography",
      "VIP Premium entry to Blue Lagoon geothermal mineral spa & silica mask",
      "Glacier snowmobiling on Langjokull Ice Cap & natural Blue Ice Cave entry",
      "Golden Circle: Gullfoss waterfall, Geysir eruptions & Thingvellir Rift",
      "Black Sand Beach of Reynisfjara with basalt columns and Jokulsarlon iceberg lagoon"
    ],
    inclusionChips: ["Super Jeep Aurora Hunts", "Blue Lagoon VIP", "Ice Cave Entry", "Snowmobile Pass", "Schengen Visa"],
    itinerary: [
      { day: 1, title: "Reykjavik Arrival & Blue Lagoon Geothermal Spa", morning: "Arrival at Keflavik International Airport", afternoon: "Immerse in warm 38°C mineral waters of world-famous Blue Lagoon", evening: "Check-in to luxury hotel in Reykjavik and northern lights briefing", stayTier: "5-Star Reykjavik Hotel", transport: "Private 4x4 Super Jeep", meals: "Dinner" },
      { day: 2, title: "Golden Circle Geysers & Thingvellir Rift", morning: "Walk between North American and Eurasian tectonic plates at Thingvellir", afternoon: "Watch Strokkur geysir shoot boiling water 30 meters high", evening: "Marvel at two-tiered roaring Gullfoss waterfall", stayTier: "5-Star Reykjavik Hotel", transport: "Super Jeep", meals: "Breakfast" },
      { day: 3, title: "Langjokull Glacier Snowmobiling Adventure", morning: "Drive deep into highlands to base of Langjokull glacier", afternoon: "Exciting 1-hour snowmobile expedition across vast ice sheet", evening: "Nighttime Super Jeep hunt chasing dancing Aurora Borealis", stayTier: "4-Star South Coast Country Lodge", transport: "Snowmobile + Super Jeep", meals: "Breakfast & Dinner" },
      { day: 4, title: "South Coast Waterfalls & Reynisfjara Black Sand", morning: "Walk behind roaring 60-meter curtain of Seljalandsfoss waterfall", afternoon: "Visit powerful Skogafoss waterfall and Reynisfjara black beach", evening: "Stay near Vik village with views of sea stacks", stayTier: "4-Star South Coast Country Lodge", transport: "Super Jeep", meals: "Breakfast & Dinner" },
      { day: 5, title: "Jokulsarlon Glacier Lagoon & Crystal Ice Cave", morning: "Marvel at floating blue icebergs in Jokulsarlon glacier lagoon", afternoon: "Put on crampons and explore natural shimmering Crystal Blue Ice Cave", evening: "Diamond Beach photo stop with crystal icebergs on black sand", stayTier: "4-Star Glacier View Hotel", transport: "Super Jeep", meals: "Breakfast & Dinner" },
      { day: 6, title: "Reykjavik City Culture & Farewell Aurora Chase", morning: "Scenic return drive along South Coast to Reykjavik", afternoon: "Explore Hallgrimskirkja church and Harpa concert hall", evening: "Farewell Nordic gourmet dinner and final Northern Lights cruise", stayTier: "5-Star Reykjavik Hotel", transport: "Super Jeep + Boat", meals: "Breakfast & Dinner" },
      { day: 7, title: "Departure", morning: "Nordic buffet breakfast", afternoon: "Chauffeur transfer to Keflavik Airport", evening: "Flight departure", stayTier: "Departure", transport: "Private 4x4 SUV", meals: "Breakfast" }
    ],
    inclusions: ["6 Nights in verified 4 & 5-star Icelandic properties", "Private 4x4 Super Jeep with expert driver-glaciologist guide", "Blue Lagoon VIP Premium ticket (towel, robe, silica mask & drink)", "Snowmobile gear, helmet, crampons, and ice cave entrance", "Nightly Aurora Borealis hunting forecasts and photo coaching"],
    exclusions: ["International flights", "Personal winter thermals", "Lunches"],
    bestSeason: "Sep - April (Optimal Northern Lights Darkness)"
  },
  {
    id: "ultimate-europe-combo",
    name: "Ultimate Europe 7-Country Rail & Cruise Grand Tour",
    tagline: "France, Switzerland, Italy, Austria, Germany, Netherlands & Belgium Mega Odyssey",
    region: "Europe",
    country: "France, Switzerland, Italy, Austria, Germany, Netherlands, Belgium",
    category: "International Signature",
    vibeTags: ["Royal Luxury", "Snow & Alpine"],
    type: ["Multi-Country", "Mega Tour", "Scenic Rail"],
    durationDays: 15,
    duration: "14 Nights / 15 Days",
    price: 245000,
    originalPrice: 295000,
    currency: "INR",
    rating: 4.99,
    reviews: 51,
    groupSize: "Family / Small Group",
    difficulty: "Easy",
    badge: "Grand Masterpiece",
    featured: true,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "7 Iconic European Nations in 1 Seamless luxury rail journey",
      "Paris Eiffel Tower 2nd floor, Louvre Museum & Seine River cruise",
      "Swiss Mt. Titlis rotating cable car & Lucerne Lake cruise",
      "Venice Gondola ride, Rome Colosseum & Florence Renaissance art",
      "Amsterdam Canal cruise, Keukenhof tulip fields & Brussels Grand Place"
    ],
    inclusionChips: ["1st Cl. Eurail Global Pass", "5-Star City Hotels", "All Sightseeing Tickets", "Schengen Visa Concierge", "24/7 Tour Lead"],
    itinerary: [
      { day: 1, title: "Paris Arrival & Illuminations Seine Cruise", morning: "Arrival at Paris Charles de Gaulle Airport", afternoon: "Check-in to luxury hotel near Champs-Elysees", evening: "Illuminated Seine river cruise past glittering Eiffel Tower", stayTier: "5-Star Paris Hotel", transport: "Private AC Coach", meals: "Dinner" },
      { day: 2, title: "Eiffel Tower 2nd Floor & Louvre Museum", morning: "Ascend to 2nd level of Eiffel Tower with panoramic Paris vistas", afternoon: "Skip-the-line tour of Louvre Museum (Mona Lisa & Venus de Milo)", evening: "Stroll in Montmartre artist square overlooking Sacre-Coeur", stayTier: "5-Star Paris Hotel", transport: "Private AC Coach", meals: "Breakfast" },
      { day: 3, title: "TGV High-Speed Train to Swiss Alps (Interlaken)", morning: "Board high-speed TGV train across French countryside into Switzerland", afternoon: "Scenic train along Lake Thun to alpine resort Interlaken", evening: "Swiss fondue dinner surrounded by Eiger and Jungfrau peaks", stayTier: "5-Star Swiss Alpine Resort", transport: "TGV 1st Class", meals: "Breakfast & Dinner" },
      { day: 4, title: "Mt. Titlis Glacier & Rotair Revolving Cable Car", morning: "Ascend Mt. Titlis on world's first revolving cable car to 10,000ft", afternoon: "Explore Ice Grotto, Glacier Cliff Walk & snow fun park", evening: "Stroll across historic Chapel Bridge in Lucerne", stayTier: "5-Star Swiss Alpine Resort", transport: "Cable Car + Rail", meals: "Breakfast" },
      { day: 5, title: "Scenic Swiss Rail into Venice (Italy)", morning: "Panoramic train through Gotthard pass into Italy", afternoon: "Arrive in floating city of Venice and board private water taxi", evening: "Romantic private Gondola ride along Grand Canal", stayTier: "5-Star Venice Island Hotel", transport: "1st Class Rail + Gondola", meals: "Breakfast & Dinner" },
      { day: 6, title: "St. Mark's Basilica & Train to Florence", morning: "Tour St. Mark's Square, Doge's Palace and Bridge of Sighs", afternoon: "High-speed Frecciarossa train to Florence, birthplace of Renaissance", evening: "Sunset views over terracotta roofs from Piazzale Michelangelo", stayTier: "5-Star Florence Hotel", transport: "Frecciarossa 1st Class", meals: "Breakfast" },
      { day: 7, title: "Florence Duomo, Pisa Leaning Tower & Rome", morning: "Visit Florence Duomo, Ponte Vecchio & leather markets", afternoon: "Photo stop at famous Leaning Tower of Pisa", evening: "Arrive in Eternal City Rome and check in", stayTier: "5-Star Rome Hotel", transport: "Private AC Coach", meals: "Breakfast & Dinner" },
      { day: 8, title: "VIP Colosseum & Vatican City (Rome)", morning: "VIP skip-the-line access inside ancient Colosseum & Roman Forum", afternoon: "Visit Vatican Museums, Sistine Chapel & St. Peter's Basilica", evening: "Toss coin into Trevi Fountain and enjoy gelato", stayTier: "5-Star Rome Hotel", transport: "Private AC Coach", meals: "Breakfast" },
      { day: 9, title: "Flight / Scenic Rail to Vienna (Austria)", morning: "Journey across Alps to imperial capital of Vienna", afternoon: "Check-in to luxury hotel on Ringstrasse boulevard", evening: "Classical Mozart & Strauss musical concert performance", stayTier: "5-Star Vienna Hotel", transport: "1st Class Rail / Flight", meals: "Breakfast & Dinner" },
      { day: 10, title: "Schonbrunn Palace & Munich (Germany)", morning: "Tour lavish imperial Schonbrunn Palace state apartments", afternoon: "Cross into Germany and drive to Bavarian capital Munich", evening: "Traditional Bavarian dinner at historic Hofbrauhaus beer hall", stayTier: "5-Star Munich Hotel", transport: "Private AC Coach", meals: "Breakfast & Dinner" },
      { day: 11, title: "BMW Welt & High-Speed ICE to Amsterdam", morning: "Visit futuristic BMW Welt museum and Olympic Park", afternoon: "Board German high-speed ICE train to Amsterdam", evening: "Evening stroll in lively Dam Square and canals", stayTier: "5-Star Amsterdam Hotel", transport: "ICE Bullet Train", meals: "Breakfast" },
      { day: 12, title: "Amsterdam Glass-Topped Canal Cruise & Windmills", morning: "Cruise UNESCO canal ring on glass-topped boat", afternoon: "Excursion to Zaanse Schans historic windmills & wooden clog workshop", evening: "Visit Van Gogh Museum / Heineken Experience", stayTier: "5-Star Amsterdam Hotel", transport: "Canal Boat + Coach", meals: "Breakfast" },
      { day: 13, title: "Brussels Grand Place & Atomium (Belgium)", morning: "Drive across border into Belgian capital Brussels", afternoon: "Visit UNESCO Grand Place, Manneken Pis and Atomium", evening: "Belgian waffle & gourmet chocolate tasting tour", stayTier: "5-Star Brussels Hotel", transport: "Private AC Coach", meals: "Breakfast" },
      { day: 14, title: "Return to Paris & Gala Farewell Dinner", morning: "High-speed Eurostar train back to Paris", afternoon: "Free time for shopping in Galeries Lafayette and Champs-Elysees", evening: "Gala 5-course farewell dinner cruise on the Seine", stayTier: "5-Star Paris Hotel", transport: "Eurostar 1st Class", meals: "Breakfast & Gala Dinner" },
      { day: 15, title: "Departure from Paris", morning: "Gourmet French breakfast", afternoon: "Private chauffeur transfer to Charles de Gaulle Airport", evening: "Departure flight home with life-changing memories", stayTier: "Departure", transport: "Private Chauffeur", meals: "Breakfast" }
    ],
    inclusions: ["14 Nights in verified 5-star city-center luxury hotels", "1st Class Eurail Global Pass & Eurostar high-speed rail tickets", "All skip-the-line admissions (Eiffel, Louvre, Colosseum, Vatican, Titlis)", "Daily gourmet buffet breakfasts + 8 multi-course regional dinners", "Full Schengen Visa preparation and filing concierge"],
    exclusions: ["International flights from India to Paris", "Personal shopping", "City tourist taxes"],
    bestSeason: "April - Oct (Spring Blooms, Long Summer Days & Autumn Colors)"
  },

  // ==========================================
  // 4. AFRICA & INDIAN OCEAN EXPEDITIONS
  // ==========================================
  {
    id: "kenya-safari",
    name: "Kenya Maasai Mara Safari: Big Five & Balloon Flight",
    tagline: "Big Five game drives, luxury tented glamping & sunrise hot air balloon safari",
    region: "Africa",
    country: "Kenya",
    category: "Adrenaline & Adventure",
    vibeTags: ["Wildlife Safari", "Adrenaline & Adventure"],
    type: ["Safari", "Wildlife", "Glamping"],
    durationDays: 7,
    duration: "6 Nights / 7 Days",
    price: 145000,
    originalPrice: 178000,
    currency: "INR",
    rating: 4.97,
    reviews: 82,
    groupSize: "Small Group / Family",
    difficulty: "Easy",
    badge: "Big Five Safari",
    featured: true,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Custom 4x4 Land Cruiser with pop-up roof and expert safari tracker",
      "Overnight luxury tented camp inside Maasai Mara Game Reserve",
      "Sunrise Hot Air Balloon flight over savannah with Champagne bush breakfast",
      "Encounter the Big Five: Lions, Leopards, Elephants, Rhinos & Buffalos",
      "Authentic Maasai tribal village cultural dance and fire ceremony"
    ],
    inclusionChips: ["4x4 Land Cruiser", "Tented Glamping", "Balloon Safari", "Park Fees Included", "All Meals"],
    itinerary: [
      { day: 1, title: "Nairobi Arrival & Giraffe Centre", morning: "Arrival at Jomo Kenyatta Airport Nairobi with VIP greeting", afternoon: "Check-in to luxury hotel and visit historic Giraffe Centre", evening: "Welcome dinner at world-famous Carnivore restaurant", stayTier: "5-Star Nairobi Luxury Hotel", transport: "4x4 Safari Cruiser", meals: "Dinner" },
      { day: 2, title: "Great Rift Valley Drive to Maasai Mara", morning: "Scenic drive via Great Rift Valley viewpoint to Maasai Mara", afternoon: "Arrive at luxury tented camp and enjoy buffet lunch", evening: "First afternoon game drive spotting lions and cheetahs", stayTier: "5-Star Mara Tented Luxury Camp", transport: "4x4 Safari Cruiser", meals: "Breakfast, Lunch & Dinner" },
      { day: 3, title: "Full Day Big Five Game Drive in Maasai Mara", morning: "Early morning game drive tracking lion prides on the hunt", afternoon: "Picnic lunch under acacia tree overlooking Mara river", evening: "Spot hippos, Nile crocodiles, and herds of zebras", stayTier: "5-Star Mara Tented Luxury Camp", transport: "4x4 Safari Cruiser", meals: "Breakfast, Lunch & Dinner" },
      { day: 4, title: "Sunrise Hot Air Balloon Safari & Maasai Village", morning: "Dawn hot air balloon flight over awakening savannah", afternoon: "Champagne bush breakfast where you land", evening: "Visit traditional Maasai Manyatta village for tribal jump dance", stayTier: "5-Star Mara Tented Luxury Camp", transport: "Hot Air Balloon + 4x4", meals: "Breakfast, Lunch & Dinner" },
      { day: 5, title: "Lake Naivasha Boat Safari & Crescent Island", morning: "Drive to scenic freshwater Lake Naivasha", afternoon: "Boat safari among hundreds of hippos to Crescent Island", evening: "Walking safari alongside giraffes and zebras on foot", stayTier: "5-Star Lake Naivasha Sopa Resort", transport: "4x4 Safari Cruiser + Boat", meals: "Breakfast, Lunch & Dinner" },
      { day: 6, title: "Lake Nakuru National Park (Rhino & Flamingo)", morning: "Drive to Lake Nakuru National Park", afternoon: "Game drive spotting endangered Black & White Rhinos and leopards", evening: "Sunset views over pink flamingo-fringed lake", stayTier: "5-Star Nakuru Lodge", transport: "4x4 Safari Cruiser", meals: "Breakfast, Lunch & Dinner" },
      { day: 7, title: "Nairobi Return & Departure", morning: "Morning breakfast overlooking savannah", afternoon: "Drive back to Nairobi and souvenir craft shopping", evening: "Transfer to airport for departure flight", stayTier: "Departure", transport: "4x4 Safari Cruiser", meals: "Breakfast" }
    ],
    inclusions: ["6 Nights in verified 5-star luxury safari lodges and tented camps", "Exclusive 4x4 Safari Land Cruiser with pop-up roof and binoculars", "All National Park and Game Reserve entry fees included", "Sunrise Hot Air Balloon flight with Champagne bush breakfast", "All meals during safari (Breakfast, Lunch & Dinner)"],
    exclusions: ["International flights", "Kenya Tourist eTA fee ($35)", "Tips for safari guide"],
    bestSeason: "July - Oct (Great Wildebeest Migration) & Dec - March (Pleasant Sunny Game Drives)"
  },
  {
    id: "egypt-pyramids",
    name: "Egypt Pharaonic Wonders: Pyramids & Luxury Nile Cruise",
    tagline: "Giza Great Pyramids, King Tut treasures & 5-Star Nile River Cruise",
    region: "Africa",
    country: "Egypt",
    category: "International Signature",
    vibeTags: ["Royal Luxury", "Adrenaline & Adventure"],
    type: ["Heritage", "Nile Cruise", "Ancient Wonders"],
    durationDays: 8,
    duration: "7 Nights / 8 Days",
    price: 115000,
    originalPrice: 142000,
    currency: "INR",
    rating: 4.95,
    reviews: 64,
    groupSize: "Couple / Family",
    difficulty: "Easy",
    badge: "Ancient Wonders",
    featured: false,
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Private guided tour inside Great Pyramid of Giza & Sphinx",
      "4 Nights aboard 5-Star Luxury Nile River Cruise with sundeck pool",
      "Valley of the Kings in Luxor & Tutankhamun's gold tomb",
      "Abu Simbel colossal rock temples of Ramses II & Nefertari",
      "Karnak Temple hypostyle hall & Kom Ombo crocodile temple"
    ],
    inclusionChips: ["5-Star Nile Cruise", "Domestic Flights", "All Temple Passes", "Egyptologist Guide", "Egypt Visa Included"],
    itinerary: [
      { day: 1, title: "Cairo Arrival & Nile View Check-in", morning: "VIP arrival at Cairo International Airport with fast-track visa", afternoon: "Check-in to luxury 5-star hotel overlooking River Nile", evening: "Dinner cruise on Nile with oriental music and Tanoura show", stayTier: "5-Star Cairo Nile Hotel", transport: "Private AC Van", meals: "Dinner" },
      { day: 2, title: "Giza Pyramids, Great Sphinx & Grand Egyptian Museum", morning: "Private tour of Great Pyramids of Cheops, Chephren & Mykerinos", afternoon: "Camel ride with panoramic view of 9 pyramids and Sphinx", evening: "Tour Grand Egyptian Museum containing King Tutankhamun golden mask", stayTier: "5-Star Cairo Nile Hotel", transport: "Private AC Van + Camel", meals: "Breakfast & Lunch" },
      { day: 3, title: "Fly to Aswan & Board 5-Star Nile Cruise", morning: "Flight from Cairo to Aswan and board 5-star luxury Nile cruise", afternoon: "Visit Aswan High Dam and Philae Temple of Goddess Isis on island", evening: "Traditional Felucca sailboat ride around Elephantine Island", stayTier: "5-Star Luxury Nile Cruise Ship", transport: "Flight + Cruise", meals: "Breakfast, Lunch & Dinner" },
      { day: 4, title: "Abu Simbel Temples & Sail to Kom Ombo", morning: "Excursion to magnificent rock-hewn Abu Simbel Temples", afternoon: "Sail towards Kom Ombo temple dedicated to crocodile god Sobek", evening: "Egyptian Galabeya party on cruise sundeck", stayTier: "5-Star Luxury Nile Cruise Ship", transport: "Cruise Ship", meals: "Breakfast, Lunch & Dinner" },
      { day: 5, title: "Edfu Temple of Horus & Sail to Luxor", morning: "Horse carriage ride to Edfu Temple of falcon god Horus", afternoon: "Cross Esna lock while enjoying high tea on sundeck", evening: "Arrive in Luxor and visit illuminated Luxor Temple at night", stayTier: "5-Star Luxury Nile Cruise Ship", transport: "Cruise Ship", meals: "Breakfast, Lunch & Dinner" },
      { day: 6, title: "Valley of the Kings, Hatshepsut & Karnak", morning: "Explore underground tombs in Valley of the Kings", afternoon: "Visit Temple of Queen Hatshepsut and Colossi of Memnon", evening: "Tour vast Karnak Temple complex with 134 stone pillars", stayTier: "5-Star Luxury Nile Cruise Ship", transport: "Cruise Ship", meals: "Breakfast, Lunch & Dinner" },
      { day: 7, title: "Fly to Cairo & Khan el-Khalili Bazaar", morning: "Disembark cruise and fly back to Cairo", afternoon: "Explore historic Citadel of Saladin and Mohamed Ali Alabaster Mosque", evening: "Treasure hunt in 14th-century Khan el-Khalili bazaar for perfumes and lamps", stayTier: "5-Star Cairo Nile Hotel", transport: "Flight + Van", meals: "Breakfast & Dinner" },
      { day: 8, title: "Departure", morning: "Buffet breakfast", afternoon: "Chauffeur transfer to Cairo Airport", evening: "Departure flight", stayTier: "Departure", transport: "Private AC Van", meals: "Breakfast" }
    ],
    inclusions: ["3 Nights 5-Star Cairo Hotel + 4 Nights 5-Star Luxury Nile Cruise", "Domestic flights Cairo-Aswan and Luxor-Cairo included", "All temple passes and monuments entry fees", "Licensed English-speaking Egyptologist guide throughout", "All meals during Nile cruise + daily breakfasts in Cairo"],
    exclusions: ["International flights", "Entry inside Great Pyramid burial chamber (opted extra)", "Tips for cruise crew"],
    bestSeason: "Oct - April (Pleasant Winter Temperatures Along Nile)"
  },

  // ==========================================
  // 5. AMERICAS LUXURY & WONDERS
  // ==========================================
  {
    id: "usa-grand-trio",
    name: "USA Grand Trio: New York, Grand Canyon & Las Vegas",
    tagline: "Empire State views, Grand Canyon helicopter flight & Las Vegas Strip luxury",
    region: "Americas",
    country: "USA",
    category: "International Signature",
    vibeTags: ["Royal Luxury", "Adrenaline & Adventure"],
    type: ["Mega City", "Helicopter", "Desert Wonders"],
    durationDays: 8,
    duration: "7 Nights / 8 Days",
    price: 185000,
    originalPrice: 225000,
    currency: "INR",
    rating: 4.96,
    reviews: 58,
    groupSize: "Family / Couple",
    difficulty: "Easy",
    badge: "American Signature",
    featured: false,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "VIP Statue of Liberty Cruise & Summit One Vanderbilt glass skydeck",
      "Helicopter flight descending 4,000ft into floor of Grand Canyon",
      "Stay on world-famous Las Vegas Strip luxury resort with fountain view",
      "High Roller observation wheel & Cirque du Soleil show passes",
      "Central Park private horse carriage & Times Square VIP nightlife"
    ],
    inclusionChips: ["Grand Canyon Helicopter", "Domestic Flights", "5-Star Strip Resorts", "Summit One Pass", "US Visa Concierge"],
    itinerary: [
      { day: 1, title: "New York City Arrival & Times Square", morning: "Arrival at JFK International Airport with private limousine transfer", afternoon: "Check-in to luxury Manhattan hotel near Central Park", evening: "Experience electric energy of Times Square and Broadway theater district", stayTier: "5-Star Manhattan Hotel", transport: "Private Chauffeur", meals: "Dinner" },
      { day: 2, title: "Statue of Liberty, Wall Street & Summit Vanderbilt", morning: "VIP boat cruise around Statue of Liberty & Ellis Island", afternoon: "Walk Wall Street, 9/11 Memorial and Brooklyn Bridge", evening: "Panoramic sunset from Summit One Vanderbilt multi-sensory glass skydeck", stayTier: "5-Star Manhattan Hotel", transport: "Private AC Coach", meals: "Breakfast" },
      { day: 3, title: "Central Park & Flight to Las Vegas", morning: "Horse carriage ride through Central Park and 5th Avenue shopping", afternoon: "Fly from New York to Las Vegas Harry Reid Airport", evening: "Check-in to 5-star Bellagio / Venetian Resort on the Strip", stayTier: "5-Star Las Vegas Strip Resort", transport: "Flight + Limo", meals: "Breakfast" },
      { day: 4, title: "Grand Canyon VIP Helicopter Expedition", morning: "Board luxury VIP helicopter flight to Grand Canyon West Rim", afternoon: "Descend 4,000 feet below rim and land for Champagne toast", evening: "Walk transparent glass Grand Canyon Skywalk overlooking canyon floor", stayTier: "5-Star Las Vegas Strip Resort", transport: "VIP Helicopter", meals: "Breakfast & Champagne Lunch" },
      { day: 5, title: "Las Vegas Strip Highlights & Cirque du Soleil", morning: "Relax by world-class resort pool and luxury spa", afternoon: "Ride High Roller 550ft observation wheel with 360° desert views", evening: "Witness world-famous Cirque du Soleil 'O' aquatic spectacle", stayTier: "5-Star Las Vegas Strip Resort", transport: "Monorail / Limo", meals: "Breakfast" },
      { day: 6, title: "Hoover Dam & Red Rock Canyon Excursion", morning: "Drive to engineering marvel Hoover Dam on Colorado River", afternoon: "Scenic drive through vibrant Red Rock Canyon desert landscapes", evening: "Fine dining dinner at Michelin-starred restaurant on the Strip", stayTier: "5-Star Las Vegas Strip Resort", transport: "Private AC SUV", meals: "Breakfast & Dinner" },
      { day: 7, title: "Luxury Shopping & Fremont Street Light Show", morning: "Designer outlet shopping at premium shopping pavilions", afternoon: "Visit nostalgic Fremont Street vintage Vegas & zip-line", evening: "Watch Bellagio dancing fountains farewell show", stayTier: "5-Star Las Vegas Strip Resort", transport: "Private AC SUV", meals: "Breakfast" },
      { day: 8, title: "Departure", morning: "Buffet breakfast", afternoon: "Limousine transfer to airport", evening: "Flight departure", stayTier: "Departure", transport: "Private Limo", meals: "Breakfast" }
    ],
    inclusions: ["7 Nights in verified 5-star hotels (Manhattan & Las Vegas Strip)", "Domestic flight NYC to Las Vegas included", "Grand Canyon VIP helicopter flight with landing and Champagne", "Summit One Vanderbilt & Statue of Liberty VIP passes", "Complete US B1/B2 visa appointment and documentation concierge"],
    exclusions: ["International airfare", "Resort fees paid at hotel checkout", "Personal casino expenses"],
    bestSeason: "All Year (Spring: March-May, Autumn: Sep-Nov)"
  },
  {
    id: "peru-machu-picchu",
    name: "Peru Incan Empire: Cusco, Sacred Valley & Machu Picchu",
    tagline: "Hiram Bingham luxury train, lost Incan citadel & Rainbow Mountain",
    region: "Americas",
    country: "Peru",
    category: "Adrenaline & Adventure",
    vibeTags: ["Adrenaline & Adventure", "Snow & Alpine"],
    type: ["Heritage", "Adventure", "Ancient Citadel"],
    durationDays: 7,
    duration: "6 Nights / 7 Days",
    price: 165000,
    originalPrice: 198000,
    currency: "INR",
    rating: 4.98,
    reviews: 49,
    groupSize: "Small Group / Couple",
    difficulty: "Moderate",
    badge: "World Wonder",
    featured: false,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Ride 1920s-style luxury Belmond Hiram Bingham train to Machu Picchu",
      "Private guided sunrise exploration of Machu Picchu Lost City of Incas",
      "Sacred Valley Pisac ruins, Maras Salt Mines & Moray agricultural terraces",
      "Trek to breathtaking multi-colored mineral Vinicunca Rainbow Mountain (5,200m)",
      "Traditional Andean culinary feast with Ceviche & Pisco Sour masterclass"
    ],
    inclusionChips: ["Hiram Bingham Train", "Machu Picchu Passes", "Sacred Valley Stays", "Rainbow Mt Trek", "Peru Visa Help"],
    itinerary: [
      { day: 1, title: "Lima Arrival & Pacific Coast Highlights", morning: "Arrival at Jorge Chavez Airport Lima with VIP escort", afternoon: "Check-in to oceanfront Miraflores luxury hotel", evening: "Gourmet Peruvian dinner at world top-ranked restaurant", stayTier: "5-Star Lima Oceanfront Hotel", transport: "Private AC Van", meals: "Dinner" },
      { day: 2, title: "Fly to Imperial Cusco & Acclimatization", morning: "Fly to high-altitude Incan capital Cusco (3,400m)", afternoon: "Check-in to historic monastery hotel with oxygenated suites", evening: "Stroll in Plaza de Armas and San Pedro artisanal market", stayTier: "5-Star Luxury Monasterio Hotel", transport: "Flight + Van", meals: "Breakfast" },
      { day: 3, title: "Sacred Valley of Incas & Maras Salt Pans", morning: "Descend into lush Sacred Valley and visit Pisac fortress", afternoon: "Explore thousands of cascading white Maras Salt Mines", evening: "Check-in to luxury riverside hacienda resort in Urubamba", stayTier: "5-Star Sacred Valley Hacienda", transport: "Private AC Van", meals: "Breakfast & Lunch" },
      { day: 4, title: "Belmond Hiram Bingham Train to Machu Picchu", morning: "Board luxury 1920s Belmond Hiram Bingham train with live music & brunch", afternoon: "Ascend to Machu Picchu Lost City of Incas with private archaeologist", evening: "Sunset views over Incan stone terraces and Huayna Picchu peak", stayTier: "5-Star Sanctuary Lodge / Aguas Calientes", transport: "Belmond Train", meals: "Breakfast, Brunch & Dinner" },
      { day: 5, title: "Second Sunrise at Citadel & Return to Cusco", morning: "Option for sunrise photography over Sun Gate at Machu Picchu", afternoon: "Panoramic Vistadome train return along Urubamba river", evening: "Farewell Andean banquet in historic Cusco", stayTier: "5-Star Luxury Monasterio Hotel", transport: "Vistadome Train", meals: "Breakfast & Dinner" },
      { day: 6, title: "Vinicunca Rainbow Mountain Trek (5,200m)", morning: "Early morning expedition to multi-hued Rainbow Mountain", afternoon: "Hike past herds of alpacas and snow-capped Ausangate peaks", evening: "Return to Cusco for restorative hot stone massage", stayTier: "5-Star Luxury Monasterio Hotel", transport: "Private 4x4 SUV", meals: "Breakfast & Box Lunch" },
      { day: 7, title: "Flight to Lima & Departure", morning: "Buffet breakfast", afternoon: "Fly back to Lima for international departure", evening: "Flight home", stayTier: "Departure", transport: "Private AC Van", meals: "Breakfast" }
    ],
    inclusions: ["6 Nights in luxury 5-star properties (including Belmond & oxygenated suites)", "Domestic flights Lima-Cusco-Lima included", "Belmond Hiram Bingham luxury train passes with gourmet dining", "All Machu Picchu permits and archaeological guide fees", "Rainbow Mountain private expedition with oxygen and trek leader"],
    exclusions: ["International airfare", "Personal trekking gear", "Huayna Picchu hike permit (available on request)"],
    bestSeason: "May - Oct (Dry Season with Clear Mountain Skies)"
  },

  // ==========================================
  // 6. OCEANIA & POLAR EXPEDITIONS
  // ==========================================
  {
    id: "australia-highlights",
    name: "Australia Icons: Sydney, Great Barrier Reef & Melbourne",
    tagline: "Sydney Opera House yacht cruise, Great Barrier Reef helicopter & Great Ocean Road",
    region: "Oceania",
    country: "Australia",
    category: "International Signature",
    vibeTags: ["Tropical Islands", "Royal Luxury"],
    type: ["Coast", "Reef", "Iconic Cities"],
    durationDays: 8,
    duration: "7 Nights / 8 Days",
    price: 175000,
    originalPrice: 210000,
    currency: "INR",
    rating: 4.97,
    reviews: 67,
    groupSize: "Family / Couple",
    difficulty: "Easy",
    badge: "Oceania Icon",
    featured: false,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "Private luxury sunset catamaran cruise across Sydney Harbour",
      "Outer Great Barrier Reef pontoon with semi-submersible & snorkeling",
      "Scenic helicopter flight over world-famous Heart Reef",
      "Great Ocean Road scenic drive to 12 Apostles limestone stacks",
      "Cuddle koalas & feed kangaroos at wildlife sanctuary"
    ],
    inclusionChips: ["Reef Catamaran", "Helicopter Flight", "Domestic Flights", "Opera House Tour", "Australia Visa Help"],
    itinerary: [
      { day: 1, title: "Sydney Arrival & Harbour Sunset Cruise", morning: "Arrival at Sydney Kingsford Smith Airport with private transfer", afternoon: "Check-in to 5-star hotel with Sydney Harbour views", evening: "Private luxury sunset catamaran cruise past Opera House and Bridge", stayTier: "5-Star Sydney Harbour Hotel", transport: "Private AC Van + Yacht", meals: "Dinner" },
      { day: 2, title: "Sydney Opera House VIP Tour & Bondi Beach", morning: "Private architectural tour inside Sydney Opera House concert halls", afternoon: "Coastal cliff walk from Bondi Beach to Bronte Beach", evening: "Seafood dinner at iconic Darling Harbour waterfront", stayTier: "5-Star Sydney Harbour Hotel", transport: "Private AC Van", meals: "Breakfast" },
      { day: 3, title: "Fly to Tropical Cairns (Great Barrier Reef)", morning: "Fly north to tropical paradise Cairns", afternoon: "Check-in to luxury beachfront resort in Palm Cove", evening: "Stroll along Kuranda rainforest village markets", stayTier: "5-Star Cairns Beach Resort", transport: "Flight + SUV", meals: "Breakfast" },
      { day: 4, title: "Outer Great Barrier Reef Luxury Cruise", morning: "High-speed catamaran to Outer Barrier Reef pontoon", afternoon: "Snorkel in turquoise waters with sea turtles and coral fish", evening: "Scenic helicopter joyride over Great Barrier Reef", stayTier: "5-Star Cairns Beach Resort", transport: "Catamaran + Helicopter", meals: "Breakfast & Buffet Lunch" },
      { day: 5, title: "Fly to Cultural Capital Melbourne", morning: "Flight from Cairns to Melbourne Tullamarine Airport", afternoon: "Check-in to 5-star hotel near Yarra River", evening: "Explore famous street art graffiti laneways and boutique cafes", stayTier: "5-Star Melbourne Hotel", transport: "Flight + Van", meals: "Breakfast" },
      { day: 6, title: "Great Ocean Road & 12 Apostles Day Tour", morning: "Epic coastal drive along winding Great Ocean Road", afternoon: "Marvel at monumental 12 Apostles limestone stacks rising from Southern Ocean", evening: "Spot wild koalas in eucalyptus trees at Kennett River", stayTier: "5-Star Melbourne Hotel", transport: "Private AC Coach", meals: "Breakfast & Lunch" },
      { day: 7, title: "Yarra Valley Wine Tasting & Phillip Island Penguins", morning: "Wine tasting in picturesque rolling hills of Yarra Valley", afternoon: "Visit Phillip Island to see thousands of Little Fairy Penguins parade on beach", evening: "Farewell Australian gourmet dinner", stayTier: "5-Star Melbourne Hotel", transport: "Private AC Coach", meals: "Breakfast & Dinner" },
      { day: 8, title: "Departure", morning: "Buffet breakfast", afternoon: "Chauffeur transfer to Melbourne Airport", evening: "Flight departure", stayTier: "Departure", transport: "Private AC Van", meals: "Breakfast" }
    ],
    inclusions: ["7 Nights in verified 5-star Australian properties", "Domestic flights Sydney-Cairns and Cairns-Melbourne included", "Great Barrier Reef luxury catamaran cruise with snorkeling & lunch", "Sydney Opera House VIP private tour", "Australia tourist visa (subclass 600) filing assistance"],
    exclusions: ["International airfare", "Scuba dive introductory sessions", "Personal expenses"],
    bestSeason: "Sep - April (Australian Spring & Summer Sunshine)"
  },
  {
    id: "antarctica-expedition",
    name: "Antarctica White Continent: Luxury Polar Expedition",
    tagline: "Icebreaker cruise, zodiac landings with penguin colonies & ice kayaking",
    region: "Polar & Middle East",
    country: "Antarctica",
    category: "Adrenaline & Adventure",
    vibeTags: ["Snow & Alpine", "Northern Lights"],
    type: ["Polar", "Expedition", "Icebreaker"],
    durationDays: 11,
    duration: "10 Nights / 11 Days",
    price: 495000,
    originalPrice: 580000,
    currency: "INR",
    rating: 5.0,
    reviews: 32,
    groupSize: "Expedition Ship",
    difficulty: "Moderate",
    badge: "Ultimate Bucketlist",
    featured: false,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
    highlights: [
      "10 Nights aboard luxury Polar-Class Icebreaker Ship with private balcony suite",
      "Daily Zodiac boat landings among massive blue icebergs and penguin rookeries",
      "Encounter Gentoo, Chinstrap & Adelie penguins, leopard seals & humpback whales",
      "Optional polar plunge in sub-zero waters with safety tether & certificate",
      "Expert glaciologist, marine biologist and polar historian daily lectures"
    ],
    inclusionChips: ["Polar Icebreaker", "Zodiac Landings", "Expedition Parka", "All Gourmet Meals", "Doctor on Board"],
    itinerary: [
      { day: 1, title: "Ushuaia (End of the World) Arrival", morning: "Arrival at Ushuaia, southernmost city on Earth in Tierra del Fuego", afternoon: "Check-in to luxury mountain lodge overlooking Beagle Channel", evening: "Welcome briefing with expedition team and equipment fitting", stayTier: "5-Star Ushuaia Luxury Lodge", transport: "Private AC Van", meals: "Dinner" },
      { day: 2, title: "Embarkation on Luxury Polar Icebreaker", morning: "Free morning to explore Beagle Channel and Tierra del Fuego park", afternoon: "Embark on state-of-the-art luxury polar expedition vessel", evening: "Sail through scenic Beagle Channel towards open ocean", stayTier: "5-Star Polar Balcony Suite", transport: "Icebreaker Ship", meals: "Breakfast & Dinner" },
      { day: 3, title: "Crossing the Legendary Drake Passage", morning: "Cross Drake Passage with wandering albatrosses soaring beside ship", afternoon: "Marine biology and penguin behavior lectures in ship theater", evening: "Multi-course dinner prepared by European master chefs", stayTier: "5-Star Polar Balcony Suite", transport: "Icebreaker Ship", meals: "Breakfast, Lunch & Dinner" },
      { day: 4, title: "First Icebergs & South Shetland Islands", morning: "Spot first giant cathedral tabular icebergs drifting north", afternoon: "First Zodiac landing at Aitcho Island among Gentoo penguin colonies", evening: "Watch humpback whales breach right outside your stateroom balcony", stayTier: "5-Star Polar Balcony Suite", transport: "Zodiac + Ship", meals: "Breakfast, Lunch & Dinner" },
      { day: 5, title: "Antarctic Peninsula: Neko Harbour Landfall", morning: "Step foot on the actual continental mainland of Antarctica at Neko Harbour", afternoon: "Hike up snowy ridge for panoramic vistas of glaciated bays", evening: "Glacier calving soundscapes echoing across the fjord", stayTier: "5-Star Polar Balcony Suite", transport: "Zodiac + Ship", meals: "Breakfast, Lunch & Dinner" },
      { day: 6, title: "Paradise Bay & Polar Plunge", morning: "Zodiac cruise through mirror-still waters of Paradise Bay", afternoon: "Optional Polar Plunge into freezing Antarctic waters with warm sauna follow-up", evening: "Champagne barbecue celebration on ship sundeck among glaciers", stayTier: "5-Star Polar Balcony Suite", transport: "Zodiac + Ship", meals: "Breakfast, Lunch & Dinner" },
      { day: 7, title: "Lemaire Channel & Port Lockroy Historic Post Office", morning: "Navigate narrow dramatic Lemaire Channel flanked by 1,000m sheer cliffs", afternoon: "Visit historic British base Port Lockroy and mail postcard from Antarctica", evening: "Spot leopard seals resting on floating ice floes", stayTier: "5-Star Polar Balcony Suite", transport: "Zodiac + Ship", meals: "Breakfast, Lunch & Dinner" },
      { day: 8, title: "Deception Island Volcanic Caldera", morning: "Ship sails through Neptune's Bellows into flooded volcanic caldera", afternoon: "Walk on steaming black volcanic ash beach at Whalers Bay", evening: "Begin northbound return journey", stayTier: "5-Star Polar Balcony Suite", transport: "Zodiac + Ship", meals: "Breakfast, Lunch & Dinner" },
      { day: 9, title: "Drake Passage Return & Stargazing", morning: "Sail north across Drake Passage reflecting on lifelong memories", afternoon: "Expedition photography showcase and debrief", evening: "Captain's Farewell Gala Dinner and toast", stayTier: "5-Star Polar Balcony Suite", transport: "Icebreaker Ship", meals: "Breakfast, Lunch & Dinner" },
      { day: 10, title: "Arrival in Ushuaia & Disembarkation", morning: "Ship arrives back in Ushuaia harbour", afternoon: "Disembark and transfer to hotel / airport", evening: "Celebratory farewell dinner in Ushuaia", stayTier: "5-Star Ushuaia Luxury Lodge", transport: "Private Van", meals: "Breakfast & Dinner" },
      { day: 11, title: "Departure", morning: "Buffet breakfast", afternoon: "Transfer to airport for return flight", evening: "Flight home", stayTier: "Departure", transport: "Private Van", meals: "Breakfast" }
    ],
    inclusions: ["10 Nights aboard luxury Polar-Class Icebreaker vessel in private balcony suite", "All gourmet meals, afternoon teas, and beverages on board", "Daily Zodiac boat excursions and shore landings with polar guides", "Complimentary custom waterproof expedition parka (yours to keep)", "Loan of high-grade insulated rubber muck boots during voyage"],
    exclusions: ["International airfare to Ushuaia", "Optional sea kayaking and snowshoeing add-ons", "Personal travel insurance"],
    bestSeason: "Dec - Feb (Peak Austral Summer, 24-Hour Daylight & Whale Sightings)"
  }
];

export const REELS_DATA = [
  {
    id: "reel-1",
    reelId: "DY0_FKniL_8",
    instagramUrl: "https://www.instagram.com/reel/DY0_FKniL_8/",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-man-skydiving-over-the-ocean-43577-large.mp4",
    videoThumb: "https://images.unsplash.com/photo-1521673132589-390419e99c4c?auto=format&fit=crop&w=800&q=80",
    author: "comfort.journey",
    destination: "Skydiving & Coastal Thrills",
    duration: "Signature Adventure Story",
    headline: "Skydiving Freefall & Coastal Horizons",
    tagline: "Unforgettable adrenaline rushes, soaring high above the coast with seamless end-to-end luxury travel arrangements.",
    rating: 5,
    views: "54.8K",
    flag: "🪂"
  },
  {
    id: "reel-2",
    reelId: "DAZk9u4Cj1p",
    instagramUrl: "https://www.instagram.com/reel/DAZk9u4Cj1p/",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-person-standing-on-a-cliff-by-the-sea-43187-large.mp4",
    videoThumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    author: "comfort.journey",
    destination: "Curated Luxury Travel Diaries",
    duration: "Signature Journey",
    headline: "Travel in Pure Comfort | Memories for a Lifetime",
    tagline: "Traveling isn’t just about the destination—it’s about the peace of mind, seamless comfort, and unforgettable memories made along the way.",
    rating: 5,
    views: "52.4K",
    flag: "✨"
  },
  {
    id: "reel-3",
    reelId: "Dbc810lRFJ1",
    instagramUrl: "https://www.instagram.com/reel/Dbc810lRFJ1/",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-waves-crashing-on-a-tropical-beach-42858-large.mp4",
    videoThumb: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=80",
    author: "comfort.journey",
    destination: "Tropical Coast & Island Escapes",
    duration: "Bali & Island Tour",
    headline: "Sun-Kissed Beaches & Crystal Waters",
    tagline: "Pristine coastlines, private speedboat island hopping, and luxury beachfront stays crafted for your dream tropical getaway.",
    rating: 5,
    views: "44.8K",
    flag: "🌴"
  },
  {
    id: "reel-4",
    reelId: "DbkodDLR30C",
    instagramUrl: "https://www.instagram.com/reel/DbkodDLR30C/",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-snowy-mountain-slopes-under-a-blue-sky-42861-large.mp4",
    videoThumb: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    author: "comfort.journey",
    destination: "Snow Peaks & Alpine Trails",
    duration: "Himachal & Mountain Retreats",
    headline: "Breathtaking Snow Mountains & Scenic Valleys",
    tagline: "Snow-capped peaks, panoramic cable car vistas, and cozy mountain chalets—travel without the hassle of planning.",
    rating: 5,
    views: "48.1K",
    flag: "🏔️"
  },
  {
    id: "reel-5",
    reelId: "DbXyPnoiwiW",
    instagramUrl: "https://www.instagram.com/reel/DbXyPnoiwiW/",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-driving-through-the-desert-at-sunset-41656-large.mp4",
    videoThumb: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
    author: "comfort.journey",
    destination: "Desert Safari & City Skyline",
    duration: "Dubai & Desert Emirates",
    headline: "Golden Dunes & Ultra-Luxury Skylines",
    tagline: "Thrilling sunset desert dune bashing, VIP private yacht dining, and iconic city experiences customized just for you.",
    rating: 5,
    views: "39.6K",
    flag: "🌆"
  },
  {
    id: "reel-6",
    reelId: "DZuiACNic5-",
    instagramUrl: "https://www.instagram.com/reel/DZuiACNic5-/",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-view-of-a-palace-through-an-ancient-arch-43229-large.mp4",
    videoThumb: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80",
    author: "comfort.journey",
    destination: "Royal Heritage & Historic Palaces",
    duration: "Rajasthan Heritage Tour",
    headline: "Majestic Forts & Royal Palace Stays",
    tagline: "Walk through majestic historic forts, grand royal suites, and regal hospitality with dedicated chauffeur service.",
    rating: 5,
    views: "35.2K",
    flag: "🏰"
  },
  {
    id: "reel-7",
    reelId: "DZO8RMzC3hR",
    instagramUrl: "https://www.instagram.com/reel/DZO8RMzC3hR/",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-underwater-view-of-clear-sea-and-sand-43542-large.mp4",
    videoThumb: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    author: "comfort.journey",
    destination: "Azure Lagoons & Overwater Villas",
    duration: "Maldives & Tropical Bliss",
    headline: "Overwater Luxury & Turquoise Horizons",
    tagline: "Wake up directly over turquoise waters, private plunge pools, and breathtaking sunsets with seamless end-to-end transfers.",
    rating: 5,
    views: "43.7K",
    flag: "🌊"
  },
  {
    id: "reel-8",
    reelId: "DZAUCdtCd8H",
    instagramUrl: "https://www.instagram.com/reel/DZAUCdtCd8H/",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-lions-resting-in-the-african-savanna-43486-large.mp4",
    videoThumb: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    author: "comfort.journey",
    destination: "Wild Safaris & Forest Glamping",
    duration: "Wildlife & Eco Trails",
    headline: "Untamed Wilderness & Luxury Forest Lodges",
    tagline: "Dawn wildlife safari drives, luxury glamping amidst deep nature, and serene forest escapes with 24/7 travel assistance.",
    rating: 5,
    views: "38.9K",
    flag: "🦁"
  }
];

export const TRAVELER_REELS = REELS_DATA;

export const GOOGLE_BUSINESS_PROFILE = {
  name: "Comfort Journey",
  rating: 4.8,
  totalReviews: "85+",
  tagline: "4.8 ★ Google Rating (85+ Verified Reviews)",
  googleShareUrl: "https://www.google.com/search?q=Comfort+Journey+Bhopal+Reviews",
  googleWriteReviewUrl: "https://www.google.com/search?q=Comfort+Journey+Bhopal+Reviews",
  address: "Shop no 2, Phase 5, Ankur Complex, 6 Number Bus Stop, Shivaji Nagar, Bhopal, Madhya Pradesh 462016",
  phone: "+91 87704 03315"
};

export const GOOGLE_REVIEWS = [
  {
    id: "gr-1",
    name: "Usha Parita",
    initials: "UP",
    avatarBg: "linear-gradient(135deg, #1A73E8, #0D47A1)",
    timeAgo: "2 months ago",
    tour: "Manali Mountain Tour",
    rating: 5,
    badge: "Verified Google Review",
    comment: "I recently went on a trip to Manali with Comfort Journey, and it was a great experience from start to finish. Everything was well planned, and the team made sure we were comfortable throughout the trip. The hotel, transportation, and overall arrangements were smooth and hassle free. What I appreciated most was their quick support whenever we had any questions or needed help. Thanks to their excellent service, I was able to enjoy the beautiful views and make wonderful memories without worrying about the travel arrangements. Highly recommended!!!!"
  },
  {
    id: "gr-2",
    name: "Bhanupriya Tindwani",
    initials: "BT",
    avatarBg: "linear-gradient(135deg, #8E24AA, #4A148C)",
    timeAgo: "1 year ago",
    tour: "Europe Custom Holiday",
    rating: 5,
    badge: "Verified Google Review",
    comment: "We all know how difficult it is to plan a memorable trip without facing any problems. Spending so much money and still coming back with regrets of not exploring the place properly. How to get the visa done, good properties to stay in. So many questions and no right answers. I faced the same problems while planning for Europe. And the solution was right here with COMFORT JOURNEY. The people here are humble and great listeners and problem solvers. A 100% dedicated staff to help you plan your trip your way, also while you are travelling. They sorted each and every problem and were present every step of the way. Amazing itinerary, included every major spot and few customisations according to my interests. Very cost effective and committed travel agency. Do give them a try. Thanks to COMFORT JOURNEY, I have the best memories from my trip."
  },
  {
    id: "gr-3",
    name: "Astha Acharya",
    initials: "AA",
    avatarBg: "linear-gradient(135deg, #00897B, #004D40)",
    timeAgo: "1 year ago",
    tour: "Custom Vacation Tour",
    rating: 5,
    badge: "Verified Google Review",
    comment: "I recently booked a trip with comfort journey and I must say, it was an absolute pleasure! From the initial consultation to the final departure, the team was incredibly helpful, knowledgeable, and responsive. The itinerary they crafted for us was perfect, taking into account our interests, budget, and preferences. The accommodations were top-notch, and the transportation arrangements were seamless."
  },
  {
    id: "gr-4",
    name: "Madhavi Mishra",
    initials: "MM",
    avatarBg: "linear-gradient(135deg, #FB8C00, #E65100)",
    timeAgo: "1 month ago",
    tour: "Bali Island Tour",
    rating: 5,
    badge: "Verified Google Review",
    comment: "We planned a trip to Bali. We just had to pay the amount and Comfort Journey took care of the rest. Driver, hotels, sightseeing were all upto the mark with immediate and on time assistance. Team is very patient and responds promptly. My next tour with them is a sure shot thing."
  },
  {
    id: "gr-5",
    name: "Kanishk G",
    initials: "KG",
    avatarBg: "linear-gradient(135deg, #00ACC1, #006064)",
    timeAgo: "2 months ago",
    tour: "Himachal Group Tour",
    rating: 5,
    badge: "Verified Google Review",
    comment: "Went to Himachal with my friends, must say the trip was really smooth, we didn’t have to struggle with the hotels or travelling. Recommended 👍🏻"
  },
  {
    id: "gr-6",
    name: "Malvika Valecha",
    initials: "MV",
    avatarBg: "linear-gradient(135deg, #D81B60, #880E4F)",
    timeAgo: "7 months ago",
    tour: "Luxury Travel Experience",
    rating: 5,
    badge: "Verified Google Review",
    comment: "Comfort Journey truly lives up to its name. From start to finish, the experience felt smooth, reliable, and thoughtfully organized. The team was professional, responsive, and clearly focused on making travel stress-free and enjoyable. Every detail was handled with care, allowing me to relax and simply enjoy the journey. Their commitment to quality service and customer satisfaction really stands out. I would confidently recommend Comfort Journey to anyone looking for a seamless and comfortable travel experience."
  },
  {
    id: "gr-7",
    name: "Muskan Parita",
    initials: "MP",
    avatarBg: "linear-gradient(135deg, #43A047, #1B5E20)",
    timeAgo: "7 months ago",
    tour: "Family Vacation",
    rating: 5,
    badge: "Verified Google Review",
    comment: "I had an incredible and hassle free experience with Comfort Journey. Everything was expertly managed from the beginning to the end. The group was courteous, accommodating, and always willing to assist. The accommodations were cozy, and the whole trip was easy and soothing. It was exactly what its name suggested. I'm really happy with Comfort Journey and would suggest it to anyone searching for a dependable and enjoyable travel experience."
  },
  {
    id: "gr-8",
    name: "Yash Pandey",
    initials: "YP",
    avatarBg: "linear-gradient(135deg, #3949AB, #1A237E)",
    timeAgo: "2 months ago",
    tour: "Offbeat Custom Itinerary",
    rating: 5,
    badge: "Verified Google Review",
    comment: "Loved how they customized our itinerary to include unique, offbeat experiences rather than just the usual crowded spots. The stays were top-notch and the support team was available 24/7. 10/10 service!!"
  }
];

export const TESTIMONIALS = GOOGLE_REVIEWS.map(r => ({
  name: r.name,
  location: "Verified Google Review",
  tour: r.tour,
  rating: r.rating,
  comment: r.comment,
  avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=002855&color=FF892F&bold=true&size=150`
}));

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
  { num: "07", title: "Business & VIP Corporate MICE", desc: "Executive airport transfers, VIP lounge access, and incentive corporate offsites." },
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
    a: "We maintain 100% price transparency. If your plans change, we provide flexible rescheduling options and prompt refunds (up to 100% refund 30+ days prior) according to hotel and flight carrier terms."
  },
  {
    q: "Do you offer corporate offsites, MICE, and group discounts?",
    a: "Yes! We organize executive corporate retreats, team building offsites, and luxury family group tours with customized group tier pricing."
  }
];

export const LIVE_BOOKINGS_FEED = [
  { name: "Priya & Rahul", from: "Mumbai", tour: "Kashmir Honeymoon Package", time: "3 mins ago" },
  { name: "Amit Sharma", from: "Bhopal", tour: "Bali 7-Day Private Pool Villa", time: "8 mins ago" },
  { name: "Dr. Sanjeev Kapoor", from: "Indore", tour: "Swiss Alps & Titlis Glacier Pass", time: "14 mins ago" },
  { name: "Ananya & Group", from: "Delhi", tour: "Andaman Coral Island Escape", time: "22 mins ago" },
  { name: "Sunil Gupta & Family", from: "Jabalpur", tour: "Sacred Kedarnath & Badrinath", time: "31 mins ago" }
];

// =======================================================
// 13. TRAVEL STYLE DNA DISCOVERY QUIZ (5-QUESTION FLOW)
// =======================================================
export const TRAVEL_STYLE_DNA_QUESTIONS = [
  {
    id: 1,
    title: "What pace defines your dream journey?",
    subtitle: "Choose the daily rhythm that best rejuvenates you.",
    options: [
      { id: "slow", label: "Slow & Serene Luxury", desc: "Leisurely mornings, scenic veranda breakfasts, unhurried sunset walks.", icon: "☕", tag: "Relaxed" },
      { id: "active", label: "Active Discovery & Wonder", desc: "Panoramic cable cars, glacier walks, vibrant local markets & viewpoints.", icon: "🥾", tag: "Adventure" },
      { id: "heritage", label: "Royal Culture & Storytelling", desc: "Private palace tours, regal architecture, folk evenings & artisan visits.", icon: "👑", tag: "Heritage" },
      { id: "coastal", label: "Ocean Breeze & Private Yachting", desc: "Overwater bungalows, turquoise lagoons, beach clubs & coral reefs.", icon: "⛵", tag: "Island" }
    ]
  },
  {
    id: 2,
    title: "Who are you exploring the world with?",
    subtitle: "We tailor private vehicles, suite layouts, and pacing accordingly.",
    options: [
      { id: "couple", label: "Romantic Couple / Honeymoon", desc: "Private candlelight dinners, secluded stays, thoughtful romantic touches.", icon: "💍", tag: "Honeymoon" },
      { id: "family", label: "Family with Kids & Elders", desc: "Spacious private vehicles, interconnected rooms, gentle pacing & warm care.", icon: "👨‍👩‍👧‍👦", tag: "Family" },
      { id: "friends", label: "Private Friends Squad", desc: "Exciting group outings, nightlife & cafes, adventure sports & photo spots.", icon: "🎉", tag: "Group" },
      { id: "solo", label: "Solo / Mindful Travel", desc: "Safe curated boutique stays, mindful retreats, dedicated chauffeur assistance.", icon: "🧭", tag: "Solo" }
    ]
  },
  {
    id: 3,
    title: "Which scenery calls to your soul right now?",
    subtitle: "Select the climate and landscape you long to wake up to.",
    options: [
      { id: "snow", label: "Snow Peaks & Alpine Meadows", desc: "Crisp pine air, snowy valleys, cozy mountain chalets & gondolas.", icon: "🏔️", match: ["kashmir-paradise", "swiss-alps", "himachal-wonderland"] },
      { id: "tropical", label: "Tropical Coastlines & Coral Islands", desc: "Warm turquoise waters, private plunge pools, palm-fringed sands.", icon: "🌴", match: ["bali-paradise", "maldives-luxury", "andaman-escape"] },
      { id: "desert_city", label: "Golden Dunes & Ultra-Luxury Skylines", desc: "Sunset desert safaris, iconic architecture, rooftop dining & VIP malls.", icon: "🌆", match: ["dubai-luxury", "singapore-malaysia"] },
      { id: "royalty", label: "Historic Forts & Royal Lake Palaces", desc: "Centuries-old heritage suites, peacock courtyards, majestic ramparts.", icon: "🏰", match: ["rajasthan-royals", "kerala-backwaters"] }
    ]
  },
  {
    id: 4,
    title: "What is your accommodation philosophy?",
    subtitle: "Your stay is the sanctuary of your journey.",
    options: [
      { id: "boutique_5star", label: "5★ Heritage Palaces & Luxury Resorts", desc: "Iconic hospitality, private butler service, world-class spas.", icon: "✨", tier: "VIP" },
      { id: "curated_4star", label: "Curated 4★ & 5★ Boutique Stays", desc: "Authentic character, prime central location, panoramic views & comfort.", icon: "🌟", tier: "Premium" },
      { id: "cozy_standard", label: "Comfortable Handpicked 3★+ Stays", desc: "Clean, safe, highly rated cozy hotels with warm local hospitality.", icon: "🏡", tier: "Standard" }
    ]
  },
  {
    id: 5,
    title: "What level of on-trip care do you value most?",
    subtitle: "Comfort Journey covers every detail with complete peace of mind.",
    options: [
      { id: "all_inclusive", label: "Total VIP Concierge & Fast-Track", desc: "Chauffeur on call, VIP airport greeting, pre-arranged priority passes.", icon: "🛡️" },
      { id: "smooth_care", label: "Dedicated On-Trip Concierge", desc: "24/7 WhatsApp manager, verified drivers, flexible daily timetable.", icon: "📱" },
      { id: "balanced", label: "Self-Exploration with Assured Safety", desc: "All logistics & hotels locked in, with freedom to explore freely.", icon: "🗺️" }
    ]
  }
];

// =======================================================
// 14. PACKAGE TIER COMPARISON MATRIX (STANDARD / PREMIUM / VIP)
// =======================================================
export const PACKAGE_TIER_MATRIX = {
  title: "Comfort Journey Package Tiers Explained",
  subtitle: "Transparent side-by-side comparison of our signature travel tiers. Custom combinations always available upon request.",
  tiers: [
    {
      id: "standard",
      name: "Standard Comfort",
      tagline: "Uncompromised Safety & Great Value",
      badge: "Smart Value",
      color: "#93B2D2",
      features: [
        { name: "Accommodation", value: "Verified 3★+ & Boutique Hotels", note: "Clean, prime locations with high guest ratings" },
        { name: "Private Transport", value: "Dedicated AC Sedan (Dzire / Etios)", note: "Chauffeur with all toll & fuel covered" },
        { name: "Meal Plan", value: "Daily Delicious Breakfast Included", note: "Fresh multi-cuisine buffet spreads" },
        { name: "Sightseeing Passes", value: "Standard Pre-Arranged Entry Passes", note: "Confirmed tickets to all itinerary attractions" },
        { name: "On-Trip Support", value: "Dedicated Bhopal Helpdesk Desk (9am–9pm)", note: "Emergency support line active throughout" },
        { name: "Date Flexibility", value: "Standard Airline & Hotel Change Policy", note: "Subject to carrier rebooking terms" }
      ]
    },
    {
      id: "premium",
      name: "Premium Curated",
      tagline: "Our Most Popular Signature Experience",
      badge: "Most Popular",
      color: "#6FE6FC",
      isPopular: true,
      features: [
        { name: "Accommodation", value: "Handpicked 4★ & 5★ Luxury Resorts", note: "Deluxe view rooms, swimming pool & spa access" },
        { name: "Private Transport", value: "Premium SUV (Toyota Innova Crysta)", note: "Extra legroom, experienced courteous driver" },
        { name: "Meal Plan", value: "Daily Breakfast + Select Curated Dinners", note: "Special local culinary dinner experiences" },
        { name: "Sightseeing Passes", value: "Priority Fast-Track & Skip-the-Line", note: "Gondola Phase 1&2 / Burj Khalifa 124th Level" },
        { name: "On-Trip Support", value: "24/7 Dedicated Personal WhatsApp Concierge", note: "Instant responses from senior Bhopal trip manager" },
        { name: "Date Flexibility", value: "1 Free Date Reschedule up to 21 Days Prior", note: "Zero rebooking agency surcharge" }
      ]
    },
    {
      id: "vip",
      name: "VIP Royal Sanctuary",
      tagline: "Ultra-Luxury Palaces & Private Chauffeur",
      badge: "Pure Luxury",
      color: "#FF892F",
      features: [
        { name: "Accommodation", value: "5★ Heritage Palaces / Overwater Pool Villas", note: "Club suites, Taj/Oberoi/JW Marriott standards" },
        { name: "Private Transport", value: "Luxury Mercedes / Fortuner / Private Yacht", note: "Airport VIP tarmac meet & greet assistance" },
        { name: "Meal Plan", value: "All-Inclusive Gourmet Dining & Wine Tastings", note: "Candlelight private dinners & chef-crafted menus" },
        { name: "Sightseeing Passes", value: "VIP Private Guided Access & Private Charters", note: "Private Shikara / Speedboat / Helicopter shuttles" },
        { name: "On-Trip Support", value: "Dedicated Senior Tour Director 24/7 On-Call", note: "Proactive reservations & luggage coordination" },
        { name: "Date Flexibility", value: "100% Flexible Rescheduling up to 14 Days Prior", note: "Maximum peace of mind for luxury itineraries" }
      ]
    }
  ]
};

// =======================================================
// 15. DESTINATION READINESS & PRACTICAL TRAVEL ADVISORIES
// =======================================================
export const DESTINATION_READINESS_GUIDES = {
  "kashmir": {
    name: "Kashmir (Srinagar, Gulmarg & Pahalgam)",
    idealMonths: "April to October (Gardens & Chinar), Dec to March (Snow & Gondola Skiing)",
    climate: "Cool summers (15°C–25°C), Cold snowy winters (-2°C–8°C)",
    visaInfo: "No permit required for Indian citizens. Valid Gov Photo ID (Aadhaar/Passport) required for hotel & Gondola check-ins.",
    currency: "INR (Indian Rupee). UPI widely accepted in Srinagar; carry cash for local Shikara & pony rides in Pahalgam/Gulmarg.",
    altitudeTips: "Gulmarg Phase 2 sits at 13,780 ft. Stay hydrated, walk gently on day 1, and rent verified snow jackets/boots at Tangmarg.",
    packingList: ["Thermal inners (Oct–Apr)", "UV Sunglasses for snow reflection", "Comfortable gripping shoes", "Postpaid mobile SIM (Postpaid Airtel/Jio works best)"]
  },
  "swiss-alps": {
    name: "Swiss Alps (Interlaken, Lucerne & Zurich)",
    idealMonths: "May to September (Alpine meadows & lakes), Dec to March (Winter skiing & glaciers)",
    climate: "Pleasant summers (18°C–26°C), Crisp winter mountains (-5°C–5°C)",
    visaInfo: "Schengen Visa required for Indian passport holders. Apply 60–90 days in advance; Comfort Journey provides complete documentation filing.",
    currency: "Swiss Franc (CHF) & Euro (EUR). Credit cards and Apple/Google Pay accepted everywhere; Swiss Travel Pass covers trains, buses & boats.",
    altitudeTips: "Mt. Titlis (10,000 ft) & Jungfraujoch (11,333 ft) have high-altitude crisp air. Wear layered clothing and drink plenty of water.",
    packingList: ["Schengen Travel Insurance", "Type J Swiss plug adapter", "Waterproof windcheater jacket", "Universal power bank"]
  },
  "bali": {
    name: "Bali & Nusa Penida (Indonesia)",
    idealMonths: "April to October (Dry season, sunny beaches), Year-round tropical warmth",
    climate: "Tropical sunshine (26°C–31°C) with gentle ocean breezes",
    visaInfo: "Visa on Arrival (e-VoA) available for Indian travellers (approx. IDR 500,000 / ~₹2,700). Valid passport with 6+ months validity required.",
    currency: "Indonesian Rupiah (IDR). Forex card and cash exchange at authorized counters; credit cards accepted in major Ubud/Seminyak cafes.",
    altitudeTips: "Mount Batur sunrise trek requires a light jacket. Pack reef-safe sunscreen and waterproof phone pouches for speedboat crossings.",
    packingList: ["Breathable cotton outfits", "Reef-safe sunscreen & sunglasses", "Swimwear & water shoes for coral beaches", "Mosquito repellent"]
  },
  "dubai": {
    name: "Dubai & Abu Dhabi (UAE)",
    idealMonths: "October to April (Glorious sunshine & outdoor events), Year-round for luxury shopping & indoor theme parks",
    climate: "Pleasant winters (20°C–28°C), Hot summers (35°C–42°C with 100% climate-controlled interiors)",
    visaInfo: "30-day UAE Tourist eVisa processed in 48–72 hours through Comfort Journey.",
    currency: "UAE Dirham (AED). Cards and digital payments accepted across 99% of venues; carry minimal AED for souks.",
    altitudeTips: "Burj Khalifa 124th/148th observation decks are climate-controlled. Modest dress recommended when visiting Sheikh Zayed Grand Mosque.",
    packingList: ["Light linen clothing", "Smart evening wear for luxury rooftop dining", "Universal UK 3-pin plug adapter", "Sun hat & UV sunglasses"]
  },
  "andaman": {
    name: "Andaman Islands (Port Blair, Havelock & Neil)",
    idealMonths: "October to May (Calm azure seas, scuba diving & water sports)",
    climate: "Warm tropical island maritime weather (24°C–30°C)",
    visaInfo: "No permit needed for Indian citizens. Foreign nationals require standard Indian e-Tourist Visa.",
    currency: "INR (Indian Rupee). BSNL/Airtel have best island reception; carry cash for water sports as beach network can be intermittent.",
    altitudeTips: "Sea voyages via luxury Makruzz / Nautika catamarans. Take light motion sickness tablets 30 mins prior if prone to sea swaying.",
    packingList: ["Dry bags for island speedboats", "Rash guards & swimwear", "Comfortable sandals/crocs", "Personal beach towels"]
  },
  "rajasthan": {
    name: "Rajasthan (Jaipur, Udaipur, Jodhpur & Jaisalmer)",
    idealMonths: "October to March (Royal desert festivals, pleasant palace breezes)",
    climate: "Pleasant days (20°C–28°C), Chilly desert nights (8°C–14°C)",
    visaInfo: "Domestic destination — Gov ID (Aadhaar/Passport/DL) needed for palace hotel check-ins.",
    currency: "INR (Indian Rupee). UPI and cards widely accepted in cities; carry cash for local handicrafts in Johari/Bapu bazaars.",
    altitudeTips: "Flat plains and Thar desert. Stay well-hydrated during daytime fort walking tours.",
    packingList: ["Layered jackets for desert nights", "Comfortable walking shoes for massive fort ramparts", "Sunscreen & scarf", "Traditional evening wear"]
  },
  "maldives": {
    name: "Maldives (Private Resort Atolls)",
    idealMonths: "November to April (Pristine visibility, dry tropical days)",
    climate: "Year-round warm tropical paradise (27°C–32°C)",
    visaInfo: "Free 30-day Visa on Arrival for Indian passport holders with confirmed hotel reservation and return ticket.",
    currency: "USD & Maldivian Rufiyaa (MVR). Resort islands bill directly in USD on credit cards.",
    altitudeTips: "Direct private speedboat or seaplane transfer from Velana International Airport. Pack underwater cameras for house reef snorkeling.",
    packingList: ["Resort casual & swimwear", "Polarized sunglasses", "GoPro / Waterproof camera", "Sun protection & aloe vera"]
  }
};

// =======================================================
// 16. SEASONAL DISCOVERY RADAR DATA
// =======================================================
export const SEASONAL_RADAR_DATA = [
  {
    id: "spring",
    seasonName: "Spring Bloom",
    months: "March – May",
    icon: "🌸",
    headline: "Tulip Valleys & Mountain Blossoms",
    destinations: ["Kashmir Tulip Festival", "Japan Cherry Blossoms", "Paris & Switzerland"],
    vibe: "Fresh & Romantic",
    color: "#DAF561"
  },
  {
    id: "summer",
    seasonName: "Summer Escapes",
    months: "June – August",
    icon: "☀️",
    headline: "Alpine Heights & Ocean Lagoons",
    destinations: ["Swiss Alps & Glaciers", "Bali & Nusa Penida", "Amalfi Coast & Greece"],
    vibe: "Sun-Kissed Luxury",
    color: "#6FE6FC"
  },
  {
    id: "autumn",
    seasonName: "Autumn Golden",
    months: "Sept – November",
    icon: "🍁",
    headline: "Golden Chinar & Desert Royalty",
    destinations: ["Rajasthan Heritage Forts", "Kerala Backwaters", "Dubai Dune Safaris"],
    vibe: "Regal & Cultural",
    color: "#FF892F"
  },
  {
    id: "winter",
    seasonName: "Winter Snow & Lights",
    months: "Dec – February",
    icon: "❄️",
    headline: "Ski Slopes & Northern Lights",
    destinations: ["Gulmarg Snow Gondola", "Iceland Aurora Caves", "Maldives Overwater Luxury"],
    vibe: "Adrenaline & Warm Bliss",
    color: "#93EEFD"
  }
];

