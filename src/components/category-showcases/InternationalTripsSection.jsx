import React, { useState, useRef, useMemo } from 'react';
import { useLiveTours } from '../../hooks/useLiveContent';
import { useCurrency } from '../../context/CurrencyContext';
import { useParticleBurst } from '../../hooks/useParticleBurst';
import Tilt3DCard from '../animations/Tilt3DCard';
import { 
  Globe, Plane, MapPin, Clock, Star, Hotel, Car, Utensils, Ticket, 
  ShieldCheck, ChevronLeft, ChevronRight, ArrowRight, Sparkles, FileText, CheckCircle2
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   SVG WORLD MAP — Simplified Continental Outlines
   ═══════════════════════════════════════════════════════ */
const WorldMapBackground = () => (
  <svg className="intl-world-map-bg" viewBox="0 0 1440 700" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Europe */}
    <path d="M650 140 L670 120 L700 115 L730 125 L740 110 L760 115 L770 130 L780 120 L800 125 L790 145 L770 155 L755 165 L740 155 L720 160 L700 155 L685 160 L670 155 L650 150 Z" 
      stroke="currentColor" strokeWidth="0.8" fill="none" className="continent-outline"/>
    {/* British Isles */}
    <path d="M630 120 L640 110 L650 115 L648 130 L635 135 Z" stroke="currentColor" strokeWidth="0.6" fill="none" className="continent-outline"/>
    {/* Scandinavia */}
    <path d="M700 80 L710 60 L725 55 L730 70 L720 90 L710 100 L700 95 Z" stroke="currentColor" strokeWidth="0.6" fill="none" className="continent-outline"/>
    
    {/* Africa */}
    <path d="M660 180 L680 170 L710 175 L730 180 L745 200 L750 230 L755 260 L760 290 L750 320 L735 340 L720 350 L705 345 L690 330 L680 310 L670 280 L665 250 L660 220 L655 200 Z" 
      stroke="currentColor" strokeWidth="0.8" fill="none" className="continent-outline"/>
    
    {/* Asia — India & Subcontinent */}
    <path d="M820 150 L850 140 L880 145 L910 155 L930 170 L920 190 L900 200 L890 220 L870 240 L855 260 L840 250 L835 230 L830 210 L825 195 L820 180 L815 165 Z" 
      stroke="currentColor" strokeWidth="0.9" fill="none" className="continent-outline continent-india"/>
    {/* Sri Lanka */}
    <ellipse cx="870" cy="270" rx="8" ry="12" stroke="currentColor" strokeWidth="0.5" fill="none"/>
    
    {/* Southeast Asia */}
    <path d="M950 200 L970 190 L990 195 L1000 210 L995 225 L980 230 L970 220 L960 215 Z" 
      stroke="currentColor" strokeWidth="0.7" fill="none" className="continent-outline"/>
    {/* Indonesia / Bali region */}
    <path d="M980 260 L1000 255 L1020 258 L1010 268 L995 270 L980 265 Z" stroke="currentColor" strokeWidth="0.5" fill="none" className="continent-outline"/>
    <path d="M1025 262 L1045 258 L1060 265 L1050 272 L1035 270 Z" stroke="currentColor" strokeWidth="0.5" fill="none" className="continent-outline"/>
    
    {/* Middle East */}
    <path d="M770 170 L790 165 L810 170 L815 185 L805 195 L790 200 L780 195 L775 185 Z" 
      stroke="currentColor" strokeWidth="0.7" fill="none" className="continent-outline"/>
    
    {/* East Asia */}
    <path d="M960 120 L980 110 L1010 115 L1030 130 L1025 150 L1010 160 L990 155 L975 145 L965 135 Z" 
      stroke="currentColor" strokeWidth="0.7" fill="none" className="continent-outline"/>
    {/* Japan */}
    <path d="M1050 120 L1060 110 L1065 125 L1060 140 L1052 135 Z" stroke="currentColor" strokeWidth="0.5" fill="none" className="continent-outline"/>
    
    {/* Australia */}
    <path d="M1020 350 L1060 340 L1100 345 L1120 360 L1115 385 L1095 400 L1060 405 L1035 395 L1020 375 Z" 
      stroke="currentColor" strokeWidth="0.7" fill="none" className="continent-outline"/>
    
    {/* North America */}
    <path d="M200 100 L250 80 L310 75 L370 90 L400 110 L410 140 L390 170 L360 190 L330 200 L300 195 L280 180 L250 170 L230 150 L210 130 Z" 
      stroke="currentColor" strokeWidth="0.7" fill="none" className="continent-outline"/>
    
    {/* South America */}
    <path d="M330 280 L350 260 L370 265 L385 280 L390 310 L385 345 L375 380 L360 410 L340 430 L325 425 L315 400 L310 370 L315 340 L320 310 Z" 
      stroke="currentColor" strokeWidth="0.7" fill="none" className="continent-outline"/>

    {/* ═══ ANIMATED FLIGHT ROUTES FROM INDIA ═══ */}
    {/* India origin point */}
    <circle cx="855" cy="210" r="4" fill="rgba(56, 189, 248, 0.6)" className="origin-dot-pulse"/>
    <circle cx="855" cy="210" r="8" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" className="origin-ring-pulse"/>
    
    {/* Route: India → Dubai */}
    <path d="M855 210 Q810 185 795 185" stroke="url(#routeGradient1)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" className="flight-route route-1"/>
    <circle cx="795" cy="185" r="3.5" className="destination-dot dot-dubai"/>
    <text x="795" y="175" className="dest-label">DUBAI</text>

    {/* Route: India → Bali */}
    <path d="M855 210 Q930 250 1000 260" stroke="url(#routeGradient2)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" className="flight-route route-2"/>
    <circle cx="1000" cy="260" r="3.5" className="destination-dot dot-bali"/>
    <text x="1000" y="250" className="dest-label">BALI</text>

    {/* Route: India → Europe (Switzerland) */}
    <path d="M855 210 Q800 170 735 140" stroke="url(#routeGradient3)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" className="flight-route route-3"/>
    <circle cx="735" cy="140" r="3.5" className="destination-dot dot-europe"/>
    <text x="735" y="130" className="dest-label">EUROPE</text>

    {/* Route: India → Thailand/Phuket */}
    <path d="M855 210 Q910 215 965 215" stroke="url(#routeGradient2)" strokeWidth="1.2" strokeDasharray="5 4" fill="none" className="flight-route route-4"/>
    <circle cx="965" cy="215" r="3" className="destination-dot dot-thailand"/>
    <text x="965" y="205" className="dest-label">THAILAND</text>

    {/* Route: India → Japan */}
    <path d="M855 210 Q950 160 1055 125" stroke="url(#routeGradient3)" strokeWidth="1.2" strokeDasharray="5 4" fill="none" className="flight-route route-5"/>
    <circle cx="1055" cy="125" r="3" className="destination-dot dot-japan"/>
    <text x="1055" y="115" className="dest-label">JAPAN</text>
    
    {/* Route: India → Australia */}
    <path d="M855 210 Q960 300 1060 360" stroke="url(#routeGradient1)" strokeWidth="1" strokeDasharray="4 5" fill="none" className="flight-route route-6"/>
    <circle cx="1060" cy="360" r="2.5" className="destination-dot dot-aus"/>

    {/* ═══ GRADIENT DEFINITIONS ═══ */}
    <defs>
      <linearGradient id="routeGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(56, 189, 248, 0.7)"/>
        <stop offset="100%" stopColor="rgba(168, 85, 247, 0.4)"/>
      </linearGradient>
      <linearGradient id="routeGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(56, 189, 248, 0.6)"/>
        <stop offset="100%" stopColor="rgba(45, 212, 191, 0.5)"/>
      </linearGradient>
      <linearGradient id="routeGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(56, 189, 248, 0.6)"/>
        <stop offset="100%" stopColor="rgba(218, 245, 97, 0.4)"/>
      </linearGradient>
    </defs>
  </svg>
);

