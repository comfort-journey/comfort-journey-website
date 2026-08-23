import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle, XCircle, Clock, MessageCircle, Star, Sparkles, Hotel, Car, Utensils, ShieldCheck } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function ItineraryModal({ tour, onClose, onBookNow }) {
  const { formatPrice } = useCurrency();
  const [activeDay, setActiveDay] = useState(1);

  if (!tour) return null;

  const currentDayData = tour.itinerary?.find((d) => d.day === activeDay) || tour.itinerary?.[0];

  const handleWhatsAppInquiry = () => {
    const msg = encodeURIComponent(`Hi Comfort Journey! I am reviewing the itinerary for "${tour.name}" (${tour.duration}) on your website. 
Starting Price: ${formatPrice(tour.price)}/person.
Please share customized availability and booking details!`);

    window.open(`https://wa.me/918770403315?text=${msg}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content itinerary-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Hero Banner Header */}
        <div className="itinerary-hero-banner" style={{ backgroundImage: `url(${tour.image})` }}>
          <div className="hero-banner-overlay"></div>
          
          <button className="banner-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>

          <div className="banner-text-content">
            <div className="banner-badges-row">
              <span className="badge badge-amber">{tour.category}</span>
              <span className="badge badge-emerald">{tour.region}</span>
              <span className="badge badge-gold">⭐ {tour.rating} ({tour.reviews} Reviews)</span>
            </div>

            <h2 className="banner-title">{tour.name}</h2>
            <p className="banner-tagline">{tour.tagline}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="itinerary-body-container">
          {/* Highlights & Inclusions Strip */}
          <div className="highlights-strip glass-card">
            <h4 className="strip-title">⭐ Tour Highlights & VIP Inclusions</h4>
            <div className="highlights-grid">
              {tour.highlights?.map((h, idx) => (
                <div key={idx} className="highlight-item">
                  <CheckCircle size={14} className="text-emerald" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day Selector Tabs */}
          <div className="itinerary-tabs-header">
            <h3 className="section-label">Day-by-Day Detailed Schedule</h3>
            <div className="day-tabs-scroll">
              {tour.itinerary?.map((d) => (
                <button
                  key={d.day}
                  type="button"
                  className={`day-tab-btn ${activeDay === d.day ? 'active' : ''}`}
                  onClick={() => setActiveDay(d.day)}
                >
                  Day {d.day}
                </button>
              ))}
            </div>
          </div>

          {/* Active Day Schedule Card */}
          {currentDayData && (
            <div className="day-detail-card glass-panel">
              <div className="day-card-header">
                <span className="day-tag-pill">Day {currentDayData.day}</span>
                <h4 className="day-title-text">{currentDayData.title}</h4>
              </div>

              <div className="day-schedule-timeline">
                <div className="timeline-slot">
                  <div className="slot-badge morning">🌅 Morning</div>
                  <p className="slot-desc">{currentDayData.morning || 'Buffet breakfast & private sightseeing transfer.'}</p>
                </div>

                <div className="timeline-slot">
                  <div className="slot-badge afternoon">☀️ Afternoon</div>
                  <p className="slot-desc">{currentDayData.afternoon || 'Guided monument exploration and scenic experiences.'}</p>
                </div>

                <div className="timeline-slot">
                  <div className="slot-badge evening">🌙 Evening</div>
                  <p className="slot-desc">{currentDayData.evening || 'Relaxation at 5-star hotel & dinner.'}</p>
                </div>
              </div>

              {/* Day Amenities Bar */}
              <div className="day-amenities-bar">
                <div className="amenity-pill">
                  <Hotel size={15} className="text-amber" />
                  <span>Stay: <strong>{currentDayData.stayTier || '5-Star Luxury Property'}</strong></span>
                </div>
                <div className="amenity-pill">
                  <Car size={15} className="text-amber" />
                  <span>Transport: <strong>{currentDayData.transport || 'Dedicated Private AC Cab'}</strong></span>
                </div>
                <div className="amenity-pill">
                  <Utensils size={15} className="text-amber" />
                  <span>Meals: <strong>{currentDayData.meals || 'Breakfast & Dinner'}</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions Accordion Grid */}
          <div className="inc-exc-grid">
            <div className="inc-box glass-card">
              <h4 className="box-title text-emerald"><CheckCircle size={16} /> 100% Guaranteed Inclusions</h4>
              <ul>
                {tour.inclusions?.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="exc-box glass-card">
              <h4 className="box-title text-muted"><XCircle size={16} /> Exclusions</h4>
              <ul>
                {tour.exclusions?.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer Strip */}
        <div className="itinerary-modal-footer">
          <div className="footer-price-block">
            <span className="price-label">Starting Price</span>
            <div className="footer-price-vals">
              <strong className="footer-current-price">{formatPrice(tour.price)}</strong>
              {tour.originalPrice > tour.price && (
                <span className="footer-orig-price">{formatPrice(tour.originalPrice)}</span>
              )}
              <span className="per-person-note">/ person</span>
            </div>
          </div>

          <div className="footer-cta-buttons">
            <button className="btn-whatsapp" onClick={handleWhatsAppInquiry}>
              <MessageCircle size={18} />
              <span>Ask on WhatsApp</span>
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                onClose();
                onBookNow(tour);
              }}
            >
              <span>Instant VIP Booking</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .itinerary-modal-content {
          max-width: 900px;
          padding: 0;
          overflow: hidden;
        }

        .itinerary-hero-banner {
          position: relative;
          height: 280px;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          padding: 2rem;
        }

        .hero-banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(7, 11, 20, 0.3) 0%, rgba(11, 15, 25, 0.95) 100%);
        }

        .banner-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: background 0.2s ease;
        }

        .banner-close-btn:hover {
          background: var(--cj-amber-500);
        }

        .banner-text-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .banner-badges-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .banner-title {
          font-family: var(--font-serif);
          font-size: clamp(1.45rem, 3.2vw, 2.1rem);
          color: #FFFFFF;
          line-height: 1.2;
        }

        .banner-tagline {
          font-size: 0.95rem;
          color: #CBD5E1;
        }

        .itinerary-body-container {
          padding: 1.75rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-height: 52vh;
          overflow-y: auto;
        }

        .highlights-strip {
          padding: 1.25rem;
          background: rgba(19, 29, 51, 0.8);
        }

        .strip-title {
          font-family: var(--font-ui);
          font-size: 0.9rem;
          font-weight: 800;
          color: var(--cj-gold-500);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 0.6rem;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.85rem;
          color: #E2E8F0;
        }

        .itinerary-tabs-header {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .section-label {
          font-family: var(--font-ui);
          font-size: 1.1rem;
          color: #FFFFFF;
        }

        .day-tabs-scroll {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.4rem;
        }

        .day-tab-btn {
          padding: 0.45rem 1.1rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--cj-glass-border);
          color: #CBD5E1;
          font-family: var(--font-ui);
          font-weight: 700;
          font-size: 0.85rem;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .day-tab-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
        }

        .day-tab-btn.active {
          background: var(--cj-amber-500);
          color: #FFFFFF;
          border-color: var(--cj-amber-500);
          box-shadow: 0 0 12px rgba(255, 107, 0, 0.4);
        }

        .day-detail-card {
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .day-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .day-tag-pill {
          background: var(--cj-amber-500);
          color: #FFFFFF;
          font-family: var(--font-ui);
          font-weight: 900;
          font-size: 0.82rem;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-sm);
        }

        .day-title-text {
          font-family: var(--font-ui);
          font-size: 1.15rem;
          color: #FFFFFF;
        }

        .day-schedule-timeline {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .timeline-slot {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          padding: 0.65rem 0.85rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-sm);
        }

        .slot-badge {
          font-family: var(--font-ui);
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-xs);
          background: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          flex-shrink: 0;
        }

        .slot-desc {
          font-size: 0.88rem;
          color: #CBD5E1;
          line-height: 1.5;
        }

        .day-amenities-bar {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .amenity-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: #94A3B8;
        }

        .amenity-pill strong {
          color: #FFFFFF;
        }

        .inc-exc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .inc-box, .exc-box {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .box-title {
          font-family: var(--font-ui);
          font-size: 0.95rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .inc-box ul, .exc-box ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          font-size: 0.82rem;
          color: #CBD5E1;
        }

        .itinerary-modal-footer {
          padding: 1.25rem 2rem;
          background: var(--cj-bg-card);
          border-top: 1px solid var(--cj-glass-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .price-label {
          font-size: 0.72rem;
          color: #94A3B8;
          text-transform: uppercase;
          font-weight: 700;
        }

        .footer-price-vals {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
        }

        .footer-current-price {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          font-weight: 900;
          color: var(--cj-gold-500);
        }

        .footer-orig-price {
          font-size: 0.85rem;
          text-decoration: line-through;
          color: #64748B;
        }

        .per-person-note {
          font-size: 0.78rem;
          color: #94A3B8;
        }

        .footer-cta-buttons {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .banner-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid var(--cj-glass-border);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
        }

        @media (max-width: 768px) {
          .itinerary-hero-banner {
            height: 200px;
          }
          .banner-text-content {
            padding: 1.25rem 1rem;
          }
          .banner-title {
            font-size: 1.35rem;
          }
          .itinerary-body-container {
            padding: 1.25rem 1rem;
            max-height: 60vh;
          }
          .highlights-grid {
            grid-template-columns: 1fr;
          }
          .day-amenities-bar {
            flex-direction: column;
            gap: 0.5rem;
          }
          .inc-exc-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .itinerary-modal-footer {
            flex-direction: column;
            align-items: stretch;
            padding: 1.25rem 1rem;
            gap: 1rem;
          }
          .footer-price-block {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .footer-cta-buttons {
            flex-direction: column;
            width: 100%;
            gap: 0.65rem;
          }
          .footer-cta-buttons button {
            width: 100%;
            justify-content: center;
            min-height: 48px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
