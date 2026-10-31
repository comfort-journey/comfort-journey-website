import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { parseTravelIntent, generateComfyItinerary, askAIConcierge, QUICK_PROMPTS } from '../../services/aiConciergeService';
import { exportItineraryToExcel, printPdfBrochure, generateSocialCardDataUrl } from '../../services/itineraryExportService';
import { Navigation, ExternalLink, Sparkles, MapPin, Car, ShieldCheck, Compass, ArrowRight } from 'lucide-react';
import AIPlannerLayout from './components/AIPlannerLayout';
import ConversationalSearch from './components/ConversationalSearch';
import TripSummaryCard from './components/TripSummaryCard';
import DayTabs from './components/DayTabs';
import TimelineList from './components/TimelineList';
import StickyPromptDock from './components/StickyPromptDock';
import DesktopLeftRail from './components/DesktopLeftRail';
import DesktopRightRail from './components/DesktopRightRail';
import CustomizeSheet from './components/CustomizeSheet';
import FloatingAIButton from './components/FloatingAIButton';
import ChatPanel from './components/ChatPanel';
import BottomActionBar from './components/BottomActionBar';
import ExportMenu from './components/ExportMenu';
import SocialCardModal from './components/SocialCardModal';
import { useResponsiveLayout } from './hooks/useResponsiveLayout';
import { useTripPlan } from './hooks/useTripPlan';
import { useChatPlannerBridge } from './hooks/useChatPlannerBridge';
import { useURLState } from './hooks/useURLState';
import { serializeTripPlan, deserializeTripPlan } from './utils/tripPlanSerializer';
import './styles/ai-planner.css';

