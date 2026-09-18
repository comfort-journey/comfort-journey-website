import React, { useState } from 'react';

/**
 * Peeking3DDecor:
 * Renders high-end 3D travel landmark/monument art that appears
 * half-tucked behind section/card boundaries and half-popping out into view.
 * 
 * Uses GPU-accelerated CSS translate3d, layered drop shadows, and
 * subtle floating physics for award-winning depth without scroll lag.
 */
export default function Peeking3DDecor({
  side = 'left',          // 'left' | 'right' | 'center-left' | 'center-right'
  top = '20%',
  bottom,
  peekPercent = 55,       // % of the element visible (e.g. 55% visible, 45% hidden behind edge)
  width = 280,
  height = 280,
  glowColor = 'rgba(255, 137, 47, 0.25)',
  floatDelay = '0s',
  floatDuration = '9s',
  rotateDeg = 0,
  zIndex = 2,
  className = '',
  children,
  ariaLabel = 'Decorative 3D Travel Landmark'
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate positioning based on side
  const positionStyles = {
    position: 'absolute',
    top: top !== undefined ? top : 'auto',
    bottom: bottom !== undefined ? bottom : 'auto',
    zIndex,
    pointerEvents: 'none',
    width: `${width}px`,
    height: `${height}px`,
  };

  if (side === 'left') {
    // Half hidden behind the left viewport/container edge
    positionStyles.left = `-${width * ((100 - peekPercent) / 100)}px`;
  } else if (side === 'right') {
    // Half hidden behind the right viewport/container edge
    positionStyles.right = `-${width * ((100 - peekPercent) / 100)}px`;
  } else if (side === 'center-left') {
    positionStyles.left = '2%';
  } else if (side === 'center-right') {
    positionStyles.right = '2%';
  }

  return (
    <div 
      className={`peeking-3d-decor-anchor ${side} ${className}`}
      style={positionStyles}
      aria-hidden="true"
    >
      <div 
        className="peeking-3d-glow-halo"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
        }}
      />
      
      <div 
        className="peeking-3d-motion-body"
        style={{
          animationDelay: floatDelay,
          animationDuration: floatDuration,
          transform: `rotate(${rotateDeg}deg) ${isHovered ? 'scale(1.06)' : 'scale(1)'}`,
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'auto',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="img"
        aria-label={ariaLabel}
      >
        {children}
      </div>

      <style>{`
        .peeking-3d-decor-anchor {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.5s ease;
          user-select: none;
        }

        .peeking-3d-glow-halo {
          position: absolute;
          inset: -25%;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(28px);
          opacity: 0.85;
          z-index: 0;
          transform: translateZ(0);
        }

        .peeking-3d-motion-body {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          animation: peekingSoftFloat 9s ease-in-out infinite alternate;
          transform-origin: center center;
          filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.55))
                  drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
          will-change: transform;
        }

        @keyframes peekingSoftFloat {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(${side === 'left' ? '8px' : '-8px'}, -12px, 0) rotate(${side === 'left' ? '1.5deg' : '-1.5deg'});
          }
          100% {
            transform: translate3d(0, 5px, 0) rotate(0deg);
          }
        }

        /* Hide or tuck in further on small mobile screens to prevent layout disturbance */
        @media (max-width: 768px) {
          .peeking-3d-decor-anchor {
            transform: scale(0.68);
            opacity: 0.7;
          }
          .peeking-3d-decor-anchor.left {
            left: -80px !important;
          }
          .peeking-3d-decor-anchor.right {
            right: -80px !important;
          }
        }
      `}</style>
    </div>
  );
}
