import React, { useState } from 'react';
import { PACKAGE_TIER_MATRIX } from '../data/toursData';
import { Layers, CheckCircle2, X, MessageCircle, Sparkles, Shield, ArrowRight } from 'lucide-react';

export default function PackageTierCompareModal({ isOpen, onClose, selectedTour, onOpenQuote }) {
  const [activeTier, setActiveTier] = useState('premium');

  if (!isOpen) return null;

  const { title, subtitle, tiers } = PACKAGE_TIER_MATRIX;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content tier-compare-modal luxury-scale-in" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="tier-modal-header">
          <div className="tier-badge-row">
            <span className="badge badge-amber">
              <Layers size={13} />
              <span>TIER COMPARISON</span>
            </span>
            {selectedTour && (
              <span className="tier-tour-context">
                For: <strong>{selectedTour.name}</strong>
              </span>
            )}
          </div>
          <button className="tier-close-btn" onClick={onClose} aria-label="Close Comparison">
            <X size={20} />
          </button>
        </div>

        <div className="tier-modal-body">
          <div className="tier-body-intro text-center">
            <h2 className="tier-heading font-editorial">{title}</h2>
            <p className="tier-sub">{subtitle}</p>
          </div>

          {/* Side-by-Side Cards Grid */}
          <div className="tier-cards-grid">
            {tiers.map((tier) => {
              const isSelected = activeTier === tier.id;

              return (
                <div 
                  key={tier.id} 
                  className={`tier-card-col glass-card ${tier.isPopular ? 'popular-tier' : ''} ${isSelected ? 'active-highlight' : ''}`}
                  onClick={() => setActiveTier(tier.id)}
                >
                  {tier.isPopular && (
                    <div className="popular-ribbon">
                      <Sparkles size={11} /> MOST POPULAR
                    </div>
                  )}

                  <div className="tier-card-top">
                    <span className="badge" style={{ backgroundColor: `${tier.color}22`, color: tier.color, borderColor: `${tier.color}44` }}>
                      {tier.badge}
                    </span>
                    <h3 className="tier-name font-editorial">{tier.name}</h3>
                    <p className="tier-tagline">"{tier.tagline}"</p>
                  </div>

                  <div className="tier-features-list">
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="tier-feature-item">
                        <div className="tier-feat-name">
                          <CheckCircle2 size={14} color={tier.color} />
                          <span>{feat.name}</span>
                        </div>
                        <div className="tier-feat-val">{feat.value}</div>
                        <div className="tier-feat-note">{feat.note}</div>
                      </div>
                    ))}
                  </div>

                  <div className="tier-card-footer">
                    <button
                      type="button"
                      className={`btn-tier-select ${tier.isPopular ? 'btn-popular' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        const tourName = selectedTour ? selectedTour.name : "Custom Vacation";
                        const msg = `Hi Comfort Journey! I reviewed your package tiers and would like to book "${tourName}" with the "${tier.name}" tier. Please share a tailored proposal!`;
                        window.open(`https://wa.me/918770403315?text=${encodeURIComponent(msg)}`, '_blank');
                      }}
                    >
                      <MessageCircle size={16} />
                      <span>Choose {tier.name}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="tier-custom-note text-center">
            <p>
              <Shield size={14} className="text-emerald" /> 
              <span>Want a hybrid option (e.g. 5★ Palace stay with standard transport)? We customize every detail with zero consultation charges.</span>
            </p>
          </div>
        </div>

        <style>{`
          .tier-compare-modal {
            max-width: 1040px;
            background: #001233;
            border: 1.5px solid rgba(111, 230, 252, 0.3);
            border-radius: 28px;
            overflow: hidden;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8);
          }

          .tier-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem 2rem;
            background: #000E26;
            border-bottom: 1px solid rgba(111, 230, 252, 0.15);
          }

          .tier-badge-row {
            display: flex;
            align-items: center;
            gap: 0.85rem;
          }

          .tier-tour-context {
            font-size: 0.86rem;
            color: #93B2D2;
          }

          .tier-tour-context strong {
            color: #F9FBE7;
          }

          .tier-close-btn {
            background: rgba(255, 255, 255, 0.08);
            border: none;
            color: #F9FBE7;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .tier-close-btn:hover {
            background: #FF892F;
            color: #FFFFFF;
            transform: rotate(90deg);
          }

          .tier-modal-body {
            padding: 2rem;
            max-height: 82vh;
            overflow-y: auto;
          }

          .tier-body-intro {
            margin-bottom: 2rem;
          }

          .tier-heading {
            font-size: 1.8rem;
            color: #F9FBE7;
            margin-bottom: 0.35rem;
          }

          .tier-sub {
            font-size: 0.92rem;
            color: #93B2D2;
            max-width: 620px;
            margin: 0 auto;
          }

          .tier-cards-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.25rem;
            margin-bottom: 1.75rem;
          }

          @media (min-width: 860px) {
            .tier-cards-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          .tier-card-col {
            position: relative;
            background: #001D51;
            border: 1.5px solid rgba(111, 230, 252, 0.22);
            border-radius: 20px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: all 0.25s ease;
            cursor: pointer;
          }

          .tier-card-col:hover {
            border-color: #6FE6FC;
            transform: translateY(-4px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
          }

          .tier-card-col.popular-tier {
            border-color: #6FE6FC;
            background: #002260;
            box-shadow: 0 0 25px rgba(111, 230, 252, 0.2);
          }

          .tier-card-col.active-highlight {
            border-color: #FF892F;
            box-shadow: 0 0 25px rgba(255, 137, 47, 0.3);
          }

          .popular-ribbon {
            position: absolute;
            top: -10px;
            right: 1.5rem;
            background: linear-gradient(135deg, #6FE6FC, #3DD7F3);
            color: #001233;
            font-size: 0.68rem;
            font-weight: 900;
            padding: 0.25rem 0.65rem;
            border-radius: var(--radius-full);
            display: flex;
            align-items: center;
            gap: 0.25rem;
            letter-spacing: 0.05em;
          }

          .tier-card-top {
            margin-bottom: 1.25rem;
          }

          .tier-name {
            font-size: 1.3rem;
            color: #F9FBE7;
            margin-top: 0.6rem;
            margin-bottom: 0.25rem;
          }

          .tier-tagline {
            font-size: 0.8rem;
            color: #DAF561;
            font-style: italic;
          }

          .tier-features-list {
            display: flex;
            flex-direction: column;
            gap: 0.9rem;
            margin-bottom: 1.5rem;
            flex: 1;
          }

          .tier-feature-item {
            padding-bottom: 0.75rem;
            border-bottom: 1px solid rgba(111, 230, 252, 0.1);
          }

          .tier-feat-name {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.76rem;
            color: #93B2D2;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-weight: 700;
            margin-bottom: 0.2rem;
          }

          .tier-feat-val {
            font-size: 0.88rem;
            font-weight: 700;
            color: #F9FBE7;
            margin-bottom: 0.15rem;
          }

          .tier-feat-note {
            font-size: 0.74rem;
            color: #93B2D2;
            line-height: 1.35;
          }

          .btn-tier-select {
            width: 100%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.45rem;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(111, 230, 252, 0.3);
            color: #F9FBE7;
            padding: 0.75rem 1rem;
            border-radius: var(--radius-full);
            font-size: 0.86rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .btn-tier-select:hover {
            background: #FF892F;
            border-color: #FF892F;
            color: #FFFFFF;
          }

          .btn-popular {
            background: #FF892F;
            border-color: #FF892F;
            color: #FFFFFF;
          }

          .btn-popular:hover {
            background: #E66F12;
          }

          .tier-custom-note {
            background: rgba(0, 29, 81, 0.5);
            border: 1px solid rgba(111, 230, 252, 0.18);
            padding: 0.85rem 1.25rem;
            border-radius: var(--radius-lg);
            font-size: 0.82rem;
            color: #93B2D2;
          }

          .tier-custom-note p {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
          }
        `}</style>
      </div>
    </div>
  );
}
