import React, { useState, useEffect, useRef } from 'react';
import { Plane, MapPin, Sparkles, Compass, ArrowUpRight, Star, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

const FLIGHT_ROUTES = [
  {
    id: 'kashmir',
    name: 'Kashmir Heaven on Earth',
    destination: 'Srinagar & Gulmarg, India',
    coords: { x: 260, y: 70 },
    curveCtrl: { x: 210, y: 110 },
    color: '#6FE6FC',
    price: 32999,
    duration: '6 Days / 5 Nights',
    rating: 4.98,
    tag: '👑 Mountain Royalty',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80',
    description: 'Private Dal Lake houseboat, Apharwat gondola phase 2, saffron valley walk & snow peaks.',
  },
  {
    id: 'swiss',
    name: 'Swiss Alps & Titlis Glacier',
    destination: 'Lucerne & Zermatt, Switzerland',
    coords: { x: 120, y: 110 },
    curveCtrl: { x: 160, y: 160 },
    color: '#FF892F',
    price: 185000,
    duration: '8 Days / 7 Nights',
    rating: 4.99,
    tag: '✈️ Signature Europe',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
    description: 'First-class Swiss Glacier Express, Jungfraujoch ice palace & 5-star mountain chalet.',
  },
  {
    id: 'bali',
    name: 'Bali & Nusa Penida Honeymoon',
    destination: 'Ubud & Seminyak, Indonesia',
    coords: { x: 390, y: 250 },
    curveCtrl: { x: 330, y: 230 },
    color: '#DAF561',
    price: 68500,
    duration: '7 Days / 6 Nights',
    rating: 4.97,
    tag: '💑 VIP Honeymoon',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    description: 'Private infinity pool villa, floating flower breakfast, Kelingking cliff & Ayung river rafting.',
  },
  {
    id: 'dubai',
    name: 'Dubai Ultra-Luxury & Desert Dunes',
    destination: 'Dubai & Abu Dhabi, UAE',
    coords: { x: 160, y: 195 },
    curveCtrl: { x: 190, y: 200 },
    color: '#FFA459',
    price: 54999,
    duration: '5 Days / 4 Nights',
    rating: 4.95,
    tag: '✨ Arabian Nights',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    description: 'Burj Khalifa VIP lounge, vintage Land Rover desert safari, private yacht & helicopter tour.',
  },
  {
    id: 'iceland',
    name: 'Iceland Aurora & Glacier Lagoons',
    destination: 'Reykjavik & Vik, Iceland',
    coords: { x: 80, y: 55 },
    curveCtrl: { x: 140, y: 80 },
    color: '#93EEFD',
    price: 215000,
    duration: '8 Days / 7 Nights',
    rating: 5.0,
    tag: '🌌 Arctic Wonders',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
    description: 'Aurora glass igloos, Blue Lagoon retreat spa, Diamond Beach ice caves & super-jeep tours.',
  },
  {
    id: 'amalfi',
    name: 'Amalfi Coast & Capri Yachting',
    destination: 'Positano & Capri, Italy',
    coords: { x: 110, y: 155 },
    curveCtrl: { x: 170, y: 190 },
    color: '#FF892F',
    price: 198000,
    duration: '7 Days / 6 Nights',
    rating: 4.96,
    tag: '🍋 Mediterranean Dream',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
    description: 'Cliffside 5-star suites, private speedboat to Blue Grotto & Ravello clifftop dining.',
  },
];

// Origin Hub: Central India (Bhopal / Delhi)
const ORIGIN = { x: 235, y: 190, name: 'Bhopal HQ / Delhi Hub' };

export default function FlightRouteVisualizer({ onSelectRoute, onOpenQuote }) {
  const { formatPrice } = useCurrency();
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef(null);
  const planeGroupRef = useRef(null);

  const activeRoute = FLIGHT_ROUTES[activeRouteIndex];

  // Auto-cycle routes every 6.5s if auto-playing
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveRouteIndex((prev) => (prev + 1) % FLIGHT_ROUTES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // High-performance pure mathematical Bézier loop (Zero DOM layout reflow & Zero React rerenders!)
  useEffect(() => {
    let animId;
    let isVisible = true;
    const duration = 2800; // ms
    let startTime = performance.now();

    const target = activeRoute;
    const p0 = ORIGIN;
    const p1 = target.curveCtrl;
    const p2 = target.coords;

    // IntersectionObserver to pause loop when section is offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const animateFlight = (now) => {
      animId = requestAnimationFrame(animateFlight);
      if (!isVisible || !planeGroupRef.current) return;

      const elapsed = (now - startTime) % duration;
      const t = elapsed / duration;

      // Pure Quadratic Bézier calculation: B(t) = (1-t)^2*P0 + 2*(1-t)*t*P1 + t^2*P2
      const invT = 1 - t;
      const x = invT * invT * p0.x + 2 * invT * t * p1.x + t * t * p2.x;
      const y = invT * invT * p0.y + 2 * invT * t * p1.y + t * t * p2.y;

      // Tangent derivative: B'(t) = 2*(1-t)*(P1-P0) + 2*t*(P2-P1)
      const dx = 2 * invT * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
      const dy = 2 * invT * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);
      const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

      // Directly update DOM transform (0 React re-renders)
      planeGroupRef.current.setAttribute(
        'transform',
        `translate(${x.toFixed(1)}, ${y.toFixed(1)}) rotate(${angleDeg.toFixed(1)})`
      );
    };

    animId = requestAnimationFrame(animateFlight);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [activeRouteIndex]);

  const getPathData = (target) => {
    return `M ${ORIGIN.x} ${ORIGIN.y} Q ${target.curveCtrl.x} ${target.curveCtrl.y} ${target.coords.x} ${target.coords.y}`;
  };

  return (
    <section ref={sectionRef} className="flight-route-section" id="flight-network">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="header-pill">
            <Plane size={14} className="text-amber" />
            <span>SVGator Real-Time Trajectory Engine</span>
          </div>
          <h2 className="section-title">
            Live Global <span className="gradient-text-gold">Flight Routes</span> & Stays
          </h2>
          <p className="section-subtitle">
            Seamless point-to-point luxury transfers from Bhopal & Delhi to 2,000+ elite destinations worldwide.
          </p>
        </div>

        {/* Visualizer Grid: SVG Map Canvas + Interactive Route Dashboard */}
        <div className="route-visualizer-grid glass-card">
          {/* LEFT: SVG Flight Radar Canvas */}
          <div className="radar-canvas-container">
            <div className="radar-header">
              <div className="radar-live-badge">
                <span className="radar-pulse-dot"></span>
                <span>RADAR LIVE • REAL-TIME VECTORING</span>
              </div>
              <span className="radar-active-dest">Active Route: {activeRoute.name}</span>
            </div>

            <svg
              className="route-svg"
              viewBox="0 0 500 320"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Glowing Gradients */}
                <linearGradient id="activeRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF892F" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#6FE6FC" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#DAF561" stopOpacity="1" />
                </linearGradient>

                {/* Glow Filter */}
                <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Ambient Grid Lines & Radar Range Rings */}
              <circle cx={ORIGIN.x} cy={ORIGIN.y} r="65" fill="none" stroke="rgba(111, 230, 252, 0.08)" strokeDasharray="3 3" />
              <circle cx={ORIGIN.x} cy={ORIGIN.y} r="130" fill="none" stroke="rgba(111, 230, 252, 0.06)" strokeDasharray="4 4" />
              <circle cx={ORIGIN.x} cy={ORIGIN.y} r="195" fill="none" stroke="rgba(111, 230, 252, 0.04)" strokeDasharray="5 5" />
              
              {/* World Continents Stylized Dots */}
              <g className="world-dots" opacity="0.22" fill="#6FE6FC">
                <circle cx="110" cy="115" r="1.5" /><circle cx="125" cy="120" r="1.5" /><circle cx="100" cy="140" r="1.5" /><circle cx="135" cy="100" r="1.5" />
                <circle cx="180" cy="180" r="1.5" /><circle cx="195" cy="190" r="1.5" /><circle cx="235" cy="190" r="2" /><circle cx="245" cy="220" r="1.5" /><circle cx="260" cy="80" r="1.5" />
                <circle cx="340" cy="220" r="1.5" /><circle cx="380" cy="245" r="1.5" /><circle cx="410" cy="260" r="1.5" /><circle cx="360" cy="210" r="1.5" />
              </g>

              {/* 1. Inactive Background Routes */}
              {FLIGHT_ROUTES.map((route, i) => {
                if (i === activeRouteIndex) return null;
                return (
                  <path
                    key={`inactive-${route.id}`}
                    d={getPathData(route)}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                    className="inactive-route-path"
                    onClick={() => {
                      setActiveRouteIndex(i);
                      setIsAutoPlaying(false);
                    }}
                  />
                );
              })}

              {/* 2. Active Animated Flight Path */}
              <path
                d={getPathData(activeRoute)}
                fill="none"
                stroke="url(#activeRouteGrad)"
                strokeWidth="2.8"
                strokeLinecap="round"
                filter="url(#vectorGlow)"
                className="active-vector-flight-path"
              />

              {/* 3. Origin Hub Pin (Bhopal HQ) */}
              <g transform={`translate(${ORIGIN.x}, ${ORIGIN.y})`}>
                <circle r="12" fill="rgba(255, 137, 47, 0.2)" className="pulse-ring-outer" />
                <circle r="7" fill="rgba(255, 137, 47, 0.4)" />
                <circle r="3.5" fill="#FF892F" />
                <text x="12" y="4" fill="#FFA459" fontSize="9" fontWeight="800" fontFamily="Outfit, sans-serif">
                  BHOPAL (HQ)
                </text>
              </g>

              {/* 4. Destination Interactive Pins */}
              {FLIGHT_ROUTES.map((route, i) => {
                const isActive = i === activeRouteIndex;
                return (
                  <g
                    key={route.id}
                    transform={`translate(${route.coords.x}, ${route.coords.y})`}
                    className={`destination-pin-group ${isActive ? 'active-pin' : ''}`}
                    onClick={() => {
                      setActiveRouteIndex(i);
                      setIsAutoPlaying(false);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {isActive && (
                      <circle r="16" fill="rgba(111, 230, 252, 0.25)" className="pulse-ring-active" />
                    )}
                    <circle 
                      r={isActive ? 8 : 5} 
                      fill={isActive ? route.color : 'rgba(255,255,255,0.4)'} 
                      stroke="#001233" 
                      strokeWidth="1.5" 
                    />
                    <circle r={isActive ? 3.5 : 2} fill="#FFFFFF" />
                    <text 
                      x="10" 
                      y="3" 
                      fill={isActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} 
                      fontSize={isActive ? '9.5' : '8'} 
                      fontWeight={isActive ? '800' : '600'}
                      fontFamily="Outfit, sans-serif"
                    >
                      {route.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}

              {/* 5. Dynamic Airplane Vector (Direct DOM Ref Transform) */}
              <g 
                ref={planeGroupRef}
                transform={`translate(${ORIGIN.x}, ${ORIGIN.y})`}
                filter="url(#vectorGlow)"
                className="dynamic-airplane-vector"
              >
                <ellipse cx="-4" cy="0" rx="6" ry="1.5" fill="rgba(255, 137, 47, 0.6)" />
                <path
                  d="M 9 0 L -3 -6 L -1 -1.5 L -8 -3 L -8 -1 L -4 0 L -8 1 L -8 3 L -1 1.5 L -3 6 Z"
                  fill="#FFFFFF"
                  stroke="#FF892F"
                  strokeWidth="0.6"
                />
              </g>
            </svg>

            {/* Bottom Radar Controls */}
            <div className="radar-footer-controls">
              <div className="route-chips-scroll">
                {FLIGHT_ROUTES.map((route, i) => (
                  <button
                    key={route.id}
                    type="button"
                    className={`route-tab-pill ${i === activeRouteIndex ? 'active' : ''}`}
                    onClick={() => {
                      setActiveRouteIndex(i);
                      setIsAutoPlaying(false);
                    }}
                  >
                    <span className="dot" style={{ backgroundColor: route.color }}></span>
                    <span>{route.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
              <button 
                type="button" 
                className="radar-autoplay-toggle"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              >
                {isAutoPlaying ? '⏸️ Pause Radar' : '▶️ Auto Cycle'}
              </button>
            </div>
          </div>

          {/* RIGHT: Featured Active Flight Package Card */}
          <div className="route-featured-card">
            <div className="featured-media">
              <img src={activeRoute.image} alt={activeRoute.name} loading="lazy" width="400" height="200" />
              <div className="featured-overlay"></div>
              <span className="featured-tag">{activeRoute.tag}</span>
              <div className="featured-badge-flight">
                <Plane size={14} className="text-amber animate-plane" />
                <span>Direct Flight + VIP Transfers</span>
              </div>
            </div>

            <div className="featured-body">
              <div className="featured-location-bar">
                <span className="loc-text">
                  <MapPin size={14} className="text-amber" />
                  {activeRoute.destination}
                </span>
                <span className="rating-badge">
                  <Star size={14} fill="#FF892F" color="#FF892F" />
                  {activeRoute.rating} (Verified 5★)
                </span>
              </div>

              <h3 className="featured-title">{activeRoute.name}</h3>
              <p className="featured-desc">{activeRoute.description}</p>

              <div className="featured-perks-row">
                <span className="perk-chip">
                  <Clock size={13} className="text-aqua" />
                  {activeRoute.duration}
                </span>
                <span className="perk-chip">
                  <ShieldCheck size={13} className="text-emerald" />
                  5-Star Stays Included
                </span>
              </div>

              <div className="featured-footer-row">
                <div className="price-stack">
                  <span className="p-label">All-Inclusive Starting from</span>
                  <span className="p-val font-editorial">{formatPrice(activeRoute.price)}</span>
                </div>
                <button
                  type="button"
                  className="btn-primary route-book-cta"
                  onClick={() => {
                    if (onSelectRoute) onSelectRoute(activeRoute);
                    const toursElem = document.getElementById('tours');
                    if (toursElem) toursElem.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Explore Itinerary</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .flight-route-section {
          padding: 3.5rem 0 2.5rem 0;
          background: var(--cj-bg-obsidian);
          position: relative;
          color: #FFFFFF;
        }

        .route-visualizer-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 2rem;
          padding: 1.75rem;
          border-radius: var(--radius-xl);
          background: rgba(0, 29, 81, 0.75);
          border: 1px solid rgba(111, 230, 252, 0.2);
          box-shadow: 0 25px 60px rgba(0, 18, 51, 0.8);
          transform: translateZ(0);
        }

        .radar-canvas-container {
          display: flex;
          flex-direction: column;
          background: rgba(0, 18, 51, 0.85);
          border: 1px solid rgba(111, 230, 252, 0.15);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          position: relative;
          overflow: hidden;
        }

        .radar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-family: var(--font-ui);
        }

        .radar-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #6FE6FC;
        }

        .radar-pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #6FE6FC;
          box-shadow: 0 0 10px #6FE6FC;
          animation: radarPulse 1.8s infinite;
        }

        @keyframes radarPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.4; }
        }

        .radar-active-dest {
          font-size: 0.8rem;
          font-weight: 700;
          color: #FF892F;
        }

        .route-svg {
          width: 100%;
          height: auto;
          min-height: 280px;
          background: radial-gradient(circle at 50% 50%, rgba(5, 38, 105, 0.4) 0%, transparent 80%);
          border-radius: var(--radius-md);
        }

        .active-vector-flight-path {
          stroke-dasharray: 8 4;
          animation: dashMove 20s linear infinite;
        }

        @keyframes dashMove {
          to { stroke-dashoffset: -1000; }
        }

        .pulse-ring-outer {
          animation: pingRing 3s cubic-bezier(0, 0, 0.2, 1) infinite;
          transform-origin: center;
        }

        .pulse-ring-active {
          animation: pingRing 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;
          transform-origin: center;
        }

        @keyframes pingRing {
          0% { transform: scale(0.6); opacity: 0.9; }
          75%, 100% { transform: scale(1.8); opacity: 0; }
        }

        .radar-footer-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
        }

        .route-chips-scroll {
          display: flex;
          gap: 0.4rem;
          overflow-x: auto;
          padding-bottom: 2px;
        }

        .route-tab-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #CBD5E1;
          font-family: var(--font-ui);
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .route-tab-pill .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .route-tab-pill:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
        }

        .route-tab-pill.active {
          background: rgba(111, 230, 252, 0.18);
          border-color: #6FE6FC;
          color: #FFFFFF;
          box-shadow: 0 0 12px rgba(111, 230, 252, 0.25);
        }

        .radar-autoplay-toggle {
          background: transparent;
          border: none;
          color: #93B2D2;
          font-family: var(--font-ui);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }

        .route-featured-card {
          display: flex;
          flex-direction: column;
          background: rgba(5, 38, 105, 0.85);
          border: 1px solid rgba(111, 230, 252, 0.2);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .featured-media {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .featured-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .featured-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(5, 38, 105, 0.95) 100%);
        }

        .featured-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(0, 29, 81, 0.85);
          border: 1px solid rgba(255, 137, 47, 0.4);
          color: #FF892F;
          font-family: var(--font-ui);
          font-size: 0.74rem;
          font-weight: 800;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }

        .featured-badge-flight {
          position: absolute;
          bottom: 0.85rem;
          right: 1rem;
          background: rgba(0, 18, 51, 0.85);
          border: 1px solid rgba(111, 230, 252, 0.3);
          color: #E2E8F0;
          font-family: var(--font-ui);
          font-size: 0.74rem;
          font-weight: 700;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .featured-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .featured-location-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.82rem;
        }

        .loc-text {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: #93B2D2;
          font-weight: 700;
        }

        .rating-badge {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: #FF892F;
          font-weight: 800;
        }

        .featured-title {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          line-height: 1.3;
          margin-bottom: 0.5rem;
          color: #F9FBE7;
        }

        .featured-desc {
          font-family: var(--font-body);
          font-size: 0.88rem;
          color: #EDF3D2;
          line-height: 1.55;
          margin-bottom: 1.25rem;
        }

        .featured-perks-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .perk-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.09);
          padding: 0.35rem 0.7rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          color: #CBD5E1;
        }

        .text-aqua { color: #6FE6FC; }

        .featured-footer-row {
          margin-top: auto;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .p-label {
          display: block;
          font-family: var(--font-ui);
          font-size: 0.7rem;
          text-transform: uppercase;
          font-weight: 700;
          color: #93B2D2;
        }

        .p-val {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 900;
          color: #DAF561;
        }

        .route-book-cta {
          padding: 0.65rem 1.35rem;
          font-size: 0.9rem;
          min-height: 44px;
        }

        @media (max-width: 960px) {
          .radar-root {
            padding: 2.5rem 0 2rem 0;
          }
          .route-visualizer-grid {
            grid-template-columns: 1fr;
            padding: 1.25rem;
            gap: 1.5rem;
          }
          .route-tabs-container {
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 0.5rem;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            width: 100%;
          }
          .route-tab-pill {
            flex-shrink: 0;
            white-space: nowrap;
            min-height: 40px;
            padding: 0.5rem 0.85rem;
          }
          .route-book-cta {
            min-height: 48px;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
}
