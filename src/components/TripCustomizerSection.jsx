import React, { useState } from 'react';
import { Sliders, Sparkles, Check, MessageCircle, ShieldCheck, Phone, Compass, Car, Hotel, Calendar, Award } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function TripCustomizerSection() {
  const { formatPrice } = useCurrency();

  const [destination, setDestination] = useState('Kashmir');
  const [days, setDays] = useState(6);
  const [hotelTier, setHotelTier] = useState('4star');
  const [vehicle, setVehicle] = useState('suv');
  const [selectedAddons, setSelectedAddons] = useState(['dinner', 'vip']);

  const destinations = [
    { id: 'Kashmir', name: '🏔️ Kashmir & Gulmarg', basePerDay: 3200 },
    { id: 'Bali', name: '🏝️ Bali & Nusa Penida', basePerDay: 5400 },
    { id: 'Swiss Alps', name: '🇨🇭 Swiss Alps & Glaciers', basePerDay: 19500 },
    { id: 'Dubai', name: '🏙️ Dubai & Abu Dhabi', basePerDay: 7200 },
    { id: 'Andaman', name: '🏖️ Andaman Coral Island', basePerDay: 3900 },
    { id: 'Kerala', name: '🌿 Kerala & Houseboat', basePerDay: 3000 }
  ];

  const hotelTiers = [
    { id: '3star', label: '⭐ 3-Star Deluxe', multiplier: 1.0, desc: 'Clean boutique stays + breakfast' },
    { id: '4star', label: '⭐⭐⭐⭐ 4-Star Premium', multiplier: 1.25, desc: 'Top-tier resorts, prime views & buffet' },
    { id: '5star', label: '⭐⭐⭐⭐⭐ 5-Star Palace / Villa', multiplier: 1.7, desc: 'Royal luxury, private pool & VIP treatment' }
  ];

  const vehicles = [
    { id: 'sedan', label: '🚗 Private AC Sedan', extra: 0, desc: 'Swift Dzire / Etios for couples' },
    { id: 'suv', label: '🚙 Luxury SUV / Crysta', extra: 1200, desc: 'Innova Crysta comfort for family' },
    { id: 'tempo', label: '🚐 VIP Luxury Mini Coach', extra: 2800, desc: 'Ultra-plush seats for groups' }
  ];

  const addonsList = [
    { id: 'dinner', label: '🕯️ Private Candlelight Dinner', cost: 3500 },
    { id: 'vip', label: '🎟️ VIP Fast-Track Pass / Gondola', cost: 4500 },
    { id: 'heli', label: '🚁 Helicopter Shuttle / Joyride', cost: 12000 },
    { id: 'spa', label: '💆 2-Hour Luxury Couple Spa', cost: 4000 }
  ];

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  // Calculate dynamic price
  const activeDest = destinations.find((d) => d.id === destination) || destinations[0];
  const activeHotel = hotelTiers.find((h) => h.id === hotelTier) || hotelTiers[1];
  const activeVehicle = vehicles.find((v) => v.id === vehicle) || vehicles[1];

  const baseCost = activeDest.basePerDay * days * activeHotel.multiplier;
  const vehicleCost = activeVehicle.extra * (days / 2);
  const addonsCost = selectedAddons.reduce((sum, addId) => {
    const found = addonsList.find((a) => a.id === addId);
    return sum + (found ? found.cost : 0);
  }, 0);

  const totalEstimatedCost = Math.round(baseCost + vehicleCost + addonsCost);

  const handleWhatsAppCustomQuote = () => {
    const addonsNames = selectedAddons
      .map((id) => addonsList.find((a) => a.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const msg = encodeURIComponent(
      `Hi Comfort Journey! 🌟 I customized a dream trip on your website:\n` +
      `• *Destination:* ${activeDest.name}\n` +
      `• *Duration:* ${days} Days / ${days - 1} Nights\n` +
      `• *Hotel Style:* ${activeHotel.label}\n` +
      `• *Vehicle:* ${activeVehicle.label}\n` +
      `• *Add-ons:* ${addonsNames || 'None'}\n` +
      `• *Calculated Estimate:* ${formatPrice(totalEstimatedCost)} / person\n\n` +
      `Please connect with me to finalize hotels and date availability!`
    );
    window.open(`https://wa.me/918770403315?text=${msg}`, '_blank');
  };

  return (
    <section id="custom-builder" className="customizer-root">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-gold">Interactive Trip Studio</span>
          <h2 className="section-title">
            Design Your Trip & <span className="gradient-text-gold">Calculate Live Budget</span>
          </h2>
          <p className="section-subtitle">
            Fine-tune your destinations, hotel stars, private vehicle, and VIP experiences to see instant real-time pricing.
          </p>
        </div>

        {/* Builder Studio Grid */}
        <div className="customizer-grid">
          {/* Controls Column */}
          <div className="controls-panel">
            {/* 1. Destination Selection */}
            <div className="control-group">
              <label className="control-label">1. Choose Your Destination</label>
              <div className="dest-chips-grid">
                {destinations.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    className={`dest-chip ${destination === d.id ? 'active' : ''}`}
                    onClick={() => setDestination(d.id)}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Duration Slider */}
            <div className="control-group">
              <div className="label-with-value">
                <label className="control-label">2. Trip Duration (Days)</label>
                <span className="slider-value-pill">{days} Days / {days - 1} Nights</span>
              </div>
              <input 
                type="range" 
                min="3" 
                max="12" 
                step="1" 
                value={days} 
                onChange={(e) => setDays(Number(e.target.value))}
                className="custom-range-slider"
              />
              <div className="slider-range-labels">
                <span>3 Days</span>
                <span>6 Days (Popular)</span>
                <span>9 Days</span>
                <span>12 Days</span>
              </div>
            </div>

            {/* 3. Hotel Category */}
            <div className="control-group">
              <label className="control-label">3. Hotel & Resort Standard</label>
              <div className="options-grid">
                {hotelTiers.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    className={`option-card ${hotelTier === h.id ? 'selected' : ''}`}
                    onClick={() => setHotelTier(h.id)}
                  >
                    <span className="opt-title">{h.label}</span>
                    <span className="opt-desc">{h.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Transport Style */}
            <div className="control-group">
              <label className="control-label">4. Private Chauffeur Vehicle</label>
              <div className="options-grid">
                {vehicles.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    className={`option-card ${vehicle === v.id ? 'selected' : ''}`}
                    onClick={() => setVehicle(v.id)}
                  >
                    <span className="opt-title">{v.label}</span>
                    <span className="opt-desc">{v.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Luxury Add-ons */}
            <div className="control-group">
              <label className="control-label">5. Optional Luxury Experiences</label>
              <div className="addons-grid">
                {addonsList.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      className={`addon-chip ${isChecked ? 'active' : ''}`}
                      onClick={() => toggleAddon(addon.id)}
                    >
                      <div className={`checkbox-box ${isChecked ? 'checked' : ''}`}>
                        {isChecked && <Check size={12} />}
                      </div>
                      <span className="addon-text">{addon.label}</span>
                      <span className="addon-cost">+{formatPrice(addon.cost)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live Summary & Checkout Card */}
          <div className="summary-panel">
            <div className="glass-card-dark summary-card">
              <div className="summary-badge">
                <Sparkles size={14} className="text-primary" />
                <span>Live Itinerary Estimate</span>
              </div>

              <h3 className="summary-dest">{activeDest.name}</h3>
              <p className="summary-sub">{days} Days / {days - 1} Nights • Private Tour</p>

              <div className="summary-breakdown">
                <div className="breakdown-row">
                  <span>Hotel Tier</span>
                  <strong>{activeHotel.label.split(' ')[0]} {activeHotel.label.split(' ')[1]}</strong>
                </div>
                <div className="breakdown-row">
                  <span>Chauffeur Vehicle</span>
                  <strong>{activeVehicle.label.split(' ')[1]} {activeVehicle.label.split(' ')[2] || ''}</strong>
                </div>
                <div className="breakdown-row">
                  <span>Selected Add-ons</span>
                  <strong>{selectedAddons.length} Experiences</strong>
                </div>
                <div className="breakdown-row">
                  <span>24/7 Concierge Support</span>
                  <strong className="text-accent">FREE Included</strong>
                </div>
              </div>

              {/* Total Estimated Price Display */}
              <div className="total-price-box">
                <span className="t-label">Estimated Package Price</span>
                <div className="t-val-wrap">
                  <span className="t-price">{formatPrice(totalEstimatedCost)}</span>
                  <span className="t-unit">/ person</span>
                </div>
                <span className="t-guarantee">🛡️ Best Price & 100% Verified Stays Guaranteed</span>
              </div>

              {/* Action Buttons */}
              <button 
                type="button" 
                className="btn-whatsapp w-full lock-price-btn"
                onClick={handleWhatsAppCustomQuote}
              >
                <MessageCircle size={20} />
                Lock This Itinerary on WhatsApp
              </button>

              <a href="tel:+918770403315" className="btn-secondary w-full call-expert-btn">
                <Phone size={18} />
                Speak to Travel Expert
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .customizer-root {
          padding: 6.5rem 0;
          background: #070B14;
          color: #FFFFFF;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .customizer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 3rem;
          margin-top: 3.5rem;
          align-items: flex-start;
        }

        .controls-panel {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .control-label {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.05rem;
          color: #FFFFFF;
          letter-spacing: 0.02em;
        }

        .label-with-value {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .slider-value-pill {
          background: rgba(255, 107, 0, 0.15);
          color: var(--color-primary);
          border: 1px solid rgba(255, 107, 0, 0.3);
          font-weight: 800;
          font-size: 0.85rem;
          padding: 0.3rem 0.85rem;
          border-radius: var(--radius-full);
        }

        .custom-range-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 5px;
          background: #1E293B;
          outline: none;
          cursor: pointer;
        }

        .custom-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--color-primary);
          box-shadow: 0 0 12px var(--color-primary);
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .custom-range-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .slider-range-labels {
          display: flex;
          justify-content: space-between;
          color: #64748B;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .dest-chips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 0.75rem;
        }

        .dest-chip {
          background: #131D33;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #CBD5E1;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          text-align: left;
          transition: all 0.2s ease;
        }

        .dest-chip:hover {
          border-color: var(--color-primary);
          color: #FFFFFF;
        }

        .dest-chip.active {
          background: rgba(255, 107, 0, 0.18);
          border-color: var(--color-primary);
          color: #FFFFFF;
          box-shadow: 0 0 15px rgba(255, 107, 0, 0.25);
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 0.75rem;
        }

        .option-card {
          background: #131D33;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.85rem 1rem;
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          text-align: left;
          transition: all 0.2s ease;
        }

        .option-card:hover {
          border-color: rgba(255, 107, 0, 0.5);
        }

        .option-card.selected {
          border-color: var(--color-primary);
          background: rgba(255, 107, 0, 0.15);
        }

        .opt-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.92rem;
          color: #FFFFFF;
        }

        .opt-desc {
          font-size: 0.75rem;
          color: #94A3B8;
        }

        .addons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 0.75rem;
        }

        .addon-chip {
          background: #131D33;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-align: left;
          transition: all 0.2s ease;
        }

        .addon-chip.active {
          border-color: var(--color-accent);
          background: rgba(16, 185, 129, 0.12);
        }

        .checkbox-box {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border: 1.5px solid #64748B;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .checkbox-box.checked {
          background: var(--color-accent);
          border-color: var(--color-accent);
          color: #FFFFFF;
        }

        .addon-text {
          font-size: 0.85rem;
          font-weight: 600;
          color: #FFFFFF;
          flex: 1;
        }

        .addon-cost {
          font-size: 0.78rem;
          font-weight: 800;
          color: #FFB800;
        }

        /* Summary Panel */
        .summary-panel {
          position: sticky;
          top: 100px;
        }

        .summary-card {
          padding: 2.25rem;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5), 0 0 35px rgba(255, 107, 0, 0.15);
        }

        .summary-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 107, 0, 0.15);
          color: var(--color-primary);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 0.85rem;
        }

        .summary-dest {
          font-size: 1.75rem;
          color: #FFFFFF;
          margin-bottom: 0.25rem;
        }

        .summary-sub {
          color: #94A3B8;
          font-size: 0.92rem;
          margin-bottom: 1.75rem;
        }

        .summary-breakdown {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding: 1.25rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 1.75rem;
        }

        .breakdown-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.88rem;
          color: #CBD5E1;
        }

        .breakdown-row strong {
          color: #FFFFFF;
        }

        .total-price-box {
          text-align: center;
          margin-bottom: 1.75rem;
        }

        .t-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #94A3B8;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.25rem;
        }

        .t-val-wrap {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.4rem;
        }

        .t-price {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 2.3rem;
          color: #FFB800;
          line-height: 1;
        }

        .t-unit {
          font-size: 0.95rem;
          color: #CBD5E1;
        }

        .t-guarantee {
          display: block;
          font-size: 0.75rem;
          color: var(--color-accent);
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .lock-price-btn {
          margin-bottom: 0.75rem;
          justify-content: center;
          padding: 1rem;
          font-size: 1rem;
        }

        .call-expert-btn {
          justify-content: center;
          padding: 0.85rem;
        }

        @media (max-width: 960px) {
          .customizer-grid {
            grid-template-columns: 1fr;
          }
          .summary-panel {
            position: static;
          }
        }
      `}</style>
    </section>
  );
}
