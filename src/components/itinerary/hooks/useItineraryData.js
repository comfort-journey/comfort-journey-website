import { useMemo } from 'react';
import { resolveDestinationWaypoints } from '../../../data/destinationWaypoints';

export function useItineraryData(tour) {
  const enrichedItinerary = useMemo(() => {
    if (!tour?.itinerary?.length) return [];
    
    // Get waypoints for this destination
    const destKey = tour.id?.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'kashmir';
    const waypointsData = resolveDestinationWaypoints(tour.destination || tour.location, destKey);
    
    // Merge tour itinerary with waypoint data
    return tour.itinerary.map((day, dayIdx) => {
      const waypointDay = waypointsData.daysTemplate?.[dayIdx];
      
      // Merge stops with GPS coordinates from waypoints
      const enrichedStops = (day.stops || []).map((stop, stopIdx) => {
        const waypointStop = waypointDay?.stops?.[stopIdx];
        
        return {
          ...stop,
          // Add GPS coordinates from waypoints if available
          lat: stop.lat || waypointStop?.lat,
          lng: stop.lng || waypointStop?.lng,
          // Add proximity data from waypoints
          proximity: stop.proximity || waypointStop?.proximity,
          // Add images if available
          images: stop.images || (waypointStop?.image ? [waypointStop.image] : []),
        };
      });
      
      return {
        ...day,
        stops: enrichedStops,
        // Add waypoint day data
        travelDistance: day.travelDistance || waypointDay?.travelDistance,
        summary: day.summary || waypointDay?.summary,
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