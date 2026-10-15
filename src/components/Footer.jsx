import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Heart, 
  ShieldCheck, 
  FileText, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  Star, 
  Compass, 
  Award, 
  Globe,
  Sliders,
  CheckCircle2,
  Sun,
  Mountain,
  Waves
} from 'lucide-react';

import ThemeToggle from './ThemeToggle';

const basePrefix = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const FOOTER_BACKGROUND_IMAGE = 'images/footer/footer-bg-golden-terrace.jpg';
const FOOTER_GRADIENT_OVERLAY = 'linear-gradient(180deg, #001233 0%, rgba(0, 18, 51, 0.48) 18%, rgba(0, 18, 51, 0.25) 45%, rgba(3, 11, 28, 0.88) 80%, #000c22 100%)';

export default function Footer({ 
  onOpenPolicy, 
  onOpenAdmin, 
  onOpenLandingHub, 
  onSelectLandingPage,
  onOpenAIPlanner 
}) {
  const handleLaunchPlanner = () => {
    if (onOpenAIPlanner) {
      onOpenAIPlanner();
    } else {
      const el = document.getElementById('destinations');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      id="contact" 
      className="footer-cinematic-root footer-dark-anchor"
    >
      {/* Background Scenic Layer with Permanent Luxury Sunset Backdrop */}
      <div className="scenic-bg-container" aria-hidden="true">
        <div
          className="scenic-bg-layer active"
          style={{
            backgroundImage: `url(${basePrefix}${FOOTER_BACKGROUND_IMAGE})`
          }}
        />
        {/* Cinematic Vignette & Royal Navy Gradient Fade */}
        <div 
          className="scenic-gradient-overlay"
          style={{ background: FOOTER_GRADIENT_OVERLAY }}
        />
        <div className="scenic-light-beam" />
      </div>

      <div className="container footer-content-container">
        
        {/* ========================================================
            TOP HERO CANVAS (Motionsites "Northstar" High-Impact CTA)
            ======================================================== */}
        <div className="footer-hero-canvas">
          <div className="hero-canvas-left">
            <div className="hero-eyebrow-pill">
              <Sparkles size={13} className="hero-pill-sparkle" />
              <span>READY WHEN YOU ARE · EST. 1992</span>
            </div>

            <h2 className="hero-canvas-title">
              Your next trip <br />
              <span className="hero-canvas-title-accent">starts with a hello</span>
            </h2>

            <p className="hero-canvas-desc">
              Kashmir houseboats, Kerala backwaters, Swiss mountains, Bali villas. Tell us what you are daydreaming about and we will turn it into a plan.
            </p>

            <div className="hero-canvas-actions">
              <button 
                type="button" 
                className="btn-hero-primary"
                onClick={handleLaunchPlanner}
              >
                <Sparkles size={16} />
                <span>Plan with Comfy.ai</span>
                <ArrowRight size={15} />
              </button>

              <a 
                href="https://wa.me/919203931912?text=Hi%20Comfort%20Journey!%20I%20am%20ready%20to%20plan%20my%20next%20vacation."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-secondary"
              >
                <MessageCircle size={16} className="text-emerald" />
                <span>WhatsApp us</span>
              </a>

              <a 
                href="tel:+919203931912" 
                className="btn-hero-ghost"
              >
                <Phone size={15} />
                <span>+91 92039 31912</span>
              </a>
            </div>
          </div>

          <div className="hero-canvas-right">
            {/* VIP Brand Credibility & Direct Assurance Card */}
            <div className="hero-trust-assurance-card">
              <div className="assurance-header">
                <ShieldCheck size={16} className="text-amber" />
                <span className="assurance-title">Comfort Journey Signature Care</span>
              </div>
              <div className="assurance-pills-row">
                <div className="assurance-item">
                  <CheckCircle2 size={13} className="text-emerald" />
                  <span>100% Bespoke Private Escapes</span>
                </div>
                <div className="assurance-item">
                  <CheckCircle2 size={13} className="text-emerald" />
                  <span>24/7 Dedicated On-Trip Concierge</span>
                </div>
                <div className="assurance-item">
                  <CheckCircle2 size={13} className="text-emerald" />
                  <span>Direct Tour Operator Best Rates</span>
                </div>
              </div>
            </div>

            {/* Google Verified Rating Badge */}
            <a 
              href="https://share.google/EUhDlYWM7iZDuJVs0" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="google-proof-pill"
            >
              <div className="google-stars">
                <Star size={14} className="star-gold" fill="#FBBC05" />
                <span className="google-score">4.8 / 5.0</span>
              </div>
              <div className="google-proof-text">
                <strong>85+ Verified Google Reviews</strong>
                <span>Premier Luxury Tour Agency</span>
              </div>
            </a>
          </div>
        </div>

        {/* ========================================================
            FLOATING LIQUID GLASS NAVIGATION DECK ("Nietzsche" Deck)
            ======================================================== */}
        <div className="footer-glass-deck">
          {/* Glass Specular Reflection Highlight */}
          <div className="deck-specular-glow" />

          {/* Deck Top Bar with Brand & Live Concierge */}
          <div className="deck-header-bar">
            <div className="deck-brand-col">
              <img 
                src="https://static.wixstatic.com/media/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg/v1/fill/w_192,h_192,lg_1,usm_0.66_1.00_0.01/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg" 
                alt="Comfort Journey Logo" 
                className="deck-logo-img"
              />
              <div className="deck-brand-meta">
                <div className="deck-brand-name">
                  <span>COMFORT JOURNEY</span>
                  <span className="deck-brand-star">★</span>
                </div>
                <span className="deck-brand-motto">We Cover Distance with Comfort</span>
              </div>
            </div>

            <div className="deck-header-actions-group">
              <div className="deck-social-cluster" aria-label="Official Social Channels">
                <a 
                  href="https://www.instagram.com/comfort.journey" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-channel-link instagram"
                  title="Follow Comfort Journey on Instagram"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://www.facebook.com/comfortjourney22/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-channel-link facebook"
                  title="Follow Comfort Journey on Facebook"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  <span>Facebook</span>
                </a>
                <a 
                  href="https://www.linkedin.com/company/comfort-journey/posts/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-channel-link linkedin"
                  title="Connect with Comfort Journey on LinkedIn"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://www.youtube.com/@Comfort.Journey" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-channel-link youtube"
                  title="Subscribe to Comfort Journey on YouTube"
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                  <span>YouTube</span>
                </a>
              </div>

              <div className="deck-badges-cluster">
                <span className="deck-badge badge-emerald">
                  <ShieldCheck size={13} className="text-emerald" />
                  <span>Govt. Verified</span>
                </span>
                <span className="deck-badge badge-cyan">
                  <MapPin size={13} className="text-cyan" />
                  <span>Bhopal, MP HQ</span>
                </span>
              </div>
            </div>
          </div>

          <div className="deck-separator-line" />

          {/* 4 Multi-Column Navigation Grid */}
          <div className="deck-columns-grid">
            
            {/* Col 1: Signature Circuits */}
            <div className="deck-nav-col">
              <h4 className="deck-col-title">
                <Compass size={15} className="col-title-icon text-amber" />
                <span>Signature Circuits</span>
              </h4>
              <ul className="deck-links-list">
                <li><a href="#/india-packages">Incredible India Signature</a></li>
                <li><a href="#/international-packages">World Passport Holidays</a></li>
                <li><a href="#/tropical-beach">Tropical Beach & Islands</a></li>
                <li><a href="#/mountain-escapes">Mountain & Himalayan Treks</a></li>
                <li><a href="#/summer-packages">Summer Vacation 2026 Specials</a></li>
                <li><a href="#/winter-packages">Winter Snow Wonderland</a></li>
                <li><a href="#/adventure-tours">Adventure & Thrill Expeditions</a></li>
              </ul>
            </div>

            {/* Col 2: Bespoke Experiences */}
            <div className="deck-nav-col">
              <h4 className="deck-col-title">
                <Heart size={15} className="col-title-icon text-emerald" />
                <span>Campaign Hub</span>
              </h4>
              <ul className="deck-links-list">
                <li><a href="#/solo-travel">Solo Traveler Escapes</a></li>
                <li><a href="#/couple-honeymoon">Honeymoon & Romantic Getaways</a></li>
                <li><a href="#/family-travel">Family Vacation Packages</a></li>
                <li><a href="#/group-travel">Friends & Squad Expeditions</a></li>
                <li><a href="#/corporate-travel">Corporate Offsites & Retreats</a></li>
                <li><a href="#/weekend-getaways">48-Hour Weekend Escapes</a></li>
                <li>
                  <button 
                    type="button" 
                    className="deck-action-link hub-cta-link"
                    onClick={onOpenLandingHub}
                  >
                    <Globe size={14} className="text-amber" />
                    <span>Explore All 15 Campaign Portals</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Trust & Assurances */}
            <div className="deck-nav-col">
              <h4 className="deck-col-title">
                <ShieldCheck size={15} className="col-title-icon text-purple" />
                <span>Trust & Assurances</span>
              </h4>
              <ul className="deck-links-list">
                <li>
                  <button 
                    type="button" 
                    className="deck-action-link"
                    onClick={() => onOpenPolicy && onOpenPolicy('cancellation')}
                  >
                    <ShieldCheck size={14} className="text-amber" />
                    <span>100% Refund & Cancellation</span>
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    className="deck-action-link"
                    onClick={() => onOpenPolicy && onOpenPolicy('privacy')}
                  >
                    <FileText size={14} className="text-emerald" />
                    <span>Traveler Safety & Privacy</span>
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    className="deck-action-link"
                    onClick={() => onOpenPolicy && onOpenPolicy('terms')}
                  >
                    <FileText size={14} className="text-purple" />
                    <span>Terms of VIP Booking</span>
                  </button>
                </li>
                <li>
                  <a href="#/blog" className="deck-action-link journal-highlight">
                    <FileText size={14} className="text-cyan" />
                    <span>Blogs</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: 24/7 VIP Concierge */}
            <div className="deck-nav-col">
              <h4 className="deck-col-title">
                <Phone size={15} className="col-title-icon text-cyan" />
                <span>24/7 VIP Concierge</span>
              </h4>
              <div className="deck-contact-list">
                <div className="deck-contact-item">
                  <MapPin size={17} className="contact-icon text-amber" />
                  <div className="deck-address-stack">
                    <div className="deck-address-line">
                      <strong className="deck-branch-tag">Office 1:</strong> Shop no 2, Phase 5, Ankur Complex, 6 Number Bus Stop, Shivaji Nagar, Bhopal, MP 462016
                    </div>
                    <div className="deck-address-line" style={{ marginTop: '0.45rem' }}>
                      <strong className="deck-branch-tag">Office 2:</strong> Unit no. 406-A(16) at 4th floor, Aakriti Business Centre, Aakriti Eco City, Bhopal
                    </div>
                  </div>
                </div>

                <div className="deck-contact-item">
                  <Phone size={17} className="contact-icon text-cyan" />
                  <a href="tel:+919203931912" className="contact-touch-link">+91 92039 31912</a>
                </div>

                <div className="deck-contact-item">
                  <MessageCircle size={17} className="contact-icon text-emerald" />
                  <a 
                    href="https://wa.me/919203931912?text=Hi%20Comfort%20Journey!%20I%20want%20to%20plan%20a%20luxury%20vacation." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-touch-link whatsapp-glow-link"
                  >
                    Instant WhatsApp VIP Concierge
                  </a>
                </div>

                <div className="deck-contact-item">
                  <Mail size={17} className="contact-icon text-purple" />
                  <a href="mailto:contact@comfortjourney.com" className="contact-touch-link">contact@comfortjourney.com</a>
                </div>
              </div>
            </div>

          </div>

          <div className="deck-separator-line subtle" />

          {/* Deck Bottom Copyright Bar */}
          <div className="deck-bottom-bar">
            <div className="bottom-left">
              <p>© {new Date().getFullYear()} Comfort Journey (Est. 1992). All rights reserved.</p>
              <span className="bottom-divider-bullet">•</span>
              <p className="bottom-craft-text">Handcrafted with Royal Luxury & High Performance</p>
            </div>

            <div className="bottom-right-touchpoints">
              <span title="Light / Dark theme (follows your device)">
                <ThemeToggle variant="icon" />
              </span>
              <a 
                href="https://www.instagram.com/comfort.journey" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="touchpoint-btn touchpoint-instagram"
                title="Instagram @comfort.journey"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a 
                href="https://www.facebook.com/comfortjourney22/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="touchpoint-btn touchpoint-facebook"
                title="Facebook @comfortjourney22"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/comfort-journey/posts/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="touchpoint-btn touchpoint-linkedin"
                title="LinkedIn Comfort Journey"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a 
                href="https://www.youtube.com/@Comfort.Journey" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="touchpoint-btn touchpoint-youtube"
                title="YouTube @Comfort.Journey"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
              <a 
                href="https://wa.me/919203931912" 
                target="_blank" 
                rel="noopener noreferrer"
                className="touchpoint-btn"
                title="WhatsApp VIP"
                aria-label="WhatsApp"
              >
                <MessageCircle size={15} />
              </a>
              <a 
                href="tel:+919203931912" 
                className="touchpoint-btn"
                title="Direct Phone Call"
                aria-label="Phone Call"
              >
                <Phone size={15} />
              </a>
              <a 
                href="https://share.google/EUhDlYWM7iZDuJVs0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="touchpoint-btn"
                title="Google Business Profile"
                aria-label="Google Reviews"
              >
                <Star size={15} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Modern High-End Scoped Styling */}
      <style>{`
        .footer-cinematic-root {
          position: relative;
          color: #94A3B8;
          padding: 6.5rem 0 4rem 0;
          overflow: hidden;
          background: #001233;
          z-index: 10;
        }

        /* Background Scenic Stack */
        .scenic-bg-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .scenic-bg-layer {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center bottom;
          opacity: 0;
          transform: scale(1.04);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.8s cubic-bezier(0.16, 1, 0.3, 1);
          filter: brightness(0.85) contrast(1.08);
        }

        .scenic-bg-layer.active {
          opacity: 1;
          transform: scale(1);
        }

        .scenic-gradient-overlay {
          position: absolute;
          inset: 0;
          transition: background 1.2s ease;
        }

        .scenic-light-beam {
          position: absolute;
          top: -20%;
          right: 15%;
          width: 60%;
          height: 80%;
          background: radial-gradient(ellipse at center, rgba(255, 159, 28, 0.15) 0%, rgba(255, 215, 0, 0.05) 45%, transparent 70%);
          pointer-events: none;
        }

        .footer-content-container {
          position: relative;
          z-index: 2;
        }

        /* ----------------------------------------------------
           TOP HERO CANVAS (Motionsites "Northstar" CTA)
           ---------------------------------------------------- */
        .footer-hero-canvas {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 3rem;
          margin-bottom: 3.5rem;
          padding: 0 0.5rem;
        }

        .hero-canvas-left {
          max-width: 680px;
        }

        .hero-eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.9rem;
          border-radius: 9999px;
          background: rgba(4, 14, 34, 0.65);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 159, 28, 0.45);
          color: #FFD166;
          font-family: var(--font-ui);
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1.15rem;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
        }

        .hero-pill-sparkle {
          color: #FF9F1C;
        }

        .hero-canvas-title {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 1.1rem;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
        }

        .hero-canvas-title-accent {
          background: linear-gradient(135deg, #FFFFFF 0%, #FFE399 35%, #FF9F1C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-canvas-desc {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.2vw, 1.08rem);
          line-height: 1.65;
          color: #E2E8F0;
          max-width: 580px;
          margin-bottom: 1.75rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .hero-canvas-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.85rem;
        }

        .btn-hero-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background: linear-gradient(135deg, #FF9F1C 0%, #FF6B00 100%);
          color: #FFFFFF;
          border: none;
          padding: 0.75rem 1.4rem;
          border-radius: 9999px;
          font-family: var(--font-ui);
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 8px 24px rgba(255, 107, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .btn-hero-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(255, 107, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .btn-hero-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(4, 18, 44, 0.75);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(16, 185, 129, 0.45);
          color: #FFFFFF;
          padding: 0.75rem 1.35rem;
          border-radius: 9999px;
          font-family: var(--font-ui);
          font-size: 0.92rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
        }

        .btn-hero-secondary:hover {
          background: rgba(16, 185, 129, 0.2);
          border-color: #10B981;
          transform: translateY(-2px);
        }

        .btn-hero-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #FFFFFF;
          padding: 0.75rem 1.15rem;
          border-radius: 9999px;
          font-family: var(--font-ui);
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-hero-ghost:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
        }

        .hero-canvas-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1.15rem;
        }

        /* VIP Brand Trust Assurance Card */
        .hero-trust-assurance-card {
          background: rgba(4, 14, 34, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 159, 28, 0.28);
          border-radius: 18px;
          padding: 0.95rem 1.25rem;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
          max-width: 380px;
        }

        .assurance-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #FF9F1C;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 0.65rem;
        }

        .assurance-pills-row {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .assurance-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #E2E8F0;
        }

        /* Google Proof Pill */
        .google-proof-pill {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          background: rgba(4, 14, 34, 0.75);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(251, 188, 5, 0.4);
          border-radius: 9999px;
          padding: 0.6rem 1.15rem;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
        }

        .google-proof-pill:hover {
          background: rgba(251, 188, 5, 0.15);
          border-color: #FBBC05;
          transform: translateY(-2px);
        }

        .google-stars {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .star-gold {
          color: #FBBC05;
        }

        .google-score {
          font-family: var(--font-ui);
          font-weight: 800;
          color: #FFFFFF;
          font-size: 0.92rem;
        }

        .google-proof-text {
          display: flex;
          flex-direction: column;
          line-height: 1.25;
        }

        .google-proof-text strong {
          color: #FBBC05;
          font-size: 0.82rem;
          font-weight: 700;
        }

        .google-proof-text span {
          color: #94A3B8;
          font-size: 0.72rem;
        }

        /* ----------------------------------------------------
           FLOATING LIQUID GLASS NAVIGATION DECK ("Nietzsche")
           ---------------------------------------------------- */
        .footer-glass-deck {
          position: relative;
          background: rgba(4, 14, 34, 0.72);
          backdrop-filter: blur(28px) saturate(190%);
          -webkit-backdrop-filter: blur(28px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 28px;
          padding: 2.25rem 2.5rem;
          box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          overflow: hidden;
        }

        .deck-specular-glow {
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4) 50%, transparent);
          pointer-events: none;
        }

        /* Deck Header Bar */
        .deck-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 1.75rem;
        }

        .deck-brand-col {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }

        .deck-logo-img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid #FF9F1C;
          box-shadow: 0 0 14px rgba(255, 159, 28, 0.4);
          flex-shrink: 0;
        }

        .deck-brand-meta {
          display: flex;
          flex-direction: column;
        }

        .deck-brand-name {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 800;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          letter-spacing: 0.02em;
        }

        .deck-brand-star {
          color: #FF9F1C;
          font-size: 1rem;
        }

        .deck-brand-motto {
          font-family: var(--font-ui);
          font-size: 0.8rem;
          color: #FF9F1C;
          font-style: italic;
          font-weight: 600;
        }

        .deck-header-actions-group {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .deck-social-cluster {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .social-channel-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.8rem;
          border-radius: 9999px;
          font-family: var(--font-ui, sans-serif);
          font-size: 0.76rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #E2E8F0;
          text-decoration: none;
          transition: all 0.22s ease;
        }

        .social-channel-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        }

        .social-channel-link.instagram:hover {
          background: linear-gradient(135deg, rgba(225, 48, 108, 0.28), rgba(253, 29, 29, 0.28));
          border-color: #E1306C;
          color: #FFFFFF;
        }

        .social-channel-link.facebook:hover {
          background: rgba(24, 119, 242, 0.25);
          border-color: #1877F2;
          color: #FFFFFF;
        }

        .social-channel-link.linkedin:hover {
          background: rgba(10, 102, 194, 0.25);
          border-color: #0A66C2;
          color: #FFFFFF;
        }

        .social-channel-link.youtube:hover {
          background: rgba(255, 0, 0, 0.25);
          border-color: #FF0000;
          color: #FFFFFF;
        }

        .touchpoint-instagram:hover {
          background: linear-gradient(135deg, rgba(225, 48, 108, 0.35), rgba(253, 29, 29, 0.35)) !important;
          border-color: #E1306C !important;
          color: #FFFFFF !important;
          box-shadow: 0 0 12px rgba(225, 48, 108, 0.5);
        }

        .touchpoint-facebook:hover {
          background: rgba(24, 119, 242, 0.3) !important;
          border-color: #1877F2 !important;
          color: #FFFFFF !important;
          box-shadow: 0 0 12px rgba(24, 119, 242, 0.5);
        }

        .touchpoint-linkedin:hover {
          background: rgba(10, 102, 194, 0.3) !important;
          border-color: #0A66C2 !important;
          color: #FFFFFF !important;
          box-shadow: 0 0 12px rgba(10, 102, 194, 0.5);
        }

        .touchpoint-youtube:hover {
          background: rgba(255, 0, 0, 0.3) !important;
          border-color: #FF0000 !important;
          color: #FFFFFF !important;
          box-shadow: 0 0 12px rgba(255, 0, 0, 0.5);
        }

        .deck-badges-cluster {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .deck-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.8rem;
          border-radius: 9999px;
          font-family: var(--font-ui);
          font-size: 0.78rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .deck-badge.badge-amber {
          color: #FFD166;
          border-color: rgba(255, 209, 102, 0.3);
        }

        .deck-badge.badge-emerald {
          color: #A7F3D0;
          border-color: rgba(16, 185, 129, 0.3);
        }

        .deck-badge.badge-cyan {
          color: #BAE6FD;
          border-color: rgba(111, 230, 252, 0.3);
        }

        .deck-concierge-status {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #10B981;
          font-family: var(--font-ui);
          font-size: 0.78rem;
          font-weight: 700;
        }

        .status-dot-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
          animation: pulseEmerald 2s infinite ease-in-out;
        }

        @keyframes pulseEmerald {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .deck-separator-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15) 20%, rgba(255, 159, 28, 0.35) 50%, rgba(255, 255, 255, 0.15) 80%, transparent);
          margin-bottom: 2rem;
        }

        .deck-separator-line.subtle {
          background: rgba(255, 255, 255, 0.08);
          margin-top: 2rem;
          margin-bottom: 1.5rem;
        }

        /* Deck Navigation Grid */
        .deck-columns-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .deck-col-title {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-family: var(--font-ui);
          font-size: 0.98rem;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 1.25rem;
          letter-spacing: 0.01em;
        }

        .col-title-icon {
          flex-shrink: 0;
        }

        .deck-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .deck-links-list a {
          color: #CBD5E1;
          font-size: 0.88rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
          display: inline-block;
          padding: 0.2rem 0;
        }

        .deck-links-list a:hover {
          color: #FF9F1C;
          transform: translateX(3px);
        }

        .deck-links-list .deck-action-link,
        .deck-action-link {
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.55rem !important;
          white-space: nowrap !important;
          background: none;
          border: none;
          padding: 0.2rem 0;
          color: #CBD5E1;
          font-family: var(--font-ui);
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .deck-action-link:hover {
          color: #FFFFFF;
          transform: translateX(3px);
        }

        .hub-cta-link {
          color: #FFD166;
          font-weight: 700;
          margin-top: 0.35rem;
        }

        .hub-cta-link:hover {
          color: #FF9F1C;
        }

        .journal-highlight {
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.55rem !important;
          white-space: nowrap !important;
          color: #6FE6FC !important;
          font-weight: 700;
        }

        .admin-dim-link {
          color: #94A3B8;
          font-size: 0.82rem;
          margin-top: 0.4rem;
        }

        .admin-dim-link:hover {
          color: #FF9F1C;
        }

        /* 24/7 Concierge Touchpoints */
        .deck-contact-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .deck-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.88rem;
          color: #CBD5E1;
          line-height: 1.45;
        }

        .deck-address-stack {
          display: flex;
          flex-direction: column;
        }

        .deck-branch-tag {
          color: #FFD166;
          font-weight: 700;
          margin-right: 0.25rem;
        }

        .contact-icon {
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .contact-touch-link {
          color: #FFFFFF;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .contact-touch-link:hover {
          color: #FF9F1C;
        }

        .whatsapp-glow-link {
          color: #A7F3D0;
        }

        .whatsapp-glow-link:hover {
          color: #10B981;
        }

        /* Deck Bottom Bar */
        .deck-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.82rem;
        }

        .bottom-left {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.65rem;
          color: #94A3B8;
        }

        .bottom-divider-bullet {
          color: rgba(255, 255, 255, 0.2);
        }

        .bottom-craft-text {
          color: #FFD166;
          font-weight: 600;
        }

        .bottom-right-touchpoints {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .touchpoint-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #CBD5E1;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .touchpoint-btn:hover {
          background: rgba(255, 159, 28, 0.2);
          border-color: #FF9F1C;
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        /* ----------------------------------------------------
           RESPONSIVE BREAKPOINTS
           ---------------------------------------------------- */
        @media (max-width: 1024px) {
          .footer-hero-canvas {
            flex-direction: column;
            align-items: flex-start;
            gap: 2rem;
          }

          .hero-canvas-right {
            align-items: flex-start;
            width: 100%;
          }

          .deck-columns-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .footer-cinematic-root {
            padding: 3.5rem 0 7.5rem 0; /* Clear Apple floating bottom dock */
          }

          .footer-hero-canvas {
            padding: 1.5rem 1rem;
            border-radius: 20px;
            gap: 1.25rem;
          }

          .hero-canvas-title {
            font-size: 1.85rem !important;
            line-height: 1.25;
            margin-bottom: 0.65rem;
          }

          .hero-canvas-desc {
            font-size: 0.88rem;
            line-height: 1.45;
            margin-bottom: 1.15rem;
          }

          .hero-trust-assurance-card {
            width: 100%;
            max-width: 100%;
          }

          .footer-glass-deck {
            padding: 1.5rem 1rem 5.5rem 1rem; /* Extra bottom clearance for dock */
            border-radius: 20px;
          }

          .deck-columns-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .hero-canvas-actions {
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
            width: 100%;
          }

          .btn-hero-primary {
            width: 100%;
            justify-content: center;
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
          }

          .btn-hero-secondary, .btn-hero-ghost {
            display: inline-flex;
            width: calc(50% - 0.3rem);
            justify-content: center;
            padding: 0.65rem 0.75rem;
            font-size: 0.82rem;
            white-space: nowrap;
          }

          .hero-canvas-actions {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: space-between;
          }

          .hero-canvas-actions .btn-hero-primary {
            width: 100%;
          }

          .deck-header-bar {
            flex-direction: column;
            align-items: flex-start;
          }

          .deck-badges-cluster {
            width: 100%;
          }

          .deck-bottom-bar {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
            padding-bottom: 1rem;
          }

          .bottom-left {
            justify-content: center;
          }

          .bottom-right-touchpoints {
            justify-content: center;
          }

          .deck-links-list a, .deck-action-link, .deck-contact-item a {
            min-height: 40px;
            display: inline-flex;
            align-items: center;
          }
        }
      `}</style>
    </footer>
  );
}
