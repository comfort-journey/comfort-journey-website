import React, { useMemo } from 'react';
import { Clock, MapPin, Utensils, BedDouble, ShoppingBag, Camera, Car, ChevronDown, ChevronUp, MapPin as MapPinIcon } from 'lucide-react';
import TimelineStop from './TimelineStop';
import ProximityInline from './ProximityInline';
import './styles/DayTimeline.css';

const STOP_ICONS = {
  transport: Car,
  sightseeing: Camera,
  meal: Utensils,
  hotel: BedDouble,
  shopping: ShoppingBag,
};

const TYPE_COLORS = {
  transport: 'var(--itin-aqua)',
  sightseeing: 'var(--itin-tangerine)',
  meal: 'var(--itin-lime)',
  hotel: '#A78BFA',
  shopping: '#F472B6',
};

export default function DayTimeline({ dayData, selectedStop, onStopSelect }) {
  if (!dayData?.stops?.length) {
    return (
      <div className="timeline-empty glass-panel">
        <div className="empty-icon">📍</div>
        <h3>No activities scheduled</h3>
        <p>This day is free for leisure or optional activities</p>
      </div>
    );
  }
  
  const stopsWithMeta = useMemo(() => dayData.stops.map((stop, idx) => ({
    ...stop,
    index: idx,
    Icon: STOP_ICONS[stop.type] || MapPin,
    typeColor: TYPE_COLORS[stop.type] || TYPE_COLORS.sightseeing,
    isSelected: selectedStop?.title === stop.title,
  })), [dayData.stops, selectedStop]);
  
  return (
    <div className="day-timeline" role="list" aria-label={`Day ${dayData.day} schedule`}>
      {/* Timeline rail */}
      <div className="timeline-rail" aria-hidden="true" />
      
      {stopsWithMeta.map((stop) => (
        <TimelineStop
          key={`${stop.title}-${stop.index}`}
          stop={stop}
          onSelect={onStopSelect}
        />
      ))}
    </div>
  );
}