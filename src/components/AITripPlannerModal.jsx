import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle, Clock, MapPin, Hotel, Users, ArrowRight, MessageCircle, Heart, ShieldCheck, Flame } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { TOURS_DATA } from '../data/toursData';

export default function AITripPlannerModal({ isOpen = true, onClose, onSelectTour, onBookCustomTrip }) {
  const { formatPrice } = useCurrency();

  const [step, setStep] = useState(1);
  const [customPrompt, setCustomPrompt] = useState('');
  const [vibe, setVibe] = useState('Romantic Honeymoon');
  const [landscape, setLandscape] = useState('Snow & Glaciers');
  const [durationGroup, setDurationGroup] = useState('5–6 Days');
  const [guestsCount, setGuestsCount] = useState(2);
  const [hotelTier, setHotelTier] = useState('5-Star Royal Palace / Pool Villa');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);

  if (isOpen === false) return null;

  const vibesList = [
    { title: 'Romantic Honeymoon', desc: 'Candlelight dinners, private villas & sunset cruises', icon: '💑' },
    { title: 'Family Wonder', desc: 'Child-friendly pacing, spacious SUVs & luxury resorts', icon: '👨‍👩‍👧‍👦' },
    { title: 'Thrill & Treks', desc: 'Snowmobiling, scuba, dune bashing & hiking', icon: '🧗' },
    { title: 'Ultra Luxury Palaces', desc: 'Royal heritage suites, private butlers & helicopters', icon: '👑' },
    { title: 'Sacred Heritage', desc: 'Char Dham, Kedarnath VIP darshan & Ganga aarti', icon: '🕉️' }
  ];

  const landscapesList = [
    { title: 'Snow & Glaciers', sub: 'Kashmir, Swiss Alps, Iceland', icon: '❄️' },
    { title: 'Tropical Islands', sub: 'Bali, Maldives, Andaman', icon: '🏝️' },
    { title: 'Desert Oasis', sub: 'Dubai, Abu Dhabi, Rajasthan', icon: '🏜️' },
    { title: 'European Fairytale', sub: 'Italy, France, Switzerland', icon: '🏰' },
    { title: 'African Safari', sub: 'Kenya Maasai Mara, Serengeti', icon: '🦁' },
    { title: 'Japanese Zen', sub: 'Kyoto, Tokyo, Mount Fuji', icon: '🌸' }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setStep(5); // Loading screen

    setTimeout(() => {
      let matchedTour = TOURS_DATA[0];
      const lowerPrompt = customPrompt.toLowerCase();

      if (lowerPrompt) {
        const found = TOURS_DATA.find(t => 
          t.name.toLowerCase().includes(lowerPrompt) ||
          t.country.toLowerCase().includes(lowerPrompt) ||
          t.region.toLowerCase().includes(lowerPrompt) ||
          (t.vibeTags && t.vibeTags.some(v => lowerPrompt.includes(v.toLowerCase()))) ||
          (t.tagline && t.tagline.toLowerCase().includes(lowerPrompt))
        );
        if (found) matchedTour = found;
      } else {
        if (landscape === 'Tropical Islands') matchedTour = TOURS_DATA.find(t => t.country.includes('Indonesia') || t.name.includes('Bali')) || TOURS_DATA[1];
        else if (landscape === 'European Fairytale') matchedTour = TOURS_DATA.find(t => t.region === 'Europe' || t.name.includes('Swiss')) || TOURS_DATA[2];
        else if (landscape === 'Snow & Glaciers') matchedTour = TOURS_DATA.find(t => t.name.includes('Kashmir') || t.name.includes('Iceland')) || TOURS_DATA[0];
        else if (landscape === 'Desert Oasis') matchedTour = TOURS_DATA.find(t => t.name.includes('Dubai') || t.name.includes('Rajasthan')) || TOURS_DATA[3];
        else if (landscape === 'African Safari') matchedTour = TOURS_DATA.find(t => t.region === 'Africa' || t.name.includes('Kenya')) || TOURS_DATA[7] || TOURS_DATA[0];
        else if (vibe === 'Sacred Heritage') matchedTour = TOURS_DATA.find(t => t.category.includes('Pilgrimage') || t.name.includes('Kedarnath')) || TOURS_DATA[8] || TOURS_DATA[0];
      }

      setGeneratedResult({
        matchedTour,
        customDays: matchedTour.itinerary ? matchedTour.itinerary.slice(0, 5) : [],
        estimatedCost: matchedTour.price,
        summary: customPrompt 
          ? `Bespoke AI Itinerary generated for "${customPrompt}" featuring 5-star properties, private transfers & dedicated 24/7 concierge.`
          : `Tailor-made ${durationGroup} VIP itinerary for ${guestsCount} traveler(s) combining ${vibe} with ${landscape} scenery and ${hotelTier}.`
      });
      setIsGenerating(false);
    }, 1200);
  };

  const handleWhatsAppBooking = () => {
    if (!generatedResult) return;
    const msg = encodeURIComponent(`Hi Comfort Journey! I generated a custom trip on your AI Dream Planner:
✨ Custom Request: ${customPrompt || `${vibe} in ${landscape}`}
⏱️ Duration: ${durationGroup}
👥 Travelers: ${guestsCount} Person(s)
🏨 Hotel Tier: ${hotelTier}
🎯 Matched Package: ${generatedResult.matchedTour.name}
💰 Estimated Budget: ${formatPrice(generatedResult.estimatedCost)} / person

Please connect me with a Senior Trip Designer to finalize this trip!`);

    window.open(`https://wa.me/918770403315?text=${msg}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content ai-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ai-modal-header">
          <div className="ai-badge-row">
            <div className="badge badge-ai">
              <Sparkles size={14} />
              <span>AI Trip Designer • 2026 Engine</span>
            </div>
            <span className="step-indicator">Step {step <= 4 ? `${step} of 4` : 'Result'}</span>
          </div>

          <button className="ai-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Step 1: Travel Vibe */}
        {step === 1 && (
          <div className="ai-step-body">
            <h2 className="ai-step-title">What is your desired <span className="gradient-text-ai">Travel Vibe?</span></h2>
            <p className="ai-step-desc">Choose your preferred style or type your dream trip in your own words.</p>

            {/* Smart Natural Language Prompt Input */}
            <div className="ai-prompt-input-row">
              <div className="ai-input-wrap">
                <Sparkles size={16} className="text-ai" />
                <input 
                  type="text" 
                  placeholder="Type anything, e.g. 7 days in Kashmir snow with houseboats"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleGenerate(); }}
                />
              </div>
              <button type="button" className="btn-ai-glow instant-gen-btn" onClick={handleGenerate}>
                <span>Instant AI Plan</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="ai-divider-text">
              <span>OR CHOOSE A CURATED TRAVEL VIBE</span>
            </div>

            <div className="ai-options-grid">
              {vibesList.map((v) => (
                <button
                  key={v.title}
                  type="button"
                  className={`ai-card-btn ${vibe === v.title ? 'active' : ''}`}
                  onClick={() => setVibe(v.title)}
                >
                  <span className="vibe-emoji">{v.icon}</span>
                  <div className="vibe-text">
                    <strong>{v.title}</strong>
                    <span>{v.desc}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="ai-step-actions">
              <button className="btn-ai-glow" onClick={() => setStep(2)}>
                <span>Next: Choose Landscape</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Landscape Style */}
        {step === 2 && (
          <div className="ai-step-body">
            <h2 className="ai-step-title">Select your preferred <span className="gradient-text-ai">Landscape Style</span></h2>
            <p className="ai-step-desc">Where does your imagination want to wake up?</p>

            <div className="ai-landscapes-grid">
              {landscapesList.map((l) => (
                <button
                  key={l.title}
                  type="button"
                  className={`ai-landscape-btn ${landscape === l.title ? 'active' : ''}`}
                  onClick={() => setLandscape(l.title)}
                >
                  <span className="landscape-emoji">{l.icon}</span>
                  <strong>{l.title}</strong>
                  <small>{l.sub}</small>
                </button>
              ))}
            </div>

            <div className="ai-step-actions between">
              <button className="btn-secondary" onClick={() => setStep(1)}>
                Back
              </button>
              <button className="btn-ai-glow" onClick={() => setStep(3)}>
                <span>Next: Duration & Guests</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Duration & Travelers */}
        {step === 3 && (
          <div className="ai-step-body">
            <h2 className="ai-step-title">Trip Duration & <span className="gradient-text-ai">Travelers</span></h2>
            <p className="ai-step-desc">Tell us your time window and group size.</p>

            <div className="ai-form-group">
              <label>Ideal Vacation Duration</label>
              <div className="duration-pills-row">
                {['3–4 Days (Quick Getaway)', '5–6 Days (Most Popular)', '7–9 Days (Grand Tour)', '10–14 Days (Expedition)'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`dur-pill ${durationGroup === d ? 'active' : ''}`}
                    onClick={() => setDurationGroup(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="ai-form-group">
              <label>Number of Travelers: <strong>{guestsCount} Guests</strong></label>
              <div className="guests-stepper-row">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`guest-num-btn ${guestsCount === num ? 'active' : ''}`}
                    onClick={() => setGuestsCount(num)}
                  >
                    {num} {num === 1 ? 'Solo' : num === 2 ? 'Couple' : 'Guests'}
                  </button>
                ))}
              </div>
            </div>

            <div className="ai-step-actions between">
              <button className="btn-secondary" onClick={() => setStep(2)}>
                Back
              </button>
              <button className="btn-ai-glow" onClick={() => setStep(4)}>
                <span>Next: Hotel Tier</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Hotel Tier */}
        {step === 4 && (
          <div className="ai-step-body">
            <h2 className="ai-step-title">Preferred <span className="gradient-text-ai">Accommodation Tier</span></h2>
            <p className="ai-step-desc">All properties are handpicked and pre-audited for comfort.</p>

            <div className="ai-options-grid">
              {[
                { title: '3-Star Boutique Comfort', desc: 'Cozy verified hotels, spotless rooms & complimentary breakfast', icon: '🏨' },
                { title: '4-Star Premium Deluxe Resort', desc: 'Scenic mountain/beach resorts, swimming pools & gourmet dining', icon: '🌟' },
                { title: '5-Star Royal Palace / Pool Villa', desc: 'Overwater bungalows, private pool villas, 24/7 butler & royal luxury', icon: '👑' }
              ].map((tier) => (
                <button
                  key={tier.title}
                  type="button"
                  className={`ai-card-btn ${hotelTier === tier.title ? 'active' : ''}`}
                  onClick={() => setHotelTier(tier.title)}
                >
                  <span className="vibe-emoji">{tier.icon}</span>
                  <div className="vibe-text">
                    <strong>{tier.title}</strong>
                    <span>{tier.desc}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="ai-step-actions between">
              <button className="btn-secondary" onClick={() => setStep(3)}>
                Back
              </button>
              <button className="btn-ai-glow" onClick={handleGenerate}>
                <Sparkles size={18} />
                <span>Generate Custom Dream Itinerary</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Loading State or Results */}
        {step === 5 && (
          <div className="ai-step-body">
            {isGenerating ? (
              <div className="ai-loading-box">
                <div className="spinner-glow"></div>
                <h3>Synthesizing Your Custom Itinerary...</h3>
                <p>Analyzing weather, flight routes, 5-star hotel availability & private chauffeurs for {landscape}.</p>
              </div>
            ) : generatedResult ? (
              <div className="ai-result-box">
                <div className="result-top-card glass-panel">
                  <div className="result-meta">
                    <span className="badge badge-ai">✨ AI Custom Match</span>
                    <h3 className="result-title">{generatedResult.matchedTour.name}</h3>
                    <p className="result-summary">{generatedResult.summary}</p>
                  </div>

                  <div className="result-price-strip">
                    <span className="price-lead">Estimated Price Per Person:</span>
                    <strong className="result-price">{formatPrice(generatedResult.estimatedCost)}</strong>
                  </div>
                </div>

                {/* Day by Day Outline */}
                <h4 className="itinerary-preview-title">Day-by-Day Customized Blueprint</h4>
                <div className="ai-days-list">
                  {generatedResult.customDays.map((d) => (
                    <div key={d.day} className="ai-day-card glass-card">
                      <div className="day-badge-col">
                        <span className="day-number">Day {d.day}</span>
                      </div>
                      <div className="day-info-col">
                        <h5 className="day-name">{d.title}</h5>
                        <p className="day-desc">
                          <strong>Morning:</strong> {d.morning} • <strong>Evening:</strong> {d.evening}
                        </p>
                        <div className="day-meta-tags">
                          <span>🏨 {d.stayTier}</span>
                          <span>🚗 {d.transport}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Action Hub */}
                <div className="ai-result-actions-hub">
                  <button 
                    type="button" 
                    className="btn-whatsapp ai-hub-btn" 
                    onClick={handleWhatsAppBooking}
                  >
                    <MessageCircle size={18} />
                    <span>Lock Itinerary via WhatsApp</span>
                  </button>

                  {onSelectTour && (
                    <button 
                      type="button" 
                      className="btn-primary ai-hub-btn"
                      onClick={() => onSelectTour(generatedResult.matchedTour)}
                    >
                      <span>View Full Tour Details</span>
                      <ArrowRight size={16} />
                    </button>
                  )}

                  <button 
                    type="button" 
                    className="btn-secondary ai-hub-btn"
                    onClick={() => {
                      setStep(1);
                      setGeneratedResult(null);
                      setCustomPrompt('');
                    }}
                  >
                    <span>Plan Another Trip</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <style>{`
        .ai-modal-content {
          max-width: 780px;
          padding: 2.25rem;
        }

        .ai-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--cj-glass-border);
          margin-bottom: 1.5rem;
        }

        .ai-badge-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .step-indicator {
          font-family: var(--font-ui);
          font-size: 0.82rem;
          color: #94A3B8;
          font-weight: 700;
        }

        .ai-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          color: #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ai-step-body {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .ai-step-title {
          font-size: 1.65rem;
          color: #FFFFFF;
          line-height: 1.25;
        }

        .ai-step-desc {
          color: #94A3B8;
          font-size: 0.95rem;
          margin-top: -0.65rem;
        }

        .ai-options-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .ai-card-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.15rem 1.25rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--cj-glass-border);
          text-align: left;
          color: #FFFFFF;
          transition: all 0.25s ease;
        }

        .ai-card-btn:hover {
          background: rgba(255, 255, 255, 0.09);
        }

        .ai-card-btn.active {
          background: rgba(139, 92, 246, 0.18);
          border-color: #8B5CF6;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
        }

        .vibe-emoji {
          font-size: 1.85rem;
          flex-shrink: 0;
        }

        .vibe-text {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .vibe-text strong {
          font-family: var(--font-ui);
          font-size: 1.05rem;
          color: #FFFFFF;
        }

        .vibe-text span {
          font-size: 0.85rem;
          color: #94A3B8;
        }

        .ai-landscapes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 0.85rem;
        }

        .ai-landscape-btn {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.35rem;
          padding: 1.25rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--cj-glass-border);
          color: #FFFFFF;
          text-align: left;
          transition: all 0.25s ease;
        }

        .ai-landscape-btn:hover {
          background: rgba(255, 255, 255, 0.09);
        }

        .ai-landscape-btn.active {
          background: rgba(236, 72, 153, 0.18);
          border-color: #EC4899;
          box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
        }

        .landscape-emoji {
          font-size: 2rem;
          margin-bottom: 0.25rem;
        }

        .ai-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .ai-form-group label {
          font-family: var(--font-ui);
          font-size: 0.85rem;
          font-weight: 800;
          color: #94A3B8;
          text-transform: uppercase;
        }

        .duration-pills-row, .guests-stepper-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
        }

        .dur-pill, .guest-num-btn {
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--cj-glass-border);
          color: #E2E8F0;
          font-family: var(--font-ui);
          font-size: 0.88rem;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .dur-pill.active, .guest-num-btn.active {
          background: linear-gradient(135deg, var(--cj-ai-1), var(--cj-ai-2));
          border-color: transparent;
          color: #FFFFFF;
        }

        .ai-step-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.25rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .ai-step-actions.between {
          justify-content: space-between;
        }

        /* Loading */
        .ai-loading-box {
          text-align: center;
          padding: 4rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .spinner-glow {
          width: 56px;
          height: 56px;
          border: 4px solid rgba(139, 92, 246, 0.2);
          border-top-color: #EC4899;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Results */
        .ai-result-box {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .result-top-card {
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .result-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: #FFFFFF;
          margin: 0.35rem 0;
        }

        .result-summary {
          font-size: 0.85rem;
          color: #CBD5E1;
        }

        .result-price-strip {
          text-align: right;
        }

        .price-lead {
          font-size: 0.72rem;
          color: #94A3B8;
          display: block;
          text-transform: uppercase;
        }

        .result-price {
          font-family: var(--font-ui);
          font-size: 1.85rem;
          color: var(--cj-gold-500);
          font-weight: 900;
        }

        .itinerary-preview-title {
          font-family: var(--font-ui);
          font-size: 1.05rem;
          color: #FFFFFF;
        }

        .ai-days-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 280px;
          overflow-y: auto;
        }

        .ai-day-card {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(19, 29, 51, 0.7);
        }

        .day-badge-col .day-number {
          background: rgba(255, 107, 0, 0.2);
          color: var(--cj-amber-500);
          font-family: var(--font-ui);
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
        }

        .day-info-col {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .day-name {
          font-family: var(--font-ui);
          font-size: 0.95rem;
          color: #FFFFFF;
        }

        .day-desc {
          font-size: 0.82rem;
          color: #94A3B8;
        }

        .day-meta-tags {
          display: flex;
          gap: 0.75rem;
          font-size: 0.75rem;
          color: #CBD5E1;
        }

        .ai-handoff-banner {
          padding: 1.25rem;
          background: rgba(37, 211, 102, 0.1);
          border: 1px solid rgba(37, 211, 102, 0.3);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .handoff-text {
          display: flex;
          flex-direction: column;
        }

        .ai-prompt-input-row {
          display: flex;
          gap: 0.65rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }

        .ai-input-wrap {
          flex: 1;
          min-width: 260px;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(139, 92, 246, 0.35);
          border-radius: var(--radius-md, 14px);
        }

        .ai-input-wrap input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #FFFFFF;
          font-size: 0.88rem;
          font-family: inherit;
        }

        .ai-input-wrap input::placeholder {
          color: #94A3B8;
        }

        .instant-gen-btn {
          padding: 0.75rem 1.15rem;
          font-size: 0.84rem;
          border-radius: var(--radius-md, 14px);
          white-space: nowrap;
        }

        .ai-divider-text {
          text-align: center;
          margin: 0.5rem 0;
          position: relative;
        }

        .ai-divider-text::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        .ai-divider-text span {
          position: relative;
          background: #001233;
          padding: 0 0.85rem;
          font-size: 0.72rem;
          font-weight: 800;
          color: #94A3B8;
          letter-spacing: 0.06em;
        }

        .ai-result-actions-hub {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }

        .ai-hub-btn {
          flex: 1;
          min-width: 180px;
          justify-content: center;
          padding: 0.75rem 1.15rem;
          border-radius: var(--radius-md, 14px);
          font-size: 0.88rem;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
        }

        .ai-close-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          color: #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .ai-step-title {
          font-family: var(--font-serif);
          font-size: 1.65rem;
          color: #FFFFFF;
          line-height: 1.25;
        }

        .handoff-text strong {
          color: #25D366;
          font-size: 0.92rem;
        }

        .handoff-text span {
          font-size: 0.8rem;
          color: #CBD5E1;
        }

        @media (max-width: 768px) {
          .modal-overlay {
            align-items: flex-end;
            padding: 0;
          }
          .ai-modal-content {
            border-radius: 20px 20px 0 0;
            max-height: 92vh;
            padding: 1.5rem 1.15rem;
          }
          .ai-step-title {
            font-size: 1.35rem;
          }
          .ai-landscapes-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.65rem;
          }
          .ai-landscape-btn {
            padding: 1rem 0.75rem;
          }
          .ai-step-actions {
            flex-direction: column-reverse;
            gap: 0.75rem;
          }
          .ai-step-actions button {
            width: 100%;
            justify-content: center;
            min-height: 48px;
            font-size: 0.98rem;
          }
          .ai-result-actions-hub {
            flex-direction: column;
          }
          .ai-hub-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
