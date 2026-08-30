import React, { useState } from 'react';
import { 
  Users, Heart, Compass, Building2, CheckCircle2, 
  Sparkles, ArrowRight, ShieldCheck, MessageCircle, ExternalLink
} from 'lucide-react';
import { TRAVELER_STYLES_DATA } from '../data/continentHierarchyData';
import { TOURS_DATA } from '../data/toursData';
import { useCurrency } from '../context/CurrencyContext';

export default function TravelerStylesSection({ onSelectItinerary, onBookNow, onOpenAIPlanner }) {
  const { formatPrice } = useCurrency();
  const [selectedStyleId, setSelectedStyleId] = useState('couple');

  const activeStyle = TRAVELER_STYLES_DATA.find(s => s.id === selectedStyleId) || TRAVELER_STYLES_DATA[0];

  const getStyleTours = () => {
    switch (selectedStyleId) {
      case 'couple':
        return TOURS_DATA.filter(t => 
          t.category?.includes('Honeymoon') || t.id.includes('kashmir') || t.id.includes('bali') || t.id.includes('amalfi')
        );
      case 'family':
        return TOURS_DATA.filter(t => 
          t.category?.includes('Family') || t.id.includes('andaman') || t.id.includes('char-dham') || t.id.includes('dubai')
        );
      case 'solo':
        return TOURS_DATA.filter(t => 
          t.category?.includes('Adventure') || t.id.includes('iceland') || t.id.includes('kashmir') || t.id.includes('rajasthan')
        );
      case 'group':
        return TOURS_DATA.filter(t => 
          t.id.includes('rajasthan') || t.id.includes('char-dham') || t.id.includes('dubai') || t.durationDays >= 7
        );
      default:
        return TOURS_DATA.slice(0, 4);
    }
  };

  const matchedStyleTours = getStyleTours();

  return (
    <section id="traveler-styles-section" className="traveler-styles-root">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="badge badge-purple mb-3 inline-flex">
            <Users size={14} />
            <span>TRAVELER PROFILES • CURATED BY TRAVEL STYLE</span>
          </div>

          <h2 className="styles-title font-editorial illuminate-text">
            Crafted for <span className="gradient-text-gold">Your Travel Style</span>
          </h2>

          <p className="styles-desc">
            Solo expeditions, romantic honeymoons, family holidays, or large corporate retreats — we customize every itinerary to match your party's exact rhythm.
          </p>
        </div>

        {/* 4 TRAVELER PROFILES SELECTOR CARDS */}
        <div className="traveler-profiles-deck">
          {TRAVELER_STYLES_DATA.map((style) => {
            const isSelected = selectedStyleId === style.id;

            return (
              <button
                key={style.id}
                type="button"
                className={`profile-selector-card ${isSelected ? 'active-profile' : ''}`}
                onClick={() => setSelectedStyleId(style.id)}
              >
                <span className="profile-icon">{style.icon}</span>
                <div className="profile-text-lockup">
                  <strong className="profile-label">{style.label}</strong>
                  <span className="profile-sub">{style.perks.length} Tailored Perks</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE STYLE HIGHLIGHT BANNER */}
        <div className="style-highlight-banner glass-card">
          <div className="st-banner-left">
            <div className="badge badge-amber mb-2 inline-flex">
              <span>{activeStyle.icon} SPECIALIZED VIP TRAVEL TIER</span>
            </div>
            <h3 className="st-banner-heading font-editorial">{activeStyle.tagline}</h3>

            <div className="st-perks-list-grid">
              {activeStyle.perks.map((perk, idx) => (
                <div key={idx} className="st-perk-item">
                  <CheckCircle2 size={16} className="text-emerald" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="st-banner-right">
            <a 
              href={`https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I'm%20planning%20a%20${encodeURIComponent(activeStyle.label)}%20trip.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full text-center"
            >
              <MessageCircle size={18} />
              <span>Talk to {activeStyle.label} Specialist</span>
            </a>
          </div>
        </div>

        {/* MATCHED TOURS FOR THIS STYLE */}
        <div className="style-tours-grid">
          {matchedStyleTours.map((tour) => (
            <div key={tour.id} className="style-tour-card glass-card">
              <div className="st-card-media">
                <img src={tour.image} alt={tour.name} className="st-card-img" loading="lazy" />
                <span className="st-card-badge">{tour.badge}</span>
              </div>

              <div className="st-card-content">
                <div className="st-meta-row">
                  <span className="st-location">📍 {tour.country}</span>
                  <span className="st-days">⏱️ {tour.duration}</span>
                </div>

                <h4 className="st-tour-title font-editorial">{tour.name}</h4>
                <p className="st-tour-tagline">{tour.tagline}</p>

                <div className="st-footer-row">
                  <div>
                    <span className="st-price-lbl">From</span>
                    <strong className="st-price-val font-editorial">{formatPrice(tour.price)}</strong>
                  </div>

                  <div className="st-btn-group">
                    <button
                      type="button"
                      className="btn-secondary-glass"
                      onClick={() => onSelectItinerary(tour)}
                    >
                      <span>Itinerary</span>
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

      {/* STYLES FOR TRAVELER STYLES SECTION */}
      <style>{`
        .traveler-styles-root {
          padding: 5rem 0;
          background: linear-gradient(180deg, rgba(0, 29, 81, 0.5) 0%, rgba(7, 11, 20, 0.95) 100%);
          position: relative;
        }

        .styles-title {
          font-size: 2.85rem;
          color: #FFFFFF;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }

        .styles-desc {
          font-size: 1.05rem;
          color: #94A3B8;
          line-height: 1.6;
        }

        /* 4 Profile Cards */
        .traveler-profiles-deck {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .profile-selector-card {
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

        .profile-selector-card:hover {
          background: rgba(111, 230, 252, 0.1);
          border-color: rgba(111, 230, 252, 0.4);
          transform: translateY(-3px);
        }

        .profile-selector-card.active-profile {
          background: rgba(255, 137, 47, 0.2);
          border-color: #FF892F;
          box-shadow: 0 0 25px rgba(255, 137, 47, 0.35);
          transform: translateY(-3px);
        }

        .profile-icon {
          font-size: 2rem;
        }

        .profile-text-lockup {
          display: flex;
          flex-direction: column;
        }

        .profile-label {
          font-size: 1rem;
          color: #FFFFFF;
        }

        .profile-sub {
          font-size: 0.72rem;
          color: #94A3B8;
        }

        /* Highlight Banner */
        .style-highlight-banner {
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

        .st-banner-heading {
          font-size: 1.45rem;
          color: #FFFFFF;
          margin: 0.4rem 0 1rem 0;
        }

        .st-perks-list-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.75rem;
        }

        .st-perk-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          color: #CBD5E1;
        }

        /* Style Tours Grid */
        .style-tours-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .style-tour-card {
          border-radius: 22px;
          overflow: hidden;
          background: rgba(0, 18, 51, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .style-tour-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 137, 47, 0.4);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
        }

        .st-card-media {
          position: relative;
          height: 190px;
        }

        .st-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .st-card-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(255, 137, 47, 0.9);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
        }

        .st-card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          gap: 0.75rem;
        }

        .st-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.76rem;
          color: #94A3B8;
        }

        .st-tour-title {
          font-size: 1.15rem;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.35;
        }

        .st-tour-tagline {
          font-size: 0.8rem;
          color: #94A3B8;
          line-height: 1.5;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .st-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .st-price-lbl {
          display: block;
          font-size: 0.68rem;
          color: #94A3B8;
        }

        .st-price-val {
          font-size: 1.25rem;
          color: #FF892F;
        }

        .st-btn-group {
          display: flex;
          align-items: center;
          gap: 0.4rem;
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
          .styles-title {
            font-size: 2.2rem;
          }
          .style-highlight-banner {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
