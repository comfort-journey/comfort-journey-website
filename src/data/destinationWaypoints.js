/**
 * Destination Waypoints & Proximity Knowledge Graph for Comfy.ai
 * Provides realistic GPS coordinates, driving times, and Trip.com-style proximity data
 * (Transport, Landmarks, Dining, Shopping) for all top destinations.
 */

export const DESTINATION_WAYPOINTS = {
  kashmir: {
    center: [34.0837, 74.7973], // Srinagar
    baseCity: 'Srinagar, Kashmir',
    daysTemplate: [
      {
        day: 1,
        title: 'Arrival in Srinagar & Dal Lake Shikara Sunset',
        travelDistance: '18 km · ~35 mins',
        summary: 'Warm airport welcome with your private driver, check-in to a heated cedarwood houseboat or hotel, and evening shikara ride.',
        stops: [
          {
            time: '11:00 AM',
            type: 'transport',
            title: 'Srinagar Airport Meet & Greet',
            subtitle: 'Private AC car pickup with luggage assistance',
            ticketStatus: 'Included in package',
            duration: '45 mins',
            lat: 34.0047,
            lng: 74.7741,
            proximity: {
              transport: [{ name: 'Srinagar Airport Terminal (SXR)', dist: '150m' }, { name: 'Main Highway Taxi Stand', dist: '1.2 km' }],
              landmarks: [{ name: 'Humhama Green Belt', dist: '800m' }, { name: 'Pir Panjal Mountain Viewpoint', dist: '2.5 km' }],
              dining: [{ name: 'Airport Lounge Dining', dist: '100m' }, { name: 'Chai Jaai Tea Room', dist: '6.4 km' }],
              shopping: [{ name: 'Kashmir Government Arts Emporium', dist: '7.8 km' }, { name: 'Saffron & Walnut Mart', dist: '1.5 km' }]
            }
          },
          {
            time: '01:30 PM',
            type: 'meal',
            title: 'Lunch at Boulevard Pure Veg Restaurant',
            subtitle: 'Warm Kashmiri Kahwa with freshly cooked vegetarian meals',
            ticketStatus: 'Arranged per dining plan',
            duration: '1 hr',
            lat: 34.0865,
            lng: 74.8312,
            proximity: {
              transport: [{ name: 'Ghat No. 7 Shikara Jetty', dist: '120m' }, { name: 'Boulevard Road Car Stand', dist: '80m' }],
              landmarks: [{ name: 'Dal Lake Waterfront', dist: '50m' }, { name: 'Shankaracharya Hill Base', dist: '1.4 km' }],
              dining: [{ name: 'Ahdoos Dining Room', dist: '2.1 km' }, { name: 'Mughal Darbar Veg & Wazwan', dist: '2.3 km' }],
              shopping: [{ name: 'Floating Flower Market', dist: '300m' }, { name: 'Kashmir Shawl Gallery', dist: '400m' }]
            }
          },
          {
            time: '04:30 PM',
            type: 'sightseeing',
            title: 'Tranquil Sunset Shikara Ride on Dal Lake',
            subtitle: 'Glide past floating lotus gardens and snow-peak reflections',
            ticketStatus: 'Complimentary private shikara ride included',
            duration: '1 hr 30 mins',
            lat: 34.0933,
            lng: 74.8455,
            proximity: {
              transport: [{ name: 'Nehru Park Jetty', dist: '250m' }, { name: 'Private Houseboat Pier', dist: '180m' }],
              landmarks: [{ name: 'Char Chinar Island', dist: '1.2 km' }, { name: 'Floating Vegetable Market', dist: '1.9 km' }],
              dining: [{ name: 'Lakeside Shikara Tea Vendor', dist: '<50m' }],
              shopping: [{ name: 'Floating Woodcraft Stores', dist: '200m' }]
            }
          },
          {
            time: '07:30 PM',
            type: 'hotel',
            title: 'Check-in: Royal Cedarwood Houseboat / 4★ Stays',
            subtitle: 'Private room with central heating, electric blankets & hot running water',
            ticketStatus: 'Confirmed stay with breakfast & dinner',
            duration: 'Overnight',
            lat: 34.0895,
            lng: 74.8375,
            proximity: {
              transport: [{ name: 'Private Water Taxi Drop-off', dist: '<50m' }],
              landmarks: [{ name: 'Dal Lake North Basin', dist: '200m' }],
              dining: [{ name: 'Houseboat In-House Dining (Pure Veg / Jain on request)', dist: 'In-house' }],
              shopping: [{ name: 'Boulevard Souvenir Walkway', dist: '400m' }]
            }
          }
        ]
      },
      {
        day: 2,
        title: 'Gulmarg Meadow of Flowers & Gondola Cable Car',
        travelDistance: '52 km · ~1 hr 45 mins',
        summary: 'Scenic morning drive to Gulmarg with views of snowy pine ridges. Experience Phase 1 Gondola ride and gentle snow walks.',
        stops: [
          {
            time: '09:30 AM',
            type: 'transport',
            title: 'Scenic Drive from Srinagar to Gulmarg',
            subtitle: 'Smooth highway journey through Tangmarg pine forests',
            ticketStatus: 'Private chauffeur service',
            duration: '1 hr 45 mins',
            lat: 34.0538,
            lng: 74.3847,
            proximity: {
              transport: [{ name: 'Tangmarg Snow Chain Stand', dist: '300m' }, { name: 'Gulmarg Main Taxi Drop-off', dist: '1.8 km' }],
              landmarks: [{ name: 'Ferozepur Nallah Stream', dist: '850m' }],
              dining: [{ name: 'Tangmarg Tourist Tea Stall', dist: '150m' }],
              shopping: [{ name: 'Snow Boot & Jacket Rental Point', dist: '100m' }]
            }
          },
          {
            time: '12:00 PM',
            type: 'sightseeing',
            title: 'Gulmarg Gondola Ride (Phase 1 Kongdoori)',
            subtitle: 'World-famous high-altitude cable car into snow meadows',
            ticketStatus: 'Pre-arranged priority tickets',
            duration: '2 hrs',
            lat: 34.0489,
            lng: 74.3815,
            proximity: {
              transport: [{ name: 'Gondola Base Boarding Station', dist: '50m' }],
              landmarks: [{ name: 'Apharwat Peak Ridge', dist: '2.8 km' }, { name: 'St. Mary’s Church', dist: '1.1 km' }],
              dining: [{ name: 'High Altitude Cafe Kongdoori', dist: '80m' }],
              shopping: [{ name: 'Gulmarg Market Souvenirs', dist: '900m' }]
            }
          },
          {
            time: '03:00 PM',
            type: 'meal',
            title: 'Lunch at Highlands Park Restaurant',
            subtitle: 'Relaxed seated meal with mountain panoramic glass windows',
            ticketStatus: 'Per dining preferences',
            duration: '1 hr 15 mins',
            lat: 34.0512,
            lng: 74.3862,
            proximity: {
              transport: [{ name: 'Hotel Highlands Car Porch', dist: '30m' }],
              landmarks: [{ name: 'Historic Nedous Pine Trail', dist: '300m' }],
              dining: [{ name: 'The Cloves Pure Veg', dist: '650m' }],
              shopping: [{ name: 'Pashmina Stalls at Main Circle', dist: '700m' }]
            }
          }
        ]
      }
    ]
  },

  dubai: {
    center: [25.2048, 55.2708], // Dubai Downtown
    baseCity: 'Dubai, United Arab Emirates',
    daysTemplate: [
      {
        day: 1,
        title: 'Arrival in Dubai & Burj Khalifa Sky Observation',
        travelDistance: '15 km · ~25 mins',
        summary: 'Private airport transfer to your luxury downtown hotel, followed by an evening at the Dubai Mall Fountain Show and Burj Khalifa 124th Floor.',
        stops: [
          {
            time: '01:00 PM',
            type: 'transport',
            title: 'Dubai International Airport (DXB) VIP Chauffeur Pickup',
            subtitle: 'Private luxury AC vehicle with terminal meet-and-greet',
            ticketStatus: 'Included in package',
            duration: '35 mins',
            lat: 25.2532,
            lng: 55.3657,
            proximity: {
              transport: [{ name: 'Terminal 3 Chauffeur Bay', dist: '50m' }, { name: 'Airport Metro Station', dist: '200m' }],
              landmarks: [{ name: 'Dubai Frame', dist: '5.2 km' }, { name: 'Dubai Creek', dist: '4.8 km' }],
              dining: [{ name: 'Terminal International Lounges', dist: '100m' }],
              shopping: [{ name: 'Dubai Duty Free Arcade', dist: '80m' }]
            }
          },
          {
            time: '04:00 PM',
            type: 'hotel',
            title: 'Check-in: 5-Star Downtown / Marina Hotel',
            subtitle: 'Spacious skyline room with city views and pool access',
            ticketStatus: 'Confirmed booking',
            duration: 'Overnight',
            lat: 25.1972,
            lng: 55.2744,
            proximity: {
              transport: [{ name: 'Burj Khalifa / Dubai Mall Metro', dist: '350m' }],
              landmarks: [{ name: 'Burj Khalifa', dist: '400m' }, { name: 'Dubai Opera', dist: '500m' }],
              dining: [{ name: 'Armani Ristorante', dist: '450m' }, { name: 'Moti Mahal Indian Pure Veg', dist: '850m' }],
              shopping: [{ name: 'The Dubai Mall', dist: '250m' }]
            }
          },
          {
            time: '06:30 PM',
            type: 'sightseeing',
            title: 'Burj Khalifa At The Top & Dubai Fountain Show',
            subtitle: 'Ascend to the 124th floor observation deck for golden hour',
            ticketStatus: 'Skip-the-line VIP tickets included',
            duration: '2 hrs',
            lat: 25.1972,
            lng: 55.2744,
            proximity: {
              transport: [{ name: 'Dubai Mall Taxi Stand', dist: '150m' }],
              landmarks: [{ name: 'Dubai Fountain Lake', dist: '50m' }],
              dining: [{ name: 'Al Hallab Restaurant', dist: '120m' }],
              shopping: [{ name: 'Fashion Avenue Dubai Mall', dist: '100m' }]
            }
          }
        ]
      },
      {
        day: 2,
        title: 'Palm Jumeirah, Marina Yacht & Red Dune Desert Safari',
        travelDistance: '68 km · ~1 hr 15 mins',
        summary: 'Explore the iconic Palm Jumeirah and Dubai Marina, followed by a private 4x4 sunset desert safari with gourmet BBQ and stargazing.',
        stops: [
          {
            time: '10:00 AM',
            type: 'sightseeing',
            title: 'The View at The Palm & Atlantis The Palm',
            subtitle: 'Panoramic 360-degree views of the artificial archipelago and Arabian Gulf',
            ticketStatus: 'Entry tickets included',
            duration: '2 hrs',
            lat: 25.1124,
            lng: 55.1389,
            proximity: {
              transport: [{ name: 'Palm Monorail Nakheel Station', dist: '80m' }],
              landmarks: [{ name: 'Atlantis The Royal', dist: '1.8 km' }, { name: 'Aquaventure Waterpark', dist: '2.1 km' }],
              dining: [{ name: 'Nobu Dubai', dist: '1.9 km' }],
              shopping: [{ name: 'Nakheel Mall', dist: 'Inside building' }]
            }
          },
          {
            time: '03:30 PM',
            type: 'sightseeing',
            title: 'Red Dune Desert Safari & Sunset Camp Experience',
            subtitle: 'Dune bashing in private 4x4 Land Cruiser, camel ride & dinner under the stars',
            ticketStatus: 'VIP desert camp included',
            duration: '5 hrs',
            lat: 24.8333,
            lng: 55.6167,
            proximity: {
              transport: [{ name: 'Desert Staging Area', dist: '100m' }],
              landmarks: [{ name: 'Big Red Sand Dunes', dist: '200m' }, { name: 'Al Marmoom Desert Reserve', dist: '8 km' }],
              dining: [{ name: 'VIP Camp Buffet (Jain & Veg options reserved)', dist: 'In-camp' }],
              shopping: [{ name: 'Bedouin Craft Stalls', dist: 'In-camp' }]
            }
          }
        ]
      }
    ]
  },

  bali: {
    center: [-8.5069, 115.2625], // Ubud
    baseCity: 'Bali, Indonesia',
    daysTemplate: [
      {
        day: 1,
        title: 'Arrival in Denpasar & Private Pool Villa Check-in',
        travelDistance: '35 km · ~55 mins',
        summary: 'Warm airport welcome by your private Balinese chauffeur with flower garland, transfer to Seminyak or Ubud private pool villa.',
        stops: [
          {
            time: '02:00 PM',
            type: 'transport',
            title: 'Ngurah Rai (DPS) Airport Pickup',
            subtitle: 'Private air-conditioned car with cool water and cold towels',
            ticketStatus: 'Included in package',
            duration: '55 mins',
            lat: -8.7467,
            lng: 115.1667,
            proximity: {
              transport: [{ name: 'DPS International Arrival Hall', dist: '100m' }],
              landmarks: [{ name: 'Kuta Coastline', dist: '2.8 km' }],
              dining: [{ name: 'Queens Tandoor Indian', dist: '4.5 km' }],
              shopping: [{ name: 'Discovery Shopping Mall', dist: '2.9 km' }]
            }
          },
          {
            time: '04:30 PM',
            type: 'hotel',
            title: 'Check-in: 5-Star Private Pool Villa (Ubud/Seminyak)',
            subtitle: 'Tropical garden pool, king bedroom, and welcome drink',
            ticketStatus: 'Confirmed private villa',
            duration: 'Overnight',
            lat: -8.5069,
            lng: 115.2625,
            proximity: {
              transport: [{ name: 'Villa Valet Parking', dist: '20m' }],
              landmarks: [{ name: 'Campuhan Ridge Walk', dist: '1.4 km' }, { name: 'Ubud Palace', dist: '1.8 km' }],
              dining: [{ name: 'Ganesha Ek Sanskriti Indian', dist: '1.6 km' }],
              shopping: [{ name: 'Ubud Art Market', dist: '1.9 km' }]
            }
          }
        ]
      },
      {
        day: 2,
        title: 'Tegallalang Rice Terraces, Bali Swing & Tirta Empul',
        travelDistance: '28 km · ~45 mins',
        summary: 'Wander emerald terraced rice fields, try the iconic jungle swing, and visit the sacred water spring temple of Tirta Empul.',
        stops: [
          {
            time: '09:30 AM',
            type: 'sightseeing',
            title: 'Tegallalang Rice Terraces & Jungle Swing',
            subtitle: 'Spectacular UNESCO-listed rice fields with private photography',
            ticketStatus: 'Entry & Swing pass included',
            duration: '2 hrs 30 mins',
            lat: -8.4316,
            lng: 115.2798,
            proximity: {
              transport: [{ name: 'Terrace Car Parking', dist: '80m' }],
              landmarks: [{ name: 'Alas Harum Bali', dist: '300m' }],
              dining: [{ name: 'Tis Cafe Rice Terrace View', dist: '150m' }],
              shopping: [{ name: 'Handwoven Bamboo Handicrafts', dist: '100m' }]
            }
          },
          {
            time: '01:30 PM',
            type: 'meal',
            title: 'Lunch at Bebek Tepi Sawah (Indian & Veg Menu)',
            subtitle: 'Scenic dining overlooking lotus ponds and tranquil rice paddies',
            ticketStatus: 'Arranged',
            duration: '1 hr',
            lat: -8.5285,
            lng: 115.2812,
            proximity: {
              transport: [{ name: 'Restaurant Parking', dist: '20m' }],
              landmarks: [{ name: 'Goa Gajah Elephant Cave', dist: '1.8 km' }],
              dining: [{ name: 'Indian Delights Ubud', dist: '1.2 km' }],
              shopping: [{ name: 'Ubud Traditional Craft Lane', dist: '800m' }]
            }
          },
          {
            time: '03:30 PM',
            type: 'sightseeing',
            title: 'Sacred Monkey Forest Sanctuary Ubud',
            subtitle: 'Shaded jungle walk among ancient mossy banyan trees and playful macaques',
            ticketStatus: 'Included in package',
            duration: '1 hr 30 mins',
            lat: -8.5188,
            lng: 115.2588,
            proximity: {
              transport: [{ name: 'Monkey Forest Main Entrance', dist: '40m' }],
              landmarks: [{ name: 'Holy Spring Temple', dist: '150m' }],
              dining: [{ name: 'Habitat Cafe Ubud', dist: '90m' }],
              shopping: [{ name: 'Monkey Forest Road Boutiques', dist: '50m' }]
            }
          }
        ]
      }
    ]
  },

  switzerland: {
    center: [46.6863, 7.8632], // Interlaken
    baseCity: 'Interlaken & Zurich, Switzerland',
    daysTemplate: [
      {
        day: 1,
        title: 'Arrival in Zurich & Scenic GoldenPass Train to Lucerne',
        travelDistance: '54 km · ~45 mins',
        summary: 'Arrive at Zurich Airport, board the panoramic Swiss Rail to Lucerne, check in to a lakeside hotel, and stroll the historic Chapel Bridge.',
        stops: [
          {
            time: '11:00 AM',
            type: 'transport',
            title: 'Zurich Airport (ZRH) Swiss Rail Pass Activation',
            subtitle: 'Comfortable 1st-class Swiss panoramic rail transfer',
            ticketStatus: 'Swiss Travel Pass included',
            duration: '45 mins',
            lat: 47.4582,
            lng: 8.5555,
            proximity: {
              transport: [{ name: 'ZRH Airport Underground Station', dist: '50m' }],
              landmarks: [{ name: 'Limmat River', dist: '8.5 km' }],
              dining: [{ name: 'Airport Gourmet Food Plaza', dist: '80m' }],
              shopping: [{ name: 'Swiss Chocolate Emporium', dist: '60m' }]
            }
          },
          {
            time: '03:00 PM',
            type: 'sightseeing',
            title: 'Lucerne Chapel Bridge (Kapellbrücke) & Lake Promenade',
            subtitle: '14th-century wooden footbridge decorated with interior paintings',
            ticketStatus: 'Free leisure walk',
            duration: '1 hr 30 mins',
            lat: 47.0516,
            lng: 8.3073,
            proximity: {
              transport: [{ name: 'Luzern Main Railway Station (Bahnhof)', dist: '200m' }, { name: 'Lake Lucerne Steamer Pier', dist: '150m' }],
              landmarks: [{ name: 'Water Tower (Wasserturm)', dist: '30m' }, { name: 'Lion Monument', dist: '1.1 km' }],
              dining: [{ name: 'Kanchi Pure Vegetarian Indian Restaurant', dist: '650m' }],
              shopping: [{ name: 'Bucherer Swiss Watch Boutique', dist: '300m' }]
            }
          }
        ]
      },
      {
        day: 2,
        title: 'Mount Titlis Rotair & Glacier Ice Flyer Experience',
        travelDistance: '36 km · ~40 mins',
        summary: 'World’s first revolving cable car to 3,020m altitude with breathtaking Swiss glacier views and Cliff Walk suspension bridge.',
        stops: [
          {
            time: '09:30 AM',
            type: 'sightseeing',
            title: 'Engelberg to Mount Titlis Rotair Cable Car',
            subtitle: 'Glacier Cave walkthrough, Ice Flyer chairlift, and Europe’s highest suspension bridge',
            ticketStatus: 'Full summit pass included',
            duration: '3 hrs 30 mins',
            lat: 46.7725,
            lng: 8.4378,
            proximity: {
              transport: [{ name: 'Titlis Valley Station Engelberg', dist: '80m' }],
              landmarks: [{ name: 'Titlis Cliff Walk', dist: 'Summit' }, { name: 'Trübsee Alpine Lake', dist: 'Middle station' }],
              dining: [{ name: 'Panorama Restaurant Titlis (Indian Buffet)', dist: 'Summit' }],
              shopping: [{ name: 'Titlis Souvenir Alpine Shop', dist: 'Summit' }]
            }
          },
          {
            time: '04:00 PM',
            type: 'hotel',
            title: 'Check-in: Interlaken Scenic Alpine Hotel',
            subtitle: 'Balcony room facing the snow-crowned Jungfrau peak',
            ticketStatus: 'Confirmed hotel stay',
            duration: 'Overnight',
            lat: 46.6863,
            lng: 7.8632,
            proximity: {
              transport: [{ name: 'Interlaken Ost Railway Station', dist: '350m' }],
              landmarks: [{ name: 'Höhematte Paragliding Park', dist: '400m' }],
              dining: [{ name: 'Spice India Vegetarian', dist: '250m' }],
              shopping: [{ name: 'Swiss Army Knife Center', dist: '300m' }]
            }
          }
        ]
      }
    ]
  },

  vietnam: {
    center: [21.0285, 105.8542], // Hanoi
    baseCity: 'Hanoi & Da Nang, Vietnam',
    daysTemplate: [
      {
        day: 1,
        title: 'Arrival in Hanoi Old Quarter & Hoan Kiem Lake',
        travelDistance: '28 km · ~40 mins',
        summary: 'Warm airport welcome, electric buggy tour of the 36 ancient guild streets, and traditional water puppet theater show.',
        stops: [
          {
            time: '01:00 PM',
            type: 'transport',
            title: 'Noi Bai (HAN) Airport Private Chauffeur Pickup',
            subtitle: 'Smooth AC transfer straight to French Quarter hotel',
            ticketStatus: 'Included in package',
            duration: '40 mins',
            lat: 21.2212,
            lng: 105.8072,
            proximity: {
              transport: [{ name: 'Terminal 2 Arrivals Gate', dist: '50m' }],
              landmarks: [{ name: 'Nhat Tan Cable Bridge', dist: '12 km' }],
              dining: [{ name: 'Namaste Hanoi Indian Restaurant', dist: '8.2 km' }],
              shopping: [{ name: 'Silk & Lacquerware Shops', dist: '4.5 km' }]
            }
          },
          {
            time: '04:30 PM',
            type: 'sightseeing',
            title: 'Hanoi Old Quarter & Hoan Kiem Lake Stroll',
            subtitle: 'Pedestrian walk around the red Huc Bridge and Ngoc Son Temple',
            ticketStatus: 'Entry pass included',
            duration: '2 hrs',
            lat: 21.0305,
            lng: 105.8525,
            proximity: {
              transport: [{ name: 'Electric Buggy Station', dist: '80m' }],
              landmarks: [{ name: 'Turtle Tower (Thap Rua)', dist: '150m' }, { name: 'St. Joseph’s Cathedral', dist: '500m' }],
              dining: [{ name: 'Little India Hanoi Pure Veg', dist: '350m' }],
              shopping: [{ name: 'Dong Xuan Night Market', dist: '700m' }]
            }
          }
        ]
      },
      {
        day: 2,
        title: 'Halong Bay Overnight 5-Star Luxury Cruise',
        travelDistance: '155 km · ~2 hrs 15 mins (Expressway)',
        summary: 'Limousine van to Tuan Chau marina, board an ultra-luxury cruise through thousands of limestone karst islands.',
        stops: [
          {
            time: '11:30 AM',
            type: 'sightseeing',
            title: 'Board 5-Star Halong Bay Cruise at Tuan Chau Marina',
            subtitle: 'Welcome drinks, cruise through Sung Sot (Surprise) Cave and Ti Top Island',
            ticketStatus: 'Private ocean-view balcony cabin included',
            duration: 'Overnight Cruise',
            lat: 20.9312,
            lng: 107.0345,
            proximity: {
              transport: [{ name: 'Tuan Chau International Harbor', dist: '100m' }],
              landmarks: [{ name: 'Kissing Rocks (Hon Trong Mai)', dist: '2.5 km' }, { name: 'Luon Cave Lagoon', dist: '4.2 km' }],
              dining: [{ name: 'Cruise Fine Dining (Indian & Veg Banquet)', dist: 'Onboard' }],
              shopping: [{ name: 'Pearl Farming Floating Village', dist: 'Cruise stop' }]
            }
          }
        ]
      }
    ]
  },

  japan: {
    center: [35.6762, 139.6503], // Tokyo
    baseCity: 'Tokyo & Kyoto, Japan',
    daysTemplate: [
      {
        day: 1,
        title: 'Arrival in Tokyo: Shibuya Crossing & Shinjuku Lights',
        travelDistance: '22 km · ~35 mins',
        summary: 'Private chauffeur transfer from Haneda/Narita, visit Shibuya Sky observation deck, and enjoy evening strolls.',
        stops: [
          {
            time: '02:00 PM',
            type: 'transport',
            title: 'Tokyo International Airport Private Meet & Greet',
            subtitle: 'Private luxury van transfer to your Tokyo hotel',
            ticketStatus: 'Included in package',
            duration: '40 mins',
            lat: 35.5494,
            lng: 139.7798,
            proximity: {
              transport: [{ name: 'Haneda Airport Monorail Station', dist: '80m' }],
              landmarks: [{ name: 'Tokyo Bay Panorama', dist: '500m' }],
              dining: [{ name: 'Edo Koji Airport Dining Street', dist: '120m' }],
              shopping: [{ name: 'Tokyo Pop Culture Duty Free', dist: '100m' }]
            }
          },
          {
            time: '05:30 PM',
            type: 'sightseeing',
            title: 'Shibuya Crossing & Shibuya Sky 360 Observatory',
            subtitle: 'World’s busiest pedestrian crossing and rooftop glass observation deck',
            ticketStatus: 'Priority tickets included',
            duration: '2 hrs',
            lat: 35.6595,
            lng: 139.7005,
            proximity: {
              transport: [{ name: 'JR Shibuya Station Hachiko Exit', dist: '30m' }],
              landmarks: [{ name: 'Hachiko Bronze Dog Statue', dist: '40m' }],
              dining: [{ name: 'Milan Natraj Pure Vegetarian Indian', dist: '450m' }],
              shopping: [{ name: 'Shibuya Scramble Square & 109', dist: '50m' }]
            }
          }
        ]
      },
      {
        day: 2,
        title: 'Mount Fuji 5th Station & Lake Kawaguchiko',
        travelDistance: '110 km · ~1 hr 45 mins',
        summary: 'Scenic excursion to Mount Fuji, panoramic cable car ride, and traditional village walk in Oshino Hakkai spring ponds.',
        stops: [
          {
            time: '10:30 AM',
            type: 'sightseeing',
            title: 'Mount Fuji 5th Station (2,300m Altitude)',
            subtitle: 'Closest viewpoint to Fuji’s volcanic summit above the clouds',
            ticketStatus: 'Private car toll & permit included',
            duration: '2 hrs',
            lat: 35.3606,
            lng: 138.7274,
            proximity: {
              transport: [{ name: 'Fuji Subaru Line 5th Station Bus Loop', dist: '50m' }],
              landmarks: [{ name: 'Komitake Shinto Shrine', dist: '80m' }],
              dining: [{ name: 'Fuji View Rest House', dist: '40m' }],
              shopping: [{ name: 'Fuji Souvenir & Walking Sticks', dist: '60m' }]
            }
          },
          {
            time: '02:30 PM',
            type: 'sightseeing',
            title: 'Lake Kawaguchiko & Oishi Park Flower Fields',
            subtitle: 'Clear reflection of Mount Fuji across the serene lake with lavender gardens',
            ticketStatus: 'Free scenic walk',
            duration: '1 hr 30 mins',
            lat: 35.5218,
            lng: 138.7478,
            proximity: {
              transport: [{ name: 'Kawaguchiko Sightseeing Boat Pier', dist: '600m' }],
              landmarks: [{ name: 'Fuji View Bridge', dist: '400m' }],
              dining: [{ name: 'Indian Restaurant Alladin Fuji', dist: '850m' }],
              shopping: [{ name: 'Kawaguchiko Craft Park', dist: '300m' }]
            }
          }
        ]
      }
    ]
  },

  kerala: {
    center: [10.0889, 77.0595], // Munnar
    baseCity: 'Munnar & Alleppey, Kerala',
    daysTemplate: [
      {
        day: 1,
        title: 'Arrival in Cochin & Drive to Misty Munnar Tea Hills',
        travelDistance: '125 km · ~3 hrs 30 mins',
        summary: 'Scenic mountain climb along Cheeyappara and Valara waterfalls, arriving at your tea plantation resort.',
        stops: [
          {
            time: '10:00 AM',
            type: 'transport',
            title: 'Cochin International Airport (COK) Pickup',
            subtitle: 'Private AC Innova Crysta with experienced hill driver',
            ticketStatus: 'Included in package',
            duration: '3 hrs 30 mins',
            lat: 10.1518,
            lng: 76.3930,
            proximity: {
              transport: [{ name: 'COK Domestic/Intl Terminal', dist: '50m' }],
              landmarks: [{ name: 'Kalady Adi Shankara Janmabhoomi', dist: '9.2 km' }],
              dining: [{ name: 'Airport Pure Veg Restaurant', dist: '120m' }],
              shopping: [{ name: 'Kerala Spices Emporium', dist: '150m' }]
            }
          },
          {
            time: '01:30 PM',
            type: 'sightseeing',
            title: 'Cheeyappara & Valara Cascading Waterfalls',
            subtitle: '7-tiered waterfall by the roadside surrounded by dense tropical forest',
            ticketStatus: 'Free view stop',
            duration: '30 mins',
            lat: 10.0385,
            lng: 76.8925,
            proximity: {
              transport: [{ name: 'Highway Rest Bay', dist: '20m' }],
              landmarks: [{ name: 'Neriamangalam River Bridge', dist: '14 km' }],
              dining: [{ name: 'Fresh Coconut & Tea Stall', dist: '10m' }],
              shopping: [{ name: 'Homemade Kerala Chocolate Kiosk', dist: '25m' }]
            }
          },
          {
            time: '04:30 PM',
            type: 'hotel',
            title: 'Check-in: 5-Star Plantation Chalet / Pool Villa',
            subtitle: 'Private cottage overlooking rolling tea carpet hills',
            ticketStatus: 'Confirmed stay',
            duration: 'Overnight',
            lat: 10.0889,
            lng: 77.0595,
            proximity: {
              transport: [{ name: 'Resort Chauffeur Drop-off', dist: '10m' }],
              landmarks: [{ name: 'Pothamedu View Point', dist: '1.2 km' }],
              dining: [{ name: 'In-House Multi-Cuisine & Pure Veg Kitchen', dist: 'In-house' }],
              shopping: [{ name: 'Tata Tea Museum Shop', dist: '2.4 km' }]
            }
          }
        ]
      },
      {
        day: 2,
        title: 'Alleppey Backwaters Private Luxury Houseboat Cruise',
        travelDistance: '160 km · ~4 hrs',
        summary: 'Glide along coconut-fringed canals and emerald paddy fields with your dedicated chef preparing fresh traditional meals.',
        stops: [
          {
            time: '12:00 PM',
            type: 'sightseeing',
            title: 'Check-in: Traditional Kettuvallam Luxury Houseboat',
            subtitle: 'Private 1-bedroom / 2-bedroom AC houseboat with private captain and chef',
            ticketStatus: 'Private houseboat cruise included',
            duration: 'Overnight Cruise',
            lat: 9.4981,
            lng: 76.3388,
            proximity: {
              transport: [{ name: 'Finishing Point Houseboat Jetty', dist: '50m' }],
              landmarks: [{ name: 'Vembanad Lake Expanse', dist: 'Cruise route' }, { name: 'Pathiramanal Bird Island', dist: 'Cruise route' }],
              dining: [{ name: 'Onboard Fresh Kerala Sadhya & Delicacies', dist: 'Onboard' }],
              shopping: [{ name: 'Alleppey Coir Craft Market', dist: '1.5 km' }]
            }
          }
        ]
      }
    ]
  },

  rajasthan: {
    center: [26.9124, 75.7873], // Jaipur
    baseCity: 'Jaipur & Udaipur, Rajasthan',
    daysTemplate: [
      {
        day: 1,
        title: 'Arrival in Pink City: Hawa Mahal & City Palace',
        travelDistance: '16 km · ~30 mins',
        summary: 'Royal welcome at Jaipur Airport, check-in to a royal heritage haveli, and explore the ornate pink sandstone palaces.',
        stops: [
          {
            time: '11:00 AM',
            type: 'transport',
            title: 'Jaipur International Airport (JAI) Pickup',
            subtitle: 'Private AC car with courteous royal chauffeur',
            ticketStatus: 'Included in package',
            duration: '30 mins',
            lat: 26.8289,
            lng: 75.8056,
            proximity: {
              transport: [{ name: 'JAI Terminal 2 Porch', dist: '30m' }],
              landmarks: [{ name: 'Jawahar Circle Garden', dist: '800m' }],
              dining: [{ name: 'Chokhi Dhani Ethnic Resort', dist: '6.5 km' }],
              shopping: [{ name: 'World Trade Park Mall', dist: '1.8 km' }]
            }
          },
          {
            time: '03:30 PM',
            type: 'sightseeing',
            title: 'Hawa Mahal (Palace of Winds) & Jantar Mantar',
            subtitle: '953 carved honeycomb windows built for royal ladies to view city processions',
            ticketStatus: 'Fast-track monument pass',
            duration: '2 hrs',
            lat: 26.9239,
            lng: 75.8267,
            proximity: {
              transport: [{ name: 'Badi Chaupar Metro Station', dist: '100m' }],
              landmarks: [{ name: 'City Palace Entrance', dist: '300m' }, { name: 'Albert Hall Museum', dist: '2.1 km' }],
              dining: [{ name: 'LMB Laxmi Misthan Bhandar Pure Veg', dist: '400m' }],
              shopping: [{ name: 'Johari Bazaar Gems & Jewelry', dist: '150m' }, { name: 'Bapu Bazaar Textiles', dist: '500m' }]
            }
          }
        ]
      },
      {
        day: 2,
        title: 'Amber Fort Elephant/Jeep Ascent & Sheesh Mahal',
        travelDistance: '24 km · ~45 mins',
        summary: 'Majestic hilltop fort with mirror mosaic palaces (Sheesh Mahal) and panoramic rampart views over Maota Lake.',
        stops: [
          {
            time: '09:30 AM',
            type: 'sightseeing',
            title: 'Amber Fort & Palace (Amer Fort)',
            subtitle: 'Royal Rajput architecture with ornate courtyards and mirror hall',
            ticketStatus: 'Included in package',
            duration: '2 hrs 30 mins',
            lat: 26.9855,
            lng: 75.8513,
            proximity: {
              transport: [{ name: 'Amer Fort Jeep Stand', dist: '50m' }],
              landmarks: [{ name: 'Maota Lake', dist: '100m' }, { name: 'Jaigarh Fort Cannon', dist: '1.4 km' }],
              dining: [{ name: '1135 AD Royal Heritage Dining', dist: 'Inside fort' }],
              shopping: [{ name: 'Anokhi Museum of Hand Printing', dist: '700m' }]
            }
          },
          {
            time: '02:00 PM',
            type: 'sightseeing',
            title: 'Jal Mahal (Water Palace) Photo Stop',
            subtitle: 'Romantic palace floating in the center of Man Sagar Lake',
            ticketStatus: 'Promenade walk',
            duration: '45 mins',
            lat: 26.9535,
            lng: 75.8462,
            proximity: {
              transport: [{ name: 'Amer Road Parking', dist: '30m' }],
              landmarks: [{ name: 'Kanak Vrindavan Gardens', dist: '1.2 km' }],
              dining: [{ name: 'Khandani Rajdhani Thali', dist: '2.5 km' }],
              shopping: [{ name: 'Blue Pottery & Block Print Workshops', dist: '400m' }]
            }
          }
        ]
      }
    ]
  },

  singapore: {
    center: [1.3521, 103.8198], // Singapore
    baseCity: 'Singapore City',
    daysTemplate: [
      {
        day: 1,
        title: 'Arrival in Singapore: Jewel Changi & Marina Bay Sands',
        travelDistance: '21 km · ~25 mins',
        summary: 'Witness the world’s tallest indoor waterfall at Jewel Changi, followed by Marina Bay Sands SkyPark and Spectra Light Show.',
        stops: [
          {
            time: '01:00 PM',
            type: 'transport',
            title: 'Singapore Changi Airport (SIN) & Jewel Rain Vortex',
            subtitle: 'Private executive MPV transfer to hotel',
            ticketStatus: 'Included in package',
            duration: '45 mins',
            lat: 1.3602,
            lng: 103.9897,
            proximity: {
              transport: [{ name: 'Changi Airport MRT', dist: '80m' }],
              landmarks: [{ name: 'HSBC Rain Vortex', dist: '30m' }, { name: 'Canopy Park', dist: 'Top floor' }],
              dining: [{ name: 'Ananda Bhavan Vegetarian (Jewel)', dist: 'Inside mall' }],
              shopping: [{ name: 'Jewel Changi Retail Arcade', dist: 'Inside building' }]
            }
          },
          {
            time: '05:30 PM',
            type: 'sightseeing',
            title: 'Gardens by the Bay Supertree Grove & Cloud Forest',
            subtitle: 'Futuristic vertical botanical gardens with misty indoor waterfall',
            ticketStatus: 'Flower Dome & Cloud Forest tickets included',
            duration: '2 hrs 30 mins',
            lat: 1.2816,
            lng: 103.8636,
            proximity: {
              transport: [{ name: 'Bayfront MRT Station', dist: '150m' }],
              landmarks: [{ name: 'Marina Bay Sands Hotel', dist: '300m' }, { name: 'Singapore Flyer', dist: '800m' }],
              dining: [{ name: 'Satay by the Bay / Indian Corner', dist: '400m' }],
              shopping: [{ name: 'The Shoppes at Marina Bay Sands', dist: '350m' }]
            }
          }
        ]
      }
    ]
  },
  thailand: {
    center: [7.8804, 98.3923], // Phuket
    baseCity: 'Phuket & Krabi, Thailand',
    daysTemplate: [
      {
        day: 1,
        title: 'Arrival in Phuket & Patong Beach Sunset',
        travelDistance: '35 km · ~45 mins',
        summary: 'Welcome at Phuket International Airport with private transfer. Check into beachfront resort and explore the vibrant Patong Beach at sunset.',
        stops: [
          {
            time: '12:00 PM',
            type: 'transport',
            title: 'Phuket Airport (HKT) Meet & Chauffeur Transfer',
            subtitle: 'Private air-conditioned minivan with luggage assistance',
            ticketStatus: 'Included in package',
            duration: '50 mins',
            lat: 8.1132,
            lng: 98.3169,
            proximity: {
              transport: [{ name: 'Phuket Airport Terminal', dist: '100m' }],
              landmarks: [{ name: 'Sirinat National Park', dist: '2 km' }],
              dining: [{ name: 'Airport Food Court', dist: '150m' }],
              shopping: [{ name: 'King Power Duty Free', dist: '200m' }]
            }
          },
          {
            time: '04:00 PM',
            type: 'sightseeing',
            title: 'Patong Beach Golden Hour Walk & Photo Stop',
            subtitle: 'Gentle stroll along Andaman sea with turquoise waters and coconut palms',
            ticketStatus: 'Free access',
            duration: '2 hrs',
            lat: 7.8967,
            lng: 98.2962,
            proximity: {
              transport: [{ name: 'Patong Tuk-Tuk Stand', dist: '100m' }],
              landmarks: [{ name: 'Bangla Road Night Market', dist: '200m' }],
              dining: [{ name: 'Thai Vegetarian Kitchen', dist: '300m' }],
              shopping: [{ name: 'Jungceylon Mall', dist: '400m' }]
            }
          },
          {
            time: '07:30 PM',
            type: 'hotel',
            title: 'Check-in: 4★/5★ Beachfront Resort',
            subtitle: 'Sea-facing room with pool access and Thai hospitality',
            ticketStatus: 'Confirmed booking',
            duration: 'Overnight',
            lat: 7.8804,
            lng: 98.3923,
            proximity: {
              transport: [{ name: 'Resort Lobby Concierge', dist: '10m' }],
              landmarks: [{ name: 'Kata Viewpoint', dist: '3 km' }],
              dining: [{ name: 'In-House Thai & Indian Dining', dist: 'In-house' }],
              shopping: [{ name: 'Beach Bazaar', dist: '200m' }]
            }
          }
        ]
      },
      {
        day: 2,
        title: 'Phi Phi Islands & Maya Bay Speedboat Excursion',
        travelDistance: '48 km · ~1 hr by speedboat',
        summary: 'Full-day island-hopping adventure to the world-famous Phi Phi Islands with snorkeling, Maya Bay, and Monkey Beach.',
        stops: [
          {
            time: '08:00 AM',
            type: 'transport',
            title: 'Speedboat Transfer to Phi Phi Islands',
            subtitle: 'Private speedboat from Rassada Pier with life jackets and guide',
            ticketStatus: 'Included in package',
            duration: '1 hr',
            lat: 7.7407,
            lng: 98.6762,
            proximity: {
              transport: [{ name: 'Rassada Pier', dist: '50m' }],
              landmarks: [{ name: 'Phi Phi Don', dist: '45 km' }],
              dining: [{ name: 'Pier-side Breakfast', dist: '100m' }],
              shopping: [{ name: 'Marine Gift Shop', dist: '80m' }]
            }
          },
          {
            time: '10:30 AM',
            type: 'sightseeing',
            title: 'Maya Bay & Pileh Lagoon Swimming',
            subtitle: 'Crystal-clear emerald waters surrounded by towering limestone cliffs',
            ticketStatus: 'National park fee included',
            duration: '3 hrs',
            lat: 7.6788,
            lng: 98.7649,
            proximity: {
              transport: [{ name: 'Maya Bay Dock', dist: '20m' }],
              landmarks: [{ name: 'Viking Cave', dist: '800m' }, { name: 'Loh Samah Bay', dist: '500m' }],
              dining: [{ name: 'Onboard Lunch Box', dist: 'On boat' }],
              shopping: [{ name: 'Island Souvenir Stall', dist: '150m' }]
            }
          },
          {
            time: '03:00 PM',
            type: 'meal',
            title: 'Lunch at Phi Phi Don Seafood & Vegetarian Restaurant',
            subtitle: 'Fresh Thai cuisine with stunning harbor views',
            ticketStatus: 'Arranged',
            duration: '1 hr 15 mins',
            lat: 7.7380,
            lng: 98.7750,
            proximity: {
              transport: [{ name: 'Ton Sai Pier', dist: '100m' }],
              landmarks: [{ name: 'Phi Phi Viewpoint', dist: '1.5 km' }],
              dining: [{ name: 'Local Thai Restaurant Row', dist: '50m' }],
              shopping: [{ name: 'Ton Sai Market', dist: '120m' }]
            }
          }
        ]
      }
    ]
  },
  himachal: {
    center: [32.2396, 77.1887], // Manali
    baseCity: 'Manali & Shimla, Himachal Pradesh',
    daysTemplate: [
      {
        day: 1,
        title: 'Arrival in Manali & Old Manali Heritage Walk',
        travelDistance: '12 km · ~30 mins',
        summary: 'Private car pickup from Bhuntar Airport or Chandigarh-Manali highway. Explore old town charm with riverside cafes and Hadimba Temple.',
        stops: [
          {
            time: '11:00 AM',
            type: 'transport',
            title: 'Bhuntar Airport / Highway Welcome Point',
            subtitle: 'Private Innova Crysta with courteous driver',
            ticketStatus: 'Included in package',
            duration: '1 hr 30 mins',
            lat: 31.8777,
            lng: 77.1542,
            proximity: {
              transport: [{ name: 'Bhuntar Airport (KUU)', dist: '100m' }],
              landmarks: [{ name: 'Kullu Valley Viewpoint', dist: '5 km' }],
              dining: [{ name: 'Highway Dhaba', dist: '2 km' }],
              shopping: [{ name: 'Kullu Shawl Market', dist: '4 km' }]
            }
          },
          {
            time: '03:00 PM',
            type: 'sightseeing',
            title: 'Hadimba Devi Temple & Van Vihar Park',
            subtitle: 'Ancient wooden temple surrounded by towering deodar cedars',
            ticketStatus: 'Free entry',
            duration: '2 hrs',
            lat: 32.2434,
            lng: 77.1893,
            proximity: {
              transport: [{ name: 'Temple Parking', dist: '50m' }],
              landmarks: [{ name: 'Club House', dist: '800m' }],
              dining: [{ name: 'Old Manali Cafe Row', dist: '1 km' }],
              shopping: [{ name: 'Tibetan Market', dist: '600m' }]
            }
          },
          {
            time: '07:00 PM',
            type: 'hotel',
            title: 'Check-in: Mountain View Boutique Resort',
            subtitle: 'Pine-view room with bonfire and warm Himachali hospitality',
            ticketStatus: 'Confirmed booking',
            duration: 'Overnight',
            lat: 32.2396,
            lng: 77.1887,
            proximity: {
              transport: [{ name: 'Resort Porch', dist: '10m' }],
              landmarks: [{ name: 'Beas River', dist: '300m' }],
              dining: [{ name: 'In-House Multi-Cuisine', dist: 'In-house' }],
              shopping: [{ name: 'Mall Road Shops', dist: '1.5 km' }]
            }
          }
        ]
      }
    ]
  },
  kedarnath: {
    center: [30.7346, 79.0669], // Kedarnath
    baseCity: 'Kedarnath & Rishikesh, Uttarakhand',
    daysTemplate: [
      {
        day: 1,
        title: 'Arrival in Rishikesh & Ganga Aarti at Triveni Ghat',
        travelDistance: '25 km · ~40 mins',
        summary: 'Private car pickup from Dehradun airport. Transfer to Rishikesh for an enchanting evening Ganga Aarti ceremony.',
        stops: [
          {
            time: '12:00 PM',
            type: 'transport',
            title: 'Jolly Grant Airport (DED) Private Transfer',
            subtitle: 'AC car with experienced hill driver to Rishikesh',
            ticketStatus: 'Included in package',
            duration: '50 mins',
            lat: 30.1844,
            lng: 78.1808,
            proximity: {
              transport: [{ name: 'Jolly Grant Airport', dist: '100m' }],
              landmarks: [{ name: 'Forest Research Institute', dist: '15 km' }],
              dining: [{ name: 'Airport Cafe', dist: '150m' }],
              shopping: [{ name: 'Dehradun Market', dist: '18 km' }]
            }
          },
          {
            time: '06:00 PM',
            type: 'sightseeing',
            title: 'Triveni Ghat Ganga Aarti & Ram Jhula Walk',
            subtitle: 'Spiritual evening ceremony with sacred chants on the banks of Ganges',
            ticketStatus: 'Free entry',
            duration: '2 hrs',
            lat: 30.1047,
            lng: 78.2940,
            proximity: {
              transport: [{ name: 'Triveni Ghat Parking', dist: '100m' }],
              landmarks: [{ name: 'Laxman Jhula Bridge', dist: '3 km' }, { name: 'Ram Jhula', dist: '1.5 km' }],
              dining: [{ name: 'Chotiwala Restaurant (Pure Veg)', dist: '200m' }],
              shopping: [{ name: 'Rishikesh Yoga Market', dist: '300m' }]
            }
          },
          {
            time: '08:30 PM',
            type: 'hotel',
            title: 'Check-in: Riverside Ashram Resort',
            subtitle: 'Serene Ganga-view accommodation with sattvic vegetarian meals',
            ticketStatus: 'Confirmed booking',
            duration: 'Overnight',
            lat: 30.1200,
            lng: 78.3100,
            proximity: {
              transport: [{ name: 'Hotel Drop-off', dist: '10m' }],
              landmarks: [{ name: 'River Ganges', dist: '50m' }],
              dining: [{ name: 'Ashram Pure Veg Dining', dist: 'In-house' }],
              shopping: [{ name: 'Spiritual Books & Crafts', dist: '200m' }]
            }
          }
        ]
      }
    ]
  },
  maldives: {
    center: [4.1755, 73.5093], // Malé
    baseCity: 'Malé & Resort Islands, Maldives',
    daysTemplate: [
      {
        day: 1,
        title: 'Arrival in Malé & Speedboat to Private Island Resort',
        travelDistance: '25 km · ~40 mins by speedboat',
        summary: 'VIP airport greeting, speedboat ride over turquoise waters to your overwater villa resort.',
        stops: [
          {
            time: '02:00 PM',
            type: 'transport',
            title: 'Velana International Airport (MLE) VIP Transfer',
            subtitle: 'Private speedboat transfer to resort island',
            ticketStatus: 'Included in package',
            duration: '40 mins',
            lat: 4.1918,
            lng: 73.5293,
            proximity: {
              transport: [{ name: 'Velana Airport Terminal', dist: '100m' }],
              landmarks: [{ name: 'Hulhumalé Beach', dist: '2 km' }],
              dining: [{ name: 'Airport Lounge', dist: '150m' }],
              shopping: [{ name: 'Duty Free', dist: '200m' }]
            }
          },
          {
            time: '04:00 PM',
            type: 'sightseeing',
            title: 'Overwater Villa Check-in & Lagoon Snorkeling',
            subtitle: 'Crystal-clear waters with vibrant coral reefs right below your villa',
            ticketStatus: 'Snorkeling gear included',
            duration: '2 hrs',
            lat: 4.2500,
            lng: 73.4500,
            proximity: {
              transport: [{ name: 'Resort Jetty', dist: '50m' }],
              landmarks: [{ name: 'House Reef', dist: '10m' }, { name: 'Sandbank', dist: '500m' }],
              dining: [{ name: 'Overwater Restaurant', dist: '200m' }],
              shopping: [{ name: 'Resort Boutique', dist: '100m' }]
            }
          },
          {
            time: '07:00 PM',
            type: 'hotel',
            title: 'Sunset Dinner at Overwater Restaurant',
            subtitle: 'Romantic dining with ocean views and fresh Maldivian cuisine',
            ticketStatus: 'Half-board included',
            duration: 'Overnight',
            lat: 4.1755,
            lng: 73.5093,
            proximity: {
              transport: [{ name: 'Villa Buggy Service', dist: '10m' }],
              landmarks: [{ name: 'Infinity Pool', dist: '100m' }],
              dining: [{ name: 'All-Day Dining & Beach Bar', dist: 'In-house' }],
              shopping: [{ name: 'Island Gift Shop', dist: '150m' }]
            }
          }
        ]
      }
    ]
  },
  andaman: {
    center: [11.6234, 92.7265], // Port Blair
    baseCity: 'Port Blair & Havelock, Andaman Islands',
    daysTemplate: [
      {
        day: 1,
        title: 'Arrival in Port Blair & Cellular Jail Light Show',
        travelDistance: '12 km · ~25 mins',
        summary: 'Welcome at Veer Savarkar Airport and visit to the historic Cellular Jail with its powerful light and sound show.',
        stops: [
          {
            time: '12:00 PM',
            type: 'transport',
            title: 'Veer Savarkar Airport (IXZ) Private Transfer',
            subtitle: 'AC car pickup with island welcome',
            ticketStatus: 'Included in package',
            duration: '25 mins',
            lat: 11.6410,
            lng: 92.7297,
            proximity: {
              transport: [{ name: 'Port Blair Airport', dist: '100m' }],
              landmarks: [{ name: 'Corbyn\'s Cove Beach', dist: '6 km' }],
              dining: [{ name: 'Airport Cafe', dist: '150m' }],
              shopping: [{ name: 'Aberdeen Bazaar', dist: '4 km' }]
            }
          },
          {
            time: '05:30 PM',
            type: 'sightseeing',
            title: 'Cellular Jail National Memorial & Light Show',
            subtitle: 'Historic colonial-era prison with moving sound and light show at dusk',
            ticketStatus: 'Entry ticket included',
            duration: '2 hrs 30 mins',
            lat: 11.6944,
            lng: 92.7622,
            proximity: {
              transport: [{ name: 'Cellular Jail Parking', dist: '50m' }],
              landmarks: [{ name: 'Netaji Subhash Park', dist: '300m' }],
              dining: [{ name: 'New Lighthouse Restaurant', dist: '500m' }],
              shopping: [{ name: 'Aberdeen Market', dist: '1 km' }]
            }
          }
        ]
      }
    ]
  },
  goa: {
    center: [15.2993, 74.1240], // Goa
    baseCity: 'North & South Goa',
    daysTemplate: [
      {
        day: 1,
        title: 'Arrival in Goa & Baga Beach Sunset',
        travelDistance: '42 km · ~55 mins',
        summary: 'Private airport pickup, check-in to beachside resort, and evening at the vibrant Baga Beach with golden Goan sunset.',
        stops: [
          {
            time: '12:00 PM',
            type: 'transport',
            title: 'Dabolim / Manohar Airport Private Transfer',
            subtitle: 'AC car with Goan welcome and cold coconut water',
            ticketStatus: 'Included in package',
            duration: '55 mins',
            lat: 15.3808,
            lng: 73.8314,
            proximity: {
              transport: [{ name: 'Goa Airport (GOI)', dist: '100m' }],
              landmarks: [{ name: 'Vasco da Gama Waterfront', dist: '5 km' }],
              dining: [{ name: 'Airport Restaurant', dist: '150m' }],
              shopping: [{ name: 'Airport Duty Free', dist: '100m' }]
            }
          },
          {
            time: '04:30 PM',
            type: 'sightseeing',
            title: 'Baga Beach Sunset & Tito\'s Lane Walk',
            subtitle: 'Pristine golden sand beach with water sports and beachside cafes',
            ticketStatus: 'Free access',
            duration: '2 hrs',
            lat: 15.5549,
            lng: 73.7514,
            proximity: {
              transport: [{ name: 'Beach Parking', dist: '100m' }],
              landmarks: [{ name: 'Calangute Beach', dist: '2 km' }, { name: 'Fort Aguada', dist: '5 km' }],
              dining: [{ name: 'Britto\'s Beachside Restaurant', dist: '50m' }],
              shopping: [{ name: 'Saturday Night Market', dist: '3 km' }]
            }
          },
          {
            time: '08:00 PM',
            type: 'hotel',
            title: 'Check-in: Beach Resort / Heritage Boutique Stay',
            subtitle: 'Pool-facing room with Goan susegad ambiance',
            ticketStatus: 'Confirmed booking',
            duration: 'Overnight',
            lat: 15.2993,
            lng: 74.1240,
            proximity: {
              transport: [{ name: 'Resort Valet', dist: '10m' }],
              landmarks: [{ name: 'Dona Paula Viewpoint', dist: '8 km' }],
              dining: [{ name: 'In-House Multi-Cuisine', dist: 'In-house' }],
              shopping: [{ name: 'Panjim Market', dist: '6 km' }]
            }
          }
        ]
      }
    ]
  },
  europe: {
    center: [48.8566, 2.3522], // Paris
    baseCity: 'Paris, Switzerland & Italy',
    daysTemplate: [
      {
        day: 1,
        title: 'Arrival in Paris & Eiffel Tower Sunset',
        travelDistance: '28 km · ~45 mins',
        summary: 'Welcome at Charles de Gaulle Airport. Private transfer and evening visit to the iconic Eiffel Tower with panoramic city views.',
        stops: [
          {
            time: '11:00 AM',
            type: 'transport',
            title: 'Paris CDG Airport Private Luxury Transfer',
            subtitle: 'Mercedes executive sedan with English-speaking chauffeur',
            ticketStatus: 'Included in package',
            duration: '50 mins',
            lat: 49.0097,
            lng: 2.5479,
            proximity: {
              transport: [{ name: 'Charles de Gaulle Terminal 2E', dist: '100m' }],
              landmarks: [{ name: 'Sacré-Cœur Basilica', dist: '25 km' }],
              dining: [{ name: 'Airport Premium Lounge', dist: '200m' }],
              shopping: [{ name: 'CDG Duty Free', dist: '150m' }]
            }
          },
          {
            time: '05:00 PM',
            type: 'sightseeing',
            title: 'Eiffel Tower Summit & Trocadéro Gardens',
            subtitle: 'Skip-the-line access to the 2nd floor with Champagne bar and panoramic views',
            ticketStatus: 'Priority tickets included',
            duration: '2 hrs 30 mins',
            lat: 48.8584,
            lng: 2.2945,
            proximity: {
              transport: [{ name: 'Bir-Hakeim Metro', dist: '300m' }],
              landmarks: [{ name: 'Champ de Mars', dist: '50m' }, { name: 'Seine River', dist: '200m' }],
              dining: [{ name: 'Le Jules Verne Restaurant', dist: 'Inside tower' }],
              shopping: [{ name: 'Trocadéro Gift Shops', dist: '400m' }]
            }
          },
          {
            time: '08:00 PM',
            type: 'hotel',
            title: 'Check-in: 4★ Boutique Hotel near Champs-Élysées',
            subtitle: 'Classic Parisian elegance with city skyline views',
            ticketStatus: 'Confirmed booking',
            duration: 'Overnight',
            lat: 48.8738,
            lng: 2.2950,
            proximity: {
              transport: [{ name: 'George V Metro', dist: '200m' }],
              landmarks: [{ name: 'Arc de Triomphe', dist: '500m' }],
              dining: [{ name: 'Indian Vegetarian Restaurants Nearby', dist: '300m' }],
              shopping: [{ name: 'Champs-Élysées Boutiques', dist: '100m' }]
            }
          }
        ]
      }
    ]
  }
};


