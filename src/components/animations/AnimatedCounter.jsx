import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter:
 * Inspired by Anime.js elastic number tickers & odometers.
 * Smoothly interpolates and counts numeric values when scrolled into viewport.
 * Supports custom prefixes, suffixes, decimals, and formatting.
 */
export default function AnimatedCounter({
  target,
  value,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  triggerOnce = true,
}) {
  const finalTarget = Number(target !== undefined ? target : (value !== undefined ? value : 100));
  // Initialize to finalTarget so search engine crawlers, SSG, and pre-renders index the real numbers (e.g. 30+, 4.8★) instead of 0
  const [count, setCount] = useState(finalTarget);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(finalTarget);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!hasTriggered || !triggerOnce)) {
            setHasTriggered(true);
            setCount(0); // Reset to 0 just before triggering the smooth count-up animation for human eyes
            animateCount();
            if (triggerOnce) observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    const animateCount = () => {
      let startTime = null;

      const easeOutElastic = (t) => {
        // Anime.js inspired cubic-out with subtle bounce
        return 1 - Math.pow(1 - t, 4);
      };

      const step = (now) => {
        if (!startTime) startTime = now;
        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = easeOutElastic(progress);
        const currentVal = easedProgress * finalTarget;

        setCount(currentVal);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCount(finalTarget);
        }
      };

      requestAnimationFrame(step);
    };

    return () => observer.disconnect();
  }, [finalTarget, duration, hasTriggered, triggerOnce]);

  const formattedValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString('en-IN');

  return (
    <span ref={elementRef} className={`animated-counter-root ${className}`}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}
