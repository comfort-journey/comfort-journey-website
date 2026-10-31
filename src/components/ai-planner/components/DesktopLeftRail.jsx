import React from 'react';
import { Calendar, PhoneCall, ShieldCheck, Award, MessageCircle } from 'lucide-react';
import './styles/DesktopRails.css';

export default function DesktopLeftRail({
  tripPlan,
  activeDay,
  onDayChange,
  onWhatsAppBooking
}) {
  if (!tripPlan) return null;

  return (
    <aside className="planner-desktop-left-rail" aria-label="Trip Table of Contents & Concierge">
      {/* 1. Day Navigator / Table of Contents */}
      <div className="desktop-rail-card day-navigator-card">
        <div className="rail-card-header">
          <Calendar size={13} className="text-amber" />
          <h4>Itinerary Schedule</h4>
        </div>
        <div className="day-navigator-list" role="tablist">
          {(tripPlan.days || []).map((day) => (
            <button
              key={day.day}
              type="button"
              className={`nav-day-item ${activeDay === day.day ? 'is-active' : ''}`}
              onClick={() => onDayChange(day.day)}
              role="tab"
              aria-selected={activeDay === day.day}
            >
              <span className="nav-day-num">Day {day.day}</span>
              <span className="nav-day-title">{day.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Bhopal Travel Specialist Trust Card */}
      <div className="desktop-rail-card concierge-specialist-card">
        <div className="specialist-badge-row">
          <Award size={13} className="text-amber" />
          <span className="specialist-eyebrow">EST. 1992 · BHOPAL DESK</span>
        </div>
        <h5 className="specialist-title">24/7 Human Concierge</h5>
        <p className="specialist-desc">
          Every AI itinerary is reviewed & verified by our senior tour curators in Bhopal before booking.
        </p>

        <div className="specialist-perks">
          <div className="perk-item">
            <ShieldCheck size={12} className="text-lime" />
            <span>Direct driver & hotel coordination</span>
          </div>
          <div className="perk-item">
            <ShieldCheck size={12} className="text-lime" />
            <span>Pure veg & Jain meal assurances</span>
          </div>
        </div>

        <button
          type="button"
          className="rail-whatsapp-btn"
          onClick={onWhatsAppBooking}
        >
          <MessageCircle size={14} />
          <span>Chat with Specialist</span>
        </button>
      </div>
    </aside>
  );
}

