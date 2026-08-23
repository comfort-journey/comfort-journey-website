import React, { useState } from 'react';
import { Sliders, Calendar, Hotel, Car, Check, Sparkles, MessageCircle, ShieldCheck, ArrowRight, DollarSign } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function TripCustomizerSection() {
  const { formatPrice } = useCurrency();

  const [destination, setDestination] = useState('Kashmir Paradise');
  const [durationDays, setDurationDays] = useState(6);
  const [hotelTier, setHotelTier] = useState('4-star'); // '3-star', '4-star', '5-star'
  const [vehicleType, setVehicleType] = useState('suv'); // 'sedan', 'suv', 'tempo'
  const [travelersCount, setTravelersCount] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState(['candlelight', 'vip-pass']);

  const destinationsList = [
    { name: 'Kashmir Paradise', basePricePerDay: 3200, country: 'India' },
    { name: 'Exotic Bali & Nusa Penida', basePricePerDay: 5100, country: 'Indonesia' },
    { name: 'Swiss Alps & Titlis', basePricePerDay: 19500, country: 'Switzerland' },
    { name: 'Dubai & Red Dunes', basePricePerDay: 7200, country: 'UAE' },
    { name: 'Iceland Aurora & Glaciers', basePricePerDay: 26000, country: 'Iceland' },
    { name: 'Kenya Maasai Mara Safari', basePricePerDay: 24000, country: 'Kenya' },
    { name: 'Andaman Coral Islands', basePricePerDay: 3800, country: 'India' },
    { name: 'Amalfi Coast & Rome', basePricePerDay: 23500, country: 'Italy' },
    { name: 'Sacred Char Dham Yatra', basePricePerDay: 3500, country: 'India' }
  ];

  const hotelTiers = [
    { id: '3-star', label: '3-Star Comfort', mult: 1.0, desc: 'Clean, verified boutique hotels & cozy stays' },
    { id: '4-star', label: '4-Star Premium Deluxe', mult: 1.35, desc: 'Luxury properties, valley views & gourmet buffet' },
    { id: '5-star', label: '5-Star Palace / Villa', mult: 1.85, desc: 'Royal palaces, overwater villas & private butlers' }
  ];

  const vehicles = [
    { id: 'sedan', label: 'Private AC Sedan', price: 1500, desc: 'Swift Dzire / Etios for couple' },
    { id: 'suv', label: 'Luxury SUV Crysta', price: 2800, desc: 'Toyota Innova Crysta for comfort' },
    { id: 'tempo', label: 'VIP Sprinter / Tempo', price: 4800, desc: '12-Seater sanitized coach for family' }
  ];

  const addonsList = [
    { id: 'candlelight', label: 'Private Candlelight Beach/Lake Dinner', price: 4500 },
    { id: 'heli', label: 'Helicopter Joyride / Mountain Shuttle', price: 9500 },
    { id: 'scuba', label: 'Scuba Diving & Underwater Photoshoot', price: 3800 },
    { id: 'vip-pass', label: 'VIP Fast-Track Monument & Cable Car Passes', price: 3200 },
    { id: 'spa', label: 'Couple 2-Hour Aromatherapy Rejuvenation Spa', price: 5000 }
  ];

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate live dynamic price per person
  const currentDest = destinationsList.find((d) => d.name === destination) || destinationsList[0];
  const hotelMultiplier = hotelTiers.find((h) => h.id === hotelTier)?.mult || 1.0;
  const vehicleCost = vehicles.find((v) => v.id === vehicleType)?.price || 0;
  
  const addonsTotal = selectedAddons.reduce((acc, id) => {
    const item = addonsList.find((a) => a.id === id);
    return acc + (item ? item.price : 0);
  }, 0);

  const baseCalculated = Math.round((currentDest.basePricePerDay * durationDays * hotelMultiplier) + (vehicleCost * durationDays * 0.4) + addonsTotal);

  const handleLockInquiry = () => {
    const hotelLabel = hotelTiers.find((h) => h.id === hotelTier)?.label;
    const vehicleLabel = vehicles.find((v) => v.id === vehicleType)?.label;
    const activeAddonNames = selectedAddons.map((id) => addonsList.find((a) => a.id === id)?.label).join(', ');

    const message = `Hi Comfort Journey! I customized an itinerary in your Trip Studio:
📍 Destination: ${destination}
⏱️ Duration: ${durationDays} Days / ${durationDays - 1} Nights
🏨 Hotel Tier: ${hotelLabel}
🚗 Private Transport: ${vehicleLabel}
👥 Travelers: ${travelersCount} Person(s)
✨ Luxury Add-ons: ${activeAddonNames || 'None'}
💰 Estimated Cost: ${formatPrice(baseCalculated)} / person

Please share the day-by-day customized itinerary proposal!`;

    window.open(`https://wa.me/918770403315?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="custom-builder" className="studio-root">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge badge-amber">
            <Sliders size={14} />
            <span>Interactive Trip Studio</span>
          </div>
          <h2 className="section-title">
            Design Your Trip & <span className="gradient-text-gold">Estimate Live Budget</span>
          </h2>
          <p className="section-subtitle">
            Adjust duration, hotel standards, transport, and luxury perks. Watch your budget recalculate in real time.
          </p>
        </div>

        {/* Studio Workspace Grid */}
        <div className="studio-grid">
          {/* Controls Left Column */}
          <div className="studio-controls glass-card">
            {/* Step 1: Destination Selection */}
            <div className="studio-block">
              <label className="block-label">1. Choose Dream Destination</label>
              <div className="dest-pills-wrap">
                {destinationsList.map((d) => (
                  <button
                    key={d.name}
                    type="button"
                    className={`dest-pill ${destination === d.name ? 'active' : ''}`}
                    onClick={() => setDestination(d.name)}
                  >
                    <span>{d.name}</span>
                    <small>{d.country}</small>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: 3-14 Days Range Slider */}
            <div className="studio-block">
              <div className="slider-label-row">
                <label className="block-label">2. Trip Duration (Days)</label>
                <span className="duration-bubble">{durationDays} Days ({durationDays - 1} Nights)</span>
              </div>
              <input
                type="range"
                min="3"
                max="14"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="custom-range-slider"
              />
              <div className="slider-marks">
                <span>3 Days (Short)</span>
                <span>7 Days (Popular)</span>
                <span>14 Days (Grand)</span>
              </div>
            </div>

            {/* Step 3: Hotel Standards */}
            <div className="studio-block">
              <label className="block-label">3. Select Accommodation Standard</label>
              <div className="cards-selection-row">
                {hotelTiers.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    className={`tier-card ${hotelTier === tier.id ? 'active' : ''}`}
                    onClick={() => setHotelTier(tier.id)}
                  >
                    <Hotel size={18} className="text-amber" />
                    <strong>{tier.label}</strong>
                    <span>{tier.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Private Transport */}
            <div className="studio-block">
              <label className="block-label">4. Dedicated Private Transport</label>
              <div className="cards-selection-row">
                {vehicles.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    className={`tier-card ${vehicleType === v.id ? 'active' : ''}`}
                    onClick={() => setVehicleType(v.id)}
                  >
                    <Car size={18} className="text-amber" />
                    <strong>{v.label}</strong>
                    <span>{v.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Luxury Add-ons */}
            <div className="studio-block">
              <label className="block-label">5. Curated VIP Add-ons</label>
              <div className="addons-checkboxes-list">
                {addonsList.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`addon-item ${isChecked ? 'active' : ''}`}
                      onClick={() => toggleAddon(addon.id)}
                    >
                      <div className="addon-check-box">
                        {isChecked && <Check size={14} className="text-white" />}
                      </div>
                      <span className="addon-text">{addon.label}</span>
                      <strong className="addon-price">+{formatPrice(addon.price)}</strong>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-time Summary Sidebar */}
          <div className="studio-summary-pane glass-panel">
            <div className="summary-badge">
              <Sparkles size={14} />
              <span>Real-Time Estimation</span>
            </div>

            <h3 className="summary-title">{destination}</h3>
            <p className="summary-dest-country">{currentDest.country} • {durationDays} Days / {durationDays - 1} Nights</p>

            <div className="summary-breakdown">
              <div className="breakdown-row">
                <span>Accommodation:</span>
                <strong>{hotelTiers.find((h) => h.id === hotelTier)?.label}</strong>
              </div>

              <div className="breakdown-row">
                <span>Chauffeur & Cab:</span>
                <strong>{vehicles.find((v) => v.id === vehicleType)?.label}</strong>
              </div>

              <div className="breakdown-row">
                <span>Selected Add-ons:</span>
                <strong>{selectedAddons.length} Perks Selected</strong>
              </div>

              <div className="breakdown-row">
                <span>24/7 VIP Concierge:</span>
                <strong className="text-emerald">Complimentary</strong>
              </div>
            </div>

            {/* Big Price Box */}
            <div className="live-price-box">
              <span className="price-tagline">Estimated Price Per Person</span>
              <span className="big-calc-price">{formatPrice(baseCalculated)}</span>
              <small className="tax-subtext">*Includes stays, private transfers, daily breakfast & all road taxes</small>
            </div>

            {/* Lock WhatsApp Button */}
            <button
              type="button"
              className="btn-whatsapp w-full lock-btn"
              onClick={handleLockInquiry}
            >
              <MessageCircle size={20} />
              <span>Lock This Itinerary on WhatsApp</span>
            </button>

            <div className="summary-trust-bullets">
              <div className="trust-bullet">
                <ShieldCheck size={16} className="text-emerald" />
                <span>Zero Hidden Costs Guarantee</span>
              </div>
              <div className="trust-bullet">
                <ShieldCheck size={16} className="text-emerald" />
                <span>100% Bespoke Changes Supported</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .studio-root {
          padding: 3.5rem 0 2.5rem 0;
          background: var(--cj-bg-obsidian);
          color: #FFFFFF;
        }

        .section-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: clamp(2.2rem, 4.5vw, 3.2rem);
          margin: 0.85rem 0;
          line-height: 1.2;
        }

        .section-subtitle {
          max-width: 680px;
          margin: 0 auto;
          color: #94A3B8;
          font-size: 1.05rem;
        }

        .studio-grid {
          display: grid;
          grid-template-columns: 1.55fr 1fr;
          gap: 2rem;
          align-items: flex-start;
        }

        .studio-controls {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          background: rgba(19, 29, 51, 0.75);
        }

        .studio-block {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .block-label {
          font-family: var(--font-ui);
          font-size: 0.92rem;
          font-weight: 800;
          color: #FFFFFF;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .dest-pills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .dest-pill {
          display: flex;
          flex-direction: column;
          text-align: left;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--cj-glass-border);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-sm);
          color: #E2E8F0;
          transition: all 0.2s ease;
        }

        .dest-pill small {
          font-size: 0.68rem;
          color: #94A3B8;
        }

        .dest-pill:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: var(--cj-amber-500);
        }

        .dest-pill.active {
          background: rgba(255, 107, 0, 0.2);
          border-color: var(--cj-amber-500);
          color: #FFFFFF;
        }

        .dest-pill.active small {
          color: var(--cj-amber-500);
        }

        .slider-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .duration-bubble {
          font-family: var(--font-ui);
          font-weight: 800;
          font-size: 0.95rem;
          color: var(--cj-amber-500);
          background: rgba(255, 107, 0, 0.15);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
        }

        .custom-range-slider {
          width: 100%;
          accent-color: var(--cj-amber-500);
          height: 8px;
          border-radius: 4px;
          cursor: pointer;
        }

        .slider-marks {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #94A3B8;
        }

        .cards-selection-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 0.75rem;
        }

        .tier-card {
          padding: 1rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--cj-glass-border);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.35rem;
          text-align: left;
          color: #FFFFFF;
          transition: all 0.2s ease;
        }

        .tier-card span {
          font-size: 0.75rem;
          color: #94A3B8;
        }

        .tier-card:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .tier-card.active {
          background: rgba(255, 184, 0, 0.18);
          border-color: var(--cj-gold-500);
          box-shadow: 0 0 20px rgba(255, 184, 0, 0.25);
        }

        .addons-checkboxes-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .addon-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--cj-glass-border);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .addon-item:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .addon-item.active {
          background: rgba(255, 107, 0, 0.15);
          border-color: var(--cj-amber-500);
        }

        .addon-check-box {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: rgba(0, 0, 0, 0.3);
        }

        .addon-item.active .addon-check-box {
          background: var(--cj-amber-500);
          border-color: var(--cj-amber-500);
        }

        .addon-text {
          font-size: 0.88rem;
          color: #E2E8F0;
          flex: 1;
        }

        .addon-price {
          font-family: var(--font-ui);
          font-size: 0.85rem;
          color: var(--cj-gold-500);
        }

        /* Summary Pane */
        .studio-summary-pane {
          padding: 2.5rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: sticky;
          top: 90px;
        }

        .summary-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-ui);
          font-size: 0.75rem;
          font-weight: 800;
          color: #C084FC;
          text-transform: uppercase;
        }

        .summary-title {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          color: #FFFFFF;
          line-height: 1.2;
        }

        .summary-dest-country {
          font-size: 0.88rem;
          color: #94A3B8;
          margin-top: -0.85rem;
        }

        .summary-breakdown {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          padding: 1.25rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .breakdown-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
        }

        .breakdown-row span {
          color: #94A3B8;
        }

        .breakdown-row strong {
          color: #FFFFFF;
          font-family: var(--font-ui);
        }

        .live-price-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1.25rem;
          background: rgba(0, 0, 0, 0.35);
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 184, 0, 0.25);
        }

        .price-tagline {
          font-family: var(--font-ui);
          font-size: 0.75rem;
          font-weight: 800;
          color: #94A3B8;
          text-transform: uppercase;
        }

        .big-calc-price {
          font-family: var(--font-serif);
          font-size: 2.45rem;
          font-weight: 900;
          color: var(--cj-gold-500);
          line-height: 1.2;
          margin: 0.25rem 0;
        }

        .tax-subtext {
          font-size: 0.7rem;
          color: #64748B;
        }

        .lock-btn {
          padding: 1rem;
          font-size: 1rem;
          justify-content: center;
          width: 100%;
        }

        .summary-trust-bullets {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .trust-bullet {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: #CBD5E1;
        }

        @media (max-width: 990px) {
          .studio-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .studio-summary-pane {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .studio-root {
            padding: 2.5rem 0 2rem 0;
          }
          .section-title {
            font-size: 2.2rem;
          }
          .dest-pills-wrap {
            display: flex;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 0.5rem;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            width: 100%;
          }
          .dest-pill {
            flex-shrink: 0;
            white-space: nowrap;
            min-height: 44px;
            padding: 0.5rem 0.95rem;
          }
          .cards-selection-row {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          .tier-card {
            min-height: 48px;
            padding: 1rem;
          }
          .addon-item {
            min-height: 48px;
            padding: 0.85rem 1rem;
          }
          .studio-summary-pane {
            padding: 1.5rem 1.25rem;
            border-radius: 20px;
          }
          .big-calc-price {
            font-size: 2.2rem;
          }
          .lock-btn {
            min-height: 50px;
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
