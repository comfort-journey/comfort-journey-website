import { useEffect } from 'react';

/**
 * useLuxuryAnimationSuite:
 * 1. IntersectionObserver for smooth entrance & staggered reveals
 * 2. Dynamic mouse spotlight tracking on cards & borders
 * 3. 3D card tilt micro-physics
 * 4. Magnetic button physics on CTAs
 */
export function useLuxuryAnimationSuite() {
  useEffect(() => {
    // 1. SCROLL REVEAL OBSERVER
    const revealElements = document.querySelectorAll(
      '[data-reveal], .reveal-on-scroll, .section-header, .tour-card, .service-card, .pillar-card, .reel-card, .review-card, .studio-controls, .studio-preview-card'
    );

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Once revealed, unobserve to keep browser lightweight
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.12,
    });

    revealElements.forEach((el, index) => {
      // If element is a child in a grid, add staggered delay attribute
      if (!el.style.transitionDelay && (el.classList.contains('tour-card') || el.classList.contains('service-card') || el.classList.contains('pillar-card') || el.classList.contains('reel-card'))) {
        const delay = (index % 4) * 0.08;
        el.style.transitionDelay = `${delay}s`;
      }
      observer.observe(el);
    });

    // 2. DYNAMIC MOUSE SPOTLIGHT & 3D TILT
    const handlePointerMove = (e) => {
      const targetCard = e.target.closest('.spotlight-card, .tour-card, .glass-card, .glass-panel, .tier-card');
      if (targetCard) {
        const rect = targetCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        targetCard.style.setProperty('--mouse-x', `${x}px`);
        targetCard.style.setProperty('--mouse-y', `${y}px`);

        // Subtle 3D tilt calculation
        if (targetCard.classList.contains('tilt-enabled') || targetCard.classList.contains('tour-card')) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -5; // max 5 deg tilt
          const rotateY = ((x - centerX) / centerX) * 5;
          targetCard.style.setProperty('--tilt-rx', `${rotateX.toFixed(2)}deg`);
          targetCard.style.setProperty('--tilt-ry', `${rotateY.toFixed(2)}deg`);
        }
      }
    };

    const handlePointerLeave = (e) => {
      const targetCard = e.target.closest('.spotlight-card, .tour-card, .glass-card, .glass-panel, .tier-card');
      if (targetCard) {
        targetCard.style.setProperty('--tilt-rx', '0deg');
        targetCard.style.setProperty('--tilt-ry', '0deg');
      }
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerout', handlePointerLeave, { passive: true });

    // 3. MAGNETIC BUTTON MICRO-PHYSICS
    const magneticBtns = document.querySelectorAll('.btn-magnetic, .btn-ai-glow, .btn-primary');

    const handleMagneticMove = (e) => {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    };

    const handleMagneticReset = (e) => {
      const btn = e.currentTarget;
      btn.style.transform = 'translate(0px, 0px)';
    };

    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', handleMagneticMove);
      btn.addEventListener('mouseleave', handleMagneticReset);
    });

    // Cleanup
    return () => {
      observer.disconnect();
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerout', handlePointerLeave);
      magneticBtns.forEach((btn) => {
        btn.removeEventListener('mousemove', handleMagneticMove);
        btn.removeEventListener('mouseleave', handleMagneticReset);
      });
    };
  }, []);
}
