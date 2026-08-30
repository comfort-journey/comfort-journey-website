import React, { useState, useEffect } from 'react';
import { 
  Globe, Sun, Users, Sparkles, MapPin, Calendar, Compass, 
  ChevronRight, ArrowRight, CheckCircle2, Heart, ShieldCheck, 
  MessageCircle, ExternalLink, Flame, ArrowLeft
} from 'lucide-react';
import { CONTINENTS_TREE_DATA, SEASONS_DATA, TRAVELER_STYLES_DATA } from '../data/continentHierarchyData';
import { TOURS_DATA, HERO_SLIDES } from '../data/toursData';
import { useCurrency } from '../context/CurrencyContext';
import VantaTravelSkyCanvas from './animations/VantaTravelSkyCanvas';

export default function Hero({ onSelectItinerary, onBookNow, onOpenAIPlanner, onOpenQuote }) {
  const { formatPrice } = useCurrency();

  // Background slider index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Master Discovery Mode: 'continent' | 'weather' | 'style'
  const [discoveryMode, setDiscoveryMode] = useState('continent');

  // Continents drill-down state (all in-place!)
  const [activeContinentId, setActiveContinentId] = useState('asia');
  const [activeCountryId, setActiveCountryId] = useState('india');

  // Weather & Style filter state
  const [activeSeasonId, setActiveSeasonId] = useState('summer');
  const [activeStyleId, setActiveStyleId] = useState('couple');

  // Auto-advance background slides gently
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const activeContinent = CONTINENTS_TREE_DATA.find(c => c.id === activeContinentId) || CONTINENTS_TREE_DATA[0];
  const activeCountry = activeContinent.countries.find(c => c.id === activeCountryId) || activeContinent.countries[0];

  const handleContinentClick = (continentId) => {
    setActiveContinentId(continentId);
    const continent = CONTINENTS_TREE_DATA.find(c => c.id === continentId);
    if (continent && continent.countries.length > 0) {
      setActiveCountryId(continent.countries[0].id);
    }
  };

  const getTourObject = (tourId) => {
    return TOURS_DATA.find(t => t.id === tourId) || TOURS_DATA[0];
  };

  // Weather seasonal tours
  const getSeasonalTours = () => {
    switch (activeSeasonId) {
      case 'summer':
        return TOURS_DATA.filter(t => t.id.includes('swiss') || t.id.includes('bali') || t.id.includes('amalfi') || t.id.includes('ladakh'));
      case 'winter':
        return TOURS_DATA.filter(t => t.id.includes('kashmir') || t.id.includes('iceland') || t.id.includes('dubai') || t.id.includes('rajasthan'));
      case 'monsoon':
        return TOURS_DATA.filter(t => t.id.includes('kerala') || t.id.includes('andaman') || t.vibeTags?.includes('Serene Backwaters'));
      case 'autumn':
        return TOURS_DATA.filter(t => t.id.includes('rajasthan') || t.id.includes('char-dham') || t.id.includes('dubai'));
      case 'spring':
        return TOURS_DATA.filter(t => t.id.includes('kashmir') || t.id.includes('swiss') || t.id.includes('andaman'));
      default:
        return TOURS_DATA.slice(0, 3);
    }
  };

  // Traveler style tours
  const getStyleTours = () => {
    switch (activeStyleId) {
      case 'couple':
        return TOURS_DATA.filter(t => t.category?.includes('Honeymoon') || t.id.includes('kashmir') || t.id.includes('bali') || t.id.includes('amalfi'));
      case 'family':
        return TOURS_DATA.filter(t => t.category?.includes('Family') || t.id.includes('andaman') || t.id.includes('char-dham') || t.id.includes('dubai'));
      case 'solo':
        return TOURS_DATA.filter(t => t.category?.includes('Adventure') || t.id.includes('iceland') || t.id.includes('kashmir'));
      case 'group':
        return TOURS_DATA.filter(t => t.id.includes('rajasthan') || t.id.includes('char-dham') || t.id.includes('dubai'));
      default:
        return TOURS_DATA.slice(0, 3);
    }
  };

  return (
    <section id="hero" className="hero-root">
      {/* Flocking Travel Birds & Sky Jet Streams */}
      <VantaTravelSkyCanvas birdCount={24} jetStreamCount={4} opacity={0.65} />

      {/* Ambient Ken Burns Background */}
      <div className="hero-bg-wrapper">
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`hero-bg-slide ${idx === currentSlide ? 'active ken-burns' : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
        <div className="hero-gradient-overlay" />
      </div>

      <div className="container hero-content-container">
        {/* Brand Wordmark */}
        <div className="hero-brand-wordmark">
          <span className="brand-plain-beige">COMFORT JOURNEY</span>
          <span className="brand-dot">•</span>
          <span className="brand-est">EST. 1992</span>
        </div>

        {/* Headline */}
        <div className="hero-headline-block">
          <h1 className="hero-title">
            Your Journey • <span className="text-orange-glow">Your Comfort</span>
          </h1>
          <p className="hero-subline">
            Handcrafted luxury vacations across 2,000+ destinations worldwide with verified 5-star stays, private chauffeurs, and 24/7 dedicated concierge.
          </p>
        </div>

        {/* =========================================================================
            PROMINENT QUESTION & 3 MASTER TRAVEL GATEWAYS (IN-PLACE EXPLORATION)
            ========================================================================= */}
        <div className="hero-question-container">
          <div className="question-badge-row">
            <span className="question-icon-spark">✨</span>
            <h3 className="question-text">How Do You Want to Travel?</h3>
          </div>

          {/* 3 Master Modes */}
          <div className="master-mode-tabs">
            <button
              type="button"
              className={`mode-tab-btn ${discoveryMode === 'continent' ? 'active' : ''}`}
              onClick={() => setDiscoveryMode('continent')}
            >
              <Globe size={18} />
              <span>🗺️ 7 Continents World Map</span>
            </button>

            <button
              type="button"
              className={`mode-tab-btn ${discoveryMode === 'weather' ? 'active' : ''}`}
              onClick={() => setDiscoveryMode('weather')}
            >
              <Sun size={18} />
              <span>🌦️ By Weather & Season</span>
            </button>

            <button
              type="button"
              className={`mode-tab-btn ${discoveryMode === 'style' ? 'active' : ''}`}
              onClick={() => setDiscoveryMode('style')}
            >
              <Users size={18} />
              <span>👥 By Travel Style (Solo, Couple, Family, Group)</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            IN-PLACE INTERACTIVE TRAVELER STAGE (SAME PLACE RESULTS - NO LENGTHY TABLES!)
            ========================================================================= */}
        <div className="hero-interactive-stage glass-card">
          {/* MODE 1: 7 CONTINENTS MAP & CITY EXPLORER */}
          {discoveryMode === 'continent' && (
            <div className="stage-content-block animate-fade-in">
              {/* Level 1: Continents Deck */}
              <div className="continents-deck-strip">
                {CONTINENTS_TREE_DATA.map((continent) => (
                  <div
                    key={continent.id}
                    className={`continent-chip-card ${activeContinentId === continent.id ? 'active' : ''}`}
                    onClick={() => handleContinentClick(continent.id)}
                  >
                    <span className="continent-icon-glow">{continent.icon}</span>
                    <div className="continent-chip-meta">
                      <strong className="c-title">{continent.name}</strong>
                      <span className="c-subtext">{continent.countries.length} Countries</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Level 2: In-Place Country Selector Pills */}
              <div className="country-pills-bar">
                <span className="pills-label">Countries in {activeContinent.name}:</span>
                <div className="pills-scroll-row">
                  {activeContinent.countries.map((country) => (
                    <button
                      key={country.id}
                      type="button"
                      className={`country-pill-btn ${activeCountryId === country.id ? 'active' : ''}`}
                      onClick={() => setActiveCountryId(country.id)}
                    >
                      <span className="flag-emoji">{country.flag}</span>
                      <span>{country.name}</span>
                      <span className="badge-count">{country.cities.length}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Level 3: In-Place Travel Cities Cards (Direct Results Right Here!) */}
              <div className="stage-cities-grid">
                {activeCountry.cities.map((city) => {
                  const tour = getTourObject(city.tourId);

                  return (
                    <div key={city.id} className="city-in-place-card glass-card">
                      <div className="c-card-top-header">
                        <div className="c-city-name-lockup">
                          <span className="city-marker">📍</span>
                          <div>
                            <h4 className="city-headline">{city.name}</h4>
                            <span className="city-state-sub">{city.state}</span>
                          </div>
                        </div>
                        <span className="weather-pill-tag">{city.weatherTag}</span>
                      </div>

                      <div className="c-theme-badge">
                        <span>{city.type}</span>
                      </div>

                      <ul className="c-highlights-list">
                        {city.highlights.map((h, i) => (
                          <li key={i}>
                            <CheckCircle2 size={13} className="text-emerald" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="c-card-footer-action">
                        <div>
                          <span className="start-lbl">From</span>
                          <strong className="price-bold font-editorial">{formatPrice(city.startingPrice)}</strong>
                          <span className="price-unit-tag">/ person • {city.duration}</span>
                        </div>

                        <div className="action-buttons-inline">
                          <button
                            type="button"
                            className="btn-itinerary-inline"
                            onClick={() => onSelectItinerary(tour)}
                          >
                            <span>Itinerary</span>
                            <ArrowRight size={13} />
                          </button>

                          <button
                            type="button"
                            className="btn-book-inline"
                            onClick={() => onBookNow(tour)}
                          >
                            <span>Book</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* MODE 2: WEATHER & FOUR-SEASON EXPLORER */}
          {discoveryMode === 'weather' && (
            <div className="stage-content-block animate-fade-in">
              {/* Seasons Selector Strip */}
              <div className="seasons-selector-bar">
                {SEASONS_DATA.filter(s => s.id !== 'all').map((season) => (
                  <button
                    key={season.id}
                    type="button"
                    className={`season-pill-tab ${activeSeasonId === season.id ? 'active' : ''}`}
                    onClick={() => setActiveSeasonId(season.id)}
                  >
                    <span className="season-icon-tag">{season.icon}</span>
                    <div className="season-info-box">
                      <strong>{season.label.split('(')[0]}</strong>
                      <span className="season-temp">{season.temp}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Season Highlight Info */}
              {(() => {
                const sObj = SEASONS_DATA.find(s => s.id === activeSeasonId) || SEASONS_DATA[1];
                return (
                  <div className="season-summary-strip">
                    <span>✨ {sObj.desc}</span>
                    {sObj.topDestinations && (
                      <div className="dest-chips-row">
                        {sObj.topDestinations.slice(0, 4).map((d, i) => (
                          <span key={i} className="chip-item">📍 {d}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* In-Place Seasonal Tour Cards */}
              <div className="stage-cities-grid">
                {getSeasonalTours().map((tour) => (
                  <div key={tour.id} className="seasonal-stage-card glass-card">
                    <div className="st-img-pane">
                      <img src={tour.image} alt={tour.name} className="st-img" />
                      <span className="st-badge">{tour.badge}</span>
                      <span className="st-dur">⏱️ {tour.duration}</span>
                    </div>
                    <div className="st-body">
                      <span className="st-country">📍 {tour.country}</span>
                      <h4 className="st-title font-editorial">{tour.name}</h4>
                      <div className="st-footer">
                        <strong className="st-price gradient-text-gold">{formatPrice(tour.price)}</strong>
                        <button
                          type="button"
                          className="btn-itinerary-inline"
                          onClick={() => onSelectItinerary(tour)}
                        >
                          <span>View Itinerary</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODE 3: TRAVELER STYLE EXPLORER (SOLO, COUPLE, FAMILY, GROUP) */}
          {discoveryMode === 'style' && (
            <div className="stage-content-block animate-fade-in">
              {/* Style Selector Strip */}
              <div className="styles-selector-bar">
                {TRAVELER_STYLES_DATA.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    className={`style-pill-tab ${activeStyleId === style.id ? 'active' : ''}`}
                    onClick={() => setActiveStyleId(style.id)}
                  >
                    <span className="style-icon-tag">{style.icon}</span>
                    <div className="style-info-box">
                      <strong>{style.label}</strong>
                      <span className="style-sub">{style.perks.length} Perks</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Style Perks Strip */}
              {(() => {
                const styleObj = TRAVELER_STYLES_DATA.find(s => s.id === activeStyleId) || TRAVELER_STYLES_DATA[0];
                return (
                  <div className="style-perks-banner">
                    <div className="perks-pills-row">
                      {styleObj.perks.map((p, i) => (
                        <span key={i} className="perk-pill">
                          <CheckCircle2 size={13} className="text-emerald" />
                          <span>{p}</span>
                        </span>
                      ))}
                    </div>
                    <a
                      href={`https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I'm%20planning%20a%20${encodeURIComponent(styleObj.label)}%20vacation.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp-mini"
                    >
                      <MessageCircle size={14} />
                      <span>WhatsApp {styleObj.label} Curator</span>
                    </a>
                  </div>
                );
              })()}

              {/* In-Place Style Tour Cards */}
              <div className="stage-cities-grid">
                {getStyleTours().map((tour) => (
                  <div key={tour.id} className="seasonal-stage-card glass-card">
                    <div className="st-img-pane">
                      <img src={tour.image} alt={tour.name} className="st-img" />
                      <span className="st-badge">{tour.badge}</span>
                      <span className="st-dur">⏱️ {tour.duration}</span>
                    </div>
                    <div className="st-body">
                      <span className="st-country">📍 {tour.country} • {tour.category}</span>
                      <h4 className="st-title font-editorial">{tour.name}</h4>
                      <div className="st-footer">
                        <strong className="st-price gradient-text-gold">{formatPrice(tour.price)}</strong>
                        <button
                          type="button"
                          className="btn-itinerary-inline"
                          onClick={() => onSelectItinerary(tour)}
                        >
                          <span>View Package</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* STYLES FOR HERO TRAVEL STUDIO */}
      <style>{`
        .hero-root {
          position: relative;
          min-height: 100vh;
          padding: calc(75px + 2rem) 0 3.5rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
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
          transition: opacity 1.5s ease-in-out;
        }

        .hero-bg-slide.active {
          opacity: 1;
        }

        .ken-burns {
          animation: kenBurns 12s infinite alternate ease-in-out;
        }

        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }

        .hero-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg, 
            rgba(7, 11, 20, 0.75) 0%, 
            rgba(0, 18, 51, 0.88) 50%, 
            rgba(7, 11, 20, 0.98) 100%
          );
        }

        .hero-content-container {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-brand-wordmark {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .brand-plain-beige {
          font-family: var(--font-ui, sans-serif);
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #F9FBE7;
        }

        .brand-dot {
          color: #FF892F;
          font-size: 0.8rem;
        }

        .brand-est {
          font-size: 0.75rem;
          color: #94A3B8;
          font-weight: 700;
        }

        .hero-headline-block {
          max-width: 850px;
          margin-bottom: 2rem;
        }

        .hero-title {
          font-size: 3.6rem;
          font-weight: 900;
          color: #FFFFFF;
          margin-bottom: 0.85rem;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .text-orange-glow {
          color: #FF892F;
          text-shadow: 0 0 30px rgba(255, 137, 47, 0.5);
        }

        .hero-subline {
          font-size: 1.15rem;
          color: #CBD5E1;
          line-height: 1.6;
          max-width: 720px;
          margin: 0 auto;
        }

        /* Question & Mode Tabs */
        .hero-question-container {
          width: 100%;
          max-width: 960px;
          margin-bottom: 1.5rem;
        }

        .question-badge-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          margin-bottom: 0.85rem;
        }

        .question-icon-spark {
          font-size: 1.2rem;
        }

        .question-text {
          font-size: 1.35rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          font-family: var(--font-editorial, serif);
        }

        .master-mode-tabs {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .mode-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.4rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #CBD5E1;
          font-size: 0.92rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(10px);
        }

        .mode-tab-btn:hover {
          background: rgba(255, 137, 47, 0.15);
          border-color: #FF892F;
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        .mode-tab-btn.active {
          background: linear-gradient(135deg, #FF892F, #E65100);
          border-color: #FF892F;
          color: #FFFFFF;
          box-shadow: 0 0 25px rgba(255, 137, 47, 0.45);
          transform: translateY(-2px);
        }

        /* In-Place Interactive Stage */
        .hero-interactive-stage {
          width: 100%;
          max-width: 1120px;
          padding: 1.75rem;
          border-radius: 28px;
          background: rgba(0, 18, 51, 0.85);
          backdrop-filter: blur(20px);
          border: 1.5px solid rgba(111, 230, 252, 0.25);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.7);
        }

        .animate-fade-in {
          animation: fadeInStage 0.35s ease-out;
        }

        @keyframes fadeInStage {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Continents Deck Strip */
        .continents-deck-strip {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 1rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 137, 47, 0.4) transparent;
        }

        .continent-chip-card {
          flex: 1;
          min-width: 135px;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.75rem 1rem;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #E2E8F0;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
        }

        .continent-chip-card:hover {
          background: rgba(111, 230, 252, 0.12);
          border-color: rgba(111, 230, 252, 0.4);
          transform: translateY(-2px);
        }

        .continent-chip-card.active {
          background: rgba(255, 137, 47, 0.2);
          border-color: #FF892F;
          box-shadow: 0 0 18px rgba(255, 137, 47, 0.35);
        }

        .continent-icon-glow {
          font-size: 1.6rem;
        }

        .continent-chip-meta {
          display: flex;
          flex-direction: column;
        }

        .c-title {
          font-size: 0.9rem;
          color: #FFFFFF;
        }

        .c-subtext {
          font-size: 0.68rem;
          color: #94A3B8;
        }

        /* Country Pills Bar */
        .country-pills-bar {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.85rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }

        .pills-label {
          font-size: 0.82rem;
          font-weight: 700;
          color: #94A3B8;
        }

        .pills-scroll-row {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          flex-wrap: wrap;
        }

        .country-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #E2E8F0;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .country-pill-btn:hover {
          background: rgba(111, 230, 252, 0.15);
          border-color: #6FE6FC;
          color: #6FE6FC;
        }

        .country-pill-btn.active {
          background: #FF892F;
          border-color: #FF892F;
          color: #FFFFFF;
        }

        .badge-count {
          font-size: 0.65rem;
          background: rgba(0, 0, 0, 0.3);
          padding: 0.1rem 0.4rem;
          border-radius: 9999px;
        }

        /* Cities In-Place Grid */
        .stage-cities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.15rem;
        }

        .city-in-place-card {
          padding: 1.25rem;
          border-radius: 18px;
          background: rgba(0, 29, 81, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 0.85rem;
          text-align: left;
          transition: all 0.25s ease;
        }

        .city-in-place-card:hover {
          border-color: rgba(255, 137, 47, 0.45);
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
        }

        .c-card-top-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .c-city-name-lockup {
          display: flex;
          gap: 0.4rem;
        }

        .city-marker {
          font-size: 1.15rem;
        }

        .city-headline {
          font-size: 1.05rem;
          color: #FFFFFF;
          margin: 0;
        }

        .city-state-sub {
          font-size: 0.74rem;
          color: #94A3B8;
        }

        .weather-pill-tag {
          font-size: 0.68rem;
          font-weight: 700;
          color: #6FE6FC;
          background: rgba(111, 230, 252, 0.15);
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
          white-space: nowrap;
        }

        .c-theme-badge {
          font-size: 0.74rem;
          font-weight: 700;
          color: #FF892F;
        }

        .c-highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .c-highlights-list li {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: #CBD5E1;
        }

        .c-card-footer-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .start-lbl {
          display: block;
          font-size: 0.68rem;
          color: #94A3B8;
        }

        .price-bold {
          font-size: 1.2rem;
          color: #FF892F;
        }

        .price-unit-tag {
          font-size: 0.7rem;
          color: #94A3B8;
          margin-left: 0.25rem;
        }

        .action-buttons-inline {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .btn-itinerary-inline {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.4rem 0.8rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-itinerary-inline:hover {
          background: rgba(111, 230, 252, 0.2);
          border-color: #6FE6FC;
          color: #6FE6FC;
        }

        .btn-book-inline {
          padding: 0.4rem 0.8rem;
          border-radius: 9999px;
          background: #FF892F;
          border: none;
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-book-inline:hover {
          background: #E65100;
        }

        /* Seasons and Styles bars */
        .seasons-selector-bar, .styles-selector-bar {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .season-pill-tab, .style-pill-tab {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.75rem 1rem;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #E2E8F0;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .season-pill-tab.active, .style-pill-tab.active {
          background: rgba(255, 137, 47, 0.2);
          border-color: #FF892F;
        }

        .season-icon-tag, .style-icon-tag {
          font-size: 1.6rem;
        }

        .season-info-box, .style-info-box {
          display: flex;
          flex-direction: column;
        }

        .season-temp {
          font-size: 0.7rem;
          color: #6FE6FC;
          font-weight: 700;
        }

        .season-summary-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          border-radius: 14px;
          background: rgba(0, 29, 81, 0.6);
          border: 1px solid rgba(255, 137, 47, 0.25);
          font-size: 0.85rem;
          color: #CBD5E1;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .dest-chips-row, .perks-pills-row {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .chip-item {
          background: rgba(255, 255, 255, 0.08);
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          color: #F9FBE7;
        }

        .seasonal-stage-card {
          border-radius: 18px;
          overflow: hidden;
          background: rgba(0, 29, 81, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .st-img-pane {
          position: relative;
          height: 140px;
        }

        .st-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .st-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(255, 137, 47, 0.9);
          color: #FFFFFF;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
        }

        .st-dur {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0, 18, 51, 0.85);
          color: #6FE6FC;
          font-size: 0.68rem;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
        }

        .st-body {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
        }

        .st-country {
          font-size: 0.72rem;
          color: #94A3B8;
        }

        .st-title {
          font-size: 0.98rem;
          color: #FFFFFF;
          margin: 0.25rem 0 0.75rem 0;
        }

        .st-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .style-perks-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.25rem;
          border-radius: 14px;
          background: rgba(0, 29, 81, 0.6);
          border: 1px solid rgba(255, 137, 47, 0.25);
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .perk-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: #CBD5E1;
          background: rgba(255, 255, 255, 0.06);
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
        }

        .btn-whatsapp-mini {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.85rem;
          border-radius: 9999px;
          background: #10B981;
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 800;
          text-decoration: none;
        }

        @media (max-width: 860px) {
          .hero-title {
            font-size: 2.35rem;
          }
          .continents-deck-strip {
            grid-template-columns: repeat(2, 1fr);
          }
          .seasons-selector-bar, .styles-selector-bar {
            grid-template-columns: 1fr 1fr;
          }
          .hero-interactive-stage {
            padding: 1.15rem;
          }
        }
      `}</style>
    </section>
  );
}
