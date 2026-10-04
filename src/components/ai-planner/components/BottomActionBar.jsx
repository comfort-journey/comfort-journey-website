import React from 'react';
import { MessageCircle, Share2, FileSpreadsheet, Printer, MoreHorizontal, ChevronUp, ChevronDown } from 'lucide-react';
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
    <footer className="bottom-action-bar" role="contentinfo">
      <div className="bar-left">
        <div className="price-box">
          <span className="price-caption">Starting from</span>
          <span className="price-amount">{formatPrice(tripPlan.price)}</span>
          <span className="price-unit">/ person</span>
        </div>
      </div>

      <div className="bar-right">
        <button
          type="button"
          className="action-btn primary"
          onClick={onSocialCard}
          title="Download social share card"
        >
          <Share2 size={16} />
          <span className="hidden-mobile">Share Card</span>
        </button>

        <div className="export-dropdown">
          <button
            type="button"
            className="action-btn dropdown-trigger"
            onClick={onExportMenuToggle}
            aria-expanded={showExportMenu}
            aria-haspopup="true"
            aria-label="Export options"
          >
            <MoreHorizontal size={16} />
            <span className="hidden-mobile">Export</span>
            {showExportMenu ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showExportMenu && (
            <div className="dropdown-menu" role="menu">
              <button type="button" className="dropdown-item" role="menuitem" onClick={onExcelExport}>
                <FileSpreadsheet size={14} />
                <span>Download Excel</span>
              </button>
              <button type="button" className="dropdown-item" role="menuitem" onClick={onPDFExport}>
                <Printer size={14} />
                <span>PDF Brochure</span>
              </button>
              <button type="button" className="dropdown-item" role="menuitem" onClick={onSocialCard}>
                <Share2 size={14} />
                <span>Social Share Card</span>
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          className="action-btn whatsapp"
          onClick={onWhatsAppBooking}
        >
          <MessageCircle size={17} />
          <span>Book via WhatsApp</span>
        </button>
      </div>
    </footer>
  );
}