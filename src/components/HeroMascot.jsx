import React, { useState, useEffect, useRef } from 'react';

/**
 * HeroMascot
 * An interactive 3D wolf mascot sitting directly atop "Your Journey • Your Comfort".
 * Features:
 *  - 3D perspective mouse-tracking (look-at cursor) across hero section (max ±15deg)
 *  - Click reaction: instantly swaps to winking face, ducks/bounces, reverts in 600ms
 *  - Paws grip the top boundary of the text
 *  - Disabled on mobile screens (< 768px) with neutral center lock
 *  - Preloads reaction asset for zero latency
 */
export default function HeroMascot({ heroRef }) {
  const mascotRef = useRef(null);
  const headRef = useRef(null);
  const [isReacting, setIsReacting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reactionTimerRef = useRef(null);
  const mouseStateRef = useRef({ rotX: 0, rotY: 0, targetRotX: 0, targetRotY: 0 });
  const rafRef = useRef(null);

  // Dynamic asset URLs supporting GitHub Pages subdirectories
  const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';
  const mascotDefaultSrc = `${basePrefix}mascot-default.png`;
  const mascotReactionSrc = `${basePrefix}mascot-reaction.png`;

  // Preload images for instantaneous swapping
  useEffect(() => {
    const imgDefault = new Image();
    imgDefault.src = mascotDefaultSrc;
    const imgReaction = new Image();
    imgReaction.src = mascotReactionSrc;
  }, [mascotDefaultSrc, mascotReactionSrc]);

  // Detect mobile viewports (< 768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(hover: none)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth animation loop for head rotation (lerp for fluid responsiveness)
  useEffect(() => {
    if (isMobile) {
      if (headRef.current) {
        headRef.current.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
      }
      return;
    }

    let isRunning = true;
    const animate = () => {
      if (!isRunning) return;

      const state = mouseStateRef.current;
      // Linear interpolation (lerp) factor for buttery smooth look-at motion
      state.rotX += (state.targetRotX - state.rotX) * 0.14;
      state.rotY += (state.targetRotY - state.rotY) * 0.14;

      if (headRef.current) {
        headRef.current.style.transform = `perspective(600px) rotateX(${state.rotX.toFixed(2)}deg) rotateY(${state.rotY.toFixed(2)}deg)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  // Mousemove listener across the hero section
  useEffect(() => {
    if (isMobile) return;

    const heroEl = heroRef?.current || document.getElementById('hero');
    if (!heroEl) return;

    const handleMouseMove = (e) => {
      if (!mascotRef.current) return;

      const rect = mascotRef.current.getBoundingClientRect();
      const mascotCenterX = rect.left + rect.width / 2;
      const mascotCenterY = rect.top + rect.height / 2;

      // Delta relative to mascot center
      const deltaX = e.clientX - mascotCenterX;
      const deltaY = e.clientY - mascotCenterY;

      // Maximum 15 degrees limit
      const maxAngle = 15;
      const maxDistanceX = Math.max(window.innerWidth / 2, 400);
      const maxDistanceY = 450;

      // Calculate angles:
      // When cursor moves right (deltaX > 0), rotY is positive (turns right towards cursor)
      // When cursor moves down (deltaY > 0), rotX is negative (pitches head downward to look at cursor)
      const targetRotY = Math.max(-maxAngle, Math.min(maxAngle, (deltaX / maxDistanceX) * maxAngle));
      const targetRotX = Math.max(-maxAngle, Math.min(maxAngle, -(deltaY / maxDistanceY) * maxAngle));

      mouseStateRef.current.targetRotX = targetRotX;
      mouseStateRef.current.targetRotY = targetRotY;
    };

    const handleMouseLeave = () => {
      // Smoothly return to center
      mouseStateRef.current.targetRotX = 0;
      mouseStateRef.current.targetRotY = 0;
    };

    heroEl.addEventListener('mousemove', handleMouseMove, { passive: true });
    heroEl.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      heroEl.removeEventListener('mousemove', handleMouseMove);
      heroEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [heroRef, isMobile]);

  // Click / tap reaction across hero section: swap image & trigger bounce/duck
  useEffect(() => {
    const handleReaction = (e) => {
      const heroEl = heroRef?.current || document.getElementById('hero');
      if (!heroEl) return;

      const heroRect = heroEl.getBoundingClientRect();
      const isInsideHero = (
        e.clientX >= heroRect.left &&
        e.clientX <= heroRect.right &&
        e.clientY >= heroRect.top &&
        e.clientY <= heroRect.bottom
      ) || heroEl.contains(e.target);

      if (!isInsideHero) return;

      // Trigger reaction
      setIsReacting(true);

      if (reactionTimerRef.current) {
        clearTimeout(reactionTimerRef.current);
      }

      // Revert back to mascot-default.png after 600ms
      reactionTimerRef.current = setTimeout(() => {
        setIsReacting(false);
      }, 600);
    };

    window.addEventListener('pointerdown', handleReaction, { passive: true });
    window.addEventListener('click', handleReaction, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleReaction);
      window.removeEventListener('click', handleReaction);
      if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    };
  }, [heroRef]);

  return (
    <div 
      ref={mascotRef}
      className="hero-mascot-anchor"
      aria-label="Comfort Journey Interactive Wolf Mascot"
    >
      <div 
        ref={headRef}
        className={`hero-mascot-tracker ${isReacting ? 'is-reacting' : ''}`}
        title="Hi! I'm your Comfort Journey guide!"
      >
        <img
          src={isReacting ? mascotReactionSrc : mascotDefaultSrc}
          alt="Comfort Journey Mascot Wolf"
          className="hero-mascot-image"
          draggable="false"
          width="160"
          height="140"
          onError={(e) => {
            const fb = isReacting ? './mascot-reaction.png' : './mascot-default.png';
            if (!e.currentTarget.src.endsWith(fb.replace('./', ''))) {
              e.currentTarget.src = fb;
            }
          }}
        />
        {/* Subtle shadow underneath paws anchoring to the text boundary */}
        <div className="hero-mascot-paw-shadow" />
      </div>

      <style>{`
        .hero-mascot-anchor {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          width: 100%;
          height: 110px;
          margin-bottom: -15px; /* Paws sit right on top of the text */
          pointer-events: none;
          z-index: 6;
          user-select: none;
        }

        .hero-mascot-tracker {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          transform-style: preserve-3d;
          will-change: transform;
          transition: transform 0.08s ease-out;
          pointer-events: auto;
          cursor: pointer;
        }

        .hero-mascot-image {
          display: block;
          width: clamp(120px, 14vw, 155px);
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.45));
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: bottom center;
        }

        .hero-mascot-tracker:hover .hero-mascot-image:not(.is-reacting) {
          transform: translateY(-2px);
        }

        /* Click reaction bounce/duck animation */
        .hero-mascot-tracker.is-reacting .hero-mascot-image {
          animation: mascotDuckBounce 0.6s cubic-bezier(0.25, 1.4, 0.5, 1);
        }

        @keyframes mascotDuckBounce {
          0% {
            transform: scale(1) translateY(0);
          }
          30% {
            transform: scale(0.94) translateY(6px);
          }
          65% {
            transform: scale(1.03) translateY(-3px);
          }
          100% {
            transform: scale(1) translateY(0);
          }
        }

        /* Subtle soft contact shadow underneath the paws */
        .hero-mascot-paw-shadow {
          position: absolute;
          bottom: 4px;
          width: 78%;
          height: 8px;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 72%);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.8;
          transition: transform 0.2s ease;
        }

        .hero-mascot-tracker.is-reacting .hero-mascot-paw-shadow {
          transform: scale(0.9);
          opacity: 0.95;
        }

        /* Mobile optimization: lock mascot centered and prevent overflow */
        @media (max-width: 768px) {
          .hero-mascot-anchor {
            height: 90px;
            margin-bottom: -12px;
          }

          .hero-mascot-tracker {
            transform: perspective(600px) rotateX(0deg) rotateY(0deg) !important;
            transition: none !important;
          }

          .hero-mascot-image {
            width: clamp(100px, 26vw, 120px);
          }
        }
      `}</style>
    </div>
  );
}
