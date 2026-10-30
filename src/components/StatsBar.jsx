import React from 'react';
import { STATS_DATA } from '../data/toursData';
import { Award, Globe, HeartHandshake, Headphones } from 'lucide-react';
import AnimatedCounter from './animations/AnimatedCounter';

export default function StatsBar() {
  const icons = [
    <Award size={28} className="stat-icon" key={0} />,
    <Globe size={28} className="stat-icon" key={1} />,
    <HeartHandshake size={28} className="stat-icon" key={2} />,
    <Headphones size={28} className="stat-icon" key={3} />
  ];

  // Helper to parse numeric values for AnimatedCounter
  const parseStat = (valStr) => {
    if (typeof valStr === 'string' && valStr.endsWith('+')) {
      const num = parseInt(valStr.replace('+', ''), 10);
      if (!isNaN(num)) return { target: num, suffix: '+' };
    }
    if (valStr === '4.8' || valStr === '4.8★') return { target: 4.8, suffix: '★', decimals: 1 };
    return null;
  };

  return (
    <section className="stats-root">
      <div className="container">
        <div className="stats-grid">
          {STATS_DATA.map((stat, idx) => {
            const parsed = parseStat(stat.value);
            const isLongVal = String(stat.value).length > 6;
            return (
              <div key={idx} className="stat-card">
                <div className="stat-card-inner">
                  <div className="stat-icon-wrapper">
                    {icons[idx]}
                  </div>
                  <div className="stat-info">
                    <span className={`stat-value font-editorial ${isLongVal ? 'stat-value-compact' : ''}`}>
                      {parsed ? (
                        <AnimatedCounter
                          target={parsed.target}
                          suffix={parsed.suffix}
                          decimals={parsed.decimals || 0}
                          duration={2200}
                        />
                      ) : (
                        stat.value
                      )}
                    </span>
                    <span className="stat-label">{stat.label}</span>
                    <span className="stat-sub">{stat.sub}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .stats-root {
          background: linear-gradient(180deg, #001233 0%, #001233 100%);
          padding: 2.2rem 0;
          border-bottom: none;
          color: var(--cj-text-heading);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          align-items: stretch;
        }

        .stat-card {
          position: relative;
          padding: 1.25rem 1.4rem;
          border-radius: 20px;
          background: rgba(0, 18, 51, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .stat-card-inner {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 1.15rem;
          width: 100%;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 137, 47, 0.5);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 137, 47, 0.2);
        }

        .stat-icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: rgba(255, 137, 47, 0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--color-primary, #FF892F);
          border: 1px solid rgba(255, 137, 47, 0.3);
        }

        .stat-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }

        .stat-value {
          font-family: var(--font-serif);
          font-weight: 900;
          font-size: 2rem;
          line-height: 1.1;
          color: var(--cj-gold-500, #F59E0B);
          margin-bottom: 0.15rem;
          letter-spacing: -0.02em;
        }

        .stat-value.stat-value-compact {
          font-size: 1.42rem;
          line-height: 1.15;
        }

        .stat-label {
          font-family: var(--font-ui);
          font-weight: 800;
          font-size: 0.92rem;
          color: var(--cj-text-heading);
          line-height: 1.25;
        }

        .stat-sub {
          font-family: var(--font-body);
          font-size: 0.78rem;
          color: var(--cj-text-muted);
          font-weight: 500;
          line-height: 1.2;
        }

        @media (max-width: 768px) {
          .stats-root {
            padding: 0.9rem 0;
            overflow: visible;
          }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.55rem;
            padding: 0;
            width: 100%;
            overflow: visible;
            mask-image: none !important;
            -webkit-mask-image: none !important;
          }
          .stat-card {
            flex: none;
            padding: 0.65rem 0.65rem;
            border-radius: 14px;
            min-height: 62px;
            width: 100%;
            box-sizing: border-box;
          }
          .stat-card-inner {
            flex-direction: row;
            text-align: left;
            gap: 0.5rem;
            align-items: center;
          }
          .stat-icon-wrapper {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            flex-shrink: 0;
          }
          .stat-icon {
            width: 16px !important;
            height: 16px !important;
          }
          .stat-info {
            min-width: 0;
            flex: 1;
          }
          .stat-value {
            font-size: 1.15rem;
            line-height: 1.1;
            white-space: nowrap;
            margin-bottom: 0.05rem;
          }
          .stat-value.stat-value-compact {
            font-size: 0.95rem;
          }
          .stat-label {
            font-size: 0.72rem;
            font-weight: 800;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.15;
            color: var(--cj-text-heading);
          }
          .stat-sub {
            font-size: 0.62rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.1;
            color: var(--cj-text-muted);
          }
        }

        /* LIGHT THEME — cream strip (dark keeps navy) */
        :root:not([data-theme="dark"]) .stats-root,
        [data-theme="light"] .stats-root {
          background: linear-gradient(180deg, var(--cj-bg-alt, #F9FBE7) 0%, var(--cj-bg-base, #FFFDF7) 100%);
        }
        :root:not([data-theme="dark"]) .stat-card,
        [data-theme="light"] .stat-card {
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid var(--cj-line, rgba(20, 38, 74, 0.1));
          box-shadow: 0 4px 18px rgba(20, 38, 74, 0.06);
        }
        :root:not([data-theme="dark"]) .stat-card:hover,
        [data-theme="light"] .stat-card:hover {
          border-color: rgba(255, 137, 47, 0.6);
          box-shadow: 0 12px 28px rgba(20, 38, 74, 0.12), 0 0 16px rgba(255, 137, 47, 0.15);
        }
        :root:not([data-theme="dark"]) .stat-value,
        [data-theme="light"] .stat-value {
          color: var(--cj-cta-deep, #D65A00);
        }
      `}</style>
    </section>
  );
}
