import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, Share2, MessageCircle, Sparkles, MapPin, CheckCircle2, ChevronRight, Bookmark, ThumbsUp, Hotel, Car, Utensils, Ticket, ShieldCheck } from 'lucide-react';
import { directusService } from '../services/directusClient';
import { TOURS_DATA } from '../data/toursData';
import { useCurrency } from '../context/CurrencyContext';

export default function BlogPostReader({ slug, onNavigateHome, onNavigateMagazine, onSelectItinerary, onBookNow, onOpenQuote }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);

    directusService.fetchBlogBySlug(slug).then(data => {
      setBlog(data);
      setLoading(false);

      // Inject dynamic SEO meta tags
      if (data) {
        document.title = data.seo?.metaTitle || `${data.title} | Comfort Journey`;
        
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.name = 'description';
          document.head.appendChild(metaDesc);
        }
        metaDesc.content = data.seo?.metaDescription || data.excerpt;
      }
    });

    return () => {
      document.title = "Comfort Journey | Handcrafted Royal Luxury Travel Packages";
    };
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="blog-reader-loading">
        <div className="loading-spinner"></div>
        <p>Loading travel editorial...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-not-found container text-center py-5">
        <h2 className="font-editorial text-white text-3xl mb-3">Article Not Found</h2>
        <p className="text-muted mb-4">The travel guide you are looking for might have moved or been updated.</p>
        <button type="button" className="btn-back-magazine" onClick={onNavigateMagazine}>
          <ArrowLeft size={16} />
          <span>Browse All Journal Articles</span>
        </button>
      </div>
    );
  }

  // Find related tour package
  const relatedTour = TOURS_DATA.find(t => t.id === blog.relatedTourId) || TOURS_DATA[0];

  // Render markdown/HTML content
  const renderFormattedContent = (content) => {
    if (!content) return null;

    const sections = content.split('\n\n');
    return sections.map((sec, idx) => {
      if (sec.startsWith('## ')) {
        return (
          <h2 key={idx} className="reader-h2 font-editorial">
            {sec.replace('## ', '')}
          </h2>
        );
      }
      if (sec.startsWith('### ')) {
        return (
          <h3 key={idx} className="reader-h3 font-editorial">
            {sec.replace('### ', '')}
          </h3>
        );
      }
      if (sec.startsWith('> ')) {
        return (
          <blockquote key={idx} className="reader-blockquote">
            <p>{sec.replace('> ', '')}</p>
          </blockquote>
        );
      }
      if (sec.startsWith('- ')) {
        const items = sec.split('\n').map(item => item.replace(/^- /, ''));
        return (
          <ul key={idx} className="reader-list">
            {items.map((it, iIdx) => (
              <li key={iIdx}>
                <span className="list-dot">•</span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        );
      }
      if (sec.startsWith('1. ') || sec.startsWith('2. ') || sec.startsWith('3. ')) {
        const items = sec.split('\n');
        return (
          <ol key={idx} className="reader-ordered-list">
            {items.map((it, iIdx) => (
              <li key={iIdx}>{it.replace(/^\d+\.\s*/, '')}</li>
            ))}
          </ol>
        );
      }
      if (sec === '---') {
        return <hr key={idx} className="reader-divider" />;
      }
      return (
        <p key={idx} className="reader-paragraph">
          {sec}
        </p>
      );
    });
  };

  const whatsappInquiryUrl = `https://wa.me/918770403315?text=${encodeURIComponent(`Hi Comfort Journey! I just read your article "${blog.title}". I would like to plan a trip like this!`)}`;

  return (
    <div className="blog-reader-root">
      {/* Top Floating Bar */}
      <div className="reader-top-bar">
        <div className="container reader-top-container">
          <div className="breadcrumbs">
            <button type="button" className="crumb-link" onClick={onNavigateHome}>Home</button>
            <span className="crumb-sep">/</span>
            <button type="button" className="crumb-link" onClick={onNavigateMagazine}>Journal</button>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">{blog.title.slice(0, 32)}...</span>
          </div>

          <div className="reader-top-actions">
            <button 
              type="button" 
              className="btn-share-article"
              onClick={handleShare}
              title="Copy Article Link"
            >
              <Share2 size={15} />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
            <a 
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-inquiry"
            >
              <MessageCircle size={15} />
              <span>Ask Curator</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Article Cover Banner */}
      <header className="reader-hero">
        <div className="reader-hero-bg">
          <img src={blog.coverImage} alt={blog.title} />
          <div className="reader-hero-scrim"></div>
        </div>

        <div className="container reader-hero-container">
          <div className="reader-cat-badge">{blog.category}</div>
          <h1 className="reader-title font-editorial">{blog.title}</h1>
          <p className="reader-excerpt">{blog.excerpt}</p>

          <div className="reader-meta-row">
            <div className="author-card">
              <img src={blog.author.avatar} alt={blog.author.name} className="author-img" />
              <div>
                <span className="author-name">{blog.author.name}</span>
                <span className="author-role">{blog.author.role}</span>
              </div>
            </div>

            <div className="meta-stats">
              <span className="meta-stat">
                <Calendar size={13} className="inline mr-1 text-amber" />
                {blog.publishedDate}
              </span>
              <span className="meta-divider">•</span>
              <span className="meta-stat">
                <Clock size={13} className="inline mr-1 text-cyan" />
                {blog.readTime}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Body & Sidebar Layout */}
      <div className="container reader-layout-container">
        <div className="reader-grid">
          {/* Main Article Content */}
          <article className="reader-main-content glass-card">
            {renderFormattedContent(blog.content)}

            {/* Tags Strip */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="reader-tags-box">
                <span className="tags-label">Topics:</span>
                <div className="tags-list">
                  {blog.tags.map((t, idx) => (
                    <span key={idx} className="tag-pill">#{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Signature Box */}
            <div className="author-signature-card">
              <img src={blog.author.avatar} alt={blog.author.name} className="sig-avatar" />
              <div>
                <h4 className="sig-name font-editorial">{blog.author.name}</h4>
                <p className="sig-desc">
                  Curating luxury vacations and bespoke VIP journeys for over 30 years at Comfort Journey (Est. 1992).
                </p>
              </div>
            </div>
          </article>

          {/* Sticky Related Tour & Concierge Sidebar */}
          <aside className="reader-sidebar">
            {/* Related Tour Package Card */}
            {relatedTour && (
              <div className="sidebar-tour-card glass-card">
                <div className="sidebar-kicker">
                  <Sparkles size={13} className="text-amber inline mr-1" />
                  <span>RECOMMENDED TOUR PACKAGE</span>
                </div>

                <div className="tour-thumb">
                  <img src={relatedTour.image} alt={relatedTour.name} />
                  <span className="tour-badge">{relatedTour.duration}</span>
                </div>

                <h4 className="tour-title font-editorial">{relatedTour.name}</h4>
                <p className="tour-tagline">{relatedTour.tagline}</p>

                <div className="compact-inclusions-icon-bar">
                  <div className="inc-icon-item" title="Verified Luxury Stay">
                    <div className="inc-svg-badge">
                      <Hotel size={13} className="text-amber" />
                    </div>
                    <span className="inc-text">Stay</span>
                  </div>
                  <div className="inc-icon-item" title="Private Sanitized Cabs">
                    <div className="inc-svg-badge">
                      <Car size={13} className="text-amber" />
                    </div>
                    <span className="inc-text">Transfers</span>
                  </div>
                  <div className="inc-icon-item" title="Meals Included">
                    <div className="inc-svg-badge">
                      <Utensils size={13} className="text-amber" />
                    </div>
                    <span className="inc-text">Meals</span>
                  </div>
                  <div className="inc-icon-item" title="Sightseeing Passes">
                    <div className="inc-svg-badge">
                      <Ticket size={13} className="text-amber" />
                    </div>
                    <span className="inc-text">Passes</span>
                  </div>
                </div>

                <div className="tour-pricing-row">
                  <div>
                    <span className="tour-starting">Starting from</span>
                    <span className="tour-price">{formatPrice(relatedTour.price)}</span>
                  </div>

                  <div className="tour-card-btns">
                    <button 
                      type="button" 
                      className="btn-tour-itinerary"
                      onClick={() => onSelectItinerary(relatedTour)}
                    >
                      Itinerary
                    </button>
                    <button 
                      type="button" 
                      className="btn-tour-book"
                      onClick={() => onBookNow(relatedTour)}
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Instant WhatsApp Concierge Box */}
            <div className="sidebar-concierge-card glass-card">
              <div className="concierge-icon-badge">
                <MessageCircle size={22} className="text-emerald" />
              </div>
              <h4 className="concierge-title font-editorial">Plan This Custom Trip</h4>
              <p className="concierge-desc">
                Chat with our senior travel curators on WhatsApp for custom dates, flight bookings, and 5-star hotel upgrades.
              </p>
              <a 
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sidebar-whatsapp"
              >
                <MessageCircle size={16} />
                <span>Chat on WhatsApp VIP Desk</span>
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .blog-reader-root {
          min-height: 100vh;
          background: #000B1D;
          color: #FFFFFF;
          font-family: var(--font-body);
          padding-bottom: 5rem;
        }

        .reader-top-bar {
          position: sticky;
          top: 0;
          z-index: 90;
          background: rgba(0, 18, 51, 0.9);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.85rem 0;
        }

        .reader-top-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .breadcrumbs {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8rem;
          color: #94A3B8;
        }

        .crumb-link {
          background: transparent;
          border: none;
          color: #CBD5E1;
          cursor: pointer;
          font-size: 0.8rem;
          padding: 0;
        }

        .crumb-link:hover {
          color: #FF892F;
        }

        .crumb-current {
          color: #FF892F;
          font-weight: 700;
        }

        .reader-top-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .btn-share-article {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.4rem 0.95rem;
          border-radius: 9999px;
          cursor: pointer;
        }

        .btn-whatsapp-inquiry {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #25D366;
          color: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.4rem 0.95rem;
          border-radius: 9999px;
          text-decoration: none;
        }

        /* Hero Banner */
        .reader-hero {
          position: relative;
          min-height: 480px;
          display: flex;
          align-items: flex-end;
          padding: 5rem 0 3.5rem 0;
          overflow: hidden;
        }

        .reader-hero-bg {
          position: absolute;
          inset: 0;
        }

        .reader-hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.45);
        }

        .reader-hero-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 11, 29, 0.2) 0%, rgba(0, 11, 29, 0.95) 100%);
        }

        .reader-hero-container {
          position: relative;
          z-index: 2;
          max-width: 920px;
        }

        .reader-cat-badge {
          display: inline-block;
          background: #FF892F;
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .reader-title {
          font-size: 2.85rem;
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1.2;
          margin-bottom: 1rem;
        }

        .reader-excerpt {
          font-size: 1.15rem;
          color: #CBD5E1;
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }

        .reader-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .author-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .author-img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid #FF892F;
        }

        .author-name {
          font-size: 0.95rem;
          font-weight: 800;
          color: #FFFFFF;
          display: block;
        }

        .author-role {
          font-size: 0.75rem;
          color: #6FE6FC;
        }

        .meta-stats {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.85rem;
          color: #94A3B8;
        }

        /* Layout Container */
        .reader-layout-container {
          padding-top: 3.5rem;
        }

        .reader-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2.5rem;
          align-items: start;
        }

        .reader-main-content {
          padding: 2.5rem 3rem;
          border-radius: 24px;
          background: rgba(0, 18, 51, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .reader-paragraph {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #E2E8F0;
          margin-bottom: 1.5rem;
        }

        .reader-h2 {
          font-size: 1.75rem;
          color: #FF892F;
          margin: 2.25rem 0 1rem 0;
          padding-top: 0.5rem;
        }

        .reader-h3 {
          font-size: 1.35rem;
          color: #6FE6FC;
          margin: 1.75rem 0 0.75rem 0;
        }

        .reader-blockquote {
          margin: 1.75rem 0;
          padding: 1.25rem 1.75rem;
          background: rgba(255, 137, 47, 0.08);
          border-left: 4px solid #FF892F;
          border-radius: 0 16px 16px 0;
          color: #F8FAFC;
          font-size: 1.02rem;
          line-height: 1.6;
        }

        .reader-list {
          list-style: none;
          margin: 1.25rem 0 1.5rem 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .reader-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 1rem;
          line-height: 1.6;
          color: #CBD5E1;
        }

        .list-dot {
          color: #FF892F;
          font-weight: bold;
        }

        .reader-divider {
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin: 2.5rem 0;
        }

        .reader-tags-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          padding-top: 1.75rem;
          margin-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .tags-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #94A3B8;
        }

        .tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .tag-pill {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #CBD5E1;
          font-size: 0.74rem;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
        }

        .author-signature-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-top: 2.5rem;
          padding: 1.5rem;
          border-radius: 16px;
          background: rgba(0, 29, 81, 0.4);
          border: 1px solid rgba(111, 230, 252, 0.2);
        }

        .sig-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 2px solid #FF892F;
          flex-shrink: 0;
        }

        .sig-name {
          font-size: 1.15rem;
          color: #FFFFFF;
          margin: 0 0 0.25rem 0;
        }

        .sig-desc {
          font-size: 0.84rem;
          color: #94A3B8;
          line-height: 1.5;
          margin: 0;
        }

        /* Sidebar Styles */
        .reader-sidebar {
          position: sticky;
          top: 5.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .sidebar-tour-card {
          padding: 1.5rem;
          border-radius: 20px;
          background: rgba(0, 18, 51, 0.8);
          border: 1px solid rgba(255, 137, 47, 0.3);
        }

        .sidebar-kicker {
          font-size: 0.7rem;
          font-weight: 800;
          color: #FF892F;
          letter-spacing: 0.08em;
          margin-bottom: 0.75rem;
        }

        .tour-thumb {
          position: relative;
          height: 140px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 0.85rem;
        }

        .tour-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .tour-badge {
          position: absolute;
          bottom: 0.5rem;
          left: 0.5rem;
          background: rgba(0, 18, 51, 0.85);
          border: 1px solid rgba(111, 230, 252, 0.3);
          color: #6FE6FC;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
        }

        .tour-title {
          font-size: 1.1rem;
          color: #FFFFFF;
          margin: 0 0 0.35rem 0;
        }

        .tour-tagline {
          font-size: 0.8rem;
          color: #94A3B8;
          line-height: 1.4;
          margin: 0 0 0.85rem 0;
        }

        .compact-inclusions-icon-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.25rem;
          margin-bottom: 1rem;
          padding: 0.4rem 0.55rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
        }

        .inc-icon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.15rem;
        }

        .inc-svg-badge {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .inc-text {
          font-size: 0.62rem;
          color: #94A3B8;
          font-weight: 600;
        }

        .tour-pricing-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .tour-starting {
          font-size: 0.68rem;
          color: #94A3B8;
          display: block;
        }

        .tour-price {
          font-size: 1.2rem;
          font-weight: 900;
          color: #FF892F;
        }

        .tour-card-btns {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .btn-tour-itinerary {
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          font-size: 0.74rem;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-tour-book {
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #FF892F, #E65100);
          border: none;
          color: #FFFFFF;
          font-size: 0.74rem;
          font-weight: 800;
          cursor: pointer;
        }

        .sidebar-concierge-card {
          padding: 1.5rem;
          border-radius: 20px;
          background: rgba(0, 18, 51, 0.8);
          border: 1px solid rgba(16, 185, 129, 0.3);
          text-align: center;
        }

        .concierge-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.75rem auto;
        }

        .concierge-title {
          font-size: 1.2rem;
          color: #FFFFFF;
          margin: 0 0 0.35rem 0;
        }

        .concierge-desc {
          font-size: 0.82rem;
          color: #CBD5E1;
          line-height: 1.5;
          margin: 0 0 1.15rem 0;
        }

        .btn-sidebar-whatsapp {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          width: 100%;
          background: #25D366;
          color: #FFFFFF;
          font-size: 0.82rem;
          font-weight: 800;
          padding: 0.65rem 1rem;
          border-radius: 9999px;
          text-decoration: none;
        }

        @media (max-width: 968px) {
          .reader-grid {
            grid-template-columns: 1fr;
          }
          .reader-main-content {
            padding: 1.75rem 1.5rem;
          }
          .reader-title {
            font-size: 2.1rem;
          }
        }
      `}</style>
    </div>
  );
}
