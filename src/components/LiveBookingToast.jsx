import React, { useState, useEffect } from 'react';
import { siteSettingsService, EVENT_SETTINGS_UPDATED } from '../services/siteSettingsService';
import { CheckCircle2, Sparkles, X, MapPin } from 'lucide-react';

export default function LiveBookingToast() {
  const [toastConfig, setToastConfig] = useState(() => ({ ...siteSettingsService.getLiveToasts() }));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Listen for live CMS updates
  useEffect(() => {
    const handleUpdate = (e) => {
      const updated = e.detail?.liveToasts || siteSettingsService.getLiveToasts();
      setToastConfig({
        ...updated,
        bookings: Array.isArray(updated.bookings) ? [...updated.bookings] : []
      });
      if (updated.enabled) {
        setDismissed(false);
      }
    };
    window.addEventListener(EVENT_SETTINGS_UPDATED, handleUpdate);
    return () => window.removeEventListener(EVENT_SETTINGS_UPDATED, handleUpdate);
  }, []);

  const bookings = toastConfig.bookings || [];
  const intervalMs = (toastConfig.intervalSeconds || 12) * 1000;
  const initialDelayMs = (toastConfig.initialDelaySeconds || 4) * 1000;

  useEffect(() => {
    if (dismissed || !toastConfig.enabled || bookings.length === 0) {
      setVisible(false);
      return;
    }

    // Show initial toast
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, initialDelayMs);

    // Loop through feed items
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % bookings.length);
        setVisible(true);
      }, 800);
    }, intervalMs);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed, toastConfig.enabled, bookings.length, intervalMs, initialDelayMs]);

  if (dismissed || !visible || !toastConfig.enabled || bookings.length === 0) return null;

  const booking = bookings[currentIndex % bookings.length];
  if (!booking) return null;

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
          color: var(--cj-text-heading);
        }

        .time-ago {
          font-size: 0.7rem;
          color: var(--cj-text-muted);
        }

        .tour-booked {
          font-size: 0.78rem;
          color: var(--cj-text-body);
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
          color: var(--cj-text-heading);
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

        @media (max-width: 900px) {
          .live-toast-wrapper {
            display: none !important;
          }
        }

        :root:not([data-theme="dark"]) .live-toast-card,
        [data-theme="light"] .live-toast-card {
          background: #FFFFFF !important;
          border-color: var(--cj-line, #E8E0CF) !important;
          box-shadow: 0 16px 36px rgba(20, 38, 74, 0.16), 0 2px 8px rgba(20, 38, 74, 0.08) !important;
        }
        :root:not([data-theme="dark"]) .user-info,
        [data-theme="light"] .user-info {
          color: #14264A !important;
          font-weight: 600;
        }
        :root:not([data-theme="dark"]) .user-info strong,
        [data-theme="light"] .user-info strong {
          color: #0A192F !important;
          font-weight: 800;
        }
        :root:not([data-theme="dark"]) .time-ago,
        [data-theme="light"] .time-ago {
          color: #64748B !important;
          font-weight: 600;
        }
        :root:not([data-theme="dark"]) .tour-booked,
        [data-theme="light"] .tour-booked {
          color: #334155 !important;
        }
        :root:not([data-theme="dark"]) .tour-booked strong,
        [data-theme="light"] .tour-booked strong {
          color: var(--cj-cta-deep, #D65A00) !important;
          font-weight: 800;
        }
        :root:not([data-theme="dark"]) .toast-close,
        [data-theme="light"] .toast-close {
          color: #64748B !important;
        }
        :root:not([data-theme="dark"]) .toast-close:hover,
        [data-theme="light"] .toast-close:hover {
          color: #0F172A !important;
        }

        [data-theme="dark"] .live-toast-card {
          background: rgba(15, 23, 42, 0.95) !important;
          border-color: rgba(255, 137, 47, 0.35) !important;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5) !important;
        }
        [data-theme="dark"] .user-info {
          color: #F8FAFC !important;
        }
        [data-theme="dark"] .user-info strong {
          color: #FFFFFF !important;
          font-weight: 800;
        }
        [data-theme="dark"] .time-ago {
          color: #94A3B8 !important;
        }
        [data-theme="dark"] .tour-booked {
          color: #CBD5E1 !important;
        }
        [data-theme="dark"] .tour-booked strong {
          color: #FFB800 !important;
          font-weight: 800;
        }
      `}</style>
    </div>
  );
}

