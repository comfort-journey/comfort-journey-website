import React, { useState, useRef } from 'react';
import { TRAVELER_REELS } from '../data/toursData';
import { Play, MessageCircle, Heart, CheckCircle2, X, Sparkles, ChevronLeft, ChevronRight, Instagram, ExternalLink, Eye, Volume2, VolumeX } from 'lucide-react';
import Tilt3DCard from './animations/Tilt3DCard';
import { useParticleBurst } from '../hooks/useParticleBurst';

export default function TravelStoriesSection({ onOpenQuote }) {
  const { triggerBurst } = useParticleBurst();
  const reelsScrollRef = useRef(null);
  const [likedReels, setLikedReels] = useState({});
  const [unmutedReels, setUnmutedReels] = useState({});
  const [activeReelModal, setActiveReelModal] = useState(null);

  const toggleLike = (e, id) => {
    e.stopPropagation();
    if (!likedReels[id]) {
      triggerBurst(e, { count: 18, colors: ['#E1306C', '#FF892F', '#F9FBE7'] });
    }
    setLikedReels(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleSound = (e, id) => {
    e.stopPropagation();
    setUnmutedReels(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleScrollReels = (direction) => {
    if (reelsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      reelsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="stories" className="stories-root">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="instagram-section-badge">
            <Instagram size={15} />
            <span>AUTHENTIC TRAVEL DIARIES • @comfort.journey</span>
          </div>
          <h2 className="section-title font-editorial">
            Real Moments, <span className="gradient-text-gold">Live Traveler Stories</span>
          </h2>
          <p className="section-subtitle">
            Watch authentic travel experiences from our guests exploring bespoke vacation packages across India and the globe.
          </p>
        </div>

        {/* Carousel Controls Bar */}
        <div className="reels-header-controls">
          <div className="reels-count-tag">
            <span className="live-pulse-dot"></span>
            <span>7 Signature Featured Video Stories</span>
          </div>
          <div className="reels-nav-controls">
            <button 
              type="button" 
              className="reel-nav-btn" 
              onClick={() => handleScrollReels('left')}
              aria-label="Previous Reels"
              title="Scroll Left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              type="button" 
              className="reel-nav-btn" 
              onClick={() => handleScrollReels('right')}
              aria-label="Next Reels"
              title="Scroll Right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* REELS VIEW - Next-Gen Phone-Mockup Vertical Video Story Carousel */}
        <div className="reels-carousel-wrapper">
          <div className="reels-grid-single-row" ref={reelsScrollRef}>
            {TRAVELER_REELS.map((reel) => {
              const isLiked = likedReels[reel.id];

              return (
                <div key={reel.id} className="reel-item-col">
                  <Tilt3DCard maxTilt={4} scale={1.02} glare={true} className="reel-tilt-wrapper">
                    <div className="reel-card glass-card" onClick={() => setActiveReelModal(reel)}>
                      {/* Video Thumbnail & Clean Play Badge */}
                      <div className="reel-media-wrapper">
                        <img
                          src={reel.videoThumb}
                          alt={reel.destination}
                          className="reel-cover-img"
                          loading="lazy"
                        />

                        {/* Glowing Play Center Badge */}
                        <div className="reel-play-center-badge">
                          <Play size={24} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: '3px' }} />
                        </div>

                        {/* Luxury Dark Gradient Mask */}
                        <div className="reel-dark-veil" />

                        {/* Top Instagram Profile Pill */}
                        <div className="reel-top-bar">
                          <div className="insta-profile-lockup">
                            <div className="insta-story-ring">
                              <Instagram size={13} color="#FFFFFF" />
                            </div>
                            <span className="insta-handle">@comfort.journey</span>
                            <CheckCircle2 size={12} className="text-emerald" />
                          </div>
                        </div>

                        {/* Clean Bottom Bar: Destination & Watch on IG Action */}
                        <div className="reel-bottom-overlay">
                          <div className="reel-dest-title">
                            <span className="dest-flag">{reel.flag}</span>
                            <span className="dest-name">{reel.destination}</span>
                          </div>

                          <div className="reel-card-footer-btns">
                            <button
                              type="button"
                              className={`reel-mini-heart ${isLiked ? 'liked' : ''}`}
                              onClick={(e) => toggleLike(e, reel.id)}
                              aria-label="Like story"
                              title="Like Reel"
                            >
                              <Heart size={15} fill={isLiked ? '#FF892F' : 'none'} color={isLiked ? '#FF892F' : '#F9FBE7'} />
                            </button>

                            <a
                              href={reel.instagramUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-open-ig-direct"
                              onClick={(e) => e.stopPropagation()}
                              title="Watch directly on Instagram App"
                            >
                              <Instagram size={13} />
                              <span>Watch on IG</span>
                              <ExternalLink size={11} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tilt3DCard>
                </div>
              );
            })}
          </div>
        </div>

        {/* ULTRA-MODERN REEL LIGHTBOX MODAL WITH REAL INSTAGRAM EMBED */}
        {activeReelModal && (
          <div className="modal-overlay" onClick={() => setActiveReelModal(null)}>
            <div className="reel-modal-card live-video-modal" onClick={(e) => e.stopPropagation()}>
              <button className="reel-close-btn" onClick={() => setActiveReelModal(null)} aria-label="Close Reel">
                <X size={20} />
              </button>

              <div className="reel-modal-two-col">
                {/* Left Column: Real Instagram Reel Video Embed Player */}
                <div className="reel-modal-video-pane">
                  <iframe
                    src={`https://www.instagram.com/reel/${activeReelModal.reelId}/embed/`}
                    className="reel-modal-ig-iframe"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency="true"
                    allow="autoplay; encrypted-media; clipboard-write"
                    title={`Instagram Reel - ${activeReelModal.destination}`}
                  />
                </div>

                {/* Right Column: Experience Details & Booking Actions */}
                <div className="reel-modal-info-pane">
                  <div>
                    <div className="reel-modal-badges">
                      <span className="badge badge-amber">{activeReelModal.flag} {activeReelModal.destination}</span>
                      <span className="badge badge-ig"><Instagram size={13} /> @comfort.journey</span>
                    </div>

                    <h3 className="modal-reel-heading">{activeReelModal.headline || activeReelModal.destination}</h3>
                    
                    <p className="modal-reel-caption">
                      "{activeReelModal.tagline}"
                    </p>

                    <div className="reel-modal-stats-box">
                      <div className="stat-line">
                        <span>Official Channel:</span>
                        <strong>Instagram (@comfort.journey)</strong>
                      </div>
                      <div className="stat-line">
                        <span>Category:</span>
                        <strong>{activeReelModal.duration}</strong>
                      </div>
                      <div className="stat-line">
                        <span>Reel ID:</span>
                        <strong>{activeReelModal.reelId}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="reel-modal-actions">
                    <a 
                      href={activeReelModal.instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-instagram w-full"
                    >
                      <Instagram size={18} />
                      <span>Open on Instagram App</span>
                      <ExternalLink size={15} />
                    </a>

                    <button 
                      className="btn-whatsapp w-full"
                      onClick={() => {
                        const msg = `Hi Comfort Journey! I saw your Instagram reel for "${activeReelModal.destination}" (${activeReelModal.instagramUrl}). Please share customized tour package options!`;
                        window.open(`https://wa.me/918770403315?text=${encodeURIComponent(msg)}`, '_blank');
                      }}
                    >
                      <MessageCircle size={18} />
                      <span>Inquire About This Tour on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}{/* CTA Strip */}
        <div className="stories-cta-banner glass-card">
          <div className="cta-left">
            <h3 className="font-editorial">Ready to create your own lifelong travel memories?</h3>
            <p>Speak directly with our senior trip curators in Bhopal. Zero consultation fees to craft your bespoke plan.</p>
          </div>
          <div className="cta-right">
            <button className="btn-primary" onClick={onOpenQuote}>
              <span>Plan My Trip</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .stories-root {
          padding: 4rem 0 3rem 0;
          background: linear-gradient(180deg, #001233 0%, #001A40 50%, #001233 100%);
          color: #FFFFFF;
          position: relative;
        }

        .instagram-section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, rgba(225, 48, 108, 0.18), rgba(253, 29, 29, 0.18));
          border: 1px solid rgba(225, 48, 108, 0.45);
          color: #FF8BA7;
          padding: 0.35rem 1rem;
          border-radius: var(--radius-full, 9999px);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          margin-bottom: 0.75rem;
          box-shadow: 0 4px 15px rgba(225, 48, 108, 0.2);
        }

        .reels-header-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding: 0 0.5rem;
        }

        .reels-count-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.86rem;
          color: #93B2D2;
          font-weight: 700;
        }

        .live-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #FF892F;
          box-shadow: 0 0 10px #FF892F;
          animation: pulseDot 1.8s infinite;
        }

        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.5; }
        }

        .reels-nav-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .reel-nav-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(0, 40, 85, 0.6);
          border: 1px solid rgba(111, 230, 252, 0.25);
          color: #F9FBE7;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .reel-nav-btn:hover {
          background: #FF892F;
          border-color: #FF892F;
          color: #FFFFFF;
          transform: scale(1.08);
          box-shadow: 0 4px 15px rgba(255, 137, 47, 0.4);
        }

        /* Reels Single-Row Carousel */
        .reels-carousel-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .reels-grid-single-row {
          display: flex;
          gap: 1.35rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 0.5rem 0.25rem 1.5rem 0.25rem;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 137, 47, 0.4) transparent;
        }

        .reels-grid-single-row::-webkit-scrollbar {
          height: 5px;
        }

        .reels-grid-single-row::-webkit-scrollbar-thumb {
          background: rgba(255, 137, 47, 0.35);
          border-radius: 4px;
        }

        .reel-item-col {
          flex: 0 0 328px;
          scroll-snap-align: start;
        }

        .reel-card {
          position: relative;
          height: 520px;
          border-radius: var(--radius-xl, 22px);
          overflow: hidden;
          background: #001D51;
          border: 1.5px solid rgba(111, 230, 252, 0.28);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .reel-card:hover {
          border-color: #6FE6FC;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.75), 0 0 25px rgba(111, 230, 252, 0.35);
          transform: translateY(-4px);
        }

        .reel-media-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #001233;
        }

        .reel-cover-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reel-card:hover .reel-cover-img {
          transform: scale(1.06);
        }

        .reel-autoplay-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 2;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reel-card:hover .reel-autoplay-video {
          transform: scale(1.06);
        }

        .reel-play-center-badge {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 4;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(0, 29, 81, 0.7);
          backdrop-filter: blur(10px);
          border: 1.5px solid rgba(255, 137, 47, 0.6);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 137, 47, 0.3);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .reel-card:hover .reel-play-center-badge {
          transform: translate(-50%, -50%) scale(1.18);
          background: #FF892F;
          border-color: #FFFFFF;
          box-shadow: 0 10px 30px rgba(255, 137, 47, 0.7), 0 0 30px rgba(255, 137, 47, 0.9);
        }

        .reel-dark-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg, 
            rgba(0, 29, 81, 0.88) 0%, 
            rgba(0, 29, 81, 0.15) 28%, 
            rgba(0, 29, 81, 0.35) 60%, 
            rgba(0, 29, 81, 0.96) 100%
          );
          pointer-events: none;
        }

        .reel-top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1rem;
        }

        .insta-profile-lockup {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }

        .insta-story-ring {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #833AB4, #FD1D1D, #F56040);
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px rgba(225, 48, 108, 0.5);
          flex-shrink: 0;
        }

        .insta-meta {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          min-width: 0;
        }

        .insta-handles-row {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          white-space: nowrap;
          overflow: hidden;
        }

        .insta-handle {
          font-family: var(--font-ui);
          font-size: 0.78rem;
          font-weight: 800;
          color: #F9FBE7;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
        }

        .insta-verified-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
          font-size: 0.65rem;
          color: #DAF561;
          font-weight: 700;
        }

        .reel-sound-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(0, 29, 81, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(111, 230, 252, 0.35);
          color: #6FE6FC;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .reel-sound-btn:hover {
          background: rgba(111, 230, 252, 0.25);
          border-color: #6FE6FC;
          color: #FFFFFF;
          transform: scale(1.1);
        }

        .reel-live-tag {
          position: absolute;
          top: 3.5rem;
          right: 1rem;
          z-index: 4;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full, 9999px);
          background: rgba(0, 29, 81, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(111, 230, 252, 0.4);
          color: #6FE6FC;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .live-dot-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #DAF561;
          box-shadow: 0 0 8px #DAF561;
          animation: livePulse 1.5s infinite;
        }

        @keyframes livePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.5; }
        }

        .reel-bottom-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 5;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .reel-views-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          align-self: flex-start;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full, 9999px);
          background: rgba(111, 230, 252, 0.15);
          border: 1px solid rgba(111, 230, 252, 0.35);
          color: #6FE6FC;
          font-size: 0.68rem;
          font-weight: 700;
        }

        .reel-dest-title {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.92rem;
          font-weight: 800;
          color: #F9FBE7;
        }

        .dest-flag {
          font-size: 1rem;
        }

        .dest-name {
          color: #F9FBE7;
        }

        .reel-tagline-text {
          font-size: 0.76rem;
          color: #E2E8F0;
          line-height: 1.35;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .reel-card-footer-btns {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          margin-top: 0.35rem;
        }

        .reel-mini-heart {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(0, 29, 81, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(249, 251, 231, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .reel-mini-heart:hover {
          background: rgba(255, 137, 47, 0.25);
          border-color: #FF892F;
          transform: scale(1.1);
        }

        .reel-mini-heart.liked {
          background: rgba(255, 137, 47, 0.35);
          border-color: #FF892F;
        }

        .btn-open-ig-direct {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-full, 9999px);
          background: linear-gradient(135deg, rgba(225, 48, 108, 0.25), rgba(253, 29, 29, 0.25));
          border: 1px solid rgba(225, 48, 108, 0.6);
          color: #F9FBE7;
          font-size: 0.76rem;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .btn-open-ig-direct:hover {
          background: linear-gradient(135deg, #E1306C, #FD1D1D);
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(225, 48, 108, 0.4);
        }

        .reel-modal-ig-iframe {
          width: 100%;
          height: 100%;
          min-height: 520px;
          border: none;
          border-radius: 16px 0 0 16px;
          background: #000B1E;
        }

        .stories-cta-banner {
          margin-top: 3.5rem;
          background: linear-gradient(135deg, rgba(0, 40, 85, 0.85) 0%, rgba(0, 18, 51, 0.95) 100%);
          border-radius: var(--radius-xl, 24px);
          padding: 2.25rem 2.5rem;
          border: 1px solid rgba(255, 137, 47, 0.3);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        .cta-left h3 {
          font-size: 1.5rem;
          color: #FFFFFF;
          margin-bottom: 0.35rem;
        }

        .cta-left p {
          color: #CBD5E1;
          font-size: 0.92rem;
          margin: 0;
        }

        .w-full {
          width: 100%;
          justify-content: center;
        }

        @media (max-width: 860px) {
          .reel-modal-two-col {
            grid-template-columns: 1fr;
            max-height: 90vh;
            overflow-y: auto;
          }
          .reel-modal-video-pane {
            min-height: 400px;
            height: 400px;
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
          .reel-modal-ig-iframe {
            min-height: 400px;
          }
          .reel-modal-info-pane {
            padding: 1.5rem 1.25rem;
          }
        }

        @media (max-width: 768px) {
          .stories-root {
            padding: 2.5rem 0 2rem 0;
          }
          .section-title {
            font-size: 2rem;
          }
          .stories-cta-banner {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem 1.25rem;
            gap: 1.25rem;
          }
          .cta-right {
            width: 100%;
          }
          .cta-right button {
            width: 100%;
            justify-content: center;
            min-height: 48px;
          }
        }
      `}</style>
    </section>
  );
}
