import React, { useState } from 'react';

/**
 * KineticHeading:
 * Inspired by motion.zajno.com kinetic typography.
 * Splits words into overflow-masked kinetic lines with staggered spring-up
 * entrance reveals and interactive micro-hover 3D bounce.
 */
export default function KineticHeading({
  children,
  as: Component = 'h1',
  className = '',
  staggerDelay = 0.06,
  goldWordIndex = null,
  aquaWordIndex = null,
}) {
  const [isHovered, setIsHovered] = useState(false);

  // If children is a string, split into words
  const words = typeof children === 'string' ? children.split(' ') : null;

  if (!words) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component 
      className={`kinetic-heading-root ${className} ${isHovered ? 'kinetic-hover' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {words.map((word, idx) => {
        let specialClass = '';
        if (goldWordIndex !== null && (Array.isArray(goldWordIndex) ? goldWordIndex.includes(idx) : goldWordIndex === idx)) {
          specialClass = 'gradient-text-gold';
        } else if (aquaWordIndex !== null && (Array.isArray(aquaWordIndex) ? aquaWordIndex.includes(idx) : aquaWordIndex === idx)) {
          specialClass = 'gradient-text-ai';
        }

        return (
          <span key={idx} className="kinetic-word-wrapper">
            <span
              className={`kinetic-word-inner ${specialClass}`}
              style={{
                transitionDelay: `${idx * staggerDelay}s`,
                animationDelay: `${idx * staggerDelay}s`,
              }}
            >
              {word}
            </span>
            {idx < words.length - 1 && <span className="kinetic-space">&nbsp;</span>}
          </span>
        );
      })}

      <style>{`
        .kinetic-heading-root {
          display: inline-flex;
          flex-wrap: wrap;
          justify-content: inherit;
          align-items: baseline;
        }

        .kinetic-word-wrapper {
          display: inline-flex;
          overflow: hidden;
          vertical-align: top;
          padding: 0.1em 0;
        }

        .kinetic-word-inner {
          display: inline-block;
          transform: translateY(0);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
          will-change: transform;
        }

        .kinetic-heading-root.kinetic-hover .kinetic-word-inner {
          transform: translateY(-4px);
        }

        .kinetic-space {
          display: inline-block;
          user-select: none;
        }
      `}</style>
    </Component>
  );
}
