import React from 'react';

/**
 * AmbientBackgroundOrbs:
 * Ultra-high-performance ambient glow background.
 * Uses GPU-accelerated CSS radial gradients with ZERO heavy filter: blur() overhead
 * and ZERO scroll listeners for instantaneous, lag-free 120 FPS scrolling.
 */
export default function AmbientBackgroundOrbs() {
  return (
    <div className="ambient-orbs-wrapper" aria-hidden="true">
      {/* 1. Amber-Gold Sun Aurora Glow */}
      <div className="ambient-gradient-layer orb-amber" />

      {/* 2. Deep Royal Violet Aurora Glow */}
      <div className="ambient-gradient-layer orb-violet" />

      {/* 3. Electric Aqua Aurora Glow */}
      <div className="ambient-gradient-layer orb-aqua" />

      {/* Subtle Noise / Texture Overlay */}
      <div className="ambient-noise-layer" />

      <style>{`
        .ambient-orbs-wrapper {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
          background: #001233;
          transform: translateZ(0);
          will-change: transform;
        }

        .ambient-gradient-layer {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          transform: translateZ(0);
          will-change: transform;
        }

        .orb-amber {
          top: -15%;
          right: 0%;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(255, 137, 47, 0.18) 0%, rgba(255, 137, 47, 0.06) 45%, transparent 70%);
          animation: floatSoftAmber 24s ease-in-out infinite alternate;
        }

        .orb-violet {
          top: 30%;
          left: -10%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.04) 50%, transparent 70%);
          animation: floatSoftViolet 28s ease-in-out infinite alternate;
        }

        .orb-aqua {
          top: 65%;
          right: -5%;
          width: 750px;
          height: 750px;
          background: radial-gradient(circle, rgba(111, 230, 252, 0.14) 0%, rgba(111, 230, 252, 0.03) 48%, transparent 70%);
          animation: floatSoftAqua 26s ease-in-out infinite alternate;
        }

        @keyframes floatSoftAmber {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(-40px, 30px, 0) scale(1.06); }
        }

        @keyframes floatSoftViolet {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(35px, -35px, 0) scale(1.08); }
        }

        @keyframes floatSoftAqua {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(-30px, -25px, 0) scale(1.05); }
        }

        .ambient-noise-layer {
          position: absolute;
          inset: 0;
          opacity: 0.02;
          background-image: radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 0);
          background-size: 28px 28px;
        }

        @media (prefers-reduced-motion: reduce) {
          .orb-amber, .orb-violet, .orb-aqua {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
