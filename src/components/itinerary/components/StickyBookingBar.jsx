import React from 'react';
import { MessageCircle, Share2, Send, MapPin, Clock, Users, Car, Utensils, Star, ChevronRight } from 'lucide-react';
import './styles/StickyBookingBar.css';

export default function StickyBookingBar({
  tour,
  currentDayData,
  formatPrice,
  onWhatsApp,
  onBookNow,
  onShare
}) {
  if (!tour) return null;
  
  const vehicleShort = tour.vehicle
    ?.replace('Private Toyota ', '')
    ?.replace(' (AC)', '')
    ?.replace(' (Hybrid AC)', '') || 'Private AC Car';

  return (
    <footer className="sticky-booking-bar" role="contentinfo">
      <div className="bar-left">
        <div className="price-box">
          <span className="price-caption">Starting from</span>
          <span className="price-amount">{formatPrice(tour.price)}</span>
          <span className="price-unit">/ person</span>
        </div>
        
        <div className="quick-meta">
          <span className="meta-chip">
            <MapPin size={12} /> {tour.destination || tour.location}
          </span>
          <span className="meta-chip">
            <Clock size={12} /> {tour.duration}
          </span>
          <span className="meta-chip">
            <Users size={12} /> {tour.party || 'Family'}
          </span>
          <span className="meta-chip">
            <Car size={12} /> {vehicleShort}
          </span>
        </div>
      </div>

      <div className="bar-right">
        <button
          type="button"
          className="action-btn share-btn"
          onClick={onShare}
          title="Share itinerary"
        >
          <Share2 size={16} />
          <span className="hidden-mobile">Share</span>
        </button>

        <button
          type="button"
          className="action-btn whatsapp-btn"
          onClick={onWhatsApp}
        >
          <MessageCircle size={17} />
          <span>WhatsApp</span>
        </button>

        <button
          type="button"
          className="action-btn book-btn"
          onClick={onBookNow}
        >
          <Send size={17} />
          <span>Book Now</span>
        </button>
      </div>
    </footer>
  );
}