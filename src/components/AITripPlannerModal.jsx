import React, { useState } from 'react';
import { X, Sparkles, Wand2, Compass, CheckCircle2, MessageCircle, Calendar, Users, DollarSign, ArrowRight, RefreshCw } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function AITripPlannerModal({ onClose, onBookCustomTrip }) {
  const { formatPrice, currency } = useCurrency();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  // Form states
  const [vibe, setVibe] = useState('Honeymoon');
  const [destinationType, setDestinationType] = useState('Snow & Mountains');
  const [duration, setDuration] = useState('5 Nights / 6 Days');
  const [travelers, setTravelers] = useState('2 Persons (Couple)');
  const [budgetTier, setBudgetTier] = useState('Luxury Premium');
  const [customNotes, setCustomNotes] = useState('');

  const vibes = [
    { id: 'Honeymoon', label: '💑 Honeymoon & Romance', desc: 'Candlelight dinners, private villas & scenic views' },
    { id: 'Family', label: '👨‍👩‍👧‍👦 Family & Kids Holiday', desc: 'Comfortable pace, theme parks & private transport' },
    { id: 'Adventure', label: '🧗 Thrill & Adventure', desc: 'Scuba diving, skiing, hiking & desert safaris' },
    { id: 'Luxury', label: '👑 Ultra Luxury & Palace', desc: '5-star resorts, VIP access & private yacht/heli' },
    { id: 'Spiritual', label: '🕉️ Sacred & Peaceful', desc: 'Temple darshans, yoga retreats & cultural heritage' }
  ];

  const destinationTypes = [
    { id: 'Snow & Mountains', label: '🏔️ Snow Peaks & Alpine Valleys', examples: 'Kashmir, Swiss Alps, Himachal' },
    { id: 'Tropical Beaches', label: '🏝️ Tropical Islands & Overwater Villas', examples: 'Bali, Andaman, Maldives' },
    { id: 'Futuristic City', label: '🏙️ Futuristic Glamour & Desert Safaris', examples: 'Dubai, Singapore' },
    { id: 'Backwaters & Nature', label: '🌿 Misty Tea Hills & Houseboats', examples: 'Kerala, Meghalaya, Vietnam' }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Create bespoke AI plan based on selections
      let basePrice = 24999;
      let matchedDest = "Kashmir & Gulmarg Snow Peaks";
      let days = [
        { day: 1, title: "VIP Airport Arrival & Royal Houseboat Check-in", desc: "Private luxury cab pickup, flower bouquet welcome, and golden hour Shikara ride on Dal Lake." },
        { day: 2, title: "Scenic Cable Car & Mountain Vista Excursion", desc: "VIP Phase 1 & 2 Gondola tickets to snow-capped peaks, scenic photo spots, and authentic Kashmiri Wazwan lunch." },
        { day: 3, title: "Heritage Gardens & Old Town Exploration", desc: "Guided heritage walk through Mughal terraced gardens, artisanal pashmina boutiques, and sunset viewpoint." },
        { day: 4, title: "Pine Valley & Riverside Retreat", desc: "Scenic drive through pine forests, river rafting excursion, and private candlelight dinner in luxury resort." },
        { day: 5, title: "Alpine Meadow Adventure (Mini Switzerland)", desc: "Pony trek to lush evergreen meadows, local handicraft shopping, and campfire night." },
        { day: 6, title: "Farewell with Personalized Souvenir Gift", desc: "Leisurely buffet breakfast, airport transfer with 24/7 coordinator assistance." }
      ];

      if (destinationType === 'Tropical Beaches') {
        basePrice = 36999;
        matchedDest = "Exotic Bali & Nusa Penida Island";
        days = [
          { day: 1, title: "Denpasar Arrival & Private Pool Villa Check-in", desc: "Flower garland reception, private chauffeur to Seminyak luxury pool villa, sunset cocktails at beachfront club." },
          { day: 2, title: "Watersports Thrills & Uluwatu Cliff Temple", desc: "Parasailing & banana boat ride at Tanjung Benoa, followed by clifftop Kecak fire dance at golden hour." },
          { day: 3, title: "Nusa Penida VIP Speedboat Day Trip", desc: "Marvel at Kelingking T-Rex cliff, Angel's Billabong natural infinity pool, and crystal bay coral snorkeling." },
          { day: 4, title: "Ubud Rainforest, Rice Terraces & Famous Swing", desc: "Iconic Bali jungle swing overlooking emerald rice terraces, coffee plantation tasting, and Monkey Forest." },
          { day: 5, title: "Volcano Breakfast & Sacred Water Springs", desc: "Sunrise view over Mount Batur volcano, holy spring purification bath at Tirta Empul, and artisan craft market." },
          { day: 6, title: "Balinese Luxury Spa & Airport Drop", desc: "2-hour aromatherapy spa treatment before private transfer to airport." }
        ];
      } else if (destinationType === 'Futuristic City') {
        basePrice = 45999;
        matchedDest = "Dubai Skyline & Red Dunes Extravaganza";
        days = [
          { day: 1, title: "Dubai Arrival & Luxury Marina Dinner Cruise", desc: "Chauffeur transfer to 4-star deluxe city hotel, evening 2-hour illuminated skyscraper yacht dinner cruise." },
          { day: 2, title: "Burj Khalifa 124th Floor & Dubai Mall Fountains", desc: "Stand on top of the world at Burj Khalifa observation deck, underwater aquarium, and evening fountain show." },
          { day: 3, title: "4x4 VIP Red Dunes Safari & Bedouin BBQ Night", desc: "High-adrenaline dune bashing, sandboarding, camel rides, live Tanoura fire dance, and gourmet BBQ buffet." },
          { day: 4, title: "Abu Dhabi Sheikh Zayed Grand Mosque Excursion", desc: "Tour the breathtaking white marble Grand Mosque and photo stop at Ferrari World." },
          { day: 5, title: "Miracle Garden & Gold Souk Shopping", desc: "Stroll through millions of blooming flowers and traditional gold & spice souks." },
          { day: 6, title: "Departure", desc: "Private airport transfer." }
        ];
      }

      if (budgetTier === 'Ultra Luxury & 5-Star') {
        basePrice = Math.round(basePrice * 1.6);
      }

      setGeneratedPlan({
        destination: matchedDest,
        vibe,
        duration,
        estimatedPricePerPerson: basePrice,
        inclusions: [
          "Pre-verified 4/5-Star Stays",
          "Private AC Vehicle with English/Hindi Chauffeur",
          "Daily Gourmet Buffet Breakfast & Dinners",
          "VIP Sightseeing Passes & Fast-Track Tickets",
          "24/7 Dedicated On-Trip WhatsApp Concierge"
        ],
        days
      });
      setIsGenerating(false);
      setStep(3);
    }, 1400);
  };

  const handleWhatsAppBooking = () => {
    if (!generatedPlan) return;
    const msg = encodeURIComponent(
      `Hi Comfort Journey! ✨ I just generated a custom AI Itinerary on your website:\n` +
      `• *Destination:* ${generatedPlan.destination}\n` +
      `• *Vibe:* ${vibe}\n` +
      `• *Duration:* ${duration}\n` +
      `• *Travelers:* ${travelers}\n` +
      `• *Budget Style:* ${budgetTier}\n` +
      `• *Est. Price:* ${formatPrice(generatedPlan.estimatedPricePerPerson)} / person\n\n` +
      `Can you please review this and share the finalized quote & booking process?`
    );
    window.open(`https://wa.me/918770403315?text=${msg}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content ai-modal-body" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ai-modal-header">
          <div className="header-badge-title">
            <span className="badge badge-ai">
              <Sparkles size={14} />
              AI Travel Designer
            </span>
            <h2 className="ai-modal-title">Craft Your Custom Dream Trip</h2>
            <p className="ai-modal-sub">
              Tell our AI your travel dream, and get an instant custom day-by-day itinerary & price quote in seconds.
            </p>
          </div>
          <button className="ai-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Step Progression Bar */}
        <div className="ai-progress-bar">
          <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>1. Travel Vibe</div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>2. Preferences</div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>3. AI Itinerary</div>
        </div>

        {/* STEP 1: Vibe & Destination Type */}
        {step === 1 && (
          <div className="step-container">
            <h4 className="section-prompt">1. What type of vacation vibe are you craving?</h4>
            <div className="vibe-grid">
              {vibes.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  className={`vibe-card ${vibe === v.id ? 'selected' : ''}`}
                  onClick={() => setVibe(v.id)}
                >
                  <span className="vibe-label">{v.label}</span>
                  <span className="vibe-desc">{v.desc}</span>
                </button>
              ))}
            </div>

            <h4 className="section-prompt" style={{ marginTop: '1.75rem' }}>2. What landscape style inspires you?</h4>
            <div className="dest-grid">
              {destinationTypes.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className={`dest-card ${destinationType === d.id ? 'selected' : ''}`}
                  onClick={() => setDestinationType(d.id)}
                >
                  <span className="dest-title">{d.label}</span>
                  <span className="dest-examples">e.g. {d.examples}</span>
                </button>
              ))}
            </div>

            <div className="step-actions">
              <button className="btn-primary next-btn" onClick={() => setStep(2)}>
                <span>Next: Trip Details</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Duration, Travelers & Budget */}
        {step === 2 && (
          <div className="step-container">
            <h4 className="section-prompt">3. Select Trip Duration & Travelers</h4>
            <div className="form-grid-2">
              <div className="field-block">
                <label><Calendar size={16} /> Trip Duration</label>
                <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                  <option value="3 Nights / 4 Days">3 Nights / 4 Days (Quick Getaway)</option>
                  <option value="5 Nights / 6 Days">5 Nights / 6 Days (Most Popular)</option>
                  <option value="7 Nights / 8 Days">7 Nights / 8 Days (Full Experience)</option>
                  <option value="10+ Days">10+ Days (Grand Tour)</option>
                </select>
              </div>

              <div className="field-block">
                <label><Users size={16} /> Who is Traveling?</label>
                <select value={travelers} onChange={(e) => setTravelers(e.target.value)}>
                  <option value="2 Persons (Couple)">2 Persons (Couple / Honeymoon)</option>
                  <option value="3-5 Persons (Family)">3 - 5 Persons (Family)</option>
                  <option value="4-8 Persons (Friends)">4 - 8 Persons (Friends Group)</option>
                  <option value="Solo Traveler">Solo Traveler</option>
                  <option value="10+ Persons (Corporate/Group)">10+ Persons (Large Group)</option>
                </select>
              </div>
            </div>

            <h4 className="section-prompt" style={{ marginTop: '1.5rem' }}>4. Hotel & Experience Style</h4>
            <div className="tier-grid">
              {[
                { id: 'Comfort 3-Star', label: '⭐ 3-Star Comfort', desc: 'Clean boutique hotels, breakfast & private cab' },
                { id: 'Luxury Premium', label: '⭐⭐⭐⭐ 4-Star Premium', desc: 'Top-rated resorts, prime locations & buffet meals' },
                { id: 'Ultra Luxury & 5-Star', label: '⭐⭐⭐⭐⭐ 5-Star Royal Luxury', desc: 'Palaces, private villas & VIP concierge access' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`tier-card ${budgetTier === t.id ? 'selected' : ''}`}
                  onClick={() => setBudgetTier(t.id)}
                >
                  <span className="tier-label">{t.label}</span>
                  <span className="tier-desc">{t.desc}</span>
                </button>
              ))}
            </div>

            <div className="step-actions dual">
              <button className="btn-secondary" onClick={() => setStep(1)}>Back</button>
              <button 
                className="btn-ai-glow generate-btn" 
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>AI Designing Your Perfect Trip...</span>
                  </>
                ) : (
                  <>
                    <Wand2 size={18} />
                    <span>✨ Generate Dream Itinerary</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Generated AI Result */}
        {step === 3 && generatedPlan && (
          <div className="step-container result-container">
            <div className="ai-plan-banner">
              <div className="banner-left">
                <span className="badge badge-ai">✨ AI Custom Matched Package</span>
                <h3 className="plan-dest-title">{generatedPlan.destination}</h3>
                <p className="plan-meta">{generatedPlan.duration} • {travelers} • {budgetTier}</p>
              </div>
              <div className="banner-price">
                <span className="p-lbl">Estimated Starting Price</span>
                <span className="p-val">{formatPrice(generatedPlan.estimatedPricePerPerson)} <small>/ person</small></span>
                <span className="p-note">Includes Hotels, Cabs, Sightseeing & 24/7 Support</span>
              </div>
            </div>

            {/* Inclusions */}
            <div className="ai-inclusions-row">
              {generatedPlan.inclusions.map((inc, i) => (
                <span key={i} className="inc-pill">
                  <CheckCircle2 size={14} className="text-accent" />
                  {inc}
                </span>
              ))}
            </div>

            {/* Day by Day Plan */}
            <h4 className="plan-timeline-title">Day-Wise AI Tailored Itinerary:</h4>
            <div className="ai-timeline-list">
              {generatedPlan.days.map((d) => (
                <div key={d.day} className="ai-day-card">
                  <div className="ai-day-num">Day {d.day}</div>
                  <div className="ai-day-info">
                    <h5 className="ai-day-heading">{d.title}</h5>
                    <p className="ai-day-desc">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="result-actions">
              <button className="btn-secondary" onClick={() => setStep(1)}>
                <RefreshCw size={16} />
                Customize Again
              </button>
              <button className="btn-whatsapp action-book" onClick={handleWhatsAppBooking}>
                <MessageCircle size={20} />
                Get This Custom Quote on WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .ai-modal-body {
          padding: 2.25rem;
          max-width: 850px;
        }

        .ai-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .ai-modal-title {
          font-size: 1.6rem;
          color: var(--color-secondary);
          margin: 0.5rem 0 0.25rem 0;
        }

        .ai-modal-sub {
          color: var(--color-text-muted);
          font-size: 0.95rem;
        }

        .ai-close-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #F1F5F9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-muted);
          transition: all 0.2s ease;
        }

        .ai-close-btn:hover {
          background: #E2E8F0;
          color: var(--color-text-main);
        }

        .ai-progress-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #F8FAFC;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-full);
          margin-bottom: 2rem;
          border: 1px solid var(--color-border);
        }

        .step-dot {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-text-subtle);
        }

        .step-dot.active {
          color: #8B5CF6;
        }

        .step-line {
          flex: 1;
          height: 2px;
          background: #E2E8F0;
          margin: 0 1rem;
        }

        .section-prompt {
          font-size: 1.1rem;
          color: var(--color-secondary);
          margin-bottom: 0.85rem;
        }

        .vibe-grid, .dest-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 0.85rem;
        }

        .vibe-card, .dest-card, .tier-card {
          text-align: left;
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          background: #FFFFFF;
          border: 1.5px solid var(--color-border);
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          cursor: pointer;
        }

        .vibe-card:hover, .dest-card:hover, .tier-card:hover {
          border-color: #8B5CF6;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(139, 92, 246, 0.12);
        }

        .vibe-card.selected, .dest-card.selected, .tier-card.selected {
          border-color: #8B5CF6;
          background: #FAF5FF;
          box-shadow: 0 0 0 2px #8B5CF6;
        }

        .vibe-label, .dest-title, .tier-label {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.98rem;
          color: var(--color-secondary);
        }

        .vibe-desc, .dest-examples, .tier-desc {
          font-size: 0.82rem;
          color: var(--color-text-muted);
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .field-block {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .field-block label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-secondary);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .field-block select {
          padding: 0.85rem 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 600;
          outline: none;
          background: #FFFFFF;
        }

        .tier-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 0.85rem;
        }

        .step-actions {
          margin-top: 2rem;
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
        }

        .step-actions.dual {
          justify-content: space-between;
        }

        .next-btn, .generate-btn {
          padding: 0.9rem 2rem;
        }

        /* Result View */
        .ai-plan-banner {
          background: linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          color: #FFFFFF;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .plan-dest-title {
          font-size: 1.45rem;
          color: #FFFFFF;
          margin: 0.4rem 0 0.2rem 0;
        }

        .plan-meta {
          color: #C7D2FE;
          font-size: 0.88rem;
        }

        .banner-price {
          text-align: right;
          border-left: 1px solid rgba(255, 255, 255, 0.15);
          padding-left: 1.5rem;
          flex-shrink: 0;
        }

        .banner-price .p-lbl {
          font-size: 0.72rem;
          color: #94A3B8;
          text-transform: uppercase;
          display: block;
        }

        .banner-price .p-val {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.6rem;
          color: #FFB800;
        }

        .banner-price small {
          font-size: 0.8rem;
          color: #CBD5E1;
        }

        .banner-price .p-note {
          font-size: 0.72rem;
          color: #94A3B8;
          display: block;
        }

        .ai-inclusions-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }

        .inc-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #F8FAFC;
          border: 1px solid var(--color-border);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-secondary);
        }

        .plan-timeline-title {
          font-size: 1.15rem;
          color: var(--color-secondary);
          margin-bottom: 1rem;
        }

        .ai-timeline-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          max-height: 280px;
          overflow-y: auto;
          padding-right: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .ai-day-card {
          display: flex;
          gap: 1rem;
          padding: 0.85rem 1rem;
          background: #FFFFFF;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
        }

        .ai-day-num {
          background: #8B5CF6;
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.82rem;
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-xs);
          height: fit-content;
          white-space: nowrap;
        }

        .ai-day-heading {
          font-size: 0.95rem;
          color: var(--color-secondary);
          margin-bottom: 0.2rem;
        }

        .ai-day-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }

        .result-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--color-border);
        }

        .action-book {
          flex: 1;
          justify-content: center;
          padding: 1rem;
          font-size: 1rem;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .ai-modal-body {
            padding: 1.5rem;
          }
          .ai-plan-banner {
            flex-direction: column;
            align-items: flex-start;
          }
          .banner-price {
            border-left: none;
            border-top: 1px solid rgba(255, 255, 255, 0.15);
            padding-left: 0;
            padding-top: 1rem;
            width: 100%;
            text-align: left;
          }
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
          .result-actions {
            flex-direction: column;
          }
          .result-actions button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
