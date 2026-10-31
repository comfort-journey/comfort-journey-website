import React from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import ThemeToggle from '../../ThemeToggle';
import '../styles/ai-planner.css';

const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';

export default function AIPlannerLayout({
  isMobile,
  isTablet,
  isDesktop,
  layoutMode,
  onBackToHome,
  onOpenQuote,
  leftRail,
  rightRail,
  children,
  bottomActionBar,
  stickyPromptDock,
  floatingAIButton,
  chatPanel,
  customizeSheet,
  socialCardModal,
  exportMenu
}) {
  return (
    <div className={`ai-planner-root ${layoutMode} editorial-studio-mode`} data-mobile={isMobile} data-tablet={isTablet} data-desktop={isDesktop}>
      {/* Top Header Bar */}
      <header className="planner-header" role="banner">
        <div className="header-left">
          {onBackToHome && (
            <button 
              type="button" 
              onClick={onBackToHome}
              className="hotline-pill back-to-site-pill"
              aria-label="Back to Main Website"
              title="Return to Main Website"
            >
              <ArrowLeft size={14} />
              <span className="back-text-desktop">Back to Site</span>
              <span className="back-text-mobile">Back</span>
            </button>
          )}
        </div>

        <div className="header-center">
          <div className="comfy-brand-lockup">
            <div className="mascot-avatar" title="Comfy.ai Assistant Online">
              <img 
                src={`${basePrefix}mascot-default.png`} 
                alt="Comfy" 
                className="mascot-img"
                onError={(e) => { e.currentTarget.src = './mascot-default.png'; }}
              />
              <span className="online-indicator" aria-hidden="true" />
            </div>
            <div className="comfy-brand-text">
              <h1 className="planner-title">Comfy.ai <span className="text-amber">Travel Studio</span></h1>
              <p className="planner-subtitle hidden-mobile">
                <span className="status-dot" aria-hidden="true" />
                AI-Crafted Itineraries · Verified Stays & Private Chauffeurs Since 1992
              </p>
            </div>
          </div>
        </div>
        
        <div className="header-right">
          {/* Dual Theme ☀️ / 🌙 1-Click Toggle */}
          <ThemeToggle className="planner-theme-toggle-btn" />

          <a 
            href="https://wa.me/919203931912" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hotline-pill hotline-whatsapp-pill"
            aria-label="Chat on WhatsApp"
            title="Chat with Tour Specialist in Bhopal"
          >
            <MessageCircle size={15} />
            <span className="hidden-mobile">+91 9203931912</span>
          </a>
        </div>
      </header>

      {/* Main Editorial Studio Area (3-Column Workspace on >1280px Desktop) */}
      <main className="planner-main editorial-main" role="main">
        <div className="planner-workspace-row">
          {leftRail}
          <div className="planner-editorial-container">
            {children}
          </div>
          {rightRail}
        </div>
      </main>

      {/* Sticky Quick-Prompt Dock (Appears on Scroll) */}
      {stickyPromptDock}

      {/* Bottom Action Bar */}
      <footer className="planner-footer" role="contentinfo">
        {bottomActionBar}
      </footer>

      {/* Floating AI Chat Concierge Button */}
      <div className="floating-ai-container" aria-live="polite">
        {floatingAIButton}
      </div>

      {/* Overlay Modals */}
      <div className="planner-overlays">
        {chatPanel}
        {customizeSheet}
        {socialCardModal}
        {exportMenu}
      </div>
    </div>
  );
}
