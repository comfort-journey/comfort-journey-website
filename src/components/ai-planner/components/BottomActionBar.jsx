import React from 'react';
import { MessageCircle, Share2, MoreHorizontal, ChevronUp, FileText, Download } from 'lucide-react';
import './styles/BottomActionBar.css';

export default function BottomActionBar({
  tripPlan,
  formatPrice,
  onWhatsAppBooking,
  onSocialCard,
  onExcelExport,
  onPDFExport,
  onExportMenuToggle,
  showExportMenu
}) {
  if (!tripPlan) return null;

  return (
    <footer className="bottom-action-bar-editorial" role="contentinfo">
      <div className="bar-left">
        <div className="price-studio-box">
          <div className="price-studio-label">Starting From</div>
          <div className="price-studio-values">
            <span className="price-studio-amount">{formatPrice(tripPlan.price)}</span>
            <span className="price-studio-unit">/ person</span>
          </div>
          <span className="price-studio-tag" title="Includes private car, verified hotels, breakfast & transfers">
            *Verified Live on WhatsApp
          </span>
        </div>
      </div>

      <div className="bar-right">
        <button
          type="button"
          className="studio-btn secondary"
          onClick={onSocialCard}
          title="Download social share card"
        >
          <Share2 size={15} />
          <span className="hidden-mobile">Share Card</span>
        </button>

        <button
          type="button"
          className="studio-btn secondary dropdown-trigger"
          onClick={onExportMenuToggle}
          aria-expanded={showExportMenu}
          aria-haspopup="true"
          aria-label="Export options"
        >
          <Download size={15} />
          <span className="hidden-mobile">Brochure</span>
          <ChevronUp size={13} />
        </button>

        <button
          type="button"
          className="studio-btn whatsapp-cta"
          onClick={onWhatsAppBooking}
          aria-label="Lock itinerary on WhatsApp"
        >
          <MessageCircle size={17} />
          <span>Lock on WhatsApp</span>
        </button>
      </div>
    </footer>
  );
}
