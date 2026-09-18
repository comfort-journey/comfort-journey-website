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

      {/* 5. Connected Journey "Wanderlust Thread" (Stippl.io inspired continuous route connecting sections) */}
      <svg className="wanderlust-thread-bg" viewBox="0 0 1440 3200" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M 1200 100 C 600 400, 200 700, 450 1100 C 700 1500, 1300 1700, 950 2200 C 600 2700, 200 2900, 800 3200"
          stroke="url(#wanderlustGradient)"
          strokeWidth="2"
          strokeDasharray="8 12"
          className="wanderlust-path"
        />
        <defs>
          <linearGradient id="wanderlustGradient" x1="0" y1="0" x2="0" y2="3200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF892F" stopOpacity="0.25" />
            <stop offset="25%" stopColor="#FFA459" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#6FE6FC" stopOpacity="0.2" />
            <stop offset="75%" stopColor="#DAF561" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FF892F" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>

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

        .wanderlust-thread-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          opacity: 0.7;
        }

        .wanderlust-path {
          animation: wanderlustFlow 50s linear infinite;
        }

        @keyframes wanderlustFlow {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -800; }
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
