import React, { useState, useRef, useMemo } from 'react';
import { useLiveTours } from '../../hooks/useLiveContent';
import { useCurrency } from '../../context/CurrencyContext';
import { useParticleBurst } from '../../hooks/useParticleBurst';
import Tilt3DCard from '../animations/Tilt3DCard';
import Peeking3DDecor from '../animations/Peeking3DDecor';
import { TajMahal3D, HawaMahal3D, KeralaHouseboat3D } from '../animations/Travel3DIcons';
import { 
  Sparkles, MapPin, Clock, Star, Hotel, Car, Utensils, Ticket, 
  ShieldCheck, ChevronLeft, ChevronRight, ArrowRight, Compass, Shield
} from 'lucide-react';
import CardInclusionsStrip from '../CardInclusionsStrip';

/* ─── SVG Monument Silhouette Components ─── */
const TajMahalSilhouette = () => (
  <svg className="india-monument india-monument-taj" viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Main dome */}
    <ellipse cx="200" cy="120" rx="70" ry="85" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    {/* Finial on top */}
    <line x1="200" y1="35" x2="200" y2="15" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="200" cy="12" r="4" stroke="currentColor" strokeWidth="1" fill="none"/>
    {/* Main body rectangle */}
    <rect x="100" y="190" width="200" height="80" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    {/* Left minaret */}
    <rect x="60" y="100" width="18" height="170" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/>
    <ellipse cx="69" cy="100" rx="9" ry="14" stroke="currentColor" strokeWidth="1" fill="none"/>
    <circle cx="69" cy="84" r="3" stroke="currentColor" strokeWidth="0.8" fill="none"/>
    {/* Right minaret */}
    <rect x="322" y="100" width="18" height="170" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/>
    <ellipse cx="331" cy="100" rx="9" ry="14" stroke="currentColor" strokeWidth="1" fill="none"/>
    <circle cx="331" cy="84" r="3" stroke="currentColor" strokeWidth="0.8" fill="none"/>
    {/* Central arch */}
    <path d="M170 270 L170 220 Q200 190 230 220 L230 270" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    {/* Side arches */}
    <path d="M110 270 L110 235 Q130 215 150 235 L150 270" stroke="currentColor" strokeWidth="0.8" fill="none"/>
    <path d="M250 270 L250 235 Q270 215 290 235 L290 270" stroke="currentColor" strokeWidth="0.8" fill="none"/>
    {/* Platform base */}
    <rect x="50" y="270" width="300" height="12" rx="1" stroke="currentColor" strokeWidth="1" fill="none"/>
    {/* Reflecting pool */}
    <rect x="160" y="290" width="80" height="50" rx="1" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 3" fill="none"/>
  </svg>
);

const HawaMahalSilhouette = () => (
  <svg className="india-monument india-monument-hawa" viewBox="0 0 220 360" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Tiered facade — 5 storeys of ornate windows */}
    {[0, 1, 2, 3, 4].map(row => {
      const y = 40 + row * 60;
      const w = 120 + row * 20;
      const x = 110 - w / 2;
      const arches = 3 + row;
      const archW = w / (arches + 1);
      return (
        <g key={row}>
          <rect x={x} y={y} width={w} height={55} rx="2" stroke="currentColor" strokeWidth="0.8" fill="none"/>
          {Array.from({ length: arches }).map((_, i) => {
            const ax = x + archW * (i + 0.5);
            return (
              <path key={i} d={`M${ax} ${y + 55} L${ax} ${y + 20} Q${ax + archW * 0.5} ${y + 5} ${ax + archW} ${y + 20} L${ax + archW} ${y + 55}`}
                stroke="currentColor" strokeWidth="0.6" fill="none"/>
            );
          })}
          {/* Crown domes */}
          {Array.from({ length: arches }).map((_, i) => {
            const cx = x + archW * (i + 1);
            return <ellipse key={i} cx={cx} cy={y} rx={archW * 0.35} ry={6} stroke="currentColor" strokeWidth="0.5" fill="none"/>;
          })}
        </g>
      );
    })}
    {/* Base platform */}
    <rect x="20" y="340" width="180" height="8" rx="1" stroke="currentColor" strokeWidth="0.8" fill="none"/>
  </svg>
);

