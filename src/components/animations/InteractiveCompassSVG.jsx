import React, { useState, useEffect, useRef } from 'react';

/**
 * InteractiveCompassSVG:
 * Inspired by SVGator real-time vector mechanics.
 * A high-precision navigational compass SVG with rotating outer azimuth dial,
 * glowing degree tick marks, and an interactive magnetic needle that aligns
 * dynamically with mouse cursor angle or scroll velocity.
 */
export default function InteractiveCompassSVG({ 
  size = 72, 
  showLabels = true, 
  interactive = true,
  className = '' 
}) {
  const compassRef = useRef(null);
  const [needleAngle, setNeedleAngle] = useState(38); // default pleasant angle
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e) => {
      if (!compassRef.current) return;
      const rect = compassRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      // Calculate angle from center to mouse
      const rad = Math.atan2(dy, dx);
      let deg = (rad * 180) / Math.PI + 90; // offset so North is top
      setNeedleAngle(deg);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  return (
    <div 
      ref={compassRef}
      className={`interactive-compass-root ${className} ${isHovered ? 'compass-hover' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: size, height: size }}
      title="Interactive Travel Compass (Points to your cursor)"
    >
      <svg
        viewBox="0 0 100 100"
        className="compass-svg"
        width={size}
        height={size}
      >
        <defs>
          {/* Needle North Red-Amber Gradient */}
          <linearGradient id="needleNorthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF892F" />
            <stop offset="100%" stopColor="#E66F12" />
          </linearGradient>

          {/* Needle South Ice-Aqua Gradient */}
          <linearGradient id="needleSouthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EDF3D2" />
            <stop offset="100%" stopColor="#6FE6FC" />
          </linearGradient>

          {/* Dial Rim Metal Glow */}
          <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(111, 230, 252, 0.4)" />
            <stop offset="50%" stopColor="rgba(255, 137, 47, 0.3)" />
            <stop offset="100%" stopColor="rgba(218, 245, 97, 0.4)" />
          </linearGradient>

          {/* Center Jewel Glow */}
          <radialGradient id="jewelGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF" />
            <stop offset="40%" stopColor="#DAF561" />
            <stop offset="100%" stopColor="#052669" />
          </radialGradient>
        </defs>

        {/* Outer Ring & Bezel */}
        <circle cx="50" cy="50" r="47" fill="rgba(0, 29, 81, 0.85)" stroke="url(#rimGrad)" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="2 3" />
        
        {/* Rotating Outer Dial with Degree Ticks */}
        <g className="compass-dial-ticks">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="50"
              y1={deg % 90 === 0 ? "7" : "9"}
              x2="50"
              y2={deg % 90 === 0 ? "13" : "11"}
              stroke={deg === 0 ? "#FF892F" : "rgba(255, 255, 255, 0.4)"}
              strokeWidth={deg % 90 === 0 ? "1.8" : "1"}
              transform={`rotate(${deg} 50 50)`}
            />
          ))}
        </g>

        {/* Cardinal Directions */}
        {showLabels && (
          <g className="cardinal-labels" fontFamily="Outfit, sans-serif" fontSize="7.5" fontWeight="900" textAnchor="middle">
            <text x="50" y="22" fill="#FF892F">N</text>
            <text x="80" y="53" fill="#6FE6FC">E</text>
            <text x="50" y="83" fill="#EDF3D2">S</text>
            <text x="20" y="53" fill="#6FE6FC">W</text>
          </g>
        )}

        {/* 8-Point Windrose Star Background */}
        <g opacity="0.25" fill="none" stroke="#DAF561" strokeWidth="0.8">
          <polygon points="50,26 53,47 74,50 53,53 50,74 47,53 26,50 47,47" />
        </g>

        {/* Dynamic Magnetic Needle Group (Smooth CSS Transition) */}
        <g 
          className="compass-needle" 
          transform={`rotate(${needleAngle} 50 50)`}
          style={{ transition: 'transform 0.15s cubic-bezier(0.1, 0.9, 0.2, 1)' }}
        >
          {/* North Half (Red/Amber) */}
          <polygon points="50,14 54.5,50 45.5,50" fill="url(#needleNorthGrad)" filter="drop-shadow(0 0 3px rgba(255, 137, 47, 0.6))" />
          <polygon points="50,14 50,50 45.5,50" fill="#FF892F" />

          {/* South Half (Ice Aqua / Cream) */}
          <polygon points="50,86 54.5,50 45.5,50" fill="url(#needleSouthGrad)" />
          <polygon points="50,86 50,50 45.5,50" fill="#93EEFD" opacity="0.7" />

          {/* Needle Center Pivot Pin */}
          <circle cx="50" cy="50" r="5" fill="url(#jewelGrad)" stroke="#FF892F" strokeWidth="1.2" />
          <circle cx="50" cy="50" r="2" fill="#FFFFFF" />
        </g>
      </svg>

      <style>{`
        .interactive-compass-root {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: crosshair;
          user-select: none;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .interactive-compass-root:hover {
          transform: scale(1.08);
        }

        .compass-svg {
          display: block;
          filter: drop-shadow(0 4px 14px rgba(0, 18, 51, 0.7));
        }

        .compass-dial-ticks {
          animation: spinDial 60s linear infinite;
          transform-origin: 50px 50px;
        }

        @keyframes spinDial {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
