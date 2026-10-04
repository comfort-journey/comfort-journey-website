import React, { useEffect, useRef, useState } from 'react';
import { X, Share2, FileSpreadsheet, Printer, Download, QrCode, Link2, Check, MessageCircle, Copy } from 'lucide-react';
import { exportItineraryToExcel, printPdfBrochure, generateSocialCardDataUrl } from '../../../services/itineraryExportService';
import { serializeItineraryState } from '../utils/itinerarySerializer';
import './styles/ShareExportMenu.css';

export default function ShareExportMenu({
  isOpen,
  onClose,
  tour,
  enrichedItinerary,
  activeDay,
  selectedStop
}) {
  const menuRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [generatingSocial, setGeneratingSocial] = useState(false);
  const [socialCardUrl, setSocialCardUrl] = useState('');

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      
      // Generate QR code for current URL
      const shareUrl = window.location.href;
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleSocialCard = async () => {
    if (!tour || !enrichedItinerary) return;
    setGeneratingSocial(true);
    try {
      const dataUrl = await generateSocialCardDataUrl({
        ...tour,
        itinerary: enrichedItinerary
      });
      setSocialCardUrl(dataUrl);
      
      // Auto-download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${(tour.destination || 'Vacation').replace(/\s+/g, '_')}_ComfortJourney_Card.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Social card generation failed:', err);
    } finally {
      setGeneratingSocial(false);
    }
  };

  const handleExcelExport = () => {
    if (!tour || !enrichedItinerary) return;
    exportItineraryToExcel({
      ...tour,
      itinerary: enrichedItinerary
    });
    onClose();
  };

  const handlePDFExport = () => {
    if (!tour || !enrichedItinerary) return;
    printPdfBrochure({
      ...tour,
      itinerary: enrichedItinerary
    });
    onClose();
  };

  const handleWhatsAppShare = () => {
    if (!tour) return;
    const text = encodeURIComponent(
      `Check out our ${tour.duration} itinerary for ${tour.destination || tour.location}!\n` +
      `💰 ${tour.price?.toLocaleString('en-IN')}/person\n` +
      `🚗 ${tour.vehicle}\n` +
      `🍲 ${tour.dietary}\n` +
      `Explore & book: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="share-menu-overlay" onClick={onClose} role="menu" aria-label="Share and export options">
      <div className="share-menu" ref={menuRef} onClick={(e) => e.stopPropagation()}>
        <div className="menu-header">
          <h3>
            <Share2 size={18} />
            Share & Export
          </h3>
          <button type="button" className="menu-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="menu-section">
          <h4 className="section-label">Share This Itinerary</h4>
          <div className="share-options">
            <button type="button" className="share-option primary" onClick={handleCopyLink} role="menuitem">
              <div className="option-icon link">
                {copied ? <Check size={20} /> : <Link2 size={20} />}
              </div>
              <div className="option-info">
                <span className="option-title">{copied ? 'Link Copied!' : 'Copy Link'}</span>
                <span className="option-desc">Share via any app or message</span>
              </div>
            </button>

            <button type="button" className="share-option" onClick={handleWhatsAppShare} role="menuitem">
              <div className="option-icon whatsapp">
                <MessageCircle size={20} />
              </div>
              <div className="option-info">
                <span className="option-title">Share on WhatsApp</span>
                <span className="option-desc">Send directly to contacts</span>
              </div>
            </button>

            <div className="share-option qr-option" role="menuitem">
              <div className="option-icon qr">
                <QrCode size={20} />
              </div>
              <div className="option-info">
                <span className="option-title">QR Code</span>
                <span className="option-desc">Scan to open on mobile</span>
              </div>
              {qrCodeUrl && (
                <img src={qrCodeUrl} alt="QR Code for this itinerary" className="qr-code-image" />
              )}
            </div>
          </div>
        </div>

        <div className="menu-section">
          <h4 className="section-label">Export Options</h4>
          <div className="export-options">
            <button
              type="button"
              className="export-option"
              onClick={handleSocialCard}
              disabled={generatingSocial}
              role="menuitem"
            >
              <div className="option-icon social">
                <Download size={20} />
              </div>
              <div className="option-info">
                <span className="option-title">Social Share Card</span>
                <span className="option-desc">9:16 PNG for WhatsApp/Instagram Stories</span>
              </div>
              {generatingSocial && <span className="generating-badge">Generating...</span>}
            </button>

            <button
              type="button"
              className="export-option"
              onClick={handleExcelExport}
              role="menuitem"
            >
              <div className="option-icon excel">
                <FileSpreadsheet size={20} />
              </div>
              <div className="option-info">
                <span className="option-title">Download Excel</span>
                <span className="option-desc">Day-by-day spreadsheet with all details</span>
              </div>
            </button>

            <button
              type="button"
              className="export-option"
              onClick={handlePDFExport}
              role="menuitem"
            >
              <div className="option-icon pdf">
                <Printer size={20} />
              </div>
              <div className="option-info">
                <span className="option-title">PDF Brochure</span>
                <span className="option-desc">Professional printable itinerary</span>
              </div>
            </button>
          </div>
        </div>

        {/* QR Code Preview */}
        {qrCodeUrl && (
          <div className="qr-preview-section">
            <h4 className="section-label">Quick Share QR Code</h4>
            <div className="qr-preview">
              <img src={qrCodeUrl} alt="QR Code for this itinerary" />
              <p className="qr-caption">Scan with phone camera to open</p>
            </div>
          </div>
        )}

        {/* Social Card Preview */}
        {socialCardUrl && (
          <div className="social-preview-section">
            <h4 className="section-label">Social Card Preview</h4>
            <div className="social-preview">
              <img src={socialCardUrl} alt="Social share card preview" />
              <button type="button" className="download-social" onClick={() => {
                const link = document.createElement('a');
                link.href = socialCardUrl;
                link.download = `${(tour?.destination || 'Vacation').replace(/\s+/g, '_')}_ComfortJourney_Card.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}>
                <Download size={16} />
                <span>Download PNG</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}