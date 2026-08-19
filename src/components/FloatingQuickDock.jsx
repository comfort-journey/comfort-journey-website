import React, { useState, useEffect } from 'react';
import { MessageCircle, PhoneCall, Compass, ChevronUp, Sparkles } from 'lucide-react';

export default function FloatingQuickDock({ onOpenQuote, onOpenAIPlanner }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 300 && currentScrollY > lastScrollY) {
        setIsMinimized(true);
      } else if (currentScrollY < lastScrollY - 10 || currentScrollY < 200) {
        setIsMinimized(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`quick-dock-wrapper ${isMinimized ? 'minimized' : ''}`}>
      <div className="glass-dock-card">
        {/* Action Buttons */}
        <div className="dock-actions-row">
          <button
            type="button"
            className="dock-btn ai-quick-btn"
            onClick={onOpenAIPlanner}
            title="AI Travel Assistant"
          >
            <Sparkles size={16} className="text-ai" />
            <span className="btn-label">AI Plan</span>
          </button>

          <a
            href="tel:+918770403315"
            className="dock-btn call-btn"
            title="Call Support 24/7"
          >
            <PhoneCall size={16} />
            <span className="btn-label">Call</span>
          </a>

          <a
            href="https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I%20want%20to%20plan%20a%20luxury%20custom%20trip."
            target="_blank"
            rel="noopener noreferrer"
            className="dock-btn whatsapp-btn"
            title="Chat on WhatsApp"
          >
            <MessageCircle size={16} />
            <span className="btn-label">WhatsApp</span>
          </a>

          <button
            type="button"
            className="dock-btn quote-btn"
            onClick={onOpenQuote}
            title="Request Custom Quote"
          >
            <Compass size={16} />
            <span className="btn-label">Quote</span>
          </button>
        </div>
      </div>

      {/* Expand Pill Trigger when minimized */}
      {isMinimized && (
        <button
          className="dock-expand-trigger"
          onClick={() => setIsMinimized(false)}
          aria-label="Expand Quick Desk"
        >
          <Sparkles size={16} className="text-primary" />
          <span className="trigger-badge">Need Trip Help?</span>
          <ChevronUp size={14} />
        </button>
      )}

      <style>{`
        .quick-dock-wrapper {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 99990;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-dock-card {
          background: rgba(7, 11, 20, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 107, 0, 0.3);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5), 0 0 25px rgba(255, 107, 0, 0.15);
          border-radius: var(--radius-full);
          padding: 0.5rem 0.65rem;
          display: flex;
          transform: scale(1);
          opacity: 1;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .quick-dock-wrapper.minimized .glass-dock-card {
          transform: translateY(20px) scale(0.9);
          opacity: 0;
          pointer-events: none;
          position: absolute;
          bottom: 0;
          right: 0;
        }

        .dock-actions-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .dock-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-full);
          font-weight: 700;
          font-size: 0.82rem;
          color: #FFFFFF;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }

        .ai-quick-btn {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3));
          border: 1px solid rgba(192, 132, 252, 0.5);
          color: #F3E8FF;
        }

        .ai-quick-btn:hover {
          background: linear-gradient(135deg, #8B5CF6, #EC4899);
          transform: translateY(-2px);
          color: #FFFFFF;
        }

        .text-ai {
          color: #C084FC;
        }

        .call-btn {
          background: linear-gradient(135deg, #FF6B00, #D95300);
          box-shadow: 0 4px 14px rgba(255, 107, 0, 0.3);
        }

        .call-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 107, 0, 0.45);
        }

        .whatsapp-btn {
          background: linear-gradient(135deg, #25D366, #128C7E);
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);
        }

        .whatsapp-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.45);
        }

        .quote-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .quote-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .dock-expand-trigger {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1.1rem;
          background: rgba(7, 11, 20, 0.95);
          backdrop-filter: blur(16px);
          border: 1px solid var(--color-primary);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          border-radius: var(--radius-full);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.82rem;
          animation: floatBounce 2.5s infinite ease-in-out;
        }

        @keyframes floatBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @media (max-width: 600px) {
          .quick-dock-wrapper {
            bottom: 16px;
            right: 12px;
            left: 12px;
          }
          .glass-dock-card {
            width: 100%;
            padding: 0.4rem 0.5rem;
          }
          .dock-actions-row {
            width: 100%;
            justify-content: space-between;
          }
          .dock-btn {
            flex: 1;
            justify-content: center;
            padding: 0.5rem 0.35rem;
            font-size: 0.76rem;
          }
        }
      `}</style>
    </div>
  );
}
