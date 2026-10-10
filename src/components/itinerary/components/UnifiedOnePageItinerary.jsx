import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar, MapPin, Users, Car, Utensils, Star, ShieldCheck, 
  Clock, CheckCircle2, ChevronRight, ChevronLeft, Navigation, 
  Sparkles, MessageCircle, Share2, Compass, Check, ArrowRight,
  Route, Map, List, Send, Globe, PhoneCall, ChevronDown
} from 'lucide-react';
import { useCurrency } from '../../../context/CurrencyContext';
import DayTimeline from './DayTimeline';
import MapTab from './MapTab';
import QuickEnquiryCard from './QuickEnquiryCard';
import HeroGalleryMosaic from './HeroGalleryMosaic';
import WeatherMonthlySection from './WeatherMonthlySection';
import TourPoliciesSection from './TourPoliciesSection';
import TourFaqSection from './TourFaqSection';
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
  const { currency, setCurrency, currencies } = useCurrency();
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const currencyMenuRef = useRef(null);

  const [mobileViewMode, setMobileViewMode] = useState('timeline'); // 'timeline' | 'enquiry'
  const dayScrollRef = useRef(null);

  // Close currency dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (currencyMenuRef.current && !currencyMenuRef.current.contains(e.target)) {
        setCurrencyDropdownOpen(false);
      }
    };
    if (currencyDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [currencyDropdownOpen]);

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
      setMobileViewMode('enquiry');
      const box = document.getElementById('quick-enquiry-box');
      if (box) {
        box.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
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

  const handleBookClick = () => {
    if (onBookNow) {
      onBookNow(tour);
    } else {
      window.dispatchEvent(new CustomEvent('open-quick-quote', { detail: { tour } }));
    }
  };

  const handleWhatsAppClick = () => {
    if (onWhatsApp) {
      onWhatsApp();
    } else {
      const msg = encodeURIComponent(
        `Hi Comfort Journey! I'm interested in booking the "${tour.name}" package (${tour.duration}). Please share dates, customized stays, and best pricing!`
      );
      window.open(`https://wa.me/918770403315?text=${msg}`, '_blank');
    }
  };

  return (
    <div className="onepage-itin-root">
      {/* =========================================================================
          SECTION 1: HERO & GALLERY MOSAIC (MATURE, LUXURY, HIGH-CONVERTING)
          ========================================================================= */}
      <section id="overview" className="onepage-hero-mosaic-section">
        <div className="onepage-container">
          {/* Breadcrumb & Badges Bar */}
          <div className="mosaic-header-bar">
            <div className="mosaic-badges-left">
              <span className="hero-badge badge-signature">
                <Sparkles size={13} />
                Comfort Journey Signature Tour
              </span>
              <span className="hero-badge badge-rating">
                <Star size={13} className="star-filled" />
                {tour.rating || '4.95'} ({tour.reviews || '96'}+ Verified Reviews)
              </span>
              <span className="hero-badge badge-custom">
                100% Private & Tailorable
              </span>
            </div>

            {/* Quick Share Trigger */}
            <div className="mosaic-header-actions">
              <button
                type="button"
                className="mosaic-share-quick-btn"
                onClick={onShare}
                title="Share or Export Itinerary"
              >
                <Share2 size={15} />
                <span>Share Dossier</span>
              </button>
            </div>
          </div>

          {/* Tour Title & Headline */}
          <div className="mosaic-title-row">
            <h1 className="mosaic-tour-title">{tour.name}</h1>
            <div className="mosaic-location-tag">
              <MapPin size={16} className="text-amber" />
              <span>{tour.destination || tour.location}</span>
              <span className="loc-sep">•</span>
              <span>{tour.duration} ({totalDays} Days / {Math.max(1, totalDays - 1)} Nights)</span>
            </div>
          </div>

          <p className="mosaic-tour-tagline">
            {cleanDescription(tour.description || tour.tagline) || `Experience ${tour.name} with luxury accommodations, picturesque valleys, and iconic attractions. A perfect blend of relaxation, adventure, and Himalayan elegance awaits.`}
          </p>

          {/* 5-Photo Mosaic Gallery with Lightbox (Thrillophilia Benchmark) */}
          <HeroGalleryMosaic tour={tour} onShare={onShare} />

          {/* Seductive, Mature Pricing & Booking Bar */}
          <div className="mosaic-pricing-conversion-bar">
            <div className="pricing-left-block">
              <div className="pricing-tag-label">ALL-INCLUSIVE PRIVATE PACKAGE</div>
              <div className="pricing-digits-row">
                {originalPrice > currentPrice && (
                  <span className="pricing-strikethrough">{formatPrice(originalPrice)}</span>
                )}
                <span className="pricing-main-amount">{formatPrice(currentPrice)}</span>
                <span className="pricing-unit-text">/ person</span>
                <span className="pricing-discount-badge">SAVE {discountPercent}% OFF</span>
              </div>
              <div className="pricing-guarantees-row">
                <span className="guarantee-pill">✓ Best Price Guarantee</span>
                <span className="guarantee-pill">✓ Instant Booking Voucher</span>
                <span className="guarantee-pill">✓ Dedicated Private Chauffeur</span>
              </div>
            </div>

            {/* Currency Selector & Booking Action Buttons */}
            <div className="pricing-actions-right">
              {/* Currency Selector Dropdown */}
              <div className="currency-selector-box" ref={currencyMenuRef}>
                <button
                  type="button"
                  className="currency-dropdown-toggle-btn"
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  title="Switch Display Currency"
                >
                  <Globe size={15} />
                  <span>{currency} ({currencies[currency]?.symbol})</span>
                  <ChevronDown size={14} />
                </button>

                {currencyDropdownOpen && (
                  <div className="currency-dropdown-popover">
                    <div className="dropdown-title">Select Currency</div>
                    {Object.keys(currencies).map((currCode) => {
                      const c = currencies[currCode];
                      return (
                        <button
                          key={currCode}
                          type="button"
                          className={`currency-option-item ${currency === currCode ? 'active' : ''}`}
                          onClick={() => {
                            setCurrency(currCode);
                            setCurrencyDropdownOpen(false);
                          }}
                        >
                          <span className="curr-sym">{c.symbol}</span>
                          <span className="curr-code">{currCode}</span>
                          <span className="curr-name">{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* WhatsApp Specialist Button */}
              <button
                type="button"
                className="btn-action-whatsapp"
                onClick={handleWhatsAppClick}
                title="Chat with Tour Specialist"
              >
                <MessageCircle size={17} />
                <span>Chat Specialist</span>
              </button>

              {/* Instant Book Now Button */}
              <button
                type="button"
                className="btn-action-book-primary"
                onClick={handleBookClick}
              >
                <span>Book This Tour</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: TRIP AT A GLANCE (KEY FACTS)
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
          SECTION 3: SCHEDULE & COMPANION (DAY-BY-DAY TIMELINE + MAP & ENQUIRY)
          ========================================================================= */}
      <section id="itinerary-plan" className="onepage-schedule-section">
        <div className="onepage-container">
          {/* Section Heading */}
          <div className="schedule-header-row">
            <div>
              <span className="section-eyebrow">Handcrafted Day-by-Day</span>
              <h2 className="section-heading">Curated Daily Itinerary</h2>
              <p className="section-subtext">
                Private chauffeur transfers, scenic viewpoints, and authentic heritage experiences curated for relaxed pacing.
              </p>
            </div>

            {/* Mobile Switcher (Timeline vs Enquiry Form) */}
            <div className="mobile-view-toggle">
              <button
                type="button"
                className={`toggle-btn ${mobileViewMode === 'timeline' ? 'active' : ''}`}
                onClick={() => setMobileViewMode('timeline')}
              >
                <List size={16} />
                <span>Day Timeline</span>
              </button>
              <button
                type="button"
                className={`toggle-btn ${mobileViewMode === 'enquiry' ? 'active' : ''}`}
                onClick={() => setMobileViewMode('enquiry')}
              >
                <Send size={16} />
                <span>Enquire Now</span>
              </button>
            </div>
          </div>

          {/* Interactive Day Horizontal Pill Bar */}
          <div className="day-selector-track" ref={dayScrollRef}>
            {enrichedItinerary.map((d) => {
              const isActive = d.day === activeDay;
              return (
                <button
                  key={d.day}
                  type="button"
                  id={`day-pill-${d.day}`}
                  className={`day-pill ${isActive ? 'active' : ''}`}
                  onClick={() => onDayChange(d.day)}
                >
                  <span className="day-pill-num">Day {d.day}</span>
                  <span className="day-pill-title" title={d.title}>
                    {d.title?.replace(new RegExp(`^Day\\s*${d.day}\\s*[:\\-]\\s*`, 'i'), '') || `Day ${d.day}`}
                  </span>
                  {isActive && <span className="active-dot" />}
                </button>
              );
            })}
          </div>

          {/* Two-Column Grid: Left Day Timeline (65%) + Right Sticky Enquiry Form (35%) */}
          <div className="schedule-grid">
            {/* Left Column: Day Timeline */}
            <div className={`schedule-timeline-col ${mobileViewMode === 'enquiry' ? 'hidden-on-mobile' : ''}`}>
              <div className="day-banner-card active-day-banner">
                <div className="day-banner-top">
                  <span className="day-badge-chip">Day {currentDayData.day} of {totalDays}</span>
                  <span className="day-stops-count-tag">{currentDayData.stops?.length || 0} Curated Waypoints</span>
                </div>
                <h3 className="day-banner-title">
                  {currentDayData.title?.replace(new RegExp(`^Day\\s*${currentDayData.day}\\s*[:\\-]\\s*`, 'i'), '')}
                </h3>
                {currentDayData.desc && (
                  <p className="day-banner-desc">{currentDayData.desc}</p>
                )}
              </div>

              {/* Day Stops Timeline */}
              <DayTimeline
                dayData={currentDayData}
                selectedStop={selectedStop}
                onStopSelect={onStopSelect}
              />

              {/* Day Navigation Controls */}
              {totalDays > 1 && (
                <div className="day-bottom-nav">
                  <button
                    type="button"
                    className="day-nav-btn prev"
                    onClick={() => onDayChange(Math.max(1, activeDay - 1))}
                    disabled={activeDay === 1}
                  >
                    <ChevronLeft size={18} />
                    <div className="nav-btn-text text-left">
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

            {/* Right Column: Sticky Enquiry & Customization Form (Thrillophilia Benchmark) */}
            <div className={`schedule-enquiry-col ${mobileViewMode === 'timeline' ? 'hidden-on-mobile' : ''}`}>
              <div className="sticky-enquiry-wrapper" id="quick-enquiry-box">
                <QuickEnquiryCard tour={tour} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3B: INTERACTIVE ROUTE & WAYPOINTS MAP (#tour-map)
          ========================================================================= */}
      <section id="tour-map" className="onepage-map-section">
        <div className="onepage-container">
          <div className="map-section-header">
            <span className="section-eyebrow">Visual Journey</span>
            <h2 className="section-heading">Interactive Tour Route & Map</h2>
            <p className="section-subtext">
              Trace your private vehicle routes, key scenic halts, and destinations across {tour.destination || tour.location}. Use manual controls to pan and zoom.
            </p>
          </div>

          <div className="standalone-map-wrapper">
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
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: INCLUSIONS, EXCLUSIONS & 4 VIP GUARANTEES (#inclusions)
          ========================================================================= */}
      <section id="inclusions" className="onepage-inclusions-section">
        <div className="onepage-container">
          <div className="inclusions-heading-box">
            <span className="section-eyebrow">Transparent Value</span>
            <h2 className="section-heading">Package Inclusions & Exclusions</h2>
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

      {/* =========================================================================
          SECTION 5: MONTHLY WEATHER & BEST TIME TO VISIT (STIPPL.IO BENCHMARK)
          ========================================================================= */}
      <section className="onepage-container">
        <WeatherMonthlySection tour={tour} />
      </section>

      {/* =========================================================================
          SECTION 6: MANDATORY TRAVELER POLICIES (CONFIRMATION, CANCEL, REFUND, ETC)
          ========================================================================= */}
      <section className="onepage-container">
        <TourPoliciesSection tour={tour} />
      </section>

      {/* =========================================================================
          SECTION 7: UNIQUE TOUR PACKAGE FAQS
          ========================================================================= */}
      <section className="onepage-container">
        <TourFaqSection tour={tour} />
      </section>
    </div>
  );
}
