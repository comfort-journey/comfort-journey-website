import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLiveTours } from '../../hooks/useLiveContent';
import { useCurrency } from '../../context/CurrencyContext';
import { useParticleBurst } from '../../hooks/useParticleBurst';
import Tilt3DCard from '../animations/Tilt3DCard';
import { 
  Sparkles, MapPin, Clock, Star, Hotel, Car, Utensils, Ticket, 
  ShieldCheck, ChevronLeft, ChevronRight, ArrowRight, Compass, Shield,
  Crown, Mountain, Palmtree, Award
} from 'lucide-react';
import CardInclusionsStrip from '../CardInclusionsStrip';

const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';

/* ─── Floating Diya (Oil Lamp) Particle ─── */
const FloatingDiyaParticles = () => (
  <div className="india-diya-field" aria-hidden="true">
    {Array.from({ length: 18 }).map((_, i) => (
      <div key={i} className="india-diya-particle" style={{
        left: `${5 + (i * 5.26) % 90}%`,
        top: `${8 + (i * 7.13) % 84}%`,
        animationDelay: `${(i * 1.7) % 12}s`,
        animationDuration: `${14 + (i % 5) * 3}s`,
        '--diya-size': `${3 + (i % 4) * 1.5}px`,
      }}/>
    ))}
  </div>
);

/* ─── Animated Mandala Ring ─── */
const MandalaRing = () => (
  <svg className="india-mandala-ring" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Outer petals ring */}
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i / 24) * 360;
      return (
        <g key={i} transform={`rotate(${angle} 300 300)`}>
          <path d="M300 60 Q310 120 300 160 Q290 120 300 60" stroke="currentColor" strokeWidth="0.6" fill="none"/>
        </g>
      );
    })}
    {/* Inner circles */}
    <circle cx="300" cy="300" r="230" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="4 6"/>
    <circle cx="300" cy="300" r="200" stroke="currentColor" strokeWidth="0.4" fill="none"/>
    <circle cx="300" cy="300" r="160" stroke="currentColor" strokeWidth="0.6" fill="none" strokeDasharray="2 4"/>
    {/* Inner petals ring */}
    {Array.from({ length: 16 }).map((_, i) => {
      const angle = (i / 16) * 360;
      return (
        <g key={i} transform={`rotate(${angle} 300 300)`}>
          <ellipse cx="300" cy="140" rx="8" ry="20" stroke="currentColor" strokeWidth="0.5" fill="none"/>
        </g>
      );
    })}
    {/* Center bloom */}
    <circle cx="300" cy="300" r="40" stroke="currentColor" strokeWidth="0.8" fill="none"/>
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * 360;
      return (
        <g key={i} transform={`rotate(${angle} 300 300)`}>
          <ellipse cx="300" cy="270" rx="6" ry="14" stroke="currentColor" strokeWidth="0.5" fill="none"/>
        </g>
      );
    })}
  </svg>
);