const GatewayOfIndiaSilhouette = () => (
  <svg className="india-monument india-monument-gateway" viewBox="0 0 240 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Main arch */}
    <path d="M60 250 L60 80 Q120 20 180 80 L180 250" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    {/* Side turrets */}
    <rect x="40" y="60" width="25" height="190" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/>
    <rect x="175" y="60" width="25" height="190" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/>
    {/* Turret domes */}
    <ellipse cx="52" cy="58" rx="10" ry="16" stroke="currentColor" strokeWidth="0.8" fill="none"/>
    <ellipse cx="188" cy="58" rx="10" ry="16" stroke="currentColor" strokeWidth="0.8" fill="none"/>
    {/* Central dome */}
    <ellipse cx="120" cy="28" rx="18" ry="22" stroke="currentColor" strokeWidth="1" fill="none"/>
    <line x1="120" y1="6" x2="120" y2="0" stroke="currentColor" strokeWidth="1"/>
    {/* Inner arch detail */}
    <path d="M80 250 L80 120 Q120 70 160 120 L160 250" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" fill="none"/>
    {/* Base */}
    <rect x="30" y="250" width="180" height="10" rx="1" stroke="currentColor" strokeWidth="1" fill="none"/>
  </svg>
);

const LotusTempleSilhouette = () => (
  <svg className="india-monument india-monument-lotus" viewBox="0 0 260 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Lotus petals — 3 layers */}
    {[0, 1, 2].map(layer => {
      const scale = 1 - layer * 0.25;
      const baseY = 160 - layer * 30;
      const petals = layer === 0 ? 9 : layer === 1 ? 7 : 5;
      return Array.from({ length: petals }).map((_, i) => {
        const angle = (i / petals) * Math.PI - Math.PI / 2;
        const cx = 130 + Math.cos(angle) * 60 * scale;
        const tipY = baseY - 70 * scale;
        return (
          <path key={`${layer}-${i}`}
            d={`M${cx - 15 * scale} ${baseY} Q${cx} ${tipY} ${cx + 15 * scale} ${baseY}`}
            stroke="currentColor" strokeWidth={0.8 - layer * 0.15} fill="none"/>
        );
      });
    })}
    {/* Base platform circles */}
    <ellipse cx="130" cy="175" rx="80" ry="15" stroke="currentColor" strokeWidth="0.8" fill="none"/>
    <ellipse cx="130" cy="190" rx="100" ry="18" stroke="currentColor" strokeWidth="0.6" fill="none"/>
    <ellipse cx="130" cy="205" rx="115" ry="15" stroke="currentColor" strokeWidth="0.5" fill="none"/>
  </svg>
);

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

/* ─── Ornate Top Border (Mughal Arch Pattern) ─── */
const OrnateTopBorder = () => (
  <svg className="india-ornate-border-top" viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {Array.from({ length: 24 }).map((_, i) => {
      const x = i * 60;
      return (
        <path key={i} d={`M${x} 60 L${x} 30 Q${x + 30} 5 ${x + 60} 30 L${x + 60} 60`}
          stroke="currentColor" strokeWidth="1" fill="none"/>
      );
    })}
  </svg>
);

