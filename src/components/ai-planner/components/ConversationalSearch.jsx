import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight, Compass, ShieldCheck, Heart } from 'lucide-react';
import './styles/ConversationalSearch.css';

// Contextual dynamic suggestions mapped by destination
const DESTINATION_SUGGESTIONS = {
  switzerland: [
    { icon: '🏔️', label: 'Matterhorn & Zermatt', detail: '6 Days · Zermatt Glacier Paradise, alpine hiking & cozy chalet' },
    { icon: '🚂', label: 'Glacier Express', detail: '7 Days · Panoramic Swiss train route, St. Moritz & mountain passes' },
    { icon: '🍫', label: 'Lucerne & Pilatus', detail: '5 Days · Lake Lucerne private boat cruise, Mount Pilatus & chocolate tasting' },
    { icon: '🇫🇷', label: 'Swiss & Chamonix', detail: '8 Days · Swiss Alps plus French Mont-Blanc extension' },
    { icon: '🏰', label: 'Jungfraujoch Peak', detail: '6 Days · Interlaken, Top of Europe high altitude train & waterfalls' }
  ],
  dubai: [
    { icon: '🕌', label: 'Abu Dhabi Grand Mosque', detail: '5 Days · Dubai plus full-day Abu Dhabi Louvre & palace tour' },
    { icon: '🏜️', label: 'Overnight Desert Safari', detail: '4 Days · 5★ Bedouin luxury camp, dune bashing & stargazing' },
    { icon: '🛥️', label: 'Marina Private Yacht', detail: '5 Days · Dubai Marina yacht cruise, Atlantis Palm & Burj Khalifa' },
    { icon: '🇴🇲', label: 'Oman Coast Extension', detail: '7 Days · Dubai city luxury plus scenic Musandam fjord cruise' }
  ],
  kashmir: [
    { icon: '❄️', label: 'Gulmarg Gondola Phase 2', detail: '6 Days · Gulmarg snow meadows, priority cable car & luxury resort' },
    { icon: '🌲', label: 'Pahalgam Betaab Valley', detail: '7 Days · Pine forest valley walks, Lidder river & Aru Valley' },
    { icon: '🛶', label: 'Dal Lake Houseboat', detail: '5 Days · Heated cedarwood houseboat stay & sunrise floating market' },
    { icon: '🏔️', label: 'Sonmarg Golden Meadow', detail: '6 Days · Thajiwas Glacier pony ride & scenic Sindh river drive' }
  ],
  bali: [
    { icon: '🌊', label: 'Nusa Penida Island', detail: '6 Days · Speedboat day trip to Kelingking T-Rex cliff & Angel Billabong' },
    { icon: '🌿', label: 'Ubud Jungle Sanctuary', detail: '5 Days · Sacred Monkey Forest, Tegalalang rice terraces & art market' },
    { icon: '🌋', label: 'Mount Batur Sunrise', detail: '6 Days · 4WD sunrise jeep tour, volcanic hot springs & coffee plantation' },
    { icon: '🕯️', label: 'Jimbaran Sunset Dinner', detail: '5 Days · Candlelight beach dinner with dedicated vegetarian options' }
  ],
  kerala: [
    { icon: '🚢', label: 'Alleppey Houseboat Cruise', detail: '5 Days · Overnight private AC houseboat through tranquil palm canals' },
    { icon: '🍃', label: 'Munnar Tea Plantations', detail: '6 Days · Misty tea garden trails, Eravikulam mountain goats & spice gardens' },
    { icon: '🐘', label: 'Thekkady Wildlife', detail: '6 Days · Periyar National Park boat safari & organic spice plantation walk' },
    { icon: '🌊', label: 'Kovalam & Varkala Cliffs', detail: '7 Days · Arabian sea sunset cliffs, Ayurvedic wellness & lighthouse beach' }
  ]
};

const DEFAULT_POPULAR_CURATIONS = [
  { icon: '🏔️', label: 'Kashmir for Parents', detail: '7 Days in Kashmir for parents: relaxed pacing, pure veg meals & private Innova Hycross' },
  { icon: '🌴', label: 'Bali Honeymoon', detail: '5 Days Bali honeymoon with private pool villa, scenic cliff temple & candlelight dinner' },
  { icon: '🏙️', label: 'Dubai Family Special', detail: '4 Days Dubai family vacation: desert safari, Burj Khalifa & child-friendly activities' },
  { icon: '🇨🇭', label: 'Swiss Scenic Rails', detail: '6 Days Switzerland scenic train holiday with cozy mountain chalets & alpine lakes' },
  { icon: '🌿', label: 'Kerala Backwaters', detail: '6 Days Kerala holiday: heated houseboat cruise, Munnar tea hills & spice walk' },
  { icon: '🌸', label: 'Japan Bullet Train', detail: '7 Days Japan Golden Route: Tokyo, Kyoto, Mt. Fuji & high-speed Shinkansen' },
  { icon: '🏰', label: 'Rajasthan Heritage', detail: '6 Days Rajasthan royal tour: Jaipur Amber Fort, Udaipur lake palace & private driver' },
  { icon: '🥗', label: 'Pure Veg & Jain Tour', detail: '100% vegetarian & Jain friendly tour with kitchen menu confirmation' }
];

