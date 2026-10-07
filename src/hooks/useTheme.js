import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'cj-theme'; // 'light' | 'dark' | null (null = follow OS)

/**
 * useTheme — Follow OS by default + manual override with persistence.
 * CRITICAL: documentElement ALWAYS carries an explicit data-theme
 * ("light" or "dark"). The stylesheet's light-surface overrides are
 * scoped as `:root:not([data-theme="dark"])`, so a missing attribute
 * in OS-dark-auto mode would mix dark text-vars with light panels and
 * render text invisible. Never leave the attribute unset.
 * - No stored value: data-theme = live OS value, updates on OS change.
 * - Stored value: data-theme = manual choice.
 */
export function getSystemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getStoredTheme() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

export function resolveTheme() {
  return getStoredTheme() || getSystemTheme();
}

export function applyTheme(theme) {
  const root = document.documentElement;
  // Always resolve to an explicit theme — never remove the attribute.
  const effective = theme === 'light' || theme === 'dark' ? theme : getSystemTheme();
  root.setAttribute('data-theme', effective);
  try {
    // Keep browser chrome (scrollbars, form controls) in sync
    root.style.colorScheme = effective;
  } catch {
    /* noop */
  }
  return effective;
}

export default function useTheme() {
  const [theme, setTheme] = useState(() => resolveTheme());
  const [mode, setMode] = useState(() => (getStoredTheme() ? 'manual' : 'auto'));

  useEffect(() => {
    applyTheme(getStoredTheme());
    setTheme(resolveTheme());
    setMode(getStoredTheme() ? 'manual' : 'auto');
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (!getStoredTheme()) {
        const next = mq.matches ? 'dark' : 'light';
        setTheme(next);
        setMode('auto');
        applyTheme(next);
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  const setManualTheme = useCallback((next) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* noop */
    }
    applyTheme(next);
    setTheme(next);
    setMode('manual');
  }, []);

  const toggleTheme = useCallback(() => {
    const next = (getStoredTheme() || getSystemTheme()) === 'dark' ? 'light' : 'dark';
    setManualTheme(next);
  }, [setManualTheme]);

  const followSystem = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
    const next = getSystemTheme();
    applyTheme(next);
    setTheme(next);
    setMode('auto');
  }, []);

  return { theme, mode, isDark: theme === 'dark', toggleTheme, setManualTheme, followSystem };
}
