import React, { useState } from 'react';
import { TOURS_DATA } from '../data/toursData';
import { Clock, MapPin, Star, CheckCircle, ArrowRight, MessageCircle, Sparkles, Compass, Heart, Scale, ShieldCheck, Flame } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlistCompare } from '../context/WishlistCompareContext';

export default function TourExplorer({ searchFilters, onSelectItinerary, onBookNow, onOpenAIPlanner }) {
  const { formatPrice } = useCurrency();
  const { toggleWishlist, isInWishlist, toggleCompare, isComparing } = useWishlistCompare();

  const [activeCategory, setActiveCategory] = useState('All');
  const [activeVibe, setActiveVibe] = useState('All');
  const [activeRegion, setActiveRegion] = useState('All');
  const [activeDuration, setActiveDuration] = useState('All');
  const [sortBy, setSortBy] = useState('popularity'); // 'popularity', 'price-low', 'price-high', 'duration'

  const categories = [
    { id: 'All', label: '🌟 All Packages' },
    { id: 'Honeymoon & Couple', label: '💑 Honeymoon & Couple' },
    { id: 'Family Expedition', label: '👨‍👩‍👧‍👦 Family Expedition' },
    { id: 'Adrenaline & Adventure', label: '🧗 Adrenaline & Adventure' },
    { id: 'International Signature', label: '✈️ International Signature' },
    { id: 'Sacred Pilgrimage', label: '🕉️ Sacred Char Dham' },
    { id: 'Responsible Travel', label: '🌿 Responsible Eco-Luxury' }
  ];

  const vibes = [
    { id: 'All', label: 'All Vibes' },
    { id: 'Snow & Alpine', label: '🏔️ Snow & Alpine' },
    { id: 'Tropical Islands', label: '🏝️ Tropical Islands' },
    { id: 'Royal Luxury', label: '👑 Royal Luxury' },
    { id: 'Wildlife Safari', label: '🦁 Wildlife Safari' },
    { id: 'Northern Lights', label: '🌌 Northern Lights' },
    { id: 'Serene Backwaters', label: '🌿 Serene Backwaters' },
    { id: 'Sacred Char Dham', label: '🕉️ Sacred Char Dham' }
  ];

  const regions = ['All', 'India', 'Asia', 'Europe', 'Africa', 'Americas', 'Oceania', 'Polar & Middle East'];

  // Filter and sort tours
  const filteredTours = TOURS_DATA.filter((tour) => {
    const categoryMatch = activeCategory === 'All' || 
      tour.category === activeCategory || 
      (activeCategory === 'Responsible Travel' && (tour.vibeTags?.includes('Serene Backwaters') || tour.vibeTags?.includes('Wildlife Safari') || tour.region === 'Polar & Middle East'));

    const vibeMatch = activeVibe === 'All' || (tour.vibeTags && tour.vibeTags.includes(activeVibe));
    const regionMatch = activeRegion === 'All' || 
      tour.region === activeRegion || 
      (activeRegion === 'Multi-Country Combos' && (tour.id.includes('combo') || tour.durationDays >= 13));

    let durationMatch = true;
    if (activeDuration === '3-5') durationMatch = tour.durationDays >= 3 && tour.durationDays <= 5;
    if (activeDuration === '6-9') durationMatch = tour.durationDays >= 6 && tour.durationDays <= 9;
    if (activeDuration === '10-14') durationMatch = tour.durationDays >= 10 && tour.durationDays <= 14;
    if (activeDuration === '15+') durationMatch = tour.durationDays >= 15;

    const searchDest = searchFilters?.destination?.toLowerCase() || '';
    const searchCat = searchFilters?.category || 'All';
    const searchDur = searchFilters?.duration || 'All';

    const destMatch = !searchDest || 
      tour.name.toLowerCase().includes(searchDest) || 
      tour.country.toLowerCase().includes(searchDest) ||
      tour.region.toLowerCase().includes(searchDest) ||
      (tour.tagline && tour.tagline.toLowerCase().includes(searchDest)) ||
      (tour.vibeTags && tour.vibeTags.some(v => v.toLowerCase().includes(searchDest)));
    
    const searchCatMatch = searchCat === 'All' || tour.category === searchCat;
    
    let searchDurMatch = true;
    if (searchDur === '3-5') searchDurMatch = tour.durationDays >= 3 && tour.durationDays <= 5;
    if (searchDur === '6-9') searchDurMatch = tour.durationDays >= 6 && tour.durationDays <= 9;
    if (searchDur === '10-14') searchDurMatch = tour.durationDays >= 10 && tour.durationDays <= 14;
    if (searchDur === '15+') searchDurMatch = tour.durationDays >= 15;

    return categoryMatch && vibeMatch && regionMatch && durationMatch && destMatch && searchCatMatch && searchDurMatch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'duration') return a.durationDays - b.durationDays;
    return b.reviews - a.reviews; // popularity default
  });

  return (
    <section id="tours" className="tours-root">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="header-pill">
            <Sparkles size={14} className="text-amber" />
            <span>Curated Global Catalog</span>
          </div>
          <h2 className="section-title">
            Explore Handcrafted <span className="gradient-text-gold">Tour Packages</span>
          </h2>
          <p className="section-subtitle">
            100% Bespoke Itineraries with 5-Star Accommodations, Private Chauffeurs & 24/7 Personal VIP Concierge.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Filter Bar: Vibes & Region & Sort */}
        <div className="filter-controls-bar">
          {/* Vibe Pills */}
          <div className="vibe-pills-list">
            {vibes.map((v) => (
              <button
                key={v.id}
                className={`vibe-pill ${activeVibe === v.id ? 'active' : ''}`}
                onClick={() => setActiveVibe(v.id)}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Region Dropdown & Sort */}
          <div className="filter-selects-row">
            <div className="select-pill">
              <label>Region:</label>
              <select value={activeRegion} onChange={(e) => setActiveRegion(e.target.value)}>
                {regions.map((r) => (
                  <option key={r} value={r}>{r === 'All' ? 'All Continents' : r}</option>
                ))}
              </select>
            </div>

            <div className="select-pill">
              <label>Sort By:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popularity">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Trip Duration</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="results-counter-strip">
          <span className="count-text">Showing <strong>{filteredTours.length}</strong> Luxury Tour Packages</span>
          <button 
            className="ai-help-link"
            onClick={onOpenAIPlanner}
          >
            <Sparkles size={14} />
            <span>Need Custom Match? Use AI Designer</span>
          </button>
        </div>

        {/* Tours Grid */}
        {filteredTours.length > 0 ? (
          <div className="tours-grid">
            {filteredTours.map((tour) => {
              const saved = isInWishlist(tour.id);
              const comparing = isComparing(tour.id);

              return (
                <div key={tour.id} className="tour-card glass-card">
                  {/* Card Media */}
                  <div className="card-media">
                    <img 
                      src={tour.image} 
                      alt={tour.name} 
                      loading="lazy" 
                      decoding="async" 
                      width="400" 
                      height="240" 
                    />
                    <div className="media-overlay"></div>
                    
                    {/* Top Badges */}
                    <div className="media-top-badges">
                      {tour.badge && (
                        <span className="ribbon-badge">{tour.badge}</span>
                      )}
                      <span className="region-badge">{tour.region}</span>
                    </div>

                    {/* Wishlist Heart & Compare Checkbox */}
                    <div className="media-action-buttons">
                      <button
                        type="button"
                        className={`action-circle-btn ${saved ? 'active-saved' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(tour.id);
                        }}
                        title={saved ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        aria-label="Wishlist"
                      >
                        <Heart size={16} fill={saved ? '#FF6B00' : 'none'} color={saved ? '#FF6B00' : '#FFFFFF'} />
                      </button>

                      <button
                        type="button"
                        className={`action-circle-btn ${comparing ? 'active-compare' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCompare(tour);
                        }}
                        title={comparing ? 'Comparing' : 'Compare with others'}
                        aria-label="Compare"
                      >
                        <Scale size={16} color={comparing ? '#10B981' : '#FFFFFF'} />
                      </button>
                    </div>

                    {/* Duration Badge */}
                    <div className="duration-badge">
                      <Clock size={13} />
                      <span>{tour.duration}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="card-body">
                    <div className="location-rating">
                      <span className="location">
                        <MapPin size={14} className="text-amber" />
                        {tour.country}
                      </span>
                      <span className="rating">
                        <Star size={14} className="star-icon" />
                        {tour.rating} ({tour.reviews})
                      </span>
                    </div>

                    <h3 className="tour-title">{tour.name}</h3>
                    <p className="tour-tagline">{tour.tagline}</p>

                    {/* Inclusions Checklist Chips */}
                    <div className="inclusions-row">
                      {tour.inclusionChips?.map((inc, i) => (
                        <span key={i} className="inc-chip">
                          <CheckCircle size={12} className="text-emerald" />
                          {inc}
                        </span>
                      ))}
                    </div>

                    {/* Pricing & Footer Actions */}
                    <div className="card-footer">
                      <div className="price-box">
                        <span className="price-label">Starting from</span>
                        <div className="price-vals">
                          <span className="current-price">{formatPrice(tour.price)}</span>
                          {tour.originalPrice > tour.price && (
                            <span className="original-price">{formatPrice(tour.originalPrice)}</span>
                          )}
                        </div>
                      </div>

                      <div className="cta-actions">
                        <button 
                          className="itinerary-btn"
                          onClick={() => onSelectItinerary(tour)}
                          title="View detailed day-wise itinerary"
                        >
                          Itinerary
                        </button>
                        <button 
                          className="btn-primary book-btn"
                          onClick={() => onBookNow(tour)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-results-box glass-card">
            <Compass size={48} className="text-amber" />
            <h3 className="font-editorial">No exact tour package matches your filters</h3>
            <p>Don't worry! Comfort Journey crafts 100% custom-tailored itineraries for over 2,000+ destinations globally.</p>
            <div className="no-results-actions">
              <button 
                className="btn-ai-glow"
                onClick={onOpenAIPlanner}
              >
                <Sparkles size={18} />
                Generate Custom Itinerary with AI
              </button>
              <button 
                className="btn-whatsapp"
                onClick={() => window.open('https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I%20want%20a%20bespoke%20luxury%20vacation%20package.', '_blank')}
              >
                <MessageCircle size={18} />
                Request Instant WhatsApp Quote
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .tours-root {
          padding: 6.5rem 0;
          background: var(--cj-bg-panel);
          color: #FFFFFF;
        }

        .section-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .header-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 107, 0, 0.15);
          border: 1px solid rgba(255, 107, 0, 0.3);
          padding: 0.35rem 0.95rem;
          border-radius: var(--radius-full);
          font-family: var(--font-ui);
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--cj-amber-500);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .section-title {
          font-size: clamp(2.4rem, 4.8vw, 3.4rem);
          color: #FFFFFF;
          margin-bottom: 0.85rem;
        }

        .section-subtitle {
          max-width: 720px;
          margin: 0 auto;
          color: #94A3B8;
          font-size: 1.05rem;
          line-height: 1.6;
        }

        .category-tabs {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
        }

        .tab-btn {
          padding: 0.75rem 1.65rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--cj-glass-border);
          color: #E2E8F0;
          font-family: var(--font-ui);
          font-weight: 700;
          font-size: 0.92rem;
          transition: all 0.25s ease;
        }

        .tab-btn:hover {
          border-color: var(--cj-amber-500);
          color: #FFFFFF;
          background: rgba(255, 107, 0, 0.15);
        }

        .tab-btn.active {
          background: linear-gradient(135deg, var(--cj-amber-500), var(--cj-amber-700));
          border-color: var(--cj-amber-500);
          color: #FFFFFF;
          box-shadow: var(--shadow-amber-glow);
        }

        .filter-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .vibe-pills-list {
          display: flex;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .vibe-pill {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #CBD5E1;
          font-family: var(--font-ui);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
        }

        .vibe-pill:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
        }

        .vibe-pill.active {
          background: rgba(255, 184, 0, 0.2);
          border-color: var(--cj-gold-500);
          color: var(--cj-gold-500);
        }

        .filter-selects-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .select-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--cj-glass-border);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
        }

        .select-pill label {
          font-family: var(--font-ui);
          font-size: 0.75rem;
          font-weight: 800;
          color: #94A3B8;
          text-transform: uppercase;
        }

        .select-pill select {
          border: none;
          outline: none;
          background: transparent;
          color: #FFFFFF;
          font-family: var(--font-ui);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
        }

        .select-pill select option {
          background: var(--cj-bg-card);
          color: #FFFFFF;
        }

        .results-counter-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 0;
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .count-text {
          font-size: 0.88rem;
          color: #94A3B8;
        }

        .count-text strong {
          color: #FFFFFF;
        }

        .ai-help-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #C084FC;
          font-family: var(--font-ui);
          font-size: 0.85rem;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .ai-help-link:hover {
          color: #F472B6;
          transform: translateX(2px);
        }

        .tours-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 2.25rem;
        }

        .tour-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .card-media {
          position: relative;
          height: 240px;
          overflow: hidden;
          background: #0F172A;
        }

        .card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tour-card:hover .card-media img {
          transform: scale(1.08);
        }

        .media-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(19, 29, 51, 0.95) 100%);
        }

        .media-top-badges {
          position: absolute;
          top: 1rem;
          left: 1rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .ribbon-badge {
          background: linear-gradient(135deg, var(--cj-amber-500), var(--cj-amber-700));
          color: #FFFFFF;
          font-family: var(--font-ui);
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }

        .region-badge {
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          color: #E2E8F0;
          font-family: var(--font-ui);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--cj-glass-border);
        }

        .media-action-buttons {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          gap: 0.4rem;
        }

        .action-circle-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid var(--cj-glass-border);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .action-circle-btn:hover {
          transform: scale(1.1);
          background: rgba(15, 23, 42, 0.95);
        }

        .active-saved {
          border-color: var(--cj-amber-500);
        }

        .active-compare {
          border-color: var(--cj-emerald-500);
          background: rgba(16, 185, 129, 0.3);
        }

        .duration-badge {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(15, 23, 42, 0.88);
          backdrop-filter: blur(8px);
          border: 1px solid var(--cj-glass-border);
          color: #FFFFFF;
          font-family: var(--font-ui);
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.35rem 0.8rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .card-body {
          padding: 1.65rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .location-rating {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
        }

        .location {
          color: #94A3B8;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-ui);
          font-weight: 700;
        }

        .rating {
          font-family: var(--font-ui);
          font-weight: 800;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .star-icon {
          color: var(--cj-gold-500);
          fill: var(--cj-gold-500);
        }

        .tour-title {
          font-family: var(--font-ui);
          font-size: 1.25rem;
          line-height: 1.35;
          margin-bottom: 0.35rem;
          color: #FFFFFF;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tour-tagline {
          font-size: 0.85rem;
          color: #94A3B8;
          line-height: 1.45;
          margin-bottom: 1.15rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .inclusions-row {
          display: flex;
          gap: 0.45rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .inc-chip {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #CBD5E1;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .card-footer {
          margin-top: auto;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .price-label {
          font-family: var(--font-ui);
          font-size: 0.72rem;
          color: #94A3B8;
          display: block;
          text-transform: uppercase;
          font-weight: 700;
        }

        .price-vals {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .current-price {
          font-family: var(--font-ui);
          font-weight: 900;
          font-size: 1.45rem;
          color: var(--cj-gold-500);
        }

        .original-price {
          font-family: var(--font-ui);
          font-size: 0.85rem;
          text-decoration: line-through;
          color: #64748B;
        }

        .cta-actions {
          display: flex;
          gap: 0.5rem;
        }

        .itinerary-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--cj-glass-border);
          color: #FFFFFF;
          padding: 0.6rem 1rem;
          font-size: 0.88rem;
          font-weight: 700;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
        }

        .itinerary-btn:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: #FFFFFF;
        }

        .book-btn {
          padding: 0.6rem 1.25rem;
          font-size: 0.88rem;
        }

        .no-results-box {
          text-align: center;
          padding: 4.5rem 1.5rem;
          max-width: 680px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .no-results-box h3 {
          font-size: 1.65rem;
          color: #FFFFFF;
        }

        .no-results-box p {
          color: #94A3B8;
          font-size: 0.95rem;
        }

        .no-results-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .tours-root {
            padding: 4rem 0;
          }
          .tours-grid {
            grid-template-columns: 1fr;
          }
          .category-tabs, .vibe-pills-list {
            justify-content: flex-start;
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 0.5rem;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .tab-btn, .vibe-pill {
            flex-shrink: 0;
            white-space: nowrap;
          }
          .filter-controls-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .filter-selects-row {
            justify-content: space-between;
          }
          .card-footer {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }
          .price-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .cta-actions {
            width: 100%;
          }
          .itinerary-btn, .book-btn {
            flex: 1;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
