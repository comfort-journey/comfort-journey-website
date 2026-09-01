// =========================================================================
// 7 CONTINENTS WORLD HIERARCHY TREE DATA
// Structure: Continent -> Country -> Cities -> Curated Tour Packages
// =========================================================================

export const CONTINENTS_TREE_DATA = [
  {
    id: "asia",
    name: "Asia",
    tagline: "Spiritual sanctuaries, tropical islands & futuristic metropolises",
    icon: "🌏",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    stats: { countries: 12, destinations: 85, packages: 14 },
    badge: "Most Popular",
    countries: [
      {
        id: "india",
        name: "India",
        code: "IN",
        flag: "🇮🇳",
        tag: "Royal Palaces & Spiritual Himalayas",
        image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "kashmir",
            name: "Kashmir (Srinagar & Gulmarg)",
            state: "Jammu & Kashmir",
            type: "Snow & Alpine / Romance",
            weatherTag: "Winter / Spring",
            startingPrice: 18999,
            duration: "5N / 6D",
            tourId: "tour-wix-peace-in-the-pines",
            highlights: ["Dal Lake Houseboat", "Gulmarg Gondola 13,800ft", "Pahalgam Betaab Valley"]
          },
          {
            id: "chardham",
            name: "Char Dham (Kedarnath & Badrinath)",
            state: "Uttarakhand",
            type: "Sacred Pilgrimage",
            weatherTag: "Summer / Autumn",
            startingPrice: 32500,
            duration: "9N / 10D",
            tourId: "tour-wix-ganga-to-the-hills",
            highlights: ["VIP Kedarnath Darshan", "Kedarnath Helicopter Shuttle", "Badrinath Aarti"]
          },
          {
            id: "rajasthan",
            name: "Jaipur, Udaipur & Jodhpur",
            state: "Rajasthan",
            type: "Royal Luxury & Heritage",
            weatherTag: "Winter / Autumn",
            startingPrice: 26999,
            duration: "6N / 7D",
            tourId: "tour-wix-rajasthan-royal-affair",
            highlights: ["Heritage Haveli Stays", "Lake Pichola Sunset Cruise", "Amer Fort Jeep Safari"]
          },
          {
            id: "kerala",
            name: "Munnar, Thekkady & Alleppey",
            state: "Kerala",
            type: "Serene Backwaters & Wellness",
            weatherTag: "Monsoon / Winter",
            startingPrice: 21999,
            duration: "5N / 6D",
            tourId: "tour-wix-pachmarhi-madhai",
            highlights: ["Private Houseboat Cruise", "Munnar Tea Estates", "Ayurvedic Spa Rejuvenation"]
          },
          {
            id: "andaman",
            name: "Port Blair & Havelock Island",
            state: "Andaman & Nicobar",
            type: "Tropical Islands & Coral Reefs",
            weatherTag: "Winter / Summer",
            startingPrice: 22499,
            duration: "5N / 6D",
            tourId: "tour-wix-goa-weekend-vibe",
            highlights: ["Radhanagar Best Beach", "Makruzz Catamaran Cruise", "Elephant Beach Snorkeling"]
          },
          {
            id: "himachal",
            name: "Shimla, Manali & Solang Valley",
            state: "Himachal Pradesh",
            type: "Snow Valleys & Family",
            weatherTag: "Winter / Summer",
            startingPrice: 19499,
            duration: "5N / 6D",
            tourId: "tour-wix-peace-in-the-pines",
            highlights: ["Atal Tunnel Snow Excursion", "Solang Valley Paragliding", "Manali Mall Road & Chalets"]
          },
          {
            id: "ladakh",
            name: "Leh, Nubra Valley & Pangong Lake",
            state: "Ladakh",
            type: "Adrenaline & High Passes",
            weatherTag: "Summer (Jun–Sep)",
            startingPrice: 28999,
            duration: "6N / 7D",
            tourId: "tour-wix-uttarakhand-explorer",
            highlights: ["Khardung La 18,380ft", "Pangong Tso Blue Lake", "Hunder Double-Hump Camel Safari"]
          },
          {
            id: "goa",
            name: "North & South Goa Luxury Beachfront",
            state: "Goa",
            type: "Beach & Nightlife",
            weatherTag: "Winter / Monsoon",
            startingPrice: 16999,
            duration: "4N / 5D",
            tourId: "tour-wix-goa-weekend-vibe",
            highlights: ["Private Pool Villa Stays", "Mandovi Sunset Luxury Cruise", "Candolim & Palolem Sunsets"]
          }
        ]
      },
      {
        id: "uae",
        name: "United Arab Emirates",
        code: "AE",
        flag: "🇦🇪",
        tag: "Futuristic Skylines & Gold Dunes",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "dubai-city",
            name: "Dubai & Abu Dhabi",
            state: "Emirate of Dubai",
            type: "Ultra-Luxury & Skyline",
            weatherTag: "Winter (Nov–Mar)",
            startingPrice: 42999,
            duration: "5N / 6D",
            tourId: "dubai-extravaganza",
            highlights: ["Burj Khalifa 124th Floor", "VIP Desert Dune Safari", "Dubai Marina Yacht Cruise"]
          }
        ]
      },
      {
        id: "indonesia",
        name: "Indonesia",
        code: "ID",
        flag: "🇮🇩",
        tag: "Tropical Jungle Pools & Sacred Temples",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "bali-island",
            name: "Bali (Ubud & Seminyak)",
            state: "Bali Province",
            type: "Couple & Honeymoon",
            weatherTag: "Summer / Autumn",
            startingPrice: 34999,
            duration: "6N / 7D",
            tourId: "bali-tropical-escape",
            highlights: ["Private Pool Villa in Ubud", "Nusa Penida Kelingking T-Rex", "Uluwatu Sunset Kecak Fire Dance"]
          }
        ]
      },
      {
        id: "thailand",
        name: "Thailand",
        code: "TH",
        flag: "🇹🇭",
        tag: "Emerald Islands & Floating Markets",
        image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "phuket-krabi",
            name: "Phuket, Krabi & Bangkok",
            state: "Southern Thailand",
            type: "Family & Island Hopper",
            weatherTag: "Winter / Spring",
            startingPrice: 38999,
            duration: "6N / 7D",
            tourId: "thailand-island-hopper",
            highlights: ["Phi Phi Islands Speedboat", "James Bond Island Cruise", "Bangkok Grand Palace & Temples"]
          }
        ]
      },
      {
        id: "japan",
        name: "Japan",
        code: "JP",
        flag: "🇯🇵",
        tag: "Sakura Cherry Blossoms & Bullet Trains",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "tokyo-kyoto",
            name: "Tokyo, Kyoto & Mt. Fuji",
            state: "Kanto & Kansai",
            type: "Heritage & Ultra-Modern",
            weatherTag: "Spring (Sakura) / Autumn",
            startingPrice: 165000,
            duration: "7N / 8D",
            tourId: "tour-wix-sakura-moments-the-ultimate-cherry-blossom",
            highlights: ["Shinkansen Bullet Train", "Mt. Fuji 5th Station Cable Car", "Kyoto Fushimi Inari Torii Gates"]
          }
        ]
      },
      {
        id: "maldives",
        name: "Maldives",
        code: "MV",
        flag: "🇲🇻",
        tag: "Pure Turquoise Water & Overwater Villas",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "male-atolls",
            name: "North Male & Ari Atolls",
            state: "Maldives Atolls",
            type: "Honeymoon & Ultra-Luxury",
            weatherTag: "Winter / Summer",
            startingPrice: 89999,
            duration: "4N / 5D",
            tourId: "maldives-overwater-bliss",
            highlights: ["Private Overwater Villa with Pool", "Seaplane Coral Island Transfer", "All-Inclusive Dining & Sunset Cruise"]
          }
        ]
      },
      {
        id: "srilanka",
        name: "Sri Lanka",
        code: "LK",
        flag: "🇱🇰",
        tag: "Lion Rock Fortress & Tea Hills",
        image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "colombo-kandy",
            name: "Kandy, Nuwara Eliya & Bentota",
            state: "Central & Western Provinces",
            type: "Nature & Cultural Heritage",
            weatherTag: "Winter / Spring",
            startingPrice: 29999,
            duration: "5N / 6D",
            tourId: "srilanka-scenic-heritage",
            highlights: ["Sigiriya Lion Rock UNESCO", "Scenic Blue Train to Ella", "Bentota Turtle Hatchery & Beach"]
          }
        ]
      },
      {
        id: "singapore",
        name: "Singapore & Malaysia",
        code: "SG",
        flag: "🇸🇬",
        tag: "Garden City & Petronas Twin Towers",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "singapore-kl",
            name: "Singapore & Kuala Lumpur",
            state: "Southeast Asia Hub",
            type: "Family Fun & Shopping",
            weatherTag: "All Year",
            startingPrice: 48999,
            duration: "6N / 7D",
            tourId: "singapore-malaysia-combo",
            highlights: ["Gardens by the Bay Supertrees", "Universal Studios Sentosa Pass", "Petronas Twin Towers Observation"]
          }
        ]
      },
      {
        id: "vietnam",
        name: "Vietnam",
        code: "VN",
        flag: "🇻🇳",
        tag: "Emerald Dragon Bays & Golden Bridge",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "hanoi-danang",
            name: "Hanoi, Ha Long Bay & Da Nang",
            state: "Northern & Central Vietnam",
            type: "Cruise & Lantern Towns",
            weatherTag: "Autumn / Spring",
            startingPrice: 44999,
            duration: "6N / 7D",
            tourId: "vietnam-heritage-bays",
            highlights: ["Overnight 5-Star Ha Long Bay Cruise", "Ba Na Hills Golden Giant Hands Bridge", "Hoi An Ancient Lantern Town"]
          }
        ]
      }
    ]
  },
  {
    id: "europe",
    name: "Europe",
    tagline: "Alpine panoramas, Mediterranean coasts & grand empires",
    icon: "🏰",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    stats: { countries: 8, destinations: 45, packages: 8 },
    badge: "Luxury Signature",
    countries: [
      {
        id: "switzerland",
        name: "Switzerland",
        code: "CH",
        flag: "🇨🇭",
        tag: "Glacier Express & Crystal Alpine Lakes",
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "interlaken-lucerne",
            name: "Interlaken, Lucerne & Zurich",
            state: "Central Switzerland",
            type: "Snow Peaks & Scenic Rail",
            weatherTag: "Summer / Winter",
            startingPrice: 129999,
            duration: "6N / 7D",
            tourId: "tour-wix-essence-of-europe",
            highlights: ["Mt. Titlis Rotating Rotair Gondola", "Lake Lucerne Private Yacht Cruise", "Swiss Pass Scenic Trains Included"]
          }
        ]
      },
      {
        id: "italy",
        name: "Italy",
        code: "IT",
        flag: "🇮🇹",
        tag: "Amalfi Cliffside Romance & Colosseum",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "amalfi-rome",
            name: "Positano, Capri, Rome & Florence",
            state: "Campania & Lazio",
            type: "Romance & Dolce Vita",
            weatherTag: "Summer / Autumn",
            startingPrice: 165000,
            duration: "7N / 8D",
            tourId: "amalfi-coast-rome",
            highlights: ["Positano Cliffside Luxury Hotel", "Private Speedboat to Capri Island", "VIP Skip-the-Line Colosseum & Vatican"]
          }
        ]
      },
      {
        id: "france",
        name: "France",
        code: "FR",
        flag: "🇫🇷",
        tag: "Eiffel Romance & French Riviera Glamour",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "paris-nice",
            name: "Paris, Nice & Monaco",
            state: "Ile-de-France & Côte d'Azur",
            type: "Haute Couture & Riviera",
            weatherTag: "Spring / Summer",
            startingPrice: 155000,
            duration: "6N / 7D",
            tourId: "tour-wix-essence-of-europe",
            highlights: ["Eiffel Tower 2nd Floor & Seine Dinner", "Louvre Museum Guided VIP Tour", "Monte Carlo Casino & Promenade des Anglais"]
          }
        ]
      },
      {
        id: "iceland",
        name: "Iceland",
        code: "IS",
        flag: "🇮🇸",
        tag: "Aurora Borealis & Blue Geothermal Lagoons",
        image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "reykjavik-vik",
            name: "Reykjavik, Vik & Golden Circle",
            state: "South Iceland",
            type: "Adrenaline & Northern Lights",
            weatherTag: "Winter (Aurora) / Summer",
            startingPrice: 185000,
            duration: "6N / 7D",
            tourId: "iceland-aurora-wonders",
            highlights: ["Blue Lagoon VIP Retreat Spa", "Northern Lights Superjeep Chase", "Vatnajokull Crystal Blue Ice Caves"]
          }
        ]
      },
      {
        id: "norway",
        name: "Norway",
        code: "NO",
        flag: "🇳🇴",
        tag: "Fjord Cruises & Tromso Midnight Sun",
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "bergen-tromso",
            name: "Bergen, Geirangerfjord & Tromso",
            state: "Western & Northern Norway",
            type: "Fjords & Arctic Lights",
            weatherTag: "Winter / Summer",
            startingPrice: 178000,
            duration: "7N / 8D",
            tourId: "norway-fjords-lights",
            highlights: ["Flåm Railway World's Steepest Rail", "UNESCO Geirangerfjord Cruise", "Husky Dog Sledding in Tromso"]
          }
        ]
      },
      {
        id: "greece",
        name: "Greece",
        code: "GR",
        flag: "🇬🇷",
        tag: "Whitewashed Santorini & Acropolis",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "santorini-athens",
            name: "Santorini, Mykonos & Athens",
            state: "Cyclades Islands",
            type: "Romantic Sunset Islands",
            weatherTag: "Summer / Autumn",
            startingPrice: 149000,
            duration: "6N / 7D",
            tourId: "greece-santorini-athens",
            highlights: ["Oia Private Sunset Pool Suite", "Santorini Catamaran Caldera Cruise", "Parthenon & Acropolis Tour"]
          }
        ]
      },
      {
        id: "uk",
        name: "United Kingdom",
        code: "GB",
        flag: "🇬🇧",
        tag: "Historic Castles & Scottish Highlands",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "london-edinburgh",
            name: "London, Oxford & Edinburgh",
            state: "England & Scotland",
            type: "Heritage & Royal Castles",
            weatherTag: "Summer / Spring",
            startingPrice: 168000,
            duration: "7N / 8D",
            tourId: "uk-scotland-heritage",
            highlights: ["London Eye Private Capsule", "Edinburgh Castle & Royal Mile", "Scottish Highlands & Loch Ness Cruise"]
          }
        ]
      },
      {
        id: "spain",
        name: "Spain",
        code: "ES",
        flag: "🇪🇸",
        tag: "Sagrada Familia & Flamenco Nights",
        image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "barcelona-madrid",
            name: "Barcelona, Madrid & Seville",
            state: "Catalonia & Andalusia",
            type: "Architecture & Tapas",
            weatherTag: "Spring / Autumn",
            startingPrice: 142000,
            duration: "6N / 7D",
            tourId: "spain-andalusia-discovery",
            highlights: ["Gaudi Sagrada Familia Fast-Track", "Royal Palace of Madrid VIP Entry", "Authentic Flamenco & Tapas Experience"]
          }
        ]
      }
    ]
  },
  {
    id: "africa",
    name: "Africa",
    tagline: "Great wildlife migrations, ancient pyramids & turquoise coasts",
    icon: "🦁",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    stats: { countries: 6, destinations: 25, packages: 6 },
    badge: "Wild Safari",
    countries: [
      {
        id: "kenya",
        name: "Kenya",
        code: "KE",
        flag: "🇰🇪",
        tag: "Masai Mara Big 5 & Great Migration",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "masai-mara",
            name: "Masai Mara & Amboseli",
            state: "Rift Valley",
            type: "Wildlife Safari & Luxury Glamping",
            weatherTag: "Summer (Jul–Oct)",
            startingPrice: 195000,
            duration: "6N / 7D",
            tourId: "kenya-safari-savannah",
            highlights: ["4x4 Land Cruiser Game Drives", "Hot Air Balloon Safari over Mara Plains", "Luxury Tented Camp amidst Nature"]
          }
        ]
      },
      {
        id: "egypt",
        name: "Egypt",
        code: "EG",
        flag: "🇪🇬",
        tag: "Giza Pyramids & 5-Star Nile Cruises",
        image: "https://images.unsplash.com/photo-1503177112294-7337da2a563d?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "cairo-luxor",
            name: "Cairo, Luxor & Aswan",
            state: "Nile Valley",
            type: "Ancient Wonders & River Cruise",
            weatherTag: "Winter (Oct–Apr)",
            startingPrice: 115000,
            duration: "6N / 7D",
            tourId: "egypt-pharaohs-nile",
            highlights: ["Great Pyramids & Sphinx Private Guide", "4-Night 5-Star Luxury Nile River Cruise", "Valley of the Kings & Karnak Temple"]
          }
        ]
      },
      {
        id: "south-africa",
        name: "South Africa",
        code: "ZA",
        flag: "🇿🇦",
        tag: "Table Mountain & Kruger Safari",
        image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "cape-town-kruger",
            name: "Cape Town & Kruger National Park",
            state: "Western Cape & Mpumalanga",
            type: "Coastline & Big Five",
            weatherTag: "Spring / Autumn",
            startingPrice: 189000,
            duration: "7N / 8D",
            tourId: "south-africa-cape-safari",
            highlights: ["Table Mountain Cable Car VIP", "Boulders Beach African Penguin Colony", "Private Big 5 Game Reserve Lodge"]
          }
        ]
      },
      {
        id: "mauritius",
        name: "Mauritius",
        code: "MU",
        flag: "🇲🇺",
        tag: "Sugar-White Beaches & Catamaran Charters",
        image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "mauritius-island",
            name: "Port Louis, Belle Mare & Le Morne",
            state: "Indian Ocean Island",
            type: "Tropical Beach & Watersports",
            weatherTag: "All Year",
            startingPrice: 68000,
            duration: "5N / 6D",
            tourId: "mauritius-island-paradise",
            highlights: ["Ile aux Cerfs Speedboat & Parasailing", "Chamarel 7-Coloured Earth Park", "Luxury Beachfront All-Inclusive Resort"]
          }
        ]
      }
    ]
  },
  {
    id: "north-america",
    name: "North America",
    tagline: "Iconic world cities, Rocky Mountain peaks & Caribbean shores",
    icon: "🗽",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1200&q=80",
    stats: { countries: 3, destinations: 20, packages: 4 },
    badge: "Iconic Wonders",
    countries: [
      {
        id: "usa",
        name: "United States",
        code: "US",
        flag: "🇺🇸",
        tag: "New York Skylines & Grand Canyon Wonders",
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "ny-vegas-west",
            name: "New York, Las Vegas & San Francisco",
            state: "NY, NV & California",
            type: "Coast to Coast Luxury",
            weatherTag: "Spring / Autumn",
            startingPrice: 245000,
            duration: "9N / 10D",
            tourId: "usa-coast-to-coast",
            highlights: ["Statue of Liberty & Times Square", "Grand Canyon Helicopter Flight", "Golden Gate Bridge & Alcatraz VIP"]
          }
        ]
      },
      {
        id: "canada",
        name: "Canada",
        code: "CA",
        flag: "🇨🇦",
        tag: "Banff Turquoise Lakes & Niagara Falls",
        image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "banff-vancouver",
            name: "Banff, Lake Louise & Vancouver",
            state: "Alberta & British Columbia",
            type: "Alpine Lakes & Rockies",
            weatherTag: "Summer (Jun–Sep)",
            startingPrice: 220000,
            duration: "8N / 9D",
            tourId: "canada-rockies-glaciers",
            highlights: ["Glacier Skywalk & Ice Explorer", "Lake Louise Fairmont Chateau", "Capilano Suspension Bridge Park"]
          }
        ]
      }
    ]
  },
  {
    id: "south-america",
    name: "South America",
    tagline: "Amazon rainforests, Inca citadels & Copacabana rhythms",
    icon: "🌴",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
    stats: { countries: 3, destinations: 15, packages: 3 },
    badge: "Exotic Wonder",
    countries: [
      {
        id: "brazil",
        name: "Brazil",
        code: "BR",
        flag: "🇧🇷",
        tag: "Christ the Redeemer & Amazon Jungle",
        image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "rio-amazon",
            name: "Rio de Janeiro & Manaus Amazon",
            state: "Rio & Amazonas",
            type: "Beaches & Rainforest",
            weatherTag: "Spring / Summer",
            startingPrice: 235000,
            duration: "7N / 8D",
            tourId: "brazil-rio-amazon",
            highlights: ["Christ the Redeemer Cogwheel Train", "Sugarloaf Mountain Cable Car", "Amazon River Dolphin Expedition"]
          }
        ]
      },
      {
        id: "peru",
        name: "Peru",
        code: "PE",
        flag: "🇵🇪",
        tag: "Machu Picchu Lost City of Incas",
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "cusco-machupicchu",
            name: "Cusco, Sacred Valley & Machu Picchu",
            state: "Andes Region",
            type: "Archaeology & High Andes",
            weatherTag: "Winter (Dry: May–Oct)",
            startingPrice: 215000,
            duration: "6N / 7D",
            tourId: "peru-machu-picchu-sacred",
            highlights: ["Vistadome Panoramic Train to Machu Picchu", "Private Guided Lost City Tour", "Sacred Valley Artisanal Textile Weaving"]
          }
        ]
      }
    ]
  },
  {
    id: "oceania",
    name: "Oceania",
    tagline: "Great Barrier Reef, Lord of the Rings peaks & Polynesian lagoons",
    icon: "🦘",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
    stats: { countries: 3, destinations: 18, packages: 4 },
    badge: "Down Under",
    countries: [
      {
        id: "australia",
        name: "Australia",
        code: "AU",
        flag: "🇦🇺",
        tag: "Sydney Harbour & Great Barrier Reef",
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "sydney-cairns",
            name: "Sydney, Gold Coast & Cairns",
            state: "NSW & Queensland",
            type: "Reef, Wildlife & City",
            weatherTag: "Spring / Autumn",
            startingPrice: 195000,
            duration: "8N / 9D",
            tourId: "australia-sydney-reef",
            highlights: ["Sydney Opera House & Harbour Cruise", "Great Barrier Reef Outer Pontoon Snorkel", "Kuranda Rainforest Scenic Railway"]
          }
        ]
      },
      {
        id: "new-zealand",
        name: "New Zealand",
        code: "NZ",
        flag: "🇳🇿",
        tag: "Milford Sound Fjords & Queenstown Peaks",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "queenstown-auckland",
            name: "Queenstown, Rotorua & Auckland",
            state: "North & South Island",
            type: "Nature & Adrenaline Capital",
            weatherTag: "Summer (Dec–Mar)",
            startingPrice: 225000,
            duration: "8N / 9D",
            tourId: "new-zealand-scenic-wonder",
            highlights: ["Milford Sound Fiordland Cruise", "Hobbiton Movie Set Private Tour", "Queenstown Skyline Gondola & Luge"]
          }
        ]
      }
    ]
  },
  {
    id: "polar",
    name: "Polar & Arctic",
    tagline: "Midnight sun, glacier icebergs & Glass Igloo Aurora wonderlands",
    icon: "❄️",
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
    stats: { countries: 3, destinations: 8, packages: 2 },
    badge: "Once in a Lifetime",
    countries: [
      {
        id: "lapland",
        name: "Finland Lapland",
        code: "FI",
        flag: "🇫🇮",
        tag: "Glass Igloos & Reindeer Sledges",
        image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
        cities: [
          {
            id: "rovaniemi-igloos",
            name: "Rovaniemi & Kakslauttanen",
            state: "Lapland Arctic Circle",
            type: "Glass Igloo & Aurora",
            weatherTag: "Winter (Nov–Mar)",
            startingPrice: 198000,
            duration: "5N / 6D",
            tourId: "lapland-arctic-igloos",
            highlights: ["Thermal Glass Igloo Stays under Aurora", "Husky Safari through Snowy Forests", "Santa Claus Village Official Crossing"]
          }
        ]
      }
    ]
  }
];

