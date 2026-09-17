import React, { useState, useEffect } from 'react';
import { MessageCircle, PhoneCall, Compass, ChevronUp, Bot } from 'lucide-react';

const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';

export default function FloatingQuickDock({ onOpenQuote, onOpenAIPlanner }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMascotHovered, setIsMascotHovered] = useState(false);

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
      {/* Pickyourtrail-style Cute Animated Wolf Mascot */}
      <div 
        className="comfy-mascot-dock-companion"
        onMouseEnter={() => setIsMascotHovered(true)}
        onMouseLeave={() => setIsMascotHovered(false)}
        onClick={onOpenAIPlanner}
        title="Hi! I am Comfy.ai. Click me to plan your dream vacation!"
      >
        <div className="mascot-speech-bubble">
          <span className="speech-text">
            {isMascotHovered ? "Let's explore! ✈️" : "Ask Comfy.ai 💬"}
          </span>
          <div className="speech-arrow" />
        </div>

        <div className="mascot-avatar-container">
          <img 
            src={`${basePrefix}mascot-default-cropped.png`} 
            alt="Comfort Journey Mascot" 
            className={`mascot-dock-img default ${isMascotHovered ? 'hidden' : 'visible'}`}
            onError={(e) => { e.currentTarget.src = './mascot-default.png'; }}
          />
          <img 
            src={`${basePrefix}mascot-reaction-cropped.png`} 
            alt="Comfort Journey Mascot Reacting" 
            className={`mascot-dock-img reaction ${isMascotHovered ? 'visible' : 'hidden'}`}
            onError={(e) => { e.currentTarget.src = './mascot-reaction.png'; }}
          />
          <span className="mascot-online-ping" />
        </div>
      </div>

      <div className="glass-dock-card">
        {/* Action Buttons */}
        <div className="dock-actions-row">
          <button
            type="button"
            className="dock-btn ai-quick-btn"
            onClick={onOpenAIPlanner}
            title="Ask Comfy.ai Travel Assistant"
          >
            <Bot size={16} className="text-ai" />
            <span className="btn-label">Comfy.ai</span>
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
            href="https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I%20want%20to%20plan%20a%20personalized%20trip."
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
        <div className="dock-minimized-wrap">
          <button
            className="dock-expand-trigger"
            onClick={onOpenAIPlanner}
            aria-label="Ask Comfy.ai"
          >
            <Bot size={15} className="text-primary" />
            <span className="trigger-badge">Ask Comfy.ai</span>
            <span 
              className="chevron-trigger-box"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(false);
              }}
              title="Expand all quick contact options"
            >
              <ChevronUp size={14} />
            </span>
          </button>
        </div>
      )}

      <style>{`
        .quick-dock-wrapper {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 99990;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        /* PICKYOURTRAIL-STYLE CUTE ANIMATED MASCOT */
        .comfy-mascot-dock-companion {
          position: relative;
          margin-bottom: -10px;
          margin-right: 18px;
          z-index: 99992;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: comfyMascotBob 3s ease-in-out infinite;
          transform-origin: bottom center;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .comfy-mascot-dock-companion:hover {
          transform: translateY(-4px) scale(1.08);
        }

        @keyframes comfyMascotBob {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-5px) rotate(-2deg);
          }
          50% {
            transform: translateY(-2px) rotate(1deg);
          }
          75% {
            transform: translateY(-7px) rotate(2deg);
          }
        }

        /* Speech Bubble */
        .mascot-speech-bubble {
          background: #001233;
          color: #FFFFFF;
          border: 1px solid rgba(255, 137, 47, 0.5);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4), 0 0 10px rgba(255, 137, 47, 0.2);
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.72rem;
          font-weight: 700;
          white-space: nowrap;
          margin-bottom: 4px;
          position: relative;
          pointer-events: none;
          letter-spacing: 0.02em;
          animation: bubblePulse 2.5s infinite ease-in-out;
        }

        @keyframes bubblePulse {
          0%, 100% { opacity: 0.95; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }

        .speech-arrow {
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid #001233;
        }

        /* Avatar Container with Mascot Images */
        .mascot-avatar-container {
          position: relative;
          width: 58px;
          height: 58px;
          filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.45));
        }

        .mascot-dock-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: opacity 0.2s ease, transform 0.2s ease;
          position: absolute;
          top: 0;
          left: 0;
        }

        .mascot-dock-img.visible {
          opacity: 1;
          transform: scale(1);
        }

        .mascot-dock-img.hidden {
          opacity: 0;
          transform: scale(0.92);
          pointer-events: none;
        }

        .mascot-online-ping {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 12px;
          height: 12px;
          background: #10B981;
          border: 2px solid #001233;
          border-radius: 50%;
          box-shadow: 0 0 8px #10B981;
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

        .dock-minimized-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .dock-expand-trigger {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.1rem;
          background: rgba(7, 11, 20, 0.95);
          backdrop-filter: blur(16px);
          border: 1px solid var(--color-primary);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          border-radius: var(--radius-full);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.84rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .dock-expand-trigger:hover {
          background: #001A4D;
          border-color: #FFA559;
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(255, 107, 0, 0.25);
        }

        .chevron-trigger-box {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 2px 4px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.1);
          transition: background 0.2s ease;
        }

        .chevron-trigger-box:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        @media (max-width: 768px) {
          .quick-dock-wrapper {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 99990;
            transform: none !important;
            opacity: 1 !important;
          }
          .comfy-mascot-dock-companion {
            display: none !important;
          }
          .quick-dock-wrapper.minimized .glass-dock-card {
            transform: none !important;
            opacity: 1 !important;
            pointer-events: auto !important;
            position: static !important;
          }
          .dock-expand-trigger {
            display: none !important;
          }
          .glass-dock-card {
            border-radius: 20px 20px 0 0;
            border-bottom: none;
            padding: 0.65rem 0.75rem calc(0.65rem + env(safe-area-inset-bottom, 0px)) 0.75rem;
            background: rgba(0, 18, 51, 0.98);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border-top: 1px solid rgba(255, 137, 47, 0.4);
            box-shadow: 0 -10px 35px rgba(0, 0, 0, 0.7);
          }
          .dock-actions-row {
            width: 100%;
            gap: 0.45rem;
            justify-content: space-between;
          }
          .dock-btn {
            flex: 1;
            min-height: 48px;
            padding: 0.45rem 0.25rem;
            font-size: 0.78rem;
            font-weight: 800;
            border-radius: var(--radius-md);
            flex-direction: column;
            gap: 0.2rem;
            justify-content: center;
          }
          .dock-btn .btn-label {
            font-size: 0.7rem;
            letter-spacing: 0.02em;
          }
        }
      `}</style>
    </div>
  );
}
