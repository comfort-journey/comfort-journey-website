import React, { useState, useRef, useMemo } from 'react';
import { TOURS_DATA } from '../../data/toursData';
import { useCurrency } from '../../context/CurrencyContext';
import { useParticleBurst } from '../../hooks/useParticleBurst';
import Tilt3DCard from '../animations/Tilt3DCard';
import { 
  Compass, MapPin, Clock, Star, Hotel, Car, Utensils, Ticket, 
  ShieldCheck, ChevronLeft, ChevronRight, ArrowRight, Sparkles, Coffee, Luggage, Trees
} from 'lucide-react';

export default function WeekendGetawaysSection({ 
  onSelectItinerary, 
  onBookNow, 
  onOpenAIPlanner,
  onNavigateLanding 
}) {
  const { formatPrice } = useCurrency();
  const { triggerBurst } = useParticleBurst();
  const carouselRef = useRef(null);
  const [activeSubTab, setActiveSubTab] = useState('All');

  // Filter Short Duration Weekend packages from TOURS_DATA (<= 3 nights / 4 days)
  const weekendTours = useMemo(() => {
    return TOURS_DATA.filter(t => {
      if (!t.duration) return false;
      const isShort = t.duration.includes('1 Night') || t.duration.includes('2 Night') || t.duration.includes('3 Night');
      const isWeekendNamed = t.name && (t.name.toLowerCase().includes('weekend') || t.name.toLowerCase().includes('explorer') || t.name.toLowerCase().includes('quick') || t.name.toLowerCase().includes('affair'));
      return isShort || isWeekendNamed;
    });
  }, []);

  // Filtered by sub-region tabs
  const filteredTours = useMemo(() => {
    if (activeSubTab === 'All') return weekendTours.slice(0, 10);
    if (activeSubTab === 'Hills') {
      return weekendTours.filter(t => 
        (t.location && (t.location.includes('Mussoorie') || t.location.includes('Rishikesh') || t.location.includes('Haridwar') || t.location.includes('Dharamshala') || t.location.includes('Himachal'))) ||
        (t.state && (t.state.includes('Uttarakhand') || t.state.includes('Himachal')))
      ).slice(0, 8);
    }
    if (activeSubTab === 'Beach') {
      return weekendTours.filter(t => 
        (t.location && (t.location.includes('Goa') || t.location.includes('Gokarna') || t.location.includes('Kerala'))) ||
        (t.name && t.name.toLowerCase().includes('goa'))
      ).slice(0, 8);
    }
    if (activeSubTab === 'Heritage') {
      return weekendTours.filter(t => 
        (t.location && (t.location.includes('Rajasthan') || t.location.includes('Jaipur') || t.location.includes('Udaipur') || t.location.includes('Mysore'))) ||
        (t.name && t.name.toLowerCase().includes('royal'))
      ).slice(0, 8);
    }
    return weekendTours.slice(0, 10);
  }, [weekendTours, activeSubTab]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="weekend-trips" className="weekend-showcase-root">
      {/* Misty Pine Horizon Watermark & Ambient Orbs */}
      <div className="weekend-forest-orb-top" />
      <div className="weekend-forest-orb-bottom" />
      
      {/* Mountain Pine Tree Silhouette SVG Watermark along bottom */}
      <svg className="weekend-pines-silhouette" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path 
          d="M0,120 L0,80 L30,40 L60,80 L90,30 L120,80 L160,20 L200,80 L240,45 L280,80 L320,15 L360,80 L410,35 L460,80 L520,25 L570,80 L620,40 L670,80 L730,20 L790,80 L840,35 L890,80 L950,25 L1010,80 L1070,30 L1130,80 L1180,40 L1200,80 L1200,120 Z" 
          fill="rgba(16, 185, 129, 0.04)" 
        />
      </svg>

      <div className="container relative-z">
        {/* Section Header */}
        <div className="showcase-header">
          <div className="showcase-badge-pill weekend-badge">
            <Trees size={14} className="text-emerald" />
            <span>48-HOUR QUICK RECHARGE • FRIDAY TO SUNDAY ESCAPES</span>
          </div>
          <h2 className="showcase-title font-editorial">
            48-Hour Weekend <span className="gradient-text-emerald">Getaways & Resets</span>
          </h2>
          <p className="showcase-subtitle">
            Friday night. Bags packed. Let's go. 0 leave approvals needed, scenic private chauffeur pickup from your doorstep, and work Slack on mute.
          </p>

          {/* Vibe Micro-Badges Strip */}
          <div className="vibe-badges-strip">
            <span className="vibe-micro-badge weekend-micro"><Luggage size={12} className="text-emerald" /> 0 Leaves Needed</span>
            <span className="vibe-micro-badge weekend-micro"><Car size={12} className="text-emerald" /> Doorstep Chauffeur Pickup</span>
            <span className="vibe-micro-badge weekend-micro"><Coffee size={12} className="text-emerald" /> Scenic Plantation Cottages</span>
            <span className="vibe-micro-badge weekend-micro">📵 Work Slack Muted Zone</span>
          </div>

          {/* Sub-region filter tabs & carousel arrow controls */}
          <div className="controls-and-tabs-bar">
            <div className="sub-region-tabs">
              {[
                { id: 'All', label: 'All 48-Hr Getaways' },
                { id: 'Hills', label: '🌲 Misty Hill Retreats' },
                { id: 'Beach', label: '🏖️ Coastal Goa & Beach' },
                { id: 'Heritage', label: '🏰 Palace Short Breaks' },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  className={`sub-tab-btn weekend-tab ${activeSubTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveSubTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="carousel-nav-arrows">
              <button 
                type="button" 
                className="btn-carousel-arrow weekend-arrow" 
                onClick={() => scrollCarousel('left')}
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                type="button" 
                className="btn-carousel-arrow weekend-arrow" 
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
                  <div className="tour-card glass-card weekend-card-border">
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
                        <span className="ribbon-badge weekend-ribbon">Fri-Sun Ready</span>
                        {discountPct > 0 && (
                          <span className="discount-ribbon">{discountPct}% OFF</span>
                        )}
                      </div>

                      <div className="media-bottom-strip">
                        <span className="compact-dur-pill weekend-dur">
                          <Clock size={11} className="text-emerald" />
                          <span>{tour.duration}</span>
                        </span>
                        <span className="compact-rating-pill">
                          <Star size={11} className="fill-gold text-gold" />
                          <span>{tour.rating || '4.92'} ({tour.reviews || '75+'})</span>
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="card-body">
                      <div className="compact-location-tag">
                        <MapPin size={12} className="text-emerald" />
                        <span>{tour.location || tour.country}</span>
                      </div>

                      <h3 className="compact-tour-title">{tour.name}</h3>

                      {/* Inclusions Row */}
                      <div className="compact-inclusions-icon-bar weekend-inclusions">
                        <div className="inc-icon-item" title="Boutique Plantation / Hill Cottage">
                          <div className="inc-svg-badge"><Hotel size={13} className="text-emerald" /></div>
                          <span className="inc-text">Cottage</span>
                        </div>
                        <div className="inc-icon-item" title="Private AC Chauffeur Doorstep">
                          <div className="inc-svg-badge"><Car size={13} className="text-emerald" /></div>
                          <span className="inc-text">Private Cab</span>
                        </div>
                        <div className="inc-icon-item" title="Daily Breakfast & High Tea">
                          <div className="inc-svg-badge"><Utensils size={13} className="text-amber" /></div>
                          <span className="inc-text">Meals</span>
                        </div>
                        <div className="inc-icon-item" title="Local Sightseeing & Treks">
                          <div className="inc-svg-badge"><Ticket size={13} className="text-emerald" /></div>
                          <span className="inc-text">Treks</span>
                        </div>
                        <div className="inc-icon-item" title="24/7 VIP Concierge">
                          <div className="inc-svg-badge"><ShieldCheck size={13} className="text-emerald" /></div>
                          <span className="inc-text">Instant VIP</span>
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
                            <strong className="current-offer-price font-editorial text-emerald-price">{formatPrice(tour.price)}</strong>
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
                            className="btn-book-compact btn-weekend-book btn-3d-tactile"
                            onClick={(e) => {
                              triggerBurst(e, { count: 20, colors: ['#10B981', '#34D399', '#DAF561'] });
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
        <div className="showcase-bottom-dock weekend-bottom-dock">
          <div className="bottom-dock-info">
            <span className="dock-highlight text-emerald">🎒 Instant 48-Hour Weekend Escapes</span>
            <p>Under 4–6 hours drive or quick flight from Delhi, Mumbai, Bangalore, Indore & Kolkata.</p>
          </div>
          <div className="bottom-dock-actions">
            <button 
              type="button" 
              className="btn-explore-all-weekend"
              onClick={() => {
                if (onNavigateLanding) {
                  onNavigateLanding('weekend-getaways');
                } else {
                  window.location.hash = '#/landing/weekend-getaways';
                }
              }}
            >
              <span>Explore All 38+ Weekend Getaways</span>
              <ArrowRight size={15} />
            </button>
            <button 
              type="button" 
              className="btn-custom-weekend-ai"
              onClick={onOpenAIPlanner}
            >
              <Sparkles size={14} />
              <span>Plan Weekend Break with AI</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .weekend-showcase-root {
          padding: 4.5rem 0 3.5rem 0;
          position: relative;
          background: linear-gradient(180deg, #021710 0%, #05291C 50%, #021710 100%);
          border-top: 1px solid rgba(16, 185, 129, 0.25);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }

        .relative-z {
          position: relative;
          z-index: 2;
        }

        /* Ambient Forest Twilight Elements */
        .weekend-forest-orb-top {
          position: absolute;
          top: -100px;
          right: -80px;
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.08) 45%, transparent 70%);
          filter: blur(65px);
          pointer-events: none;
          z-index: 1;
        }

        .weekend-forest-orb-bottom {
          position: absolute;
          bottom: -100px;
          left: -80px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(244, 63, 94, 0.12) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 1;
        }

        .weekend-pines-silhouette {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 120px;
          pointer-events: none;
          z-index: 1;
        }

        .weekend-badge {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #10B981;
          box-shadow: 0 0 16px rgba(16, 185, 129, 0.2);
        }

        .gradient-text-emerald {
          background: linear-gradient(135deg, #34D399 0%, #10B981 50%, #059669 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .weekend-micro {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .weekend-tab:hover {
          color: #FFFFFF;
          border-color: rgba(16, 185, 129, 0.5);
          background: rgba(16, 185, 129, 0.15);
        }

        .weekend-tab.active {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          border-color: #10B981;
          color: #FFFFFF;
          font-weight: 800;
          box-shadow: 0 0 16px rgba(16, 185, 129, 0.4);
        }

        .weekend-arrow {
          border-color: rgba(16, 185, 129, 0.35);
          color: #10B981;
        }

        .weekend-arrow:hover {
          background: #10B981;
          color: #001233;
          box-shadow: 0 0 14px rgba(16, 185, 129, 0.5);
        }

        .weekend-card-border {
          border-color: rgba(16, 185, 129, 0.22);
          background: rgba(0, 18, 51, 0.85);
        }

        .weekend-card-border:hover {
          border-color: #10B981;
          box-shadow: 0 16px 40px rgba(0, 18, 51, 0.85), 0 0 25px rgba(16, 185, 129, 0.25);
        }

        .weekend-ribbon {
          background: linear-gradient(135deg, #059669, #047857);
        }

        .weekend-dur {
          border-color: rgba(16, 185, 129, 0.4);
          color: #34D399;
        }

        .weekend-inclusions {
          background: rgba(0, 29, 81, 0.6);
        }

        .text-emerald-price {
          color: #34D399;
        }

        .btn-weekend-book {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
        }

        .btn-weekend-book:hover {
          background: linear-gradient(135deg, #34D399 0%, #10B981 100%);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
        }

        .weekend-bottom-dock {
          border-color: rgba(16, 185, 129, 0.35);
          background: rgba(4, 30, 22, 0.75);
        }

        .btn-explore-all-weekend {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 800;
          padding: 0.6rem 1.35rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4);
        }

        .btn-explore-all-weekend:hover {
          background: linear-gradient(135deg, #34D399 0%, #10B981 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(16, 185, 129, 0.6);
        }

        .btn-custom-weekend-ai {
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

        .btn-custom-weekend-ai:hover {
          background: rgba(16, 185, 129, 0.15);
          border-color: #10B981;
          color: #34D399;
        }
      `}</style>
    </section>
  );
}
