import React, { useState, useRef } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ExternalLink, 
  MapPin, 
  MessageSquare, 
  ThumbsUp, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Pause, 
  Play, 
  X, 
  Quote,
  Shield,
  Heart
} from 'lucide-react';
import { GOOGLE_REVIEWS, GOOGLE_BUSINESS_PROFILE } from '../data/toursData';

export default function GoogleReviewsSection({ onOpenQuote }) {
  const [filterTour, setFilterTour] = useState('All');
  const [helpfulLikes, setHelpfulLikes] = useState({});
  const [isPaused, setIsPaused] = useState(false);
  const [selectedReviewModal, setSelectedReviewModal] = useState(null);

  const toggleHelpful = (id, e) => {
    e.stopPropagation();
    setHelpfulLikes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredReviews = filterTour === 'All' 
    ? GOOGLE_REVIEWS 
    : GOOGLE_REVIEWS.filter(r => r.tour.toLowerCase().includes(filterTour.toLowerCase()));

  // Split reviews into two distinct rows for dual opposing marquee streams
  const row1Base = filteredReviews.slice(0, Math.ceil(filteredReviews.length / 2));
  const row2Base = filteredReviews.slice(Math.ceil(filteredReviews.length / 2));

  // Repeat for seamless infinite marquee loop
  const row1Items = [...row1Base, ...row1Base, ...row1Base, ...row1Base];
  const row2Items = [...row2Base, ...row2Base, ...row2Base, ...row2Base];

  return (
    <section id="google-reviews" className="google-reviews-section">
      <div className="container-custom">
        
        {/* Section Header & Google Trust Bar */}
        <div className="reviews-top-bar">
          <div className="header-text-block">
            <div className="google-official-badge">
              <svg className="google-icon-svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>OFFICIAL GOOGLE BUSINESS REVIEWS</span>
            </div>

            <h2 className="section-title">
              Rated <span className="text-gradient-gold">4.8★ on Google</span> by Real Travelers
            </h2>
            <p className="section-subtitle">
              Authentic, unedited feedback from 85+ verified guests who booked dream vacations with Comfort Journey Bhopal.
            </p>
          </div>

          {/* Luminous Trust Trophy Centerpiece */}
          <div className="google-trophy-card glass-card">
            <div className="trophy-rating-box">
              <div className="trophy-number">{GOOGLE_BUSINESS_PROFILE.rating}</div>
              <div className="trophy-stars-col">
                <div className="stars-glow-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#FBBC05" color="#FBBC05" className="star-glow-svg" />
                  ))}
                </div>
                <span className="trophy-count-tag">{GOOGLE_BUSINESS_PROFILE.totalReviews} Verified Google Reviews</span>
              </div>
            </div>

            <div className="trophy-actions">
              <a 
                href={GOOGLE_BUSINESS_PROFILE.googleShareUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-google-action primary"
                title="Verify our authentic Google Business profile"
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>View on Google</span>
                <ExternalLink size={13} />
              </a>

              <a 
                href={GOOGLE_BUSINESS_PROFILE.googleWriteReviewUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-google-action secondary"
                title="Write and submit a review directly for Comfort Journey on Google"
              >
                <MessageSquare size={14} />
                <span>Write Review</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Filter Pills & Live Scrolling State Bar */}
        <div className="reviews-sub-bar">
          <div className="category-filter-pills">
            {['All', 'Manali', 'Europe', 'Bali', 'Himachal'].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-pill-btn ${filterTour === cat ? 'active' : ''}`}
                onClick={() => setFilterTour(cat)}
              >
                {cat === 'All' ? '🌟 All Verified Reviews (85+)' : `${cat} Trips`}
              </button>
            ))}
          </div>

          <div className="stream-control-btn">
            <button 
              type="button"
              className="pause-toggle-btn"
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? "Resume continuous stream" : "Pause stream to read"}
            >
              {isPaused ? <Play size={14} /> : <Pause size={14} />}
              <span>{isPaused ? 'Stream: Paused' : 'Hover to Pause & Read'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* DUAL OPPOSING PARALLAX MARQUEE TRACKS */}
      <div 
        className="dual-stream-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left & Right Gradient Shadow Edge Masks */}
        <div className="stream-edge-mask mask-left"></div>
        <div className="stream-edge-mask mask-right"></div>

        {/* STREAM ROW 1: Glides Left */}
        <div className={`stream-track track-left ${isPaused ? 'paused' : ''}`}>
          {row1Items.map((rev, idx) => {
            const isLiked = helpfulLikes[rev.id];
            return (
              <div 
                key={`r1-${rev.id}-${idx}`}
                className="luminous-review-card-wrap"
                onClick={() => setSelectedReviewModal(rev)}
              >
                <div className="luminous-review-card">
                  {/* Card Top: Google Icon, Reviewer Profile, Verified Stamp */}
                  <div className="card-header-flex">
                    <div className="avatar-crest-badge">
                      <div className="avatar-ring" style={{ background: rev.avatarBg || 'linear-gradient(135deg, #1A73E8, #0D47A1)' }}>
                        <span>{rev.initials}</span>
                      </div>
                      <div className="google-mini-icon" title="Verified Google Reviewer">
                        <svg viewBox="0 0 24 24" width="13" height="13">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                        </svg>
                      </div>
                    </div>

                    <div className="reviewer-meta-box">
                      <div className="name-and-stars">
                        <h4 className="reviewer-fullname">{rev.name}</h4>
                        <div className="stars-cluster">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={13} fill="#FBBC05" color="#FBBC05" />
                          ))}
                        </div>
                      </div>
                      <div className="trip-tag-line">
                        <span className="trip-tour-tag">{rev.tour}</span>
                        <span className="dot-mid">•</span>
                        <span className="trip-time-tag">{rev.timeAgo}</span>
                      </div>
                    </div>

                    <div className="verified-shield-pill" title="Verified Customer Booking">
                      <CheckCircle2 size={13} className="text-emerald" />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Review Quote Body */}
                  <div className="card-quote-body">
                    <Quote size={18} className="quote-accent-svg" />
                    <p className="quote-text-content">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Card Bottom: Helpful Button & Read More Link */}
                  <div className="card-footer-strip">
                    <button 
                      type="button" 
                      className={`like-helpful-btn ${isLiked ? 'liked' : ''}`}
                      onClick={(e) => toggleHelpful(rev.id, e)}
                    >
                      <ThumbsUp size={13} />
                      <span>Helpful {isLiked ? '(1)' : ''}</span>
                    </button>

                    <div className="read-story-hint">
                      <span>Read Full Story</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* STREAM ROW 2: Glides Right (Opposing direction for incredible dynamic movement) */}
        <div className={`stream-track track-right ${isPaused ? 'paused' : ''}`}>
          {row2Items.map((rev, idx) => {
            const isLiked = helpfulLikes[rev.id];
            return (
              <div 
                key={`r2-${rev.id}-${idx}`}
                className="luminous-review-card-wrap"
                onClick={() => setSelectedReviewModal(rev)}
              >
                <div className="luminous-review-card">
                  {/* Card Top: Google Icon, Reviewer Profile, Verified Stamp */}
                  <div className="card-header-flex">
                    <div className="avatar-crest-badge">
                      <div className="avatar-ring" style={{ background: rev.avatarBg || 'linear-gradient(135deg, #1A73E8, #0D47A1)' }}>
                        <span>{rev.initials}</span>
                      </div>
                      <div className="google-mini-icon" title="Verified Google Reviewer">
                        <svg viewBox="0 0 24 24" width="13" height="13">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                        </svg>
                      </div>
                    </div>

                    <div className="reviewer-meta-box">
                      <div className="name-and-stars">
                        <h4 className="reviewer-fullname">{rev.name}</h4>
                        <div className="stars-cluster">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={13} fill="#FBBC05" color="#FBBC05" />
                          ))}
                        </div>
                      </div>
                      <div className="trip-tag-line">
                        <span className="trip-tour-tag">{rev.tour}</span>
                        <span className="dot-mid">•</span>
                        <span className="trip-time-tag">{rev.timeAgo}</span>
                      </div>
                    </div>

                    <div className="verified-shield-pill" title="Verified Customer Booking">
                      <CheckCircle2 size={13} className="text-emerald" />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Review Quote Body */}
                  <div className="card-quote-body">
                    <Quote size={18} className="quote-accent-svg" />
                    <p className="quote-text-content">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Card Bottom: Helpful Button & Read More Link */}
                  <div className="card-footer-strip">
                    <button 
                      type="button" 
                      className={`like-helpful-btn ${isLiked ? 'liked' : ''}`}
                      onClick={(e) => toggleHelpful(rev.id, e)}
                    >
                      <ThumbsUp size={13} />
                      <span>Helpful {isLiked ? '(1)' : ''}</span>
                    </button>

                    <div className="read-story-hint">
                      <span>Read Full Story</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ultra-Polished Bottom Trust Proof Bar */}
      <div className="container-custom">
        <div className="trust-proof-banner glass-card">
          <div className="trust-badges-cluster">
            <div className="trust-badge-item">
              <Award size={18} className="text-amber" />
              <span>Bhopal’s #1 Rated Luxury Agency</span>
            </div>
            <span className="trust-badge-divider">•</span>
            <div className="trust-badge-item">
              <ShieldCheck size={18} className="text-emerald" />
              <span>100% Genuine Verified Traveler Reviews</span>
            </div>
            <span className="trust-badge-divider">•</span>
            <div className="trust-badge-item">
              <Sparkles size={18} className="text-aqua" />
              <span>Zero Planning Fee Guarantee</span>
            </div>
          </div>

          <div className="trust-banner-actions">
            <button 
              type="button"
              className="btn-quote-primary"
              onClick={onOpenQuote}
            >
              <span>Get Free Custom Quote</span>
              <ArrowRight size={15} />
            </button>
            <a
              href="https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I%20saw%20your%205-star%20Google%20reviews.%20Please%20help%20me%20plan%20my%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-pill"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* FULL REVIEW & TRAVELER STORY MODAL */}
      {selectedReviewModal && (
        <div className="review-story-modal-overlay" onClick={() => setSelectedReviewModal(null)}>
          <div className="story-modal-box glass-card" onClick={e => e.stopPropagation()}>
            <button 
              type="button" 
              className="story-modal-close"
              onClick={() => setSelectedReviewModal(null)}
              aria-label="Close story"
            >
              <X size={20} />
            </button>

            <div className="story-modal-header">
              <div className="story-avatar-crest" style={{ background: selectedReviewModal.avatarBg || 'linear-gradient(135deg, #1A73E8, #0D47A1)' }}>
                <span>{selectedReviewModal.initials}</span>
              </div>
              <div className="story-user-meta">
                <div className="story-user-name-line">
                  <h3>{selectedReviewModal.name}</h3>
                  <span className="story-verified-badge">
                    <CheckCircle2 size={13} className="text-emerald" /> Verified Traveler
                  </span>
                </div>
                <div className="story-details-row">
                  <span className="story-tour-pill">{selectedReviewModal.tour}</span>
                  <span className="story-dot">•</span>
                  <span className="story-time-ago">{selectedReviewModal.timeAgo}</span>
                </div>
              </div>
            </div>

            <div className="story-rating-score-strip">
              <div className="story-stars-flex">
                {[...Array(selectedReviewModal.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#FBBC05" color="#FBBC05" />
                ))}
              </div>
              <div className="story-google-tag">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Live Google Verified Review</span>
              </div>
            </div>

            <div className="story-quote-body">
              <Quote size={28} className="quote-big-watermark" />
              <p>{selectedReviewModal.comment}</p>
            </div>

            <div className="story-modal-footer">
              <a 
                href={GOOGLE_BUSINESS_PROFILE.googleShareUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-google-maps"
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Read Original Review on Google Maps</span>
                <ExternalLink size={14} />
              </a>

              <button 
                type="button" 
                className="btn-story-close"
                onClick={() => setSelectedReviewModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .google-reviews-section {
          padding: 4.5rem 0 3.5rem 0;
          position: relative;
          background: linear-gradient(180deg, #001233 0%, #001F4D 50%, #001233 100%);
          border-top: 1px solid rgba(111, 230, 252, 0.18);
          border-bottom: 1px solid rgba(111, 230, 252, 0.18);
          overflow: hidden;
        }

        .container-custom {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 3.5vw, 2.5rem);
          width: 100%;
        }

        /* Top Header Row */
        .reviews-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .header-text-block {
          flex: 1;
          min-width: 320px;
        }

        .google-official-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.4rem 1.1rem;
          border-radius: var(--radius-full, 9999px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #F9FBE7;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
        }

        .header-text-block .section-title {
          font-size: 2.25rem;
          font-family: var(--font-serif);
          color: #FFFFFF;
          margin: 0 0 0.45rem 0;
          line-height: 1.2;
        }

        .text-gradient-gold {
          background: linear-gradient(135deg, #FFA459 0%, #FF892F 45%, #DAF561 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 10px rgba(255, 137, 47, 0.4));
        }

        .header-text-block .section-subtitle {
          color: #CBD5E1;
          font-size: 0.95rem;
          margin: 0;
          max-width: 600px;
          line-height: 1.5;
        }

        /* Luminous Trophy Card */
        .google-trophy-card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1rem 1.6rem;
          border-radius: var(--radius-xl, 24px);
          background: linear-gradient(135deg, rgba(0, 45, 95, 0.75) 0%, rgba(0, 20, 55, 0.9) 100%);
          border: 1.5px solid rgba(255, 137, 47, 0.4);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45), 0 0 25px rgba(255, 137, 47, 0.2);
        }

        .trophy-rating-box {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .trophy-number {
          font-family: var(--font-serif);
          font-size: 2.4rem;
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1;
          text-shadow: 0 2px 12px rgba(255, 188, 5, 0.5);
        }

        .trophy-stars-col {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stars-glow-row {
          display: flex;
          gap: 0.2rem;
        }

        .star-glow-svg {
          filter: drop-shadow(0 0 6px rgba(251, 188, 5, 0.8));
        }

        .trophy-count-tag {
          font-size: 0.76rem;
          color: #F8FAFC;
          font-weight: 700;
          white-space: nowrap;
        }

        .trophy-actions {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .btn-google-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.45rem 1rem;
          border-radius: var(--radius-full, 9999px);
          font-size: 0.78rem;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .btn-google-action.primary {
          background: #FFFFFF;
          color: #0F172A;
          box-shadow: 0 4px 14px rgba(255, 255, 255, 0.25);
        }

        .btn-google-action.primary:hover {
          background: #F8FAFC;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.4);
        }

        .btn-google-action.secondary {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
        }

        .btn-google-action.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.45);
        }

        /* Sub Filter Bar */
        .reviews-sub-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .category-filter-pills {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filter-pill-btn {
          padding: 0.4rem 0.95rem;
          border-radius: var(--radius-full, 9999px);
          background: rgba(0, 35, 80, 0.6);
          border: 1px solid rgba(111, 230, 252, 0.2);
          color: #CBD5E1;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-pill-btn:hover {
          color: #FFFFFF;
          border-color: #FF892F;
          background: rgba(0, 45, 100, 0.8);
        }

        .filter-pill-btn.active {
          background: linear-gradient(135deg, #FF892F, #E66F12);
          color: #FFFFFF;
          border-color: #FF892F;
          box-shadow: 0 3px 12px rgba(255, 137, 47, 0.4);
        }

        .pause-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full, 9999px);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #F8FAFC;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pause-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.16);
          color: #FFFFFF;
        }

        /* Dual Stream Parallax Wrapper */
        .dual-stream-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          padding: 0.5rem 0 1.25rem 0;
        }

        .stream-edge-mask {
          position: absolute;
          top: 0;
          bottom: 0;
          width: clamp(90px, 14vw, 240px);
          z-index: 10;
          pointer-events: none;
        }

        .stream-edge-mask.mask-left {
          left: 0;
          background: linear-gradient(90deg, #001233 15%, rgba(0, 18, 51, 0.85) 50%, transparent 100%);
        }

        .stream-edge-mask.mask-right {
          right: 0;
          background: linear-gradient(270deg, #001233 15%, rgba(0, 18, 51, 0.85) 50%, transparent 100%);
        }

        .stream-track {
          display: flex;
          gap: 1.25rem;
          width: max-content;
          will-change: transform;
          cursor: grab;
        }

        .stream-track.track-left {
          animation: streamGlideLeft 40s linear infinite;
        }

        .stream-track.track-right {
          animation: streamGlideRight 42s linear infinite;
        }

        .stream-track.paused,
        .dual-stream-wrapper:hover .stream-track {
          animation-play-state: paused;
        }

        @keyframes streamGlideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-390px * 4 - 1.25rem * 4)); }
        }

        @keyframes streamGlideRight {
          0% { transform: translateX(calc(-390px * 4 - 1.25rem * 4)); }
          100% { transform: translateX(0); }
        }

        /* Luminous Review Card */
        .luminous-review-card-wrap {
          width: 390px;
          flex-shrink: 0;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .luminous-review-card-wrap:hover {
          transform: translateY(-6px) scale(1.015);
        }

        .luminous-review-card {
          height: 220px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.35rem 1.4rem;
          border-radius: var(--radius-xl, 22px);
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.12) 0%, rgba(0, 32, 75, 0.85) 50%, rgba(0, 20, 52, 0.95) 100%);
          border: 1.5px solid rgba(255, 137, 47, 0.35);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.55), 0 0 20px rgba(255, 137, 47, 0.12);
          backdrop-filter: blur(14px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .luminous-review-card:hover {
          border-color: #FF892F;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.75), 0 0 30px rgba(255, 137, 47, 0.35);
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.18) 0%, rgba(0, 40, 95, 0.9) 50%, rgba(0, 25, 65, 0.98) 100%);
        }

        /* Card Top Header */
        .card-header-flex {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .avatar-crest-badge {
          position: relative;
          flex-shrink: 0;
        }

        .avatar-ring {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF892F, #001233);
          border: 2px solid #FF892F;
          color: #FFFFFF;
          font-weight: 900;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 12px rgba(255, 137, 47, 0.4);
          overflow: hidden;
        }

        .reviewer-profile-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }

        .story-profile-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }

        .google-mini-icon {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 18px;
          height: 18px;
          background: #FFFFFF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
        }

        .reviewer-meta-box {
          flex: 1;
          min-width: 0;
        }

        .name-and-stars {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.4rem;
        }

        .reviewer-fullname {
          font-family: var(--font-ui);
          font-size: 0.92rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .stars-cluster {
          display: flex;
          gap: 0.12rem;
          flex-shrink: 0;
        }

        .trip-tag-line {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.74rem;
          color: #FFB070;
          font-weight: 700;
          margin-top: 0.1rem;
        }

        .trip-tour-tag {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 155px;
        }

        .dot-mid {
          color: #64748B;
        }

        .trip-time-tag {
          color: #94A3B8;
          font-weight: 500;
        }

        .verified-shield-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full, 9999px);
          background: rgba(16, 185, 129, 0.16);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #34D399;
          font-size: 0.68rem;
          font-weight: 800;
          flex-shrink: 0;
        }

        /* Card Quote Body */
        .card-quote-body {
          position: relative;
          padding: 0.25rem 0;
          flex: 1;
          display: flex;
          gap: 0.4rem;
        }

        .quote-accent-svg {
          color: rgba(255, 137, 47, 0.5);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .quote-text-content {
          font-size: 0.84rem;
          color: #F1F5F9;
          line-height: 1.48;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-weight: 500;
        }

        /* Card Footer Strip */
        .card-footer-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.65rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .like-helpful-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: transparent;
          border: none;
          color: #94A3B8;
          font-size: 0.74rem;
          font-weight: 700;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }

        .like-helpful-btn:hover, .like-helpful-btn.liked {
          color: #FF892F;
        }

        .read-story-hint {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: #6FE6FC;
          font-size: 0.76rem;
          font-weight: 800;
          transition: all 0.2s ease;
        }

        .luminous-review-card:hover .read-story-hint {
          color: #FFFFFF;
          transform: translateX(3px);
        }

        /* Trust Proof Banner */
        .trust-proof-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 1rem 1.75rem;
          border-radius: var(--radius-xl, 22px);
          background: linear-gradient(135deg, rgba(0, 35, 80, 0.7) 0%, rgba(0, 18, 51, 0.95) 100%);
          border: 1.5px solid rgba(255, 137, 47, 0.35);
          margin-top: 0.75rem;
          flex-wrap: wrap;
        }

        .trust-badges-cluster {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .trust-badge-item {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: #F8FAFC;
          font-size: 0.85rem;
          font-weight: 700;
        }

        .trust-badge-divider {
          color: #64748B;
        }

        .trust-banner-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .btn-quote-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 1.25rem;
          border-radius: var(--radius-full, 9999px);
          background: linear-gradient(135deg, #FF892F, #E66F12);
          color: #FFFFFF;
          font-size: 0.84rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(255, 137, 47, 0.4);
          transition: all 0.25s ease;
        }

        .btn-quote-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 137, 47, 0.6);
        }

        .btn-whatsapp-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.1rem;
          border-radius: var(--radius-full, 9999px);
          background: rgba(37, 211, 102, 0.16);
          border: 1px solid rgba(37, 211, 102, 0.4);
          color: #25D366;
          font-size: 0.84rem;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .btn-whatsapp-pill:hover {
          background: rgba(37, 211, 102, 0.28);
          transform: translateY(-2px);
        }

        /* Modal Popup */
        .review-story-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 10, 28, 0.85);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          padding: 1.5rem;
        }

        .story-modal-box {
          position: relative;
          width: 100%;
          max-width: 600px;
          background: rgba(0, 24, 60, 0.98);
          border: 1.5px solid rgba(255, 137, 47, 0.45);
          border-radius: var(--radius-xl, 26px);
          padding: 2.25rem;
          box-shadow: 0 25px 65px rgba(0, 0, 0, 0.85), 0 0 35px rgba(255, 137, 47, 0.25);
          animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .story-modal-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #CBD5E1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .story-modal-close:hover {
          background: rgba(255, 255, 255, 0.22);
          color: #FFFFFF;
          transform: rotate(90deg);
        }

        .story-modal-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .story-avatar-crest {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF892F, #001233);
          border: 2px solid #FF892F;
          color: #FFFFFF;
          font-weight: 900;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(255, 137, 47, 0.5);
        }

        .story-user-meta {
          flex: 1;
        }

        .story-user-name-line {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .story-user-name-line h3 {
          font-size: 1.25rem;
          color: #FFFFFF;
          margin: 0;
          font-family: var(--font-serif);
        }

        .story-verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          color: #34D399;
          font-size: 0.76rem;
          font-weight: 800;
        }

        .story-details-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          margin-top: 0.2rem;
        }

        .story-tour-pill {
          color: #FFB070;
          font-weight: 700;
        }

        .story-dot {
          color: #64748B;
        }

        .story-time-ago {
          color: #94A3B8;
        }

        .story-rating-score-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.15rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md, 12px);
          margin-bottom: 1.25rem;
        }

        .story-stars-flex {
          display: flex;
          gap: 0.2rem;
        }

        .story-google-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: #CBD5E1;
          font-weight: 700;
        }

        .story-quote-body {
          position: relative;
          padding: 0.5rem 0 1rem 0;
          max-height: 280px;
          overflow-y: auto;
        }

        .quote-big-watermark {
          color: rgba(255, 137, 47, 0.35);
          margin-bottom: 0.5rem;
        }

        .story-quote-body p {
          color: #F1F5F9;
          font-size: 0.98rem;
          line-height: 1.65;
          margin: 0;
          font-weight: 500;
        }

        .story-modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .btn-google-maps {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.65rem 1.15rem;
          border-radius: var(--radius-full, 9999px);
          background: #FFFFFF;
          color: #0F172A;
          font-weight: 800;
          font-size: 0.82rem;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.25);
        }

        .btn-google-maps:hover {
          background: #F8FAFC;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(255, 255, 255, 0.35);
        }

        .btn-story-close {
          padding: 0.6rem 1.35rem;
          border-radius: var(--radius-full, 9999px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          font-weight: 800;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-story-close:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .reviews-top-bar {
            flex-direction: column;
            align-items: flex-start;
          }

          .google-trophy-card {
            width: 100%;
            justify-content: space-between;
          }

          .trust-proof-banner {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .trust-banner-actions {
            width: 100%;
          }

          .btn-quote-primary, .btn-whatsapp-pill {
            flex: 1;
            justify-content: center;
          }
        }

        @media (max-width: 600px) {
          .google-reviews-section {
            padding: 3rem 0 2rem 0;
          }

          .header-text-block .section-title {
            font-size: 1.75rem;
          }

          .google-trophy-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .trophy-actions {
            width: 100%;
            flex-direction: row;
          }

          .btn-google-action {
            flex: 1;
          }

          .luminous-review-card-wrap {
            width: 320px;
          }

          .luminous-review-card {
            height: 230px;
            padding: 1.15rem;
          }
        }
      `}</style>
    </section>
  );
}

