import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLiveTours } from '../../hooks/useLiveContent';
import { useCurrency } from '../../context/CurrencyContext';
import { useParticleBurst } from '../../hooks/useParticleBurst';
import Tilt3DCard from '../animations/Tilt3DCard';
import { 
  Users, Calendar, CalendarClock, Flame, MapPin, Clock, Star, Hotel, Car, Utensils, 
  Camera, ShieldCheck, ChevronLeft, ChevronRight, ArrowRight, CheckCircle2, Ticket, Compass,
  Mountain, Palmtree, CloudRain, Sparkles
} from 'lucide-react';

const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';

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
  const TOURS_DATA = useLiveTours();
  const { formatPrice } = useCurrency();
  const { triggerBurst } = useParticleBurst();
  const carouselRef = useRef(null);
  const [activeSubTab, setActiveSubTab] = useState('All');

  // Dynamically merge CMS-configured Fixed Departure packages with static batches
  const allBatches = useMemo(() => {
    const customBatches = (TOURS_DATA || []).filter(t => {
      const cats = Array.isArray(t.categories) ? t.categories : [];
      return (
        cats.some(c => typeof c === 'string' && c.toLowerCase().includes('fixed departure')) ||
        Boolean(t.fixedDeparture?.dates) ||
        (Boolean(t.dates) && t.seatsLeft !== undefined)
      );
    }).map(t => {
      const origPrice = t.originalPrice || Math.round((t.price || 25000) * 1.25);
      return {
        id: t.id,
        name: t.name,
        location: t.location || t.city || 'India',
        duration: t.duration || '5 Nights & 6 Days',
        price: t.price,
        originalPrice: origPrice,
        image: t.image,
        dates: t.fixedDeparture?.dates || t.dates || 'Every Friday Departure',
        seatsLeft: Number(t.fixedDeparture?.seatsLeft ?? t.seatsLeft ?? 4),
        totalSeats: Number(t.fixedDeparture?.totalSeats ?? t.totalSeats ?? 16),
        badge: t.fixedDeparture?.badge || t.badge || '🔥 Filling Fast',
        vibe: t.fixedDeparture?.vibe || t.vibe || 'Community Travel Tribe'
      };
    });

    const customIds = new Set(customBatches.map(b => b.id));
    return [...customBatches, ...FIXED_DEPARTURE_BATCHES.filter(b => !customIds.has(b.id))];
  }, [TOURS_DATA]);

  const filteredBatches = useMemo(() => {
    if (activeSubTab === 'All') return allBatches;
    if (activeSubTab === 'Spiti') return allBatches.filter(b => (b.location || '').includes('Spiti') || (b.location || '').includes('Himachal'));
    if (activeSubTab === 'Ladakh') return allBatches.filter(b => (b.location || '').includes('Leh') || (b.location || '').includes('Pangong'));
    if (activeSubTab === 'NorthEast') return allBatches.filter(b => (b.location || '').includes('Shillong') || (b.location || '').includes('Meghalaya'));
    if (activeSubTab === 'Intl') return allBatches.filter(b => (b.location || '').includes('Nusa') || (b.location || '').includes('Bali'));
    return allBatches;
  }, [allBatches, activeSubTab]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Automatic Horizontal Scrolling for Fixed Departures
  useEffect(() => {
    const el = carouselRef.current;
    if (!el || filteredBatches.length <= 1) return;

    let isPaused = false;
    let resumeTimeout = null;

    const interval = setInterval(() => {
      if (isPaused) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 30) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 275, behavior: 'smooth' });
      }
    }, 4200);

    const onUserInteract = () => {
      isPaused = true;
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => { isPaused = false; }, 6000);
    };

    el.addEventListener('touchstart', onUserInteract, { passive: true });
    el.addEventListener('mousedown', onUserInteract);

    return () => {
      clearInterval(interval);
      if (resumeTimeout) clearTimeout(resumeTimeout);
      el.removeEventListener('touchstart', onUserInteract);
      el.removeEventListener('mousedown', onUserInteract);
    };
  }, [filteredBatches]);

  return (
    <section id="fixed-departures" className="fixed-showcase-root">
      {/* Electric Sunset & Neon Violet Mesh Orbs */}
      <div className="fixed-neon-orb-top" />
      <div className="fixed-neon-orb-bottom" />

      <div className="container relative-z">
        {/* Section Header - Clean, Refined & Modern Luxury */}
        <div className="showcase-header">
          <div className="showcase-badge-pill fixed-badge">
            <Flame size={14} className="text-orange animate-bounce" />
            <span>GUARANTEED DEPARTURES & TRIBE</span>
          </div>
          <h2 className="showcase-title font-editorial">
            Fixed Departures <span className="gradient-text-orange-purple">& Travel Tribe</span>
          </h2>
          <p className="showcase-subtitle">
            100% guaranteed departure dates. Join solo or with friends — verified group batches with professional trip leads and shared bonfires.
          </p>

          {/* Vibe Micro-Badges Strip */}
          <div className="vibe-badges-strip">
            <span className="vibe-micro-badge fixed-micro"><Users size={12} className="text-orange" /> 45%+ Solo Travelers</span>
            <span className="vibe-micro-badge fixed-micro"><Calendar size={12} className="text-orange" /> Guaranteed Departures</span>
            <span className="vibe-micro-badge fixed-micro"><Camera size={12} className="text-orange" /> Trip Photography</span>
            <span className="vibe-micro-badge fixed-micro"><Flame size={12} className="text-orange" /> Bonfire Community</span>
          </div>

          {/* Sub-region filter tabs & carousel arrow controls */}
          <div className="controls-and-tabs-bar">
            <div className="sub-region-tabs">
              {[
                { id: 'All', label: 'All Upcoming Batches', icon: <Compass size={14} className="text-orange" /> },
                { id: 'Spiti', label: 'Spiti & Kasol', icon: <Mountain size={14} className="text-orange" /> },
                { id: 'Ladakh', label: 'Ladakh High Passes', icon: <Compass size={14} className="text-orange" /> },
                { id: 'NorthEast', label: 'Meghalaya Rainforest', icon: <CloudRain size={14} className="text-orange" /> },
                { id: 'Intl', label: 'Bali Island Tribe', icon: <Palmtree size={14} className="text-orange" /> },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  className={`sub-tab-btn fixed-tab ${activeSubTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveSubTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
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
                          <div className="price-main-col">
                            <span className="price-start-label">Starting from</span>
                            <div className="price-main-row">
                              <strong className="current-offer-price font-editorial text-orange-price">{formatPrice(batch.price)}</strong>
                              <span className="price-per-person">/ person</span>
                            </div>
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
              <CalendarClock size={15} />
              <span>Ask AI About Dates</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .fixed-showcase-root {
          padding: 6rem 0 5rem 0;
          position: relative;
          background: 
            linear-gradient(180deg, #0B1120 0%, rgba(11, 17, 32, 0.80) 10%, rgba(20, 10, 35, 0.60) 50%, rgba(11, 17, 32, 0.84) 90%, #0B1120 100%),
            url('${basePrefix}backgrounds/fixed-departures-kashmir-meadow.webp') center 40% / cover no-repeat;
          border-top: none;
          border-bottom: none;
          overflow-x: clip;
          overflow-y: visible;
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

        .fixed-tab {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
        }

        .fixed-tab:hover {
          color: var(--cj-text-heading);
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
          color: var(--cj-text-muted);
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
          color: var(--cj-text-heading);
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
          color: var(--cj-text-heading);
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

        /* ═══ RESPONSIVE ═══ */
        @media (max-width: 768px) {
          .fixed-showcase-root {
            padding: 2.5rem 0 1.5rem 0;
          }
          .showcase-title {
            font-size: 1.85rem !important;
            line-height: 1.25;
            margin-bottom: 0.5rem;
          }
          .showcase-subtitle {
            font-size: 0.85rem;
            line-height: 1.45;
            margin-bottom: 0.75rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          /* Hide redundant vibe badges on mobile to prevent clutter */
          .vibe-badges-strip {
            display: none !important;
          }

          .controls-and-tabs-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            margin-bottom: 0.75rem;
          }

          /* Smooth horizontal swipe sub-region tabs */
          .sub-region-tabs {
            display: flex;
            overflow-x: auto;
            flex-wrap: nowrap;
            width: 100%;
            gap: 0.45rem;
            padding-bottom: 0.4rem;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .sub-region-tabs::-webkit-scrollbar {
            display: none;
          }
          .sub-tab-btn {
            flex-shrink: 0;
            padding: 0.45rem 0.85rem;
            font-size: 0.8rem;
            white-space: nowrap;
          }

          .carousel-nav-arrows {
            display: none;
          }

          /* 3D Curved Gradient Mask Carousel Track */
          .showcase-carousel-track {
            padding: 0.25rem 0.5rem 1rem 0.5rem;
            gap: 0.95rem;
            mask-image: linear-gradient(to right, transparent, black 10px, black calc(100% - 16px), transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10px, black calc(100% - 16px), transparent);
          }
          .carousel-card-slide {
            flex: 0 0 68vw;
            max-width: 270px;
            scroll-snap-align: start;
          }
          .card-media {
            height: 145px;
          }

          .showcase-bottom-dock {
            flex-direction: column;
            align-items: flex-start;
            padding: 1rem 1.15rem;
            margin-top: 1rem;
            gap: 0.75rem;
          }
          .bottom-dock-info .dock-highlight {
            font-size: 0.9rem;
          }
          .bottom-dock-info p {
            font-size: 0.78rem;
          }
          .bottom-dock-actions {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .btn-explore-all-fixed, .btn-custom-fixed-ai {
            width: 100%;
            justify-content: center;
            padding: 0.65rem 1rem;
            font-size: 0.84rem;
          }
        }

        /* LIGHT THEME — warm cream panels (dark keeps original navy) */
        :root:not([data-theme="dark"]) .fixed-showcase-root,
        [data-theme="light"] .fixed-showcase-root {
          background:
            radial-gradient(640px 320px at 12% 6%, rgba(214,90,0,0.10), transparent 70%),
            radial-gradient(720px 360px at 88% 10%, rgba(124,58,237,0.08), transparent 70%),
            linear-gradient(180deg, #FFFDF7 0%, #F9FBE7 100%);
          border-top: 1px solid var(--cj-line, #E8E0CF);
          border-bottom: 1px solid var(--cj-line, #E8E0CF);
        }
        :root:not([data-theme="dark"]) .fixed-card-border,
        [data-theme="light"] .fixed-card-border {
          background: var(--cj-glass-card);
          -webkit-backdrop-filter: var(--cj-glass-blur);
          backdrop-filter: var(--cj-glass-blur);
          border: 1px solid var(--cj-glass-rim);
          box-shadow: 0 0 0 1px var(--cj-glass-hairline), var(--shadow-md, 0 10px 30px rgba(20,38,74,0.10)), inset 0 1px 0 rgba(255,255,255,0.8);
          border-color: var(--cj-line, #E8E0CF);
        }
        :root:not([data-theme="dark"]) .fixed-card-border .card-media,
        [data-theme="light"] .fixed-card-border .card-media {
          background: #F5F0E1;
        }
        :root:not([data-theme="dark"]) .fixed-bottom-dock,
        [data-theme="light"] .fixed-bottom-dock {
          background: var(--cj-glass-card);
          -webkit-backdrop-filter: var(--cj-glass-blur);
          backdrop-filter: var(--cj-glass-blur);
          border: 1px solid var(--cj-glass-rim);
          box-shadow: 0 0 0 1px var(--cj-glass-hairline), var(--shadow-md, 0 10px 30px rgba(20,38,74,0.10)), inset 0 1px 0 rgba(255,255,255,0.8);
          border-color: var(--cj-line, #E8E0CF);
        }
        :root:not([data-theme="dark"]) .fixed-inclusions,
        [data-theme="light"] .fixed-inclusions {
          background: var(--cj-bg-soft, #F5F0E1);
        }
        :root:not([data-theme="dark"]) .btn-custom-fixed-ai,
        [data-theme="light"] .btn-custom-fixed-ai {
          background: #FFFFFF;
          border-color: var(--cj-text-heading, #14264A);
        }
        :root:not([data-theme="dark"]) .fixed-dur,
        [data-theme="light"] .fixed-dur {
          background: rgba(255,255,255,0.92);
          color: var(--cj-cta-deep, #D65A00);
        }
        :root:not([data-theme="dark"]) .fixed-badge,
        [data-theme="light"] .fixed-badge {
          color: var(--cj-cta-deep, #D65A00);
          background: #FFFFFF;
        }
        :root:not([data-theme="dark"]) .gradient-text-orange-purple,
        [data-theme="light"] .gradient-text-orange-purple {
          background: linear-gradient(135deg, #C2410C 0%, #D65A00 45%, #7C3AED 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        /* Ghost summit-flag watermark — light only, mature line-art */
        :root:not([data-theme="dark"]) .fixed-showcase-root::before,
        [data-theme="light"] .fixed-showcase-root::before {
          content: '';
          position: absolute;
          top: 48px;
          right: 3%;
          width: min(360px, 38vw);
          aspect-ratio: 2;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Cg fill='none' stroke='%238A7F66' stroke-width='2'%3E%3Cpath d='M15,85 L70,30 L120,85 Z'/%3E%3Cline x1='70' y1='30' x2='70' y2='12'/%3E%3Cpath d='M70,12 L95,18 L70,25 Z'/%3E%3Cpath d='M110,85 L155,45 L190,85'/%3E%3Cline x1='15' y1='90' x2='190' y2='90'/%3E%3C/g%3E%3C/svg%3E") center/contain no-repeat;
          opacity: 0.07;
          pointer-events: none;
          z-index: 0;
        }
        :root:not([data-theme="dark"]) .seats-progress-bg,
        [data-theme="light"] .seats-progress-bg {
          background: rgba(20,38,74,0.12);
        }
        :root:not([data-theme="dark"]) .fixed-showcase-root .sub-tab-btn:not(.active),
        [data-theme="light"] .fixed-showcase-root .sub-tab-btn:not(.active) {
          background: #FFFFFF !important;
          border-color: var(--cj-line, #E8E0CF) !important;
          color: var(--cj-text-body, #334155) !important;
        }
        :root:not([data-theme="dark"]) .fixed-showcase-root .sub-tab-btn.active,
        [data-theme="light"] .fixed-showcase-root .sub-tab-btn.active {
          background: linear-gradient(135deg, #FF892F 0%, #EA580C 100%) !important;
          border-color: #FF892F !important;
          color: #FFFFFF !important;
          font-weight: 800 !important;
          box-shadow: 0 4px 18px rgba(249, 115, 22, 0.45) !important;
        }
        :root:not([data-theme="dark"]) .fixed-arrow,
        [data-theme="light"] .fixed-arrow {
          background: #FFFFFF;
          border-color: var(--cj-line, #E8E0CF);
          color: var(--cj-cta-deep, #D65A00);
        }
      `}</style>
    </section>
  );
}
