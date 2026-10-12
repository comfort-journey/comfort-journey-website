import React, { useState } from 'react';
import { Compass, ChevronRight, ChevronDown, Sparkles, Loader2, Lightbulb } from 'lucide-react';
import './styles/ConversationalSearch.css';

const DEFAULT_PROMPTS = [
  '🏔️ Add 2 days in Gulmarg with luxury resort',
  '✨ Upgrade hotels to 5★ Heritage Stay',
  '🥗 Ensure 100% Pure Veg & Jain meals',
  '🚗 Private Innova Hycross with chauffeur',
  '👴 Relaxed gentle pacing for parents'
];

export default function ConversationalSearch({
  onSubmit,
  isGenerating,
  quickPrompts = [],
  onQuickPrompt,
  hasActiveTrip = false
}) {
  const [query, setQuery] = useState('');
  const displayPrompts = quickPrompts.length > 0 ? quickPrompts : DEFAULT_PROMPTS;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isGenerating) {
      onSubmit(query.trim());
    }
  };

  const handleQuickClick = (prompt) => {
    // Strip leading emoji for cleaner query if needed, or use as is
    const cleanPrompt = prompt.replace(/^[\p{Emoji}\s]+/u, '').trim();
    setQuery(cleanPrompt || prompt);
    onQuickPrompt?.(cleanPrompt || prompt);
  };

  return (
    <section className="conversational-search" aria-labelledby="search-heading">
      <div className="search-card">
        <form onSubmit={handleSubmit} className="search-form-container">
          <div className="search-input-wrapper">
            <span className="search-input-icon-badge" aria-hidden="true">
              <Sparkles size={18} className="text-amber" />
            </span>
            
            <input
              type="text"
              className="search-input"
              placeholder={hasActiveTrip 
                ? 'Ask Comfy.ai to customize: e.g. "Add 2 days in Gulmarg with luxury stay"'
                : 'Plan your trip with AI: e.g. "7 days in Kashmir for family with veg food and Innova"'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isGenerating}
              aria-label="Describe your dream vacation to Comfy.ai"
              autoComplete="off"
              spellCheck="false"
            />

            <button
              type="submit"
              className="search-submit-btn"
              disabled={!query.trim() || isGenerating}
              aria-label="Plan or modify vacation"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="spinner" size={16} aria-hidden="true" />
                  <span>Planning...</span>
                </>
              ) : (
                <>
                  <Sparkles size={15} aria-hidden="true" />
                  <span>{hasActiveTrip ? 'Re-plan' : 'Plan Trip'}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Suggestion Prompt Chips */}
        {!isGenerating && displayPrompts.length > 0 && (
          <div className="prompts-suggestion-row" role="list" aria-label="Suggested prompt ideas">
            <span className="prompts-suggestion-label">
              <Lightbulb size={12} className="text-amber" />
              <span>Try:</span>
            </span>
            <div className="prompts-chips-scroll">
              {displayPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="quick-prompt-pill"
                  onClick={() => handleQuickClick(prompt)}
                  role="listitem"
                  title={`Click to prompt: ${prompt}`}
                >
                  <span>{prompt}</span>
                  <ChevronRight size={11} className="pill-arrow" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}