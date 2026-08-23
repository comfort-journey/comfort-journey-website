import React, { useState } from 'react';
import { TRAVELER_REELS, TESTIMONIALS } from '../data/toursData';
import { Star, Play, MessageCircle, Heart, Eye, CheckCircle2, ShieldCheck, Quote, X, Volume2, Sparkles } from 'lucide-react';
import Tilt3DCard from './animations/Tilt3DCard';
import { useParticleBurst } from '../hooks/useParticleBurst';

export default function TravelStoriesSection({ onOpenQuote }) {
  const { triggerBurst } = useParticleBurst();
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
            See how real travelers experienced their bespoke luxury vacations with Comfort Journey's 24/7 personal care since 1992.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="stories-tab-bar">
          <button 
            type="button" 
            className={`story-tab ${activeTab === 'reels' ? 'active' : ''}`}
            onClick={() => setActiveTab('reels')}
          >
            🎬 Traveler Video Stories & Reels
          </button>
          <button 
            type="button" 
            className={`story-tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            💬 Verified Google 5-Star Reviews
          </button>
        </div>

        {/* REELS VIEW */}
        {activeTab === 'reels' ? (
          <div className="reels-grid">
            {TRAVELER_REELS.map((reel) => {
              const isLiked = likedReels[reel.id];
              return (
                <Tilt3DCard key={reel.id} maxTilt={6} scale={1.03} glare={true} className="reel-tilt-wrapper">
                  <div 
                    className="reel-card"
                    onClick={() => setActiveReelModal(reel)}
                  >
                    <div className="reel-media">
                      <img 
                        src={reel.videoThumb} 
                        alt={reel.destination}
                        loading="lazy"
                        width="280"
                        height="460"
                      />
                      <div className="reel-gradient-overlay"></div>

                      {/* Views Badge */}
                      <div className="reel-views-badge">
                        <Eye size={13} />
                        <span>{reel.views} views</span>
                        <span className="reel-flag">{reel.flag}</span>
                      </div>

                      {/* Center Play Button Overlay */}
                      <div className="play-btn-circle">
                        <Play size={20} className="play-icon" />
                      </div>

                      {/* Reel Footer Details */}
                      <div className="reel-caption-box">
                        <div className="reel-user-row">
                          <div className="user-avatar-mini">
                            {reel.author.charAt(0)}
                          </div>
                          <div className="user-text">
                            <span className="user-name">{reel.author}</span>
                            <span className="dest-tag">{reel.destination} ({reel.duration})</span>
                          </div>
                          <button 
                            type="button" 
                            className={`heart-btn ${isLiked ? 'liked' : ''}`}
                            onClick={(e) => toggleLike(e, reel.id)}
                            aria-label="Like reel"
                          >
                            <Heart size={18} fill={isLiked ? '#EF4444' : 'none'} color={isLiked ? '#EF4444' : '#FFFFFF'} />
                          </button>
                        </div>

                        <p className="reel-quote">"{reel.tagline}"</p>

                        <div className="reel-stars">
                          {[...Array(reel.rating)].map((_, i) => (
                            <Star key={i} size={12} className="star-fill" />
                          ))}
                          <span className="verified-text">Verified Trip</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt3DCard>
              );
            })}
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

        {/* REEL MODAL POPUP */}
        {activeReelModal && (
          <div className="modal-overlay" onClick={() => setActiveReelModal(null)}>
            <div className="reel-modal-card" onClick={(e) => e.stopPropagation()}>
              <button className="reel-close-btn" onClick={() => setActiveReelModal(null)}>
                <X size={20} />
              </button>

              <div className="reel-modal-media">
                <img src={activeReelModal.videoThumb} alt={activeReelModal.destination} />
                <div className="reel-modal-overlay"></div>
                
                <div className="reel-modal-content">
                  <span className="badge badge-amber">{activeReelModal.flag} {activeReelModal.destination}</span>
                  <h3>"{activeReelModal.tagline}"</h3>
                  <p className="reel-modal-meta">Shared by <strong>{activeReelModal.author}</strong> • {activeReelModal.duration} Luxury Vacation</p>

                  <div className="reel-modal-actions">
                    <button 
                      className="btn-whatsapp w-full"
                      onClick={() => {
                        const msg = `Hi Comfort Journey! I saw the traveler story of ${activeReelModal.author} for ${activeReelModal.destination}. Please share package options and pricing!`;
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
          padding: 6.5rem 0;
          background: #0B0F19;
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

        .stories-tab-bar {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .story-tab {
          padding: 0.75rem 1.75rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #E2E8F0;
          font-weight: 700;
          font-size: 0.95rem;
          transition: all 0.25s ease;
        }

        .story-tab:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
        }

        .story-tab.active {
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
          border-color: var(--color-primary);
          color: #FFFFFF;
          box-shadow: 0 8px 25px rgba(255, 107, 0, 0.35);
        }

        /* Reels Grid */
        .reels-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 2rem;
        }

        .reel-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #131D33;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .reel-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(255, 107, 0, 0.5);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 107, 0, 0.2);
        }

        .reel-media {
          position: relative;
          height: 440px;
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

        .reel-views-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(0, 0, 0, 0.6);
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

        .reel-flag {
          margin-left: 0.35rem;
        }

        /* Reel Modal Card */
        .reel-modal-card {
          position: relative;
          width: 100%;
          max-width: 440px;
          border-radius: var(--radius-xl);
          overflow: hidden;
          background: #0F172A;
          border: 1px solid rgba(255, 107, 0, 0.4);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(255, 107, 0, 0.25);
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes scaleUp {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .reel-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: transform 0.2s ease;
        }

        .reel-close-btn:hover {
          transform: scale(1.1);
        }

        .reel-modal-media {
          position: relative;
          height: 580px;
        }

        .reel-modal-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .reel-modal-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(7, 11, 20, 0.95) 100%);
        }

        .reel-modal-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          z-index: 5;
        }

        .reel-modal-content h3 {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: #FFFFFF;
          line-height: 1.35;
        }

        .reel-modal-meta {
          font-size: 0.85rem;
          color: #CBD5E1;
        }

        .reel-modal-actions {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .stories-cta-banner {
            flex-direction: column;
            text-align: center;
          }
          .cta-right {
            width: 100%;
          }
          .cta-right button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
