import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Grid, X, ChevronLeft, ChevronRight, Share2, Sparkles, MapPin } from 'lucide-react';
import { getTourGalleryImages } from '../../../data/destinationGalleries';
import './styles/HeroGalleryMosaic.css';

export default function HeroGalleryMosaic({ tour, onShare }) {
  const images = getTourGalleryImages(tour);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const openLightbox = (index = 0) => {
    setActivePhotoIdx(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextPhoto = useCallback(() => {
    setActivePhotoIdx((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevPhoto = useCallback(() => {
    setActivePhotoIdx((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, nextPhoto, prevPhoto]);

  if (!images.length) return null;

  const mainPhoto = images[0];
  const gridPhotos = images.slice(1, 5); // next 4 photos

  return (
    <div className="hero-mosaic-wrapper">
      {/* 5-Photo Mosaic Grid (Thrillophilia / Airbnb benchmark) */}
      <div className="mosaic-grid-container">
        {/* Large Primary Feature Photo (Left ~58%) */}
        <div 
          className="mosaic-primary-item"
          onClick={() => openLightbox(0)}
          role="button"
          tabIndex={0}
          aria-label="View main photo in high resolution"
        >
          <img 
            src={mainPhoto.url} 
            alt={mainPhoto.alt || tour.name} 
            className="mosaic-img" 
            loading="eager"
          />
          <div className="mosaic-item-overlay">
            <span className="mosaic-zoom-hint">Click to enlarge</span>
          </div>
        </div>

        {/* 2x2 Thumbnail Grid (Right ~42%) */}
        <div className="mosaic-thumbnails-subgrid">
          {gridPhotos.map((photo, idx) => {
            const actualIdx = idx + 1;
            const isLast = idx === 3;
            const extraCount = Math.max(0, images.length - 5);

            return (
              <div 
                key={actualIdx} 
                className="mosaic-thumb-item"
                onClick={() => openLightbox(actualIdx)}
                role="button"
                tabIndex={0}
                aria-label={`View photo ${actualIdx + 1}`}
              >
                <img 
                  src={photo.url} 
                  alt={photo.alt || `${tour.name} photo ${actualIdx + 1}`} 
                  className="mosaic-img"
                  loading="lazy"
                />
                
                {/* On 4th photo, show "+View All Photos" Button */}
                {isLast && (
                  <div className="mosaic-view-all-overlay">
                    <button 
                      type="button" 
                      className="view-all-photos-pill-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(actualIdx);
                      }}
                    >
                      <Grid size={15} />
                      <span>View all {images.length} photos</span>
                    </button>
                  </div>
                )}
                
                {!isLast && (
                  <div className="mosaic-item-overlay" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Floating Gallery Trigger */}
      <div className="mosaic-mobile-bar">
        <button 
          type="button" 
          className="mosaic-mobile-view-all-btn"
          onClick={() => openLightbox(0)}
        >
          <Camera size={16} />
          <span>View all {images.length} photos</span>
        </button>
      </div>

      {/* =========================================================================
          FULL-SCREEN INTERACTIVE LIGHTBOX MODAL
          ========================================================================= */}
      {lightboxOpen && (
        <div 
          className="lightbox-overlay" 
          onClick={closeLightbox}
          role="dialog" 
          aria-modal="true" 
          aria-label="Tour photo gallery"
        >
          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            {/* Top Bar */}
            <div className="lightbox-top-bar">
              <div className="lightbox-title-wrap">
                <span className="lightbox-tour-name">{tour.name}</span>
                <span className="lightbox-counter">
                  Photo {activePhotoIdx + 1} of {images.length}
                </span>
              </div>

              <div className="lightbox-actions">
                {onShare && (
                  <button 
                    type="button" 
                    className="lightbox-action-btn"
                    onClick={onShare}
                    title="Share Itinerary"
                  >
                    <Share2 size={18} />
                  </button>
                )}
                <button 
                  type="button" 
                  className="lightbox-action-btn lightbox-close-btn"
                  onClick={closeLightbox}
                  aria-label="Close photo gallery"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main Stage View */}
            <div className="lightbox-stage">
              <button 
                type="button" 
                className="lightbox-nav-arrow arrow-prev"
                onClick={prevPhoto}
                aria-label="Previous photo"
              >
                <ChevronLeft size={28} />
              </button>

              <div className="lightbox-main-img-container">
                <img 
                  src={images[activePhotoIdx].url} 
                  alt={images[activePhotoIdx].alt || tour.name} 
                  className="lightbox-main-img" 
                />
                {images[activePhotoIdx].alt && (
                  <div className="lightbox-caption-pill">
                    <MapPin size={13} className="caption-pin" />
                    <span>{images[activePhotoIdx].alt}</span>
                  </div>
                )}
              </div>

              <button 
                type="button" 
                className="lightbox-nav-arrow arrow-next"
                onClick={nextPhoto}
                aria-label="Next photo"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Bottom Thumbnail Strip */}
            <div className="lightbox-thumbs-reel">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`lightbox-reel-thumb ${idx === activePhotoIdx ? 'active' : ''}`}
                  onClick={() => setActivePhotoIdx(idx)}
                >
                  <img src={img.url} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
