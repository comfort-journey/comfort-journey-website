import React from 'react';
import { Compass, Globe, Sparkles, Clock, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import Tilt3DCard from '../animations/Tilt3DCard';

export const CATEGORY_PILLARS = [
  {
    id: 'india-trips',
    targetId: 'india-trips',
    landingSlug: 'india-packages',
    title: 'India Luxury & Heritage',
    subtitle: 'Himalayas, Royal Palaces & Tropical Backwaters',
    count: '80+ Handcrafted Tours',
    badge: '👑 Royal Desi Heritage',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    tagColor: '#FFA000',
    vibeText: 'Zero Visa Drama • Palace Stays • Private Chauffeur'
  },
  {
    id: 'intl-trips',
    targetId: 'intl-trips',
    landingSlug: 'international-packages',
    title: 'World Passport Escapes',
    subtitle: 'Europe, Bali, Dubai, Singapore & Switzerland',
    count: '15+ Iconic Continents',
    badge: '✈️ Global Jetsetter',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    tagColor: '#0284C7',
    vibeText: 'In-House Visa Assist • 5-Star Central • 24/7 Global VIP'
  },
  {
    id: 'weekend-trips',
    targetId: 'weekend-trips',
    landingSlug: 'weekend-getaways',
    title: '48-Hour Weekend Breaks',
    subtitle: 'Quick Friday-to-Sunday Road Trips & Hill Retreats',
    count: '38+ Scenic Getaways',
    badge: '🎒 0 Leaves Needed',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    tagColor: '#059669',
    vibeText: 'Under 4-6 Hrs Drive • Work Slack Muted • Coffee Retreats'
  },
  {
    id: 'fixed-departures',
    targetId: 'fixed-departures',
    landingSlug: 'fixed-departures',
    title: 'Fixed Departure Tribe',
    subtitle: 'Guaranteed Dates, Solo-Friendly Group Batches',
    count: '12+ Upcoming Batches',
    badge: '🤝 Community Tribe',
    image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80',
    accentColor: '#FF892F',
    glowColor: 'rgba(255, 137, 47, 0.35)',
    tagColor: '#E65100',
    vibeText: 'Meet Like-Minded Travelers • Live Seats Tracker • 100% Go'
  }
];

export default function CategoryGatewayStrip({ onNavigateLanding }) {
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="category-gateway-root">
      <div className="container">
        <div className="gateway-header-bar">
          <div className="gateway-header-text">
            <span className="gateway-badge">
              <Compass size={13} className="text-amber" />
              <span>EXPLORE BY TRAVEL CATEGORY</span>
            </span>
            <h2 className="gateway-title font-editorial">
              How Do You Want To <span className="gradient-text-gold">Experience The World?</span>
            </h2>
          </div>
          <p className="gateway-subtitle">
            From regal palace odysseys across India to jetsetter international escapes, 48-hour weekend resets, and social travel tribe departures.
          </p>
        </div>

        {/* 4-Pillar Interactive Gateway Grid */}
        <div className="gateway-grid">
          {CATEGORY_PILLARS.map((pillar) => (
            <Tilt3DCard
              key={pillar.id}
              maxTilt={6}
              scale={1.02}
              glare={true}
              holographic={true}
              borderRadius="20px"
              className="gateway-card-wrapper"
              onClick={() => scrollToSection(pillar.targetId)}
            >
              <div 
                className="gateway-pillar-card glass-card"
                style={{
                  '--pillar-accent': pillar.accentColor,
                  '--pillar-glow': pillar.glowColor
                }}
              >
                {/* Background Image with Ambient Gradient */}
                <div className="gateway-card-bg">
                  <img src={pillar.image} alt={pillar.title} loading="lazy" />
                  <div className="gateway-card-gradient" />
                </div>

                {/* Top Badge & Count */}
                <div className="gateway-top-row">
                  <span className="pillar-badge" style={{ borderColor: pillar.accentColor, color: pillar.accentColor }}>
                    {pillar.badge}
                  </span>
                  <span className="pillar-count-chip">
                    {pillar.count}
                  </span>
                </div>

                {/* Card Main Info */}
                <div className="gateway-body-content">
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-subtitle">{pillar.subtitle}</p>

                  <div className="pillar-vibe-tag">
                    <Sparkles size={12} style={{ color: pillar.accentColor }} />
                    <span>{pillar.vibeText}</span>
                  </div>

                  <div className="gateway-card-action">
                    <span className="explore-link-text">
                      Explore Showcase
                    </span>
                    <div className="action-circle-arrow" style={{ background: pillar.accentColor }}>
                      <ArrowRight size={14} color="#001233" />
                    </div>
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>

      <style>{`
        .category-gateway-root {
          padding: 3.5rem 0 2.5rem 0;
          position: relative;
          background: linear-gradient(180deg, rgba(0, 18, 51, 0.95) 0%, rgba(0, 24, 68, 0.85) 50%, rgba(0, 18, 51, 0.95) 100%);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .gateway-header-bar {
          text-align: center;
          max-width: 820px;
          margin: 0 auto 2.25rem auto;
        }

        .gateway-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 137, 47, 0.12);
          border: 1px solid rgba(255, 137, 47, 0.3);
          padding: 0.32rem 0.9rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 800;
          color: #FF892F;
          letter-spacing: 0.06em;
          margin-bottom: 0.75rem;
        }

        .gateway-title {
          font-size: clamp(2.1rem, 4vw, 2.9rem);
          color: #FFFFFF;
          margin-bottom: 0.65rem;
          line-height: 1.15;
        }

        .gateway-subtitle {
          font-size: 0.98rem;
          color: #94A3B8;
          line-height: 1.6;
          margin: 0 auto;
        }

        .gateway-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
          gap: 1.35rem;
        }

        .gateway-card-wrapper {
          cursor: pointer;
          height: 100%;
        }

        .gateway-pillar-card {
          position: relative;
          height: 320px;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.35rem;
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          background: rgba(0, 18, 51, 0.85);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gateway-pillar-card:hover {
          border-color: var(--pillar-accent);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7), 0 0 25px var(--pillar-glow);
          transform: translateY(-4px);
        }

        .gateway-card-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .gateway-card-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gateway-pillar-card:hover .gateway-card-bg img {
          transform: scale(1.08);
        }

        .gateway-card-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 18, 51, 0.35) 0%, rgba(0, 18, 51, 0.82) 55%, rgba(0, 18, 51, 0.98) 100%);
        }

        .gateway-top-row {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .pillar-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.22rem 0.65rem;
          border-radius: 9999px;
          background: rgba(0, 18, 51, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid;
          letter-spacing: 0.02em;
        }

        .pillar-count-chip {
          font-size: 0.72rem;
          font-weight: 800;
          color: #F9FBE7;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
          padding: 0.22rem 0.6rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .gateway-body-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .pillar-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.25;
        }

        .pillar-subtitle {
          font-size: 0.8rem;
          color: #CBD5E1;
          line-height: 1.4;
          margin: 0;
        }

        .pillar-vibe-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          color: #F9FBE7;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.22rem 0.6rem;
          border-radius: 6px;
          margin-top: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .gateway-card-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.65rem;
          margin-top: 0.35rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .explore-link-text {
          font-size: 0.82rem;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: 0.02em;
        }

        .action-circle-arrow {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease;
        }

        .gateway-pillar-card:hover .action-circle-arrow {
          transform: translateX(4px) scale(1.05);
        }

        @media (max-width: 768px) {
          .gateway-grid {
            grid-template-columns: 1fr;
          }
          .gateway-pillar-card {
            height: 280px;
          }
        }
      `}</style>
    </section>
  );
}
