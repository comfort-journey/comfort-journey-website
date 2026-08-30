import React, { useState } from 'react';
import { 
  Globe, Compass, MapPin, ChevronRight, Sparkles, Sun, CloudRain, Snowflake,
  Leaf, Flower2, Users, Heart, Award, ArrowRight, CheckCircle2, ShieldCheck,
  Plane, Clock, Flame, PhoneCall, MessageCircle, ExternalLink
} from 'lucide-react';
import { CONTINENTS_TREE_DATA, SEASONS_DATA, TRAVELER_STYLES_DATA } from '../data/continentHierarchyData';
import { TOURS_DATA } from '../data/toursData';
import { useCurrency } from '../context/CurrencyContext';
import Tilt3DCard from './animations/Tilt3DCard';

export default function GlobalDestinationTree({ onSelectItinerary, onBookNow, onOpenAIPlanner, onOpenQuote }) {
  const { formatPrice } = useCurrency();

  // Mode: 'tree' (7 Continents Tree) | 'weather' (Seasons/Weather) | 'styles' (Solo/Couple/Family/Group)
  const [activeMode, setActiveMode] = useState('tree');

  // Tree drill-down states
  const [selectedContinentId, setSelectedContinentId] = useState('asia');
  const [selectedCountryId, setSelectedCountryId] = useState('india');
  const [selectedCityId, setSelectedCityId] = useState(null);

  // Weather & Style filter states
  const [selectedSeasonId, setSelectedSeasonId] = useState('winter');
  const [selectedStyleId, setSelectedStyleId] = useState('couple');

  const activeContinent = CONTINENTS_TREE_DATA.find(c => c.id === selectedContinentId) || CONTINENTS_TREE_DATA[0];
  const activeCountry = activeContinent.countries.find(c => c.id === selectedCountryId) || activeContinent.countries[0];

  const handleContinentSelect = (continentId) => {
    setSelectedContinentId(continentId);
    const continent = CONTINENTS_TREE_DATA.find(c => c.id === continentId);
    if (continent && continent.countries.length > 0) {
      setSelectedCountryId(continent.countries[0].id);
      setSelectedCityId(null);
    }
  };

  const handleCountrySelect = (countryId) => {
    setSelectedCountryId(countryId);
    setSelectedCityId(null);
  };

  // Find matching tour object in TOURS_DATA
  const getTourObject = (tourId) => {
    return TOURS_DATA.find(t => t.id === tourId) || TOURS_DATA[0];
  };

  return (
    <section id="global-directory" className="global-tree-section">
      <div className="container">
        {/* Section Header */}
        <div className="tree-header-wrapper text-center">
          <div className="badge badge-amber mb-3 inline-flex">
            <Globe size={14} />
            <span>GLOBAL TRAVEL DIRECTORY • 7 CONTINENTS</span>
          </div>

          <h2 className="tree-main-title font-editorial illuminate-text">
            Navigate The World <br />
            <span className="gradient-text-gold">By Continent, Season & Travel Style</span>
          </h2>

          <p className="tree-subtitle">
            Explore 2,000+ destinations worldwide through our structured travel tree. Select any continent to drill down into countries, famous travel cities, and bespoke tour packages.
          </p>

          {/* Master View Mode Switcher */}
          <div className="master-mode-pills">
            <button 
              type="button" 
              className={`mode-pill-btn ${activeMode === 'tree' ? 'active' : ''}`}
              onClick={() => setActiveMode('tree')}
            >
              <Globe size={16} />
              <span>🗺️ 7 Continents Tree Navigator</span>
            </button>

            <button 
              type="button" 
              className={`mode-pill-btn ${activeMode === 'weather' ? 'active' : ''}`}
              onClick={() => setActiveMode('weather')}
            >
              <Sun size={16} />
              <span>🌦️ Explore by Weather & Season</span>
            </button>

            <button 
              type="button" 
              className={`mode-pill-btn ${activeMode === 'styles' ? 'active' : ''}`}
              onClick={() => setActiveMode('styles')}
            >
              <Users size={16} />
              <span>👥 Solo, Couple, Family & Group</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            MODE 1: 7 CONTINENTS TREE BRANCH NAVIGATOR
            ========================================================================= */}
        {activeMode === 'tree' && (
          <div className="tree-navigator-container glass-card">
            {/* LEVEL 1: CONTINENTS SELECTOR STRIP */}
            <div className="continents-scroll-bar">
              {CONTINENTS_TREE_DATA.map((continent) => (
                <button
                  key={continent.id}
                  type="button"
                  className={`continent-tab-card ${selectedContinentId === continent.id ? 'active' : ''}`}
                  onClick={() => handleContinentSelect(continent.id)}
                >
                  <span className="c-icon">{continent.icon}</span>
                  <div className="c-info">
                    <span className="c-name">{continent.name}</span>
                    <span className="c-sub">{continent.countries.length} Countries</span>
                  </div>
                  {continent.badge && (
                    <span className="c-badge-pill">{continent.badge}</span>
                  )}
                </button>
              ))}
            </div>

            {/* BREADCRUMB EXPLORER BAR */}
            <div className="tree-breadcrumb-bar">
              <span className="bc-item home" onClick={() => handleContinentSelect('asia')}>
                <Globe size={14} /> World
              </span>
              <ChevronRight size={14} className="text-muted" />
              <span className="bc-item">
                {activeContinent.icon} {activeContinent.name}
              </span>
              <ChevronRight size={14} className="text-muted" />
              <span className="bc-item active">
                {activeCountry.flag} {activeCountry.name}
              </span>
              {selectedCityId && (
                <>
                  <ChevronRight size={14} className="text-muted" />
                  <span className="bc-item city-highlight">
                    📍 {activeCountry.cities.find(c => c.id === selectedCityId)?.name}
                  </span>
                </>
              )}
            </div>

            {/* LEVEL 2 & 3: SPLIT DRILL-DOWN PANEL */}
            <div className="tree-split-layout">
              {/* Left Column: Countries in Active Continent */}
              <div className="countries-list-pane">
                <div className="pane-header">
                  <h4>Countries in {activeContinent.name} ({activeContinent.countries.length})</h4>
                  <span className="pane-note">Select country to view travel cities</span>
                </div>

                <div className="country-cards-stack">
                  {activeContinent.countries.map((country) => (
                    <div
                      key={country.id}
                      className={`country-item-card ${selectedCountryId === country.id ? 'selected' : ''}`}
                      onClick={() => handleCountrySelect(country.id)}
                    >
                      <span className="country-flag">{country.flag}</span>
                      <div className="country-meta">
                        <strong className="country-title">{country.name}</strong>
                        <span className="country-tagline">{country.tag}</span>
                      </div>
                      <span className="city-count-badge">{country.cities.length} Cities</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Famous Travel Cities & Linked Tour Packages */}
              <div className="cities-tours-pane">
                <div className="pane-header-country">
                  <div>
                    <span className="selected-flag">{activeCountry.flag}</span>
                    <h3>Travel Destinations in {activeCountry.name}</h3>
                    <p className="country-sub">{activeCountry.tag}</p>
                  </div>
                  <button 
                    type="button" 
                    className="btn-custom-ai-mini"
                    onClick={onOpenAIPlanner}
                  >
                    <Sparkles size={14} />
                    <span>AI Custom Route</span>
                  </button>
                </div>

                {/* Cities Grid */}
                <div className="cities-cards-grid">
                  {activeCountry.cities.map((city) => {
                    const linkedTour = getTourObject(city.tourId);

                    return (
                      <div key={city.id} className="city-tour-card glass-card">
                        <div className="city-card-top">
                          <div className="city-title-lockup">
                            <span className="city-pin">📍</span>
                            <div>
                              <h4 className="city-name">{city.name}</h4>
                              <span className="city-type-tag">{city.type}</span>
                            </div>
                          </div>
                          <span className="weather-chip">{city.weatherTag}</span>
                        </div>

                        {/* City Highlights */}
                        <ul className="city-highlights-list">
                          {city.highlights.map((h, hIdx) => (
                            <li key={hIdx}>
                              <CheckCircle2 size={13} className="text-emerald" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Pricing & Duration Bar */}
                        <div className="city-pricing-row">
                          <div>
                            <span className="p-label">Starting from:</span>
                            <strong className="p-val font-editorial">{formatPrice(city.startingPrice)}</strong>
                            <span className="p-dur">/ person • {city.duration}</span>
                          </div>

                          <div className="city-action-btns">
                            <button
                              type="button"
                              className="btn-view-itinerary"
                              onClick={() => onSelectItinerary(linkedTour)}
                              title="View Day-Wise Itinerary"
                            >
                              <span>View Itinerary</span>
                              <ArrowRight size={13} />
                            </button>

                            <button
                              type="button"
                              className="btn-book-city"
                              onClick={() => onBookNow(linkedTour)}
                              title="Book Trip with VIP Concierge"
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
            </div>
          </div>
        )}

        {/* =========================================================================
            MODE 2: WEATHER & SEASON DISCOVERY
            ========================================================================= */}
        {activeMode === 'weather' && (
          <div className="weather-discovery-container glass-card">
            {/* Season Selector Tabs */}
            <div className="seasons-tabs-strip">
              {SEASONS_DATA.map((season) => (
                <button
                  key={season.id}
                  type="button"
                  className={`season-weather-btn ${selectedSeasonId === season.id ? 'active' : ''}`}
                  onClick={() => setSelectedSeasonId(season.id)}
                >
                  <span className="s-emoji">{season.icon}</span>
                  <div className="s-text">
                    <strong>{season.label}</strong>
                    {season.temp && <span className="s-temp">{season.temp}</span>}
                  </div>
                </button>
              ))}
            </div>

            {/* Active Season Overview Card */}
            {(() => {
              const activeSeasonObj = SEASONS_DATA.find(s => s.id === selectedSeasonId) || SEASONS_DATA[1];
              return (
                <div className="season-detail-banner">
                  <div className="s-banner-left">
                    <span className="s-badge-highlight">{activeSeasonObj.icon} {activeSeasonObj.label}</span>
                    <h3 className="s-banner-heading font-editorial">{activeSeasonObj.desc}</h3>
                    {activeSeasonObj.topDestinations && (
                      <div className="s-top-dest-tags">
                        <span>Top Season Picks:</span>
                        {activeSeasonObj.topDestinations.map((d, i) => (
                          <span key={i} className="dest-tag-pill">✨ {d}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="s-banner-right">
                    <button 
                      type="button" 
                      className="btn-primary"
                      onClick={() => {
                        const firstTour = TOURS_DATA[0];
                        onSelectItinerary(firstTour);
                      }}
                    >
                      <Sparkles size={16} />
                      <span>Explore Seasonal Itineraries</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Matching Seasonal Tour Grid */}
            <div className="seasonal-tours-grid">
              {TOURS_DATA.slice(0, 4).map((tour) => (
                <div key={tour.id} className="seasonal-tour-card glass-card">
                  <div className="s-card-img-box">
                    <img src={tour.image} alt={tour.name} className="s-card-img" />
                    <span className="s-card-badge">{tour.badge}</span>
                  </div>
                  <div className="s-card-content">
                    <span className="s-country-tag">📍 {tour.country} • {tour.duration}</span>
                    <h4 className="s-tour-name font-editorial">{tour.name}</h4>
                    <div className="s-bottom-row">
                      <div>
                        <span className="s-from">From</span>
                        <strong className="s-price gradient-text-gold">{formatPrice(tour.price)}</strong>
                      </div>
                      <button 
                        type="button" 
                        className="btn-secondary-glass"
                        onClick={() => onSelectItinerary(tour)}
                      >
                        <span>Itinerary</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            MODE 3: TRAVELER STYLE (SOLO, COUPLE, FAMILY, GROUP)
            ========================================================================= */}
        {activeMode === 'styles' && (
          <div className="styles-discovery-container glass-card">
            {/* Travel Style Selector */}
            <div className="styles-selector-strip">
              {TRAVELER_STYLES_DATA.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  className={`style-tab-card ${selectedStyleId === style.id ? 'active' : ''}`}
                  onClick={() => setSelectedStyleId(style.id)}
                >
                  <span className="st-icon">{style.icon}</span>
                  <div className="st-info">
                    <strong>{style.label}</strong>
                    <span className="st-sub">{style.perks.length} Tailored Perks</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Active Style Perks & Feature Box */}
            {(() => {
              const activeStyleObj = TRAVELER_STYLES_DATA.find(s => s.id === selectedStyleId) || TRAVELER_STYLES_DATA[0];
              return (
                <div className="style-feature-banner">
                  <div className="st-left">
                    <div className="badge badge-purple mb-2 inline-flex">
                      <span>{activeStyleObj.icon} {activeStyleObj.label}</span>
                    </div>
                    <h3 className="st-title font-editorial">{activeStyleObj.tagline}</h3>
                    
                    <div className="st-perks-grid">
                      {activeStyleObj.perks.map((p, i) => (
                        <div key={i} className="perk-item">
                          <CheckCircle2 size={16} className="text-emerald" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="st-right">
                    <a 
                      href={`https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I'm%20planning%20a%20${encodeURIComponent(activeStyleObj.label)}%20custom%20trip.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp w-full text-center"
                    >
                      <MessageCircle size={18} />
                      <span>Chat with {activeStyleObj.label} Specialist</span>
                    </a>
                  </div>
                </div>
              );
            })()}

            {/* Recommended Packages for this Style */}
            <div className="style-recommended-grid">
              {TOURS_DATA.slice(0, 3).map((tour) => (
                <div key={tour.id} className="style-tour-item glass-card">
                  <img src={tour.image} alt={tour.name} className="st-img" />
                  <div className="st-details">
                    <span className="st-tag">{tour.category}</span>
                    <h4 className="st-name font-editorial">{tour.name}</h4>
                    <p className="st-desc">{tour.tagline}</p>
                    <div className="st-actions-row">
                      <strong className="st-price">{formatPrice(tour.price)}</strong>
                      <button 
                        type="button" 
                        className="btn-primary"
                        onClick={() => onSelectItinerary(tour)}
                      >
                        <span>View Package</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* STYLES FOR GLOBAL DESTINATION TREE */}
      <style>{`
        .global-tree-section {
          padding: 4.5rem 0 3rem 0;
          background: linear-gradient(180deg, rgba(0, 18, 51, 0.4) 0%, rgba(0, 29, 81, 0.6) 100%);
          position: relative;
        }

        .tree-header-wrapper {
          max-width: 820px;
          margin: 0 auto 2.5rem auto;
        }

        .tree-main-title {
          font-size: 2.75rem;
          color: #FFFFFF;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }

        .tree-subtitle {
          font-size: 1.05rem;
          color: #94A3B8;
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }

        /* Master Mode Switcher */
        .master-mode-pills {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .mode-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.65rem 1.35rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #CBD5E1;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .mode-pill-btn:hover {
          border-color: #FF892F;
          color: #FFFFFF;
          background: rgba(255, 137, 47, 0.15);
        }

        .mode-pill-btn.active {
          background: linear-gradient(135deg, #FF892F, #E65100);
          border-color: #FF892F;
          color: #FFFFFF;
          box-shadow: 0 0 20px rgba(255, 137, 47, 0.4);
        }

        /* Mode 1: Tree Navigator */
        .tree-navigator-container {
          padding: 1.5rem;
          border-radius: 28px;
          background: rgba(0, 18, 51, 0.75);
          border: 1px solid rgba(111, 230, 252, 0.25);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
        }

        .continents-scroll-bar {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 137, 47, 0.4) transparent;
        }

        .continent-tab-card {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 1.15rem;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #E2E8F0;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .continent-tab-card:hover {
          background: rgba(111, 230, 252, 0.12);
          border-color: rgba(111, 230, 252, 0.4);
        }

        .continent-tab-card.active {
          background: rgba(255, 137, 47, 0.2);
          border-color: #FF892F;
          box-shadow: 0 0 15px rgba(255, 137, 47, 0.3);
        }

        .c-icon {
          font-size: 1.4rem;
        }

        .c-info {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .c-name {
          font-size: 0.92rem;
          font-weight: 800;
          color: #FFFFFF;
        }

        .c-sub {
          font-size: 0.72rem;
          color: #94A3B8;
        }

        .c-badge-pill {
          position: absolute;
          top: -6px;
          right: 8px;
          background: #FF892F;
          color: #FFFFFF;
          font-size: 0.62rem;
          font-weight: 800;
          padding: 0.15rem 0.45rem;
          border-radius: 9999px;
        }

        /* Breadcrumb Bar */
        .tree-breadcrumb-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 0.5rem;
          font-size: 0.82rem;
          color: #94A3B8;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .bc-item {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          cursor: pointer;
        }

        .bc-item.home:hover {
          color: #6FE6FC;
        }

        .bc-item.active {
          color: #FF892F;
          font-weight: 800;
        }

        .bc-item.city-highlight {
          color: #DAF561;
          font-weight: 800;
        }

        /* Split Drill-down Layout */
        .tree-split-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 1.5rem;
          margin-top: 1.25rem;
        }

        /* Left Countries List */
        .countries-list-pane {
          background: rgba(0, 29, 81, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          max-height: 580px;
          overflow-y: auto;
        }

        .pane-header h4 {
          font-size: 0.95rem;
          color: #FFFFFF;
          margin-bottom: 0.15rem;
        }

        .pane-note {
          font-size: 0.72rem;
          color: #94A3B8;
        }

        .country-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .country-item-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .country-item-card:hover {
          background: rgba(111, 230, 252, 0.1);
          border-color: rgba(111, 230, 252, 0.3);
        }

        .country-item-card.selected {
          background: rgba(255, 137, 47, 0.2);
          border-color: #FF892F;
        }

        .country-flag {
          font-size: 1.5rem;
        }

        .country-meta {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .country-title {
          font-size: 0.92rem;
          color: #FFFFFF;
        }

        .country-tagline {
          font-size: 0.72rem;
          color: #94A3B8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 150px;
        }

        .city-count-badge {
          font-size: 0.7rem;
          font-weight: 800;
          color: #6FE6FC;
          background: rgba(111, 230, 252, 0.15);
          padding: 0.2rem 0.5rem;
          border-radius: 9999px;
        }

        /* Right Cities & Tours Pane */
        .cities-tours-pane {
          background: rgba(0, 29, 81, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 1.25rem;
          max-height: 580px;
          overflow-y: auto;
        }

        .pane-header-country {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 1.25rem;
        }

        .selected-flag {
          font-size: 1.8rem;
        }

        .pane-header-country h3 {
          font-size: 1.35rem;
          color: #FFFFFF;
          margin: 0.1rem 0;
        }

        .country-sub {
          font-size: 0.82rem;
          color: #94A3B8;
          margin: 0;
        }

        .btn-custom-ai-mini {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 0.85rem;
          border-radius: 9999px;
          background: rgba(111, 230, 252, 0.15);
          border: 1px solid rgba(111, 230, 252, 0.4);
          color: #6FE6FC;
          font-size: 0.78rem;
          font-weight: 800;
          cursor: pointer;
        }

        .cities-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
        }

        .city-tour-card {
          padding: 1.15rem;
          border-radius: 16px;
          background: rgba(0, 18, 51, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 0.85rem;
          transition: all 0.25s ease;
        }

        .city-tour-card:hover {
          border-color: rgba(255, 137, 47, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }

        .city-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .city-title-lockup {
          display: flex;
          gap: 0.45rem;
        }

        .city-pin {
          font-size: 1.1rem;
        }

        .city-name {
          font-size: 0.98rem;
          color: #FFFFFF;
          margin-bottom: 0.15rem;
        }

        .city-type-tag {
          font-size: 0.72rem;
          color: #FF892F;
          font-weight: 700;
        }

        .weather-chip {
          font-size: 0.68rem;
          font-weight: 700;
          color: #6FE6FC;
          background: rgba(111, 230, 252, 0.15);
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          white-space: nowrap;
        }

        .city-highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .city-highlights-list li {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: #CBD5E1;
        }

        .city-pricing-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .p-label {
          display: block;
          font-size: 0.68rem;
          color: #94A3B8;
        }

        .p-val {
          font-size: 1.15rem;
          color: #FF892F;
          font-weight: 800;
        }

        .p-dur {
          font-size: 0.7rem;
          color: #94A3B8;
          margin-left: 0.25rem;
        }

        .city-action-btns {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .btn-view-itinerary {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          font-size: 0.74rem;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-view-itinerary:hover {
          background: rgba(111, 230, 252, 0.2);
          border-color: #6FE6FC;
          color: #6FE6FC;
        }

        .btn-book-city {
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          background: #FF892F;
          border: none;
          color: #FFFFFF;
          font-size: 0.74rem;
          font-weight: 800;
          cursor: pointer;
        }

        .btn-book-city:hover {
          background: #E65100;
        }

        /* Mode 2: Weather Discovery */
        .weather-discovery-container {
          padding: 2rem;
          border-radius: 28px;
        }

        .seasons-tabs-strip {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 1rem;
          scrollbar-width: thin;
        }

        .season-weather-btn {
          flex: 1;
          min-width: 160px;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.85rem 1rem;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #E2E8F0;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .season-weather-btn.active {
          background: rgba(255, 137, 47, 0.2);
          border-color: #FF892F;
        }

        .s-emoji {
          font-size: 1.5rem;
        }

        .s-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .s-temp {
          font-size: 0.72rem;
          color: #6FE6FC;
          font-weight: 700;
        }

        .season-detail-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-radius: 20px;
          background: rgba(0, 29, 81, 0.6);
          border: 1px solid rgba(255, 137, 47, 0.3);
          margin: 1.5rem 0;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .s-badge-highlight {
          font-size: 0.8rem;
          font-weight: 800;
          color: #FF892F;
        }

        .s-banner-heading {
          font-size: 1.35rem;
          color: #FFFFFF;
          margin: 0.3rem 0 0.6rem 0;
        }

        .s-top-dest-tags {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          color: #94A3B8;
          flex-wrap: wrap;
        }

        .dest-tag-pill {
          background: rgba(255, 255, 255, 0.06);
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          color: #F9FBE7;
          font-size: 0.76rem;
        }

        .seasonal-tours-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }

        .seasonal-tour-card {
          border-radius: 18px;
          overflow: hidden;
        }

        .s-card-img-box {
          position: relative;
          height: 180px;
        }

        .s-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .s-card-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(255, 137, 47, 0.9);
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
        }

        .s-card-content {
          padding: 1.25rem;
        }

        .s-country-tag {
          font-size: 0.74rem;
          color: #94A3B8;
        }

        .s-tour-name {
          font-size: 1.05rem;
          color: #FFFFFF;
          margin: 0.25rem 0 1rem 0;
        }

        .s-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .s-from {
          display: block;
          font-size: 0.68rem;
          color: #94A3B8;
        }

        .s-price {
          font-size: 1.15rem;
        }

        /* Mode 3: Style Discovery */
        .styles-discovery-container {
          padding: 2rem;
          border-radius: 28px;
        }

        .styles-selector-strip {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }

        .style-tab-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #E2E8F0;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .style-tab-card.active {
          background: rgba(255, 137, 47, 0.2);
          border-color: #FF892F;
        }

        .st-icon {
          font-size: 1.75rem;
        }

        .st-info {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .st-sub {
          font-size: 0.72rem;
          color: #94A3B8;
        }

        .style-feature-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem;
          border-radius: 20px;
          background: rgba(0, 29, 81, 0.6);
          border: 1px solid rgba(255, 137, 47, 0.3);
          margin: 1.75rem 0;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .st-title {
          font-size: 1.45rem;
          color: #FFFFFF;
          margin-bottom: 1rem;
        }

        .st-perks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 0.75rem;
        }

        .perk-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.85rem;
          color: #CBD5E1;
        }

        .style-recommended-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.25rem;
        }

        .style-tour-item {
          display: flex;
          gap: 1rem;
          padding: 1.25rem;
          border-radius: 18px;
        }

        .st-img {
          width: 100px;
          height: 100px;
          border-radius: 14px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .st-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .st-tag {
          font-size: 0.7rem;
          color: #FF892F;
          font-weight: 700;
        }

        .st-name {
          font-size: 0.98rem;
          color: #FFFFFF;
        }

        .st-desc {
          font-size: 0.76rem;
          color: #94A3B8;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .st-actions-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.5rem;
        }

        .st-price {
          font-size: 1.05rem;
          color: #FF892F;
        }

        @media (max-width: 900px) {
          .tree-split-layout {
            grid-template-columns: 1fr;
          }
          .countries-list-pane {
            max-height: 260px;
          }
          .tree-main-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
