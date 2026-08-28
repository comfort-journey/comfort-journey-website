import React, { useState } from 'react';
import { PACKAGE_TIER_MATRIX } from '../data/toursData';
import { Layers, CheckCircle2, MessageCircle, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { useParticleBurst } from '../hooks/useParticleBurst';

export default function PackageTiersSection({ onOpenQuote }) {
  const { triggerBurst } = useParticleBurst();
  const [activeTier, setActiveTier] = useState('premium');

  const { title, subtitle, tiers } = PACKAGE_TIER_MATRIX;

  return (
    <section id="package-tiers" className="tiers-section-root">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="badge badge-amber">
            <Layers size={14} />
            <span>TRANSPARENT LUXURY STANDARDS</span>
          </div>
          <h2 className="section-title font-editorial">
            Tailor-Made <span className="gradient-text-gold">Package Tiers Explained</span>
          </h2>
          <p className="section-subtitle">
            Every traveler has a distinct standard of comfort. Compare our three signature tiers side-by-side with complete price and inclusion transparency.
          </p>
        </div>

        {/* 3-Tier Grid */}
        <div className="tiers-grid-layout">
          {tiers.map((tier) => {
            const isSelected = activeTier === tier.id;

            return (
              <div 
                key={tier.id} 
                className={`tier-showcase-card glass-card ${tier.isPopular ? 'popular-tier-card' : ''} ${isSelected ? 'active-tier-glow' : ''}`}
                onClick={() => setActiveTier(tier.id)}
              >
                {tier.isPopular && (
                  <div className="popular-top-badge">
                    <Sparkles size={12} /> MOST POPULAR
                  </div>
                )}

                <div className="tier-card-head">
                  <span className="badge" style={{ backgroundColor: `${tier.color}22`, color: tier.color, borderColor: `${tier.color}44` }}>
                    {tier.badge}
                  </span>
                  <h3 className="tier-card-title font-editorial">{tier.name}</h3>
                  <p className="tier-card-tagline">"{tier.tagline}"</p>
                </div>

                <div className="tier-items-list">
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="tier-item-row">
                      <div className="tier-item-title">
                        <CheckCircle2 size={15} color={tier.color} />
                        <span>{feat.name}</span>
                      </div>
                      <div className="tier-item-value">{feat.value}</div>
                      <div className="tier-item-note">{feat.note}</div>
                    </div>
                  ))}
                </div>

                <div className="tier-card-action">
                  <button
                    type="button"
                    className={`btn-tier-cta ${tier.isPopular ? 'popular-cta' : ''}`}
                    onClick={(e) => {
                      triggerBurst(e, { count: 20 });
                      const msg = `Hi Comfort Journey! I reviewed your package tiers on your website and would like to customize a tour in the "${tier.name}" tier. Please share a tailored plan!`;
                      window.open(`https://wa.me/918770403315?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                  >
                    <MessageCircle size={16} />
                    <span>Inquire {tier.name}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="tiers-custom-banner glass-card text-center">
          <Shield size={18} className="text-emerald" />
          <p>
            <strong>Looking for a hybrid plan?</strong> (e.g. 5★ Heritage Palace stay with Standard Transport, or Helicopter Joyrides on select days). Our senior trip curators in Bhopal will customize every single day with <strong>zero consultation fees</strong>.
          </p>
        </div>
      </div>

      <style>{`
        .tiers-section-root {
          padding: 4.5rem 0 3.5rem 0;
          background: #001233;
          position: relative;
        }

        .tiers-grid-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }

        @media (min-width: 860px) {
          .tiers-grid-layout {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .tier-showcase-card {
          position: relative;
          background: #001D51;
          border: 1.5px solid rgba(111, 230, 252, 0.25);
          border-radius: 26px;
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .tier-showcase-card:hover {
          border-color: #6FE6FC;
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
        }

        .tier-showcase-card.popular-tier-card {
          border-color: #6FE6FC;
          background: #002260;
          box-shadow: 0 0 30px rgba(111, 230, 252, 0.25);
        }

        .tier-showcase-card.active-tier-glow {
          border-color: #FF892F;
          box-shadow: 0 0 30px rgba(255, 137, 47, 0.35);
        }

        .popular-top-badge {
          position: absolute;
          top: -12px;
          right: 2rem;
          background: linear-gradient(135deg, #6FE6FC, #3DD7F3);
          color: #001233;
          font-size: 0.72rem;
          font-weight: 900;
          padding: 0.3rem 0.85rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.3rem;
          letter-spacing: 0.06em;
        }

        .tier-card-head {
          margin-bottom: 1.5rem;
        }

        .tier-card-title {
          font-size: 1.45rem;
          color: #F9FBE7;
          margin-top: 0.65rem;
          margin-bottom: 0.25rem;
        }

        .tier-card-tagline {
          font-size: 0.84rem;
          color: #DAF561;
          font-style: italic;
        }

        .tier-items-list {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          margin-bottom: 1.75rem;
          flex: 1;
        }

        .tier-item-row {
          padding-bottom: 0.85rem;
          border-bottom: 1px solid rgba(111, 230, 252, 0.12);
        }

        .tier-item-title {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.78rem;
          color: #93B2D2;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .tier-item-value {
          font-size: 0.95rem;
          font-weight: 700;
          color: #F9FBE7;
          margin-bottom: 0.15rem;
        }

        .tier-item-note {
          font-size: 0.78rem;
          color: #93B2D2;
          line-height: 1.4;
        }

        .btn-tier-cta {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(111, 230, 252, 0.3);
          color: #F9FBE7;
          padding: 0.85rem 1.25rem;
          border-radius: var(--radius-full);
          font-size: 0.92rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-tier-cta:hover {
          background: #FF892F;
          border-color: #FF892F;
          color: #FFFFFF;
          box-shadow: 0 4px 15px rgba(255, 137, 47, 0.4);
        }

        .popular-cta {
          background: #FF892F;
          border-color: #FF892F;
          color: #FFFFFF;
        }

        .popular-cta:hover {
          background: #E66F12;
        }

        .tiers-custom-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background: rgba(0, 29, 81, 0.6);
          border: 1.5px solid rgba(111, 230, 252, 0.2);
          border-radius: 20px;
          padding: 1.25rem 2rem;
          font-size: 0.88rem;
          color: #93B2D2;
          line-height: 1.5;
        }

        .tiers-custom-banner strong {
          color: #F9FBE7;
        }
      `}</style>
    </section>
  );
}
