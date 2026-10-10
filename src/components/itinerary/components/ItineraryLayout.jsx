import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Calendar, Compass, Share2, ChevronLeft, MessageCircle, 
  ShieldCheck, Sun, FileCheck2, HelpCircle, Globe, ChevronDown 
} from 'lucide-react';
import { useCurrency } from '../../../context/CurrencyContext';
import './styles/ItineraryLayout.css';

export default function ItineraryLayout({
  tour,
  isLoading = false,
  activeSection = 'itinerary',
  onSectionClick,
  tabContent,
  stickyBookingBar,
  stopDrawer,
  shareMenu,
  onBackToHome,
  onShare,
  children
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSection, setCurrentSection] = useState(activeSection || 'itinerary');
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencyRef = useRef(null);
  const { currency, setCurrency, currencies } = useCurrency();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target)) {
        setCurrencyOpen(false);
      }
    };
    if (currencyOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [currencyOpen]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBack = () => {
    if (onBackToHome) {
      onBackToHome();
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '';
    }
  };

  const handleShareClick = () => {
    if (onShare) {
      onShare();
    } else {
      window.dispatchEvent(new CustomEvent('open-share-menu'));
    }
  };

  const navSections = [
    { id: 'overview', label: 'Photos & Overview', icon: Compass, targetId: 'overview' },
    { id: 'itinerary', label: 'Schedule & Map', icon: Calendar, targetId: 'itinerary-plan' },
    { id: 'inclusions', label: 'Inclusions', icon: ShieldCheck, targetId: 'inclusions' },
    { id: 'weather', label: 'Best Time & Weather', icon: Sun, targetId: 'weather' },
    { id: 'policies', label: 'Policies', icon: FileCheck2, targetId: 'policies' },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle, targetId: 'faqs' },
  ];

  const handleNavClick = (section) => {
    setCurrentSection(section.id);
    onSectionClick?.(section.id);

    const el = document.getElementById(section.targetId);
    if (el) {
      const headerOffset = 130;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`itin-page-root ${isMobile ? 'mobile' : ''}`}>
      {/* Top Header */}
      <header className="itin-header" role="banner">
        <div className="header-left">
          <button 
            type="button"
            className="back-btn" 
            onClick={handleBack}
            aria-label="Back to tour packages"
          >
            <ChevronLeft size={20} />
            <span className="back-text">All Tours</span>
          </button>
          
          {tour && (
            <div className="tour-breadcrumb">
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-dest">{tour.destination || tour.location}</span>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-tour" title={tour.name}>{tour.name}</span>
            </div>
          )}
        </div>
        
        <div className="header-center">
          <nav className="itin-tabs-nav" role="navigation" aria-label="Quick Section Navigation">
            {navSections.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`nav-${item.id}`}
                  className={`itin-tab ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item)}
                >
                  <Icon size={16} className="tab-icon" />
                  <span className="tab-label">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="header-right">
          {/* Header Currency Selector */}
          <div className="header-currency-rel" ref={currencyRef}>
            <button
              type="button"
              className="header-currency-btn"
              onClick={() => setCurrencyOpen(!currencyOpen)}
              title="Change Currency"
            >
              <Globe size={16} />
              <span>{currency}</span>
              <ChevronDown size={13} />
            </button>

            {currencyOpen && (
              <div className="header-currency-dropdown">
                {Object.keys(currencies).map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={`curr-drop-item ${currency === code ? 'active' : ''}`}
                    onClick={() => {
                      setCurrency(code);
                      setCurrencyOpen(false);
                    }}
                  >
                    <span className="curr-sym">{currencies[code].symbol}</span>
                    <span className="curr-code">{code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            type="button" 
            className="header-action-btn share-action-btn"
            onClick={handleShareClick}
            aria-label="Share itinerary"
            title="Share or Export Itinerary"
          >
            <Share2 size={18} />
            <span className="hidden-mobile">Share</span>
          </button>
          
          <button 
            type="button" 
            className="header-action-btn expert-action-btn"
            onClick={() => {
              const msg = encodeURIComponent(
                `Hi Comfort Journey! I'm planning my trip for "${tour?.name || 'a tour'}" and would like to customize the itinerary.`
              );
              window.open(`https://wa.me/918770403315?text=${msg}`, '_blank');
            }}
            title="Chat with Travel Specialist"
          >
            <MessageCircle size={18} />
            <span className="hidden-mobile">Ask Expert</span>
          </button>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="itin-main onepage-main" role="main">
        {isLoading ? (
          <div className="itin-loading-overlay">
            <div className="loading-spinner" />
            <p>Loading your curated itinerary...</p>
          </div>
        ) : (
          <div className="tab-panel-container panel-onepage">
            {tabContent || children}
          </div>
        )}
      </main>
      
      {/* Sticky Bottom Bar */}
      {stickyBookingBar}
      
      {/* Modals & Overlays */}
      <div className="itin-overlays">
        {stopDrawer}
        {shareMenu}
      </div>
    </div>
  );
}