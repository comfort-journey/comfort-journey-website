import React, { useState, useEffect } from 'react';
import { 
  Phone, MessageCircle, Menu, X, Bot, ChevronDown, ChevronRight, 
  Globe, Heart, Scale, Shield, Lock, Sun, Snowflake, Mountain, Palmtree, 
  Users, Briefcase, GraduationCap, Clock, Compass, MapPin, CloudSun, Sparkles 
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlistCompare } from '../context/WishlistCompareContext';
import { siteSettingsService, EVENT_SETTINGS_UPDATED } from '../services/siteSettingsService';

export default function Navbar({ onOpenQuote, onOpenAIPlanner, onOpenAdmin, onOpenLandingHub }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  
  // Accordion state for categories inside the hamburger menu
  const [openCategories, setOpenCategories] = useState({
    weather: true,
    personas: false,
    group: false,
    circuits: false
  });

  const toggleCategory = (key) => {
    setOpenCategories(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const { currency, setCurrency, currencies } = useCurrency();
  const { wishlist, setIsWishlistOpen, compareList, setIsCompareOpen } = useWishlistCompare();

  // Dynamic Site Settings for Announcement Bar and Contacts
  const [siteSettings, setSiteSettings] = useState(() => ({ ...siteSettingsService.getSettings() }));

  useEffect(() => {
    const handleUpdate = (e) => {
      setSiteSettings({ ...(e.detail || siteSettingsService.getSettings()) });
    };
    window.addEventListener(EVENT_SETTINGS_UPDATED, handleUpdate);
    return () => window.removeEventListener(EVENT_SETTINGS_UPDATED, handleUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Clean Desktop Navigation Links (Specialty Trips removed to save space)
  const navLinks = [
    { label: 'Destinations', href: '#tours' },
    { label: 'Trip Studio', href: '#custom-builder' },
    { label: 'Journal', href: '#/blog' },
    { label: 'Reviews', href: '#google-reviews' },
    { label: 'Reels', href: '#stories' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Who We Are', href: '#/about' },
  ];

  // The 15 Landing Pages Grouped into 4 Curated Categories
  const landingCategories = [
    {
      id: 'weather',
      title: 'By Weather & Season',
      subtitle: 'Snow, Summer & Alpine Climates',
      icon: <CloudSun size={18} className="text-amber" />,
      badge: '4 Tours',
      items: [
        {
          title: 'Summer Vacation Special',
          subtitle: 'Beat the heat in Kashmir & Alps',
          slug: 'summer-packages',
          icon: <Sun size={15} className="text-amber" />
        },
        {
          title: 'Winter Snow Wonderland',
          subtitle: 'Gulmarg chalets & starry desert nights',
          slug: 'winter-packages',
          icon: <Snowflake size={15} className="text-cyan" />
        },
        {
          title: 'Mountain & Alpine Escapes',
          subtitle: 'Pine valleys, cable cars & luxury chalets',
          slug: 'mountain-escapes',
          icon: <Mountain size={15} className="text-emerald" />
        },
        {
          title: 'Tropical Beach & Island Escapes',
          subtitle: 'Private pool villas & turquoise ocean',
          slug: 'beach-vacations',
          icon: <Palmtree size={15} className="text-cyan" />
        }
      ]
    },
    {
      id: 'personas',
      title: 'By Traveler Persona',
      subtitle: 'Solo, Couple, Family & Squad',
      icon: <Users size={18} className="text-amber" />,
      badge: '4 Tours',
      items: [
        {
          title: 'Solo Explorer Escapes',
          subtitle: 'Zero single-tax & 24/7 WhatsApp backup',
          slug: 'solo-travel',
          icon: <Sparkles size={15} className="text-amber" />
        },
        {
          title: 'Honeymoon & Romantic Couples',
          subtitle: 'Private pool villas & candlelit dinners',
          slug: 'couple-honeymoon',
          icon: <Heart size={15} className="text-rose-400" />
        },
        {
          title: 'Family Holiday Packages',
          subtitle: 'Connecting suites & multi-gen comfort',
          slug: 'family-travel',
          icon: <Users size={15} className="text-cyan" />
        },
        {
          title: 'Friends & Squad Trips',
          subtitle: 'Private luxury villas & roadtrip vibes',
          slug: 'group-travel',
          icon: <Users size={15} className="text-emerald" />
        }
      ]
    },
    {
      id: 'group',
      title: 'Group, Corporate & Weekend',
      subtitle: 'Work Retreats, College & Fast Getaways',
      icon: <Briefcase size={18} className="text-amber" />,
      badge: '4 Tours',
      items: [
        {
          title: 'Corporate Offsites & Retreats',
          subtitle: 'Luxury MICE resorts & private banquets',
          slug: 'corporate-travel',
          icon: <Briefcase size={15} className="text-amber" />
        },
        {
          title: 'Educational & College Trips',
          subtitle: 'Safe student journeys with doctor on-call',
          slug: 'school-college-trips',
          icon: <GraduationCap size={15} className="text-cyan" />
        },
        {
          title: 'Fixed Departure Tribe',
          subtitle: 'Guaranteed dates with like-minded travelers',
          slug: 'fixed-departures',
          icon: <Compass size={15} className="text-emerald" />
        },
        {
          title: '48-Hour Weekend Escapes',
          subtitle: 'Quick Friday-Sunday rejuvenating getaways',
          slug: 'weekend-getaways',
          icon: <Clock size={15} className="text-rose-400" />
        }
      ]
    },
    {
      id: 'circuits',
      title: 'Signature Circuits',
      subtitle: 'Incredible India & World Expeditions',
      icon: <Globe size={18} className="text-amber" />,
      badge: '3 Tours',
      items: [
        {
          title: 'Incredible India Luxury',
          subtitle: 'Heritage palaces, backwaters & royal hospitality',
          slug: 'india-packages',
          icon: <MapPin size={15} className="text-amber" />
        },
        {
          title: 'World Passport Holidays',
          subtitle: 'Hassle-free visa filing & 5-star global stays',
          slug: 'international-packages',
          icon: <Globe size={15} className="text-cyan" />
        },
        {
          title: 'Adventure & Trekking Expeditions',
          subtitle: 'Certified mountain guides & luxury basecamps',
          slug: 'adventure-tours',
          icon: <Mountain size={15} className="text-emerald" />
        }
      ]
    }
  ];

  return (
    <>
      <header className={`navbar-root ${isScrolled ? 'scrolled' : ''}`}>
        {/* Dynamic Seasonal Top Announcement Bar - Seamlessly Integrated at Top */}
        {siteSettings.hero?.announcementActive && siteSettings.hero?.announcementText && (
          <div className="top-announcement-strip">
            <div className="container announcement-inner">
              <span className="announcement-badge-pill">{siteSettings.hero?.announcementBadge || '2026 Special'}</span>
              <span className="announcement-text-content">{siteSettings.hero?.announcementText}</span>
              <a
                href={`https://wa.me/${siteSettings.hero?.whatsappNumber || '918770403315'}?text=${encodeURIComponent(siteSettings.hero?.whatsappDefaultMessage || 'Hi Comfort Journey!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="announcement-cta-link"
              >
                Enquire Now →
              </a>
            </div>
          </div>
        )}

        {/* Main Navbar Header Content Bar */}
        <div className="navbar-main-content">
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
                <span className="sub-est-clean">Since 1992</span>
              </div>
            </a>

        {/* Desktop Navigation Links - Clean, Uncluttered */}
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

          {/* Comfy.ai Trip Planner CTA */}
          <button 
            type="button" 
            className="btn-ai-glow nav-ai-btn"
            onClick={onOpenAIPlanner}
            title="Plan with Comfy.ai"
          >
            <Bot size={15} />
            <span className="ai-btn-text">Comfy.ai</span>
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

          {/* Universal Menu Hamburger Toggle (Available on Desktop & Mobile) */}
          <button 
            type="button"
            className="nav-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation & Specialty Trips Menu"
            title="Explore All Journeys & Special Packages"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            <span className="menu-btn-label">Menu</span>
          </button>
        </div>
      </div>
    </div>
  </header>

    {/* Universal Luxury Drawer & Backdrop Overlay (Rendered outside header to avoid backdrop-filter clipping) */}
    {mobileMenuOpen && (
        <>
          <div 
            className="drawer-backdrop" 
            onClick={() => setMobileMenuOpen(false)} 
            aria-hidden="true"
          />
          <div className="luxury-nav-drawer" role="dialog" aria-modal="true">
            {/* Drawer Header with Brand & Close Button */}
            <div className="drawer-header">
              <div className="drawer-header-brand">
                <div className="drawer-brand-name">
                  <span className="drawer-brand-comfort">Comfort</span>
                  <span className="drawer-brand-journey">Journey</span>
                </div>
                <div className="drawer-brand-sub">LUXURY TRAVEL · EST. 1992</div>
              </div>
              <button 
                type="button" 
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Navigation Links */}
            <div className="drawer-nav-section">
              <div className="drawer-section-heading">
                <span>QUICK NAVIGATION</span>
              </div>
              <div className="drawer-nav-links-grid">
                {navLinks.map((link, idx) => (
                  <a 
                    key={idx} 
                    href={link.href} 
                    className="drawer-nav-card"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={13} className="drawer-chevron-icon" />
                  </a>
                ))}
              </div>
            </div>

            {/* Categorized Specialty Landing Pages Accordions */}
            <div className="drawer-nav-section">
              <div className="drawer-section-heading flex-between">
                <span>EXPLORE SPECIALTY PACKAGES (15)</span>
                <span className="drawer-curated-badge">Instant Access</span>
              </div>

              <div className="landing-accordions-container">
                {landingCategories.map((cat) => {
                  const isOpen = !!openCategories[cat.id];
                  return (
                    <div key={cat.id} className={`accordion-box ${isOpen ? 'is-open' : ''}`}>
                      <button 
                        type="button" 
                        className="accordion-header-btn"
                        onClick={() => toggleCategory(cat.id)}
                        aria-expanded={isOpen}
                      >
                        <div className="accordion-title-wrap">
                          <div className="accordion-icon-badge">
                            {cat.icon}
                          </div>
                          <div>
                            <div className="accordion-main-title">{cat.title}</div>
                            <div className="accordion-desc">{cat.subtitle}</div>
                          </div>
                        </div>
                        <div className="accordion-meta-wrap">
                          <span className="accordion-badge-pill">{cat.badge}</span>
                          <ChevronDown size={16} className={`accordion-arrow ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="accordion-items-list">
                          {cat.items.map((item) => (
                            <a
                              key={item.slug}
                              href={`#/${item.slug}`}
                              className="accordion-tour-link"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                            >
                              <div className="accordion-tour-icon">
                                {item.icon}
                              </div>
                              <div className="accordion-tour-text">
                                <div className="tour-link-title">{item.title}</div>
                                <div className="tour-link-sub">{item.subtitle}</div>
                              </div>
                              <ChevronRight size={14} className="tour-link-arrow" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Currency Selector */}
            <div className="drawer-currency-box">
              <div className="drawer-curr-title">
                <Globe size={15} className="text-amber inline mr-1" />
                <span>Currency:</span>
              </div>
              <div className="drawer-curr-pills-row">
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

            {/* Actions & Concierge Support */}
            <div className="drawer-action-buttons">
              <button 
                type="button"
                className="btn-ai-glow w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAIPlanner();
                }}
              >
                <Bot size={17} />
                <span>Plan with Comfy.ai</span>
              </button>

              <button
                type="button"
                className="btn-secondary w-full drawer-btn-row"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsWishlistOpen(true);
                }}
              >
                <Heart size={17} className={wishlist.length > 0 ? 'text-amber fill-amber' : ''} />
                <span>My Saved Wishlist ({wishlist.length})</span>
              </button>

              <a href="tel:+918770403315" className="btn-secondary w-full drawer-btn-row">
                <Phone size={17} />
                <span>Call +91 8770403315</span>
              </a>

              <button 
                type="button"
                className="btn-whatsapp w-full drawer-btn-row"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.open('https://wa.me/918770403315?text=Hi%20Comfort%20Journey!%20I%20want%20to%20plan%20a%20personalized%20trip.', '_blank');
                }}
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp (24/7 Care)</span>
              </button>

              <button
                type="button"
                className="drawer-admin-trigger"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
              >
                <Lock size={13} />
                <span>Admin CMS & SEO Console</span>
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        .navbar-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0;
          background: rgba(7, 11, 20, 0.65);
          backdrop-filter: blur(var(--cj-blur-desktop));
          -webkit-backdrop-filter: blur(var(--cj-blur-desktop));
          border-bottom: 1px solid var(--cj-glass-border);
        }

        .navbar-main-content {
          padding: 0.95rem 0;
          transition: padding 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
        }

        .navbar-root.scrolled {
          background: rgba(7, 11, 20, 0.95);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5);
          border-bottom: 1px solid rgba(255, 107, 0, 0.25);
        }

        .navbar-root.scrolled .navbar-main-content {
          padding: 0.65rem 0;
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
          font-family: var(--font-fraunces, 'Fraunces', Georgia, serif);
          font-weight: 800;
          font-size: 1.32rem;
          letter-spacing: -0.01em;
          color: #FFFFFF;
          text-shadow: 0 1px 8px rgba(255, 255, 255, 0.15);
        }

        .title-journey {
          font-family: var(--font-righteous, 'Righteous', sans-serif);
          font-weight: 400;
          font-size: 1.32rem;
          letter-spacing: 0.02em;
          color: #FFB070;
          text-shadow: 0 1px 8px rgba(255, 137, 47, 0.3);
        }

        .sub-est-clean {
          font-family: 'Outfit', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 176, 112, 0.75);
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

        /* Universal Nav Menu Toggle Button */
        .nav-menu-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--cj-glass-border);
          color: #FFFFFF;
          cursor: pointer;
          padding: 0.5rem 0.9rem;
          border-radius: var(--radius-full);
          font-family: var(--font-ui);
          font-size: 0.84rem;
          font-weight: 700;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          min-height: 38px;
        }

        .nav-menu-toggle:hover {
          background: rgba(255, 137, 47, 0.18);
          border-color: rgba(255, 137, 47, 0.45);
          color: #FF892F;
          box-shadow: 0 0 15px rgba(255, 137, 47, 0.25);
          transform: translateY(-1px);
        }

        .menu-btn-label {
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        /* Backdrop Overlay */
        .drawer-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 6, 20, 0.8);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 100000;
          animation: drawerFadeIn 0.25s ease-out;
        }

        @keyframes drawerFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Luxury Side Drawer */
        .luxury-nav-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          height: 100vh;
          height: 100dvh;
          width: 440px;
          max-width: 92vw;
          background: linear-gradient(180deg, #020C1F 0%, #010612 100%);
          border-left: 1px solid rgba(255, 137, 47, 0.35);
          box-shadow: -20px 0 60px rgba(0, 0, 0, 0.95);
          z-index: 100001;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 1.5rem 1.25rem 2.5rem 1.25rem;
          gap: 1.25rem;
          animation: drawerSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes drawerSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        /* Drawer Header */
        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.09);
        }

        .drawer-brand-name {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 1.2rem;
          font-weight: 900;
        }

        .drawer-brand-comfort {
          color: #FFFFFF;
          font-family: var(--font-display);
        }

        .drawer-brand-journey {
          color: #FF892F;
          font-family: var(--font-display);
        }

        .drawer-brand-sub {
          font-size: 0.65rem;
          color: rgba(255, 176, 112, 0.8);
          font-weight: 800;
          letter-spacing: 1.2px;
          margin-top: 0.15rem;
        }

        .drawer-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--cj-glass-border);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .drawer-close-btn:hover {
          background: rgba(255, 137, 47, 0.25);
          border-color: #FF892F;
          color: #FF892F;
          transform: rotate(90deg);
        }

        /* Sections */
        .drawer-nav-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .drawer-section-heading {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 1px;
          color: #94A3B8;
        }

        .flex-between {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .drawer-curated-badge {
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.15rem 0.55rem;
          border-radius: 999px;
          background: rgba(255, 137, 47, 0.15);
          color: #FF892F;
          border: 1px solid rgba(255, 137, 47, 0.3);
        }

        /* Quick Navigation Grid */
        .drawer-nav-links-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.45rem;
        }

        .drawer-nav-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 0.85rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 8px;
          color: #F1F5F9;
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .drawer-nav-card:hover {
          background: rgba(255, 137, 47, 0.15);
          border-color: rgba(255, 137, 47, 0.4);
          color: #FFFFFF;
          transform: translateY(-1px);
        }

        .drawer-chevron-icon {
          color: rgba(255, 255, 255, 0.3);
        }

        .drawer-nav-card:hover .drawer-chevron-icon {
          color: #FF892F;
        }

        /* Categorized Accordion Styles */
        .landing-accordions-container {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .accordion-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.25s ease;
        }

        .accordion-box.is-open {
          border-color: rgba(255, 137, 47, 0.4);
          background: rgba(255, 137, 47, 0.04);
        }

        .accordion-header-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 0.9rem;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          color: #FFFFFF;
          transition: background 0.2s ease;
        }

        .accordion-header-btn:hover {
          background: rgba(255, 255, 255, 0.04);
        }

        .accordion-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }

        .accordion-icon-badge {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 137, 47, 0.12);
          border: 1px solid rgba(255, 137, 47, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .accordion-main-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: 0.2px;
        }

        .accordion-desc {
          font-size: 0.72rem;
          color: #94A3B8;
          margin-top: 0.1rem;
        }

        .accordion-meta-wrap {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .accordion-badge-pill {
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.18rem 0.5rem;
          border-radius: 999px;
          background: rgba(255, 137, 47, 0.15);
          color: #FF892F;
          border: 1px solid rgba(255, 137, 47, 0.3);
        }

        .accordion-arrow {
          color: #FF892F;
          transition: transform 0.25s ease;
        }

        .rotate-180 {
          transform: rotate(180deg);
        }

        .accordion-items-list {
          padding: 0.35rem 0.5rem 0.65rem 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          animation: accordionFade 0.2s ease-out;
        }

        @keyframes accordionFade {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .accordion-tour-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.75rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid transparent;
          color: #E2E8F0;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .accordion-tour-link:hover {
          background: rgba(255, 137, 47, 0.15);
          border-color: rgba(255, 137, 47, 0.35);
          color: #FFFFFF;
          transform: translateX(4px);
        }

        .accordion-tour-icon {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .accordion-tour-text {
          flex: 1;
          min-width: 0;
        }

        .tour-link-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: #FFFFFF;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tour-link-sub {
          font-size: 0.7rem;
          color: #94A3B8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 0.1rem;
        }

        .tour-link-arrow {
          color: rgba(255, 255, 255, 0.25);
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .accordion-tour-link:hover .tour-link-arrow {
          color: #FF892F;
          transform: translateX(2px);
        }

        /* Currency Selector inside Drawer */
        .drawer-currency-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 0.6rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 10px;
        }

        .drawer-curr-title {
          display: flex;
          align-items: center;
          font-size: 0.85rem;
          font-weight: 700;
          color: #94A3B8;
        }

        .drawer-curr-pills-row {
          display: flex;
          gap: 0.35rem;
        }

        .drawer-curr-pill {
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--cj-glass-border);
          color: #E2E8F0;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .drawer-curr-pill.active {
          background: var(--cj-amber-500);
          color: #001233;
          border-color: var(--cj-amber-500);
        }

        /* Action Buttons */
        .drawer-action-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .drawer-btn-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .drawer-admin-trigger {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.55rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px dashed rgba(255, 255, 255, 0.18);
          border-radius: var(--radius-sm);
          color: #94A3B8;
          font-size: 0.8rem;
          cursor: pointer;
          transition: color 0.2s ease;
          margin-top: 0.4rem;
        }

        .drawer-admin-trigger:hover {
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.35);
        }

        .w-full {
          width: 100%;
          justify-content: center;
          min-height: 46px;
        }

        @media (max-width: 1140px) {
          .desktop-nav, .phone-btn {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .navbar-main-content {
            padding: 0.65rem 0;
          }
          .nav-ai-btn, .currency-selector-rel, .admin-trigger-btn {
            display: none;
          }
          .menu-btn-label {
            display: none;
          }
          .nav-menu-toggle {
            padding: 0.5rem;
            background: rgba(255, 137, 47, 0.15);
            border-color: rgba(255, 137, 47, 0.4);
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

        /* ── Top Announcement Strip ── */
        .top-announcement-strip {
          background: linear-gradient(90deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%);
          border-bottom: 1px solid rgba(255, 184, 0, 0.25);
          color: #F8FAFC;
          font-size: 0.78rem;
          padding: 0.4rem 0;
          position: relative;
          z-index: 10001;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        .announcement-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          text-align: center;
        }
        .announcement-badge-pill {
          background: #FF892F;
          color: #FFFFFF;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 0.15rem 0.5rem;
          border-radius: 20px;
          box-shadow: 0 0 10px rgba(255, 137, 47, 0.4);
        }
        .announcement-text-content {
          font-weight: 500;
          color: #F1F5F9;
        }
        .announcement-cta-link {
          color: #FFB800;
          font-weight: 700;
          text-decoration: underline;
          transition: color 0.2s ease;
          display: inline-flex;
          align-items: center;
        }
        .announcement-cta-link:hover {
          color: #FFA500;
        }
        @media (max-width: 640px) {
          .announcement-badge-pill {
            display: none;
          }
          .top-announcement-strip {
            font-size: 0.72rem;
            padding: 0.3rem 0.5rem;
          }
        }
      `}</style>
    </>
  );
}
