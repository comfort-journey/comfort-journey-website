import React from 'react';
import { ShieldCheck, Plane, FileCheck, Headphones, Heart, Award } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Award size={28} />,
      title: "30+ Years Travel Expertise",
      desc: "Serving happy travelers from Bhopal & nationwide since 1992 with unmatched local & global knowledge."
    },
    {
      icon: <Plane size={28} />,
      title: "Complete Flight & Train Booking",
      desc: "Seamless group or individual flight tickets and train reservation assistance included in every package."
    },
    {
      icon: <FileCheck size={28} />,
      title: "Hassle-Free Visa Assistance",
      desc: "Expert guidance for international tourist visas for Bali, Dubai, Thailand, Europe, and Asia."
    },
    {
      icon: <Headphones size={28} />,
      title: "24/7 On-Trip Support",
      desc: "Our dedicated tour coordinators are available around the clock to assist you at every step of your journey."
    },
    {
      icon: <Heart size={28} />,
      title: "Tailor-Made Itineraries",
      desc: "Every trip is customized to match your budget, dates, and hotel preferences with zero hidden costs."
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "100% Satisfaction Guarantee",
      desc: "Verified 3/4/5-star luxury hotels, private sanitized cabs, and experienced local tour guides."
    }
  ];

  return (
    <section id="why-us" className="why-root">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-accent">Why Choose Us</span>
          <h2 className="section-title">The Comfort Journey Difference</h2>
          <p className="section-subtitle">
            We don't just book trips — we create seamless, unforgettable travel experiences crafted around your comfort.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feat, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">{feat.icon}</div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-root {
          padding: 6rem 0;
          background: #FFFFFF;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .feature-card {
          padding: 2rem;
          border-radius: var(--radius-md);
          background: #F8FAFC;
          border: 1px solid var(--color-border);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: var(--color-primary);
          box-shadow: var(--shadow-md);
        }

        .feature-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: var(--color-primary-light);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .feature-title {
          font-size: 1.2rem;
          color: var(--color-secondary);
          margin-bottom: 0.5rem;
        }

        .feature-desc {
          font-size: 0.92rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          .why-root {
            padding: 3.5rem 0;
          }
          .features-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            margin-top: 2rem;
          }
          .feature-card {
            padding: 1.25rem;
          }
          .feature-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            margin-bottom: 0.85rem;
          }
          .feature-title {
            font-size: 1.1rem;
          }
          .feature-desc {
            font-size: 0.88rem;
          }
        }
      `}</style>
    </section>
  );
}
