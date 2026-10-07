import React, { useState, useRef, useEffect } from 'react';
import { Clock, MapPin, ChevronDown, ChevronUp, Car, Camera, Utensils, BedDouble, ShoppingBag, MapPin as MapPinIcon, Image, Star, ChevronLeft, ChevronRight } from 'lucide-react';
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

export default function TimelineStop({ stop, onSelect, routeMode, activeDay, stopDay }) {
  const { Icon, typeColor, isSelected, index, ...stopData } = stop;
  const [showProximity, setShowProximity] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const carouselRef = useRef(null);
  
  const images = stopData.images || (stopData.image ? [stopData.image] : []);
  
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
  
  const handleImageSelect = (idx) => {
    setCurrentImageIndex(idx);
    setShowFullscreen(true);
  };
  
  const handleFullscreenNav = (dir) => {
    setCurrentImageIndex((prev) => (prev + dir + images.length) % images.length);
  };
  
  const handleKeyDown = (e) => {
    if (!showFullscreen) return;
    if (e.key === 'ArrowLeft') handleFullscreenNav(-1);
    if (e.key === 'ArrowRight') handleFullscreenNav(1);
    if (e.key === 'Escape') setShowFullscreen(false);
  };
  
  useEffect(() => {
    if (showFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [showFullscreen]);
  
  const isStopVisible = routeMode === 'day' ? stopDay === activeDay : true;

  if (!isStopVisible) return null;

  return (
    <>
      <article
        ref={carouselRef}
        className={`timeline-stop ${isSelected ? 'selected' : ''} ${showProximity ? 'proximity-open' : ''}`}
        role="listitem"
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
        tabIndex={0}
        aria-selected={isSelected}
        aria-expanded={showProximity}
        data-day={stopDay}
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
                <ImageIcon size={14} />
                <span>{showImages ? 'Hide Photos' : `${images.length} Photo${images.length > 1 ? 's' : ''}`}</span>
                {showImages ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
              
              {showImages && (
                <div className="images-carousel" ref={carouselRef}>
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="image-slide"
                      onClick={() => handleImageSelect(idx)}
                      aria-label={`View photo ${idx + 1} of ${images.length}`}
                    >
                      <img 
                        src={img} 
                        alt={`${stopData.title} - Photo ${idx + 1}`} 
                        loading="lazy"
                        className="carousel-image"
                      />
                      {images.length > 1 && (
                        <span className="image-counter">{idx + 1} / {images.length}</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Inline Proximity Expansion */}
        {showProximity && stopData.proximity && (
          <ProximityInline proximity={stopData.proximity} />
        )}
      </article>
      
      {/* Fullscreen Image Modal */}
      {showFullscreen && (
        <div className="image-fullscreen" role="dialog" aria-modal="true" aria-label="Fullscreen photo view">
          <button
            className="fullscreen-close"
            onClick={() => setShowFullscreen(false)}
            aria-label="Close fullscreen"
          >
            <ChevronLeft size={24} />
          </button>
          
          {images.length > 1 && (
            <>
              <button
                className="fullscreen-nav prev"
                onClick={() => handleFullscreenNav(-1)}
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="fullscreen-nav next"
                onClick={() => handleFullscreenNav(1)}
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          
          <img
            className="fullscreen-image"
            src={images[currentImageIndex]}
            alt={`${stopData.title} - Photo ${currentImageIndex + 1}`}
          />
          
          {images.length > 1 && (
            <div className="fullscreen-counter">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}