import React, { useEffect, useState } from 'react';
import { Award, Sparkles } from 'lucide-react';

export default function GoldSealStamp({ isActive, onComplete, destinationName = 'Luxury Tour' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      setVisible(true);
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 1600);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [isActive, onComplete]);

  if (!visible) return null;

  return (
    <div className="gold-seal-wrapper" aria-hidden="true">
      {/* 3D Wax Stamp Entity */}
      <div className="gold-seal-stamp-animated">
        <div className="gold-seal-medal">
          {/* Beveled Gold Outer Teeth */}
          <div className="seal-outer-rim" />

          {/* Inner Inscription */}
          <div className="seal-inner-body">
            <Sparkles size={12} className="seal-sparkle-icon" />
            <span className="seal-text-top">COMFORT JOURNEY</span>
            <div className="seal-divider-line" />
            <strong className="seal-center-badge">SAVED</strong>
            <span className="seal-text-bot">DREAMBOARD</span>
          </div>

          {/* Holographic Refractive Glint */}
          <div className="seal-glint-pass" />
        </div>
      </div>

      <style>{`
        .gold-seal-wrapper {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 30;
          perspective: 800px;
        }

        .gold-seal-medal {
          position: relative;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #FFF0A0 0%, #FFB020 40%, #D47A00 75%, #8A4000 100%);
          box-shadow: 
            0 16px 36px rgba(0, 0, 0, 0.7),
            0 0 25px rgba(255, 176, 32, 0.6),
            inset 0 3px 6px rgba(255, 255, 255, 0.8),
            inset 0 -3px 8px rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          transform-style: preserve-3d;
          overflow: hidden;
        }

        .seal-outer-rim {
          position: absolute;
          inset: 3px;
          border-radius: 50%;
          border: 2px dashed rgba(255, 255, 255, 0.6);
          pointer-events: none;
        }

        .seal-inner-body {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid rgba(255, 240, 160, 0.8);
          background: radial-gradient(circle at 50% 50%, rgba(255, 176, 32, 0.4) 0%, rgba(138, 64, 0, 0.8) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #FFFFFF;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
          padding: 4px;
        }

        .seal-sparkle-icon {
          color: #FFF0A0;
          margin-bottom: 2px;
        }

        .seal-text-top {
          font-family: var(--font-ui, sans-serif);
          font-size: 0.48rem;
          font-weight: 900;
          letter-spacing: 0.14em;
          color: #FFF0A0;
          text-transform: uppercase;
        }

        .seal-divider-line {
          width: 50%;
          height: 1px;
          background: rgba(255, 240, 160, 0.6);
          margin: 2px 0;
        }

        .seal-center-badge {
          font-family: var(--font-ui, sans-serif);
          font-size: 0.85rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          color: #FFFFFF;
          text-transform: uppercase;
          line-height: 1;
        }

        .seal-text-bot {
          font-family: var(--font-ui, sans-serif);
          font-size: 0.46rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #DAF561;
          text-transform: uppercase;
          margin-top: 1px;
        }

        .seal-glint-pass {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 20%, rgba(255, 255, 255, 0.6) 50%, transparent 80%);
          mix-blend-mode: overlay;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
