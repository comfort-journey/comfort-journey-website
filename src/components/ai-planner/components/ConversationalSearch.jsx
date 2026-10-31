import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight, Compass, ShieldCheck, Heart } from 'lucide-react';
import './styles/ConversationalSearch.css';

const CURATED_PERSONA_PROMPTS = [
  {
    icon: '🏔️',
    label: 'Kashmir for Parents',
    detail: '7 Days · Relaxed pacing, pure veg meals & private Innova Hycross'
  },
  {
    icon: '🌴',
    label: 'Bali Honeymoon',
    detail: '5 Days · Private pool villa, scenic cliff temple & candlelight dinner'
  },
  {
    icon: '🏙️',
    label: 'Dubai Family Special',
    detail: '4 Days · Desert safari, Burj Khalifa & child-friendly activities'
  },
  {
    icon: '🌿',
    label: 'Kerala Backwaters',
    detail: '6 Days · Heated houseboat cruise, Munnar tea hills & spice walk'
  },
  {
    icon: '⛰️',
    label: 'Swiss Scenic Rails',
    detail: '6 Days · Glacier Express, cozy alpine chalets & mountain lakes'
  },
  {
    icon: '🥗',
    label: 'Pure Veg & Jain Tour',
    detail: '100% vegetarian & Jain meal assurance with kitchen verification'
  }
];

export default function ConversationalSearch({
  onSubmit,
  isGenerating,
  hasActiveTrip = false
}) {
  const [query, setQuery] = useState('');

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
          <span>EST. 1992 · AI-POWERED LUXURY CONCIERGE</span>
        </div>
        <h2 className="hero-studio-title">
          Where is your next <span className="text-amber">Comfort Journey</span>?
        </h2>
        <p className="hero-studio-subtitle">
          Describe your dream vacation in plain words. Comfy configures verified boutique hotels, private chauffeured cars, and pure veg/Jain dining.
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
                ? 'Ask Comfy to tweak: e.g. "Add 2 days in Gulmarg with 5★ luxury resort"'
                : 'e.g. "7 days in Kashmir for parents who need relaxed pacing, pure veg meals, and an Innova"'}
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

        {/* Persona Prompt Chips */}
        <div className="hero-persona-chips-wrapper">
          <span className="persona-chips-label">
            <Sparkles size={11} className="text-amber" />
            <span>Popular Curations:</span>
          </span>
          <div className="persona-chips-grid">
            {CURATED_PERSONA_PROMPTS.map((item, idx) => (
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
            <span>100% Handpicked Verified Stays</span>
          </div>
          <div className="trust-item">
            <Compass size={13} className="text-aqua" />
            <span>Dedicated Private AC Chauffeur</span>
          </div>
          <div className="trust-item">
            <Heart size={13} className="text-amber" />
            <span>Pure Veg & Jain Meal Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}
