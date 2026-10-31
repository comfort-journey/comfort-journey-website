import React from 'react';
import { Sparkles, CheckCircle2, Car, BedDouble, Utensils, MessageCircle, CloudSun } from 'lucide-react';
import './styles/DesktopRails.css';

export default function DesktopRightRail({
  tripPlan,
  formatPrice,
  onWhatsAppBooking,
  onOpenCustomize
}) {
  if (!tripPlan) return null;

  return (
    <aside className="planner-desktop-right-rail" aria-label="Trip Summary & Inclusions">
      {/* 1. Quick Lock / Instant Quote Box */}
      <div className="desktop-rail-card quick-lock-card">
        <div className="rail-price-box">
          <span className="rail-price-sub">Indicative Package</span>
          <div className="rail-price-main">
            <span className="price-val">{formatPrice(tripPlan.price)}</span>
            <span className="price-unit">/ person</span>
          </div>
          <span className="rail-price-note">*All-inclusive private tour</span>
        </div>

        <button
          type="button"
          className="rail-primary-whatsapp-cta"
          onClick={onWhatsAppBooking}
        >
          <MessageCircle size={15} />
          <span>Lock on WhatsApp</span>
        </button>
      </div>

      {/* 2. Inclusions Snapshot */}
      <div className="desktop-rail-card inclusions-card">
        <div className="rail-card-header">
          <Sparkles size={13} className="text-amber" />
          <h4>Comfort Journey Inclusions</h4>
        </div>

        <div className="inclusions-list">
          <div className="inclusion-item">
            <Car size={13} className="text-aqua" />
            <div>
              <strong>{tripPlan.vehicle.replace('Private Toyota ', '').replace(' (AC)', '').replace(' (Hybrid AC)', '')}</strong>
              <p>Dedicated AC vehicle with courteous chauffeur</p>
            </div>
          </div>

          <div className="inclusion-item">
            <BedDouble size={13} className="text-purple" />
            <div>
              <strong>{tripPlan.stayTier.includes('5★') ? '5★ Luxury Resort' : '4★ Deluxe Boutique'}</strong>
              <p>Handpicked partner stays with scenic views</p>
            </div>
          </div>

          <div className="inclusion-item">
            <Utensils size={13} className="text-lime" />
            <div>
              <strong>{tripPlan.dietary.includes('Jain') ? '100% Jain Friendly' : 'Pure Veg Friendly'}</strong>
              <p>Quality-checked dining stops with meal preferences</p>
            </div>
          </div>

          <div className="inclusion-item">
            <CheckCircle2 size={13} className="text-amber" />
            <div>
              <strong>Zero Hidden Costs</strong>
              <p>Fuel, interstate tolls & driver allowances included</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

