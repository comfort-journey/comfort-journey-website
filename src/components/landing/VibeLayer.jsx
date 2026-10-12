import React, { useEffect, useRef, useState } from 'react';

// Lightweight, CSS-only mood layer for each audience page (snow for winter,
// petals for couples, rain for monsoon, diyas for spiritual trips...).
// Only transform and opacity are animated, it pauses when off screen and it
// is removed completely for people who prefer reduced motion.
const COUNTS = {
  snow: 26, petals: 16, rain: 34, confetti: 22, bubbles: 14, fireflies: 16,
  sun: 1, marigold: 16, diya: 12, mist: 3, wind: 10, planes: 2, flags: 1, none: 0
};

const seeded = (i, salt) => {
  const x = Math.sin((i + 1) * 9301 + salt * 49297) * 233280;
  return x - Math.floor(x);
};

export default function VibeLayer({ vibe = 'none', accent = '#FF892F' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);
  const count = COUNTS[vibe] ?? 0;

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  if (!count) return null;

  if (vibe === 'flags') {
    const colors = ['#2563EB', '#F9FBE7', '#DC2626', '#16A34A', '#F59E0B'];
    return (
      <div ref={ref} className={`vibe-layer vibe-flags ${visible ? '' : 'is-paused'}`} aria-hidden="true">
        <svg className="vibe-flag-string" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0 18 Q 600 92 1200 18" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
        </svg>
        <div className="vibe-flag-row">
          {Array.from({ length: 18 }).map((_, i) => {
            const t = i / 17;
            const y = 18 + (1 - Math.pow(2 * t - 1, 2)) * 37;
            return (
              <span
                key={i}
                className="vibe-flag"
                style={{ left: `${t * 100}%`, top: `${(y / 120) * 100}%`, background: colors[i % 5], '--d': `${(i % 6) * 0.25}s` }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  if (vibe === 'sun') {
    return (
      <div ref={ref} className={`vibe-layer vibe-sun ${visible ? '' : 'is-paused'}`} aria-hidden="true">
        <span className="vibe-sun-orb" />
        <span className="vibe-sun-ring" />
      </div>
    );
  }

  if (vibe === 'planes') {
    return (
      <div ref={ref} className={`vibe-layer vibe-planes ${visible ? '' : 'is-paused'}`} aria-hidden="true">
        {[0, 1].map((i) => (
          <span key={i} className="vibe-plane" style={{ '--i': i, top: `${18 + i * 34}%` }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" /></svg>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`vibe-layer vibe-${vibe} ${visible ? '' : 'is-paused'}`}
      style={{ '--vibe-accent': accent }}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => {
        const left = seeded(i, 1) * 100;
        const delay = -seeded(i, 2) * 14;
        const dur = 8 + seeded(i, 3) * 10;
        const size = 0.6 + seeded(i, 4) * 0.9;
        const top = seeded(i, 5) * 100;
        return (
          <span
            key={i}
            className="vibe-bit"
            style={{
              left: `${left}%`,
              top: vibe === 'fireflies' || vibe === 'mist' || vibe === 'wind' ? `${top}%` : undefined,
              '--delay': `${delay}s`,
              '--dur': `${vibe === 'rain' ? dur / 9 : dur}s`,
              '--size': size,
              '--sway': `${(seeded(i, 6) - 0.5) * 80}px`,
              '--hue': `${Math.round(seeded(i, 7) * 360)}`
            }}
          />
        );
      })}
    </div>
  );
}
