import React from 'react';
import { Car, Landmark, UtensilsCrossed, ShoppingBag, MapPin } from 'lucide-react';
import './styles/ProximityInline.css';

export default function ProximityInline({ proximity }) {
  if (!proximity) return null;

  const { transport = [], landmarks = [], dining = [], shopping = [] } = proximity;
  const totalPlaces = transport.length + landmarks.length + dining.length + shopping.length;

  if (totalPlaces === 0) return null;

  const categories = [
    { key: 'transport', label: 'Transport Hubs', icon: Car, badgeClass: 'badge-transport', items: transport },
    { key: 'landmarks', label: 'Iconic Landmarks', icon: Landmark, badgeClass: 'badge-landmarks', items: landmarks },
    { key: 'dining', label: 'Dining & Cafes', icon: UtensilsCrossed, badgeClass: 'badge-dining', items: dining },
    { key: 'shopping', label: 'Local Bazaars', icon: ShoppingBag, badgeClass: 'badge-shopping', items: shopping },
  ].filter(col => col.items && col.items.length > 0);

  return (
    <div className="proximity-inline-container" role="region" aria-label="Nearby attractions and distances">
      <div className="proximity-section-eyebrow">
        <MapPin size={12} className="text-amber" />
        <span>Nearby Verified Stops & Road Distances</span>
      </div>

      <div className="proximity-category-grid">
        {categories.map((cat) => (
          <div key={cat.key} className="proximity-category-card">
            <div className="proximity-cat-header">
              <span className={`proximity-cat-icon-badge ${cat.badgeClass}`}>
                <cat.icon size={12} />
              </span>
              <h5 className="proximity-cat-title">{cat.label}</h5>
            </div>

            <div className="proximity-items-list" role="list">
              {cat.items.slice(0, 4).map((item, idx) => (
                <div key={idx} className="proximity-item-pill" role="listitem">
                  <span className="item-dot" />
                  <span className="item-name">{item.name}</span>
                  {item.dist && (
                    <span className="item-dist-badge">{item.dist}</span>
                  )}
                </div>
              ))}
              {cat.items.length > 4 && (
                <span className="proximity-more-count">
                  +{cat.items.length - 4} more nearby
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
