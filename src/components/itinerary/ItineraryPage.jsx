import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { directusService } from '../../services/directusClient';
import { contentService } from '../../services/contentService';
import { TOURS_DATA } from '../../data/toursData';
import ItineraryLayout from './components/ItineraryLayout';
import UnifiedOnePageItinerary from './components/UnifiedOnePageItinerary';
import StickyBookingBar from './components/StickyBookingBar';
import ShareExportMenu from './components/ShareExportMenu';
import StopDetailDrawer from './components/StopDetailDrawer';
import { useItineraryData } from './hooks/useItineraryData';
import { useMapSync } from './hooks/useMapSync';
import { useShareableURL } from './hooks/useShareableURL';
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

export default function ItineraryPage({ initialTour, tourSlug, onBackToHome, onBookNow, onOpenQuote }) {
  const { formatPrice } = useCurrency();
  
  // Extract tour slug / ID from prop, pathname, or hash
  const extractTourSlugFromLocation = useCallback((propSlug) => {
    if (propSlug) {
      return String(propSlug)
        .replace(/^\/?(#\/?)*\/?/, '')
        .replace(/^(tour|tours|package|packages|itinerary|itineraries)\//i, '')
        .replace(/\/+$/, '')
        .trim();
    }
    if (typeof window === 'undefined') return null;
    try {
      const pathname = window.location.pathname || '';
      const rawHash = window.location.hash || '';

      // 1. Check pathname: /tour/:slug, /package/:slug, /itinerary/:slug
      const pathMatch = pathname.match(/^\/?(tour|tours|package|packages|itinerary|itineraries)\/([^?#]+)/i);
      if (pathMatch) {
        return decodeURIComponent(pathMatch[2]).replace(/\/+$/, '').trim();
      }

      // 2. Check hash: #/tour/:slug, #/package/:slug, #/itinerary/:slug, #itinerary/:slug
      const hashMatch = rawHash.match(/^#\/?(tour|tours|package|packages|itinerary|itineraries)\/([^?#]+)/i);
      if (hashMatch) {
        return decodeURIComponent(hashMatch[2]).replace(/\/+$/, '').trim();
      }

      return null;
    } catch (e) {
      console.error('Error parsing tour slug:', e);
      return null;
    }
  }, []);
  
  const [currentTourId, setCurrentTourId] = useState(() => extractTourSlugFromLocation(tourSlug));

  // Sync currentTourId whenever tourSlug prop changes
  useEffect(() => {
    const nextId = extractTourSlugFromLocation(tourSlug);
    if (nextId && nextId !== currentTourId) {
      setCurrentTourId(nextId);
    }
  }, [tourSlug, extractTourSlugFromLocation, currentTourId]);

  // Listen for hash & popstate navigation
  useEffect(() => {
    const handleLocationChange = () => {
      const id = extractTourSlugFromLocation(tourSlug);
      if (id !== currentTourId) {
        setCurrentTourId(id);
      }
    };
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [currentTourId, tourSlug, extractTourSlugFromLocation]);

  // State
  const [tour, setTour] = useState(() => ensureTourItinerary(initialTour) || null);
  const [loading, setLoading] = useState(() => !initialTour);
  const [error, setError] = useState(null);
  
  // UI State
  const [activeDay, setActiveDay] = useState(1);
  const [selectedStop, setSelectedStop] = useState(null);
  const [showStopDrawer, setShowStopDrawer] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [mapStyle, setMapStyle] = useState('streets');
  const [routeMode, setRouteMode] = useState('day'); // 'day' | 'all'
  
  // Shareable URL state
  const { updateURL, getURLParam } = useShareableURL();
  
  // Initialize from URL params
  useEffect(() => {
    const dayParam = getURLParam('day');
    const routeParam = getURLParam('route');
    
    if (dayParam) setActiveDay(parseInt(dayParam, 10));
    if (routeParam) setRouteMode(routeParam);
  }, [getURLParam]);
  
  // Load tour data
  useEffect(() => {
    const loadTour = async () => {
      const id = currentTourId || extractTourSlugFromLocation(tourSlug);

      setLoading(true);
      setError(null);
      
      try {
        let tourData = null;

        if (id) {
          // 1. Instant local lookup in live ContentService store
          tourData = contentService.getTourBySlug(id) || contentService.getTourById(id);

          // 2. Check initialTour if it matches
          if (!tourData && initialTour && (initialTour.slug === id || initialTour.id === id)) {
            tourData = initialTour;
          }

          // 3. Fall back to directusService if not found in local store
          if (!tourData) {
            tourData = await directusService.fetchTourBySlug(id);
          }

          // 4. Fall back to fuzzy match in live tours or TOURS_DATA
          if (!tourData) {
            const cleanKey = id.replace(/[-_]/g, ' ').toLowerCase();
            const allCandidates = [...contentService.getTours(), ...TOURS_DATA];
            tourData = allCandidates.find(t => 
              (t.name && t.name.toLowerCase().includes(cleanKey)) ||
              (t.location && t.location.toLowerCase().includes(cleanKey))
            );
          }
        } else if (initialTour) {
          tourData = initialTour;
        }

        // 5. Fallback to first available tour ONLY if no ID was requested at all
        if (!tourData && !id) {
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
          setError(`Tour package "${id || 'requested'}" could not be found.`);
        }
      } catch (err) {
        console.error('[ItineraryPage] Failed to load tour:', err);
        setError('Failed to load itinerary: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadTour();
  }, [currentTourId, tourSlug, initialTour, extractTourSlugFromLocation]);

  // Subscribe to live tours updates (e.g. when published or edited in CMS)
  useEffect(() => {
    const handleToursUpdated = () => {
      const activeId = currentTourId || extractTourSlugFromLocation(tourSlug);
      if (activeId) {
        const fresh = contentService.getTourBySlug(activeId) || contentService.getTourById(activeId);
        if (fresh) {
          const enriched = ensureTourItinerary(fresh);
          setTour(enriched);
        }
      }
    };

    window.addEventListener('cj_tours_updated', handleToursUpdated);
    return () => window.removeEventListener('cj_tours_updated', handleToursUpdated);
  }, [currentTourId, tourSlug, extractTourSlugFromLocation]);
  
  // Itinerary and Map sync hooks (MUST be called unconditionally before early returns)
  const { enrichedItinerary } = useItineraryData(tour);
  const { setMapInstance, flyToStop, highlightStop } = useMapSync(enrichedItinerary, activeDay, routeMode);

  // Derived current day data
  const currentDayData = useMemo(() => {
    if (!enrichedItinerary?.length) return null;
    return enrichedItinerary.find(d => d.day === activeDay) || enrichedItinerary[0];
  }, [enrichedItinerary, activeDay]);

  // Handlers
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

  const handleRouteModeChange = useCallback((mode) => {
    setRouteMode(mode);
    updateURL({ route: mode });
  }, [updateURL]);

  const handleWhatsAppInquiry = useCallback(() => {
    if (!tour) return;
    const msg = encodeURIComponent(
      `Hi Comfort Journey! I'm interested in booking the "${tour.name}" tour package.\n` +
      `📅 Duration: ${tour.duration} (${enrichedItinerary?.length || 5} Days)\n` +
      `💰 Price: ${formatPrice(tour.price)}/person\n` +
      `🚗 Cab: ${tour.vehicle || 'Private AC Cab'}\n` +
      `Please share availability and customized quote for our dates!`
    );
    window.open(`https://wa.me/919203931912?text=${msg}`, '_blank');
  }, [tour, enrichedItinerary, formatPrice]);

  const handleBookNowClick = useCallback(() => {
    if (onBookNow) {
      onBookNow(tour);
    } else if (onOpenQuote) {
      onOpenQuote(tour);
    } else {
      window.dispatchEvent(new CustomEvent('open-booking', { detail: tour }));
    }
  }, [onBookNow, onOpenQuote, tour]);

  // Error boundary render
  if (error) {
    return (
      <ItineraryLayout onBackToHome={onBackToHome}>
        <div className="itin-error-state">
          <div className="error-icon">⚠️</div>
          <h2>Unable to Load Itinerary</h2>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => onBackToHome ? onBackToHome() : (window.location.href = '/')}>
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
          <p>Loading your curated one-page itinerary...</p>
        </div>
      </ItineraryLayout>
    );
  }

  if (!tour) return null;
  
  return (
    <ItineraryLayout
      tour={tour}
      onBackToHome={onBackToHome}
      onShare={() => setShowShareMenu(true)}
      tabContent={
        <UnifiedOnePageItinerary
          tour={tour}
          enrichedItinerary={enrichedItinerary}
          activeDay={activeDay}
          onDayChange={handleDayChange}
          selectedStop={selectedStop}
          onStopSelect={handleStopSelect}
          formatPrice={formatPrice}
          routeMode={routeMode}
          onRouteModeChange={handleRouteModeChange}
          mapStyle={mapStyle}
          onMapStyleChange={setMapStyle}
          setMapInstance={setMapInstance}
          onBookNow={handleBookNowClick}
          onWhatsApp={handleWhatsAppInquiry}
          onShare={() => setShowShareMenu(true)}
        />
      }
      stickyBookingBar={
        <StickyBookingBar
          tour={tour}
          currentDayData={currentDayData}
          formatPrice={formatPrice}
          onWhatsApp={handleWhatsAppInquiry}
          onBookNow={handleBookNowClick}
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