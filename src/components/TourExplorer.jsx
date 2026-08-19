import React, { useState } from 'react';
import { TOURS_DATA } from '../data/toursData';
import { Clock, MapPin, Star, CheckCircle, ArrowRight, MessageCircle, Sparkles, Compass } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function TourExplorer({ searchFilters, onSelectItinerary, onBookNow, onOpenAIPlanner }) {
  const { formatPrice } = useCurrency();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeVibe, setActiveVibe] = useState('All');

  const categories = [
    { id: 'All', label: '🌟 All Packages' },
    { id: 'Couple', label: '💑 Honeymoon & Romance' },
    { id: 'Family', label: '👨‍👩‍👧‍👦 Family Holidays' },
    { id: 'International', label: '✈️ International Signature' },
    { id: 'Pilgrimage', label: '🕉️ Sacred Char Dham' }
  ];

  const vibes = [
    { id: 'All', label: 'All Moods' },
    { id: 'Snow & Mountains', label: '🏔️ Snow & Mountains' },
    { id: 'Tropical Beaches', label: '🏝️ Tropical Beaches' },
    { id: 'Luxury & Glamour', label: '👑 Luxury & Glamour' },
    { id: 'Nature & Backwaters', label: '🌿 Nature & Backwaters' },
    { id: 'Spiritual Journeys', label: '🕉️ Spiritual Journeys' }
  ];

  // Filter tours
  const filteredTours = TOURS_DATA.filter((tour) => {
    const categoryMatch = activeCategory === 'All' || tour.category === activeCategory;
    const vibeMatch = activeVibe === 'All' || tour.vibe === activeVibe;
    const searchDest = searchFilters?.destination?.toLowerCase() || '';
    const searchCat = searchFilters?.category || 'All';

    const destMatch = !searchDest || 
      tour.title.toLowerCase().includes(searchDest) || 
      tour.location.toLowerCase().includes(searchDest);
    
    const searchCatMatch = searchCat === 'All' || tour.category === searchCat;

    return categoryMatch && vibeMatch && destMatch && searchCatMatch;
  });

  return (
    <section id="tours" className="tours-root">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="header-pill">
            <Sparkles size={14} className="text-primary" />
            <span>Handcrafted Luxury Packages</span>
          </div>
          <h2 className="section-title">
            Explore Curated <span className="gradient-text-gold">Tour Packages</span>
          </h2>
          <p className="section-subtitle">
            Every itinerary is 100% customizable. Includes pre-verified 4/5-star luxury resorts, private chauffeurs, breakfast & 24/7 personal tour concierge.
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

        {/* Vibe / Mood Filter Pills */}
        <div className="vibe-filter-bar">
          <span className="vibe-label">Filter by Vibe:</span>
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
        </div>

        {/* Tours Grid */}
        {filteredTours.length > 0 ? (
          <div className="tours-grid">
            {filteredTours.map((tour) => (
              <div key={tour.id} className="tour-card">
                {/* Media & Badges */}
                <div className="card-media">
                  <img 
                    src={tour.image} 
                    alt={tour.title} 
                    loading="lazy" 
                    decoding="async" 
                    width="400" 
                    height="240" 
                  />
                  <div className="media-overlay"></div>
                  
                  {/* Badge Ribbon */}
                  {tour.badge && (
                    <span className="ribbon-badge">{tour.badge}</span>
                  )}

                  <div className="duration-badge">
                    <Clock size={13} />
                    <span>{tour.duration}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="card-body">
                  <div className="location-rating">
                    <span className="location">
                      <MapPin size={14} className="text-primary" />
                      {tour.location}
                    </span>
                    <span className="rating">
                      <Star size={14} className="star-icon" />
                      {tour.rating} ({tour.reviewsCount})
                    </span>
                  </div>

                  <h3 className="tour-title">{tour.title}</h3>

                  {/* Inclusions Chips */}
                  <div className="inclusions-row">
                    {tour.inclusions.slice(0, 3).map((inc, i) => (
                      <span key={i} className="inc-chip">
                        <CheckCircle size={12} className="text-accent" />
                        {inc}
                      </span>
                    ))}
                  </div>

                  {/* Pricing & Actions */}
                  <div className="card-footer">
                    <div className="price-box">
                      <span className="price-label">Starting from</span>
                      <div className="price-vals">
                        <span className="current-price">{formatPrice(tour.price)}</span>
                        <span className="original-price">{formatPrice(tour.originalPrice)}</span>
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
            ))}
          </div>
        ) : (
          <div className="no-results-box">
            <Compass size={48} className="text-primary" />
            <h3>No exact package matches your filters</h3>
            <p>Don't worry! We design tailor-made packages for over 2,000+ destinations worldwide.</p>
            <div className="no-results-actions">
              <button 
                className="btn-ai-glow"
                onClick={onOpenAIPlanner}
              >
                <Sparkles size={18} />
                Generate with AI Planner
              </button>
              <button 
                className="btn-whatsapp"
                onClick={() => window.open('https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I%20want%20a%20customized%20vacation%20package.', '_blank')}
              >
                <MessageCircle size={18} />
                WhatsApp Custom Request
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .tours-root {
          padding: 6.5rem 0;
          background: #0B0F19;
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
          background: rgba(255, 107, 0, 0.12);
          border: 1px solid rgba(255, 107, 0, 0.25);
          padding: 0.35rem 0.95rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--color-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .section-title {
          font-size: clamp(2.2rem, 4.5vw, 3.2rem);
          color: #FFFFFF;
          margin-bottom: 0.85rem;
        }

        .section-subtitle {
          max-width: 680px;
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
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #E2E8F0;
          font-weight: 700;
          font-size: 0.92rem;
          transition: all 0.25s ease;
        }

        .tab-btn:hover {
          border-color: var(--color-primary);
          color: #FFFFFF;
          background: rgba(255, 107, 0, 0.12);
        }

        .tab-btn.active {
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
          border-color: var(--color-primary);
          color: #FFFFFF;
          box-shadow: 0 8px 25px rgba(255, 107, 0, 0.35);
        }

        .vibe-filter-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
        }

        .vibe-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #94A3B8;
          text-transform: uppercase;
        }

        .vibe-pills-list {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .vibe-pill {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #CBD5E1;
          font-size: 0.82rem;
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
          background: rgba(255, 184, 0, 0.18);
          border-color: #FFB800;
          color: #FFB800;
        }

        .tours-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 2.25rem;
        }

        .tour-card {
          background: #131D33;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        .tour-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 107, 0, 0.4);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 107, 0, 0.15);
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

        .ribbon-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: linear-gradient(135deg, #FF6B00, #D95300);
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .duration-badge {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
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
          margin-bottom: 0.85rem;
        }

        .location {
          color: #94A3B8;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 600;
        }

        .rating {
          font-weight: 800;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .star-icon {
          color: #FFB800;
          fill: #FFB800;
        }

        .tour-title {
          font-size: 1.2rem;
          line-height: 1.35;
          margin-bottom: 1.15rem;
          color: #FFFFFF;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .inclusions-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.75rem;
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
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.45rem;
          color: #FFB800;
        }

        .original-price {
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
          border: 1px solid rgba(255, 255, 255, 0.15);
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
          background: #131D33;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.08);
          max-width: 650px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .no-results-box h3 {
          font-size: 1.5rem;
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
