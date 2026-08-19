import React, { useState, useEffect } from 'react';
import { LIVE_BOOKINGS_FEED } from '../data/toursData';
import { CheckCircle2, Sparkles, X, MapPin } from 'lucide-react';

export default function LiveBookingToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show initial toast after 4 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 4000);

    // Loop through feed items
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % LIVE_BOOKINGS_FEED.length);
        setVisible(true);
      }, 800);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const booking = LIVE_BOOKINGS_FEED[currentIndex];

  return (
    <div className="live-toast-wrapper">
      <div className="glass-card-dark live-toast-card">
        <div className="toast-icon-pulse">
          <Sparkles size={16} className="text-primary" />
        </div>

        <div className="toast-text-block">
          <div className="toast-top-row">
            <span className="user-info"><strong>{booking.name}</strong> from {booking.from}</span>
            <span className="time-ago">{booking.time}</span>
          </div>
          <p className="tour-booked">
            <CheckCircle2 size={13} className="text-accent" />
            <span>Booked <strong>{booking.tour}</strong></span>
          </p>
        </div>

        <button 
          className="toast-close"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss Notification"
        >
          <X size={14} />
        </button>
      </div>

      <style>{`
        .live-toast-wrapper {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 99995;
          animation: slideInToast 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .live-toast-card {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.85rem 1.15rem;
          border-radius: var(--radius-md);
          background: rgba(15, 23, 42, 0.92);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 107, 0, 0.3);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.45), 0 0 15px rgba(255, 107, 0, 0.15);
          max-width: 380px;
        }

        .toast-icon-pulse {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 107, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .toast-text-block {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          flex: 1;
        }

        .toast-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
        }

        .user-info {
          font-size: 0.82rem;
          color: #FFFFFF;
        }

        .time-ago {
          font-size: 0.7rem;
          color: #94A3B8;
        }

        .tour-booked {
          font-size: 0.78rem;
          color: #E2E8F0;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          line-height: 1.3;
        }

        .tour-booked strong {
          color: #FFB800;
        }

        .toast-close {
          color: #64748B;
          padding: 0.2rem;
          transition: color 0.2s ease;
        }

        .toast-close:hover {
          color: #FFFFFF;
        }

        @keyframes slideInToast {
          from {
            transform: translateX(-30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @media (max-width: 600px) {
          .live-toast-wrapper {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
