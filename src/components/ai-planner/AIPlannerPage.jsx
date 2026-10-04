import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { parseTravelIntent, generateComfyItinerary, askAIConcierge, QUICK_PROMPTS } from '../../services/aiConciergeService';
import { exportItineraryToExcel, printPdfBrochure, generateSocialCardDataUrl } from '../../services/itineraryExportService';
import AIPlannerLayout from './components/AIPlannerLayout';
import ConversationalSearch from './components/ConversationalSearch';
import TripSummaryCard from './components/TripSummaryCard';
import DayTabs from './components/DayTabs';
import TimelineList from './components/TimelineList';
import MapPanel from './components/MapPanel';
import MapBottomSheet from './components/MapBottomSheet';
import CustomizeSheet from './components/CustomizeSheet';
import FloatingAIButton from './components/FloatingAIButton';
import ChatPanel from './components/ChatPanel';
import BottomActionBar from './components/BottomActionBar';
import ExportMenu from './components/ExportMenu';
import SocialCardModal from './components/SocialCardModal';
import { useResponsiveLayout } from './hooks/useResponsiveLayout';
import { useTripPlan } from './hooks/useTripPlan';
import { useMapSync } from './hooks/useMapSync';
import { useChatPlannerBridge } from './hooks/useChatPlannerBridge';
import { useURLState } from './hooks/useURLState';
import { serializeTripPlan, deserializeTripPlan } from './utils/tripPlanSerializer';
import './styles/ai-planner.css';

const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';
const mascotDefaultSrc = `${basePrefix}mascot-default.png`;
const mascotReactionSrc = `${basePrefix}mascot-reaction.png`;

