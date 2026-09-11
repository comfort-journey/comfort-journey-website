import React from 'react';
import {
  Hotel, Building2, Car, Plane, Train, Utensils,
  Ticket, ShieldCheck, UserCheck, Ship, FileCheck, Sparkles
} from 'lucide-react';

export const CARD_FEATURE_OPTIONS = [
  { id: 'stay', label: 'Stay', title: '4-Star / 5-Star Luxury Stay', icon: Hotel, color: 'amber' },
  { id: 'hotel', label: 'Hotel', title: 'Heritage Resort & Hotel Stay', icon: Building2, color: 'amber' },
  { id: 'cab', label: 'Cab', title: 'Private AC Cab & Chauffeur', icon: Car, color: 'cyan' },
  { id: 'flight', label: 'Flight', title: 'Flight Tickets Included', icon: Plane, color: 'sky' },
  { id: 'train', label: 'Train', title: 'Vande Bharat / Express Rail', icon: Train, color: 'indigo' },
  { id: 'meals', label: 'Meals', title: 'Daily Breakfast & Meals', icon: Utensils, color: 'emerald' },
  { id: 'sightseeing', label: 'Sightseeing', title: 'VIP Sightseeing & Entry Passes', icon: Ticket, color: 'amber' },
  { id: 'vip', label: '24/7 VIP', title: '24/7 Dedicated VIP Concierge', icon: ShieldCheck, color: 'emerald' },
  { id: 'guide', label: 'Guide', title: 'Certified Local Tour Guide', icon: UserCheck, color: 'gold' },
  { id: 'cruise', label: 'Cruise', title: 'Houseboat / Luxury Cruise', icon: Ship, color: 'cyan' },
  { id: 'visa', label: 'Visa', title: 'Visa Assistance Included', icon: FileCheck, color: 'purple' },
  { id: 'activities', label: 'Activities', title: 'Adventure & Cultural Activities', icon: Sparkles, color: 'pink' }
];

export const FEATURE_ICONS_MAP = {
  Hotel, Building2, Car, Plane, Train, Utensils,
  Ticket, ShieldCheck, UserCheck, Ship, FileCheck, Sparkles
};

export default function CardInclusionsStrip({ tour, className = '' }) {
  // If tour has custom selected cardFeatures, display those.
  // Otherwise, default to standard luxury travel icons: ['stay', 'cab', 'meals', 'sightseeing', 'vip']
  const selectedFeatureIds = (tour?.cardFeatures && Array.isArray(tour.cardFeatures) && tour.cardFeatures.length > 0)
    ? tour.cardFeatures
    : ['stay', 'cab', 'meals', 'sightseeing', 'vip'];

  // Limit to 5 features for the uniform 5-column grid layout
  const displayFeatureIds = selectedFeatureIds.slice(0, 5);

  return (
    <div className={`compact-inclusions-icon-bar ${className}`}>
      {displayFeatureIds.map(featId => {
        const feat = CARD_FEATURE_OPTIONS.find(f => f.id === featId);
        if (!feat) return null;
        const IconComponent = feat.icon;
        return (
          <div key={feat.id} className="inc-icon-item" title={feat.title}>
            <div className="inc-svg-badge">
              <IconComponent size={16} className={`text-${feat.color}`} />
            </div>
            <span className="inc-text">{feat.label}</span>
          </div>
        );
      })}
    </div>
  );
}
