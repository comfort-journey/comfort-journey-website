import React from 'react';
import { Bot, MessageCircle, Sparkles, X } from 'lucide-react';
import './styles/FloatingAIButton.css';

export default function FloatingAIButton({ onClick, isMobile, isChatOpen = false }) {
  return (
    <button
      type="button"
      className={`floating-ai-btn ${isChatOpen ? 'chat-open' : ''}`}
      onClick={onClick}
      aria-label={isChatOpen ? 'Close chat assistant' : 'Ask Comfy.ai travel assistant'}
      aria-expanded={isChatOpen}
    >
      <span className="btn-icon">
        {isChatOpen ? <X size={20} /> : <Bot size={20} />}
      </span>
      
      {!isMobile && !isChatOpen && (
        <span className="btn-label">Ask Comfy.ai</span>
      )}
      
      {isChatOpen && (
        <span className="btn-badge pulse">Live</span>
      )}
      
      <span className="btn-glow" aria-hidden="true" />
    </button>
  );
}