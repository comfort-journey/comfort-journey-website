/**
 * Comfort Journey - Enterprise Google Tag Manager & dataLayer Tracking Engine
 * Container: GTM-TK4DD6HD
 * Tracks:
 * - virtual_pageview (Client-side route changes for GA4 & Meta Pixel)
 * - generate_lead (Lead submissions to Directus / CRM without PII)
 * - whatsapp_click (WhatsApp CTA clicks & window.open redirects)
 * - ai_concierge_interaction (Comfy.ai chat prompts & planning requests)
 * - save_itinerary (User saves a tour to wishlist or favorites)
 * - user_signup / user_login (Visitor authentication)
 */

export function pushToDataLayer(eventData) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);
}

/**
 * Track SPA Route Changes for GTM, GA4 & Meta Pixel
 */
export function trackVirtualPageView(pagePath, pageTitle) {
  const path = pagePath || (typeof window !== 'undefined' ? (window.location.pathname + window.location.hash) : '/');
  const title = pageTitle || (typeof document !== 'undefined' ? document.title : 'Comfort Journey');
  const url = typeof window !== 'undefined' ? window.location.href : 'https://www.comfortjourney.in';

  pushToDataLayer({
    event: 'virtual_pageview',
    page_path: path,
    page_title: title,
    page_location: url
  });
}

/**
 * Track Lead Form Submissions (High-intent conversion event)
 * Excludes all PII (no phone, no email) to strictly adhere to Google & Meta policies
 */
export function trackLeadSubmission(lead) {
  if (!lead) return;
  pushToDataLayer({
    event: 'generate_lead',
    lead_id: lead.id || `lead_${Date.now()}`,
    lead_source: lead.source || 'Website Lead Form',
    tour_name: lead.tourName || lead.destination || 'Custom Tour',
    destination: lead.destination || '',
    travelers: lead.guests || lead.travelers || '2 Persons',
    duration: lead.duration || ''
  });
}

/**
 * Track WhatsApp Redirects and Clicks
 */
export function trackWhatsAppClick(details = {}) {
  pushToDataLayer({
    event: 'whatsapp_click',
    cta_source: details.source || 'unknown',
    tour_name: details.tourName || '',
    destination: details.destination || '',
    page_location: typeof window !== 'undefined' ? window.location.href : ''
  });
}

/**
 * Track AI Concierge (Comfy.ai) Interactions
 */
export function trackAIConciergeInteraction(action, details = {}) {
  pushToDataLayer({
    event: 'ai_concierge_interaction',
    interaction_action: action || 'message_sent',
    destination: details.destination || '',
    prompt_length: details.promptLength || 0,
    model: details.model || 'Comfy.ai'
  });
}

/**
 * Track Saved Itinerary (Wishlist / Favorites)
 */
export function trackSaveItinerary(details = {}) {
  pushToDataLayer({
    event: 'save_itinerary',
    tour_id: details.tourId || '',
    tour_name: details.tourName || '',
    destination: details.destination || '',
    action: details.action || 'save'
  });
}

/**
 * Track User Authentication / Login
 */
export function trackUserLogin(method = 'google') {
  pushToDataLayer({
    event: 'user_login',
    login_method: method
  });
}

/**
 * Automatically intercepts all WhatsApp links across the application
 */
export function initGlobalClickTracking() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  
  if (window.__cj_tracking_initialized) return;
  window.__cj_tracking_initialized = true;

  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor || !anchor.href) return;

    if (anchor.href.includes('wa.me') || anchor.href.includes('whatsapp.com')) {
      trackWhatsAppClick({
        source: anchor.getAttribute('data-tracking-source') || anchor.className || 'anchor_link',
        destination: anchor.getAttribute('data-tracking-destination') || ''
      });
    }
  }, { capture: true });
}
