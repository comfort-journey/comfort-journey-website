import React, { useMemo } from 'react';
import { Calendar, MapPin, ChevronRight, MoreVertical } from 'lucide-react';
import DayTimeline from './DayTimeline';
import './styles/ItineraryTab.css';

export default function ItineraryTab({
  tour,
  enrichedItinerary,
  activeDay,
  selectedStop,
  onDayChange,
  onStopSelect,
  formatPrice
}) {
  if (!enrichedItinerary?.length) return null;
  
  const totalDays = enrichedItinerary.length;
  const currentDayData = enrichedItinerary.find(d => d.day === activeDay) || enrichedItinerary[0];
  
  return (
    <div className="itinerary-tab" data-tab="itinerary">
      {/* Sticky Day Selector */}
      <nav className="day-selector-sticky" role="tablist" aria-label="Trip days">
        <div className="selector-header">
          <h2 className="selector-title">
            <Calendar size={18} className="text-amber" />
            {tour?.itinerarySectionTitle || 'Day-by-Day Schedule'}
          </h2>
          <span className="day-counter">Day {activeDay} of {totalDays}</span>
        </div>
        
        <div className="day-tabs-scroll" role="presentation">
          {enrichedItinerary.map(day => (
            <button
              key={day.day}
              role="tab"
              aria-selected={activeDay === day.day}
              aria-controls={`day-panel-${day.day}`}
              id={`tab-day-${day.day}`}
              className={`day-tab-btn ${activeDay === day.day ? 'active' : ''}`}
              onClick={() => onDayChange(day.day)}
            >
              <span className="day-tab-label">Day {day.day}</span>
              <span className="day-tab-stops">{day.stops?.length || 0} stops</span>
              {activeDay === day.day && <span className="active-indicator" />}
            </button>
          ))}
        </div>
      </nav>
      
      {/* Active Day Header */}
      {currentDayData && (
        <header className="active-day-header glass-panel">
          <div className="day-header-main">
            <div className="day-header-left">
              <span className="day-badge">Day {currentDayData.day}</span>
              <h2 className="day-title">{currentDayData.title}</h2>
            </div>
            <div className="day-header-right">
              <span className="day-distance">
                <MapPin size={14} />
                {currentDayData.travelDistance}
              </span>
            </div>
          </div>
          
          {currentDayData.summary && (
            <div className="day-summary-chip">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" className="text-amber"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span>{currentDayData.summary}</span>
            </div>
          )}
        </header>
      )}
      
      {/* Day Timeline */}
      <DayTimeline
        dayData={currentDayData}
        selectedStop={selectedStop}
        onStopSelect={onStopSelect}
      />
      
      {/* Empty state for days without data */}
      {!currentDayData?.stops?.length && (
        <div className="empty-day-state glass-panel">
          <div className="empty-icon">📍</div>
          <h3>No activities scheduled</h3>
          <p>This day is free for leisure or optional activities</p>
        </div>
      )}
    </div>
  );
}