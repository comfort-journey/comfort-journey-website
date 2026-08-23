import React, { useState, useEffect } from 'react';
import { Search, MapPin, Users, ShieldCheck, Sparkles, Compass, Calendar, ChevronRight, Award, Flame, Radio, ExternalLink } from 'lucide-react';
import { HERO_SLIDES, STATS_DATA } from '../data/toursData';
import { useCurrency } from '../context/CurrencyContext';
import { useLiveWeather } from '../hooks/useLiveWeather';
import VantaTravelSkyCanvas from './animations/VantaTravelSkyCanvas';
import KineticHeading from './animations/KineticHeading';
import InteractiveCompassSVG from './animations/InteractiveCompassSVG';
import { useParticleBurst } from '../hooks/useParticleBurst';

export default function Hero({ onSearch, onOpenAIPlanner }) {
  const { formatPrice } = useCurrency();
  const { triggerBurst } = useParticleBurst();
  const { weatherList, isLive } = useLiveWeather();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('All');
  const [durationFilter, setDurationFilter] = useState('All');
  const [guestsCount, setGuestsCount] = useState('2 Guests (Couple)');

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    triggerBurst(e, { count: 20 });
    onSearch({ destination, category, duration: durationFilter });
    const target = document.getElementById('tours');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section id="hero" className="hero-root">
      {/* 1. Vanta.js-Inspired Flocking Travel Birds & Sky Jet Streams Canvas */}
      <VantaTravelSkyCanvas birdCount={26} jetStreamCount={4} opacity={0.7} />

      {/* Ambient Background with Ken Burns Slow Motion */}
      <div className="hero-bg-wrapper">
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`hero-bg-slide ${idx === currentSlide ? 'active ken-burns' : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
        <div className="hero-gradient-overlay"></div>
      </div>

      <div className="container hero-content-container">
        {/* Top Badges: Trust Pill + Compass + Live Interactive Weather Ticker */}
        <div className="hero-top-badges">
          <div className="trust-pill">
            <ShieldCheck size={16} className="text-emerald" />
            <span>Est. 1992 • Bhopal & Worldwide Luxury Specialist</span>
          </div>

          {/* Interactive Micro Compass Vector Widget */}
          <div className="hero-compass-widget">
            <InteractiveCompassSVG size={36} showLabels={false} />
            <span className="compass-live-tag">NAVIGATE WORLD</span>
          </div>

          <div className="weather-ticker">
            <div className="ticker-label-group">
              <span className="live-dot" title={isLive ? 'Real-Time Live Meteorological Satellite Active' : 'Connecting to Live Weather'}></span>
              <span className="ticker-label">{isLive ? 'Live Weather:' : 'Destination Weather:'}</span>
            </div>

            <div className="ticker-scroll">
              {weatherList.map((w, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="weather-item-btn"
                  onClick={() => {
                    setDestination(w.city);
                    onSearch({ destination: w.city, category: 'All' });
                    const target = document.getElementById('tours');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }}
                  title={`View ${w.city} packages • Live ${w.temp} (${w.condition})`}
                >
                  <span className="w-icon">{w.icon}</span>
                  <strong>{w.city}:</strong>
                  <span>{w.temp}</span>
                  <small>({w.condition})</small>
                </button>
              ))}
            </div>

            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="verified-radar-link"
              title="Verify live global meteorological satellite radar (Opens in new tab)"
            >
              <ExternalLink size={12} />
              <span>Verified Satellite Radar ↗</span>
            </a>
          </div>
        </div>

        {/* Master Spec Part A Headlines with Zajno Kinetic Typography */}
        <div className="hero-headline-block">
          <span className="eyebrow-tag">MOUNTAIN ROYALTY & GLOBAL ADVENTURES</span>
          
          <h1 className="hero-title font-editorial">
            <KineticHeading as="span" staggerDelay={0.07}>
              YOUR JOURNEY
            </KineticHeading>
            <br />
            <span className="gradient-text-gold">YOUR COMFORT</span>
          </h1>

          <p className="hero-subline">
            "We cover Distance with Comfort"
          </p>

          <div className="hero-campaign-tag">
            <Flame size={16} className="text-amber inline-icon" />
            <span>Adrenaline, Wrapped in Comfort.</span>
          </div>

          <p className="hero-description">
            Tailor-made Luxury Vacations for 2,000+ Worldwide Destinations. 
            Handpicked 5-Star Stays, Private Chauffeurs, Helicopters, Visas & 24/7 Personal Concierge Included.
          </p>
        </div>

        {/* Next-Gen Glass Luxury Search Dock */}
        <form className="glass-panel hero-search-dock" onSubmit={handleSearchSubmit}>
          {/* Destination Field */}
          <div className="dock-field">
            <div className="field-icon-box">
              <MapPin size={20} className="text-amber" />
            </div>
            <div className="field-inputs">
              <label>Where to?</label>
              <input
                type="text"
                placeholder="e.g. Kashmir, Bali, Swiss Alps, Iceland"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div className="dock-divider"></div>

          {/* Experience Style */}
          <div className="dock-field">
            <div className="field-icon-box">
              <Compass size={20} className="text-amber" />
            </div>
            <div className="field-inputs">
              <label>Experience Style</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="All">All Experiences</option>
                <option value="Honeymoon & Couple">💑 Honeymoon & Couple</option>
                <option value="Family Expedition">👨‍👩‍👧‍👦 Family Expedition</option>
                <option value="Adrenaline & Adventure">🧗 Adrenaline & Adventure</option>
                <option value="International Signature">✈️ International Signature</option>
                <option value="Sacred Pilgrimage">🕉️ Sacred Char Dham</option>
              </select>
            </div>
          </div>

          <div className="dock-divider"></div>

          {/* Duration Selector */}
          <div className="dock-field">
            <div className="field-icon-box">
              <Calendar size={20} className="text-amber" />
            </div>
            <div className="field-inputs">
              <label>Duration</label>
              <select value={durationFilter} onChange={(e) => setDurationFilter(e.target.value)}>
                <option value="All">Any Duration</option>
                <option value="3-5">3–5 Days (Quick Getaway)</option>
                <option value="6-9">6–9 Days (Most Popular)</option>
                <option value="10-14">10–14 Days (Grand Tour)</option>
              </select>
            </div>
          </div>

          <div className="dock-divider"></div>

          {/* Guests Count Selector */}
          <div className="dock-field">
            <div className="field-icon-box">
              <Users size={20} className="text-amber" />
            </div>
            <div className="field-inputs">
              <label>Travelers</label>
              <select value={guestsCount} onChange={(e) => setGuestsCount(e.target.value)}>
                <option value="2 Guests (Couple)">2 Guests (Couple)</option>
                <option value="3-5 Guests (Family)">3 - 5 Guests (Family)</option>
                <option value="6+ Guests (Group)">6+ Guests (Group)</option>
                <option value="1 Guest (Solo)">1 Guest (Solo)</option>
              </select>
            </div>
          </div>

          {/* Actions: Search & AI Planner */}
          <div className="dock-actions">
            <button type="submit" className="btn-primary search-submit-btn">
              <Search size={18} />
              <span>Explore Tours</span>
            </button>
            <button 
              type="button" 
              className="btn-ai-glow ai-dock-btn"
              onClick={(e) => {
                triggerBurst(e, { count: 28, colors: ['#6FE6FC', '#FF892F', '#DAF561'] });
                onOpenAIPlanner();
              }}
              title="Plan custom trip with AI"
            >
              <Sparkles size={18} />
              <span>AI Trip Planner</span>
            </button>
          </div>
        </form>

        {/* Conversational Smart Search Prompt Helper */}
        <div className="conversational-hint-strip">
          <span className="hint-pill-title">✨ Conversational Search:</span>
          <button 
            type="button" 
            className="conv-chip"
            onClick={() => {
              setDestination('Bali');
              setCategory('Honeymoon & Couple');
              setDurationFilter('6-9');
              onSearch({ destination: 'Bali', category: 'Honeymoon & Couple', duration: '6-9' });
              const target = document.getElementById('tours');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            "7 days in Bali with pool villa"
          </button>
          <button 
            type="button" 
            className="conv-chip"
            onClick={() => {
              setDestination('Kashmir');
              setCategory('Honeymoon & Couple');
              onSearch({ destination: 'Kashmir', category: 'Honeymoon & Couple' });
              const target = document.getElementById('tours');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            "Kashmir Honeymoon with Houseboat & Snow"
          </button>
          <button 
            type="button" 
            className="conv-chip"
            onClick={() => {
              setDestination('Swiss');
              setCategory('International Signature');
              onSearch({ destination: 'Swiss', category: 'International Signature' });
              const target = document.getElementById('tours');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            "Swiss Alps & Titlis Glacier Pass"
          </button>
        </div>

        {/* Slide Indicators & Quick Search Tags */}
        <div className="hero-footer-bar">
          {/* Quick Trending Tags */}
          <div className="quick-tags-group">
            <span className="tags-label">Trending Now:</span>
            {['Kashmir', 'Swiss Alps', 'Bali', 'Dubai', 'Iceland', 'Kenya Safari', 'Andaman', 'Amalfi', 'Char Dham'].map((tag) => (
              <button
                key={tag}
                type="button"
                className="hero-tag-btn"
                onClick={() => {
                  setDestination(tag);
                  onSearch({ destination: tag, category: 'All' });
                  const target = document.getElementById('tours');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Slide Navigation Dots */}
          <div className="slide-dots-group">
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                className={`slide-dot-pill ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              >
                <span className="dot-title">{s.location.split(',')[0]}</span>
                <span className="dot-price">from {formatPrice(s.startingPrice)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero-root {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          padding: 6.5rem 0 2rem 0;
          overflow: hidden;
          background: #001233;
          color: #FFFFFF;
        }

        .hero-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .hero-bg-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hero-bg-slide.active {
          opacity: 1;
        }

        .hero-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, 
            rgba(7, 11, 20, 0.72) 0%, 
            rgba(7, 11, 20, 0.85) 60%, 
            var(--cj-bg-obsidian) 100%
          );
        }

        .hero-content-container {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: #FFFFFF;
        }

        .hero-top-badges {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .trust-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.4rem 1.1rem;
          border-radius: var(--radius-full);
          font-family: var(--font-ui);
          font-size: 0.82rem;
          font-weight: 700;
          color: #E2E8F0;
        }

        .hero-compass-widget {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(0, 29, 81, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(111, 230, 252, 0.3);
          padding: 0.25rem 0.9rem 0.25rem 0.45rem;
          border-radius: var(--radius-full);
          box-shadow: 0 4px 15px rgba(0, 18, 51, 0.6);
        }

        .compass-live-tag {
          font-family: var(--font-ui);
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          color: #6FE6FC;
          text-transform: uppercase;
        }

        .text-emerald {
          color: var(--cj-emerald-500);
        }

        .text-amber {
          color: var(--cj-amber-500);
        }

        .weather-ticker {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(15, 23, 42, 0.88);
          border: 1px solid rgba(255, 184, 0, 0.35);
          padding: 0.35rem 0.85rem 0.35rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          color: #F8FAFC;
          max-width: 95vw;
        }

        .ticker-label-group {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--cj-emerald-500);
          box-shadow: 0 0 10px var(--cj-emerald-500);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.3); }
        }

        .ticker-label {
          color: var(--cj-gold-500);
          font-family: var(--font-ui);
          font-weight: 800;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .verified-radar-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(111, 230, 252, 0.12);
          border: 1px solid rgba(111, 230, 252, 0.3);
          color: #6FE6FC;
          font-family: var(--font-ui);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          white-space: nowrap;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .verified-radar-link:hover {
          background: rgba(111, 230, 252, 0.25);
          color: #FFFFFF;
          border-color: #6FE6FC;
          box-shadow: 0 0 12px rgba(111, 230, 252, 0.4);
        }

        .ticker-scroll {
          display: flex;
          gap: 0.85rem;
          overflow: hidden;
        }

        .weather-item {
          color: #E2E8F0;
          white-space: nowrap;
        }

        .weather-item strong {
          color: #FFFFFF;
        }

        .hero-headline-block {
          max-width: 950px;
          margin-bottom: 2.25rem;
        }

        .eyebrow-tag {
          display: inline-block;
          font-family: var(--font-ui);
          font-size: 0.85rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--cj-amber-500);
          background: rgba(255, 107, 0, 0.15);
          padding: 0.35rem 1.1rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 107, 0, 0.3);
          margin-bottom: 1rem;
        }

        .hero-title {
          font-size: clamp(2.8rem, 6.8vw, 5.2rem);
          line-height: 1.06;
          font-weight: 800;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
        }

        .hero-subline {
          font-family: var(--font-serif);
          font-size: clamp(1.3rem, 3.2vw, 1.95rem);
          color: #E2E8F0;
          font-weight: 600;
          font-style: italic;
          margin-bottom: 0.6rem;
        }

        .hero-campaign-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-ui);
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--cj-gold-400);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 1rem;
        }

        .hero-description {
          max-width: 760px;
          margin: 0 auto;
          font-size: 1.08rem;
          color: #94A3B8;
          line-height: 1.65;
        }

        /* Search Dock */
        .hero-search-dock {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.85rem 1.25rem;
          width: 100%;
          max-width: 1100px;
          border-radius: var(--radius-full);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(255, 107, 0, 0.15);
          margin-bottom: 2rem;
        }

        .dock-field {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex: 1;
          text-align: left;
        }

        .field-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 107, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .field-inputs {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .field-inputs label {
          font-family: var(--font-ui);
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #94A3B8;
          letter-spacing: 0.05em;
        }

        .field-inputs input, .field-inputs select {
          border: none;
          outline: none;
          background: transparent;
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 700;
          color: #FFFFFF;
          width: 100%;
          cursor: pointer;
        }

        .field-inputs input::placeholder {
          color: rgba(255, 255, 255, 0.45);
          font-weight: 500;
        }

        .field-inputs select option {
          background: var(--cj-bg-card);
          color: #FFFFFF;
        }

        .dock-divider {
          width: 1px;
          height: 36px;
          background: rgba(255, 255, 255, 0.15);
        }

        .dock-actions {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .search-submit-btn {
          padding: 0.85rem 1.75rem;
          flex-shrink: 0;
        }

        .ai-dock-btn {
          padding: 0.85rem 1.65rem;
          flex-shrink: 0;
        }

        /* Hero Footer Bar */
        .hero-footer-bar {
          width: 100%;
          max-width: 1100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .quick-tags-group {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .tags-label {
          font-family: var(--font-ui);
          font-size: 0.82rem;
          color: #94A3B8;
          font-weight: 700;
        }

        .hero-tag-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #F8FAFC;
          font-family: var(--font-ui);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.3rem 0.8rem;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
        }

        .weather-item-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: none;
          border: none;
          color: #E2E8F0;
          font-family: var(--font-ui);
          font-size: 0.78rem;
          white-space: nowrap;
          padding: 0.2rem 0.45rem;
          border-radius: var(--radius-xs);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .weather-item-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
        }

        .weather-item-btn strong {
          color: #FFFFFF;
        }

        .weather-item-btn small {
          color: #94A3B8;
        }

        .conversational-hint-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          flex-wrap: wrap;
          margin-top: -0.75rem;
          margin-bottom: 2rem;
          max-width: 1000px;
        }

        .hint-pill-title {
          font-family: var(--font-ui);
          font-size: 0.78rem;
          font-weight: 800;
          color: #C084FC;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .conv-chip {
          background: rgba(139, 92, 246, 0.12);
          border: 1px solid rgba(139, 92, 246, 0.35);
          color: #E2E8F0;
          font-family: var(--font-ui);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.3rem 0.8rem;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
        }

        .conv-chip:hover {
          background: rgba(139, 92, 246, 0.3);
          border-color: #C084FC;
          color: #FFFFFF;
          transform: translateY(-1px);
        }

        .hero-tag-btn:hover {
          background: var(--cj-amber-500);
          border-color: var(--cj-amber-500);
          transform: translateY(-1px);
        }

        .slide-dots-group {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .slide-dot-pill {
          display: flex;
          flex-direction: column;
          text-align: left;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-sm);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .slide-dot-pill:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 107, 0, 0.5);
        }

        .slide-dot-pill.active {
          background: rgba(255, 107, 0, 0.2);
          border-color: var(--cj-amber-500);
          box-shadow: 0 0 15px rgba(255, 107, 0, 0.3);
        }

        .dot-title {
          font-family: var(--font-ui);
          font-size: 0.82rem;
          font-weight: 800;
          color: #FFFFFF;
        }

        .dot-price {
          font-family: var(--font-ui);
          font-size: 0.7rem;
          color: var(--cj-amber-500);
          font-weight: 700;
        }

        @media (max-width: 1080px) {
          .hero-search-dock {
            flex-direction: column;
            border-radius: var(--radius-xl);
            padding: 1.25rem;
            gap: 1rem;
          }
          .dock-divider {
            display: none;
          }
          .dock-field {
            width: 100%;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 0.6rem;
          }
          .dock-actions {
            width: 100%;
            flex-direction: column;
          }
          .search-submit-btn, .ai-dock-btn {
            width: 100%;
            justify-content: center;
          }
          .slide-dots-group {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
