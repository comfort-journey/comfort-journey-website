import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Heart, ShieldCheck, FileText, Lock } from 'lucide-react';

export default function Footer({ onOpenPolicy, onOpenAdmin }) {
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
                <span className="f-sub">"We cover Distance with Comfort"</span>
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

          {/* Popular Destinations */}
          <div className="footer-col">
            <h4 className="col-title">Popular Packages</h4>
            <ul className="col-links">
              <li><a href="#tours">Kashmir Paradise & Houseboats</a></li>
              <li><a href="#tours">Himachal Shimla & Manali</a></li>
              <li><a href="#tours">Kerala Backwaters & Ayurveda</a></li>
              <li><a href="#tours">Exotic Bali Honeymoon</a></li>
              <li><a href="#tours">Dubai Luxury Extravaganza</a></li>
              <li><a href="#tours">Divine Char Dham Helicopter Yatra</a></li>
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
                <button type="button" className="footer-link-btn admin-link-subtle" onClick={onOpenAdmin}>
                  <Lock size={13} />
                  <span>Team CMS & SEO Studio</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4 className="col-title">24/7 VIP Concierge</h4>
            <div className="contact-list">
              <div className="c-item">
                <MapPin size={18} className="c-icon" />
                <span>Main Road 1, Bhopal, Madhya Pradesh 462016</span>
              </div>
              <div className="c-item">
                <Phone size={18} className="c-icon" />
                <a href="tel:+918770403315">+91 8770403315</a>
              </div>
              <div className="c-item">
                <MessageCircle size={18} className="c-icon" />
                <a href="https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I%20want%20to%20plan%20a%20luxury%20vacation." target="_blank" rel="noopener noreferrer">
                  Instant WhatsApp VIP Desk
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
          background: #060911;
          color: #94A3B8;
          padding: 5rem 0 2rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.8fr 1.2fr 1.3fr 1.4fr;
          gap: 2.5rem;
          margin-bottom: 4rem;
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
          font-family: var(--font-ui);
          font-size: 1.2rem;
          color: #FFFFFF;
          font-weight: 800;
          line-height: 1.2;
        }

        .f-sub {
          font-size: 0.78rem;
          color: var(--cj-amber-500);
          font-style: italic;
          font-weight: 600;
        }

        .f-desc {
          font-size: 0.88rem;
          line-height: 1.6;
          margin-bottom: 1.15rem;
          color: #94A3B8;
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
          padding: 0;
          cursor: pointer;
          transition: all 0.2s ease;
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
        }

        .c-item a:hover {
          color: var(--cj-amber-500);
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

        @media (max-width: 640px) {
          .footer-root {
            padding: 3.5rem 0 1.5rem 0;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            margin-bottom: 2.5rem;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }
        }
      `}</style>
    </footer>
  );
}
