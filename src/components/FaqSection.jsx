import React, { useState } from 'react';
import { FAQS } from '../data/toursData';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle, PhoneCall } from 'lucide-react';
import Tilt3DCard from './animations/Tilt3DCard';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faqs" className="faq-root">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge badge-amber">
            <Sparkles size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="section-title font-editorial">
            Frequently Asked <span className="gradient-text-gold">Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about booking bespoke domestic & international luxury vacations with Comfort Journey since 1992.
          </p>
        </div>

        <div className="faq-container">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`faq-item glass-card ${isOpen ? 'open' : ''}`}
              >
                <button 
                  type="button"
                  className="faq-question" 
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="q-text">
                    <span className="q-num">0{idx + 1}</span>
                    <span className="q-title">{faq.q}</span>
                  </span>
                  <div className={`chevron-box ${isOpen ? 'rotate' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-answer">
                    <div className="answer-divider"></div>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Callout */}
        <div className="faq-help-box glass-card">
          <div className="faq-help-content">
            <h4 className="font-editorial">Still have questions about your dream destination?</h4>
            <p>Our senior trip designers in Bhopal are available 24/7 with zero consultation charges.</p>
          </div>
          <div className="faq-help-actions">
            <a 
              href="https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I%20have%20a%20question%20regarding%20tour%20packages."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle size={18} />
              <span>Ask on WhatsApp</span>
            </a>
            <a href="tel:+918770403315" className="btn-secondary">
              <PhoneCall size={18} />
              <span>+91 8770403315</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .faq-root {
          padding: 3.5rem 0 2.5rem 0;
          background: var(--cj-bg-panel, #001D51);
          color: #FFFFFF;
          position: relative;
          z-index: 2;
        }

        .section-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: clamp(2.2rem, 4.5vw, 3.2rem);
          margin: 0.85rem 0;
          color: #F9FBE7;
        }

        .section-subtitle {
          max-width: 680px;
          margin: 0 auto;
          color: #93B2D2;
          font-size: 1.05rem;
          line-height: 1.6;
        }

        .faq-container {
          max-width: 860px;
          margin: 0 auto 2.25rem auto;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .faq-item {
          background: rgba(5, 38, 105, 0.85);
          border: 1px solid rgba(111, 230, 252, 0.15);
          border-radius: var(--radius-lg, 24px);
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }

        .faq-item:hover {
          border-color: rgba(255, 137, 47, 0.4);
          transform: translateY(-2px);
        }

        .faq-item.open {
          border-color: #FF892F;
          box-shadow: 0 10px 30px rgba(0, 18, 51, 0.5), 0 0 20px rgba(255, 137, 47, 0.15);
          background: rgba(0, 29, 81, 0.95);
        }

        .faq-question {
          width: 100%;
          padding: 1.35rem 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: transparent;
          text-align: left;
          color: #F9FBE7;
          cursor: pointer;
          border: none;
          gap: 1rem;
        }

        .q-text {
          display: flex;
          align-items: center;
          gap: 1.1rem;
        }

        .q-num {
          font-family: var(--font-ui, 'Outfit', sans-serif);
          font-size: 0.85rem;
          font-weight: 900;
          color: #FF892F;
          background: rgba(255, 137, 47, 0.12);
          border: 1px solid rgba(255, 137, 47, 0.3);
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm, 10px);
          flex-shrink: 0;
        }

        .q-title {
          font-family: var(--font-ui, 'Outfit', sans-serif);
          font-size: 1.08rem;
          font-weight: 700;
          color: #F9FBE7;
          line-height: 1.4;
        }

        .chevron-box {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6FE6FC;
          flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease;
        }

        .chevron-box.rotate {
          transform: rotate(180deg);
          background: rgba(255, 137, 47, 0.2);
          color: #FF892F;
          border-color: #FF892F;
        }

        .faq-answer {
          padding: 0 1.75rem 1.5rem 1.75rem;
          color: #EDF3D2;
          font-size: 0.95rem;
          line-height: 1.7;
          animation: faqSlideIn 0.25s ease-out;
        }

        .answer-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin-bottom: 1.15rem;
        }

        @keyframes faqSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .faq-help-box {
          max-width: 860px;
          margin: 0 auto;
          padding: 2rem 2.5rem;
          border-radius: var(--radius-xl, 36px);
          background: rgba(0, 29, 81, 0.9);
          border: 1px solid rgba(111, 230, 252, 0.25);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .faq-help-content h4 {
          font-size: 1.25rem;
          color: #F9FBE7;
          margin-bottom: 0.35rem;
        }

        .faq-help-content p {
          color: #93B2D2;
          font-size: 0.9rem;
        }

        .faq-help-actions {
          display: flex;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .faq-root {
            padding: 4.5rem 0;
          }
          .faq-question {
            padding: 1.15rem 1.25rem;
          }
          .q-title {
            font-size: 0.95rem;
          }
          .faq-help-box {
            padding: 1.5rem;
            flex-direction: column;
            text-align: center;
          }
          .faq-help-actions {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
