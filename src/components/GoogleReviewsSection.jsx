import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ExternalLink, 
  MapPin, 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Award, 
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { GOOGLE_REVIEWS, GOOGLE_BUSINESS_PROFILE } from '../data/toursData';
import Tilt3DCard from './animations/Tilt3DCard';

export default function GoogleReviewsSection({ onOpenQuote }) {
  const [filterTour, setFilterTour] = useState('All');
  const [helpfulLikes, setHelpfulLikes] = useState({});

  const toggleHelpful = (id) => {
    setHelpfulLikes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredReviews = filterTour === 'All' 
    ? GOOGLE_REVIEWS 
    : GOOGLE_REVIEWS.filter(r => r.tour.toLowerCase().includes(filterTour.toLowerCase()));

  return (
    <section id="google-reviews" className="google-reviews-section">
      <div className="container-custom">
        
        {/* Section Header & Google Business Card */}
        <div className="section-header-box text-center">
          <div className="google-top-badge">
            <svg className="google-icon-svg" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>OFFICIAL GOOGLE BUSINESS PROFILE</span>
          </div>

          <h2 className="section-title">
            Loved by Travelers, Rated <span className="text-gradient">4.8 on Google</span>
          </h2>
          <p className="section-subtitle">
            Authentic, unedited feedback from real travelers who planned their dream vacations with Comfort Journey Bhopal.
          </p>
        </div>

        {/* Google Business Overview Banner */}
        <div className="google-overview-card glass-card">
          <div className="overview-left">
            <div className="google-score-circle">
              <span className="score-big">{GOOGLE_BUSINESS_PROFILE.rating}</span>
              <div className="score-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#FBBC05" color="#FBBC05" />
                ))}
              </div>
              <span className="score-count">{GOOGLE_BUSINESS_PROFILE.totalReviews} Google Reviews</span>
            </div>

            <div className="overview-meta">
              <div className="meta-biz-name">
                <h3>Comfort Journey</h3>
                <span className="verified-pill">
                  <CheckCircle2 size={14} /> Verified Business
                </span>
              </div>
              <p className="meta-address">
                <MapPin size={15} className="text-amber" />
                <span>{GOOGLE_BUSINESS_PROFILE.address}</span>
              </p>
              <div className="meta-badges-row">
                <span className="biz-pill"><Award size={13} /> Top Rated Travel Agency Bhopal</span>
                <span className="biz-pill"><ShieldCheck size={13} /> 100% Genuine Reviews</span>
              </div>
            </div>
          </div>

          <div className="overview-right-actions">
            <a 
              href={GOOGLE_BUSINESS_PROFILE.googleShareUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-google-primary"
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              </svg>
              <span>View Profile on Google</span>
              <ExternalLink size={15} />
            </a>

            <a 
              href={`${GOOGLE_BUSINESS_PROFILE.googleShareUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-google-secondary"
            >
              <MessageSquare size={16} />
              <span>Write a Review</span>
            </a>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="reviews-filter-bar">
          {['All', 'Manali', 'Europe', 'Bali', 'Himachal'].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`review-filter-btn ${filterTour === cat ? 'active' : ''}`}
              onClick={() => setFilterTour(cat)}
            >
              {cat === 'All' ? 'All Reviews (85+)' : `${cat} Trips`}
            </button>
          ))}
        </div>

        {/* Real Google Reviews Grid */}
        <div className="google-reviews-grid">
          {filteredReviews.map((rev) => {
            const isLiked = helpfulLikes[rev.id];
            return (
              <div key={rev.id} className="review-grid-col">
                <Tilt3DCard maxTilt={4} scale={1.01} glare={true} className="h-full">
                  <div className="google-review-card glass-card">
                    {/* Header Row: Avatar, Name, Rating, Time */}
                    <div className="review-card-top">
                      <div className="reviewer-avatar">
                        {rev.initials}
                      </div>

                      <div className="reviewer-info">
                        <div className="reviewer-name-row">
                          <h4 className="reviewer-name">{rev.name}</h4>
                          <span className="google-badge-tag">
                            <svg viewBox="0 0 24 24" width="12" height="12">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                            </svg>
                            <span>Google Review</span>
                          </span>
                        </div>
                        <span className="reviewer-tour">{rev.tour} • <em className="review-time">{rev.timeAgo}</em></span>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="card-stars-row">
                      <div className="stars-flex">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={15} fill="#FBBC05" color="#FBBC05" />
                        ))}
                      </div>
                      <span className="verified-status">
                        <CheckCircle2 size={13} className="text-emerald" /> Verified Trip
                      </span>
                    </div>

                    {/* Review Body */}
                    <p className="review-body-text">
                      "{rev.comment}"
                    </p>

                    {/* Footer Actions */}
                    <div className="review-card-footer">
                      <button 
                        type="button" 
                        className={`helpful-btn ${isLiked ? 'active' : ''}`}
                        onClick={() => toggleHelpful(rev.id)}
                      >
                        <ThumbsUp size={13} />
                        <span>Helpful {isLiked ? '(1)' : ''}</span>
                      </button>

                      <a 
                        href={GOOGLE_BUSINESS_PROFILE.googleShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-on-google-link"
                      >
                        <span>Read on Google</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </Tilt3DCard>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Strip */}
        <div className="google-cta-box glass-card">
          <div className="cta-content">
            <div className="cta-tag">
              <Sparkles size={16} className="text-amber" />
              <span>Ready for a 5-Star Travel Experience?</span>
            </div>
            <h3>Join Hundreds of Happy Travelers in Bhopal</h3>
            <p>Speak with our dedicated travel experts. Custom itineraries, 24/7 on-tour concierge & guaranteed peace of mind.</p>
          </div>

          <div className="cta-actions">
            <button 
              type="button"
              className="btn-cta-primary"
              onClick={onOpenQuote}
            >
              <span>Get Free Custom Quote</span>
              <ArrowRight size={18} />
            </button>
            <a
              href="https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I%20saw%20your%205-star%20Google%20reviews.%20Please%20help%20me%20plan%20my%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-whatsapp"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

      <style>{`
        .google-reviews-section {
          padding: 5rem 0 4rem 0;
          position: relative;
          background: linear-gradient(180deg, #001233 0%, #001F4D 50%, #001233 100%);
          border-top: 1px solid var(--cj-glass-border);
          border-bottom: 1px solid var(--cj-glass-border);
        }

        .google-top-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1.1rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #F9FBE7;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 1rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .google-overview-card {
          margin: 2.5rem 0 2rem 0;
          padding: 2rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          border-radius: var(--radius-xl);
          background: rgba(0, 40, 85, 0.5);
          border: 1px solid rgba(111, 230, 252, 0.25);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }

        .overview-left {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex: 1;
        }

        .google-score-circle {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.25rem 1.5rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(251, 188, 5, 0.3);
          border-radius: var(--radius-lg);
          min-width: 140px;
          text-align: center;
        }

        .score-big {
          font-family: var(--font-serif);
          font-size: 2.75rem;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1;
        }

        .score-stars {
          display: flex;
          gap: 0.2rem;
          margin: 0.35rem 0 0.25rem 0;
        }

        .score-count {
          font-size: 0.78rem;
          color: #93B2D2;
          font-weight: 600;
        }

        .overview-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .meta-biz-name {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .meta-biz-name h3 {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: #FFFFFF;
          margin: 0;
        }

        .verified-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(52, 168, 83, 0.15);
          border: 1px solid rgba(52, 168, 83, 0.4);
          color: #34D399;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
        }

        .meta-address {
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
          color: #CBD5E1;
          font-size: 0.88rem;
          margin: 0;
          line-height: 1.4;
        }

        .meta-badges-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
          margin-top: 0.25rem;
        }

        .biz-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(255, 137, 47, 0.12);
          border: 1px solid rgba(255, 137, 47, 0.3);
          color: #FFB070;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
        }

        .overview-right-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          min-width: 210px;
        }

        .btn-google-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.8rem 1.25rem;
          background: #FFFFFF;
          color: #1F2937;
          font-weight: 700;
          font-size: 0.92rem;
          border-radius: var(--radius-full);
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
          transition: all 0.25s ease;
        }

        .btn-google-primary:hover {
          background: #F3F4F6;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
          color: #000000;
        }

        .btn-google-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.88rem;
          border-radius: var(--radius-full);
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .btn-google-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.4);
          color: #FFFFFF;
        }

        .reviews-filter-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }

        .review-filter-btn {
          padding: 0.5rem 1.1rem;
          border-radius: var(--radius-full);
          background: rgba(0, 40, 85, 0.4);
          border: 1px solid var(--cj-glass-border);
          color: #93B2D2;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .review-filter-btn:hover {
          color: #FFFFFF;
          border-color: #FF892F;
        }

        .review-filter-btn.active {
          background: linear-gradient(135deg, #FF892F, #E66F12);
          color: #FFFFFF;
          border-color: #FF892F;
          box-shadow: 0 4px 15px rgba(255, 137, 47, 0.35);
        }

        .google-reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .google-review-card {
          padding: 1.75rem 1.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(0, 24, 60, 0.6);
          border: 1px solid rgba(111, 230, 252, 0.18);
          border-radius: var(--radius-lg);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .google-review-card:hover {
          border-color: #FF892F;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 137, 47, 0.2);
        }

        .review-card-top {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 0.85rem;
        }

        .reviewer-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #002855, #001233);
          border: 2px solid #FF892F;
          color: #FF892F;
          font-weight: 800;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .reviewer-info {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          flex: 1;
        }

        .reviewer-name-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .reviewer-name {
          font-family: var(--font-ui);
          font-size: 0.95rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
        }

        .google-badge-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.68rem;
          color: #93B2D2;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .reviewer-tour {
          font-size: 0.78rem;
          color: #FFB070;
          font-weight: 600;
        }

        .review-time {
          font-style: normal;
          color: #64748B;
          font-weight: 400;
        }

        .card-stars-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }

        .stars-flex {
          display: flex;
          gap: 0.15rem;
        }

        .verified-status {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.72rem;
          color: #10B981;
          font-weight: 700;
        }

        .review-body-text {
          font-size: 0.9rem;
          color: #E2E8F0;
          line-height: 1.55;
          margin: 0 0 1.25rem 0;
          flex: 1;
        }

        .review-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .helpful-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: transparent;
          border: none;
          color: #94A3B8;
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s ease;
          padding: 0;
        }

        .helpful-btn:hover, .helpful-btn.active {
          color: #FF892F;
        }

        .view-on-google-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: #6FE6FC;
          font-size: 0.76rem;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .view-on-google-link:hover {
          color: #FFFFFF;
          text-decoration: underline;
        }

        .google-cta-box {
          margin-top: 3.5rem;
          padding: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          border-radius: var(--radius-xl);
          background: linear-gradient(135deg, rgba(0, 40, 85, 0.8) 0%, rgba(0, 18, 51, 0.95) 100%);
          border: 1px solid rgba(255, 137, 47, 0.3);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        .cta-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #FF892F;
          font-size: 0.82rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.4rem;
        }

        .cta-content h3 {
          font-family: var(--font-serif);
          font-size: 1.65rem;
          color: #FFFFFF;
          margin: 0 0 0.35rem 0;
        }

        .cta-content p {
          color: #CBD5E1;
          font-size: 0.92rem;
          margin: 0;
        }

        .cta-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-shrink: 0;
        }

        .btn-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.4rem;
          background: linear-gradient(135deg, #FF892F, #E66F12);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.92rem;
          border-radius: var(--radius-full);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(255, 137, 47, 0.4);
          transition: all 0.25s ease;
        }

        .btn-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 137, 47, 0.6);
        }

        .btn-cta-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.25rem;
          background: rgba(37, 211, 102, 0.15);
          border: 1px solid rgba(37, 211, 102, 0.4);
          color: #25D366;
          font-weight: 700;
          font-size: 0.92rem;
          border-radius: var(--radius-full);
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .btn-cta-whatsapp:hover {
          background: rgba(37, 211, 102, 0.25);
          transform: translateY(-2px);
          color: #25D366;
        }

        @media (max-width: 1024px) {
          .google-reviews-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .google-overview-card {
            flex-direction: column;
            text-align: center;
          }
          .overview-left {
            flex-direction: column;
            text-align: center;
          }
          .meta-address {
            justify-content: center;
          }
          .meta-badges-row {
            justify-content: center;
          }
          .overview-right-actions {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .google-reviews-section {
            padding: 3rem 0 2.5rem 0;
          }
          .section-title {
            font-size: 2.2rem;
          }
          .google-reviews-grid {
            grid-template-columns: 1fr;
          }
          .google-overview-card {
            padding: 1.5rem 1.25rem;
          }
          .overview-left {
            gap: 1.25rem;
          }
          .google-score-circle {
            width: 100%;
          }
          .google-cta-box {
            flex-direction: column;
            padding: 1.75rem 1.25rem;
            text-align: center;
          }
          .cta-actions {
            flex-direction: column;
            width: 100%;
          }
          .cta-actions button, .cta-actions a {
            width: 100%;
            justify-content: center;
            min-height: 48px;
          }
        }
      `}</style>
    </section>
  );
}
