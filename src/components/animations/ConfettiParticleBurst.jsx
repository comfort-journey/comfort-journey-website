import React from 'react';
import { useParticleBurst } from '../../hooks/useParticleBurst';

/**
 * ConfettiParticleBurst:
 * Interactive wrapper button/container that automatically fires
 * luxury travel sparkles / confetti bursts upon click.
 */
export default function ConfettiParticleBurst({ 
  children, 
  onClick, 
  className = '', 
  colors, 
  count = 24,
  ...props 
}) {
  const { triggerBurst } = useParticleBurst();

  const handleClick = (e) => {
    triggerBurst(e, { count, colors });
    if (onClick) onClick(e);
  };

  return (
    <div 
      className={`confetti-burst-trigger ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
}