// Comprehensive worldwide coordinate dictionary for intelligent map placement
const KNOWN_CITY_COORDINATES = {
  // Thailand & Southeast Asia
  'thailand': [7.8804, 98.3923],
  'phuket': [7.8804, 98.3923],
  'krabi': [8.0863, 98.9063],
  'bangkok': [13.7563, 100.5018],
  'pattaya': [12.9276, 100.8771],
  'chiang mai': [18.7883, 98.9853],
  'koh samui': [9.5120, 100.0136],
  'singapore': [1.3521, 103.8198],
  'malaysia': [3.1390, 101.6869],
  'kuala lumpur': [3.1390, 101.6869],
  'vietnam': [21.0285, 105.8542],
  'hanoi': [21.0285, 105.8542],
  'da nang': [16.0544, 108.2022],
  'bali': [-8.4095, 115.1889],
  'indonesia': [-8.4095, 115.1889],
  'sri lanka': [6.9271, 79.8612],
  'colombo': [6.9271, 79.8612],
  'maldives': [3.2028, 73.2207],

  // Middle East
  'dubai': [25.2048, 55.2708],
  'uae': [25.2048, 55.2708],
  'abu dhabi': [24.4539, 54.3773],
  'egypt': [30.0444, 31.2357],
  'cairo': [30.0444, 31.2357],
  'turkey': [41.0082, 28.9784],
  'istanbul': [41.0082, 28.9784],

  // Europe
  'switzerland': [46.8182, 8.2275],
  'zurich': [47.3769, 8.5417],
  'lucerne': [47.0502, 8.3093],
  'interlaken': [46.6863, 7.8632],
  'paris': [48.8566, 2.3522],
  'france': [48.8566, 2.3522],
  'rome': [41.9028, 12.4964],
  'italy': [41.9028, 12.4964],
  'london': [51.5074, -0.1278],
  'uk': [51.5074, -0.1278],
  'greece': [37.9838, 23.7275],
  'santorini': [36.3932, 25.4615],

  // East Asia
  'japan': [35.6762, 139.6503],
  'tokyo': [35.6762, 139.6503],
  'kyoto': [35.0116, 135.7681],
  'osaka': [34.6937, 135.5023],

  // India
  'kashmir': [34.0837, 74.7973],
  'srinagar': [34.0837, 74.7973],
  'gulmarg': [34.0484, 74.3805],
  'pahalgam': [34.0163, 75.3150],
  'himachal': [32.2396, 77.1887],
  'manali': [32.2396, 77.1887],
  'shimla': [31.1048, 77.1734],
  'dharamshala': [32.2190, 76.3234],
  'kerala': [9.9312, 76.2673],
  'munnar': [10.0889, 77.0595],
  'alleppey': [9.4981, 76.3388],
  'rajasthan': [26.9124, 75.7873],
  'jaipur': [26.9124, 75.7873],
  'udaipur': [24.5854, 73.7125],
  'kedarnath': [30.7352, 79.0669],
  'uttarakhand': [30.0869, 78.2676],
  'rishikesh': [30.0869, 78.2676],
  'goa': [15.2993, 74.1240],
  'andaman': [11.6234, 92.7265],
  'ladakh': [34.1526, 77.5771],
  'leh': [34.1526, 77.5771],
  'varanasi': [25.3176, 82.9739],
  'amritsar': [31.6340, 74.8723],
  'agra': [27.1767, 78.0081],
  'delhi': [28.6139, 77.2090],
  'mumbai': [19.0760, 72.8777],
  'sikkim': [27.3389, 88.6065],
  'meghalaya': [25.5788, 91.8933],
  'ooty': [11.4102, 76.6950],
  'nepal': [27.7172, 85.3240],
  'kathmandu': [27.7172, 85.3240],
  'mauritius': [-20.3484, 57.5522]
};

