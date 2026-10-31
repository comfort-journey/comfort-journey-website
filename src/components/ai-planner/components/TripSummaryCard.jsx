import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Users, 
  Car, 
  Utensils, 
  Star, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2,
  CalendarDays
} from 'lucide-react';
import './styles/TripSummaryCard.css';

export default function TripSummaryCard({
  tripPlan,
  formatPrice,
  onCustomizeClick,
  onWhatsAppBooking,
  onPacingChange,
  onVehicleChange,
  onStayTierChange,
  onDietaryChange
}) {
  const [isDNAExpanded, setIsDNAExpanded] = useState(false);

  if (!tripPlan) return null;

  const is5Star = (tripPlan.stayTier || '').includes('5★');
  const isJainOrVeg = (tripPlan.dietary || '').toLowerCase().includes('veg') || (tripPlan.dietary || '').toLowerCase().includes('jain');
  const isRelaxed = (tripPlan.pacing || '').toLowerCase().includes('relaxed');

  return (
    <article className="trip-summary-studio-card" aria-label="Trip overview and travel DNA">
      {/* Top Badge & Header */}
      <div className="summary-top-banner">
        <div className="summary-eyebrow">
          <Sparkles size={12} className="text-amber" />
          <span>ESTIMATED VACATION CURATION</span>
        </div>
        <div className="summary-price-lockup">
          <span className="price-tag-sub">Starting from</span>
          <span className="price-tag-main">{formatPrice(tripPlan.price)}</span>
          <span className="price-tag-person">/ person</span>
        </div>
      </div>

      <div className="summary-main-details">
        <h2 className="trip-main-title">{tripPlan.title}</h2>
        <p className="trip-main-subtitle">
          {tripPlan.subtitle || `Personalized ${tripPlan.duration} in ${tripPlan.destination} for ${tripPlan.party} with private chauffeur`}
        </p>

        {/* Quick Spec Pills */}
        <div className="trip-spec-pills-row" role="list">
          <div className="spec-pill" role="listitem">
            <MapPin size={12} className="text-amber" />
            <span>{tripPlan.destination}</span>
          </div>
          <div className="spec-pill" role="listitem">
            <CalendarDays size={12} className="text-aqua" />
            <span>{tripPlan.duration}</span>
          </div>
          <div className="spec-pill" role="listitem">
            <Users size={12} className="text-purple" />
            <span>{tripPlan.party}</span>
          </div>
          <div className="spec-pill" role="listitem">
            <Car size={12} className="text-lime" />
            <span>{tripPlan.vehicle.replace('Private Toyota ', '').replace(' (AC)', '').replace(' (Hybrid AC)', '')}</span>
          </div>
          <div className="spec-pill" role="listitem">
            <Star size={12} className="text-amber" />
            <span>{is5Star ? '5★ Luxury Resort' : '4★ Deluxe Boutique'}</span>
          </div>
        </div>

        {/* Live Travel DNA Controls Bar */}
        <div className="travel-dna-container">
          <div className="dna-header" onClick={() => setIsDNAExpanded(prev => !prev)}>
            <div className="dna-title">
              <Sliders size={13} className="text-amber" />
              <span>Travel DNA & Preferences</span>
              <span className="dna-hint">(Click to adjust car, stays & food)</span>
            </div>
            <button
              type="button"
              className="dna-toggle-btn"
              aria-expanded={isDNAExpanded}
              aria-label="Toggle Travel DNA adjustments"
            >
              <span>{isDNAExpanded ? 'Close Sliders' : 'Adjust Options'}</span>
              {isDNAExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          </div>

          {/* Collapsible Quick Toggles */}
          {isDNAExpanded && (
            <div className="dna-toggles-grid">
              {/* Pacing Control */}
              <div className="dna-control-block">
                <span className="dna-control-label">Pacing & Comfort:</span>
                <div className="dna-btn-group">
                  <button
                    type="button"
                    className={`dna-pill-btn ${isRelaxed ? 'active' : ''}`}
                    onClick={() => onPacingChange?.('Relaxed Pace (Gentle & Comfortable)')}
                  >
                    Relaxed & Leisurely
                  </button>
                  <button
                    type="button"
                    className={`dna-pill-btn ${!isRelaxed ? 'active' : ''}`}
                    onClick={() => onPacingChange?.('Active Sightseer Pace')}
                  >
                    Full Explorer
                  </button>
                </div>
              </div>

              {/* Vehicle Control */}
              <div className="dna-control-block">
                <span className="dna-control-label">Chauffeured Vehicle:</span>
                <div className="dna-btn-group">
                  <button
                    type="button"
                    className={`dna-pill-btn ${(tripPlan.vehicle || '').includes('Hycross') ? 'active' : ''}`}
                    onClick={() => onVehicleChange?.('Private Toyota Innova Hycross (Hybrid AC)')}
                  >
                    Innova Hycross
                  </button>
                  <button
                    type="button"
                    className={`dna-pill-btn ${(tripPlan.vehicle || '').includes('Crysta') ? 'active' : ''}`}
                    onClick={() => onVehicleChange?.('Private Toyota Innova Crysta (AC)')}
                  >
                    Innova Crysta
                  </button>
                  <button
                    type="button"
                    className={`dna-pill-btn ${(tripPlan.vehicle || '').includes('Sedan') ? 'active' : ''}`}
                    onClick={() => onVehicleChange?.('Private AC Sedan (Dzire / Etios)')}
                  >
                    AC Sedan
                  </button>
                </div>
              </div>

              {/* Stay Tier Control */}
              <div className="dna-control-block">
                <span className="dna-control-label">Hotel & Resort Class:</span>
                <div className="dna-btn-group">
                  <button
                    type="button"
                    className={`dna-pill-btn ${!is5Star ? 'active' : ''}`}
                    onClick={() => onStayTierChange?.('4★ Deluxe Boutique Hotel')}
                  >
                    4★ Deluxe Boutique
                  </button>
                  <button
                    type="button"
                    className={`dna-pill-btn ${is5Star ? 'active' : ''}`}
                    onClick={() => onStayTierChange?.('5★ Luxury Resort / Private Pool Villa')}
                  >
                    5★ Luxury / Heritage
                  </button>
                </div>
              </div>

              {/* Dining Control */}
              <div className="dna-control-block">
                <span className="dna-control-label">Dining Assurance:</span>
                <div className="dna-btn-group">
                  <button
                    type="button"
                    className={`dna-pill-btn ${(tripPlan.dietary || '').includes('Jain') ? 'active' : ''}`}
                    onClick={() => onDietaryChange?.('100% Jain Food (No Onion, No Garlic)')}
                  >
                    100% Jain
                  </button>
                  <button
                    type="button"
                    className={`dna-pill-btn ${(tripPlan.dietary || '').includes('Vegetarian') ? 'active' : ''}`}
                    onClick={() => onDietaryChange?.('100% Pure Vegetarian')}
                  >
                    Pure Veg
                  </button>
                  <button
                    type="button"
                    className={`dna-pill-btn ${(tripPlan.dietary || '').includes('Multi') ? 'active' : ''}`}
                    onClick={() => onDietaryChange?.('Authentic Multi-Cuisine & Local Delicacies')}
                  >
                    Multi-Cuisine
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Direct Action Bar on Summary */}
        <div className="summary-cta-row">
          <button
            type="button"
            className="summary-whatsapp-lock-cta"
            onClick={onWhatsAppBooking}
          >
            <MessageCircle size={16} />
            <span>Lock Itinerary & Get Final Quote on WhatsApp</span>
          </button>
          
          <button
            type="button"
            className="summary-full-customize-btn"
            onClick={onCustomizeClick}
          >
            <Sliders size={13} />
            <span>Advanced Customizer</span>
          </button>
        </div>
      </div>
    </article>
  );
}
