import { useCallback, useEffect, useRef } from 'react';

export function useShareableURL() {
  const timeoutRef = useRef(null);

  const updateURL = useCallback((params, replace = false) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      const url = new URL(window.location.href);
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.set(key, value);
        } else {
          url.searchParams.delete(key);
        }
      });
      
      if (replace) {
        window.history.replaceState({}, '', url);
      } else {
        window.history.pushState({}, '', url);
      }
    }, 300);
  }, []);

  const replaceURL = useCallback((params) => {
    updateURL(params, true);
  }, [updateURL]);

  const getURLParam = useCallback((key) => {
    return new URLSearchParams(window.location.search).get(key);
  }, []);

  const clearURLParams = useCallback(() => {
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url);
  }, []);

  const generateShareableURL = useCallback((baseState = {}) => {
    const url = new URL(window.location.href);
    Object.entries(baseState).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, value);
      }
    });
    return url.toString();
  }, []);

  return {
    updateURL,
    replaceURL,
    getURLParam,
    clearURLParams,
    generateShareableURL,
  };
}