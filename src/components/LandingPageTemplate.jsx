import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MessageCircle, 
  Phone, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  Clock, 
  Heart, 
  Coffee, 
  Compass, 
  Wallet, 
  Camera, 
  Users, 
  Hotel, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Car, 
  Utensils, 
  Ticket,
  Flame,
  Award,
  Zap,
  Smile,
  Quote
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { seoHeadManager } from '../utils/seoHeadManager';
import { jsonLdSchemaGenerator } from '../utils/jsonLdSchemaGenerator';

export default function LandingPageTemplate({ 
  pageData, 
  onBackToHome, 
  onSelectItinerary, 
  onBookNow, 
  onOpenAIPlanner, 
  onOpenQuote 
}) {
  const [activeTab, setActiveTab] = useState('india'); // 'india' | 'intl'
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [activeVibeFilter, setActiveVibeFilter] = useState('all');
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (pageData) {
      const faqSchema = jsonLdSchemaGenerator.getFaqPageSchema(pageData.faqs);
      seoHeadManager.updateMetadata({
        title: `${pageData.heroHeadline} | Comfort Journey`,
        description: pageData.heroSubline || pageData.realityCheck?.bad,
        image: pageData.theme?.heroImage || 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1600&q=85',
        url: `/#/${pageData.slug}`,
        type: "website",
        schema: faqSchema
      });
    }

    return () => {
      seoHeadManager.resetToDefault();
    };
  }, [pageData]);

  if (!pageData) return null;

  const theme = pageData.theme || {
    accentColor: '#FF892F',
    glowColor: 'rgba(255, 137, 47, 0.25)',
    bgGradient: 'radial-gradient(circle at 50% 15%, rgba(0, 29, 81, 0.6) 0%, rgba(0, 11, 29, 0.95) 75%)',
    heroImage: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1600&q=85',
    personaMood: 'Bespoke Luxury Experience',
    vibePills: [
      { label: '✨ 100% Tailor-Made', icon: 'sparkles' },
      { label: '🛡️ 24/7 VIP Concierge', icon: 'shield' },
      { label: '🏨 Verified 5-Star Stays', icon: 'hotel' }
    ]
  };

  const getFeatureIcon = (iconType) => {
    switch (iconType) {
      case 'coffee': return <Coffee size={22} style={{ color: theme.accentColor }} />;
      case 'compass': return <Compass size={22} style={{ color: theme.accentColor }} />;
      case 'shield': return <ShieldCheck size={22} style={{ color: theme.accentColor }} />;
      case 'wallet': return <Wallet size={22} style={{ color: theme.accentColor }} />;
      case 'camera': return <Camera size={22} style={{ color: theme.accentColor }} />;
      case 'heart': return <Heart size={22} style={{ color: theme.accentColor }} />;
      case 'users': return <Users size={22} style={{ color: theme.accentColor }} />;
      case 'hotel': return <Hotel size={22} style={{ color: theme.accentColor }} />;
      case 'car': return <Car size={22} style={{ color: theme.accentColor }} />;
      case 'utensils': return <Utensils size={22} style={{ color: theme.accentColor }} />;
      case 'clock': return <Clock size={22} style={{ color: theme.accentColor }} />;
      case 'ticket': return <Ticket size={22} style={{ color: theme.accentColor }} />;
      case 'sparkles': return <Sparkles size={22} style={{ color: theme.accentColor }} />;
      default: return <Sparkles size={22} style={{ color: theme.accentColor }} />;
    }
  };

  const destinations = activeTab === 'india' 
    ? (pageData.destinationsIndia || []) 
    : (pageData.destinationsIntl || []);

  const encodedWhatsAppUrl = `https://wa.me/918770403315?text=${encodeURIComponent(pageData.whatsAppMsg || 'Hi Comfort Journey! I would like to plan a trip.')}`;

  return (
    <div 
      className="landing-page-root"
      style={{
        '--lp-accent': theme.accentColor,
        '--lp-glow': theme.glowColor
      }}
    >
      {/* Top Floating Navigation Bar */}
      <nav className="lp-top-nav">
        <div className="container lp-nav-container">
          <button 
            type="button" 
            className="lp-back-btn"
            onClick={onBackToHome}
          >
            <ArrowLeft size={16} />
            <span>Back to Main Site</span>
          </button>

          <div className="lp-nav-brand">
            <img 
              src="https://static.wixstatic.com/media/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg/v1/fill/w_192,h_192,lg_1,usm_0.66_1.00_0.01/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg" 
              alt="Comfort Journey" 
              className="lp-brand-logo"
            />
            <span className="lp-brand-name font-editorial">Comfort Journey</span>
          </div>

          <div className="lp-nav-actions">
            <a href="tel:+918770403315" className="lp-phone-link">
              <Phone size={15} />
              <span>+91 87704 03315</span>
            </a>
            <a 
              href={encodedWhatsAppUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-lp-whatsapp"
            >
              <MessageCircle size={15} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Atmosphere Section with Parallax Persona Image & Atmospheric Lighting */}
      <header className="lp-hero-section">
        {/* Background Visual Banner with Atmospheric Overlay */}
        <div className="lp-hero-bg-wrapper">
          <img 
            src={theme.heroImage} 
            alt={pageData.heroHeadline}
            className="lp-hero-bg-img"
          />
          <div className="lp-hero-scrim"></div>
          <div className="lp-hero-radial-glow" style={{ background: theme.bgGradient }}></div>
        </div>

        <div className="container lp-hero-container">
          {/* Persona Mood Pill */}
          <div className="lp-persona-badge-wrapper animate-fade-in">
            <div className="lp-persona-badge">
              <span className="lp-persona-dot" style={{ backgroundColor: theme.accentColor }}></span>
              <span className="lp-persona-text">{theme.personaMood || pageData.categoryBadge}</span>
              <span className="lp-category-tag">{pageData.categoryBadge}</span>
            </div>
          </div>

          {/* Hero Headline */}
          <h1 className="lp-hero-title font-editorial animate-fade-in-up">
            {pageData.heroHeadline}
          </h1>

          {/* Hero Subline */}
          <p className="lp-hero-subline animate-fade-in-up delay-100">
            {pageData.heroSubline}
          </p>

          {/* Persona Vibe Pills Strip (Generation Z Aesthetic) */}
          {theme.vibePills && theme.vibePills.length > 0 && (
            <div className="lp-vibe-pills-row animate-fade-in-up delay-200">
              {theme.vibePills.map((pill, pIdx) => (
                <div key={pIdx} className="lp-vibe-pill">
                  <span>{pill.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Trust Highlights Strip */}
          <div className="lp-hero-trust-bar animate-fade-in-up delay-300">
            <div className="trust-item">
              <Star size={16} className="text-amber fill-amber" />
              <span><strong>4.95/5</strong> (1,200+ Reviews)</span>
            </div>
            <span className="trust-divider">•</span>
            <div className="trust-item">
              <Clock size={16} style={{ color: theme.accentColor }} />
              <span><strong>30+ Years</strong> Since 1992</span>
            </div>
            <span className="trust-divider">•</span>
            <div className="trust-item">
              <ShieldCheck size={16} className="text-emerald" />
              <span><strong>100% Verified</strong> Luxury Stays</span>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="lp-hero-cta-group animate-fade-in-up delay-400">
            <a 
              href={encodedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lp-primary"
              style={{
                background: `linear-gradient(135deg, ${theme.accentColor}, #E65100)`,
                boxShadow: `0 8px 25px ${theme.glowColor}`
              }}
            >
              <MessageCircle size={18} />
              <span>{pageData.ctaText || "Let's Plan This Trip"}</span>
            </a>

            <button 
              type="button" 
              className="btn-lp-secondary"
              onClick={onOpenAIPlanner}
            >
              <Sparkles size={18} style={{ color: theme.accentColor }} />
              <span>Customize with AI Planner</span>
            </button>
          </div>
        </div>
      </header>

      {/* Relatable Traveler Persona Quote Spotlight */}
      {theme.personaQuote && (
        <section className="lp-persona-quote-section">
          <div className="container">
            <div className="lp-persona-quote-card glass-card">
              <Quote size={28} className="quote-icon" style={{ color: theme.accentColor }} />
              <p className="quote-body font-editorial">"{theme.personaQuote.text}"</p>
              <div className="quote-author-row">
                <div className="quote-author-badge" style={{ borderColor: theme.accentColor }}>
                  <Smile size={18} style={{ color: theme.accentColor }} />
                </div>
                <div>
                  <span className="quote-author-name">{theme.personaQuote.author}</span>
                  <span className="quote-verified-tag">✓ Verified Traveler</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Opening Editorial Story Section ("The Reality Check") */}
      {pageData.openingParagraph && (
        <section className="lp-story-section">
          <div className="container">
            <div className="lp-story-card glass-card">
              <h2 className="lp-story-title font-editorial" style={{ color: theme.accentColor }}>
                {pageData.openingHeading || "The Reality Check"}
              </h2>
              <div className="lp-story-body">
                {pageData.openingParagraph.split('\n\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* "Why This Hits Different" 5-Feature Grid */}
      {pageData.whyHitsDifferent && pageData.whyHitsDifferent.length > 0 && (
        <section className="lp-features-section">
          <div className="container">
            <div className="lp-section-header">
              <span className="lp-section-kicker" style={{ color: theme.accentColor }}>
                ✨ WHY COMFORT JOURNEY HITS DIFFERENT
              </span>
              <h2 className="lp-section-title font-editorial">Built For Modern Travelers</h2>
              <p className="lp-section-desc">
                We eliminated all the boring, stressful friction so you can focus on pure wanderlust.
              </p>
            </div>

            <div className="lp-features-grid">
              {pageData.whyHitsDifferent.map((item, idx) => (
                <div key={idx} className="lp-feature-card glass-card">
                  <div className="lp-feat-icon-badge">
                    {getFeatureIcon(item.iconType)}
                  </div>
                  <h3 className="lp-feat-title font-editorial">{item.title}</h3>
                  <p className="lp-feat-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Curated Tour Packages Section with Compact Luxury Cards */}
      <section className="lp-destinations-section">
        <div className="container">
          <div className="lp-section-header">
            <span className="lp-section-kicker" style={{ color: theme.accentColor }}>
              📍 CURATED ESCAPES & PACKAGES
            </span>
            <h2 className="lp-section-title font-editorial">Where To Next?</h2>
            <p className="lp-section-desc">Transparent pricing. 5-star verified comfort. Zero hidden surcharges.</p>
          </div>

          {/* India vs International Tabs */}
          {(pageData.destinationsIndia?.length > 0 && pageData.destinationsIntl?.length > 0) && (
            <div className="lp-dest-tabs-bar">
              <button 
                type="button" 
                className={`lp-dest-tab ${activeTab === 'india' ? 'active' : ''}`}
                style={activeTab === 'india' ? { background: theme.accentColor, borderColor: theme.accentColor } : {}}
                onClick={() => setActiveTab('india')}
              >
                Incredible India ({pageData.destinationsIndia.length})
              </button>
              <button 
                type="button" 
                className={`lp-dest-tab ${activeTab === 'intl' ? 'active' : ''}`}
                style={activeTab === 'intl' ? { background: theme.accentColor, borderColor: theme.accentColor } : {}}
                onClick={() => setActiveTab('intl')}
              >
                International Passport ({pageData.destinationsIntl.length})
              </button>
            </div>
          )}

          {/* Cards Grid */}
          <div className="lp-tours-grid">
            {destinations.map((tour, idx) => {
              const discountPercent = tour.origPrice && tour.price 
                ? Math.round(((tour.origPrice - tour.price) / tour.origPrice) * 100) 
                : 20;

              return (
                <div key={idx} className="lp-tour-card glass-card">
                  {/* Card Media */}
                  <div className="lp-card-media">
                    <img src={tour.img} alt={tour.name} loading="lazy" />
                    <div className="lp-media-overlay"></div>
                    <span className="lp-discount-badge">{discountPercent}% OFF</span>
                    <span className="lp-duration-badge">
                      <Clock size={12} className="inline mr-1" />
                      {tour.duration}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="lp-card-body">
                    <div>
                      <div className="lp-location-tag">
                        <MapPin size={13} style={{ color: theme.accentColor }} />
                        <span>{tour.name}</span>
                      </div>
                      <h3 className="lp-card-title font-editorial">{tour.name}</h3>
                      <p className="lp-card-tag">{tour.tag}</p>
                    </div>

                    {/* Compact Inclusions Bar */}
                    <div className="compact-inclusions-icon-bar">
                      <div className="inc-icon-item" title="Verified Luxury Stay">
                        <div className="inc-svg-badge">
                          <Hotel size={13} style={{ color: theme.accentColor }} />
                        </div>
                        <span className="inc-text">Stay</span>
                      </div>
                      <div className="inc-icon-item" title="Private Sanitized Cabs">
                        <div className="inc-svg-badge">
                          <Car size={13} style={{ color: theme.accentColor }} />
                        </div>
                        <span className="inc-text">Transfers</span>
                      </div>
                      <div className="inc-icon-item" title="Breakfast & Meals Included">
                        <div className="inc-svg-badge">
                          <Utensils size={13} style={{ color: theme.accentColor }} />
                        </div>
                        <span className="inc-text">Meals</span>
                      </div>
                      <div className="inc-icon-item" title="Monument & Sightseeing Passes">
                        <div className="inc-svg-badge">
                          <Ticket size={13} style={{ color: theme.accentColor }} />
                        </div>
                        <span className="inc-text">Sightseeing</span>
                      </div>
                      <div className="inc-icon-item" title="24/7 VIP Concierge Support">
                        <div className="inc-svg-badge">
                          <ShieldCheck size={13} style={{ color: theme.accentColor }} />
                        </div>
                        <span className="inc-text">24/7 VIP</span>
                      </div>
                    </div>

                    {/* Card Price & Actions */}
                    <div className="lp-card-footer">
                      <div className="compact-price-box">
                        <div className="price-strike-row">
                          <span className="orig-price-strike">{formatPrice(tour.origPrice || tour.price * 1.25)}</span>
                          <span className="price-save-badge">Save {formatPrice((tour.origPrice || tour.price * 1.25) - tour.price)}</span>
                        </div>
                        <div className="price-main-row">
                          <span className="current-offer-price" style={{ color: theme.accentColor }}>
                            {formatPrice(tour.price)}
                          </span>
                          <span className="price-per-person">/ person</span>
                        </div>
                      </div>

                      <div className="lp-card-btns">
                        <button 
                          type="button" 
                          className="btn-lp-itinerary"
                          onClick={() => onSelectItinerary({
                            id: tour.tourId || `tour-${tour.name.toLowerCase().replace(/\s+/g, '-')}`,
                            title: tour.name,
                            category: pageData.categoryBadge,
                            duration: tour.duration,
                            price: tour.price,
                            origPrice: tour.origPrice,
                            image: tour.img,
                            rating: 4.95,
                            reviewsCount: 88,
                            overview: tour.tag
                          })}
                        >
                          Itinerary
                        </button>
                        <button 
                          type="button" 
                          className="btn-lp-book"
                          style={{
                            background: `linear-gradient(135deg, ${theme.accentColor}, #E65100)`
                          }}
                          onClick={() => onBookNow({
                            id: tour.tourId || `tour-${tour.name.toLowerCase().replace(/\s+/g, '-')}`,
                            title: tour.name,
                            category: pageData.categoryBadge,
                            duration: tour.duration,
                            price: tour.price,
                            origPrice: tour.origPrice,
                            image: tour.img
                          })}
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* "What You Actually Get" (The Comfort Promise) */}
      {pageData.whatYouGet && (
        <section className="lp-pillars-section">
          <div className="container">
            <div className="lp-pillars-card glass-card">
              <div className="lp-section-header">
                <span className="lp-section-kicker" style={{ color: theme.accentColor }}>
                  🛡️ THE COMFORT PROMISE
                </span>
                <h2 className="lp-section-title font-editorial">What You Actually Get</h2>
                <p className="lp-section-desc">No asterisks. No hidden fees. Just 100% peace of mind.</p>
              </div>

              <div className="lp-pillars-grid">
                {pageData.whatYouGet.map((item, idx) => (
                  <div key={idx} className="lp-pillar-item">
                    <div className="pillar-num" style={{ background: theme.accentColor }}>{idx + 1}</div>
                    <div className="pillar-text">
                      <h4 className="pillar-title">{item.title}</h4>
                      <p className="pillar-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Interactive FAQ Section */}
      {pageData.faqs && pageData.faqs.length > 0 && (
        <section className="lp-faqs-section">
          <div className="container">
            <div className="lp-section-header">
              <span className="lp-section-kicker" style={{ color: theme.accentColor }}>
                ❓ COMMON QUESTIONS
              </span>
              <h2 className="lp-section-title font-editorial">Frequently Asked Questions</h2>
              <p className="lp-section-desc">Everything you need to know before booking your trip.</p>
            </div>

            <div className="lp-faqs-accordion">
              {pageData.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className={`lp-faq-item glass-card ${isOpen ? 'active' : ''}`}>
                    <button 
                      type="button" 
                      className="lp-faq-trigger"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    >
                      <span className="lp-faq-q">{faq.q}</span>
                      {isOpen ? <ChevronUp size={18} style={{ color: theme.accentColor }} /> : <ChevronDown size={18} className="text-muted" />}
                    </button>
                    {isOpen && (
                      <div className="lp-faq-answer animate-fade-in">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Sticky Action Banner */}
      <section className="lp-final-cta-banner">
        <div className="container lp-final-container">
          <div className="lp-final-text">
            <h3 className="lp-final-title font-editorial">Ready to Turn This Into Reality?</h3>
            <p className="lp-final-desc">Direct WhatsApp curation with zero booking fees and instant confirmation.</p>
          </div>

          <div className="lp-final-actions">
            <a 
              href={encodedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lp-primary"
              style={{
                background: `linear-gradient(135deg, ${theme.accentColor}, #E65100)`,
                boxShadow: `0 8px 25px ${theme.glowColor}`
              }}
            >
              <MessageCircle size={18} />
              <span>WhatsApp Direct Curator</span>
            </a>
            <button 
              type="button" 
              className="btn-lp-secondary"
              onClick={onBackToHome}
            >
              <span>Explore Full Website</span>
            </button>
          </div>
        </div>
      </section>

      {/* STYLES FOR LANDING PAGE TEMPLATE */}
      <style>{`
        .landing-page-root {
          min-height: 100vh;
          background: #000B1D;
          color: #FFFFFF;
          font-family: var(--font-body);
          padding-bottom: 3rem;
        }

        .lp-top-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(0, 18, 51, 0.88);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.85rem 0;
        }

        .lp-nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .lp-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #E2E8F0;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.45rem 0.95rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lp-back-btn:hover {
          background: var(--lp-accent);
          border-color: var(--lp-accent);
          color: #FFFFFF;
        }

        .lp-nav-brand {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .lp-brand-logo {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid var(--lp-accent);
        }

        .lp-brand-name {
          font-size: 1.15rem;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: 0.02em;
        }

        .lp-nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .lp-phone-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #94A3B8;
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
        }

        .lp-phone-link:hover {
          color: #FFFFFF;
        }

        .btn-lp-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #25D366;
          color: #FFFFFF;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.45rem 1rem;
          border-radius: 9999px;
          text-decoration: none;
          transition: transform 0.2s ease;
        }

        .btn-lp-whatsapp:hover {
          transform: translateY(-1px);
        }

        /* Hero Atmosphere Section with Persona Imagery & Scrim */
        .lp-hero-section {
          position: relative;
          min-height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4.5rem 0 3.5rem 0;
          overflow: hidden;
          text-align: center;
        }

        .lp-hero-bg-wrapper {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
        }

        .lp-hero-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.4) saturate(1.2);
          transform: scale(1.04);
          transition: transform 10s ease;
        }

        .lp-hero-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 11, 29, 0.7) 0%, rgba(0, 11, 29, 0.95) 100%);
        }

        .lp-hero-radial-glow {
          position: absolute;
          inset: 0;
          opacity: 0.65;
          mix-blend-mode: screen;
        }

        .lp-hero-container {
          position: relative;
          z-index: 2;
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .lp-persona-badge-wrapper {
          margin-bottom: 1rem;
        }

        .lp-persona-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: rgba(0, 18, 51, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.35rem 0.9rem;
          border-radius: 9999px;
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .lp-persona-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 10px currentColor;
          animation: pulse 2s infinite;
        }

        .lp-persona-text {
          font-size: 0.78rem;
          font-weight: 700;
          color: #E2E8F0;
          letter-spacing: 0.04em;
        }

        .lp-category-tag {
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--lp-accent);
          background: rgba(255, 255, 255, 0.08);
          padding: 0.15rem 0.45rem;
          border-radius: 9999px;
          text-transform: uppercase;
        }

        .lp-hero-title {
          font-size: 3.4rem;
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1.15;
          margin-bottom: 1.15rem;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
        }

        .lp-hero-subline {
          font-size: 1.22rem;
          color: #CBD5E1;
          line-height: 1.6;
          max-width: 740px;
          margin: 0 auto 1.5rem auto;
        }

        /* Generation-Z Vibe Pills Strip */
        .lp-vibe-pills-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.65rem;
          margin-bottom: 1.5rem;
          max-width: 760px;
        }

        .lp-vibe-pill {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          padding: 0.4rem 0.9rem;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #F8FAFC;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: all 0.25s ease;
        }

        .lp-vibe-pill:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: var(--lp-accent);
          transform: translateY(-2px);
        }

        .lp-hero-trust-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          font-size: 0.88rem;
          color: #94A3B8;
          margin-bottom: 2rem;
          background: rgba(0, 18, 51, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.55rem 1.35rem;
          border-radius: 9999px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .trust-divider {
          color: rgba(255, 255, 255, 0.2);
        }

        .lp-hero-cta-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-lp-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          color: #FFFFFF;
          font-size: 1rem;
          font-weight: 800;
          padding: 0.9rem 1.85rem;
          border-radius: 9999px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-lp-primary:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        .btn-lp-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          font-size: 0.95rem;
          font-weight: 700;
          padding: 0.85rem 1.5rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-lp-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: #FFFFFF;
        }

        /* Persona Spotlight Quote Section */
        .lp-persona-quote-section {
          padding: 1.5rem 0 2.5rem 0;
        }

        .lp-persona-quote-card {
          max-width: 860px;
          margin: 0 auto;
          padding: 2rem 2.5rem;
          border-radius: 20px;
          background: rgba(0, 18, 51, 0.65);
          border: 1px solid var(--lp-glow);
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .quote-icon {
          opacity: 0.8;
        }

        .quote-body {
          font-size: 1.15rem;
          line-height: 1.6;
          color: #E2E8F0;
          margin: 0;
          font-style: italic;
        }

        .quote-author-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .quote-author-badge {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid var(--lp-accent);
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quote-author-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: #FFFFFF;
          display: block;
        }

        .quote-verified-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: #10B981;
        }

        /* Story Section */
        .lp-story-section {
          padding: 2rem 0 3rem 0;
        }

        .lp-story-card {
          max-width: 860px;
          margin: 0 auto;
          padding: 2.5rem;
          border-radius: 24px;
          background: rgba(0, 29, 81, 0.45);
          border: 1px solid var(--lp-glow);
        }

        .lp-story-title {
          font-size: 1.85rem;
          margin-bottom: 1.25rem;
        }

        .lp-story-body p {
          font-size: 1.02rem;
          line-height: 1.7;
          color: #CBD5E1;
          margin-bottom: 1rem;
        }

        .lp-story-body p:last-child {
          margin-bottom: 0;
        }

        /* Features Section */
        .lp-features-section {
          padding: 3.5rem 0;
        }

        .lp-section-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 2.5rem auto;
        }

        .lp-section-kicker {
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 0.4rem;
        }

        .lp-section-title {
          font-size: 2.35rem;
          color: #FFFFFF;
          margin: 0 0 0.5rem 0;
        }

        .lp-section-desc {
          font-size: 0.98rem;
          color: #94A3B8;
          margin: 0;
        }

        .lp-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }

        .lp-feature-card {
          padding: 1.75rem;
          border-radius: 20px;
          background: rgba(0, 18, 51, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          transition: all 0.3s ease;
        }

        .lp-feature-card:hover {
          border-color: var(--lp-glow);
          transform: translateY(-4px);
        }

        .lp-feat-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lp-feat-title {
          font-size: 1.2rem;
          color: #FFFFFF;
          margin: 0;
        }

        .lp-feat-desc {
          font-size: 0.88rem;
          color: #94A3B8;
          line-height: 1.55;
          margin: 0;
        }

        /* Destinations Section */
        .lp-destinations-section {
          padding: 3.5rem 0;
        }

        .lp-dest-tabs-bar {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }

        .lp-dest-tab {
          padding: 0.65rem 1.35rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #E2E8F0;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lp-dest-tab.active {
          color: #FFFFFF;
        }

        .lp-tours-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(295px, 1fr));
          gap: 1.35rem;
        }

        .lp-tour-card {
          border-radius: 20px;
          overflow: hidden;
          background: rgba(0, 18, 51, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .lp-tour-card:hover {
          border-color: var(--lp-glow);
          transform: translateY(-4px);
        }

        .lp-card-media {
          position: relative;
          height: 175px;
          overflow: hidden;
        }

        .lp-card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .lp-tour-card:hover .lp-card-media img {
          transform: scale(1.06);
        }

        .lp-media-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0, 18, 51, 0.8) 100%);
        }

        .lp-discount-badge {
          position: absolute;
          top: 0.65rem;
          left: 0.65rem;
          background: #10B981;
          color: #FFFFFF;
          font-size: 0.68rem;
          font-weight: 800;
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
          z-index: 2;
        }

        .lp-duration-badge {
          position: absolute;
          bottom: 0.65rem;
          left: 0.65rem;
          background: rgba(0, 18, 51, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          z-index: 2;
        }

        .lp-card-body {
          padding: 1rem 1.15rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: space-between;
          gap: 0.65rem;
        }

        .lp-location-tag {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: #94A3B8;
        }

        .lp-card-title {
          font-size: 1.12rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
        }

        .lp-card-tag {
          font-size: 0.82rem;
          color: #CBD5E1;
          margin: 0;
          line-height: 1.4;
        }

        /* Compact Vector Inclusions Bar */
        .compact-inclusions-icon-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.25rem;
          margin: 0.5rem 0;
          padding: 0.4rem 0.55rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
        }

        .inc-icon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.15rem;
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

        .inc-icon-item:hover .inc-svg-badge {
          background: rgba(255, 255, 255, 0.12);
          border-color: var(--lp-accent);
        }

        .inc-text {
          font-size: 0.65rem;
          color: #94A3B8;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        /* Compact Price Display */
        .compact-price-box {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
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
          background: rgba(16, 185, 129, 0.1);
          padding: 0.05rem 0.35rem;
          border-radius: 4px;
        }

        .price-main-row {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
        }

        .current-offer-price {
          font-size: 1.25rem;
          font-weight: 900;
        }

        .price-per-person {
          font-size: 0.7rem;
          color: #94A3B8;
        }

        .lp-card-footer {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          gap: 0.5rem;
        }

        .lp-card-btns {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .btn-lp-itinerary {
          padding: 0.45rem 0.85rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-lp-itinerary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: #FFFFFF;
        }

        .btn-lp-book {
          padding: 0.45rem 0.95rem;
          border-radius: 9999px;
          border: none;
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 800;
          cursor: pointer;
        }

        .btn-lp-book:hover {
          filter: brightness(1.1);
        }

        /* Pillars Section */
        .lp-pillars-section {
          padding: 3.5rem 0;
        }

        .lp-pillars-card {
          padding: 3rem;
          border-radius: 24px;
          background: rgba(0, 18, 51, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .lp-pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .lp-pillar-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .pillar-num {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          color: #FFFFFF;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pillar-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 0.3rem 0;
        }

        .pillar-desc {
          font-size: 0.86rem;
          color: #94A3B8;
          line-height: 1.5;
          margin: 0;
        }

        /* FAQs Section */
        .lp-faqs-section {
          padding: 3.5rem 0;
        }

        .lp-faqs-accordion {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .lp-faq-item {
          border-radius: 16px;
          background: rgba(0, 18, 51, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .lp-faq-item.active {
          border-color: var(--lp-glow);
          background: rgba(0, 29, 81, 0.5);
        }

        .lp-faq-trigger {
          width: 100%;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: transparent;
          border: none;
          color: #FFFFFF;
          font-size: 1rem;
          font-weight: 700;
          text-align: left;
          cursor: pointer;
        }

        .lp-faq-answer {
          padding: 0 1.5rem 1.25rem 1.5rem;
          font-size: 0.92rem;
          color: #CBD5E1;
          line-height: 1.6;
        }

        .lp-faq-answer p {
          margin: 0;
        }

        /* Bottom Final CTA Banner */
        .lp-final-cta-banner {
          margin-top: 3.5rem;
          padding: 3rem 0;
          background: linear-gradient(180deg, rgba(0, 29, 81, 0.6) 0%, rgba(0, 11, 29, 0.95) 100%);
          border-top: 1px solid var(--lp-glow);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .lp-final-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .lp-final-title {
          font-size: 1.85rem;
          color: #FFFFFF;
          margin: 0 0 0.4rem 0;
        }

        .lp-final-desc {
          font-size: 0.95rem;
          color: #94A3B8;
          margin: 0;
        }

        .lp-final-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .lp-hero-title {
            font-size: 2.2rem;
          }
          .lp-hero-trust-bar {
            flex-direction: column;
            gap: 0.5rem;
            border-radius: 16px;
          }
          .trust-divider {
            display: none;
          }
          .lp-final-container {
            flex-direction: column;
            text-align: center;
          }
          .lp-final-actions {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
