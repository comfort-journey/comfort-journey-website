import React, { useState, useEffect } from 'react';
import { MessageCircle, Share2, Sparkles, CheckCircle2, Send } from 'lucide-react';
import './styles/StickyBookingBar.css';

export default function StickyBookingBar({
  tour,
  currentDayData,
  formatPrice,
  onWhatsApp,
  onBookNow,
  onShare,
  onEnquire
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!tour) return null;

  const currentPrice = tour.price || 0;
  let rawOrig = tour.origPrice || tour.originalPrice;
  if (!rawOrig || rawOrig <= currentPrice || rawOrig > currentPrice * 2.2) {
    rawOrig = Math.round(currentPrice * 1.25);
  }
  const originalPrice = rawOrig;
  const discountPercent = Math.max(10, Math.min(35, Math.round(((originalPrice - currentPrice) / originalPrice) * 100)));

  const handleEnquireClick = () => {
    if (onEnquire) {
      onEnquire();
    } else {
      const el = document.getElementById('itinerary-plan');
      if (el) {
        const offset = 80;
        const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
      window.dispatchEvent(new CustomEvent('open-enquiry-tab'));
    }
  };

  return (
    <footer className={`sticky-booking-bar ${isScrolled ? 'is-scrolled' : ''}`} role="contentinfo">
      <div className="sticky-bar-inner">
        {/* Left Side: Pricing & Value */}
        <div className="bar-pricing-col">
          <div className="bar-pricing-top">
            <span className="price-label">Starting From</span>
            {originalPrice > currentPrice && (
              <span className="original-price">{formatPrice(originalPrice)}</span>
            )}
            <span className="discount-pill">
              Save {discountPercent}%
            </span>
          </div>
          
          <div className="bar-pricing-main">
            <span className="current-price-val">{formatPrice(currentPrice)}</span>
            <span className="price-unit">/ person</span>
            <span className="price-inclusive-badge">
              <CheckCircle2 size={12} />
              All Inclusive
            </span>
          </div>

          <div className="bar-pricing-sub">
            <span>✓ Private AC Chauffeur</span>
            <span className="dot-sep">•</span>
            <span>Deluxe Stays</span>
            <span className="dot-sep">•</span>
            <span>Daily Breakfast & Dinner</span>
          </div>
        </div>

        {/* Right Side: Perfectly Aligned CTAs */}
        <div className="bar-actions-col">
          <button
            type="button"
            className="bar-btn bar-share-btn"
            onClick={onShare}
            title="Share or Export Itinerary"
            aria-label="Share itinerary"
          >
            <Share2 size={18} />
            <span className="btn-label-text">Share</span>
          </button>

          <button
            type="button"
            className="bar-btn bar-enquire-btn"
            onClick={handleEnquireClick}
            title="Request custom quote or dates"
          >
            <Send size={17} />
            <span className="btn-label-text">Quick Enquiry</span>
          </button>

          <button
            type="button"
            className="bar-btn bar-whatsapp-btn"
            onClick={onWhatsApp}
            title="Chat with Tour Specialist on WhatsApp"
          >
            <MessageCircle size={20} className="whatsapp-icon" />
            <div className="btn-text-group">
              <span className="btn-main-title">Chat on WhatsApp</span>
              <span className="btn-sub-caption">Instant Reply</span>
            </div>
          </button>

          <button
            type="button"
            className="bar-btn bar-book-btn"
            onClick={onBookNow}
            title="Book this tour package"
          >
            <Sparkles size={19} className="sparkle-icon" />
            <div className="btn-text-group">
              <span className="btn-main-title">Book Tour</span>
              <span className="btn-sub-caption">Best Price Guarantee</span>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}