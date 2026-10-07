import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Sliders, Calendar, Hotel, Car, Check, Sparkles, MessageCircle,
  ShieldCheck, ArrowRight, DollarSign, ChevronDown, Search, X,
  MapPin, Star, Users, CheckCircle2, Compass, Tag, Mountain, Globe, Waves, Crown, Landmark
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { TOURS_DATA } from '../data/toursData';
import { contentService } from '../services/contentService';
import { siteSettingsService, EVENT_SETTINGS_UPDATED } from '../services/siteSettingsService';
import { parseTourDays } from '../utils/durationParser';

const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Tours', icon: Sparkles },
  { id: 'mountains', label: 'Mountains & Snow', icon: Mountain, keywords: ['kashmir', 'himachal', 'manali', 'dalhousie', 'ladakh', 'uttarakhand', 'shimla', 'dharamshala'] },
  { id: 'international', label: 'International', icon: Globe, keywords: ['bali', 'dubai', 'thailand', 'singapore', 'vietnam', 'maldives', 'international'] },
  { id: 'beach', label: 'Beach & Coastal', icon: Waves, keywords: ['goa', 'kerala', 'andaman', 'bali', 'phuket', 'thailand', 'beach', 'coastal'] },
  { id: 'heritage', label: 'Royal Heritage', icon: Crown, keywords: ['rajasthan', 'mp', 'madhya pradesh', 'orchha', 'gwalior', 'jaipur', 'udaipur', 'jodhpur', 'heritage', 'karnataka'] },
  { id: 'spiritual', label: 'Spiritual', icon: Landmark, keywords: ['varanasi', 'ayodhya', 'haridwar', 'mussoorie', 'kashi', 'temple', 'spiritual'] }
];

