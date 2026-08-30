import React, { useState } from 'react';
import { 
  Globe, MapPin, ChevronRight, Sparkles, CheckCircle2, ArrowRight, 
  Compass, ExternalLink, Calendar, Heart, ShieldCheck, Flame, Layers
} from 'lucide-react';
import { CONTINENTS_TREE_DATA } from '../data/continentHierarchyData';
import { TOURS_DATA } from '../data/toursData';
import { useCurrency } from '../context/CurrencyContext';
import Tilt3DCard from './animations/Tilt3DCard';

export default function ContinentMapExplorer({ onSelectItinerary, onBookNow, onOpenAIPlanner }) {
  const { formatPrice } = useCurrency();
  const [selectedContinentId, setSelectedContinentId] = useState('asia');
  const [selectedCountryId, setSelectedCountryId] = useState('india');
  const [selectedCityId, setSelectedCityId] = useState(null);

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

  const getTourObject = (tourId) => {
    return TOURS_DATA.find(t => t.id === tourId) || TOURS_DATA[0];
  };

  return (
    <section id="continents-map-section" className="continent-map-root">
      <div className="container">
        {/* Section Header */}
        <div className="section-head-center text-center">
          <div className="badge badge-amber mb-3 inline-flex">
            <Globe size={14} />
            <span>INTERACTIVE WORLD MAP • 7 CONTINENTS</span>
          </div>

          <h2 className="section-title font-editorial illuminate-text">
            Explore The World <br />
            <span className="gradient-text-gold">Continent by Continent, City by City</span>
          </h2>

          <p className="section-desc max-w-2xl mx-auto">
            Select any continent on our interactive world map to drill down into countries, travel cities, and handcrafted VIP tour packages.
          </p>
        </div>

        {/* 7 CONTINENTS INTERACTIVE WORLD CARDS DECK */}
        <div className="continents-map-deck">
          {CONTINENTS_TREE_DATA.map((continent) => {
            const isSelected = selectedContinentId === continent.id;

            return (
              <div
                key={continent.id}
                className={`continent-map-card ${isSelected ? 'active-continent' : ''}`}
                onClick={() => handleContinentSelect(continent.id)}
              >
                <div className="c-card-bg" style={{ backgroundImage: `url(${continent.image})` }} />
                <div className="c-card-overlay" />
                
                <div className="c-card-content">
                  <div className="c-top-row">
                    <span className="c-icon-large">{continent.icon}</span>
                    {continent.badge && <span className="c-badge">{continent.badge}</span>}
                  </div>

                  <div className="c-bottom-info">
                    <h3 className="c-name-large font-editorial">{continent.name}</h3>
                    <p className="c-tagline-short">{continent.tagline}</p>

                    <div className="c-stats-row">
                      <span className="c-stat-pill"><strong>{continent.countries.length}</strong> Countries</span>
                      <span className="c-stat-pill"><strong>{continent.stats.destinations}</strong> Cities</span>
                    </div>
                  </div>
                </div>

                {isSelected && <div className="c-active-indicator" />}
              </div>
            );
          })}
        </div>

        {/* STEP-BY-STEP DRILL DOWN: COUNTRIES -> CITIES -> TOUR PACKAGES */}
        <div className="drilldown-display-wrapper glass-card">
          {/* Breadcrumb Navigation Trail */}
          <div className="drilldown-breadcrumb">
            <span className="bc-step" onClick={() => handleContinentSelect('asia')}>
              <Globe size={14} /> 7 Continents
            </span>
            <ChevronRight size={14} className="text-muted" />
            <span className="bc-step active">
              {activeContinent.icon} {activeContinent.name}
            </span>
            <ChevronRight size={14} className="text-muted" />
            <span className="bc-step active-country">
              {activeCountry.flag} {activeCountry.name}
            </span>
            {selectedCityId && (
              <>
                <ChevronRight size={14} className="text-muted" />
                <span className="bc-step active-city">
                  📍 {activeCountry.cities.find(c => c.id === selectedCityId)?.name}
                </span>
              </>
            )}
          </div>

          <div className="drilldown-grid-layout">
            {/* Left Panel: Countries of Active Continent */}
            <div className="countries-selector-pane">
              <div className="pane-header">
                <span className="pane-kicker">STEP 1: CHOOSE COUNTRY</span>
                <h4>Countries in {activeContinent.name}</h4>
              </div>

              <div className="country-pills-list">
                {activeContinent.countries.map((country) => (
                  <button
                    key={country.id}
                    type="button"
                    className={`country-select-btn ${selectedCountryId === country.id ? 'active' : ''}`}
                    onClick={() => handleCountrySelect(country.id)}
                  >
                    <span className="c-flag">{country.flag}</span>
                    <div className="c-labels">
                      <strong className="c-country-name">{country.name}</strong>
                      <span className="c-cities-count">{country.cities.length} Travel Cities</span>
                    </div>
                    <ChevronRight size={15} className="c-chevron" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Panel: Famous Travel Cities in Selected Country */}
            <div className="cities-tours-explorer-pane">
              <div className="pane-header-country-row">
                <div className="country-headline">
                  <span className="c-hero-flag">{activeCountry.flag}</span>
                  <div>
                    <span className="pane-kicker">STEP 2: EXPLORE TRAVEL CITIES & PACKAGES</span>
                    <h3 className="country-heading font-editorial">{activeCountry.name}</h3>
                    <p className="country-tag-lead">{activeCountry.tag}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-ai-planner-chip"
                  onClick={onOpenAIPlanner}
                  title="Generate Custom Route with AI"
                >
                  <Sparkles size={14} />
                  <span>AI Custom {activeCountry.name} Itinerary</span>
                </button>
              </div>

              {/* Travel Cities Cards Grid */}
              <div className="travel-cities-grid">
                {activeCountry.cities.map((city) => {
                  const linkedTour = getTourObject(city.tourId);

                  return (
                    <div key={city.id} className="city-package-card glass-card">
                      <div className="city-card-header">
                        <div className="city-pin-lockup">
                          <span className="city-pin-icon">📍</span>
                          <div>
                            <h4 className="city-card-title">{city.name}</h4>
                            <span className="city-state-text">{city.state}</span>
                          </div>
                        </div>
                        <span className="city-weather-badge">{city.weatherTag}</span>
                      </div>

                      <div className="city-experience-tag">
                        <span>{city.type}</span>
                      </div>

                      <ul className="city-inclusions-list">
                        {city.highlights.map((h, i) => (
                          <li key={i}>
                            <CheckCircle2 size={13} className="text-emerald" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="city-card-footer">
                        <div className="city-price-block">
                          <span className="price-label">Starting from:</span>
                          <strong className="price-amount font-editorial">{formatPrice(city.startingPrice)}</strong>
                          <span className="price-unit">/ person • {city.duration}</span>
                        </div>

                        <div className="city-action-buttons">
                          <button
                            type="button"
                            className="btn-view-itinerary-pill"
                            onClick={() => onSelectItinerary(linkedTour)}
                          >
                            <span>View Itinerary</span>
                            <ArrowRight size={13} />
                          </button>

                          <button
                            type="button"
                            className="btn-book-now-pill"
                            onClick={() => onBookNow(linkedTour)}
                          >
                            <span>Book Now</span>
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
      </div>

      {/* STYLES FOR CONTINENT MAP EXPLORER */}
      <style>{`
        .continent-map-root {
          padding: 5rem 0 4rem 0;
          background: linear-gradient(180deg, rgba(7, 11, 20, 0.95) 0%, rgba(0, 18, 51, 0.6) 100%);
          position: relative;
        }

        .section-head-center {
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 2.85rem;
          color: #FFFFFF;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }

        .section-desc {
          font-size: 1.05rem;
          color: #94A3B8;
          line-height: 1.6;
        }

        /* 7 Continents Cards Deck */
        .continents-map-deck {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 1.15rem;
          margin-bottom: 2.5rem;
        }

        .continent-map-card {
          position: relative;
          height: 260px;
          border-radius: 22px;
          overflow: hidden;
          cursor: pointer;
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
        }

        .continent-map-card:hover {
          transform: translateY(-6px);
          border-color: #FF892F;
          box-shadow: 0 20px 45px rgba(255, 137, 47, 0.25);
        }

        .continent-map-card.active-continent {
          border-color: #FF892F;
          box-shadow: 0 0 30px rgba(255, 137, 47, 0.45);
          transform: translateY(-4px);
        }

        .c-card-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.6s ease;
        }

        .continent-map-card:hover .c-card-bg {
          transform: scale(1.08);
        }

        .c-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 18, 51, 0.3) 0%, rgba(0, 18, 51, 0.95) 100%);
        }

        .c-card-content {
          position: relative;
          z-index: 2;
          padding: 1.25rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .c-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .c-icon-large {
          font-size: 2rem;
        }

        .c-badge {
          background: rgba(255, 137, 47, 0.9);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
        }

        .c-name-large {
          font-size: 1.45rem;
          color: #FFFFFF;
          margin-bottom: 0.2rem;
        }

        .c-tagline-short {
          font-size: 0.76rem;
          color: #CBD5E1;
          line-height: 1.35;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .c-stats-row {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .c-stat-pill {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(8px);
          color: #F9FBE7;
          font-size: 0.68rem;
          padding: 0.2rem 0.5rem;
          border-radius: 9999px;
        }

        .c-active-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: #FF892F;
          box-shadow: 0 0 12px #FF892F;
        }

        /* Drilldown Display Wrapper */
        .drilldown-display-wrapper {
          padding: 2rem;
          border-radius: 28px;
          background: rgba(0, 18, 51, 0.8);
          border: 1px solid rgba(111, 230, 252, 0.25);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
        }

        .drilldown-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.84rem;
          color: #94A3B8;
          flex-wrap: wrap;
        }

        .bc-step {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          cursor: pointer;
        }

        .bc-step:hover {
          color: #6FE6FC;
        }

        .bc-step.active {
          color: #FFFFFF;
          font-weight: 700;
        }

        .bc-step.active-country {
          color: #FF892F;
          font-weight: 800;
        }

        .bc-step.active-city {
          color: #DAF561;
          font-weight: 800;
        }

        /* Split Layout */
        .drilldown-grid-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
          margin-top: 1.5rem;
        }

        .countries-selector-pane {
          background: rgba(0, 29, 81, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 1.25rem;
          max-height: 600px;
          overflow-y: auto;
        }

        .pane-kicker {
          font-size: 0.68rem;
          font-weight: 800;
          color: #FF892F;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 0.2rem;
        }

        .pane-header h4 {
          font-size: 1.05rem;
          color: #FFFFFF;
          margin-bottom: 1rem;
        }

        .country-pills-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .country-select-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #E2E8F0;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          text-align: left;
        }

        .country-select-btn:hover {
          background: rgba(111, 230, 252, 0.1);
          border-color: rgba(111, 230, 252, 0.3);
        }

        .country-select-btn.active {
          background: rgba(255, 137, 47, 0.2);
          border-color: #FF892F;
        }

        .c-flag {
          font-size: 1.6rem;
        }

        .c-labels {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .c-country-name {
          font-size: 0.92rem;
          color: #FFFFFF;
        }

        .c-cities-count {
          font-size: 0.72rem;
          color: #94A3B8;
        }

        .c-chevron {
          color: #94A3B8;
        }

        /* Right Panel: Cities & Packages */
        .cities-tours-explorer-pane {
          background: rgba(0, 29, 81, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 1.5rem;
          max-height: 600px;
          overflow-y: auto;
        }

        .pane-header-country-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 1.5rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .country-headline {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .c-hero-flag {
          font-size: 2.2rem;
        }

        .country-heading {
          font-size: 1.6rem;
          color: #FFFFFF;
          margin: 0;
        }

        .country-tag-lead {
          font-size: 0.85rem;
          color: #CBD5E1;
          margin: 0;
        }

        .btn-ai-planner-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          background: rgba(111, 230, 252, 0.15);
          border: 1px solid rgba(111, 230, 252, 0.4);
          color: #6FE6FC;
          font-size: 0.82rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-ai-planner-chip:hover {
          background: #6FE6FC;
          color: #001233;
        }

        /* Travel Cities Grid */
        .travel-cities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.25rem;
        }

        .city-package-card {
          padding: 1.35rem;
          border-radius: 18px;
          background: rgba(0, 18, 51, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1rem;
          transition: all 0.3s ease;
        }

        .city-package-card:hover {
          border-color: rgba(255, 137, 47, 0.45);
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
        }

        .city-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .city-pin-lockup {
          display: flex;
          gap: 0.45rem;
        }

        .city-pin-icon {
          font-size: 1.2rem;
        }

        .city-card-title {
          font-size: 1.05rem;
          color: #FFFFFF;
          margin-bottom: 0.15rem;
        }

        .city-state-text {
          font-size: 0.74rem;
          color: #94A3B8;
        }

        .city-weather-badge {
          font-size: 0.7rem;
          font-weight: 700;
          color: #6FE6FC;
          background: rgba(111, 230, 252, 0.15);
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          white-space: nowrap;
        }

        .city-experience-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: #FF892F;
        }

        .city-inclusions-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .city-inclusions-list li {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: #CBD5E1;
        }

        .city-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .price-label {
          display: block;
          font-size: 0.68rem;
          color: #94A3B8;
        }

        .price-amount {
          font-size: 1.25rem;
          color: #FF892F;
        }

        .price-unit {
          font-size: 0.72rem;
          color: #94A3B8;
          margin-left: 0.3rem;
        }

        .city-action-buttons {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .btn-view-itinerary-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.4rem 0.85rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-view-itinerary-pill:hover {
          background: rgba(111, 230, 252, 0.2);
          border-color: #6FE6FC;
          color: #6FE6FC;
        }

        .btn-book-now-pill {
          padding: 0.4rem 0.85rem;
          border-radius: 9999px;
          background: #FF892F;
          border: none;
          color: #FFFFFF;
          font-size: 0.76rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-book-now-pill:hover {
          background: #E65100;
          transform: scale(1.04);
        }

        @media (max-width: 960px) {
          .drilldown-grid-layout {
            grid-template-columns: 1fr;
          }
          .countries-selector-pane {
            max-height: 250px;
          }
          .section-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
}
