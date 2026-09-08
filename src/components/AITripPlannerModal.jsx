import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Sparkles, Send, CheckCircle2, Clock, MapPin, Hotel, Users, 
  ArrowRight, MessageCircle, Heart, ShieldCheck, Flame, Compass, 
  Landmark, Snowflake, Palmtree, Sun, Flower2, Building2, Star, 
  ExternalLink, PhoneCall, RefreshCw, Globe, ChevronRight, HelpCircle, Bot
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { TOURS_DATA } from '../data/toursData';
import { askAIConcierge, QUICK_PROMPTS } from '../services/aiConciergeService';

export default function AITripPlannerModal({ isOpen = true, onClose, onSelectTour, onBookCustomTrip }) {
  const { formatPrice } = useCurrency();

  // Mode: 'chat' (Conversational AI Concierge) | 'wizard' (4-Step Guided Builder)
  const [activeTab, setActiveTab] = useState('chat');

  // Chat State
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `**Namaste! I am Navi, your Senior AI Travel Concierge for Comfort Journey (Est. 1992).** 👑\n\nI can answer any questions before, during, or after your vacation — including tour packages, real pricing, best seasons, packing tips, pure veg/Jain dining, private chauffeurs, or bespoke itineraries across India and 2,000+ destinations worldwide.\n\n*Ask me in English, Hindi, Hinglish, or any language you prefer!*`,
      tours: TOURS_DATA.filter(t => t.id.includes('peace-in-the-pines') || t.id.includes('bali')).slice(0, 2),
      time: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activePromptCategory, setActivePromptCategory] = useState('Before Travel');
  const chatBottomRef = useRef(null);

  // Wizard State (4-Step Builder)
  const [step, setStep] = useState(1);
  const [wizardPrompt, setWizardPrompt] = useState('');
  const [vibe, setVibe] = useState('Romantic Honeymoon');
  const [landscape, setLandscape] = useState('Snow & Glaciers');
  const [durationGroup, setDurationGroup] = useState('5–6 Days');
  const [guestsCount, setGuestsCount] = useState(2);
  const [hotelTier, setHotelTier] = useState('5-Star Royal Palace / Pool Villa');
  const [isGeneratingWizard, setIsGeneratingWizard] = useState(false);
  const [wizardResult, setWizardResult] = useState(null);

  useEffect(() => {
    if (activeTab === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeTab]);

  if (isOpen === false) return null;

  // Send query to AI Concierge
  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputQuery).trim();
    if (!text || isTyping) return;

    setInputQuery('');

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await askAIConcierge({ prompt: text, conversationHistory: history });

      const assistantMsg = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.reply,
        tours: response.matchedTours || [],
        blogs: response.matchedBlogs || [],
        model: response.model,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error in AI Concierge chat:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'I apologize for the brief pause. Please feel free to ask your question again, or speak directly with our Senior Trip Designers via WhatsApp (+91 8770403315).',
          tours: [],
          time: 'Just now'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleWhatsAppInquiry = (tour, customText = '') => {
    const tourTitle = tour ? tour.name : 'Custom Luxury Itinerary';
    const tourPrice = tour?.price ? ` (₹${tour.price.toLocaleString('en-IN')})` : '';
    const message = encodeURIComponent(
      customText || 
      `Hi Comfort Journey! I am consulting with your AI Travel Concierge (Navi) regarding:\n` +
      `✨ Package / Request: ${tourTitle}${tourPrice}\n` +
      `👤 Travelers: ${guestsCount || 2} Person(s)\n` +
      `📅 Duration: ${tour?.duration || durationGroup}\n\n` +
      `Please connect me with a Senior Luxury Trip Curator to finalize our custom itinerary!`
    );
    window.open(`https://wa.me/918770403315?text=${message}`, '_blank');
  };

  // Step wizard generation
  const handleWizardGenerate = () => {
    setIsGeneratingWizard(true);
    setStep(5);

    setTimeout(() => {
      const lowerPrompt = wizardPrompt.toLowerCase().trim();
      let matchedTour = TOURS_DATA.find(t => {
        const name = (t.name || '').toLowerCase();
        const country = (t.country || '').toLowerCase();
        const loc = (t.location || '').toLowerCase();
        return (lowerPrompt && (name.includes(lowerPrompt) || country.includes(lowerPrompt) || loc.includes(lowerPrompt))) ||
               (landscape === 'Snow & Glaciers' && (name.includes('kashmir') || loc.includes('kashmir'))) ||
               (landscape === 'Tropical Islands' && (name.includes('bali') || loc.includes('bali'))) ||
               (landscape === 'Desert Oasis' && (name.includes('dubai') || loc.includes('dubai'))) ||
               (landscape === 'European Fairytale' && (name.includes('europe') || loc.includes('europe')));
      }) || TOURS_DATA[0];

      setWizardResult({
        matchedTour,
        destination: wizardPrompt || matchedTour.location || landscape,
        estimatedCost: matchedTour.price || 48999,
        summary: `Tailor-made ${durationGroup} VIP itinerary combining ${vibe} with ${landscape} scenery: ${matchedTour.name}.`
      });

      setIsGeneratingWizard(false);
    }, 900);
  };

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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content ai-concierge-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* TOP BRAND HEADER WITH MASCOT AVATAR */}
        <div className="ai-modal-top-bar">
          <div className="ai-mascot-badge-wrap">
            <div className="ai-mascot-avatar-circle">
              <img 
                src="/mascot-default.png" 
                alt="Navi Comfort Wolf Mascot" 
                className="ai-avatar-wolf-img"
              />
              <span className="ai-online-beacon" />
            </div>

            <div className="ai-title-block">
              <div className="ai-brand-pill">
                <Sparkles size={13} className="text-amber" />
                <span>COMFORT JOURNEY • EST. 1992</span>
              </div>
              <h2 className="ai-concierge-heading">
                Navi <span className="text-orange-glow">AI Travel Concierge</span>
              </h2>
              <p className="ai-concierge-status">
                <span className="status-dot-green" />
                <span>Online • Handcrafting 2,000+ Bespoke Luxury Journeys Worldwide</span>
              </p>
            </div>
          </div>

          <div className="ai-top-controls">
            {/* Direct 24/7 Concierge Hotline */}
            <a 
              href="https://wa.me/918770403315" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ai-hotline-btn"
              title="Chat with Senior Trip Designer"
            >
              <MessageCircle size={15} />
              <span className="hidden-mobile">+91 8770403315</span>
            </a>

            <button className="ai-close-btn" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* MODE SWITCHER TABS: CONVERSATIONAL CHAT vs GUIDED BUILDER */}
        <div className="ai-mode-tabs-bar">
          <button 
            type="button"
            className={`ai-mode-tab ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <Bot size={16} />
            <span>Ask Navi Anything (Chat & Advice)</span>
          </button>

          <button 
            type="button"
            className={`ai-mode-tab ${activeTab === 'wizard' ? 'active' : ''}`}
            onClick={() => setActiveTab('wizard')}
          >
            <Compass size={16} />
            <span>Guided 4-Step Trip Builder</span>
          </button>
        </div>

        {/* =========================================================================
            MODE 1: CONVERSATIONAL AI CONCIERGE CHAT
            ========================================================================= */}
        {activeTab === 'chat' && (
          <div className="ai-chat-view-container">
            {/* Interactive Prompt Pills Bar */}
            <div className="ai-quick-topics-row">
              <div className="ai-topic-tabs">
                {QUICK_PROMPTS.map(cat => (
                  <button
                    key={cat.category}
                    type="button"
                    className={`topic-tab-pill ${activePromptCategory === cat.category ? 'active' : ''}`}
                    onClick={() => setActivePromptCategory(cat.category)}
                  >
                    <span>{cat.category}</span>
                  </button>
                ))}
              </div>

              <div className="ai-chips-scrollable">
                {QUICK_PROMPTS.find(c => c.category === activePromptCategory)?.questions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="ai-question-chip"
                    onClick={() => handleSendMessage(q)}
                  >
                    <span>{q}</span>
                    <ArrowRight size={12} className="chip-arrow" />
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages Stream */}
            <div className="ai-chat-messages-scroll">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-bubble-row ${msg.role === 'user' ? 'user-row' : 'assistant-row'}`}>
                  {msg.role === 'assistant' && (
                    <div className="assistant-avatar-small">
                      <img src="/mascot-default.png" alt="Navi" />
                    </div>
                  )}

                  <div className={`chat-bubble ${msg.role === 'user' ? 'user-bubble' : 'assistant-bubble'}`}>
                    <div className="bubble-content-text">
                      {msg.content.split('\n').map((line, lIdx) => {
                        if (!line.trim()) return <div key={lIdx} className="line-spacer" />;
                        
                        // Bold formatting
                        const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                        return (
                          <p 
                            key={lIdx} 
                            dangerouslySetInnerHTML={{ __html: formatted }} 
                            className="chat-paragraph"
                          />
                        );
                      })}
                    </div>

                    {/* Matched Tour Cards (Embedded Directly in Chat) */}
                    {msg.tours && msg.tours.length > 0 && (
                      <div className="chat-matched-tours-section">
                        <div className="matched-tours-header">
                          <Sparkles size={13} className="text-amber" />
                          <span>Curated Comfort Journey Packages:</span>
                        </div>

                        <div className="matched-tours-grid">
                          {msg.tours.map(tour => (
                            <div key={tour.id} className="chat-tour-card glass-card">
                              <div className="card-thumb-wrap">
                                <img 
                                  src={tour.image} 
                                  alt={tour.name} 
                                  className="card-thumb-img" 
                                  loading="lazy"
                                />
                                <span className="card-duration-badge">
                                  <Clock size={11} />
                                  <span>{tour.duration}</span>
                                </span>
                              </div>

                              <div className="card-info-wrap">
                                <span className="card-country-tag">
                                  <MapPin size={11} />
                                  <span>{tour.location || tour.country}</span>
                                </span>
                                <h4 className="card-tour-name">{tour.name}</h4>
                                
                                <div className="card-price-row">
                                  <span className="price-label">From</span>
                                  <span className="price-value">{formatPrice(tour.price)}</span>
                                  <span className="price-sub">/ person</span>
                                </div>

                                <div className="card-actions-row">
                                  <button
                                    type="button"
                                    className="btn-card-itinerary"
                                    onClick={() => {
                                      onClose();
                                      if (onSelectTour) onSelectTour(tour);
                                    }}
                                  >
                                    <span>View Itinerary</span>
                                    <ChevronRight size={13} />
                                  </button>

                                  <button
                                    type="button"
                                    className="btn-card-whatsapp"
                                    onClick={() => handleWhatsAppInquiry(tour)}
                                    title="Book via WhatsApp"
                                  >
                                    <MessageCircle size={14} />
                                    <span>WhatsApp</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bubble-footer-row">
                      <span className="bubble-timestamp">{msg.time}</span>
                      {msg.model && (
                        <span className="bubble-model-badge">
                          <CheckCircle2 size={11} className="text-emerald" />
                          <span>{msg.model}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="chat-bubble-row assistant-row">
                  <div className="assistant-avatar-small">
                    <img src="/mascot-reaction.png" alt="Navi Typing" />
                  </div>
                  <div className="chat-bubble assistant-bubble typing-bubble">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-hint">Navi is curating your royal itinerary...</span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input Bar */}
            <div className="ai-chat-input-area">
              <div className="input-field-wrapper">
                <input
                  type="text"
                  className="ai-chat-text-input"
                  placeholder="Ask about tour packages, Kashmir snow season, Bali villas, pure veg food, visa, or custom plans..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isTyping}
                />
                
                <button
                  type="button"
                  className="ai-send-btn"
                  onClick={() => handleSendMessage()}
                  disabled={!inputQuery.trim() || isTyping}
                  aria-label="Send query"
                >
                  <Send size={16} />
                  <span>Send</span>
                </button>
              </div>

              <div className="input-disclaimer-row">
                <span className="disclaimer-brand">Comfort Journey Luxury Travel (Est. 1992)</span>
                <span className="disclaimer-dot">•</span>
                <span>Verified 5★ Stays & Dedicated AC Chauffeurs</span>
                <span className="disclaimer-dot">•</span>
                <span className="text-emerald font-600">Strictly Private & Confidential</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODE 2: GUIDED 4-STEP TRIP BUILDER WIZARD
            ========================================================================= */}
        {activeTab === 'wizard' && (
          <div className="ai-wizard-view-container">
            {step < 5 && (
              <div className="wizard-progress-bar-wrap">
                <div className="wizard-steps-indicator">
                  <span className={`step-circle ${step >= 1 ? 'active' : ''}`}>1</span>
                  <div className={`step-line ${step >= 2 ? 'active' : ''}`} />
                  <span className={`step-circle ${step >= 2 ? 'active' : ''}`}>2</span>
                  <div className={`step-line ${step >= 3 ? 'active' : ''}`} />
                  <span className={`step-circle ${step >= 3 ? 'active' : ''}`}>3</span>
                  <div className={`step-line ${step >= 4 ? 'active' : ''}`} />
                  <span className={`step-circle ${step >= 4 ? 'active' : ''}`}>4</span>
                </div>
              </div>
            )}

            {/* Step 1: Vibe */}
            {step === 1 && (
              <div className="wizard-step-card animate-fade-in">
                <h3 className="wizard-step-title">What is your dream travel vibe?</h3>
                <p className="wizard-step-desc">Select the ambiance that matches your journey style</p>

                <div className="wizard-options-grid">
                  {vibesList.map(v => {
                    const Icon = v.icon;
                    return (
                      <button
                        key={v.title}
                        type="button"
                        className={`wizard-opt-btn ${vibe === v.title ? 'selected' : ''}`}
                        onClick={() => setVibe(v.title)}
                      >
                        <div className="opt-icon-circle"><Icon size={20} /></div>
                        <div className="opt-text-wrap">
                          <h4>{v.title}</h4>
                          <p>{v.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="wizard-footer-nav">
                  <div className="custom-input-box">
                    <input 
                      type="text" 
                      placeholder="Or specify custom destination: e.g. Kashmir, Switzerland, Vietnam, Bali..." 
                      value={wizardPrompt}
                      onChange={(e) => setWizardPrompt(e.target.value)}
                    />
                  </div>
                  <button type="button" className="btn-wizard-next" onClick={() => setStep(2)}>
                    <span>Next: Select Landscape</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Landscape */}
            {step === 2 && (
              <div className="wizard-step-card animate-fade-in">
                <h3 className="wizard-step-title">Which scenery inspires you?</h3>
                <p className="wizard-step-desc">Pick your preferred terrain or climatic experience</p>

                <div className="wizard-options-grid">
                  {landscapesList.map(l => {
                    const Icon = l.icon;
                    return (
                      <button
                        key={l.title}
                        type="button"
                        className={`wizard-opt-btn ${landscape === l.title ? 'selected' : ''}`}
                        onClick={() => setLandscape(l.title)}
                      >
                        <div className="opt-icon-circle"><Icon size={20} /></div>
                        <div className="opt-text-wrap">
                          <h4>{l.title}</h4>
                          <p>{l.sub}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="wizard-footer-nav">
                  <button type="button" className="btn-wizard-back" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button type="button" className="btn-wizard-next" onClick={() => setStep(3)}>
                    <span>Next: Duration & Guests</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Duration & Guests */}
            {step === 3 && (
              <div className="wizard-step-card animate-fade-in">
                <h3 className="wizard-step-title">Trip Duration & Party Size</h3>
                <p className="wizard-step-desc">We pace your vacation so you enjoy every moment with luxury ease</p>

                <div className="wizard-row-settings">
                  <div className="setting-group">
                    <label>Duration</label>
                    <div className="pills-selection-row">
                      {['3–4 Days (Quick Escape)', '5–6 Days (Signature)', '7–9 Days (Grand Journey)', '10+ Days (Epic Odyssey)'].map(d => (
                        <button
                          key={d}
                          type="button"
                          className={`setting-pill ${durationGroup === d ? 'active' : ''}`}
                          onClick={() => setDurationGroup(d)}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="setting-group">
                    <label>Number of Travelers</label>
                    <div className="guests-counter-row">
                      <button type="button" onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}>-</button>
                      <span className="count-number">{guestsCount} Traveler(s)</span>
                      <button type="button" onClick={() => setGuestsCount(guestsCount + 1)}>+</button>
                    </div>
                  </div>
                </div>

                <div className="wizard-footer-nav">
                  <button type="button" className="btn-wizard-back" onClick={() => setStep(2)}>
                    Back
                  </button>
                  <button type="button" className="btn-wizard-next" onClick={() => setStep(4)}>
                    <span>Next: Luxury Hotel Tier</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Hotel Tier */}
            {step === 4 && (
              <div className="wizard-step-card animate-fade-in">
                <h3 className="wizard-step-title">Select Your Accommodation Tier</h3>
                <p className="wizard-step-desc">Every property is verified by Comfort Journey inspectors</p>

                <div className="hotel-tier-cards-list">
                  {[
                    { title: '5-Star Royal Palace / Pool Villa', sub: 'Handpicked Taj, Oberoi, private beach villas & heritage suites with dedicated butlers' },
                    { title: 'Premium 4★ Deluxe Boutique Stays', sub: 'Spacious alpine chalets, boutique properties with scenic mountain or ocean balconies' },
                    { title: 'Signature Curated Luxury Heritage', sub: 'Royal cedarwood houseboats in Dal Lake, traditional desert camps & vineyard retreats' }
                  ].map(h => (
                    <button
                      key={h.title}
                      type="button"
                      className={`tier-select-card ${hotelTier === h.title ? 'active' : ''}`}
                      onClick={() => setHotelTier(h.title)}
                    >
                      <div className="tier-check-circle">
                        {hotelTier === h.title && <CheckCircle2 size={16} />}
                      </div>
                      <div className="tier-text-block">
                        <h4>{h.title}</h4>
                        <p>{h.sub}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="wizard-footer-nav">
                  <button type="button" className="btn-wizard-back" onClick={() => setStep(3)}>
                    Back
                  </button>
                  <button type="button" className="btn-wizard-generate" onClick={handleWizardGenerate}>
                    <Sparkles size={16} />
                    <span>Generate Royal Itinerary</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Generated Result */}
            {step === 5 && (
              <div className="wizard-result-card animate-fade-in">
                {isGeneratingWizard ? (
                  <div className="wizard-loading-box">
                    <img src="/mascot-reaction.png" alt="Navi" className="loading-mascot-img" />
                    <h4>Navi is handcrafting your bespoke itinerary...</h4>
                    <p>Matching verified 5-star properties, dedicated chauffeurs & scenic routes</p>
                  </div>
                ) : wizardResult ? (
                  <div className="result-content-wrap">
                    <div className="result-header-banner">
                      <div className="result-badge-pill">
                        <Sparkles size={14} className="text-amber" />
                        <span>MATCHED LUXURY VACATION</span>
                      </div>
                      <h3>{wizardResult.matchedTour.name}</h3>
                      <p className="result-summary-text">{wizardResult.summary}</p>
                    </div>

                    <div className="result-details-grid">
                      <div className="result-detail-item">
                        <Clock size={16} className="text-amber" />
                        <div>
                          <strong>Duration</strong>
                          <span>{wizardResult.matchedTour.duration}</span>
                        </div>
                      </div>

                      <div className="result-detail-item">
                        <Hotel size={16} className="text-cyan" />
                        <div>
                          <strong>Stay Tier</strong>
                          <span>{hotelTier}</span>
                        </div>
                      </div>

                      <div className="result-detail-item">
                        <ShieldCheck size={16} className="text-emerald" />
                        <div>
                          <strong>Transfers</strong>
                          <span>Dedicated Private AC Chauffeur</span>
                        </div>
                      </div>

                      <div className="result-detail-item">
                        <Star size={16} className="text-gold" />
                        <div>
                          <strong>Starting From</strong>
                          <span className="price-big">{formatPrice(wizardResult.estimatedCost)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="result-cta-buttons-row">
                      <button
                        type="button"
                        className="btn-result-view"
                        onClick={() => {
                          onClose();
                          if (onSelectTour) onSelectTour(wizardResult.matchedTour);
                        }}
                      >
                        <span>View Full Itinerary</span>
                        <ArrowRight size={16} />
                      </button>

                      <button
                        type="button"
                        className="btn-result-whatsapp"
                        onClick={() => handleWhatsAppInquiry(wizardResult.matchedTour)}
                      >
                        <MessageCircle size={18} />
                        <span>Book via WhatsApp Concierge</span>
                      </button>

                      <button
                        type="button"
                        className="btn-result-reset"
                        onClick={() => setStep(1)}
                      >
                        <RefreshCw size={14} />
                        <span>Plan Another</span>
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}

      </div>

      {/* COMPREHENSIVE LUXURY STYLES */}
      <style>{`
        .ai-concierge-modal {
          max-width: 960px;
          width: 95vw;
          height: 88vh;
          max-height: 850px;
          background: #001233;
          border: 1px solid rgba(255, 137, 47, 0.35);
          border-radius: 20px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.75), 0 0 40px rgba(255, 137, 47, 0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 0;
          color: #FFFFFF;
        }

        /* Top Bar */
        .ai-modal-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.15rem 1.5rem;
          background: rgba(0, 18, 51, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          gap: 1rem;
        }

        .ai-mascot-badge-wrap {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .ai-mascot-avatar-circle {
          position: relative;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255, 137, 47, 0.25) 0%, rgba(111, 230, 252, 0.2) 100%);
          border: 1.5px solid rgba(255, 137, 47, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          box-shadow: 0 0 16px rgba(255, 137, 47, 0.3);
          flex-shrink: 0;
        }

        .ai-avatar-wolf-img {
          width: 44px;
          height: 44px;
          object-fit: contain;
          margin-top: 2px;
        }

        .ai-online-beacon {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #10B981;
          border: 2px solid #001233;
          box-shadow: 0 0 8px #10B981;
        }

        .ai-brand-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #FFA459;
          margin-bottom: 0.15rem;
        }

        .ai-concierge-heading {
          font-size: 1.25rem;
          font-weight: 800;
          margin: 0;
          line-height: 1.2;
          color: #FFFFFF;
        }

        .ai-concierge-status {
          font-size: 0.78rem;
          color: #94A3B8;
          margin: 0.15rem 0 0 0;
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .status-dot-green {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
          display: inline-block;
        }

        .ai-top-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .ai-hotline-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 0.85rem;
          border-radius: 9999px;
          background: rgba(37, 211, 102, 0.15);
          border: 1px solid rgba(37, 211, 102, 0.45);
          color: #25D366;
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .ai-hotline-btn:hover {
          background: rgba(37, 211, 102, 0.25);
          transform: translateY(-1px);
        }

        .ai-close-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #CBD5E1;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ai-close-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          transform: rotate(90deg);
        }

        /* Mode Switcher */
        .ai-mode-tabs-bar {
          display: flex;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(0, 15, 40, 0.9);
        }

        .ai-mode-tab {
          flex: 1;
          padding: 0.75rem 1rem;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          color: #94A3B8;
          font-size: 0.88rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ai-mode-tab:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.03);
        }

        .ai-mode-tab.active {
          color: #FF892F;
          border-bottom-color: #FF892F;
          background: rgba(255, 137, 47, 0.06);
        }

        /* Chat View */
        .ai-chat-view-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: radial-gradient(circle at 50% 0%, rgba(255, 137, 47, 0.05) 0%, transparent 60%);
        }

        /* Quick Topics Bar */
        .ai-quick-topics-row {
          padding: 0.75rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(0, 18, 51, 0.6);
        }

        .ai-topic-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .topic-tab-pill {
          padding: 0.25rem 0.7rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #CBD5E1;
          font-size: 0.74rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .topic-tab-pill.active {
          background: rgba(255, 137, 47, 0.2);
          border-color: rgba(255, 137, 47, 0.5);
          color: #FFA459;
        }

        .ai-chips-scrollable {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 2px;
        }

        .ai-chips-scrollable::-webkit-scrollbar {
          display: none;
        }

        .ai-question-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #E2E8F0;
          font-size: 0.78rem;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ai-question-chip:hover {
          background: rgba(255, 137, 47, 0.15);
          border-color: rgba(255, 137, 47, 0.4);
          color: #FFFFFF;
          transform: translateY(-1px);
        }

        .chip-arrow {
          color: #FF892F;
        }

        /* Messages Scroll */
        .ai-chat-messages-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .chat-bubble-row {
          display: flex;
          gap: 0.75rem;
          max-width: 85%;
        }

        .user-row {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .assistant-row {
          align-self: flex-start;
        }

        .assistant-avatar-small {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 137, 47, 0.2);
          border: 1px solid rgba(255, 137, 47, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }

        .assistant-avatar-small img {
          width: 26px;
          height: 26px;
          object-fit: contain;
        }

        .chat-bubble {
          padding: 1rem 1.25rem;
          border-radius: 16px;
          font-size: 0.92rem;
          line-height: 1.6;
        }

        .user-bubble {
          background: linear-gradient(135deg, #FF892F 0%, #E06D14 100%);
          color: #FFFFFF;
          border-bottom-right-radius: 4px;
          box-shadow: 0 4px 15px rgba(255, 137, 47, 0.3);
        }

        .assistant-bubble {
          background: rgba(0, 24, 68, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #E2E8F0;
          border-bottom-left-radius: 4px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .chat-paragraph {
          margin: 0.35rem 0;
        }

        .chat-paragraph strong {
          color: #FFA459;
        }

        .line-spacer {
          height: 0.5rem;
        }

        .bubble-footer-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.6rem;
          margin-top: 0.5rem;
          font-size: 0.72rem;
          color: #94A3B8;
        }

        .bubble-model-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: #CBD5E1;
        }

        /* Matched Tour Cards inside chat */
        .chat-matched-tours-section {
          margin-top: 0.85rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .matched-tours-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: #FFA459;
          margin-bottom: 0.6rem;
        }

        .matched-tours-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 0.65rem;
        }

        .chat-tour-card {
          background: rgba(0, 18, 51, 0.85);
          border: 1px solid rgba(255, 137, 47, 0.3);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .chat-tour-card:hover {
          border-color: rgba(255, 137, 47, 0.6);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
        }

        .card-thumb-wrap {
          position: relative;
          height: 100px;
          overflow: hidden;
        }

        .card-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-duration-badge {
          position: absolute;
          bottom: 6px;
          left: 6px;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(4px);
          padding: 0.2rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .card-info-wrap {
          padding: 0.65rem;
        }

        .card-country-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.68rem;
          color: #94A3B8;
          text-transform: uppercase;
          font-weight: 700;
        }

        .card-tour-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0.2rem 0 0.4rem 0;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-price-row {
          display: flex;
          align-items: baseline;
          gap: 0.3rem;
          margin-bottom: 0.5rem;
        }

        .price-label {
          font-size: 0.68rem;
          color: #94A3B8;
        }

        .price-value {
          font-size: 0.95rem;
          font-weight: 800;
          color: #FF892F;
        }

        .price-sub {
          font-size: 0.65rem;
          color: #64748B;
        }

        .card-actions-row {
          display: flex;
          gap: 0.35rem;
        }

        .btn-card-itinerary {
          flex: 1;
          padding: 0.35rem 0.5rem;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.2rem;
          transition: all 0.2s ease;
        }

        .btn-card-itinerary:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .btn-card-whatsapp {
          padding: 0.35rem 0.6rem;
          border-radius: 6px;
          background: #25D366;
          border: none;
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: all 0.2s ease;
        }

        .btn-card-whatsapp:hover {
          background: #20BA56;
          transform: translateY(-1px);
        }

        /* Typing indicator */
        .typing-bubble {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FF892F;
          animation: typingDotBounce 1.4s infinite ease-in-out both;
        }

        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes typingDotBounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        .typing-hint {
          font-size: 0.8rem;
          color: #94A3B8;
          margin-left: 0.4rem;
          font-style: italic;
        }

        /* Chat Input */
        .ai-chat-input-area {
          padding: 0.85rem 1.25rem 1rem 1.25rem;
          background: rgba(0, 18, 51, 0.95);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .input-field-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 24, 68, 0.8);
          border: 1.5px solid rgba(255, 137, 47, 0.4);
          border-radius: 12px;
          padding: 0.35rem 0.5rem 0.35rem 1rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
        }

        .input-field-wrapper:focus-within {
          border-color: #FF892F;
          box-shadow: 0 0 20px rgba(255, 137, 47, 0.25);
        }

        .ai-chat-text-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #FFFFFF;
          font-size: 0.92rem;
        }

        .ai-chat-text-input::placeholder {
          color: #64748B;
        }

        .ai-send-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.1rem;
          border-radius: 8px;
          background: linear-gradient(135deg, #FF892F 0%, #E06D14 100%);
          border: none;
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ai-send-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(255, 137, 47, 0.4);
        }

        .ai-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .input-disclaimer-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
          font-size: 0.72rem;
          color: #64748B;
        }

        .disclaimer-dot {
          color: #475569;
        }

        /* Wizard Mode Styles */
        .ai-wizard-view-container {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }

        .wizard-progress-bar-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .wizard-steps-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .step-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #94A3B8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 800;
        }

        .step-circle.active {
          background: #FF892F;
          border-color: #FF892F;
          color: #FFFFFF;
          box-shadow: 0 0 10px rgba(255, 137, 47, 0.4);
        }

        .step-line {
          width: 40px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
        }

        .step-line.active {
          background: #FF892F;
        }

        .wizard-step-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 0.25rem 0;
          text-align: center;
        }

        .wizard-step-desc {
          font-size: 0.88rem;
          color: #94A3B8;
          text-align: center;
          margin: 0 0 1.5rem 0;
        }

        .wizard-options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 0.85rem;
          margin-bottom: 1.5rem;
        }

        .wizard-opt-btn {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 1rem;
          border-radius: 12px;
          background: rgba(0, 24, 68, 0.6);
          border: 1.5px solid rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .wizard-opt-btn:hover {
          border-color: rgba(255, 137, 47, 0.5);
          background: rgba(255, 137, 47, 0.08);
          transform: translateY(-2px);
        }

        .wizard-opt-btn.selected {
          border-color: #FF892F;
          background: rgba(255, 137, 47, 0.15);
          box-shadow: 0 0 20px rgba(255, 137, 47, 0.25);
        }

        .opt-icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 137, 47, 0.15);
          color: #FF892F;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .opt-text-wrap h4 {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0 0 0.2rem 0;
        }

        .opt-text-wrap p {
          font-size: 0.78rem;
          color: #94A3B8;
          margin: 0;
          line-height: 1.3;
        }

        .wizard-footer-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .custom-input-box {
          flex: 1;
        }

        .custom-input-box input {
          width: 100%;
          padding: 0.65rem 1rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          font-size: 0.85rem;
        }

        .btn-wizard-next, .btn-wizard-generate {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.4rem;
          border-radius: 8px;
          background: linear-gradient(135deg, #FF892F 0%, #E06D14 100%);
          border: none;
          color: #FFFFFF;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .btn-wizard-next:hover, .btn-wizard-generate:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(255, 137, 47, 0.4);
        }

        .btn-wizard-back {
          padding: 0.65rem 1.2rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #CBD5E1;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-wizard-back:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
        }

        /* Step 3 Settings */
        .wizard-row-settings {
          max-width: 650px;
          margin: 0 auto 1.5rem auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .setting-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          color: #FFA459;
          margin-bottom: 0.5rem;
        }

        .pills-selection-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 0.5rem;
        }

        .setting-pill {
          padding: 0.6rem 0.85rem;
          border-radius: 8px;
          background: rgba(0, 24, 68, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #CBD5E1;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .setting-pill.active {
          background: rgba(255, 137, 47, 0.2);
          border-color: #FF892F;
          color: #FFFFFF;
        }

        .guests-counter-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(0, 24, 68, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          width: fit-content;
        }

        .guests-counter-row button {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: rgba(255, 137, 47, 0.2);
          border: 1px solid rgba(255, 137, 47, 0.4);
          color: #FF892F;
          font-size: 1.1rem;
          font-weight: 800;
          cursor: pointer;
        }

        .count-number {
          font-size: 0.95rem;
          font-weight: 800;
          min-width: 110px;
          text-align: center;
        }

        /* Step 4 Hotel Tier */
        .hotel-tier-cards-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          max-width: 700px;
          margin: 0 auto 1.5rem auto;
        }

        .tier-select-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.15rem;
          border-radius: 12px;
          background: rgba(0, 24, 68, 0.6);
          border: 1.5px solid rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tier-select-card.active {
          border-color: #FF892F;
          background: rgba(255, 137, 47, 0.12);
        }

        .tier-check-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FF892F;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .tier-select-card.active .tier-check-circle {
          border-color: #FF892F;
        }

        .tier-text-block h4 {
          font-size: 1rem;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
        }

        .tier-text-block p {
          font-size: 0.82rem;
          color: #94A3B8;
          margin: 0;
          line-height: 1.4;
        }

        /* Step 5 Result */
        .wizard-result-card {
          max-width: 760px;
          margin: 0 auto;
        }

        .wizard-loading-box {
          text-align: center;
          padding: 3rem 1rem;
        }

        .loading-mascot-img {
          width: 80px;
          height: 80px;
          object-fit: contain;
          margin-bottom: 1rem;
          animation: mascotBob 1.5s infinite ease-in-out;
        }

        @keyframes mascotBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .result-content-wrap {
          background: rgba(0, 24, 68, 0.7);
          border: 1.5px solid rgba(255, 137, 47, 0.4);
          border-radius: 16px;
          padding: 1.75rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .result-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          background: rgba(255, 137, 47, 0.15);
          border: 1px solid rgba(255, 137, 47, 0.4);
          font-size: 0.74rem;
          font-weight: 800;
          color: #FFA459;
          margin-bottom: 0.5rem;
        }

        .result-header-banner h3 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 0.5rem 0;
        }

        .result-summary-text {
          font-size: 0.95rem;
          color: #CBD5E1;
          line-height: 1.5;
          margin: 0 0 1.25rem 0;
        }

        .result-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 0.85rem;
          background: rgba(0, 15, 40, 0.7);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .result-detail-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .result-detail-item strong {
          display: block;
          font-size: 0.72rem;
          color: #94A3B8;
          text-transform: uppercase;
        }

        .result-detail-item span {
          font-size: 0.88rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .price-big {
          font-size: 1.15rem !important;
          color: #FF892F !important;
          font-weight: 900 !important;
        }

        .result-cta-buttons-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .btn-result-view {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.2rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-result-view:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .btn-result-whatsapp {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.2rem;
          border-radius: 8px;
          background: #25D366;
          border: none;
          color: #FFFFFF;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-result-whatsapp:hover {
          background: #20BA56;
          transform: translateY(-1px);
        }

        .btn-result-reset {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #94A3B8;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-result-reset:hover {
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.3);
        }

        /* Responsive Mobile */
        @media (max-width: 768px) {
          .ai-concierge-modal {
            width: 100vw;
            height: 100vh;
            max-height: 100vh;
            border-radius: 0;
            border: none;
          }

          .ai-modal-top-bar {
            padding: 0.85rem 1rem;
          }

          .ai-concierge-heading {
            font-size: 1.05rem;
          }

          .hidden-mobile {
            display: none;
          }

          .ai-mode-tab {
            font-size: 0.78rem;
            padding: 0.65rem 0.5rem;
          }

          .chat-bubble-row {
            max-width: 96%;
          }

          .matched-tours-grid {
            grid-template-columns: 1fr;
          }

          .input-disclaimer-row {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
