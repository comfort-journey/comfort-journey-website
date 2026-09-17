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
  }
};

/**
 * Universal Destination Resolver:
 * Maps any prompt or tour to a guaranteed rich destination with coordinates
 */
export function resolveDestinationWaypoints(destinationName, destKey) {
  const normalizedKey = (destKey || '').toLowerCase();
  
  // Direct match
  if (DESTINATION_WAYPOINTS[normalizedKey]) {
    return DESTINATION_WAYPOINTS[normalizedKey];
  }

  // Synonym / Substring matching
  for (const [key, data] of Object.entries(DESTINATION_WAYPOINTS)) {
    if (normalizedKey.includes(key) || key.includes(normalizedKey)) {
      return data;
    }
  }

  // Fallback: If unknown, create a dynamic localized template based on destination name
  const isEurope = /paris|france|italy|rome|london|germany|spain/i.test(destinationName);
  const isBeach = /maldives|andaman|phuket|goa|beach|island/i.test(destinationName);
  
  const fallbackCenter = isEurope ? [48.8566, 2.3522] : isBeach ? [-8.5069, 115.2625] : [25.2048, 55.2708];

  return {
    center: fallbackCenter,
    baseCity: destinationName || 'Custom Vacation Destination',
    daysTemplate: [
      {
        day: 1,
        title: `Arrival in ${destinationName} & Scenic City Orientation`,
        travelDistance: '22 km · ~35 mins',
        summary: `Personalized airport greeting with your private chauffeur, transfer to your 4★/5★ hotel, and relaxed evening stroll.`,
        stops: [
          {
            time: '11:30 AM',
            type: 'transport',
            title: `${destinationName} Airport Meet & Chauffeur Transfer`,
            subtitle: 'Private air-conditioned vehicle with luggage assistance',
            ticketStatus: 'Included in package',
            duration: '40 mins',
            lat: fallbackCenter[0] - 0.05,
            lng: fallbackCenter[1] - 0.05,
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
            title: `Highlights & Historic Landmarks of ${destinationName}`,
            subtitle: 'Guided panoramic sightseeing with comfortable photo stops',
            ticketStatus: 'Entry tickets included',
            duration: '2 hrs 30 mins',
            lat: fallbackCenter[0],
            lng: fallbackCenter[1],
            proximity: {
              transport: [{ name: 'Central Tourist Parking', dist: '50m' }],
              landmarks: [{ name: `${destinationName} Central Square`, dist: '100m' }],
              dining: [{ name: 'Pure Vegetarian & Multi-Cuisine Dining', dist: '350m' }],
              shopping: [{ name: 'Traditional Artisan Market', dist: '200m' }]
            }
          },
          {
            time: '07:00 PM',
            type: 'hotel',
            title: `Check-in: 4★/5★ Handpicked Stays in ${destinationName}`,
            subtitle: 'Comfortable stay with verified hygiene and dedicated hospitality',
            ticketStatus: 'Confirmed hotel reservation',
            duration: 'Overnight',
            lat: fallbackCenter[0] + 0.03,
            lng: fallbackCenter[1] + 0.02,
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
