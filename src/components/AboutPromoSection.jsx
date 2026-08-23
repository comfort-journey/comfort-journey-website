import React from 'react';
import { Compass, Award, Users, ShieldCheck, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import Tilt3DCard from './animations/Tilt3DCard';
import InteractiveCompassSVG from './animations/InteractiveCompassSVG';
import { useParticleBurst } from '../hooks/useParticleBurst';

export default function AboutPromoSection({ onOpenQuote }) {
  const { triggerBurst } = useParticleBurst();

  return (
    <section id="about" className="about-root">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Image Stack with Floating Trust Badge & Compass */}
          <div className="about-image-col" data-reveal="fade-up">
            <Tilt3DCard maxTilt={6} scale={1.02} glare={true} className="about-tilt-wrapper">
              <div className="image-stack spotlight-card">
                <img 
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" 
                  alt="Comfort Journey Luxury Travel" 
                  className="img-main"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="480"
                />
                <div className="glass-card trust-badge-overlay spotlight-card">
                  <InteractiveCompassSVG size={44} showLabels={false} />
                  <div>
                    <span className="b-val font-editorial">33+ Years</span>
                    <span className="b-lbl">Established 1992 • Bhopal HQ</span>
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="about-content-col" data-reveal="fade-up">
            <div className="badge badge-amber">
              <Sparkles size={14} />
              <span>Who We Are</span>
            </div>
            
            <h2 className="about-title font-editorial illuminate-text">
              Comfort Journey <br />
              <span className="gradient-text-gold">WE MAKE YOUR TRIPS UNFORGOTTABLE</span>
            </h2>

            <p className="about-lead">
              Founded in 1992 by <strong>Sharad Kumar Mishra</strong> and led by <strong>Rishabh Dev Mishra</strong>, Comfort Journey is central India's premier bespoke travel agency dedicated to turning dream vacations into seamless reality.
            </p>

            <p className="about-body">
              With 33+ years of domain mastery, we craft tailor-made domestic and international journeys across 2,000+ worldwide destinations. From romantic overwater pool villas in Bali and Maldives to Swiss glacier trains and sacred Char Dham VIP yatras, we handle flights, luxury 5-star stays, private chauffeurs, visas, and 24/7 concierge with zero stress.
            </p>

            <div className="about-highlights">
              <div className="h-item">
                <CheckCircle2 size={20} className="text-emerald" />
                <span>100% Bespoke Day-Wise Itineraries Crafted Around You</span>
              </div>
              <div className="h-item">
                <CheckCircle2 size={20} className="text-emerald" />
                <span>Pre-Audited 4/5-Star Resorts, Heritage Palaces & Luxury Cabs</span>
              </div>
              <div className="h-item">
                <CheckCircle2 size={20} className="text-emerald" />
                <span>24/7 Dedicated Trip Concierge with Zero Hidden Charges</span>
              </div>
            </div>

            <div className="about-actions-row">
              <button 
                className="btn-primary btn-magnetic lets-travel-btn" 
                onClick={(e) => {
                  triggerBurst(e, { count: 24 });
                  onOpenQuote();
                }}
              >
                <Compass size={20} />
                <span>LET'S TRAVEL</span>
              </button>
              <a href="https://wa.me/918770403315" target="_blank" rel="noopener noreferrer" className="btn-secondary btn-magnetic">
                <span>WhatsApp Senior Designer</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-root {
          padding: 3.5rem 0 2.5rem 0;
          background: var(--cj-bg-obsidian);
          color: #FFFFFF;
          position: relative;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 2.5rem;
          align-items: center;
        }

        .image-stack {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .img-main {
          width: 100%;
          height: 520px;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .image-stack:hover .img-main {
          transform: scale(1.04);
        }

        .trust-badge-overlay {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          padding: 1.15rem 1.75rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(15, 23, 42, 0.88);
          backdrop-filter: blur(16px);
          color: #FFFFFF;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 184, 0, 0.4);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
          animation: floatBadge 6s ease-in-out infinite alternate;
        }

        @keyframes floatBadge {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }

        .badge-icon {
          color: var(--cj-amber-500);
        }

        .b-val {
          font-family: var(--font-serif);
          font-size: 1.55rem;
          font-weight: 900;
          display: block;
          line-height: 1.1;
          color: #FFFFFF;
        }

        .b-lbl {
          font-family: var(--font-ui);
          font-size: 0.8rem;
          color: var(--cj-gold-400);
          font-weight: 600;
        }

        .about-title {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          margin: 1rem 0 1.25rem 0;
          line-height: 1.18;
        }

        .about-lead {
          font-family: var(--font-body);
          font-size: 1.08rem;
          color: #E2E8F0;
          margin-bottom: 1rem;
          line-height: 1.68;
        }

        .about-body {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: #94A3B8;
          line-height: 1.68;
          margin-bottom: 1.75rem;
        }

        .about-highlights {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 2.25rem;
        }

        .h-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          font-size: 0.95rem;
          color: #F8FAFC;
        }

        .about-actions-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .lets-travel-btn {
          padding: 0.95rem 2.25rem;
          font-size: 1.02rem;
          min-height: 48px;
        }

        @media (max-width: 960px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .img-main {
            height: 380px;
          }
        }

        @media (max-width: 768px) {
          .about-root {
            padding: 2.5rem 0 2rem 0;
          }
          .img-main {
            height: 280px;
          }
          .trust-badge-overlay {
            bottom: 1rem;
            left: 1rem;
            right: 1rem;
            padding: 0.85rem 1.15rem;
          }
          .about-actions-row {
            flex-direction: column;
            gap: 0.75rem;
            width: 100%;
          }
          .about-actions-row button, .about-actions-row a {
            width: 100%;
            justify-content: center;
            min-height: 48px;
          }
        }
      `}</style>
    </section>
  );
}
