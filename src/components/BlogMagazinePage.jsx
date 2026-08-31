import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Clock, User, ArrowRight, ArrowLeft, Tag, Calendar, Globe, BookOpen, Share2 } from 'lucide-react';
import { directusService } from '../services/directusClient';
import { BLOG_CATEGORIES } from '../data/blogsData';

export default function BlogMagazinePage({ onNavigateHome, onSelectBlog, onOpenQuote }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [cmsStatus, setCmsStatus] = useState({ isOnline: false, url: '' });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Check Directus health
    directusService.checkHealth().then(status => {
      setCmsStatus(status);
    });

    // Fetch blogs
    directusService.fetchBlogs().then(data => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All Articles' || blog.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.tags && blog.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = blogs.find(b => b.featured) || blogs[0];
  const gridBlogs = filteredBlogs.filter(b => b.slug !== featuredBlog?.slug);

  return (
    <div className="blog-magazine-root">
      {/* Top Floating Navigation Header */}
      <div className="blog-top-bar">
        <div className="container blog-top-container">
          <button 
            type="button" 
            className="btn-back-home"
            onClick={onNavigateHome}
          >
            <ArrowLeft size={16} />
            <span>Back to Comfort Journey</span>
          </button>

          <div className="cms-status-indicator" title={`Directus API: ${cmsStatus.url}`}>
            <span className={`status-dot ${cmsStatus.isOnline ? 'online' : 'fallback'}`}></span>
            <span className="status-text">
              {cmsStatus.isOnline ? 'Directus CMS Live' : 'Directus Local/Fallback'}
            </span>
          </div>
        </div>
      </div>

      {/* Magazine Hero Title Header */}
      <header className="blog-hero-header">
        <div className="container text-center">
          <div className="blog-kicker animate-fade-in">
            <Sparkles size={15} className="text-amber inline mr-1" />
            <span>COMFORT JOURNEY TRAVEL JOURNAL & GUIDES</span>
          </div>
          <h1 className="blog-main-title font-editorial animate-fade-in-up">
            Stories, Guides & Curated Wanderlust
          </h1>
          <p className="blog-main-subline animate-fade-in-up delay-100">
            Handcrafted travel insights, luxury stay reviews, and insider secrets from 30+ years of royal hospitality.
          </p>

          {/* Instant Search Bar */}
          <div className="blog-search-wrapper animate-fade-in-up delay-200">
            <Search size={18} className="search-icon" />
            <input 
              type="text"
              placeholder="Search destinations, stays, itineraries (e.g. Kashmir, Bali, Honeymoon, Offsites)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog-search-input"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="blog-category-pills animate-fade-in-up delay-300">
            {BLOG_CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container blog-content-container">
        {loading ? (
          <div className="blog-loading-state">
            <div className="loading-spinner"></div>
            <p>Loading curated journal stories...</p>
          </div>
        ) : (
          <>
            {/* Featured Story Showcase (Only shown if on All Articles and no active search) */}
            {selectedCategory === 'All Articles' && !searchQuery && featuredBlog && (
              <div 
                className="featured-story-card glass-card animate-fade-in"
                onClick={() => onSelectBlog(featuredBlog.slug)}
              >
                <div className="featured-media">
                  <img src={featuredBlog.coverImage} alt={featuredBlog.title} />
                  <span className="featured-badge">⭐ FEATURED EDITORIAL</span>
                </div>
                <div className="featured-body">
                  <div className="meta-row">
                    <span className="meta-category">{featuredBlog.category}</span>
                    <span className="meta-readtime">
                      <Clock size={13} className="inline mr-1" />
                      {featuredBlog.readTime}
                    </span>
                  </div>
                  <h2 className="featured-title font-editorial">{featuredBlog.title}</h2>
                  <p className="featured-excerpt">{featuredBlog.excerpt}</p>
                  
                  <div className="featured-footer">
                    <div className="author-box">
                      <img src={featuredBlog.author.avatar} alt={featuredBlog.author.name} className="author-avatar" />
                      <div>
                        <span className="author-name">{featuredBlog.author.name}</span>
                        <span className="publish-date">{featuredBlog.publishedDate}</span>
                      </div>
                    </div>

                    <button type="button" className="btn-read-story">
                      <span>Read Story</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid */}
            <div className="articles-section-header">
              <h3 className="section-title font-editorial">
                {searchQuery ? `Search Results for "${searchQuery}" (${filteredBlogs.length})` : `${selectedCategory} (${filteredBlogs.length})`}
              </h3>
            </div>

            {filteredBlogs.length === 0 ? (
              <div className="no-blogs-card glass-card text-center">
                <BookOpen size={40} className="text-amber mb-3" style={{ margin: '0 auto' }} />
                <h4 className="font-editorial text-white text-xl">No articles found</h4>
                <p className="text-muted text-sm mt-1">Try searching for different keywords like "Kashmir", "Bali", or "Solo".</p>
              </div>
            ) : (
              <div className="articles-grid">
                {(selectedCategory === 'All Articles' && !searchQuery ? gridBlogs : filteredBlogs).map((blog) => (
                  <article 
                    key={blog.id} 
                    className="article-card glass-card"
                    onClick={() => onSelectBlog(blog.slug)}
                  >
                    <div className="article-media">
                      <img src={blog.coverImage} alt={blog.title} loading="lazy" />
                      <span className="article-cat-badge">{blog.category}</span>
                    </div>

                    <div className="article-body">
                      <div className="article-meta">
                        <span className="meta-date">
                          <Calendar size={12} className="inline mr-1 text-amber" />
                          {blog.publishedDate}
                        </span>
                        <span className="meta-time">
                          <Clock size={12} className="inline mr-1 text-cyan" />
                          {blog.readTime}
                        </span>
                      </div>

                      <h3 className="article-title font-editorial">{blog.title}</h3>
                      <p className="article-excerpt">{blog.excerpt}</p>

                      <div className="article-footer">
                        <div className="article-author">
                          <img src={blog.author.avatar} alt={blog.author.name} className="author-mini-avatar" />
                          <span className="author-mini-name">{blog.author.name}</span>
                        </div>

                        <span className="read-more-link">
                          <span>Read</span>
                          <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* STYLES */}
      <style>{`
        .blog-magazine-root {
          min-height: 100vh;
          background: #000B1D;
          color: #FFFFFF;
          font-family: var(--font-body);
          padding-bottom: 5rem;
        }

        .blog-top-bar {
          position: sticky;
          top: 0;
          z-index: 90;
          background: rgba(0, 18, 51, 0.88);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.85rem 0;
        }

        .blog-top-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .btn-back-home {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #E2E8F0;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.45rem 1rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-back-home:hover {
          background: #FF892F;
          border-color: #FF892F;
          color: #FFFFFF;
        }

        .cms-status-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(0, 18, 51, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.76rem;
          color: #CBD5E1;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-dot.online {
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
        }

        .status-dot.fallback {
          background: #F59E0B;
          box-shadow: 0 0 8px #F59E0B;
        }

        /* Hero Header */
        .blog-hero-header {
          padding: 3.5rem 0 2.5rem 0;
          background: radial-gradient(circle at 50% 20%, rgba(0, 29, 81, 0.6) 0%, rgba(0, 11, 29, 0.95) 80%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .blog-kicker {
          font-size: 0.78rem;
          font-weight: 800;
          color: #FF892F;
          letter-spacing: 0.12em;
          margin-bottom: 0.65rem;
        }

        .blog-main-title {
          font-size: 3rem;
          font-weight: 900;
          color: #FFFFFF;
          margin: 0 0 0.85rem 0;
          line-height: 1.15;
        }

        .blog-main-subline {
          font-size: 1.1rem;
          color: #94A3B8;
          max-width: 680px;
          margin: 0 auto 2rem auto;
          line-height: 1.6;
        }

        .blog-search-wrapper {
          max-width: 600px;
          margin: 0 auto 1.5rem auto;
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 1.25rem;
          color: #94A3B8;
          pointer-events: none;
        }

        .blog-search-input {
          width: 100%;
          background: rgba(0, 18, 51, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          padding: 0.9rem 3rem 0.9rem 3rem;
          border-radius: 9999px;
          font-size: 0.92rem;
          outline: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .blog-search-input:focus {
          border-color: #FF892F;
          box-shadow: 0 0 20px rgba(255, 137, 47, 0.35);
        }

        .clear-search-btn {
          position: absolute;
          right: 1.25rem;
          background: transparent;
          border: none;
          color: #94A3B8;
          font-size: 0.78rem;
          cursor: pointer;
        }

        .blog-category-pills {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.55rem;
        }

        .category-pill {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #CBD5E1;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.45rem 1.15rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .category-pill:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
        }

        .category-pill.active {
          background: #FF892F;
          border-color: #FF892F;
          color: #FFFFFF;
          box-shadow: 0 4px 15px rgba(255, 137, 47, 0.35);
        }

        /* Content Container */
        .blog-content-container {
          padding-top: 3rem;
        }

        .featured-story-card {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          border-radius: 24px;
          overflow: hidden;
          background: rgba(0, 29, 81, 0.4);
          border: 1px solid rgba(255, 137, 47, 0.3);
          margin-bottom: 3.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .featured-story-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
          border-color: #FF892F;
        }

        .featured-media {
          position: relative;
          min-height: 340px;
        }

        .featured-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .featured-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: #FF892F;
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.3rem 0.75rem;
          border-radius: 9999px;
        }

        .featured-body {
          padding: 2.25rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.25rem;
        }

        .meta-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .meta-category {
          font-size: 0.75rem;
          font-weight: 800;
          color: #6FE6FC;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .meta-readtime {
          font-size: 0.78rem;
          color: #94A3B8;
        }

        .featured-title {
          font-size: 1.85rem;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.25;
          margin: 0;
        }

        .featured-excerpt {
          font-size: 0.95rem;
          color: #CBD5E1;
          line-height: 1.6;
          margin: 0;
        }

        .featured-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .author-box {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .author-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid #FF892F;
        }

        .author-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: #FFFFFF;
          display: block;
        }

        .publish-date {
          font-size: 0.74rem;
          color: #94A3B8;
        }

        .btn-read-story {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.55rem 1.15rem;
          border-radius: 9999px;
          cursor: pointer;
        }

        /* Articles Grid */
        .articles-section-header {
          margin-bottom: 1.5rem;
        }

        .section-title {
          font-size: 1.6rem;
          color: #FFFFFF;
          margin: 0;
        }

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.75rem;
        }

        .article-card {
          border-radius: 20px;
          overflow: hidden;
          background: rgba(0, 18, 51, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .article-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 137, 47, 0.4);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }

        .article-media {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .article-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .article-card:hover .article-media img {
          transform: scale(1.05);
        }

        .article-cat-badge {
          position: absolute;
          top: 0.85rem;
          left: 0.85rem;
          background: rgba(0, 18, 51, 0.85);
          border: 1px solid rgba(111, 230, 252, 0.3);
          color: #6FE6FC;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          backdrop-filter: blur(8px);
        }

        .article-body {
          padding: 1.35rem 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: space-between;
          gap: 0.85rem;
        }

        .article-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.74rem;
          color: #94A3B8;
        }

        .article-title {
          font-size: 1.22rem;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.35;
          margin: 0;
        }

        .article-excerpt {
          font-size: 0.85rem;
          color: #94A3B8;
          line-height: 1.55;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .article-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .article-author {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .author-mini-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }

        .author-mini-name {
          font-size: 0.76rem;
          color: #CBD5E1;
          font-weight: 600;
        }

        .read-more-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: #FF892F;
        }

        .no-blogs-card {
          padding: 3.5rem 2rem;
          border-radius: 20px;
          background: rgba(0, 18, 51, 0.5);
          border: 1px dashed rgba(255, 255, 255, 0.15);
        }

        @media (max-width: 868px) {
          .featured-story-card {
            grid-template-columns: 1fr;
          }
          .blog-main-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </div>
  );
}
