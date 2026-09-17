import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Award, Send, CheckCircle2, Clock, MapPin, Hotel, Users, 
  ArrowRight, MessageCircle, Heart, ShieldCheck, Compass, 
  Landmark, Snowflake, Palmtree, Sun, Building2, Star, 
  ExternalLink, RefreshCw, ChevronRight, Bot, Car, Utensils, 
  Download, Share2, FileSpreadsheet, Printer, Map as MapIcon, SlidersHorizontal
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { TOURS_DATA } from '../data/toursData';
import { 
  askAIConcierge, 
  QUICK_PROMPTS, 
  parseTravelIntent, 
  generateComfyItinerary 
} from '../services/aiConciergeService';
import ComfySplitMap from './ComfySplitMap';
import ProximityPlacesDrawer from './ProximityPlacesDrawer';
import ItinerarySocialCardModal from './ItinerarySocialCardModal';
import { exportItineraryToExcel, printPdfBrochure } from '../services/itineraryExportService';

const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';
const mascotDefaultSrc = `${basePrefix}mascot-default.png`;
const mascotReactionSrc = `${basePrefix}mascot-reaction.png`;

export default function AITripPlannerModal({ isOpen = true, onClose, onSelectTour, onBookCustomTrip }) {
  const { formatPrice } = useCurrency();

  // Mode: 'planner' (Interactive Split-Screen Map & Schedule) | 'chat' (Conversational Assistant)
  const [activeTab, setActiveTab] = useState('planner');

  // Conversational Search Input (KAYAK Style)
  const [conversationalQuery, setConversationalQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Active Trip Plan State (Generated via Intent or default signature trip)
  const [tripPlan, setTripPlan] = useState(() => {
    return generateComfyItinerary(parseTravelIntent('7 days in Kashmir for parents who need relaxed pacing, pure veg meals, and a private Innova Hycross'));
  });

  // Split-Screen Interactive State
  const [activeDay, setActiveDay] = useState(1);
  const [selectedStop, setSelectedStop] = useState(null);

  // Modals
  const [isSocialCardOpen, setIsSocialCardOpen] = useState(false);

  // Chat State
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `**Namaste! I am Comfy.ai, your friendly travel assistant at Comfort Journey (Est. 1992).** 🌟\n\nI can help plan comfortable, personalized vacations across India and 2,000+ destinations worldwide — with verified hotels, private cars with courteous drivers, and pure vegetarian or Jain dining arrangements.\n\n*Speak to me naturally just like asking a travel friend!*`,
      tours: TOURS_DATA.filter(t => t.id.includes('peace-in-the-pines') || t.id.includes('bali')).slice(0, 2),
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeTab]);

  // Set initial selected stop when activeDay changes
  useEffect(() => {
    if (tripPlan?.days) {
      const currentDay = tripPlan.days.find(d => d.day === activeDay) || tripPlan.days[0];
      if (currentDay?.stops?.length) {
        setSelectedStop(currentDay.stops[0]);
      }
    }
  }, [activeDay, tripPlan]);

  if (!isOpen) return null;

  // Handle Conversational Query Submission (KAYAK Style)
  const handleConversationalSubmit = (overrideText) => {
    const queryToUse = (overrideText || conversationalQuery).trim();
    if (!queryToUse) return;

    setIsGenerating(true);
    try {
      const parsed = parseTravelIntent(queryToUse);
      const newTrip = generateComfyItinerary(parsed);

      setTimeout(() => {
        setTripPlan(newTrip);
        setActiveDay(1);
        setSelectedStop(newTrip.days[0]?.stops[0] || null);
        setActiveTab('planner');
        setIsGenerating(false);
      }, 500);
    } catch (err) {
      console.error('Error generating trip itinerary:', err);
      setIsGenerating(false);
    }
  };

  // Handle Chat message
  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || chatInput).trim();
    if (!text || isTyping) return;

    setChatInput('');
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

      if (response.generatedTrip) {
        setTripPlan(response.generatedTrip);
      }

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
      console.error('Error in Comfy.ai chat:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'I apologize for the brief pause. Please feel free to ask again or WhatsApp our trip curators directly at +91 8770403315.',
          tours: [],
          time: 'Just now'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Quick WhatsApp Booking Link with prefilled custom itinerary
  const handleWhatsAppBooking = () => {
    const message = encodeURIComponent(
      `Hi Comfort Journey! I am reviewing a personalized vacation itinerary on your website:\n` +
      `📍 Destination: ${tripPlan.destination}\n` +
      `📅 Duration: ${tripPlan.duration}\n` +
      `👥 Travelers: ${tripPlan.party} (${tripPlan.pacing})\n` +
      `🚗 Vehicle: ${tripPlan.vehicle}\n` +
      `🍲 Meals: ${tripPlan.dietary}\n` +
      `🏨 Stay Tier: ${tripPlan.stayTier}\n\n` +
      `Please connect me with a friendly trip manager to confirm dates and final package pricing!`
    );
    window.open(`https://wa.me/918770403315?text=${message}`, '_blank');
  };

  // Customizer: Pacing toggle
  const handleTogglePacing = (newPacing) => {
    setTripPlan(prev => ({
      ...prev,
      pacing: newPacing,
      subtitle: `Personalized for ${prev.party} · ${prev.vehicle} · ${newPacing}`
    }));
  };

  // Customizer: Vehicle toggle
  const handleChangeVehicle = (newVehicle) => {
    setTripPlan(prev => {
      const updated = { ...prev, vehicle: newVehicle };
      updated.days = prev.days.map(d => ({
        ...d,
        stops: d.stops.map(s => s.type === 'transport' ? { ...s, subtitle: `${newVehicle} with courteous driver` } : s)
      }));
      return updated;
    });
  };

  // Customizer: Stay Tier toggle
  const handleChangeStayTier = (newTier) => {
    setTripPlan(prev => ({
      ...prev,
      stayTier: newTier,
      price: newTier.includes('5★') ? prev.price + 12000 : prev.price
    }));
  };

  const activeDayData = tripPlan?.days?.find(d => d.day === activeDay) || tripPlan?.days?.[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content comfy-ai-planner-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* TOP BRAND HEADER (COMFY.AI) */}
        <div className="comfy-modal-top-bar">
          <div className="comfy-brand-group">
            <div className="comfy-mascot-avatar-circle">
              <img 
                src={mascotDefaultSrc} 
                alt="Comfy Wolf Mascot" 
                className="comfy-avatar-img"
                onError={(e) => { e.currentTarget.src = './mascot-default.png'; }}
              />
              <span className="comfy-online-beacon" />
            </div>

            <div className="comfy-title-meta">
              <div className="comfy-est-tag">
                <Award size={13} className="text-amber" />
                <span>COMFORT JOURNEY • EST. 1992</span>
              </div>
              <h2 className="comfy-planner-heading">
                Comfy.ai <span className="text-amber">Travel Planner</span>
              </h2>
              <p className="comfy-planner-subtitle">
                <span className="status-dot-green" />
                <span>Live Map & Route Itinerary • Personalized Holidays Planned Just for You</span>
              </p>
            </div>
          </div>

          <div className="comfy-top-actions">
            <a 
              href="https://wa.me/918770403315" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="comfy-hotline-pill"
              title="Speak with friendly Trip Manager"
            >
              <MessageCircle size={15} />
              <span className="hidden-mobile">+91 8770403315</span>
            </a>

            <button className="comfy-close-btn" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* KAYAK-STYLE CONVERSATIONAL SEARCH BAR */}
        <div className="comfy-conversational-search-section">
          <div className="search-bar-inner">
            <Compass size={20} className="search-compass-icon text-amber" />
            <input 
              type="text"
              className="conversational-input"
              placeholder='Speak naturally: e.g. "7 days in Kashmir for parents who need relaxed pacing, pure veg meals, and a private Innova Hycross"'
              value={conversationalQuery}
              onChange={(e) => setConversationalQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleConversationalSubmit();
              }}
            />
            <button 
              type="button" 
              className="btn-plan-journey"
              onClick={() => handleConversationalSubmit()}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <span>Planning...</span>
              ) : (
                <>
                  <Compass size={15} />
                  <span>Plan My Vacation</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Conversational Prompt Chips (1-Click KAYAK Experience) */}
          <div className="conversational-chips-row">
            <span className="chips-label">Try asking:</span>
            {[
              '7 days in Kashmir for parents with relaxed pacing & Innova Hycross',
              '5 days Bali honeymoon with private pool villa & veg meals',
              '4 days Dubai family trip with desert safari & Burj Khalifa'
            ].map((chip, idx) => (
              <button 
                key={idx}
                type="button"
                className="query-suggestion-chip"
                onClick={() => {
                  setConversationalQuery(chip);
                  handleConversationalSubmit(chip);
                }}
              >
                <span>{chip}</span>
                <ChevronRight size={12} />
              </button>
            ))}
          </div>
        </div>

        {/* MODE TABS BAR: SPLIT-SCREEN PLANNER vs CHAT */}
        <div className="comfy-mode-tabs-bar">
          <button 
            type="button"
            className={`comfy-tab-btn ${activeTab === 'planner' ? 'active' : ''}`}
            onClick={() => setActiveTab('planner')}
          >
            <MapIcon size={16} />
            <span>Interactive Split-Screen Map & Schedule</span>
          </button>

          <button 
            type="button"
            className={`comfy-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <Bot size={16} />
            <span>Ask Comfy.ai Anything (Advice & Tips)</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: INTERACTIVE SPLIT-SCREEN TRIP PLANNER (TRIP.COM STYLE)
            ========================================================================= */}
        {activeTab === 'planner' && (
          <div className="comfy-split-planner-view">
            
            {/* LEFT HALF: DAY-BY-DAY ITINERARY SCHEDULE & CUSTOMIZER */}
            <div className="planner-left-panel">
              
              {/* Trip Overview Banner */}
              <div className="trip-overview-card glass-panel">
                <div className="overview-badges-wrap">
                  <span className="pill-badge pill-amber">{tripPlan.destination}</span>
                  <span className="pill-badge pill-emerald">{tripPlan.duration}</span>
                  <span className="pill-badge pill-cyan">{tripPlan.party}</span>
                </div>

                <h3 className="trip-overview-title">{tripPlan.title}</h3>
                <p className="trip-overview-subtitle">{tripPlan.subtitle}</p>

                {/* Interactive Customizer Bar (Pacing, Vehicle, Stay Tier) */}
                <div className="quick-customizer-bar">
                  <div className="customizer-item">
                    <span className="customizer-label">Pacing:</span>
                    <div className="customizer-options">
                      {['Relaxed Pace', 'Balanced Pace'].map(p => (
                        <button
                          key={p}
                          type="button"
                          className={`mini-pill ${tripPlan.pacing.includes(p.split(' ')[0]) ? 'active' : ''}`}
                          onClick={() => handleTogglePacing(p)}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="customizer-item">
                    <span className="customizer-label">Vehicle:</span>
                    <div className="customizer-options">
                      {['Innova Hycross', 'Innova Crysta', 'Luxury Sedan'].map(v => (
                        <button
                          key={v}
                          type="button"
                          className={`mini-pill ${tripPlan.vehicle.includes(v) ? 'active' : ''}`}
                          onClick={() => handleChangeVehicle(`Private Toyota ${v} (AC)`)}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Day Selector Tabs Bar */}
              <div className="planner-day-tabs-row">
                <span className="day-tabs-heading">Schedule:</span>
                <div className="day-tabs-scroll">
                  {tripPlan.days?.map(d => (
                    <button
                      key={d.day}
                      type="button"
                      className={`planner-day-pill ${activeDay === d.day ? 'active' : ''}`}
                      onClick={() => {
                        setActiveDay(d.day);
                        setSelectedStop(d.stops[0] || null);
                      }}
                    >
                      <span>Day {d.day}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Day Header & Route Summary */}
              {activeDayData && (
                <div className="active-day-header-box">
                  <div className="day-header-top">
                    <h4 className="active-day-title">
                      Day {activeDayData.day}: {activeDayData.title}
                    </h4>
                    <span className="day-travel-badge">
                      <Car size={13} />
                      <span>{activeDayData.travelDistance}</span>
                    </span>
                  </div>
                  <p className="active-day-desc">{activeDayData.summary}</p>
                </div>
              )}

              {/* Day Stops Timeline */}
              <div className="day-timeline-list">
                {activeDayData?.stops?.map((stop, idx) => {
                  const isSelected = selectedStop?.title === stop.title;
                  return (
                    <div 
                      key={idx} 
                      className={`timeline-stop-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedStop(stop)}
                    >
                      <div className="timeline-pin-number">
                        <span>{idx + 1}</span>
                      </div>

                      <div className="timeline-stop-body">
                        <div className="stop-meta-line">
                          <span className="stop-time">
                            <Clock size={12} />
                            <span>{stop.time}</span>
                          </span>
                          <span className={`stop-type-badge type-${stop.type}`}>
                            {stop.type}
                          </span>
                          {stop.ticketStatus && (
                            <span className="stop-ticket-badge">
                              {stop.ticketStatus}
                            </span>
                          )}
                        </div>

                        <h4 className="stop-title">{stop.title}</h4>
                        <p className="stop-subtitle">{stop.subtitle}</p>

                        {/* If this stop is selected, render Trip.com-style Proximity Drawer */}
                        {isSelected && (
                          <ProximityPlacesDrawer stop={stop} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* RIGHT HALF: INTERACTIVE LEAFLET VECTOR MAP (TRIP.COM STYLE) */}
            <div className="planner-right-panel">
              <ComfySplitMap 
                activeDay={activeDay}
                days={tripPlan.days}
                selectedStop={selectedStop}
                onSelectStop={(stop) => setSelectedStop(stop)}
                destinationName={tripPlan.destination}
              />
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 2: CONVERSATIONAL CHATBOT (COMFY.AI ASSISTANT)
            ========================================================================= */}
        {activeTab === 'chat' && (
          <div className="comfy-chat-view-container">
            <div className="comfy-chat-messages-scroll">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-bubble-row ${msg.role === 'user' ? 'user-row' : 'assistant-row'}`}>
                  {msg.role === 'assistant' && (
                    <div className="assistant-avatar-small">
                      <img 
                        src={mascotDefaultSrc} 
                        alt="Comfy" 
                        onError={(e) => { e.currentTarget.src = './mascot-default.png'; }}
                      />
                    </div>
                  )}

                  <div className={`chat-bubble ${msg.role === 'user' ? 'user-bubble' : 'assistant-bubble'}`}>
                    <div className="bubble-content-text">
                      {msg.content.split('\n').map((line, lIdx) => {
                        if (!line.trim()) return <div key={lIdx} className="line-spacer" />;
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

                    {msg.tours && msg.tours.length > 0 && (
                      <div className="chat-matched-tours-section">
                        <div className="matched-tours-header">
                          <Compass size={13} className="text-amber" />
                          <span>Curated Comfort Journey Holidays:</span>
                        </div>

                        <div className="matched-tours-grid">
                          {msg.tours.map(tour => (
                            <div key={tour.id} className="chat-tour-card glass-card">
                              <div className="card-thumb-wrap">
                                <img src={tour.image} alt={tour.name} className="card-thumb-img" loading="lazy" />
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
                                  <span className="price-label">Starting From</span>
                                  <span className="price-value">{formatPrice(tour.price)}</span>
                                </div>
                                <div className="card-actions-row">
                                  <button
                                    type="button"
                                    className="btn-card-itinerary"
                                    onClick={() => {
                                      setConversationalQuery(tour.name);
                                      handleConversationalSubmit(tour.name);
                                    }}
                                  >
                                    <span>Open in Split Map</span>
                                    <ChevronRight size={13} />
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

              {isTyping && (
                <div className="chat-bubble-row assistant-row">
                  <div className="assistant-avatar-small">
                    <img 
                      src={mascotReactionSrc} 
                      alt="Comfy Typing" 
                      onError={(e) => { e.currentTarget.src = './mascot-reaction.png'; }}
                    />
                  </div>
                  <div className="chat-bubble assistant-bubble typing-bubble">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-hint">Comfy.ai is planning your personalized trip...</span>
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
                  placeholder="Ask about hotels, pure veg food, Kashmir snow, private cars, or custom dates..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={isTyping}
                />
                
                <button
                  type="button"
                  className="ai-send-btn"
                  onClick={() => handleSendMessage()}
                  disabled={!chatInput.trim() || isTyping}
                >
                  <Send size={16} />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM EXPORT & BOOKING ACTION BAR (TRIP.COM INSPIRED) */}
        <div className="comfy-bottom-action-bar">
          <div className="export-buttons-group">
            <button
              type="button"
              className="btn-export-tool social-card-btn"
              onClick={() => setIsSocialCardOpen(true)}
              title="Download 9:16 Social Story Card for WhatsApp & Instagram"
            >
              <Share2 size={15} />
              <span>Social Share Card</span>
            </button>

            <button
              type="button"
              className="btn-export-tool excel-btn"
              onClick={() => exportItineraryToExcel(tripPlan)}
              title="Download day-by-day table in Excel format"
            >
              <FileSpreadsheet size={15} />
              <span>Download Excel</span>
            </button>

            <button
              type="button"
              className="btn-export-tool pdf-btn"
              onClick={() => printPdfBrochure(tripPlan)}
              title="Print or Save official PDF Vacation Brochure"
            >
              <Printer size={15} />
              <span>PDF Brochure</span>
            </button>
          </div>

          <div className="pricing-and-whatsapp-group">
            <div className="bottom-price-box">
              <span className="price-caption">Starting From</span>
              <span className="price-amount">{formatPrice(tripPlan.price)}</span>
              <span className="price-unit">/ person</span>
            </div>

            <button
              type="button"
              className="btn-book-whatsapp"
              onClick={handleWhatsAppBooking}
            >
              <MessageCircle size={17} />
              <span>Book via WhatsApp</span>
            </button>
          </div>
        </div>

      </div>

      {/* Social Card Preview Modal */}
      <ItinerarySocialCardModal 
        isOpen={isSocialCardOpen}
        onClose={() => setIsSocialCardOpen(false)}
        tripPlan={tripPlan}
      />

      {/* COMPREHENSIVE STYLES */}
      <style>{`
        .comfy-ai-planner-modal {
          max-width: 1280px;
          width: 96vw;
          height: 92vh;
          max-height: 920px;
          background: #001233;
          border: 1px solid rgba(255, 137, 47, 0.4);
          border-radius: 20px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(255, 137, 47, 0.25);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 0;
          color: #FFFFFF;
        }

        /* Top Brand Bar */
        .comfy-modal-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 18px;
          background: rgba(0, 18, 51, 0.96);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          gap: 12px;
          flex-shrink: 0;
        }

        .comfy-brand-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .comfy-mascot-avatar-circle {
          position: relative;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255, 137, 47, 0.25) 0%, rgba(111, 230, 252, 0.2) 100%);
          border: 1.5px solid rgba(255, 137, 47, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .comfy-avatar-img {
          width: 38px;
          height: 38px;
          object-fit: contain;
        }

        .comfy-online-beacon {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10B981;
          border: 2px solid #001233;
        }

        .comfy-est-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.8px;
          color: #FF892F;
        }

        .comfy-planner-heading {
          margin: 0;
          font-size: 1.15rem;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.2;
        }

        .comfy-planner-subtitle {
          margin: 0;
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.7);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-dot-green {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
          display: inline-block;
        }

        .comfy-top-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .comfy-hotline-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(37, 211, 102, 0.15);
          border: 1px solid rgba(37, 211, 102, 0.4);
          color: #25D366;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-decoration: none;
        }

        .comfy-close-btn {
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: #FFFFFF;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        /* KAYAK-Style Conversational Search Section */
        .comfy-conversational-search-section {
          background: #001A44;
          padding: 10px 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-shrink: 0;
        }

        .search-bar-inner {
          display: flex;
          align-items: center;
          background: rgba(0, 12, 36, 0.9);
          border: 1.5px solid rgba(255, 137, 47, 0.5);
          border-radius: 30px;
          padding: 4px 6px 4px 16px;
          gap: 10px;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
        }

        .search-compass-icon {
          flex-shrink: 0;
        }

        .conversational-input {
          flex: 1;
          background: none;
          border: none;
          color: #FFFFFF;
          font-size: 0.88rem;
          outline: none;
        }

        .conversational-input::placeholder {
          color: rgba(255, 255, 255, 0.45);
        }

        .btn-plan-journey {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #FF892F 0%, #FF6B00 100%);
          color: #001233;
          border: none;
          padding: 8px 18px;
          border-radius: 24px;
          font-weight: 800;
          font-size: 0.82rem;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(255, 137, 47, 0.35);
        }

        .conversational-chips-row {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .chips-label {
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.55);
          white-space: nowrap;
        }

        .query-suggestion-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.85);
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 0.72rem;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .query-suggestion-chip:hover {
          background: rgba(255, 137, 47, 0.15);
          border-color: #FF892F;
          color: #FFFFFF;
        }

        /* Mode Tabs Bar */
        .comfy-mode-tabs-bar {
          display: flex;
          background: rgba(0, 18, 51, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0 18px;
          gap: 16px;
          flex-shrink: 0;
        }

        .comfy-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 4px;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: rgba(255, 255, 255, 0.65);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
        }

        .comfy-tab-btn.active {
          color: #FF892F;
          border-bottom-color: #FF892F;
        }

        /* =========================================================================
           SPLIT-SCREEN TRIP PLANNER (50% Schedule / 50% Map)
           ========================================================================= */
        .comfy-split-planner-view {
          display: grid;
          grid-template-columns: 1fr 1fr;
          flex: 1;
          overflow: hidden;
          background: #001233;
        }

        /* Left Schedule Panel */
        .planner-left-panel {
          overflow-y: auto;
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Trip Overview Card */
        .trip-overview-card {
          background: rgba(0, 24, 69, 0.7);
          border: 1px solid rgba(255, 137, 47, 0.3);
          border-radius: 14px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .overview-badges-wrap {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .pill-badge {
          padding: 3px 9px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .pill-amber { background: rgba(255, 137, 47, 0.15); color: #FF892F; border: 1px solid rgba(255, 137, 47, 0.35); }
        .pill-emerald { background: rgba(16, 185, 129, 0.15); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.35); }
        .pill-cyan { background: rgba(111, 230, 252, 0.15); color: #6FE6FC; border: 1px solid rgba(111, 230, 252, 0.35); }

        .trip-overview-title {
          margin: 0;
          font-size: 1.12rem;
          font-weight: 800;
          color: #FFFFFF;
        }

        .trip-overview-subtitle {
          margin: 0;
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.75);
        }

        .quick-customizer-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 6px;
          padding-top: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .customizer-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .customizer-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.6);
        }

        .customizer-options {
          display: flex;
          gap: 4px;
        }

        .mini-pill {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 2px 8px;
          font-size: 0.68rem;
          cursor: pointer;
        }

        .mini-pill.active {
          background: #FF892F;
          color: #001233;
          font-weight: 800;
          border-color: #FF892F;
        }

        /* Day Tabs Bar */
        .planner-day-tabs-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .day-tabs-heading {
          font-size: 0.75rem;
          font-weight: 700;
          color: #FF892F;
          text-transform: uppercase;
        }

        .day-tabs-scroll {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .planner-day-pill {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #FFFFFF;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .planner-day-pill.active {
          background: #FF892F;
          color: #001233;
          border-color: #FF892F;
          box-shadow: 0 0 14px rgba(255, 137, 47, 0.4);
        }

        /* Active Day Header */
        .active-day-header-box {
          background: rgba(0, 18, 51, 0.5);
          border-left: 3px solid #FF892F;
          padding: 8px 12px;
          border-radius: 4px 8px 8px 4px;
        }

        .day-header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .active-day-title {
          margin: 0;
          font-size: 0.92rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .day-travel-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(111, 230, 252, 0.15);
          color: #6FE6FC;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.68rem;
          font-weight: 700;
        }

        .active-day-desc {
          margin: 0;
          font-size: 0.74rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Timeline Stops */
        .day-timeline-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .timeline-stop-card {
          display: flex;
          gap: 12px;
          background: rgba(0, 20, 56, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .timeline-stop-card:hover {
          background: rgba(0, 28, 80, 0.65);
          border-color: rgba(255, 137, 47, 0.3);
        }

        .timeline-stop-card.selected {
          background: rgba(0, 32, 90, 0.85);
          border-color: #FF892F;
          box-shadow: 0 4px 20px rgba(255, 137, 47, 0.18);
        }

        .timeline-pin-number {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #FF892F;
          color: #001233;
          font-weight: 800;
          font-size: 0.82rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .timeline-stop-body {
          flex: 1;
          min-width: 0;
        }

        .stop-meta-line {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .stop-time {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          font-weight: 700;
          color: #6FE6FC;
        }

        .stop-type-badge {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 1px 6px;
          border-radius: 4px;
        }

        .type-transport { background: #0369A1; color: #E0F2FE; }
        .type-sightseeing { background: #B45309; color: #FEF3C7; }
        .type-meal { background: #15803D; color: #DCFCE7; }
        .type-hotel { background: #7E22CE; color: #F3E8FF; }

        .stop-ticket-badge {
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .stop-title {
          margin: 0 0 3px 0;
          font-size: 0.88rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .stop-subtitle {
          margin: 0;
          font-size: 0.74rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Right Map Panel */
        .planner-right-panel {
          height: 100%;
          position: relative;
          padding: 14px 18px 14px 0;
        }

        /* =========================================================================
           CHAT VIEW CONTAINER
           ========================================================================= */
        .comfy-chat-view-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #001233;
        }

        .comfy-chat-messages-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .chat-bubble-row {
          display: flex;
          gap: 10px;
          max-width: 82%;
        }

        .chat-bubble-row.user-row {
          margin-left: auto;
          flex-direction: row-reverse;
        }

        .assistant-avatar-small {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255, 137, 47, 0.2);
          border: 1px solid #FF892F;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .assistant-avatar-small img {
          width: 26px;
          height: 26px;
          object-fit: contain;
        }

        .chat-bubble {
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 0.84rem;
          line-height: 1.5;
        }

        .assistant-bubble {
          background: #001A44;
          border: 1px solid rgba(255, 137, 47, 0.3);
          color: #FFFFFF;
          border-top-left-radius: 4px;
        }

        .user-bubble {
          background: #FF892F;
          color: #001233;
          font-weight: 600;
          border-top-right-radius: 4px;
        }

        .chat-matched-tours-section {
          margin-top: 12px;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .matched-tours-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #FF892F;
          margin-bottom: 8px;
        }

        .matched-tours-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
        }

        .chat-tour-card {
          background: rgba(0, 12, 36, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }

        .card-thumb-wrap {
          position: relative;
          height: 90px;
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
          background: rgba(0, 0, 0, 0.7);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.65rem;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .card-info-wrap {
          padding: 8px;
        }

        .card-tour-name {
          margin: 3px 0 6px 0;
          font-size: 0.78rem;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-price-row {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 8px;
        }

        .price-label { font-size: 0.65rem; color: rgba(255, 255, 255, 0.6); }
        .price-value { font-size: 0.82rem; font-weight: 800; color: #FF892F; }

        .btn-card-itinerary {
          width: 100%;
          background: #FF892F;
          color: #001233;
          border: none;
          padding: 5px 8px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          cursor: pointer;
        }

        .bubble-footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 6px;
          font-size: 0.68rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .bubble-model-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #10B981;
        }

        .typing-bubble {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FF892F;
          animation: typingPulse 1s infinite alternate;
        }

        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingPulse {
          0% { transform: translateY(0); opacity: 0.4; }
          100% { transform: translateY(-4px); opacity: 1; }
        }

        .typing-hint {
          font-size: 0.74rem;
          color: rgba(255, 255, 255, 0.7);
          margin-left: 4px;
        }

        .ai-chat-input-area {
          padding: 12px 18px;
          background: rgba(0, 18, 51, 0.95);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .input-field-wrapper {
          display: flex;
          gap: 8px;
          background: rgba(0, 12, 36, 0.9);
          border: 1px solid rgba(255, 137, 47, 0.4);
          border-radius: 26px;
          padding: 4px 6px 4px 16px;
        }

        .ai-chat-text-input {
          flex: 1;
          background: none;
          border: none;
          color: #FFFFFF;
          font-size: 0.85rem;
          outline: none;
        }

        .ai-send-btn {
          background: #FF892F;
          color: #001233;
          border: none;
          padding: 7px 16px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.78rem;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }

        /* =========================================================================
           BOTTOM EXPORT & BOOKING BAR
           ========================================================================= */
        .comfy-bottom-action-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 18px;
          background: rgba(0, 14, 40, 0.98);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
          gap: 12px;
          flex-wrap: wrap;
        }

        .export-buttons-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-export-tool {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #FFFFFF;
          padding: 7px 12px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-export-tool:hover {
          background: rgba(255, 137, 47, 0.2);
          border-color: #FF892F;
          color: #FF892F;
        }

        .pricing-and-whatsapp-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .bottom-price-box {
          display: flex;
          align-items: baseline;
          gap: 5px;
        }

        .price-caption {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .price-amount {
          font-size: 1.15rem;
          font-weight: 800;
          color: #FF892F;
        }

        .price-unit {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .btn-book-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #25D366;
          color: #FFFFFF;
          border: none;
          padding: 9px 18px;
          border-radius: 24px;
          font-weight: 800;
          font-size: 0.84rem;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(37, 211, 102, 0.35);
          transition: transform 0.15s ease;
        }

        .btn-book-whatsapp:hover {
          transform: translateY(-1px);
        }

        /* Mobile Responsiveness */
        @media (max-width: 900px) {
          .comfy-split-planner-view {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 340px;
          }

          .planner-right-panel {
            padding: 0 14px 14px 14px;
          }

          .comfy-bottom-action-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .export-buttons-group {
            justify-content: space-between;
          }

          .btn-export-tool {
            flex: 1;
            justify-content: center;
          }

          .pricing-and-whatsapp-group {
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}
