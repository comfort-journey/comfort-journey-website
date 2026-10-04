import { useCallback, useRef } from 'react';

export function useMapSync(tripPlan, activeDay) {
  const mapInstanceRef = useRef(null);
  const markersMapRef = useRef(new Map());

  const setMapInstance = useCallback((map) => {
    mapInstanceRef.current = map;
  }, []);

  const flyToStop = useCallback((stop) => {
    const map = mapInstanceRef.current;
    if (!map || !stop?.lat || !stop?.lng) return;
    map.flyTo([stop.lat, stop.lng], 14, { animate: true, duration: 0.8 });
  }, []);

  const updateMapForDay = useCallback((day) => {
    // Triggered by day change - map component will re-render via activeDay prop
    // This is a placeholder for any additional sync logic needed
  }, []);

  const updateMapForRouteMode = useCallback((mode) => {
    // Triggered by route mode change
  }, []);

  const highlightStop = useCallback((stopTitle) => {
    const marker = markersMapRef.current.get(stopTitle);
    if (marker && mapInstanceRef.current) {
      marker.openTooltip();
    }
  }, []);

  const registerMarker = useCallback((stopTitle, marker) => {
    markersMapRef.current.set(stopTitle, marker);
  }, []);

  return {
    mapInstance: mapInstanceRef.current,
    setMapInstance,
    flyToStop,
    updateMapForDay,
    updateMapForRouteMode,
    highlightStop,
    registerMarker,
  };
}