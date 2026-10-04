import React, { useState } from 'react';
import { Clock, MapPin, ChevronDown, ChevronUp, Car, Camera, Utensils, BedDouble, ShoppingBag, MapPin as MapPinIcon, Image, Star } from 'lucide-react';
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

export default function TimelineStop({ stop, onSelect }) {
  const { Icon, typeColor, isSelected, index, ...stopData } = stop;
  const [showProximity, setShowProximity] = useState(false);
  const [showImages, setShowImages] = useState(false);
  
  const handleClick = () => {
    onSelect?.(stopData);
  };
  
  const handleProximityToggle = (e) => {
    e.stopPropagation();
    setShowProximity(!showProximity);
  };
  
  const handleImagesToggle = (e) => {
    e.stopPropagation();
    setShowImages(!showImages);
  };
  
  const images = stopData.images || (stopData.image ? [stopData.image] : []);
  
  return (
    <article
      className={`timeline-stop ${isSelected ? 'selected' : ''} ${showProximity ? 'proximity-open' : ''}`}
      role="listitem"
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
      tabIndex={0}
      aria-selected={isSelected}
      aria-expanded={showProximity}
    >
      {/* Timeline Pin */}
      <div className="stop-pin" style={{ '--pin-color': typeColor }} aria-hidden="true">
        <div className="pin-inner">
          <Icon size={14} color="white" aria-hidden="true" />
        </div>
        <span className="pin-sequence">{index + 1}</span>
      </div>
      
      {/* Stop Content */}
      <div className="stop-content">
        <div className="stop-header">
          <div className="stop-meta">
            <span className="stop-time">
              <Clock size={12} aria-hidden="true" />
              <span>{stopData.time}</span>
            </span>
            <span className="stop-type-badge" style={{ background: typeColor }}>
              <Icon size={10} aria-hidden="true" />
              <span>{TYPE_LABELS[stopData.type] || stopData.type}</span>
            </span>
            {stopData.duration && (
              <span className="stop-duration">
                <Clock size={11} /> {stopData.duration}
              </span>
            )}
            {stopData.ticketStatus && (
              <span className="stop-ticket">
                <Star size={11} className="text-gold" /> {stopData.ticketStatus}
              </span>
            )}
          </div>
          
          {stopData.proximity && (
            <button
              type="button"
              className="proximity-trigger"
              onClick={handleProximityToggle}
              aria-label={showProximity ? 'Hide nearby places' : 'Show nearby places'}
              aria-expanded={showProximity}
            >
              <MapPinIcon size={12} aria-hidden="true" />
              <span>{showProximity ? 'Hide' : 'Nearby'}</span>
              {showProximity ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          )}
        </div>
        
        <h3 className="stop-title">{stopData.title}</h3>
        
        {stopData.subtitle && (
          <p className="stop-subtitle">{stopData.subtitle}</p>
        )}
        
        {stopData.desc && (
          <div className="stop-desc" dangerouslySetInnerHTML={{ __html: stopData.desc }} />
        )}
        
        {/* Images Carousel */}
        {images.length > 0 && (
          <div className="stop-images">
            <button
              type="button"
              className="images-trigger"
              onClick={handleImagesToggle}
              aria-label={showImages ? 'Hide photos' : 'View photos'}
              aria-expanded={showImages}
            >
              <Image size={14} />
              <span>{showImages ? 'Hide Photos' : `${images.length} Photo${images.length > 1 ? 's' : ''}`}</span>
              {showImages ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
            
            {showImages && (
              <div className="images-carousel">
                {images.map((img, idx) => (
                  <div key={idx} className="image-slide">
                    <img 
                      src={img} 
                      alt={`${stopData.title} - Photo ${idx + 1}`} 
                      loading="lazy"
                      className="carousel-image"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Inline Proximity Expansion */}
        {showProximity && stopData.proximity && (
          <ProximityInline proximity={stopData.proximity} />
        )}
      </div>
    </article>
  );
}