/* ═══ FLOATING PASSPORT STAMPS ═══ */
const FloatingPassportStamps = () => {
  const stamps = [
    { text: 'APPROVED', sub: 'IMMIGRATION', x: '8%', y: '15%', rot: -12, delay: '0s' },
    { text: 'VISA GRANTED', sub: 'SCHENGEN', x: '85%', y: '20%', rot: 8, delay: '3s' },
    { text: 'ENTRY PERMIT', sub: 'BALI • INDONESIA', x: '12%', y: '75%', rot: 15, delay: '6s' },
    { text: 'CLEARED', sub: 'DUBAI • UAE', x: '88%', y: '70%', rot: -6, delay: '9s' },
    { text: 'DEPARTED', sub: 'DEL → ZRH', x: '50%', y: '85%', rot: 4, delay: '12s' },
  ];

  return (
    <div className="intl-passport-field" aria-hidden="true">
      {stamps.map((s, i) => (
        <div key={i} className="passport-stamp" style={{
          left: s.x, top: s.y,
          transform: `rotate(${s.rot}deg)`,
          animationDelay: s.delay,
        }}>
          <div className="stamp-border">
            <span className="stamp-main">{s.text}</span>
            <span className="stamp-sub">{s.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

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

/* ═══ ANIMATED AIRPLANE ICON ═══ */
const FlyingAirplane = () => (
  <div className="intl-flying-plane" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
    </svg>
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
      
      {/* Layer 1: World Map with Routes */}
      <WorldMapBackground />
      
      {/* Layer 2: Floating Passport Stamps */}
      <FloatingPassportStamps />
      
      {/* Layer 3: Constellation Star Particles */}
      <ConstellationStars />
      
      {/* Layer 4: Flying Airplane Animation */}
      <FlyingAirplane />
      
      {/* Layer 5: Enhanced Aurora Orbs */}
      <div className="intl-aurora-orb-top" />
      <div className="intl-aurora-orb-bottom" />
      <div className="intl-aurora-orb-center" />
      
      {/* Layer 6: Enhanced Flight Arc Lines */}
      <svg className="intl-flight-arc-bg" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <path 
          d="M-100 400 C 200 150, 600 100, 900 250 C 1100 350, 1300 200, 1540 100" 
          stroke="rgba(56, 189, 248, 0.15)" 
          strokeWidth="2" 
          strokeDasharray="6 8" 
          className="arc-animated"
        />
        <path 
          d="M0 500 C 350 300, 800 250, 1100 400 C 1300 500, 1400 350, 1600 300" 
          stroke="rgba(168, 85, 247, 0.1)" 
          strokeWidth="1.5" 
          strokeDasharray="4 6" 
          className="arc-animated arc-delay"
        />
        <path 
          d="M-50 200 C 300 350, 700 180, 1000 300 C 1200 380, 1350 280, 1500 200" 
          stroke="rgba(45, 212, 191, 0.08)" 
          strokeWidth="1" 
          strokeDasharray="3 5" 
          className="arc-animated arc-delay-2"
        />
      </svg>

      <div className="container relative-z">
        {/* Section Header */}
        <div className="showcase-header">
          <div className="showcase-badge-pill intl-badge">
            <Globe size={14} className="text-cyan animate-pulse" />
            <span>WORLD PASSPORT COLLECTION • SEAMLESS GLOBAL TRAVEL</span>
          </div>
          <h2 className="showcase-title font-editorial">
            World Passport <span className="gradient-text-cyan-emerald">Signature Escapes</span>
          </h2>
          <p className="showcase-subtitle">
            The world is bigger than your city. Go see it. In-house visa filing assistance, private airport chauffeur, and central 5-star neighborhoods globally.
          </p>

          {/* Vibe Micro-Badges Strip */}
          <div className="vibe-badges-strip">
            <span className="vibe-micro-badge"><FileText size={12} className="text-cyan" /> In-House Visa Filing Assist</span>
            <span className="vibe-micro-badge"><Plane size={12} className="text-cyan" /> Private Airport VIP Chauffeurs</span>
            <span className="vibe-micro-badge"><Hotel size={12} className="text-cyan" /> Central 5-Star Neighborhoods</span>
            <span className="vibe-micro-badge"><Clock size={12} className="text-cyan" /> 24/7 Global Timezone Concierge</span>
          </div>

          {/* Sub-region filter tabs & carousel arrow controls */}
          <div className="controls-and-tabs-bar">
            <div className="sub-region-tabs">
              {[
                { id: 'All', label: 'All World Destinations' },
                { id: 'Europe', label: '🇪🇺 Europe Signature' },
                { id: 'Tropical', label: '🌴 Bali & Thailand' },
                { id: 'MiddleEast', label: '🏜️ Dubai Red Dunes' },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  className={`sub-tab-btn intl-tab ${activeSubTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveSubTab(tab.id)}
                >
                  {tab.label}
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
          padding: 5rem 0 4rem 0;
          position: relative;
          background: linear-gradient(180deg, #000B1E 0%, #001233 20%, #001A40 50%, #001233 80%, #000B1E 100%);
          border-top: 1px solid rgba(56, 189, 248, 0.3);
          border-bottom: 1px solid rgba(56, 189, 248, 0.15);
          overflow: hidden;
        }

        .relative-z {
          position: relative;
          z-index: 5;
        }

        /* ═══════════════════════════════════════════
           WORLD MAP BACKGROUND
           ═══════════════════════════════════════════ */
        .intl-world-map-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          color: rgba(56, 189, 248, 0.06);
        }

        .continent-outline {
          animation: continentPulse 8s ease-in-out infinite alternate;
        }

        .continent-india {
          stroke: rgba(56, 189, 248, 0.15) !important;
          filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.1));
        }

        @keyframes continentPulse {
          0% { opacity: 0.4; }
          100% { opacity: 0.8; }
        }

        /* ═══ FLIGHT ROUTES ═══ */
        .flight-route {
          stroke-dashoffset: 0;
          animation: dashFlow 4s linear infinite;
        }

        .route-1 { animation-delay: 0s; }
        .route-2 { animation-delay: 0.8s; }
        .route-3 { animation-delay: 1.6s; }
        .route-4 { animation-delay: 2.4s; }
        .route-5 { animation-delay: 3.2s; }
        .route-6 { animation-delay: 4s; }

        @keyframes dashFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -30; }
        }

        /* ═══ DESTINATION DOTS ═══ */
        .destination-dot {
          fill: rgba(56, 189, 248, 0.7);
          animation: dotPulse 3s ease-in-out infinite;
        }

        .dot-dubai { fill: rgba(245, 158, 11, 0.7); animation-delay: 0s; }
        .dot-bali { fill: rgba(45, 212, 191, 0.7); animation-delay: 0.6s; }
        .dot-europe { fill: rgba(168, 85, 247, 0.7); animation-delay: 1.2s; }
        .dot-thailand { fill: rgba(45, 212, 191, 0.6); animation-delay: 1.8s; }
        .dot-japan { fill: rgba(218, 245, 97, 0.6); animation-delay: 2.4s; }
        .dot-aus { fill: rgba(56, 189, 248, 0.5); animation-delay: 3s; }

        @keyframes dotPulse {
          0%, 100% { r: 3; opacity: 0.5; }
          50% { r: 5; opacity: 1; }
        }

        .origin-dot-pulse {
          animation: originPulse 2s ease-in-out infinite;
        }

        .origin-ring-pulse {
          animation: ringExpand 2s ease-in-out infinite;
        }

        @keyframes originPulse {
          0%, 100% { opacity: 0.6; r: 4; }
          50% { opacity: 1; r: 5; }
        }

        @keyframes ringExpand {
          0% { r: 8; opacity: 0.4; }
          100% { r: 18; opacity: 0; }
        }

        /* ═══ DESTINATION LABELS ═══ */
        .dest-label {
          font-size: 7px;
          font-weight: 800;
          fill: rgba(56, 189, 248, 0.35);
          text-anchor: middle;
          letter-spacing: 0.12em;
          font-family: inherit;
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

        /* ═══ FLIGHT ARC ANIMATIONS ═══ */
        .intl-flight-arc-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .arc-animated {
          stroke-dashoffset: 0;
          animation: arcDash 8s linear infinite;
        }
        .arc-delay { animation-delay: 3s; }
        .arc-delay-2 { animation-delay: 6s; }

        @keyframes arcDash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -40; }
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
          .intl-world-map-bg { opacity: 0.5; }
          .passport-stamp { display: none; }
          .intl-flying-plane { display: none; }
          .dest-label { display: none; }
        }
      `}</style>
    </section>
  );
}

