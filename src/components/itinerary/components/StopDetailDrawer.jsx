import React, { useEffect, useState } from 'react';
import { X, MapPin, Clock, Utensils, BedDouble, Camera, Car, ShoppingBag, Star, Image, ChevronDown, ChevronUp, Navigation2, ShieldCheck } from 'lucide-react';
import ProximityInline from './ProximityInline';
import './styles/StopDetailDrawer.css';

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

const TYPE_COLORS = {
  transport: 'var(--itin-aqua)',
  sightseeing: 'var(--itin-tangerine)',
  meal: 'var(--itin-lime)',
  hotel: '#A78BFA',
  shopping: '#F472B6',
};

export default function StopDetailDrawer({
  isOpen,
  onClose,
  stop,
  currentDayData,
  tour
}) {
  const [showProximity, setShowProximity] = useState(true);
  const [showImages, setShowImages] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !stop) return null;

  const images = stop.images || (stop.image ? [stop.image] : []);
  const typeColor = TYPE_COLORS[stop.type] || TYPE_COLORS.sightseeing;
  const Icon = STOP_ICONS[stop.type] || MapPin;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleImageClick = (idx) => {
    setActiveImageIndex(idx);
    setShowImages(true);
  };

  const handleProximityToggle = () => {
    setShowProximity(!showProximity);
  };

  return (
    <div className="stop-drawer-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="stop-drawer-title">
      <div className="stop-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drag Handle */}
        <div className="drawer-handle" aria-hidden="true">
          <div className="handle-bar" />
        </div>

        {/* Header */}
        <header className="drawer-header">
          <div className="header-main">
            <div className="stop-type-badge" style={{ background: typeColor }}>
              <Icon size={16} color="white" aria-hidden="true" />
              <span>{TYPE_LABELS[stop.type] || stop.type}</span>
            </div>
            <div className="stop-title-group">
              <h2 id="stop-drawer-title" className="stop-title">{stop.title}</h2>
              {stop.subtitle && <p className="stop-subtitle">{stop.subtitle}</p>}
            </div>
          </div>
          <button type="button" className="drawer-close" onClick={onClose} aria-label="Close details">
            <X size={20} />
          </button>
        </header>

        {/* Content */}
        <div className="drawer-content">
          {/* Meta Info */}
          <div className="stop-meta-grid">
            {stop.time && (
              <div className="meta-item">
                <Clock size={16} className="text-aqua" />
                <div>
                  <span className="meta-label">Time</span>
                  <span className="meta-value">{stop.time}</span>
                </div>
              </div>
            )}
            {stop.duration && (
              <div className="meta-item">
                <Clock size={16} className="text-amber" />
                <div>
                  <span className="meta-label">Duration</span>
                  <span className="meta-value">{stop.duration}</span>
                </div>
              </div>
            )}
            {stop.ticketStatus && (
              <div className="meta-item">
                <Star size={16} className="text-gold" />
                <div>
                  <span className="meta-label">Ticket</span>
                  <span className="meta-value">{stop.ticketStatus}</span>
                </div>
              </div>
            )}
            {stop.type === 'hotel' && currentDayData?.stayTier && (
              <div className="meta-item">
                <BedDouble size={16} className="text-purple" />
                <div>
                  <span className="meta-label">Stay</span>
                  <span className="meta-value">{currentDayData.stayTier}</span>
                </div>
              </div>
            )}
            {stop.type === 'meal' && tour?.dietary && (
              <div className="meta-item">
                <Utensils size={16} className="text-emerald" />
                <div>
                  <span className="meta-label">Meals</span>
                  <span className="meta-value">{tour.dietary}</span>
                </div>
              </div>
            )}
            {stop.type === 'transport' && tour?.vehicle && (
              <div className="meta-item">
                <Car size={16} className="text-cyan" />
                <div>
                  <span className="meta-label">Vehicle</span>
                  <span className="meta-value">{tour.vehicle.replace('Private Toyota ', '').replace(' (AC)', '')}</span>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {stop.desc && (
            <div className="stop-description">
              <h3>About This Stop</h3>
              <div dangerouslySetInnerHTML={{ __html: stop.desc }} />
            </div>
          )}

          {/* Images */}
          {images.length > 0 && (
            <div className="stop-images-section">
              <div className="images-header">
                <h3>
                  <Image size={18} />
                  {images.length} Photo{images.length > 1 ? 's' : ''}
                </h3>
                <button
                  type="button"
                  className="images-toggle"
                  onClick={() => setShowImages(!showImages)}
                  aria-expanded={showImages}
                >
                  {showImages ? 'Hide' : 'View All'}
                  {showImages ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {showImages && (
                <div className="images-gallery">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`image-thumb ${activeImageIndex === idx ? 'active' : ''}`}
                      onClick={() => handleImageClick(idx)}
                      aria-label={`View photo ${idx + 1}`}
                    >
                      <img src={img} alt={`${stop.title} - Photo ${idx + 1}`} loading="lazy" />
                      {idx === activeImageIndex && <div className="active-ring" />}
                    </button>
                  ))}
                </div>
              )}

              {/* Fullscreen Image Modal */}
              {showImages && images.length > 0 && (
                <div className="image-fullscreen" onClick={() => setShowImages(false)}>
                  <button type="button" className="fullscreen-close" onClick={() => setShowImages(false)}>
                    <X size={24} />
                  </button>
                  <button type="button" className="fullscreen-nav prev" onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                  }}>
                    <ChevronDown size={28} />
                  </button>
                  <img 
                    src={images[activeImageIndex]} 
                    alt={`${stop.title} - Photo ${activeImageIndex + 1}`}
                    className="fullscreen-image"
                  />
                  <button type="button" className="fullscreen-nav next" onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                  }}>
                    <ChevronUp size={28} />
                  </button>
                  <div className="fullscreen-counter">
                    {activeImageIndex + 1} / {images.length}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Proximity */}
          {stop.proximity && (
            <div className="proximity-section">
              <button
                type="button"
                className="section-toggle"
                onClick={handleProximityToggle}
                aria-expanded={showProximity}
              >
                <div className="toggle-left">
                  <MapPin size={18} className="text-aqua" />
                  <span>Nearby Places & Proximity</span>
                </div>
                {showProximity ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {showProximity && (
                <ProximityInline proximity={stop.proximity} />
              )}
            </div>
          )}

          {/* Location on Map */}
          {stop.lat && stop.lng && (
            <div className="location-section">
              <h3>
                <Navigation2 size={18} className="text-amber" />
                Location on Map
              </h3>
              <p className="location-coords">
                <MapPin size={14} />
                <span>{stop.lat.toFixed(4)}, {stop.lng.toFixed(4)}</span>
              </p>
              <div className="location-actions">
                <button type="button" className="location-btn primary" onClick={() => {
                  window.open(`https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`, '_blank');
                }}>
                  <Navigation2 size={16} />
                  <span>Open in Google Maps</span>
                </button>
                <button type="button" className="location-btn secondary" onClick={() => {
                  navigator.clipboard.writeText(`${stop.lat},${stop.lng}`);
                }}>
                  <ShieldCheck size={16} />
                  <span>Copy Coordinates</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}