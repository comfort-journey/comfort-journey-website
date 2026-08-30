import React, { useState } from 'react';
import { 
  Sun, Snowflake, CloudRain, Leaf, Flower2, Sparkles, 
  MapPin, Clock, ArrowRight, ShieldCheck, CheckCircle2, MessageCircle
} from 'lucide-react';
import { SEASONS_DATA } from '../data/continentHierarchyData';
import { TOURS_DATA } from '../data/toursData';
import { useCurrency } from '../context/CurrencyContext';

export default function SeasonalVacationsSection({ onSelectItinerary, onBookNow }) {
  const { formatPrice } = useCurrency();
  const [selectedSeasonId, setSelectedSeasonId] = useState('summer');

  const activeSeason = SEASONS_DATA.find(s => s.id === selectedSeasonId) || SEASONS_DATA[1];

  // Match packages based on season keywords
  const getSeasonalTours = () => {
    switch (selectedSeasonId) {
      case 'summer':
        return TOURS_DATA.filter(t => 
          t.id.includes('swiss') || t.id.includes('bali') || t.id.includes('amalfi') || t.id.includes('ladakh') || t.id.includes('andaman')
        );
      case 'winter':
        return TOURS_DATA.filter(t => 
          t.id.includes('kashmir') || t.id.includes('iceland') || t.id.includes('dubai') || t.id.includes('rajasthan') || t.id.includes('maldives')
        );
      case 'monsoon':
        return TOURS_DATA.filter(t => 
          t.id.includes('kerala') || t.id.includes('andaman') || t.id.includes('bali') || t.vibeTags?.includes('Serene Backwaters')
        );
      case 'autumn':
        return TOURS_DATA.filter(t => 
          t.id.includes('rajasthan') || t.id.includes('char-dham') || t.id.includes('dubai') || t.id.includes('kashmir')
        );
      case 'spring':
        return TOURS_DATA.filter(t => 
          t.id.includes('kashmir') || t.id.includes('swiss') || t.id.includes('andaman') || t.id.includes('dubai')
        );
      default:
        return TOURS_DATA.slice(0, 6);
    }
  };

  const matchedTours = getSeasonalTours();

  return (
    <section id="seasonal-vacations-section" className="seasonal-vacations-root">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="badge badge-emerald mb-3 inline-flex">
            <Sun size={14} />
            <span>CLIMATE & SEASONS • FOUR-SEASON VACATION CURATOR</span>
          </div>

          <h2 className="seasonal-title font-editorial illuminate-text">
            Plan Your Vacation <br />
            <span className="gradient-text-gold">By Perfect Weather & Best Season</span>
          </h2>

          <p className="seasonal-desc">
            Whether you are dreaming of crisp winter snow peaks, summer island waters, or misty monsoon ayurvedic retreats, discover destinations tailored to the season.
          </p>
        </div>

        {/* 5 SEASONS INTERACTIVE SELECTOR STRIP */}
        <div className="seasons-nav-cards">
          {SEASONS_DATA.filter(s => s.id !== 'all').map((season) => {
            const isSelected = selectedSeasonId === season.id;

            return (
              <button
                key={season.id}
                type="button"
                className={`season-hero-btn ${isSelected ? 'active-season' : ''}`}
                onClick={() => setSelectedSeasonId(season.id)}
              >
                <span className="season-icon-large">{season.icon}</span>
                <div className="season-meta">
                  <strong className="season-name">{season.label.split('(')[0]}</strong>
                  <span className="season-months">({season.label.split('(')[1]}</span>
                  {season.temp && <span className="season-temp-badge">{season.temp}</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE SEASON SPOTLIGHT BANNER */}
        <div className="season-spotlight-box glass-card">
          <div className="spotlight-left">
            <div className="badge badge-amber mb-2 inline-flex">
              <span>{activeSeason.icon} CURRENTLY CURATING: {activeSeason.label}</span>
            </div>
            <h3 className="spotlight-desc font-editorial">{activeSeason.desc}</h3>
            
            {activeSeason.topDestinations && (
              <div className="spotlight-dest-row">
                <span className="spotlight-label">⭐ Recommended In This Season:</span>
                <div className="spotlight-tags">
                  {activeSeason.topDestinations.map((dest, i) => (
                    <span key={i} className="s-dest-chip">📍 {dest}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="spotlight-right">
            <a 
              href={`https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I%20want%20to%20plan%20a%20vacation%20for%20${encodeURIComponent(activeSeason.label)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle size={18} />
              <span>Inquire for {activeSeason.label.split('(')[0]}</span>
            </a>
          </div>
        </div>

        {/* SEASONAL MATCHED TOURS GRID */}
        <div className="seasonal-packages-grid">
          {matchedTours.map((tour) => (
            <div key={tour.id} className="seasonal-tour-card glass-card">
              <div className="s-img-wrapper">
                <img src={tour.image} alt={tour.name} className="s-tour-img" loading="lazy" />
                <span className="s-badge-float">{tour.badge}</span>
                <span className="s-duration-float">⏱️ {tour.duration}</span>
              </div>

              <div className="s-body-wrapper">
                <div className="s-country-row">
                  <span className="s-country-label">📍 {tour.country}</span>
                  <span className="s-rating">⭐ {tour.rating} ({tour.reviews})</span>
                </div>

                <h4 className="s-tour-title font-editorial">{tour.name}</h4>
                <p className="s-tour-tagline">{tour.tagline}</p>

                <div className="s-pricing-action-row">
                  <div>
                    <span className="s-price-prefix">From</span>
                    <strong className="s-price-gold font-editorial">{formatPrice(tour.price)}</strong>
                  </div>

                  <div className="s-btns-group">
                    <button
                      type="button"
                      className="btn-secondary-glass"
                      onClick={() => onSelectItinerary(tour)}
                    >
                      <span>Itinerary</span>
                      <ArrowRight size={13} />
                    </button>

                    <button
                      type="button"
                      className="btn-primary-mini"
                      onClick={() => onBookNow(tour)}
                    >
                      <span>Book</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STYLES FOR SEASONAL VACATIONS SECTION */}
      <style>{`
        .seasonal-vacations-root {
          padding: 5rem 0;
          background: linear-gradient(180deg, rgba(0, 18, 51, 0.6) 0%, rgba(0, 29, 81, 0.5) 100%);
          position: relative;
        }

        .seasonal-title {
          font-size: 2.85rem;
          color: #FFFFFF;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }

        .seasonal-desc {
          font-size: 1.05rem;
          color: #94A3B8;
          line-height: 1.6;
        }

        /* 5 Seasons Selector */
        .seasons-nav-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .season-hero-btn {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 1.15rem 1.25rem;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.04);
          border: 1.5px solid rgba(255, 255, 255, 0.08);
          color: #E2E8F0;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
        }

        .season-hero-btn:hover {
          background: rgba(111, 230, 252, 0.1);
          border-color: rgba(111, 230, 252, 0.4);
          transform: translateY(-3px);
        }

        .season-hero-btn.active-season {
          background: rgba(255, 137, 47, 0.2);
          border-color: #FF892F;
          box-shadow: 0 0 25px rgba(255, 137, 47, 0.35);
          transform: translateY(-3px);
        }

        .season-icon-large {
          font-size: 2.2rem;
        }

        .season-meta {
          display: flex;
          flex-direction: column;
        }

        .season-name {
          font-size: 1rem;
          color: #FFFFFF;
        }

        .season-months {
          font-size: 0.72rem;
          color: #94A3B8;
          margin-bottom: 0.25rem;
        }

        .season-temp-badge {
          font-size: 0.7rem;
          font-weight: 800;
          color: #6FE6FC;
        }

        /* Spotlight Banner */
        .season-spotlight-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2.25rem;
          border-radius: 24px;
          background: rgba(0, 29, 81, 0.75);
          border: 1px solid rgba(255, 137, 47, 0.35);
          margin-bottom: 2.5rem;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .spotlight-desc {
          font-size: 1.5rem;
          color: #FFFFFF;
          margin: 0.4rem 0 1rem 0;
        }

        .spotlight-dest-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .spotlight-label {
          font-size: 0.85rem;
          color: #CBD5E1;
          font-weight: 700;
        }

        .spotlight-tags {
          display: flex;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .s-dest-chip {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #F9FBE7;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
        }

        /* Seasonal Packages Grid */
        .seasonal-packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .seasonal-tour-card {
          border-radius: 22px;
          overflow: hidden;
          background: rgba(0, 18, 51, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .seasonal-tour-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 137, 47, 0.4);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
        }

        .s-img-wrapper {
          position: relative;
          height: 200px;
        }

        .s-tour-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .s-badge-float {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(255, 137, 47, 0.9);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
        }

        .s-duration-float {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: rgba(0, 18, 51, 0.85);
          backdrop-filter: blur(8px);
          color: #6FE6FC;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
        }

        .s-body-wrapper {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          gap: 0.75rem;
        }

        .s-country-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78rem;
          color: #94A3B8;
        }

        .s-tour-title {
          font-size: 1.2rem;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.35;
        }

        .s-tour-tagline {
          font-size: 0.82rem;
          color: #94A3B8;
          line-height: 1.5;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .s-pricing-action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .s-price-prefix {
          display: block;
          font-size: 0.68rem;
          color: #94A3B8;
        }

        .s-price-gold {
          font-size: 1.35rem;
          color: #FF892F;
        }

        .s-btns-group {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .btn-primary-mini {
          padding: 0.45rem 0.95rem;
          border-radius: 9999px;
          background: #FF892F;
          color: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 800;
          border: none;
          cursor: pointer;
        }

        .btn-primary-mini:hover {
          background: #E65100;
        }

        @media (max-width: 768px) {
          .seasonal-title {
            font-size: 2.2rem;
          }
          .season-spotlight-box {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
