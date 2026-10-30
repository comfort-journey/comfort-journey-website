import React, { useState } from 'react';
import { MessageCircle, PhoneCall, Compass, ChevronUp, ChevronDown, Bot } from 'lucide-react';

const basePrefix = '/';

export default function FloatingQuickDock({ onOpenQuote, onOpenAIPlanner }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMascotHovered, setIsMascotHovered] = useState(false);

  // Open AI Planner view
  const handleOpenAIPlanner = (e) => {
    e?.preventDefault();
    if (onOpenAIPlanner) {
      onOpenAIPlanner();
    } else {
      if (typeof history !== 'undefined' && history.pushState) {
        history.pushState(null, '', '/ai-planner');
        window.dispatchEvent(new PopStateEvent('popstate'));
      } else {
        window.location.href = '/ai-planner';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`quick-dock-wrapper ${isMinimized ? 'minimized' : ''}`}>
      {/* Comfort Journey Animated Comfy.ai Mascot */}
      {!isMinimized && (
        <div 
          className="comfy-mascot-dock-companion"
          onMouseEnter={() => setIsMascotHovered(true)}
          onMouseLeave={() => setIsMascotHovered(false)}
          onClick={handleOpenAIPlanner}
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
              src={`${basePrefix}mascot-default.png`} 
              alt="Comfort Journey Mascot" 
              className={`mascot-dock-img default ${isMascotHovered ? 'hidden' : 'visible'}`}
              onError={(e) => { e.currentTarget.src = 'https://www.comfortjourney.in/mascot-default.png'; }}
            />
            <img 
              src={`${basePrefix}mascot-reaction.png`} 
              alt="Comfort Journey Mascot Reacting" 
              className={`mascot-dock-img reaction ${isMascotHovered ? 'visible' : 'hidden'}`}
              onError={(e) => { e.currentTarget.src = 'https://www.comfortjourney.in/mascot-reaction.png'; }}
            />
            <span className="mascot-online-ping" />
          </div>
        </div>
      )}

      {/* Main Glass Action Dock */}
      <div className="glass-dock-card">
        {/* Action Buttons: Comfy.ai, Call, WhatsApp, Quote, Minimize */}
        <div className="dock-actions-row">
          <button
            type="button"
            className="dock-btn ai-quick-btn"
            onClick={handleOpenAIPlanner}
            title="Ask Comfy.ai Travel Assistant"
          >
            <Bot size={16} className="text-ai" />
            <span className="btn-label">Comfy.ai</span>
          </button>

          <a
            href="tel:+919203931912"
            className="dock-btn call-btn"
            title="Call Support 24/7"
          >
            <PhoneCall size={16} />
            <span className="btn-label">Call</span>
          </a>

          <a
            href="https://wa.me/919203931912?text=Hi%20Comfort%20Journey!%20I%20want%20to%20plan%20a%20personalized%20trip."
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

          {/* Minimize / Hide Dock Button */}
          <button
            type="button"
            className="dock-btn minimize-dock-btn"
            onClick={() => setIsMinimized(true)}
            title="Minimize Quick Dock"
            aria-label="Minimize Quick Dock"
          >
            <ChevronDown size={15} />
          </button>
        </div>
      </div>

      {/* Expand Pill Trigger when minimized */}
      {isMinimized && (
        <div className="dock-minimized-wrap">
          <button
            type="button"
            className="dock-expand-trigger"
            onClick={() => setIsMinimized(false)}
            aria-label="Open Quick Support"
            title="Click to expand Comfy.ai, Call, WhatsApp & Quote"
          >
            <Bot size={16} className="text-ai" />
            <span className="trigger-badge">💬 Concierge</span>
            <span className="chevron-trigger-box">
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

        /* COMFORT JOURNEY COMFY.AI ANIMATED MASCOT */
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
          background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%) !important;
          border: 1.5px solid rgba(255, 255, 255, 0.6) !important;
          color: #FFFFFF !important;
          font-weight: 800;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.55), 0 0 10px rgba(236, 72, 153, 0.35) !important;
          animation: aiBtnGlow 3s infinite ease-in-out;
        }

        @keyframes aiBtnGlow {
          0%, 100% { box-shadow: 0 4px 20px rgba(139, 92, 246, 0.55), 0 0 10px rgba(236, 72, 153, 0.35); }
          50% { box-shadow: 0 6px 24px rgba(139, 92, 246, 0.75), 0 0 16px rgba(236, 72, 153, 0.55); transform: translateY(-1px); }
        }

        .ai-quick-btn:hover {
          background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #DB2777 100%) !important;
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 28px rgba(139, 92, 246, 0.8), 0 0 20px rgba(236, 72, 153, 0.7) !important;
          color: #FFFFFF !important;
        }

        .text-ai {
          color: #FFFFFF !important;
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.8));
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
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
        }

        .quote-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .minimize-dock-btn {
          background: #0F172A !important;
          border: 1.5px solid #475569 !important;
          padding: 0.5rem 0.65rem;
          color: #F8FAFC !important;
          cursor: pointer;
          font-weight: 800;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
        }

        .minimize-dock-btn:hover {
          background: #EA580C !important;
          color: #FFFFFF !important;
          border-color: #EA580C !important;
          transform: scale(1.1);
          box-shadow: 0 4px 16px rgba(234, 88, 12, 0.6);
        }

        .dock-minimized-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .dock-expand-trigger {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.7rem 1.3rem;
          background: #0B1120 !important;
          border: 2px solid #FF892F !important;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.55), 0 0 20px rgba(255, 137, 47, 0.35) !important;
          border-radius: var(--radius-full);
          color: #FFFFFF !important;
          font-weight: 800;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .dock-expand-trigger:hover {
          background: #111C33 !important;
          transform: translateY(-2px);
          box-shadow: 0 16px 42px rgba(0, 0, 0, 0.65), 0 0 26px rgba(255, 137, 47, 0.5) !important;
        }

        .dock-expand-trigger .text-ai {
          color: #C084FC !important;
          filter: drop-shadow(0 0 6px rgba(192, 132, 252, 0.9));
        }

        .chevron-trigger-box {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 4px 7px;
          border-radius: 8px;
          background: #EA580C !important;
          border: 1px solid #F97316 !important;
          color: #FFFFFF !important;
          font-weight: bold;
          transition: all 0.2s ease;
        }

        .dock-expand-trigger:hover .chevron-trigger-box {
          background: #FF892F !important;
          transform: scale(1.08);
        }

        @media (max-width: 768px) {
          .quick-dock-wrapper {
            display: none !important;
          }
        }

        /* LIGHT THEME — Crisp, bright white glass dock */
        :root:not([data-theme="dark"]) .glass-dock-card,
        [data-theme="light"] .glass-dock-card {
          background: rgba(255, 255, 255, 0.96) !important;
          border: 1.5px solid var(--cj-line, rgba(20, 38, 74, 0.12)) !important;
          box-shadow: 0 16px 40px rgba(20, 38, 74, 0.14), 0 0 20px rgba(255, 137, 47, 0.15) !important;
        }

        :root:not([data-theme="dark"]) .mascot-speech-bubble,
        [data-theme="light"] .mascot-speech-bubble {
          background: #FFFFFF !important;
          color: #14264A !important;
          border: 1.5px solid #FF892F !important;
          box-shadow: 0 4px 18px rgba(20, 38, 74, 0.14), 0 0 12px rgba(255, 137, 47, 0.25) !important;
        }

        :root:not([data-theme="dark"]) .speech-arrow,
        [data-theme="light"] .speech-arrow {
          border-top-color: #FFFFFF !important;
        }

        :root:not([data-theme="dark"]) .quote-btn,
        [data-theme="light"] .quote-btn {
          background: #F1F5F9 !important;
          border: 1.5px solid #CBD5E1 !important;
          color: #14264A !important;
        }

        :root:not([data-theme="dark"]) .quote-btn:hover,
        [data-theme="light"] .quote-btn:hover {
          background: #E2E8F0 !important;
          border-color: #94A3B8 !important;
          color: #0F172A !important;
        }

        :root:not([data-theme="dark"]) .minimize-dock-btn,
        [data-theme="light"] .minimize-dock-btn {
          background: #F1F5F9 !important;
          border: 1.5px solid #CBD5E1 !important;
          color: #475569 !important;
          box-shadow: 0 1px 4px rgba(20, 38, 74, 0.08) !important;
        }

        :root:not([data-theme="dark"]) .minimize-dock-btn:hover,
        [data-theme="light"] .minimize-dock-btn:hover {
          background: #EA580C !important;
          border-color: #EA580C !important;
          color: #FFFFFF !important;
        }

        :root:not([data-theme="dark"]) .dock-expand-trigger,
        [data-theme="light"] .dock-expand-trigger {
          background: #FFFFFF !important;
          border: 2px solid #FF892F !important;
          color: #14264A !important;
          box-shadow: 0 12px 36px rgba(20, 38, 74, 0.15), 0 0 20px rgba(255, 137, 47, 0.25) !important;
        }

        :root:not([data-theme="dark"]) .dock-expand-trigger:hover,
        [data-theme="light"] .dock-expand-trigger:hover {
          background: #FFF8F2 !important;
        }

        :root:not([data-theme="dark"]) .mascot-online-ping,
        [data-theme="light"] .mascot-online-ping {
          border-color: #FFFFFF !important;
        }
      `}</style>
    </div>
  );
}
