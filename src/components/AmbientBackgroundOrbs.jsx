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
      {/* 1. Luminous Sky Blue & Cyan Aurora Glow (Top Left) */}
      <div className="ambient-gradient-layer orb-sky-aqua" />

      {/* 2. Amber-Gold Sunset Aurora Glow (Top Right) */}
      <div className="ambient-gradient-layer orb-amber" />

      {/* 3. Mint & Emerald Spring Aurora Glow (Center Left) */}
      <div className="ambient-gradient-layer orb-emerald" />

      {/* 4. Electric Aqua Lagoon Glow (Bottom Right) */}
      <div className="ambient-gradient-layer orb-aqua" />

      {/* Subtle Star Dust / Texture Overlay */}
      <div className="ambient-noise-layer" />

      <style>{`
        .ambient-orbs-wrapper {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
          background: linear-gradient(180deg, #001233 0%, #001D51 40%, #001233 100%);
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

        .orb-sky-aqua {
          top: -10%;
          left: -5%;
          width: 850px;
          height: 850px;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(111, 230, 252, 0.08) 45%, transparent 70%);
          animation: floatSoftAqua 22s ease-in-out infinite alternate;
        }

        .orb-amber {
          top: 15%;
          right: -8%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(255, 137, 47, 0.18) 0%, rgba(255, 137, 47, 0.05) 45%, transparent 70%);
          animation: floatSoftAmber 24s ease-in-out infinite alternate;
        }

        .orb-emerald {
          top: 45%;
          left: -10%;
          width: 750px;
          height: 750px;
          background: radial-gradient(circle, rgba(52, 211, 153, 0.16) 0%, rgba(16, 185, 129, 0.04) 48%, transparent 70%);
          animation: floatSoftEmerald 28s ease-in-out infinite alternate;
        }

        .orb-aqua {
          top: 75%;
          right: -5%;
          width: 850px;
          height: 850px;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(111, 230, 252, 0.06) 48%, transparent 70%);
          animation: floatSoftAqua 26s ease-in-out infinite alternate;
        }

        @keyframes floatSoftAqua {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(40px, 30px, 0) scale(1.08); }
        }

        @keyframes floatSoftAmber {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(-35px, 35px, 0) scale(1.06); }
        }

        @keyframes floatSoftEmerald {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(35px, -30px, 0) scale(1.07); }
        }

        .ambient-noise-layer {
          position: absolute;
          inset: 0;
          opacity: 0.02;
          background-image: radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 0);
          background-size: 28px 28px;
        }

        @media (prefers-reduced-motion: reduce) {
          .orb-sky-aqua, .orb-amber, .orb-emerald, .orb-aqua {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
