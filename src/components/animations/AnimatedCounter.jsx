import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter:
 * Inspired by Anime.js elastic number tickers & odometers.
 * Smoothly interpolates and counts numeric values when scrolled into viewport.
 * Supports custom prefixes, suffixes, decimals, and formatting.
 */
export default function AnimatedCounter({
  target = 100,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  triggerOnce = true,
}) {
  const [count, setCount] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!hasTriggered || !triggerOnce)) {
            setHasTriggered(true);
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
        const currentVal = easedProgress * target;

        setCount(currentVal);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };

      requestAnimationFrame(step);
    };

    return () => observer.disconnect();
  }, [target, duration, hasTriggered, triggerOnce]);

  const formattedValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString('en-IN');

  return (
    <span ref={elementRef} className={`animated-counter-root ${className}`}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}
