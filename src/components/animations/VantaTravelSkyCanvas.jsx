import React, { useEffect, useRef } from 'react';

/**
 * VantaTravelSkyCanvas:
 * Ultra-efficient, 120 FPS HTML5 Canvas simulating majestic flocking
 * birds & glowing flight jet streams soaring across the night sky.
 * Auto-pauses when out of viewport and uses low-draw overhead for zero lag.
 */
export default function VantaTravelSkyCanvas({ 
  birdCount = 14, 
  jetStreamCount = 2, 
  className = '', 
  interactive = true,
  opacity = 0.65 
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let isVisible = true;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 160,
      isHovering: false,
    };

    // Resize handler (Fixed to 1x DPR for maximum GPU rendering speed)
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.isHovering = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // ==========================================
    // 1. BOID FLOCKING PARTICLES (Travel Birds)
    // ==========================================
    const effectiveBirdCount = prefersReducedMotion ? 6 : birdCount;
    const birds = [];

    const colors = [
      'rgba(255, 137, 47, ',   // Tangerine
      'rgba(111, 230, 252, ',  // Electric Aqua
      'rgba(218, 245, 97, ',   // Lime Cream
      'rgba(249, 251, 231, ',  // Beige Cream
    ];

    for (let i = 0; i < effectiveBirdCount; i++) {
      birds.push({
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * ((height || window.innerHeight) * 0.7),
        z: Math.random() * 0.5 + 0.5,
        vx: (Math.random() * 1.5 + 1.2),
        vy: (Math.random() - 0.5) * 0.4,
        wingPhase: Math.random() * Math.PI * 2,
        wingSpeed: Math.random() * 0.12 + 0.1,
        size: Math.random() * 5 + 6,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.35,
      });
    }

    // ==========================================
    // 2. JET STREAMS
    // ==========================================
    const jetStreams = [];
    for (let i = 0; i < jetStreamCount; i++) {
      jetStreams.push({
        x: -120,
        y: Math.random() * (height * 0.6) + 40,
        speed: Math.random() * 2.0 + 2.2,
        length: Math.random() * 140 + 120,
        color: i % 2 === 0 ? 'rgba(255, 137, 47, 0.4)' : 'rgba(111, 230, 252, 0.4)',
        angle: (Math.random() * 0.14 - 0.07),
      });
    }

    // IntersectionObserver to sleep canvas when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // ==========================================
    // RENDER LOOP
    // ==========================================
    const render = (currentTime) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // Jet Streams
      for (let j = 0; j < jetStreams.length; j++) {
        const jet = jetStreams[j];
        jet.x += jet.speed;
        jet.y += Math.sin(currentTime * 0.001 + jet.x * 0.005) * 0.35 + jet.angle;

        if (jet.x - jet.length > width) {
          jet.x = -jet.length - Math.random() * 150;
          jet.y = Math.random() * (height * 0.6) + 40;
        }

        const grad = ctx.createLinearGradient(jet.x - jet.length, jet.y, jet.x, jet.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.7, jet.color);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.8)');

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.moveTo(jet.x - jet.length, jet.y);
        ctx.lineTo(jet.x, jet.y);
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(jet.x, jet.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Birds
      for (let b = 0; b < birds.length; b++) {
        const bird = birds[b];
        bird.wingPhase += bird.wingSpeed;
        const wingSpan = Math.sin(bird.wingPhase) * (bird.size * 0.8);

        bird.y += bird.vy;
        bird.x += bird.vx * bird.z;

        if (interactive && mouse.isHovering) {
          const dx = bird.x - mouse.x;
          const dy = bird.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 1.2;
            bird.x += (dx / dist) * force * 2;
            bird.y += (dy / dist) * force * 2;
          }
        }

        bird.vy *= 0.98;

        if (bird.x > width + 30) {
          bird.x = -30;
          bird.y = Math.random() * (height * 0.7);
        }

        const scale = bird.z;
        const currentAlpha = bird.alpha * opacity;

        ctx.save();
        ctx.translate(bird.x, bird.y);

        const angle = Math.atan2(bird.vy, bird.vx * bird.z);
        ctx.rotate(angle);

        ctx.strokeStyle = `${bird.colorBase}${currentAlpha})`;
        ctx.lineWidth = 1.3 * scale;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(-bird.size * scale * 0.6, -wingSpan * scale);
        ctx.quadraticCurveTo(-bird.size * scale * 0.2, 0, 0, 0);
        ctx.quadraticCurveTo(bird.size * scale * 0.2, 0, bird.size * scale * 0.6, -wingSpan * scale);
        ctx.stroke();

        ctx.restore();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [birdCount, jetStreamCount, interactive, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`vanta-sky-canvas ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity,
        transform: 'translateZ(0)',
      }}
    />
  );
}
