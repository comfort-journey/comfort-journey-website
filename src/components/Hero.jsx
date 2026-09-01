import React, { useState, useEffect } from 'react';
import { 
  Globe, Sun, Users, Sparkles, MapPin, Calendar, Compass, 
  ChevronRight, ArrowRight, CheckCircle2, Heart, ShieldCheck, 
  MessageCircle, ExternalLink, Flame, ArrowLeft, Landmark, 
  Building2, Palmtree, Waves, Snowflake, CloudRain, Leaf, Flower2,
  Hotel, Car, Utensils, Ticket, Clock, Star, Briefcase, Search
} from 'lucide-react';
import { CONTINENTS_TREE_DATA, SEASONS_DATA, TRAVELER_STYLES_DATA } from '../data/continentHierarchyData';
import { TOURS_DATA, HERO_SLIDES } from '../data/toursData';
import { useCurrency } from '../context/CurrencyContext';
import VantaTravelSkyCanvas from './animations/VantaTravelSkyCanvas';

export default function Hero({ onSelectItinerary, onBookNow, onOpenAIPlanner, onOpenQuote }) {
  const { formatPrice } = useCurrency();

  // Background slider index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Master Discovery Mode: 'continent' | 'weather' | 'style'
  const [discoveryMode, setDiscoveryMode] = useState('continent');

  // Continents drill-down state (all in-place!)
  const [activeContinentId, setActiveContinentId] = useState('asia');
  const [activeCountryId, setActiveCountryId] = useState('india');
  const [showAllCountryTours, setShowAllCountryTours] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const [countryRegionFilter, setCountryRegionFilter] = useState('All');

  // Helper to retrieve all packages for a country (e.g. all 80 National Packages for India)
  const getCountryTours = (countryId, countryName) => {
    if (!countryId) return [];
    const cId = countryId.toLowerCase();
    const cName = (countryName || '').toLowerCase();

    if (cId === 'india' || cName.includes('india')) {
      return TOURS_DATA.filter(t => 
        t.category === 'National Tours' || 
        t.country === 'India' || 
        (t.categories && t.categories.includes('National')) ||
        !t.category?.toLowerCase().includes('international')
      );
    }

    // International country matching
    return TOURS_DATA.filter(t => {
      const loc = (t.location || '').toLowerCase();
      const country = (t.country || '').toLowerCase();
      const cats = (t.categories || []).map(c => c.toLowerCase());
      const name = (t.name || '').toLowerCase();
      
      return country.includes(cName) || 
             loc.includes(cName) || 
             loc.includes(cId) ||
             cats.some(c => c.includes(cName) || c.includes(cId)) ||
             name.includes(cName);
    });
  };

  // Weather & Style filter state
  const [activeSeasonId, setActiveSeasonId] = useState('summer');
  const [activeStyleId, setActiveStyleId] = useState('couple');

  // Auto-advance background slides gently
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const activeContinent = CONTINENTS_TREE_DATA.find(c => c.id === activeContinentId) || CONTINENTS_TREE_DATA[0];
  const activeCountry = activeContinent.countries.find(c => c.id === activeCountryId) || activeContinent.countries[0];

  const handleContinentClick = (continentId) => {
    setActiveContinentId(continentId);
    const continent = CONTINENTS_TREE_DATA.find(c => c.id === continentId);
    if (continent && continent.countries.length > 0) {
      setActiveCountryId(continent.countries[0].id);
    }
  };

  const getTourObject = (cityOrId) => {
    if (!cityOrId) return TOURS_DATA[0];
    if (typeof cityOrId === 'object') {
      const query = (cityOrId.name || cityOrId.id || '').toLowerCase();
      return TOURS_DATA.find(t => 
        t.id === cityOrId.tourId || 
        t.slug === cityOrId.tourId ||
        t.name.toLowerCase().includes(query) ||
        (t.location && t.location.toLowerCase().includes(query)) ||
        (t.categories && t.categories.some(c => c.toLowerCase().includes(query)))
      ) || TOURS_DATA[0];
    }
    const tourId = String(cityOrId).toLowerCase();
    return TOURS_DATA.find(t => 
      t.id === tourId || 
      t.slug === tourId || 
      t.id.toLowerCase().includes(tourId) || 
      t.slug.toLowerCase().includes(tourId) ||
      t.name.toLowerCase().includes(tourId) ||
      (t.location && t.location.toLowerCase().includes(tourId))
    ) || TOURS_DATA[0];
  };

  const getContinentIcon = (id) => {
    switch (id) {
      case 'asia': return <Globe size={20} className="text-amber" />;
      case 'europe': return <Landmark size={20} className="text-cyan" />;
      case 'africa': return <Compass size={20} className="text-amber" />;
      case 'north-america': return <Building2 size={20} className="text-cyan" />;
      case 'south-america': return <Palmtree size={20} className="text-emerald" />;
      case 'oceania': return <Waves size={20} className="text-cyan" />;
      case 'polar': return <Snowflake size={20} className="text-cyan" />;
      default: return <Globe size={20} className="text-amber" />;
    }
  };

  const getSeasonIcon = (id) => {
    switch (id) {
      case 'summer': return <Sun size={20} className="text-amber" />;
      case 'winter': return <Snowflake size={20} className="text-cyan" />;
      case 'monsoon': return <CloudRain size={20} className="text-cyan" />;
      case 'autumn': return <Leaf size={20} className="text-amber" />;
      case 'spring': return <Flower2 size={20} className="text-emerald" />;
      default: return <Sun size={20} className="text-amber" />;
    }
  };

  const getStyleIcon = (id) => {
    switch (id) {
      case 'couple': return <Heart size={20} className="text-amber" />;
      case 'family': return <Users size={20} className="text-cyan" />;
      case 'solo': return <Compass size={20} className="text-amber" />;
      case 'group': return <Building2 size={20} className="text-emerald" />;
      default: return <Users size={20} className="text-cyan" />;
    }
  };

  // Weather seasonal tours
  const getSeasonalTours = () => {
    const seasonKeywords = {
      summer: ['summer', 'beach', 'mountain', 'bali', 'phuket', 'pines', 'hills', 'tropical'],
      winter: ['winter', 'snow', 'kashmir', 'dubai', 'rajasthan', 'himachal', 'pines'],
      monsoon: ['monsoon', 'kerala', 'nature', 'backwaters', 'coorg', 'pachmarhi', 'madhai'],
      autumn: ['autumn', 'rajasthan', 'heritage', 'culture', 'dubai', 'karnataka', 'palaces'],
      spring: ['spring', 'kashmir', 'japan', 'pines', 'flower', 'hills', 'ganga']
    };
    const keys = seasonKeywords[activeSeasonId] || ['summer'];
    const matched = TOURS_DATA.filter(t => 
      keys.some(k => 
        (t.name && t.name.toLowerCase().includes(k)) ||
        (t.location && t.location.toLowerCase().includes(k)) ||
        (t.categories && t.categories.some(c => c.toLowerCase().includes(k))) ||
        (t.tags && t.tags.some(tg => tg.toLowerCase().includes(k)))
      )
    );
    return matched.length > 0 ? matched.slice(0, 4) : TOURS_DATA.slice(0, 4);
  };

  // Traveler style tours
  const getStyleTours = () => {
    const styleKeywords = {
      couple: ['honeymoon', 'romantic', 'couple', 'escape', 'affair', 'bali', 'goa', 'phuket', 'tropical'],
      family: ['family', 'group', 'heritage', 'hills', 'karnataka', 'pachmarhi', 'bhopal', 'colombo', 'palaces'],
      solo: ['solo', 'friends', 'vibe', 'adventure', 'trekking', 'goa', 'vietnam', 'explorer', 'hills'],
      group: ['group', 'friends', 'heritage', 'rajasthan', 'dubai', 'singapore', 'asia', 'affair']
    };
    const keys = styleKeywords[activeStyleId] || ['couple'];
    const matched = TOURS_DATA.filter(t => 
      keys.some(k => 
        (t.name && t.name.toLowerCase().includes(k)) ||
        (t.location && t.location.toLowerCase().includes(k)) ||
        (t.categories && t.categories.some(c => c.toLowerCase().includes(k)))
      )
    );
    return matched.length > 0 ? matched.slice(0, 4) : TOURS_DATA.slice(0, 4);
  };

  return (
    <section id="hero" className="hero-root">
      {/* Flocking Travel Birds & Sky Jet Streams */}
      <VantaTravelSkyCanvas birdCount={24} jetStreamCount={4} opacity={0.65} />

      {/* Ambient Ken Burns Background */}
      <div className="hero-bg-wrapper">
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`hero-bg-slide ${idx === currentSlide ? 'active ken-burns' : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
        <div className="hero-gradient-overlay" />
      </div>

      <div className="container hero-content-container">
        {/* Brand Wordmark */}
        <div className="hero-brand-wordmark">
          <span className="brand-plain-beige">COMFORT JOURNEY</span>
          <span className="brand-dot">•</span>
          <span className="brand-est">EST. 1992</span>
        </div>

        {/* Headline */}
        <div className="hero-headline-block">
          <h1 className="hero-title">
            Your Journey • <span className="text-orange-glow">Your Comfort</span>
          </h1>
          <p className="hero-subline">
            Handcrafted luxury vacations across 2,000+ destinations worldwide with verified 5-star stays, private chauffeurs, and 24/7 dedicated concierge.
          </p>
        </div>

        {/* =========================================================================
            PROMINENT QUESTION & 3 MASTER TRAVEL GATEWAYS (IN-PLACE EXPLORATION)
            ========================================================================= */}
        <div className="hero-question-container">
          <div className="question-badge-row">
            <Sparkles size={16} className="text-amber" />
            <h3 className="question-text">How Do You Want to Travel?</h3>
          </div>

          {/* 3 Master Modes */}
          <div className="master-mode-tabs">
            <button
              type="button"
              className={`mode-tab-btn ${discoveryMode === 'continent' ? 'active' : ''}`}
              onClick={() => setDiscoveryMode('continent')}
            >
              <Globe size={16} className="text-amber" />
              <span>7 Continents World Map</span>
            </button>

            <button
              type="button"
              className={`mode-tab-btn ${discoveryMode === 'weather' ? 'active' : ''}`}
              onClick={() => setDiscoveryMode('weather')}
            >
              <Sun size={16} className="text-cyan" />
              <span>By Weather & Season</span>
            </button>

            <button
              type="button"
              className={`mode-tab-btn ${discoveryMode === 'style' ? 'active' : ''}`}
              onClick={() => setDiscoveryMode('style')}
            >
              <Users size={16} className="text-emerald" />
              <span>By Travel Style (Solo, Couple, Family, Group)</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            IN-PLACE INTERACTIVE TRAVELER STAGE (SAME PLACE RESULTS - NO LENGTHY TABLES!)
            ========================================================================= */}
        <div className="hero-interactive-stage glass-card">
          {/* MODE 1: 7 CONTINENTS MAP & CITY EXPLORER */}
          {discoveryMode === 'continent' && (
            <div className="stage-content-block animate-fade-in">
              {/* Level 1: Continents Deck */}
              <div className="continents-deck-strip">
                {CONTINENTS_TREE_DATA.map((continent) => (
                  <div
                    key={continent.id}
                    className={`continent-chip-card ${activeContinentId === continent.id ? 'active' : ''}`}
                    onClick={() => handleContinentClick(continent.id)}
                  >
                    <div className="continent-icon-badge">
                      {getContinentIcon(continent.id)}
                    </div>
                    <div className="continent-chip-meta">
                      <strong className="c-title">{continent.name}</strong>
                      <span className="c-subtext">{continent.countries.length} Countries</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Level 2: In-Place Country Selector Pills */}
              <div className="country-pills-bar">
                <span className="pills-label">Countries in {activeContinent.name}:</span>
                <div className="pills-scroll-row">
                  {activeContinent.countries.map((country) => {
                    const countryPkgs = getCountryTours(country.id, country.name);
                    const count = countryPkgs.length > 0 ? countryPkgs.length : country.cities.length;
                    return (
                      <button
                        key={country.id}
                        type="button"
                        className={`country-pill-btn ${activeCountryId === country.id ? 'active' : ''}`}
                        onClick={() => {
                          setActiveCountryId(country.id);
                          setShowAllCountryTours(false);
                          setCountrySearchQuery('');
                          setCountryRegionFilter('All');
                        }}
                      >
                        <span className="country-code-badge">{country.code}</span>
                        <span>{country.name}</span>
                        <span className="badge-count">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Level 3: Dynamic In-Place Real Tour Packages Grid */}
              {(() => {
                const countryPkgs = getCountryTours(activeCountry.id, activeCountry.name);
                const baseList = countryPkgs.length > 0 
                  ? countryPkgs 
                  : activeCountry.cities.map(c => getTourObject(c.tourId));

                // Regional sub-filters for India
                const indiaRegions = [
                  { id: 'All', label: `All (${baseList.length})`, match: null },
                  { id: 'Himachal', label: 'Himachal & Kashmir', match: ['himachal', 'dharamshala', 'dalhousie', 'manali', 'shimla', 'kashmir', 'pines'] },
                  { id: 'Uttarakhand', label: 'Uttarakhand', match: ['uttarakhand', 'haridwar', 'mussoorie', 'rishikesh', 'nanital', 'corbett', 'ganga'] },
                  { id: 'Goa', label: 'Goa & Coastal', match: ['goa', 'beach', 'coastal'] },
                  { id: 'Rajasthan', label: 'Rajasthan & Royal', match: ['rajasthan', 'jaipur', 'udaipur', 'jodhpur', 'jaisalmer'] },
                  { id: 'MP', label: 'Madhya Pradesh', match: ['madhya pradesh', 'bhopal', 'pachmarhi', 'madhai', 'gwalior', 'orchha', 'jabalpur', 'ujjain'] },
                  { id: 'South', label: 'South India', match: ['karnataka', 'coorg', 'mysore', 'kerala', 'munnar', 'alleppey', 'ooty', 'bangalore'] },
                  { id: 'WestEast', label: 'Gujarat & Northeast', match: ['dwarka', 'somnath', 'gujarat', 'agra', 'varanasi', 'sikkim', 'darjeeling'] }
                ];

                const filteredTours = baseList.filter(tour => {
                  const loc = (tour.location || '').toLowerCase();
                  const name = (tour.name || '').toLowerCase();
                  const q = countrySearchQuery.toLowerCase().trim();

                  const matchesQuery = !q || name.includes(q) || loc.includes(q);

                  let matchesRegion = true;
                  if (activeCountry.id === 'india' && countryRegionFilter !== 'All') {
                    const regObj = indiaRegions.find(r => r.id === countryRegionFilter);
                    if (regObj && regObj.match) {
                      matchesRegion = regObj.match.some(m => loc.includes(m) || name.includes(m));
                    }
                  }

                  return matchesQuery && matchesRegion;
                });

                const displayedTours = showAllCountryTours ? filteredTours : filteredTours.slice(0, 8);

                return (
                  <div>
                    {/* Sub-bar for India packages */}
                    {activeCountry.id === 'india' && (
                      <div className="country-subfilter-bar">
                        <div className="subfilter-chips-row">
                          {indiaRegions.map(r => (
                            <button
                              key={r.id}
                              type="button"
                              className={`subfilter-chip ${countryRegionFilter === r.id ? 'active' : ''}`}
                              onClick={() => {
                                setCountryRegionFilter(r.id);
                                setShowAllCountryTours(true);
                              }}
                            >
                              <span>{r.label}</span>
                            </button>
                          ))}
                        </div>
                        <div className="country-search-box">
                          <Search size={14} className="text-amber" />
                          <input
                            type="text"
                            placeholder={`Search among all ${baseList.length} India packages...`}
                            value={countrySearchQuery}
                            onChange={(e) => {
                              setCountrySearchQuery(e.target.value);
                              if (e.target.value) setShowAllCountryTours(true);
                            }}
                            className="country-search-input"
                          />
                        </div>
                      </div>
                    )}

                    <div className="stage-cities-grid">
                      {displayedTours.map((tour) => {
                        const origPrice = tour.originalPrice || Math.round(tour.price * 1.25);
                        const discountPct = Math.round(((origPrice - tour.price) / origPrice) * 100) || 20;

                        return (
                          <div key={tour.id} className="city-in-place-card glass-card">
                            <div className="c-card-top-header">
                              <div className="c-city-name-lockup">
                                <MapPin size={15} className="text-amber flex-shrink-0 mt-1" />
                                <div>
                                  <h4 className="city-headline">{tour.name}</h4>
                                  <span className="city-state-sub">{tour.location || tour.country}</span>
                                </div>
                              </div>
                              <span className="weather-pill-tag">{tour.duration}</span>
                            </div>

                            {/* Visual Inclusions Icon Bar */}
                            <div className="compact-inclusions-icon-bar">
                              <div className="inc-icon-item" title="4★/5★ Luxury Stay">
                                <div className="inc-svg-badge"><Hotel size={13} className="text-amber" /></div>
                                <span className="inc-text">Stay</span>
                              </div>
                              <div className="inc-icon-item" title="Private Cab & Transfers">
                                <div className="inc-svg-badge"><Car size={13} className="text-cyan" /></div>
                                <span className="inc-text">Transfers</span>
                              </div>
                              <div className="inc-icon-item" title="Daily Breakfast & Dining">
                                <div className="inc-svg-badge"><Utensils size={13} className="text-emerald" /></div>
                                <span className="inc-text">Meals</span>
                              </div>
                              <div className="inc-icon-item" title="VIP Passes & Sightseeing">
                                <div className="inc-svg-badge"><Ticket size={13} className="text-amber" /></div>
                                <span className="inc-text">Sightseeing</span>
                              </div>
                              <div className="inc-icon-item" title="24/7 VIP Concierge">
                                <div className="inc-svg-badge"><ShieldCheck size={13} className="text-emerald" /></div>
                                <span className="inc-text">24/7 VIP</span>
                              </div>
                            </div>

                            <div className="c-card-footer-action">
                              <div className="compact-price-box">
                                <div className="price-strike-row">
                                  <span className="orig-price-strike">{formatPrice(origPrice)}</span>
                                  <span className="price-save-badge">{discountPct}% OFF</span>
                                </div>
                                <div className="price-main-row">
                                  <strong className="current-offer-price font-editorial">{formatPrice(tour.price)}</strong>
                                  <span className="price-per-person">/ person</span>
                                </div>
                              </div>

                              <div className="action-buttons-inline">
                                <button
                                  type="button"
                                  className="btn-itinerary-inline"
                                  onClick={() => onSelectItinerary(tour)}
                                >
                                  <span>Itinerary</span>
                                </button>

                                <button
                                  type="button"
                                  className="btn-book-inline"
                                  onClick={() => onBookNow(tour)}
                                >
                                  <span>Book</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* View All 80 Packages button */}
                    {filteredTours.length > 8 && (
                      <div className="country-expand-cta-row text-center mt-3">
                        <button
                          type="button"
                          className="btn-expand-country-packages"
                          onClick={() => setShowAllCountryTours(!showAllCountryTours)}
                        >
                          <Sparkles size={16} className="text-amber" />
                          <span>
                            {showAllCountryTours 
                              ? `Show Less (Collapse to 8)` 
                              : `View All ${filteredTours.length} National Tour Packages in ${activeCountry.name} (+${filteredTours.length - 8} More)`}
                          </span>
                          <ChevronRight 
                            size={16} 
                            style={{ 
                              transform: showAllCountryTours ? 'rotate(-90deg)' : 'rotate(90deg)', 
                              transition: 'transform 0.3s ease' 
                            }} 
                          />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* MODE 2: WEATHER & FOUR-SEASON EXPLORER */}
          {discoveryMode === 'weather' && (
            <div className="stage-content-block animate-fade-in">
              {/* Seasons Selector Strip */}
              <div className="seasons-selector-bar">
                {SEASONS_DATA.filter(s => s.id !== 'all').map((season) => (
                  <button
                    key={season.id}
                    type="button"
                    className={`season-pill-tab ${activeSeasonId === season.id ? 'active' : ''}`}
                    onClick={() => setActiveSeasonId(season.id)}
                  >
                    <div className="season-icon-badge">
                      {getSeasonIcon(season.id)}
                    </div>
                    <div className="season-info-box">
                      <strong>{season.label.split('(')[0]}</strong>
                      <span className="season-temp">{season.temp}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Season Highlight Info */}
              {(() => {
                const sObj = SEASONS_DATA.find(s => s.id === activeSeasonId) || SEASONS_DATA[1];
                return (
                  <div className="season-summary-strip">
                    <span>✨ {sObj.desc}</span>
                    {sObj.topDestinations && (
                      <div className="dest-chips-row">
                        {sObj.topDestinations.slice(0, 4).map((d, i) => (
                          <span key={i} className="chip-item">📍 {d}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* In-Place Seasonal Tour Cards */}
              <div className="stage-cities-grid">
                {getSeasonalTours().map((tour) => {
                  const origPrice = tour.originalPrice || Math.round(tour.price * 1.25);

                  return (
                    <div key={tour.id} className="seasonal-stage-card glass-card">
                      <div className="st-img-pane">
                        <img src={tour.image} alt={tour.name} className="st-img" />
                        <span className="st-badge">{tour.badge}</span>
                        <span className="st-dur">
                          <Clock size={10} className="inline mr-1 text-cyan" />
                          {tour.duration}
                        </span>
                      </div>
                      <div className="st-body">
                        <span className="st-country">
                          <MapPin size={11} className="inline mr-1 text-amber" />
                          {tour.country}
                        </span>
                        <h4 className="st-title font-editorial">{tour.name}</h4>

                        {/* Inclusions Row */}
                        <div className="compact-inclusions-icon-bar mb-2">
                          <div className="inc-icon-item"><div className="inc-svg-badge"><Hotel size={12} className="text-amber" /></div><span className="inc-text">Stay</span></div>
                          <div className="inc-icon-item"><div className="inc-svg-badge"><Car size={12} className="text-cyan" /></div><span className="inc-text">Cabs</span></div>
                          <div className="inc-icon-item"><div className="inc-svg-badge"><Utensils size={12} className="text-emerald" /></div><span className="inc-text">Meals</span></div>
                          <div className="inc-icon-item"><div className="inc-svg-badge"><Ticket size={12} className="text-amber" /></div><span className="inc-text">Sightseeing</span></div>
                        </div>

                        <div className="st-footer">
                          <div className="compact-price-box">
                            <span className="orig-price-strike">{formatPrice(origPrice)}</span>
                            <strong className="current-offer-price font-editorial">{formatPrice(tour.price)}</strong>
                          </div>
                          <button
                            type="button"
                            className="btn-itinerary-inline"
                            onClick={() => onSelectItinerary(tour)}
                          >
                            <span>Itinerary</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* MODE 3: TRAVELER STYLE EXPLORER (SOLO, COUPLE, FAMILY, GROUP) */}
          {discoveryMode === 'style' && (
            <div className="stage-content-block animate-fade-in">
              {/* Style Selector Strip */}
              <div className="styles-selector-bar">
                {TRAVELER_STYLES_DATA.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    className={`style-pill-tab ${activeStyleId === style.id ? 'active' : ''}`}
                    onClick={() => setActiveStyleId(style.id)}
                  >
                    <div className="style-icon-badge">
                      {getStyleIcon(style.id)}
                    </div>
                    <div className="style-info-box">
                      <strong>{style.label}</strong>
                      <span className="style-sub">{style.perks.length} Perks</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Style Perks Strip */}
              {(() => {
                const styleObj = TRAVELER_STYLES_DATA.find(s => s.id === activeStyleId) || TRAVELER_STYLES_DATA[0];
                return (
                  <div className="style-perks-banner">
                    <div className="perks-pills-row">
                      {styleObj.perks.map((p, i) => (
                        <span key={i} className="perk-pill">
                          <CheckCircle2 size={13} className="text-emerald" />
                          <span>{p}</span>
                        </span>
                      ))}
                    </div>
                    <a
                      href={`https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I'm%20planning%20a%20${encodeURIComponent(styleObj.label)}%20vacation.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp-mini"
                    >
                      <MessageCircle size={14} />
                      <span>WhatsApp {styleObj.label} Curator</span>
                    </a>
                  </div>
                );
              })()}

              {/* In-Place Style Tour Cards */}
              <div className="stage-cities-grid">
                {getStyleTours().map((tour) => {
                  const origPrice = tour.originalPrice || Math.round(tour.price * 1.25);

                  return (
                    <div key={tour.id} className="seasonal-stage-card glass-card">
                      <div className="st-img-pane">
                        <img src={tour.image} alt={tour.name} className="st-img" />
                        <span className="st-badge">{tour.badge}</span>
                        <span className="st-dur">
                          <Clock size={10} className="inline mr-1 text-cyan" />
                          {tour.duration}
                        </span>
                      </div>
                      <div className="st-body">
                        <span className="st-country">
                          <MapPin size={11} className="inline mr-1 text-amber" />
                          {tour.country} • {tour.category}
                        </span>
                        <h4 className="st-title font-editorial">{tour.name}</h4>

                        {/* Inclusions Row */}
                        <div className="compact-inclusions-icon-bar mb-2">
                          <div className="inc-icon-item"><div className="inc-svg-badge"><Hotel size={12} className="text-amber" /></div><span className="inc-text">Stay</span></div>
                          <div className="inc-icon-item"><div className="inc-svg-badge"><Car size={12} className="text-cyan" /></div><span className="inc-text">Cabs</span></div>
                          <div className="inc-icon-item"><div className="inc-svg-badge"><Utensils size={12} className="text-emerald" /></div><span className="inc-text">Meals</span></div>
                          <div className="inc-icon-item"><div className="inc-svg-badge"><Ticket size={12} className="text-amber" /></div><span className="inc-text">Sightseeing</span></div>
                        </div>

                        <div className="st-footer">
                          <div className="compact-price-box">
                            <span className="orig-price-strike">{formatPrice(origPrice)}</span>
                            <strong className="current-offer-price font-editorial">{formatPrice(tour.price)}</strong>
                          </div>
                          <button
                            type="button"
                            className="btn-itinerary-inline"
                            onClick={() => onSelectItinerary(tour)}
                          >
                            <span>View Package</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* STYLES FOR HERO TRAVEL STUDIO */}
      <style>{`
        .hero-root {
          position: relative;
          min-height: 100vh;
          padding: calc(75px + 2rem) 0 3.5rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .hero-bg-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1.5s ease-in-out;
        }

        .hero-bg-slide.active {
          opacity: 1;
        }

        .ken-burns {
          animation: kenBurns 12s infinite alternate ease-in-out;
        }

        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }

        .hero-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg, 
            rgba(7, 11, 20, 0.75) 0%, 
            rgba(0, 18, 51, 0.88) 50%, 
            rgba(7, 11, 20, 0.98) 100%
          );
        }

        .hero-content-container {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-brand-wordmark {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .brand-plain-beige {
          font-family: var(--font-ui, sans-serif);
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #F9FBE7;
        }

        .brand-dot {
          color: #FF892F;
          font-size: 0.8rem;
        }

        .brand-est {
          font-size: 0.75rem;
          color: #94A3B8;
          font-weight: 700;
        }

        .hero-headline-block {
          max-width: 850px;
          margin-bottom: 2rem;
        }

        .hero-title {
          font-size: 3.6rem;
          font-weight: 900;
          color: #FFFFFF;
          margin-bottom: 0.85rem;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .text-orange-glow {
          color: #FF892F;
          text-shadow: 0 0 30px rgba(255, 137, 47, 0.5);
        }

        .hero-subline {
          font-size: 1.15rem;
          color: #CBD5E1;
          line-height: 1.6;
          max-width: 720px;
          margin: 0 auto;
        }

        /* Question & Mode Tabs */
        .hero-question-container {
          width: 100%;
          max-width: 960px;
          margin-bottom: 1.5rem;
        }

        .question-badge-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          margin-bottom: 0.85rem;
        }

        .question-icon-spark {
          font-size: 1.2rem;
        }

        .question-text {
          font-size: 1.35rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          font-family: var(--font-editorial, serif);
        }

        .master-mode-tabs {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .mode-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.4rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #CBD5E1;
          font-size: 0.92rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(10px);
        }

        .mode-tab-btn:hover {
          background: rgba(255, 137, 47, 0.15);
          border-color: #FF892F;
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        .mode-tab-btn.active {
          background: linear-gradient(135deg, #FF892F, #E65100);
          border-color: #FF892F;
          color: #FFFFFF;
          box-shadow: 0 0 25px rgba(255, 137, 47, 0.45);
          transform: translateY(-2px);
        }

        /* In-Place Interactive Stage */
        .hero-interactive-stage {
          width: 100%;
          max-width: 1120px;
          padding: 1.75rem;
          border-radius: 28px;
          background: rgba(0, 18, 51, 0.85);
          backdrop-filter: blur(20px);
          border: 1.5px solid rgba(111, 230, 252, 0.25);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.7);
        }

        .animate-fade-in {
          animation: fadeInStage 0.35s ease-out;
        }

        @keyframes fadeInStage {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Continents Deck Strip */
        .continents-deck-strip {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 1rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 137, 47, 0.4) transparent;
        }

        .continent-chip-card {
          flex: 1;
          min-width: 135px;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.75rem 1rem;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #E2E8F0;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
        }

        .continent-chip-card:hover {
          background: rgba(111, 230, 252, 0.12);
          border-color: rgba(111, 230, 252, 0.4);
          transform: translateY(-2px);
        }

        .continent-chip-card.active {
          background: rgba(255, 137, 47, 0.2);
          border-color: #FF892F;
          box-shadow: 0 0 18px rgba(255, 137, 47, 0.35);
        }

        .continent-icon-badge, .season-icon-badge, .style-icon-badge {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }

        .continent-chip-card:hover .continent-icon-badge,
        .season-pill-tab:hover .season-icon-badge,
        .style-pill-tab:hover .style-icon-badge {
          background: rgba(255, 137, 47, 0.18);
          border-color: rgba(255, 137, 47, 0.4);
        }

        .continent-chip-card.active .continent-icon-badge,
        .season-pill-tab.active .season-icon-badge,
        .style-pill-tab.active .style-icon-badge {
          background: rgba(255, 137, 47, 0.3);
          border-color: #FF892F;
        }

        .continent-chip-meta {
          display: flex;
          flex-direction: column;
        }

        .c-title {
          font-size: 0.9rem;
          color: #FFFFFF;
        }

        .c-subtext {
          font-size: 0.68rem;
          color: #94A3B8;
        }

        /* Country Pills Bar */
        .country-pills-bar {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.85rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }

        .country-code-badge {
          font-size: 0.65rem;
          font-weight: 800;
          color: #6FE6FC;
          background: rgba(0, 18, 51, 0.6);
          border: 1px solid rgba(111, 230, 252, 0.3);
          padding: 0.15rem 0.45rem;
          border-radius: 6px;
          letter-spacing: 0.05em;
        }

        .country-pill-btn.active .country-code-badge {
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(0, 0, 0, 0.25);
        }

        .pills-label {
          font-size: 0.82rem;
          font-weight: 700;
          color: #94A3B8;
        }

        .pills-scroll-row {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          flex-wrap: wrap;
        }

        .country-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #E2E8F0;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .country-pill-btn:hover {
          background: rgba(111, 230, 252, 0.15);
          border-color: #6FE6FC;
          color: #6FE6FC;
        }

        .country-pill-btn.active {
          background: #FF892F;
          border-color: #FF892F;
          color: #FFFFFF;
        }

        .badge-count {
          font-size: 0.65rem;
          background: rgba(0, 0, 0, 0.3);
          padding: 0.1rem 0.4rem;
          border-radius: 9999px;
        }

        /* Cities In-Place Grid */
        .stage-cities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.15rem;
        }

        .city-in-place-card {
          padding: 1.25rem;
          border-radius: 18px;
          background: rgba(0, 29, 81, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 0.85rem;
          text-align: left;
          transition: all 0.25s ease;
        }

        .city-in-place-card:hover {
          border-color: rgba(255, 137, 47, 0.45);
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
        }

        .c-card-top-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .c-city-name-lockup {
          display: flex;
          gap: 0.4rem;
        }

        .city-marker {
          font-size: 1.15rem;
        }

        .city-headline {
          font-size: 1.05rem;
          color: #FFFFFF;
          margin: 0;
        }

        .city-state-sub {
          font-size: 0.74rem;
          color: #94A3B8;
        }

        .weather-pill-tag {
          font-size: 0.68rem;
          font-weight: 700;
          color: #6FE6FC;
          background: rgba(111, 230, 252, 0.15);
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
          white-space: nowrap;
        }

        .c-theme-badge {
          font-size: 0.74rem;
          font-weight: 700;
          color: #FF892F;
        }

        .c-highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .c-highlights-list li {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: #CBD5E1;
        }

        .c-card-footer-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .start-lbl {
          display: block;
          font-size: 0.68rem;
          color: #94A3B8;
        }

        .price-bold {
          font-size: 1.2rem;
          color: #FF892F;
        }

        .price-unit-tag {
          font-size: 0.7rem;
          color: #94A3B8;
          margin-left: 0.25rem;
        }

        /* Flaticon Style Inclusions Row */
        .compact-inclusions-icon-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.45rem 0.65rem;
          border-radius: 12px;
          background: rgba(0, 29, 81, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.05);
          margin-bottom: 0.5rem;
        }

        .inc-icon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
        }

        .inc-svg-badge {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .city-in-place-card:hover .inc-svg-badge,
        .seasonal-stage-card:hover .inc-svg-badge {
          background: rgba(255, 137, 47, 0.15);
          border-color: rgba(255, 137, 47, 0.4);
        }

        .inc-text {
          font-size: 0.62rem;
          color: #CBD5E1;
          font-weight: 600;
        }

        /* Compact Price Box */
        .compact-price-box {
          display: flex;
          flex-direction: column;
        }

        .price-strike-row {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .orig-price-strike {
          font-size: 0.75rem;
          text-decoration: line-through;
          color: #64748B;
        }

        .price-save-badge {
          font-size: 0.65rem;
          font-weight: 800;
          color: #10B981;
        }

        .price-main-row {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
        }

        .current-offer-price {
          font-size: 1.25rem;
          font-weight: 900;
          color: #FF892F;
        }

        .price-per-person {
          font-size: 0.68rem;
          color: #94A3B8;
        }

        .action-buttons-inline {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .btn-itinerary-inline {
          padding: 0.4rem 0.8rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-itinerary-inline:hover {
          background: rgba(111, 230, 252, 0.2);
          border-color: #6FE6FC;
          color: #6FE6FC;
        }

        .btn-book-inline {
          padding: 0.4rem 0.8rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #FF892F, #E65100);
          border: none;
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(255, 137, 47, 0.35);
        }

        .btn-book-inline:hover {
          background: #E65100;
          transform: scale(1.04);
        }

        /* Seasons and Styles bars */
        .seasons-selector-bar, .styles-selector-bar {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .season-pill-tab, .style-pill-tab {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.75rem 1rem;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #E2E8F0;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .season-pill-tab.active, .style-pill-tab.active {
          background: rgba(255, 137, 47, 0.2);
          border-color: #FF892F;
        }

        .season-icon-tag, .style-icon-tag {
          font-size: 1.6rem;
        }

        .season-info-box, .style-info-box {
          display: flex;
          flex-direction: column;
        }

        .season-temp {
          font-size: 0.7rem;
          color: #6FE6FC;
          font-weight: 700;
        }

        .season-summary-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
          border-radius: 14px;
          background: rgba(0, 29, 81, 0.6);
          border: 1px solid rgba(255, 137, 47, 0.25);
          font-size: 0.85rem;
          color: #CBD5E1;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .dest-chips-row, .perks-pills-row {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .chip-item {
          background: rgba(255, 255, 255, 0.08);
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          color: #F9FBE7;
        }

        .seasonal-stage-card {
          border-radius: 18px;
          overflow: hidden;
          background: rgba(0, 29, 81, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .st-img-pane {
          position: relative;
          height: 140px;
        }

        .st-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .st-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(255, 137, 47, 0.9);
          color: #FFFFFF;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
        }

        .st-dur {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0, 18, 51, 0.85);
          color: #6FE6FC;
          font-size: 0.68rem;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
        }

        .st-body {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
        }

        .st-country {
          font-size: 0.72rem;
          color: #94A3B8;
        }

        .st-title {
          font-size: 0.98rem;
          color: #FFFFFF;
          margin: 0.25rem 0 0.75rem 0;
        }

        .st-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .style-perks-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.25rem;
          border-radius: 14px;
          background: rgba(0, 29, 81, 0.6);
          border: 1px solid rgba(255, 137, 47, 0.25);
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .perk-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: #CBD5E1;
          background: rgba(255, 255, 255, 0.06);
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
        }

        .btn-whatsapp-mini {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.85rem;
          border-radius: 9999px;
          background: #10B981;
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 800;
          text-decoration: none;
        }

        .country-subfilter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          padding: 0.65rem 1rem;
          background: rgba(0, 18, 51, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
        }

        .subfilter-chips-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          overflow-x: auto;
          scrollbar-width: none;
          max-width: 100%;
        }

        .subfilter-chip {
          white-space: nowrap;
          font-size: 0.75rem;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          color: #94A3B8;
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .subfilter-chip:hover {
          color: #FFFFFF;
          border-color: rgba(255, 137, 47, 0.4);
        }

        .subfilter-chip.active {
          background: linear-gradient(135deg, #FF892F 0%, #FFA000 100%);
          color: #001233;
          font-weight: 800;
          border-color: transparent;
          box-shadow: 0 2px 10px rgba(255, 137, 47, 0.3);
        }

        .country-search-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          padding: 0.3rem 0.85rem;
          min-width: 240px;
        }

        .country-search-input {
          background: transparent;
          border: none;
          outline: none;
          color: #FFFFFF;
          font-size: 0.78rem;
          width: 100%;
        }

        .country-search-input::placeholder {
          color: #64748B;
        }

        .country-expand-cta-row {
          margin-top: 1.5rem;
        }

        .btn-expand-country-packages {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 137, 47, 0.12);
          border: 1px solid rgba(255, 137, 47, 0.4);
          color: #FFA459;
          font-size: 0.88rem;
          font-weight: 700;
          padding: 0.65rem 1.5rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-expand-country-packages:hover {
          background: rgba(255, 137, 47, 0.25);
          color: #FFFFFF;
          border-color: #FFA459;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(255, 137, 47, 0.25);
        }

        @media (max-width: 860px) {
          .hero-title {
            font-size: 2.35rem;
          }
          .continents-deck-strip {
            grid-template-columns: repeat(2, 1fr);
          }
          .seasons-selector-bar, .styles-selector-bar {
            grid-template-columns: 1fr 1fr;
          }
          .hero-interactive-stage {
            padding: 1.15rem;
          }
        }
      `}</style>
    </section>
  );
}
