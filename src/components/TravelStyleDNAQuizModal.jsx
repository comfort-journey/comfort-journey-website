import React, { useState } from 'react';
import { TRAVEL_STYLE_DNA_QUESTIONS, TOURS_DATA } from '../data/toursData';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, CheckCircle2, MessageCircle, X, Compass, MapPin, Star, Calendar } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function TravelStyleDNAQuizModal({ isOpen, onClose, onSelectTour, onOpenQuote }) {
  const { formatPrice } = useCurrency();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [matchedTour, setMatchedTour] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentQ = TRAVEL_STYLE_DNA_QUESTIONS[currentStep];

  const handleSelectOption = (optionId) => {
    const newAnswers = { ...answers, [currentQ.id]: optionId };
    setAnswers(newAnswers);

    if (currentStep < TRAVEL_STYLE_DNA_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate best matching tour
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    // Landscape selection (Q3) gives primary match candidates
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content dna-quiz-modal luxury-scale-in" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="dna-modal-header">
          <div className="dna-badge-row">
            <span className="badge badge-amber">
              <Compass size={13} />
              <span>TRAVEL STYLE DNA</span>
            </span>
            {!isCompleted && (
              <span className="dna-step-counter">
                Step {currentStep + 1} of {TRAVEL_STYLE_DNA_QUESTIONS.length}
              </span>
            )}
          </div>
          <button className="dna-close-btn" onClick={onClose} aria-label="Close Quiz">
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        {!isCompleted && (
          <div className="dna-progress-track">
            <div 
              className="dna-progress-bar" 
              style={{ width: `${((currentStep + 1) / TRAVEL_STYLE_DNA_QUESTIONS.length) * 100}%` }}
            />
          </div>
        )}

        {/* Quiz Body */}
        <div className="dna-modal-body">
          {!isCompleted ? (
            <div className="dna-question-stage">
              <h2 className="dna-question-title font-editorial">
                {currentQ.title}
              </h2>
              <p className="dna-question-sub">
                {currentQ.subtitle}
              </p>

              <div className="dna-options-grid">
                {currentQ.options.map((opt) => {
                  const isSelected = answers[currentQ.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`dna-option-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectOption(opt.id)}
                    >
                      <div className="dna-opt-icon-box">
                        <span className="dna-opt-emoji">{opt.icon}</span>
                      </div>
                      <div className="dna-opt-content">
                        <h4 className="dna-opt-title">{opt.label}</h4>
                        <p className="dna-opt-desc">{opt.desc}</p>
                      </div>
                      {isSelected && (
                        <div className="dna-opt-check">
                          <CheckCircle2 size={18} color="#FF892F" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="dna-nav-footer">
                {currentStep > 0 && (
                  <button 
                    type="button" 
                    className="btn-dna-back"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                  >
                    <ArrowLeft size={16} />
                    <span>Previous Question</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="dna-result-stage">
              <div className="dna-result-header text-center">
                <div className="dna-sparkle-pill">
                  <Sparkles size={15} />
                  <span>YOUR PERFECT TRAVEL MATCH</span>
                </div>
                <h2 className="font-editorial dna-result-heading">
                  Tailored to Your Signature Travel DNA
                </h2>
                <p className="dna-result-sub">
                  Based on your pace, luxury preference, and landscape mood, our trip curation algorithm recommends:
                </p>
              </div>

              {matchedTour && (
                <div className="dna-matched-tour-card glass-card">
                  <div className="dna-matched-img-col">
                    <img src={matchedTour.image} alt={matchedTour.name} className="dna-matched-img" />
                    <span className="dna-matched-badge">{matchedTour.badge || 'Signature Route'}</span>
                  </div>
                  <div className="dna-matched-info-col">
                    <div className="dna-matched-meta">
                      <span><MapPin size={13} className="text-amber" /> {matchedTour.country || matchedTour.region}</span>
                      <span><Calendar size={13} className="text-aqua" /> {matchedTour.duration}</span>
                      <span><Star size={13} fill="#FF892F" color="#FF892F" /> {matchedTour.rating} (Verified)</span>
                    </div>

                    <h3 className="dna-matched-title font-editorial">{matchedTour.name}</h3>
                    <p className="dna-matched-tagline">"{matchedTour.tagline}"</p>

                    <div className="dna-matched-highlights">
                      <strong>Curated Match Highlights:</strong>
                      <ul>
                        {matchedTour.highlights?.slice(0, 3).map((h, i) => (
                          <li key={i}>
                            <CheckCircle2 size={13} className="text-emerald" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="dna-matched-pricing-row">
                      <div>
                        <span className="dna-price-label">Starting From</span>
                        <div className="dna-price-val">{formatPrice(matchedTour.price)} <small>/ person</small></div>
                      </div>

                      <div className="dna-action-btn-group">
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={() => {
                            onClose();
                            onSelectTour(matchedTour);
                          }}
                        >
                          <span>View Full Itinerary</span>
                          <ArrowRight size={16} />
                        </button>

                        <button
                          type="button"
                          className="btn-whatsapp"
                          onClick={() => {
                            const msg = `Hi Comfort Journey! I completed the Travel Style DNA Quiz and matched with "${matchedTour.name}". I would like a personalized quote!`;
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

              <div className="dna-result-footer">
                <button type="button" className="btn-dna-restart" onClick={handleReset}>
                  <RotateCcw size={15} />
                  <span>Retake Travel Style DNA Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <style>{`
          .dna-quiz-modal {
            max-width: 780px;
            background: #001A40;
            border: 1.5px solid rgba(111, 230, 252, 0.3);
            border-radius: 28px;
            overflow: hidden;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
          }

          .dna-modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem 1.75rem;
            background: #001233;
            border-bottom: 1px solid rgba(111, 230, 252, 0.15);
          }

          .dna-badge-row {
            display: flex;
            align-items: center;
            gap: 0.85rem;
          }

          .dna-step-counter {
            font-size: 0.82rem;
            color: #93B2D2;
            font-weight: 700;
          }

          .dna-close-btn {
            background: rgba(255, 255, 255, 0.08);
            border: none;
            color: #F9FBE7;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .dna-close-btn:hover {
            background: #FF892F;
            color: #FFFFFF;
            transform: rotate(90deg);
          }

          .dna-progress-track {
            height: 4px;
            background: rgba(0, 29, 81, 0.9);
            width: 100%;
          }

          .dna-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #6FE6FC, #FF892F, #DAF561);
            transition: width 0.35s ease;
          }

          .dna-modal-body {
            padding: 2rem 1.75rem;
          }

          .dna-question-title {
            font-size: 1.6rem;
            color: #F9FBE7;
            margin-bottom: 0.35rem;
          }

          .dna-question-sub {
            font-size: 0.92rem;
            color: #93B2D2;
            margin-bottom: 1.5rem;
          }

          .dna-options-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.85rem;
          }

          @media (min-width: 640px) {
            .dna-options-grid {
              grid-template-columns: 1fr 1fr;
            }
          }

          .dna-option-card {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            background: rgba(0, 29, 81, 0.7);
            border: 1.5px solid rgba(111, 230, 252, 0.2);
            border-radius: 18px;
            padding: 1.15rem;
            text-align: left;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
          }

          .dna-option-card:hover {
            border-color: #6FE6FC;
            background: rgba(5, 38, 105, 0.85);
            transform: translateY(-2px);
          }

          .dna-option-card.selected {
            border-color: #FF892F;
            background: rgba(255, 137, 47, 0.12);
            box-shadow: 0 0 20px rgba(255, 137, 47, 0.25);
          }

          .dna-opt-icon-box {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: rgba(0, 18, 51, 0.8);
            border: 1px solid rgba(111, 230, 252, 0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4rem;
            flex-shrink: 0;
          }

          .dna-opt-content {
            flex: 1;
          }

          .dna-opt-title {
            font-size: 0.98rem;
            font-weight: 700;
            color: #F9FBE7;
            margin-bottom: 0.25rem;
          }

          .dna-opt-desc {
            font-size: 0.82rem;
            color: #93B2D2;
            line-height: 1.4;
          }

          .dna-nav-footer {
            margin-top: 1.5rem;
            display: flex;
            justify-content: flex-start;
          }

          .btn-dna-back {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: transparent;
            border: none;
            color: #93B2D2;
            font-size: 0.86rem;
            font-weight: 600;
            cursor: pointer;
            transition: color 0.2s ease;
          }

          .btn-dna-back:hover {
            color: #F9FBE7;
          }

          /* Result Styling */
          .dna-result-header {
            margin-bottom: 1.5rem;
          }

          .dna-sparkle-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: linear-gradient(135deg, rgba(255, 137, 47, 0.2), rgba(218, 245, 97, 0.2));
            border: 1px solid rgba(255, 137, 47, 0.4);
            color: #FF892F;
            padding: 0.35rem 1rem;
            border-radius: var(--radius-full);
            font-size: 0.78rem;
            font-weight: 800;
            letter-spacing: 0.05em;
            margin-bottom: 0.6rem;
          }

          .dna-result-heading {
            font-size: 1.7rem;
            color: #F9FBE7;
            margin-bottom: 0.4rem;
          }

          .dna-result-sub {
            font-size: 0.9rem;
            color: #93B2D2;
            max-width: 540px;
            margin: 0 auto;
          }

          .dna-matched-tour-card {
            display: grid;
            grid-template-columns: 1fr;
            border-radius: 20px;
            overflow: hidden;
            border: 1.5px solid rgba(111, 230, 252, 0.3);
            background: #001D51;
            margin-bottom: 1.5rem;
          }

          @media (min-width: 640px) {
            .dna-matched-tour-card {
              grid-template-columns: 240px 1fr;
            }
          }

          .dna-matched-img-col {
            position: relative;
            min-height: 200px;
          }

          .dna-matched-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .dna-matched-badge {
            position: absolute;
            top: 0.75rem;
            left: 0.75rem;
            background: rgba(0, 18, 51, 0.85);
            border: 1px solid #FF892F;
            color: #FF892F;
            padding: 0.25rem 0.65rem;
            border-radius: var(--radius-full);
            font-size: 0.72rem;
            font-weight: 800;
          }

          .dna-matched-info-col {
            padding: 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
          }

          .dna-matched-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 0.85rem;
            font-size: 0.8rem;
            color: #93B2D2;
          }

          .dna-matched-meta span {
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
          }

          .dna-matched-title {
            font-size: 1.25rem;
            color: #F9FBE7;
          }

          .dna-matched-tagline {
            font-size: 0.84rem;
            color: #DAF561;
            font-style: italic;
          }

          .dna-matched-highlights {
            font-size: 0.82rem;
            color: #93B2D2;
          }

          .dna-matched-highlights strong {
            color: #F9FBE7;
            display: block;
            margin-bottom: 0.3rem;
          }

          .dna-matched-highlights ul {
            list-style: none;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .dna-matched-highlights li {
            display: flex;
            align-items: center;
            gap: 0.4rem;
          }

          .dna-matched-pricing-row {
            margin-top: 0.5rem;
            padding-top: 0.75rem;
            border-top: 1px solid rgba(111, 230, 252, 0.15);
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 0.85rem;
          }

          .dna-price-label {
            font-size: 0.72rem;
            color: #93B2D2;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .dna-price-val {
            font-size: 1.35rem;
            font-weight: 800;
            color: #FF892F;
          }

          .dna-price-val small {
            font-size: 0.75rem;
            color: #93B2D2;
            font-weight: 500;
          }

          .dna-action-btn-group {
            display: flex;
            gap: 0.5rem;
          }

          .dna-result-footer {
            text-align: center;
          }

          .btn-dna-restart {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(111, 230, 252, 0.2);
            color: #93B2D2;
            padding: 0.6rem 1.25rem;
            border-radius: var(--radius-full);
            font-size: 0.84rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .btn-dna-restart:hover {
            color: #F9FBE7;
            border-color: #6FE6FC;
          }
        `}</style>
      </div>
    </div>
  );
}
