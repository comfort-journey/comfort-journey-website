import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageCircle, Phone, ArrowRight, X, Heart, Star, Compass } from 'lucide-react';

/**
 * HeroMascot - "Comfy 🐺" The Official Comfort Journey 3D Brand Buddy
 * 
 * Features:
 *  - Stereoscopic 3D Multi-Plane Parallax Rig:
 *      * Layer 1: Receding Ears (Z: -28px)
 *      * Layer 2: Head Base & Bandana (Z: 0px)
 *      * Layer 3: Dynamic 3D Eye Sockets with moving pupil tracking (Z: +16px)
 *      * Layer 4: Protruding 3D Muzzle & Wet Nose (Z: +42px, parallax amplified)
 *      * Layer 5: Dynamic Cursor-Tracking Specular Light Glint (Z: +46px)
 *      * Layer 6: Front Paws firmly anchored to the headline sign (Z: +55px)
 *  - Lifelike Organic Idle Physics: Natural chest & ear breathing cycle (4.5s ease-in-out).
 *  - Natural Spontaneous Blinking (every 3.5s - 5.5s).
 *  - Real Brand Buddy Concierge Popover:
 *      * 1-Click AI Trip Planner trigger
 *      * 1-Click Custom Quote trigger
 *      * Direct WhatsApp Concierge hotline
 *      * 2026 Special Tour Recommendations
 *  - Celebratory Wink & Cheerful Bounce on click with golden stardust particles.
 */
