import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, Wand2 } from 'lucide-react';
import './styles/StickyPromptDock.css';

const QUICK_REFINEMENTS = [
  'Make pacing more relaxed for seniors',
  'Upgrade to 5★ Luxury Resort & Houseboat',
  'Ensure 100% Jain food for all meals',
  'Switch to Private Innova Hycross Hybrid',
  'Add sunset shikara ride & gondola Phase 2'
];

export default function StickyPromptDock({
  isVisible,
  isGenerating,
  onSubmit,
  currentDestination
}) {
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isGenerating) {
      onSubmit(inputValue.trim());
      setInputValue('');
      setIsExpanded(false);
    }
  };

  const handleChipClick = (prompt) => {
    if (isGenerating) return;
    onSubmit(prompt);
  };

  return (
    <div className="sticky-prompt-dock" role="region" aria-label="AI Itinerary Quick Refiner">
      <div className="dock-glass-shell">
        <div className="dock-header">
          <div className="dock-brand">
            <span className="dock-sparkle-badge" aria-hidden="true">
              <Sparkles size={13} className="text-amber" />
            </span>
            <span className="dock-label">Refine with Comfy.ai:</span>
          </div>

          <button
            type="button"
            className="dock-toggle-input-btn"
            onClick={() => setIsExpanded(prev => !prev)}
            aria-expanded={isExpanded}
          >
            <Wand2 size={12} />
            <span>{isExpanded ? 'Hide Custom Input' : 'Type Custom Tweak'}</span>
          </button>
        </div>

        {/* 1-Tap Quick Refinement Chips */}
        <div className="dock-chips-carousel" role="list">
          {QUICK_REFINEMENTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              className="dock-chip-pill"
              onClick={() => handleChipClick(prompt)}
              disabled={isGenerating}
              role="listitem"
            >
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        {/* Expandable Custom Tweak Input Form */}
        {isExpanded && (
          <form onSubmit={handleSubmit} className="dock-input-form">
            <input
              type="text"
              className="dock-text-input"
              placeholder={`e.g. "Add a free leisure afternoon in ${currentDestination || 'the hills'}"`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isGenerating}
              autoFocus
            />
            <button
              type="submit"
              className="dock-submit-btn"
              disabled={!inputValue.trim() || isGenerating}
              aria-label="Send refinement to AI"
            >
              {isGenerating ? (
                <Loader2 size={14} className="spinner" />
              ) : (
                <>
                  <span>Apply</span>
                  <ArrowRight size={13} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
