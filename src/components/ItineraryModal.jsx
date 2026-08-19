import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle2, MessageCircle, Phone, Sparkles, Star, ChevronRight, Award } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function ItineraryModal({ tour, onClose, onBookTour }) {
  const { formatPrice } = useCurrency();
  const [activeDay, setActiveDay] = useState(1);

  if (!tour) return null;

  const currentDayData = tour.itinerary.find((d) => d.day === activeDay) || tour.itinerary[0];

  const handleWhatsAppDirect = () => {
    const msg = encodeURIComponent(
      `Hi Comfort Journey! 🌟 I'm reviewing the "${tour.title}" (${tour.duration}) package on your website.\n` +
      `• *Starting Price:* ${formatPrice(tour.price)} / person\n` +
      `• *Location:* ${tour.location}\n\n` +
      `Please share customized quote, available dates, and hotel upgrade options!`
    );
    window.open(`https://wa.me/918770403315?text=${msg}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content itinerary-modal-body" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Banner with Image */}
        <div className="modal-top-banner">
          <img src={tour.image} alt={tour.title} className="banner-bg-img" />
          <div className="banner-grad"></div>
          
          <button className="banner-close-btn" onClick={onClose}>
            <X size={20} />
          </button>

          <div className="banner-info">
            <div className="banner-badges">
              <span className="badge badge-primary">{tour.category}</span>
              {tour.badge && <span className="badge badge-gold">{tour.badge}</span>}
              <span className="badge badge-accent">{tour.duration}</span>
            </div>
            <h2 className="banner-title">{tour.title}</h2>
            <div className="banner-meta">
              <span><MapPin size={14} /> {tour.location}</span>
              <span><Star size={14} className="star-fill" /> {tour.rating} ({tour.reviewsCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Inclusions Strip */}
        <div className="inclusions-strip">
          <span className="inc-heading">✨ Guaranteed Inclusions:</span>
          <div className="inc-list">
            {tour.inclusions.map((inc, idx) => (
              <span key={idx} className="inc-tag">
                <CheckCircle2 size={14} className="text-accent" />
                {inc}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights if available */}
        {tour.highlights && (
          <div className="highlights-strip">
            <span className="high-heading">🌟 Tour Highlights:</span>
            <div className="high-list">
              {tour.highlights.map((h, idx) => (
                <span key={idx} className="high-tag">
                  • {h}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Day Tabs & Content */}
        <div className="interactive-itinerary-box">
          <h4 className="itin-section-title">Day-Wise Detailed Route & Activities</h4>
          
          {/* Day Selector Pills */}
          <div className="day-pills-row">
            {tour.itinerary.map((item) => (
              <button
                key={item.day}
                type="button"
                className={`day-tab-pill ${activeDay === item.day ? 'active' : ''}`}
                onClick={() => setActiveDay(item.day)}
              >
                Day {item.day}
              </button>
            ))}
          </div>

          {/* Active Day Detail Box */}
          <div className="active-day-detail-card">
            <div className="day-number-badge">Day {currentDayData.day}</div>
            <div className="day-text-content">
              <h5 className="active-day-title">{currentDayData.title}</h5>
              <p className="active-day-desc">{currentDayData.desc}</p>
              
              <div className="day-perks-row">
                <span className="perk-pill">🏨 4/5-Star Stay Included</span>
                <span className="perk-pill">🚗 Private Cab Transfer</span>
                <span className="perk-pill">🍳 Breakfast Included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer-lux">
          <div className="footer-price-wrap">
            <span className="p-lbl">Package Starting Price</span>
            <div className="p-val-row">
              <span className="p-val">{formatPrice(tour.price)}</span>
              <span className="p-orig">{formatPrice(tour.originalPrice)}</span>
              <span className="p-person">/ person</span>
            </div>
          </div>

          <div className="footer-action-btns">
            <button 
              className="btn-whatsapp"
              onClick={handleWhatsAppDirect}
            >
              <MessageCircle size={18} />
              Book on WhatsApp
            </button>
            <button 
              className="btn-primary" 
              onClick={() => { 
                onClose(); 
                onBookTour(tour); 
              }}
            >
              Send Inquiry
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .itinerary-modal-body {
          padding: 0;
          max-width: 820px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #FFFFFF;
        }

        .modal-top-banner {
          position: relative;
          height: 240px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          color: #FFFFFF;
        }

        .banner-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .banner-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(7, 11, 20, 0.4) 0%, rgba(7, 11, 20, 0.95) 100%);
        }

        .banner-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: transform 0.2s ease;
        }

        .banner-close-btn:hover {
          transform: scale(1.1);
        }

        .banner-info {
          position: relative;
          z-index: 2;
        }

        .banner-badges {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }

        .banner-title {
          font-size: 1.5rem;
          line-height: 1.25;
          margin-bottom: 0.35rem;
          color: #FFFFFF;
        }

        .banner-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          color: #E2E8F0;
        }

        .banner-meta span {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .star-fill {
          color: #FFB800;
          fill: #FFB800;
        }

        .inclusions-strip {
          background: #F8FAFC;
          padding: 1.25rem 2rem;
          border-bottom: 1px solid var(--color-border);
        }

        .inc-heading {
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--color-secondary);
          display: block;
          margin-bottom: 0.6rem;
        }

        .inc-list {
          display: flex;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .inc-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-secondary);
          background: #FFFFFF;
          border: 1px solid var(--color-border);
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
        }

        .highlights-strip {
          padding: 0.85rem 2rem;
          background: #FFFDF5;
          border-bottom: 1px solid #FEF3C7;
        }

        .high-heading {
          font-size: 0.8rem;
          font-weight: 800;
          color: #B45309;
          margin-bottom: 0.35rem;
          display: block;
        }

        .high-list {
          display: flex;
          gap: 0.85rem;
          flex-wrap: wrap;
          font-size: 0.82rem;
          color: #78350F;
          font-weight: 600;
        }

        .interactive-itinerary-box {
          padding: 1.75rem 2rem;
        }

        .itin-section-title {
          font-size: 1.15rem;
          color: var(--color-secondary);
          margin-bottom: 1rem;
        }

        .day-pills-row {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .day-tab-pill {
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          background: #F1F5F9;
          color: var(--color-secondary);
          font-weight: 700;
          font-size: 0.85rem;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .day-tab-pill:hover {
          background: #E2E8F0;
        }

        .day-tab-pill.active {
          background: var(--color-primary);
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
        }

        .active-day-detail-card {
          display: flex;
          gap: 1.25rem;
          padding: 1.25rem;
          background: #F8FAFC;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
        }

        .day-number-badge {
          background: var(--color-secondary);
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.95rem;
          padding: 0.6rem 0.85rem;
          border-radius: var(--radius-sm);
          height: fit-content;
          white-space: nowrap;
        }

        .day-text-content {
          flex: 1;
        }

        .active-day-title {
          font-size: 1.1rem;
          color: var(--color-secondary);
          margin-bottom: 0.4rem;
        }

        .active-day-desc {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          margin-bottom: 0.85rem;
        }

        .day-perks-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .perk-pill {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-secondary);
          background: #FFFFFF;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-xs);
          border: 1px solid var(--color-border);
        }

        .modal-footer-lux {
          padding: 1.25rem 2rem;
          border-top: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #FFFFFF;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-price-wrap {
          display: flex;
          flex-direction: column;
        }

        .footer-price-wrap .p-lbl {
          font-size: 0.72rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }

        .p-val-row {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .p-val-row .p-val {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.6rem;
          color: var(--color-primary);
        }

        .p-val-row .p-orig {
          font-size: 0.9rem;
          text-decoration: line-through;
          color: var(--color-text-subtle);
        }

        .p-val-row .p-person {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        .footer-action-btns {
          display: flex;
          gap: 0.75rem;
        }

        @media (max-width: 640px) {
          .modal-overlay {
            align-items: flex-end;
            padding: 0;
          }
          .itinerary-modal-body {
            border-radius: 24px 24px 0 0;
            max-height: 88vh;
          }
          .modal-top-banner {
            height: 180px;
            padding: 1.25rem;
          }
          .banner-title {
            font-size: 1.2rem;
          }
          .inclusions-strip, .highlights-strip, .interactive-itinerary-box, .modal-footer-lux {
            padding: 1.25rem;
          }
          .active-day-detail-card {
            flex-direction: column;
            gap: 0.75rem;
          }
          .modal-footer-lux {
            flex-direction: column;
            align-items: stretch;
          }
          .footer-action-btns {
            flex-direction: column;
          }
          .footer-action-btns button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
