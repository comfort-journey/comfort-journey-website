import React, { useEffect, useRef } from 'react';

/**
 * ZajnoMagneticCursor:
 * Lightweight, zero-latency dual-ring luxury magnetic cursor follower.
 * Directly mutates transform on DOM elements in RAF loop with ZERO React state rerenders.
 * Auto-disabled on mobile / touch screens.
 */
export default function ZajnoMagneticCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const torchRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop mouse devices
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    let animId;
    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;
    let ringX = -200;
    let ringY = -200;
    let torchX = -200;
    let torchY = -200;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      targetX = -200;
      targetY = -200;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      if (torchRef.current) torchRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
      if (torchRef.current) torchRef.current.style.opacity = '1';
    };

    // Event delegation for hover states
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !ringRef.current) return;

      const clickable = target.closest('button, a, input, select, textarea, .tab-btn, .vibe-pill, .conv-chip, .hero-tag-btn, .action-circle-btn, [role="button"], .btn-3d-tactile');
      const card = target.closest('.tour-card, .glass-card, .reel-card, .service-card, .stat-card, .tilt-3d-wrapper');

      if (clickable) {
        ringRef.current.classList.add('cursor-hover-btn');
        ringRef.current.classList.remove('cursor-hover-card');
      } else if (card) {
        ringRef.current.classList.add('cursor-hover-card');
        ringRef.current.classList.remove('cursor-hover-btn');
      } else {
        ringRef.current.classList.remove('cursor-hover-btn', 'cursor-hover-card');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // 120 FPS Lerp Loop
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const render = () => {
      currentX = lerp(currentX, targetX, 0.45);
      currentY = lerp(currentY, targetY, 0.45);

      ringX = lerp(ringX, targetX, 0.2);
      ringY = lerp(ringY, targetY, 0.2);

      torchX = lerp(torchX, targetX, 0.12);
      torchY = lerp(torchY, targetY, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      if (torchRef.current) {
        torchRef.current.style.transform = `translate3d(${torchX}px, ${torchY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="zajno-cursor-wrapper" aria-hidden="true">
      {/* Dynamic Amber Torchlight Glow */}
      <div ref={torchRef} className="cursor-amber-torch" />
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-aura" />

      <style>{`
        .zajno-cursor-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 999999;
          overflow: hidden;
        }

        .cursor-amber-torch {
          position: absolute;
          top: 0;
          left: 0;
          width: 240px;
          height: 240px;
          margin-top: -120px;
          margin-left: -120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 107, 0, 0.09) 0%, rgba(218, 245, 97, 0.04) 40%, transparent 70%);
          pointer-events: none;
          will-change: transform;
          opacity: 0;
          transition: opacity 0.3s ease;
          mix-blend-mode: screen;
        }

        .cursor-dot {
          position: absolute;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FF892F;
          margin-top: -3px;
          margin-left: -3px;
          pointer-events: none;
          box-shadow: 0 0 8px #FF892F;
          will-change: transform;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .cursor-aura {
          position: absolute;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-top: -16px;
          margin-left: -16px;
          border: 1.5px solid rgba(111, 230, 252, 0.45);
          background: rgba(111, 230, 252, 0.05);
          pointer-events: none;
          will-change: transform;
          opacity: 0;
          transition: width 0.2s ease, height 0.2s ease, margin 0.2s ease, border-color 0.2s ease, background 0.2s ease, opacity 0.2s ease;
        }

        .cursor-aura.cursor-hover-btn {
          width: 48px;
          height: 48px;
          margin-top: -24px;
          margin-left: -24px;
          border-color: rgba(255, 137, 47, 0.8);
          background: rgba(255, 137, 47, 0.12);
        }

        .cursor-aura.cursor-hover-card {
          width: 54px;
          height: 54px;
          margin-top: -27px;
          margin-left: -27px;
          border-color: rgba(218, 245, 97, 0.7);
          background: rgba(0, 29, 81, 0.4);
        }
      `}</style>
    </div>
  );
}
