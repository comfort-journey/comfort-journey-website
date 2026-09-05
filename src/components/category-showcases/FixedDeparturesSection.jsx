import React, { useState, useRef, useMemo } from 'react';
import { TOURS_DATA } from '../../data/toursData';
import { useCurrency } from '../../context/CurrencyContext';
import { useParticleBurst } from '../../hooks/useParticleBurst';
import Tilt3DCard from '../animations/Tilt3DCard';
import { 
  Users, Calendar, Flame, MapPin, Clock, Star, Hotel, Car, Utensils, 
  Camera, ShieldCheck, ChevronLeft, ChevronRight, ArrowRight, Sparkles, CheckCircle2, Ticket
} from 'lucide-react';

export const FIXED_DEPARTURE_BATCHES = [
  {
    id: 'spiti-extreme',
    name: 'Spiti Valley Circuit & High Passes',
    location: 'Kaza, Chandratal, Spiti',
    duration: '6 Nights & 7 Days',
    price: 32500,
    originalPrice: 42000,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    dates: '18 Sep • 02 Oct • 16 Oct',
    seatsLeft: 4,
    totalSeats: 16,
    badge: '🔥 Filling Fast',
    vibe: 'High Mountain Pass Expedition'
  },
  {
    id: 'ladakh-pangong',
    name: 'Ladakh High Passes & Pangong Lake',
    location: 'Leh, Nubra, Pangong',
    duration: '5 Nights & 6 Days',
    price: 36999,
    originalPrice: 48000,
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    dates: '22 Sep • 06 Oct • 20 Oct',
    seatsLeft: 3,
    totalSeats: 14,
    badge: '⚡ Almost Full',
    vibe: 'Stargazing & High Altitude'
  },
  {
    id: 'meghalaya-clouds',
    name: 'Meghalaya Living Root Bridges',
    location: 'Shillong, Cherrapunji, Dawki',
    duration: '5 Nights & 6 Days',
    price: 29800,
    originalPrice: 38500,
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
    dates: '28 Sep • 12 Oct • 26 Oct',
    seatsLeft: 6,
    totalSeats: 16,
    badge: '🌿 Rain & Waterfalls',
    vibe: 'Cliff Jumping & Caving Tribe'
  },
  {
    id: 'kasol-kheerganga',
    name: 'Kasol & Kheerganga Hot Springs Trek',
    location: 'Parvati Valley, Himachal',
    duration: '3 Nights & 4 Days',
    price: 12999,
    originalPrice: 17500,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    dates: 'Every Friday Departure',
    seatsLeft: 5,
    totalSeats: 20,
    badge: '♨️ Weekend Batch',
    vibe: 'Bonfire & Riverside Cafe Tribe'
  },
  {
    id: 'kashmir-paradise-tribe',
    name: 'Kashmir Autumn Colors & Dal Lake Batch',
    location: 'Srinagar, Gulmarg, Pahalgam',
    duration: '5 Nights & 6 Days',
    price: 34500,
    originalPrice: 44000,
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80',
    dates: '25 Sep • 09 Oct • 23 Oct',
    seatsLeft: 4,
    totalSeats: 16,
    badge: '🍁 Golden Chinar Batch',
    vibe: 'Shikara Sunset & Alpine Meadows'
  },
  {
    id: 'bali-tribe-group',
    name: 'Bali Island Tribe & Nusa Penida',
    location: 'Ubud, Seminyak, Nusa Penida',
    duration: '6 Nights & 7 Days',
    price: 62500,
    originalPrice: 79000,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    dates: '04 Oct • 18 Oct • 01 Nov',
    seatsLeft: 2,
    totalSeats: 12,
    badge: '🌴 Global Tribe',
    vibe: 'Clifftop Beach Clubs & Waterfalls'
  }
];