const OrnateBottomBorder = () => (
  <svg className="india-ornate-border-bottom" viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {Array.from({ length: 24 }).map((_, i) => {
      const x = i * 60;
      return (
        <path key={i} d={`M${x} 0 L${x} 30 Q${x + 30} 55 ${x + 60} 30 L${x + 60} 0`}
          stroke="currentColor" strokeWidth="1" fill="none"/>
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
      const scrollAmount = direction === 'left' ? -350 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="india-trips" className="india-showcase-root">
      <span id="tours" style={{ position: 'relative', top: '-80px', display: 'block' }} />
      
      {/* ═══ IMMERSIVE ATMOSPHERIC BACKGROUND LAYERS ═══ */}
      
      {/* Layer 1: Ornate Mughal arch borders top & bottom */}
      <OrnateTopBorder />
      <OrnateBottomBorder />
      
      {/* Layer 2: Royal Mughal Jali dot-pattern watermark */}
      <div className="india-jali-watermark" />
      
      {/* Layer 3: Warm amber glow orbs */}
      <div className="india-glow-orb-top" />
      <div className="india-glow-orb-bottom" />
      <div className="india-glow-orb-center" />
      
      {/* Layer 4: 3D Peeking Monuments (Half-Hidden, Half-Popping Out at Edges) */}
      <Peeking3DDecor 
        side="left" 
        top="14%" 
        peekPercent={58} 
        width={310} 
        height={310} 
        glowColor="rgba(255, 137, 47, 0.28)"
        floatDelay="0s"
        floatDuration="8.5s"
        ariaLabel="3D Taj Mahal Monument Peeking from Border"
      >
        <TajMahal3D size={310} />
      </Peeking3DDecor>

      <Peeking3DDecor 
        side="right" 
        top="36%" 
        peekPercent={55} 
        width={300} 
        height={300} 
        glowColor="rgba(231, 111, 81, 0.25)"
        floatDelay="1.5s"
        floatDuration="10s"
        ariaLabel="3D Jaipur Hawa Mahal Peeking from Border"
      >
        <HawaMahal3D size={300} />
      </Peeking3DDecor>

      <Peeking3DDecor 
        side="left" 
        bottom="6%" 
        peekPercent={50} 
        width={280} 
        height={280} 
        glowColor="rgba(111, 230, 252, 0.2)"
        floatDelay="2.5s"
        floatDuration="9.5s"
        ariaLabel="3D Kerala Houseboat Peeking from Border"
      >
        <KeralaHouseboat3D size={280} />
      </Peeking3DDecor>

      {/* Layer 5: Rotating Mandala Ring */}
      <MandalaRing />
      
      {/* Layer 6: Floating Diya Particles */}
      <FloatingDiyaParticles />

      <div className="container relative-z">
        {/* Atmospheric Section Header - De-cluttered & Airy (Haoqi / Stippl style) */}
        <div className="showcase-header">
          <div className="showcase-badge-pill india-badge">
            <span>🇮🇳</span>
            <span>ROYAL DESI HERITAGE COLLECTION</span>
          </div>
          <h2 className="showcase-title font-editorial">
            Incredible India <span className="gradient-text-gold">Palaces & Escapes</span>
          </h2>
          <p className="showcase-subtitle">
            Private chauffeured journeys through royal palace suites, serene backwaters, and misty Himalayan sanctuaries.
          </p>

          {/* Vibe Micro-Badges Strip */}
          <div className="vibe-badges-strip">
            <span className="vibe-micro-badge"><Shield size={12} className="text-amber" /> Zero Visa Drama</span>
            <span className="vibe-micro-badge">🏰 Verified Heritage Forts</span>
            <span className="vibe-micro-badge">🚗 Private AC Car & Chauffeur</span>
            <span className="vibe-micro-badge">👑 33+ Years Hospitality</span>
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
          background: radial-gradient(circle at 12% 25%, rgba(255, 137, 47, 0.1) 0%, transparent 45%),
                      radial-gradient(circle at 88% 55%, rgba(231, 111, 81, 0.08) 0%, transparent 45%),
                      linear-gradient(180deg, #001233 0%, #150824 16%, #190A2C 50%, #100620 84%, #001233 100%);
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

        /* ═══ RESPONSIVE ═══ */
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
          .india-monument-taj { width: 240px; }
          .india-monument-hawa { width: 100px; }
          .india-monument-gateway { width: 90px; }
          .india-monument-lotus { width: 110px; }
          .india-mandala-ring { width: 350px; height: 350px; }
        }
      `}</style>
    </section>
  );
}
