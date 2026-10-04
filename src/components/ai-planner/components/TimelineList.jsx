import React, { useMemo } from 'react';
import { Clock, MapPin, Utensils, BedDouble, ShoppingBag, Camera, ChevronDown, ChevronUp } from 'lucide-react';
import TimelineStop from './TimelineStop';
import './styles/TimelineList.css';

const STOP_ICONS = {
  transport: Car,
  sightseeing: Camera,
  meal: Utensils,
  hotel: BedDouble,
  shopping: ShoppingBag,
};

export default function TimelineList({
  stops = [],
  selectedStop,
  proximityExpandedStop,
  onStopSelect,
  onProximityToggle
}) {
  const timelineItems = useMemo(() => stops.map((stop, idx) => ({
    ...stop,
    index: idx,
    Icon: STOP_ICONS[stop.type] || MapPin,
    isSelected: selectedStop?.title === stop.title,
    isProximityOpen: proximityExpandedStop?.title === stop.title,
  })), [stops, selectedStop, proximityExpandedStop]);

  if (!timelineItems.length) {
    return (
      <div className="timeline-empty">
        <div className="empty-icon">
          <MapPin size={32} />
        </div>
        <p>No activities planned for this day</p>
        <span className="empty-hint">Select another day or customize your trip</span>
      </div>
    );
  }

  return (
    <div className="timeline-list" role="list" aria-label="Day timeline">
      {/* Connecting rail */}
      <div className="timeline-rail" aria-hidden="true" />
      
      {timelineItems.map((stop) => (
        <TimelineStop
          key={`${stop.title}-${stop.index}`}
          stop={stop}
          onSelect={onStopSelect}
          onProximityToggle={onProximityToggle}
        />
      ))}
    </div>
  );
}