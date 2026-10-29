import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function PolicyModal({ type, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content policy-modal-body" onClick={(e) => e.stopPropagation()}>
        <div className="policy-header">
          <div className="policy-title-row">
            <ShieldCheck size={24} className="text-amber" />
            <h2 className="policy-title">
              {type === 'cancellation' && 'Cancellation & 100% Refund Policy'}
              {type === 'privacy' && 'Privacy Policy & Data Security'}
              {type === 'terms' && 'Terms of VIP Booking & Travel Service'}
            </h2>
          </div>
          <button className="policy-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="policy-text-content">
          {type === 'cancellation' && (
            <>
              <h3>100% Transparency & Flexible Travel Assurance</h3>
              <p>At Comfort Journey (Est. 1992), we believe true luxury travel means complete peace of mind. We understand personal schedules can shift unexpectedly.</p>
              
              <h4>Standard Cancellation & Rescheduling Terms:</h4>
              <ul>
                <li><strong>30+ Days Prior to Departure:</strong> 100% Refund of tour package amount (excluding non-refundable airline / train ticket cancellation charges).</li>
                <li><strong>15 to 29 Days Prior to Departure:</strong> 75% Refund or 100% credit toward any future Comfort Journey package within 12 months.</li>
                <li><strong>7 to 14 Days Prior to Departure:</strong> 50% Refund or flexible rescheduling based on hotel partner availability.</li>
                <li><strong>Less than 7 Days:</strong> Case-by-case maximum refund recovery from our hotel and transport partners with zero administrative surcharge.</li>
              </ul>

              <h4>Flight & Helicopter Transfers:</h4>
              <p>Airline tickets and helicopter shuttles (e.g. Kedarnath / Titlis) are subject to direct carrier cancellation guidelines, with zero extra handling fees from Comfort Journey.</p>
            </>
          )}

          {type === 'privacy' && (
            <>
              <h3>Privacy Policy & India DPDP Act 2023 Compliance</h3>
              <p>Comfort Journey (Est. 1992) strictly safeguards the personal data and travel preferences of every client. We never sell, rent, or monetize your contact information.</p>
              <ul>
                <li><strong>What We Collect:</strong> Name, Email, Phone/WhatsApp number, travel preferences (destination, dates, guests), and hotel tier preferences.</li>
                <li><strong>How We Use It:</strong> Exclusively to plan custom itineraries, coordinate private chauffeur transfers/hotels, deliver 24/7 concierge support, and share Comfort Journey seasonal updates (with 1-click opt-out).</li>
                <li><strong>Strict Non-Sale Guarantee:</strong> We never sell, license, or trade your data with any advertising network, data broker, or third party.</li>
                <li><strong>Analytics & Cookies Disclosure:</strong> We use Google Tag Manager, Google Analytics 4 (GA4), Meta Pixel, and Microsoft Clarity strictly for traffic measurement, performance attribution, and mobile error diagnosis.</li>
                <li><strong>Your DPDP Act Rights:</strong> Right to access, correction, data erasure ("Right to be Forgotten"), and grievance redressal by emailing <code>care@comfortjourney.in</code>.</li>
                <li><strong>Designated Grievance Officer:</strong> Rishabh Mishra / Sharad Mishra (<a href="mailto:care@comfortjourney.in">care@comfortjourney.in</a> | +91 92039 31912).</li>
              </ul>
              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <a 
                  href="/privacy-policy/" 
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    if (window.history?.pushState) {
                      window.history.pushState(null, '', '/privacy-policy/');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    } else {
                      window.location.href = '/privacy-policy/';
                    }
                  }}
                  style={{ color: '#FF892F', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'underline' }}
                >
                  View Full Comprehensive Privacy Policy Page (DPDP Act) →
                </a>
              </div>
            </>
          )}

          {type === 'terms' && (
            <>
              <h3>Terms of VIP Booking & Service</h3>
              <p>Comfort Journey provides bespoke private chauffeur transfers, pre-verified 4/5-star accommodation bookings, and personal on-trip concierge services.</p>
              <ul>
                <li><strong>Transparent Pricing:</strong> All quotations include driver allowances, border permits, state taxes, toll fees, and fuel with zero hidden surcharges.</li>
                <li><strong>Flexible Payment Milestones:</strong> 20% to 30% advance token deposit to confirm inventory; balance due 10 days before departure or upon arrival meeting.</li>
                <li><strong>100% Refund Assurance:</strong> 30+ days prior = 100% refund of package amount; 15-29 days = 75% refund or 100% future credit.</li>
                <li><strong>Flight & Helicopter Transfers:</strong> Governed by carrier cancellation terms with zero handling charges added by Comfort Journey.</li>
                <li><strong>Governing Law:</strong> Governed by the laws of India with exclusive jurisdiction in Bhopal, Madhya Pradesh.</li>
              </ul>
              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <a 
                  href="/terms-and-conditions/" 
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    if (window.history?.pushState) {
                      window.history.pushState(null, '', '/terms-and-conditions/');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    } else {
                      window.location.href = '/terms-and-conditions/';
                    }
                  }}
                  style={{ color: '#FF892F', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'underline' }}
                >
                  View Full Terms & Conditions Page →
                </a>
              </div>
            </>
          )}
        </div>

        <div className="policy-footer">
          <button className="btn-primary" onClick={onClose}>
            I Understand & Agree
          </button>
        </div>
      </div>

      <style>{`
        .policy-modal-body {
          max-width: 680px;
          padding: 2rem;
        }

        .policy-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--cj-glass-border);
          margin-bottom: 1.25rem;
        }

        .policy-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .policy-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: var(--cj-text-heading);
        }

        .policy-close-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          color: var(--cj-text-body);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .policy-text-content {
          font-size: 0.92rem;
          color: var(--cj-text-muted);
          line-height: 1.7;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          max-height: 60vh;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .policy-text-content h3 {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--cj-text-heading);
        }

        .policy-text-content h4 {
          font-family: var(--font-ui);
          font-size: 1rem;
          color: var(--cj-gold-500);
          margin-top: 0.5rem;
        }

        .policy-text-content ul {
          padding-left: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .policy-footer {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--cj-glass-border);
          display: flex;
          justify-content: flex-end;
        }

        @media (max-width: 768px) {
          .modal-overlay {
            align-items: flex-end;
            padding: 0;
          }
          .policy-modal-body {
            border-radius: 20px 20px 0 0;
            max-height: 90vh;
            padding: 1.5rem 1.25rem;
          }
          .policy-footer button {
            width: 100%;
            justify-content: center;
            min-height: 48px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

