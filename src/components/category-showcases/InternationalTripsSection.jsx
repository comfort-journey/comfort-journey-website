import React, { useState, useRef, useMemo } from 'react';
import { useLiveTours } from '../../hooks/useLiveContent';
import { useCurrency } from '../../context/CurrencyContext';
import { useParticleBurst } from '../../hooks/useParticleBurst';
import Tilt3DCard from '../animations/Tilt3DCard';
import { 
  Globe, Plane, MapPin, Clock, Star, Hotel, Car, Utensils, Ticket, 
  ShieldCheck, ChevronLeft, ChevronRight, ArrowRight, Sparkles, FileText, CheckCircle2,
  Compass, Palmtree, SunMedium, Landmark
} from 'lucide-react';

const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';



/* ═══ FLOATING STAR CONSTELLATION PARTICLES ═══ */
const ConstellationStars = () => (
  <div className="intl-stars-field" aria-hidden="true">
    {Array.from({ length: 30 }).map((_, i) => (
      <div key={i} className="intl-star-particle" style={{
        left: `${3 + (i * 3.33) % 94}%`,
        top: `${5 + (i * 4.47) % 90}%`,
        animationDelay: `${(i * 0.8) % 10}s`,
        animationDuration: `${4 + (i % 6) * 2}s`,
        '--star-size': `${1.5 + (i % 3) * 1}px`,
      }}/>
    ))}
  </div>
);