export default function AIPlannerPage({ onBackToHome, onOpenQuote }) {
  const { formatPrice } = useCurrency();
  const { isMobile, isTablet, isDesktop, mapHeight, layoutMode } = useResponsiveLayout();
  
  // Trip plan state with URL persistence
  const [tripPlan, setTripPlan, resetTripPlan] = useTripPlan();
  const [activeDay, setActiveDay] = useState(1);
  const [selectedStop, setSelectedStop] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // UI State
  const [showCustomizeSheet, setShowCustomizeSheet] = useState(false);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [showSocialCardModal, setShowSocialCardModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [proximityExpandedStop, setProximityExpandedStop] = useState(null);
  
  // Chat state
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `**Namaste! I am Comfy.ai, your friendly travel assistant at Comfort Journey (Est. 1992).** 🌟\n\nI can help plan comfortable, personalized vacations across India and 2,000+ destinations worldwide — with verified hotels, private cars with courteous drivers, and pure vegetarian or Jain dining arrangements.\n\n*Speak to me naturally just like asking a travel friend!*`,
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  // URL State for shareable links
  const { updateURL, replaceURL } = useURLState();

  // Map synchronization
  const { 
    mapInstance, 
    setMapInstance, 
    flyToStop, 
    updateMapForDay, 
    updateMapForRouteMode 
  } = useMapSync(tripPlan, activeDay);

  // Chat-Planner bridge
  const { 
    handleChatMessage, 
    handlePlannerAction,
    chatContext 
  } = useChatPlannerBridge({
    tripPlan,
    setTripPlan,
    setActiveDay,
    setSelectedStop,
    activeDay,
    selectedStop,
    messages,
    setMessages,
    isTyping,
    setIsTyping
  });

  // Initialize with default trip or from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let savedPlan = urlParams.get('plan');
    if (!savedPlan && window.location.hash.includes('?')) {
      const hashQuery = window.location.hash.split('?')[1];
      savedPlan = new URLSearchParams(hashQuery).get('plan');
    }
    
    if (savedPlan) {
      try {
        const parsed = deserializeTripPlan(savedPlan);
        if (parsed) {
          setTripPlan(parsed);
          setActiveDay(1);
          setSelectedStop(parsed.days[0]?.stops[0] || null);
          return;
        }
      } catch (e) {
        console.warn('Failed to parse URL plan:', e);
      }
    }
    
    // Default trip if no URL state
    if (!tripPlan) {
      const defaultPlan = generateComfyItinerary(
        parseTravelIntent('7 days in Kashmir for parents who need relaxed pacing, pure veg meals, and a private Innova Hycross')
      );
      setTripPlan(defaultPlan);
      setActiveDay(1);
      setSelectedStop(defaultPlan.days[0]?.stops[0] || null);
    }
  }, []);

  // Sync URL when trip plan changes (debounced)
  useEffect(() => {
    if (!tripPlan) return;
    const timeout = setTimeout(() => {
      const serialized = serializeTripPlan(tripPlan);
      updateURL({ plan: serialized });
    }, 500);
    return () => clearTimeout(timeout);
  }, [tripPlan, updateURL]);

  // Scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle conversational search submission
  const handleConversationalSubmit = useCallback(async (query) => {
    if (!query?.trim() || isGenerating) return;
    
    setIsGenerating(true);
    try {
      const parsed = parseTravelIntent(query);
      const newTrip = generateComfyItinerary(parsed);
      
      setTimeout(() => {
        setTripPlan(newTrip);
        setActiveDay(1);
        setSelectedStop(newTrip.days[0]?.stops[0] || null);
        setIsGenerating(false);
        
        // Close chat panel on mobile after generating
        if (isMobile) setShowChatPanel(false);
      }, 500);
    } catch (err) {
      console.error('Error generating trip:', err);
      setIsGenerating(false);
    }
  }, [isGenerating, setTripPlan, isMobile]);

  // Handle quick prompt click
  const handleQuickPrompt = (prompt) => {
    handleConversationalSubmit(prompt);
  };

  // Handle day change
  const handleDayChange = useCallback((day) => {
    setActiveDay(day);
    const dayData = tripPlan?.days?.find(d => d.day === day);
    setSelectedStop(dayData?.stops[0] || null);
    updateMapForDay(day);
  }, [tripPlan, updateMapForDay]);

  // Handle stop selection
  const handleStopSelect = useCallback((stop) => {
    setSelectedStop(stop);
    flyToStop(stop);
    // Close proximity for other stops
    setProximityExpandedStop(prev => prev?.title === stop.title ? null : stop);
  }, [flyToStop]);

  // Handle proximity toggle
  const handleProximityToggle = useCallback((stop) => {
    setProximityExpandedStop(prev => prev?.title === stop.title ? null : stop);
  }, []);

  // Handle customize changes
  const handlePacingChange = (pacing) => {
    setTripPlan(prev => ({
      ...prev,
      pacing,
      subtitle: `Personalized for ${prev.party} · ${prev.vehicle} · ${pacing}`
    }));
  };

  const handleVehicleChange = (vehicle) => {
    setTripPlan(prev => {
      const updated = { ...prev, vehicle };
      updated.days = prev.days.map(d => ({
        ...d,
        stops: d.stops.map(s => s.type === 'transport' 
          ? { ...s, subtitle: `${vehicle} with courteous driver` } 
          : s
        )
      }));
      return updated;
    });
  };

  const handleStayTierChange = (stayTier) => {
    setTripPlan(prev => ({
      ...prev,
      stayTier,
      price: stayTier.includes('5★') ? prev.price + 12000 : prev.price
    }));
  };

  const handleDietaryChange = (dietary) => {
    setTripPlan(prev => ({
      ...prev,
      dietary
    }));
  };

  // WhatsApp booking
  const handleWhatsAppBooking = () => {
    if (!tripPlan) return;
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

  // Social card generation
  const handleSocialCard = async () => {
    if (!tripPlan) return;
    setShowSocialCardModal(true);
  };

  // Export handlers
  const handleExcelExport = () => {
    if (tripPlan) exportItineraryToExcel(tripPlan);
    setShowExportMenu(false);
  };

  const handlePDFExport = () => {
    if (tripPlan) printPdfBrochure(tripPlan);
    setShowExportMenu(false);
  };

  const handleSocialShare = async () => {
    if (!tripPlan) return;
    try {
      const dataUrl = await generateSocialCardDataUrl(tripPlan);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${(tripPlan.destination || 'Vacation').replace(/\s+/g, '_')}_ComfortJourney_Card.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Social card generation failed:', err);
    }
    setShowExportMenu(false);
  };

  const activeDayData = tripPlan?.days?.find(d => d.day === activeDay) || tripPlan?.days?.[0];

  // Render functions for layout sections
  const renderLeftPanel = () => (
    <div className="planner-left-panel" role="main" aria-label="Trip itinerary">
      <ConversationalSearch 
        onSubmit={handleConversationalSubmit}
        isGenerating={isGenerating}
        quickPrompts={QUICK_PROMPTS[0]?.questions?.slice(0, 4) || []}
        onQuickPrompt={handleQuickPrompt}
      />
      
      {tripPlan && (
        <>
          <TripSummaryCard 
            tripPlan={tripPlan} 
            formatPrice={formatPrice}
            onCustomizeClick={() => setShowCustomizeSheet(true)}
          />
          
          <DayTabs 
            days={tripPlan.days} 
            activeDay={activeDay}
            onDayChange={handleDayChange}
          />
          
          {activeDayData && (
            <div className="active-day-header">
              <div className="day-header-top">
                <h3 className="active-day-title">Day {activeDayData.day}: {activeDayData.title}</h3>
                <span className="day-travel-badge">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                  <span>{activeDayData.travelDistance}</span>
                </span>
              </div>
              {activeDayData.summary && (
                <div className="active-day-summary">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-amber"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span>{activeDayData.summary}</span>
                </div>
              )}
            </div>
          )}
          
          <TimelineList
            stops={activeDayData?.stops || []}
            selectedStop={selectedStop}
            proximityExpandedStop={proximityExpandedStop}
            onStopSelect={handleStopSelect}
            onProximityToggle={handleProximityToggle}
          />
        </>
      )}
    </div>
  );

  const renderRightPanel = () => {
    if (isMobile) {
      return (
        <MapBottomSheet
          tripPlan={tripPlan}
          activeDay={activeDay}
          selectedStop={selectedStop}
          onStopSelect={handleStopSelect}
          isOpen={!!tripPlan}
          onClose={() => setIsMapFullscreen(false)}
          isFullscreen={isMapFullscreen}
          onFullscreenChange={setIsMapFullscreen}
        />
      );
    }
    
    return (
      <MapPanel
        tripPlan={tripPlan}
        activeDay={activeDay}
        selectedStop={selectedStop}
        onStopSelect={handleStopSelect}
        setMapInstance={setMapInstance}
      />
    );
  };

  const renderBottomActionBar = () => (
    <BottomActionBar
      tripPlan={tripPlan}
      formatPrice={formatPrice}
      onWhatsAppBooking={handleWhatsAppBooking}
      onSocialCard={handleSocialCard}
      onExcelExport={handleExcelExport}
      onPDFExport={handlePDFExport}
      onExportMenuToggle={setShowExportMenu}
      showExportMenu={showExportMenu}
    />
  );

  return (
    <AIPlannerLayout
      isMobile={isMobile}
      isTablet={isTablet}
      isDesktop={isDesktop}
      layoutMode={layoutMode}
      onBackToHome={onBackToHome}
      onOpenQuote={onOpenQuote}
      leftPanel={renderLeftPanel()}
      rightPanel={renderRightPanel()}
      bottomActionBar={renderBottomActionBar()}
      floatingAIButton={
        <FloatingAIButton 
          onClick={() => setShowChatPanel(true)}
          isMobile={isMobile}
        />
      }
      chatPanel={
        <ChatPanel
          isOpen={showChatPanel}
          onClose={() => setShowChatPanel(false)}
          messages={messages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          isTyping={isTyping}
          onSendMessage={handleChatMessage}
          tripPlan={tripPlan}
          onViewInPlanner={() => {
            setShowChatPanel(false);
            // Scroll to planner view
          }}
        />
      }
      customizeSheet={
        <CustomizeSheet
          isOpen={showCustomizeSheet}
          onClose={() => setShowCustomizeSheet(false)}
          tripPlan={tripPlan}
          onPacingChange={handlePacingChange}
          onVehicleChange={handleVehicleChange}
          onStayTierChange={handleStayTierChange}
          onDietaryChange={handleDietaryChange}
        />
      }
      socialCardModal={
        <SocialCardModal
          isOpen={showSocialCardModal}
          onClose={() => setShowSocialCardModal(false)}
          tripPlan={tripPlan}
        />
      }
      exportMenu={
        <ExportMenu
          isOpen={showExportMenu}
          onClose={() => setShowExportMenu(false)}
          onSocialShare={handleSocialShare}
          onExcelExport={handleExcelExport}
          onPDFExport={handlePDFExport}
        />
      }
    />
  );
}