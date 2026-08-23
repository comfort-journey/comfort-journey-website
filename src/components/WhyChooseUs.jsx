import React from 'react';
import { Car, Hotel, Compass, Clock, Sparkles, ShieldCheck, Globe, CheckCircle2 } from 'lucide-react';
import { WHY_US_PILLARS } from '../data/toursData';
import Tilt3DCard from './animations/Tilt3DCard';

export default function WhyChooseUs({ onOpenAIPlanner }) {
  const icons = [
    <Car size={26} className="text-amber" />,
    <Hotel size={26} className="text-amber" />,
    <Compass size={26} className="text-amber" />,
    <Clock size={26} className="text-amber" />,
    <Sparkles size={26} className="text-amber" />,
    <ShieldCheck size={26} className="text-amber" />,
    <Globe size={26} className="text-amber" />
  ];

  return (
    <section id="why-us" className="why-us-root">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" data-reveal="fade-up">
          <div className="badge badge-amber">
            <ShieldCheck size={14} />
            <span>The Comfort Journey Standard</span>
          </div>
          <h2 className="section-title font-editorial illuminate-text">
            Why Discerning Travelers Choose <br />
            <span className="gradient-text-gold">Comfort Journey</span>
          </h2>
          <p className="section-subtitle">
            Since 1992, we have redefined luxury travel across India and the globe. 
            Here is our 7-pillar VIP promise to every guest.
          </p>
        </div>

        {/* 7 Pillars Grid with 3D Perspective Tilt */}
        <div className="pillars-grid">
          {WHY_US_PILLARS.map((pillar, idx) => (
            <Tilt3DCard key={idx} maxTilt={6} scale={1.03} glare={true} className="pillar-tilt-wrapper">
              <div 
                className="pillar-card glass-card spotlight-card"
                data-reveal="stagger"
              >
                <div className="pillar-top-row">
                  <div className="pillar-icon-box">
                    {icons[idx % icons.length]}
                  </div>
                  <span className="pillar-num">0{idx + 1}</span>
                </div>

                <h3 className="pillar-title font-editorial">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.desc}</p>

                <div className="pillar-check">
                  <CheckCircle2 size={15} className="text-emerald" />
                  <span>Guaranteed Standard</span>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="why-us-banner glass-panel spotlight-card" data-reveal="fade-up">
          <div className="banner-text">
            <h3 className="font-editorial">Ready to Experience Travel with Absolute Comfort?</h3>
            <p>Speak directly with our senior trip designers or design a custom itinerary in 2 minutes.</p>
          </div>
          <div className="banner-actions">
            <button className="btn-ai-glow btn-magnetic" onClick={onOpenAIPlanner}>
              <Sparkles size={18} />
              Plan with AI Designer
            </button>
            <a href="tel:+918770403315" className="btn-secondary btn-magnetic">
              Call VIP Line: +91 8770403315
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .why-us-root {
          padding: 3.5rem 0 2.5rem 0;
          background: var(--cj-bg-obsidian);
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
          color: #94A3B8;
          font-size: 1.05rem;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.25rem;
        }

        .pillar-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: rgba(19, 29, 51, 0.65);
        }

        .pillar-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pillar-icon-box {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: rgba(255, 107, 0, 0.15);
          border: 1px solid rgba(255, 107, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pillar-num {
          font-family: var(--font-ui);
          font-size: 1.35rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.2);
        }

        .pillar-title {
          font-family: var(--font-ui);
          font-size: 1.2rem;
          color: #FFFFFF;
          line-height: 1.35;
        }

        .pillar-desc {
          font-size: 0.92rem;
          color: #94A3B8;
          line-height: 1.6;
        }

        .pillar-check {
          margin-top: auto;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--cj-emerald-500);
          text-transform: uppercase;
        }

        .why-us-banner {
          padding: 2.5rem 3rem;
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .banner-text h3 {
          font-family: var(--font-ui);
          font-size: 1.45rem;
          color: #FFFFFF;
          margin-bottom: 0.35rem;
        }

        .banner-text p {
          color: #CBD5E1;
          font-size: 0.95rem;
        }

        .banner-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 860px) {
          .why-us-banner {
            padding: 1.75rem;
            flex-direction: column;
            text-align: center;
          }
          .banner-actions {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
