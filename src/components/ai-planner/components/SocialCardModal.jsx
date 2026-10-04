import React, { useState, useEffect } from 'react';
import { X, Download, Share2, Check, MessageCircle, Sparkles } from 'lucide-react';
import { generateSocialCardDataUrl } from '../../../services/itineraryExportService';
import './styles/SocialCardModal.css';

export default function SocialCardModal({ isOpen, onClose, tripPlan }) {
  const [cardImageSrc, setCardImageSrc] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && tripPlan) {
      setLoading(true);
      generateSocialCardDataUrl(tripPlan).then(dataUrl => {
        setCardImageSrc(dataUrl);
        setLoading(false);
      });
    }
  }, [isOpen, tripPlan]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!cardImageSrc) return;
    const link = document.createElement('a');
    link.href = cardImageSrc;
    link.download = `${(tripPlan?.destination || 'Vacation').replace(/\s+/g, '_')}_ComfortJourney_Card.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Check out our personalized ${tripPlan?.duration} vacation itinerary for ${tripPlan?.destination} on Comfort Journey!\n` +
      `🚗 ${tripPlan?.vehicle}\n` +
      `🍲 ${tripPlan?.dietary}\n` +
      `Explore details or book directly: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 12000 }}>
      <div className="modal-content social-card-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-left">
            <Sparkles size={16} className="text-amber" />
            <h3>Itinerary Social Share Card</h3>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-preview">
          {loading ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>Generating your high-res vacation story card...</p>
            </div>
          ) : (
            <img
              src={cardImageSrc}
              alt="Itinerary Story Card"
              className="card-image"
            />
          )}
        </div>

        <div className="modal-actions">
          <button type="button" className="action-btn download" onClick={handleDownload} disabled={loading}>
            <Download size={15} />
            <span>Download PNG</span>
          </button>

          <button type="button" className="action-btn whatsapp" onClick={handleWhatsAppShare}>
            <MessageCircle size={15} />
            <span>Share on WhatsApp</span>
          </button>

          <button type="button" className="action-btn copy" onClick={handleCopyLink}>
            {copied ? <Check size={15} className="text-emerald" /> : <Share2 size={15} />}
            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}