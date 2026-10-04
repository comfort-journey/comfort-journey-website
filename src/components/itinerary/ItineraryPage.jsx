import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { directusService } from '../../services/directusClient';
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

export default function ItineraryPage() {
  const { formatPrice } = useCurrency();
  
  // Get tour ID from URL hash
  const getTourIdFromHash = () => {
    try {
      const hash = window.location.hash;
      const match = hash.match(/#\/itinerary\/([^?#]+)/);
      return match ? match[1] : null;
    } catch (e) {
      console.error('Error parsing hash:', e);
      return null;
    }
  };
  
  const tourId = getTourIdFromHash();
  
  // State
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
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
      if (!tourId) {
        setError('No tour specified in URL');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        console.log('[ItineraryPage] Loading tour:', tourId);
        const tourData = await directusService.fetchTourBySlug(tourId);
        console.log('[ItineraryPage] Tour data:', tourData);
        
        if (tourData) {
          setTour(tourData);
          const firstDay = tourData.itinerary?.[0]?.day || 1;
          setActiveDay(firstDay);
          
          const stopParam = getURLParam('stop');
          if (stopParam && tourData.itinerary) {
            const dayData = tourData.itinerary.find(d => d.day === activeDay);
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
          setError(`Tour not found: ${tourId}`);
        }
      } catch (err) {
        console.error('[ItineraryPage] Failed to load tour:', err);
        setError('Failed to load itinerary: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadTour();
  }, [tourId]);
  
  // Error boundary render
  if (error) {
    return (
      <ItineraryLayout>
        <div className="itin-error-state">
          <div className="error-icon">⚠️</div>
          <h2>Unable to Load Itinerary</h2>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => window.history.back()}>
            Back to Tours
          </button>
        </div>
      </ItineraryLayout>
    );
  }
  
  if (loading) {
    return (
      <ItineraryLayout isLoading={true}>
        <div className="itin-loading-overlay">
          <div className="loading-spinner" />
          <p>Loading your personalized itinerary...</p>
        </div>
      </ItineraryLayout>
    );
  }
  
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
            // Trigger booking modal via parent app
            window.dispatchEvent(new CustomEvent('open-booking', { detail: tour }));
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