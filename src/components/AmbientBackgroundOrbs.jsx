import React, { useEffect, useRef } from 'react';

export default function AmbientBackgroundOrbs() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (containerRef.current) {
            // Parallax offset variables for background gradient orbs
            containerRef.current.style.setProperty('--orb-y-1', `${scrollY * 0.18}px`);
            containerRef.current.style.setProperty('--orb-y-2', `${-scrollY * 0.12}px`);
            containerRef.current.style.setProperty('--orb-y-3', `${scrollY * 0.15}px`);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="ambient-orbs-wrapper" aria-hidden="true">
      {/* Warm Amber-Gold Sun Aurora Orb */}
      <div className="ambient-orb orb-amber" />

      {/* Deep Royal Violet Aurora Orb */}
      <div className="ambient-orb orb-violet" />

      {/* Emerald Cyan Aurora Orb */}
      <div className="ambient-orb orb-emerald" />

      {/* Gold Flare Center Orb */}
      <div className="ambient-orb orb-gold" />

      {/* Subtle Noise / Grain Overlay for Luxury Analog Texture */}
      <div className="ambient-noise-layer" />

      <style>{`
        .ambient-orbs-wrapper {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
          background: #070B14;
        }

        .ambient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(130px);
          opacity: 0.28;
          transition: transform 0.2s cubic-bezier(0.1, 0, 0.2, 1);
          will-change: transform;
        }

        .orb-amber {
          top: -10%;
          right: 5%;
          width: 650px;
          height: 650px;
          background: radial-gradient(circle, #FF6B00 0%, #D95300 55%, transparent 70%);
          transform: translateY(var(--orb-y-1, 0px)) scale(1);
          animation: floatOrb1 18s ease-in-out infinite alternate;
        }

        .orb-violet {
          top: 35%;
          left: -12%;
          width: 750px;
          height: 750px;
          background: radial-gradient(circle, #8B5CF6 0%, #6D5DF6 50%, transparent 70%);
          opacity: 0.22;
          transform: translateY(var(--orb-y-2, 0px)) scale(1.05);
          animation: floatOrb2 22s ease-in-out infinite alternate;
        }

        .orb-emerald {
          top: 68%;
          right: -10%;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, #059669 0%, #10B981 45%, transparent 70%);
          opacity: 0.16;
          transform: translateY(var(--orb-y-3, 0px)) scale(1);
          animation: floatOrb3 20s ease-in-out infinite alternate;
        }

        .orb-gold {
          top: 85%;
          left: 20%;
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, #FFB800 0%, #FFA000 50%, transparent 70%);
          opacity: 0.2;
          animation: floatOrb1 25s ease-in-out infinite alternate-reverse;
        }

        @keyframes floatOrb1 {
          0% { transform: translateY(var(--orb-y-1, 0px)) translate(0px, 0px) scale(1); }
          50% { transform: translateY(var(--orb-y-1, 0px)) translate(40px, -30px) scale(1.08); }
          100% { transform: translateY(var(--orb-y-1, 0px)) translate(-30px, 40px) scale(0.95); }
        }

        @keyframes floatOrb2 {
          0% { transform: translateY(var(--orb-y-2, 0px)) translate(0px, 0px) scale(1); }
          50% { transform: translateY(var(--orb-y-2, 0px)) translate(-40px, 35px) scale(1.1); }
          100% { transform: translateY(var(--orb-y-2, 0px)) translate(35px, -25px) scale(0.92); }
        }

        @keyframes floatOrb3 {
          0% { transform: translateY(var(--orb-y-3, 0px)) translate(0px, 0px) scale(1); }
          100% { transform: translateY(var(--orb-y-3, 0px)) translate(-50px, -40px) scale(1.06); }
        }

        .ambient-noise-layer {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 0);
          background-size: 24px 24px;
        }
      `}</style>
    </div>
  );
}
