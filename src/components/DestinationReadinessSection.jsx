import React, { useState } from 'react';
import { DESTINATION_READINESS_GUIDES } from '../data/toursData';
import { ShieldCheck, Sun, CreditCard, Mountain, CheckCircle2, MessageCircle, MapPin, Sparkles } from 'lucide-react';
import { useParticleBurst } from '../hooks/useParticleBurst';

export default function DestinationReadinessSection({ onOpenQuote }) {
  const { triggerBurst } = useParticleBurst();
  const [activeDestKey, setActiveDestKey] = useState('kashmir');

  const guide = DESTINATION_READINESS_GUIDES[activeDestKey] || DESTINATION_READINESS_GUIDES['kashmir'];

  return (
    <section id="destination-readiness" className="readiness-section-root">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="badge badge-emerald">
            <ShieldCheck size={14} />
            <span>PRACTICAL TRAVEL INTELLIGENCE</span>
          </div>
          <h2 className="section-title font-editorial">
            Destination <span className="gradient-text-gold">Readiness & Advisory Guides</span>
          </h2>
          <p className="section-subtitle">
            Essential pre-departure clarity: Ideal seasons, visa protocols, weather forecasts, currency tips, and packing essentials curated by our senior trip specialists.
          </p>
        </div>

        {/* Destination Tabs */}
        <div className="readiness-tabs-strip">
          {Object.keys(DESTINATION_READINESS_GUIDES).map((key) => {
            const item = DESTINATION_READINESS_GUIDES[key];
            const isActive = activeDestKey === key;

            return (
              <button
                key={key}
                type="button"
                className={`readiness-tab-item ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  triggerBurst(e, { count: 12 });
                  setActiveDestKey(key);
                }}
              >
                <MapPin size={14} className={isActive ? 'text-white' : 'text-amber'} />
                <span>{item.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Readiness Dashboard Card */}
        <div className="readiness-dashboard-card glass-panel">
          <div className="readiness-dest-head">
            <div>
              <h3 className="dashboard-title font-editorial">{guide.name}</h3>
              <p className="dashboard-sub">Official advisory standards and verified logistics for your vacation.</p>
            </div>
            <span className="badge badge-amber">Updated 2026</span>
          </div>

          <div className="readiness-quad-grid">
            {/* 1. Best Season & Climate */}
            <div className="quad-card glass-card">
              <div className="quad-head">
                <Sun size={18} className="text-amber" />
                <h4>Ideal Travel Months & Climate</h4>
              </div>
              <p className="quad-body"><strong>Best Season:</strong> {guide.idealMonths}</p>
              <p className="quad-note"><strong>Typical Weather:</strong> {guide.climate}</p>
            </div>

            {/* 2. Visa & Passport Entry */}
            <div className="quad-card glass-card">
              <div className="quad-head">
                <ShieldCheck size={18} className="text-emerald" />
                <h4>Visa & Identification Rules</h4>
              </div>
              <p className="quad-body">{guide.visaInfo}</p>
            </div>

            {/* 3. Currency & Local Payments */}
            <div className="quad-card glass-card">
              <div className="quad-head">
                <CreditCard size={18} className="text-aqua" />
                <h4>Currency & Local Payments</h4>
              </div>
              <p className="quad-body">{guide.currency}</p>
            </div>

            {/* 4. Terrain & Altitude Tips */}
            <div className="quad-card glass-card">
              <div className="quad-head">
                <Mountain size={18} className="text-gold" />
                <h4>Altitude, Comfort & Health Advisory</h4>
              </div>
              <p className="quad-body">{guide.altitudeTips}</p>
            </div>
          </div>

          {/* Packing Checklist Box */}
          <div className="readiness-packing-box">
            <h4 className="packing-title">🎒 Recommended Packing Essentials:</h4>
            <div className="packing-pills-row">
              {guide.packingList?.map((item, idx) => (
                <div key={idx} className="pack-pill">
                  <CheckCircle2 size={14} className="text-emerald" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="readiness-cta-strip">
            <div className="cta-meta">
              <strong>Need personal visa filing assistance or bespoke packing guidance for {guide.name.split(' ')[0]}?</strong>
              <span>Our Bhopal desk coordinates flights, fast-track visas, and personalized travel itineraries with zero hidden fees.</span>
            </div>

            <button
              type="button"
              className="btn-whatsapp"
              onClick={() => {
                const msg = `Hi Comfort Journey! I was reading the Destination Readiness Guide for "${guide.name}". Please share package options and upcoming departure dates!`;
                window.open(`https://wa.me/918770403315?text=${encodeURIComponent(msg)}`, '_blank');
              }}
            >
              <MessageCircle size={17} />
              <span>Ask Trip Manager on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .readiness-section-root {
          padding: 4.5rem 0 3.5rem 0;
          background: linear-gradient(180deg, #001233 0%, #001A40 50%, #001233 100%);
          position: relative;
        }

        .readiness-tabs-strip {
          display: flex;
          gap: 0.65rem;
          overflow-x: auto;
          padding-bottom: 0.85rem;
          margin-top: 1.75rem;
          margin-bottom: 1.5rem;
          justify-content: flex-start;
          scrollbar-width: thin;
        }

        @media (min-width: 768px) {
          .readiness-tabs-strip {
            justify-content: center;
          }
        }

        .readiness-tab-item {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(0, 29, 81, 0.7);
          border: 1.5px solid rgba(111, 230, 252, 0.22);
          color: #93B2D2;
          padding: 0.55rem 1.25rem;
          border-radius: var(--radius-full);
          font-size: 0.86rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .readiness-tab-item:hover {
          border-color: #6FE6FC;
          color: #F9FBE7;
          transform: translateY(-2px);
        }

        .readiness-tab-item.active {
          background: #FF892F;
          border-color: #FF892F;
          color: #FFFFFF;
          box-shadow: 0 4px 18px rgba(255, 137, 47, 0.4);
        }

        .readiness-dashboard-card {
          background: #001D51;
          border: 1.5px solid rgba(111, 230, 252, 0.28);
          border-radius: 30px;
          padding: 2.25rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
        }

        .readiness-dest-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.75rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(111, 230, 252, 0.15);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .dashboard-title {
          font-size: 1.85rem;
          color: #F9FBE7;
          margin-bottom: 0.25rem;
        }

        .dashboard-sub {
          font-size: 0.9rem;
          color: #93B2D2;
        }

        .readiness-quad-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          margin-bottom: 1.75rem;
        }

        @media (min-width: 768px) {
          .readiness-quad-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .quad-card {
          background: rgba(0, 18, 51, 0.75);
          border: 1px solid rgba(111, 230, 252, 0.2);
          border-radius: 20px;
          padding: 1.4rem;
        }

        .quad-head {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .quad-head h4 {
          font-size: 0.98rem;
          font-weight: 700;
          color: #F9FBE7;
        }

        .quad-body {
          font-size: 0.88rem;
          color: #EDF3D2;
          line-height: 1.5;
          margin-bottom: 0.35rem;
        }

        .quad-note {
          font-size: 0.82rem;
          color: #93B2D2;
        }

        .readiness-packing-box {
          background: rgba(0, 18, 51, 0.85);
          border: 1px solid rgba(218, 245, 97, 0.3);
          border-radius: 20px;
          padding: 1.35rem;
          margin-bottom: 1.75rem;
        }

        .packing-title {
          font-size: 0.9rem;
          color: #DAF561;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.85rem;
        }

        .packing-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
        }

        .pack-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(0, 29, 81, 0.8);
          border: 1px solid rgba(111, 230, 252, 0.25);
          color: #F9FBE7;
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
        }

        .readiness-cta-strip {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(111, 230, 252, 0.15);
        }

        .cta-meta strong {
          display: block;
          font-size: 0.95rem;
          color: #F9FBE7;
          margin-bottom: 0.2rem;
        }

        .cta-meta span {
          font-size: 0.84rem;
          color: #93B2D2;
        }
      `}</style>
    </section>
  );
}