export default function FixedDeparturesSection({ 
  onSelectItinerary, 
  onBookNow, 
  onOpenAIPlanner,
  onNavigateLanding 
}) {
  const { formatPrice } = useCurrency();
  const { triggerBurst } = useParticleBurst();
  const carouselRef = useRef(null);
  const [activeSubTab, setActiveSubTab] = useState('All');

  const filteredBatches = useMemo(() => {
    if (activeSubTab === 'All') return FIXED_DEPARTURE_BATCHES;
    if (activeSubTab === 'Spiti') return FIXED_DEPARTURE_BATCHES.filter(b => b.location.includes('Spiti') || b.location.includes('Himachal'));
    if (activeSubTab === 'Ladakh') return FIXED_DEPARTURE_BATCHES.filter(b => b.location.includes('Leh') || b.location.includes('Pangong'));
    if (activeSubTab === 'NorthEast') return FIXED_DEPARTURE_BATCHES.filter(b => b.location.includes('Shillong') || b.location.includes('Meghalaya'));
    if (activeSubTab === 'Intl') return FIXED_DEPARTURE_BATCHES.filter(b => b.location.includes('Nusa') || b.location.includes('Bali'));
    return FIXED_DEPARTURE_BATCHES;
  }, [activeSubTab]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="fixed-departures" className="fixed-showcase-root">
      {/* Electric Sunset & Neon Violet Mesh Orbs */}
      <div className="fixed-neon-orb-top" />
      <div className="fixed-neon-orb-bottom" />

      <div className="container relative-z">
        {/* Section Header */}
        <div className="showcase-header">
          <div className="showcase-badge-pill fixed-badge">
            <Flame size={14} className="text-orange animate-bounce" />
            <span>COMMUNITY TRAVEL TRIBE • 100% GUARANTEED DEPARTURES</span>
          </div>
          <h2 className="showcase-title font-editorial">
            Fixed Departure <span className="gradient-text-orange-purple">Travel Tribe</span>
          </h2>
          <p className="showcase-subtitle">
            Just show up. We got the rest. Solo-friendly group departures, guaranteed departure dates, professional trip leader, and like-minded travelers who become lifelong friends.
          </p>

          {/* Vibe Micro-Badges Strip */}
          <div className="vibe-badges-strip">
            <span className="vibe-micro-badge fixed-micro"><Users size={12} className="text-orange" /> 45%+ Solo Travelers Join Solo</span>
            <span className="vibe-micro-badge fixed-micro"><Calendar size={12} className="text-orange" /> 100% Guaranteed Go Dates</span>
            <span className="vibe-micro-badge fixed-micro"><Camera size={12} className="text-orange" /> Pro Trip Photography Included</span>
            <span className="vibe-micro-badge fixed-micro">🔥 Instant Tribe Bonfire Vibe</span>
          </div>

          {/* Sub-region filter tabs & carousel arrow controls */}
          <div className="controls-and-tabs-bar">
            <div className="sub-region-tabs">
              {[
                { id: 'All', label: 'All Upcoming Batches' },
                { id: 'Spiti', label: '🏔️ Spiti & Kasol' },
                { id: 'Ladakh', label: '🏍️ Ladakh High Passes' },
                { id: 'NorthEast', label: '🌧️ Meghalaya Rainforest' },
                { id: 'Intl', label: '🌴 Bali Island Tribe' },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  className={`sub-tab-btn fixed-tab ${activeSubTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveSubTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="carousel-nav-arrows">
              <button 
                type="button" 
                className="btn-carousel-arrow fixed-arrow" 
                onClick={() => scrollCarousel('left')}
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                type="button" 
                className="btn-carousel-arrow fixed-arrow" 
                onClick={() => scrollCarousel('right')}
                aria-label="Scroll right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel of 3D Tour Cards */}
        <div className="showcase-carousel-track" ref={carouselRef}>
          {filteredBatches.map((batch) => {
            const origPrice = batch.originalPrice;
            const discountPct = Math.round(((origPrice - batch.price) / origPrice) * 100);
            const filledPct = Math.round(((batch.totalSeats - batch.seatsLeft) / batch.totalSeats) * 100);

            return (
              <div key={batch.id} className="carousel-card-slide">
                <Tilt3DCard
                  maxTilt={5}
                  scale={1.02}
                  glare={true}
                  holographic={true}
                  borderRadius="20px"
                  className="tour-tilt-container"
                >
                  <div className="tour-card glass-card fixed-card-border">
                    {/* Media Image */}
                    <div className="card-media">
                      <img 
                        src={batch.image} 
                        alt={batch.name} 
                        loading="lazy" 
                        width="340" 
                        height="185" 
                      />
                      <div className="media-overlay" />
                      
                      <div className="media-top-badges">
                        <span className="ribbon-badge fixed-ribbon">{batch.badge}</span>
                        {discountPct > 0 && (
                          <span className="discount-ribbon">{discountPct}% OFF</span>
                        )}
                      </div>

                      <div className="media-bottom-strip">
                        <span className="compact-dur-pill fixed-dur">
                          <Clock size={11} className="text-orange" />
                          <span>{batch.duration}</span>
                        </span>
                        <span className="compact-rating-pill">
                          <Star size={11} className="fill-gold text-gold" />
                          <span>4.96 (120+ reviews)</span>
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="card-body">
                      <div className="compact-location-tag">
                        <MapPin size={12} className="text-orange" />
                        <span>{batch.location}</span>
                      </div>

                      <h3 className="compact-tour-title">{batch.name}</h3>

                      {/* Live Batch Departure Dates Strip */}
                      <div className="batch-departure-strip">
                        <div className="batch-dates-row">
                          <Calendar size={12} className="text-orange" />
                          <span className="batch-dates-text">Batches: <strong>{batch.dates}</strong></span>
                        </div>
                        {/* Live Seats Left Progress Meter */}
                        <div className="batch-seats-row">
                          <div className="seats-progress-bg">
                            <div className="seats-progress-fill" style={{ width: `${filledPct}%` }} />
                          </div>
                          <span className="seats-left-counter">
                            🔥 <strong>{batch.seatsLeft}</strong> spots left
                          </span>
                        </div>
                      </div>

                      {/* Inclusions Row */}
                      <div className="compact-inclusions-icon-bar fixed-inclusions">
                        <div className="inc-icon-item" title="Campsite & Stays">
                          <div className="inc-svg-badge"><Hotel size={13} className="text-orange" /></div>
                          <span className="inc-text">Stays</span>
                        </div>
                        <div className="inc-icon-item" title="AC Tempo / Volvo Transit">
                          <div className="inc-svg-badge"><Car size={13} className="text-orange" /></div>
                          <span className="inc-text">Coach</span>
                        </div>
                        <div className="inc-icon-item" title="Campfire Dinners & Breakfast">
                          <div className="inc-svg-badge"><Utensils size={13} className="text-emerald" /></div>
                          <span className="inc-text">Meals</span>
                        </div>
                        <div className="inc-icon-item" title="Pro Trip Lead & Photos">
                          <div className="inc-svg-badge"><Camera size={13} className="text-cyan" /></div>
                          <span className="inc-text">Photos</span>
                        </div>
                        <div className="inc-icon-item" title="Guaranteed Go Date">
                          <div className="inc-svg-badge"><ShieldCheck size={13} className="text-emerald" /></div>
                          <span className="inc-text">100% Go</span>
                        </div>
                      </div>

                      {/* 2-Tier Footer Actions */}
                      <div className="compact-card-footer">
                        <div className="compact-price-box">
                          <div className="price-strike-row">
                            <span className="orig-price-strike">{formatPrice(origPrice)}</span>
                            <span className="price-save-badge">Save {formatPrice(origPrice - batch.price)}</span>
                          </div>
                          <div className="price-main-row">
                            <strong className="current-offer-price font-editorial text-orange-price">{formatPrice(batch.price)}</strong>
                            <span className="price-per-person">/ person</span>
                          </div>
                        </div>

                        <div className="compact-cta-actions">
                          <button 
                            type="button"
                            className="btn-itinerary-compact btn-3d-tactile"
                            onClick={() => onSelectItinerary(batch)}
                          >
                            <span>Itinerary</span>
                          </button>
                          <button 
                            type="button"
                            className="btn-book-compact btn-fixed-book btn-3d-tactile"
                            onClick={(e) => {
                              triggerBurst(e, { count: 20, colors: ['#FF892F', '#A855F7', '#F9FBE7'] });
                              onBookNow(batch);
                            }}
                          >
                            <span>Book Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt3DCard>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Banner & Direct Landing Link */}
        <div className="showcase-bottom-dock fixed-bottom-dock">
          <div className="bottom-dock-info">
            <span className="dock-highlight text-orange">🤝 Solo Traveler? You'll Never Feel Alone!</span>
            <p>Over 45% of our group departure travelers sign up solo. Same-gender room matching & zero single supplement fees.</p>
          </div>
          <div className="bottom-dock-actions">
            <button 
              type="button" 
              className="btn-explore-all-fixed"
              onClick={() => {
                if (onNavigateLanding) {
                  onNavigateLanding('fixed-departures');
                } else {
                  window.location.hash = '#/landing/fixed-departures';
                }
              }}
            >
              <span>Explore All Upcoming Batches</span>
              <ArrowRight size={15} />
            </button>
            <button 
              type="button" 
              className="btn-custom-fixed-ai"
              onClick={onOpenAIPlanner}
            >
              <Sparkles size={14} />
              <span>Ask AI About Dates</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .fixed-showcase-root {
          padding: 4.5rem 0 3.5rem 0;
          position: relative;
          background: linear-gradient(180deg, #120520 0%, #200936 50%, #120520 100%);
          border-top: 1px solid rgba(249, 115, 22, 0.25);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }

        .relative-z {
          position: relative;
          z-index: 2;
        }

        /* Ambient Sunset & Neon Violet Elements */
        .fixed-neon-orb-top {
          position: absolute;
          top: -120px;
          right: -80px;
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, rgba(194, 65, 12, 0.08) 45%, transparent 70%);
          filter: blur(70px);
          pointer-events: none;
          z-index: 1;
        }

        .fixed-neon-orb-bottom {
          position: absolute;
          bottom: -100px;
          left: -80px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, transparent 70%);
          filter: blur(65px);
          pointer-events: none;
          z-index: 1;
        }

        .fixed-badge {
          background: rgba(249, 115, 22, 0.15);
          border: 1px solid rgba(249, 115, 22, 0.4);
          color: #FF892F;
          box-shadow: 0 0 16px rgba(249, 115, 22, 0.2);
        }

        .gradient-text-orange-purple {
          background: linear-gradient(135deg, #FF892F 0%, #F97316 40%, #C084FC 75%, #A855F7 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .fixed-micro {
          background: rgba(249, 115, 22, 0.1);
          border-color: rgba(249, 115, 22, 0.3);
        }

        .fixed-tab:hover {
          color: #FFFFFF;
          border-color: rgba(249, 115, 22, 0.5);
          background: rgba(249, 115, 22, 0.15);
        }

        .fixed-tab.active {
          background: linear-gradient(135deg, #FF892F 0%, #EA580C 100%);
          border-color: #FF892F;
          color: #FFFFFF;
          font-weight: 800;
          box-shadow: 0 0 16px rgba(249, 115, 22, 0.4);
        }

        .fixed-arrow {
          border-color: rgba(249, 115, 22, 0.35);
          color: #FF892F;
        }

        .fixed-arrow:hover {
          background: #FF892F;
          color: #001233;
          box-shadow: 0 0 14px rgba(249, 115, 22, 0.5);
        }

        .fixed-card-border {
          border-color: rgba(249, 115, 22, 0.22);
          background: rgba(0, 18, 51, 0.85);
        }

        .fixed-card-border .card-media {
          position: relative;
          height: 185px;
          overflow: hidden;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          background: #001233;
        }

        .fixed-card-border .card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .fixed-card-border:hover {
          border-color: #FF892F;
          box-shadow: 0 16px 40px rgba(0, 18, 51, 0.85), 0 0 25px rgba(249, 115, 22, 0.25);
        }

        .fixed-ribbon {
          background: linear-gradient(135deg, #EA580C, #C2410C);
        }

        .fixed-dur {
          border-color: rgba(249, 115, 22, 0.4);
          color: #FF892F;
        }

        /* Batch Departure Dates Strip */
        .batch-departure-strip {
          background: rgba(249, 115, 22, 0.08);
          border: 1px solid rgba(249, 115, 22, 0.2);
          border-radius: 8px;
          padding: 0.45rem 0.65rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .batch-dates-row {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          color: #CBD5E1;
        }

        .batch-dates-text strong {
          color: #FF892F;
        }

        .batch-seats-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .seats-progress-bg {
          flex: 1;
          height: 5px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }

        .seats-progress-fill {
          height: 100%;
          border-radius: 9999px;
          background: linear-gradient(90deg, #FF892F, #EF4444);
          transition: width 0.4s ease;
        }

        .seats-left-counter {
          font-size: 0.68rem;
          color: #F87171;
          white-space: nowrap;
        }

        .seats-left-counter strong {
          color: #FFFFFF;
        }

        .fixed-inclusions {
          background: rgba(0, 29, 81, 0.6);
        }

        .text-orange-price {
          color: #FF892F;
        }

        .btn-fixed-book {
          background: linear-gradient(135deg, #FF892F 0%, #EA580C 100%);
          box-shadow: 0 4px 14px rgba(249, 115, 22, 0.35);
        }

        .btn-fixed-book:hover {
          background: linear-gradient(135deg, #FFA459 0%, #FF892F 100%);
          box-shadow: 0 6px 20px rgba(249, 115, 22, 0.6);
        }

        .fixed-bottom-dock {
          border-color: rgba(249, 115, 22, 0.35);
          background: rgba(32, 9, 54, 0.75);
        }

        .btn-explore-all-fixed {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #FF892F 0%, #EA580C 100%);
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 800;
          padding: 0.6rem 1.35rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(249, 115, 22, 0.4);
        }

        .btn-explore-all-fixed:hover {
          background: linear-gradient(135deg, #FFA459 0%, #FF892F 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(249, 115, 22, 0.6);
        }

        .btn-custom-fixed-ai {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #F9FBE7;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.6rem 1.15rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-custom-fixed-ai:hover {
          background: rgba(249, 115, 22, 0.15);
          border-color: #FF892F;
          color: #FF892F;
        }
      `}</style>
    </section>
  );
}
