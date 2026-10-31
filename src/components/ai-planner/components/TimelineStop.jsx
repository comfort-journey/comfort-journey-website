import React from 'react';
import { 
  Clock, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Car, 
  Camera, 
  Utensils, 
  BedDouble, 
  ShoppingBag,
  Navigation,
  Sparkles,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
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

const TYPE_LABELS = {
  transport: 'Private Chauffeur Travel',
  sightseeing: 'Curated Sightseeing',
  meal: 'Handpicked Dining',
  hotel: 'Verified Luxury Stay',
  shopping: 'Authentic Local Bazaar',
};

export default function TimelineStop({ stop, onSelect, onProximityToggle }) {
  const { Icon, isSelected, isProximityOpen, index, ...stopData } = stop;
  const typeColor = TYPE_COLORS[stopData.type] || TYPE_COLORS.sightseeing;
  const typeLabel = TYPE_LABELS[stopData.type] || 'Curated Stop';

  const handleClick = () => {
    onSelect?.(stopData);
  };

  const handleProximityClick = (e) => {
    e.stopPropagation();
    onProximityToggle?.(stopData);
  };

  // Generate real road navigation URL for Google Maps
  const googleMapsUrl = stopData.lat && stopData.lng
    ? `https://www.google.com/maps/dir/?api=1&destination=${stopData.lat},${stopData.lng}&travelmode=driving`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stopData.title)}`;

  return (
    <article
      className={`timeline-stop-editorial ${isSelected ? 'is-selected' : ''} ${isProximityOpen ? 'proximity-open' : ''}`}
      role="listitem"
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
      aria-selected={isSelected}
      aria-expanded={isProximityOpen}
    >
      {/* Timeline pin & sequence */}
      <div className="stop-pin-lockup" style={{ '--pin-color': typeColor }} aria-hidden="true">
        <div className="pin-badge">
          <Icon size={14} color="#FFFFFF" />
        </div>
        <span className="pin-index">{index + 1}</span>
        <div className="pin-stem" />
      </div>

      {/* Stop Card Content */}
      <div className="stop-card-body">
        {/* Header: Type, Time, Duration & Google Maps Deep-Link */}
        <div className="stop-card-header">
          <div className="stop-meta-group">
            <span className="stop-type-badge" style={{ color: typeColor, borderColor: typeColor }}>
              {typeLabel}
            </span>
            <span className="stop-time-badge">
              <Clock size={11} />
              <span>{stopData.time}</span>
            </span>
            {stopData.duration && (
              <span className="stop-duration-badge">{stopData.duration}</span>
            )}
            {stopData.ticketStatus && (
              <span className="stop-ticket-badge">{stopData.ticketStatus}</span>
            )}
          </div>

          <div className="stop-actions-group">
            {/* Real Road Navigation */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="stop-gmaps-link-btn"
              onClick={(e) => e.stopPropagation()}
              title="Open turn-by-turn road navigation in Google Maps"
            >
              <Navigation size={11} />
              <span>Google Maps</span>
              <ExternalLink size={10} />
            </a>

            {/* Proximity / Nearby Places Toggle */}
            {stopData.proximity && (
              <button
                type="button"
                className="stop-nearby-toggle-btn"
                onClick={handleProximityClick}
                aria-label={isProximityOpen ? 'Hide nearby places' : 'Show nearby places'}
                aria-expanded={isProximityOpen}
              >
                <MapPin size={11} />
                <span>{isProximityOpen ? 'Hide' : 'Nearby'}</span>
                {isProximityOpen ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
              </button>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="stop-editorial-title">{stopData.title}</h3>
        <p className="stop-editorial-subtitle">{stopData.subtitle}</p>

        {/* Meal Stop Pure Veg / Jain Reassurance */}
        {stopData.type === 'meal' && (
          <div className="stop-dietary-reassurance">
            <ShieldCheck size={13} className="text-lime" />
            <span>Pure Vegetarian & Jain Friendly dining available. Hygiene & kitchen verified.</span>
          </div>
        )}

        {/* Transport Stop Car Reassurance */}
        {stopData.type === 'transport' && (
          <div className="stop-transport-reassurance">
            <Car size={13} className="text-aqua" />
            <span>Dedicated private vehicle with verified, courteous local chauffeur. Fuel, toll & parking included.</span>
          </div>
        )}

        {/* Inline Proximity Expansion */}
        {isProximityOpen && stopData.proximity && (
          <div className="stop-proximity-wrapper">
            <ProximityInline proximity={stopData.proximity} />
          </div>
        )}
      </div>
    </article>
  );
}
