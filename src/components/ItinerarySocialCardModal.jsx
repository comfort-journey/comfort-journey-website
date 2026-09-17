import React, { useState, useEffect } from 'react';
import { X, Download, Share2, Check, MessageCircle, Sparkles } from 'lucide-react';
import { generateSocialCardDataUrl } from '../services/itineraryExportService';

export default function ItinerarySocialCardModal({ isOpen = false, onClose, tripPlan }) {
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
      <div className="modal-content social-card-modal-content" onClick={e => e.stopPropagation()}>
        <div className="social-card-modal-header">
          <div className="modal-header-left">
            <Sparkles size={16} className="text-amber" />
            <h3>Itinerary Social Share Card</h3>
          </div>
          <button type="button" className="card-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="social-card-preview-area">
          {loading ? (
            <div className="card-loading-state">
              <div className="spinner-amber" />
              <p>Generating your high-res vacation story card...</p>
            </div>
          ) : (
            <img 
              src={cardImageSrc} 
              alt="Itinerary Story Card" 
              className="social-card-image-render"
            />
          )}
        </div>

        <div className="social-card-actions-bar">
          <button 
            type="button" 
            className="btn-card-action download-btn"
            onClick={handleDownload}
            disabled={loading}
          >
            <Download size={15} />
            <span>Download PNG</span>
          </button>

          <button 
            type="button" 
            className="btn-card-action whatsapp-btn"
            onClick={handleWhatsAppShare}
          >
            <MessageCircle size={15} />
            <span>Share on WhatsApp</span>
          </button>

          <button 
            type="button" 
            className="btn-card-action copy-btn"
            onClick={handleCopyLink}
          >
            {copied ? <Check size={15} className="text-emerald" /> : <Share2 size={15} />}
            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>

      <style>{`
        .social-card-modal-content {
          max-width: 440px;
          width: 92vw;
          max-height: 90vh;
          background: #001233;
          border: 1px solid rgba(255, 137, 47, 0.4);
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(255, 137, 47, 0.25);
        }

        .social-card-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: rgba(0, 18, 51, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .modal-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-header-left h3 {
          margin: 0;
          font-size: 0.95rem;
          color: #FFFFFF;
          font-weight: 700;
        }

        .card-modal-close {
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: #FFFFFF;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .social-card-preview-area {
          flex: 1;
          overflow-y: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: #000B1A;
        }

        .social-card-image-render {
          max-width: 100%;
          max-height: 60vh;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
          object-fit: contain;
        }

        .card-loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.85rem;
          padding: 40px 20px;
        }

        .spinner-amber {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 137, 47, 0.2);
          border-top-color: #FF892F;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .social-card-actions-bar {
          display: flex;
          gap: 8px;
          padding: 12px 16px;
          background: rgba(0, 18, 51, 0.95);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .btn-card-action {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 8px;
          border-radius: 8px;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }

        .btn-card-action:hover {
          opacity: 0.92;
          transform: translateY(-1px);
        }

        .download-btn {
          background: #FF892F;
          color: #001233;
        }

        .whatsapp-btn {
          background: #25D366;
          color: #FFFFFF;
        }

        .copy-btn {
          background: rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
