import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Heart, ShieldCheck, FileText, Lock } from 'lucide-react';

export default function Footer({ onOpenPolicy, onOpenAdmin, onOpenLandingHub, onSelectLandingPage }) {
  return (
    <footer id="contact" className="footer-root">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img 
                src="https://static.wixstatic.com/media/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg/v1/fill/w_192,h_192,lg_1,usm_0.66_1.00_0.01/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg" 
                alt="Comfort Journey Logo" 
                className="f-logo-img"
              />
              <div>
                <h3 className="f-title">COMFORT JOURNEY</h3>
                <span className="f-sub">We Cover Distance with Comfort</span>
              </div>
            </div>
            <p className="f-desc">
              Comfort Journey is a premier luxury travel agency with 30+ years of royal expertise (Est. 1992). Handcrafting custom VIP tour packages across 2,000+ destinations worldwide.
            </p>
            <div className="f-badges">
              <span className="badge badge-amber">Est. 1992</span>
              <span className="badge badge-emerald">Govt. Verified</span>
              <span className="badge badge-purple">Bhopal, MP</span>
            </div>
          </div>

          {/* Specialty Landing Pages & Ads Hub */}
          <div className="footer-col">
            <h4 className="col-title">Campaign Pages (SEO & Ads)</h4>
            <ul className="col-links">
              <li><a href="#/solo-travel">Solo Traveler Escapes</a></li>
              <li><a href="#/family-travel">Family Holiday Packages</a></li>
              <li><a href="#/couple-honeymoon">Honeymoon & Couples</a></li>
              <li><a href="#/group-travel">Friends & Squad Trips</a></li>
              <li><a href="#/corporate-travel">Corporate Offsites & Retreats</a></li>
              <li><a href="#/school-college-trips">Educational Study Tours</a></li>
              <li><a href="#/weekend-getaways">48-Hour Weekend Escapes</a></li>
              <li><a href="#/fixed-departures">Fixed Departures Tribe</a></li>
              <li>
                <button 
                  type="button" 
                  className="footer-link-btn" 
                  style={{ color: '#FF892F', fontWeight: 800, marginTop: '0.35rem' }}
                  onClick={onOpenLandingHub}
                >
                  <span>View All 15 Landing Pages ➔</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="footer-col">
            <h4 className="col-title">Signature Circuits</h4>
            <ul className="col-links">
              <li><a href="#/india-packages">Incredible India Signature</a></li>
              <li><a href="#/international-packages">World Passport Holidays</a></li>
              <li><a href="#/adventure-tours">Adventure & Treks</a></li>
              <li><a href="#/beach-vacations">Tropical Beach & Islands</a></li>
              <li><a href="#/mountain-escapes">Mountain & Snow Escapes</a></li>
              <li><a href="#/summer-packages">Summer Vacation Specials</a></li>
              <li><a href="#/winter-packages">Winter Snow Wonderland</a></li>
            </ul>
          </div>

          {/* Trust & Transparency */}
          <div className="footer-col">
            <h4 className="col-title">Trust & Policies</h4>
            <ul className="col-links policy-links">
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onOpenPolicy && onOpenPolicy('cancellation')}>
                  <ShieldCheck size={14} className="text-amber" />
                  <span>100% Refund & Cancellation</span>
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onOpenPolicy && onOpenPolicy('privacy')}>
                  <FileText size={14} className="text-emerald" />
                  <span>Privacy & Traveler Safety</span>
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onOpenPolicy && onOpenPolicy('terms')}>
                  <FileText size={14} className="text-purple" />
                  <span>Terms of VIP Booking</span>
                </button>
              </li>
              <li>
                <a href="#/blog" className="footer-link-btn" style={{ color: '#6FE6FC', fontWeight: 700 }}>
                  <FileText size={14} className="text-cyan" />
                  <span>Editorial Journal & Guides</span>
                </a>
              </li>
              <li>
                <button type="button" className="footer-link-btn admin-link-subtle" onClick={onOpenAdmin}>
                  <Lock size={13} />
                  <span>Team CMS & SEO Studio</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Google Profile */}
          <div className="footer-col">
            <h4 className="col-title">24/7 VIP Concierge</h4>
            <div className="contact-list">
              <div className="c-item">
                <MapPin size={18} className="c-icon" />
                <span>Shop no 2, Phase 5, Ankur Complex, 6 Number Bus Stop, Shivaji Nagar, Bhopal, MP 462016</span>
              </div>
              <div className="c-item">
                <Phone size={18} className="c-icon" />
                <a href="tel:+918770403315">+91 87704 03315</a>
              </div>
              <div className="c-item">
                <MessageCircle size={18} className="c-icon" />
                <a href="https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I%20want%20to%20plan%20a%20luxury%20vacation." target="_blank" rel="noopener noreferrer">
                  Instant WhatsApp VIP Desk
                </a>
              </div>
              <div className="c-item google-link-item">
                <a 
                  href="https://share.google/EUhDlYWM7iZDuJVs0" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-google-btn"
                >
                  <span className="google-star-gold">★ 4.8</span>
                  <span>Google Business Profile (85+ Reviews)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Comfort Journey (Est. 1992). All rights reserved.</p>
          <p className="credit">Handcrafted with Royal Luxury & High Performance</p>
        </div>
      </div>

      <style>{`
        .footer-root {
          background: #001233;
          color: #94A3B8;
          padding: 3.5rem 0 2rem 0;
          border-top: 1px solid rgba(111, 230, 252, 0.15);
          position: relative;
          z-index: 10;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr 1.3fr;
          gap: 1.75rem;
          margin-bottom: 2.5rem;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          margin-bottom: 1.15rem;
        }

        .f-logo-img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid var(--cj-amber-500);
          box-shadow: 0 0 12px rgba(255, 107, 0, 0.35);
        }

        .f-title {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: #FFFFFF;
          font-weight: 800;
          line-height: 1.2;
        }

        .f-sub {
          font-family: var(--font-ui);
          font-size: 0.78rem;
          color: var(--cj-amber-500);
          font-style: italic;
          font-weight: 600;
        }

        .f-desc {
          font-family: var(--font-body);
          font-size: 0.88rem;
          line-height: 1.6;
          margin-bottom: 1.15rem;
          color: #CBD5E1;
        }

        .f-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .col-title {
          font-family: var(--font-ui);
          font-size: 1.05rem;
          color: #FFFFFF;
          margin-bottom: 1.15rem;
          font-weight: 800;
        }

        .col-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .col-links a {
          color: #94A3B8;
          font-size: 0.88rem;
          transition: color 0.2s ease;
          display: inline-block;
          padding: 0.2rem 0;
        }

        .col-links a:hover {
          color: var(--cj-amber-500);
        }

        .footer-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: none;
          border: none;
          color: #94A3B8;
          font-family: var(--font-ui);
          font-size: 0.88rem;
          text-align: left;
          padding: 0.25rem 0;
          cursor: pointer;
          transition: all 0.2s ease;
          min-height: 38px;
        }

        .footer-link-btn:hover {
          color: #FFFFFF;
          transform: translateX(3px);
        }

        .admin-link-subtle {
          color: #64748B;
          margin-top: 0.4rem;
        }

        .admin-link-subtle:hover {
          color: var(--cj-amber-500);
        }

        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        .c-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.88rem;
        }

        .c-icon {
          color: var(--cj-amber-500);
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .c-item a {
          color: #FFFFFF;
          font-weight: 600;
          transition: color 0.2s ease;
          display: inline-block;
          padding: 0.2rem 0;
        }

        .c-item a:hover {
          color: var(--cj-amber-500);
        }

        .footer-google-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(251, 188, 5, 0.4);
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-full);
          color: #FFFFFF !important;
          font-size: 0.82rem !important;
          font-weight: 700 !important;
          margin-top: 0.35rem;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .footer-google-btn:hover {
          background: rgba(251, 188, 5, 0.15);
          border-color: #FBBC05;
          transform: translateY(-2px);
        }

        .google-star-gold {
          color: #FBBC05;
          font-weight: 900;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.82rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .credit {
          color: var(--cj-gold-500);
          font-weight: 700;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .footer-root {
            padding: 3rem 0 5.5rem 0; /* Extra bottom padding for floating dock */
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 0.65rem;
          }
          .col-links a, .footer-link-btn, .c-item a {
            min-height: 44px;
            display: flex;
            align-items: center;
          }
        }
      `}</style>
    </footer>
  );
}
