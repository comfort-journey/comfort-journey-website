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
      const lowerPrompt = customPrompt.toLowerCase().trim();
      let matchedTour = null;
      let isExactMatch = false;

      // 1. Semantic Destination Matching across all 89 real packages
      if (lowerPrompt) {
        // Direct title/country/city/state/location/tag matching
        const found = TOURS_DATA.find(t => {
          const name = (t.name || '').toLowerCase();
          const country = (t.country || '').toLowerCase();
          const location = (t.location || '').toLowerCase();
          const city = (t.city || '').toLowerCase();
          const state = (t.state || '').toLowerCase();
          const cats = (t.categories || []).map(c => c.toLowerCase());
          const tags = (t.tags || []).map(tg => tg.toLowerCase());

          return country.includes(lowerPrompt) ||
                 location.includes(lowerPrompt) ||
                 city.includes(lowerPrompt) ||
                 state.includes(lowerPrompt) ||
                 name.includes(lowerPrompt) ||
                 lowerPrompt.includes(country) ||
                 lowerPrompt.includes(city) ||
                 lowerPrompt.includes(state) ||
                 cats.some(c => lowerPrompt.includes(c) || c.includes(lowerPrompt)) ||
                 tags.some(tg => lowerPrompt.includes(tg) || tg.includes(lowerPrompt));
        });

        if (found) {
          matchedTour = found;
          isExactMatch = true;
        } else {
          // Specific international & domestic destination keywords
          if (lowerPrompt.includes('dubai') || lowerPrompt.includes('uae') || lowerPrompt.includes('abu dhabi') || lowerPrompt.includes('desert')) {
            matchedTour = TOURS_DATA.find(t => t.id.includes('dubai') || t.name.toLowerCase().includes('dubai'));
            isExactMatch = Boolean(matchedTour);
          } else if (lowerPrompt.includes('bali') || lowerPrompt.includes('indonesia')) {
            matchedTour = TOURS_DATA.find(t => t.id.includes('bali') || t.name.toLowerCase().includes('bali'));
            isExactMatch = Boolean(matchedTour);
          } else if (lowerPrompt.includes('phuket') || lowerPrompt.includes('thailand') || lowerPrompt.includes('krabi') || lowerPrompt.includes('bangkok') || lowerPrompt.includes('phi phi')) {
            matchedTour = TOURS_DATA.find(t => t.id.includes('phuket') || t.name.toLowerCase().includes('phuket') || t.name.toLowerCase().includes('asian'));
            isExactMatch = Boolean(matchedTour);
          } else if (lowerPrompt.includes('japan') || lowerPrompt.includes('tokyo') || lowerPrompt.includes('kyoto') || lowerPrompt.includes('sakura') || lowerPrompt.includes('cherry blossom')) {
            matchedTour = TOURS_DATA.find(t => t.id.includes('sakura') || t.name.toLowerCase().includes('cherry'));
            isExactMatch = Boolean(matchedTour);
          } else if (lowerPrompt.includes('europe') || lowerPrompt.includes('swiss') || lowerPrompt.includes('switzerland') || lowerPrompt.includes('italy') || lowerPrompt.includes('rome') || lowerPrompt.includes('zurich')) {
            matchedTour = TOURS_DATA.find(t => t.id.includes('europe') || t.name.toLowerCase().includes('essence of europe'));
            isExactMatch = Boolean(matchedTour);
          } else if (lowerPrompt.includes('singapore') || lowerPrompt.includes('malaysia') || lowerPrompt.includes('kuala lumpur')) {
            matchedTour = TOURS_DATA.find(t => t.id.includes('singapore') || t.name.toLowerCase().includes('singapore'));
            isExactMatch = Boolean(matchedTour);
          } else if (lowerPrompt.includes('vietnam') || lowerPrompt.includes('hanoi') || lowerPrompt.includes('da nang') || lowerPrompt.includes('ha long')) {
            matchedTour = TOURS_DATA.find(t => t.id.includes('vietnam') || t.name.toLowerCase().includes('vietnam'));
            isExactMatch = Boolean(matchedTour);
          } else if (lowerPrompt.includes('sri lanka') || lowerPrompt.includes('colombo') || lowerPrompt.includes('kandy')) {
            matchedTour = TOURS_DATA.find(t => t.id.includes('colombo') || t.name.toLowerCase().includes('colombo'));
            isExactMatch = Boolean(matchedTour);
          } else if (lowerPrompt.includes('kashmir') || lowerPrompt.includes('srinagar') || lowerPrompt.includes('gulmarg') || lowerPrompt.includes('pahalgam') || lowerPrompt.includes('sonmarg')) {
            matchedTour = TOURS_DATA.find(t => t.id.includes('kashmir') || t.name.toLowerCase().includes('kashmir'));
            isExactMatch = Boolean(matchedTour);
          } else if (lowerPrompt.includes('manali') || lowerPrompt.includes('shimla') || lowerPrompt.includes('himachal') || lowerPrompt.includes('dharamshala') || lowerPrompt.includes('dalhousie')) {
            matchedTour = TOURS_DATA.find(t => t.name.toLowerCase().includes('shimla') || t.id.includes('peace-in-the-pines'));
            isExactMatch = Boolean(matchedTour);
          } else if (lowerPrompt.includes('goa') || lowerPrompt.includes('beach') || lowerPrompt.includes('coastal')) {
            matchedTour = TOURS_DATA.find(t => t.id.includes('goa') || t.name.toLowerCase().includes('goa'));
            isExactMatch = Boolean(matchedTour);
          } else if (lowerPrompt.includes('rajasthan') || lowerPrompt.includes('jaipur') || lowerPrompt.includes('udaipur') || lowerPrompt.includes('jodhpur') || lowerPrompt.includes('jaisalmer')) {
            matchedTour = TOURS_DATA.find(t => t.name.toLowerCase().includes('rajasthan'));
            isExactMatch = Boolean(matchedTour);
          } else if (lowerPrompt.includes('kerala') || lowerPrompt.includes('munnar') || lowerPrompt.includes('alleppey') || lowerPrompt.includes('thekkady')) {
            matchedTour = TOURS_DATA.find(t => t.name.toLowerCase().includes('pachmarhi') || t.location?.toLowerCase().includes('kerala'));
            isExactMatch = Boolean(matchedTour);
          } else if (lowerPrompt.includes('uttarakhand') || lowerPrompt.includes('haridwar') || lowerPrompt.includes('mussoorie') || lowerPrompt.includes('rishikesh') || lowerPrompt.includes('kedarnath')) {
            matchedTour = TOURS_DATA.find(t => t.id.includes('ganga') || t.id.includes('uttarakhand'));
            isExactMatch = Boolean(matchedTour);
          } else if (lowerPrompt.includes('bhopal') || lowerPrompt.includes('ujjain') || lowerPrompt.includes('madhya pradesh') || lowerPrompt.includes('pachmarhi') || lowerPrompt.includes('orchha')) {
            matchedTour = TOURS_DATA.find(t => t.id.includes('royal-mp') || t.id.includes('narmada') || t.id.includes('bhopal'));
            isExactMatch = Boolean(matchedTour);
          } else if (lowerPrompt.includes('gujarat') || lowerPrompt.includes('dwarka') || lowerPrompt.includes('somnath')) {
            matchedTour = TOURS_DATA.find(t => t.id.includes('gujarat'));
            isExactMatch = Boolean(matchedTour);
          } else if (lowerPrompt.includes('karnataka') || lowerPrompt.includes('coorg') || lowerPrompt.includes('mysore')) {
            matchedTour = TOURS_DATA.find(t => t.id.includes('karnataka'));
            isExactMatch = Boolean(matchedTour);
          }
        }
      } else {
        // Step selection matching (Landscape & Vibe)
        if (landscape === 'Tropical Islands') {
          matchedTour = TOURS_DATA.find(t => t.id.includes('bali') || t.id.includes('phuket') || t.id.includes('goa'));
          isExactMatch = true;
        } else if (landscape === 'European Fairytale') {
          matchedTour = TOURS_DATA.find(t => t.id.includes('europe') || t.continent === 'Europe');
          isExactMatch = true;
        } else if (landscape === 'Desert Oasis') {
          matchedTour = TOURS_DATA.find(t => t.id.includes('dubai') || t.name.toLowerCase().includes('desert'));
          isExactMatch = true;
        } else if (landscape === 'Japanese Zen') {
          matchedTour = TOURS_DATA.find(t => t.id.includes('sakura'));
          isExactMatch = true;
        } else if (landscape === 'Snow & Glaciers') {
          matchedTour = TOURS_DATA.find(t => t.name.toLowerCase().includes('kashmir') || t.id.includes('peace-in-the-pines'));
          isExactMatch = true;
        } else if (vibe === 'Sacred Heritage') {
          matchedTour = TOURS_DATA.find(t => t.id.includes('ganga') || t.name.toLowerCase().includes('heritage'));
          isExactMatch = true;
        } else if (vibe === 'Romantic Honeymoon') {
          matchedTour = TOURS_DATA.find(t => t.id.includes('bali') || t.name.toLowerCase().includes('kashmir'));
          isExactMatch = true;
        }
      }

      // Relevant similar packages for suggestions
      const similarTours = TOURS_DATA.filter(t => 
        t.id.includes('dubai') || 
        t.id.includes('bali') || 
        t.id.includes('phuket') || 
        t.id.includes('europe') || 
        t.id.includes('sakura') ||
        t.id.includes('kashmir')
      ).slice(0, 3);

      if (!matchedTour) {
        // No exact pre-packaged tour exists -> generate bespoke custom plan and display similar options
        setGeneratedResult({
          isExactMatch: false,
          customDestination: customPrompt || landscape,
          matchedTour: null,
          similarTours,
          customDays: [
            { day: 1, title: `Day 1: VIP Arrival & Private Luxury Transfer in ${customPrompt || landscape}`, desc: `Chauffeur greeting at the airport with VIP luggage handling and transfer to 5-star property in ${customPrompt || landscape}. Evening welcome orientation dinner.`, stayTier: hotelTier, transport: 'Dedicated Private AC Chauffeur', meals: 'Welcome Dinner' },
            { day: 2, title: `Day 2: Guided Signature Sightseeing & Historic Highlights`, desc: `Private curated day tour covering iconic landmarks, cultural heritage, and panoramic viewpoints with personal English-speaking escort.`, stayTier: hotelTier, transport: 'Dedicated Private AC Chauffeur', meals: 'Breakfast & Dinner' },
            { day: 3, title: `Day 3: Scenic Excursions & Experiential Indulgence`, desc: `Bespoke day trip into scenic outskirts, experiential fine-dining lunch, and private evening sunset cruise or viewpoint lounge.`, stayTier: hotelTier, transport: 'Dedicated Private AC Chauffeur', meals: 'Breakfast & Dinner' },
            { day: 4, title: `Day 4: Leisure, Curated Shopping & Chauffeur Departure`, desc: `Morning breakfast, souvenir shopping in verified artisanal districts, and timely airport chauffeur transfer for return flight.`, stayTier: 'Check-out', transport: 'Dedicated Private AC Chauffeur', meals: 'Breakfast' }
          ],
          estimatedCost: hotelTier.includes('5-Star') ? 48999 : 28999,
          summary: `No exact pre-packaged tour is currently listed for "${customPrompt || landscape}". Comfort Journey handcrafts 100% tailor-made VIP private tours to ${customPrompt || landscape} since 1992!`
        });
      } else {
        setGeneratedResult({
          isExactMatch: true,
          customDestination: matchedTour.name,
          matchedTour,
          similarTours: TOURS_DATA.filter(t => t.id !== matchedTour.id && (t.continent === matchedTour.continent || t.category === matchedTour.category)).slice(0, 3),
          customDays: (matchedTour.itinerary && matchedTour.itinerary.length > 0) ? matchedTour.itinerary.slice(0, 5).map(d => ({
            day: d.day,
            title: d.title,
            desc: d.desc || `Scenic exploration and private VIP transfers in ${matchedTour.location}.`,
            stayTier: d.stayTier || hotelTier,
            transport: d.transport || 'Dedicated Private AC Cab & Chauffeur',
            meals: d.meals || 'Daily Breakfast & Dinner'
          })) : [
            { day: 1, title: `Day 1: Arrival & Check-In in ${matchedTour.location}`, desc: `Private airport transfer and welcome to verified 4★/5★ luxury stay.`, stayTier: hotelTier, transport: 'Private Cab', meals: 'Dinner' },
            { day: 2, title: `Day 2: Full Day Signature Sightseeing`, desc: `Guided tour of top attractions and cultural highlights.`, stayTier: hotelTier, transport: 'Private Cab', meals: 'Breakfast & Dinner' }
          ],
          estimatedCost: matchedTour.price,
          summary: customPrompt 
            ? `Exact verified match found: "${matchedTour.name}" (${matchedTour.duration}) featuring 5-star properties, private transfers & 24/7 VIP concierge.`
            : `Tailor-made ${durationGroup} VIP itinerary combining ${vibe} with ${landscape} scenery: ${matchedTour.name}.`
        });
      }

      setIsGenerating(false);
    }, 1000);
  };

  const handleWhatsAppBooking = () => {
    if (!generatedResult) return;
    const destName = generatedResult.isExactMatch && generatedResult.matchedTour 
      ? generatedResult.matchedTour.name 
      : (generatedResult.customDestination || customPrompt || `${vibe} in ${landscape}`);

    const msg = encodeURIComponent(`Hi Comfort Journey! I planned a trip on your AI Dream Planner:
✨ Destination / Request: ${destName}
⏱️ Duration: ${durationGroup}
👥 Travelers: ${guestsCount} Person(s)
🏨 Hotel Tier: ${hotelTier}
💰 Estimated Budget: ${formatPrice(generatedResult.estimatedCost)} / person
${generatedResult.isExactMatch && generatedResult.matchedTour ? `🎯 Matched Tour Package: ${generatedResult.matchedTour.name} (₹${generatedResult.matchedTour.price})` : '📝 Custom Tailor-Made Request'}

Please connect me with a Senior Trip Designer to finalize our custom itinerary!`);

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
                {/* Result Top Card */}
                <div className="result-top-card glass-panel">
                  <div className="result-meta">
                    {generatedResult.isExactMatch && generatedResult.matchedTour ? (
                      <span className="badge badge-emerald">✅ Exact Verified Match Found</span>
                    ) : (
                      <span className="badge badge-amber">✨ Bespoke AI Custom Blueprint</span>
                    )}
                    <h3 className="result-title">
                      {generatedResult.isExactMatch && generatedResult.matchedTour 
                        ? generatedResult.matchedTour.name 
                        : `Bespoke VIP Experience: ${generatedResult.customDestination}`}
                    </h3>
                    <p className="result-summary">{generatedResult.summary}</p>
                  </div>

                  <div className="result-price-strip">
                    <span className="price-lead">Estimated Price Per Person:</span>
                    <strong className="result-price">{formatPrice(generatedResult.estimatedCost)}</strong>
                  </div>
                </div>

                {/* Notice when no exact off-the-shelf package exists */}
                {!generatedResult.isExactMatch && (
                  <div className="ai-no-match-notice glass-card">
                    <Sparkles size={18} className="text-amber flex-shrink-0 mt-1" />
                    <div>
                      <strong style={{ color: '#FF892F', display: 'block', fontSize: '0.94rem' }}>
                        No off-the-shelf package listed for "{generatedResult.customDestination}"
                      </strong>
                      <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                        Comfort Journey specializes in 100% tailor-made private VIP holidays worldwide. Below is your AI blueprint, along with similar popular packages from our catalog.
                      </span>
                    </div>
                  </div>
                )}

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
                          {d.desc || (d.morning ? `${d.morning} • ${d.evening}` : 'Scenic exploration & private VIP transfers.')}
                        </p>
                        <div className="day-meta-tags">
                          <span>🏨 {d.stayTier}</span>
                          <span>🚗 {d.transport}</span>
                          {d.meals && <span>🍽️ {d.meals}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Similar Packages Strip */}
                {generatedResult.similarTours && generatedResult.similarTours.length > 0 && (
                  <div className="ai-similar-block">
                    <h4 className="similar-headline">
                      {generatedResult.isExactMatch ? 'Other Recommended Packages:' : 'Similar Signature Packages You Might Love:'}
                    </h4>
                    <div className="ai-similar-grid">
                      {generatedResult.similarTours.map((simTour) => (
                        <div 
                          key={simTour.id} 
                          className="ai-similar-card glass-card"
                          onClick={() => onSelectTour && onSelectTour(simTour)}
                        >
                          <img src={simTour.image} alt={simTour.name} className="sim-img" />
                          <div className="sim-content">
                            <strong className="sim-title">{simTour.name}</strong>
                            <span className="sim-sub">{simTour.location || simTour.country} • {simTour.duration}</span>
                            <span className="sim-price">{formatPrice(simTour.price)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Direct Action Hub */}
                <div className="ai-result-actions-hub">
                  <button 
                    type="button" 
                    className="btn-whatsapp ai-hub-btn" 
                    onClick={handleWhatsAppBooking}
                  >
                    <MessageCircle size={18} />
                    <span>
                      {generatedResult.isExactMatch ? 'Lock Itinerary via WhatsApp' : `Request Custom ${generatedResult.customDestination} Quote`}
                    </span>
                  </button>

                  {generatedResult.isExactMatch && generatedResult.matchedTour && onSelectTour && (
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

        .ai-no-match-notice {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          padding: 1rem 1.25rem;
          background: rgba(255, 137, 47, 0.08);
          border: 1px solid rgba(255, 137, 47, 0.25);
          border-radius: var(--radius-md, 14px);
        }

        .ai-similar-block {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .similar-headline {
          font-size: 0.92rem;
          font-weight: 800;
          color: #E2E8F0;
          letter-spacing: 0.02em;
        }

        .ai-similar-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 0.75rem;
        }

        .ai-similar-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem;
          border-radius: var(--radius-md, 12px);
          cursor: pointer;
          transition: transform 0.2s ease, border-color 0.2s ease;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .ai-similar-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 137, 47, 0.4);
        }

        .sim-img {
          width: 58px;
          height: 58px;
          border-radius: 8px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .sim-content {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          overflow: hidden;
        }

        .sim-title {
          font-size: 0.82rem;
          font-weight: 800;
          color: #FFFFFF;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sim-sub {
          font-size: 0.72rem;
          color: #94A3B8;
        }

        .sim-price {
          font-size: 0.82rem;
          font-weight: 900;
          color: #FF892F;
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
