import React, { useState } from 'react';
import { DESTINATION_READINESS_GUIDES } from '../data/toursData';
import { Compass, Sun, ShieldCheck, CreditCard, Mountain, CheckCircle2, X, MessageCircle, ArrowRight } from 'lucide-react';

export default function DestinationReadinessModal({ isOpen, onClose, initialDestination = 'kashmir' }) {
  const [selectedDestKey, setSelectedDestKey] = useState(initialDestination || 'kashmir');

  if (!isOpen) return null;

  const guide = DESTINATION_READINESS_GUIDES[selectedDestKey] || DESTINATION_READINESS_GUIDES['kashmir'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content readiness-modal luxury-scale-in" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="readiness-header">
          <div className="readiness-badge-row">
            <span className="badge badge-amber">
              <Compass size={13} />
              <span>DESTINATION READINESS GUIDE</span>
            </span>
            <span className="readiness-tagline">Bhopal Concierge Advisory</span>
          </div>
          <button className="readiness-close-btn" onClick={onClose} aria-label="Close Readiness Guide">
            <X size={20} />
          </button>
        </div>

        <div className="readiness-body">
          {/* Destination Selector Tabs */}
          <div className="readiness-dest-tabs">
            {Object.keys(DESTINATION_READINESS_GUIDES).map((key) => {
              const item = DESTINATION_READINESS_GUIDES[key];
              const isActive = selectedDestKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  className={`dest-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedDestKey(key)}
                >
                  <span>{item.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          <div className="readiness-content-card glass-card">
            <div className="readiness-title-row">
              <div>
                <h2 className="readiness-dest-name font-editorial">{guide.name}</h2>
                <p className="readiness-dest-sub">Practical guidance, entry regulations & packing essentials curated by our senior trip specialists.</p>
              </div>
            </div>

            <div className="readiness-grid">
              {/* 1. Ideal Season & Climate */}
              <div className="readiness-info-box">
                <div className="info-box-header">
                  <Sun size={16} className="text-amber" />
                  <h4>Ideal Travel Months & Climate</h4>
                </div>
                <p className="info-main-text"><strong>Best Season:</strong> {guide.idealMonths}</p>
                <p className="info-sub-text"><strong>Typical Weather:</strong> {guide.climate}</p>
              </div>

              {/* 2. Visa & Identity Rules */}
              <div className="readiness-info-box">
                <div className="info-box-header">
                  <ShieldCheck size={16} className="text-emerald" />
                  <h4>Visa & Entry Requirements</h4>
                </div>
                <p className="info-main-text">{guide.visaInfo}</p>
              </div>

              {/* 3. Currency, Payments & Local Connectivity */}
              <div className="readiness-info-box">
                <div className="info-box-header">
                  <CreditCard size={16} className="text-aqua" />
                  <h4>Currency & Local Payments</h4>
                </div>
                <p className="info-main-text">{guide.currency}</p>
              </div>

              {/* 4. Terrain, Altitude & Wellness Tips */}
              <div className="readiness-info-box">
                <div className="info-box-header">
                  <Mountain size={16} className="text-gold" />
                  <h4>Altitude, Comfort & Health Advisory</h4>
                </div>
                <p className="info-main-text">{guide.altitudeTips}</p>
              </div>
            </div>

            {/* Packing Checklist Strip */}
            <div className="readiness-packing-strip">
              <h4 className="packing-strip-title">Essential Packing Checklist</h4>
              <div className="packing-tags-row">
                {guide.packingList?.map((item, idx) => (
                  <span key={idx} className="packing-pill">
                    <CheckCircle2 size={13} className="text-emerald" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="readiness-action-bar">
              <div className="action-text">
                <strong>Need custom visa filing or tailored packing guidance?</strong>
                <span>Speak directly with our senior destination manager.</span>
              </div>
              <button
                type="button"
                className="btn-whatsapp"
                onClick={() => {
                  const msg = `Hi Comfort Journey! I was reading the Destination Readiness Guide for "${guide.name}". Could you share more details on upcoming departure dates and visa requirements?`;
                  window.open(`https://wa.me/918770403315?text=${encodeURIComponent(msg)}`, '_blank');
                }}
              >
                <MessageCircle size={16} />
                <span>Ask Trip Manager on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        <style>{`
          .readiness-modal {
            max-width: 900px;
            background: #001233;
            border: 1.5px solid rgba(111, 230, 252, 0.3);
            border-radius: 28px;
            overflow: hidden;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8);
          }

          .readiness-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem 2rem;
            background: #000E26;
            border-bottom: 1px solid rgba(111, 230, 252, 0.15);
          }

          .readiness-badge-row {
            display: flex;
            align-items: center;
            gap: 0.85rem;
          }

          .readiness-tagline {
            font-size: 0.82rem;
            color: #93B2D2;
            font-weight: 600;
          }

          .readiness-close-btn {
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

          .readiness-close-btn:hover {
            background: #FF892F;
            color: #FFFFFF;
            transform: rotate(90deg);
          }

          .readiness-body {
            padding: 1.75rem 2rem;
            max-height: 82vh;
            overflow-y: auto;
          }

          .readiness-dest-tabs {
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
            padding-bottom: 0.75rem;
            margin-bottom: 1.25rem;
            scrollbar-width: thin;
          }

          .dest-tab-btn {
            background: rgba(0, 29, 81, 0.6);
            border: 1px solid rgba(111, 230, 252, 0.2);
            color: #93B2D2;
            padding: 0.45rem 1rem;
            border-radius: var(--radius-full);
            font-size: 0.82rem;
            font-weight: 700;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s ease;
          }

          .dest-tab-btn:hover {
            border-color: #6FE6FC;
            color: #F9FBE7;
          }

          .dest-tab-btn.active {
            background: #FF892F;
            border-color: #FF892F;
            color: #FFFFFF;
            box-shadow: 0 4px 15px rgba(255, 137, 47, 0.35);
          }

          .readiness-content-card {
            background: #001D51;
            border: 1.5px solid rgba(111, 230, 252, 0.25);
            border-radius: 22px;
            padding: 1.5rem;
          }

          .readiness-title-row {
            margin-bottom: 1.25rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(111, 230, 252, 0.15);
          }

          .readiness-dest-name {
            font-size: 1.6rem;
            color: #F9FBE7;
            margin-bottom: 0.25rem;
          }

          .readiness-dest-sub {
            font-size: 0.86rem;
            color: #93B2D2;
          }

          .readiness-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          @media (min-width: 640px) {
            .readiness-grid {
              grid-template-columns: 1fr 1fr;
            }
          }

          .readiness-info-box {
            background: rgba(0, 18, 51, 0.7);
            border: 1px solid rgba(111, 230, 252, 0.18);
            border-radius: 16px;
            padding: 1.15rem;
          }

          .info-box-header {
            display: flex;
            align-items: center;
            gap: 0.45rem;
            margin-bottom: 0.6rem;
          }

          .info-box-header h4 {
            font-size: 0.88rem;
            color: #F9FBE7;
            font-weight: 700;
          }

          .info-main-text {
            font-size: 0.82rem;
            color: #EDF3D2;
            line-height: 1.45;
            margin-bottom: 0.35rem;
          }

          .info-sub-text {
            font-size: 0.78rem;
            color: #93B2D2;
          }

          .readiness-packing-strip {
            background: rgba(0, 18, 51, 0.8);
            border: 1px solid rgba(218, 245, 97, 0.25);
            border-radius: 16px;
            padding: 1.15rem;
            margin-bottom: 1.5rem;
          }

          .packing-strip-title {
            font-size: 0.84rem;
            color: #DAF561;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.75rem;
          }

          .packing-tags-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .packing-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            background: rgba(0, 29, 81, 0.8);
            border: 1px solid rgba(111, 230, 252, 0.25);
            color: #F9FBE7;
            padding: 0.35rem 0.75rem;
            border-radius: var(--radius-full);
            font-size: 0.78rem;
          }

          .readiness-action-bar {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(111, 230, 252, 0.15);
          }

          .action-text strong {
            display: block;
            color: #F9FBE7;
            font-size: 0.88rem;
          }

          .action-text span {
            color: #93B2D2;
            font-size: 0.78rem;
          }
        `}</style>
      </div>
    </div>
  );
}
