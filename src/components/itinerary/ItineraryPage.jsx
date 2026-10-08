import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { directusService } from '../../services/directusClient';
import { contentService } from '../../services/contentService';
import { TOURS_DATA } from '../../data/toursData';
import { resolveDestinationWaypoints } from '../../data/destinationWaypoints';
import ItineraryLayout from './components/ItineraryLayout';
import OverviewTab from './components/OverviewTab';
import ItineraryTab from './components/ItineraryTab';
import MapTab from './components/MapTab';
import StickyBookingBar from './components/StickyBookingBar';
import ShareExportMenu from './components/ShareExportMenu';
import StopDetailDrawer from './components/StopDetailDrawer';
import { useItineraryData } from './hooks/useItineraryData';
import { useMapSync } from './hooks/useMapSync';
import { useShareableURL } from './hooks/useShareableURL';
import { serializeItineraryState, deserializeItineraryState } from './utils/itinerarySerializer';
import './styles/itinerary.css';

function ensureTourItinerary(rawTour) {
  if (!rawTour) return null;
  const tour = { ...rawTour };
  if (tour.itinerary && Array.isArray(tour.itinerary) && tour.itinerary.length > 0) {
    return tour;
  }
  const numDays = tour.durationDays || parseInt(tour.duration, 10) || 5;
  const loc = tour.location || tour.name || 'Destination';
  const generatedItinerary = Array.from({ length: numDays }, (_, i) => ({
    day: i + 1,
    title: i === 0 
      ? `Arrival & Royal Welcome in ${loc}` 
      : (i === numDays - 1 
        ? `Leisure & VIP Departure from ${loc}` 
        : `Curated Heritage & Scenic Excursions in ${loc} - Day ${i + 1}`),
    desc: i === 0 
      ? `Arrive at the destination. Chauffeur meets you at the airport/station for VIP transfer to your luxury stay. Evening leisure and welcome briefing.`
      : (i === numDays - 1 
        ? `Leisure breakfast. Souvenir shopping and private chauffeur transfer for your onward journey with unforgettable memories.`
        : `Private guided excursions, scenic panoramic sights, local cuisine tasting, and curated cultural experiences across ${loc}.`),
    stops: [
      {
        title: `${loc} Scenic Viewpoint ${i + 1}`,
        description: `Immerse in the breathtaking landscapes and cultural landmarks of ${loc}.`,
        time: '10:00 AM',
        duration: '2.5 Hours',
        type: 'sightseeing'
      },
      {
        title: `${loc} Royal Dining & Leisure`,
        description: `Curated local tasting and royal relaxation.`,
        time: '02:30 PM',
        duration: '2 Hours',
        type: 'meal'
      }
    ]
  }));
  return { ...tour, itinerary: generatedItinerary };
}