// =========================================================================
// WEATHER & SEASON CATEGORIES
// =========================================================================
export const SEASONS_DATA = [
  {
    id: "all",
    label: "All Seasons",
    icon: "🌐",
    desc: "Explore year-round travel destinations with guaranteed luxury"
  },
  {
    id: "summer",
    label: "Summer Escapes (Jun–Aug)",
    icon: "☀️",
    temp: "18°C - 28°C",
    desc: "Alpine cool weather, tropical islands, European lakes & high mountain passes",
    topDestinations: ["Switzerland", "Bali", "Amalfi Coast", "Ladakh", "Norway", "Canada Rockies"]
  },
  {
    id: "winter",
    label: "Winter Snow & Lights (Dec–Feb)",
    icon: "❄️",
    temp: "-5°C - 15°C",
    desc: "Himalayan ski slopes, Northern Lights, desert sunshine & Christmas markets",
    topDestinations: ["Gulmarg Kashmir", "Iceland Aurora", "Dubai", "Lapland Igloos", "Maldives", "Rajasthan"]
  },
  {
    id: "monsoon",
    label: "Monsoon Retreats & Wellness (Jul–Sep)",
    icon: "🌧️",
    temp: "22°C - 27°C",
    desc: "Ayurvedic body rejuvenation, emerald tea mist, gushing waterfalls & quiet luxury",
    topDestinations: ["Kerala Backwaters", "Munnar", "Coorg", "Meghalaya", "Udaipur Lakes", "Sri Lanka"]
  },
  {
    id: "autumn",
    label: "Autumn Golden (Sep–Nov)",
    icon: "🍁",
    temp: "15°C - 24°C",
    desc: "Crisp autumn air, golden foliage, royal desert palaces & pleasant breezes",
    topDestinations: ["Rajasthan Palaces", "Char Dham Yatra", "Japan Kyoto", "Vietnam", "Greece", "Andaman"]
  },
  {
    id: "spring",
    label: "Spring Bloom (Mar–May)",
    icon: "🌸",
    temp: "14°C - 22°C",
    desc: "Cherry blossoms, saffron valley blooms, pleasant European weather & island clarity",
    topDestinations: ["Kashmir Tulip Garden", "Japan Sakura", "Paris", "Swiss Alps", "Thailand", "Spain"]
  }
];

