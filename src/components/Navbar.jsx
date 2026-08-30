import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, Sparkles, ChevronDown, Globe, Heart, Scale, Shield, Lock } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlistCompare } from '../context/WishlistCompareContext';

export default function Navbar({ onOpenQuote, onOpenAIPlanner, onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const { currency, setCurrency, currencies } = useCurrency();
  const { wishlist, setIsWishlistOpen, compareList, setIsCompareOpen } = useWishlistCompare();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Destinations', href: '#tours' },
    { label: 'Trip Studio', href: '#custom-builder' },
    { label: 'Reviews', href: '#google-reviews' },
    { label: 'Reels', href: '#stories' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Services', href: '#services' },
    { label: 'Who We Are', href: '#/about' },
  ];

  return (
    <header className={`navbar-root ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Modern Luxury Brand Logo & Tagline */}
        <a href="#hero" className="brand-logo" aria-label="Comfort Journey Luxury Travel">
          <div className="logo-glow-wrapper">
            <div className="brand-emblem-badge">
              <img 
                src="https://static.wixstatic.com/media/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg/v1/fill/w_192,h_192,lg_1,usm_0.66_1.00_0.01/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg" 
                alt="Comfort Journey Logo" 
                className="navbar-brand-img"
              />
              <div className="emblem-pulse-ring"></div>
            </div>
          </div>
          <div className="logo-text">
            <div className="title-row">
              <span className="title-comfort">Comfort</span>
              <span className="title-journey">Journey</span>
            </div>
            <div className="sub-row">
              <span className="sub-tag">LUXURY TRAVEL</span>
              <span className="sub-dot">★</span>
              <span className="sub-est">EST. 1992</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          {navLinks.map((link, idx) => (
            <a key={idx} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Utility & Actions */}
        <div className="nav-actions">
          {/* Wishlist Button with Badge */}
          <button 
            type="button" 
            className="nav-icon-btn"
            onClick={() => setIsWishlistOpen(true)}
            title="Saved Dreamboard Wishlist"
            aria-label="Wishlist"
          >
            <Heart size={17} className={wishlist.length > 0 ? 'text-amber fill-amber' : ''} />
            {wishlist.length > 0 && <span className="nav-badge-count">{wishlist.length}</span>}
          </button>

          {/* Compare Button with Badge */}
          {compareList.length > 0 && (
            <button 
              type="button" 
              className="nav-icon-btn compare-btn-active"
              onClick={() => setIsCompareOpen(true)}
              title="Compare Selected Packages"
            >
              <Scale size={17} />
              <span className="nav-badge-count">{compareList.length}</span>
            </button>
          )}

          {/* Multi-Currency Dropdown */}
          <div className="currency-selector-rel">
            <button 
              type="button"
              className="currency-btn"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              title="Select Global Currency"
            >
              <Globe size={14} />
              <span>{currency}</span>
              <ChevronDown size={12} />
            </button>

            {currencyDropdownOpen && (
              <div className="currency-menu">
                {Object.keys(currencies).map((currKey) => (
                  <button
                    key={currKey}
                    type="button"
                    className={`curr-option ${currency === currKey ? 'active' : ''}`}
                    onClick={() => {
                      setCurrency(currKey);
                      setCurrencyDropdownOpen(false);
                    }}
                  >
                    <span className="c-symbol">{currencies[currKey].symbol}</span>
                    <span className="c-name">{currencies[currKey].name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI Trip Planner CTA */}
          <button 
            type="button" 
            className="btn-ai-glow nav-ai-btn"
            onClick={onOpenAIPlanner}
            title="Design Custom Trip with AI"
          >
            <Sparkles size={15} />
            <span className="ai-btn-text">AI Planner</span>
          </button>

          {/* Phone VIP Link */}
          <a href="tel:+918770403315" className="phone-btn" title="Call 24/7 VIP Concierge">
            <Phone size={15} />
            <span className="phone-text">+91 8770403315</span>
          </a>

          {/* Admin CMS Trigger (Discreet Lock) */}
          <button
            type="button"
            className="admin-trigger-btn"
            onClick={onOpenAdmin}
            title="Admin CMS & SEO Portal"
            aria-label="Admin Portal"
          >
            <Lock size={14} />
          </button>

          {/* Mobile Menu Hamburger */}
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          {navLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href} 
              className="drawer-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <div className="drawer-currency-row">
            <span className="drawer-curr-label">Currency:</span>
            <div className="drawer-curr-pills">
              {Object.keys(currencies).map((currKey) => (
                <button
                  key={currKey}
                  type="button"
                  className={`drawer-curr-pill ${currency === currKey ? 'active' : ''}`}
                  onClick={() => setCurrency(currKey)}
                >
                  {currencies[currKey].symbol} {currKey}
                </button>
              ))}
            </div>
          </div>

          <div className="drawer-actions">
            <button 
              className="btn-ai-glow w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAIPlanner();
              }}
            >
              <Sparkles size={18} />
              ✨ Plan Trip with AI
            </button>
            <button
              className="btn-secondary w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsWishlistOpen(true);
              }}
            >
              <Heart size={17} />
              My Saved Wishlist ({wishlist.length})
            </button>
            <a href="tel:+918770403315" className="btn-secondary w-full">
              <Phone size={18} />
              Call +91 8770403315
            </a>
            <button 
              className="btn-whatsapp w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                window.open('https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I%20want%20to%20plan%20a%20luxury%20custom%20trip.', '_blank');
              }}
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </button>
            <button
              type="button"
              className="drawer-admin-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
            >
              <Lock size={14} />
              <span>Admin & SEO Portal</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .navbar-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 1.15rem 0;
          background: rgba(7, 11, 20, 0.6);
          backdrop-filter: blur(var(--cj-blur-desktop));
          -webkit-backdrop-filter: blur(var(--cj-blur-desktop));
          border-bottom: 1px solid var(--cj-glass-border);
        }

        .navbar-root.scrolled {
          padding: 0.75rem 0;
          background: rgba(7, 11, 20, 0.94);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5);
          border-bottom: 1px solid rgba(255, 107, 0, 0.25);
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #FFFFFF;
          flex-shrink: 0;
          white-space: nowrap;
          text-decoration: none;
          transition: transform 0.25s ease;
        }

        .brand-logo:hover {
          transform: translateY(-1px);
        }

        .logo-glow-wrapper {
          position: relative;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-emblem-badge {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .brand-logo:hover .brand-emblem-badge {
          transform: scale(1.06);
        }

        .navbar-brand-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #FF892F;
          box-shadow: 0 0 12px rgba(255, 137, 47, 0.45);
          display: block;
        }

        .emblem-pulse-ring {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 137, 47, 0.5);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .brand-logo:hover .emblem-pulse-ring {
          opacity: 1;
          animation: emblemPulse 2s infinite ease-out;
        }

        @keyframes emblemPulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.35); opacity: 0; }
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          gap: 0.05rem;
        }

        .title-row {
          display: flex;
          align-items: baseline;
          gap: 0.28rem;
          line-height: 1.1;
        }

        .title-comfort {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 800;
          font-size: 1.32rem;
          letter-spacing: -0.01em;
          color: #FFFFFF;
          text-shadow: 0 1px 8px rgba(255, 255, 255, 0.15);
        }

        .title-journey {
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 1.32rem;
          letter-spacing: -0.02em;
          color: #FFB070;
          text-shadow: 0 1px 8px rgba(255, 137, 47, 0.3);
        }

        .sub-row {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.55);
          text-transform: uppercase;
        }

        .sub-tag {
          color: rgba(255, 255, 255, 0.55);
        }

        .sub-dot {
          color: #FF892F;
          font-size: 0.55rem;
        }

        .sub-est {
          color: rgba(255, 176, 112, 0.8);
          font-weight: 800;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.15rem;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.85);
          font-family: var(--font-ui);
          font-weight: 700;
          font-size: 0.88rem;
          transition: all 0.2s ease;
          position: relative;
          white-space: nowrap;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0%;
          height: 2px;
          background: var(--cj-amber-500);
          transition: width 0.25s ease;
        }

        .nav-link:hover {
          color: #FFFFFF;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .nav-dna-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(255, 137, 47, 0.15);
          border: 1px solid rgba(255, 137, 47, 0.4);
          color: #FF892F;
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .nav-dna-btn:hover {
          background: #FF892F;
          color: #FFFFFF;
          border-color: #FF892F;
          box-shadow: 0 0 15px rgba(255, 137, 47, 0.4);
          transform: translateY(-1px);
        }

        .dna-icon-spark {
          font-size: 0.9rem;
        }

        .nav-icon-btn {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid var(--cj-glass-border);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .nav-icon-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: var(--cj-amber-500);
        }

        .compare-btn-active {
          background: rgba(16, 185, 129, 0.2);
          border-color: var(--cj-emerald-500);
          color: var(--cj-emerald-500);
        }

        .nav-badge-count {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--cj-amber-500);
          color: #FFFFFF;
          font-family: var(--font-ui);
          font-size: 0.68rem;
          font-weight: 900;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 8px var(--cj-amber-500);
        }

        .text-amber {
          color: var(--cj-amber-500);
        }

        .fill-amber {
          fill: var(--cj-amber-500);
        }

        .currency-selector-rel {
          position: relative;
          flex-shrink: 0;
        }

        .currency-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--cj-glass-border);
          color: #FFFFFF;
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-full);
          font-family: var(--font-ui);
          font-size: 0.82rem;
          font-weight: 700;
          transition: all 0.2s ease;
          white-space: nowrap;
          min-height: 38px;
        }

        .currency-btn:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: var(--cj-amber-500);
        }

        .currency-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: var(--cj-bg-card);
          border: 1px solid var(--cj-glass-border);
          border-radius: var(--radius-sm);
          padding: 0.4rem;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          min-width: 160px;
          z-index: 100;
        }

        .curr-option {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 0.85rem;
          border-radius: var(--radius-xs);
          color: #E2E8F0;
          font-family: var(--font-ui);
          font-size: 0.85rem;
          font-weight: 600;
          width: 100%;
          text-align: left;
          transition: all 0.15s ease;
        }

        .curr-option:hover {
          background: rgba(255, 107, 0, 0.15);
          color: var(--cj-amber-500);
        }

        .curr-option.active {
          background: var(--cj-amber-500);
          color: #FFFFFF;
        }

        .c-symbol {
          font-weight: 900;
          width: 28px;
        }

        .nav-ai-btn {
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          white-space: nowrap;
          flex-shrink: 0;
          min-height: 38px;
        }

        .phone-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #FFFFFF;
          font-family: var(--font-ui);
          font-weight: 700;
          font-size: 0.82rem;
          background: rgba(255, 255, 255, 0.08);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--cj-glass-border);
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
          min-height: 38px;
        }

        .phone-btn:hover {
          background: rgba(255, 107, 0, 0.2);
          border-color: var(--cj-amber-500);
          color: var(--cj-amber-500);
        }

        .phone-text {
          white-space: nowrap;
        }

        .admin-trigger-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--cj-glass-border);
          color: #94A3B8;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .admin-trigger-btn:hover {
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .mobile-toggle {
          display: none;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--cj-glass-border);
          color: #FFFFFF;
          cursor: pointer;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          align-items: center;
          justify-content: center;
        }

        .mobile-drawer {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(0, 18, 51, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 137, 47, 0.3);
          padding: 1.5rem 1.25rem 2rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
          max-height: calc(100vh - 70px);
          overflow-y: auto;
        }

        .drawer-link {
          color: #F9FBE7;
          font-family: var(--font-ui);
          font-size: 1.15rem;
          font-weight: 700;
          padding: 0.75rem 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: block;
        }

        .drawer-link:active {
          color: var(--cj-amber-500);
        }

        .drawer-currency-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          gap: 0.5rem;
        }

        .drawer-curr-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: #94A3B8;
        }

        .drawer-curr-pills {
          display: flex;
          gap: 0.4rem;
        }

        .drawer-curr-pill {
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--cj-glass-border);
          color: #E2E8F0;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .drawer-curr-pill.active {
          background: var(--cj-amber-500);
          color: #001233;
          border-color: var(--cj-amber-500);
        }

        .drawer-admin-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.6rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px dashed rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-sm);
          color: #94A3B8;
          font-size: 0.85rem;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .drawer-admin-btn:hover {
          color: #FFFFFF;
        }

        .drawer-actions {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-top: 1rem;
        }

        .w-full {
          width: 100%;
          justify-content: center;
          min-height: 48px;
        }

        @media (max-width: 1140px) {
          .desktop-nav, .phone-btn {
            display: none;
          }
          .mobile-toggle {
            display: flex;
          }
        }

        @media (max-width: 768px) {
          .navbar-root {
            padding: 0.65rem 0;
          }
          .nav-ai-btn, .currency-dropdown-wrap, .admin-trigger-btn {
            display: none;
          }
          .mobile-toggle {
            display: flex;
            background: rgba(255, 137, 47, 0.15);
            border: 1px solid rgba(255, 137, 47, 0.4);
            color: #FF892F;
          }
          .brand-logo .sub-row {
            display: none;
          }
          .title-comfort, .title-journey {
            font-size: 1.15rem;
          }
          .brand-emblem-badge {
            width: 34px;
            height: 34px;
          }
          .brand-emblem-badge svg {
            width: 34px;
            height: 34px;
          }
        }
      `}</style>
    </header>
  );
}
