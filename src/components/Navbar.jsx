import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, Menu, X, ChevronDown, ChevronRight, 
  Globe, Heart, Scale, Shield, Sun, Snowflake, Mountain, Palmtree, 
  Users, Briefcase, GraduationCap, Clock, Compass, MapPin, CloudSun, Sparkles,
  Phone, Bot, Lock, Car, Plane, User, LogOut, CheckCircle2
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlistCompare } from '../context/WishlistCompareContext';
import { useUserAuth } from '../context/UserAuthContext';
import ThemeToggle from './ThemeToggle';
import { siteSettingsService, EVENT_SETTINGS_UPDATED } from '../services/siteSettingsService';

const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';

export default function Navbar({
  onOpenQuote,
  onOpenAIPlanner,
  onOpenAdmin,
  onOpenLandingHub,
  onNavigateMagazine,
  onNavigateHome,
  onNavigateAbout,
  onNavigateSection,
  onSelectLandingPage,
  currentView = 'home'
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const currencyRef = useRef(null);
  const userMenuRef = useRef(null);

  // Smooth universal navigation handler across pages & home section anchors
  const handleNavClick = (e, link, idx) => {
    if (idx !== undefined) setActiveNavIdx(idx);
    if (link.href === '#/blog' || link.href === '/blog' || link.href === '/blog/') {
      e.preventDefault();
      if (onNavigateMagazine) onNavigateMagazine();
      else window.location.href = '/blog/';
      return;
    }
    if (link.href === '#/about' || link.href === '/about' || link.href === '/about/') {
      e.preventDefault();
      if (onNavigateAbout) onNavigateAbout();
      else window.location.href = '/about/';
      return;
    }
    if (link.href.startsWith('#')) {
      e.preventDefault();
      const sectionId = link.href.replace(/^#/, '');
      if (onNavigateSection) {
        onNavigateSection(sectionId);
      } else if (currentView !== 'home') {
        if (onNavigateHome) onNavigateHome();
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        if (typeof history !== 'undefined' && history.pushState) {
          history.pushState(null, '', '/');
        }
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Visitor Auth Context
  const { user, openAuthModal, signOut } = useUserAuth();



  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target)) {
        setCurrencyDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    if (currencyDropdownOpen || userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [currencyDropdownOpen, userDropdownOpen]);
  
  // Accordion state for categories inside the hamburger menu
  const [openCategories, setOpenCategories] = useState({
    people: true,
    season: false,
    mood: false,
    where: false
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

  // Clean Desktop Navigation Links (with responsive secondary priority)
  const navLinks = [
    { label: 'Destinations', href: '#tours' },
    { label: 'Trip Studio', href: '#custom-builder' },
    { label: 'Blogs', href: '/blog/' },
    { label: 'Reviews', href: '#google-reviews' },
    { label: 'Why Us', href: '#why-us', secondary: true },
    { label: 'Who We Are', href: '/about/', secondary: true },
  ];

  // PC Nav Liquid Indicator State & Refs
  const [activeNavIdx, setActiveNavIdx] = useState(0);
  const [hoveredNavIdx, setHoveredNavIdx] = useState(null);
  const [tabIndicatorStyle, setTabIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navLinksRef = useRef([]);

  // Mobile Bottom Dock Tab State & Refs
  const [mobileActiveTab, setMobileActiveTab] = useState('explore');
  const [mobileIndicatorStyle, setMobileIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const mobileTabRefs = useRef([]);

  // Sync PC Header Tab Indicator on hover or active change
  useEffect(() => {
    const targetIdx = hoveredNavIdx !== null ? hoveredNavIdx : activeNavIdx;
    const targetEl = navLinksRef.current[targetIdx];
    if (targetEl) {
      setTabIndicatorStyle({
        left: targetEl.offsetLeft,
        width: targetEl.offsetWidth,
        opacity: 1
      });
    }
  }, [hoveredNavIdx, activeNavIdx]);

  // Sync Mobile Bottom Dock Tab Indicator
  useEffect(() => {
    const tabKeys = ['explore', 'wishlist', 'comfy', 'whatsapp', 'menu'];
    const idx = tabKeys.indexOf(mobileActiveTab);
    const targetEl = mobileTabRefs.current[idx];
    if (targetEl) {
      setMobileIndicatorStyle({
        left: targetEl.offsetLeft,
        width: targetEl.offsetWidth,
        opacity: 1
      });
    }
  }, [mobileActiveTab, mobileMenuOpen]);

  // Handle window resize and initial mount calculation
  useEffect(() => {
    const updatePositions = () => {
      const targetIdx = hoveredNavIdx !== null ? hoveredNavIdx : activeNavIdx;
      const pcEl = navLinksRef.current[targetIdx];
      if (pcEl) {
        setTabIndicatorStyle({
          left: pcEl.offsetLeft,
          width: pcEl.offsetWidth,
          opacity: 1
        });
      }
      const tabKeys = ['explore', 'wishlist', 'comfy', 'whatsapp', 'menu'];
      const mobIdx = tabKeys.indexOf(mobileActiveTab);
      const mobEl = mobileTabRefs.current[mobIdx];
      if (mobEl) {
        setMobileIndicatorStyle({
          left: mobEl.offsetLeft,
          width: mobEl.offsetWidth,
          opacity: 1
        });
      }
    };
    window.addEventListener('resize', updatePositions);
    const timer = setTimeout(updatePositions, 120);
    return () => {
      window.removeEventListener('resize', updatePositions);
      clearTimeout(timer);
    };
  }, [hoveredNavIdx, activeNavIdx, mobileActiveTab]);

  // Detect active hash on mount and hash changes to sync PC & mobile tabs
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const foundIdx = navLinks.findIndex(l => l.href === hash || (hash && l.href.includes(hash)));
      if (foundIdx !== -1) {
        setActiveNavIdx(foundIdx);
      }
      if (hash === '#tours' || hash === '#destinations') {
        setMobileActiveTab('explore');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Audience landing pages, grouped the way travellers think about a trip
  const landingCategories = [
    {
      id: 'people',
      title: 'Who is travelling?',
      subtitle: 'Family, couple, friends, solo, work, school',
      icon: <Users size={18} className="text-amber" />,
      badge: '6 pages',
      items: [
        { title: 'Family holidays', subtitle: 'Easy pace for kids and grandparents', slug: 'family-travel', icon: <Users size={15} className="text-emerald" /> },
        { title: 'Couples and honeymoon', subtitle: 'Just the two of you, sorted', slug: 'couple-honeymoon', icon: <Heart size={15} className="text-amber" /> },
        { title: 'Friends trips', subtitle: 'One plan, zero group chat drama', slug: 'group-travel', icon: <Users size={15} className="text-amber" /> },
        { title: 'Solo trips', subtitle: 'Go alone, never feel alone', slug: 'solo-travel', icon: <Compass size={15} className="text-cyan" /> },
        { title: 'Corporate offsites', subtitle: 'Team trips that run on time', slug: 'corporate-travel', icon: <Briefcase size={15} className="text-cyan" /> },
        { title: 'School and college trips', subtitle: 'Safe, planned, parent-approved', slug: 'school-college-trips', icon: <GraduationCap size={15} className="text-emerald" /> }
      ]
    },
    {
      id: 'season',
      title: 'When are you going?',
      subtitle: 'Summer, monsoon, winter, weekends',
      icon: <CloudSun size={18} className="text-amber" />,
      badge: '5 pages',
      items: [
        { title: 'Summer holidays', subtitle: 'Cool places for hot months', slug: 'summer-packages', icon: <Sun size={15} className="text-amber" /> },
        { title: 'Monsoon getaways', subtitle: 'Green valleys and chai stops', slug: 'monsoon-getaways', icon: <CloudSun size={15} className="text-emerald" /> },
        { title: 'Winter trips', subtitle: 'Snow views and warm blankets', slug: 'winter-packages', icon: <Snowflake size={15} className="text-cyan" /> },
        { title: 'Weekend getaways', subtitle: 'Back before Monday', slug: 'weekend-getaways', icon: <Car size={15} className="text-amber" /> },
        { title: 'Fixed departures', subtitle: 'Set dates, friendly groups', slug: 'fixed-departures', icon: <Plane size={15} className="text-cyan" /> }
      ]
    },
    {
      id: 'mood',
      title: 'What are you in the mood for?',
      subtitle: 'Beaches, hills, adventure, yatra',
      icon: <Mountain size={18} className="text-amber" />,
      badge: '4 pages',
      items: [
        { title: 'Beach holidays', subtitle: 'Sand, sea and slow mornings', slug: 'beach-vacations', icon: <Palmtree size={15} className="text-cyan" /> },
        { title: 'Mountain escapes', subtitle: 'Fresh air and quiet views', slug: 'mountain-escapes', icon: <Mountain size={15} className="text-emerald" /> },
        { title: 'Adventure tours', subtitle: 'Treks, rafting, high passes', slug: 'adventure-tours', icon: <Compass size={15} className="text-amber" /> },
        { title: 'Spiritual journeys', subtitle: 'Calm yatras, elder friendly', slug: 'spiritual-journeys', icon: <Sparkles size={15} className="text-amber" /> }
      ]
    },
    {
      id: 'where',
      title: 'India or abroad?',
      subtitle: 'Pick your side of the map',
      icon: <Globe size={18} className="text-amber" />,
      badge: '2 pages',
      items: [
        { title: 'India tour packages', subtitle: 'Hills, palaces, beaches, backwaters', slug: 'india-packages', icon: <MapPin size={15} className="text-amber" /> },
        { title: 'International holidays', subtitle: 'Visa help and easy first trips', slug: 'international-packages', icon: <Plane size={15} className="text-cyan" /> }
      ]
    }
  ];

  return (
    <>
      <header className={`navbar-root ${isScrolled ? 'scrolled' : ''}`}>
        {/* Ultra-Sleek Continuous Marquee Scroller Top Banner */}
        {siteSettings.hero?.announcementActive && (
          <div className="top-marquee-strip" aria-label="Special Offers and Updates">
            <div className="marquee-track">
              {[1, 2].map((loopIdx) => (
                <div key={loopIdx} className="marquee-content-chunk">
                  <div className="marquee-item">
                    <span className="marquee-badge">{siteSettings.hero?.announcementBadge || '2026 Special'}</span>
                    <span className="marquee-text">{siteSettings.hero?.announcementText || 'Early Bird Specials: Flat 20% Off on Kashmir, Bali & Swiss Summer 2026 Tours!'}</span>
                    <a
                      href={`https://wa.me/${siteSettings.hero?.whatsappNumber || '919203931912'}?text=${encodeURIComponent(siteSettings.hero?.whatsappDefaultMessage || 'Hi Comfort Journey! I want to enquire about 2026 special offers.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="marquee-cta"
                    >
                      Ask on WhatsApp →
                    </a>
                  </div>
                  <span className="marquee-dot">✦</span>
                  <div className="marquee-item">
                    <span className="marquee-badge">Clear quotes</span>
                    <span className="marquee-text">You see what is included before you pay. No surprise add-ons.</span>
                  </div>
                  <span className="marquee-dot">✦</span>
                  <div className="marquee-item">
                    <span className="marquee-badge">4.8★ Google</span>
                    <span className="marquee-text">Rated by 85+ travellers who came home with good stories</span>
                  </div>
                  <span className="marquee-dot">✦</span>
                  <div className="marquee-item">
                    <span className="marquee-badge">Visa help</span>
                    <span className="marquee-text">We guide your visa papers for Europe, the UK, Dubai and more</span>
                  </div>
                  <span className="marquee-dot">✦</span>
                  <div className="marquee-item">
                    <span className="marquee-badge">Real people</span>
                    <span className="marquee-text">WhatsApp us any time on +91 92039 31912</span>
                  </div>
                  <span className="marquee-dot">✦</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Floating Rounded Liquid Glass Header Bar */}
        <div className="navbar-floating-bar liquid-glass-dock">
          {/* Optical Glass Layers */}
          <div className="liquidGlass-effect" aria-hidden="true" />
          <div className="liquidGlass-tint" aria-hidden="true" />
          <div className="liquidGlass-shine" aria-hidden="true" />

          {/* Main Navbar Header Content Bar */}
          <div className="navbar-glass-content">
            {/* Modern Luxury Brand Logo & Tagline */}
            <a 
              href="#hero" 
              className="brand-logo" 
              aria-label="Comfort Journey Luxury Travel"
              onClick={(e) => {
                e.preventDefault();
                if (currentView !== 'home') {
                  if (onNavigateHome) onNavigateHome();
                  else window.location.href = '/';
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  if (window.location.hash) {
                    window.location.hash = '';
                    if (history.replaceState) history.replaceState(null, '', '/');
                  }
                }
              }}
            >
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

            {/* Desktop Navigation Links with Liquid Tab Slider Effect */}
            <nav 
              className="desktop-nav-liquid-track" 
              onMouseLeave={() => setHoveredNavIdx(null)}
            >
              {/* Sliding Liquid Indicator Bubble */}
              {tabIndicatorStyle.width > 20 && tabIndicatorStyle.opacity > 0 && (
                <div 
                  className="nav-liquid-bubble"
                  style={{
                    left: `${tabIndicatorStyle.left}px`,
                    width: `${tabIndicatorStyle.width}px`,
                    opacity: tabIndicatorStyle.opacity,
                  }}
                >
                  <div className="liquid-bubble-shine" />
                </div>
              )}

              {navLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  ref={el => (navLinksRef.current[idx] = el)}
                  href={link.href} 
                  className={`nav-link ${link.secondary ? 'nav-link-secondary' : ''} ${(hoveredNavIdx !== null ? hoveredNavIdx === idx : activeNavIdx === idx) ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredNavIdx(idx)}
                  onClick={(e) => handleNavClick(e, link, idx)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Utility & Actions */}
            <div className="nav-actions">
              {/* Wishlist Button with Badge */}
              <button 
                type="button" 
                className="nav-icon-btn liquid-glass-btn"
                onClick={() => setIsWishlistOpen(true)}
                title="Saved Dreamboard Wishlist"
                aria-label="Wishlist"
              >
                <Heart size={16} className={wishlist.length > 0 ? 'text-amber fill-amber' : ''} />
                {wishlist.length > 0 && <span className="nav-badge-count">{wishlist.length}</span>}
              </button>

              {/* Compare Button with Badge */}
              {compareList.length > 0 && (
                <button 
                  type="button" 
                  className="nav-icon-btn compare-btn-active liquid-glass-btn"
                  onClick={() => setIsCompareOpen(true)}
                  title="Compare Selected Packages"
                >
                  <Scale size={16} />
                  <span className="nav-badge-count">{compareList.length}</span>
                </button>
              )}

              {/* Multi-Currency Dropdown */}
              <div className="currency-selector-rel" ref={currencyRef}>
                <button 
                  type="button"
                  className="currency-btn liquid-glass-btn"
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  title="Select Global Currency"
                  aria-expanded={currencyDropdownOpen}
                >
                  <Globe size={14} />
                  <span>{currency}</span>
                  <ChevronDown size={12} className={`curr-chevron ${currencyDropdownOpen ? 'rotated' : ''}`} />
                </button>

                {currencyDropdownOpen && (
                  <div className="currency-menu">
                    <div className="currency-menu-content">
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
                  </div>
                )}
              </div>

              {/* Controls Cluster with Experience Tip */}
              <div className="nav-controls-cluster">
                {/* Light/Dark Theme Toggle — follows OS by default */}
                <ThemeToggle variant="pill" />

                {/* Visitor Authentication Pill / Account Menu */}
                {user ? (
                  <div className="nav-user-profile-rel" ref={userMenuRef}>
                    <button
                      type="button"
                      className="nav-user-btn liquid-glass-btn"
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      title={`Signed in as ${user.name}`}
                    >
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="nav-user-avatar-img" />
                      ) : (
                        <div className="nav-user-avatar-fallback">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'G'}
                        </div>
                      )}
                      <span className="nav-user-name">
                        {user.name.split(' ')[0]}
                      </span>
                      <ChevronDown size={12} className={`curr-chevron ${userDropdownOpen ? 'rotated' : ''}`} />
                    </button>

                    {userDropdownOpen && (
                      <div className="nav-user-dropdown-menu">
                        <div className="nav-user-dropdown-header">
                          <div className="nav-user-dropdown-fullname">{user.name}</div>
                          <div className="nav-user-dropdown-id">{user.email || user.phone}</div>
                          <div className="nav-user-dropdown-verified">
                            <CheckCircle2 size={12} />
                            <span>Verified Travel Club Member</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="nav-user-dropdown-item"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            setIsWishlistOpen(true);
                          }}
                        >
                          <Heart size={14} color="#FF892F" />
                          <span>Saved Dreamboard ({wishlist.length})</span>
                        </button>

                        <button
                          type="button"
                          className="nav-user-dropdown-item"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onOpenQuote();
                          }}
                        >
                          <Sparkles size={14} color="#6FE6FC" />
                          <span>Request Custom Trip</span>
                        </button>

                        <button
                          type="button"
                          className="nav-user-dropdown-item nav-user-dropdown-signout"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            signOut();
                          }}
                        >
                          <LogOut size={14} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    className="nav-sign-in-btn"
                    onClick={openAuthModal}
                    title="Sign in with Google or Mobile"
                  >
                    <User size={15} className="nav-sign-in-icon" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>

              {/* Universal Menu Hamburger Toggle */}
              <button 
                type="button" 
                className="nav-menu-toggle liquid-glass-btn" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation & Specialty Trips Menu"
                title="Explore All Journeys & Special Packages"
              >
                {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
                <span className="menu-btn-label">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── DEDICATED MOBILE 1-HAND ERGONOMIC APPLE-STYLE LIQUID GLASS BOTTOM DOCK ─── */}
      <nav className="mobile-bottom-glass-dock liquid-glass-dock" aria-label="Mobile Navigation">
        <div className="liquidGlass-effect" aria-hidden="true" />
        <div className="liquidGlass-tint" aria-hidden="true" />
        <div className="liquidGlass-shine" aria-hidden="true" />

        <div className="mobile-dock-inner">
          {/* Mobile Liquid Sliding Bubble Indicator */}
          <div 
            className="mobile-dock-liquid-bubble"
            style={{
              left: `${mobileIndicatorStyle.left}px`,
              width: `${mobileIndicatorStyle.width}px`,
              opacity: mobileIndicatorStyle.opacity,
            }}
          />

          {/* 1. Explore */}
          <button
            ref={el => (mobileTabRefs.current[0] = el)}
            type="button"
            className={`mobile-dock-btn ${mobileActiveTab === 'explore' ? 'active' : ''}`}
            onClick={() => {
              setMobileActiveTab('explore');
              if (onNavigateSection) {
                onNavigateSection('tours');
              } else if (currentView !== 'home') {
                if (onNavigateHome) onNavigateHome();
                setTimeout(() => {
                  const el = document.getElementById('tours');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 120);
              } else {
                const el = document.getElementById('tours');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            aria-label="Explore Destinations"
          >
            <Compass size={19} />
            <span className="mobile-dock-label">Explore</span>
          </button>

          {/* 2. Wishlist with live counter */}
          <button
            ref={el => (mobileTabRefs.current[1] = el)}
            type="button"
            className={`mobile-dock-btn ${mobileActiveTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => {
              setMobileActiveTab('wishlist');
              setIsWishlistOpen(true);
            }}
            aria-label="Saved Wishlist"
          >
            <div style={{ position: 'relative', display: 'inline-flex' }}>
              <Heart size={19} className={wishlist.length > 0 ? 'text-amber fill-amber' : ''} />
              {wishlist.length > 0 && (
                <span className="mobile-dock-badge">{wishlist.length}</span>
              )}
            </div>
            <span className="mobile-dock-label">Wishlist</span>
          </button>

          {/* 3. Center Elevated Mascot Action ("Plan with Comfy") */}
          <button
            ref={el => (mobileTabRefs.current[2] = el)}
            type="button"
            className="mobile-dock-btn mobile-tab-mascot-center"
            onClick={() => {
              setMobileActiveTab('comfy');
              onOpenAIPlanner();
            }}
            title="Plan with Comfy Mascot"
            aria-label="Plan with Comfy AI"
          >
            <div className="mascot-center-bubble">
              <img 
                src={`${basePrefix}mascot-default.png`} 
                alt="Comfy Mascot Buddy" 
                className="mascot-bubble-img"
                onError={(e) => { e.currentTarget.src = './mascot-default.png'; }}
              />
              <div className="mascot-ping-ring" />
            </div>
            <span className="mobile-dock-label">Plan with Comfy</span>
          </button>

          {/* 4. WhatsApp (Instant 1-Hand VIP Enquire) */}
          <a
            ref={el => (mobileTabRefs.current[3] = el)}
            href={`https://wa.me/${siteSettings.hero?.whatsappNumber || '919203931912'}?text=${encodeURIComponent(siteSettings.hero?.whatsappDefaultMessage || 'Hi Comfort Journey! I want to plan a personalized luxury trip.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`mobile-dock-btn mobile-tab-whatsapp ${mobileActiveTab === 'whatsapp' ? 'active' : ''}`}
            onClick={() => setMobileActiveTab('whatsapp')}
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={19} />
            <span className="mobile-dock-label">WhatsApp</span>
          </a>

          {/* 5. Menu Drawer Toggle */}
          <button
            ref={el => (mobileTabRefs.current[4] = el)}
            type="button"
            className={`mobile-dock-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => {
              setMobileActiveTab('menu');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle Full Menu"
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            <span className="mobile-dock-label">Menu</span>
          </button>
        </div>
      </nav>

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

            {/* Mobile Visitor Account / Sign In Pill */}
            <div className="drawer-traveler-club-card">
              {user ? (
                <div className="drawer-traveler-club-info">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="drawer-user-avatar-img" />
                  ) : (
                    <div className="drawer-user-avatar-fallback">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'G'}
                    </div>
                  )}
                  <div>
                    <div className="drawer-traveler-club-title">{user.name}</div>
                    <div className="drawer-traveler-club-verified">✓ Verified Member</div>
                  </div>
                </div>
              ) : (
                <div className="drawer-traveler-club-info">
                  <div>
                    <div className="drawer-traveler-club-title">Traveler Club</div>
                    <div className="drawer-traveler-club-desc">Save packages & auto-fill bookings</div>
                  </div>
                </div>
              )}
              {user ? (
                <button
                  type="button"
                  className="drawer-traveler-signout-btn"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              ) : (
                <button
                  type="button"
                  className="drawer-traveler-signin-btn"
                  onClick={() => { setMobileMenuOpen(false); openAuthModal(); }}
                >
                  Sign In
                </button>
              )}
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
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, link, idx);
                    }}
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={13} className="drawer-chevron-icon" />
                  </a>
                ))}
              </div>
            </div>

            {/* Categorized Specialty Landing Pages Accordions */}
            <div className="drawer-nav-section">
              <div className="drawer-section-heading">
                <span>EXPLORE SPECIALTY PACKAGES</span>
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
                          <ChevronDown size={18} className={`accordion-arrow ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="accordion-items-list">
                          {cat.items.map((item) => (
                            <a
                              key={item.slug}
                              href={`/${item.slug}/`}
                              className="accordion-tour-link"
                              onClick={(e) => {
                                e.preventDefault();
                                setMobileMenuOpen(false);
                                if (onSelectLandingPage) {
                                  onSelectLandingPage(item.slug);
                                } else {
                                  window.location.href = `/${item.slug}/`;
                                }
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

              <a href="tel:+919203931912" className="btn-secondary w-full drawer-btn-row">
                <Phone size={17} />
                <span>Call +91 9203931912</span>
              </a>

              <button 
                type="button"
                className="btn-whatsapp w-full drawer-btn-row"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.open('https://wa.me/919203931912?text=Hi%20Comfort%20Journey!%20I%20want%20to%20plan%20a%20personalized%20trip.', '_blank');
                }}
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp (24/7 Care)</span>
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
          pointer-events: none;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0;
          background: transparent;
          border-bottom: none;
        }

        .navbar-main-content {
          padding: 0;
          width: 100%;
        }

        .navbar-root.scrolled {
          background: transparent;
          border-bottom: none;
          box-shadow: none;
        }

        .navbar-root.scrolled .navbar-main-content {
          padding: 0;
        }

        .mobile-top-phone-btn {
          display: none;
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
          color: var(--cj-text-heading);
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
          font-family: var(--font-heading, 'Baumans', cursive, sans-serif);
          font-weight: 800;
          font-size: 1.32rem;
          letter-spacing: -0.01em;
          color: var(--cj-text-heading);
          text-shadow: 0 1px 8px rgba(255, 255, 255, 0.15);
        }

        .title-journey {
          font-family: var(--font-heading, 'Baumans', cursive, sans-serif);
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
          color: var(--cj-text-heading);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.35rem;
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
          color: #FFFFFF; /* on tangerine fill: white in both themes */
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
          color: var(--cj-text-heading);
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
          color: var(--cj-text-heading);
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
          color: var(--cj-text-heading);
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

        .currency-selector-rel {
          position: relative;
          z-index: 100;
        }

        .curr-chevron {
          transition: transform 0.2s ease;
        }
        .curr-chevron.rotated {
          transform: rotate(180deg);
        }

        .currency-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: #001D51;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 14px;
          padding: 0.45rem;
          box-shadow: 0 20px 48px rgba(0, 8, 25, 0.75), 0 4px 16px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          min-width: 175px;
          z-index: 9999999 !important;
          animation: popMenu 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes popMenu {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .curr-option {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 0.8rem;
          border-radius: 8px;
          color: var(--cj-text-body);
          font-family: var(--font-ui);
          font-size: 0.85rem;
          font-weight: 600;
          width: 100%;
          text-align: left;
          transition: all 0.15s ease;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .curr-option:hover {
          background: rgba(255, 137, 47, 0.18);
          color: #FF892F;
        }

        .curr-option.active {
          background: #FF892F;
          color: #FFFFFF;
          font-weight: 800;
        }

        .c-symbol {
          font-weight: 900;
          width: 28px;
        }

        .nav-ai-btn {
          padding: 0.45rem 0.85rem;
          font-size: 0.84rem;
          white-space: nowrap;
          flex-shrink: 0;
          min-height: 38px;
        }

        .phone-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--cj-text-heading);
          font-family: var(--font-ui);
          font-weight: 700;
          font-size: 0.82rem;
          background: rgba(255, 255, 255, 0.08);
          padding: 0.45rem 0.75rem;
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

        .phone-text-full {
          white-space: nowrap;
        }
        .phone-text-short {
          display: none;
          white-space: nowrap;
        }

        @media (max-width: 1440px) {
          .nav-link-secondary {
            display: none !important;
          }
          .phone-text-full {
            display: none !important;
          }
          .phone-text-short {
            display: inline !important;
          }
        }

        @media (max-width: 1280px) {
          .desktop-nav-liquid-track .nav-link {
            padding: 0.42rem 0.72rem !important;
            font-size: 0.82rem !important;
          }
        }

        .admin-trigger-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--cj-glass-border);
          color: var(--cj-text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .admin-trigger-btn:hover {
          color: var(--cj-text-heading);
          border-color: rgba(255, 255, 255, 0.3);
        }

        /* Universal Nav Menu Toggle Button */
        .nav-menu-toggle {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--cj-glass-border);
          color: var(--cj-text-heading);
          cursor: pointer;
          padding: 0.45rem 0.8rem;
          border-radius: var(--radius-full);
          font-family: var(--font-ui);
          font-size: 0.82rem;
          font-weight: 700;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          min-height: 38px;
          flex-shrink: 0;
          margin-right: 0;
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
          letter-spacing: 0.4px;
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
          color: var(--cj-text-heading);
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
          color: var(--cj-text-heading);
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
          color: var(--cj-text-muted);
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
          color: var(--cj-text-body);
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .drawer-nav-card:hover {
          background: rgba(255, 137, 47, 0.15);
          border-color: rgba(255, 137, 47, 0.4);
          color: var(--cj-text-heading);
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
          color: var(--cj-text-heading);
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
          color: var(--cj-text-heading);
          letter-spacing: 0.2px;
        }

        .accordion-desc {
          font-size: 0.72rem;
          color: var(--cj-text-muted);
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
          color: var(--cj-text-body);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .accordion-tour-link:hover {
          background: rgba(255, 137, 47, 0.15);
          border-color: rgba(255, 137, 47, 0.35);
          color: var(--cj-text-heading);
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
          color: var(--cj-text-heading);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tour-link-sub {
          font-size: 0.7rem;
          color: var(--cj-text-muted);
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
          color: var(--cj-text-muted);
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
          color: var(--cj-text-body);
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
          color: var(--cj-text-muted);
          font-size: 0.8rem;
          cursor: pointer;
          transition: color 0.2s ease;
          margin-top: 0.4rem;
        }

        .drawer-admin-trigger:hover {
          color: var(--cj-text-heading);
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
          .nav-ai-btn, .currency-selector-rel, .admin-trigger-btn, .phone-btn {
            display: none;
          }
          .nav-menu-toggle {
            display: none; /* Managed by ergonomic bottom dock */
          }
          .mobile-top-phone-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255, 137, 47, 0.18);
            border: 1px solid rgba(255, 137, 47, 0.45);
            color: #FF892F;
            box-shadow: 0 0 10px rgba(255, 137, 47, 0.25);
          }
          .brand-logo .sub-row {
            display: none;
          }
          .title-comfort, .title-journey {
            font-size: 1.05rem;
          }
          .sub-est-clean {
            font-size: 0.58rem;
            letter-spacing: 0.06em;
          }
          .brand-emblem-badge {
            width: 32px;
            height: 32px;
          }
          .brand-emblem-badge svg {
            width: 32px;
            height: 32px;
          }
        }

        /* ── Top Announcement Strip ── */
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
          color: var(--cj-text-heading);
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
          color: #F1F5F9; /* on navy marquee strip: stays light in both themes */
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
            padding: 0.25rem 0.65rem;
          }
        }

        /* LIGHT THEME — white drawer + menu panels (dark keeps navy) */
        :root:not([data-theme="dark"]) .luxury-nav-drawer,
        [data-theme="light"] .luxury-nav-drawer {
          background: linear-gradient(180deg, #FFFFFF 0%, var(--cj-bg-alt, #F9FBE7) 100%);
          border-left-color: var(--cj-line, #E8E0CF);
        }
        :root:not([data-theme="dark"]) .drawer-nav-card,
        [data-theme="light"] .drawer-nav-card,
        :root:not([data-theme="dark"]) .accordion-tour-link,
        [data-theme="light"] .accordion-tour-link {
          background: var(--cj-glass-card);
          -webkit-backdrop-filter: var(--cj-glass-blur);
          backdrop-filter: var(--cj-glass-blur);
          border: 1px solid var(--cj-glass-rim);
          box-shadow: 0 0 0 1px var(--cj-glass-hairline), var(--shadow-md, 0 10px 30px rgba(20,38,74,0.10)), inset 0 1px 0 rgba(255,255,255,0.8);
          border-color: var(--cj-line, #E8E0CF);
        }
        :root:not([data-theme="dark"]) .drawer-header,
        [data-theme="light"] .drawer-header {
          border-bottom-color: var(--cj-line, #E8E0CF);
        }
        :root:not([data-theme="dark"]) .drawer-curr-pill,
        [data-theme="light"] .drawer-curr-pill {
          background: #FFFFFF;
          border-color: var(--cj-line, #E8E0CF);
        }
        /* Light-only brand word deepening */
        :root:not([data-theme="dark"]) .title-journey,
        [data-theme="light"] .title-journey {
          color: var(--cj-cta-deep, #D65A00);
        }
        :root:not([data-theme="dark"]) .currency-menu,
        [data-theme="light"] .currency-menu {
          background: #FFFFFF !important;
          border-color: var(--cj-line, #E8E0CF) !important;
          box-shadow: 0 20px 48px rgba(20, 38, 74, 0.18), 0 4px 16px rgba(20, 38, 74, 0.08) !important;
        }
        :root:not([data-theme="dark"]) .curr-option,
        [data-theme="light"] .curr-option {
          color: #14264A !important;
        }
        :root:not([data-theme="dark"]) .curr-option:hover,
        [data-theme="light"] .curr-option:hover {
          background: #FFF8F0 !important;
          color: #D65A00 !important;
        }
        :root:not([data-theme="dark"]) .curr-option.active,
        [data-theme="light"] .curr-option.active {
          background: #FF892F !important;
          color: #FFFFFF !important;
        }

        /* ── Visitor Sign In & Account Controls (Dual-Theme Compliant) ── */
        .nav-user-profile-rel {
          position: relative;
          flex-shrink: 0;
        }

        .nav-user-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.38rem 0.75rem;
          border-radius: var(--radius-full);
          font-family: var(--font-ui);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          min-height: 38px;
        }

        .nav-user-avatar-img {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          object-fit: cover;
        }

        .nav-user-avatar-fallback {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #FF892F;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          font-weight: 800;
        }

        .nav-user-name {
          max-width: 90px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Sign In Pill in Desktop Navbar */
        .nav-sign-in-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.42rem 0.9rem;
          border-radius: var(--radius-full);
          font-family: var(--font-ui);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          min-height: 38px;
          flex-shrink: 0;
        }

        .nav-sign-in-icon {
          color: #FF892F;
          flex-shrink: 0;
        }

        /* Dark Theme Navbar Sign In */
        [data-theme="dark"] .nav-sign-in-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #F9FBE7 !important;
        }
        [data-theme="dark"] .nav-sign-in-btn:hover {
          background: rgba(255, 137, 47, 0.22);
          border-color: #FF892F;
          color: #FF892F !important;
          box-shadow: 0 0 14px rgba(255, 137, 47, 0.35);
        }

        /* Light Theme Navbar Sign In — crisp, bright, high-contrast */
        :root:not([data-theme="dark"]) .nav-sign-in-btn,
        [data-theme="light"] .nav-sign-in-btn {
          background: #FFFFFF !important;
          border: 1.5px solid #FF892F !important;
          color: #D65A00 !important;
          box-shadow: 0 2px 8px rgba(255, 137, 47, 0.15) !important;
        }
        :root:not([data-theme="dark"]) .nav-sign-in-btn:hover,
        [data-theme="light"] .nav-sign-in-btn:hover {
          background: #FF892F !important;
          border-color: #FF892F !important;
          color: #FFFFFF !important;
          box-shadow: 0 4px 16px rgba(255, 137, 47, 0.3) !important;
          transform: translateY(-1px);
        }
        :root:not([data-theme="dark"]) .nav-sign-in-btn:hover .nav-sign-in-icon,
        [data-theme="light"] .nav-sign-in-btn:hover .nav-sign-in-icon {
          color: #FFFFFF !important;
        }

        /* User Profile Dropdown Menu */
        .nav-user-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 230px;
          border-radius: 14px;
          padding: 0.75rem;
          z-index: 1000;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
        }
        [data-theme="dark"] .nav-user-dropdown-menu {
          background: #001D51;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        :root:not([data-theme="dark"]) .nav-user-dropdown-menu,
        [data-theme="light"] .nav-user-dropdown-menu {
          background: #FFFFFF !important;
          border: 1px solid var(--cj-line, #E8E0CF) !important;
          box-shadow: 0 16px 36px rgba(20, 38, 74, 0.15) !important;
        }

        .nav-user-dropdown-header {
          padding-bottom: 0.6rem;
          border-bottom: 1px solid rgba(125, 125, 125, 0.2);
          margin-bottom: 0.5rem;
        }
        .nav-user-dropdown-fullname {
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--color-text, #14264A);
        }
        .nav-user-dropdown-id {
          font-size: 0.74rem;
          color: var(--color-text-muted, #64748B);
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .nav-user-dropdown-verified {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-top: 0.25rem;
          font-size: 0.7rem;
          color: #10B981;
          font-weight: 700;
        }

        .nav-user-dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.55rem 0.65rem;
          background: transparent;
          border: none;
          color: var(--color-text, #14264A);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          text-align: left;
          transition: background 0.15s ease;
        }
        .nav-user-dropdown-item:hover {
          background: rgba(255, 137, 47, 0.12);
          color: #FF892F;
        }
        .nav-user-dropdown-signout {
          margin-top: 0.35rem;
          border-top: 1px solid rgba(125, 125, 125, 0.15);
          color: #EF4444 !important;
          font-weight: 700;
        }

        /* ── Mobile Menu Drawer Traveler Club Card ── */
        .drawer-traveler-club-card {
          margin: 0.75rem 1.25rem 1rem;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          transition: all 0.2s ease;
        }
        [data-theme="dark"] .drawer-traveler-club-card {
          background: rgba(255, 137, 47, 0.1);
          border: 1px solid rgba(255, 137, 47, 0.3);
        }
        :root:not([data-theme="dark"]) .drawer-traveler-club-card,
        [data-theme="light"] .drawer-traveler-club-card {
          background: #FFF8F0 !important;
          border: 1.5px solid #FFD4B2 !important;
          box-shadow: 0 4px 14px rgba(255, 137, 47, 0.08) !important;
        }

        .drawer-traveler-club-info {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          min-width: 0;
        }
        .drawer-traveler-club-title {
          font-size: 0.88rem;
          font-weight: 800;
          line-height: 1.2;
        }
        [data-theme="dark"] .drawer-traveler-club-title {
          color: #F9FBE7 !important;
        }
        :root:not([data-theme="dark"]) .drawer-traveler-club-title,
        [data-theme="light"] .drawer-traveler-club-title {
          color: #14264A !important;
        }

        .drawer-traveler-club-desc {
          font-size: 0.74rem;
          margin-top: 0.15rem;
          line-height: 1.3;
        }
        [data-theme="dark"] .drawer-traveler-club-desc {
          color: #CBD5E1 !important;
        }
        :root:not([data-theme="dark"]) .drawer-traveler-club-desc,
        [data-theme="light"] .drawer-traveler-club-desc {
          color: #475569 !important;
        }

        .drawer-traveler-club-verified {
          font-size: 0.72rem;
          color: #10B981;
          font-weight: 700;
          margin-top: 0.15rem;
        }

        .drawer-traveler-signin-btn {
          background: linear-gradient(135deg, #FF892F, #E66F12);
          border: none;
          border-radius: 8px;
          padding: 0.45rem 0.95rem;
          color: #FFFFFF !important;
          font-family: var(--font-ui);
          font-size: 0.82rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(255, 137, 47, 0.35);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .drawer-traveler-signin-btn:hover {
          background: linear-gradient(135deg, #FF9848, #FF6B00);
          box-shadow: 0 4px 14px rgba(255, 137, 47, 0.5);
          transform: translateY(-1px);
        }

        .drawer-traveler-signout-btn {
          background: transparent;
          border: 1px solid rgba(239, 68, 68, 0.4);
          border-radius: 8px;
          padding: 0.35rem 0.65rem;
          color: #EF4444;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ── 1-Time Best Experience Hint Popover ── */
        .nav-controls-cluster {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

      `}</style>
    </>
  );
}

