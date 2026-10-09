import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar, MapPin, Users, Car, Utensils, Star, ShieldCheck, 
  Clock, CheckCircle2, ChevronRight, ChevronLeft, Navigation, 
  Sparkles, MessageCircle, Share2, Compass, Check, ArrowRight,
  Route, Map, List, Send
} from 'lucide-react';
import DayTimeline from './DayTimeline';
import MapTab from './MapTab';
import QuickEnquiryCard from './QuickEnquiryCard';
import './styles/UnifiedOnePageItinerary.css';

export default function UnifiedOnePageItinerary({
  tour,
  enrichedItinerary = [],
  activeDay = 1,
  onDayChange,
  selectedStop,
  onStopSelect,
  formatPrice,
  routeMode = 'day',
  onRouteModeChange,
  mapStyle = 'streets',
  onMapStyleChange,
  setMapInstance,
  onBookNow,
  onWhatsApp,
  onShare
}) {
  const [mobileViewMode, setMobileViewMode] = useState('timeline'); // 'timeline' | 'map' | 'enquiry'
  const [companionTab, setCompanionTab] = useState('map'); // 'map' | 'enquiry'
  const dayScrollRef = useRef(null);

  if (!tour || !enrichedItinerary?.length) return null;

  const totalDays = enrichedItinerary.length;
  const currentDayData = enrichedItinerary.find(d => d.day === activeDay) || enrichedItinerary[0];

  // Scroll active day pill into view
  useEffect(() => {
    if (!dayScrollRef.current) return;
    const activeBtn = dayScrollRef.current.querySelector('.day-pill.active');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeDay]);

  // Listen to open-enquiry-tab event triggered by sticky bar or CTA buttons
  useEffect(() => {
    const handleOpenEnquiry = () => {
      setCompanionTab('enquire');
      setMobileViewMode('enquiry');
    };
    window.addEventListener('open-enquiry-tab', handleOpenEnquiry);
    return () => window.removeEventListener('open-enquiry-tab', handleOpenEnquiry);
  }, []);

  const totalStops = enrichedItinerary.reduce((acc, d) => acc + (d.stops?.length || 0), 0);

  // Check if tour specifically has custom highlights from CMS
  const hasCustomHighlights = tour.highlights && Array.isArray(tour.highlights) && tour.highlights.length > 0;
  const highlights = hasCustomHighlights ? tour.highlights : [];

  const inclusions = tour.inclusions || [
    'Private AC vehicle for all transfers and daily sightseeing',
    'Verified 4★ Deluxe accommodation with mountain valley view',
    'Daily breakfast and dinner at hotel restaurants',
    'All driver allowances, fuel, toll taxes, and parking fees',
    'Sightseeing as mentioned in the day-by-day itinerary',
    '24/7 dedicated Comfort Journey on-trip concierge assistance'
  ];

  const exclusions = tour.exclusions || [
    'Airfare / Train tickets to and from destination',
    'Monuments entry fees, camera tickets, and adventure activity fees',
    'Personal expenses like laundry, minibar, telephone charges, and tips',
    'Travel insurance and medical emergency coverage',
    'Any meals or services not specifically mentioned in inclusions'
  ];

  const currentPrice = tour.price || 0;
  let rawOrig = tour.origPrice || tour.originalPrice;
  if (!rawOrig || rawOrig <= currentPrice || rawOrig > currentPrice * 2.2) {
    rawOrig = Math.round(currentPrice * 1.25);
  }
  const originalPrice = rawOrig;
  const discountPercent = Math.max(10, Math.min(35, Math.round(((originalPrice - currentPrice) / originalPrice) * 100)));

  const cleanDescription = (text) => {
    if (!text) return '';
    return text
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]*>/g, '')
      .trim();
  };

  return (
    <div className="onepage-itin-root">
      {/* =========================================================================
          SECTION 1: HERO (FULL-WIDTH SCENIC BACKGROUND IMAGE - NO DUPLICATE PILLS)
          ========================================================================= */}
      <section 
        id="overview" 
        className="onepage-hero-panoramic"
        style={{ backgroundImage: `url(${tour.image})` }}
      >
        <div className="onepage-hero-scenic-overlay" />

        <div className="onepage-hero-inner">
          <div className="onepage-hero-text-block">
            {/* Top Badges */}
            <div className="onepage-badges-row">
              <span className="hero-badge badge-signature">
                <Sparkles size={12} />
                Comfort Journey Signature Tour
              </span>
              <span className="hero-badge badge-rating">
                <Star size={12} className="star-filled" />
                {tour.rating || '4.95'} ({tour.reviews || '96'}+ Verified Reviews)
              </span>
              <span className="hero-badge badge-custom">
                100% Customizable
              </span>
            </div>

            {/* Tour Title */}
            <h1 className="onepage-hero-title">{tour.name}</h1>
            
            {/* Description */}
            <p className="onepage-hero-description">
              {cleanDescription(tour.description || tour.tagline) || `Experience ${tour.name} with luxury accommodations, picturesque valleys, and iconic attractions. A perfect blend of relaxation, adventure, and Himalayan elegance awaits.`}
            </p>

            {/* Prominent Hero Pricing Showcase */}
            <div className="hero-pricing-showcase">
              <div className="pricing-showcase-row">
                <span className="pill-from">Starting From</span>
                {originalPrice > currentPrice && (
                  <span className="pill-orig">{formatPrice(originalPrice)}</span>
                )}
                <span className="pill-curr">{formatPrice(currentPrice)}</span>
                <span className="pill-unit">/ person</span>
                <span className="pill-save">Save {discountPercent}%</span>
              </div>
              <div className="pricing-showcase-perks">
                <span className="perk-highlight">✓ All-Inclusive</span>
                <span className="perk-dot">•</span>
                <span>Verified 4★ Deluxe Stays</span>
                <span className="perk-dot">•</span>
                <span>Zero Hidden Fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: TRIP AT A GLANCE (KEY FACTS - SINGLE SOURCE OF TRUTH)
          ========================================================================= */}
      <section className="onepage-glance-section">
        <div className="onepage-container">
          <div className="glance-grid">
            <div className="glance-card">
              <div className="glance-icon-box text-amber">
                <MapPin size={22} />
              </div>
              <div className="glance-details">
                <span className="glance-label">Destination</span>
                <span className="glance-value">{tour.destination || tour.location}</span>
              </div>
            </div>

            <div className="glance-card">
              <div className="glance-icon-box text-aqua">
                <Calendar size={22} />
              </div>
              <div className="glance-details">
                <span className="glance-label">Duration</span>
                <span className="glance-value">{tour.duration} ({totalDays} Days)</span>
              </div>
            </div>

            <div className="glance-card">
              <div className="glance-icon-box text-lime">
                <Users size={22} />
              </div>
              <div className="glance-details">
                <span className="glance-label">Travel Style</span>
                <span className="glance-value">{tour.party || 'Private Family / Couple'}</span>
              </div>
            </div>

            <div className="glance-card">
              <div className="glance-icon-box text-purple">
                <Car size={22} />
              </div>
              <div className="glance-details">
                <span className="glance-label">Vehicle</span>
                <span className="glance-value">{tour.vehicle?.replace('Private Toyota ', '').replace(' (AC)', '') || 'Private AC Cab'}</span>
              </div>
            </div>

            <div className="glance-card">
              <div className="glance-icon-box text-emerald">
                <Utensils size={22} />
              </div>
              <div className="glance-details">
                <span className="glance-label">Meals</span>
                <span className="glance-value">{tour.dietary || 'Breakfast & Dinner Included'}</span>
              </div>
            </div>

            <div className="glance-card">
              <div className="glance-icon-box text-gold">
                <Star size={22} />
              </div>
              <div className="glance-details">
                <span className="glance-label">Accommodation</span>
                <span className="glance-value">{tour.stayTier || '4★ Deluxe Resort'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: DAY-BY-DAY ITINERARY WITH INTEGRATED MAP & QUICK ENQUIRY (#itinerary-plan)
          ========================================================================= */}
      <section id="itinerary-plan" className="onepage-schedule-section">
        <div className="onepage-container">
          <div className="schedule-header">
            <div className="schedule-header-text">
              <span className="section-eyebrow">Complete Day-by-Day Journey</span>
              <h2 className="section-heading">Detailed Travel Itinerary & Route Map</h2>
              <p className="section-subtext">
                Browse through each day's curated schedule, transfer details, landmarks, and live interactive route map side-by-side.
              </p>
            </div>

            {/* Mobile View Toggle Switch */}
            <div className="mobile-view-switch" role="tablist" aria-label="Toggle mobile view">
              <button
                type="button"
                className={`switch-btn ${mobileViewMode === 'timeline' ? 'active' : ''}`}
                onClick={() => setMobileViewMode('timeline')}
              >
                <List size={15} />
                <span>Schedule ({currentDayData?.stops?.length || 0})</span>
              </button>
              <button
                type="button"
                className={`switch-btn ${mobileViewMode === 'map' ? 'active' : ''}`}
                onClick={() => setMobileViewMode('map')}
              >
                <Map size={15} />
                <span>Route Map</span>
              </button>
              <button
                type="button"
                className={`switch-btn ${mobileViewMode === 'enquiry' ? 'active' : ''}`}
                onClick={() => setMobileViewMode('enquiry')}
              >
                <Send size={15} />
                <span>Enquire</span>
              </button>
            </div>
          </div>

          {/* Day Selector Pills Bar */}
          <nav className="onepage-day-selector" role="tablist" aria-label="Tour Days Navigation">
            <button
              type="button"
              className="day-nav-arrow prev"
              onClick={() => onDayChange(Math.max(1, activeDay - 1))}
              disabled={activeDay === 1}
              aria-label="Previous day"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="day-pills-row" ref={dayScrollRef}>
              {enrichedItinerary.map((day) => {
                const isActive = activeDay === day.day;
                return (
                  <button
                    key={day.day}
                    role="tab"
                    aria-selected={isActive}
                    className={`day-pill ${isActive ? 'active' : ''} ${day.day < activeDay ? 'completed' : ''}`}
                    onClick={() => {
                      onRouteModeChange?.('day');
                      onDayChange(day.day);
                    }}
                  >
                    <span className="pill-day-num">Day {day.day}</span>
                    <span className="pill-stops-num">{day.stops?.length || 0} stops</span>
                  </button>
                );
              })}

              {/* All Days Route Pill */}
              <button
                type="button"
                className={`day-pill pill-all-days ${routeMode === 'all' ? 'active' : ''}`}
                onClick={() => onRouteModeChange?.('all')}
                title="View full tour route on map"
              >
                <Route size={14} />
                <span className="pill-day-num">Full Route</span>
                <span className="pill-stops-num">{totalStops} stops</span>
              </button>
            </div>

            <button
              type="button"
              className="day-nav-arrow next"
              onClick={() => onDayChange(Math.min(totalDays, activeDay + 1))}
              disabled={activeDay === totalDays}
              aria-label="Next day"
            >
              <ChevronRight size={18} />
            </button>
          </nav>

          {/* Desktop Two-Column Split / Mobile Responsive View */}
          <div className={`schedule-split-layout mode-${mobileViewMode}`}>
            {/* Left Column: Timeline Stops */}
            <div className="schedule-timeline-col">
              {/* Active Day Banner */}
              {currentDayData && (
                <div className="day-banner-card">
                  <div className="day-banner-top">
                    <span className="day-badge-chip">
                      <Calendar size={13} />
                      Day {activeDay} of {totalDays}
                    </span>
                    <div className="day-meta-tags">
                      {currentDayData.travelDistance && (
                        <span className="meta-tag">
                          <Navigation size={12} />
                          {currentDayData.travelDistance}
                        </span>
                      )}
                      {currentDayData.travelTime && (
                        <span className="meta-tag">
                          <Clock size={12} />
                          {currentDayData.travelTime}
                        </span>
                      )}
                      <span className="meta-tag highlight">
                        <MapPin size={12} />
                        {currentDayData.stops?.length || 0} Experiences
                      </span>
                    </div>
                  </div>

                  <h3 className="day-banner-title">{currentDayData.title}</h3>

                  {(currentDayData.desc || currentDayData.summary) && (
                    <p className="day-banner-desc">
                      {currentDayData.desc || currentDayData.summary}
                    </p>
                  )}

                  {/* Day Transport note */}
                  {currentDayData.transport && (
                    <div className="day-banner-transport">
                      <Car size={15} className="text-cyan" />
                      <span>
                        Transport: {typeof currentDayData.transport === 'string' 
                          ? currentDayData.transport 
                          : (currentDayData.transport.mode || 'Dedicated Private AC Chauffeur Cab')}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Day Timeline Component */}
              <DayTimeline
                dayData={currentDayData}
                selectedStop={selectedStop}
                onStopSelect={onStopSelect}
              />

              {/* Bottom Prev / Next Day Navigator */}
              {enrichedItinerary.length > 1 && (
                <div className="day-bottom-nav">
                  <button
                    type="button"
                    className="day-nav-btn prev"
                    onClick={() => onDayChange(Math.max(1, activeDay - 1))}
                    disabled={activeDay === 1}
                  >
                    <ChevronLeft size={18} />
                    <div className="nav-btn-text">
                      <span className="nav-btn-sub">Previous</span>
                      <span className="nav-btn-title">
                        {activeDay > 1 ? `Day ${activeDay - 1}` : 'Start'}
                      </span>
                    </div>
                  </button>

                  <div className="day-nav-status">
                    <span className="status-current">{activeDay}</span>
                    <span className="status-sep">/</span>
                    <span className="status-total">{totalDays}</span>
                  </div>

                  <button
                    type="button"
                    className="day-nav-btn next"
                    onClick={() => onDayChange(Math.min(totalDays, activeDay + 1))}
                    disabled={activeDay === totalDays}
                  >
                    <div className="nav-btn-text text-right">
                      <span className="nav-btn-sub">Next</span>
                      <span className="nav-btn-title">
                        {activeDay < totalDays ? `Day ${activeDay + 1}` : 'Finish'}
                      </span>
                    </div>
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Companion (Route Map & Quick Enquiry Tabs) */}
            <div className="schedule-map-col">
              <div className="sticky-companion-card">
                {/* Switcher Header: Map vs Enquiry */}
                <div className="companion-nav-tabs">
                  <button
                    type="button"
                    className={`companion-tab ${companionTab === 'map' ? 'active' : ''}`}
                    onClick={() => setCompanionTab('map')}
                  >
                    <Map size={15} />
                    <span>Interactive Map</span>
                  </button>
                  <button
                    type="button"
                    className={`companion-tab ${companionTab === 'enquire' ? 'active' : ''}`}
                    onClick={() => setCompanionTab('enquire')}
                  >
                    <Send size={15} />
                    <span>Quick Enquiry</span>
                    <span className="tab-fast-badge">Fast</span>
                  </button>
                </div>

                {/* Tab 1: Interactive Map */}
                {companionTab === 'map' && (
                  <div className="companion-map-view">
                    <div className="companion-map-frame">
                      <MapTab
                        tour={tour}
                        enrichedItinerary={enrichedItinerary}
                        activeDay={activeDay}
                        routeMode={routeMode}
                        selectedStop={selectedStop}
                        currentDayStops={currentDayData?.stops || []}
                        mapStyle={mapStyle}
                        setMapInstance={setMapInstance}
                        onDayChange={onDayChange}
                        onStopSelect={onStopSelect}
                        onRouteModeChange={onRouteModeChange}
                        onMapStyleChange={onMapStyleChange}
                      />
                    </div>
                    {/* Switch Prompt below Map */}
                    <div className="companion-enquire-prompt">
                      <span>Planning special dates or custom stays?</span>
                      <button 
                        type="button" 
                        className="btn-prompt-switch"
                        onClick={() => setCompanionTab('enquire')}
                      >
                        <Send size={13} />
                        <span>Quick Enquiry Form</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 2: Quick Enquiry Form */}
                {companionTab === 'enquire' && (
                  <div className="companion-enquiry-view">
                    <QuickEnquiryCard tour={tour} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: INCLUSIONS, EXCLUSIONS & COMFORT JOURNEY PROMISE (#inclusions)
          ========================================================================= */}
      <section id="inclusions" className="onepage-inclusions-section">
        <div className="onepage-container">
          <div className="inclusions-heading-box">
            <span className="section-eyebrow">Transparent Pricing & Value</span>
            <h2 className="section-heading">Package Inclusions & Comfort Journey Promise</h2>
            <p className="section-subtext">
              Zero hidden costs, verified deluxe hotels, and courteous dedicated mountain chauffeurs.
            </p>
          </div>

          <div className="inclusions-cards-grid">
            {/* What is Included */}
            <div className="inclusions-card included">
              <div className="card-header-bar included">
                <CheckCircle2 size={20} />
                <h3>Included in Your Package</h3>
              </div>
              <ul className="inclusions-list">
                {inclusions.map((item, idx) => (
                  <li key={idx} className="inclusion-item included">
                    <Check size={16} className="check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What is Excluded */}
            <div className="inclusions-card excluded">
              <div className="card-header-bar excluded">
                <ShieldCheck size={20} />
                <h3>Not Included (Transparent Notes)</h3>
              </div>
              <ul className="inclusions-list">
                {exclusions.map((item, idx) => (
                  <li key={idx} className="inclusion-item excluded">
                    <span className="cross-icon">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Optional Highlights (Only shown if specified in CMS) */}
          {hasCustomHighlights && (
            <div className="highlights-box-inclusions">
              <div className="highlights-header">
                <Sparkles size={20} className="text-amber" />
                <h3 className="highlights-title">What Makes This Tour Special</h3>
              </div>
              <div className="highlights-grid">
                {highlights.map((item, idx) => (
                  <div key={idx} className="highlight-item">
                    <CheckCircle2 size={16} className="highlight-check" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* The Comfort Journey 4 Pillars */}
          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon-box text-amber">
                <ShieldCheck size={24} />
              </div>
              <h4>Verified Hotels Only</h4>
              <p>Personally audited 4★ & 5★ boutique mountain resorts with verified reviews, heaters & hygiene.</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box text-cyan">
                <Car size={24} />
              </div>
              <h4>Experienced Chauffeurs</h4>
              <p>Courteous, hill-certified private chauffeurs dedicated exclusively to your group throughout the tour.</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box text-emerald">
                <Sparkles size={24} />
              </div>
              <h4>Zero Hidden Charges</h4>
              <p>All toll taxes, parking, driver night allowances, state permits, and fuel charges are fully included.</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box text-purple">
                <MessageCircle size={24} />
              </div>
              <h4>24/7 Trip Concierge</h4>
              <p>A dedicated holiday manager is on standby via WhatsApp & phone call from arrival until your safe departure.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
