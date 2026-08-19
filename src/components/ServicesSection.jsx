import React from 'react';
import { SERVICES_DATA } from '../data/toursData';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function ServicesSection({ onOpenQuote }) {
  return (
    <section id="services" className="services-root">
      <div className="container">
        <div className="services-header">
          <div>
            <span className="badge badge-accent">Everything You Need. Nothing You Don't.</span>
            <h2 className="services-title">What We Do For Your Trip</h2>
          </div>
          <button className="btn-primary" onClick={onOpenQuote}>
            <span>Plan My Custom Trip</span>
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="services-grid">
          {SERVICES_DATA.map((srv) => (
            <div key={srv.num} className="service-card">
              <span className="service-num">{srv.num}</span>
              <h3 className="service-name">{srv.title}</h3>
              <p className="service-desc">{srv.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-root {
          padding: 6rem 0;
          background: #0F172A;
          color: #FFFFFF;
        }

        .services-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .services-title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          color: #FFFFFF;
          margin-top: 0.5rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .service-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          padding: 2rem;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .service-card:hover {
          transform: translateY(-6px);
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--color-primary);
        }

        .service-num {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--color-primary);
          opacity: 0.9;
          margin-bottom: 1rem;
          line-height: 1;
        }

        .service-name {
          font-size: 1.25rem;
          color: #FFFFFF;
          margin-bottom: 0.75rem;
        }

        .service-desc {
          font-size: 0.92rem;
          color: #94A3B8;
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          .services-root {
            padding: 3.5rem 0;
          }
          .services-header {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 2rem;
            gap: 1rem;
          }
          .services-title {
            font-size: clamp(1.75rem, 6vw, 2.2rem);
          }
          .services-header .btn-primary {
            width: 100%;
            justify-content: center;
          }
          .services-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .service-card {
            padding: 1.25rem;
          }
          .service-num {
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
          }
          .service-name {
            font-size: 1.15rem;
          }
          .service-desc {
            font-size: 0.88rem;
          }
        }
      `}</style>
    </section>
  );
}
