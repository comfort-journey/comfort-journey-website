import React, { useEffect, useState, createContext, useContext } from 'react';
import Lenis from 'lenis';

const SmoothScrollContext = createContext(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({ children }) {
  const [lenisInstance, setLenisInstance] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis with luxury travel inertia curve
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Cubic-out smooth inertia
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    });

    setLenisInstance(lenis);

    // Track scroll progress for the top laser glow bar & ambient orbs
    const onScroll = (e) => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (e.scroll / totalScroll) * 100));
        setScrollProgress(progress);
        document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
        document.documentElement.style.setProperty('--scroll-y', `${e.scroll}px`);
      }
    };

    lenis.on('scroll', onScroll);

    // RAF loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Handle internal anchor links smoothly
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        const id = target.getAttribute('href');
        if (id && id !== '#' && id.length > 1) {
          const element = document.querySelector(id);
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element, { offset: -70, duration: 1.4 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, scrollProgress }}>
      {/* 1. Ultra-Thin Gold Aurora Laser Scroll Progress Bar */}
      <div className="scroll-progress-container">
        <div 
          className="scroll-progress-laser" 
          style={{ transform: `scaleX(${scrollProgress / 100})` }} 
        />
        <div 
          className="scroll-progress-glow" 
          style={{ left: `${scrollProgress}%` }} 
        />
      </div>

      {children}

      <style>{`
        /* Lenis base styles */
        html.lenis, html.lenis body {
          height: auto;
        }
        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }
        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        .lenis.lenis-stopped {
          overflow: hidden;
        }
        .lenis.lenis-scrolling iframe {
          pointer-events: none;
        }

        /* Laser Scroll Progress Bar */
        .scroll-progress-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          z-index: 9999;
          pointer-events: none;
          background: rgba(255, 255, 255, 0.05);
        }

        .scroll-progress-laser {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform-origin: 0% 50%;
          background: linear-gradient(90deg, 
            #FF6B00 0%, 
            #FFA000 30%, 
            #FFD700 65%, 
            #8B5CF6 100%
          );
          box-shadow: 0 0 12px rgba(255, 107, 0, 0.8), 0 0 20px rgba(255, 184, 0, 0.5);
          transition: transform 0.08s ease-out;
        }

        .scroll-progress-glow {
          position: absolute;
          top: -3px;
          width: 20px;
          height: 9px;
          border-radius: 50%;
          background: #FFF;
          box-shadow: 0 0 15px #FFB800, 0 0 25px #FF6B00;
          transform: translateX(-50%);
          opacity: ${scrollProgress > 1 && scrollProgress < 99 ? 1 : 0};
          transition: opacity 0.2s ease;
        }
      `}</style>
    </SmoothScrollContext.Provider>
  );
}
