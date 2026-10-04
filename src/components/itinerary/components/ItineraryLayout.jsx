import React from 'react';
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
  children
}) {
  return (
    <div className="itin-page-root" data-active-tab={activeTab}>
      {/* Top Header */}
      <header className="itin-header" role="banner">
        <div className="header-left">
          <button 
            className="back-btn" 
            onClick={() => window.history.back()}
            aria-label="Back to tour details"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
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
              { id: 'overview', label: 'Overview', icon: '📋' },
              { id: 'itinerary', label: 'Itinerary', icon: '📅' },
              { id: 'map', label: 'Map', icon: '🗺️' }
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="itin-main" role="main">
        {isLoading ? (
          <div className="itin-loading-overlay">
            <div className="loading-spinner" />
            <p>Loading your personalized itinerary...</p>
          </div>
        ) : (
          <>
            <div id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" hidden={activeTab !== 'overview'}>
              {activeTab === 'overview' && tabContent}
            </div>
            <div id="panel-itinerary" role="tabpanel" aria-labelledby="tab-itinerary" hidden={activeTab !== 'itinerary'}>
              {activeTab === 'itinerary' && tabContent}
            </div>
            <div id="panel-map" role="tabpanel" aria-labelledby="tab-map" hidden={activeTab !== 'map'}>
              {activeTab === 'map' && tabContent}
            </div>
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
  );
}