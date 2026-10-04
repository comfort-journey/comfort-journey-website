import React, { useRef, useEffect, useState } from 'react';
import { Send, Bot, MessageCircle, ChevronRight, Loader2, Sparkles, Download, Share2, FileSpreadsheet, Printer } from 'lucide-react';
import './styles/ChatPanel.css';

const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';
const mascotDefaultSrc = `${basePrefix}mascot-default.png`;
const mascotReactionSrc = `${basePrefix}mascot-reaction.png`;

export default function ChatPanel({
  isOpen,
  onClose,
  messages,
  chatInput,
  setChatInput,
  isTyping,
  onSendMessage,
  tripPlan,
  onViewInPlanner
}) {
  const messagesEndRef = useRef(null);
  const [showQuickActions, setShowQuickActions] = useState(true);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim() && !isTyping) {
      onSendMessage(chatInput);
      setChatInput('');
      setShowQuickActions(false);
    }
  };

  const handleQuickAction = (action) => {
    const prompts = {
      hotels: 'What are the best hotels for my trip?',
      food: 'Tell me about pure veg and Jain food options',
      weather: 'What is the best time to visit and what should I pack?',
      customize: 'I want to adjust my itinerary pacing and vehicle',
    };
    onSendMessage(prompts[action]);
    setChatInput('');
    setShowQuickActions(false);
  };

  if (!isOpen) return null;

  return (
    <div className="chat-panel-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="chat-title">
      <div className="chat-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="chat-header">
          <div className="header-left">
            <div className="chat-avatar">
              <img src={mascotDefaultSrc} alt="Comfy" onError={(e) => { e.currentTarget.src = '/mascot-default.png'; }} />
              <span className="avatar-status" aria-hidden="true" />
            </div>
            <div>
              <h2 id="chat-title" className="chat-title">Comfy.ai Assistant</h2>
              <p className="chat-subtitle">Your personal travel concierge</p>
            </div>
          </div>
          <button type="button" className="chat-close" onClick={onClose} aria-label="Close chat">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </header>

        {/* Messages */}
        <div className="chat-messages" role="log" aria-live="polite" aria-label="Conversation">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}

          {isTyping && (
            <div className="message-row assistant">
              <div className="message-avatar">
                <img src={mascotReactionSrc} alt="Comfy typing" onError={(e) => { e.currentTarget.src = '/mascot-reaction.png'; }} />
              </div>
              <div className="message-bubble assistant typing">
                <span className="typing-indicator">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </span>
                <span className="typing-text">Comfy.ai is planning your personalized trip...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {showQuickActions && messages.length <= 2 && (
          <div className="quick-actions" role="region" aria-label="Quick actions">
            <span className="actions-label">Quick actions:</span>
            <div className="actions-grid">
              <button type="button" className="action-btn" onClick={() => handleQuickAction('hotels')}>
                <BedDouble size={16} /> <span>Hotels & Stays</span>
              </button>
              <button type="button" className="action-btn" onClick={() => handleQuickAction('food')}>
                <Utensils size={16} /> <span>Pure Veg & Jain Food</span>
              </button>
              <button type="button" className="action-btn" onClick={() => handleQuickAction('weather')}>
                <Sparkles size={16} /> <span>Best Time & Weather</span>
              </button>
              <button type="button" className="action-btn" onClick={() => handleQuickAction('customize')}>
                <MessageCircle size={16} /> <span>Customize Itinerary</span>
              </button>
            </div>
          </div>
        )}

        {/* View in Planner CTA */}
        {tripPlan && messages.some(m => m.role === 'assistant' && m.content.includes('handcrafted')) && (
          <div className="planner-cta">
            <button type="button" className="cta-btn" onClick={onViewInPlanner}>
              <MessageCircle size={16} />
              <span>View in Interactive Planner</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Input */}
        <form className="chat-input-area" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask about hotels, food, weather, or customize your trip..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={isTyping}
              autoFocus
              autoComplete="off"
              aria-label="Your message"
            />
            <button
              type="submit"
              className="send-btn"
              disabled={!chatInput.trim() || isTyping}
              aria-label="Send message"
            >
              {isTyping ? <Loader2 size={18} /> : <Send size={18} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ChatBubble({ message }) {
  const { role, content, time, tours } = message;
  const isUser = role === 'user';

  return (
    <div className={`message-row ${role}`}>
      {!isUser && (
        <div className="message-avatar">
          <img src={mascotDefaultSrc} alt="Comfy" onError={(e) => { e.currentTarget.src = '/mascot-default.png'; }} />
        </div>
      )}

      <div className={`message-bubble ${role}`}>
        <div className="bubble-content">
          {content.split('\n').map((line, idx) => {
            if (!line.trim()) return <div key={idx} className="line-spacer" />;
            const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            return (
              <p key={idx} dangerouslySetInnerHTML={{ __html: formatted }} className="chat-paragraph" />
            );
          })}
        </div>

        {tours && tours.length > 0 && (
          <div className="matched-tours">
            <div className="tours-header">
              <Sparkles size={13} className="text-amber" />
              <span>Curated Comfort Journey Holidays:</span>
            </div>
            <div className="tours-grid">
              {tours.slice(0, 3).map(tour => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        )}

        <div className="bubble-meta">
          <span className="bubble-time">{time}</span>
        </div>
      </div>

      {isUser && <div className="message-avatar user" aria-hidden="true" />}
    </div>
  );
}

function TourCard({ tour }) {
  return (
    <article className="tour-card glass-card">
      <div className="card-image">
        <img src={tour.image} alt={tour.name} loading="lazy" />
        <span className="card-duration">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>{tour.duration}</span>
        </span>
      </div>
      <div className="card-info">
        <span className="card-location">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>{tour.location || tour.country}</span>
        </span>
        <h4 className="card-name">{tour.name}</h4>
        <div className="card-price">
          <span className="price-from">From</span>
          <span className="price-value">₹{tour.price?.toLocaleString('en-IN')}</span>
          <span className="price-unit">/person</span>
        </div>
      </div>
    </article>
  );
}