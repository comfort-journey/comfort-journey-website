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
        {/* Clean Brand Wordmark in Plain Beige */}
        <div className="hero-brand-wordmark">
          <span className="brand-plain-beige">COMFORT JOURNEY</span>
          <span className="brand-dot">•</span>
          <span className="brand-est">SINCE 1992</span>
        </div>

        {/* Minimal Clean Headline */}
        <div className="hero-headline-block">
          <h1 className="hero-title">
            Your Journey • <span className="text-orange-glow">Your Comfort</span>
          </h1>

          <p className="hero-subline">
            Handcrafted private tour packages for 2,000+ destinations worldwide. Handpicked 4 & 5-star stays, private chauffeurs, and 24/7 dedicated concierge.
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

        {/* Quick One-Click Instant Search Pill Bar */}
        <div className="conversational-hint-strip">
          <span className="hint-pill-title">✨ Popular Instant Searches:</span>
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
            <span>🏖️ Bali 7-Day Villa</span>
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
            <span>🏔️ Kashmir Snow & Houseboat</span>
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
            <span>✈️ Swiss Alps & Titlis Pass</span>
          </button>
          <button 
            type="button" 
            className="conv-chip"
            onClick={() => {
              setDestination('Maldives');
              onSearch({ destination: 'Maldives', category: 'All' });
              const target = document.getElementById('tours');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>🏝️ Maldives Overwater</span>
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
          min-height: auto;
          display: flex;
          align-items: center;
          padding: calc(75px + 1.25rem) 0 2rem 0;
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
            rgba(7, 11, 20, 0.75) 0%, 
            rgba(7, 11, 20, 0.88) 60%, 
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

        .hero-brand-wordmark {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.75rem;
        }

        .brand-plain-beige {
          font-family: var(--font-ui, 'Outfit', sans-serif);
          font-size: 0.88rem;
          font-weight: 900;
          letter-spacing: 0.14em;
          color: #F9FBE7;
          text-transform: uppercase;
        }

        .brand-dot {
          color: #FF892F;
          font-size: 0.85rem;
        }

        .brand-est {
          font-family: var(--font-ui, 'Outfit', sans-serif);
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #94A3B8;
        }

        .hero-headline-block {
          max-width: 900px;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-title {
          font-family: var(--font-serif, 'Cinzel', serif);
          font-size: clamp(2.1rem, 4.2vw, 3.4rem);
          line-height: 1.18;
          font-weight: 800;
          margin-bottom: 0.65rem;
          letter-spacing: -0.015em;
          color: #F9FBE7;
        }

        .text-orange-glow {
          color: #FF892F;
          text-shadow: 0 0 25px rgba(255, 137, 47, 0.45);
        }

        .hero-subline {
          font-family: var(--font-ui, 'Outfit', sans-serif);
          font-size: clamp(0.92rem, 1.35vw, 1.08rem);
          color: #CBD5E1;
          font-weight: 500;
          line-height: 1.55;
          margin-bottom: 0;
          max-width: 720px;
        }

        .hero-trust-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          flex-wrap: wrap;
          padding: 0.4rem 1.1rem;
          border-radius: var(--radius-full);
          background: rgba(0, 24, 60, 0.55);
          border: 1px solid rgba(111, 230, 252, 0.18);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          font-size: 0.78rem;
          color: #E2E8F0;
        }

        .trust-item {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .trust-item strong {
          color: #FFFFFF;
        }

        .trust-sep {
          color: rgba(255, 255, 255, 0.2);
        }

        .text-aqua {
          color: var(--cj-aqua-500, #6FE6FC);
        }

        /* Search Dock */
        .hero-search-dock {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 1rem;
          width: 100%;
          max-width: 1100px;
          border-radius: var(--radius-full);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(255, 107, 0, 0.15);
          margin-bottom: 1.25rem;
        }

        .dock-field {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          flex: 1;
          text-align: left;
          min-width: 0;
        }

        .field-icon-box {
          width: 34px;
          height: 34px;
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
          min-width: 0;
        }

        .field-inputs label {
          font-family: var(--font-ui);
          font-size: 0.68rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #94A3B8;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        .field-inputs input, .field-inputs select {
          border: none;
          outline: none;
          background: transparent;
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 700;
          color: #FFFFFF;
          width: 100%;
          cursor: pointer;
          white-space: nowrap;
          text-overflow: ellipsis;
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
          height: 32px;
          background: rgba(255, 255, 255, 0.15);
          flex-shrink: 0;
        }

        .dock-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .search-submit-btn {
          padding: 0.75rem 1.45rem;
          flex-shrink: 0;
          white-space: nowrap;
          font-size: 0.88rem;
        }

        .ai-dock-btn {
          padding: 0.75rem 1.35rem;
          flex-shrink: 0;
          white-space: nowrap;
          font-size: 0.88rem;
        }

        /* Hero Footer Bar */
        .hero-footer-bar {
          width: 100%;
          max-width: 1100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
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
          font-size: 0.8rem;
          color: #94A3B8;
          font-weight: 700;
        }

        .hero-tag-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #F8FAFC;
          font-family: var(--font-ui);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .hero-tag-btn:hover {
          background: var(--cj-amber-500);
          border-color: var(--cj-amber-500);
          transform: translateY(-1px);
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

        .slide-dots-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .slide-dot-pill {
          display: flex;
          flex-direction: column;
          text-align: left;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 0.35rem 0.75rem;
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
          font-size: 0.78rem;
          font-weight: 800;
          color: #FFFFFF;
        }

        .dot-price {
          font-family: var(--font-ui);
          font-size: 0.68rem;
          color: var(--cj-amber-500);
          font-weight: 700;
        }

        .conversational-hint-strip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          max-width: 1100px;
          width: 100%;
          overflow-x: auto;
          padding-bottom: 0.35rem;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .hint-pill-title {
          font-family: var(--font-ui);
          font-size: 0.78rem;
          font-weight: 800;
          color: #C084FC;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .conv-chip {
          background: rgba(139, 92, 246, 0.12);
          border: 1px solid rgba(192, 132, 252, 0.3);
          color: #E2E8F0;
          font-family: var(--font-ui);
          font-size: 0.76rem;
          font-weight: 600;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          white-space: nowrap;
          flex-shrink: 0;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .conv-chip:hover {
          background: rgba(139, 92, 246, 0.25);
          color: #FFFFFF;
          border-color: #C084FC;
        }

        @media (max-width: 1080px) {
          .hero-search-dock {
            display: grid;
            grid-template-columns: 1fr 1fr;
            border-radius: var(--radius-lg);
            padding: 1.15rem;
            gap: 1rem;
          }
          .dock-divider {
            display: none;
          }
          .dock-field {
            width: 100%;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 0.5rem;
          }
          .dock-actions {
            grid-column: span 2;
            width: 100%;
            display: flex;
            flex-direction: row;
            gap: 0.65rem;
          }
          .search-submit-btn, .ai-dock-btn {
            flex: 1;
            justify-content: center;
            min-height: 48px;
          }
          .slide-dots-group {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .hero-root {
            padding: calc(65px + 1rem) 0 2rem 0;
          }
          .hero-title {
            font-size: 2.35rem;
            line-height: 1.12;
          }
          .hero-subline {
            font-size: 0.95rem;
            padding: 0 0.5rem;
          }
          .hero-search-dock {
            grid-template-columns: 1fr;
            border-radius: 20px;
            padding: 1.15rem 1rem;
            gap: 1rem;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
          }
          .dock-field {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 0.75rem;
            gap: 0.75rem;
          }
          .field-icon-box {
            width: 40px;
            height: 40px;
          }
          .field-inputs label {
            font-size: 0.75rem;
            color: var(--cj-amber-500);
            margin-bottom: 2px;
          }
          .field-inputs input, .field-inputs select {
            font-size: 16px !important;
            padding: 0.2rem 0;
          }
          .dock-actions {
            grid-column: span 1;
            flex-direction: column;
            gap: 0.75rem;
            margin-top: 0.25rem;
          }
          .search-submit-btn, .ai-dock-btn {
            width: 100%;
            min-height: 50px;
            font-size: 1rem;
            border-radius: var(--radius-full);
          }
          .hero-top-badges {
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
          }
          .trust-pill {
            width: auto;
            font-size: 0.78rem;
          }
          .weather-ticker {
            width: 100%;
            max-width: 100%;
            overflow-x: auto;
            justify-content: flex-start;
            -webkit-overflow-scrolling: touch;
            padding: 0.4rem 0.75rem;
          }
          .quick-tags-group {
            width: 100%;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 0.5rem;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .tags-label {
            flex-shrink: 0;
          }
          .hero-tag-btn {
            flex-shrink: 0;
            white-space: nowrap;
            padding: 0.4rem 0.85rem;
            font-size: 0.82rem;
          }
        }
      `}</style>
    </section>
  );
}
