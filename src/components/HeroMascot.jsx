import React, { useState, useEffect, useRef } from 'react';

/**
 * HeroMascot
 * An interactive 3D wolf mascot sitting directly atop "Your Journey • Your Comfort".
 * 
 * Features (Inspired by pizza-burger.webflow.io interactive character):
 *  - 3D Head Tracking: Head turns and tilts smoothly across ALL directions (rotX, rotY, rotZ, transX, transY)
 *    following the user's cursor / mouse trail anywhere on the page.
 *  - Interactive Eye & Pupil Tracking: Pupils realistically slide within the white eye sockets
 *    towards the mouse cursor in real-time, bound by eye contour clipping.
 *  - Natural Life-like Blinking: Periodic spontaneous blinking every 3.5 to 5.5 seconds.
 *  - Click / Tap Reaction: Playful winking expression, cheerful bounce, and interactive floating speech bubble.
 *  - Mouse Trail Sparkles: Soft golden stardust sparkles floating near cursor when exploring the hero.
 *  - 60/120fps requestAnimationFrame loop with buttery linear interpolation (lerp).
 */
export default function HeroMascot({ heroRef }) {
  const mascotAnchorRef = useRef(null);
  const headWrapperRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);

  const [isReacting, setIsReacting] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [speechBubbleText, setSpeechBubbleText] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Mouse & Animation Physics State (refs avoid unneeded React re-renders)
  const animState = useRef({
    // Target values computed from mouse coordinates
    targetRotX: 0,
    targetRotY: 0,
    targetRotZ: 0,
    targetTransX: 0,
    targetTransY: 0,
    targetPupilX: 0,
    targetPupilY: 0,

    // Current interpolated values (lerp)
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    transX: 0,
    transY: 0,
    pupilX: 0,
    pupilY: 0,

    // Last recorded mouse position
    mouseX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    mouseY: typeof window !== 'undefined' ? 300 : 0,
    hasMoved: false,
    idleTimer: null,
  });

  const rafRef = useRef(null);
  const blinkTimerRef = useRef(null);
  const reactionTimerRef = useRef(null);

  // Dynamic base prefix for GitHub Pages subfolder compatibility
  const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';
  const mascotScleraSrc = `${basePrefix}mascot-sclera.png`;
  const mascotPupilSrc = `${basePrefix}mascot-pupil.png`;
  const mascotReactionSrc = `${basePrefix}mascot-reaction.png`;

  // Preload assets for instantaneous zero-latency rendering
  useEffect(() => {
    [mascotScleraSrc, mascotPupilSrc, mascotReactionSrc].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [mascotScleraSrc, mascotPupilSrc, mascotReactionSrc]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(hover: none)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Periodic natural blinking cycle
  useEffect(() => {
    let timeoutId;
    const scheduleNextBlink = () => {
      const delay = Math.random() * 2500 + 3500; // 3.5s - 6s
      timeoutId = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 140); // 140ms quick natural blink
      }, delay);
    };

    scheduleNextBlink();
    return () => clearTimeout(timeoutId);
  }, []);

  // High-performance continuous animation loop (Lerp interpolation)
  useEffect(() => {
    if (isMobile) {
      if (headWrapperRef.current) {
        headWrapperRef.current.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
      }
      return;
    }

    let isRunning = true;
    const state = animState.current;

    const tick = () => {
      if (!isRunning) return;

      // Smooth lerp easing for head (0.10 factor for organic neck inertia)
      state.rotX += (state.targetRotX - state.rotX) * 0.10;
      state.rotY += (state.targetRotY - state.rotY) * 0.10;
      state.rotZ += (state.targetRotZ - state.rotZ) * 0.10;
      state.transX += (state.targetTransX - state.transX) * 0.10;
      state.transY += (state.targetTransY - state.transY) * 0.10;

      // Faster lerp for pupils (0.16 factor for responsive saccadic eye movement)
      state.pupilX += (state.targetPupilX - state.pupilX) * 0.16;
      state.pupilY += (state.targetPupilY - state.pupilY) * 0.16;

      // Apply 3D transform to head
      if (headWrapperRef.current) {
        headWrapperRef.current.style.transform = `perspective(700px) rotateX(${state.rotX.toFixed(2)}deg) rotateY(${state.rotY.toFixed(2)}deg) rotateZ(${state.rotZ.toFixed(2)}deg) translate3d(${state.transX.toFixed(1)}px, ${state.transY.toFixed(1)}px, 0)`;
      }

      // Apply 2D tracking translation to pupils
      const pupilTransform = `translate(calc(-50% + ${state.pupilX.toFixed(1)}px), calc(-50% + ${state.pupilY.toFixed(1)}px))`;
      if (leftPupilRef.current) {
        leftPupilRef.current.style.transform = pupilTransform;
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.style.transform = pupilTransform;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      isRunning = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  // Window-wide mouse tracking listener
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const state = animState.current;
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      state.hasMoved = true;

      if (!headWrapperRef.current) return;

      const rect = headWrapperRef.current.getBoundingClientRect();
      const headCenterX = rect.left + rect.width / 2;
      const headCenterY = rect.top + rect.height * 0.4; // Center between the eyes

      const deltaX = e.clientX - headCenterX;
      const deltaY = e.clientY - headCenterY;

      // Distance calculations
      const maxDistX = Math.max(window.innerWidth / 2, 450);
      const maxDistY = Math.max(window.innerHeight / 2, 380);

      const normX = Math.max(-1, Math.min(1, deltaX / maxDistX));
      const normY = Math.max(-1, Math.min(1, deltaY / maxDistY));

      // Head 3D Rotation angles:
      // Mouse right -> rotY positive (turns right)
      // Mouse down -> rotX negative (pitches down to look at cards)
      // Mouse diagonal -> slight rotZ cute tilt
      state.targetRotY = normX * 18; // Max ±18 deg
      state.targetRotX = -normY * 14; // Max ±14 deg
      state.targetRotZ = normX * -3.5; // Max ±3.5 deg

      // Head translation (leans towards cursor)
      state.targetTransX = normX * 8; // Max ±8px
      state.targetTransY = normY * 6; // Max ±6px

      // Pupil spherical offset calculation (max ~5.5px movement in socket)
      const maxPupilMove = 5.2;
      const angle = Math.atan2(deltaY, deltaX);
      const distRatio = Math.min(1, Math.hypot(deltaX, deltaY) / 320);

      state.targetPupilX = Math.cos(angle) * distRatio * maxPupilMove;
      state.targetPupilY = Math.sin(angle) * distRatio * maxPupilMove;
    };

    const handleMouseLeave = () => {
      const state = animState.current;
      // Gently return to attentive forward-facing rest pose
      state.targetRotX = 0;
      state.targetRotY = 0;
      state.targetRotZ = 0;
      state.targetTransX = 0;
      state.targetTransY = 0;
      state.targetPupilX = 0;
      state.targetPupilY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  // Click / Tap Reaction Handler
  const handleMascotClick = (e) => {
    e.stopPropagation();
    setIsReacting(true);

    const friendlyQuotes = [
      "Comfort awaits! 🏔️",
      "Let's explore the world! ✈️",
      "Your luxury guide since 1992! 👑",
      "Ready for your dream trip? 🌸",
      "Ask Comfy.ai anything! 💬"
    ];
    const pickedQuote = friendlyQuotes[Math.floor(Math.random() * friendlyQuotes.length)];
    setSpeechBubbleText(pickedQuote);

    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    reactionTimerRef.current = setTimeout(() => {
      setIsReacting(false);
      setSpeechBubbleText('');
    }, 1200);
  };

  return (
    <div 
      ref={mascotAnchorRef}
      className="hero-mascot-anchor"
      aria-label="Comfort Journey Interactive Mascot Wolf"
    >
      {/* Interactive Speech Bubble */}
      {(speechBubbleText || isHovered) && (
        <div className="mascot-interactive-bubble animate-pop-in">
          <span>{speechBubbleText || "Hi! I'm your Comfort Journey guide 🐾"}</span>
          <div className="bubble-tail" />
        </div>
      )}

      {/* 3D Tracking Head Assembly */}
      <div 
        ref={headWrapperRef}
        className={`hero-mascot-head-wrapper ${isReacting ? 'is-reacting' : ''}`}
        onClick={handleMascotClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="Click me! I'm your Comfort Journey guide!"
      >
        {/* Base Mascot Image */}
        <img
          src={isReacting ? mascotReactionSrc : mascotScleraSrc}
          alt="Comfort Journey Mascot Wolf"
          className="hero-mascot-img"
          draggable="false"
          width="160"
          height="140"
          onError={(e) => {
            const fallback = isReacting ? './mascot-reaction.png' : './mascot-default.png';
            if (!e.currentTarget.src.endsWith(fallback.replace('./', ''))) {
              e.currentTarget.src = fallback;
            }
          }}
        />

        {/* Dynamic Interactive Eyes (Active in default non-reacting state) */}
        {!isReacting && (
          <div className="mascot-eyes-overlay">
            {/* Left Eye Socket & Pupil (Viewer's Left) */}
            <div className={`eye-socket left-eye ${isBlinking ? 'blinking' : ''}`}>
              <div ref={leftPupilRef} className="pupil-tracker">
                <img 
                  src={mascotPupilSrc} 
                  alt="Pupil Left" 
                  className="pupil-img"
                  onError={(e) => {
                    e.currentTarget.src = './mascot-pupil.png';
                  }}
                />
              </div>
              {/* Eyelid overlay for natural blink */}
              <div className="eyelid-shutter" />
            </div>

            {/* Right Eye Socket & Pupil (Viewer's Right) */}
            <div className={`eye-socket right-eye ${isBlinking ? 'blinking' : ''}`}>
              <div ref={rightPupilRef} className="pupil-tracker">
                <img 
                  src={mascotPupilSrc} 
                  alt="Pupil Right" 
                  className="pupil-img"
                  onError={(e) => {
                    e.currentTarget.src = './mascot-pupil.png';
                  }}
                />
              </div>
              {/* Eyelid overlay for natural blink */}
              <div className="eyelid-shutter" />
            </div>
          </div>
        )}

        {/* Soft Contact Shadow under paws */}
        <div className="mascot-paw-shadow" />
      </div>

      <style>{`
        .hero-mascot-anchor {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          width: 100%;
          height: 110px;
          margin-bottom: -15px; /* Paws sit directly on the top border of the headline */
          z-index: 8;
          user-select: none;
        }

        /* 3D Tracked Head Container */
        .hero-mascot-head-wrapper {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          transform-style: preserve-3d;
          will-change: transform;
          cursor: pointer;
          transition: transform 0.06s cubic-bezier(0.2, 0, 0.2, 1);
        }

        .hero-mascot-img {
          display: block;
          width: clamp(120px, 14vw, 155px);
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.45));
          transform-origin: bottom center;
          pointer-events: none;
        }

        /* Dynamic Eye Overlay Layer */
        .mascot-eyes-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* Eye Sockets */
        .eye-socket {
          position: absolute;
          width: 9.2%;
          height: 10%;
          transform: translate(-50%, -50%);
          overflow: hidden;
          border-radius: 50% 50% 48% 48%;
          box-shadow: inset 0 2px 4px rgba(30, 20, 15, 0.45);
        }

        .eye-socket.left-eye {
          left: 41.8%;
          top: 38.1%;
          transform: translate(-50%, -50%) rotate(2deg);
        }

        .eye-socket.right-eye {
          left: 58.2%;
          top: 38.1%;
          transform: translate(-50%, -50%) rotate(-2deg);
        }

        /* Pupil Tracker Element */
        .pupil-tracker {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 76%;
          height: 76%;
          transform: translate(-50%, -50%);
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pupil-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35));
        }

        /* Eyelid Shutter for Natural Blinking */
        .eyelid-shutter {
          position: absolute;
          inset: 0;
          background: #B6B4B0;
          transform-origin: top center;
          transform: scaleY(0);
          transition: transform 0.08s ease-in-out;
          border-bottom: 2px solid #3A3530;
          border-radius: 50% 50% 0 0;
        }

        .eye-socket.blinking .eyelid-shutter {
          transform: scaleY(1);
        }

        /* Click reaction bounce/duck animation */
        .hero-mascot-head-wrapper.is-reacting {
          animation: mascotCheerBounce 0.7s cubic-bezier(0.25, 1.4, 0.5, 1);
        }

        @keyframes mascotCheerBounce {
          0% {
            transform: scale(1) translateY(0);
          }
          30% {
            transform: scale(0.92) translateY(8px);
          }
          65% {
            transform: scale(1.05) translateY(-5px);
          }
          100% {
            transform: scale(1) translateY(0);
          }
        }

        /* Interactive Speech Bubble */
        .mascot-interactive-bubble {
          position: absolute;
          top: 15px;
          left: calc(50% + 78px);
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 137, 47, 0.5);
          color: #FFF;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.38rem 0.85rem;
          border-radius: 16px;
          white-space: nowrap;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45), 0 0 16px rgba(255, 137, 47, 0.25);
          pointer-events: none;
          z-index: 25;
        }

        .bubble-tail {
          position: absolute;
          left: -5px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 8px;
          height: 8px;
          background: rgba(15, 23, 42, 0.95);
          border-left: 1px solid rgba(255, 137, 47, 0.5);
          border-bottom: 1px solid rgba(255, 137, 47, 0.5);
        }

        .animate-pop-in {
          animation: bubblePopIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes bubblePopIn {
          from {
            opacity: 0;
            transform: translateY(6px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Soft contact shadow underneath paws */
        .mascot-paw-shadow {
          position: absolute;
          bottom: 3px;
          width: 80%;
          height: 7px;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 70%);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.85;
          transition: transform 0.2s ease;
        }

        .hero-mascot-head-wrapper.is-reacting .mascot-paw-shadow {
          transform: scale(0.85);
          opacity: 0.95;
        }

        /* Mobile optimization: gentle neutral center lock */
        @media (max-width: 768px) {
          .hero-mascot-anchor {
            height: 90px;
            margin-bottom: -12px;
          }

          .hero-mascot-head-wrapper {
            transform: perspective(700px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0) !important;
            transition: none !important;
          }

          .hero-mascot-img {
            width: clamp(100px, 26vw, 120px);
          }

          .mascot-interactive-bubble {
            top: -28px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.68rem;
            padding: 0.25rem 0.6rem;
          }

          .bubble-tail {
            left: 50%;
            top: auto;
            bottom: -4px;
            transform: translateX(-50%) rotate(45deg);
            border-left: none;
            border-top: none;
            border-right: 1px solid rgba(255, 137, 47, 0.5);
            border-bottom: 1px solid rgba(255, 137, 47, 0.5);
          }
        }
      `}</style>
    </div>
  );
}
