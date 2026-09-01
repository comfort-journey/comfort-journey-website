import React, { useState } from 'react';
import { 
  X, Sparkles, Send, CheckCircle, Clock, MapPin, Hotel, Users, 
  ArrowRight, MessageCircle, Heart, ShieldCheck, Flame, Compass, 
  Landmark, Snowflake, Palmtree, Sun, Flower2, Building2, BedDouble, Star
} from 'lucide-react';
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
    { title: 'Romantic Honeymoon', desc: 'Candlelight dinners, private villas & sunset cruises', icon: Heart },
    { title: 'Family Wonder', desc: 'Child-friendly pacing, spacious SUVs & luxury resorts', icon: Users },
    { title: 'Thrill & Treks', desc: 'Snowmobiling, scuba, dune bashing & hiking', icon: Compass },
    { title: 'Ultra Luxury Palaces', desc: 'Royal heritage suites, private butlers & helicopters', icon: Sparkles },
    { title: 'Sacred Heritage', desc: 'Char Dham, Kedarnath VIP darshan & Ganga aarti', icon: Landmark }
  ];

  const landscapesList = [
    { title: 'Snow & Glaciers', sub: 'Kashmir, Swiss Alps, Iceland', icon: Snowflake },
    { title: 'Tropical Islands', sub: 'Bali, Maldives, Andaman', icon: Palmtree },
    { title: 'Desert Oasis', sub: 'Dubai, Abu Dhabi, Rajasthan', icon: Sun },
    { title: 'European Fairytale', sub: 'Italy, France, Switzerland', icon: Landmark },
    { title: 'African Safari', sub: 'Kenya Maasai Mara, Serengeti', icon: Compass },
    { title: 'Japanese Zen', sub: 'Kyoto, Tokyo, Mount Fuji', icon: Flower2 }
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
          (t.location && t.location.toLowerCase().includes(lowerPrompt)) ||
          (t.country && t.country.toLowerCase().includes(lowerPrompt)) ||
          (t.categories && t.categories.some(c => c.toLowerCase().includes(lowerPrompt))) ||
          (t.tags && t.tags.some(tg => tg.toLowerCase().includes(lowerPrompt))) ||
          (t.tagline && t.tagline.toLowerCase().includes(lowerPrompt))
        );
        if (found) matchedTour = found;
      } else {
        if (landscape === 'Tropical Islands') matchedTour = TOURS_DATA.find(t => t.name.toLowerCase().includes('bali') || t.name.toLowerCase().includes('phuket') || t.name.toLowerCase().includes('goa')) || TOURS_DATA[0];
        else if (landscape === 'European Fairytale') matchedTour = TOURS_DATA.find(t => t.name.toLowerCase().includes('europe') || t.location.toLowerCase().includes('rome') || t.continent === 'Europe') || TOURS_DATA[0];
        else if (landscape === 'Snow & Glaciers') matchedTour = TOURS_DATA.find(t => t.name.toLowerCase().includes('pines') || t.name.toLowerCase().includes('hills') || t.location.toLowerCase().includes('dharamshala')) || TOURS_DATA[0];
        else if (landscape === 'Desert Oasis') matchedTour = TOURS_DATA.find(t => t.name.toLowerCase().includes('dubai') || t.name.toLowerCase().includes('rajasthan')) || TOURS_DATA[0];
        else if (landscape === 'African Safari' || landscape === 'Japanese Zen') matchedTour = TOURS_DATA.find(t => t.name.toLowerCase().includes('cherry blossom') || t.name.toLowerCase().includes('sakura') || t.category === 'International Tours') || TOURS_DATA[0];
        else if (vibe === 'Sacred Heritage') matchedTour = TOURS_DATA.find(t => t.name.toLowerCase().includes('ganga') || t.name.toLowerCase().includes('heritage') || t.name.toLowerCase().includes('bhopal')) || TOURS_DATA[0];
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
              {vibesList.map((v) => {
                const Icon = v.icon;
                return (
                  <button
                    key={v.title}
                    type="button"
                    className={`ai-card-btn ${vibe === v.title ? 'active' : ''}`}
                    onClick={() => setVibe(v.title)}
                  >
                    <div className="vibe-svg-badge">
                      <Icon size={20} className="text-amber" />
                    </div>
                    <div className="vibe-text">
                      <strong>{v.title}</strong>
                      <span>{v.desc}</span>
                    </div>
                  </button>
                );
              })}
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
              {landscapesList.map((l) => {
                const Icon = l.icon;
                return (
                  <button
                    key={l.title}
                    type="button"
                    className={`ai-landscape-btn ${landscape === l.title ? 'active' : ''}`}
                    onClick={() => setLandscape(l.title)}
                  >
                    <div className="landscape-svg-badge">
                      <Icon size={22} className="text-cyan" />
                    </div>
                    <strong>{l.title}</strong>
                    <small>{l.sub}</small>
                  </button>
                );
              })}
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
            <p className="ai-step-desc">Help our algorithm tailor the exact day-by-day pacing.</p>

            <div className="ai-form-group">
              <label className="ai-label">How long do you want to travel?</label>
              <div className="ai-chips-group">
                {['3–4 Days (Quick Getaway)', '5–6 Days (Signature)', '7–9 Days (Grand Journey)', '10+ Days (Epic Odyssey)'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`ai-chip-btn ${durationGroup === d ? 'active' : ''}`}
                    onClick={() => setDurationGroup(d)}
                  >
                    <Clock size={14} />
                    <span>{d}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="ai-form-group">
              <label className="ai-label">Number of Travelers (Guests)</label>
              <div className="ai-guests-picker">
                <button 
                  type="button" 
                  className="guest-step-btn"
                  onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                >-</button>
                <div className="guest-display">
                  <Users size={18} className="text-amber" />
                  <strong>{guestsCount} {guestsCount === 1 ? 'Solo Traveler' : 'Travelers'}</strong>
                </div>
                <button 
                  type="button" 
                  className="guest-step-btn"
                  onClick={() => setGuestsCount(Math.min(20, guestsCount + 1))}
                >+</button>
              </div>
            </div>

            <div className="ai-step-actions between">
              <button className="btn-secondary" onClick={() => setStep(2)}>
                Back
              </button>
              <button className="btn-ai-glow" onClick={() => setStep(4)}>
                <span>Next: Luxury Hotel Tier</span>
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
                { title: '3-Star Boutique Comfort', desc: 'Cozy verified hotels, spotless rooms & complimentary breakfast', icon: BedDouble },
                { title: '4-Star Premium Deluxe Resort', desc: 'Scenic mountain/beach resorts, swimming pools & gourmet dining', icon: Hotel },
                { title: '5-Star Royal Palace / Pool Villa', desc: 'Overwater bungalows, private pool villas, 24/7 butler & royal luxury', icon: Sparkles }
              ].map((tier) => {
                const Icon = tier.icon;
                return (
                  <button
                    key={tier.title}
                    type="button"
                    className={`ai-card-btn ${hotelTier === tier.title ? 'active' : ''}`}
                    onClick={() => setHotelTier(tier.title)}
                  >
                    <div className="vibe-svg-badge">
                      <Icon size={20} className="text-amber" />
                    </div>
                    <div className="vibe-text">
                      <strong>{tier.title}</strong>
                      <span>{tier.desc}</span>
                    </div>
                  </button>
                );
              })}
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
              <div className="ai-loading-box 3d-concierge-loading">
                {/* 3D Map Unfolding & Route Tracer Artifact */}
                <div className="concierge-3d-map-card">
                  <div className="map-grid-mesh"></div>
                  <div className="compass-calculating-spinner">
                    <Compass size={38} className="text-amber-spinner" />
                    <div className="pulse-radar-ring"></div>
                  </div>
                  <svg className="map-tracer-svg" viewBox="0 0 200 80">
                    <path d="M 20,60 Q 100,10 180,40" fill="none" stroke="#FF892F" strokeWidth="2.5" strokeDasharray="6 4" className="ember-tracer-line" />
                    <circle cx="20" cy="60" r="4" fill="#DAF561" />
                    <circle cx="180" cy="40" r="5" fill="#6FE6FC" />
                  </svg>
                </div>

                <div className="concierge-status-block">
                  <span className="badge badge-amber"><Sparkles size={13} /> 3D AI Concierge Processing</span>
                  <h3 className="loading-headline">Synthesizing Your Bespoke Itinerary...</h3>
                  <p className="loading-subline">Calculating flight corridors, auditing 5-star boutique stays & locking private chauffeur availability for <strong>{landscape}</strong>.</p>
                </div>
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

        .vibe-svg-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }

        .ai-card-btn:hover .vibe-svg-badge {
          background: rgba(139, 92, 246, 0.2);
          border-color: #8B5CF6;
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
          gap: 0.5rem;
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

        .landscape-svg-badge {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(111, 230, 252, 0.1);
          border: 1px solid rgba(111, 230, 252, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
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

        /* 3D Concierge Loading Experience */
        .ai-loading-box.3d-concierge-loading {
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.25rem;
        }

        .concierge-3d-map-card {
          position: relative;
          width: 240px;
          height: 120px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(0, 29, 81, 0.85), rgba(0, 18, 51, 0.95));
          border: 1.5px solid rgba(255, 137, 47, 0.45);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 24px rgba(255, 137, 47, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 800px;
          transform: perspective(600px) rotateX(15deg);
          overflow: hidden;
        }

        .map-grid-mesh {
          position: absolute;
          inset: 0;
          background-size: 20px 20px;
          background-image: 
            linear-gradient(to right, rgba(111, 230, 252, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(111, 230, 252, 0.1) 1px, transparent 1px);
        }

        .compass-calculating-spinner {
          position: relative;
          z-index: 3;
          animation: spin 6s linear infinite;
        }

        .text-amber-spinner {
          color: #FF892F;
          filter: drop-shadow(0 0 10px #FF892F);
        }

        .pulse-radar-ring {
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          border: 1.5px solid rgba(218, 245, 97, 0.4);
          animation: pulse 1.8s infinite;
        }

        .map-tracer-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        .ember-tracer-line {
          animation: emberRouteFlow 2s ease-in-out infinite alternate;
        }

        .concierge-status-block {
          max-width: 480px;
        }

        .loading-headline {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: #F9FBE7;
          margin: 0.5rem 0 0.25rem 0;
        }

        .loading-subline {
          font-size: 0.84rem;
          color: #CBD5E1;
          line-height: 1.45;
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
