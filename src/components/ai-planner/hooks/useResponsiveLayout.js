import { useState, useEffect } from 'react';

export function useResponsiveLayout() {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = dimensions.width < 768;
  const isTablet = dimensions.width >= 768 && dimensions.width < 1024;
  const isDesktop = dimensions.width >= 1024;

  let layoutMode;
  let mapHeight;

  if (isMobile) {
    layoutMode = 'mobile';
    mapHeight = '50vh';
  } else if (isTablet) {
    layoutMode = 'tablet';
    mapHeight = '100%';
  } else {
    layoutMode = 'desktop';
    mapHeight = '100%';
  }

  return {
    ...dimensions,
    isMobile,
    isTablet,
    isDesktop,
    layoutMode,
    mapHeight,
  };
}