export default function TripCustomizerSection() {
  const { formatPrice } = useCurrency();

  // 1. Reactive settings from siteSettingsService
  const [studioSettings, setStudioSettings] = useState(() => siteSettingsService.getTripStudio());

  useEffect(() => {
    const handleSettingsUpdated = (e) => {
      if (e?.detail?.tripStudio) {
        setStudioSettings(siteSettingsService.getTripStudio());
      }
    };
    window.addEventListener(EVENT_SETTINGS_UPDATED, handleSettingsUpdated);
    return () => window.removeEventListener(EVENT_SETTINGS_UPDATED, handleSettingsUpdated);
  }, []);

  // 2. Load live tours from contentService or TOURS_DATA
  const allTours = useMemo(() => {
    try {
      const live = contentService.getTours();
      if (Array.isArray(live) && live.length > 0) return live;
    } catch {}
    return TOURS_DATA || [];
  }, []);

  // Format destinations list with computed base daily rate
  const destinationsList = useMemo(() => {
    if (!allTours || allTours.length === 0) {
      return [
        {
          id: 'dalhousie',
          name: 'Whispers of Dalhousie',
          location: 'Dharamshala, Dalhousie',
          country: 'India',
          durationDays: 5,
          basePricePerDay: 4500,
          image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80'
        }
      ];
    }

    return allTours.map((t) => {
      const days = parseTourDays(t);
      const priceNum = Number(t.price) || 25000;
      const baseDaily = Math.max(2200, Math.round(priceNum / days));
      return {
        id: t.id || t.slug || t.name,
        name: t.name,
        location: t.location || t.country || 'India',
        country: t.country || 'India',
        durationDays: days,
        basePricePerDay: baseDaily,
        image: t.image || t.heroImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        categories: Array.isArray(t.categories) ? t.categories : [],
        rawTour: t
      };
    });
  }, [allTours]);

  // Active tour and selections
  const [selectedTourName, setSelectedTourName] = useState(() => destinationsList[0]?.name || '');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Current active destination object
  const currentTour = useMemo(() => {
    return destinationsList.find((d) => d.name === selectedTourName) || destinationsList[0];
  }, [destinationsList, selectedTourName]);

  // Trip configurations
  const [durationDays, setDurationDays] = useState(() => (currentTour ? parseTourDays(currentTour) : 5));
  const [travelersCount, setTravelersCount] = useState(2);
  const [hotelTier, setHotelTier] = useState('4-star'); // '3-star', '4-star', '5-star'
  const [vehicleType, setVehicleType] = useState('suv'); // 'sedan', 'suv', 'tempo'
  const [selectedAddons, setSelectedAddons] = useState(['kashmir-shikara', 'candlelight']);

  // Update duration when tour changes (if user hasn't heavily customized it)
  const handleSelectTour = (tour) => {
    setSelectedTourName(tour.name);
    setDurationDays(parseTourDays(tour) || 5);
    setIsDropdownOpen(false);
  };

  // Filtered destinations for the dropdown
  const filteredDestinations = useMemo(() => {
    return destinationsList.filter((d) => {
      // Category filter
      if (activeCategory !== 'all') {
        const catObj = CATEGORY_TABS.find((c) => c.id === activeCategory);
        if (catObj && catObj.keywords) {
          const locText = `${d.location} ${d.name} ${d.country} ${(d.categories || []).join(' ')}`.toLowerCase();
          const matchesCat = catObj.keywords.some((kw) => locText.includes(kw));
          if (!matchesCat) return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const fullText = `${d.name} ${d.location} ${d.country}`.toLowerCase();
        return fullText.includes(q);
      }

      return true;
    });
  }, [destinationsList, activeCategory, searchQuery]);

  // Hotel tiers from CMS/service
  const hotelTiers = studioSettings.hotelTiers || [
    { id: '3-star', label: '3-Star Comfort', mult: 1.0, stars: 3, desc: 'Clean, verified boutique hotels & cozy scenic stays' },
    { id: '4-star', label: '4-Star Premium Deluxe', mult: 1.35, stars: 4, desc: 'Luxury properties, valley views & gourmet buffet' },
    { id: '5-star', label: '5-Star Palace / Villa', mult: 1.85, stars: 5, desc: 'Royal heritage palaces, overwater villas & private butlers' }
  ];

  // Vehicles from CMS/service
  const vehicles = studioSettings.vehicles || [
    { id: 'sedan', label: 'Private AC Sedan', price: 1500, capacity: '1-3 Guests', desc: 'Swift Dzire / Etios for couples & solo' },
    { id: 'suv', label: 'Luxury SUV Crysta', price: 2800, capacity: '4-6 Guests', desc: 'Toyota Innova Crysta with luxury recliner seats' },
    { id: 'tempo', label: 'VIP Urbania / Sprinter', price: 4800, capacity: '7-12 Guests', desc: 'Air-conditioned luxury mini coach for families' }
  ];

  // Dynamic Add-ons (Destination-specific + Universal)
  const availableAddons = useMemo(() => {
    const masterAddons = studioSettings.addons || [];
    const tourText = `${currentTour.location} ${currentTour.name} ${currentTour.country}`.toLowerCase();

    // 1. Filter master addons from CMS matching current destination
    const matched = masterAddons.filter((a) => {
      if (a.destination === 'All') return true;
      const targetDest = (a.destination || '').toLowerCase();
      return tourText.includes(targetDest);
    });

    // 2. Include any custom addons defined directly inside the tour object
    const tourCustomAddons = (currentTour.rawTour?.addons || currentTour.rawTour?.customAddons || []).map((ca) => ({
      id: ca.id || `custom-${ca.label}`,
      label: ca.label || ca.name,
      price: Number(ca.price) || 2000,
      destination: currentTour.location,
      icon: ca.icon || '✨',
      isTourExclusive: true
    }));

    // Merge and deduplicate by id
    const combined = [...matched, ...tourCustomAddons];
    const unique = [];
    const seen = new Set();
    combined.forEach((item) => {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        unique.push(item);
      }
    });

    return unique;
  }, [studioSettings.addons, currentTour]);

  // Toggle add-on
  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculation Logic
  const activeHotel = hotelTiers.find((h) => h.id === hotelTier) || hotelTiers[1];
  const activeVehicle = vehicles.find((v) => v.id === vehicleType) || vehicles[1];

  const addonsTotal = selectedAddons.reduce((acc, id) => {
    const item = availableAddons.find((a) => a.id === id);
    return acc + (item ? item.price : 0);
  }, 0);

  // Per-person calculated live budget
  const perPersonCalculated = Math.round(
    (currentTour.basePricePerDay * durationDays * (activeHotel.mult || 1.0)) +
    (activeVehicle.price * durationDays * (0.35 / Math.max(1, travelersCount > 4 ? 2 : 1))) +
    addonsTotal
  );

  const groupTotalCalculated = perPersonCalculated * travelersCount;

  // WhatsApp Lock Inquiry generator
  const handleLockInquiry = () => {
    const selectedAddonLabels = selectedAddons
      .map((id) => availableAddons.find((a) => a.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const message = `👑 *Comfort Journey — Interactive Trip Studio Customizer*
━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 *Destination:* ${currentTour.name} (${currentTour.location})
⏱️ *Duration:* ${durationDays} Days / ${durationDays - 1} Nights
👥 *Travelers:* ${travelersCount} Person(s)
🏨 *Accommodation:* ${activeHotel.label}
🚗 *Chauffeur & Fleet:* ${activeVehicle.label} (${activeVehicle.capacity})
✨ *Selected VIP Add-ons:* ${selectedAddonLabels || 'Standard Luxury Package'}

💰 *Estimated Budget:* ${formatPrice(perPersonCalculated)} / person
💵 *Total Itinerary Estimate:* ${formatPrice(groupTotalCalculated)}
━━━━━━━━━━━━━━━━━━━━━━━━━━
Please share the detailed day-by-day customized PDF itinerary and availability for our dates!`;

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
            Choose your dream destination from our curated portfolio. Select boutique accommodations, private chauffeur fleet, and destination-exclusive VIP perks to watch your live budget recalculate in real time.
          </p>
        </div>

        {/* Studio Workspace Grid */}
        <div className="studio-grid">
          {/* Controls Left Column */}
          <div className="studio-controls glass-card">
            
            {/* STEP 1: COMPACT LUXURY DESTINATION SELECTOR */}
            <div className="studio-block">
              <div className="block-header-row">
                <label className="block-label">
                  <span className="step-num">1</span> Choose Dream Destination
                </label>
                <span className="dest-count-tag">
                  {destinationsList.length} Handcrafted Tours
                </span>
              </div>

              {/* Category Filter Chips */}
              <div className="category-chips-scroll">
                {CATEGORY_TABS.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`cat-chip-btn ${activeCategory === cat.id ? 'active' : ''}`}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setSearchQuery('');
                      }}
                    >
                      <Icon size={13} className="cat-chip-icon" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Luxury Combobox / Dropdown Trigger */}
              <div className="luxury-dropdown-container" ref={dropdownRef}>
                <button
                  type="button"
                  className={`luxury-dest-trigger ${isDropdownOpen ? 'open' : ''}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                >
                  <div className="dest-trigger-left">
                    <img
                      src={currentTour.image}
                      alt={currentTour.name}
                      className="dest-trigger-thumb"
                      loading="lazy"
                    />
                    <div className="dest-trigger-text">
                      <span className="dest-trigger-title">{currentTour.name}</span>
                      <span className="dest-trigger-sub">
                        <MapPin size={13} className="text-amber" />
                        {currentTour.location} • {durationDays} Days / {durationDays - 1} Nights
                      </span>
                    </div>
                  </div>

                  <div className="dest-trigger-right">
                    <div className="dest-trigger-price-badge">
                      <span className="price-tag-sub">From</span>
                      <strong className="price-tag-val">{formatPrice(currentTour.basePricePerDay)}/day</strong>
                    </div>
                    <ChevronDown size={18} className={`chevron-icon ${isDropdownOpen ? 'rotated' : ''}`} />
                  </div>
                </button>

                {/* Dropdown Menu Popover */}
                {isDropdownOpen && (
                  <div className="luxury-dest-dropdown-menu animate-pop-in">
                    {/* Search Field */}
                    <div className="dropdown-search-wrap">
                      <Search size={16} className="search-icon" />
                      <input
                        type="text"
                        placeholder="Search destination, city, state, or tour..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                        className="dest-search-input"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          className="search-clear-btn"
                          onClick={() => setSearchQuery('')}
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    {/* Results Counter */}
                    <div className="dropdown-results-bar">
                      <span>Showing {filteredDestinations.length} matching tours</span>
                      {activeCategory !== 'all' && (
                        <span className="active-filter-badge">
                          Filtered by {CATEGORY_TABS.find(c => c.id === activeCategory)?.label}
                        </span>
                      )}
                    </div>

                    {/* Options List */}
                    <div className="dest-options-list">
                      {filteredDestinations.length > 0 ? (
                        filteredDestinations.map((d) => {
                          const isSelected = d.name === currentTour.name;
                          return (
                            <div
                              key={d.id || d.name}
                              className={`dest-option-item ${isSelected ? 'selected' : ''}`}
                              onClick={() => handleSelectTour(d)}
                            >
                              <img src={d.image} alt={d.name} className="dest-opt-img" loading="lazy" />
                              <div className="dest-opt-info">
                                <span className="dest-opt-name">{d.name}</span>
                                <span className="dest-opt-location">
                                  <MapPin size={11} className="text-amber" />
                                  {d.location} • {d.durationDays}D
                                </span>
                              </div>
                              <div className="dest-opt-end">
                                <span className="dest-opt-price">{formatPrice(d.basePricePerDay)}/day</span>
                                {isSelected && <CheckCircle2 size={16} className="text-amber" />}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="dest-no-results">
                          <span>No tours found matching "{searchQuery}"</span>
                          <button
                            type="button"
                            className="btn-link-reset"
                            onClick={() => {
                              setSearchQuery('');
                              setActiveCategory('all');
                            }}
                          >
                            View all {destinationsList.length} destinations
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* STEP 2: DURATION SLIDER & TRAVELERS COUNTER */}
            <div className="studio-block">
              <div className="slider-label-row">
                <label className="block-label">
                  <span className="step-num">2</span> Trip Duration & Guests
                </label>
                <span className="duration-bubble">
                  {durationDays} Days ({durationDays - 1} Nights)
                </span>
              </div>

              {/* Duration Presets */}
              <div className="duration-presets-row">
                {[
                  { label: '3-4 Days (Weekend)', val: 4 },
                  { label: '5-6 Days (Standard)', val: 6 },
                  { label: '7-8 Days (Popular)', val: 7 },
                  { label: '10-12 Days (Grand)', val: 10 }
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    className={`preset-chip ${durationDays === preset.val ? 'active' : ''}`}
                    onClick={() => setDurationDays(preset.val)}
                  >
                    {preset.label}
                  </button>
                ))}
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
                <span>7 Days (Classic)</span>
                <span>14 Days (Grand Voyage)</span>
              </div>

              {/* Travelers Counter */}
              <div className="travelers-counter-card">
                <div className="counter-left">
                  <Users size={18} className="text-amber" />
                  <div>
                    <strong>Number of Travelers / Guests</strong>
                    <span className="subtext">Budget calculates per person and total group estimate</span>
                  </div>
                </div>
                <div className="counter-controls">
                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                    disabled={travelersCount <= 1}
                  >
                    -
                  </button>
                  <span className="counter-val">{travelersCount} {travelersCount === 1 ? 'Guest' : 'Guests'}</span>
                  <button
                    type="button"
                    className="counter-btn"
                    onClick={() => setTravelersCount(Math.min(20, travelersCount + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* STEP 3: ACCOMMODATION STANDARDS */}
            <div className="studio-block">
              <div className="block-header-row">
                <label className="block-label">
                  <span className="step-num">3</span> Select Accommodation Standard
                </label>
                <span className="rate-hint">Multiplier applied to base stay</span>
              </div>

              <div className="cards-selection-row">
                {hotelTiers.map((tier) => {
                  const isSelected = hotelTier === tier.id;
                  const starsCount = tier.stars || (tier.id === '3-star' ? 3 : tier.id === '4-star' ? 4 : 5);
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      className={`tier-card luxury-hotel-card ${isSelected ? 'active' : ''}`}
                      onClick={() => setHotelTier(tier.id)}
                    >
                      <div className="card-top-header">
                        <div className="star-row">
                          {Array.from({ length: starsCount }).map((_, i) => (
                            <Star key={i} size={13} className="text-gold fill-gold" />
                          ))}
                        </div>
                        {tier.id === '4-star' && <span className="tier-pill-badge">Most Loved</span>}
                        {tier.id === '5-star' && <span className="tier-pill-badge royal">Royal Palace</span>}
                      </div>

                      <strong className="tier-card-title">{tier.label}</strong>
                      <span className="tier-card-desc">{tier.desc}</span>

                      <div className="tier-card-footer">
                        <span className="multiplier-badge">{tier.mult}x Stay Tier</span>
                        {isSelected && <Check size={16} className="check-indicator" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: DEDICATED PRIVATE TRANSPORT FLEET */}
            <div className="studio-block">
              <div className="block-header-row">
                <label className="block-label">
                  <span className="step-num">4</span> Dedicated Private Chauffeur Fleet
                </label>
                <span className="rate-hint">Sanitized & sanitized AC vehicles</span>
              </div>

              <div className="cards-selection-row">
                {vehicles.map((v) => {
                  const isSelected = vehicleType === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      className={`tier-card luxury-vehicle-card ${isSelected ? 'active' : ''}`}
                      onClick={() => setVehicleType(v.id)}
                    >
                      <div className="card-top-header">
                        <Car size={18} className="text-amber" />
                        <span className="capacity-badge">{v.capacity}</span>
                      </div>

                      <strong className="tier-card-title">{v.label}</strong>
                      <span className="tier-card-desc">{v.desc}</span>

                      <div className="tier-card-footer">
                        <span className="vehicle-rate-badge">+{formatPrice(v.price)}/day</span>
                        {isSelected && <Check size={16} className="check-indicator" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 5: DYNAMIC DESTINATION-SPECIFIC VIP ADD-ONS */}
            <div className="studio-block">
              <div className="block-header-row">
                <div>
                  <label className="block-label">
                    <span className="step-num">5</span> Curated VIP Add-ons & Perks
                  </label>
                  <p className="block-sub-hint">
                    Exclusive experiences tailored for <strong>{currentTour.location}</strong> & universal luxury perks.
                  </p>
                </div>
                <span className="addons-active-count">
                  {selectedAddons.length} Selected
                </span>
              </div>

              <div className="addons-grid-redesigned">
                {availableAddons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  const isDestExclusive = addon.destination !== 'All';

                  return (
                    <div
                      key={addon.id}
                      className={`addon-tile ${isChecked ? 'active' : ''}`}
                      onClick={() => toggleAddon(addon.id)}
                    >
                      <div className="addon-checkbox-box">
                        {isChecked && <Check size={14} className="text-white" />}
                      </div>

                      <div className="addon-icon-wrap">
                        <span className="addon-emoji">{addon.icon || '✨'}</span>
                      </div>

                      <div className="addon-content">
                        <div className="addon-title-row">
                          <span className="addon-name">{addon.label}</span>
                          {isDestExclusive && (
                            <span className="dest-exclusive-badge">
                              {addon.destination} Exclusive
                            </span>
                          )}
                        </div>
                        {addon.desc && <p className="addon-desc">{addon.desc}</p>}
                      </div>

                      <div className="addon-price-col">
                        <strong className="addon-price-tag">+{formatPrice(addon.price)}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* REAL-TIME ESTIMATION SIDEBAR */}
          <div className="studio-summary-pane glass-panel">
            <div className="summary-badge">
              <Sparkles size={14} />
              <span>Real-Time Estimation</span>
            </div>

            {/* Selected Destination Preview Banner */}
            <div className="summary-dest-banner">
              <img src={currentTour.image} alt={currentTour.name} className="banner-img" />
              <div className="banner-overlay">
                <span className="banner-loc">
                  <MapPin size={12} className="text-amber" />
                  {currentTour.location}
                </span>
                <h3 className="banner-title">{currentTour.name}</h3>
                <span className="banner-duration">
                  <Calendar size={12} />
                  {durationDays} Days / {durationDays - 1} Nights • {travelersCount} {travelersCount === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="summary-breakdown">
              <div className="breakdown-row">
                <span>Accommodation:</span>
                <strong>{activeHotel.label}</strong>
              </div>

              <div className="breakdown-row">
                <span>Chauffeur & Fleet:</span>
                <strong>{activeVehicle.label}</strong>
              </div>

              <div className="breakdown-row">
                <span>VIP Add-ons:</span>
                <strong>{selectedAddons.length} Perks Selected (+{formatPrice(addonsTotal)})</strong>
              </div>

              <div className="breakdown-row">
                <span>24/7 VIP Concierge:</span>
                <strong className="text-emerald">Complimentary (₹0)</strong>
              </div>

              <div className="breakdown-row">
                <span>Road Tolls & Taxes:</span>
                <strong className="text-emerald">Included (₹0)</strong>
              </div>
            </div>

            {/* Live Calculated Price Box */}
            <div className="live-price-box">
              <span className="price-tagline">Estimated Price Per Person</span>
              <span className="big-calc-price">{formatPrice(perPersonCalculated)}</span>
              {travelersCount > 1 && (
                <div className="group-total-row">
                  <span>Group Total ({travelersCount} Guests):</span>
                  <strong>{formatPrice(groupTotalCalculated)}</strong>
                </div>
              )}
              <small className="tax-subtext">*Includes premium stays, private chauffeur transfers, breakfast & taxes</small>
            </div>

            {/* WhatsApp Booking Lock Button */}
            <button
              type="button"
              className="btn-whatsapp w-full lock-btn"
              onClick={handleLockInquiry}
              id="trip-customizer-whatsapp-lock-btn"
            >
              <MessageCircle size={20} />
              <span>Lock This Itinerary on WhatsApp</span>
            </button>

            {/* Trust Bullets */}
            <div className="summary-trust-bullets">
              <div className="trust-bullet">
                <ShieldCheck size={16} className="text-emerald" />
                <span>Zero Hidden Costs • All Inclusions Verified</span>
              </div>
              <div className="trust-bullet">
                <ShieldCheck size={16} className="text-emerald" />
                <span>100% Bespoke Changes Supported on Request</span>
              </div>
              <div className="trust-bullet">
                <ShieldCheck size={16} className="text-emerald" />
                <span>24/7 On-Trip Emergency Dedicated Officer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .studio-root {
          padding: 5rem 0 4rem 0;
          background: 
            linear-gradient(180deg, #0B1120 0%, rgba(11, 17, 32, 0.82) 12%, rgba(11, 17, 32, 0.62) 50%, rgba(11, 17, 32, 0.82) 88%, #0B1120 100%),
            url('${basePrefix}backgrounds/trip-studio-dolomites-daisies.webp') center 40% / cover no-repeat;
          color: var(--cj-text-heading);
          position: relative;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .studio-root .section-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 820px;
          margin: 0 auto 2.5rem auto;
        }

        .studio-root .section-title {
          font-size: clamp(2.2rem, 4.5vw, 3.2rem);
          margin: 0.85rem 0;
          line-height: 1.22;
          text-wrap: balance;
        }

        .section-subtitle {
          max-width: 720px;
          margin: 0 auto;
          color: var(--cj-text-muted);
          font-size: 1.05rem;
          line-height: 1.6;
        }

        .studio-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 2.25rem;
          align-items: flex-start;
        }

        .studio-controls {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          background: rgba(19, 29, 51, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-xl);
        }

        .studio-block {
          display: flex;
          flex-direction: column;
          gap: 0.95rem;
        }

        .block-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .block-label {
          font-family: var(--font-ui);
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--cj-text-heading);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .step-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--cj-amber-500);
          color: #000000;
          font-size: 0.78rem;
          font-weight: 900;
        }

        .dest-count-tag,
        .rate-hint,
        .addons-active-count {
          font-size: 0.78rem;
          color: var(--cj-text-muted);
          font-weight: 600;
        }

        .block-sub-hint {
          font-size: 0.8rem;
          color: var(--cj-text-muted);
          margin: 0.15rem 0 0 0;
        }

        /* Category Chips Bar */
        .category-chips-scroll {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
          scrollbar-width: none;
        }

        .category-chips-scroll::-webkit-scrollbar {
          display: none;
        }

        .cat-chip-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.85rem;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--cj-text-muted);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .cat-chip-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--cj-text-heading);
        }

        .cat-chip-btn.active {
          background: rgba(255, 137, 47, 0.2);
          border-color: #FF892F;
          color: var(--cj-text-heading);
        }

        .cat-chip-icon {
          color: inherit;
          opacity: 0.85;
          flex-shrink: 0;
        }

        /* Luxury Dropdown Combobox */
        .luxury-dropdown-container {
          position: relative;
          width: 100%;
        }

        .luxury-dest-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(255, 184, 0, 0.35);
          padding: 0.75rem 1rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
        }

        .luxury-dest-trigger:hover,
        .luxury-dest-trigger.open {
          border-color: #FF892F;
          box-shadow: 0 0 25px rgba(255, 137, 47, 0.2);
          background: rgba(20, 30, 55, 0.95);
        }

        .dest-trigger-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          min-width: 0;
        }

        .dest-trigger-thumb {
          width: 52px;
          height: 52px;
          border-radius: 10px;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, 0.15);
          flex-shrink: 0;
        }

        .dest-trigger-text {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          min-width: 0;
        }

        .dest-trigger-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--cj-text-heading);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dest-trigger-sub {
          font-size: 0.8rem;
          color: var(--cj-text-muted);
          display: flex;
          align-items: center;
          gap: 0.3rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dest-trigger-right {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }

        .dest-trigger-price-badge {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
        }

        .price-tag-sub {
          font-size: 0.68rem;
          color: var(--cj-text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }

        .price-tag-val {
          font-size: 0.95rem;
          font-weight: 800;
          color: #FFB800;
          font-family: var(--font-ui);
        }

        .chevron-icon {
          color: var(--cj-text-muted);
          transition: transform 0.25s ease;
        }

        .chevron-icon.rotated {
          transform: rotate(180deg);
          color: #FF892F;
        }

        /* Dropdown Menu Popover */
        .luxury-dest-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: rgba(11, 17, 32, 0.98);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 184, 0, 0.3);
          border-radius: 14px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 137, 47, 0.15);
          z-index: 99;
          overflow: hidden;
        }

        .dropdown-search-wrap {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }

        .search-icon {
          color: var(--cj-text-muted);
          flex-shrink: 0;
        }

        .dest-search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--cj-text-heading);
          font-size: 0.9rem;
        }

        .dest-search-input::placeholder {
          color: #64748B;
        }

        .search-clear-btn {
          background: transparent;
          border: none;
          color: var(--cj-text-muted);
          cursor: pointer;
          padding: 0.2rem;
        }

        .dropdown-results-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.4rem 1rem;
          background: rgba(0, 0, 0, 0.3);
          font-size: 0.72rem;
          color: var(--cj-text-muted);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .active-filter-badge {
          color: #FFB800;
          font-weight: 600;
        }

        .dest-options-list {
          max-height: 310px;
          overflow-y: auto;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .dest-option-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.6rem 0.85rem;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .dest-option-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 137, 47, 0.25);
        }

        .dest-option-item.selected {
          background: rgba(255, 137, 47, 0.15);
          border-color: #FF892F;
        }

        .dest-opt-img {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .dest-opt-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .dest-opt-name {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--cj-text-heading);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dest-opt-location {
          font-size: 0.75rem;
          color: var(--cj-text-muted);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .dest-opt-end {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-shrink: 0;
        }

        .dest-opt-price {
          font-size: 0.85rem;
          font-weight: 800;
          color: #FFB800;
          font-family: var(--font-ui);
        }

        .dest-no-results {
          padding: 2rem 1rem;
          text-align: center;
          color: var(--cj-text-muted);
          font-size: 0.88rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
        }

        .btn-link-reset {
          background: none;
          border: none;
          color: #FF892F;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
        }

        /* Duration Presets */
        .duration-presets-row {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .preset-chip {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          color: var(--cj-text-muted);
          font-size: 0.78rem;
          padding: 0.25rem 0.65rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .preset-chip:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--cj-text-heading);
        }

        .preset-chip.active {
          background: rgba(255, 184, 0, 0.2);
          border-color: #FFB800;
          color: var(--cj-text-heading);
        }

        .slider-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .duration-bubble {
          font-family: var(--font-ui);
          font-weight: 800;
          font-size: 0.92rem;
          color: var(--cj-amber-500);
          background: rgba(255, 107, 0, 0.15);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 107, 0, 0.3);
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
          color: var(--cj-text-muted);
          font-weight: 600;
        }

        /* Travelers Counter Card */
        .travelers-counter-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          margin-top: 0.25rem;
        }

        .counter-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .counter-left strong {
          display: block;
          font-size: 0.88rem;
          color: var(--cj-text-heading);
        }

        .counter-left .subtext {
          font-size: 0.75rem;
          color: var(--cj-text-muted);
        }

        .counter-controls {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          padding: 0.2rem 0.4rem;
        }

        .counter-btn {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: var(--cj-text-heading);
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }

        .counter-btn:hover:not(:disabled) {
          background: #FF892F;
          color: #000000;
        }

        .counter-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .counter-val {
          font-size: 0.88rem;
          font-weight: 800;
          color: #FFB800;
          min-width: 65px;
          text-align: center;
          font-family: var(--font-ui);
        }

        /* Tier Cards (Hotel & Fleet) */
        .cards-selection-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.85rem;
        }

        .tier-card {
          padding: 1.15rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
          text-align: left;
          color: var(--cj-text-heading);
          transition: all 0.25s ease;
          position: relative;
        }

        .tier-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 184, 0, 0.4);
          transform: translateY(-2px);
        }

        .tier-card.active {
          background: rgba(255, 184, 0, 0.12);
          border-color: #FFB800;
          box-shadow: 0 0 25px rgba(255, 184, 0, 0.2);
        }

        .card-top-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .star-row {
          display: flex;
          gap: 2px;
        }

        .text-gold {
          color: #FFB800;
        }

        .fill-gold {
          fill: #FFB800;
        }

        .tier-pill-badge {
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.15rem 0.5rem;
          border-radius: 10px;
          background: rgba(255, 137, 47, 0.2);
          color: #FF892F;
          border: 1px solid rgba(255, 137, 47, 0.4);
          text-transform: uppercase;
        }

        .tier-pill-badge.royal {
          background: rgba(192, 132, 252, 0.2);
          color: #C084FC;
          border-color: rgba(192, 132, 252, 0.4);
        }

        .capacity-badge {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.08);
          color: var(--cj-text-muted);
        }

        .tier-card-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--cj-text-heading);
          margin-top: 0.15rem;
        }

        .tier-card-desc {
          font-size: 0.78rem;
          color: var(--cj-text-muted);
          line-height: 1.35;
          flex: 1;
        }

        .tier-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-top: 0.4rem;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .multiplier-badge,
        .vehicle-rate-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: #FFB800;
          font-family: var(--font-ui);
        }

        .check-indicator {
          color: #FFB800;
        }

        /* Step 5: Redesigned Add-ons Grid */
        .addons-grid-redesigned {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 0.75rem;
        }

        .addon-tile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0.95rem;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .addon-tile:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 137, 47, 0.3);
        }

        .addon-tile.active {
          background: rgba(255, 137, 47, 0.12);
          border-color: #FF892F;
        }

        .addon-checkbox-box {
          width: 20px;
          height: 20px;
          border-radius: 5px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.4);
          flex-shrink: 0;
          transition: all 0.15s ease;
        }

        .addon-tile.active .addon-checkbox-box {
          background: #FF892F;
          border-color: #FF892F;
        }

        .addon-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .addon-content {
          flex: 1;
          min-width: 0;
        }

        .addon-title-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .addon-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--cj-text-body);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dest-exclusive-badge {
          font-size: 0.65rem;
          font-weight: 800;
          color: #C084FC;
          background: rgba(192, 132, 252, 0.15);
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .addon-desc {
          font-size: 0.72rem;
          color: var(--cj-text-muted);
          margin: 0.15rem 0 0 0;
          line-height: 1.25;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .addon-price-col {
          flex-shrink: 0;
        }

        .addon-price-tag {
          font-size: 0.85rem;
          font-weight: 800;
          color: #FFB800;
          font-family: var(--font-ui);
        }

        /* ── SUMMARY SIDEBAR PANE ── */
        .studio-summary-pane {
          padding: 2.25rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
          position: sticky;
          top: 90px;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(255, 184, 0, 0.25);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }

        .summary-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-ui);
          font-size: 0.75rem;
          font-weight: 800;
          color: #C084FC;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Destination Banner in Sidebar */
        .summary-dest-banner {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          height: 140px;
        }

        .summary-dest-banner .banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .summary-dest-banner .banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(11, 17, 32, 0.95) 90%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1rem;
        }

        .banner-loc {
          font-size: 0.75rem;
          color: #E2E8F0; /* over-photo: stays light in both themes */
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-bottom: 0.2rem;
        }

        .banner-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: #FFFFFF; /* over-photo: stays white in both themes */
          margin: 0;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .banner-duration {
          font-size: 0.75rem;
          color: #FFB800;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-top: 0.25rem;
          font-weight: 600;
        }

        .summary-breakdown {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          padding: 1.15rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .breakdown-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
        }

        .breakdown-row span {
          color: var(--cj-text-muted);
        }

        .breakdown-row strong {
          color: var(--cj-text-heading);
          font-family: var(--font-ui);
          text-align: right;
        }

        .text-emerald {
          color: #10B981 !important;
        }

        .live-price-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1.25rem;
          background: rgba(0, 0, 0, 0.45);
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 184, 0, 0.25);
        }

        .price-tagline {
          font-family: var(--font-ui);
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--cj-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .big-calc-price {
          font-family: var(--font-serif);
          font-size: 2.65rem;
          font-weight: 900;
          color: var(--cj-gold-500);
          line-height: 1.2;
          margin: 0.25rem 0;
        }

        .group-total-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          color: var(--cj-text-muted);
          margin-bottom: 0.35rem;
        }

        .group-total-row strong {
          color: #FFB800;
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
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.25);
        }

        .summary-trust-bullets {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .trust-bullet {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.76rem;
          color: var(--cj-text-muted);
        }

        /* ── RESPONSIVE ADAPTATIONS ── */
        @media (max-width: 1024px) {
          .studio-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .studio-summary-pane {
            position: static;
          }
          .cards-selection-row {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .studio-root {
            padding: 2.25rem 0 1.5rem 0;
          }
          .studio-controls {
            padding: 1rem 0.85rem;
            gap: 1.25rem;
          }
          .section-title {
            font-size: 1.85rem;
            line-height: 1.25;
          }
          .cards-selection-row {
            grid-template-columns: 1fr;
          }
          .category-chips-scroll {
            -webkit-overflow-scrolling: touch;
            padding: 0.25rem 0.25rem 0.5rem 0.25rem;
          }
          .cat-chip-btn {
            padding: 0.3rem 0.75rem;
            font-size: 0.78rem;
          }

          /* Step 5 Mobile Overflow Fix */
          .addons-grid-redesigned {
            grid-template-columns: 1fr;
            width: 100%;
          }
          .addon-tile {
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
            padding: 0.65rem 0.75rem;
            gap: 0.55rem;
          }
          .addon-content {
            min-width: 0;
            flex: 1;
            overflow: hidden;
          }
          .addon-name {
            font-size: 0.82rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
          }
          .addon-price-col {
            flex-shrink: 0;
            margin-left: auto;
            padding-left: 0.25rem;
          }
          .addon-price-tag {
            font-size: 0.82rem;
            white-space: nowrap;
          }

          .dest-trigger-text {
            max-width: 140px;
          }
          .dest-trigger-price-badge {
            display: none;
          }
          .big-calc-price {
            font-size: 2.1rem;
          }
          .studio-summary-pane {
            padding: 1.25rem 1rem;
          }
        }

        /* LIGHT THEME — bright photo wash, white studio panels (dark keeps navy) */
        :root:not([data-theme="dark"]) .studio-root,
        [data-theme="light"] .studio-root {
          background:
            radial-gradient(720px 340px at 88% 0%, rgba(14,116,144,0.09), transparent 70%),
            radial-gradient(640px 300px at 8% 100%, rgba(255,137,47,0.10), transparent 70%),
            linear-gradient(180deg, #FFFDF7 0%, #F9FBE7 100%);
          border-top-color: var(--cj-line, #E8E0CF);
          border-bottom-color: var(--cj-line, #E8E0CF);
        }
        :root:not([data-theme="dark"]) .studio-controls,
        [data-theme="light"] .studio-controls,
        :root:not([data-theme="dark"]) .studio-summary-pane,
        [data-theme="light"] .studio-summary-pane {
          background: var(--cj-glass-card);
          -webkit-backdrop-filter: var(--cj-glass-blur);
          backdrop-filter: var(--cj-glass-blur);
          border: 1px solid var(--cj-glass-rim);
          box-shadow: 0 0 0 1px var(--cj-glass-hairline), var(--shadow-md, 0 10px 30px rgba(20,38,74,0.10)), inset 0 1px 0 rgba(255,255,255,0.8);
          border-color: var(--cj-line, #E8E0CF);
          box-shadow: var(--shadow-md, 0 10px 30px rgba(20,38,74,0.10));
        }
        :root:not([data-theme="dark"]) .cat-chip-btn,
        [data-theme="light"] .cat-chip-btn,
        :root:not([data-theme="dark"]) .luxury-dest-trigger,
        [data-theme="light"] .luxury-dest-trigger {
          background: var(--cj-glass-card);
          -webkit-backdrop-filter: var(--cj-glass-blur);
          backdrop-filter: var(--cj-glass-blur);
          border: 1px solid var(--cj-glass-rim);
          box-shadow: 0 0 0 1px var(--cj-glass-hairline), var(--shadow-md, 0 10px 30px rgba(20,38,74,0.10)), inset 0 1px 0 rgba(255,255,255,0.8);
          border-color: var(--cj-line, #E8E0CF);
        }
        :root:not([data-theme="dark"]) .cat-chip-btn.active,
        [data-theme="light"] .cat-chip-btn.active {
          background: rgba(255,137,47,0.16);
          border-color: var(--cj-cta-deep, #D65A00);
          color: var(--cj-cta-deep, #D65A00);
        }
        :root:not([data-theme="dark"]) .live-price-box,
        [data-theme="light"] .live-price-box {
          background: var(--cj-bg-soft, #F5F0E1);
        }
        :root:not([data-theme="dark"]) .summary-breakdown,
        [data-theme="light"] .summary-breakdown {
          border-top-color: var(--cj-line, #E8E0CF);
          border-bottom-color: var(--cj-line, #E8E0CF);
        }
        :root:not([data-theme="dark"]) .summary-badge,
        [data-theme="light"] .summary-badge {
          color: #7C3AED;
        }
        :root:not([data-theme="dark"]) .text-emerald,
        [data-theme="light"] .text-emerald {
          color: #047857 !important;
        }
        /* summary banner stays cinematic dark + light text in both themes */
        :root:not([data-theme="dark"]) .summary-dest-banner .banner-overlay,
        [data-theme="light"] .summary-dest-banner .banner-overlay {
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(11,17,32,0.95) 90%);
        }
        :root:not([data-theme="dark"]) .tier-card,
        [data-theme="light"] .tier-card,
        :root:not([data-theme="dark"]) .travelers-counter-card,
        [data-theme="light"] .travelers-counter-card,
        :root:not([data-theme="dark"]) .addon-tile,
        [data-theme="light"] .addon-tile {
          background: #FFFFFF !important;
          border-color: var(--cj-line, #E8E0CF) !important;
          box-shadow: 0 4px 12px rgba(20, 38, 74, 0.05);
        }
        :root:not([data-theme="dark"]) .tier-card:hover,
        [data-theme="light"] .tier-card:hover,
        :root:not([data-theme="dark"]) .addon-tile:hover,
        [data-theme="light"] .addon-tile:hover {
          border-color: var(--cj-cta, #FF892F) !important;
          box-shadow: 0 8px 24px rgba(20, 38, 74, 0.08);
        }
        :root:not([data-theme="dark"]) .tier-card.active,
        [data-theme="light"] .tier-card.active,
        :root:not([data-theme="dark"]) .addon-tile.active,
        [data-theme="light"] .addon-tile.active {
          background: #FFFDF7 !important;
          border-color: var(--cj-cta, #FF892F) !important;
          box-shadow: 0 0 0 1.5px var(--cj-cta, #FF892F), 0 8px 20px rgba(255, 137, 47, 0.16) !important;
        }
        :root:not([data-theme="dark"]) .preset-chip,
        [data-theme="light"] .preset-chip {
          background: #FFFFFF !important;
          border-color: var(--cj-line, #E8E0CF) !important;
          color: var(--cj-text-body, #334155) !important;
        }
        :root:not([data-theme="dark"]) .preset-chip.active,
        [data-theme="light"] .preset-chip.active {
          background: rgba(255, 137, 47, 0.16) !important;
          border-color: var(--cj-cta-deep, #D65A00) !important;
          color: var(--cj-cta-deep, #D65A00) !important;
          font-weight: 700;
        }
        :root:not([data-theme="dark"]) .counter-controls,
        [data-theme="light"] .counter-controls {
          background: var(--cj-bg-soft, #F5F0E1) !important;
          border-color: var(--cj-line, #E8E0CF) !important;
        }
        :root:not([data-theme="dark"]) .counter-btn,
        [data-theme="light"] .counter-btn {
          background: #FFFFFF;
          color: var(--cj-text-heading, #14264A);
        }
        :root:not([data-theme="dark"]) .addon-checkbox-box,
        [data-theme="light"] .addon-checkbox-box {
          background: #FFFFFF;
          border-color: var(--cj-line, #E8E0CF);
        }
        :root:not([data-theme="dark"]) .addon-tile.active .addon-checkbox-box,
        [data-theme="light"] .addon-tile.active .addon-checkbox-box {
          background: var(--cj-cta, #FF892F);
          border-color: var(--cj-cta, #FF892F);
          color: #FFFFFF;
        }
        :root:not([data-theme="dark"]) .addon-icon-wrap,
        [data-theme="light"] .addon-icon-wrap {
          background: var(--cj-bg-soft, #F5F0E1);
        }
      `}</style>
    </section>
  );
}
