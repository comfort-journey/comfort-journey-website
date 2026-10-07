import React from 'react';
import { Sun, Moon } from 'lucide-react';
import useTheme from '../hooks/useTheme';

/**
 * ThemeToggle — Sun/Moon switch. Works on both themes via CSS vars.
 * Props: variant 'pill' (navbar) | 'icon' (dock/footer), size px
 */
export default function ThemeToggle({ variant = 'pill', label = true }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        aria-pressed={isDark}
        title={isDark ? 'Light mode' : 'Dark mode'}
        className="cj-theme-toggle-icon"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
        <style>{`
          .cj-theme-toggle-icon {
            display: inline-flex; align-items: center; justify-content: center;
            width: 38px; height: 38px; border-radius: 50%;
            background: var(--cj-bg-soft, #F5F0E1);
            border: 1px solid var(--cj-line, #E8E0CF);
            color: var(--cj-text-heading, #14264A);
            cursor: pointer; transition: transform .2s ease;
          }
          .cj-theme-toggle-icon:hover { transform: translateY(-1px); }
          [data-theme="dark"] .cj-theme-toggle-icon {
            background: rgba(255,255,255,0.08);
            border-color: rgba(255,255,255,0.18);
            color: #FFFFFF;
          }
        `}</style>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Light mode (follow OS / manual)' : 'Dark mode (follow OS / manual)'}
      className="cj-theme-toggle"
    >
      <span className="cj-theme-knob">{isDark ? <Sun size={15} /> : <Moon size={15} />}</span>
      {label && <span className="cj-theme-text">{isDark ? 'Light' : 'Dark'}</span>}
      <style>{`
        .cj-theme-toggle {
          display: inline-flex; align-items: center; gap: .45rem;
          padding: .35rem .7rem .35rem .4rem; border-radius: 9999px;
          background: var(--cj-bg-soft, #F5F0E1);
          border: 1px solid var(--cj-line, #E8E0CF);
          color: var(--cj-text-heading, #14264A);
          font-family: var(--font-ui, system-ui, sans-serif);
          font-size: .8rem; font-weight: 800; cursor: pointer; white-space: nowrap;
        }
        .cj-theme-knob {
          display: inline-flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 50%;
          background: #FFFFFF; border: 1px solid var(--cj-line, #E8E0CF);
          color: #D65A00;
        }
        [data-theme="dark"] .cj-theme-toggle {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.18);
          color: #FFFFFF;
        }
        [data-theme="dark"] .cj-theme-knob { background: #001D51; color: #FF892F; border-color: rgba(255,255,255,0.2); }
      `}</style>
    </button>
  );
}
