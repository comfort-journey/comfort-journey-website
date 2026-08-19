import React from 'react';
import { Compass, Award, Users, ShieldCheck } from 'lucide-react';

export default function AboutPromoSection({ onOpenQuote }) {
  return (
    <section id="about" className="about-root">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-col">
            <div className="image-stack">
              <img 
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" 
                alt="Comfort Journey Travel Experience" 
                className="img-main"
                loading="lazy"
                decoding="async"
                width="800"
                height="480"
              />
              <div className="glass-card trust-badge-overlay">
                <Award size={36} className="badge-icon" />
                <div>
                  <span className="b-val">30+ Years</span>
                  <span className="b-lbl">Established 1992</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-content-col">
            <span className="badge badge-primary">Who We Are</span>
            <h2 className="about-title">
              Comfort Journey <br />
              <span className="highlight">WE MAKE YOUR TRIPS UNFORGOTTABLE</span>
            </h2>
            <p className="about-lead">
              Founded in 1992 by <strong>Sharad Kumar Mishra</strong> and led by <strong>Rishabh Dev Mishra</strong>, Comfort Journey is Bhopal's premier travel agency dedicated to turning dream vacations into seamless reality.
            </p>
            <p className="about-body">
              With 30+ years of domain expertise, we specialize in customized domestic and international tour packages for over 2,000 destinations. Whether it's a romantic honeymoon in Kashmir or Bali, a family holiday in Himachal or Andaman, or a spiritual Char Dham yatra, we manage everything from flight tickets, hotel reservations, and visa processing to 24/7 on-trip assistance.
            </p>

            <div className="about-highlights">
              <div className="h-item">
                <ShieldCheck size={20} className="h-icon" />
                <span>100% Customized Day-Wise Itineraries</span>
              </div>
              <div className="h-item">
                <ShieldCheck size={20} className="h-icon" />
                <span>Pre-Verified 3/4/5 Star Hotels & Private Cabs</span>
              </div>
            </div>

            <button className="btn-primary lets-travel-btn" onClick={onOpenQuote}>
              <Compass size={20} />
              <span>LET'S TRAVEL</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .about-root {
          padding: 6rem 0;
          background: #FFFFFF;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .image-stack {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .img-main {
          width: 100%;
          height: 480px;
          object-fit: cover;
          display: block;
        }

        .trust-badge-overlay {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(15, 23, 42, 0.85);
          color: #FFFFFF;
          border-radius: var(--radius-md);
        }

        .badge-icon {
          color: var(--color-primary);
        }

        .b-val {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.35rem;
          display: block;
          line-height: 1;
        }

        .b-lbl {
          font-size: 0.8rem;
          color: #94A3B8;
        }

        .about-title {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          color: var(--color-secondary);
          margin: 0.75rem 0 1.25rem 0;
          line-height: 1.2;
        }

        .highlight {
          color: var(--color-primary);
        }

        .about-lead {
          font-size: 1.05rem;
          color: var(--color-text-main);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .about-body {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          line-height: 1.65;
          margin-bottom: 1.5rem;
        }

        .about-highlights {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .h-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--color-secondary);
        }

        .h-icon {
          color: var(--color-accent);
        }

        .lets-travel-btn {
          padding: 1rem 2.25rem;
          font-size: 1.05rem;
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .img-main {
            height: 350px;
          }
        }

        @media (max-width: 640px) {
          .about-root {
            padding: 3.5rem 0;
          }
          .img-main {
            height: 280px;
          }
          .trust-badge-overlay {
            bottom: 1rem;
            left: 1rem;
            right: 1rem;
            padding: 0.75rem 1rem;
            gap: 0.75rem;
          }
          .b-val {
            font-size: 1.15rem;
          }
          .about-title {
            font-size: clamp(1.75rem, 6vw, 2.2rem);
          }
          .lets-travel-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
