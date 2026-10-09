import { useMemo } from 'react';
import { resolveDestinationWaypoints, DESTINATION_WAYPOINTS } from '../../../data/destinationWaypoints';

// Comprehensive city & landmark coordinate knowledge base
const CITY_COORDINATES = {
  // Himachal Pradesh
  'dharamshala': [32.2190, 76.3234],
  'mcleod ganj': [32.2426, 76.3213],
  'dalhousie': [32.5387, 75.9710],
  'khajjiar': [32.5510, 76.0600],
  'chamba': [32.5534, 76.1258],
  'chandigarh': [30.7333, 76.7794],
  'manali': [32.2396, 77.1887],
  'solang': [32.3166, 77.1578],
  'shimla': [31.1048, 77.1734],
  'kufri': [31.0979, 77.2678],
  'spiti': [32.2461, 78.0349],
  'kullu': [31.9579, 77.1095],
  'kasol': [32.0100, 77.3150],

  // Kashmir & Ladakh
  'srinagar': [34.0837, 74.7973],
  'gulmarg': [34.0484, 74.3805],
  'pahalgam': [34.0163, 75.3150],
  'sonmarg': [34.3129, 75.2950],
  'leh': [34.1526, 77.5771],
  'ladakh': [34.1526, 77.5771],
  'nubra': [34.6863, 77.5673],
  'pangong': [33.7595, 78.6674],

  // Uttarakhand
  'rishikesh': [30.0869, 78.2676],
  'haridwar': [29.9457, 78.1642],
  'dehradun': [30.3165, 78.0322],
  'mussoorie': [30.4598, 78.0644],
  'nainital': [29.3919, 79.4542],
  'kedarnath': [30.7352, 79.0669],
  'badrinath': [30.7433, 79.4938],

  // Rajasthan & Golden Triangle
  'jaipur': [26.9124, 75.7873],
  'udaipur': [24.5854, 73.7125],
  'jodhpur': [26.2389, 73.0243],
  'jaisalmer': [26.9157, 70.9083],
  'pushkar': [26.4897, 74.5511],
  'agra': [27.1767, 78.0081],
  'delhi': [28.6139, 77.2090],
  'varanasi': [25.3176, 82.9739],
  'amritsar': [31.6340, 74.8723],

  // South India & Goa
  'goa': [15.2993, 74.1240],
  'north goa': [15.5494, 73.7535],
  'south goa': [15.1950, 73.9620],
  'kochi': [9.9312, 76.2673],
  'munnar': [10.0889, 77.0595],
  'thekkady': [9.6031, 77.1615],
  'alleppey': [9.4981, 76.3388],
  'wayanad': [11.6854, 76.1320],
  'ooty': [11.4102, 76.6950],
  'coorg': [12.4244, 75.7382],
  'mysore': [12.2958, 76.6394],
  'bangalore': [12.9716, 77.5946],
  'andaman': [11.6234, 92.7265],
  'port blair': [11.6234, 92.7265],
  'havelock': [11.9761, 92.9876],

  // International
  'dubai': [25.2048, 55.2708],
  'abu dhabi': [24.4539, 54.3773],
  'bangkok': [13.7563, 100.5018],
  'phuket': [7.8804, 98.3923],
  'krabi': [8.0863, 98.9063],
  'pattaya': [12.9276, 100.8771],
  'bali': [-8.4095, 115.1889],
  'singapore': [1.3521, 103.8198],
  'vietnam': [21.0285, 105.8542],
  'hanoi': [21.0285, 105.8542],
  'da nang': [16.0544, 108.2022],
  'japan': [35.6762, 139.6503],
  'tokyo': [35.6762, 139.6503],
  'kyoto': [35.0116, 135.7681],
  'switzerland': [46.8182, 8.2275],
  'zurich': [47.3769, 8.5417],
  'interlaken': [46.6863, 7.8632],
  'lucerne': [47.0502, 8.3093],
  'maldives': [3.2028, 73.2207]
};

// Find closest coordinates for a city name in text
function findCityCoords(text, defaultCenter) {
  const lower = (text || '').toLowerCase();
  for (const [city, coords] of Object.entries(CITY_COORDINATES)) {
    if (lower.includes(city)) {
      return coords;
    }
  }
  return defaultCenter || [32.2190, 76.3234];
}

