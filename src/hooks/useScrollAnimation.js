import { useEffect } from 'react';

/**
 * useScrollAnimation:
 * High-performance, GPU-accelerated IntersectionObserver for smooth scroll-reveals.
 * Animates ONLY `opacity` and `transform` (no filter: blur or JS loops) for solid 120 FPS.
 */
export function useScrollAnimation() {
  useEffect(() => {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.animate-on-scroll, .section-header, .tour-card, .service-card, .pillar-card, .review-card, .reel-card')
        .forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Unobserve once revealed to keep DOM lean
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll(
      '.animate-on-scroll, .section-header, .tour-card, .service-card, .pillar-card, .review-card, .reel-card, .studio-controls, .studio-preview-card, .about-image-col, .about-content-col'
    );

    elements.forEach((el, index) => {
      // Add staggered delay for grid siblings
      if (el.classList.contains('tour-card') || el.classList.contains('service-card') || el.classList.contains('pillar-card') || el.classList.contains('reel-card')) {
        const delay = (index % 3) * 0.08;
        el.style.transitionDelay = `${delay}s`;
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
