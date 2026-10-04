import React, { useState } from 'react';
import { Compass, ChevronRight, ChevronDown, Sparkles, Loader2, Lightbulb } from 'lucide-react';
import './styles/ConversationalSearch.css';

export default function ConversationalSearch({
  onSubmit,
  isGenerating,
  quickPrompts = [],
  onQuickPrompt,
  hasActiveTrip = false
}) {
  const [query, setQuery] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isGenerating) {
      onSubmit(query.trim());
    }
  };

  const handleQuickClick = (prompt) => {
    setQuery(prompt);
    onQuickPrompt?.(prompt);
  };

  return (
    <section className={`conversational-search ${hasActiveTrip ? 'compact-mode' : ''}`} aria-labelledby="search-heading">
      <div className="search-card glass-panel">
        <div className="search-input-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          
          <form onSubmit={handleSubmit} className="search-form">
            <input
              type="text"
              className="search-input"
              placeholder={hasActiveTrip 
                ? 'Ask Comfy.ai: e.g. "Add 2 days in Gulmarg with luxury stay and gondola tickets"'
                : 'Speak naturally: e.g. "7 days in Kashmir for family with veg food and Innova"'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isGenerating}
              aria-label="Describe your dream vacation"
              autoComplete="off"
              spellCheck="false"
            />
            
            <button
              type="submit"
              className="search-submit"
              disabled={!query.trim() || isGenerating}
              aria-label="Plan my vacation"
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
          </form>
        </div>

        {quickPrompts.length > 0 && !isGenerating && (
          <div className="prompts-container">
            {hasActiveTrip ? (
              <button 
                type="button" 
                className="prompts-toggle-btn"
                onClick={() => setShowPrompts(!showPrompts)}
                aria-expanded={showPrompts}
              >
                <Lightbulb size={12} />
                <span>{showPrompts ? 'Hide prompt suggestions' : '💡 Need ideas? Click to see prompts'}</span>
                <ChevronDown size={12} style={{ transform: showPrompts ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
            ) : null}

            {showPrompts && (
              <div className="quick-prompts animate-in" role="list" aria-label="Suggested prompts">
                <div className="prompts-scroll" role="listbox">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="prompt-chip"
                      onClick={() => handleQuickClick(prompt)}
                      role="option"
                      tabIndex={0}
                    >
                      <span className="prompt-text">{prompt}</span>
                      <ChevronRight size={12} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}