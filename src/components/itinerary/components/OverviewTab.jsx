import React from 'react';
import { Calendar, MapPin, Users, Car, Utensils, Star, ShieldCheck, Clock, CheckCircle2, MapPin as MapPinIcon, Send, Share2, FileSpreadsheet, Printer, Download, QrCode } from 'lucide-react';
import './styles/OverviewTab.css';

export default function OverviewTab({
  tour,
  enrichedItinerary,
  formatPrice,
  activeDay,
  onDayChange
}) {
  if (!tour) return null;
  
  const totalDays = enrichedItinerary?.length || 0;
  const totalStops = enrichedItinerary?.reduce((acc, day) => acc + (day.stops?.length || 0), 0) || 0;
  const totalDistance = enrichedItinerary?.reduce((acc, day) => {
    const distStr = day.travelDistance || '0 km';
    const num = parseFloat(distStr.match(/(\d+)/)?.[0] || '0');
    return acc + num;
  }, 0) || 0;
  
  const highlights = tour.highlights || [];
  const inclusions = tour.inclusions || [];
  const exclusions = tour.exclusions || [];
  
  const dayStats = enrichedItinerary?.map(day => ({
    day: day.day,
    title: day.title,
    stops: day.stops?.length || 0,
    distance: day.travelDistance,
    summary: day.summary
  })) || [];
  
  return (
    <div className="overview-tab" data-tab="overview">
      {/* Hero Section */}
      <section className="overview-hero" style={{ backgroundImage: `url(${tour.image})` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badges">
            <span className="badge badge-category">{tour.category}</span>
            <span className="badge badge-region">{tour.region}</span>
            {tour.rating && (
              <span className="badge badge-rating">
                <Star size={12} className="text-amber" /> {tour.rating} ({tour.reviews}+ reviews)
              </span>
            )}
          </div>
          <h1 className="hero-title">{tour.name}</h1>
          <p className="hero-tagline">{tour.tagline}</p>
          
          {/* Quick Stats */}
          <div className="hero-quick-stats">
            <div className="stat-item">
              <Calendar size={16} /> <span>{tour.duration}</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <MapPin size={16} /> <span>{tour.location}</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <Users size={16} /> <span>{totalDays} Days · {totalStops} Experiences</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <Clock size={16} /> <span>~{totalDistance} km Total</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content */}
      <div className="overview-content">
        {/* Trip Summary Card */}
        <section className="summary-section">
          <div className="summary-card glass-panel">
            <div className="summary-header">
              <h2>Trip at a Glance</h2>
              <div className="summary-price">
                <span className="price-label">Starting from</span>
                <span className="price-value">{formatPrice(tour.price)}</span>
                <span className="price-unit">/ person</span>
              </div>
            </div>
            
            <div className="summary-meta">
              <div className="meta-item">
                <MapPinIcon size={16} className="text-amber" />
                <div>
                  <span className="meta-label">Destination</span>
                  <span className="meta-value">{tour.destination || tour.location}</span>
                </div>
              </div>
              <div className="meta-item">
                <Calendar size={16} className="text-aqua" />
                <div>
                  <span className="meta-label">Duration</span>
                  <span className="meta-value">{tour.duration}</span>
                </div>
              </div>
              <div className="meta-item">
                <Users size={16} className="text-lime" />
                <div>
                  <span className="meta-label">Group Type</span>
                  <span className="meta-value">{tour.party || 'Family / Couple'}</span>
                </div>
              </div>
              <div className="meta-item">
                <Car size={16} className="text-purple" />
                <div>
                  <span className="meta-label">Transport</span>
                  <span className="meta-value">{tour.vehicle?.replace('Private Toyota ', '').replace(' (AC)', '') || 'Private AC Car'}</span>
                </div>
              </div>
              <div className="meta-item">
                <Utensils size={16} className="text-emerald" />
                <div>
                  <span className="meta-label">Meals</span>
                  <span className="meta-value">{tour.dietary || 'Pure Vegetarian'}</span>
                </div>
              </div>
              <div className="meta-item">
                <Star size={16} className="text-gold" />
                <div>
                  <span className="meta-label">Stay</span>
                  <span className="meta-value">{tour.stayTier || '4★ Deluxe'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Highlights */}
        {highlights.length > 0 && (
          <section className="highlights-section">
            <h2 className="section-title">
              <CheckCircle2 size={20} className="text-emerald" />
              Tour Highlights
            </h2>
            <div className="highlights-grid">
              {highlights.map((h, idx) => (
                <div key={idx} className="highlight-card glass-card">
                  <div className="highlight-icon">
                    <CheckCircle2 size={20} className="text-emerald" />
                  </div>
                  <p>{h}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Day-by-Day Summary */}
        {dayStats.length > 0 && (
          <section className="day-summary-section">
            <div className="section-header">
              <h2 className="section-title">
                <Calendar size={20} className="text-amber" />
                Day-by-Day Overview
              </h2>
              <p className="section-subtitle">Click any day to view detailed schedule</p>
            </div>
            
            <div className="day-summary-list">
              {dayStats.map(day => (
                <button
                  key={day.day}
                  className={`day-summary-card ${activeDay === day.day ? 'active' : ''}`}
                  onClick={() => onDayChange(day.day)}
                >
                  <div className="day-summary-header">
                    <span className="day-number-badge">Day {day.day}</span>
                    <h3 className="day-summary-title">{day.title}</h3>
                  </div>
                  <div className="day-summary-meta">
                    <span className="meta-chip">
                      <MapPinIcon size={12} /> {day.stops} stops
                    </span>
                    <span className="meta-chip">
                      <Clock size={12} /> {day.distance}
                    </span>
                  </div>
                  {day.summary && (
                    <p className="day-summary-desc">{day.summary}</p>
                  )}
                  <span className="day-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}
        
        {/* Inclusions & Exclusions */}
        <section className="inc-exc-section">
          <div className="inc-exc-grid">
            <div className="inc-box glass-card">
              <h3 className="box-title">
                <CheckCircle2 size={16} className="text-emerald" />
                What's Included
              </h3>
              <ul>
                {inclusions.map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={14} className="text-emerald" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="exc-box glass-card">
              <h3 className="box-title">
                <ShieldCheck size={16} className="text-amber" />
                What's Not Included
              </h3>
              <ul>
                {exclusions.map((item, idx) => (
                  <li key={idx}>
                    <ShieldCheck size={14} className="text-amber" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        
        {/* Trust Indicators */}
        <section className="trust-section">
          <h2 className="section-title">
            <ShieldCheck size={20} className="text-amber" />
            Comfort Journey Promise
          </h2>
          <div className="trust-grid">
            {[
              { icon: ShieldCheck, label: '100% Private Tours', desc: 'Dedicated vehicle & driver for your group only' },
              { icon: Star, label: 'Verified 4★/5★ Stays', desc: 'Handpicked hotels with quality guarantee' },
              { icon: Utensils, label: 'Pure Veg & Jain Meals', desc: 'Pre-arranged at verified restaurants' },
              { icon: MapPinIcon, label: '24/7 Trip Manager', desc: 'WhatsApp & phone support throughout' },
            ].map((item, idx) => (
              <div key={idx} className="trust-card glass-card">
                <div className="trust-icon">
                  <item.icon size={24} className="text-amber" />
                </div>
                <h4>{item.label}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}