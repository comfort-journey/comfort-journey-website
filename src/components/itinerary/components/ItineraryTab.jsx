import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Calendar, MapPin, ChevronRight, ChevronLeft, Clock, Sunrise, Sunset, Navigation, Compass, Mountain, ArrowRight } from 'lucide-react';
import DayTimeline from './DayTimeline';
import './styles/ItineraryTab.css';

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
  const dayScrollRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  if (!enrichedItinerary?.length) return null;

  const totalDays = enrichedItinerary.length;
  const currentDayData = enrichedItinerary.find(d => d.day === activeDay) || enrichedItinerary[0];
  const currentDayIndex = enrichedItinerary.findIndex(d => d.day === activeDay);
  
  // Progress percentage
  const progressPercent = totalDays > 1 ? ((activeDay - 1) / (totalDays - 1)) * 100 : 100;

  // Scroll active day tab into view
  useEffect(() => {
    if (!dayScrollRef.current) return;
    const activeBtn = dayScrollRef.current.querySelector('.day-pill.active');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeDay]);

  // Scroll detection for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        setIsScrolled(timelineRef.current.scrollTop > 80);
      }
    };
    const el = timelineRef.current?.closest('.itin-timeline-col');
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Get time of day greeting
  const getTimeLabel = (dayNum) => {
    if (dayNum === 1) return 'Arrival Day';
    if (dayNum === totalDays) return 'Departure Day';
    return `Day ${dayNum} of ${totalDays}`;
  };

  return (
    <div className="itin-tab-v2" ref={timelineRef}>
      {/* Trip Progress Bar */}
      <div className="trip-progress-strip">
        <div className="progress-info">
          <Compass size={14} className="progress-icon" />
          <span className="progress-label">Trip Progress</span>
          <span className="progress-value">{activeDay} of {totalDays} days</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          <div className="progress-dots">
            {enrichedItinerary.map((day, idx) => (
              <button
                key={day.day}
                className={`progress-dot ${day.day === activeDay ? 'active' : ''} ${day.day < activeDay ? 'completed' : ''}`}
                onClick={() => onDayChange(day.day)}
                aria-label={`Go to Day ${day.day}`}
                style={{ left: `${totalDays > 1 ? (idx / (totalDays - 1)) * 100 : 50}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Day Selector - Pill Style */}
      <nav className="day-selector-v2" role="tablist" aria-label="Trip days">
        <button
          className="day-scroll-btn prev"
          onClick={() => onDayChange(Math.max(1, activeDay - 1))}
          disabled={activeDay === 1}
          aria-label="Previous day"
        >
          <ChevronLeft size={18} />
        </button>
        
        <div className="day-pills-track" ref={dayScrollRef}>
          {enrichedItinerary.map(day => (
            <button
              key={day.day}
              role="tab"
              aria-selected={activeDay === day.day}
              className={`day-pill ${activeDay === day.day ? 'active' : ''} ${day.day < activeDay ? 'past' : ''}`}
              onClick={() => onDayChange(day.day)}
            >
              <span className="pill-day">Day {day.day}</span>
              <span className="pill-stops">{day.stops?.length || 0} stops</span>
            </button>
          ))}
        </div>

        <button
          className="day-scroll-btn next"
          onClick={() => onDayChange(Math.min(totalDays, activeDay + 1))}
          disabled={activeDay === totalDays}
          aria-label="Next day"
        >
          <ChevronRight size={18} />
        </button>
      </nav>

      {/* Active Day Hero Card */}
      {currentDayData && (
        <section className="day-hero-card" data-day={activeDay}>
          <div className="hero-accent" />
          <div className="hero-body">
            <div className="hero-top-row">
              <span className="hero-day-badge">
                <Calendar size={13} />
                {getTimeLabel(activeDay)}
              </span>
              <div className="hero-meta-chips">
                {currentDayData.travelDistance && (
                  <span className="hero-chip">
                    <Navigation size={12} />
                    {currentDayData.travelDistance}
                  </span>
                )}
                {currentDayData.travelTime && (
                  <span className="hero-chip">
                    <Clock size={12} />
                    {currentDayData.travelTime}
                  </span>
                )}
                <span className="hero-chip highlight">
                  <MapPin size={12} />
                  {currentDayData.stops?.length || 0} Experiences
                </span>
              </div>
            </div>
            <h2 className="hero-day-title">{currentDayData.title}</h2>
            {(currentDayData.desc || currentDayData.summary) && (
              <p className="hero-day-desc">{currentDayData.desc || currentDayData.summary}</p>
            )}
          </div>
          
          {/* Transport between days */}
          {currentDayData.transport && (
            <div className="hero-transport">
              <span className="transport-icon">🚗</span>
              <div className="transport-info">
                <span className="transport-mode-label">
                  {typeof currentDayData.transport === 'string' ? currentDayData.transport : (currentDayData.transport.mode || 'Private AC Cab')}
                </span>
                {typeof currentDayData.transport === 'object' && (currentDayData.transport.duration || currentDayData.transport.distance) && (
                  <span className="transport-detail">
                    {currentDayData.transport.duration}
                    {currentDayData.transport.distance && ` · ${currentDayData.transport.distance}`}
                  </span>
                )}
              </div>
              <ArrowRight size={16} className="transport-arrow" />
            </div>
          )}
        </section>
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
        <div className="empty-day-v2" data-day={activeDay}>
          <div className="empty-illustration">
            <Mountain size={48} />
          </div>
          <h3>Free Day – Your Time to Explore!</h3>
          <p>This day is kept free for leisure activities, local exploration, or simply relaxing at your stay.</p>
        </div>
      )}
      
      {/* Day Navigation - Bottom */}
      {enrichedItinerary.length > 1 && (
        <nav className="day-nav-v2" aria-label="Day navigation">
          <button
            type="button"
            className="nav-card prev"
            onClick={() => onDayChange(Math.max(1, activeDay - 1))}
            disabled={activeDay === 1}
          >
            <ChevronLeft size={20} />
            <div className="nav-card-info">
              <span className="nav-card-label">Previous</span>
              <span className="nav-card-day">
                {activeDay > 1 ? enrichedItinerary[currentDayIndex - 1]?.title?.substring(0, 35) + '...' : 'Start'}
              </span>
            </div>
          </button>
          
          <div className="nav-day-counter">
            <span className="counter-current">{activeDay}</span>
            <span className="counter-sep">/</span>
            <span className="counter-total">{totalDays}</span>
          </div>

          <button
            type="button"
            className="nav-card next"
            onClick={() => onDayChange(Math.min(totalDays, activeDay + 1))}
            disabled={activeDay === totalDays}
          >
            <div className="nav-card-info">
              <span className="nav-card-label">Next</span>
              <span className="nav-card-day">
                {activeDay < totalDays ? enrichedItinerary[currentDayIndex + 1]?.title?.substring(0, 35) + '...' : 'End'}
              </span>
            </div>
            <ChevronRight size={20} />
          </button>
        </nav>
      )}
    </div>
  );
}