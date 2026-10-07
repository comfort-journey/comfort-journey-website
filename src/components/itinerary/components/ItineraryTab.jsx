import React, { useMemo, useRef, useEffect } from 'react';
import { Calendar, MapPin, ChevronRight, MoreVertical, Clock, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
import DayTimeline from './DayTimeline';
import './styles/ItineraryTab.css';

const STOP_ICONS = {
  transport: Car,
  sightseeing: Camera,
  meal: Utensils,
  hotel: BedDouble,
  shopping: ShoppingBag,
};

const TYPE_LABELS = {
  transport: 'Transfer',
  sightseeing: 'Sightseeing',
  meal: 'Dining',
  hotel: 'Stay',
  shopping: 'Shopping',
};

const TYPE_COLORS = {
  transport: 'var(--cj-link-deep)',
  sightseeing: 'var(--cj-cta-deep)',
  meal: '#10B981',
  hotel: '#8B5CF6',
  shopping: '#F472B6',
};

export default function ItineraryTab({
  tour,
  enrichedItinerary,
  activeDay,
  selectedStop,
  onDayChange,
  onStopSelect,
  formatPrice,
  routeMode
}) {
  const timelineRef = useRef(null);
  const [stickyVisible, setStickyVisible] = React.useState(false);
  
  if (!enrichedItinerary?.length) return null;

  const totalDays = enrichedItinerary.length;
  const currentDayData = enrichedItinerary.find(d => d.day === activeDay) || enrichedItinerary[0];

  // Sticky day selector visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px', threshold: 0 }
    );
    const header = document.querySelector('.itin-header');
    if (header) observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="itinerary-tab" data-tab="itinerary" ref={timelineRef}>
      {/* Sticky Day Selector */}
      <nav className={`day-selector-sticky ${stickyVisible ? 'visible' : ''}`} role="tablist" aria-label="Trip days">
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
        <header className="active-day-header glass-panel" data-day={activeDay}>
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
              {currentDayData.travelTime && (
                <span className="day-time">
                  <Clock size={14} />
                  {currentDayData.travelTime}
                </span>
              )}
            </div>
          </div>
          
          {currentDayData.summary && (
            <div className="day-summary-chip">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span>{currentDayData.summary}</span>
            </div>
          )}
          
          {/* Transport between days */}
          {currentDayData.transport && (
            <div className="day-transport-chip">
              <span className="transport-label">Travel to next day</span>
              <span className="transport-details">
                <span className="transport-mode">{currentDayData.transport.mode}</span>
                <span className="transport-duration">{currentDayData.transport.duration}</span>
                {currentDayData.transport.distance && (
                  <span className="transport-distance">{currentDayData.transport.distance}</span>
                )}
              </span>
            </div>
          )}
        </header>
      )}
       
      {/* Day Timeline - The Core Experience */}
      <DayTimeline
        dayData={currentDayData}
        selectedStop={selectedStop}
        onStopSelect={onStopSelect}
        routeMode={routeMode}
        currentDayData={currentDayData}
      />
       
      {/* Empty state for days without data */}
      {!currentDayData?.stops?.length && (
        <div className="empty-day-state glass-panel" data-day={activeDay}>
          <div className="empty-icon">📍</div>
          <h3>No activities scheduled</h3>
          <p>This day is free for leisure or optional activities</p>
        </div>
      )}
      
      {/* Day Navigation - Bottom */}
      {enrichedItinerary.length > 1 && (
        <nav className="day-nav-bottom" aria-label="Day navigation">
          <button
            type="button"
            className="day-nav-btn prev"
            onClick={() => onDayChange(Math.max(1, activeDay - 1))}
            disabled={activeDay === 1}
            aria-label="Previous day"
          >
            <ChevronLeft size={20} />
            <span>Previous Day</span>
          </button>
          <span className="day-nav-indicator">{activeDay} / {totalDays}</span>
          <button
            type="button"
            className="day-nav-btn next"
            onClick={() => onDayChange(Math.min(totalDays, activeDay + 1))}
            disabled={activeDay === totalDays}
            aria-label="Next day"
          >
            <span>Next Day</span>
            <ChevronRight size={20} />
          </button>
        </nav>
      )}
    </div>
  );
}