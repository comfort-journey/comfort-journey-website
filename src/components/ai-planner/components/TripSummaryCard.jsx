import React from 'react';
import { MapPin, Clock, Users, Car, Utensils, Star, ChevronRight, Settings } from 'lucide-react';
import './styles/TripSummaryCard.css';

export default function TripSummaryCard({
  tripPlan,
  formatPrice,
  onCustomizeClick,
  onViewOnMap,
  isMobile
}) {
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
    <article className="trip-summary-card glass-panel" aria-label="Trip overview">
      <div className="summary-header">
        <h2 className="trip-title">{tripPlan.title}</h2>
        <div className="trip-price">
          <span className="price-label">Starting from</span>
          <span className="price-value">{formatPrice(tripPlan.price)}</span>
          <span className="price-unit">/ person</span>
        </div>
      </div>

      <div className="summary-chips" role="list" aria-label="Trip details">
        {chips.map((chip, idx) => (
          <span key={idx} className={`info-chip chip-${chip.color}`} role="listitem">
            <chip.icon size={12} aria-hidden="true" />
            <span>{chip.label}</span>
          </span>
        ))}
      </div>

      <div className="summary-actions-row">
        <button
          type="button"
          className="customize-trigger"
          onClick={onCustomizeClick}
          aria-label="Customize trip preferences"
        >
          <Settings size={14} aria-hidden="true" />
          <span>Customize Preferences</span>
          <ChevronRight size={12} aria-hidden="true" />
        </button>

        {isMobile && onViewOnMap && (
          <button
            type="button"
            className="view-map-pill-btn"
            onClick={onViewOnMap}
            aria-label="View interactive map"
          >
            <MapPin size={13} aria-hidden="true" />
            <span>View Map 🗺️</span>
          </button>
        )}
      </div>
    </article>
  );
}