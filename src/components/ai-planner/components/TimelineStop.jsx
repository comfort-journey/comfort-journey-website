import React from 'react';
import { Clock, MapPin, ChevronDown, ChevronUp, Car, Camera, Utensils, BedDouble, ShoppingBag } from 'lucide-react';
import ProximityInline from './ProximityInline';
import './styles/TimelineStop.css';

const STOP_ICONS = {
  transport: Car,
  sightseeing: Camera,
  meal: Utensils,
  hotel: BedDouble,
  shopping: ShoppingBag,
};

const TYPE_COLORS = {
  transport: 'var(--planner-aqua-500)',
  sightseeing: 'var(--planner-tangerine-500)',
  meal: 'var(--planner-lime-500)',
  hotel: '#A78BFA',
  shopping: '#F472B6',
};

export default function TimelineStop({ stop, onSelect, onProximityToggle }) {
  const { Icon, isSelected, isProximityOpen, index, ...stopData } = stop;
  const typeColor = TYPE_COLORS[stopData.type] || TYPE_COLORS.sightseeing;

  const handleClick = () => {
    onSelect?.(stopData);
  };

  const handleProximityClick = (e) => {
    e.stopPropagation();
    onProximityToggle?.(stopData);
  };

  return (
    <article
      className={`timeline-stop ${isSelected ? 'selected' : ''} ${isProximityOpen ? 'proximity-open' : ''}`}
      role="listitem"
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
      aria-selected={isSelected}
      aria-expanded={isProximityOpen}
    >
      {/* Timeline pin */}
      <div className="stop-pin" style={{ '--pin-color': typeColor }} aria-hidden="true">
        <div className="pin-inner">
          <Icon size={14} color="white" aria-hidden="true" />
        </div>
        <span className="pin-sequence">{index + 1}</span>
      </div>

      {/* Stop content */}
      <div className="stop-content">
        <div className="stop-header">
          <div className="stop-meta">
            <span className="stop-time">
              <Clock size={11} aria-hidden="true" />
              <span>{stopData.time}</span>
            </span>
            {stopData.duration && (
              <span className="stop-duration">{stopData.duration}</span>
            )}
            {stopData.ticketStatus && (
              <span className="stop-ticket">{stopData.ticketStatus}</span>
            )}
          </div>
          
          {stopData.proximity && (
            <button
              type="button"
              className="proximity-trigger"
              onClick={handleProximityClick}
              aria-label={isProximityOpen ? 'Hide nearby places' : 'Show nearby places'}
              aria-expanded={isProximityOpen}
            >
              <MapPin size={12} aria-hidden="true" />
              <span>{isProximityOpen ? 'Hide' : 'Nearby'}</span>
              {isProximityOpen ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
            </button>
          )}
        </div>

        <h3 className="stop-title">{stopData.title}</h3>
        <p className="stop-subtitle">{stopData.subtitle}</p>

        {/* Inline Proximity Expansion */}
        {isProximityOpen && stopData.proximity && (
          <ProximityInline proximity={stopData.proximity} />
        )}
      </div>
    </article>
  );
}