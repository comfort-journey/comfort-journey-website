import { useCallback } from 'react';

/**
 * useParticleBurst:
 * Inspired by Anime.js particle bursts.
 * Spawns dynamic luxury travel sparkles / confetti bursting outward from
 * the clicked element or cursor coordinates with realistic physics & gravity.
 */
export function useParticleBurst() {
  const triggerBurst = useCallback((eventOrCoords, options = {}) => {
    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let originX = 0;
    let originY = 0;

    if (eventOrCoords && typeof eventOrCoords.clientX === 'number') {
      // It's a MouseEvent
      originX = eventOrCoords.clientX;
      originY = eventOrCoords.clientY;
    } else if (eventOrCoords && typeof eventOrCoords.x === 'number') {
      originX = eventOrCoords.x;
      originY = eventOrCoords.y;
    } else if (eventOrCoords && eventOrCoords.currentTarget) {
      const rect = eventOrCoords.currentTarget.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    } else {
      originX = window.innerWidth / 2;
      originY = window.innerHeight / 2;
    }

    const particleCount = options.count || 24;
    const colors = options.colors || ['#FF892F', '#6FE6FC', '#DAF561', '#F9FBE7', '#FFA459'];
    const container = document.createElement('div');
    
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999999';
    container.className = 'particle-burst-container';

    document.body.appendChild(container);

    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 6 + 4;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 2.5; // slight upward bias
      const size = Math.random() * 6 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const isStar = Math.random() > 0.5;

      particle.style.position = 'absolute';
      particle.style.left = `${originX}px`;
      particle.style.top = `${originY}px`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = isStar ? '2px' : '50%';
      particle.style.boxShadow = `0 0 8px ${color}`;
      particle.style.transform = 'translate(-50%, -50%) scale(1)';
      particle.style.opacity = '1';

      container.appendChild(particle);

      particles.push({
        el: particle,
        x: originX,
        y: originY,
        vx,
        vy,
        size,
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 15,
        alpha: 1,
      });
    }

    let startTime = performance.now();
    const duration = 1200; // ms

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = elapsed / duration;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22; // gravity
        p.vx *= 0.96; // friction
        p.rotation += p.vRot;
        p.alpha = Math.max(0, 1 - progress * 1.3);

        p.el.style.transform = `translate3d(${p.x - originX}px, ${p.y - originY}px, 0) rotate(${p.rotation}deg) scale(${1 - progress * 0.4})`;
        p.el.style.opacity = p.alpha;
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
      }
    };

    requestAnimationFrame(step);
  }, []);

  return { triggerBurst };
}
