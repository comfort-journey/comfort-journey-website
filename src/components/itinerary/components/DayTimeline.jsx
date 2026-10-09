import React, { useMemo } from 'react';
import { Clock, MapPin, Utensils, BedDouble, ShoppingBag, Camera, Car, Footprints } from 'lucide-react';
import TimelineStop from './TimelineStop';
import './styles/DayTimeline.css';

const STOP_ICONS = {
  transport: Car,
  sightseeing: Camera,
  meal: Utensils,
  hotel: BedDouble,
  shopping: ShoppingBag,
};

const TYPE_COLORS = {
  transport: '#3B82F6',
  sightseeing: '#F59E0B',
  meal: '#10B981',
  hotel: '#8B5CF6',
  shopping: '#EC4899',
};

const TYPE_LABELS = {
  transport: 'Transfer',
  sightseeing: 'Sightseeing',
  meal: 'Dining',
  hotel: 'Stay',
  shopping: 'Shopping',
};

export default function DayTimeline({ dayData, selectedStop, onStopSelect }) {
  if (!dayData?.stops?.length) {
    return (
      <div className="timeline-empty-v2">
        <Footprints size={40} className="empty-icon" />
        <h3>Free Day</h3>
        <p>No planned activities. Enjoy at your leisure!</p>
      </div>
    );
  }
  
  const stopsWithMeta = useMemo(() => dayData.stops.map((stop, idx) => ({
    ...stop,
    index: idx,
    Icon: STOP_ICONS[stop.type] || MapPin,
    typeColor: TYPE_COLORS[stop.type] || TYPE_COLORS.sightseeing,
    typeLabel: TYPE_LABELS[stop.type] || stop.type || 'Experience',
    isSelected: selectedStop?.title === stop.title,
    isFirst: idx === 0,
    isLast: idx === dayData.stops.length - 1,
  })), [dayData.stops, selectedStop]);

  const totalStops = stopsWithMeta.length;
  
  return (
    <div className="day-timeline-v2" role="list" aria-label={`Day ${dayData.day} schedule`}>
      {/* Timeline Header */}
      <div className="timeline-header-bar">
        <div className="timeline-header-left">
          <Clock size={16} />
          <span className="timeline-title">Today's Schedule</span>
        </div>
        <span className="timeline-count">{totalStops} {totalStops === 1 ? 'stop' : 'stops'}</span>
      </div>
      
      {/* Timeline Content */}
      <div className="timeline-content">
        {stopsWithMeta.map((stop, idx) => (
          <React.Fragment key={`${stop.title}-${stop.index}`}>
            <TimelineStop
              stop={stop}
              onSelect={onStopSelect}
              stopNumber={idx + 1}
              totalStops={totalStops}
            />
            {/* Connector between stops */}
            {!stop.isLast && (
              <div className="stop-connector" aria-hidden="true">
                <div className="connector-line" />
                <div className="connector-dot" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}