export default function ConversationalSearch({
  onSubmit,
  isGenerating,
  hasActiveTrip = false,
  currentDestination = ''
}) {
  const [query, setQuery] = useState('');

  // Dynamically resolve suggestions based on active trip destination
  const destLower = (currentDestination || '').toLowerCase();
  let activeSuggestions = DEFAULT_POPULAR_CURATIONS;

  if (destLower.includes('swiss') || destLower.includes('switz')) {
    activeSuggestions = DESTINATION_SUGGESTIONS.switzerland;
  } else if (destLower.includes('dubai') || destLower.includes('uae')) {
    activeSuggestions = DESTINATION_SUGGESTIONS.dubai;
  } else if (destLower.includes('kashmir') || destLower.includes('srinagar')) {
    activeSuggestions = DESTINATION_SUGGESTIONS.kashmir;
  } else if (destLower.includes('bali')) {
    activeSuggestions = DESTINATION_SUGGESTIONS.bali;
  } else if (destLower.includes('kerala') || destLower.includes('munnar')) {
    activeSuggestions = DESTINATION_SUGGESTIONS.kerala;
  }

  const isContextual = activeSuggestions !== DEFAULT_POPULAR_CURATIONS;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isGenerating) {
      onSubmit(query.trim());
    }
  };

  const handlePromptSelect = (detail) => {
    setQuery(detail);
    onSubmit(detail);
  };

  return (
    <section className="conversational-hero-studio" aria-label="AI Vacation Planning Studio">
      <div className="hero-studio-header">
        <div className="hero-eyebrow">
          <Sparkles size={13} className="text-amber" />
          <span>TRUSTED SINCE 1992 · ENHANCED BY COMFY AI</span>
        </div>
        <h2 className="hero-studio-title">
          Where is your next <span className="text-amber">Comfort Journey</span>?
        </h2>
        <p className="hero-studio-subtitle">
          Describe your dream trip in simple words. Comfy plans verified boutique stays, private AC cars with courteous drivers, and pure veg/Jain dining.
        </p>
      </div>

      <div className="hero-search-card">
        <form onSubmit={handleSubmit} className="hero-search-form">
          <div className="hero-input-container">
            <span className="hero-search-icon" aria-hidden="true">
              <Compass size={20} className="text-amber" />
            </span>
            <input
              type="text"
              className="hero-main-input"
              placeholder={hasActiveTrip 
                ? 'Ask Comfy to tweak: e.g. "Add 2 days in Gulmarg with luxury resort" or "plan 5 days in Switzerland"'
                : 'e.g. "plan 5 day switzerland trip from india with private car and pure veg food"'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isGenerating}
              aria-label="Describe your travel vision"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="submit"
              className="hero-submit-cta"
              disabled={!query.trim() || isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="spinner" size={16} />
                  <span>Curating Itinerary...</span>
                </>
              ) : (
                <>
                  <span>{hasActiveTrip ? 'Update Itinerary' : 'Plan with AI'}</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Dynamic Contextual Suggestions */}
        <div className="hero-persona-chips-wrapper">
          <div className="persona-chips-header">
            <span className="persona-chips-label">
              <Sparkles size={11} className="text-amber" />
              <span>
                {isContextual 
                  ? `Recommended Curations for ${currentDestination}:`
                  : 'Popular Vacation Curations:'}
              </span>
            </span>
            {isContextual && (
              <span className="contextual-active-indicator">Dynamic Suggestions</span>
            )}
          </div>
          <div className="persona-chips-grid">
            {activeSuggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                className="persona-chip-button"
                onClick={() => handlePromptSelect(item.detail)}
                disabled={isGenerating}
                title={item.detail}
              >
                <span className="persona-chip-icon">{item.icon}</span>
                <span className="persona-chip-text">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trust & Transparency Guarantee Badges */}
        <div className="hero-trust-bar">
          <div className="trust-item">
            <ShieldCheck size={13} className="text-lime" />
            <span>100% Handpicked Partner Stays</span>
          </div>
          <div className="trust-item">
            <Compass size={13} className="text-aqua" />
            <span>Dedicated Private AC Chauffeur</span>
          </div>
          <div className="trust-item">
            <Heart size={13} className="text-amber" />
            <span>Pure Veg & Jain Dining Options</span>
          </div>
        </div>
      </div>
    </section>
  );
}
