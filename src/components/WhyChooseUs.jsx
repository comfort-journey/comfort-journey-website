import React, { useState } from 'react';
import { 
  Car, Hotel, Compass, Clock, Sparkles, ShieldCheck, Globe, 
  CheckCircle2, ArrowRight, MessageCircle, Heart, Users, Flame, 
  Palmtree, Waves, Landmark, Briefcase 
} from 'lucide-react';
import { WHY_US_PILLARS, SERVICES_LIST } from '../data/toursData';
import Tilt3DCard from './animations/Tilt3DCard';

const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';

export default function WhyChooseUs({ onOpenAIPlanner }) {
  const [activeTab, setActiveTab] = useState('pillars'); // 'pillars' | 'services'

  const pillarIcons = [
    <Car size={26} className="text-amber" />,
    <Hotel size={26} className="text-amber" />,
    <Compass size={26} className="text-amber" />,
    <Clock size={26} className="text-amber" />,
    <Sparkles size={26} className="text-amber" />,
    <ShieldCheck size={26} className="text-amber" />,
    <Globe size={26} className="text-amber" />
  ];

  const serviceIcons = [
    <Compass size={24} className="text-amber" />,
    <Heart size={24} className="text-pink" />,
    <Users size={24} className="text-cyan" />,
    <Flame size={24} className="text-amber" />,
    <Waves size={24} className="text-cyan" />,
    <Sparkles size={24} className="text-emerald" />,
    <Briefcase size={24} className="text-amber" />,
    <Landmark size={24} className="text-gold" />
  ];

  return (
    <section id="why-us" className="why-us-root">
      <span id="services" style={{ position: 'relative', top: '-80px', display: 'block' }} />
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
            Explore our 7 VIP promises and 8 bespoke travel solutions.
          </p>

          {/* Unified Luxury Tab Switcher (Saves Space on Homepage) */}
          <div className="why-us-tab-switcher">
            <button
              type="button"
              className={`switcher-pill-btn ${activeTab === 'pillars' ? 'active' : ''}`}
              onClick={() => setActiveTab('pillars')}
            >
              <ShieldCheck size={16} />
              <span>7 VIP Guarantees (Why Us)</span>
            </button>
            <button
              type="button"
              className={`switcher-pill-btn ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              <Sparkles size={16} />
              <span>8 Bespoke Travel Desires (Specialized Services)</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: 7 Pillars Grid with 3D Perspective Tilt */}
        {activeTab === 'pillars' ? (
          <div className="pillars-grid animate-fade-in">
            {WHY_US_PILLARS.map((pillar, idx) => (
              <Tilt3DCard key={idx} maxTilt={6} scale={1.03} glare={true} className="pillar-tilt-wrapper">
                <div 
                  className="pillar-card glass-card spotlight-card"
                  data-reveal="stagger"
                >
                  <div className="pillar-top-row">
                    <div className="pillar-icon-box">
                      {pillarIcons[idx % pillarIcons.length]}
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
        ) : (
          /* VIEW 2: 8 Specialized Travel Solutions */
          <div className="pillars-grid animate-fade-in">
            {SERVICES_LIST.map((service, idx) => (
              <Tilt3DCard key={idx} maxTilt={6} scale={1.03} glare={true} className="pillar-tilt-wrapper">
                <div 
                  className="pillar-card glass-card spotlight-card service-unified-card"
                  data-reveal="stagger"
                >
                  <div className="pillar-top-row">
                    <div className="pillar-icon-box service-icon-box">
                      {serviceIcons[idx % serviceIcons.length]}
                    </div>
                    <span className="pillar-num">{service.num}</span>
                  </div>

                  <h3 className="pillar-title font-editorial">{service.title}</h3>
                  <p className="pillar-desc">{service.desc}</p>

                  <div className="service-card-action-row">
                    <button
                      type="button"
                      className="service-whatsapp-inquire-btn"
                      onClick={() => {
                        const msg = encodeURIComponent(`Hi Comfort Journey! I would like to inquire about your bespoke ${service.title} travel services.`);
                        window.open(`https://wa.me/918770403315?text=${msg}`, '_blank');
                      }}
                    >
                      <MessageCircle size={15} />
                      <span>Inquire Concierge</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </Tilt3DCard>
            ))}
          </div>
        )}

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
          padding: 5rem 0 4rem 0;
          background: 
            linear-gradient(180deg, #0B1120 0%, rgba(11, 17, 32, 0.82) 12%, rgba(11, 17, 32, 0.62) 50%, rgba(11, 17, 32, 0.82) 88%, #0B1120 100%),
            url('${basePrefix}backgrounds/faq-coastal-roadtrip.webp') center 45% / cover no-repeat;
          color: var(--cj-text-heading);
          position: relative;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
          color: var(--cj-text-muted);
          font-size: 1.05rem;
        }

        .why-us-tab-switcher {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          padding: 0.35rem;
          gap: 0.4rem;
          margin: 1.75rem auto 0.5rem auto;
          max-width: 100%;
          flex-wrap: wrap;
          justify-content: center;
        }

        .switcher-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          border-radius: 50px;
          border: none;
          background: transparent;
          color: var(--cj-text-muted);
          font-family: var(--font-ui);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .switcher-pill-btn:hover {
          color: var(--cj-text-heading);
          background: rgba(255, 255, 255, 0.05);
        }

        .switcher-pill-btn.active {
          background: linear-gradient(135deg, #FF892F 0%, #E65100 100%);
          color: #FFFFFF;
          box-shadow: 0 4px 14px rgba(255, 137, 47, 0.35);
        }

        .service-icon-box {
          background: rgba(111, 230, 252, 0.12) !important;
          border-color: rgba(111, 230, 252, 0.25) !important;
        }

        .service-card-action-row {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .service-whatsapp-inquire-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(37, 211, 102, 0.12);
          border: 1px solid rgba(37, 211, 102, 0.3);
          border-radius: 8px;
          color: #25D366;
          font-family: var(--font-ui);
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.5rem 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          justify-content: center;
        }

        .service-whatsapp-inquire-btn:hover {
          background: rgba(37, 211, 102, 0.25);
          color: #FFFFFF;
          transform: translateY(-1px);
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
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 900;
          color: rgba(255, 137, 47, 0.4);
        }

        .pillar-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--cj-text-heading);
          line-height: 1.3;
        }

        .pillar-desc {
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: var(--cj-text-muted);
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
          font-family: var(--font-serif);
          font-size: 1.45rem;
          color: var(--cj-text-heading);
          margin-bottom: 0.35rem;
        }

        .banner-text p {
          color: var(--cj-text-muted);
          font-size: 0.95rem;
        }

        .banner-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 860px) {
          .why-us-root {
            padding: 2.25rem 0 1.5rem 0;
          }
          .section-title {
            font-size: 1.85rem;
            line-height: 1.25;
          }
          .why-us-tab-switcher {
            width: 100%;
            display: flex;
            overflow-x: auto;
            flex-wrap: nowrap;
            gap: 0.45rem;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 0.4rem;
          }
          .why-us-tab-switcher::-webkit-scrollbar {
            display: none;
          }
          .switcher-pill-btn {
            flex-shrink: 0;
            white-space: nowrap;
            padding: 0.5rem 0.85rem;
            font-size: 0.8rem;
          }

          /* 3D Horizontal Carousel for Pillars & Services on Mobile */
          .pillars-grid {
            display: flex !important;
            grid-template-columns: none !important;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 0.85rem;
            padding: 0.25rem 0.5rem 1rem 0.5rem;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            mask-image: linear-gradient(to right, transparent, black 10px, black calc(100% - 16px), transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10px, black calc(100% - 16px), transparent);
          }
          .pillars-grid::-webkit-scrollbar {
            display: none;
          }
          .pillar-tilt-wrapper {
            flex: 0 0 82vw;
            max-width: 290px;
            scroll-snap-align: center;
          }
          .pillar-card {
            padding: 1.15rem 1rem;
            min-height: 210px;
          }

          .why-us-banner {
            padding: 1.5rem 1.15rem;
            flex-direction: column;
            text-align: center;
          }
          .banner-actions {
            width: 100%;
            flex-direction: column;
            gap: 0.65rem;
          }
          .banner-actions button, .banner-actions a {
            width: 100%;
            justify-content: center;
            min-height: 44px;
          }
        }

        /* LIGHT THEME — warm paper, no photo (dark keeps coastal cinema) */
        :root:not([data-theme="dark"]) .why-us-root,
        [data-theme="light"] .why-us-root {
          background:
            radial-gradient(700px 320px at 10% 0%, rgba(255,137,47,0.10), transparent 70%),
            radial-gradient(640px 300px at 92% 100%, rgba(77,124,15,0.08), transparent 70%),
            linear-gradient(180deg, #FFFDF7 0%, #F9FBE7 100%);
          border-top-color: var(--cj-line, #E8E0CF);
          border-bottom-color: var(--cj-line, #E8E0CF);
        }
        :root:not([data-theme="dark"]) .pillar-card,
        [data-theme="light"] .pillar-card,
        :root:not([data-theme="dark"]) .why-us-banner,
        [data-theme="light"] .why-us-banner {
          background: var(--cj-glass-card);
          -webkit-backdrop-filter: var(--cj-glass-blur);
          backdrop-filter: var(--cj-glass-blur);
          border: 1px solid var(--cj-glass-rim);
          box-shadow: 0 0 0 1px var(--cj-glass-hairline), var(--shadow-md, 0 10px 30px rgba(20,38,74,0.10)), inset 0 1px 0 rgba(255,255,255,0.8);
          border-color: var(--cj-line, #E8E0CF);
          box-shadow: var(--shadow-md, 0 10px 30px rgba(20,38,74,0.10));
        }
        :root:not([data-theme="dark"]) .why-us-tab-switcher,
        [data-theme="light"] .why-us-tab-switcher {
          background: var(--cj-glass-card);
          -webkit-backdrop-filter: var(--cj-glass-blur);
          backdrop-filter: var(--cj-glass-blur);
          border: 1px solid var(--cj-glass-rim);
          box-shadow: 0 0 0 1px var(--cj-glass-hairline), var(--shadow-md, 0 10px 30px rgba(20,38,74,0.10)), inset 0 1px 0 rgba(255,255,255,0.8);
          border-color: var(--cj-line, #E8E0CF);
        }
        :root:not([data-theme="dark"]) .service-whatsapp-inquire-btn:hover,
        [data-theme="light"] .service-whatsapp-inquire-btn:hover {
          color: #047857;
        }
        :root:not([data-theme="dark"]) .pillar-check,
        [data-theme="light"] .pillar-check {
          color: #047857;
        }
        :root:not([data-theme="dark"]) .service-whatsapp-inquire-btn,
        [data-theme="light"] .service-whatsapp-inquire-btn {
          color: #047857;
        }
      `}</style>
    </section>
  );
}
