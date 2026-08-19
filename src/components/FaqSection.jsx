import React, { useState } from 'react';
import { FAQS } from '../data/toursData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faqs" className="faq-root">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-accent">Got Questions?</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about booking domestic & international tour packages with Comfort Journey.
          </p>
        </div>

        <div className="faq-container">
          {FAQS.map((faq, idx) => (
            <div key={idx} className={`faq-item ${openIdx === idx ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(idx)}>
                <span className="q-text">
                  <HelpCircle size={18} className="q-icon" />
                  {faq.q}
                </span>
                <ChevronDown size={20} className="chevron" />
              </button>

              {openIdx === idx && (
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .faq-root {
          padding: 6rem 0;
          background: #F8FAFC;
        }

        .faq-container {
          max-width: 800px;
          margin: 3rem auto 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          background: #FFFFFF;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-sm);
        }

        .faq-item.open {
          border-color: var(--color-primary);
          box-shadow: var(--shadow-md);
        }

        .faq-question {
          width: 100%;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: transparent;
          text-align: left;
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--color-secondary);
          cursor: pointer;
        }

        .q-text {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .q-icon {
          color: var(--color-primary);
          flex-shrink: 0;
        }

        .chevron {
          transition: transform 0.3s ease;
          color: var(--color-text-muted);
        }

        .faq-item.open .chevron {
          transform: rotate(180deg);
          color: var(--color-primary);
        }

        .faq-answer {
          padding: 0 1.5rem 1.25rem 3rem;
          font-size: 0.95rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          .faq-root {
            padding: 3.5rem 0;
          }
          .faq-container {
            margin-top: 2rem;
          }
          .faq-question {
            padding: 1rem 1.1rem;
            font-size: 0.95rem;
          }
          .q-text {
            gap: 0.5rem;
          }
          .faq-answer {
            padding: 0 1.1rem 1rem 1.1rem;
            font-size: 0.88rem;
          }
        }
      `}</style>
    </section>
  );
}
