import React, { useEffect, useRef, createContext, useContext } from 'react';

const SmoothScrollContext = createContext(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/**
 * SmoothScrollProvider:
 * Ultra-fast native GPU hardware scrolling with instant input responsiveness.
 * Passive RAF scroll tracker for top laser progress bar with 0ms input lag.
 */
export default function SmoothScrollProvider({ children }) {
  const laserRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateScrollLaser = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / totalScroll) * 100));
        if (laserRef.current) {
          laserRef.current.style.transform = `scaleX(${progress / 100})`;
        }
        if (glowRef.current) {
          glowRef.current.style.left = `${progress}%`;
          glowRef.current.style.opacity = progress > 0.5 && progress < 99.5 ? '1' : '0';
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollLaser);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Handle internal anchor links with smooth scroll
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        const id = target.getAttribute('href');
        if (id && id !== '#' && id.length > 1) {
          const element = document.querySelector(id);
          if (element) {
            e.preventDefault();
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{}}>
      {/* 1. Ultra-Thin Gold Aurora Laser Scroll Progress Bar (Direct GPU RAF) */}
      <div className="scroll-progress-container">
        <div 
          ref={laserRef}
          className="scroll-progress-laser" 
          style={{ transform: 'scaleX(0)' }} 
        />
        <div 
          ref={glowRef}
          className="scroll-progress-glow" 
          style={{ left: '0%', opacity: 0 }} 
        />
      </div>

      {children}

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        /* Laser Scroll Progress Bar */
        .scroll-progress-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          z-index: 99999;
          pointer-events: none;
          background: rgba(255, 255, 255, 0.05);
          transform: translateZ(0);
        }

        .scroll-progress-laser {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform-origin: 0% 50%;
          background: linear-gradient(90deg, 
            #FF892F 0%, 
            #FFA459 30%, 
            #DAF561 65%, 
            #6FE6FC 100%
          );
          box-shadow: 0 0 10px rgba(255, 137, 47, 0.8), 0 0 16px rgba(218, 245, 97, 0.5);
          will-change: transform;
        }

        .scroll-progress-glow {
          position: absolute;
          top: -3px;
          width: 16px;
          height: 9px;
          border-radius: 50%;
          background: #FFF;
          box-shadow: 0 0 12px #DAF561, 0 0 20px #FF892F;
          transform: translateX(-50%);
          transition: opacity 0.2s ease;
          pointer-events: none;
        }
      `}</style>
    </SmoothScrollContext.Provider>
  );
}