export default function ItineraryPage({ initialTour, onBackToHome, onBookNow, onOpenQuote }) {
  const { formatPrice } = useCurrency();
  
  // Get tour ID from URL hash
  const getTourIdFromHash = () => {
    try {
      const hash = window.location.hash || '';
      const match = hash.match(/#\/?itinerary\/([^?#]+)/);
      return match ? decodeURIComponent(match[1].trim()) : null;
    } catch (e) {
      console.error('Error parsing hash:', e);
      return null;
    }
  };
  
  const [currentTourId, setCurrentTourId] = useState(getTourIdFromHash());

  useEffect(() => {
    const handleHash = () => {
      const id = getTourIdFromHash();
      if (id !== currentTourId) {
        setCurrentTourId(id);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [currentTourId]);

  // State
  const [tour, setTour] = useState(() => ensureTourItinerary(initialTour) || null);
  const [loading, setLoading] = useState(() => !initialTour);
  const [error, setError] = useState(null);
  
  // UI State
  const [activeTab, setActiveTab] = useState('itinerary');
  const [activeDay, setActiveDay] = useState(1);
  const [selectedStop, setSelectedStop] = useState(null);
  const [showStopDrawer, setShowStopDrawer] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [mapStyle, setMapStyle] = useState('streets');
  const [routeMode, setRouteMode] = useState('day'); // 'day' | 'full'
  
  // Shareable URL state
  const { updateURL, getURLParam } = useShareableURL();
  
  // Initialize from URL params
  useEffect(() => {
    const dayParam = getURLParam('day');
    const stopParam = getURLParam('stop');
    const tabParam = getURLParam('tab');
    const routeParam = getURLParam('route');
    
    if (dayParam) setActiveDay(parseInt(dayParam, 10));
    if (tabParam) setActiveTab(tabParam);
    if (routeParam) setRouteMode(routeParam);
  }, [getURLParam]);
  
  // Load tour data
  useEffect(() => {
    const loadTour = async () => {
      const id = currentTourId || getTourIdFromHash();

      // If initialTour is present and matches this tour or no ID specified, use it
      if (initialTour && (!id || initialTour.slug === id || initialTour.id === id)) {
        const enriched = ensureTourItinerary(initialTour);
        setTour(enriched);
        setActiveDay(enriched.itinerary?.[0]?.day || 1);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        let tourData = null;

        if (id) {
          // 1. Instant local lookup (0ms)
          tourData = contentService.getTourBySlug(id) || contentService.getTourById(id);

          // 2. Fall back to directusService if not found
          if (!tourData) {
            tourData = await directusService.fetchTourBySlug(id);
          }

          // 3. Fall back to fuzzy match in TOURS_DATA
          if (!tourData) {
            const cleanKey = id.replace(/[-_]/g, ' ').toLowerCase();
            tourData = TOURS_DATA.find(t => 
              (t.name && t.name.toLowerCase().includes(cleanKey)) ||
              (t.location && t.location.toLowerCase().includes(cleanKey))
            );
          }
        }

        // 4. Fallback to first available tour if nothing matched
        if (!tourData) {
          const all = contentService.getTours();
          tourData = all[0] || TOURS_DATA[0];
        }
        
        if (tourData) {
          const enriched = ensureTourItinerary(tourData);
          setTour(enriched);
          const firstDay = enriched.itinerary?.[0]?.day || 1;
          setActiveDay(firstDay);
          
          const stopParam = getURLParam('stop');
          if (stopParam && enriched.itinerary) {
            const dayData = enriched.itinerary.find(d => d.day === firstDay);
            if (dayData?.stops) {
              const stop = dayData.stops.find(s => 
                s.title?.toLowerCase().includes(stopParam.toLowerCase())
              );
              if (stop) {
                setSelectedStop(stop);
                setShowStopDrawer(true);
              }
            }
          }
        } else {
          setError(`Tour not found: ${id}`);
        }
      } catch (err) {
        console.error('[ItineraryPage] Failed to load tour:', err);
        setError('Failed to load itinerary: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadTour();
  }, [currentTourId, initialTour]);
  
  // Error boundary render
  if (error) {
    return (
      <ItineraryLayout onBackToHome={onBackToHome}>
        <div className="itin-error-state">
          <div className="error-icon">⚠️</div>
          <h2>Unable to Load Itinerary</h2>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => onBackToHome ? onBackToHome() : (window.location.hash = '')}>
            Back to Tours
          </button>
        </div>
      </ItineraryLayout>
    );
  }
  
  if (loading) {
    return (
      <ItineraryLayout isLoading={true} onBackToHome={onBackToHome}>
        <div className="itin-loading-overlay">
          <div className="loading-spinner" />
          <p>Loading your personalized itinerary...</p>
        </div>
      </ItineraryLayout>
    );
  }
  
  // Itinerary and Map sync hooks
  const { enrichedItinerary, waypointsMap } = useItineraryData(tour);
  const { setMapInstance, flyToStop, highlightStop } = useMapSync(enrichedItinerary, activeDay, routeMode);

  // Derived current day data
  const currentDayData = useMemo(() => {
    if (!enrichedItinerary?.length) return null;
    return enrichedItinerary.find(d => d.day === activeDay) || enrichedItinerary[0];
  }, [enrichedItinerary, activeDay]);

  const currentDayStops = useMemo(() => {
    return currentDayData?.stops || [];
  }, [currentDayData]);

  const currentDayRoute = useMemo(() => {
    return currentDayStops
      .filter(s => s.lat && s.lng)
      .map(s => [s.lat, s.lng]);
  }, [currentDayStops]);

  const fullTourRoute = useMemo(() => {
    if (!enrichedItinerary?.length) return [];
    const allStops = [];
    enrichedItinerary.forEach(d => {
      (d.stops || []).forEach(s => {
        if (s.lat && s.lng) allStops.push([s.lat, s.lng]);
      });
    });
    return allStops;
  }, [enrichedItinerary]);

  // Handlers
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    updateURL({ tab });
  }, [updateURL]);

  const handleDayChange = useCallback((day) => {
    setActiveDay(day);
    updateURL({ day });
  }, [updateURL]);

  const handleStopSelect = useCallback((stop) => {
    setSelectedStop(stop);
    setShowStopDrawer(true);
    if (stop) {
      flyToStop(stop);
      highlightStop(stop.title);
      updateURL({ stop: stop.title });
    } else {
      updateURL({ stop: null });
    }
  }, [flyToStop, highlightStop, updateURL]);

  const handleMapDayChange = useCallback((day) => {
    setActiveDay(day);
    updateURL({ day });
  }, [updateURL]);

  const handleRouteModeChange = useCallback((mode) => {
    setRouteMode(mode);
    updateURL({ route: mode });
  }, [updateURL]);

  if (!tour) return null;
  
  const renderOverviewTab = () => (
    <OverviewTab
      tour={tour}
      enrichedItinerary={enrichedItinerary}
      formatPrice={formatPrice}
      activeDay={activeDay}
      onDayChange={handleDayChange}
    />
  );
  
  const renderItineraryTab = () => (
    <ItineraryTab
      tour={tour}
      enrichedItinerary={enrichedItinerary}
      activeDay={activeDay}
      selectedStop={selectedStop}
      onDayChange={handleDayChange}
      onStopSelect={handleStopSelect}
      formatPrice={formatPrice}
    />
  );
  
  const renderMapTab = () => (
    <MapTab
      tour={tour}
      enrichedItinerary={enrichedItinerary}
      activeDay={activeDay}
      routeMode={routeMode}
      selectedStop={selectedStop}
      currentDayStops={currentDayStops}
      currentDayRoute={currentDayRoute}
      fullTourRoute={fullTourRoute}
      mapStyle={mapStyle}
      setMapInstance={setMapInstance}
      onDayChange={handleMapDayChange}
      onStopSelect={handleStopSelect}
      onRouteModeChange={handleRouteModeChange}
      onMapStyleChange={setMapStyle}
    />
  );
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverviewTab();
      case 'itinerary': return renderItineraryTab();
      case 'map': return renderMapTab();
      default: return renderItineraryTab();
    }
  };
  
  return (
    <ItineraryLayout
      tour={tour}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onBackToHome={onBackToHome}
      activeDay={activeDay}
      onDayChange={handleDayChange}
      routeMode={routeMode}
      onRouteModeChange={handleRouteModeChange}
      enrichedItinerary={enrichedItinerary}
      tabContent={renderTabContent()}
      stickyBookingBar={
        <StickyBookingBar
          tour={tour}
          currentDayData={currentDayData}
          formatPrice={formatPrice}
          onWhatsApp={() => {
            const msg = encodeURIComponent(
              `Hi Comfort Journey! I'm reviewing the "${tour.name}" itinerary.\n` +
              `📅 ${tour.duration} | 💰 ${formatPrice(tour.price)}/person\n` +
              `Please share availability and booking details!`
            );
            window.open(`https://wa.me/918770403315?text=${msg}`, '_blank');
          }}
          onBookNow={() => {
            if (onBookNow) {
              onBookNow(tour);
            } else {
              window.dispatchEvent(new CustomEvent('open-booking', { detail: tour }));
            }
          }}
          onShare={() => setShowShareMenu(true)}
        />
      }
      stopDrawer={
        <StopDetailDrawer
          isOpen={showStopDrawer}
          onClose={() => { setShowStopDrawer(false); setSelectedStop(null); }}
          stop={selectedStop}
          currentDayData={currentDayData}
          tour={tour}
        />
      }
      shareMenu={
        <ShareExportMenu
          isOpen={showShareMenu}
          onClose={() => setShowShareMenu(false)}
          tour={tour}
          enrichedItinerary={enrichedItinerary}
          activeDay={activeDay}
          selectedStop={selectedStop}
        />
      }
    />
  );
}