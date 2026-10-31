import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight, Compass, ShieldCheck, Heart, X, Globe, MessageCircle } from 'lucide-react';
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
  currentDestination = '',
  aiInsight = null,
  onDismissInsight = null,
  dynamicChips = null
}) {
  const [query, setQuery] = useState('');

  // Dynamically resolve suggestions
  let activeSuggestions = DEFAULT_POPULAR_CURATIONS;
  let isContextual = false;

  if (Array.isArray(dynamicChips) && dynamicChips.length > 0) {
    activeSuggestions = dynamicChips.map(chip => {
      if (typeof chip === 'string') {
        return { icon: '✨', label: chip, detail: `Plan trip to ${chip}` };
      }
      return chip;
    });
    isContextual = true;
  } else {
    const destLower = (currentDestination || '').toLowerCase();
    if (destLower.includes('swiss') || destLower.includes('switz')) {
      activeSuggestions = DESTINATION_SUGGESTIONS.switzerland;
      isContextual = true;
    } else if (destLower.includes('dubai') || destLower.includes('uae')) {
      activeSuggestions = DESTINATION_SUGGESTIONS.dubai;
      isContextual = true;
    } else if (destLower.includes('kashmir') || destLower.includes('srinagar')) {
      activeSuggestions = DESTINATION_SUGGESTIONS.kashmir;
      isContextual = true;
    } else if (destLower.includes('bali')) {
      activeSuggestions = DESTINATION_SUGGESTIONS.bali;
      isContextual = true;
    } else if (destLower.includes('kerala') || destLower.includes('munnar')) {
      activeSuggestions = DESTINATION_SUGGESTIONS.kerala;
      isContextual = true;
    }
  }

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
          Describe your dream vacation in plain words. Comfy configures verified boutique hotels, private chauffeured cars, and pure veg/Jain dining across 2,000+ destinations worldwide.
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
                ? 'Search any destination worldwide: e.g. "trip to el salvador country" or "plan 5 days in Switzerland"'
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

        {/* Live AI Concierge Insight Banner */}
        {aiInsight && (
          <div className="hero-ai-insight-card" role="region" aria-label="AI Concierge Response">
            <div className="insight-card-header">
              <div className="insight-header-left">
                <div className="insight-avatar-glow">
                  <span className="insight-avatar-emoji">🐺</span>
                </div>
                <div className="insight-header-meta">
                  <div className="insight-header-title-row">
                    <span className="insight-concierge-name">Comfy.ai Live Intelligence</span>
                    <span className="insight-model-tag">{aiInsight.model || 'Gemini Flash'}</span>
                    {aiInsight.isCustomGlobal && (
                      <span className="insight-global-tag">
                        <Globe size={11} />
                        Bespoke Worldwide Tour
                      </span>
                    )}
                  </div>
                  <span className="insight-query-ref">Answering: &ldquo;{aiInsight.query}&rdquo;</span>
                </div>
              </div>
              {onDismissInsight && (
                <button
                  type="button"
                  onClick={onDismissInsight}
                  className="insight-dismiss-btn"
                  aria-label="Close insight"
                  title="Close insight"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="insight-card-body">
              <div className="insight-markdown-content">
                {(aiInsight.reply || '').split('\n\n').map((para, pIdx) => {
                  const trimmed = para.trim();
                  if (!trimmed) return null;
                  if (trimmed.startsWith('### ') || trimmed.startsWith('## ')) {
                    return <h4 key={pIdx} className="insight-subheading">{trimmed.replace(/^#+\s*/, '')}</h4>;
                  }
                  if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                    const items = trimmed.split('\n').filter(Boolean);
                    return (
                      <ul key={pIdx} className="insight-bullet-list">
                        {items.map((it, itIdx) => (
                          <li key={itIdx}>{it.replace(/^[\*\-]\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={pIdx} className="insight-para">{trimmed.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
                })}
              </div>
            </div>

            {/* Direct 1-Click WhatsApp Booking Action for Custom Global Inquiries */}
            {aiInsight.isCustomGlobal && (
              <div className="insight-global-cta-bar">
                <div className="global-cta-text">
                  <strong>🌍 Bespoke Global Travel (Est. 1992 · Bhopal)</strong>
                  <span>We coordinate private chauffeured cars, 4★ & 5★ boutique hotels, and verified pure veg/Jain meals for {aiInsight.destination || 'this destination'}.</span>
                </div>
                <a
                  href={`https://wa.me/919203931912?text=${encodeURIComponent(`Hello Comfort Journey! I searched for a custom private tour to ${aiInsight.destination || 'this destination'} on your AI Travel Studio. Please share a personalized itinerary and package quote.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="insight-whatsapp-btn"
                >
                  <MessageCircle size={15} />
                  <span>Lock Custom Quote on WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        )}

        {/* Dynamic Contextual Suggestions */}
        <div className="hero-persona-chips-wrapper">
          <div className="persona-chips-header">
            <span className="persona-chips-label">
              <Sparkles size={11} className="text-amber" />
              <span>
                {isContextual 
                  ? `Recommended Curations for ${currentDestination || 'Your Search'}:`
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