export default function IndiaTripsSection({ 
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

  // Filter India packages from TOURS_DATA
  const indiaTours = useMemo(() => {
    return TOURS_DATA.filter(t => t.country === 'India' || t.category === 'National Tours');
  }, [TOURS_DATA]);

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
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Automatic Horizontal Scrolling for India Tour Packages
  useEffect(() => {
    const el = carouselRef.current;
    if (!el || filteredTours.length <= 1) return;

    let isPaused = false;
    let resumeTimeout = null;

    const interval = setInterval(() => {
      if (isPaused) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 30) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 275, behavior: 'smooth' });
      }
    }, 4000);

    const onUserInteract = () => {
      isPaused = true;
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => { isPaused = false; }, 6000);
    };

    el.addEventListener('touchstart', onUserInteract, { passive: true });
    el.addEventListener('mousedown', onUserInteract);

    return () => {
      clearInterval(interval);
      if (resumeTimeout) clearTimeout(resumeTimeout);
      el.removeEventListener('touchstart', onUserInteract);
      el.removeEventListener('mousedown', onUserInteract);
    };
  }, [filteredTours]);

  return (
    <section id="india-trips" className="india-showcase-root">
      <span id="tours" style={{ position: 'relative', top: '-80px', display: 'block' }} />
      
      {/* ═══ IMMERSIVE ATMOSPHERIC BACKGROUND LAYERS ═══ */}
      {/* Layer 1: Warm amber glow orbs */}
      <div className="india-glow-orb-top" />
      <div className="india-glow-orb-bottom" />
      <div className="india-glow-orb-center" />

      {/* Layer 2: Subtle Royal Mughal Jali watermark */}
      <div className="india-jali-watermark" />
      
      {/* Layer 3: Rotating Geometric Mandala Ring */}
      <MandalaRing />
      
      {/* Layer 4: Ambient Warm Diya Particles */}
      <FloatingDiyaParticles />

      <div className="container relative-z">
        {/* Atmospheric Section Header - Clean, Refined & Modern Luxury */}
        <div className="showcase-header">
          <div className="showcase-badge-pill india-badge">
            <Sparkles size={13} className="text-amber animate-pulse" />
            <span>ROYAL HERITAGE COLLECTION</span>
          </div>
          <h2 className="showcase-title font-editorial">
            Incredible India <span className="gradient-text-gold">Palaces & Escapes</span>
          </h2>
          <p className="showcase-subtitle">
            Private chauffeured journeys through royal palace suites, serene backwaters, and misty Himalayan sanctuaries.
          </p>

          {/* Vibe Micro-Badges Strip with Modern Vector Icons */}
          <div className="vibe-badges-strip">
            <span className="vibe-micro-badge"><Shield size={12} className="text-amber" /> Zero Visa Drama</span>
            <span className="vibe-micro-badge"><Crown size={12} className="text-amber" /> Verified Heritage Forts</span>
            <span className="vibe-micro-badge"><Car size={12} className="text-amber" /> Private AC Car & Chauffeur</span>
            <span className="vibe-micro-badge"><Award size={12} className="text-amber" /> 33+ Years Hospitality</span>
          </div>

          {/* Sub-region filter tabs & carousel arrow controls */}
          <div className="controls-and-tabs-bar">
            <div className="sub-region-tabs">
              {[
                { id: 'All', label: 'All India Royalty', icon: <Compass size={14} className="text-amber" /> },
                { id: 'Himalayas', label: 'Himalayas & Snow', icon: <Mountain size={14} className="text-amber" /> },
                { id: 'Rajasthan', label: 'Royal Rajasthan', icon: <Crown size={14} className="text-amber" /> },
                { id: 'South', label: 'Kerala & South', icon: <Palmtree size={14} className="text-amber" /> },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  className={`sub-tab-btn ${activeSubTab === tab.id ? 'active' : ''}`}
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

                      {/* Inclusions Row (CMS-Customizable Card Features) */}
                      <CardInclusionsStrip tour={tour} />

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
                            className="btn-book-compact btn-india-book btn-3d-tactile"
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
          padding: 6.5rem 0 5.5rem 0;
          position: relative;
          background: 
            linear-gradient(180deg, #0B1120 0%, rgba(15, 23, 42, 0.82) 10%, rgba(21, 10, 36, 0.62) 50%, rgba(15, 23, 42, 0.84) 90%, #0B1120 100%),
            url('${basePrefix}backgrounds/incredible-india-misty-terraces.webp') center 30% / cover no-repeat;
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
           ORNATE MUGHAL ARCH BORDERS
           ═══════════════════════════════════════════ */
        .india-ornate-border-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 40px;
          color: rgba(245, 158, 11, 0.2);
          pointer-events: none;
          z-index: 2;
        }
        .india-ornate-border-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 40px;
          color: rgba(245, 158, 11, 0.2);
          pointer-events: none;
          z-index: 2;
        }

        /* ═══════════════════════════════════════════
           MONUMENT SILHOUETTES — Floating Heritage
           ═══════════════════════════════════════════ */
        .india-monument {
          position: absolute;
          pointer-events: none;
          z-index: 1;
          color: rgba(245, 158, 11, 0.07);
          filter: drop-shadow(0 0 30px rgba(245, 158, 11, 0.05));
          transform: translateZ(0);
          will-change: transform;
        }

        .india-monument-taj {
          width: 380px;
          height: auto;
          bottom: 2%;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(245, 158, 11, 0.055);
          animation: floatMonumentSlow 28s ease-in-out infinite alternate;
        }

        .india-monument-hawa {
          width: 160px;
          height: auto;
          top: 8%;
          left: 2%;
          color: rgba(245, 158, 11, 0.06);
          animation: floatMonumentDrift 24s ease-in-out infinite alternate-reverse;
        }

        .india-monument-gateway {
          width: 150px;
          height: auto;
          top: 12%;
          right: 3%;
          color: rgba(245, 158, 11, 0.055);
          animation: floatMonumentSlow 30s ease-in-out infinite alternate;
        }

        .india-monument-lotus {
          width: 180px;
          height: auto;
          bottom: 15%;
          left: 5%;
          color: rgba(245, 158, 11, 0.04);
          animation: floatMonumentDrift 26s ease-in-out infinite alternate;
        }

        @keyframes floatMonumentSlow {
          0% { transform: translateX(-50%) translateY(0); }
          100% { transform: translateX(-50%) translateY(-18px); }
        }

        @keyframes floatMonumentDrift {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-14px) rotate(1.5deg); }
        }

        /* ═══════════════════════════════════════════
           ROTATING MANDALA RING
           ═══════════════════════════════════════════ */
        .india-mandala-ring {
          position: absolute;
          width: 550px;
          height: 550px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: rgba(245, 158, 11, 0.04);
          pointer-events: none;
          z-index: 1;
          animation: rotateMandala 120s linear infinite;
          filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.03));
        }

        @keyframes rotateMandala {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* ═══════════════════════════════════════════
           FLOATING DIYA PARTICLES
           ═══════════════════════════════════════════ */
        .india-diya-field {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          overflow: hidden;
        }

        .india-diya-particle {
          position: absolute;
          width: var(--diya-size, 4px);
          height: var(--diya-size, 4px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 183, 77, 0.9) 0%, rgba(245, 158, 11, 0.4) 50%, transparent 70%);
          box-shadow: 0 0 8px rgba(255, 183, 77, 0.5), 0 0 16px rgba(245, 158, 11, 0.2);
          animation: diyaFloat var(--float-duration, 16s) ease-in-out infinite alternate;
        }

        @keyframes diyaFloat {
          0% { transform: translateY(0) scale(1); opacity: 0.3; }
          25% { opacity: 0.7; }
          50% { transform: translateY(-25px) scale(1.3); opacity: 0.9; }
          75% { opacity: 0.5; }
          100% { transform: translateY(-8px) scale(0.9); opacity: 0.3; }
        }

        /* ═══════════════════════════════════════════
           ENHANCED AMBIENT GLOW ORBS
           ═══════════════════════════════════════════ */
        .india-glow-orb-top {
          position: absolute;
          top: -120px;
          right: -80px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, rgba(180, 83, 9, 0.1) 40%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
          animation: pulseGlowGold 8s ease-in-out infinite alternate;
        }

        .india-glow-orb-bottom {
          position: absolute;
          bottom: -120px;
          left: -80px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(220, 120, 20, 0.18) 0%, rgba(180, 83, 9, 0.06) 50%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
          animation: pulseGlowGold 10s ease-in-out infinite alternate-reverse;
        }

        .india-glow-orb-center {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(245, 158, 11, 0.06) 0%, transparent 60%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 1;
        }

        @keyframes pulseGlowGold {
          0% { opacity: 0.7; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.08); }
        }

        /* ═══════════════════════════════════════════
           JALI WATERMARK (Enhanced)
           ═══════════════════════════════════════════ */
        .india-jali-watermark {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(rgba(245, 158, 11, 0.08) 1px, transparent 1px),
            radial-gradient(rgba(245, 158, 11, 0.04) 1px, transparent 1px);
          background-size: 28px 28px, 14px 14px;
          background-position: 0 0, 14px 14px;
          opacity: 0.4;
          pointer-events: none;
          z-index: 1;
        }

        /* ═══════════════════════════════════════════
           HEADER, BADGES, TABS (unchanged)
           ═══════════════════════════════════════════ */
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
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.2), inset 0 0 12px rgba(245, 158, 11, 0.08);
        }

        .showcase-title {
          font-size: clamp(2.3rem, 4.2vw, 3.2rem);
          color: var(--cj-text-heading);
          margin-bottom: 0.65rem;
          line-height: 1.15;
        }

        .showcase-subtitle {
          max-width: 720px;
          margin: 0 auto 1.15rem auto;
          color: var(--cj-text-muted);
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
          color: var(--cj-text-heading);
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
          gap: 0.45rem;
          padding: 0.45rem 1.05rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: var(--cj-text-muted);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }

        .sub-tab-btn:hover {
          color: var(--cj-text-heading);
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
          background: rgba(0, 18, 51, 0.88);
          backdrop-filter: blur(8px);
        }

        .india-card-border:hover {
          border-color: #F59E0B;
          box-shadow: 0 16px 40px rgba(0, 18, 51, 0.8), 0 0 30px rgba(245, 158, 11, 0.3);
        }

        .india-ribbon {
          background: linear-gradient(135deg, #F59E0B, #B45309);
        }

        .btn-india-book {
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%) !important;
          color: #001233 !important;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4) !important;
        }

        .btn-india-book:hover {
          background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%) !important;
          box-shadow: 0 6px 22px rgba(245, 158, 11, 0.6) !important;
        }

        /* Bottom Dock */
        .showcase-bottom-dock {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(0, 29, 81, 0.55);
          backdrop-filter: blur(12px);
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
          color: var(--cj-text-muted);
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
          color: var(--cj-text-heading);
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

        /* ═══ RESPONSIVE ═══ */
        @media (max-width: 768px) {
          .india-showcase-root {
            padding: 2.5rem 0 1.5rem 0;
          }
          .showcase-title {
            font-size: 1.85rem !important;
            line-height: 1.25;
            margin-bottom: 0.5rem;
          }
          .showcase-subtitle {
            font-size: 0.85rem;
            line-height: 1.45;
            margin-bottom: 0.75rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          /* Hide redundant vibe badges on mobile to prevent screen clutter */
          .vibe-badges-strip {
            display: none !important;
          }

          .controls-and-tabs-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            margin-bottom: 0.75rem;
          }

          /* Smooth horizontal swipe sub-region tabs */
          .sub-region-tabs {
            display: flex;
            overflow-x: auto;
            flex-wrap: nowrap;
            width: 100%;
            gap: 0.45rem;
            padding-bottom: 0.4rem;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .sub-region-tabs::-webkit-scrollbar {
            display: none;
          }
          .sub-tab-btn {
            flex-shrink: 0;
            padding: 0.45rem 0.85rem;
            font-size: 0.8rem;
            white-space: nowrap;
          }

          .carousel-nav-arrows {
            display: none;
          }

          /* 3D Curved Gradient Mask Carousel Track */
          .showcase-carousel-track {
            padding: 0.25rem 0.5rem 1rem 0.5rem;
            gap: 0.95rem;
            mask-image: linear-gradient(to right, transparent, black 10px, black calc(100% - 16px), transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10px, black calc(100% - 16px), transparent);
          }
          .carousel-card-slide {
            flex: 0 0 68vw;
            max-width: 270px;
            scroll-snap-align: start;
          }
          .card-media {
            height: 145px;
          }

          .showcase-bottom-dock {
            flex-direction: column;
            align-items: flex-start;
            padding: 1rem 1.15rem;
            margin-top: 1rem;
            gap: 0.75rem;
          }
          .bottom-dock-info .dock-highlight {
            font-size: 0.9rem;
          }
          .bottom-dock-info p {
            font-size: 0.78rem;
          }
          .bottom-dock-actions {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .btn-explore-all-india, .btn-custom-india-ai {
            width: 100%;
            justify-content: center;
            padding: 0.65rem 1rem;
            font-size: 0.84rem;
          }
          .india-monument-taj { width: 200px; opacity: 0.2; }
          .india-monument-hawa { width: 80px; opacity: 0.15; }
          .india-monument-gateway { width: 75px; opacity: 0.15; }
          .india-monument-lotus { width: 90px; opacity: 0.15; }
          .india-mandala-ring { width: 280px; height: 280px; opacity: 0.25; }
        }

        /* LIGHT THEME — warm cream panels (dark keeps original navy) */
        :root:not([data-theme="dark"]) .india-showcase-root,
        [data-theme="light"] .india-showcase-root {
          background:
            radial-gradient(640px 320px at 10% 6%, rgba(245,158,11,0.12), transparent 70%),
            radial-gradient(720px 360px at 90% 10%, rgba(214,90,0,0.08), transparent 70%),
            linear-gradient(180deg, #FFFDF7 0%, #F9FBE7 100%);
          border-top: 1px solid var(--cj-line, #E8E0CF);
          border-bottom: 1px solid var(--cj-line, #E8E0CF);
        }
        :root:not([data-theme="dark"]) .india-badge,
        [data-theme="light"] .india-badge {
          color: var(--cj-cta-deep, #D65A00);
          background: #FFFFFF;
        }
        /* Ghost Mughal-arch watermark — light only, mature line-art */
        :root:not([data-theme="dark"]) .india-showcase-root::before,
        [data-theme="light"] .india-showcase-root::before {
          content: '';
          position: absolute;
          top: 48px;
          right: 3%;
          width: min(360px, 38vw);
          aspect-ratio: 1;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%238A7F66' stroke-width='2'%3E%3Cpath d='M40,172 L40,92 Q40,52 100,30 Q160,52 160,92 L160,172'/%3E%3Cpath d='M66,172 L66,102 Q66,74 100,60 Q134,74 134,102 L134,172'/%3E%3Cline x1='20' y1='172' x2='180' y2='172'/%3E%3Ccircle cx='100' cy='44' r='4'/%3E%3C/g%3E%3C/svg%3E") center/contain no-repeat;
          opacity: 0.07;
          pointer-events: none;
          z-index: 0;
        }
        :root:not([data-theme="dark"]) .india-card-border,
        [data-theme="light"] .india-card-border {
          background: var(--cj-glass-card);
          -webkit-backdrop-filter: var(--cj-glass-blur);
          backdrop-filter: var(--cj-glass-blur);
          border: 1px solid var(--cj-glass-rim);
          box-shadow: 0 0 0 1px var(--cj-glass-hairline), var(--shadow-md, 0 10px 30px rgba(20,38,74,0.10)), inset 0 1px 0 rgba(255,255,255,0.8);
        }
        :root:not([data-theme="dark"]) .showcase-bottom-dock,
        [data-theme="light"] .showcase-bottom-dock {
          background: var(--cj-glass-card);
          -webkit-backdrop-filter: var(--cj-glass-blur);
          backdrop-filter: var(--cj-glass-blur);
          border: 1px solid var(--cj-glass-rim);
          box-shadow: 0 0 0 1px var(--cj-glass-hairline), var(--shadow-md, 0 10px 30px rgba(20,38,74,0.10)), inset 0 1px 0 rgba(255,255,255,0.8);
        }
        :root:not([data-theme="dark"]) .india-showcase-root .sub-tab-btn:not(.active),
        [data-theme="light"] .india-showcase-root .sub-tab-btn:not(.active) {
          background: #FFFFFF !important;
          border-color: var(--cj-line, #E8E0CF) !important;
          color: var(--cj-text-body, #334155) !important;
        }
        :root:not([data-theme="dark"]) .india-showcase-root .sub-tab-btn.active,
        [data-theme="light"] .india-showcase-root .sub-tab-btn.active {
          background: linear-gradient(135deg, #FF892F 0%, #D97706 100%) !important;
          border-color: #FF892F !important;
          color: #FFFFFF !important;
          font-weight: 800 !important;
          box-shadow: 0 4px 16px rgba(255, 137, 47, 0.45) !important;
        }
        :root:not([data-theme="dark"]) .btn-carousel-arrow,
        [data-theme="light"] .btn-carousel-arrow {
          background: #FFFFFF;
        }
        :root:not([data-theme="dark"]) .btn-custom-india-ai,
        [data-theme="light"] .btn-custom-india-ai {
          background: #FFFFFF;
          border-color: var(--cj-text-heading, #14264A);
        }
        :root:not([data-theme="dark"]) .vibe-micro-badge,
        [data-theme="light"] .vibe-micro-badge {
          background: var(--cj-bg-soft, #F5F0E1);
        }
      `}</style>
    </section>
  );
}
