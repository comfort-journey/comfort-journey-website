import React from 'react';
import { TESTIMONIALS } from '../data/toursData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="testimonials-root">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-primary">Traveler Stories</span>
          <h2 className="section-title">Trusted by 50,000+ Happy Families</h2>
          <div className="rating-pill">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#FFB800" color="#FFB800" />
              ))}
            </div>
            <span className="score">4.9 / 5.0 Rating</span>
            <span className="reviews-text">• Based on Verified Customer Feedback</span>
          </div>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((item, idx) => (
            <div key={idx} className="testimonial-card">
              <Quote size={32} className="quote-icon" />
              <p className="comment">"{item.comment}"</p>
              
              <div className="author-row">
                <img src={item.avatar} alt={item.name} className="author-img" />
                <div className="author-info">
                  <h4 className="name">{item.name}</h4>
                  <span className="meta">{item.location} • {item.tour}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-root {
          padding: 6rem 0;
          background: #0F172A;
          color: #FFFFFF;
        }

        .testimonials-root .section-title {
          color: #FFFFFF;
        }

        .rating-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.06);
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .rating-pill .stars {
          display: flex;
          gap: 0.2rem;
        }

        .rating-pill .score {
          font-weight: 700;
          color: #FFFFFF;
        }

        .rating-pill .reviews-text {
          font-size: 0.85rem;
          color: #CBD5E1;
          font-weight: 600;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 3.5rem;
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 107, 0, 0.4);
        }

        .quote-icon {
          color: var(--color-primary);
          opacity: 0.4;
          margin-bottom: 1rem;
        }

        .comment {
          font-size: 0.98rem;
          line-height: 1.65;
          color: #E2E8F0;
          font-style: italic;
          margin-bottom: 1.75rem;
          flex: 1;
        }

        .author-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 1rem;
        }

        .author-img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--color-primary);
        }

        .author-info {
          display: flex;
          flex-direction: column;
        }

        .author-info .name {
          font-size: 1.05rem;
          color: #FFFFFF;
          margin-bottom: 0.15rem;
        }

        .author-info .meta {
          font-size: 0.8rem;
          color: var(--color-primary);
        }

        @media (max-width: 640px) {
          .testimonials-root {
            padding: 3.5rem 0;
          }
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            margin-top: 2rem;
          }
          .testimonial-card {
            padding: 1.25rem;
          }
          .comment {
            font-size: 0.92rem;
            margin-bottom: 1.25rem;
          }
          .rating-pill {
            padding: 0.4rem 0.85rem;
            font-size: 0.82rem;
          }
        }
      `}</style>
    </section>
  );
}
