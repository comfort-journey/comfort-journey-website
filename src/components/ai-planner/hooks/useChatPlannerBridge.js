import { useCallback } from 'react';
import { askAIConcierge } from '../../../services/aiConciergeService';

export function useChatPlannerBridge({
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
}) {
  const handleChatMessage = useCallback(async (text) => {
    if (!text?.trim() || isTyping) return;

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
        setActiveDay(1);
        setSelectedStop(response.generatedTrip.days[0]?.stops[0] || null);
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
  }, [messages, isTyping, setMessages, setIsTyping, setTripPlan, setActiveDay, setSelectedStop]);

  const handlePlannerAction = useCallback((action, data) => {
    // Handle actions from planner that should update chat context
    switch (action) {
      case 'dayChanged':
        // Could send a contextual message to chat
        break;
      case 'stopSelected':
        // Could show stop details in chat
        break;
      default:
        break;
    }
  }, []);

  const chatContext = {
    currentTrip: tripPlan,
    activeDay,
    selectedStop,
    messageCount: messages.length,
  };

  return {
    handleChatMessage,
    handlePlannerAction,
    chatContext,
  };
}