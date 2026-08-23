import React from 'react';
import { X, ShieldCheck, RefreshCw, FileText } from 'lucide-react';

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
              <h3>Privacy & Traveler Confidentiality</h3>
              <p>Comfort Journey strictly safeguards the personal data and travel preferences of every client. We never sell, rent, or monetize your contact information.</p>
              <ul>
                <li><strong>Data Collected:</strong> Traveler names, contact number, passport/ID details exclusively for flight booking, hotel check-ins, and visa processing.</li>
                <li><strong>WhatsApp Security:</strong> End-to-end encrypted direct communication between you and your dedicated VIP travel designer.</li>
                <li><strong>Payment Safety:</strong> Encrypted multi-currency payment gateway integrations with verified bank standards.</li>
              </ul>
            </>
          )}

          {type === 'terms' && (
            <>
              <h3>Terms of VIP Service</h3>
              <p>Comfort Journey provides bespoke private chauffeur transfers, pre-verified 4/5-star accommodation bookings, and personal on-trip concierge services.</p>
              <ul>
                <li>All quotations are inclusive of mentioned taxes, driver allowances, toll taxes, and fuel.</li>
                <li>Monument entry tickets, VIP passes, and ferry tickets are confirmed upon receipt of booking token.</li>
                <li>Our 24/7 VIP Concierge Desk (+91 8770403315) remains active throughout your entire travel duration.</li>
              </ul>
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
          color: #FFFFFF;
        }

        .policy-close-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          color: #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .policy-text-content {
          font-size: 0.92rem;
          color: #CBD5E1;
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
          color: #FFFFFF;
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
