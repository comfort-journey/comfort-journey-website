import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import '../styles/ai-planner.css';

export default function AIPlannerLayout({
  isMobile,
  isTablet,
  isDesktop,
  layoutMode,
  mobileActiveTab = 'itinerary',
  onMobileTabChange,
  totalDays = 7,
  onBackToHome,
  onOpenQuote,
  leftPanel,
  rightPanel,
  bottomActionBar,
  floatingAIButton,
  chatPanel,
  customizeSheet,
  socialCardModal,
  exportMenu
}) {
  return (
    <div className={`ai-planner-root ${layoutMode}`} data-mobile={isMobile} data-tablet={isTablet} data-desktop={isDesktop}>
      {/* Top Header Bar */}
      <header className="planner-header" role="banner">
        <div className="header-left">
          <div className="brand-group">
            <div className="mascot-avatar">
              <img 
                src="https://comfortjourney.com/mascot-default.png" 
                alt="Comfy" 
                className="mascot-img"
                onError={(e) => { e.currentTarget.src = '/mascot-default.png'; }}
              />
              <span className="online-indicator" aria-hidden="true" />
            </div>
            <div className="brand-info">
              <div className="est-tag">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/><path d="M12 6v6l4 2"/></svg>
                <span>COMFORT JOURNEY · EST. 1992</span>
              </div>
              <h1 className="planner-title">Comfy.ai <span className="text-amber">Travel Planner</span></h1>
              <p className="planner-subtitle hidden-mobile">
                <span className="status-dot" aria-hidden="true" />
                Live Map & Route Itinerary · Verified Stays & Private Cars
              </p>
            </div>
          </div>
        </div>
        
        <div className="header-right">
          {onBackToHome && (
            <button 
              type="button" 
              onClick={onBackToHome}
              className="hotline-pill back-to-site-pill"
              aria-label="Back to Main Website"
              style={{ background: 'rgba(255, 255, 255, 0.08)', cursor: 'pointer', border: '1px solid rgba(255, 255, 255, 0.15)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              <span>Back to Site</span>
            </button>
          )}
          <a 
            href="https://wa.me/918770403315" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hotline-pill"
            aria-label="Chat on WhatsApp"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span className="hidden-mobile">+91 8770403315</span>
          </a>
        </div>
      </header>

      {/* Mobile-Only Segmented Control */}
      {isMobile && (
        <div className="planner-mobile-tabs" role="tablist" aria-label="View toggle">
          <button
            type="button"
            className={`mobile-tab-btn ${mobileActiveTab === 'itinerary' ? 'active' : ''}`}
            onClick={() => onMobileTabChange?.('itinerary')}
            role="tab"
            aria-selected={mobileActiveTab === 'itinerary'}
          >
            <Calendar size={14} />
            <span>📋 Itinerary ({totalDays} Days)</span>
          </button>
          <button
            type="button"
            className={`mobile-tab-btn ${mobileActiveTab === 'map' ? 'active' : ''}`}
            onClick={() => onMobileTabChange?.('map')}
            role="tab"
            aria-selected={mobileActiveTab === 'map'}
          >
            <MapPin size={14} />
            <span>🗺️ Interactive Map</span>
            <span className="live-dot" />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="planner-main" role="main">
        {isMobile ? (
          <div className="planner-mobile-view">
            {mobileActiveTab === 'itinerary' ? (
              <div className="planner-left-column mobile-full">
                {leftPanel}
              </div>
            ) : (
              <div className="planner-right-column mobile-full">
                {rightPanel}
              </div>
            )}
          </div>
        ) : (
          <div className={`planner-split-view ${layoutMode === 'tablet' ? 'tablet-layout' : ''}`}>
            <div className="planner-left-column">
              {leftPanel}
            </div>
            <div className="planner-right-column">
              {rightPanel}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Action Bar */}
      <footer className="planner-footer" role="contentinfo">
        {bottomActionBar}
      </footer>

      {/* Floating AI Button */}
      <div className="floating-ai-container" aria-live="polite">
        {floatingAIButton}
      </div>

      {/* Overlay Modals */}
      <div className="planner-overlays">
        {chatPanel}
        {customizeSheet}
        {socialCardModal}
        {exportMenu}
      </div>

      {/* Mobile-specific: Sheet backdrop */}
      {isMobile && (chatPanel || customizeSheet) && (
        <div className="sheet-backdrop" onClick={() => {}} aria-hidden="true" />
      )}
    </div>
  );
}