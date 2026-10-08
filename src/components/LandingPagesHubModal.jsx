import React from 'react';
import { X, ExternalLink, Sparkles, MapPin, Users, Heart, Briefcase, GraduationCap, Clock, Globe, Palmtree, Mountain, Sun, Snowflake } from 'lucide-react';
import { LANDING_PAGES_DATA } from '../data/landingPagesData';

export default function LandingPagesHubModal({ isOpen, onClose, onSelectLandingPage }) {
  if (!isOpen) return null;

  const getBadgeIcon = (id) => {
    switch (id) {
      case 'solo-travel': return <Sparkles size={16} className="text-amber" />;
      case 'family-travel': return <Users size={16} className="text-cyan" />;
      case 'couple-honeymoon': return <Heart size={16} className="text-rose-400" />;
      case 'group-travel': return <Users size={16} className="text-emerald" />;
      case 'corporate-travel': return <Briefcase size={16} className="text-amber" />;
      case 'school-college-trips': return <GraduationCap size={16} className="text-cyan" />;
      case 'weekend-getaways': return <Clock size={16} className="text-rose-400" />;
      case 'fixed-departures': return <Globe size={16} className="text-emerald" />;
      case 'india-packages': return <MapPin size={16} className="text-amber" />;
      case 'international-packages': return <Globe size={16} className="text-cyan" />;
      case 'adventure-tours': return <Mountain size={16} className="text-amber" />;
      case 'beach-vacations': return <Palmtree size={16} className="text-emerald" />;
      case 'mountain-escapes': return <Mountain size={16} className="text-cyan" />;
      case 'summer-packages': return <Sun size={16} className="text-amber" />;
      case 'winter-packages': return <Snowflake size={16} className="text-cyan" />;
      default: return <Sparkles size={16} className="text-amber" />;
    }
  };

  const pagesList = Object.values(LANDING_PAGES_DATA);

  return (
    <div className="lp-hub-overlay" onClick={onClose}>
      <div className="lp-hub-modal glass-card animate-scale-up" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="lp-hub-header">
          <div>
            <div className="lp-hub-kicker">
              <Sparkles size={14} className="text-amber inline mr-1" />
              <span>CAMPAIGN & SEO LANDING PAGES DIRECTORY</span>
            </div>
            <h2 className="lp-hub-title font-editorial">Dedicated Landing Pages ({pagesList.length})</h2>
            <p className="lp-hub-subtitle">
              Click any landing page below to preview the dedicated Google Ads & SEO experience.
            </p>
          </div>
          <button type="button" className="lp-hub-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body: Cards Grid */}
        <div className="lp-hub-grid">
          {pagesList.map((page) => (
            <div 
              key={page.id} 
              className="lp-hub-card"
              onClick={() => {
                onSelectLandingPage(page.slug);
                onClose();
              }}
            >
              <div className="lp-hub-card-top">
                <div className="lp-hub-icon-badge">
                  {getBadgeIcon(page.id)}
                </div>
                <span className="lp-hub-tag">{page.categoryBadge}</span>
              </div>

              <h4 className="lp-hub-card-headline font-editorial">{page.heroHeadline}</h4>
              <p className="lp-hub-card-desc">{page.heroSubline}</p>

              <div className="lp-hub-card-footer">
                <span className="lp-hub-url-slug">#/{page.slug}</span>
                <span className="lp-hub-open-btn">
                  <span>Open Page</span>
                  <ExternalLink size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* STYLES */}
        <style>{`
          .lp-hub-overlay {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background: rgba(0, 11, 29, 0.85);
            backdrop-filter: blur(14px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
          }

          .lp-hub-modal {
            width: 100%;
            max-width: 1100px;
            max-height: 90vh;
            background: #001233;
            border: 1px solid rgba(255, 137, 47, 0.3);
            border-radius: 24px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
          }

          .lp-hub-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            padding: 1.75rem 2rem 1.25rem 2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }

          .lp-hub-kicker {
            font-size: 0.75rem;
            font-weight: 800;
            color: #FF892F;
            letter-spacing: 0.1em;
            margin-bottom: 0.35rem;
          }

          .lp-hub-title {
            font-size: 1.85rem;
            color: var(--cj-text-heading);
            margin: 0 0 0.35rem 0;
          }

          .lp-hub-subtitle {
            font-size: 0.92rem;
            color: var(--cj-text-muted);
            margin: 0;
          }

          .lp-hub-close {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: var(--cj-text-body);
            width: 38px;
            height: 38px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .lp-hub-close:hover {
            background: rgba(239, 68, 68, 0.2);
            border-color: #EF4444;
            color: #EF4444;
          }

          .lp-hub-grid {
            padding: 1.75rem 2rem;
            overflow-y: auto;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
            gap: 1.25rem;
          }

          .lp-hub-card {
            background: rgba(0, 29, 81, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 1.25rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 0.85rem;
            cursor: pointer;
            transition: all 0.25s ease;
          }

          .lp-hub-card:hover {
            background: rgba(0, 29, 81, 0.85);
            border-color: #FF892F;
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          }

          .lp-hub-card-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
          }

          .lp-hub-icon-badge {
            width: 34px;
            height: 34px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .lp-hub-tag {
            font-size: 0.72rem;
            font-weight: 800;
            color: #6FE6FC;
            background: rgba(111, 230, 252, 0.1);
            border: 1px solid rgba(111, 230, 252, 0.25);
            padding: 0.2rem 0.6rem;
            border-radius: 9999px;
          }

          .lp-hub-card-headline {
            font-size: 1.15rem;
            color: var(--cj-text-heading);
            margin: 0;
            line-height: 1.35;
          }

          .lp-hub-card-desc {
            font-size: 0.82rem;
            color: var(--cj-text-muted);
            line-height: 1.45;
            margin: 0;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .lp-hub-card-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 0.65rem;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
          }

          .lp-hub-url-slug {
            font-size: 0.75rem;
            font-weight: 700;
            color: #FF892F;
            font-family: monospace;
          }

          .lp-hub-open-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            font-size: 0.78rem;
            font-weight: 700;
            color: var(--cj-text-muted);
          }

          .lp-hub-card:hover .lp-hub-open-btn {
            color: #6FE6FC;
          }

          /* LIGHT THEME */
          :root:not([data-theme="dark"]) .lp-hub-overlay,
          [data-theme="light"] .lp-hub-overlay {
            background: rgba(20, 38, 74, 0.45) !important;
          }

          :root:not([data-theme="dark"]) .lp-hub-modal,
          [data-theme="light"] .lp-hub-modal {
            background: #FFFFFF !important;
            border: 1px solid var(--cj-line, #E8E0CF) !important;
            box-shadow: 0 25px 70px rgba(20, 38, 74, 0.22) !important;
          }

          :root:not([data-theme="dark"]) .lp-hub-header,
          [data-theme="light"] .lp-hub-header {
            border-bottom: 1px solid var(--cj-line, #E8E0CF) !important;
            background: #FFFDF7 !important;
          }

          :root:not([data-theme="dark"]) .lp-hub-title,
          [data-theme="light"] .lp-hub-title {
            color: var(--cj-text-heading, #14264A) !important;
          }

          :root:not([data-theme="dark"]) .lp-hub-close,
          [data-theme="light"] .lp-hub-close {
            background: #F1F5F9 !important;
            border-color: var(--cj-line, #E8E0CF) !important;
            color: var(--cj-text-heading, #14264A) !important;
          }

          :root:not([data-theme="dark"]) .lp-hub-card,
          [data-theme="light"] .lp-hub-card {
            background: #FFFFFF !important;
            border: 1px solid var(--cj-line, #E8E0CF) !important;
            box-shadow: 0 4px 14px rgba(20, 38, 74, 0.05) !important;
          }

          :root:not([data-theme="dark"]) .lp-hub-card:hover,
          [data-theme="light"] .lp-hub-card:hover {
            background: #FFFDF9 !important;
            border-color: #FF892F !important;
            box-shadow: 0 12px 30px rgba(20, 38, 74, 0.10) !important;
          }

          :root:not([data-theme="dark"]) .lp-hub-card-headline,
          [data-theme="light"] .lp-hub-card-headline {
            color: var(--cj-text-heading, #14264A) !important;
          }

          :root:not([data-theme="dark"]) .lp-hub-card-desc,
          [data-theme="light"] .lp-hub-card-desc {
            color: var(--cj-text-body, #475569) !important;
          }

          :root:not([data-theme="dark"]) .lp-hub-icon-badge,
          [data-theme="light"] .lp-hub-icon-badge {
            background: #FFF8F0 !important;
            border-color: rgba(255, 137, 47, 0.2) !important;
          }

          :root:not([data-theme="dark"]) .lp-hub-tag,
          [data-theme="light"] .lp-hub-tag {
            background: #EFF6FF !important;
            color: #0284C7 !important;
            border-color: #BAE6FD !important;
          }

          :root:not([data-theme="dark"]) .lp-hub-card-footer,
          [data-theme="light"] .lp-hub-card-footer {
            border-top: 1px solid var(--cj-line, #E8E0CF) !important;
          }
        `}</style>
      </div>
    </div>
  );
}

