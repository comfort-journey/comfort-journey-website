import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronUp, ChevronDown, Maximize, Minimize, Share2, ChevronLeft } from 'lucide-react';
import './styles/ItineraryLayout.css';

export default function ItineraryLayout({
  tour,
  isLoading = false,
  activeTab,
  onTabChange,
  tabContent,
  stickyBookingBar,
  stopDrawer,
  shareMenu,
  children,
  activeDay,
  onDayChange,
  mapRef,
  onMapReady,
  routeMode,
  onRouteModeChange,
  mapStyle,
  onMapStyleChange,
  enrichedItinerary,
  currentDayStops,
  currentDayRoute,
  fullTourRoute,
  selectedStop,
  onStopSelect
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(false);
  const [mapCollapsed, setMapCollapsed] = useState(false);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll spy for active day detection
  useEffect(() => {
    if (isMobile || !leftRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const day = parseInt(entry.target.dataset.day, 10);
            if (day && day !== activeDay) {
              onDayChange(day);
            }
          }
        });
      },
      {
        root: leftRef.current,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.15,
      }
    );

    const dayElements = leftRef.current.querySelectorAll('[data-day]');
    dayElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeDay, isMobile]);

  // Sync map viewport when activeDay changes
  useEffect(() => {
    if (mapRef.current && enrichedItinerary) {
      const dayData = enrichedItinerary?.find((d) => d.day === activeDay);
      if (dayData?.bounds) {
        mapRef.current.fitBounds(dayData.bounds, { padding: [40, 40], duration: 1.2 });
      }
    }
  }, [activeDay, mapRef, enrichedItinerary]);

  const handleShare = () => {
    window.dispatchEvent(new CustomEvent('open-share-menu'));
  };

  const handleMobileMapToggle = () => setMapCollapsed((c) => !c);
  const handleMapExpand = () => setMapExpanded((e) => !e);
  const handleRouteModeChange = () => setRouteMode((m) => (m === 'day' ? 'full' : 'day'));
  const handleMapStyleChange = (style) => setMapStyle((s) => style);

  return (
    <div className={`itin-page-root ${isMobile ? 'mobile' : ''} ${mapExpanded ? 'map-expanded' : ''} ${mapCollapsed ? 'map-collapsed' : ''}`} data-active-tab={activeTab}>
      {/* Mobile Map Toggle Button (Fixed Bottom) */}
      {isMobile && !mapCollapsed && (
        <button
          className="mobile-map-toggle"
          onClick={handleMobileMapToggle}
          aria-label={mapCollapsed ? 'Show map' : 'Hide map'}
        >
          <MapPin size={22} />
          <span>Map</span>
          <ChevronUp size={18} className={mapCollapsed ? 'collapsed' : ''} />
        </button>
      )}

      {/* Mobile Floating Map Sheet */}
      {isMobile && !mapCollapsed && (
        <div className="mobile-map-sheet" style={{ transform: mapExpanded ? 'translateY(0)' : 'translateY(calc(100% - 120px))' }}>
          <div className="mobile-map-sheet-handle" onClick={handleMapExpand}>
            <span>Map</span>
            <ChevronUp size={20} className={mapExpanded ? 'expanded' : ''} />
          </div>
          <div className="mobile-map-sheet-content" ref={rightRef}>
            {tabContent}
          </div>
        </div>
      )}

      {/* Desktop Split View */}
      <div className="itin-page-root" data-active-tab={activeTab}>
        {/* Top Header */}
        <header className="itin-header" role="banner" ref={headerRef}>
          <div className="header-left">
            <button 
              className="back-btn" 
              onClick={() => window.history.back()}
              aria-label="Back to tour details"
            >
              <ChevronLeft size={20} />
            </button>
            {tour && (
              <div className="tour-breadcrumb">
                <span className="breadcrumb-sep">/</span>
                <span className="breadcrumb-tour">{tour.name}</span>
              </div>
            )}
          </div>
          
          <div className="header-center">
            <nav className="itin-tabs-nav" role="tablist" aria-label="Itinerary sections">
              {[
                { id: 'overview', label: 'Overview', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14"/></svg> },
                { id: 'itinerary', label: 'Itinerary', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
                { id: 'map', label: 'Map', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 24 3 21"/><path d="M9 3v18"/><path d="M21 9H3"/></svg> }
              ].map(tab => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  className={`itin-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => onTabChange(tab.id)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
          
          <div className="header-right">
            <button 
              className="header-action-btn share-btn"
              onClick={() => window.dispatchEvent(new CustomEvent('open-share-menu'))}
              aria-label="Share itinerary"
              title="Share"
            >
              <Share2 size={20} />
            </button>
            {!isMobile && (
              <button 
                className="header-action-btn map-expand-btn"
                onClick={handleMapExpand}
                aria-label={mapExpanded ? 'Collapse map' : 'Expand map'}
                title={mapExpanded ? 'Collapse map' : 'Expand map'}
              >
                {mapExpanded ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            )}
          </div>
        </header>
        
        {/* Main Content - Split View */}
        <main className="itin-main" role="main" ref={isMobile ? null : rightRef}>
          {isLoading ? (
            <div className="itin-loading-overlay">
              <div className="loading-spinner" />
              <p>Loading your personalized itinerary...</p>
            </div>
          ) : (
            <>
              {/* Left Column - Timeline */}
              <div className="itin-timeline-col" ref={leftRef} role="main">
                {activeTab === 'overview' && (
                  <div id="panel-overview" role="tabpanel" aria-labelledby="tab-overview">
                    {tabContent}
                  </div>
                )}
                {activeTab === 'itinerary' && (
                  <div id="panel-itinerary" role="tabpanel" aria-labelledby="tab-itinerary">
                    {tabContent}
                  </div>
                )}
              </div>
              
              {/* Right Column - Map (Desktop Only) */}
              {!isMobile && (
                <aside className={`itin-map-col ${mapExpanded ? 'expanded' : ''}`} ref={rightRef} aria-label="Interactive map">
                  <div className="map-col-header">
                    <h3 className="map-col-title">
                      <MapPin size={18} />
                      {activeTab === 'map' ? 'Full Tour Map' : `Day ${activeDay} Route`}
                    </h3>
                    <div className="map-col-controls">
                      <select
                        className="map-style-select"
                        value={mapStyle}
                        onChange={(e) => handleMapStyleChange(e.target.value)}
                        aria-label="Map style"
                      >
                        <option value="streets">Streets</option>
                        <option value="topo">Terrain</option>
                        <option value="satellite">Satellite</option>
                      </select>
                      <button
                        className="route-mode-btn"
                        onClick={handleRouteModeChange}
                        aria-pressed={routeMode === 'full'}
                        title={routeMode === 'day' ? 'Show full tour route' : 'Show day route only'}
                      >
                        {routeMode === 'day' ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/><path d="M21 21l-6-6m-6 6-6-6"/></svg>
                            <span>Full Tour</span>
                          </>
                        ) : (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/><path d="M21 21l-6-6m-6 6-6-6"/></svg>
                            <span>Day Only</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="map-container" ref={mapRef} onMapReady={onMapReady}>
                    {tabContent}
                  </div>
                  <div className="map-legend">
                    <div className="legend-item">
                      <span className="legend-dot" style={{ backgroundColor: '#0284C7' }} />
                      <span>Transport</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot" style={{ backgroundColor: '#F59E0B' }} />
                      <span>Sightseeing</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot" style={{ backgroundColor: '#10B981' }} />
                      <span>Meal</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot" style={{ backgroundColor: '#8B5CF6' }} />
                      <span>Hotel</span>
                    </div>
                  </div>
                </aside>
              )}
            </>
          )}
        </main>
        
        {/* Sticky Booking Bar */}
        {stickyBookingBar && (
          <footer className="itin-sticky-bar" role="contentinfo">
            {stickyBookingBar}
          </footer>
        )}
        
        {/* Overlays */}
        <div className="itin-overlays">
          {stopDrawer}
          {shareMenu}
        </div>
        
        {/* Mobile backdrop for drawers */}
        {(stopDrawer || shareMenu) && (
          <div className="itin-backdrop" onClick={() => {}} aria-hidden="true" />
        )}
      </div>
    </div>
  );
}