export default function InternationalTripsSection({ 
  onSelectItinerary, 
  onBookNow, 
  onOpenAIPlanner,
  onNavigateLanding 
}) {
  const TOURS_DATA = useLiveTours();
  const { formatPrice } = useCurrency();
  const { triggerBurst } = useParticleBurst();
  const carouselRef = useRef(null);
  const [activeSubTab, setActiveSubTab] = useState('All');

  // Filter International packages from TOURS_DATA
  const intlTours = useMemo(() => {
    return TOURS_DATA.filter(t => t.country !== 'India' && t.category !== 'National Tours');
  }, [TOURS_DATA]);

  // Filtered by sub-region tabs
  const filteredTours = useMemo(() => {
    if (activeSubTab === 'All') return intlTours;
    if (activeSubTab === 'Europe') {
      return intlTours.filter(t => 
        (t.continent && t.continent.includes('Europe')) || 
        (t.name && (t.name.includes('Europe') || t.name.includes('Rome') || t.name.includes('Zurich') || t.name.includes('Alps')))
      );
    }
    if (activeSubTab === 'Tropical') {
      return intlTours.filter(t => 
        (t.country && (t.country.includes('Indonesia') || t.country.includes('Thailand') || t.country.includes('Bali'))) ||
        (t.name && (t.name.includes('Bali') || t.name.includes('Phuket') || t.name.includes('Krabi')))
      );
    }
    if (activeSubTab === 'MiddleEast') {
      return intlTours.filter(t => 
        (t.country && (t.country.includes('UAE') || t.country.includes('Dubai'))) ||
        (t.name && (t.name.includes('Dubai') || t.name.includes('Abu Dhabi')))
      );
    }
    return intlTours;
  }, [intlTours, activeSubTab]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="intl-trips" className="intl-showcase-root">
      
      {/* ═══ IMMERSIVE ATMOSPHERIC BACKGROUND LAYERS ═══ */}
      {/* Layer 1: Constellation Star Field */}
      <ConstellationStars />
      
      {/* Layer 2: Enhanced Aurora Glow Orbs */}
      <div className="intl-aurora-orb-top" />
      <div className="intl-aurora-orb-bottom" />
      <div className="intl-aurora-orb-center" />

      <div className="container relative-z">
        {/* Section Header - Clean, Modern Luxury Aesthetic */}
        <div className="showcase-header">
          <div className="showcase-badge-pill intl-badge">
            <Globe size={14} className="text-cyan animate-pulse" />
            <span>WORLD PASSPORT COLLECTION</span>
          </div>
          <h2 className="showcase-title font-editorial">
            Global Escapes <span className="gradient-text-cyan-emerald">& Signature Journeys</span>
          </h2>
          <p className="showcase-subtitle">
            Hassle-free international vacations with complete visa filing, private airport transfers, and central 4★ & 5★ boutique stays.
          </p>

          {/* Vibe Micro-Badges Strip */}
          <div className="vibe-badges-strip">
            <span className="vibe-micro-badge"><FileText size={12} className="text-cyan" /> Visa Filing Assistance</span>
            <span className="vibe-micro-badge"><Plane size={12} className="text-cyan" /> Private Airport Transfers</span>
            <span className="vibe-micro-badge"><Hotel size={12} className="text-cyan" /> Central 4★/5★ Stays</span>
            <span className="vibe-micro-badge"><Clock size={12} className="text-cyan" /> 24/7 Global Concierge</span>
          </div>

          {/* Sub-region filter tabs & carousel arrow controls */}
          <div className="controls-and-tabs-bar">
            <div className="sub-region-tabs">
              {[
                { id: 'All', label: 'All World Destinations', icon: <Compass size={14} className="text-cyan" /> },
                { id: 'Europe', label: 'Europe Signature', icon: <Landmark size={14} className="text-cyan" /> },
                { id: 'Tropical', label: 'Bali & Thailand', icon: <Palmtree size={14} className="text-cyan" /> },
                { id: 'MiddleEast', label: 'Dubai Red Dunes', icon: <SunMedium size={14} className="text-cyan" /> },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  className={`sub-tab-btn intl-tab ${activeSubTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveSubTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="carousel-nav-arrows">
              <button 
                type="button" 
                className="btn-carousel-arrow intl-arrow" 
                onClick={() => scrollCarousel('left')}
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                type="button" 
                className="btn-carousel-arrow intl-arrow" 
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
                  <div className="tour-card glass-card intl-card-border">
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
                        <span className="ribbon-badge intl-ribbon">Global Stamp</span>
                        {discountPct > 0 && (
                          <span className="discount-ribbon">{discountPct}% OFF</span>
                        )}
                      </div>

                      <div className="media-bottom-strip">
                        <span className="compact-dur-pill intl-dur">
                          <Clock size={11} className="text-cyan" />
                          <span>{tour.duration}</span>
                        </span>
                        <span className="compact-rating-pill">
                          <Star size={11} className="fill-gold text-gold" />
                          <span>{tour.rating || '4.95'} ({tour.reviews || '90+'})</span>
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="card-body">
                      <div className="compact-location-tag">
                        <Globe size={12} className="text-cyan" />
                        <span>{tour.location || tour.country}</span>
                      </div>

                      <h3 className="compact-tour-title">{tour.name}</h3>

                      {/* Inclusions Row */}
                      <div className="compact-inclusions-icon-bar intl-inclusions">
                        <div className="inc-icon-item" title="Central 5-Star Stay">
                          <div className="inc-svg-badge"><Hotel size={13} className="text-cyan" /></div>
                          <span className="inc-text">Stay</span>
                        </div>
                        <div className="inc-icon-item" title="Private Airport Chauffeur">
                          <div className="inc-svg-badge"><Car size={13} className="text-cyan" /></div>
                          <span className="inc-text">Chauffeur</span>
                        </div>
                        <div className="inc-icon-item" title="Daily Breakfast & Dinner Buffets">
                          <div className="inc-svg-badge"><Utensils size={13} className="text-emerald" /></div>
                          <span className="inc-text">Meals</span>
                        </div>
                        <div className="inc-icon-item" title="Visa Docs & Fast-Track Passes">
                          <div className="inc-svg-badge"><Ticket size={13} className="text-amber" /></div>
                          <span className="inc-text">Passes</span>
                        </div>
                        <div className="inc-icon-item" title="24/7 Global Timezone Support">
                          <div className="inc-svg-badge"><ShieldCheck size={13} className="text-emerald" /></div>
                          <span className="inc-text">Global VIP</span>
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
                            <strong className="current-offer-price font-editorial text-cyan-price">{formatPrice(tour.price)}</strong>
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
                            className="btn-book-compact btn-intl-book btn-3d-tactile"
                            onClick={(e) => {
                              triggerBurst(e, { count: 20, colors: ['#38BDF8', '#6FE6FC', '#DAF561'] });
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
        <div className="showcase-bottom-dock intl-bottom-dock">
          <div className="bottom-dock-info">
            <span className="dock-highlight text-cyan">✈️ Seamless Schengen, Bali & Dubai Visas</span>
            <p>100% end-to-end appointment scheduling, document prep, and private Mercedes arrival transfers.</p>
          </div>
          <div className="bottom-dock-actions">
            <button 
              type="button" 
              className="btn-explore-all-intl"
              onClick={() => {
                if (onNavigateLanding) {
                  onNavigateLanding('international-packages');
                } else {
                  window.location.hash = '#/landing/international-packages';
                }
              }}
            >
              <span>Explore All International Packages</span>
              <ArrowRight size={15} />
            </button>
            <button 
              type="button" 
              className="btn-custom-intl-ai"
              onClick={onOpenAIPlanner}
            >
              <Sparkles size={14} />
              <span>Plan Custom Global Trip with AI</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .intl-showcase-root {
          padding: 6.5rem 0 5.5rem 0;
          position: relative;
          background: 
            linear-gradient(180deg, #0B1120 0%, rgba(11, 17, 32, 0.82) 10%, rgba(0, 25, 68, 0.60) 50%, rgba(11, 17, 32, 0.84) 90%, #0B1120 100%),
            url('${basePrefix}backgrounds/global-escapes-iceland-waterfall.webp') center 40% / cover no-repeat;
          border-top: none;
          border-bottom: none;
          overflow-x: clip;
          overflow-y: visible;
        }

        .relative-z {
          position: relative;
          z-index: 5;
        }



        /* ═══════════════════════════════════════════
           FLOATING PASSPORT STAMPS
           ═══════════════════════════════════════════ */
        .intl-passport-field {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          overflow: hidden;
        }

        .passport-stamp {
          position: absolute;
          animation: stampFloat 20s ease-in-out infinite alternate;
        }

        .stamp-border {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 6px 12px;
          border: 1.5px solid rgba(56, 189, 248, 0.12);
          border-radius: 4px;
          opacity: 0.12;
          transition: opacity 0.3s;
        }

        .stamp-main {
          font-size: 0.6rem;
          font-weight: 900;
          letter-spacing: 0.15em;
          color: rgba(56, 189, 248, 0.6);
          text-transform: uppercase;
        }

        .stamp-sub {
          font-size: 0.45rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: rgba(56, 189, 248, 0.35);
          text-transform: uppercase;
          margin-top: 1px;
        }

        @keyframes stampFloat {
          0% { transform: rotate(var(--rot, 0deg)) translateY(0); opacity: 0.08; }
          50% { opacity: 0.18; }
          100% { transform: rotate(var(--rot, 0deg)) translateY(-15px); opacity: 0.08; }
        }

        /* ═══════════════════════════════════════════
           CONSTELLATION STAR PARTICLES
           ═══════════════════════════════════════════ */
        .intl-stars-field {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          overflow: hidden;
        }

        .intl-star-particle {
          position: absolute;
          width: var(--star-size, 2px);
          height: var(--star-size, 2px);
          border-radius: 50%;
          background: rgba(56, 189, 248, 0.6);
          box-shadow: 0 0 4px rgba(56, 189, 248, 0.4);
          animation: starTwinkle var(--twinkle-dur, 6s) ease-in-out infinite;
        }

        @keyframes starTwinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }

        /* ═══════════════════════════════════════════
           FLYING AIRPLANE
           ═══════════════════════════════════════════ */
        .intl-flying-plane {
          position: absolute;
          z-index: 3;
          pointer-events: none;
          color: rgba(56, 189, 248, 0.2);
          filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.15));
          animation: planeTravel 25s linear infinite;
        }

        @keyframes planeTravel {
          0% { 
            top: 65%;
            left: -5%;
            transform: rotate(-20deg);
            opacity: 0;
          }
          5% { opacity: 0.3; }
          50% {
            top: 20%;
            left: 50%;
            transform: rotate(-10deg);
            opacity: 0.25;
          }
          95% { opacity: 0.3; }
          100% {
            top: 35%;
            left: 105%;
            transform: rotate(-5deg);
            opacity: 0;
          }
        }

        /* ═══════════════════════════════════════════
           ENHANCED AURORA ORBS
           ═══════════════════════════════════════════ */
        .intl-aurora-orb-top {
          position: absolute;
          top: -140px;
          right: -80px;
          width: 650px;
          height: 650px;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(3, 105, 161, 0.1) 40%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
          animation: auroraFloat 10s ease-in-out infinite alternate;
        }

        .intl-aurora-orb-bottom {
          position: absolute;
          bottom: -120px;
          left: -80px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, rgba(88, 28, 135, 0.06) 50%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
          animation: auroraFloat 12s ease-in-out infinite alternate-reverse;
        }

        .intl-aurora-orb-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 900px;
          height: 350px;
          background: radial-gradient(ellipse, rgba(56, 189, 248, 0.04) 0%, rgba(45, 212, 191, 0.02) 50%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 1;
        }

        @keyframes auroraFloat {
          0% { opacity: 0.6; transform: scale(1) translateY(0); }
          100% { opacity: 1; transform: scale(1.1) translateY(-15px); }
        }



        /* ═══════════════════════════════════════════
           HEADER, BADGES, TABS
           ═══════════════════════════════════════════ */
        .intl-badge {
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.4);
          color: #38BDF8;
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.25), inset 0 0 12px rgba(56, 189, 248, 0.08);
        }

        .gradient-text-cyan-emerald {
          background: linear-gradient(135deg, #6FE6FC 0%, #38BDF8 40%, #2DD4BF 75%, #10B981 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .intl-tab {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
        }

        .intl-tab:hover {
          color: #FFFFFF;
          border-color: rgba(56, 189, 248, 0.5);
          background: rgba(56, 189, 248, 0.15);
        }

        .intl-tab.active {
          background: linear-gradient(135deg, #38BDF8 0%, #0284C7 100%);
          border-color: #38BDF8;
          color: #001233;
          font-weight: 800;
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.4);
        }

        .intl-arrow {
          border-color: rgba(56, 189, 248, 0.35);
          color: #38BDF8;
        }

        .intl-arrow:hover {
          background: #38BDF8;
          color: #001233;
          box-shadow: 0 0 14px rgba(56, 189, 248, 0.5);
        }

        .intl-card-border {
          border-color: rgba(56, 189, 248, 0.22);
          background: rgba(0, 18, 51, 0.88);
          backdrop-filter: blur(8px);
        }

        .intl-card-border:hover {
          border-color: #38BDF8;
          box-shadow: 0 16px 40px rgba(0, 18, 51, 0.85), 0 0 30px rgba(56, 189, 248, 0.3);
        }

        .intl-ribbon {
          background: linear-gradient(135deg, #0284C7, #0369A1);
        }

        .intl-dur {
          border-color: rgba(56, 189, 248, 0.4);
          color: #6FE6FC;
        }

        .intl-inclusions {
          background: rgba(0, 29, 81, 0.6);
        }

        .text-cyan-price {
          color: #38BDF8;
        }

        .btn-intl-book {
          background: linear-gradient(135deg, #38BDF8 0%, #0284C7 100%);
          box-shadow: 0 4px 14px rgba(56, 189, 248, 0.35);
        }

        .btn-intl-book:hover {
          background: linear-gradient(135deg, #6FE6FC 0%, #38BDF8 100%);
          box-shadow: 0 6px 20px rgba(56, 189, 248, 0.6);
        }

        .intl-bottom-dock {
          border-color: rgba(56, 189, 248, 0.35);
          background: rgba(0, 24, 68, 0.55);
          backdrop-filter: blur(12px);
        }

        .btn-explore-all-intl {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #38BDF8 0%, #0284C7 100%);
          color: #001233;
          font-size: 0.85rem;
          font-weight: 800;
          padding: 0.6rem 1.35rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(56, 189, 248, 0.4);
        }

        .btn-explore-all-intl:hover {
          background: linear-gradient(135deg, #6FE6FC 0%, #38BDF8 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(56, 189, 248, 0.6);
        }

        .btn-custom-intl-ai {
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

        .btn-custom-intl-ai:hover {
          background: rgba(56, 189, 248, 0.15);
          border-color: #38BDF8;
          color: #6FE6FC;
        }

        /* ═══ RESPONSIVE ═══ */
        @media (max-width: 768px) {
          .passport-stamp { display: none; }
          .intl-flying-plane { display: none; }
        }
      `}</style>
    </section>
  );
}

