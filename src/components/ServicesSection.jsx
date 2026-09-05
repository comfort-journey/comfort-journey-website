import React from 'react';
import { SERVICES_LIST } from '../data/toursData';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';

export default function ServicesSection({ onOpenAIPlanner }) {
  return (
    <section id="services" className="services-root">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge badge-amber">
            <Sparkles size={14} />
            <span>Specialized Services</span>
          </div>
          <h2 className="section-title">
            Bespoke Travel Solutions for <br />
            <span className="gradient-text-gold">Every Travel Desire</span>
          </h2>
          <p className="section-subtitle">
            From romantic overwater escapes to high-altitude Himalayan pilgrimages and corporate retreats.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="services-grid">
          {SERVICES_LIST.map((service, idx) => (
            <div key={idx} className="service-card glass-card">
              <span className="service-num">{service.num}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              
              <button
                className="service-link-btn"
                onClick={() => {
                  const msg = encodeURIComponent(`Hi Comfort Journey! I would like to inquire about your ${service.title} services.`);
                  window.open(`https://wa.me/918770403315?text=${msg}`, '_blank');
                }}
              >
                <span>Inquire Service</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-root {
          padding: 3.5rem 0 2.5rem 0;
          background: var(--cj-bg-panel);
          color: #FFFFFF;
        }

        .section-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: clamp(2.2rem, 4.5vw, 3.2rem);
          margin: 0.85rem 0;
          line-height: 1.2;
        }

        .section-subtitle {
          max-width: 680px;
          margin: 0 auto;
          color: #CBD5E1;
          font-size: 1.05rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 1.75rem;
        }

        .service-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          background: rgba(19, 29, 51, 0.7);
        }

        .service-num {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 900;
          color: var(--cj-amber-500);
        }

        .service-title {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: #FFFFFF;
          line-height: 1.3;
        }

        .service-desc {
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: #CBD5E1;
          line-height: 1.6;
        }

        .service-link-btn {
          margin-top: auto;
          padding-top: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--cj-gold-500);
          font-family: var(--font-ui);
          font-size: 0.9rem;
          font-weight: 700;
          transition: all 0.2s ease;
          min-height: 44px;
        }

        .service-link-btn:hover {
          color: var(--cj-amber-500);
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .services-root {
            padding: 2.5rem 0 2rem 0;
          }
          .section-title {
            font-size: 2.2rem;
          }
          .services-grid {
            grid-template-columns: 1fr;
            gap: 1.15rem;
          }
          .service-card {
            padding: 1.5rem 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}
