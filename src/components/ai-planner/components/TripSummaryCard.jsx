import React, { useState } from 'react';
import { MapPin, Clock, Users, Car, Utensils, Star, Settings, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import './styles/TripSummaryCard.css';

export default function TripSummaryCard({
  tripPlan,
  formatPrice,
  onCustomizeClick,
  onViewOnMap,
  isMobile
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const vehicleShort = tripPlan.vehicle
    .replace('Private Toyota ', '')
    .replace(' (AC)', '')
    .replace(' (Hybrid AC)', '');

  const chips = [
    { icon: MapPin, label: tripPlan.destination, color: 'amber' },
    { icon: Clock, label: tripPlan.duration, color: 'emerald' },
    { icon: Users, label: tripPlan.party, color: 'cyan' },
    { icon: Car, label: vehicleShort, color: 'purple' },
    { icon: Utensils, label: tripPlan.dietary.includes('Jain') ? 'Jain' : 'Pure Veg', color: 'lime' },
    { icon: Star, label: tripPlan.stayTier.includes('5★') ? '5★ Luxury' : '4★ Deluxe', color: 'amber' },
  ];

  return (
    <article className={`trip-summary-card glass-panel ${isCollapsed ? 'is-collapsed' : ''}`} aria-label="Trip overview">
      <div className="summary-header">
        <div className="summary-title-group">
          <div className="summary-eyebrow">
            <Sparkles size={11} className="text-amber" />
            <span>AI-OPTIMIZED VACATION PLAN</span>
          </div>
          <h2 className="trip-title">{tripPlan.title}</h2>
        </div>

        <div className="summary-header-actions">
          <button
            type="button"
            className="customize-btn-compact"
            onClick={onCustomizeClick}
            aria-label="Customize trip preferences"
          >
            <Settings size={13} />
            <span>Customize</span>
          </button>
          
          <button
            type="button"
            className="toggle-collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand overview" : "Collapse overview"}
            title={isCollapsed ? "Show details" : "Minimize header"}
          >
            {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          <div className="summary-chips-row" role="list" aria-label="Trip details">
            {chips.map((chip, idx) => (
              <span key={idx} className={`info-chip chip-${chip.color}`} role="listitem">
                <chip.icon size={11} aria-hidden="true" />
                <span>{chip.label}</span>
              </span>
            ))}
          </div>

          {isMobile && onViewOnMap && (
            <div className="summary-mobile-map-row">
              <button
                type="button"
                className="view-map-pill-btn"
                onClick={onViewOnMap}
                aria-label="View interactive map"
              >
                <MapPin size={13} aria-hidden="true" />
                <span>View Route on Map 🗺️</span>
              </button>
            </div>
          )}
        </>
      )}
    </article>
  );
}