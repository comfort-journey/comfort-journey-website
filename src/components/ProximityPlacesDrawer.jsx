import React, { useState } from 'react';
import { Car, Landmark, UtensilsCrossed, ShoppingBag, MapPin, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

/**
 * ProximityPlacesDrawer
 * Inspired by Trip.com's Location Breakdown (Transport, Landmarks, Dining, Shopping with meter & km distances).
 */
export default function ProximityPlacesDrawer({ stop }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!stop || !stop.proximity) {
    return null;
  }

  const { transport = [], landmarks = [], dining = [], shopping = [] } = stop.proximity;

  return (
    <div className="proximity-drawer-container">
      <button 
        type="button" 
        className="proximity-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="toggle-left">
          <MapPin size={14} className="text-amber" />
          <span className="toggle-label">Location Proximity & What's Nearby</span>
          <span className="toggle-stop-name">({stop.title})</span>
        </div>
        <div className="toggle-right">
          <span className="items-count-badge">
            {transport.length + landmarks.length + dining.length + shopping.length} Places Found
          </span>
          {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
      </button>

      {isOpen && (
        <div className="proximity-content-grid animate-fade-in">
          {/* Transport */}
          {transport.length > 0 && (
            <div className="proximity-column">
              <div className="column-header">
                <Car size={13} className="text-cyan" />
                <h5>Transport & Transfers</h5>
              </div>
              <ul className="places-list">
                {transport.map((item, idx) => (
                  <li key={idx} className="place-item">
                    <span className="place-name">{item.name}</span>
                    <span className="place-distance">{item.dist}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Landmarks */}
          {landmarks.length > 0 && (
            <div className="proximity-column">
              <div className="column-header">
                <Landmark size={13} className="text-amber" />
                <h5>Key Landmarks & Views</h5>
              </div>
              <ul className="places-list">
                {landmarks.map((item, idx) => (
                  <li key={idx} className="place-item">
                    <span className="place-name">{item.name}</span>
                    <span className="place-distance">{item.dist}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dining */}
          {dining.length > 0 && (
            <div className="proximity-column">
              <div className="column-header">
                <UtensilsCrossed size={13} className="text-emerald" />
                <h5>Dining & Pure Veg Care</h5>
              </div>
              <ul className="places-list">
                {dining.map((item, idx) => (
                  <li key={idx} className="place-item">
                    <span className="place-name">{item.name}</span>
                    <span className="place-distance">{item.dist}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Shopping */}
          {shopping.length > 0 && (
            <div className="proximity-column">
              <div className="column-header">
                <ShoppingBag size={13} className="text-gold" />
                <h5>Shopping & Craft Bazaars</h5>
              </div>
              <ul className="places-list">
                {shopping.map((item, idx) => (
                  <li key={idx} className="place-item">
                    <span className="place-name">{item.name}</span>
                    <span className="place-distance">{item.dist}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <style>{`
        .proximity-drawer-container {
          background: rgba(0, 24, 69, 0.65);
          border: 1px solid rgba(255, 137, 47, 0.22);
          border-radius: 12px;
          margin-top: 10px;
          overflow: hidden;
          transition: border-color 0.2s ease;
        }

        .proximity-drawer-container:hover {
          border-color: rgba(255, 137, 47, 0.4);
        }

        .proximity-toggle-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 14px;
          background: rgba(0, 18, 51, 0.7);
          border: none;
          color: #FFFFFF;
          cursor: pointer;
          font-size: 0.76rem;
          text-align: left;
          gap: 10px;
        }

        .toggle-left {
          display: flex;
          align-items: center;
          gap: 7px;
          min-width: 0;
        }

        .toggle-label {
          font-weight: 700;
          color: #FF892F;
          white-space: nowrap;
        }

        .toggle-stop-name {
          color: rgba(255, 255, 255, 0.7);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .toggle-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          color: rgba(255, 255, 255, 0.6);
        }

        .items-count-badge {
          background: rgba(255, 137, 47, 0.15);
          color: #FF892F;
          border: 1px solid rgba(255, 137, 47, 0.3);
          border-radius: 20px;
          padding: 2px 8px;
          font-size: 0.68rem;
          font-weight: 600;
        }

        .proximity-content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
          padding: 12px 14px 14px;
          background: rgba(0, 18, 51, 0.4);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .proximity-column {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .column-header {
          display: flex;
          align-items: center;
          gap: 6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 4px;
        }

        .column-header h5 {
          margin: 0;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          color: rgba(255, 255, 255, 0.85);
        }

        .places-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .place-item {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          font-size: 0.73rem;
          gap: 8px;
          color: rgba(255, 255, 255, 0.75);
        }

        .place-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .place-distance {
          font-weight: 600;
          color: #FF892F;
          font-size: 0.68rem;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}