/**
 * Universal Destination Resolver:
 * Maps any prompt or tour to a guaranteed rich destination with coordinates.
 * Accurately handles Thailand, Bangkok, Pattaya, Dubai, Bali, and any searched term.
 */
export function resolveDestinationWaypoints(destinationName, destKey) {
  const combined = `${destKey || ''} ${destinationName || ''}`.toLowerCase();
  
  // 1. Exact primary package match
  const normalizedKey = (destKey || '').toLowerCase().trim();
  if (normalizedKey && DESTINATION_WAYPOINTS[normalizedKey]) {
    return DESTINATION_WAYPOINTS[normalizedKey];
  }

  // 2. Direct keyword alias mapping to rich multi-day templates
  if (/thailand|phuket|krabi|bangkok|pattaya|chiang mai|phi phi|samui/i.test(combined)) {
    return DESTINATION_WAYPOINTS.thailand;
  }
  if (/dubai|uae|abu dhabi|sharjah|burj khalifa/i.test(combined)) {
    return DESTINATION_WAYPOINTS.dubai;
  }
  if (/bali|indonesia|ubud|seminyak|kuta|nusa/i.test(combined)) {
    return DESTINATION_WAYPOINTS.bali;
  }
  if (/kashmir|srinagar|gulmarg|pahalgam|sonmarg|dal lake/i.test(combined)) {
    return DESTINATION_WAYPOINTS.kashmir;
  }
  if (/swiss|switzerland|zurich|lucerne|interlaken|zermatt|alps/i.test(combined)) {
    return DESTINATION_WAYPOINTS.switzerland;
  }
  if (/vietnam|hanoi|da nang|halong|saigon|hoi an/i.test(combined)) {
    return DESTINATION_WAYPOINTS.vietnam;
  }
  if (/japan|tokyo|kyoto|osaka|fuji/i.test(combined)) {
    return DESTINATION_WAYPOINTS.japan;
  }
  if (/singapore|sentosa|marina bay/i.test(combined)) {
    return DESTINATION_WAYPOINTS.singapore;
  }
  if (/kerala|munnar|alleppey|kochi|thekkady/i.test(combined)) {
    return DESTINATION_WAYPOINTS.kerala;
  }
  if (/rajasthan|jaipur|udaipur|jodhpur|jaisalmer/i.test(combined)) {
    return DESTINATION_WAYPOINTS.rajasthan;
  }
  if (/himachal|manali|shimla|dharamshala|dalhousie/i.test(combined)) {
    return DESTINATION_WAYPOINTS.himachal;
  }
  if (/kedarnath|badrinath|char dham|rishikesh|haridwar|uttarakhand/i.test(combined)) {
    return DESTINATION_WAYPOINTS.kedarnath;
  }
  if (/maldives|male/i.test(combined)) {
    return DESTINATION_WAYPOINTS.maldives;
  }
  if (/andaman|havelock|port blair/i.test(combined)) {
    return DESTINATION_WAYPOINTS.andaman;
  }
  if (/goa/i.test(combined)) {
    return DESTINATION_WAYPOINTS.goa;
  }
  if (/europe|paris|france|rome|italy|london|amsterdam|florence|venice/i.test(combined)) {
    return DESTINATION_WAYPOINTS.europe;
  }

  // 3. Check for city in KNOWN_CITY_COORDINATES
  let resolvedCenter = null;
  for (const [cityName, coords] of Object.entries(KNOWN_CITY_COORDINATES)) {
    if (combined.includes(cityName)) {
      resolvedCenter = coords;
      break;
    }
  }

  // Default coordinate if no city matched (Neutral central landmark, never defaulting to Dubai)
  if (!resolvedCenter) {
    if (/beach|island|coastal/i.test(combined)) {
      resolvedCenter = [7.8804, 98.3923]; // Tropical Beach (Phuket)
    } else if (/mountain|snow|himalaya|alps|hill/i.test(combined)) {
      resolvedCenter = [34.0837, 74.7973]; // Mountain Scenic (Kashmir)
    } else {
      resolvedCenter = [28.6139, 77.2090]; // Delhi / Central Orientation
    }
  }

  const cleanDestName = destinationName || 'Custom Vacation Destination';

  return {
    center: resolvedCenter,
    baseCity: cleanDestName,
    daysTemplate: [
      {
        day: 1,
        title: `Arrival in ${cleanDestName} & Scenic Orientation`,
        travelDistance: '22 km · ~35 mins',
        summary: `Personalized airport greeting with your private chauffeur, transfer to your handpicked hotel, and relaxed evening exploration.`,
        stops: [
          {
            time: '11:30 AM',
            type: 'transport',
            title: `${cleanDestName} Airport Meet & Chauffeur Transfer`,
            subtitle: 'Private air-conditioned vehicle with luggage assistance',
            ticketStatus: 'Included in package',
            duration: '40 mins',
            lat: resolvedCenter[0] - 0.03,
            lng: resolvedCenter[1] - 0.02,
            proximity: {
              transport: [{ name: 'Main Airport Terminal Bay', dist: '100m' }],
              landmarks: [{ name: 'City Welcome Arch', dist: '1.2 km' }],
              dining: [{ name: 'Airport Lounge Dining', dist: '150m' }],
              shopping: [{ name: 'Local Welcome Duty Free', dist: '120m' }]
            }
          },
          {
            time: '03:30 PM',
            type: 'sightseeing',
            title: `Highlights & Historic Landmarks of ${cleanDestName}`,
            subtitle: 'Guided panoramic sightseeing with comfortable photo stops',
            ticketStatus: 'Entry tickets included',
            duration: '2 hrs 30 mins',
            lat: resolvedCenter[0] + 0.01,
            lng: resolvedCenter[1] + 0.01,
            proximity: {
              transport: [{ name: 'Central Tourist Parking', dist: '50m' }],
              landmarks: [{ name: `${cleanDestName} Central Square`, dist: '100m' }],
              dining: [{ name: 'Pure Vegetarian & Multi-Cuisine Dining', dist: '350m' }],
              shopping: [{ name: 'Traditional Artisan Market', dist: '200m' }]
            }
          },
          {
            time: '07:00 PM',
            type: 'hotel',
            title: `Check-in: 4★/5★ Handpicked Stays in ${cleanDestName}`,
            subtitle: 'Comfortable stay with verified hygiene and dedicated hospitality',
            ticketStatus: 'Confirmed hotel reservation',
            duration: 'Overnight',
            lat: resolvedCenter[0] + 0.02,
            lng: resolvedCenter[1] - 0.01,
            proximity: {
              transport: [{ name: 'Hotel Valet Porch', dist: '10m' }],
              landmarks: [{ name: 'City Waterfront / Viewpoint', dist: '450m' }],
              dining: [{ name: 'In-House Dining Room', dist: 'In-house' }],
              shopping: [{ name: 'High Street Boutiques', dist: '500m' }]
            }
          }
        ]
      }
    ]
  };
}
