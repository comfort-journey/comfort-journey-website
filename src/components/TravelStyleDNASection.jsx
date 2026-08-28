import React, { useState } from 'react';
import { TRAVEL_STYLE_DNA_QUESTIONS, TOURS_DATA } from '../data/toursData';
import { Compass, Sparkles, CheckCircle2, ArrowRight, RotateCcw, MessageCircle, MapPin, Calendar, Star, ShieldCheck } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useParticleBurst } from '../hooks/useParticleBurst';

export default function TravelStyleDNASection({ onSelectTour, onOpenQuote }) {
  const { formatPrice } = useCurrency();
  const { triggerBurst } = useParticleBurst();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [matchedTour, setMatchedTour] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = TRAVEL_STYLE_DNA_QUESTIONS[currentStep];

  const handleSelectOption = (e, optionId) => {
    triggerBurst(e, { count: 14, colors: ['#FF892F', '#6FE6FC', '#DAF561'] });
    const newAnswers = { ...answers, [currentQ.id]: optionId };
    setAnswers(newAnswers);

    if (currentStep < TRAVEL_STYLE_DNA_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    const landscapeOptionId = finalAnswers[3];
    const q3 = TRAVEL_STYLE_DNA_QUESTIONS[2];
    const chosenLandscape = q3.options.find(o => o.id === landscapeOptionId);
    
    let matchedId = "kashmir-paradise";
    if (chosenLandscape && chosenLandscape.match && chosenLandscape.match.length > 0) {
      matchedId = chosenLandscape.match[0];
    } else if (finalAnswers[1] === "slow") {
      matchedId = "kerala-backwaters";
    } else if (finalAnswers[2] === "couple") {
      matchedId = "bali-paradise";
    }

    const foundTour = TOURS_DATA.find(t => t.id === matchedId) || TOURS_DATA[0];
    setMatchedTour(foundTour);
    setIsCompleted(true);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setMatchedTour(null);
    setIsCompleted(false);
  };

  return (
    <section id="travel-dna" className="dna-section-root">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="badge badge-amber">
            <Compass size={14} />
            <span>INTERACTIVE DISCOVERY ENGINE</span>
          </div>
          <h2 className="section-title font-editorial">
            Discover Your Signature <span className="gradient-text-gold">Travel Style DNA</span>
          </h2>
          <p className="section-subtitle">
            Not sure which destination matches your mood? Answer 5 intuitive questions to reveal your perfect bespoke vacation itinerary.
          </p>
        </div>

        {/* DNA Studio Canvas Card */}
        <div className="dna-studio-card glass-panel">
          {!isCompleted ? (
            <div className="dna-step-flow">
              {/* Progress Bar & Indicators */}
              <div className="dna-step-header">
                <div className="step-dots-row">
                  {TRAVEL_STYLE_DNA_QUESTIONS.map((q, idx) => (
                    <div 
                      key={q.id} 
                      className={`step-dot-item ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
                      onClick={() => idx < currentStep && setCurrentStep(idx)}
                    >
                      <span className="dot-num">{idx + 1}</span>
                      <span className="dot-name">Q{idx + 1}</span>
                    </div>
                  ))}
                </div>
                <span className="step-progress-label">
                  Step <strong>{currentStep + 1}</strong> of {TRAVEL_STYLE_DNA_QUESTIONS.length}
                </span>
              </div>

              {/* Progress Line */}
              <div className="dna-line-track">
                <div 
                  className="dna-line-bar" 
                  style={{ width: `${((currentStep + 1) / TRAVEL_STYLE_DNA_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Active Question */}
              <div className="dna-question-area">
                <h3 className="dna-q-heading font-editorial">{currentQ.title}</h3>
                <p className="dna-q-sub">{currentQ.subtitle}</p>

                <div className="dna-options-matrix">
                  {currentQ.options.map((opt) => {
                    const isSelected = answers[currentQ.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`dna-matrix-card ${isSelected ? 'selected' : ''}`}
                        onClick={(e) => handleSelectOption(e, opt.id)}
                      >
                        <div className="dna-card-emoji-box">
                          <span className="dna-emoji">{opt.icon}</span>
                        </div>
                        <div className="dna-card-texts">
                          <h4 className="dna-opt-name">{opt.label}</h4>
                          <p className="dna-opt-detail">{opt.desc}</p>
                        </div>
                        {isSelected && (
                          <div className="dna-card-check">
                            <CheckCircle2 size={20} color="#FF892F" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {currentStep > 0 && (
                <div className="dna-step-footer">
                  <button 
                    type="button" 
                    className="btn-dna-prev"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                  >
                    ← Previous Question
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Presentation */
            <div className="dna-matched-result-view">
              <div className="result-headline-box text-center">
                <div className="badge badge-gold">
                  <Sparkles size={14} />
                  <span>PERFECT LUXURY MATCH</span>
                </div>
                <h3 className="result-main-title font-editorial">
                  Your Signature Itinerary Match is Ready
                </h3>
                <p className="result-main-sub">
                  Based on your rhythm, group shape, landscape longing, and comfort preferences, our Bhopal trip curators recommend:
                </p>
              </div>

              {matchedTour && (
                <div className="dna-result-hero-card glass-card">
                  <div className="result-img-wrapper">
                    <img src={matchedTour.image} alt={matchedTour.name} className="result-img" />
                    <span className="result-pill-badge">{matchedTour.badge || 'Signature Route'}</span>
                  </div>

                  <div className="result-content-pane">
                    <div className="result-meta-tags">
                      <span><MapPin size={14} className="text-amber" /> {matchedTour.country}</span>
                      <span><Calendar size={14} className="text-aqua" /> {matchedTour.duration}</span>
                      <span><Star size={14} fill="#FF892F" color="#FF892F" /> {matchedTour.rating} (Verified 5★)</span>
                    </div>

                    <h3 className="result-tour-title font-editorial">{matchedTour.name}</h3>
                    <p className="result-tour-tagline">"{matchedTour.tagline}"</p>

                    <div className="result-highlights-box">
                      <strong>✨ Included Luxury Inclusions:</strong>
                      <div className="result-chips-grid">
                        {matchedTour.highlights?.slice(0, 4).map((h, idx) => (
                          <div key={idx} className="result-chip-item">
                            <CheckCircle2 size={13} className="text-emerald" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="result-action-strip">
                      <div className="price-tag-block">
                        <span className="price-sub">Starting Price</span>
                        <div className="price-number">{formatPrice(matchedTour.price)} <small>/ person</small></div>
                      </div>

                      <div className="result-btns-row">
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={() => onSelectTour(matchedTour)}
                        >
                          <span>Explore Full Itinerary</span>
                          <ArrowRight size={16} />
                        </button>

                        <button
                          type="button"
                          className="btn-whatsapp"
                          onClick={() => {
                            const msg = `Hi Comfort Journey! I matched with "${matchedTour.name}" (${matchedTour.duration}) on your website's Travel Style DNA Engine. Please share availability and customized quote!`;
                            window.open(`https://wa.me/918770403315?text=${encodeURIComponent(msg)}`, '_blank');
                          }}
                        >
                          <MessageCircle size={16} />
                          <span>WhatsApp Quote</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="result-restart-wrap text-center">
                <button type="button" className="btn-restart-quiz" onClick={handleReset}>
                  <RotateCcw size={15} />
                  <span>Retake Discovery Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .dna-section-root {
          padding: 4.5rem 0 3.5rem 0;
          background: linear-gradient(180deg, #001233 0%, #001A40 50%, #001233 100%);
          position: relative;
        }

        .dna-studio-card {
          background: #00183B;
          border: 1.5px solid rgba(111, 230, 252, 0.28);
          border-radius: 32px;
          padding: 2.5rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
          margin-top: 2rem;
          position: relative;
          overflow: hidden;
        }

        .dna-step-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .step-dots-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .step-dot-item {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: #93B2D2;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          background: rgba(0, 29, 81, 0.6);
          border: 1px solid rgba(111, 230, 252, 0.2);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .step-dot-item.active {
          background: #FF892F;
          border-color: #FF892F;
          color: #FFFFFF;
          box-shadow: 0 0 15px rgba(255, 137, 47, 0.4);
        }

        .step-dot-item.completed {
          background: rgba(218, 245, 97, 0.15);
          border-color: #DAF561;
          color: #DAF561;
        }

        .step-progress-label {
          font-size: 0.84rem;
          color: #93B2D2;
        }

        .step-progress-label strong {
          color: #FF892F;
        }

        .dna-line-track {
          height: 4px;
          background: rgba(0, 29, 81, 0.9);
          border-radius: 4px;
          margin-bottom: 2rem;
          overflow: hidden;
        }

        .dna-line-bar {
          height: 100%;
          background: linear-gradient(90deg, #6FE6FC, #FF892F, #DAF561);
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dna-q-heading {
          font-size: 1.85rem;
          color: #F9FBE7;
          margin-bottom: 0.35rem;
          text-align: center;
        }

        .dna-q-sub {
          font-size: 0.95rem;
          color: #93B2D2;
          margin-bottom: 2rem;
          text-align: center;
        }

        .dna-options-matrix {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.15rem;
        }

        @media (min-width: 640px) {
          .dna-options-matrix {
            grid-template-columns: 1fr 1fr;
          }
        }

        .dna-matrix-card {
          display: flex;
          align-items: flex-start;
          gap: 1.15rem;
          background: rgba(0, 29, 81, 0.7);
          border: 1.5px solid rgba(111, 230, 252, 0.22);
          border-radius: 20px;
          padding: 1.35rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
        }

        .dna-matrix-card:hover {
          border-color: #6FE6FC;
          background: rgba(5, 38, 105, 0.9);
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
        }

        .dna-matrix-card.selected {
          border-color: #FF892F;
          background: rgba(255, 137, 47, 0.15);
          box-shadow: 0 0 25px rgba(255, 137, 47, 0.3);
        }

        .dna-card-emoji-box {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: rgba(0, 18, 51, 0.85);
          border: 1px solid rgba(111, 230, 252, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          flex-shrink: 0;
        }

        .dna-card-texts {
          flex: 1;
        }

        .dna-opt-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: #F9FBE7;
          margin-bottom: 0.25rem;
        }

        .dna-opt-detail {
          font-size: 0.84rem;
          color: #93B2D2;
          line-height: 1.45;
        }

        .dna-step-footer {
          margin-top: 1.75rem;
          display: flex;
          justify-content: flex-start;
        }

        .btn-dna-prev {
          background: transparent;
          border: none;
          color: #93B2D2;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .btn-dna-prev:hover {
          color: #F9FBE7;
        }

        /* Result View */
        .result-headline-box {
          margin-bottom: 2rem;
        }

        .result-main-title {
          font-size: 1.95rem;
          color: #F9FBE7;
          margin-top: 0.5rem;
          margin-bottom: 0.35rem;
        }

        .result-main-sub {
          font-size: 0.95rem;
          color: #93B2D2;
          max-width: 600px;
          margin: 0 auto;
        }

        .dna-result-hero-card {
          display: grid;
          grid-template-columns: 1fr;
          border-radius: 24px;
          overflow: hidden;
          background: #001D51;
          border: 1.5px solid rgba(111, 230, 252, 0.3);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          margin-bottom: 2rem;
        }

        @media (min-width: 820px) {
          .dna-result-hero-card {
            grid-template-columns: 360px 1fr;
          }
        }

        .result-img-wrapper {
          position: relative;
          min-height: 260px;
        }

        .result-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .result-pill-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(0, 18, 51, 0.85);
          border: 1px solid #FF892F;
          color: #FF892F;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 800;
        }

        .result-content-pane {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .result-meta-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.84rem;
          color: #93B2D2;
        }

        .result-meta-tags span {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .result-tour-title {
          font-size: 1.65rem;
          color: #F9FBE7;
        }

        .result-tour-tagline {
          font-size: 0.92rem;
          color: #DAF561;
          font-style: italic;
        }

        .result-highlights-box strong {
          display: block;
          font-size: 0.86rem;
          color: #F9FBE7;
          margin-bottom: 0.5rem;
        }

        .result-chips-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.45rem;
        }

        @media (min-width: 600px) {
          .result-chips-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .result-chip-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          color: #E2E8F0;
        }

        .result-action-strip {
          margin-top: 1rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(111, 230, 252, 0.15);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
        }

        .price-tag-block .price-sub {
          font-size: 0.76rem;
          color: #93B2D2;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
        }

        .price-tag-block .price-number {
          font-size: 1.65rem;
          font-weight: 900;
          color: #FF892F;
        }

        .price-tag-block .price-number small {
          font-size: 0.82rem;
          color: #93B2D2;
          font-weight: 500;
        }

        .result-btns-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .btn-restart-quiz {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(111, 230, 252, 0.25);
          color: #93B2D2;
          padding: 0.65rem 1.4rem;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-restart-quiz:hover {
          color: #F9FBE7;
          border-color: #6FE6FC;
        }
      `}</style>
    </section>
  );
}
