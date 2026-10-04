import React, { useEffect, useRef } from 'react';
import { Share2, FileSpreadsheet, Printer, X } from 'lucide-react';
import './styles/ExportMenu.css';

export default function ExportMenu({
  isOpen,
  onClose,
  onSocialShare,
  onExcelExport,
  onPDFExport
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="export-menu-overlay" onClick={onClose} role="menu" aria-label="Export options">
      <div className="export-menu" ref={menuRef} onClick={(e) => e.stopPropagation()}>
        <div className="menu-header">
          <h3>Export & Share</h3>
          <button type="button" className="menu-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="menu-items">
          <button
            type="button"
            className="menu-item primary"
            onClick={onSocialShare}
            role="menuitem"
          >
            <div className="item-icon share">
              <Share2 size={20} />
            </div>
            <div className="item-info">
              <span className="item-title">Social Share Card</span>
              <span className="item-desc">9:16 story card for WhatsApp & Instagram</span>
            </div>
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={onExcelExport}
            role="menuitem"
          >
            <div className="item-icon excel">
              <FileSpreadsheet size={20} />
            </div>
            <div className="item-info">
              <span className="item-title">Download Excel</span>
              <span className="item-desc">Day-by-day itinerary spreadsheet</span>
            </div>
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={onPDFExport}
            role="menuitem"
          >
            <div className="item-icon pdf">
              <Printer size={20} />
            </div>
            <div className="item-info">
              <span className="item-title">PDF Brochure</span>
              <span className="item-desc">Official vacation brochure for printing</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}