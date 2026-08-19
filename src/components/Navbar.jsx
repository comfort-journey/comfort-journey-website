import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, Compass, Sparkles, ChevronDown, Globe } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function Navbar({ onOpenQuote, onOpenAIPlanner }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const { currency, setCurrency, currencies } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Destinations', href: '#tours' },
    { label: 'Custom Planner', href: '#custom-builder' },
    { label: 'Traveler Stories', href: '#stories' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`navbar-root ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <a href="#hero" className="brand-logo">
          <div className="logo-glow-wrapper">
            <img 
              src="https://static.wixstatic.com/media/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg/v1/fill/w_192,h_192,lg_1,usm_0.66_1.00_0.01/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg" 
              alt="Comfort Journey Luxury Travel" 
              className="logo-img"
              width="46"
              height="46"
            />
          </div>
          <div className="logo-text">
            <span className="title">COMFORT JOURNEY</span>
            <span className="sub">Since 1992 • Luxury & Comfort</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          {navLinks.map((link, idx) => (
            <a key={idx} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Elements */}
        <div className="nav-actions">
          {/* Currency Switcher */}
          <div className="currency-selector-rel">
            <button 
              type="button"
              className="currency-btn"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              title="Change Currency"
            >
              <Globe size={15} />
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

          {/* AI Trip Planner Button */}
          <button 
            type="button" 
            className="ai-nav-btn"
            onClick={onOpenAIPlanner}
            title="Plan Trip with AI"
          >
            <Sparkles size={16} className="sparkle-anim" />
            <span className="ai-btn-text">AI Trip Planner</span>
          </button>

          {/* Phone Quick Call */}
          <a href="tel:+918770403315" className="phone-btn" title="Call Us 24/7">
            <Phone size={16} />
            <span className="phone-text">+91 8770403315</span>
          </a>

          {/* Mobile Menu Toggle */}
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
            <a href="tel:+918770403315" className="btn-secondary w-full">
              <Phone size={18} />
              Call +91 8770403315
            </a>
            <button 
              className="btn-whatsapp w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                window.open('https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I%20want%20to%20plan%20a%20luxury%20vacation.', '_blank');
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
          background: rgba(7, 11, 20, 0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .navbar-root.scrolled {
          padding: 0.75rem 0;
          background: rgba(7, 11, 20, 0.94);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
          border-bottom: 1px solid rgba(255, 107, 0, 0.2);
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
          border: 2px solid var(--color-primary);
          object-fit: cover;
          box-shadow: 0 0 15px rgba(255, 107, 0, 0.4);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-text .title {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.15rem;
          letter-spacing: 0.04em;
          color: #FFFFFF;
          line-height: 1.2;
        }

        .logo-text .sub {
          font-size: 0.7rem;
          color: var(--color-primary);
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.85rem;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.82);
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
          background: var(--color-primary);
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
          gap: 0.85rem;
        }

        .currency-selector-rel {
          position: relative;
        }

        .currency-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          padding: 0.45rem 0.8rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .currency-btn:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: var(--color-primary);
        }

        .currency-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: #0F172A;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-sm);
          padding: 0.4rem;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          min-width: 150px;
          z-index: 100;
        }

        .curr-option {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-xs);
          color: #E2E8F0;
          font-size: 0.82rem;
          font-weight: 600;
          width: 100%;
          text-align: left;
          transition: all 0.15s ease;
        }

        .curr-option:hover {
          background: rgba(255, 107, 0, 0.15);
          color: var(--color-primary);
        }

        .curr-option.active {
          background: var(--color-primary);
          color: #FFFFFF;
        }

        .c-symbol {
          font-weight: 800;
          width: 24px;
        }

        .ai-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(236, 72, 153, 0.25));
          border: 1px solid rgba(192, 132, 252, 0.5);
          color: #F3E8FF;
          padding: 0.45rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.25);
          transition: all 0.25s ease;
        }

        .ai-nav-btn:hover {
          background: linear-gradient(135deg, #8B5CF6, #EC4899);
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
        }

        .phone-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.85rem;
          background: rgba(255, 255, 255, 0.08);
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: all 0.2s ease;
        }

        .phone-btn:hover {
          background: rgba(255, 107, 0, 0.2);
          border-color: var(--color-primary);
          color: var(--color-primary);
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
          background: #070B14;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
        }

        .drawer-link {
          color: #FFFFFF;
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

        @media (max-width: 960px) {
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
          .ai-nav-btn {
            padding: 0.45rem 0.65rem;
          }
        }
      `}</style>
    </header>
  );
}
