import React from 'react';
import { Car, Landmark, UtensilsCrossed, ShoppingBag, MapPin } from 'lucide-react';
import './styles/ProximityInline.css';

const CATEGORY_CONFIG = {
  landmarks: { icon: Landmark, label: 'Landmark', color: 'amber' },
  transport: { icon: Car, label: 'Transit', color: 'cyan' },
  dining: { icon: UtensilsCrossed, label: 'Dining', color: 'emerald' },
  shopping: { icon: ShoppingBag, label: 'Market', color: 'purple' },
};

export default function ProximityInline({ proximity }) {
  if (!proximity) return null;
  const { transport = [], landmarks = [], dining = [], shopping = [] } = proximity;

  // Pick top relevant places to keep it compact and clean
  const items = [];
  landmarks.slice(0, 2).forEach(item => items.push({ ...item, type: 'landmarks' }));
  dining.slice(0, 1).forEach(item => items.push({ ...item, type: 'dining' }));
  transport.slice(0, 1).forEach(item => items.push({ ...item, type: 'transport' }));
  shopping.slice(0, 1).forEach(item => items.push({ ...item, type: 'shopping' }));

  if (items.length === 0) return null;

  return (
    <div className="proximity-inline-compact" role="region" aria-label="Nearby landmarks and proximity">
      <div className="proximity-chips-row">
        {items.map((item, idx) => {
          const cfg = CATEGORY_CONFIG[item.type] || { icon: MapPin, label: 'Nearby', color: 'amber' };
          const Icon = cfg.icon;
          return (
            <div key={idx} className={`proximity-chip type-${item.type}`}>
              <Icon size={12} className={`chip-icon text-${cfg.color}`} />
              <span className="chip-name" title={item.name}>{item.name}</span>
              <span className="chip-dist">{item.dist}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}