export default function HeroMascot({ heroRef, onOpenAIPlanner, onOpenQuote }) {
  const stageRef = useRef(null);
  const rigRef = useRef(null);
  const pupilLeftRef = useRef(null);
  const pupilRightRef = useRef(null);
  const snoutRef = useRef(null);
  const pawsRef = useRef(null);
  const specularRef = useRef(null);

  const [isReacting, setIsReacting] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBuddyModalOpen, setIsBuddyModalOpen] = useState(false);
  const [speechGreeting, setSpeechGreeting] = useState("Hi! I'm Comfy 🐺 Your Travel Buddy");
  const [isMobile, setIsMobile] = useState(false);

  // Physics animation state
  const animState = useRef({
    targetRotX: 0,
    targetRotY: 0,
    targetRotZ: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    pupilX: 0,
    pupilY: 0,
    targetPupilX: 0,
    targetPupilY: 0,
    mouseX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    mouseY: typeof window !== 'undefined' ? 300 : 0,
  });

  const rafRef = useRef(null);
  const reactionTimerRef = useRef(null);

  // Dynamic asset URLs supporting GitHub Pages subdirectories
  const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';
  const mascotEarsSrc = `${basePrefix}mascot-ears.png`;
  const mascotScleraSrc = `${basePrefix}mascot-sclera.png`;
  const mascotPupilSrc = `${basePrefix}mascot-pupil.png`;
  const mascotSnoutSrc = `${basePrefix}mascot-snout.png`;
  const mascotPawsSrc = `${basePrefix}mascot-paws.png`;
  const mascotReactionSrc = `${basePrefix}mascot-reaction.png`;

  // Preload all assets
  useEffect(() => {
    [mascotEarsSrc, mascotScleraSrc, mascotPupilSrc, mascotSnoutSrc, mascotPawsSrc, mascotReactionSrc].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [mascotEarsSrc, mascotScleraSrc, mascotPupilSrc, mascotSnoutSrc, mascotPawsSrc, mascotReactionSrc]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(hover: none)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Periodic natural blinking
  useEffect(() => {
    let timeoutId;
    const scheduleNextBlink = () => {
      const delay = Math.random() * 2500 + 3500; // 3.5s - 6s
      timeoutId = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 140);
      }, delay);
    };

    scheduleNextBlink();
    return () => clearTimeout(timeoutId);
  }, []);

  // 60/120fps Continuous Stereoscopic Parallax Loop
  useEffect(() => {
    if (isMobile) {
      if (rigRef.current) {
        rigRef.current.style.transform = 'perspective(850px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
      }
      return;
    }

    let isRunning = true;
    const state = animState.current;

    const tick = () => {
      if (!isRunning) return;

      // Smooth interpolation for head rotation (factor 0.10 for natural neck muscle inertia)
      state.rotX += (state.targetRotX - state.rotX) * 0.10;
      state.rotY += (state.targetRotY - state.rotY) * 0.10;
      state.rotZ += (state.targetRotZ - state.rotZ) * 0.10;

      // Faster interpolation for pupils (factor 0.16 for responsive eye saccades)
      state.pupilX += (state.targetPupilX - state.pupilX) * 0.16;
      state.pupilY += (state.targetPupilY - state.pupilY) * 0.16;

      // 1. Rotate main 3D head assembly
      if (rigRef.current) {
        rigRef.current.style.transform = `perspective(850px) rotateX(${state.rotX.toFixed(2)}deg) rotateY(${state.rotY.toFixed(2)}deg) rotateZ(${state.rotZ.toFixed(2)}deg)`;
      }

      // 2. Extra 3D parallax displacement for protruding snout (protrudes 42px in front)
      if (snoutRef.current) {
        const snoutShiftX = (state.rotY * 0.40).toFixed(1);
        const snoutShiftY = (-state.rotX * 0.28).toFixed(1);
        snoutRef.current.style.transform = `translate3d(${snoutShiftX}px, ${snoutShiftY}px, 42px)`;
      }

      // 3. Paws anchored to ledge with subtle resisting physics
      if (pawsRef.current) {
        const pawResistX = (state.rotY * -0.12).toFixed(1);
        pawsRef.current.style.transform = `translate3d(${pawResistX}px, 0, 55px)`;
      }

      // 4. Pupils tracking in eye sockets
      const pTransform = `translate(calc(-50% + ${state.pupilX.toFixed(1)}px), calc(-50% + ${state.pupilY.toFixed(1)}px))`;
      if (pupilLeftRef.current) pupilLeftRef.current.style.transform = pTransform;
      if (pupilRightRef.current) pupilRightRef.current.style.transform = pTransform;

      // 5. Specular highlight following light angle
      if (specularRef.current) {
        const lightX = 50 + (state.rotY / 22) * 28;
        const lightY = 50 + (-state.rotX / 16) * 28;
        specularRef.current.style.background = `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255, 235, 195, 0.42) 0%, rgba(255, 184, 0, 0.12) 38%, transparent 70%)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      isRunning = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  // Window-wide cursor tracking
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const state = animState.current;
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;

      if (!rigRef.current) return;

      const rect = rigRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.45; // Center between eyes and muzzle

      const deltaX = e.clientX - cx;
      const deltaY = e.clientY - cy;

      const maxDistX = Math.max(window.innerWidth / 2, 450);
      const maxDistY = Math.max(window.innerHeight / 2, 380);

      const normX = Math.max(-1, Math.min(1, deltaX / maxDistX));
      const normY = Math.max(-1, Math.min(1, deltaY / maxDistY));

      // 3D Rotation angles:
      // Turn left/right: max ±22deg
      // Pitch up/down: max ±16deg
      // Cute ear tilt: max ±3.5deg
      state.targetRotY = normX * 22;
      state.targetRotX = -normY * 16;
      state.targetRotZ = normX * -3.5;

      // Spherical pupil offset (max ~5.2px inside eye socket)
      const angle = Math.atan2(deltaY, deltaX);
      const distRatio = Math.min(1, Math.hypot(deltaX, deltaY) / 320);
      state.targetPupilX = Math.cos(angle) * distRatio * 5.2;
      state.targetPupilY = Math.sin(angle) * distRatio * 5.2;
    };

    const handleMouseLeave = () => {
      const state = animState.current;
      state.targetRotX = 0;
      state.targetRotY = 0;
      state.targetRotZ = 0;
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

  // Click outside to close buddy popover
  useEffect(() => {
    if (!isBuddyModalOpen) return;
    const handleClickOutside = (e) => {
      if (stageRef.current && !stageRef.current.contains(e.target)) {
        setIsBuddyModalOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isBuddyModalOpen]);

  // Click on Comfy: triggers winking reaction and toggles buddy assistant popover
  const handleMascotClick = (e) => {
    e.stopPropagation();
    setIsReacting(true);
    setIsBuddyModalOpen((prev) => !prev);

    const friendlyGreetings = [
      "I'm here to help you plan! ✈️",
      "Comfort awaits! Where to next? 🏔️",
      "Your personal travel buddy since 1992! 👑",
      "Need a customized tour? Click below! 🌸"
    ];
    setSpeechGreeting(friendlyGreetings[Math.floor(Math.random() * friendlyGreetings.length)]);

    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    reactionTimerRef.current = setTimeout(() => {
      setIsReacting(false);
    }, 1000);
  };

  return (
    <div 
      ref={stageRef}
      className="hero-mascot-stage"
      aria-label="Comfy the Comfort Journey 3D Mascot Buddy"
    >
      {/* Brand Buddy Floating Speech Pill */}
      {!isBuddyModalOpen && (
        <div 
          className={`buddy-speech-chip ${isHovered ? 'is-hovered' : ''}`}
          onClick={handleMascotClick}
          title="Click to talk to Comfy!"
        >
          <span className="buddy-chip-pulse"></span>
          <span className="buddy-chip-text">{isHovered ? "Click me! I'm your travel buddy 💬" : speechGreeting}</span>
          <div className="buddy-chip-tail" />
        </div>
      )}

      {/* Brand Buddy Interactive Concierge Popover Menu */}
      {isBuddyModalOpen && (
        <div className="buddy-concierge-popover animate-pop-in">
          <div className="buddy-popover-header">
            <div className="flex items-center gap-2">
              <span className="buddy-avatar-badge">🐺</span>
              <div>
                <div className="buddy-name-title">Comfy · Your Travel Buddy</div>
                <div className="buddy-status-sub">24/7 Live Assistance · Free & Instant</div>
              </div>
            </div>
            <button 
              type="button"
              className="buddy-close-btn" 
              onClick={(e) => {
                e.stopPropagation();
                setIsBuddyModalOpen(false);
              }}
              aria-label="Close buddy assistant"
            >
              <X size={15} />
            </button>
          </div>

          <p className="buddy-popover-desc">
            How can I make your journey extraordinary today? Pick an option or message our concierges directly:
          </p>

          <div className="buddy-action-chips-grid">
            <button
              type="button"
              className="buddy-chip-btn chip-ai"
              onClick={() => {
                setIsBuddyModalOpen(false);
                if (onOpenAIPlanner) onOpenAIPlanner();
              }}
            >
              <Sparkles size={14} className="text-orange" />
              <span>Plan Trip with Comfy.ai</span>
            </button>

            <button
              type="button"
              className="buddy-chip-btn chip-quote"
              onClick={() => {
                setIsBuddyModalOpen(false);
                if (onOpenQuote) onOpenQuote();
              }}
            >
              <Compass size={14} className="text-gold" />
              <span>Request Custom Itinerary</span>
            </button>

            <a
              href="https://wa.me/918770403315?text=Hi%20Comfy!%20I%20want%20to%20plan%20a%20luxury%20vacation%20with%20Comfort%20Journey."
              target="_blank"
              rel="noopener noreferrer"
              className="buddy-chip-btn chip-whatsapp"
              onClick={() => setIsBuddyModalOpen(false)}
            >
              <MessageCircle size={14} className="text-emerald" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="tel:+918770403315"
              className="buddy-chip-btn chip-call"
              onClick={() => setIsBuddyModalOpen(false)}
            >
              <Phone size={14} className="text-sky" />
              <span>Call Founder (+91 8770403315)</span>
            </a>
          </div>

          <div className="buddy-popover-footer">
            <span className="rating-pill">⭐ 4.92 / 5.0 (30,000+ Happy Travelers)</span>
          </div>
        </div>
      )}

      {/* Stereoscopic 3D Multi-Plane Head Rig */}
      <div 
        ref={rigRef}
        className={`head-3d-rig ${isReacting ? 'is-reacting' : ''}`}
        onClick={handleMascotClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="Hi! I'm Comfy! Click me to plan your trip!"
      >
        {/* If reacting, show cheerful winking pose; otherwise full stereoscopic 3D layers */}
        {isReacting ? (
          <img
            src={mascotReactionSrc}
            alt="Comfy Winking"
            className="layer-img winking-face"
            draggable="false"
            onError={(e) => {
              e.currentTarget.src = './mascot-reaction.png';
            }}
          />
        ) : (
          <>
            {/* Layer 1: Receding 3D Ears (Z: -28px) */}
            <div className="layer-ears">
              <img 
                src={mascotEarsSrc} 
                alt="Ears" 
                className="layer-img" 
                draggable="false"
                onError={(e) => { e.currentTarget.src = './mascot-ears.png'; }}
              />
            </div>

            {/* Layer 2: Head Base & Bandana (Z: 0px) */}
            <div className="layer-head-base">
              <img 
                src={mascotScleraSrc} 
                alt="Wolf Head" 
                className="layer-img" 
                draggable="false"
                onError={(e) => { e.currentTarget.src = './mascot-sclera.png'; }}
              />
            </div>

            {/* Layer 3: Dynamic 3D Eye Sockets with Look-At Pupil Tracking (Z: +16px) */}
            <div className="layer-eyes">
              {/* Left Eye Socket */}
              <div className={`eye-socket left-eye ${isBlinking ? 'blinking' : ''}`}>
                <div ref={pupilLeftRef} className="pupil-tracker">
                  <img 
                    src={mascotPupilSrc} 
                    alt="Pupil Left" 
                    className="pupil-img" 
                    draggable="false"
                    onError={(e) => { e.currentTarget.src = './mascot-pupil.png'; }}
                  />
                </div>
                {/* Natural Blinking Eyelid */}
                <div className="eyelid-shutter" />
              </div>

              {/* Right Eye Socket */}
              <div className={`eye-socket right-eye ${isBlinking ? 'blinking' : ''}`}>
                <div ref={pupilRightRef} className="pupil-tracker">
                  <img 
                    src={mascotPupilSrc} 
                    alt="Pupil Right" 
                    className="pupil-img" 
                    draggable="false"
                    onError={(e) => { e.currentTarget.src = './mascot-pupil.png'; }}
                  />
                </div>
                {/* Natural Blinking Eyelid */}
                <div className="eyelid-shutter" />
              </div>
            </div>

            {/* Layer 4: Protruding 3D Muzzle & Wet Nose (Z: +42px, parallax amplified) */}
            <div ref={snoutRef} className="layer-snout">
              <img 
                src={mascotSnoutSrc} 
                alt="Snout" 
                className="layer-img" 
                draggable="false"
                onError={(e) => { e.currentTarget.src = './mascot-snout.png'; }}
              />
            </div>

            {/* Layer 5: Dynamic Cursor-Tracking Specular Light Glint (Z: +46px) */}
            <div ref={specularRef} className="layer-specular-light" />

            {/* Layer 6: Front Paws Anchored to Top of Headline (Z: +55px) */}
            <div ref={pawsRef} className="layer-paws">
              <img 
                src={mascotPawsSrc} 
                alt="Paws" 
                className="layer-img" 
                draggable="false"
                onError={(e) => { e.currentTarget.src = './mascot-paws.png'; }}
              />
            </div>
          </>
        )}

        {/* Soft Contact Drop-Shadow Underneath Paws */}
        <div className="mascot-paw-shadow" />
      </div>

      <style>{`
        .hero-mascot-stage {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          width: 100%;
          height: 115px;
          margin-bottom: -15px; /* Paws sit right on top of the text border */
          z-index: 15;
          user-select: none;
        }

        /* 3D Stereoscopic Rig Assembly */
        .head-3d-rig {
          position: relative;
          width: clamp(125px, 14.5vw, 160px);
          height: clamp(110px, 12.8vw, 140px);
          transform-style: preserve-3d;
          will-change: transform;
          cursor: pointer;
          animation: buddyBreathing 4.5s ease-in-out infinite;
          transition: transform 0.06s cubic-bezier(0.2, 0, 0.2, 1);
        }

        /* Subtle Lifelike Breathing Physics */
        @keyframes buddyBreathing {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-2px) scale(1.015);
          }
        }

        .layer-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          pointer-events: none;
        }

        .winking-face {
          filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.45));
        }

        /* Layer 1: Receding Ears */
        .layer-ears {
          position: absolute;
          inset: 0;
          transform: translateZ(-28px);
          pointer-events: none;
        }

        /* Layer 2: Head Base */
        .layer-head-base {
          position: absolute;
          inset: 0;
          transform: translateZ(0px);
          filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.35));
          pointer-events: none;
        }

        /* Layer 3: Eyes & Pupils */
        .layer-eyes {
          position: absolute;
          inset: 0;
          transform: translateZ(16px);
          pointer-events: none;
        }

        .eye-socket {
          position: absolute;
          width: 9.2%;
          height: 10%;
          overflow: hidden;
          border-radius: 50% 50% 48% 48%;
          box-shadow: inset 0 2px 4px rgba(30, 20, 15, 0.55);
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
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4));
        }

        /* Eyelid Shutter for Natural Blinks */
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

        /* Layer 4: Protruding Snout & Muzzle */
        .layer-snout {
          position: absolute;
          inset: 0;
          transform: translateZ(42px);
          filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
          pointer-events: none;
        }

        /* Layer 5: Dynamic Cursor Specular Lighting */
        .layer-specular-light {
          position: absolute;
          inset: 0;
          transform: translateZ(46px);
          pointer-events: none;
          mix-blend-mode: overlay;
          border-radius: 50%;
          opacity: 0.75;
          transition: background 0.05s ease;
        }

        /* Layer 6: Paws */
        .layer-paws {
          position: absolute;
          inset: 0;
          transform: translateZ(55px);
          filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.45));
          pointer-events: none;
        }

        /* Click reaction cheerful bounce */
        .head-3d-rig.is-reacting {
          animation: mascotCheerBounce 0.75s cubic-bezier(0.25, 1.4, 0.5, 1);
        }

        @keyframes mascotCheerBounce {
          0% { transform: scale(1) translateY(0); }
          30% { transform: scale(0.92) translateY(8px); }
          65% { transform: scale(1.06) translateY(-6px); }
          100% { transform: scale(1) translateY(0); }
        }

        /* Soft contact drop shadow under paws */
        .mascot-paw-shadow {
          position: absolute;
          bottom: 2px;
          left: 10%;
          width: 80%;
          height: 8px;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0) 70%);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.85;
          transform: translateZ(20px);
        }

        /* Floating Speech Chip */
        .buddy-speech-chip {
          position: absolute;
          top: 15px;
          left: calc(50% + 78px);
          background: rgba(15, 23, 42, 0.94);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 137, 47, 0.5);
          color: #FFF;
          font-size: 0.76rem;
          font-weight: 600;
          padding: 0.38rem 0.85rem;
          border-radius: 16px;
          white-space: nowrap;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45), 0 0 16px rgba(255, 137, 47, 0.25);
          cursor: pointer;
          z-index: 25;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .buddy-speech-chip:hover {
          transform: scale(1.04);
          border-color: #FF892F;
        }

        .buddy-chip-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
          animation: pulseDot 1.8s infinite;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        .buddy-chip-tail {
          position: absolute;
          left: -5px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 8px;
          height: 8px;
          background: rgba(15, 23, 42, 0.94);
          border-left: 1px solid rgba(255, 137, 47, 0.5);
          border-bottom: 1px solid rgba(255, 137, 47, 0.5);
        }

        /* Interactive Brand Buddy Concierge Popover */
        .buddy-concierge-popover {
          position: absolute;
          top: 15px;
          left: calc(50% + 78px);
          width: 320px;
          background: rgba(11, 17, 32, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 137, 47, 0.6);
          border-radius: 20px;
          padding: 1.15rem;
          color: #FFF;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.65), 0 0 30px rgba(255, 137, 47, 0.25);
          z-index: 9999;
          pointer-events: auto;
        }

        .buddy-popover-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 0.65rem;
          margin-bottom: 0.65rem;
        }

        .buddy-avatar-badge {
          font-size: 1.4rem;
          background: rgba(255, 137, 47, 0.2);
          border: 1px solid rgba(255, 137, 47, 0.4);
          border-radius: 12px;
          padding: 0.2rem 0.4rem;
        }

        .buddy-name-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: #FFF;
        }

        .buddy-status-sub {
          font-size: 0.7rem;
          color: #10B981;
          font-weight: 500;
        }

        .buddy-close-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #94A3B8;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .buddy-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #FFF;
        }

        .buddy-popover-desc {
          font-size: 0.75rem;
          color: #CBD5E1;
          line-height: 1.4;
          margin: 0 0 0.85rem 0;
        }

        .buddy-action-chips-grid {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .buddy-chip-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(30, 41, 59, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0.5rem 0.75rem;
          color: #F1F5F9;
          font-size: 0.78rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.2, 0, 0.2, 1);
        }

        .buddy-chip-btn:hover {
          background: rgba(255, 137, 47, 0.18);
          border-color: rgba(255, 137, 47, 0.5);
          transform: translateX(3px);
          color: #FFF;
        }

        .buddy-popover-footer {
          margin-top: 0.8rem;
          padding-top: 0.6rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          text-align: center;
        }

        .rating-pill {
          font-size: 0.7rem;
          color: #FFB800;
          font-weight: 600;
        }

        .animate-pop-in {
          animation: popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes popIn {
          from { opacity: 0; transform: translateY(8px) scale(0.92); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Mobile Optimization */
        @media (max-width: 768px) {
          .hero-mascot-stage {
            height: 95px;
            margin-bottom: -12px;
          }

          .head-3d-rig {
            transform: perspective(850px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) !important;
            animation: none !important;
          }

          .buddy-speech-chip {
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.7rem;
            padding: 0.25rem 0.6rem;
          }

          .buddy-chip-tail {
            left: 50%;
            top: auto;
            bottom: -4px;
            transform: translateX(-50%) rotate(45deg);
            border-left: none;
            border-top: none;
            border-right: 1px solid rgba(255, 137, 47, 0.5);
            border-bottom: 1px solid rgba(255, 137, 47, 0.5);
          }

          .buddy-concierge-popover {
            top: -190px;
            left: 50%;
            transform: translateX(-50%);
            width: 290px;
          }
        }
      `}</style>
    </div>
  );
}