// =========================================================================
// TRAVELER STYLE & GROUP CATEGORIES
// =========================================================================
export const TRAVELER_STYLES_DATA = [
  {
    id: "couple",
    label: "Couple & Honeymoon",
    icon: "💑",
    tagline: "Romantic getaways with private villas, candlelight dining & sunset cruises",
    perks: ["Private Pool Villas", "Candlelight Dinners", "Couples Spa Sessions", "VIP Chauffeurs"],
    topMatches: ["tour-wix-peace-in-the-pines", "bali-tropical-escape", "maldives-overwater-bliss", "amalfi-coast-rome", "greece-santorini-athens"]
  },
  {
    id: "family",
    label: "Family Expeditions",
    icon: "👨‍👩‍👧‍👦",
    tagline: "Multi-generational vacations with spacious suites, theme parks & zero stress",
    perks: ["Connected Family Suites", "Kid-Friendly Activities", "Pre-Booked Passes", "24/7 Support"],
    topMatches: ["tour-wix-goa-weekend-vibe", "singapore-malaysia-combo", "thailand-island-hopper", "tour-wix-peace-in-the-pines", "dubai-extravaganza"]
  },
  {
    id: "solo",
    label: "Solo Explorer",
    icon: "🧗",
    tagline: "Safe, immersive adventures with verified boutique stays & local guide mastery",
    perks: ["Verified Safe Stays", "Curated Local Experiences", "Flexible Dates", "Dedicated Concierge"],
    topMatches: ["iceland-aurora-wonders", "tour-wix-uttarakhand-explorer", "tour-wix-sakura-moments-the-ultimate-cherry-blossom", "vietnam-heritage-bays"]
  },
  {
    id: "group",
    label: "Group & Corporate Retreats",
    icon: "🏢",
    tagline: "Seamless executive retreats, large family reunions & VIP group departures",
    perks: ["VIP Coaches & Transfers", "Conference Facilities", "Gala Banquet Dinners", "Dedicated Trip Lead"],
    topMatches: ["tour-wix-rajasthan-royal-affair", "dubai-extravaganza", "kenya-safari-savannah", "tour-wix-ganga-to-the-hills"]
  }
];
