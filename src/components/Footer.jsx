import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Heart } from 'lucide-react';

export default function Footer() {
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
              Comfort Journey is a trusted travel agency with 30+ years of expertise. We offer customized tour packages for 2,000+ destinations worldwide.
            </p>
            <div className="f-badges">
              <span className="badge badge-accent">Est. 1992</span>
              <span className="badge badge-primary">Bhopal, MP</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="col-title">Popular Destinations</h4>
            <ul className="col-links">
              <li><a href="#tours">Kashmir Paradise Packages</a></li>
              <li><a href="#tours">Himachal Shimla & Manali</a></li>
              <li><a href="#tours">Kerala Backwaters & Houseboat</a></li>
              <li><a href="#tours">Exotic Bali Honeymoon</a></li>
              <li><a href="#tours">Dubai Extravaganza</a></li>
              <li><a href="#tours">Divine Char Dham Yatra</a></li>
            </ul>
          </div>

          {/* Contact Details (Preserved Exact Info) */}
          <div className="footer-col">
            <h4 className="col-title">Contact Information</h4>
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
                <a href="https://wa.me/918770403315" target="_blank" rel="noopener noreferrer">WhatsApp Us Directly</a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Comfort Journey. All rights reserved.</p>
          <p className="credit">Crafted for Maximum Speed & Elegance</p>
        </div>
      </div>

      <style>{`
        .footer-root {
          background: #090D16;
          color: #94A3B8;
          padding: 5rem 0 2rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1.25fr 1.5fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .f-logo-img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid var(--color-primary);
        }

        .f-title {
          font-size: 1.25rem;
          color: #FFFFFF;
          font-weight: 800;
          line-height: 1.2;
        }

        .f-sub {
          font-size: 0.8rem;
          color: var(--color-primary);
          font-style: italic;
        }

        .f-desc {
          font-size: 0.92rem;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .f-badges {
          display: flex;
          gap: 0.5rem;
        }

        .col-title {
          font-size: 1.1rem;
          color: #FFFFFF;
          margin-bottom: 1.25rem;
        }

        .col-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .col-links a {
          color: #94A3B8;
          font-size: 0.92rem;
          transition: color 0.2s ease;
        }

        .col-links a:hover {
          color: var(--color-primary);
        }

        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .c-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.92rem;
        }

        .c-icon {
          color: var(--color-primary);
          flex-shrink: 0;
          margin-top: 0.25rem;
        }

        .c-item a {
          color: #FFFFFF;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .c-item a:hover {
          color: var(--color-primary);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.85rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .credit {
          color: var(--color-primary);
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 640px) {
          .footer-root {
            padding: 3.5rem 0 1.5rem 0;
          }
          .footer-grid {
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
