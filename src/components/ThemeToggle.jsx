import React from 'react';
import { Sun, Moon } from 'lucide-react';
import useTheme from '../hooks/useTheme';

/**
 * ThemeToggle — Icon-only Sun/Moon toggle.
 * Works seamlessly in both themes via CSS vars.
 * Takes minimal space in navbar/footer.
 */
export default function ThemeToggle({ variant = 'icon', size = 17, className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`cj-theme-toggle ${className}`}
    >
      <span className="cj-theme-icon-wrap" aria-hidden="true">
        {isDark ? <Sun size={size} /> : <Moon size={size} />}
      </span>
      <style>{`
        .cj-theme-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          padding: 0;
          border-radius: 50%;
          background: var(--cj-bg-soft, #F5F0E1);
          border: 1px solid var(--cj-line, #E8E0CF);
          color: #D65A00;
          cursor: pointer;
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          flex-shrink: 0;
          outline: none;
        }
        .cj-theme-toggle:hover {
          transform: translateY(-1px);
          border-color: var(--cj-cta, #FF892F);
          box-shadow: 0 4px 14px rgba(255, 137, 47, 0.2);
        }
        .cj-theme-toggle:active {
          transform: translateY(0);
        }
        .cj-theme-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .cj-theme-toggle:hover .cj-theme-icon-wrap {
          transform: rotate(18deg) scale(1.08);
        }
        [data-theme="dark"] .cj-theme-toggle {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.18);
          color: #FF892F;
        }
        [data-theme="dark"] .cj-theme-toggle:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: #FF892F;
          box-shadow: 0 0 16px rgba(255, 137, 47, 0.25);
        }
      `}</style>
    </button>
  );
}