// Extract landmarks from a day's description text
function extractLandmarksFromDesc(desc) {
  if (!desc) return [];
  
  // Clean description of HTML tags
  const clean = desc.replace(/<[^>]*>/g, '').trim();
  
  // Look for "Visit ...", "Explore ...", "Drive to ..." patterns
  const landmarks = [];
  
  const visitMatch = clean.match(/(?:visit|explore|enjoy|see|discover)\s+([^.]+)/i);
  if (visitMatch && visitMatch[1]) {
    const rawPlaces = visitMatch[1]
      .split(/,\s*|\s+and\s+/i)
      .map(p => p.trim())
      .filter(p => p.length > 3 && !p.toLowerCase().startsWith('overnight') && !p.toLowerCase().startsWith('drive'));
    
    rawPlaces.forEach(p => {
      const title = p.replace(/\b\w/g, c => c.toUpperCase());
      if (!landmarks.includes(title)) landmarks.push(title);
    });
  }
  
  return landmarks;
}

// Synthesize complete, rich, chronological stops for a day (WITHOUT dummy stock photos)
function synthesizeDayStops(day, dayIdx, totalDays, baseCenter, locationName, stayTier, tourImage) {
  const title = day.title || `Day ${day.day || dayIdx + 1}`;
  const desc = (day.desc || '').replace(/<[^>]*>/g, '').trim();
  
  // Resolve city center for this specific day
  const dayCityCenter = findCityCoords(`${title} ${desc}`, baseCenter);
  const cityLat = dayCityCenter[0];
  const cityLng = dayCityCenter[1];

  const extracted = extractLandmarksFromDesc(desc);
  const isFirstDay = dayIdx === 0;
  const isLastDay = dayIdx === totalDays - 1;

  const stops = [];

  // 1. Morning Transport / Meet & Greet
  if (isFirstDay) {
    stops.push({
      time: '09:30 AM',
      type: 'transport',
      title: title.includes('Transfer') || title.includes('Arrival')
        ? 'VIP Arrival & Chauffeur Meet'
        : 'Morning Chauffeur Pickup & Route Briefing',
      subtitle: day.transport || 'Dedicated Private AC Cab & Chauffeur',
      description: `Smooth pickup with luggage assistance. Private chauffeur welcomes you for your scenic journey toward ${locationName}. Relax as you take in the picturesque views.`,
      ticketStatus: 'Included in package',
      duration: '1 hr 30 mins',
      lat: cityLat - 0.015,
      lng: cityLng - 0.010,
      proximity: {
        transport: [{ name: 'Airport / Station Highway Exit', dist: '200m' }, { name: 'Main Tourist Cab Stand', dist: '800m' }],
        landmarks: [{ name: 'Scenic Valley Gateway Arch', dist: '1.2 km' }],
        dining: [{ name: 'Highway Travel Cafe & Refreshments', dist: '350m' }],
        shopping: [{ name: 'Regional Welcome Mart', dist: '500m' }]
      }
    });
  } else {
    stops.push({
      time: '09:00 AM',
      type: 'transport',
      title: `Morning Scenic Drive to ${title.split(' ')[0] || 'Excursion'}`,
      subtitle: day.transport || 'Dedicated Private AC Cab & Chauffeur',
      description: 'Prompt morning pickup from your hotel lobby following breakfast. Scenic mountain roads with photo stops at picturesque valley overlooks.',
      ticketStatus: 'Private chauffeur service',
      duration: '45 mins',
      lat: cityLat - 0.008,
      lng: cityLng - 0.005,
      proximity: {
        transport: [{ name: 'Hotel Driveway Porch', dist: '<50m' }, { name: 'Hill Route Viewpoint Point', dist: '1.5 km' }],
        dining: [{ name: 'Breakfast Lounge', dist: 'In-house' }]
      }
    });
  }

  // 2. Primary Sightseeing
  const landmark1 = extracted[0] || (title.includes('Sightseeing') ? `${locationName} Heritage Walk` : `${title} Experience`);
  stops.push({
    time: '11:00 AM',
    type: 'sightseeing',
    title: landmark1,
    subtitle: `Guided excursion with panoramic viewpoints & photo opportunities`,
    description: `Immerse in the breathtaking atmosphere of ${landmark1}. Take time for relaxed exploration, capture stunning photos of the Himalayan landscape, and absorb the serene local vibe.`,
    ticketStatus: 'Entry permits & access included',
    duration: '2 Hours',
    lat: cityLat + 0.006,
    lng: cityLng + 0.008,
    proximity: {
      transport: [{ name: 'Main Tourist Parking Bay', dist: '100m' }, { name: 'Local Shuttle Stand', dist: '250m' }],
      landmarks: [{ name: 'Valley Panoramic Viewpoint', dist: '150m' }, { name: 'Historic Memorial', dist: '400m' }],
      dining: [{ name: 'Traditional Chai & Snack Stall', dist: '80m' }, { name: 'Valley View Rest Cafe', dist: '300m' }],
      shopping: [{ name: 'Local Handicrafts & Souvenir Alley', dist: '180m' }]
    }
  });

  // 3. Mid-day Dining / Local Culinary Tasting
  stops.push({
    time: '01:30 PM',
    type: 'meal',
    title: `Authentic Lunch & Himalayan Cuisine Tasting`,
    subtitle: day.meals || 'Curated dining with Pure Vegetarian & Jain options',
    description: `Enjoy a wholesome, freshly prepared meal featuring delicious regional and multi-cuisine specialties. Vegetarian, vegan, and Jain meal requirements are fully accommodated upon request.`,
    ticketStatus: 'Included as per meal plan',
    duration: '1 Hour',
    lat: cityLat + 0.002,
    lng: cityLng - 0.004,
    proximity: {
      transport: [{ name: 'Central Promenade Car Drop-off', dist: '60m' }],
      landmarks: [{ name: 'Town Heritage Clock Tower', dist: '220m' }],
      dining: [{ name: 'Pure Veg Royal Dining Room', dist: '50m' }, { name: 'Kashmiri & Himalayan Tea Room', dist: '120m' }],
      shopping: [{ name: 'Local Spice & Organic Honey Mart', dist: '200m' }]
    }
  });

  // 4. Secondary Sightseeing or Nature Walk
  const landmark2 = extracted[1] || (extracted.length > 2 ? extracted[2] : (isLastDay ? 'Souvenir Shopping & Stroll' : 'Scenic Sunset Excursion'));
  const isShopping = isLastDay || landmark2.toLowerCase().includes('market') || landmark2.toLowerCase().includes('chowk');
  
  stops.push({
    time: '03:30 PM',
    type: isShopping ? 'shopping' : 'sightseeing',
    title: landmark2,
    subtitle: isShopping ? 'Traditional bazaar walk for woolens, handicrafts & tea' : 'Gentle nature stroll & peaceful mountain vistas',
    description: isShopping
      ? `Stroll through the bustling local market. Great opportunity to shop for handcrafted shawls, Tibetan singing bowls, cedarwood crafts, and authentic mountain preserves.`
      : `Visit ${landmark2}. Experience calm pine-scented breezes, majestic vistas, and explore at a leisurely pace suited for all ages.`,
    ticketStatus: 'Guided experience included',
    duration: '1 hr 45 mins',
    lat: cityLat - 0.004,
    lng: cityLng + 0.012,
    proximity: {
      transport: [{ name: 'Bazaar Gateway Parking', dist: '120m' }],
      landmarks: [{ name: 'Pine Forest Nature Trail', dist: '300m' }],
      dining: [{ name: 'Artisan Bakery & Coffee Cafe', dist: '70m' }],
      shopping: [{ name: 'Government Handicrafts Emporium', dist: '150m' }, { name: 'Tibetan Shawl Market', dist: '100m' }]
    }
  });

  // 5. Evening Stay / Hotel Check-in
  if (!isLastDay) {
    stops.push({
      time: '06:30 PM',
      type: 'hotel',
      title: `Return to Stay: ${stayTier || '4★ / 5★ Luxury Mountain Stay'}`,
      subtitle: 'Comfortable check-in with dinner & heated rooms',
      description: `Return to your verified luxury resort or hotel. Unwind in spacious heated rooms with scenic valley views. Enjoy an evening buffet dinner and a peaceful night's rest.`,
      ticketStatus: 'Confirmed reservation with meals',
      duration: 'Overnight Stay',
      lat: cityLat + 0.012,
      lng: cityLng - 0.008,
      proximity: {
        transport: [{ name: 'Hotel Dedicated Porch & Valet', dist: '<50m' }],
        landmarks: [{ name: 'Private Resort Garden & Lawn', dist: '10m' }],
        dining: [{ name: 'Multi-Cuisine In-House Restaurant', dist: 'In-house' }, { name: 'Rooftop Lounge', dist: 'In-house' }],
        shopping: [{ name: 'Hotel Boutique & Gift Gallery', dist: 'In-lobby' }]
      }
    });
  } else {
    // Departure transfer for last day
    stops.push({
      time: '06:00 PM',
      type: 'transport',
      title: 'Comfortable Airport / Station Drop-off',
      subtitle: 'Tour concludes with pleasant memories',
      description: 'Your private chauffeur assists with all luggage and transfers you directly to Chandigarh Airport or Railway Station for your onward journey. Comfort Journey support remains on standby until your departure.',
      ticketStatus: 'Private drop-off included',
      duration: '45 mins',
      lat: cityLat - 0.020,
      lng: cityLng - 0.015,
      proximity: {
        transport: [{ name: 'Departure Terminal Gate 1', dist: '50m' }, { name: 'VIP Drop Bay', dist: '20m' }],
        dining: [{ name: 'Departure Lounge Cafe', dist: '100m' }]
      }
    });
  }

  return stops;
}

