import React from 'react';
import { Compass, ChevronRight, Sparkles, Loader2 } from 'lucide-react';
import './styles/ConversationalSearch.css';

export default function ConversationalSearch({
  onSubmit,
  isGenerating,
  quickPrompts = [],
  onQuickPrompt
}) {
  const [query, setQuery] = React.useState('');

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
    <section className="conversational-search" aria-labelledby="search-heading">
      <div className="search-card glass-panel">
        <div className="search-input-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          
          <form onSubmit={handleSubmit} className="search-form">
            <input
              type="text"
              className="search-input"
              placeholder='Speak naturally: e.g. "7 days in Kashmir for parents who need relaxed pacing, pure veg meals, and a private Innova Hycross"'
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
                  <Loader2 className="spinner" size={18} aria-hidden="true" />
                  <span>Planning...</span>
                </>
              ) : (
                <>
                  <Compass size={16} aria-hidden="true" />
                  <span>Plan My Vacation</span>
                </>
              )}
            </button>
          </form>
        </div>

        {quickPrompts.length > 0 && !isGenerating && (
          <div className="quick-prompts" role="list" aria-label="Suggested prompts">
            <span className="prompts-label">Try asking:</span>
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
    </section>
  );
}