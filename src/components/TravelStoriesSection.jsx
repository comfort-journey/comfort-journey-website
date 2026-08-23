import React, { useState, useRef } from 'react';
import { TRAVELER_REELS, TESTIMONIALS } from '../data/toursData';
import { Star, Play, MessageCircle, Heart, Eye, CheckCircle2, ShieldCheck, Quote, X, Volume2, Sparkles, ChevronLeft, ChevronRight, Instagram, ExternalLink } from 'lucide-react';
import Tilt3DCard from './animations/Tilt3DCard';
import { useParticleBurst } from '../hooks/useParticleBurst';

export default function TravelStoriesSection({ onOpenQuote }) {
  const { triggerBurst } = useParticleBurst();
  const reelsScrollRef = useRef(null);
  const [activeTab, setActiveTab] = useState('reels'); // 'reels' or 'reviews'
  const [likedReels, setLikedReels] = useState({});
  const [activeReelModal, setActiveReelModal] = useState(null);

  const toggleLike = (e, id) => {
    e.stopPropagation();
    if (!likedReels[id]) {
      triggerBurst(e, { count: 16, colors: ['#EF4444', '#FF892F', '#F9FBE7'] });
    }
    setLikedReels(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleScrollReels = (direction) => {
    if (reelsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      reelsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="stories" className="stories-root">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="google-rating-pill">
            <Star size={14} className="star-fill" />
            <span>4.95 ★★★★★ Google Verified Traveler Rating (50,000+ Delighted Guests)</span>
          </div>
          <h2 className="section-title font-editorial">
            Real Moments, <span className="gradient-text-gold">Unforgettable Journeys</span>
          </h2>
          <p className="section-subtitle">
            Watch real traveler stories & Instagram reels from our bespoke luxury vacations worldwide since 1992.
          </p>
        </div>

        {/* View Switcher Tabs with Carousel Navigation Buttons */}
        <div className="stories-tab-bar-container">
          <div className="stories-tab-bar">
            <button 
              type="button" 
              className={`story-tab ${activeTab === 'reels' ? 'active' : ''}`}
              onClick={() => setActiveTab('reels')}
            >
              <Instagram size={18} className="text-instagram" />
              🎬 Instagram Stories & Reels ({TRAVELER_REELS.length})
            </button>
            <button 
              type="button" 
              className={`story-tab ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <ShieldCheck size={18} className="text-emerald" />
              ⭐ Verified Client Reviews
            </button>
          </div>

          {activeTab === 'reels' && (
            <div className="reels-nav-controls">
              <button 
                type="button" 
                className="reel-nav-btn" 
                onClick={() => handleScrollReels('left')}
                aria-label="Previous Reels"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                type="button" 
                className="reel-nav-btn" 
                onClick={() => handleScrollReels('right')}
                aria-label="Next Reels"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* REELS VIEW - Single Row Carousel */}
        {activeTab === 'reels' ? (
          <div className="reels-carousel-wrapper">
            <div className="reels-grid-single-row" ref={reelsScrollRef}>
              {TRAVELER_REELS.map((reel) => {
                const isLiked = likedReels[reel.id];
                return (
                  <div key={reel.id} className="reel-item-col">
                    <Tilt3DCard maxTilt={5} scale={1.02} glare={true} className="reel-tilt-wrapper">
                      <div 
                        className="reel-card"
                        onClick={() => setActiveReelModal(reel)}
                      >
                        <div className="reel-media">
                          {/* Live Instagram Embed Preview Frame */}
                          <iframe
                            src={`https://www.instagram.com/reel/${reel.reelId}/embed/`}
                            className="reel-card-ig-iframe"
                            frameBorder="0"
                            scrolling="no"
                            allowFullScreen
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                            title={`Instagram Reel ${reel.destination}`}
                          ></iframe>

                          {/* Quick Overlay Action Bar */}
                          <div className="reel-card-footer-strip">
                            <div className="reel-card-meta-title">
                              <span className="reel-dest-flag">{reel.flag}</span>
                              <span className="reel-dest-name">{reel.destination}</span>
                            </div>
                            <div className="reel-card-action-btns">
                              <button
                                type="button"
                                className="reel-play-chip"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveReelModal(reel);
                                }}
                              >
                                <Play size={13} fill="#FFFFFF" />
                                <span>Play Reel</span>
                              </button>
                              <a
                                href={reel.instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="reel-ig-chip"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Instagram size={13} />
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
        ) : (
          /* REVIEWS VIEW */
          <div className="reviews-grid">
            {TESTIMONIALS.map((rev, idx) => (
              <div key={idx} className="review-card glass-card">
                <Quote size={32} className="quote-watermark" />
                <div className="rev-rating">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-fill" />
                  ))}
                </div>
                <p className="rev-comment">"{rev.comment}"</p>

                <div className="rev-author-box">
                  <img src={rev.avatar} alt={rev.name} className="author-img" />
                  <div className="author-details">
                    <h4 className="author-name">{rev.name}</h4>
                    <span className="author-loc">{rev.location} • <em>{rev.tour}</em></span>
                  </div>
                  <CheckCircle2 size={18} className="text-emerald verified-icon" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LIVE INSTAGRAM REEL MODAL POPUP */}
        {activeReelModal && (
          <div className="modal-overlay" onClick={() => setActiveReelModal(null)}>
            <div className="reel-modal-card live-video-modal" onClick={(e) => e.stopPropagation()}>
              <button className="reel-close-btn" onClick={() => setActiveReelModal(null)} aria-label="Close Reel">
                <X size={22} />
              </button>

              <div className="reel-modal-two-col">
                {/* Left Column: Live Instagram Embed Player */}
                <div className="reel-modal-video-pane">
                  <iframe
                    src={`https://www.instagram.com/reel/${activeReelModal.reelId}/embed/`}
                    className="reel-modal-ig-iframe"
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title={`Instagram Reel Video ${activeReelModal.destination}`}
                  ></iframe>
                </div>

                {/* Right Column: Story Details & Booking CTAs */}
                <div className="reel-modal-info-pane">
                  <div className="reel-modal-badges">
                    <span className="badge badge-amber">{activeReelModal.flag} {activeReelModal.destination}</span>
                    <span className="badge badge-ig"><Instagram size={13} /> Official Reel</span>
                  </div>

                  <h3 className="modal-reel-heading">"{activeReelModal.tagline}"</h3>
                  
                  <div className="reel-modal-stats-box">
                    <div className="stat-line">
                      <span>Shared by:</span>
                      <strong>{activeReelModal.author}</strong>
                    </div>
                    <div className="stat-line">
                      <span>Duration:</span>
                      <strong>{activeReelModal.duration} Bespoke Trip</strong>
                    </div>
                    <div className="stat-line">
                      <span>Instagram Views:</span>
                      <strong>{activeReelModal.views} Views</strong>
                    </div>
                  </div>

                  <div className="reel-modal-actions">
                    {activeReelModal.instagramUrl && (
                      <a 
                        href={activeReelModal.instagramUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-instagram w-full"
                      >
                        <Instagram size={18} />
                        <span>Watch on Instagram App</span>
                        <ExternalLink size={15} />
                      </a>
                    )}
                    <button 
                      className="btn-whatsapp w-full"
                      onClick={() => {
                        const msg = `Hi Comfort Journey! I saw your Instagram reel for ${activeReelModal.destination} (${activeReelModal.instagramUrl || ''}). Please share customized package options!`;
                        window.open(`https://wa.me/918770403315?text=${encodeURIComponent(msg)}`, '_blank');
                      }}
                    >
                      <MessageCircle size={18} />
                      Plan Similar Trip on WhatsApp
                    </button>
                    <button 
                      className="btn-primary w-full"
                      onClick={() => {
                        setActiveReelModal(null);
                        onOpenQuote();
                      }}
                    >
                      <Sparkles size={18} />
                      Get Instant Custom Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Strip */}
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
          padding: 3.5rem 0 2.5rem 0;
          background: #001233;
          color: #FFFFFF;
        }

        .google-rating-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 184, 0, 0.12);
          border: 1px solid rgba(255, 184, 0, 0.3);
          color: #FFB800;
          padding: 0.35rem 0.95rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
        }

        .star-fill {
          color: #FFB800;
          fill: #FFB800;
        }

        .stories-tab-bar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .stories-tab-bar {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .reels-nav-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .reel-nav-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #F9FBE7;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .reel-nav-btn:hover {
          background: rgba(255, 137, 47, 0.25);
          border-color: #FF892F;
          color: #FF892F;
          transform: scale(1.08);
        }

        .story-tab {
          padding: 0.65rem 1.5rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #E2E8F0;
          font-weight: 700;
          font-size: 0.9rem;
          transition: all 0.25s ease;
        }

        .story-tab:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
        }

        .story-tab.active {
          background: linear-gradient(135deg, var(--cj-amber-500, #FF892F), var(--cj-amber-700, #E66F12));
          border-color: var(--cj-amber-500, #FF892F);
          color: #FFFFFF;
          box-shadow: 0 6px 20px rgba(255, 137, 47, 0.35);
        }

        /* Reels Single-Row Carousel */
        .reels-carousel-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .reels-grid-single-row {
          display: flex;
          gap: 1.25rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 0.5rem 0.25rem 1.25rem 0.25rem;
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
          flex: 0 0 260px;
          scroll-snap-align: start;
        }

        .reel-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #001D51;
          border: 1px solid rgba(111, 230, 252, 0.18);
          box-shadow: 0 14px 30px rgba(0, 18, 51, 0.6);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .reel-card:hover {
          transform: translateY(-6px);
          border-color: #FF892F;
          box-shadow: 0 20px 40px rgba(0, 18, 51, 0.8), 0 0 20px rgba(255, 137, 47, 0.25);
        }

        .reel-media {
          position: relative;
          height: 380px;
          overflow: hidden;
        }

        .reel-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .reel-card:hover .reel-media img {
          transform: scale(1.08);
        }

        .reel-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 40%, rgba(7, 11, 20, 0.95) 100%);
        }

        .reel-top-bar {
          position: absolute;
          top: 0.85rem;
          left: 0.85rem;
          right: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 2;
        }

        .reel-ig-badge {
          background: linear-gradient(135deg, #E1306C, #FD1D1D, #F56040);
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.3rem;
          box-shadow: 0 4px 12px rgba(225, 48, 108, 0.4);
        }

        .text-instagram {
          color: #E1306C;
        }

        .reel-views-badge {
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .reel-modal-badges {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .badge-ig {
          background: linear-gradient(135deg, rgba(225, 48, 108, 0.25), rgba(245, 96, 64, 0.25));
          border: 1px solid rgba(225, 48, 108, 0.5);
          color: #FF8BA7;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
        }

        .btn-instagram {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem 1.25rem;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, #833AB4, #FD1D1D, #FCAF45);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.92rem;
          box-shadow: 0 4px 18px rgba(225, 48, 108, 0.4);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
        }

        .btn-instagram:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(225, 48, 108, 0.6);
          color: #FFFFFF;
        }

        .play-btn-circle {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(255, 107, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          box-shadow: 0 0 25px rgba(255, 107, 0, 0.6);
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .reel-card:hover .play-btn-circle {
          transform: translate(-50%, -50%) scale(1.15);
          background: var(--color-primary);
        }

        .play-icon {
          margin-left: 3px;
        }

        .reel-caption-box {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .reel-user-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .user-avatar-mini {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--color-primary);
          color: #FFFFFF;
          font-weight: 800;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .user-text {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .user-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.2;
        }

        .dest-tag {
          font-size: 0.72rem;
          color: var(--color-primary);
          font-weight: 600;
        }

        .heart-btn {
          color: #FFFFFF;
          padding: 0.25rem;
          transition: transform 0.2s ease;
        }

        .heart-btn:hover {
          transform: scale(1.2);
        }

        .reel-quote {
          font-size: 0.84rem;
          color: #E2E8F0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .reel-stars {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .verified-text {
          font-size: 0.7rem;
          color: var(--color-accent);
          font-weight: 700;
          margin-left: 0.35rem;
          text-transform: uppercase;
        }

        /* Reviews Grid */
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .review-card {
          background: #131D33;
          border-radius: var(--radius-lg);
          padding: 2.25rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        .quote-watermark {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          color: rgba(255, 255, 255, 0.05);
        }

        .rev-rating {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 1.25rem;
        }

        .rev-comment {
          font-size: 0.95rem;
          color: #E2E8F0;
          line-height: 1.65;
          margin-bottom: 2rem;
          font-style: italic;
        }

        .rev-author-box {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .author-img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--color-primary);
        }

        .author-details {
          flex: 1;
        }

        .author-name {
          font-size: 1rem;
          color: #FFFFFF;
          font-weight: 700;
        }

        .author-loc {
          font-size: 0.78rem;
          color: #94A3B8;
        }

        .stories-cta-banner {
          margin-top: 4rem;
          background: linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          border: 1px solid rgba(139, 92, 246, 0.3);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
        }

        .cta-left h3 {
          font-size: 1.5rem;
          color: #FFFFFF;
          margin-bottom: 0.35rem;
        }

        .cta-left p {
          color: #C7D2FE;
          font-size: 0.95rem;
        }

        .reel-item-col {
          width: 320px;
          min-width: 300px;
          flex-shrink: 0;
        }

        .reel-card {
          position: relative;
          height: 490px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #001233;
          border: 1px solid rgba(111, 230, 252, 0.25);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .reel-card:hover {
          border-color: #FF892F;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 137, 47, 0.25);
        }

        .reel-media {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .reel-card-ig-iframe {
          width: 100%;
          height: 100%;
          min-height: 430px;
          border: none;
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
          background: #000000;
        }

        .reel-card-footer-strip {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(0, 18, 51, 0.95) 40%, rgba(0, 18, 51, 1) 100%);
          padding: 1.25rem 0.85rem 0.75rem 0.85rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          z-index: 5;
        }

        .reel-card-meta-title {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-ui);
          font-weight: 700;
          font-size: 0.82rem;
          color: #F9FBE7;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 150px;
        }

        .reel-card-action-btns {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .reel-play-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, #FF892F, #E66F12);
          color: #FFFFFF;
          font-weight: 800;
          font-size: 0.76rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(255, 137, 47, 0.4);
          transition: transform 0.2s ease;
        }

        .reel-play-chip:hover {
          transform: scale(1.05);
        }

        .reel-ig-chip {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #E1306C, #F56040);
          color: #FFFFFF;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(225, 48, 108, 0.4);
          transition: transform 0.2s ease;
        }

        .reel-ig-chip:hover {
          transform: scale(1.1);
        }

        /* Live Video Modal Card */
        .live-video-modal {
          max-width: 820px !important;
          width: 95%;
          background: rgba(0, 18, 51, 0.98);
          border: 1px solid rgba(255, 137, 47, 0.4);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(255, 137, 47, 0.25);
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .reel-modal-two-col {
          display: grid;
          grid-template-columns: 360px 1fr;
          min-height: 520px;
        }

        .reel-modal-video-pane {
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 520px;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }

        .reel-modal-ig-iframe {
          width: 100%;
          height: 100%;
          min-height: 520px;
          border: none;
        }

        .reel-modal-info-pane {
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.25rem;
          color: #FFFFFF;
        }

        .modal-reel-heading {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: #F9FBE7;
          line-height: 1.35;
        }

        .reel-modal-stats-box {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(111, 230, 252, 0.15);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .stat-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.88rem;
        }

        .stat-line span {
          color: #93B2D2;
        }

        .stat-line strong {
          color: #FFFFFF;
          font-family: var(--font-ui);
        }

        .reel-modal-actions {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .reel-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
          cursor: pointer;
          border: 1px solid var(--cj-glass-border);
          transition: transform 0.2s ease;
        }

        .reel-close-btn:hover {
          transform: scale(1.1);
        }

        @media (max-width: 860px) {
          .reel-modal-two-col {
            grid-template-columns: 1fr;
            max-height: 90vh;
            overflow-y: auto;
          }
          .reel-modal-video-pane {
            min-height: 440px;
            height: 440px;
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
          .reel-modal-ig-iframe {
            min-height: 440px;
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
            font-size: 2.2rem;
          }
          .google-rating-pill {
            font-size: 0.76rem;
            padding: 0.4rem 0.85rem;
            text-align: center;
          }
          .stories-tab-bar {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .story-tab {
            width: 100%;
            justify-content: center;
            min-height: 44px;
            font-size: 0.92rem;
          }
          .reels-nav-controls {
            display: none;
          }
          .reviews-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .review-card {
            padding: 1.5rem 1.25rem;
          }
          .stories-cta-banner {
            flex-direction: column;
            text-align: center;
            padding: 1.75rem 1.25rem;
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