export function useItineraryData(tour) {
  const enrichedItinerary = useMemo(() => {
    if (!tour?.itinerary?.length) return [];
    
    // Resolve overall tour destination
    const locationName = tour.destination || tour.location || tour.name || 'Himalayan Destination';
    const destKey = tour.id?.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'himachal';
    const waypointsData = resolveDestinationWaypoints(locationName, destKey);
    const baseCenter = waypointsData?.center || CITY_COORDINATES['dharamshala'];
    const stayTier = tour.stayTier || '4-Star / 5-Star Luxury Stay';
    const totalDays = tour.itinerary.length;
    const tourImage = tour.image || '';

    // Merge tour itinerary with synthesized or existing waypoint data
    return tour.itinerary.map((day, dayIdx) => {
      const waypointDay = waypointsData?.daysTemplate?.[dayIdx];
      
      let stops = [];
      if (day.stops && Array.isArray(day.stops) && day.stops.length > 0) {
        stops = day.stops.map((stop, stopIdx) => {
          const waypointStop = waypointDay?.stops?.[stopIdx];
          return {
            ...stop,
            lat: stop.lat || waypointStop?.lat || (baseCenter[0] + (stopIdx * 0.005)),
            lng: stop.lng || waypointStop?.lng || (baseCenter[1] + (stopIdx * 0.005)),
            proximity: stop.proximity || waypointStop?.proximity,
            image: stop.image || null,
            images: stop.images || []
          };
        });
      } else {
        // Synthesize realistic, engaging stops tailored to the tour day's text (without fake dummy photos)
        stops = synthesizeDayStops(day, dayIdx, totalDays, baseCenter, locationName, stayTier, tourImage);
      }

      // Calculate bounds for Leaflet map zooming
      const validCoords = stops.filter(s => s.lat && s.lng).map(s => [s.lat, s.lng]);
      let bounds = null;
      if (validCoords.length > 0) {
        const lats = validCoords.map(c => c[0]);
        const lngs = validCoords.map(c => c[1]);
        bounds = [
          [Math.min(...lats) - 0.02, Math.min(...lngs) - 0.02],
          [Math.max(...lats) + 0.02, Math.max(...lngs) + 0.02]
        ];
      }

      // Compute travel distance string if not provided
      const travelDistance = day.travelDistance 
        || (dayIdx === 0 ? '18 km · ~35 mins' : (dayIdx === totalDays - 1 ? '160 km · ~4.5 hrs' : `${25 + dayIdx * 10} km · ~1 hr`));

      return {
        ...day,
        stops,
        bounds,
        travelDistance,
        summary: day.summary || day.desc || `Highlights & scenic experiences of Day ${day.day || dayIdx + 1}.`,
      };
    });
  }, [tour]);
  
  const waypointsMap = useMemo(() => {
    const map = new Map();
    enrichedItinerary?.forEach(day => {
      day.stops?.forEach(stop => {
        if (stop.lat && stop.lng) {
          map.set(stop.title, { lat: stop.lat, lng: stop.lng });
        }
      });
    });
    return map;
  }, [enrichedItinerary]);
  
  return { enrichedItinerary, waypointsMap };
}