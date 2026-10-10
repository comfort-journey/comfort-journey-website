import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { X, Share2, FileSpreadsheet, Printer, Download, QrCode, Link2, Check, MessageCircle, Sparkles } from 'lucide-react';
import { exportItineraryToExcel, printPdfBrochure, generateSocialCardDataUrl } from '../../../services/itineraryExportService';
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      
      const shareUrl = window.location.href;
      QRCode.toDataURL(shareUrl, {
        width: 200,
        margin: 1,
        color: { dark: '#0F172A', light: '#FFFFFF' }
      }).then(url => {
        setQrCodeUrl(url);
      }).catch(err => {
        console.warn('QR code fallback to external generator', err);
        setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`);
      });
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
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
        itinerary: enrichedItinerary,
        days: enrichedItinerary
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${(tour.destination || tour.name || 'Vacation').replace(/\s+/g, '_')}_ComfortJourney_Card.png`;
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
      itinerary: enrichedItinerary,
      days: enrichedItinerary
    });
    onClose();
  };

  const handlePDFExport = () => {
    if (!tour || !enrichedItinerary) return;
    printPdfBrochure({
      ...tour,
      itinerary: enrichedItinerary,
      days: enrichedItinerary
    });
    onClose();
  };

  const handleWhatsAppShare = () => {
    if (!tour) return;
    const text = encodeURIComponent(
      `Check out this curated ${tour.duration} holiday to ${tour.destination || tour.location} with Comfort Journey!\n` +
      `✨ ${tour.name}\n` +
      `🚗 Private Chauffeur + 🏨 Handpicked Stays\n` +
      `👉 View detailed itinerary: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="share-menu-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Share and export itinerary">
      <div className="share-menu" ref={menuRef} onClick={(e) => e.stopPropagation()}>
        <div className="menu-header">
          <h3>
            <Share2 size={20} className="text-amber" />
            Share & Export Itinerary
          </h3>
          <button type="button" className="menu-close" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        <div className="menu-body">
          {/* Share Links */}
          <div className="menu-section">
            <h4 className="section-label">Direct Share</h4>
            <div className="share-options">
              <button type="button" className="share-option primary" onClick={handleCopyLink}>
                <div className="option-icon link">
                  {copied ? <Check size={20} /> : <Link2 size={20} />}
                </div>
                <div className="option-info">
                  <span className="option-title">{copied ? 'Link Copied to Clipboard!' : 'Copy Shareable Link'}</span>
                  <span className="option-desc">Instant link to this itinerary with active day & stops</span>
                </div>
                {copied && <span className="copied-badge">Copied!</span>}
              </button>

              <button type="button" className="share-option" onClick={handleWhatsAppShare}>
                <div className="option-icon whatsapp">
                  <MessageCircle size={20} />
                </div>
                <div className="option-info">
                  <span className="option-title">Share on WhatsApp</span>
                  <span className="option-desc">Send to family, friends, or traveling group</span>
                </div>
              </button>
            </div>
          </div>

          {/* Export Formats */}
          <div className="menu-section">
            <h4 className="section-label">Download & Export</h4>
            <div className="export-options">
              <button type="button" className="export-option" onClick={handlePDFExport}>
                <div className="option-icon pdf">
                  <Printer size={20} />
                </div>
                <div className="option-info">
                  <span className="option-title">Printable PDF Brochure</span>
                  <span className="option-desc">Official Comfort Journey day-by-day travel brochure</span>
                </div>
              </button>

              <button type="button" className="export-option" onClick={handleExcelExport}>
                <div className="option-icon excel">
                  <FileSpreadsheet size={20} />
                </div>
                <div className="option-info">
                  <span className="option-title">Export to Excel (.xlsx)</span>
                  <span className="option-desc">Detailed spreadsheet with timetable, stays & transfers</span>
                </div>
              </button>

              <button type="button" className="export-option" onClick={handleSocialCard} disabled={generatingSocial}>
                <div className="option-icon social">
                  <Download size={20} />
                </div>
                <div className="option-info">
                  <span className="option-title">{generatingSocial ? 'Generating Card...' : 'Social Story Image (9:16)'}</span>
                  <span className="option-desc">High-res picture card for WhatsApp or Instagram stories</span>
                </div>
              </button>
            </div>
          </div>

          {/* Quick QR Code */}
          {qrCodeUrl && (
            <div className="qr-preview-box">
              <img src={qrCodeUrl} alt="Itinerary QR Code" className="qr-preview-img" />
              <div className="qr-preview-text">
                <span className="qr-preview-title">Scan with Smartphone</span>
                <p className="qr-preview-desc">Scan using any phone camera to instantly view and navigate this itinerary on mobile.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}