export default function AIPlannerPage({ onBackToHome, onOpenQuote }) {
  const { formatPrice } = useCurrency();
  const { isMobile, isTablet, isDesktop, layoutMode } = useResponsiveLayout();
  
  // Trip plan state with URL persistence
  const [tripPlan, setTripPlan] = useTripPlan();
  const [activeDay, setActiveDay] = useState(1);
  const [selectedStop, setSelectedStop] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // UI State
  const [showCustomizeSheet, setShowCustomizeSheet] = useState(false);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [showSocialCardModal, setShowSocialCardModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [proximityExpandedStop, setProximityExpandedStop] = useState(null);
  const [isDockVisible, setIsDockVisible] = useState(false);
  
  // Real-time AI Insight & Custom Destination states
  const [aiInsight, setAiInsight] = useState(null);
  const [customDestinationBanner, setCustomDestinationBanner] = useState(null);
  const [dynamicChips, setDynamicChips] = useState(null);
  
  // Chat state
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `**Namaste! I am Comfy, your AI Travel Concierge at Comfort Journey (Est. 1992).** 🌟\n\nTell me where you are dreaming of, who is coming and roughly when. I will craft a personalized day-by-day plan with verified hotels, a private chauffeur, and meal assurances including pure veg and Jain.\n\n*Try typing: "plan 5 day switzerland trip from india with private car and pure veg food"*.`,
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  // URL State for shareable links
  const { updateURL } = useURLState();

  // Chat-Planner bridge
  const { 
    handleChatMessage, 
    handlePlannerAction 
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

  // Track scroll position to show sticky prompt dock
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setIsDockVisible(scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Handle conversational search submission with Real Gemini AI
  const handleConversationalSubmit = useCallback(async (query) => {
    if (!query?.trim() || isGenerating) return;
    
    setIsGenerating(true);
    try {
      const res = await askAIConcierge({
        prompt: query,
        conversationHistory: messages,
        currentTrip: tripPlan
      });

      if (res && res.reply) {
        setAiInsight({
          query,
          reply: res.reply,
          destination: res.destination,
          isCustomGlobal: res.isCustomGlobal,
          model: res.model
        });

        // Add to chat history
        setMessages(prev => [
          ...prev,
          { id: `user-${Date.now()}`, role: 'user', content: query, time: 'Just now' },
          { id: `assistant-${Date.now()}`, role: 'assistant', content: res.reply, time: 'Just now' }
        ]);
      }

      if (Array.isArray(res?.suggestedCurations) && res.suggestedCurations.length > 0) {
        setDynamicChips(res.suggestedCurations);
      }

      if (res?.isCustomGlobal && res?.destination) {
        setCustomDestinationBanner({
          destination: res.destination,
          reply: res.reply
        });
      } else {
        setCustomDestinationBanner(null);
      }

      if (res?.structuredTrip) {
        setTripPlan(res.structuredTrip);
        setActiveDay(1);
        setSelectedStop(res.structuredTrip.days[0]?.stops[0] || null);
      } else if (res?.parsedIntent) {
        const fallbackTrip = generateComfyItinerary(res.parsedIntent);
        if (fallbackTrip) {
          setTripPlan(fallbackTrip);
          setActiveDay(1);
          setSelectedStop(fallbackTrip.days[0]?.stops[0] || null);
        }
      }

      setIsGenerating(false);
      if (isMobile) setShowChatPanel(false);
    } catch (err) {
      console.error('Error generating trip with AI:', err);
      const parsed = parseTravelIntent(query);
      if (parsed) {
        const fallbackTrip = generateComfyItinerary(parsed);
        setTripPlan(fallbackTrip);
        setActiveDay(1);
        setSelectedStop(fallbackTrip.days[0]?.stops[0] || null);
      }
      setIsGenerating(false);
    }
  }, [isGenerating, messages, tripPlan, setTripPlan, isMobile]);

  // Handle day change
  const handleDayChange = useCallback((day) => {
    setActiveDay(day);
    const dayData = tripPlan?.days?.find(d => d.day === day);
    setSelectedStop(dayData?.stops[0] || null);
  }, [tripPlan]);

  // Handle stop selection
  const handleStopSelect = useCallback((stop) => {
    setSelectedStop(stop);
    setProximityExpandedStop(prev => prev?.title === stop.title ? null : stop);
  }, []);

  // Handle proximity toggle
  const handleProximityToggle = useCallback((stop) => {
    setProximityExpandedStop(prev => prev?.title === stop.title ? null : stop);
  }, []);

  // Live Travel DNA changes
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
      price: stayTier.includes('5★') ? prev.price + 12000 : Math.max(34999, prev.price - 12000)
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
    window.open(`https://wa.me/919203931912?text=${message}`, '_blank');
  };

  // Social card generation
  const handleSocialCard = () => {
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

  // Compute full-day real Google Maps road routing URL
  const dayStopsWithCoords = (activeDayData?.stops || []).filter(s => s.lat && s.lng);
  let dayGoogleMapsUrl = null;
  if (dayStopsWithCoords.length > 1) {
    const origin = `${dayStopsWithCoords[0].lat},${dayStopsWithCoords[0].lng}`;
    const destination = `${dayStopsWithCoords[dayStopsWithCoords.length - 1].lat},${dayStopsWithCoords[dayStopsWithCoords.length - 1].lng}`;
    const waypoints = dayStopsWithCoords.slice(1, -1).map(s => `${s.lat},${s.lng}`).join('|');
    dayGoogleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ''}&travelmode=driving`;
  } else if (dayStopsWithCoords.length === 1) {
    dayGoogleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${dayStopsWithCoords[0].lat},${dayStopsWithCoords[0].lng}`;
  }

  return (
    <AIPlannerLayout
      isMobile={isMobile}
      isTablet={isTablet}
      isDesktop={isDesktop}
      layoutMode={layoutMode}
      onBackToHome={onBackToHome}
      onOpenQuote={onOpenQuote}
      leftRail={
        <DesktopLeftRail
          tripPlan={tripPlan}
          activeDay={activeDay}
          onDayChange={handleDayChange}
          onWhatsAppBooking={handleWhatsAppBooking}
        />
      }
      rightRail={
        <DesktopRightRail
          tripPlan={tripPlan}
          formatPrice={formatPrice}
          onWhatsAppBooking={handleWhatsAppBooking}
          onOpenCustomize={() => setShowCustomizeSheet(true)}
        />
      }
      stickyPromptDock={
        <StickyPromptDock
          isVisible={isDockVisible}
          isGenerating={isGenerating}
          onSubmit={handleConversationalSubmit}
          currentDestination={tripPlan?.destination}
        />
      }
      bottomActionBar={
        <BottomActionBar
          tripPlan={tripPlan}
          formatPrice={formatPrice}
          onWhatsAppBooking={handleWhatsAppBooking}
          onSocialCard={handleSocialCard}
          onExcelExport={handleExcelExport}
          onPDFExport={handlePDFExport}
          onExportMenuToggle={() => setShowExportMenu(prev => !prev)}
          showExportMenu={showExportMenu}
        />
      }
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
          onViewInPlanner={() => setShowChatPanel(false)}
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
    >
      {/* 1. Hero Search Studio with Dynamic Suggestions & AI Insight */}
      <ConversationalSearch 
        onSubmit={handleConversationalSubmit}
        isGenerating={isGenerating}
        hasActiveTrip={Boolean(tripPlan)}
        currentDestination={tripPlan?.destination}
        aiInsight={aiInsight}
        onDismissInsight={() => setAiInsight(null)}
        dynamicChips={dynamicChips}
      />
      
      {/* Custom Global Destination Notice Banner */}
      {customDestinationBanner && (
        <div className="custom-destination-notice-banner">
          <div className="custom-notice-icon-box">
            <Compass size={22} className="text-amber" />
          </div>
          <div className="custom-notice-content">
            <div className="custom-notice-headline">
              <span className="notice-badge">🌍 Bespoke Global Travel</span>
              <h4>Custom Private Tour for {customDestinationBanner.destination}</h4>
            </div>
            <p className="custom-notice-text">
              While {customDestinationBanner.destination} is not a mass-market package in our online catalog, <strong>Comfort Journey has been handcrafting 100% personalized private holidays across 2,000+ destinations worldwide since 1992!</strong> Our Bhopal travel desk arranges verified 4★/5★ boutique hotels, private cars with courteous local drivers, and verified pure vegetarian/Jain dining.
            </p>
          </div>
          <a
            href={`https://wa.me/919203931912?text=${encodeURIComponent(`Hello Comfort Journey team! I want to plan a custom private trip to ${customDestinationBanner.destination} with private car and verified boutique stays. Please connect me with a senior curator.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="custom-notice-whatsapp-cta"
          >
            <span>Chat on WhatsApp</span>
            <ArrowRight size={14} />
          </a>
        </div>
      )}
      
      {tripPlan && (
        <>
          {/* 2. Trip Overview & Live Travel DNA Customizer */}
          <TripSummaryCard 
            tripPlan={tripPlan} 
            formatPrice={formatPrice}
            onCustomizeClick={() => setShowCustomizeSheet(true)}
            onWhatsAppBooking={handleWhatsAppBooking}
            onPacingChange={handlePacingChange}
            onVehicleChange={handleVehicleChange}
            onStayTierChange={handleStayTierChange}
            onDietaryChange={handleDietaryChange}
          />
          
          {/* 3. Day Selector Navigation */}
          <DayTabs 
            days={tripPlan.days} 
            activeDay={activeDay}
            onDayChange={handleDayChange}
          />
          
          {/* 4. Active Day Editorial Banner with Real Google Maps Route */}
          {activeDayData && (
            <div className="active-day-editorial-banner">
              <div className="active-day-header-top">
                <div className="day-title-lockup">
                  <span className="day-number-badge">Day {activeDayData.day}</span>
                  <h3 className="active-day-heading">{activeDayData.title}</h3>
                </div>
                
                <div className="day-actions-lockup">
                  {activeDayData.travelDistance && (
                    <span className="day-distance-pill">
                      <Car size={12} className="text-aqua" />
                      <span>{activeDayData.travelDistance}</span>
                    </span>
                  )}
                  
                  {dayGoogleMapsUrl && (
                    <a
                      href={dayGoogleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="day-gmaps-route-pill"
                      title="Open full day road navigation in Google Maps"
                    >
                      <Navigation size={12} />
                      <span>Day Route in Google Maps</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>

              {activeDayData.summary && (
                <div className="active-day-narrative">
                  <Sparkles size={13} className="text-amber narrative-icon" />
                  <p className="narrative-text">{activeDayData.summary}</p>
                </div>
              )}
            </div>
          )}
          
          {/* 5. Timeline Stops */}
          <div className="editorial-timeline-wrapper">
            <TimelineList
              stops={activeDayData?.stops || []}
              selectedStop={selectedStop}
              proximityExpandedStop={proximityExpandedStop}
              onStopSelect={handleStopSelect}
              onProximityToggle={handleProximityToggle}
            />
          </div>

          {/* 6. Legal & Quality Assurance Disclaimer */}
          <div className="planner-ai-legal-disclaimer">
            <p>
              * All AI-customized itineraries & pricing estimates are curated per Comfort Journey's 34-year private travel standards. Final hotel availability, vehicle assignment & customized pricing are confirmed directly by your dedicated trip curator in Bhopal via WhatsApp or phone (+91 9203931912).
            </p>
          </div>
        </>
      )}
    </AIPlannerLayout>
  );
}
