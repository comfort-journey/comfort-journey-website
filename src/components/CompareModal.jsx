import React from 'react';
import { X, Scale, Check, Trash2, MessageCircle, ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlistCompare } from '../context/WishlistCompareContext';

export default function CompareModal({ onBookTour, onSelectItinerary }) {
  const { formatPrice } = useCurrency();
  const { compareList, toggleCompare, clearCompare, isCompareOpen, setIsCompareOpen } = useWishlistCompare();

  if (!isCompareOpen || compareList.length === 0) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsCompareOpen(false)}>
      <div className="modal-content compare-modal-body" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="compare-header">
          <div className="compare-title-block">
            <div className="badge badge-emerald">
              <Scale size={14} />
              <span>Side-by-Side Comparison</span>
            </div>
            <h2 className="compare-heading">Compare Tour Packages ({compareList.length}/3)</h2>
          </div>

          <div className="header-actions">
            <button className="clear-btn" onClick={clearCompare}>
              <Trash2 size={15} />
              <span>Clear All</span>
            </button>
            <button className="close-btn" onClick={() => setIsCompareOpen(false)}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Comparison Table / Cards Grid */}
        <div className="compare-grid-wrapper">
          <div className={`compare-columns-grid cols-${compareList.length}`}>
            {compareList.map((tour) => (
              <div key={tour.id} className="compare-card glass-card">
                <button
                  className="remove-card-btn"
                  onClick={() => toggleCompare(tour)}
                  title="Remove from comparison"
                >
                  <X size={14} />
                </button>

                <img src={tour.image} alt={tour.name} className="compare-img" />

                <div className="compare-card-body">
                  <span className="badge badge-amber">{tour.category}</span>
                  <h4 className="card-tour-title">{tour.name}</h4>
                  <p className="card-dest"><MapPin size={13} className="text-amber" /> {tour.country} ({tour.region})</p>

                  <div className="compare-spec-row">
                    <span className="spec-label">Starting Price</span>
                    <strong className="spec-val text-gold">{formatPrice(tour.price)}</strong>
                  </div>

                  <div className="compare-spec-row">
                    <span className="spec-label">Duration</span>
                    <span className="spec-val"><Clock size={13} /> {tour.duration}</span>
                  </div>

                  <div className="compare-spec-row">
                    <span className="spec-label">Rating</span>
                    <span className="spec-val"><Star size={13} className="star-fill" /> {tour.rating} ({tour.reviews})</span>
                  </div>

                  <div className="compare-spec-row">
                    <span className="spec-label">Difficulty</span>
                    <span className="spec-val">{tour.difficulty || 'Easy'}</span>
                  </div>

                  <div className="compare-spec-row">
                    <span className="spec-label">Best Season</span>
                    <span className="spec-val">{tour.bestSeason || 'All Year'}</span>
                  </div>

                  {/* Highlights */}
                  <div className="spec-block">
                    <span className="spec-block-title">Top Highlights</span>
                    <ul className="spec-list">
                      {tour.highlights?.slice(0, 3).map((h, i) => (
                        <li key={i}>• {h}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Inclusions */}
                  <div className="spec-block">
                    <span className="spec-block-title">Inclusions</span>
                    <div className="inc-chips-wrap">
                      {tour.inclusionChips?.map((inc, i) => (
                        <span key={i} className="inc-chip-mini">
                          <Check size={11} className="text-emerald" /> {inc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="compare-actions-row">
                    <button
                      className="btn-secondary w-full"
                      onClick={() => {
                        setIsCompareOpen(false);
                        onSelectItinerary(tour);
                      }}
                    >
                      View Itinerary
                    </button>
                    <button
                      className="btn-primary w-full"
                      onClick={() => {
                        setIsCompareOpen(false);
                        onBookTour(tour);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .compare-modal-body {
          padding: 2rem;
          max-width: 1050px;
        }

        .compare-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--cj-glass-border);
        }

        .compare-heading {
          font-family: var(--font-ui);
          font-size: 1.5rem;
          color: #FFFFFF;
          margin-top: 0.35rem;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .clear-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #94A3B8;
          font-family: var(--font-ui);
          font-size: 0.85rem;
          font-weight: 700;
          transition: color 0.2s ease;
        }

        .clear-btn:hover {
          color: #EF4444;
        }

        .close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #E2E8F0;
        }

        .compare-grid-wrapper {
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .compare-columns-grid {
          display: grid;
          gap: 1.25rem;
        }

        .cols-1 { grid-template-columns: 1fr; max-width: 450px; margin: 0 auto; }
        .cols-2 { grid-template-columns: 1fr 1fr; }
        .cols-3 { grid-template-columns: 1fr 1fr 1fr; }

        .compare-card {
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(19, 29, 51, 0.9);
        }

        .remove-card-btn {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.75);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
        }

        .compare-img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        .compare-card-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .card-tour-title {
          font-family: var(--font-ui);
          font-size: 1.1rem;
          color: #FFFFFF;
          line-height: 1.3;
        }

        .card-dest {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          color: #94A3B8;
        }

        .compare-spec-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.84rem;
          padding-bottom: 0.35rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .spec-label {
          color: #94A3B8;
        }

        .spec-val {
          color: #FFFFFF;
          font-family: var(--font-ui);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .text-gold {
          color: var(--cj-gold-500);
          font-size: 1.15rem;
          font-weight: 900;
        }

        .star-fill {
          color: var(--cj-gold-500);
          fill: var(--cj-gold-500);
        }

        .spec-block {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .spec-block-title {
          font-family: var(--font-ui);
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #94A3B8;
        }

        .spec-list {
          list-style: none;
          font-size: 0.8rem;
          color: #CBD5E1;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .inc-chips-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .inc-chip-mini {
          font-size: 0.72rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-xs);
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #E2E8F0;
        }

        .compare-heading {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: #FFFFFF;
          margin-top: 0.35rem;
        }

        .close-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .modal-overlay {
            align-items: flex-end;
            padding: 0;
          }
          .compare-modal-body {
            padding: 1.5rem 1.15rem;
            border-radius: 20px 20px 0 0;
            max-height: 92vh;
          }
          .compare-heading {
            font-size: 1.25rem;
          }
          .compare-columns-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .compare-actions-row button {
            min-height: 48px;
            font-size: 0.98rem;
          }
        }
      `}</style>
    </div>
  );
}
