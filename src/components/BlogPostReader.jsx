import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, Share2, MessageCircle, Sparkles, MapPin, CheckCircle2, ChevronRight, Bookmark, ThumbsUp, Hotel, Car, Utensils, Ticket, ShieldCheck } from 'lucide-react';
import { directusService } from '../services/directusClient';
import { TOURS_DATA } from '../data/toursData';
import { useCurrency } from '../context/CurrencyContext';
import { seoHeadManager } from '../utils/seoHeadManager';
import { jsonLdSchemaGenerator } from '../utils/jsonLdSchemaGenerator';
import { RenderRichArticleContent } from '../utils/contentParser';

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

      // Inject dynamic SEO meta tags, OpenGraph & JSON-LD BlogPosting Schema
      if (data) {
        const schema = jsonLdSchemaGenerator.getBlogPostingSchema(data);
        seoHeadManager.updateMetadata({
          title: data.seo?.metaTitle || `${data.title} | Comfort Journey`,
          description: data.seo?.metaDescription || data.excerpt,
          image: data.coverImage,
          url: `/#/blog/${data.slug}`,
          type: "article",
          keywords: Array.isArray(data.tags) ? data.tags.join(', ') : (data.tags || "Travel, Luxury Stays"),
          schema
        });
      }
    });

    return () => {
      seoHeadManager.resetToDefault();
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

  // Find related tour package and hybrid suggested tours (M2M or Automated Tag Fallback)
  const relatedTour = TOURS_DATA.find(t => t.id === blog.relatedTourId) || TOURS_DATA[0];
  const suggestedTours = directusService.getSuggestedToursForBlog(blog, TOURS_DATA);

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
            <RenderRichArticleContent content={blog.content} imageAlt={blog.title} />

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

            {/* Author Footer Bio */}
            <div className="reader-author-bio-card">
              <img src={blog.author.avatar} alt={blog.author.name} className="bio-avatar" />
              <div className="bio-info">
                <h4 className="bio-name">{blog.author.name}</h4>
                <p className="bio-role">{blog.author.role} • Comfort Journey</p>
                <p className="bio-desc">
                  Curating luxury, bespoke, and transparent journeys since 1992. Specializing in off-beat stays, royal heritage houseboats, and seamless mountain expeditions.
                </p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="reader-sidebar">
            {/* Recommended Tour Widget */}
            {relatedTour && (
              <div className="sidebar-tour-card glass-card">
                <div className="tour-card-header">
                  <span className="tour-badge-pill">Recommended Package</span>
                  <span className="tour-duration-pill">{relatedTour.duration}</span>
                </div>

                <div className="tour-card-media">
                  <img src={relatedTour.image} alt={relatedTour.name} />
                  <div className="tour-media-scrim"></div>
                  <div className="tour-media-loc">
                    <MapPin size={13} className="inline mr-1 text-amber" />
                    {relatedTour.location}
                  </div>
                </div>

                <h4 className="tour-card-title font-editorial">{relatedTour.name}</h4>
                <p className="tour-card-tagline">{relatedTour.tagline}</p>

                <div className="tour-inclusions-grid">
                  <div className="inc-item">
                    <div className="inc-svg-badge">
                      <Hotel size={13} className="text-amber" />
                    </div>
                    <span className="inc-text">5-Star</span>
                  </div>
                  <div className="inc-item">
                    <div className="inc-svg-badge">
                      <Car size={13} className="text-cyan" />
                    </div>
                    <span className="inc-text">Cab</span>
                  </div>
                  <div className="inc-item">
                    <div className="inc-svg-badge">
                      <Utensils size={13} className="text-emerald" />
                    </div>
                    <span className="inc-text">Meals</span>
                  </div>
                  <div className="inc-item">
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

      {/* Suggested Tour Packages Section (Hybrid M2M + Automated Tag Matching) */}
      {suggestedTours && suggestedTours.length > 0 && (
        <section className="suggested-tours-section">
          <div className="container">
            <div className="suggested-header">
              <div className="suggested-pill">
                <Sparkles size={14} className="text-amber" />
                <span>Handcrafted Trips Inspired by This Guide</span>
              </div>
              <h2 className="suggested-title font-editorial">
                Curated Experiences You Can Book Today
              </h2>
              <p className="suggested-sub">
                Seamlessly transition from reading to experiencing. Hand-picked stays, verified private chauffeurs, and 24/7 dedicated support.
              </p>
            </div>

            <div className="suggested-cards-grid">
              {suggestedTours.map((tour) => (
                <div key={tour.id} className="suggested-tour-card glass-card">
                  <div className="suggested-card-media">
                    <img src={tour.image} alt={tour.name} loading="lazy" />
                    <span className="suggested-duration-badge">
                      <Clock size={12} className="inline mr-1" />
                      {tour.duration}
                    </span>
                    {tour.badge && (
                      <span className="suggested-vibe-badge">{tour.badge}</span>
                    )}
                  </div>

                  <div className="suggested-card-body">
                    <div className="suggested-loc-row">
                      <MapPin size={13} className="text-amber" />
                      <span>{tour.location}</span>
                      <span className="loc-dot">•</span>
                      <span className="text-cyan">{tour.category}</span>
                    </div>

                    <h3 className="suggested-card-name font-editorial">{tour.name}</h3>
                    <p className="suggested-card-tagline">{tour.tagline}</p>

                    {/* Micro Inclusions Strip */}
                    <div className="suggested-inclusions-strip">
                      <span className="inc-pill"><Hotel size={12} /> Stay</span>
                      <span className="inc-pill"><Car size={12} /> Transfers</span>
                      <span className="inc-pill"><Utensils size={12} /> Meals</span>
                      <span className="inc-pill"><ShieldCheck size={12} /> 24/7 VIP</span>
                    </div>

                    <div className="suggested-card-footer">
                      <div className="suggested-pricing">
                        <span className="price-label">Starting From</span>
                        <div className="price-val-row">
                          <span className="price-current">{formatPrice(tour.price)}</span>
                          {tour.origPrice && tour.origPrice > tour.price && (
                            <span className="price-strikethrough">{formatPrice(tour.origPrice)}</span>
                          )}
                        </div>
                      </div>

                      <div className="suggested-actions">
                        <button 
                          type="button" 
                          className="btn-suggested-itinerary"
                          onClick={() => onSelectItinerary(tour)}
                        >
                          Itinerary
                        </button>
                        <button 
                          type="button" 
                          className="btn-suggested-book"
                          onClick={() => onBookNow(tour)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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

        /* ── Suggested Tour Packages Section ── */
        .suggested-tours-section {
          margin-top: 5rem;
          padding-top: 4rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .suggested-header {
          text-align: center;
          max-width: 750px;
          margin: 0 auto 3rem auto;
        }

        .suggested-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 137, 47, 0.12);
          border: 1px solid rgba(255, 137, 47, 0.3);
          border-radius: 9999px;
          padding: 0.35rem 1rem;
          font-size: 0.8rem;
          font-weight: 800;
          color: #FF892F;
          margin-bottom: 0.75rem;
        }

        .suggested-title {
          font-size: 2.25rem;
          color: #FFFFFF;
          margin: 0 0 0.75rem 0;
        }

        .suggested-sub {
          font-size: 0.95rem;
          color: #94A3B8;
          line-height: 1.6;
          margin: 0;
        }

        .suggested-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        .suggested-tour-card {
          border-radius: 18px;
          overflow: hidden;
          background: rgba(0, 18, 51, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, box-shadow 0.3s;
        }

        .suggested-tour-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 137, 47, 0.4);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(255, 137, 47, 0.15);
        }

        .suggested-card-media {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .suggested-card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .suggested-tour-card:hover .suggested-card-media img {
          transform: scale(1.06);
        }

        .suggested-duration-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(0, 11, 29, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .suggested-vibe-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(135deg, #FF892F, #E65100);
          color: #FFFFFF;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .suggested-card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .suggested-loc-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: #CBD5E1;
          margin-bottom: 0.5rem;
        }

        .suggested-card-name {
          font-size: 1.35rem;
          color: #FFFFFF;
          margin: 0 0 0.5rem 0;
          line-height: 1.25;
        }

        .suggested-card-tagline {
          font-size: 0.84rem;
          color: #94A3B8;
          line-height: 1.5;
          margin: 0 0 1rem 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .suggested-inclusions-strip {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }

        .inc-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          padding: 0.2rem 0.5rem;
          font-size: 0.72rem;
          color: #CBD5E1;
        }

        .suggested-card-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          gap: 0.75rem;
        }

        .price-label {
          display: block;
          font-size: 0.68rem;
          color: #94A3B8;
          text-transform: uppercase;
        }

        .price-val-row {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
        }

        .price-current {
          font-size: 1.25rem;
          font-weight: 900;
          color: #FF892F;
        }

        .price-strikethrough {
          font-size: 0.82rem;
          color: #64748B;
          text-decoration: line-through;
        }

        .suggested-actions {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .btn-suggested-itinerary {
          padding: 0.45rem 0.85rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-suggested-itinerary:hover {
          background: rgba(255, 255, 255, 0.14);
        }

        .btn-suggested-book {
          padding: 0.45rem 0.95rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #FF892F, #E65100);
          border: none;
          color: #FFFFFF;
          font-size: 0.76rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-suggested-book:hover {
          box-shadow: 0 4px 14px rgba(255, 137, 47, 0.4);
          transform: scale(1.03);
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
          .suggested-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
