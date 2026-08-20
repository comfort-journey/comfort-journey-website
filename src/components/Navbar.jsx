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
    { label: 'Stories & Reels', href: '#stories' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`navbar-root ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo & Tagline */}
        <a href="#hero" className="brand-logo">
          <div className="logo-glow-wrapper">
            <img 
              src="https://static.wixstatic.com/media/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg/v1/fill/w_192,h_192,lg_1,usm_0.66_1.00_0.01/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg" 
              alt="Comfort Journey Luxury Travel" 
              className="logo-img"
              width="44"
              height="44"
            />
          </div>
          <div className="logo-text">
            <span className="title">COMFORT JOURNEY</span>
            <span className="sub">Since 1992 • Luxury & Comfort</span>
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
            title="Saved Wishlist"
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
            <span className="ai-btn-text">AI Trip Planner</span>
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
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
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
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #FFFFFF;
        }

        .logo-glow-wrapper {
          position: relative;
          border-radius: 50%;
        }

        .logo-img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid var(--cj-amber-500);
          object-fit: cover;
          box-shadow: 0 0 15px rgba(255, 107, 0, 0.4);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-text .title {
          font-family: var(--font-ui);
          font-weight: 800;
          font-size: 1.15rem;
          letter-spacing: 0.04em;
          color: #FFFFFF;
          line-height: 1.2;
        }

        .logo-text .sub {
          font-size: 0.7rem;
          color: var(--cj-amber-500);
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.75rem;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.82);
          font-family: var(--font-ui);
          font-weight: 600;
          font-size: 0.92rem;
          transition: all 0.2s ease;
          position: relative;
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
          gap: 0.75rem;
        }

        .nav-icon-btn {
          position: relative;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid var(--cj-glass-border);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
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
        }

        .currency-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--cj-glass-border);
          color: #FFFFFF;
          padding: 0.45rem 0.8rem;
          border-radius: var(--radius-full);
          font-family: var(--font-ui);
          font-size: 0.82rem;
          font-weight: 700;
          transition: all 0.2s ease;
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
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-xs);
          color: #E2E8F0;
          font-family: var(--font-ui);
          font-size: 0.82rem;
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
          padding: 0.45rem 1rem;
          font-size: 0.85rem;
        }

        .phone-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #FFFFFF;
          font-family: var(--font-ui);
          font-weight: 700;
          font-size: 0.85rem;
          background: rgba(255, 255, 255, 0.08);
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--cj-glass-border);
          transition: all 0.2s ease;
        }

        .phone-btn:hover {
          background: rgba(255, 107, 0, 0.2);
          border-color: var(--cj-amber-500);
          color: var(--cj-amber-500);
        }

        .admin-trigger-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--cj-glass-border);
          color: #94A3B8;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .admin-trigger-btn:hover {
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .mobile-toggle {
          display: none;
          background: none;
          color: #FFFFFF;
        }

        .mobile-drawer {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--cj-bg-obsidian);
          border-bottom: 1px solid var(--cj-glass-border);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
        }

        .drawer-link {
          color: #FFFFFF;
          font-family: var(--font-ui);
          font-size: 1.1rem;
          font-weight: 700;
          padding: 0.6rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .drawer-actions {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-top: 0.75rem;
        }

        .w-full {
          width: 100%;
          justify-content: center;
        }

        @media (max-width: 1080px) {
          .desktop-nav, .phone-text {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
        }

        @media (max-width: 600px) {
          .ai-btn-text {
            display: none;
          }
          .nav-ai-btn {
            padding: 0.45rem 0.65rem;
          }
        }
      `}</style>
    </header>
  );
}
