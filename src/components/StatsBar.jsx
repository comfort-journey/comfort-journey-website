import React from 'react';
import { STATS_DATA } from '../data/toursData';
import { Award, Globe, HeartHandshake, Headphones, ShieldCheck, Sparkles } from 'lucide-react';

export default function StatsBar() {
  const icons = [
    <Award size={28} className="stat-icon" key={0} />,
    <Globe size={28} className="stat-icon" key={1} />,
    <HeartHandshake size={28} className="stat-icon" key={2} />,
    <Headphones size={28} className="stat-icon" key={3} />
  ];

  return (
    <section className="stats-root">
      <div className="container">
        <div className="stats-grid">
          {STATS_DATA.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-icon-wrapper">
                {icons[idx]}
              </div>
              <div className="stat-info">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
                <span className="stat-sub">{stat.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-root {
          background: #070B14;
          padding: 2.75rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem 1.5rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 107, 0, 0.4);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 107, 0, 0.15);
        }

        .stat-icon-wrapper {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          background: rgba(255, 107, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--color-primary);
          border: 1px solid rgba(255, 107, 0, 0.3);
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 2rem;
          line-height: 1.1;
          color: #FFFFFF;
          margin-bottom: 0.15rem;
        }

        .stat-label {
          font-weight: 800;
          font-size: 0.92rem;
          color: var(--color-primary);
        }

        .stat-sub {
          font-size: 0.78rem;
          color: #94A3B8;
        }

        @media (max-width: 640px) {
          .stats-root {
            padding: 2rem 0;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.85rem;
          }
          .stat-card {
            flex-direction: column;
            text-align: center;
            padding: 1rem 0.75rem;
            gap: 0.65rem;
          }
          .stat-value {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
