import React from 'react';

/**
 * AmbientBackgroundOrbs:
 * Dual-theme ambient travel canvas.
 * DARK: deep navy aurora + wanderlust thread (original luxury look).
 * LIGHT: warm paper + 3-layer mature travel canvas (routes, topo contours,
 * landmark line-art) designed to glow through frosted-glass cards.
 * GPU-friendly: transform/opacity animations only, blur reserved for cards.
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

      {/* 5. Journey route network — dashed travel routes, waypoints, plane markers.
          Visible in LIGHT theme; dark keeps the single wanderlust thread below. */}
      <svg className="route-network-layer" viewBox="0 0 1440 3200" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <g className="route-route">
          <path
            d="M 150 200 C 500 450, 300 800, 650 1050 C 1000 1300, 1250 1500, 1000 1900 C 750 2300, 1100 2600, 900 3000"
            stroke="#8A7F66"
            strokeOpacity="0.35"
            strokeWidth="1.6"
            strokeDasharray="7 9"
          />
          <path
            d="M 1300 350 C 1000 650, 1200 950, 850 1250 C 500 1550, 700 2000, 450 2350 C 250 2620, 400 2900, 300 3150"
            stroke="#8A7F66"
            strokeOpacity="0.28"
            strokeWidth="1.4"
            strokeDasharray="6 10"
          />
          {/* Waypoint dots */}
          <circle cx="650" cy="1050" r="5" fill="#D65A00" fillOpacity="0.5" />
          <circle cx="1000" cy="1900" r="4" fill="#14264A" fillOpacity="0.4" />
          <circle cx="850" cy="1250" r="5" fill="#D65A00" fillOpacity="0.45" />
          <circle cx="450" cy="2350" r="4" fill="#14264A" fillOpacity="0.4" />
          <circle cx="150" cy="200" r="4" fill="#0E7490" fillOpacity="0.45" />
          <circle cx="1300" cy="350" r="4" fill="#0E7490" fillOpacity="0.4" />
          {/* Paper-plane markers */}
          <g transform="translate(650,1050) rotate(24)" opacity="0.5">
            <path d="M0,-9 L6,7 L0,3.5 L-6,7 Z" fill="none" stroke="#14264A" strokeOpacity="0.55" strokeWidth="1.6" />
          </g>
          <g transform="translate(450,2350) rotate(-18)" opacity="0.45">
            <path d="M0,-9 L6,7 L0,3.5 L-6,7 Z" fill="none" stroke="#14264A" strokeOpacity="0.5" strokeWidth="1.6" />
          </g>
          {/* Mini compass rose */}
          <g transform="translate(1150,2450)" opacity="0.4">
            <circle r="16" fill="none" stroke="#8A7F66" strokeOpacity="0.6" strokeWidth="1.4" />
            <path d="M0,-16 L4,0 L0,16 L-4,0 Z" fill="none" stroke="#8A7F66" strokeOpacity="0.7" strokeWidth="1.4" />
            <path d="M-16,0 L16,0" stroke="#8A7F66" strokeOpacity="0.5" strokeWidth="1.2" />
          </g>
        </g>
      </svg>

      {/* 6. Topographic contour layer — faint trekking-map rings, light only */}
      <svg className="topo-layer topo-right" viewBox="0 0 600 600" fill="none" aria-hidden="true">
        <g stroke="#8A7F66" strokeWidth="1.3" opacity="0.55">
          <path d="M300,60 C400,60 470,130 470,230 C470,330 400,400 300,400 C200,400 130,330 130,230 C130,130 200,60 300,60 Z" strokeOpacity="0.5" />
          <path d="M300,100 C375,100 430,155 430,230 C430,305 375,360 300,360 C225,360 170,305 170,230 C170,155 225,100 300,100 Z" strokeOpacity="0.45" />
          <path d="M300,140 C350,140 390,180 390,230 C390,280 350,320 300,320 C250,320 210,280 210,230 C210,180 250,140 300,140 Z" strokeOpacity="0.4" />
          <path d="M300,175 C330,175 355,200 355,230 C355,260 330,285 300,285 C270,285 245,260 245,230 C245,200 270,175 300,175 Z" strokeOpacity="0.35" />
          <path d="M60,480 C150,450 260,455 340,490 C420,525 520,520 570,495" strokeOpacity="0.4" />
          <path d="M40,520 C140,488 270,492 360,528 C440,560 520,556 580,535" strokeOpacity="0.32" />
        </g>
      </svg>
      <svg className="topo-layer topo-left" viewBox="0 0 600 600" fill="none" aria-hidden="true">
        <g stroke="#8A7F66" strokeWidth="1.3" opacity="0.5">
          <path d="M300,80 C390,80 450,150 450,240 C450,330 390,400 300,400 C210,400 150,330 150,240 C150,150 210,80 300,80 Z" strokeOpacity="0.42" />
          <path d="M300,125 C365,125 410,175 410,240 C410,305 365,355 300,355 C235,355 190,305 190,240 C190,175 235,125 300,125 Z" strokeOpacity="0.36" />
          <path d="M300,170 C340,170 370,200 370,240 C370,280 340,310 300,310 C260,310 230,280 230,240 C230,200 260,170 300,170 Z" strokeOpacity="0.3" />
        </g>
      </svg>

      {/* 7. Connected Journey "Wanderlust Thread" (dark theme signature) */}
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

      {/* Subtle grain — dark specks in light, light specks in dark */}
      <div className="ambient-noise-layer" />

      <style>{`
        .ambient-orbs-wrapper {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
          background: 
            radial-gradient(1200px 750px at 15% 10%, rgba(255, 137, 47, 0.08) 0%, transparent 60%),
            radial-gradient(1100px 700px at 85% 25%, rgba(14, 116, 144, 0.07) 0%, transparent 55%),
            radial-gradient(1000px 800px at 20% 65%, rgba(16, 185, 129, 0.06) 0%, transparent 60%),
            radial-gradient(1200px 800px at 80% 85%, rgba(255, 137, 47, 0.07) 0%, transparent 55%),
            linear-gradient(180deg, var(--cj-orb-base-from, #FFFDF7) 0%, #FAF7EC 35%, #F7F3E5 65%, var(--cj-orb-base-to, #F9FBE7) 100%);
          transform: translateZ(0);
          will-change: transform;
        }

        html[data-theme="dark"] .ambient-orbs-wrapper {
          background: linear-gradient(180deg, #001233 0%, #001D51 100%);
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
          background: radial-gradient(circle, var(--cj-orb-a, rgba(255,137,47,0.14)) 0%, transparent 70%);
          animation: floatSoftAqua 22s ease-in-out infinite alternate;
        }

        .orb-amber {
          top: 15%;
          right: -8%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, var(--cj-orb-b, rgba(14,116,144,0.10)) 0%, transparent 70%);
          animation: floatSoftAmber 24s ease-in-out infinite alternate;
        }

        .orb-emerald {
          top: 45%;
          left: -10%;
          width: 750px;
          height: 750px;
          background: radial-gradient(circle, var(--cj-orb-c, rgba(77,124,15,0.10)) 0%, transparent 70%);
          animation: floatSoftEmerald 28s ease-in-out infinite alternate;
        }

        .orb-aqua {
          top: 75%;
          right: -5%;
          width: 850px;
          height: 850px;
          background: radial-gradient(circle, var(--cj-orb-a, rgba(255,137,47,0.14)) 0%, transparent 70%);
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

        /* Route network + topo: light theme only */
        .route-network-layer,
        .topo-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .route-network-layer { z-index: 1; opacity: 0.85; }
        .route-network-layer .route-route {
          animation: routeDrift 90s ease-in-out infinite alternate;
        }
        @keyframes routeDrift {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-24px, 30px, 0); }
        }
        .topo-layer { z-index: 0; }
        .topo-right {
          top: 6%;
          right: -140px;
          left: auto;
          width: min(560px, 60vw);
          height: auto;
          animation: topoPan 110s ease-in-out infinite alternate;
        }
        .topo-left {
          top: 52%;
          left: -160px;
          right: auto;
          width: min(520px, 55vw);
          height: auto;
          animation: topoPan 130s ease-in-out infinite alternate-reverse;
        }
        @keyframes topoPan {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(20px, -26px, 0); }
        }
        html[data-theme="dark"] .route-network-layer,
        html[data-theme="dark"] .topo-layer {
          display: none;
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
        html:not([data-theme="dark"]) .wanderlust-thread-bg {
          opacity: 0.35;
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
          opacity: 0.045;
          background-image: 
            radial-gradient(rgba(20, 38, 74, 0.45) 1px, transparent 1px),
            linear-gradient(to right, rgba(20, 38, 74, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20, 38, 74, 0.03) 1px, transparent 1px);
          background-size: 28px 28px, 112px 112px, 112px 112px;
        }
        html[data-theme="dark"] .ambient-noise-layer {
          opacity: 0.02;
          background-image: radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 0);
          background-size: 28px 28px;
        }

        @media (prefers-reduced-motion: reduce) {
          .orb-sky-aqua, .orb-amber, .orb-emerald, .orb-aqua,
          .route-network-layer .route-route, .topo-right, .topo-left,
          .wanderlust-path {
            animation: none !important;
          }
        }
        @media (max-width: 768px) {
          .topo-right, .topo-left { width: 78vw; }
          .route-network-layer { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
