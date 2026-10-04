import React from 'react';
import './styles/DayTabs.css';

export default function DayTabs({ days, activeDay, onDayChange }) {
  if (!days?.length) return null;

  return (
    <nav className="day-tabs" aria-label="Trip days" role="tablist">
      <span className="tabs-label" aria-hidden="true">Schedule:</span>
      <div className="tabs-scroll" role="presentation">
        {days.map((day) => (
          <button
            key={day.day}
            type="button"
            role="tab"
            aria-selected={activeDay === day.day}
            aria-controls={`day-panel-${day.day}`}
            id={`tab-${day.day}`}
            className={`day-tab ${activeDay === day.day ? 'active' : ''}`}
            onClick={() => onDayChange(day.day)}
          >
            <span>Day {day.day}</span>
            {day.day === activeDay && <span className="active-indicator" aria-hidden="true" />}
          </button>
        ))}
      </div>
    </nav>
  );
}