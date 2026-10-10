import React, { useState, useRef } from 'react';
import { Clock, MapPin, ChevronDown, ChevronUp, Car, Camera, Utensils, BedDouble, ShoppingBag, Star, ExternalLink, Navigation2 } from 'lucide-react';
import ProximityInline from './ProximityInline';
import './styles/TimelineStop.css';

const STOP_ICONS = {
  transport: Car,
  sightseeing: Camera,
  meal: Utensils,
  hotel: BedDouble,
  shopping: ShoppingBag,
};

const TYPE_LABELS = {
  transport: 'Transfer',
  sightseeing: 'Sightseeing',
  meal: 'Dining',
  hotel: 'Stay',
  shopping: 'Shopping',
};

export default function TimelineStop({ stop, onSelect, stopNumber, totalStops }) {
  const { Icon, typeColor, typeLabel, isSelected, isFirst, isLast, index, ...stopData } = stop;
  const [expanded, setExpanded] = useState(false);
  const [showProximity, setShowProximity] = useState(false);
  const cardRef = useRef(null);
  
  const handleCardClick = () => {
    onSelect?.(stopData);
  };
  
  const handleExpandToggle = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleProximityToggle = (e) => {
    e.stopPropagation();
    setShowProximity(!showProximity);
  };
  
  const hasDescription = stopData.desc || stopData.description;
  const hasExtras = Boolean(hasDescription || stopData.proximity || (stopData.lat && stopData.lng));

  return (
    <>
      <article
        ref={cardRef}
        className={`stop-card-v2 ${isSelected ? 'selected' : ''} ${expanded ? 'expanded' : ''}`}
        role="listitem"
        tabIndex={0}
        aria-selected={isSelected}
        style={{ '--stop-color': typeColor }}
      >
        {/* Stop Number & Type Indicator (Mature Thrillophilia Benchmark) */}
        <div className="stop-indicator">
          <div className="stop-number-ring">
            <span>{stopNumber}</span>
          </div>
          <div className="stop-type-label">
            <Icon size={11} className="stop-type-icon" style={{ color: typeColor }} />
            <span>{typeLabel}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="stop-main">
          {/* Header Row */}
          <div className="stop-top-row" onClick={handleCardClick}>
            <div className="stop-info">
              <h3 className="stop-name">{stopData.title}</h3>
              {stopData.subtitle && (
                <p className="stop-location-hint">{stopData.subtitle}</p>
              )}
            </div>
            <button
              className="stop-detail-btn"
              onClick={handleCardClick}
              aria-label="View details"
            >
              <ExternalLink size={14} />
            </button>
          </div>

          {/* Meta Tags Row */}
          <div className="stop-tags">
            {stopData.time && (
              <span className="tag time-tag">
                <Clock size={12} />
                {stopData.time}
              </span>
            )}
            {stopData.duration && (
              <span className="tag duration-tag">
                <Clock size={12} />
                {stopData.duration}
              </span>
            )}
            {stopData.ticketStatus && (
              <span className="tag ticket-tag">
                <Star size={12} />
                {stopData.ticketStatus}
              </span>
            )}
            {stopData.lat && stopData.lng && (
              <span className="tag location-tag">
                <MapPin size={12} />
                Location
              </span>
            )}
          </div>
          
          {/* Quick Description Preview */}
          {hasDescription && !expanded && (
            <p className="stop-preview-desc">
              {(stopData.description || '').substring(0, 100)}{(stopData.description || '').length > 100 ? '...' : ''}
            </p>
          )}

          {/* Expandable Details */}
          {hasExtras && (
            <button className="expand-toggle" onClick={handleExpandToggle}>
              <span>{expanded ? 'Less Details' : 'More Details'}</span>
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}

          {expanded && (
            <div className="stop-expanded-content">
              {/* Full Description */}
              {hasDescription && (
                <div className="stop-full-desc">
                  <div dangerouslySetInnerHTML={{ __html: stopData.desc || stopData.description }} />
                </div>
              )}

              {/* Proximity / Nearby */}
              {stopData.proximity && (
                <div className="stop-proximity-section">
                  <button className="proximity-header" onClick={handleProximityToggle}>
                    <MapPin size={14} />
                    <span>Nearby Places</span>
                    {showProximity ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  {showProximity && <ProximityInline proximity={stopData.proximity} />}
                </div>
              )}

              {/* Actions / Map Link */}
              <div className="stop-action-row">
                {stopData.lat && stopData.lng && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${stopData.lat},${stopData.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stop-map-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Navigation2 size={14} />
                    <span>Open in Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                <button
                  type="button"
                  className="stop-details-btn"
                  onClick={handleCardClick}
                >
                  <span>Full Stop Details</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}