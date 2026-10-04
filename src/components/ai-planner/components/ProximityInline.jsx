import React from 'react';
import { Car, Landmark, UtensilsCrossed, ShoppingBag, MapPin } from 'lucide-react';
import './styles/ProximityInline.css';

export default function ProximityInline({ proximity }) {
  const { transport = [], landmarks = [], dining = [], shopping = [] } = proximity;
  const totalPlaces = transport.length + landmarks.length + dining.length + shopping.length;

  if (totalPlaces === 0) return null;

  const columns = [
    { key: 'transport', label: 'Transport', icon: Car, color: 'cyan', items: transport },
    { key: 'landmarks', label: 'Landmarks', icon: Landmark, color: 'amber', items: landmarks },
    { key: 'dining', label: 'Dining', icon: UtensilsCrossed, color: 'lime', items: dining },
    { key: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'pink', items: shopping },
  ].filter(col => col.items.length > 0);

  return (
    <div className="proximity-inline" role="region" aria-label="Nearby places">
      <div className="proximity-grid">
        {columns.map((col) => (
          <div key={col.key} className="proximity-column">
            <div className="column-header">
              <col.icon size={11} className={`text-${col.color}`} aria-hidden="true" />
              <h5>{col.label}</h5>
            </div>
            <ul className="places-list" role="list">
              {col.items.slice(0, 5).map((item, idx) => (
                <li key={idx} className="place-item" role="listitem">
                  <span className="place-name">{item.name}</span>
                  <span className="place-distance">{item.dist}</span>
                </li>
              ))}
              {col.items.length > 5 && (
                <li className="place-item more">
                  <span>+{col.items.length - 5} more</span>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}