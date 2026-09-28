import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageCircle, Phone, ArrowRight, X, Heart, Star, Compass } from 'lucide-react';

/**
 * HeroMascot - "Comfy 🐺" The Official Comfort Journey Brand Buddy
 * 
 * Clean 2D mascot with:
 *  - Gentle idle breathing animation
 *  - Hover bounce effect
 *  - Click reaction wink
 *  - Brand Buddy Concierge Popover (AI Planner, Custom Quote, WhatsApp, Call)
 */
export default function HeroMascot({ heroRef, onOpenAIPlanner, onOpenQuote }) {
  const stageRef = useRef(null);

  const [isReacting, setIsReacting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBuddyModalOpen, setIsBuddyModalOpen] = useState(false);
  const [speechGreeting, setSpeechGreeting] = useState("Hi! I'm Comfy 🐺 Your Travel Buddy");

  const reactionTimerRef = useRef(null);

  // Dynamic asset URLs supporting GitHub Pages subdirectories
  const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';
  const mascotDefaultSrc = `${basePrefix}mascot-default.png`;
  const mascotReactionSrc = `${basePrefix}mascot-reaction.png`;

  // Preload assets
  useEffect(() => {
    [mascotDefaultSrc, mascotReactionSrc].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [mascotDefaultSrc, mascotReactionSrc]);

  // Click outside to close buddy popover
  useEffect(() => {
    if (!isBuddyModalOpen) return;
    const handleClickOutside = (e) => {
      if (stageRef.current && !stageRef.current.contains(e.target)) {
        setIsBuddyModalOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isBuddyModalOpen]);

  // Click on Comfy: triggers winking reaction and toggles buddy assistant popover
  const handleMascotClick = (e) => {
    e.stopPropagation();
    setIsReacting(true);
    setIsBuddyModalOpen((prev) => !prev);

    const friendlyGreetings = [
      "I'm here to help you plan! ✈️",
      "Comfort awaits! Where to next? 🏔️",
      "Your personal travel buddy since 1992! 👑",
      "Need a customized tour? Click below! 🌸"
    ];
    setSpeechGreeting(friendlyGreetings[Math.floor(Math.random() * friendlyGreetings.length)]);

    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    reactionTimerRef.current = setTimeout(() => {
      setIsReacting(false);
    }, 1000);
  };

  return (
    <div 
      ref={stageRef}
      className="hero-mascot-stage"
      aria-label="Comfy the Comfort Journey Mascot Buddy"
    >
      {/* Brand Buddy Floating Speech Pill */}
      {!isBuddyModalOpen && (
        <div 
          className={`buddy-speech-chip ${isHovered ? 'is-hovered' : ''}`}
          onClick={handleMascotClick}
          title="Click to talk to Comfy!"
        >
          <span className="buddy-chip-pulse"></span>
          <span className="buddy-chip-text">{isHovered ? "Click me! I'm your travel buddy 💬" : speechGreeting}</span>
          <div className="buddy-chip-tail" />
        </div>
      )}

      {/* Brand Buddy Interactive Concierge Popover Menu */}
      {isBuddyModalOpen && (
        <div className="buddy-concierge-popover animate-pop-in">
          <div className="buddy-popover-header">
            <div className="flex items-center gap-2">
              <span className="buddy-avatar-badge">🐺</span>
              <div>
                <div className="buddy-name-title">Comfy · Your Travel Buddy</div>
                <div className="buddy-status-sub">24/7 Live Assistance · Free & Instant</div>
              </div>
            </div>
            <button 
              type="button"
              className="buddy-close-btn" 
              onClick={(e) => {
                e.stopPropagation();
                setIsBuddyModalOpen(false);
              }}
              aria-label="Close buddy assistant"
            >
              <X size={15} />
            </button>
          </div>

          <p className="buddy-popover-desc">
            How can I make your journey extraordinary today? Pick an option or message our concierges directly:
          </p>

          <div className="buddy-action-chips-grid">
            <button
              type="button"
              className="buddy-chip-btn chip-ai"
              onClick={() => {
                setIsBuddyModalOpen(false);
                if (onOpenAIPlanner) onOpenAIPlanner();
              }}
            >
              <Sparkles size={14} className="text-orange" />
              <span>Plan Trip with Comfy.ai</span>
            </button>

            <button
              type="button"
              className="buddy-chip-btn chip-quote"
              onClick={() => {
                setIsBuddyModalOpen(false);
                if (onOpenQuote) onOpenQuote();
              }}
            >
              <Compass size={14} className="text-gold" />
              <span>Request Custom Itinerary</span>
            </button>

            <a
              href="https://wa.me/918770403315?text=Hi%20Comfy!%20I%20want%20to%20plan%20a%20luxury%20vacation%20with%20Comfort%20Journey."
              target="_blank"
              rel="noopener noreferrer"
              className="buddy-chip-btn chip-whatsapp"
              onClick={() => setIsBuddyModalOpen(false)}
            >
              <MessageCircle size={14} className="text-emerald" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="tel:+918770403315"
              className="buddy-chip-btn chip-call"
              onClick={() => setIsBuddyModalOpen(false)}
            >
              <Phone size={14} className="text-sky" />
              <span>Call Founder (+91 8770403315)</span>
            </a>
          </div>

          <div className="buddy-popover-footer">
            <span className="rating-pill">⭐ 4.92 / 5.0 (30,000+ Happy Travelers)</span>
          </div>
        </div>
      )}

      {/* Clean 2D Mascot Image */}
      <div 
        className={`mascot-2d-container ${isReacting ? 'is-reacting' : ''} ${isHovered ? 'is-hovered' : ''}`}
        onClick={handleMascotClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="Hi! I'm Comfy! Click me to plan your trip!"
      >
        <img
          src={isReacting ? mascotReactionSrc : mascotDefaultSrc}
          alt="Comfy Wolf Mascot"
          className="mascot-2d-img"
          draggable="false"
          onError={(e) => {
            e.currentTarget.src = isReacting ? './mascot-reaction.png' : './mascot-default.png';
          }}
        />
        {/* Soft contact shadow */}
        <div className="mascot-2d-shadow" />
      </div>

      <style>{`
        .hero-mascot-stage {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          width: 100%;
          height: 115px;
          margin-bottom: -15px;
          z-index: 15;
          user-select: none;
        }

        /* Clean 2D Mascot Container */
        .mascot-2d-container {
          position: relative;
          width: clamp(125px, 14.5vw, 160px);
          height: clamp(110px, 12.8vw, 140px);
          cursor: pointer;
          animation: buddyBreathing 4.5s ease-in-out infinite;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .mascot-2d-container.is-hovered {
          transform: translateY(-4px) scale(1.05);
        }

        .mascot-2d-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          pointer-events: none;
          filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.45));
          transition: filter 0.3s ease;
        }

        .mascot-2d-container.is-hovered .mascot-2d-img {
          filter: drop-shadow(0 12px 24px rgba(255, 137, 47, 0.35));
        }

        /* Subtle Lifelike Breathing Physics */
        @keyframes buddyBreathing {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-2px) scale(1.015);
          }
        }

        /* Click reaction cheerful bounce */
        .mascot-2d-container.is-reacting {
          animation: mascotCheerBounce 0.75s cubic-bezier(0.25, 1.4, 0.5, 1);
        }

        @keyframes mascotCheerBounce {
          0% { transform: scale(1) translateY(0); }
          30% { transform: scale(0.92) translateY(8px); }
          65% { transform: scale(1.06) translateY(-6px); }
          100% { transform: scale(1) translateY(0); }
        }

        /* Soft contact drop shadow under mascot */
        .mascot-2d-shadow {
          position: absolute;
          bottom: 2px;
          left: 10%;
          width: 80%;
          height: 8px;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 70%);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.85;
        }

        /* Floating Speech Chip */
        .buddy-speech-chip {
          position: absolute;
          top: 15px;
          left: calc(50% + 78px);
          background: rgba(15, 23, 42, 0.94);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 137, 47, 0.5);
          color: #FFF;
          font-size: 0.76rem;
          font-weight: 600;
          padding: 0.38rem 0.85rem;
          border-radius: 16px;
          white-space: nowrap;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45), 0 0 16px rgba(255, 137, 47, 0.25);
          cursor: pointer;
          z-index: 25;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .buddy-speech-chip:hover {
          transform: scale(1.04);
          border-color: #FF892F;
        }

        .buddy-chip-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
          animation: pulseDot 1.8s infinite;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        .buddy-chip-tail {
          position: absolute;
          left: -5px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 8px;
          height: 8px;
          background: rgba(15, 23, 42, 0.94);
          border-left: 1px solid rgba(255, 137, 47, 0.5);
          border-bottom: 1px solid rgba(255, 137, 47, 0.5);
        }

        /* Interactive Brand Buddy Concierge Popover */
        .buddy-concierge-popover {
          position: absolute;
          top: 15px;
          left: calc(50% + 78px);
          width: 320px;
          background: rgba(11, 17, 32, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 137, 47, 0.6);
          border-radius: 20px;
          padding: 1.15rem;
          color: #FFF;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.65), 0 0 30px rgba(255, 137, 47, 0.25);
          z-index: 9999;
          pointer-events: auto;
        }

        .buddy-popover-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 0.65rem;
          margin-bottom: 0.65rem;
        }

        .buddy-avatar-badge {
          font-size: 1.4rem;
          background: rgba(255, 137, 47, 0.2);
          border: 1px solid rgba(255, 137, 47, 0.4);
          border-radius: 12px;
          padding: 0.2rem 0.4rem;
        }

        .buddy-name-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: #FFF;
        }

        .buddy-status-sub {
          font-size: 0.7rem;
          color: #10B981;
          font-weight: 500;
        }

        .buddy-close-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #94A3B8;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .buddy-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #FFF;
        }

        .buddy-popover-desc {
          font-size: 0.75rem;
          color: #CBD5E1;
          line-height: 1.4;
          margin: 0 0 0.85rem 0;
        }

        .buddy-action-chips-grid {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .buddy-chip-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(30, 41, 59, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0.5rem 0.75rem;
          color: #F1F5F9;
          font-size: 0.78rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.2, 0, 0.2, 1);
        }

        .buddy-chip-btn:hover {
          background: rgba(255, 137, 47, 0.18);
          border-color: rgba(255, 137, 47, 0.5);
          transform: translateX(3px);
          color: #FFF;
        }

        .buddy-popover-footer {
          margin-top: 0.8rem;
          padding-top: 0.6rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          text-align: center;
        }

        .rating-pill {
          font-size: 0.7rem;
          color: #FFB800;
          font-weight: 600;
        }

        .animate-pop-in {
          animation: popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes popIn {
          from { opacity: 0; transform: translateY(8px) scale(0.92); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Mobile Optimization */
        @media (max-width: 768px) {
          .hero-mascot-stage {
            height: 95px;
            margin-bottom: -12px;
          }

          .mascot-2d-container {
            animation: none !important;
          }

          .buddy-speech-chip {
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.7rem;
            padding: 0.25rem 0.6rem;
          }

          .buddy-chip-tail {
            left: 50%;
            top: auto;
            bottom: -4px;
            transform: translateX(-50%) rotate(45deg);
            border-left: none;
            border-top: none;
            border-right: 1px solid rgba(255, 137, 47, 0.5);
            border-bottom: 1px solid rgba(255, 137, 47, 0.5);
          }

          .buddy-concierge-popover {
            top: -190px;
            left: 50%;
            transform: translateX(-50%);
            width: 290px;
          }
        }
      `}</style>
    </div>
  );
}
