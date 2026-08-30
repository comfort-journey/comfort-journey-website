import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Heart, 
  MessageCircle, Sparkles, MapPin, Clock, Star, Phone, 
  ChevronDown, ChevronUp, Hotel, Car, Utensils, Ticket, 
  Compass, Users, Briefcase, Camera, Coffee, Wallet, Globe, Award
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { TOURS_DATA } from '../data/toursData';

export default function LandingPageTemplate({ 
  pageData, 
  onBackToHome, 
  onSelectItinerary, 
  onBookNow, 
  onOpenAIPlanner, 
  onOpenQuote 
}) {
  const { formatPrice } = useCurrency();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [destTab, setDestTab] = useState('india'); // 'india' | 'intl'

  // Update Page Title and Meta for SEO
  useEffect(() => {
    if (pageData?.metaTitle) {
      document.title = pageData.metaTitle;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageData]);

  if (!pageData) return null;

  const getIconComponent = (type) => {
    switch (type) {
      case 'coffee': return <Coffee size={20} className="text-amber" />;
      case 'compass': return <Compass size={20} className="text-cyan" />;
      case 'shield': return <ShieldCheck size={20} className="text-emerald" />;
      case 'wallet': return <Wallet size={20} className="text-amber" />;
      case 'camera': return <Camera size={20} className="text-cyan" />;
      case 'users': return <Users size={20} className="text-cyan" />;
      case 'heart': return <Heart size={20} className="text-rose-400" />;
      case 'hotel': return <Hotel size={20} className="text-amber" />;
      case 'car': return <Car size={20} className="text-cyan" />;
      case 'utensils': return <Utensils size={20} className="text-emerald" />;
      case 'clock': return <Clock size={20} className="text-amber" />;
      case 'star': return <Star size={20} className="text-amber fill-amber" />;
      default: return <Sparkles size={20} className="text-amber" />;
    }
  };

  const getTourFromId = (tourId, fallbackDestination) => {
    const matched = TOURS_DATA.find(t => t.id === tourId);
    if (matched) return matched;
    return {
      id: tourId || 'custom-pkg',
      name: fallbackDestination.name,
      country: fallbackDestination.name.split(',')[0],
      region: 'Curated',
      image: fallbackDestination.img,
      price: fallbackDestination.price,
      originalPrice: fallbackDestination.origPrice || Math.round(fallbackDestination.price * 1.25),
      duration: fallbackDestination.duration,
      tagline: fallbackDestination.tag,
      inclusions: ['4★/5★ Stay', 'Private Cab', 'Breakfast', 'VIP Sightseeing', '24/7 Concierge']
    };
  };

  const activeDestinations = (destTab === 'india' && pageData.destinationsIndia)
    ? pageData.destinationsIndia
    : (pageData.destinationsIntl || pageData.destinationsIndia || []);

  const encodedWhatsAppUrl = `https://wa.me/918770403315?text=${encodeURIComponent(pageData.whatsAppMsg || `Hi Comfort Journey! I'm interested in the ${pageData.slug} packages.`)}`;

  return (
    <div className="landing-page-root">
      {/* Top Header Navigation */}
      <header className="lp-top-nav">
        <div className="container lp-nav-container">
          <button 
            type="button" 
            className="lp-back-btn"
            onClick={onBackToHome}
          >
            <ArrowLeft size={16} />
            <span>Back to Main Site</span>
          </button>

          <div className="lp-brand-lockup">
            <span className="lp-brand-title">COMFORT JOURNEY</span>
            <span className="lp-brand-sub">EST. 1992 • LUXURY TRAVEL</span>
          </div>

          <div className="lp-nav-actions">
            <a 
              href="tel:+918770403315" 
              className="lp-phone-link"
              title="Call VIP Concierge"
            >
              <Phone size={14} />
              <span>+91 8770403315</span>
            </a>
            <a
              href={encodedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lp-whatsapp-cta"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="lp-hero-section">
        <div className="container lp-hero-content">
          <div className="lp-category-pill">
            <Sparkles size={14} className="text-amber" />
            <span>{pageData.categoryBadge || 'Special Edition'}</span>
          </div>

          <h1 className="lp-hero-headline font-editorial">
            {pageData.heroHeadline}
          </h1>

          <p className="lp-hero-subline">
            {pageData.heroSubline}
          </p>

          {/* Trust Badges Bar */}
          <div className="lp-trust-strip">
            <div className="lp-trust-item">
              <Star size={14} className="text-gold fill-gold" />
              <span><strong>4.95/5</strong> (1,200+ Reviews)</span>
            </div>
            <span className="lp-divider-dot">•</span>
            <div className="lp-trust-item">
              <Award size={14} className="text-cyan" />
              <span><strong>30+ Years</strong> Since 1992</span>
            </div>
            <span className="lp-divider-dot">•</span>
            <div className="lp-trust-item">
              <ShieldCheck size={14} className="text-emerald" />
              <span><strong>100% Verified</strong> Luxury Stays</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="lp-hero-actions">
            <a
              href={encodedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lp-primary"
            >
              <MessageCircle size={18} />
              <span>{pageData.ctaText || "Let's Plan This Trip"}</span>
            </a>

            <button
              type="button"
              className="btn-lp-secondary"
              onClick={onOpenAIPlanner}
            >
              <Sparkles size={16} className="text-amber" />
              <span>Customize with AI Planner</span>
            </button>
          </div>
        </div>
      </section>

      {/* The Reality Check / Opening Story Block */}
      {pageData.openingParagraph && (
        <section className="lp-story-section">
          <div className="container">
            <div className="lp-story-card glass-card">
              <h3 className="lp-story-title font-editorial">
                {pageData.openingHeading || "The Reality Check"}
              </h3>
              <div className="lp-story-body">
                {pageData.openingParagraph.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why This Hits Different (5 Feature Badges) */}
      {pageData.whyHitsDifferent && pageData.whyHitsDifferent.length > 0 && (
        <section className="lp-features-section">
          <div className="container">
            <div className="lp-section-header">
              <span className="lp-section-kicker">✨ ZERO DRAMA • 100% VIBES</span>
              <h2 className="lp-section-title font-editorial">Why This Hits Different</h2>
              <p className="lp-section-desc">We do the heavy lifting. You just show up and make the memories.</p>
            </div>

            <div className="lp-features-grid">
              {pageData.whyHitsDifferent.map((feat, idx) => (
                <div key={idx} className="lp-feature-card glass-card">
                  <div className="lp-feat-icon-badge">
                    {getIconComponent(feat.iconType)}
                  </div>
                  <h4 className="lp-feat-title font-editorial">{feat.title}</h4>
                  <p className="lp-feat-desc">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Curated Destinations & Compact Cards Grid */}
      <section className="lp-destinations-section">
        <div className="container">
          <div className="lp-section-header">
            <span className="lp-section-kicker">📍 HANDPICKED ITINERARIES</span>
            <h2 className="lp-section-title font-editorial">Where To Next?</h2>
            <p className="lp-section-desc">Transparent pricing. 5-star verified comfort. Zero hidden surcharges.</p>
          </div>

          {/* India vs International Selector */}
          {pageData.destinationsIndia && pageData.destinationsIntl && (
            <div className="lp-dest-tabs-bar">
              <button
                type="button"
                className={`lp-dest-tab ${destTab === 'india' ? 'active' : ''}`}
                onClick={() => setDestTab('india')}
              >
                <span>Incredible India ({pageData.destinationsIndia.length})</span>
              </button>
              <button
                type="button"
                className={`lp-dest-tab ${destTab === 'intl' ? 'active' : ''}`}
                onClick={() => setDestTab('intl')}
              >
                <span>International Passport ({pageData.destinationsIntl.length})</span>
              </button>
            </div>
          )}

          {/* Cards Grid */}
          <div className="lp-tours-grid">
            {activeDestinations.map((dest, i) => {
              const tourObj = getTourFromId(dest.tourId, dest);
              const origPrice = dest.origPrice || Math.round(dest.price * 1.25);
              const discountPct = Math.round(((origPrice - dest.price) / origPrice) * 100);

              return (
                <div key={i} className="lp-tour-card glass-card">
                  <div className="lp-card-media">
                    <img src={dest.img} alt={dest.name} loading="lazy" />
                    <div className="lp-media-overlay" />
                    
                    {discountPct > 0 && (
                      <span className="lp-discount-badge">{discountPct}% OFF</span>
                    )}

                    <span className="lp-duration-badge">
                      <Clock size={11} className="text-cyan inline mr-1" />
                      {dest.duration}
                    </span>
                  </div>

                  <div className="lp-card-body">
                    <div className="lp-location-tag">
                      <MapPin size={12} className="text-amber" />
                      <span>{dest.name}</span>
                    </div>

                    <h4 className="lp-card-title font-editorial">{dest.name}</h4>
                    <p className="lp-card-tag">{dest.tag}</p>

                    {/* Vector Inclusions Bar */}
                    <div className="compact-inclusions-icon-bar">
                      <div className="inc-icon-item" title="4★/5★ Luxury Stay">
                        <div className="inc-svg-badge"><Hotel size={12} className="text-amber" /></div>
                        <span className="inc-text">Stay</span>
                      </div>
                      <div className="inc-icon-item" title="Private Cab & Transfers">
                        <div className="inc-svg-badge"><Car size={12} className="text-cyan" /></div>
                        <span className="inc-text">Transfers</span>
                      </div>
                      <div className="inc-icon-item" title="Daily Breakfast & Dining">
                        <div className="inc-svg-badge"><Utensils size={12} className="text-emerald" /></div>
                        <span className="inc-text">Meals</span>
                      </div>
                      <div className="inc-icon-item" title="VIP Passes & Sightseeing">
                        <div className="inc-svg-badge"><Ticket size={12} className="text-amber" /></div>
                        <span className="inc-text">Sightseeing</span>
                      </div>
                      <div className="inc-icon-item" title="24/7 Dedicated Concierge">
                        <div className="inc-svg-badge"><ShieldCheck size={12} className="text-emerald" /></div>
                        <span className="inc-text">24/7 VIP</span>
                      </div>
                    </div>

                    {/* Pricing & CTA Action */}
                    <div className="lp-card-footer">
                      <div className="compact-price-box">
                        <div className="price-strike-row">
                          <span className="orig-price-strike">{formatPrice(origPrice)}</span>
                          <span className="price-save-badge">Save {formatPrice(origPrice - dest.price)}</span>
                        </div>
                        <div className="price-main-row">
                          <strong className="current-offer-price font-editorial">{formatPrice(dest.price)}</strong>
                          <span className="price-per-person">/ person</span>
                        </div>
                      </div>

                      <div className="lp-card-btns">
                        <button
                          type="button"
                          className="btn-lp-itinerary"
                          onClick={() => onSelectItinerary(tourObj)}
                        >
                          <span>Itinerary</span>
                        </button>
                        <button
                          type="button"
                          className="btn-lp-book"
                          onClick={() => onBookNow(tourObj)}
                        >
                          <span>Book</span>
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

      {/* What You Actually Get (5 Transparency Pillars) */}
      {pageData.whatYouGet && (
        <section className="lp-pillars-section">
          <div className="container">
            <div className="lp-pillars-card glass-card">
              <div className="lp-section-header">
                <span className="lp-section-kicker">🛡️ THE COMFORT PROMISE</span>
                <h2 className="lp-section-title font-editorial">What You Actually Get</h2>
                <p className="lp-section-desc">No asterisks. No hidden fees. Just 100% peace of mind.</p>
              </div>

              <div className="lp-pillars-grid">
                {pageData.whatYouGet.map((item, idx) => (
                  <div key={idx} className="lp-pillar-item">
                    <div className="pillar-num">{idx + 1}</div>
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
              <span className="lp-section-kicker">❓ COMMON QUESTIONS</span>
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
                      {isOpen ? <ChevronUp size={18} className="text-amber" /> : <ChevronDown size={18} className="text-muted" />}
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
          gap: 0.45rem;
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
          background: rgba(111, 230, 252, 0.15);
          border-color: #6FE6FC;
          color: #6FE6FC;
        }

        .lp-brand-lockup {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .lp-brand-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          color: #F9FBE7;
        }

        .lp-brand-sub {
          font-size: 0.65rem;
          font-weight: 800;
          color: #FF892F;
          letter-spacing: 0.12em;
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
          color: #CBD5E1;
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
        }

        .lp-phone-link:hover {
          color: #6FE6FC;
        }

        .lp-whatsapp-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #10B981;
          color: #FFFFFF;
          font-size: 0.82rem;
          font-weight: 800;
          padding: 0.45rem 0.95rem;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .lp-whatsapp-cta:hover {
          background: #059669;
          transform: scale(1.03);
        }

        /* Hero Section */
        .lp-hero-section {
          padding: 4.5rem 0 3rem 0;
          text-align: center;
          background: radial-gradient(circle at 50% 20%, rgba(0, 48, 135, 0.45) 0%, rgba(0, 11, 29, 0) 70%);
        }

        .lp-hero-content {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }

        .lp-category-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.35rem 0.95rem;
          border-radius: 9999px;
          background: rgba(255, 137, 47, 0.15);
          border: 1px solid rgba(255, 137, 47, 0.4);
          color: #FF892F;
          font-size: 0.78rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .lp-hero-headline {
          font-size: 3.2rem;
          line-height: 1.15;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .lp-hero-subline {
          font-size: 1.18rem;
          color: #CBD5E1;
          line-height: 1.6;
          max-width: 720px;
          margin: 0;
        }

        .lp-trust-strip {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.82rem;
          color: #CBD5E1;
          flex-wrap: wrap;
          justify-content: center;
        }

        .lp-trust-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .lp-divider-dot {
          color: rgba(255, 255, 255, 0.3);
        }

        .lp-hero-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-lp-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #FF892F, #E65100);
          color: #FFFFFF;
          font-size: 0.98rem;
          font-weight: 800;
          padding: 0.85rem 1.75rem;
          border-radius: 9999px;
          text-decoration: none;
          box-shadow: 0 8px 25px rgba(255, 137, 47, 0.4);
          transition: all 0.25s ease;
          border: none;
          cursor: pointer;
        }

        .btn-lp-primary:hover {
          background: #E65100;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(255, 137, 47, 0.5);
        }

        .btn-lp-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
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

        /* Story Section */
        .lp-story-section {
          padding: 2.5rem 0;
        }

        .lp-story-card {
          max-width: 860px;
          margin: 0 auto;
          padding: 2.5rem;
          border-radius: 24px;
          background: rgba(0, 29, 81, 0.45);
          border: 1px solid rgba(255, 137, 47, 0.2);
        }

        .lp-story-title {
          font-size: 1.85rem;
          color: #FF892F;
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
          color: #6FE6FC;
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
          border-color: rgba(255, 137, 47, 0.4);
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
          background: #FF892F;
          border-color: #FF892F;
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
          border-color: rgba(255, 137, 47, 0.45);
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
          border: 1px solid rgba(111, 230, 252, 0.3);
          color: #6FE6FC;
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
          background: rgba(111, 230, 252, 0.2);
          border-color: #6FE6FC;
          color: #6FE6FC;
        }

        .btn-lp-book {
          padding: 0.45rem 0.95rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #FF892F, #E65100);
          border: none;
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(255, 137, 47, 0.35);
        }

        .btn-lp-book:hover {
          background: #E65100;
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
          background: rgba(255, 137, 47, 0.15);
          border-color: rgba(255, 137, 47, 0.35);
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
          color: #FF892F;
        }

        .price-per-person {
          font-size: 0.7rem;
          color: #94A3B8;
        }

        /* Pillars Section */
        .lp-pillars-section {
          padding: 3.5rem 0;
        }

        .lp-pillars-card {
          max-width: 960px;
          margin: 0 auto;
          padding: 2.5rem;
          border-radius: 24px;
          background: rgba(0, 29, 81, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .lp-pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }

        .lp-pillar-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .pillar-num {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #FF892F;
          color: #FFFFFF;
          font-weight: 900;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pillar-title {
          font-size: 1.05rem;
          color: #FFFFFF;
          margin: 0 0 0.25rem 0;
          font-weight: 800;
        }

        .pillar-desc {
          font-size: 0.85rem;
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
          background: rgba(0, 18, 51, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .lp-faq-trigger {
          width: 100%;
          padding: 1.25rem 1.5rem;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          color: #FFFFFF;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          gap: 1rem;
        }

        .lp-faq-answer {
          padding: 0 1.5rem 1.25rem 1.5rem;
          color: #CBD5E1;
          font-size: 0.92rem;
          line-height: 1.6;
        }

        .lp-faq-answer p {
          margin: 0;
        }

        /* Final Banner */
        .lp-final-cta-banner {
          margin-top: 3.5rem;
          background: linear-gradient(135deg, rgba(0, 48, 135, 0.6), rgba(0, 18, 51, 0.95));
          border-top: 1px solid rgba(255, 137, 47, 0.3);
          border-bottom: 1px solid rgba(255, 137, 47, 0.3);
          padding: 3rem 0;
        }

        .lp-final-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .lp-final-title {
          font-size: 2.1rem;
          color: #FFFFFF;
          margin: 0 0 0.4rem 0;
        }

        .lp-final-desc {
          font-size: 1rem;
          color: #CBD5E1;
          margin: 0;
        }

        .lp-final-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .lp-hero-headline {
            font-size: 2.2rem;
          }
          .lp-final-container {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
