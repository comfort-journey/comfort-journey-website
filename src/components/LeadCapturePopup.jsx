import React, { useState, useEffect } from 'react';
import { X, MapPin, Sparkles, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { saveLeadToCMS } from '../services/leadStorageService';

/**
 * LeadCapturePopup:
 * Non-intrusive marketing popup that appears 8s after first page load.
 * Collects visitor's name, contact, and dream destination.
 * Saves directly into the Staff CRM and remembers dismissal for 3 days.
 */
export default function LeadCapturePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', destination: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if dismissed in this session
    try {
      const sessionDismissed = sessionStorage.getItem('cj_lead_popup_dismissed');
      if (sessionDismissed) return;
    } catch {}

    // Allow instant testing via URL hash #lead-popup or custom event
    const checkHash = () => {
      if (window.location.hash.includes('lead-popup') || window.location.hash.includes('quote-popup')) {
        setIsVisible(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    window.addEventListener('cj-open-lead-popup', () => setIsVisible(true));

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 7000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('cj-open-lead-popup', () => setIsVisible(true));
    };
  }, []);

  const handleDismiss = () => {
    setIsClosing(true);
    try {
      sessionStorage.setItem('cj_lead_popup_dismissed', 'true');
    } catch {}
    setTimeout(() => setIsVisible(false), 350);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const name = formData.name.trim();
    const contact = formData.contact.trim();

    if (!name || name.length < 2) {
      setError('Please enter your name');
      return;
    }
    if (!contact || contact.length < 5) {
      setError('Please enter your mobile number or email');
      return;
    }

    // Save into Central Leads CRM via leadStorageService (persists locally + Directus Cloud)
    try {
      const isEmail = contact.includes('@');
      saveLeadToCMS({
        name,
        phone: !isEmail ? contact : '',
        email: isEmail ? contact.toLowerCase() : '',
        destination: formData.destination.trim() || 'Custom Vacation',
        tourName: formData.destination.trim() ? `Vacation to ${formData.destination.trim()}` : 'Dream Vacation Proposal',
        source: 'Website 8s Welcome Popup',
        notes: `Captured from website welcome popup after 8s. Destination: ${formData.destination.trim() || 'Not specified'}`
      }).catch(() => {});
      localStorage.setItem('cj_lead_popup_dismissed', Date.now().toString());
    } catch (err) {
      console.warn('[LeadPopup] Error saving lead:', err);
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => setIsVisible(false), 350);
    }, 4500);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className={`lead-popup-overlay ${isClosing ? 'closing' : ''}`} onClick={handleDismiss} />
      <div className={`lead-popup-card ${isClosing ? 'closing' : ''}`}>
        {/* Close button */}
        <button type="button" className="lead-popup-close" onClick={handleDismiss} aria-label="Close">
          <X size={18} />
        </button>

        {isSubmitted ? (
          /* ✅ Success State */
          <div className="lead-popup-success">
            <div className="lead-success-icon">
              <CheckCircle2 size={48} strokeWidth={1.5} />
            </div>
            <h3 className="lead-success-title">You're In! 🎉</h3>
            <p className="lead-success-desc">
              Our travel specialists will craft a customized itinerary for {formData.destination.trim() || 'your trip'} and reach out shortly!
            </p>
            <a
              href={`https://wa.me/919203931912?text=${encodeURIComponent(`Hi Comfort Journey! I just submitted the quote form for ${formData.destination.trim() || 'a vacation'}. My name is ${formData.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="lead-success-wa-btn"
            >
              <MessageCircle size={16} />
              <span>Chat on WhatsApp Now</span>
            </a>
          </div>
        ) : (
          /* 📝 Form State */
          <>
            {/* Header */}
            <div className="lead-popup-header">
              <div className="lead-popup-badge">
                <Sparkles size={13} />
                <span>Exclusive for You</span>
              </div>
              <h3 className="lead-popup-title">
                Your Dream Vacation is<br />
                <span className="lead-title-accent">One Step Away ✈️</span>
              </h3>
              <p className="lead-popup-subtitle">
                Tell us where you'd love to go — our experts will craft a personalized plan & price just for you. No spam, we promise!
              </p>
            </div>

            {/* Form */}
            <form className="lead-popup-form" onSubmit={handleSubmit}>
              <div className="lead-field">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="lead-input"
                  autoComplete="name"
                />
              </div>
              <div className="lead-field">
                <input
                  type="text"
                  placeholder="Mobile or Email"
                  value={formData.contact}
                  onChange={(e) => setFormData(p => ({ ...p, contact: e.target.value }))}
                  className="lead-input"
                  autoComplete="tel"
                />
              </div>
              <div className="lead-field">
                <div className="lead-input-icon-wrap">
                  <MapPin size={15} className="lead-input-icon" />
                  <input
                    type="text"
                    placeholder="Dream Destination (e.g. Bali, Kashmir)"
                    value={formData.destination}
                    onChange={(e) => setFormData(p => ({ ...p, destination: e.target.value }))}
                    className="lead-input with-icon"
                    autoComplete="off"
                  />
                </div>
              </div>

              {error && <p className="lead-error">{error}</p>}

              <button type="submit" className="lead-submit-btn">
                <span>Get My Free Quote</span>
                <ArrowRight size={16} />
              </button>

              <p className="lead-privacy-note">
                🔒 Your info is 100% private. We never share or sell your data.
              </p>
            </form>
          </>
        )}
      </div>

      <style>{`
        .lead-popup-overlay {
          position: fixed;
          inset: 0;
          z-index: 99998;
          background: rgba(0, 12, 33, 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          animation: leadOverlayIn 0.35s ease;
        }
        .lead-popup-overlay.closing {
          animation: leadOverlayOut 0.3s ease forwards;
        }

        @keyframes leadOverlayIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes leadOverlayOut { from { opacity: 1; } to { opacity: 0; } }

        .lead-popup-card {
          position: fixed;
          z-index: 99999;
          bottom: 24px;
          right: 24px;
          width: 380px;
          max-width: calc(100vw - 32px);
          border-radius: 24px;
          overflow: hidden;
          animation: leadCardIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .lead-popup-card.closing {
          animation: leadCardOut 0.3s ease forwards;
        }

        @keyframes leadCardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes leadCardOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(20px) scale(0.96); }
        }

        /* Dark Theme Card */
        [data-theme="dark"] .lead-popup-card {
          background: linear-gradient(165deg, #001D51 0%, #001233 60%, #000C21 100%);
          border: 1.5px solid rgba(255, 137, 47, 0.35);
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 137, 47, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.04);
          color: #F9FBE7;
        }
        /* Light Theme Card */
        :root:not([data-theme="dark"]) .lead-popup-card,
        [data-theme="light"] .lead-popup-card {
          background: linear-gradient(165deg, #FFFFFF 0%, #FFF8F0 60%, #FFF5EB 100%);
          border: 1.5px solid rgba(255, 137, 47, 0.3);
          box-shadow: 0 24px 64px rgba(20, 38, 74, 0.15), 0 0 40px rgba(255, 137, 47, 0.06);
          color: #0F172A;
        }

        .lead-popup-close {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 5;
          background: rgba(125, 125, 125, 0.12);
          border: 1px solid rgba(125, 125, 125, 0.15);
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--cj-text-muted, #94A3B8);
          transition: all 0.2s ease;
        }
        .lead-popup-close:hover {
          background: rgba(255, 137, 47, 0.15);
          color: #FF892F;
          border-color: #FF892F;
          transform: rotate(90deg);
        }

        .lead-popup-header {
          padding: 28px 24px 0;
        }

        .lead-popup-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: #FF892F;
          margin-bottom: 10px;
        }

        .lead-popup-title {
          font-family: var(--font-heading, 'Baumans', sans-serif);
          font-size: 1.45rem;
          font-weight: 700;
          line-height: 1.25;
          margin: 0 0 8px;
        }
        .lead-title-accent {
          background: linear-gradient(135deg, #FF892F, #FF6B00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .lead-popup-subtitle {
          font-size: 0.82rem;
          line-height: 1.5;
          opacity: 0.8;
          margin: 0;
        }

        .lead-popup-form {
          padding: 18px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .lead-field {
          position: relative;
        }

        .lead-input {
          width: 100%;
          padding: 11px 14px;
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 0.88rem;
          font-weight: 500;
          border-radius: 12px;
          border: 1.5px solid rgba(125, 125, 125, 0.2);
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        [data-theme="dark"] .lead-input {
          background: rgba(255, 255, 255, 0.06);
          color: #F9FBE7;
        }
        :root:not([data-theme="dark"]) .lead-input,
        [data-theme="light"] .lead-input {
          background: rgba(15, 23, 42, 0.04);
          color: #0F172A;
        }
        .lead-input::placeholder {
          color: #94A3B8;
          font-weight: 400;
        }
        .lead-input:focus {
          border-color: #FF892F;
          box-shadow: 0 0 0 3px rgba(255, 137, 47, 0.12);
        }

        .lead-input-icon-wrap {
          position: relative;
        }
        .lead-input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #FF892F;
          pointer-events: none;
        }
        .lead-input.with-icon {
          padding-left: 36px;
        }

        .lead-error {
          font-size: 0.78rem;
          color: #EF4444;
          margin: 0;
          font-weight: 600;
        }

        .lead-submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 13px 20px;
          background: linear-gradient(135deg, #FF892F 0%, #E66F12 100%);
          border: none;
          border-radius: 14px;
          color: #FFFFFF;
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 0.95rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 16px rgba(255, 137, 47, 0.3);
          margin-top: 4px;
        }
        .lead-submit-btn:hover {
          background: linear-gradient(135deg, #FF9848 0%, #FF6B00 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(255, 137, 47, 0.4);
        }
        .lead-submit-btn:active {
          transform: translateY(0);
        }

        .lead-privacy-note {
          font-size: 0.7rem;
          text-align: center;
          opacity: 0.55;
          margin: 2px 0 0;
        }

        /* ✅ Success State */
        .lead-popup-success {
          padding: 48px 32px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .lead-success-icon {
          color: #22C55E;
          animation: leadSuccessPop 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes leadSuccessPop {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        .lead-success-title {
          font-family: var(--font-heading, 'Baumans', sans-serif);
          font-size: 1.4rem;
          margin: 0;
        }
        .lead-success-desc {
          font-size: 0.85rem;
          opacity: 0.75;
          margin: 0;
          line-height: 1.5;
        }
        .lead-success-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
          padding: 10px 18px;
          background: #25D366;
          color: #FFF;
          font-size: 0.84rem;
          font-weight: 700;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
          transition: all 0.2s ease;
        }
        .lead-success-wa-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45);
        }

        /* 📱 Mobile Responsive */
        @media (max-width: 640px) {
          .lead-popup-card {
            bottom: 12px;
            right: 12px;
            left: 12px;
            width: auto;
          }
          .lead-popup-title {
            font-size: 1.25rem;
          }
          .lead-popup-header {
            padding: 22px 18px 0;
          }
          .lead-popup-form {
            padding: 14px 18px 20px;
          }
        }
      `}</style>
    </>
  );
}
