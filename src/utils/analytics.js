/**
 * Comfort Journey - Enterprise Google Tag Manager & dataLayer Tracking Engine
 * Container: GTM-TK4DD6HD
 * Tracks:
 * - virtual_pageview (Client-side route changes)
 * - generate_lead (Lead submissions to Directus / CRM)
 * - whatsapp_click (WhatsApp CTA clicks & window.open redirects)
 * - ai_concierge_interaction (Comfy.ai chat prompts & planning requests)
 */

export function pushToDataLayer(eventData) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);
}

/**
 * Track SPA Route Changes for GTM & GA4
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
 * Track Lead Form Submissions
 */
export function trackLeadSubmission(lead) {
  if (!lead) return;
  pushToDataLayer({
    event: 'generate_lead',
    lead_id: lead.id || `lead_${Date.now()}`,
    lead_source: lead.source || 'Website Lead Form',
    tour_name: lead.tourName || lead.destination || 'Custom Tour',
    destination: lead.destination || '',
    duration: lead.duration || '',
    guests: lead.guests || '',
    has_phone: Boolean(lead.phone),
    has_email: Boolean(lead.email)
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
