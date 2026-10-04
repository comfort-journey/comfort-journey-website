/**
 * Itinerary Serialization for Shareable URLs
 * Compresses itinerary state to URL-safe string
 */

export function serializeItineraryState(itinerary) {
  if (!itinerary) return null;

  try {
    // Create minimal serializable version
    const minimal = {
      v: 1, // version
      id: itinerary.id,
      title: itinerary.title,
      destination: itinerary.destination,
      destKey: itinerary.destKey,
      duration: itinerary.duration,
      durationDays: itinerary.durationDays,
      party: itinerary.party,
      pacing: itinerary.pacing,
      vehicle: itinerary.vehicle,
      dietary: itinerary.dietary,
      stayTier: itinerary.stayTier,
      price: itinerary.price,
      days: itinerary.days?.map(day => ({
        day: day.day,
        title: day.title,
        travelDistance: day.travelDistance,
        summary: day.summary,
        stops: day.stops?.map(stop => ({
          time: stop.time,
          type: stop.type,
          title: stop.title,
          subtitle: stop.subtitle,
          duration: stop.duration,
          ticketStatus: stop.ticketStatus,
          lat: stop.lat,
          lng: stop.lng,
          // Don't serialize proximity data - too large for URL
        })) || [],
      })) || [],
    };

    const json = JSON.stringify(minimal);
    // Base64 encode for URL safety
    return btoa(json);
  } catch (err) {
    console.error('Failed to serialize itinerary:', err);
    return null;
  }
}

export function deserializeItineraryState(serialized) {
  if (!serialized) return null;

  try {
    const json = atob(serialized);
    const data = JSON.parse(json);

    // Version check
    if (data.v !== 1) {
      console.warn('Unknown itinerary version:', data.v);
    }

    // Reconstruct full trip plan with defaults for missing data
    return {
      id: data.id || `comfy-trip-${Date.now()}`,
      title: data.title,
      destination: data.destination,
      destKey: data.destKey,
      duration: data.duration,
      durationDays: data.durationDays,
      party: data.party,
      pacing: data.pacing,
      vehicle: data.vehicle,
      dietary: data.dietary,
      stayTier: data.stayTier,
      price: data.price,
      days: data.days?.map(day => ({
        ...day,
        stops: day.stops?.map(stop => ({
          ...stop,
          // Add default proximity if missing
          proximity: stop.proximity || getDefaultProximity(stop.type),
        })) || [],
      })) || [],
      highlights: [
        `100% Private holiday with dedicated ${data.vehicle}`,
        `Handpicked ${data.stayTier} verified by Comfort Journey`,
        `Paced for ${data.party}: ${data.pacing}`,
        `Carefully planned meals: ${data.dietary}`,
        `24/7 dedicated personal trip manager on WhatsApp & phone`
      ],
    };
  } catch (err) {
    console.error('Failed to deserialize itinerary:', err);
    return null;
  }
}

function getDefaultProximity(type) {
  return {
    transport: [{ name: 'Hotel Lobby', dist: '50m' }],
    landmarks: [{ name: 'City Center', dist: '500m' }],
    dining: [{ name: 'Local Restaurant', dist: '200m' }],
    shopping: [{ name: 'Market', dist: '300m' }],
  };
}

export function generateShareableURL(itinerary, baseUrl = window.location.origin) {
  const serialized = serializeItineraryState(itinerary);
  if (!serialized) return baseUrl;
  return `${baseUrl}/itinerary?plan=${encodeURIComponent(serialized)}`;
}