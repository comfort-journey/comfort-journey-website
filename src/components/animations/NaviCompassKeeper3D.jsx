import React, { useEffect, useRef, useState } from 'react';
import { Compass, Sparkles, MessageSquare, ArrowUpRight, X, ShieldCheck } from 'lucide-react';

const CONCIERGE_TIPS = [
  { text: 'Kashmir snowfall season starting — book Gulmarg chalets early!', tag: '🏔️ Peak Alert' },
  { text: '3 private overwater villas left for Maldives seasonal departure.', tag: '🏝️ VIP Stays' },
  { text: 'Kerala monsoon wellness retreats now have tailor-made discounts.', tag: '🌴 Wellness' },
  { text: 'Ask our AI Trip Planner for a 6-day Swiss Alps custom route!', tag: '✨ AI Concierge' }
];

export default function NaviCompassKeeper3D({ onOpenAIPlanner, onOpenQuote }) {
  const containerRef = useRef(null);
  const compassFaceRef = useRef(null);
  const needleRef = useRef(null);
  const glareRef = useRef(null);

  const [currentTipIdx, setCurrentTipIdx] = useState(0);
  const [isBubbleOpen, setIsBubbleOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Rotate tips periodically
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIdx((prev) => (prev + 1) % CONCIERGE_TIPS.length);
    }, 9000);
    return () => clearInterval(tipInterval);
  }, []);

  // 120+ FPS Hardware-Accelerated Gaze & Cursor Tracking (0 React re-renders)
  useEffect(() => {
    let animationFrameId;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let currentNeedleAngle = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateGaze = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        // Angle for compass needle
        const targetNeedleAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

        // Clamped 15-degree look-at tilt for 3D face
        const maxTilt = 15;
        const targetRotateY = Math.max(Math.min((deltaX / (window.innerWidth / 2)) * maxTilt, maxTilt), -maxTilt);
        const targetRotateX = Math.max(Math.min((-deltaY / (window.innerHeight / 2)) * maxTilt, maxTilt), -maxTilt);

        // 0.1 Damping effect (Lerp) for ultra-smooth 120 FPS motion
        currentRotateX += (targetRotateX - currentRotateX) * 0.1;
        currentRotateY += (targetRotateY - currentRotateY) * 0.1;

        // Needle angle smoothing with circular wrap-around
        let diff = (targetNeedleAngle - currentNeedleAngle) % 360;
        if (diff < -180) diff += 360;
        if (diff > 180) diff -= 360;
        currentNeedleAngle += diff * 0.1;

        // Direct DOM mutation for 120 FPS rendering
        if (compassFaceRef.current) {
          compassFaceRef.current.style.transform = `perspective(600px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) translateZ(10px)`;
        }

        if (needleRef.current) {
          needleRef.current.style.transform = `rotate(${currentNeedleAngle.toFixed(2)}deg) translateZ(14px)`;
        }

        if (glareRef.current) {
          const glareX = 50 + (currentRotateY / maxTilt) * 35;
          const glareY = 50 - (currentRotateX / maxTilt) * 35;
          glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 137, 47, 0.15) 45%, transparent 75%)`;
        }
      }

      animationFrameId = requestAnimationFrame(updateGaze);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateGaze);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const activeTip = CONCIERGE_TIPS[currentTipIdx];

  return (
    <aside
      ref={containerRef}
      className={`navi-3d-keeper-root ${isExpanded ? 'expanded' : ''}`}
      aria-label="Navi, The 3D Compass Keeper Concierge"
    >
      {/* Interactive Concierge Speech Bubble / Live Radar Insight */}
      {isBubbleOpen && (
        <div className="navi-insight-bubble">
          <div className="bubble-top">
            <span className="bubble-tag">{activeTip.tag}</span>
            <button
              type="button"
              className="bubble-close-btn"
              onClick={() => setIsBubbleOpen(false)}
              aria-label="Dismiss insight"
            >
              <X size={12} />
            </button>
          </div>
          <p className="bubble-text">{activeTip.text}</p>
          <div className="bubble-actions">
            <button
              type="button"
              className="bubble-action-btn btn-3d-tactile"
              onClick={onOpenAIPlanner}
            >
              <Sparkles size={11} />
              <span>Ask AI Trip Planner</span>
            </button>
          </div>
          <div className="bubble-tail" />
        </div>
      )}

      {/* 3D Physical Compass Keeper Artifact with 120 FPS Gaze & Amber Glint */}
      <div
        className="navi-compass-avatar"
        onClick={() => {
          setIsBubbleOpen(true);
          setIsExpanded(!isExpanded);
        }}
        title="Navi • The Compass Keeper (Click to toggle Concierge Desk)"
      >
        {/* Ambient Ring Glow */}
        <div className="compass-ambient-glow" />

        {/* 3D Beveled Brass & Obsidian Compass Housing */}
        <div ref={compassFaceRef} className="compass-face-3d">
          {/* Specular Refractive Glare Layer */}
          <div ref={glareRef} className="compass-specular-glare" />

          {/* Outer Roman Numerals & Degree Tick Marks Ring */}
          <svg className="compass-ticks-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255, 137, 47, 0.4)" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(218, 245, 97, 0.25)" strokeWidth="0.75" strokeDasharray="1.5 3" />
            {/* Cardinal Markers */}
            <text x="50" y="14" textAnchor="middle" fill="#FF892F" fontSize="6.5" fontWeight="900">N</text>
            <text x="88" y="52.5" textAnchor="middle" fill="#DAF561" fontSize="5.5" fontWeight="700">E</text>
            <text x="50" y="91" textAnchor="middle" fill="#93B2D2" fontSize="5.5" fontWeight="700">S</text>
            <text x="12" y="52.5" textAnchor="middle" fill="#DAF561" fontSize="5.5" fontWeight="700">W</text>
          </svg>

          {/* Glowing Gaze Compass Needle (Tracks Cursor Angle) */}
          <div ref={needleRef} className="compass-gaze-needle">
            <div className="needle-north-blade" />
            <div className="needle-south-blade" />
            <div className="needle-center-gem" />
          </div>

          {/* Inner Concierge Shield Core */}
          <div className="compass-inner-core">
            <ShieldCheck size={14} className="text-amber-core" />
          </div>
        </div>

        {/* Live Status Indicator Pill */}
        <div className="navi-live-status">
          <span className="status-dot-pulse" />
          <span className="status-label">NAVI 3D</span>
        </div>
      </div>

      {/* Expanded Luxury Concierge Quick Panel */}
      {isExpanded && (
        <div className="navi-quick-panel glass-panel">
          <div className="panel-header">
            <div className="header-title">
              <Compass size={16} className="text-amber" />
              <strong>Navi Concierge Desk</strong>
            </div>
            <button
              type="button"
              className="panel-close-btn"
              onClick={() => setIsExpanded(false)}
            >
              <X size={14} />
            </button>
          </div>

          <p className="panel-sub">
            Your personal journey designer tracking 2,000+ routes in real-time.
          </p>

          <div className="panel-btn-grid">
            <button
              type="button"
              className="panel-btn btn-3d-tactile"
              onClick={() => {
                setIsExpanded(false);
                if (onOpenAIPlanner) onOpenAIPlanner();
              }}
            >
              <Sparkles size={14} className="text-aqua" />
              <span>Launch AI Planner</span>
              <ArrowUpRight size={13} />
            </button>

            <button
              type="button"
              className="panel-btn btn-3d-tactile"
              onClick={() => {
                setIsExpanded(false);
                if (onOpenQuote) onOpenQuote();
              }}
            >
              <MessageSquare size={14} className="text-amber" />
              <span>Book Direct Concierge</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .navi-3d-keeper-root {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9980;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          user-select: none;
        }

        /* 1. Speech Bubble */
        .navi-insight-bubble {
          position: relative;
          background: rgba(0, 29, 81, 0.92);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 137, 47, 0.4);
          border-radius: 16px;
          padding: 12px 14px;
          max-width: 270px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 137, 47, 0.15);
          animation: luxuryScaleFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          color: #F9FBE7;
        }

        .bubble-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .bubble-tag {
          font-family: var(--font-ui, sans-serif);
          font-size: 0.68rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #FF892F;
        }

        .bubble-close-btn {
          background: none;
          border: none;
          color: #94A3B8;
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
        }

        .bubble-close-btn:hover {
          color: #FFFFFF;
        }

        .bubble-text {
          font-family: var(--font-ui, sans-serif);
          font-size: 0.78rem;
          line-height: 1.4;
          color: #E2E8F0;
          margin-bottom: 8px;
        }

        .bubble-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: linear-gradient(135deg, rgba(255, 137, 47, 0.25), rgba(218, 245, 97, 0.2));
          border: 1px solid rgba(255, 137, 47, 0.5);
          color: #F9FBE7;
          font-family: var(--font-ui, sans-serif);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 9999px;
          cursor: pointer;
        }

        .bubble-tail {
          position: absolute;
          bottom: -7px;
          right: 28px;
          width: 14px;
          height: 14px;
          background: rgba(0, 29, 81, 0.92);
          border-right: 1px solid rgba(255, 137, 47, 0.4);
          border-bottom: 1px solid rgba(255, 137, 47, 0.4);
          transform: rotate(45deg);
        }

        /* 2. 3D Compass Avatar */
        .navi-compass-avatar {
          position: relative;
          width: 66px;
          height: 66px;
          cursor: pointer;
          perspective: 800px;
          transform-style: preserve-3d;
        }

        .compass-ambient-glow {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 137, 47, 0.35) 0%, rgba(111, 230, 252, 0.15) 50%, transparent 75%);
          filter: blur(8px);
          animation: pulse 3s infinite alternate;
          pointer-events: none;
        }

        .compass-face-3d {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(145deg, #052669 0%, #001233 70%, #00091A 100%);
          border: 2px solid #FF892F;
          box-shadow: 
            0 10px 25px rgba(0, 0, 0, 0.6),
            0 0 15px rgba(255, 137, 47, 0.4),
            inset 0 2px 4px rgba(255, 255, 255, 0.3),
            inset 0 -2px 6px rgba(0, 0, 0, 0.7);
          transform-style: preserve-3d;
          will-change: transform;
          transition: border-color 0.2s ease;
        }

        .navi-compass-avatar:hover .compass-face-3d {
          border-color: #DAF561;
          box-shadow: 
            0 14px 30px rgba(0, 0, 0, 0.7),
            0 0 22px rgba(218, 245, 97, 0.5),
            inset 0 2px 4px rgba(255, 255, 255, 0.4);
        }

        .compass-specular-glare {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          pointer-events: none;
          mix-blend-mode: overlay;
          z-index: 4;
        }

        .compass-ticks-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .compass-gaze-needle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 48px;
          margin-top: -24px;
          margin-left: -3px;
          z-index: 2;
          transform-origin: 50% 50%;
          will-change: transform;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        .needle-north-blade {
          width: 0;
          height: 0;
          border-left: 3px solid transparent;
          border-right: 3px solid transparent;
          border-bottom: 22px solid #FF892F;
          filter: drop-shadow(0 0 6px rgba(255, 137, 47, 0.8));
        }

        .needle-south-blade {
          width: 0;
          height: 0;
          border-left: 3px solid transparent;
          border-right: 3px solid transparent;
          border-top: 22px solid #DAF561;
          filter: drop-shadow(0 0 4px rgba(218, 245, 97, 0.6));
        }

        .needle-center-gem {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          margin-top: -4px;
          margin-left: -4px;
          border-radius: 50%;
          background: #FFFFFF;
          box-shadow: 0 0 8px #FF892F;
          z-index: 3;
        }

        .compass-inner-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          opacity: 0.15;
        }

        .text-amber-core {
          color: #FF892F;
        }

        /* 3. Live Pill Badge */
        .navi-live-status {
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(0, 18, 51, 0.95);
          border: 1px solid rgba(255, 137, 47, 0.6);
          border-radius: 9999px;
          padding: 2px 7px;
          font-family: var(--font-ui, sans-serif);
          font-size: 0.62rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          color: #F9FBE7;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
          z-index: 5;
        }

        .status-dot-pulse {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #DAF561;
          box-shadow: 0 0 6px #DAF561;
          animation: pulse 1.5s infinite;
        }

        /* 4. Quick Concierge Panel */
        .navi-quick-panel {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 300px;
          background: rgba(0, 18, 51, 0.96);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 137, 47, 0.4);
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
          animation: luxuryScaleFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          color: #F9FBE7;
        }

        .panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.88rem;
          color: #F9FBE7;
        }

        .panel-close-btn {
          background: none;
          border: none;
          color: #94A3B8;
          cursor: pointer;
        }

        .panel-sub {
          font-size: 0.78rem;
          color: #CBD5E1;
          line-height: 1.4;
          margin-bottom: 14px;
        }

        .panel-btn-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .panel-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: rgba(5, 38, 105, 0.6);
          border: 1px solid rgba(111, 230, 252, 0.25);
          border-radius: 12px;
          color: #F9FBE7;
          font-family: var(--font-ui, sans-serif);
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
        }

        .panel-btn:hover {
          background: rgba(5, 38, 105, 0.95);
          border-color: #FF892F;
        }

        @media (max-width: 768px) {
          .navi-3d-keeper-root {
            bottom: 80px;
            right: 16px;
          }
          .navi-quick-panel {
            width: calc(100vw - 32px);
            right: -8px;
          }
        }
      `}</style>
    </aside>
  );
}
