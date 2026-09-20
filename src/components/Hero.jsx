import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, Sun, Users, Sparkles, MapPin, Calendar, Compass, 
  ChevronRight, ArrowRight, CheckCircle2, Heart, ShieldCheck, 
  MessageCircle, ExternalLink, Flame, ArrowLeft, Landmark, 
  Building2, Palmtree, Waves, Snowflake, CloudRain, Leaf, Flower2,
  Hotel, Car, Utensils, Ticket, Clock, Star, Briefcase, Search, X
} from 'lucide-react';
import { CONTINENTS_TREE_DATA, SEASONS_DATA, TRAVELER_STYLES_DATA } from '../data/continentHierarchyData';
import { HERO_SLIDES } from '../data/toursData';
import { useLiveTours } from '../hooks/useLiveContent';
import { useCurrency } from '../context/CurrencyContext';
import VantaTravelSkyCanvas from './animations/VantaTravelSkyCanvas';
import HeroMascot from './HeroMascot';
import CardInclusionsStrip from './CardInclusionsStrip';
import { siteSettingsService, EVENT_SETTINGS_UPDATED } from '../services/siteSettingsService';

export default function Hero({ onSelectItinerary, onBookNow, onOpenAIPlanner, onOpenQuote }) {
  const TOURS_DATA = useLiveTours();
  const { formatPrice } = useCurrency();
  const heroRef = useRef(null);

  // Dynamic CMS Hero Settings
  const [heroSettings, setHeroSettings] = useState(() => siteSettingsService.getHero());

  useEffect(() => {
    const handleSettingsUpdate = () => {
      setHeroSettings(siteSettingsService.getHero());
    };
    window.addEventListener(EVENT_SETTINGS_UPDATED, handleSettingsUpdate);
    return () => window.removeEventListener(EVENT_SETTINGS_UPDATED, handleSettingsUpdate);
  }, []);

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

  // Helper to retrieve all packages for a country (e.g. all 80 National Packages for India, exact matches for UAE, Thailand, Bali, Japan, etc.)
  const getCountryTours = (countryId, countryName) => {
    if (!countryId) return [];
    const cId = countryId.toLowerCase().trim();
    const cName = (countryName || '').toLowerCase().trim();

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
      const state = (t.state || '').toLowerCase();
      const city = (t.city || '').toLowerCase();
      const name = (t.name || '').toLowerCase();
      const cats = (t.categories || []).map(c => c.toLowerCase());
      
      if (cId === 'uae' || cName.includes('emirates') || cName.includes('dubai')) {
        return country.includes('emirates') || country.includes('uae') || loc.includes('dubai') || name.includes('dubai');
      }
      if (cId === 'indonesia' || cName.includes('indonesia') || cName.includes('bali')) {
        return country.includes('indonesia') || loc.includes('bali') || name.includes('bali');
      }
      if (cId === 'thailand' || cName.includes('thailand') || cName.includes('phuket')) {
        return country.includes('thailand') || loc.includes('phuket') || loc.includes('thailand') || name.includes('phuket') || name.includes('asian');
      }
      if (cId === 'japan' || cName.includes('japan') || cName.includes('tokyo')) {
        return country.includes('japan') || loc.includes('tokyo') || name.includes('sakura') || name.includes('cherry');
      }
      if (cId === 'vietnam' || cName.includes('vietnam')) {
        return country.includes('vietnam') || loc.includes('vietnam') || name.includes('vietnam');
      }
      if (cId === 'srilanka' || cName.includes('sri lanka') || cName.includes('colombo')) {
        return country.includes('sri lanka') || loc.includes('colombo') || name.includes('colombo');
      }
      if (cId === 'singapore' || cName.includes('singapore') || cName.includes('malaysia')) {
        return country.includes('singapore') || loc.includes('singapore') || name.includes('singapore') || name.includes('asian');
      }
      if (cId === 'switzerland' || cName.includes('switzerland') || cId === 'italy' || cName.includes('europe')) {
        return country.includes('switzerland') || country.includes('italy') || loc.includes('rome') || loc.includes('zurich') || name.includes('europe');
      }
      
      return country.includes(cName) || loc.includes(cName) || city.includes(cName) || name.includes(cName) || cats.some(c => c.includes(cName));
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
    <section id="hero" ref={heroRef} className="hero-root">
      {/* Flocking Travel Birds & Sky Jet Streams */}
      <VantaTravelSkyCanvas birdCount={24} jetStreamCount={4} opacity={0.65} />

      {/* Ambient Luxury Background Video & Dynamic Slides */}
      <div className="hero-bg-wrapper">
        <video
          className="hero-bg-video"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1920&q=85"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        >
          {/* High-definition tropical & luxury travel drone footage */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-resort-in-the-maldives-41880-large.mp4" type="video/mp4" />
        </video>
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`hero-bg-slide ${idx === currentSlide ? 'active ken-burns' : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
        <div className="hero-gradient-overlay" />
        <div className="hero-radial-glow" />
      </div>

      <div className="container hero-content-container">
        {/* Unified Hero Headline & Question with Interactive Mascot */}
        <div className="hero-headline-block">
          <HeroMascot heroRef={heroRef} />
          <h1 className="hero-title">
            <span className="hero-journey-text">{heroSettings.headlineMain || 'YOUR JOURNEY'}</span>
            <span className="hero-divider-dot"> • </span>
            <span className="hero-comfort-text text-orange-glow">{heroSettings.headlineHighlight || 'Your Comfort!'}</span>
          </h1>

          {/* Description line placed between the two headings */}
          <p className="hero-subline">
            {heroSettings.subheadline || 'Explore 2,000+ handpicked journeys by Continents, Weather & Season, or Personalized Style'}
          </p>

          <div className="question-badge-row">
            <h2 className="question-text">
              How Do You Want to <span className="gradient-text-gold">Travel?</span>
            </h2>
          </div>
        </div>

        {/* Master Travel Gateways Tabs */}
        <div className="hero-question-container">
          {/* 3 Master Modes */}
          <div className="master-mode-tabs">
            <button
              type="button"
              className={`mode-tab-btn ${discoveryMode === 'continent' ? 'active' : ''}`}
              onClick={() => setDiscoveryMode('continent')}
            >
              <Globe size={18} className="text-amber" />
              <span>7 Continents World Map</span>
            </button>

            <button
              type="button"
              className={`mode-tab-btn ${discoveryMode === 'weather' ? 'active' : ''}`}
              onClick={() => setDiscoveryMode('weather')}
            >
              <Sun size={18} className="text-cyan" />
              <span>By Weather <span className="font-ampersand">&</span> Season</span>
            </button>

            <button
              type="button"
              className={`mode-tab-btn ${discoveryMode === 'style' ? 'active' : ''}`}
              onClick={() => setDiscoveryMode('style')}
            >
              <Users size={18} className="text-emerald" />
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
                    const count = countryPkgs.length;
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
                        <span className={`badge-count ${count === 0 ? 'badge-custom' : ''}`}>
                          {count > 0 ? count : 'Custom'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Level 3: Dynamic In-Place Real Tour Packages Grid */}
              {(() => {
                const countryPkgs = getCountryTours(activeCountry.id, activeCountry.name);
                const isGlobalSearch = Boolean(countrySearchQuery.trim());
                const baseList = isGlobalSearch ? TOURS_DATA : countryPkgs;

                const filteredTours = baseList.filter(tour => {
                  const q = countrySearchQuery.toLowerCase().trim();
                  if (!q) return true;

                  const loc = (tour.location || '').toLowerCase();
                  const name = (tour.name || '').toLowerCase();
                  const country = (tour.country || '').toLowerCase();
                  const state = (tour.state || '').toLowerCase();
                  const city = (tour.city || '').toLowerCase();
                  const tagline = (tour.tagline || '').toLowerCase();
                  const desc = (tour.description || '').toLowerCase();
                  const cats = (tour.categories || []).map(c => String(c).toLowerCase());
                  const tags = (tour.tags || []).map(t => String(t).toLowerCase());

                  return name.includes(q) || 
                    loc.includes(q) || 
                    country.includes(q) || 
                    state.includes(q) || 
                    city.includes(q) || 
                    tagline.includes(q) ||
                    desc.includes(q) ||
                    cats.some(c => c.includes(q)) ||
                    tags.some(t => t.includes(q));
                });

                // If not searching globally and no exact pre-packaged tour exists for this country
                if (!isGlobalSearch && countryPkgs.length === 0) {
                  const similarInternationalTours = TOURS_DATA.filter(t => t.category === 'International Tours' || t.country !== 'India').slice(0, 4);

                  return (
                    <div className="no-exact-country-container animate-fade-in">
                      {/* Search Bar also available when in country with 0 packages */}
                      <div className="country-search-bar-unified mb-3">
                        <div className="country-search-box">
                          <Search size={16} className="text-amber flex-shrink-0" />
                          <input
                            type="text"
                            placeholder="Search all 100+ live tour packages worldwide (e.g. Kashmir, Dubai, Bali, Alps, Safari)..."
                            value={countrySearchQuery}
                            onChange={(e) => {
                              setCountrySearchQuery(e.target.value);
                              if (e.target.value) setShowAllCountryTours(true);
                            }}
                            className="country-search-input"
                          />
                        </div>
                      </div>

                      <div className="no-exact-country-card glass-panel">
                        <div className="no-exact-badge-row">
                          <span className="badge badge-amber"><Sparkles size={13} /> 100% Bespoke VIP Travel</span>
                          <span className="badge badge-cyan">Private Chauffeurs & 5★ Stays</span>
                        </div>
                        <h3 className="no-exact-country-title font-editorial">
                          No Pre-Packaged Group Tours for <span className="gradient-text-gold">{activeCountry.name}</span>
                        </h3>
                        <p className="no-exact-country-desc">
                          Comfort Journey handcrafts 100% tailor-made private VIP itineraries to <strong>{activeCountry.name}</strong> since 1992. Our senior luxury curators arrange private chauffeur transfers, verified luxury boutique stays, and 24/7 dedicated concierge assistance.
                        </p>
                        <div className="no-exact-action-buttons">
                          <a 
                            href={`https://wa.me/918770403315?text=${encodeURIComponent(`Hi Comfort Journey! I would like to plan a custom tailor-made luxury vacation to ${activeCountry.name}. Please connect me with a Senior Trip Designer.`)}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-whatsapp-custom"
                          >
                            <MessageCircle size={16} />
                            <span>Request Custom {activeCountry.name} Itinerary</span>
                          </a>
                          <button 
                            type="button" 
                            className="btn-ai-pill-large"
                            onClick={onOpenAIPlanner}
                          >
                            <Sparkles size={15} />
                            <span>Design with AI Concierge</span>
                          </button>
                        </div>
                      </div>

                      {/* Similar Handpicked Signature Packages Strip */}
                      <div className="similar-country-packages-block">
                        <div className="similar-packages-header">
                          <span className="badge badge-ai">Explore Similar Signature Destinations:</span>
                          <span className="similar-subline">Popular international packages curated in our live portfolio:</span>
                        </div>
                        <div className="stage-cities-grid mt-3">
                          {similarInternationalTours.map((tour) => {
                            const origPrice = tour.originalPrice || Math.round(tour.price * 1.25);
                            const discountPct = Math.round(((origPrice - tour.price) / origPrice) * 100) || 20;

                            return (
                              <div key={tour.id} className="city-in-place-card glass-card">
                                {/* Cover Image Banner with Badges */}
                                <div className="c-card-media-pane">
                                  <img 
                                    src={tour.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'} 
                                    alt={tour.name} 
                                    className="c-card-cover-img"
                                    loading="lazy"
                                    onError={(e) => {
                                      e.currentTarget.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80';
                                    }}
                                  />
                                  <div className="c-media-gradient-overlay" />

                                  <div className="c-media-top-badges">
                                    <span className="c-tag-pill c-tag-highlight">
                                      <Flame size={12} className="text-amber-glow animate-pulse" />
                                      <span>{tour.badge || 'Popular'}</span>
                                    </span>
                                    {discountPct > 0 && (
                                      <span className="c-tag-pill c-tag-discount">
                                        {discountPct}% OFF
                                      </span>
                                    )}
                                  </div>

                                  <div className="c-media-bottom-badge">
                                    <span className="c-dur-pill">
                                      <Clock size={11} className="text-cyan flex-shrink-0" />
                                      <span>{tour.duration}</span>
                                    </span>
                                  </div>
                                </div>

                                {/* Content Body */}
                                <div className="c-card-content-body">
                                  <div className="c-card-title-row">
                                    <div className="c-title-text-group">
                                      <h4 className="city-headline" title={tour.name}>{tour.name}</h4>
                                      <span className="city-state-sub">
                                        <MapPin size={11} className="text-amber flex-shrink-0" />
                                        <span>{tour.location || tour.country}</span>
                                      </span>
                                    </div>
                                  </div>

                                  <CardInclusionsStrip tour={tour} />

                                  <div className="c-card-footer-action">
                                    <div className="compact-price-box">
                                      <div className="price-strike-row">
                                        <span className="orig-price-strike">{formatPrice(origPrice)}</span>
                                        <span className="price-save-badge">Save {formatPrice(origPrice - tour.price)}</span>
                                      </div>
                                      <div className="price-main-row">
                                        <strong className="current-offer-price">{formatPrice(tour.price)}</strong>
                                        <span className="price-per-person">/ person</span>
                                      </div>
                                    </div>

                                    <div className="action-buttons-inline">
                                      <button
                                        type="button"
                                        className="btn-itinerary-inline btn-3d-tactile"
                                        onClick={() => onSelectItinerary(tour)}
                                      >
                                        <span>Itinerary</span>
                                      </button>

                                      <button
                                        type="button"
                                        className="btn-book-inline btn-3d-tactile"
                                        onClick={() => onBookNow(tour)}
                                      >
                                        <span>Book Now</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                const displayedTours = showAllCountryTours ? filteredTours : filteredTours.slice(0, 8);

                return (
                  <div className="country-packages-wrapper">
                    {/* Universal Top Search Bar for Easy Search across ALL live tour packages */}
                    <div className="country-search-bar-unified">
                      <div className="country-search-box">
                        <Search size={16} className="text-amber flex-shrink-0" />
                        <input
                          type="text"
                          placeholder={isGlobalSearch 
                            ? "Search all 100+ live tour packages worldwide..." 
                            : `Search all live tour packages in ${activeCountry.name} or worldwide (e.g. Kashmir, Dubai, Bali, Switzerland, Honeymoon)...`}
                          value={countrySearchQuery}
                          onChange={(e) => {
                            setCountrySearchQuery(e.target.value);
                            if (e.target.value) setShowAllCountryTours(true);
                          }}
                          className="country-search-input"
                        />
                        {countrySearchQuery && (
                          <button
                            type="button"
                            className="country-search-clear-btn"
                            onClick={() => setCountrySearchQuery('')}
                            title="Clear search"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>

                      {/* Search confirmation feedback */}
                      {countrySearchQuery && (
                        <div className="search-live-feedback-strip">
                          <span className="feedback-text">
                            {filteredTours.length > 0 
                              ? `✨ Found ${filteredTours.length} live tour package${filteredTours.length > 1 ? 's' : ''} matching "${countrySearchQuery}" across our global catalog` 
                              : `No packages match "${countrySearchQuery}" worldwide`}
                          </span>
                          <button
                            type="button"
                            className="btn-reset-country-search"
                            onClick={() => setCountrySearchQuery('')}
                          >
                            Clear Search
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="stage-cities-grid">
                      {displayedTours.map((tour) => {
                        const origPrice = tour.originalPrice || Math.round(tour.price * 1.25);
                        const discountPct = Math.round(((origPrice - tour.price) / origPrice) * 100) || 20;

                        return (
                          <div key={tour.id} className="city-in-place-card glass-card">
                            {/* Cover Image Banner with Badges (Prompt & PDF #2) */}
                            <div className="c-card-media-pane">
                              <img 
                                src={tour.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'} 
                                alt={tour.name} 
                                className="c-card-cover-img"
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80';
                                }}
                              />
                              <div className="c-media-gradient-overlay" />

                              {/* Overlaid Badges */}
                              <div className="c-media-top-badges">
                                  <span className="c-tag-pill c-tag-highlight">
                                    <Flame size={12} className="text-amber-glow animate-pulse" />
                                    <span>{tour.badge ? tour.badge.replace(/^[🔥✨👑🌟\s]+/, '').trim() || 'Filling Fast' : 'Filling Fast'}</span>
                                  </span>
                                {discountPct > 0 && (
                                  <span className="c-tag-pill c-tag-discount">
                                    {discountPct}% OFF
                                  </span>
                                )}
                              </div>

                              {/* Bottom Duration Badge on Image */}
                              <div className="c-media-bottom-badge">
                                <span className="c-dur-pill">
                                  <Clock size={11} className="text-cyan flex-shrink-0" />
                                  <span>{tour.duration}</span>
                                </span>
                              </div>
                            </div>

                            {/* Content Body */}
                            <div className="c-card-content-body">
                              <div className="c-card-title-row">
                                <div className="c-title-text-group">
                                  <h4 className="city-headline" title={tour.name}>{tour.name}</h4>
                                  <span className="city-state-sub">
                                    <MapPin size={11} className="text-amber flex-shrink-0" />
                                    <span>{tour.location || tour.country}</span>
                                  </span>
                                </div>
                              </div>

                              {/* Visual Inclusions Icon Bar (5 uniform centered slots) */}
                              <CardInclusionsStrip tour={tour} />

                              <div className="c-card-footer-action">
                                <div className="compact-price-box">
                                  <div className="price-strike-row">
                                    <span className="orig-price-strike">{formatPrice(origPrice)}</span>
                                    <span className="price-save-badge">Save {formatPrice(origPrice - tour.price)}</span>
                                  </div>
                                  <div className="price-main-row">
                                    <strong className="current-offer-price">{formatPrice(tour.price)}</strong>
                                    <span className="price-per-person">/ person</span>
                                  </div>
                                </div>

                                <div className="action-buttons-inline">
                                  <button
                                    type="button"
                                    className="btn-itinerary-inline btn-3d-tactile"
                                    onClick={() => onSelectItinerary(tour)}
                                  >
                                    <span>Itinerary</span>
                                  </button>

                                  <button
                                    type="button"
                                    className="btn-book-inline btn-3d-tactile"
                                    onClick={() => onBookNow(tour)}
                                  >
                                    <span>Book Now</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* View All Packages button */}
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
                        <CardInclusionsStrip tour={tour} />

                        <div className="st-footer">
                          <div className="compact-price-box">
                            <span className="orig-price-strike">{formatPrice(origPrice)}</span>
                            <strong className="current-offer-price">{formatPrice(tour.price)}</strong>
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
                        <CardInclusionsStrip tour={tour} />

                        <div className="st-footer">
                          <div className="compact-price-box">
                            <span className="orig-price-strike">{formatPrice(origPrice)}</span>
                            <strong className="current-offer-price">{formatPrice(tour.price)}</strong>
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

        .hero-bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          opacity: 0.78;
          filter: brightness(1.1) saturate(1.2);
        }

        .hero-gradient-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(
            180deg, 
            rgba(0, 18, 51, 0.42) 0%, 
            rgba(0, 24, 68, 0.62) 45%, 
            rgba(0, 18, 51, 0.92) 100%
          );
        }

        .hero-radial-glow {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: 
            radial-gradient(circle at 50% 20%, rgba(255, 137, 47, 0.22) 0%, transparent 60%),
            radial-gradient(circle at 85% 35%, rgba(111, 230, 252, 0.18) 0%, transparent 55%),
            radial-gradient(circle at 15% 50%, rgba(218, 245, 97, 0.14) 0%, transparent 50%);
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
          margin-bottom: 1.6rem;
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
          color: #CBD5E1;
          font-weight: 700;
        }

        .hero-headline-block {
          max-width: 900px;
          margin-bottom: 1.25rem;
          position: relative;
        }

        .hero-title {
          position: relative;
          z-index: 5;
          font-size: 3.4rem;
          font-weight: 900;
          color: #FFFFFF;
          margin-bottom: 0.65rem;
          line-height: 1.15;
          letter-spacing: -0.02em;
          font-family: var(--font-fraunces);
        }

        .hero-journey-text {
          font-family: var(--font-righteous) !important;
          text-transform: uppercase !important;
          letter-spacing: 0.02em !important;
          color: #FFFFFF;
        }

        .hero-comfort-text {
          font-family: var(--font-fraunces) !important;
          font-weight: 800 !important;
        }

        .hero-divider-dot {
          color: #FFA459;
          font-family: var(--font-fraunces);
          padding: 0 0.15rem;
        }

        .text-orange-glow {
          color: #FF892F;
          text-shadow: 0 0 35px rgba(255, 137, 47, 0.6);
        }

        .hero-subline {
          font-size: 1.1rem;
          color: #E2E8F0;
          line-height: 1.6;
          max-width: 720px;
          margin: 0 auto 1.15rem auto;
        }

        .question-badge-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          margin-bottom: 0.5rem;
        }

        .question-text {
          font-size: clamp(1.85rem, 3.6vw, 2.6rem);
          font-weight: 900;
          color: #FFFFFF;
          margin: 0;
          font-family: var(--font-editorial, serif);
          line-height: 1.15;
          letter-spacing: -0.01em;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 137, 47, 0.35);
        }

        /* Question & Mode Tabs */
        .hero-question-container {
          width: 100%;
          max-width: 960px;
          margin-bottom: 1.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .question-pill-prebadge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 1.1rem;
          border-radius: 9999px;
          background: rgba(255, 137, 47, 0.15);
          border: 1.2px solid rgba(255, 137, 47, 0.45);
          color: #FFA459;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.65rem;
          box-shadow: 0 0 16px rgba(255, 137, 47, 0.25);
        }

        .question-badge-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          margin-bottom: 0.35rem;
        }

        .question-text {
          font-size: clamp(2.1rem, 4.2vw, 3.2rem);
          font-weight: 900;
          color: #FFFFFF;
          margin: 0;
          font-family: var(--font-editorial, serif);
          line-height: 1.15;
          letter-spacing: -0.01em;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 137, 47, 0.35);
        }

        .question-subtext {
          font-size: 1.05rem;
          color: #CBD5E1;
          font-weight: 500;
          margin: 0 0 1.25rem 0;
          text-align: center;
        }

        .master-mode-tabs {
          display: flex;
          justify-content: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .mode-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1.6rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1.5px solid rgba(255, 255, 255, 0.18);
          color: #F8FAFC;
          font-size: 0.95rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .mode-tab-btn:hover {
          background: rgba(255, 137, 47, 0.2);
          border-color: #FF892F;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 137, 47, 0.35);
        }

        .mode-tab-btn.active {
          background: linear-gradient(135deg, #FF892F, #E65100);
          border-color: #FFA459;
          color: #FFFFFF;
          box-shadow: 0 0 28px rgba(255, 137, 47, 0.55);
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
          font-size: 0.72rem;
          color: #CBD5E1;
          font-weight: 600;
        }

        /* Country Pills Bar */
        .country-pills-bar {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.85rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }

        .country-code-badge {
          font-size: 0.68rem;
          font-weight: 800;
          color: #6FE6FC;
          background: rgba(0, 18, 51, 0.8);
          border: 1px solid rgba(111, 230, 252, 0.4);
          padding: 0.15rem 0.45rem;
          border-radius: 6px;
          letter-spacing: 0.05em;
        }

        .country-pill-btn.active .country-code-badge {
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.5);
          background: rgba(0, 0, 0, 0.35);
        }

        .pills-label {
          font-size: 0.85rem;
          font-weight: 800;
          color: #E2E8F0;
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
          gap: 0.4rem;
          padding: 0.38rem 0.9rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #F8FAFC;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .country-pill-btn:hover {
          background: rgba(111, 230, 252, 0.2);
          border-color: #6FE6FC;
          color: #FFFFFF;
          transform: translateY(-1px);
        }

        .country-pill-btn.active {
          background: linear-gradient(135deg, #FF892F 0%, #E65100 100%);
          border-color: #FFA459;
          color: #FFFFFF;
          box-shadow: 0 3px 12px rgba(255, 137, 47, 0.45);
        }

        .badge-count {
          font-size: 0.68rem;
          font-weight: 800;
          background: rgba(0, 0, 0, 0.35);
          padding: 0.1rem 0.45rem;
          border-radius: 9999px;
        }

        /* Cities In-Place Grid - Modern Non-Widespread Proportions */
        .stage-cities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 1.25rem;
          justify-content: center;
        }

        .city-in-place-card {
          border-radius: 18px;
          background: rgba(10, 24, 56, 0.78);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          text-align: left;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(14px);
          position: relative;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
        }

        .city-in-place-card:hover {
          border-color: rgba(255, 137, 47, 0.7);
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(255, 137, 47, 0.25);
        }

        /* Card Media Header with Cover Image & Overlaid Badges (Prompt & PDF #2) */
        .c-card-media-pane {
          position: relative;
          width: 100%;
          height: 165px;
          overflow: hidden;
          background: #001233;
        }

        .c-card-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .city-in-place-card:hover .c-card-cover-img {
          transform: scale(1.07);
        }

        .c-media-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10, 24, 56, 0.95) 0%, rgba(10, 24, 56, 0.15) 50%, rgba(0, 0, 0, 0.45) 100%);
          pointer-events: none;
        }

        .c-media-top-badges {
          position: absolute;
          top: 0.65rem;
          left: 0.65rem;
          right: 0.65rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 2;
          pointer-events: none;
        }

        .c-tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.22rem 0.6rem;
          border-radius: 9999px;
          font-family: var(--font-ui);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.03em;
          backdrop-filter: blur(8px);
        }

        .c-tag-highlight {
          background: rgba(20, 10, 5, 0.92);
          color: #FFFFFF;
          border: 1.2px solid #FF892F;
          box-shadow: 0 4px 12px rgba(255, 107, 0, 0.35);
        }

        .c-tag-discount {
          background: rgba(16, 185, 129, 0.92);
          color: #FFFFFF;
          border: 1.2px solid #34D399;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          margin-left: auto;
        }

        .c-media-bottom-badge {
          position: absolute;
          bottom: 0.55rem;
          left: 0.65rem;
          z-index: 2;
        }

        .c-dur-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          background: rgba(0, 18, 51, 0.88);
          border: 1px solid rgba(111, 230, 252, 0.45);
          color: #6FE6FC;
          font-size: 0.72rem;
          font-weight: 800;
          backdrop-filter: blur(6px);
        }

        /* Card Content Body */
        .c-card-content-body {
          padding: 1rem 1.15rem 1.15rem 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex: 1;
        }

        .c-card-title-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .c-thumb-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1.5px solid rgba(255, 137, 47, 0.65);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          background: #001233;
        }

        .c-thumb-mini {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .c-title-text-group {
          min-width: 0;
          flex: 1;
        }

        .city-headline {
          font-size: 1.05rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 0.15rem 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .city-state-sub {
          font-size: 0.78rem;
          color: #CBD5E1;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
          font-size: 0.8rem;
          color: #E2E8F0;
        }

        .c-card-footer-action {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          width: 100%;
          box-sizing: border-box;
        }

        .start-lbl {
          display: block;
          font-size: 0.72rem;
          color: #CBD5E1;
          font-weight: 600;
        }

        .price-bold {
          font-size: 1.2rem;
          color: #FF892F;
        }

        .price-unit-tag {
          font-size: 0.72rem;
          color: #CBD5E1;
          margin-left: 0.25rem;
        }

        /* Flaticon Style Inclusions Row */
        .compact-inclusions-icon-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.48rem 0.7rem;
          border-radius: 12px;
          background: rgba(0, 29, 81, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 0.25rem;
          width: 100%;
          box-sizing: border-box;
        }

        .inc-icon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
        }

        .inc-svg-badge {
          width: 25px;
          height: 25px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .city-in-place-card:hover .inc-svg-badge,
        .seasonal-stage-card:hover .inc-svg-badge {
          background: rgba(255, 137, 47, 0.2);
          border-color: rgba(255, 137, 47, 0.5);
        }

        .inc-text {
          font-size: 0.68rem;
          color: #F1F5F9;
          font-weight: 700;
        }

        /* Compact Price Box */
        .compact-price-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 0.5rem;
          box-sizing: border-box;
        }

        .price-strike-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          margin-bottom: 0.1rem;
          flex-wrap: wrap;
        }

        .orig-price-strike {
          font-size: 0.82rem;
          text-decoration: line-through;
          color: #94A3B8;
          font-weight: 600;
        }

        .price-save-badge {
          font-size: 0.72rem;
          font-weight: 900;
          color: #34D399;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.35) 100%);
          border: 1.2px solid #10B981;
          padding: 0.15rem 0.55rem;
          border-radius: 9999px;
          letter-spacing: 0.04em;
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.35);
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
        }

        .price-main-row {
          display: flex;
          align-items: baseline;
          gap: 0.3rem;
        }

        .current-offer-price {
          font-size: 1.35rem;
          font-weight: 900;
          color: #FF892F;
          line-height: 1;
          white-space: nowrap;
        }

        .price-per-person {
          font-size: 0.75rem;
          color: #CBD5E1;
          font-weight: 600;
          white-space: nowrap;
        }

        .action-buttons-inline {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 0.55rem;
          width: 100%;
          box-sizing: border-box;
        }

        .btn-itinerary-inline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 38px;
          padding: 0.48rem 0.65rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1.2px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          font-family: var(--font-ui, system-ui, sans-serif);
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          box-sizing: border-box;
          text-align: center;
        }

        .btn-itinerary-inline:hover {
          background: rgba(111, 230, 252, 0.2);
          border-color: #6FE6FC;
          color: #6FE6FC;
          box-shadow: 0 0 12px rgba(111, 230, 252, 0.35);
        }

        .btn-book-inline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 38px;
          padding: 0.48rem 0.75rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #FF892F 0%, #E65100 100%);
          border: none;
          color: #FFFFFF;
          font-family: var(--font-ui, system-ui, sans-serif);
          font-size: 0.82rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 14px rgba(255, 137, 47, 0.4);
          white-space: nowrap;
          box-sizing: border-box;
          text-align: center;
        }

        .btn-book-inline:hover {
          background: linear-gradient(135deg, #FFA459 0%, #FF892F 100%);
          box-shadow: 0 6px 20px rgba(255, 137, 47, 0.6);
          transform: translateY(-1px);
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
          font-size: 0.76rem;
          color: #CBD5E1;
          font-weight: 600;
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
          font-size: 0.8rem;
          color: #E2E8F0;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 0.25rem 0.65rem;
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

        /* Universal Country Search Bar & Feedback (Prompt & PDF #11) */
        .country-packages-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .country-search-bar-unified {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 0.35rem;
        }

        .country-search-box {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          background: rgba(0, 18, 51, 0.75);
          border: 1.5px solid rgba(255, 137, 47, 0.4);
          border-radius: 9999px;
          padding: 0.55rem 1.15rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35);
          transition: all 0.25s ease;
        }

        .country-search-box:focus-within {
          border-color: #FF892F;
          box-shadow: 0 0 20px rgba(255, 137, 47, 0.35);
          background: rgba(0, 18, 51, 0.9);
        }

        .country-search-input {
          background: transparent;
          border: none;
          outline: none;
          color: #FFFFFF;
          font-size: 0.88rem;
          font-weight: 600;
          width: 100%;
        }

        .country-search-input::placeholder {
          color: #94A3B8;
        }

        .country-search-clear-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #CBD5E1;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .country-search-clear-btn:hover {
          background: rgba(239, 68, 68, 0.25);
          color: #EF4444;
        }

        .search-live-feedback-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.35rem 0.85rem;
          border-radius: 8px;
          background: rgba(255, 137, 47, 0.1);
          border: 1px solid rgba(255, 137, 47, 0.25);
          font-size: 0.82rem;
          color: #FFA459;
          font-weight: 700;
        }

        .btn-reset-country-search {
          background: none;
          border: none;
          color: #6FE6FC;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
        }

        .badge-custom {
          background: rgba(111, 230, 252, 0.15) !important;
          color: #6FE6FC !important;
          border-color: rgba(111, 230, 252, 0.3) !important;
        }

        .no-exact-country-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 0.5rem;
        }

        .no-exact-country-card {
          padding: 2rem;
          text-align: center;
          border-radius: 20px;
          border: 1px solid rgba(255, 137, 47, 0.25);
          background: rgba(0, 29, 81, 0.5);
          max-width: 820px;
          margin: 0 auto;
        }

        .no-exact-badge-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .no-exact-country-title {
          font-size: 1.6rem;
          color: #FFFFFF;
          margin-bottom: 0.75rem;
        }

        .no-exact-country-desc {
          font-size: 0.92rem;
          color: #CBD5E1;
          line-height: 1.6;
          max-width: 680px;
          margin: 0 auto 1.5rem auto;
        }

        .no-exact-action-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-whatsapp-custom {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #25D366;
          color: #001233;
          font-weight: 800;
          font-size: 0.88rem;
          padding: 0.75rem 1.35rem;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        }

        .btn-whatsapp-custom:hover {
          background: #1EBE5D;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45);
        }

        .btn-ai-pill-large {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 137, 47, 0.15);
          border: 1px solid rgba(255, 137, 47, 0.4);
          color: #FF892F;
          font-weight: 800;
          font-size: 0.88rem;
          padding: 0.75rem 1.35rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-ai-pill-large:hover {
          background: rgba(255, 137, 47, 0.3);
          color: #FFFFFF;
          border-color: #FF892F;
          transform: translateY(-2px);
        }

        .similar-country-packages-block {
          margin-top: 1rem;
        }

        .similar-packages-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 0.75rem;
        }

        .similar-subline {
          font-size: 0.84rem;
          color: #94A3B8;
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
