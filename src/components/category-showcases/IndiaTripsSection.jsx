import React, { useState, useRef, useMemo } from 'react';
import { TOURS_DATA } from '../../data/toursData';
import { useCurrency } from '../../context/CurrencyContext';
import { useParticleBurst } from '../../hooks/useParticleBurst';
import Tilt3DCard from '../animations/Tilt3DCard';
import { 
  Sparkles, MapPin, Clock, Star, Hotel, Car, Utensils, Ticket, 
  ShieldCheck, ChevronLeft, ChevronRight, ArrowRight, Compass, Shield
} from 'lucide-react';

export default function IndiaTripsSection({ 
  onSelectItinerary, 
  onBookNow, 
  onOpenAIPlanner,
  onNavigateLanding 
}) {
  const { formatPrice } = useCurrency();
  const { triggerBurst } = useParticleBurst();
  const carouselRef = useRef(null);
  const [activeSubTab, setActiveSubTab] = useState('All');

  // Filter India packages from TOURS_DATA
  const indiaTours = useMemo(() => {
    return TOURS_DATA.filter(t => t.country === 'India' || t.category === 'National Tours');
  }, []);

  // Filtered by sub-region tabs
  const filteredTours = useMemo(() => {
    if (activeSubTab === 'All') return indiaTours.slice(0, 10);
    if (activeSubTab === 'Himalayas') {
      return indiaTours.filter(t => 
        (t.state && (t.state.includes('Himachal') || t.state.includes('Kashmir') || t.state.includes('Uttarakhand'))) ||
        (t.location && (t.location.includes('Kashmir') || t.location.includes('Manali') || t.location.includes('Dalhousie') || t.location.includes('Mussoorie')))
      ).slice(0, 8);
    }
    if (activeSubTab === 'Rajasthan') {
      return indiaTours.filter(t => 
        (t.state && t.state.includes('Rajasthan')) || 
        (t.location && (t.location.includes('Jaipur') || t.location.includes('Udaipur') || t.location.includes('Rajasthan')))
      ).slice(0, 8);
    }
    if (activeSubTab === 'South') {
      return indiaTours.filter(t => 
        (t.state && (t.state.includes('Kerala') || t.state.includes('Karnataka') || t.state.includes('Goa') || t.state.includes('Tamil'))) ||
        (t.location && (t.location.includes('Kerala') || t.location.includes('Coorg') || t.location.includes('Mysore') || t.location.includes('Goa')))
      ).slice(0, 8);
    }
    return indiaTours.slice(0, 10);
  }, [indiaTours, activeSubTab]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="india-trips" className="india-showcase-root">
      {/* Royal Mughal Jali Background Watermark */}
      <div className="india-jali-watermark" />
      <div className="india-glow-orb-top" />
      <div className="india-glow-orb-bottom" />

      <div className="container relative-z">
        {/* Atmospheric Section Header */}
        <div className="showcase-header">
          <div className="showcase-badge-pill india-badge">
            <span>🇮🇳</span>
            <span>ROYAL DESI HERITAGE • 80+ SIGNATURE PACKAGES</span>
          </div>
          <h2 className="showcase-title font-editorial">
            Incredible India <span className="gradient-text-gold">Luxury Collection</span>
          </h2>
          <p className="showcase-subtitle">
            You've seen the world. But have you seen royal India? Verified 5-star palace suites, private chauffeured AC sedans, and 24/7 dedicated concierge.
          </p>

          {/* Vibe Micro-Badges Strip */}
          <div className="vibe-badges-strip">
            <span className="vibe-micro-badge"><Shield size={12} className="text-amber" /> Zero Visa Drama</span>
            <span className="vibe-micro-badge">🏰 Sleep in Verified Heritage Forts</span>
            <span className="vibe-micro-badge">☕ Local Tapri Chai & Hidden Plugs</span>
            <span className="vibe-micro-badge">👑 30+ Years Royal Hospitality</span>
          </div>

          {/* Sub-region filter tabs & carousel arrow controls */}
          <div className="controls-and-tabs-bar">
            <div className="sub-region-tabs">
              {[
                { id: 'All', label: 'All India Royalty' },
                { id: 'Himalayas', label: '🏔️ Himalayas & Snow' },
                { id: 'Rajasthan', label: '🏰 Royal Rajasthan' },
                { id: 'South', label: '🌴 Kerala & South' },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  className={`sub-tab-btn ${activeSubTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveSubTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="carousel-nav-arrows">
              <button 
                type="button" 
                className="btn-carousel-arrow" 
                onClick={() => scrollCarousel('left')}
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                type="button" 
                className="btn-carousel-arrow" 
                onClick={() => scrollCarousel('right')}
                aria-label="Scroll right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel of 3D Tour Cards */}
        <div className="showcase-carousel-track" ref={carouselRef}>
          {filteredTours.map((tour) => {
            const origPrice = tour.originalPrice || Math.round(tour.price * 1.25);
            const discountPct = Math.round(((origPrice - tour.price) / origPrice) * 100);

            return (
              <div key={tour.id} className="carousel-card-slide">
                <Tilt3DCard
                  maxTilt={5}
                  scale={1.02}
                  glare={true}
                  holographic={true}
                  borderRadius="20px"
                  className="tour-tilt-container"
                >
                  <div className="tour-card glass-card india-card-border">
                    {/* Media Image */}
                    <div className="card-media">
                      <img 
                        src={tour.image} 
                        alt={tour.name} 
                        loading="lazy" 
                        width="340" 
                        height="185" 
                      />
                      <div className="media-overlay" />
                      
                      <div className="media-top-badges">
                        <span className="ribbon-badge india-ribbon">Royal India</span>
                        {discountPct > 0 && (
                          <span className="discount-ribbon">{discountPct}% OFF</span>
                        )}
                      </div>

                      <div className="media-bottom-strip">
                        <span className="compact-dur-pill">
                          <Clock size={11} className="text-cyan" />
                          <span>{tour.duration}</span>
                        </span>
                        <span className="compact-rating-pill">
                          <Star size={11} className="fill-gold text-gold" />
                          <span>{tour.rating || '4.9'} ({tour.reviews || '85+'})</span>
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="card-body">
                      <div className="compact-location-tag">
                        <MapPin size={12} className="text-amber" />
                        <span>{tour.location || tour.country}</span>
                      </div>

                      <h3 className="compact-tour-title">{tour.name}</h3>

                      {/* Inclusions Row */}
                      <div className="compact-inclusions-icon-bar">
                        <div className="inc-icon-item" title="Palace / 5-Star Stay">
                          <div className="inc-svg-badge"><Hotel size={13} className="text-amber" /></div>
                          <span className="inc-text">Stay</span>
                        </div>
                        <div className="inc-icon-item" title="Private AC Chauffeur">
                          <div className="inc-svg-badge"><Car size={13} className="text-cyan" /></div>
                          <span className="inc-text">Cab</span>
                        </div>
                        <div className="inc-icon-item" title="Breakfast & Royal Dinners">
                          <div className="inc-svg-badge"><Utensils size={13} className="text-emerald" /></div>
                          <span className="inc-text">Meals</span>
                        </div>
                        <div className="inc-icon-item" title="VIP Monument Entry">
                          <div className="inc-svg-badge"><Ticket size={13} className="text-amber" /></div>
                          <span className="inc-text">Sightseeing</span>
                        </div>
                        <div className="inc-icon-item" title="24/7 Dedicated Concierge">
                          <div className="inc-svg-badge"><ShieldCheck size={13} className="text-emerald" /></div>
                          <span className="inc-text">24/7 VIP</span>
                        </div>
                      </div>

                      {/* 2-Tier Footer Actions */}
                      <div className="compact-card-footer">
                        <div className="compact-price-box">
                          <div className="price-strike-row">
                            <span className="orig-price-strike">{formatPrice(origPrice)}</span>
                            <span className="price-save-badge">Save {formatPrice(origPrice - tour.price)}</span>
                          </div>
                          <div className="price-main-row">
                            <strong className="current-offer-price font-editorial">{formatPrice(tour.price)}</strong>
                            <span className="price-per-person">/ person</span>
                          </div>
                        </div>

                        <div className="compact-cta-actions">
                          <button 
                            type="button"
                            className="btn-itinerary-compact btn-3d-tactile"
                            onClick={() => onSelectItinerary(tour)}
                          >
                            <span>Itinerary</span>
                          </button>
                          <button 
                            type="button"
                            className="btn-book-compact btn-3d-tactile"
                            onClick={(e) => {
                              triggerBurst(e, { count: 20, colors: ['#F59E0B', '#FF892F', '#F9FBE7'] });
                              onBookNow(tour);
                            }}
                          >
                            <span>Book Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt3DCard>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Banner & Direct Landing Link */}
        <div className="showcase-bottom-dock">
          <div className="bottom-dock-info">
            <span className="dock-highlight">👑 80+ Handcrafted Domestic Packages</span>
            <p>From snow-capped Gulmarg gondolas to backwater houseboats in Alleppey.</p>
          </div>
          <div className="bottom-dock-actions">
            <button 
              type="button" 
              className="btn-explore-all-india"
              onClick={() => {
                if (onNavigateLanding) {
                  onNavigateLanding('india-packages');
                } else {
                  window.location.hash = '#/landing/india-packages';
                }
              }}
            >
              <span>Explore All 80+ India Packages</span>
              <ArrowRight size={15} />
            </button>
            <button 
              type="button" 
              className="btn-custom-india-ai"
              onClick={onOpenAIPlanner}
            >
              <Sparkles size={14} />
              <span>Tailor India Trip with AI</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .india-showcase-root {
          padding: 4.5rem 0 3.5rem 0;
          position: relative;
          background: linear-gradient(180deg, #001233 0%, #170E2B 45%, #001233 100%);
          border-top: 1px solid rgba(245, 158, 11, 0.2);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }

        .relative-z {
          position: relative;
          z-index: 2;
        }

        /* Ambient Royal Indian Atmosphere Elements */
        .india-glow-orb-top {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.16) 0%, rgba(180, 83, 9, 0.08) 50%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 1;
        }

        .india-glow-orb-bottom {
          position: absolute;
          bottom: -100px;
          left: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(217, 119, 6, 0.14) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 1;
        }

        .india-jali-watermark {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(245, 158, 11, 0.1) 1.5px, transparent 1.5px);
          background-size: 32px 32px;
          opacity: 0.35;
          pointer-events: none;
          z-index: 1;
        }

        .showcase-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .showcase-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.35rem 0.95rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 0.85rem;
        }

        .india-badge {
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.38);
          color: #F59E0B;
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.15);
        }

        .showcase-title {
          font-size: clamp(2.3rem, 4.2vw, 3.2rem);
          color: #FFFFFF;
          margin-bottom: 0.65rem;
          line-height: 1.15;
        }

        .showcase-subtitle {
          max-width: 720px;
          margin: 0 auto 1.15rem auto;
          color: #94A3B8;
          font-size: 1.02rem;
          line-height: 1.6;
        }

        .vibe-badges-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.75rem;
        }

        .vibe-micro-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.76rem;
          font-weight: 700;
          color: #F9FBE7;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.25);
          padding: 0.28rem 0.75rem;
          border-radius: 9999px;
          white-space: nowrap;
        }

        .controls-and-tabs-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          padding-bottom: 0.5rem;
        }

        .sub-region-tabs {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .sub-tab-btn {
          display: inline-flex;
          align-items: center;
          padding: 0.45rem 1.05rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #CBD5E1;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }

        .sub-tab-btn:hover {
          color: #FFFFFF;
          border-color: rgba(245, 158, 11, 0.5);
          background: rgba(245, 158, 11, 0.12);
        }

        .sub-tab-btn.active {
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          border-color: #F59E0B;
          color: #001233;
          font-weight: 800;
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.4);
        }

        .carousel-nav-arrows {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-carousel-arrow {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 29, 81, 0.85);
          border: 1.2px solid rgba(245, 158, 11, 0.3);
          color: #F59E0B;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-carousel-arrow:hover {
          background: #F59E0B;
          color: #001233;
          transform: scale(1.08);
          box-shadow: 0 0 14px rgba(245, 158, 11, 0.4);
        }

        /* Carousel Track */
        .showcase-carousel-track {
          display: flex;
          gap: 1.35rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 0.5rem 0.25rem 1.5rem 0.25rem;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .showcase-carousel-track::-webkit-scrollbar {
          display: none;
        }

        .carousel-card-slide {
          flex: 0 0 310px;
          scroll-snap-align: start;
        }

        .india-card-border {
          border-color: rgba(245, 158, 11, 0.22);
          background: rgba(0, 18, 51, 0.85);
        }

        .india-card-border:hover {
          border-color: #F59E0B;
          box-shadow: 0 16px 40px rgba(0, 18, 51, 0.8), 0 0 25px rgba(245, 158, 11, 0.25);
        }

        .india-ribbon {
          background: linear-gradient(135deg, #F59E0B, #B45309);
        }

        /* Bottom Dock */
        .showcase-bottom-dock {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(0, 29, 81, 0.65);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 16px;
          padding: 1.15rem 1.75rem;
          margin-top: 1.5rem;
          gap: 1rem;
          flex-wrap: wrap;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
        }

        .bottom-dock-info .dock-highlight {
          font-size: 0.98rem;
          font-weight: 800;
          color: #F59E0B;
          display: block;
          margin-bottom: 0.2rem;
        }

        .bottom-dock-info p {
          color: #94A3B8;
          font-size: 0.85rem;
          margin: 0;
        }

        .bottom-dock-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .btn-explore-all-india {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          color: #001233;
          font-size: 0.85rem;
          font-weight: 800;
          padding: 0.6rem 1.35rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(245, 158, 11, 0.4);
        }

        .btn-explore-all-india:hover {
          background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(245, 158, 11, 0.6);
        }

        .btn-custom-india-ai {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #F9FBE7;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.6rem 1.15rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-custom-india-ai:hover {
          background: rgba(245, 158, 11, 0.15);
          border-color: #F59E0B;
          color: #F59E0B;
        }

        @media (max-width: 768px) {
          .controls-and-tabs-bar {
            flex-direction: column;
            align-items: flex-start;
          }
          .showcase-bottom-dock {
            flex-direction: column;
            align-items: flex-start;
          }
          .bottom-dock-actions {
            width: 100%;
          }
          .btn-explore-all-india, .btn-custom-india-ai {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
