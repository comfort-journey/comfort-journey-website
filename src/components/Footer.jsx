import React from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Star, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Lock, 
  Compass, 
  Globe 
} from 'lucide-react';

const basePrefix = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export default function Footer({ 
  onOpenPolicy, 
  onOpenAdmin, 
  onOpenLandingHub, 
  onSelectLandingPage,
  onOpenAIPlanner 
}) {
  return (
    <footer id="contact" className="footer-nietzsche-root">
      <div className="container">
        
        {/* The 3D Stepped Nietzsche Luxury Card */}
        <div className="nietzsche-card">
          
          {/* ========================================================
              1. FULL-BLEED BACKGROUND LANDSCAPE CANVAS
              ======================================================== */}
          <div className="card-bg-canvas" aria-hidden="true">
            <img 
              src={`${basePrefix}images/footer/footer-bg-golden-terrace.jpg`} 
              alt="Comfort Journey Golden Mountain Vista" 
              className="canvas-landscape-img" 
            />
            {/* Subtle atmospheric sky glow on upper right */}
            <div className="canvas-sky-gradient" />
          </div>

          {/* ========================================================
              2. TOP SOLID WHITE HEADER (100% Width)
              ======================================================== */}
          <div className="card-top-header">
            
            {/* Brand Logo & Heritage */}
            <div className="card-brand-block">
              <div className="brand-logo-row">
                <div className="brand-sun-emblem">
                  <svg viewBox="0 0 24 24" fill="none" className="sun-icon">
                    <circle cx="12" cy="12" r="5" fill="#FF6B00" />
                    <line x1="12" y1="1" x2="12" y2="4" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="12" y1="20" x2="12" y2="23" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="1" y1="12" x2="4" y2="12" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="20" y1="12" x2="23" y2="12" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="brand-name">Comfort Journey</h3>
                  <p className="brand-tagline">Est. 1992 · Luxury Travel Concierge</p>
                </div>
              </div>
            </div>

            {/* 4 Clean Navigation Columns */}
            <div className="card-nav-columns">
              
              {/* Col 1: Signature Circuits */}
              <div className="nav-column">
                <h4 className="column-title">Signature Circuits</h4>
                <ul className="column-list">
                  <li><a href="#/india-packages">Incredible India</a></li>
                  <li><a href="#/international-packages">World Passport</a></li>
                  <li><a href="#/tropical-beach">Beach & Islands</a></li>
                  <li><a href="#/mountain-escapes">Mountain & Treks</a></li>
                  <li><a href="#/summer-packages">Summer 2026 Specials</a></li>
                </ul>
              </div>

              {/* Col 2: Campaign Hub */}
              <div className="nav-column">
                <h4 className="column-title">Campaign Hub</h4>
                <ul className="column-list">
                  <li><a href="#/solo-travel">Solo Escapes</a></li>
                  <li><a href="#/couple-honeymoon">Honeymoon & Couples</a></li>
                  <li><a href="#/family-travel">Family Holidays</a></li>
                  <li><a href="#/corporate-travel">Corporate Offsites</a></li>
                  <li>
                    <button 
                      type="button" 
                      className="nav-action-btn highlight"
                      onClick={onOpenLandingHub}
                    >
                      All 15 Portals →
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 3: Trust & Policies */}
              <div className="nav-column">
                <h4 className="column-title">Trust & Policies</h4>
                <ul className="column-list">
                  <li>
                    <button 
                      type="button" 
                      className="nav-action-btn"
                      onClick={() => onOpenPolicy && onOpenPolicy('cancellation')}
                    >
                      100% Refund Policy
                    </button>
                  </li>
                  <li>
                    <button 
                      type="button" 
                      className="nav-action-btn"
                      onClick={() => onOpenPolicy && onOpenPolicy('privacy')}
                    >
                      Traveler Safety & Privacy
                    </button>
                  </li>
                  <li>
                    <button 
                      type="button" 
                      className="nav-action-btn"
                      onClick={() => onOpenPolicy && onOpenPolicy('terms')}
                    >
                      Terms of VIP Booking
                    </button>
                  </li>
                  <li><a href="#/blog">Editorial Journal</a></li>
                  <li>
                    <button 
                      type="button" 
                      className="nav-action-btn subtle"
                      onClick={onOpenAdmin}
                    >
                      Team Studio
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 4: VIP Concierge */}
              <div className="nav-column">
                <h4 className="column-title">VIP Concierge</h4>
                <ul className="column-list">
                  <li><span className="location-text">Bhopal, MP HQ</span></li>
                  <li><a href="tel:+918770403315" className="contact-link">+91 87704 03315</a></li>
                  <li>
                    <a 
                      href="https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I%20want%20to%20plan%20a%20vacation." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-link whatsapp"
                    >
                      WhatsApp VIP Desk
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://share.google/EUhDlYWM7iZDuJVs0" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-link google"
                    >
                      ★ 4.8 Google Reviews
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* 3. Hairline Divider Line */}
          <div className="card-divider-line" />

          {/* ========================================================
              4. STEPPED 3D OVERLAP ROW
              - Left: Solid white card block with large text
              - Right: Transparent open window exposing the mountain peak and sky!
              ======================================================== */}
          <div className="card-stepped-row">
            
            {/* Left Solid White Stepped Panel with 3D drop shadow */}
            <div className="stepped-white-panel">
              <h2 className="editorial-heading">
                Handcrafting journeys for the discerning voyager
              </h2>
              <p className="editorial-desc">
                Bespoke private itineraries, verified 5-star properties, dedicated chauffeurs, and 24/7 royal concierge care across 2,000+ worldwide destinations since 1992.
              </p>
            </div>

            {/* Right Open Area: Mountain Peak & Sky Visually Emerge from Behind */}
            <div className="stepped-open-window">
              <div className="floating-socials-group">
                <h4 className="socials-label">Socials</h4>
                <div className="socials-icon-row">
                  <a 
                    href="https://wa.me/918770403315" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-btn" 
                    title="WhatsApp VIP"
                  >
                    <MessageCircle size={18} />
                  </a>

                  <a 
                    href="tel:+918770403315" 
                    className="social-btn" 
                    title="Call Concierge (+91 87704 03315)"
                  >
                    <Phone size={18} />
                  </a>

                  <a 
                    href="https://share.google/EUhDlYWM7iZDuJVs0" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-btn" 
                    title="Google Business Profile (4.8★)"
                  >
                    <Star size={18} />
                  </a>

                  <a 
                    href="mailto:contact@comfortjourney.com" 
                    className="social-btn" 
                    title="Email Concierge"
                  >
                    <Mail size={18} />
                  </a>

                  {onOpenAIPlanner && (
                    <button 
                      type="button" 
                      className="social-btn ai-btn" 
                      onClick={onOpenAIPlanner}
                      title="Plan with Comfy.ai"
                    >
                      <Sparkles size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================
              5. 100% UNOBSTRUCTED SCENIC VIEWPORT
              (NO boxes, NO buttons, NO overlays over the mountains & terraces)
              ======================================================== */}
          <div className="card-scenic-viewport" />

          {/* 6. Clean Minimal Baseline Bar */}
          <div className="card-baseline-bar">
            <p className="copyright-text">
              © {new Date().getFullYear()} Comfort Journey (Est. 1992). All rights reserved.
            </p>
            <p className="craft-text">
              We Cover Distance with Comfort · Royal Luxury Travel
            </p>
          </div>

        </div>
      </div>

      {/* 3D Stepped Nietzsche Styling */}
      <style>{`
        .footer-nietzsche-root {
          padding: 3.5rem 0 6rem 0;
          background: #001233;
          position: relative;
          z-index: 10;
        }

        /* The Main 3D Card Container */
        .nietzsche-card {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 30px 75px -15px rgba(0, 0, 0, 0.5);
          background: #0F172A;
        }

        /* Full-Bleed Background Landscape Canvas */
        .card-bg-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .canvas-landscape-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center bottom;
          display: block;
        }

        .canvas-sky-gradient {
          position: absolute;
          top: 0;
          right: 0;
          width: 55%;
          height: 50%;
          background: radial-gradient(ellipse at top right, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.25) 50%, transparent 80%);
          pointer-events: none;
        }

        /* ----------------------------------------------------
           ROW 1: Solid White Top Header (100% Width)
           ---------------------------------------------------- */
        .card-top-header {
          position: relative;
          z-index: 10;
          background: #FFFFFF;
          padding: 2.25rem 3rem 1.4rem 3rem;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 2.5rem;
        }

        .card-brand-block {
          flex-shrink: 0;
        }

        .brand-logo-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .brand-sun-emblem {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sun-icon {
          width: 34px;
          height: 34px;
        }

        .brand-name {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .brand-tagline {
          font-family: var(--font-ui);
          font-size: 0.76rem;
          color: #64748B;
          font-weight: 600;
          margin-top: 0.15rem;
        }

        /* 4 Navigation Columns */
        .card-nav-columns {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          flex-grow: 1;
          max-width: 780px;
        }

        .nav-column {
          display: flex;
          flex-direction: column;
        }

        .column-title {
          font-family: var(--font-ui);
          font-size: 0.92rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
        }

        .column-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .column-list a, .column-list .location-text {
          font-family: var(--font-ui);
          font-size: 0.84rem;
          color: #64748B;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
          font-weight: 500;
        }

        .column-list a:hover {
          color: #FF6B00;
          transform: translateX(2px);
        }

        .contact-link.whatsapp {
          color: #059669;
          font-weight: 600;
        }

        .contact-link.whatsapp:hover {
          color: #047857;
        }

        .contact-link.google {
          color: #D97706;
          font-weight: 600;
        }

        .nav-action-btn {
          background: none;
          border: none;
          padding: 0;
          font-family: var(--font-ui);
          font-size: 0.84rem;
          color: #64748B;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
        }

        .nav-action-btn:hover {
          color: #FF6B00;
          transform: translateX(2px);
        }

        .nav-action-btn.highlight {
          color: #FF6B00;
          font-weight: 700;
        }

        .nav-action-btn.subtle {
          color: #94A3B8;
          font-size: 0.78rem;
        }

        /* ----------------------------------------------------
           DIVIDER LINE
           ---------------------------------------------------- */
        .card-divider-line {
          position: relative;
          z-index: 10;
          height: 1px;
          background: #E2E8F0;
        }

        /* ----------------------------------------------------
           STEPPED 3D ROW
           ---------------------------------------------------- */
        .card-stepped-row {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: stretch;
        }

        /* Left Solid White Stepped Panel */
        .stepped-white-panel {
          background: #FFFFFF;
          width: 50%;
          padding: 2.25rem 3rem 2.75rem 3rem;
          border-bottom-right-radius: 36px;
          box-shadow: 15px 20px 40px rgba(0, 0, 0, 0.12);
          position: relative;
          z-index: 12;
        }

        .editorial-heading {
          font-family: var(--font-serif);
          font-size: clamp(1.7rem, 2.4vw, 2.2rem);
          font-weight: 800;
          color: #0F172A;
          line-height: 1.18;
          letter-spacing: -0.02em;
        }

        .editorial-desc {
          font-family: var(--font-body);
          font-size: 0.92rem;
          color: #64748B;
          line-height: 1.6;
          margin-top: 0.75rem;
        }

        /* Right Open Window: Exposes Mountain Peak and Sky */
        .stepped-open-window {
          width: 50%;
          padding: 2.25rem 3rem;
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          position: relative;
          z-index: 11;
        }

        .floating-socials-group {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .socials-label {
          font-family: var(--font-ui);
          font-size: 1.05rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 0.85rem;
          letter-spacing: -0.01em;
          text-shadow: 0 1px 10px rgba(255, 255, 255, 0.8);
        }

        .socials-icon-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .social-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid rgba(226, 232, 240, 0.8);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #0F172A;
          text-decoration: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .social-btn:hover {
          background: #0F172A;
          color: #FFFFFF;
          border-color: #0F172A;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.25);
        }

        .social-btn.ai-btn:hover {
          background: #FF6B00;
          border-color: #FF6B00;
        }

        /* ----------------------------------------------------
           UNOBSTRUCTED SCENIC VIEWPORT
           (NO boxes, NO buttons, NO overlays over the mountains)
           ---------------------------------------------------- */
        .card-scenic-viewport {
          position: relative;
          z-index: 2;
          width: 100%;
          height: clamp(260px, 32vw, 380px);
          pointer-events: none;
        }

        /* Clean Minimal Baseline Bar */
        .card-baseline-bar {
          position: relative;
          z-index: 10;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(12px);
          color: #94A3B8;
          padding: 1rem 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-ui);
          font-size: 0.82rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .copyright-text {
          color: #CBD5E1;
        }

        .craft-text {
          color: #94A3B8;
        }

        /* ----------------------------------------------------
           RESPONSIVE BREAKPOINTS
           ---------------------------------------------------- */
        @media (max-width: 1024px) {
          .card-top-header {
            flex-direction: column;
            gap: 2rem;
            padding: 2.25rem 2rem 1.5rem 2rem;
          }

          .card-nav-columns {
            width: 100%;
            max-width: none;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }

          .card-stepped-row {
            flex-direction: column;
          }

          .stepped-white-panel {
            width: 100%;
            border-bottom-right-radius: 0;
            padding: 2rem;
          }

          .stepped-open-window {
            width: 100%;
            justify-content: flex-start;
            padding: 1.5rem 2rem;
            background: rgba(255, 255, 255, 0.45);
            backdrop-filter: blur(8px);
          }

          .floating-socials-group {
            align-items: flex-start;
          }

          .card-baseline-bar {
            padding: 1rem 2rem;
          }
        }

        @media (max-width: 768px) {
          .footer-nietzsche-root {
            padding: 2rem 0 7rem 0; /* Space for Apple floating dock */
          }

          .nietzsche-card {
            border-radius: 20px;
          }

          .card-top-header {
            padding: 1.75rem 1.25rem 1.25rem 1.25rem;
          }

          .card-nav-columns {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }

          .stepped-white-panel {
            padding: 1.5rem 1.25rem;
          }

          .stepped-open-window {
            padding: 1.25rem;
          }

          .column-list a, .nav-action-btn, .column-list .location-text {
            min-height: 40px;
            display: inline-flex;
            align-items: center;
          }

          .card-scenic-viewport {
            height: 220px;
          }

          .card-baseline-bar {
            padding: 1rem 1.25rem;
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
