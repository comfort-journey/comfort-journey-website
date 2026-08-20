import React, { useState } from 'react';
import { X, Sparkles, CheckCircle, AlertCircle, FileText, Globe, Search, Share2, Plus, Trash2, Eye, Lock, RefreshCw, LayoutDashboard } from 'lucide-react';

export default function AdminCMSModal({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('blog'); // 'blog', 'tour', 'seo-preview'

  // Blog Post State
  const [blogTitle, setBlogTitle] = useState('Top 7 Luxury Stays in Kashmir You Must Experience in 2026');
  const [focusKeyword, setFocusKeyword] = useState('luxury stays in kashmir');
  const [metaDescription, setMetaDescription] = useState('Discover the finest 5-star carved wooden houseboats on Dal Lake and pine chalets in Gulmarg. Complete luxury travel guide by Comfort Journey.');
  const [blogContent, setBlogContent] = useState(`Kashmir has long been celebrated as paradise on earth. But for discerning luxury travelers, the experience elevates to royal grandeur when combined with private shikara cruises, 5-star heritage houseboats on Dal Lake, and heated alpine chalets overlooking snow-draped Gulmarg peaks.

In this guide, Comfort Journey's senior trip curators review the top luxury stays in Kashmir for 2026, complete with private butler services and authentic Wazwan gourmet dining.`);
  const [postCategory, setPostCategory] = useState('Destination Guides');
  const [isSaved, setIsSaved] = useState(false);

  // New Tour Package State
  const [tourName, setTourName] = useState('');
  const [tourRegion, setTourRegion] = useState('India');
  const [tourDuration, setTourDuration] = useState('6 Days');
  const [tourPrice, setTourPrice] = useState(24999);
  const [tourDays, setTourDays] = useState([
    { day: 1, title: 'Arrival & Welcome Dinner', desc: 'VIP airport transfer and hotel check-in.' }
  ]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'comfort1992' || passwordInput === 'admin' || passwordInput === '1234') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect VIP Access Code. (Use comfort1992)');
    }
  };

  // Live SEO & GEO Score Calculation (0 - 100)
  const calculateSeoScore = () => {
    let score = 0;
    const kw = focusKeyword.toLowerCase().trim();
    const title = blogTitle.toLowerCase();
    const desc = metaDescription.toLowerCase();
    const content = blogContent.toLowerCase();

    // Title length (50-60 chars is optimal)
    if (blogTitle.length >= 40 && blogTitle.length <= 65) score += 20;
    else if (blogTitle.length > 20) score += 10;

    // Meta Description length (140-160 chars)
    if (metaDescription.length >= 120 && metaDescription.length <= 165) score += 20;
    else if (metaDescription.length > 50) score += 10;

    // Keyword in Title
    if (kw && title.includes(kw)) score += 20;

    // Keyword in Meta Description
    if (kw && desc.includes(kw)) score += 20;

    // Keyword in Content Body & Content length (> 100 words)
    const wordCount = blogContent.split(/\s+/).filter(Boolean).length;
    if (kw && content.includes(kw)) score += 10;
    if (wordCount >= 50) score += 10;

    return Math.min(score, 100);
  };

  const seoScore = calculateSeoScore();

  const handleAiAutoGenerateSeo = () => {
    setBlogTitle('Ultimate Kashmir Luxury Tour Guide: 5-Star Houseboats & Gulmarg Gondola 2026');
    setFocusKeyword('kashmir luxury tour');
    setMetaDescription('Plan your dream Kashmir luxury tour with Comfort Journey. Handpicked 5-star Dal Lake houseboats, Gondola VIP passes, and 24/7 personal concierge since 1992.');
  };

  const addItineraryDay = () => {
    setTourDays([
      ...tourDays,
      { day: tourDays.length + 1, title: `Day ${tourDays.length + 1} Sightseeing`, desc: 'Private guided excursions and evening leisure.' }
    ]);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content admin-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="admin-header">
          <div className="admin-title-row">
            <LayoutDashboard size={22} className="text-amber" />
            <div>
              <h2 className="admin-title">Comfort Journey — Marketing & Content CMS</h2>
              <span className="admin-subtitle">Live Blog Publishing, 0–100 SEO / GEO Analyzer & Tour Manager</span>
            </div>
          </div>
          <button className="admin-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Login Screen */
          <div className="admin-auth-box">
            <div className="lock-icon-circle">
              <Lock size={32} className="text-amber" />
            </div>
            <h3>Marketing Team Portal</h3>
            <p>Enter your team passcode to access the Word-like blog editor, AI SEO generator, and package manager.</p>

            <form onSubmit={handleLogin} className="auth-form">
              <input
                type="password"
                placeholder="Enter Passcode (e.g. comfort1992)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
              />
              {authError && <p className="auth-error-msg">{authError}</p>}
              <button type="submit" className="btn-primary w-full">
                Unlock Admin Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* CMS Dashboard */
          <div className="cms-workspace">
            {/* Tabs */}
            <div className="cms-nav-tabs">
              <button
                className={`cms-tab-btn ${activeTab === 'blog' ? 'active' : ''}`}
                onClick={() => setActiveTab('blog')}
              >
                <FileText size={16} />
                <span>Word/Notion Blog Editor</span>
              </button>
              <button
                className={`cms-tab-btn ${activeTab === 'tour' ? 'active' : ''}`}
                onClick={() => setActiveTab('tour')}
              >
                <Plus size={16} />
                <span>Add Tour Package</span>
              </button>
              <button
                className={`cms-tab-btn ${activeTab === 'seo-preview' ? 'active' : ''}`}
                onClick={() => setActiveTab('seo-preview')}
              >
                <Search size={16} />
                <span>Live Google & Social Preview</span>
              </button>
            </div>

            {/* TAB 1: Blog Post Editor with Live SEO Analyzer */}
            {activeTab === 'blog' && (
              <div className="cms-editor-grid">
                {/* Left: Rich Editor */}
                <div className="editor-left-pane">
                  <div className="field-group">
                    <label>Blog Article Headline (H1)</label>
                    <input
                      type="text"
                      className="cms-input title-input"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="e.g. 10 Best Places to Visit in Bali for Couples in 2026"
                    />
                  </div>

                  <div className="editor-toolbar">
                    <button type="button" className="tool-btn" title="Bold"><strong>B</strong></button>
                    <button type="button" className="tool-btn" title="Italic"><em>I</em></button>
                    <button type="button" className="tool-btn" title="Heading 2">H2</button>
                    <button type="button" className="tool-btn" title="Heading 3">H3</button>
                    <button type="button" className="tool-btn" title="Bullet List">• List</button>
                    <button type="button" className="tool-btn" title="Insert Media">🖼️ Image</button>
                    <span className="word-counter">{blogContent.split(/\s+/).filter(Boolean).length} Words</span>
                  </div>

                  <div className="field-group">
                    <label>Article Content (Word/Notion Markdown Format)</label>
                    <textarea
                      rows={9}
                      className="cms-textarea"
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                    />
                  </div>

                  <div className="field-group">
                    <label>Category Tag</label>
                    <select
                      className="cms-select"
                      value={postCategory}
                      onChange={(e) => setPostCategory(e.target.value)}
                    >
                      <option value="Destination Guides">Destination Guides</option>
                      <option value="Luxury Travel Tips">Luxury Travel Tips</option>
                      <option value="Honeymoon Special">Honeymoon Special</option>
                      <option value="Char Dham Spiritual">Char Dham Spiritual</option>
                    </select>
                  </div>
                </div>

                {/* Right: Live SEO & GEO Analyzer Meter */}
                <div className="editor-right-pane glass-card">
                  <div className="seo-meter-header">
                    <div className="meter-label-row">
                      <span className="meter-title">Yoast & GEO SEO Score</span>
                      <strong className={`score-badge ${seoScore >= 80 ? 'good' : seoScore >= 50 ? 'avg' : 'poor'}`}>
                        {seoScore} / 100
                      </strong>
                    </div>

                    <div className="score-progress-bar">
                      <div
                        className={`progress-fill ${seoScore >= 80 ? 'good-bg' : seoScore >= 50 ? 'avg-bg' : 'poor-bg'}`}
                        style={{ width: `${seoScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* AI 1-Click Auto Optimize Button */}
                  <button
                    type="button"
                    className="btn-ai-glow w-full ai-auto-btn"
                    onClick={handleAiAutoGenerateSeo}
                  >
                    <Sparkles size={16} />
                    <span>1-Click AI SEO Auto-Tune</span>
                  </button>

                  {/* Focus Keyword */}
                  <div className="field-group">
                    <label>Focus Target Keyword</label>
                    <input
                      type="text"
                      className="cms-input"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="e.g. luxury stays in kashmir"
                    />
                  </div>

                  {/* Meta Description */}
                  <div className="field-group">
                    <div className="label-with-count">
                      <label>Meta Description (Search Snippet)</label>
                      <span className={metaDescription.length >= 120 && metaDescription.length <= 165 ? 'text-emerald' : 'text-amber'}>
                        {metaDescription.length}/160 chars
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      className="cms-textarea small"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                    />
                  </div>

                  {/* Live Checklist */}
                  <div className="seo-checklist">
                    <div className="check-item">
                      {blogTitle.length >= 40 && blogTitle.length <= 65 ? (
                        <CheckCircle size={15} className="text-emerald" />
                      ) : (
                        <AlertCircle size={15} className="text-amber" />
                      )}
                      <span>Meta Title length is optimal ({blogTitle.length}/60)</span>
                    </div>

                    <div className="check-item">
                      {metaDescription.length >= 120 && metaDescription.length <= 165 ? (
                        <CheckCircle size={15} className="text-emerald" />
                      ) : (
                        <AlertCircle size={15} className="text-amber" />
                      )}
                      <span>Meta Description length is ideal ({metaDescription.length}/160)</span>
                    </div>

                    <div className="check-item">
                      {blogTitle.toLowerCase().includes(focusKeyword.toLowerCase()) ? (
                        <CheckCircle size={15} className="text-emerald" />
                      ) : (
                        <AlertCircle size={15} className="text-amber" />
                      )}
                      <span>Focus keyword appears in H1 Title</span>
                    </div>

                    <div className="check-item">
                      {metaDescription.toLowerCase().includes(focusKeyword.toLowerCase()) ? (
                        <CheckCircle size={15} className="text-emerald" />
                      ) : (
                        <AlertCircle size={15} className="text-amber" />
                      )}
                      <span>Focus keyword included in Meta Description</span>
                    </div>
                  </div>

                  {/* Publish Actions */}
                  <div className="cms-publish-actions">
                    <button
                      className="btn-primary w-full"
                      onClick={() => {
                        setIsSaved(true);
                        setTimeout(() => setIsSaved(false), 3000);
                      }}
                    >
                      {isSaved ? '✅ Published Live!' : '🚀 Publish Article Live'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Tour Package Creator */}
            {activeTab === 'tour' && (
              <div className="tour-form-pane">
                <div className="form-two-cols">
                  <div className="field-group">
                    <label>Tour Package Name</label>
                    <input
                      type="text"
                      className="cms-input"
                      placeholder="e.g. Royal Rajasthan Palaces & Desert Safari"
                      value={tourName}
                      onChange={(e) => setTourName(e.target.value)}
                    />
                  </div>

                  <div className="field-group">
                    <label>Destination Region</label>
                    <select
                      className="cms-select"
                      value={tourRegion}
                      onChange={(e) => setTourRegion(e.target.value)}
                    >
                      <option value="India">India (National)</option>
                      <option value="Asia">Asia (International)</option>
                      <option value="Europe">Europe (International)</option>
                      <option value="Africa">Africa</option>
                      <option value="Americas">Americas</option>
                    </select>
                  </div>
                </div>

                <div className="form-two-cols">
                  <div className="field-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      className="cms-input"
                      value={tourDuration}
                      onChange={(e) => setTourDuration(e.target.value)}
                      placeholder="e.g. 5 Nights / 6 Days"
                    />
                  </div>

                  <div className="field-group">
                    <label>Starting Price (INR ₹)</label>
                    <input
                      type="number"
                      className="cms-input"
                      value={tourPrice}
                      onChange={(e) => setTourPrice(e.target.value)}
                    />
                  </div>
                </div>

                {/* Day-Wise Itinerary Creator */}
                <div className="itinerary-builder-block">
                  <div className="itinerary-header-row">
                    <label>Day-Wise Itinerary Plan ({tourDays.length} Days)</label>
                    <button type="button" className="add-day-btn" onClick={addItineraryDay}>
                      <Plus size={14} /> Add Next Day
                    </button>
                  </div>

                  {tourDays.map((d, idx) => (
                    <div key={idx} className="day-edit-row">
                      <span className="day-num-tag">Day {d.day}</span>
                      <input
                        type="text"
                        className="cms-input"
                        placeholder="Day Title (e.g. Srinagar Arrival & Dal Lake Shikara)"
                        value={d.title}
                        onChange={(e) => {
                          const updated = [...tourDays];
                          updated[idx].title = e.target.value;
                          setTourDays(updated);
                        }}
                      />
                      <textarea
                        rows={2}
                        className="cms-textarea small"
                        placeholder="Day Schedule description (Morning/Afternoon/Evening)"
                        value={d.desc}
                        onChange={(e) => {
                          const updated = [...tourDays];
                          updated[idx].desc = e.target.value;
                          setTourDays(updated);
                        }}
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => alert(`Package "${tourName || 'New Package'}" created successfully in catalog!`)}
                >
                  Save & Publish Tour Package
                </button>
              </div>
            )}

            {/* TAB 3: Google & WhatsApp Preview */}
            {activeTab === 'seo-preview' && (
              <div className="preview-pane">
                <h3>Google Search Snippet Preview</h3>
                <div className="google-preview-card">
                  <span className="google-url">https://www.comfortjourneyy.com › blogs › {focusKeyword.replace(/\s+/g, '-')}</span>
                  <h4 className="google-title">{blogTitle} | Comfort Journey Since 1992</h4>
                  <p className="google-desc">{metaDescription}</p>
                </div>

                <h3 className="mt-6">WhatsApp / Social Share Card Preview</h3>
                <div className="social-preview-card">
                  <div className="social-thumb-mock">
                    <img src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=400&q=80" alt="Preview" />
                  </div>
                  <div className="social-info">
                    <span className="social-domain">COMFORTJOURNEYY.COM</span>
                    <h4 className="social-title">{blogTitle}</h4>
                    <p className="social-desc">{metaDescription}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .admin-modal-content {
          max-width: 980px;
          padding: 2rem;
        }

        .admin-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--cj-glass-border);
          margin-bottom: 1.5rem;
        }

        .admin-title-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .admin-title {
          font-family: var(--font-ui);
          font-size: 1.35rem;
          color: #FFFFFF;
        }

        .admin-subtitle {
          font-size: 0.8rem;
          color: #94A3B8;
        }

        .admin-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          color: #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Auth Screen */
        .admin-auth-box {
          text-align: center;
          padding: 3.5rem 1.5rem;
          max-width: 440px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .lock-icon-circle {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: rgba(255, 107, 0, 0.15);
          border: 1px solid rgba(255, 107, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-auth-box h3 {
          font-family: var(--font-ui);
          font-size: 1.45rem;
          color: #FFFFFF;
        }

        .admin-auth-box p {
          color: #94A3B8;
          font-size: 0.88rem;
        }

        .auth-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .auth-form input {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid var(--cj-glass-border);
          color: #FFFFFF;
          font-family: var(--font-ui);
          text-align: center;
          font-size: 1rem;
        }

        .auth-error-msg {
          color: #EF4444;
          font-size: 0.82rem;
          font-weight: 700;
        }

        /* CMS Workspace */
        .cms-nav-tabs {
          display: flex;
          gap: 0.65rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 0.75rem;
        }

        .cms-tab-btn {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.6rem 1.1rem;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.05);
          color: #CBD5E1;
          font-family: var(--font-ui);
          font-size: 0.85rem;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .cms-tab-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
        }

        .cms-tab-btn.active {
          background: var(--cj-amber-500);
          color: #FFFFFF;
        }

        .cms-editor-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 1.5rem;
        }

        .editor-left-pane {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .field-group label {
          font-family: var(--font-ui);
          font-size: 0.78rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #94A3B8;
        }

        .label-with-count {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 800;
        }

        .cms-input, .cms-select, .cms-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--cj-glass-border);
          color: #FFFFFF;
          font-family: var(--font-body);
          font-size: 0.9rem;
          outline: none;
        }

        .title-input {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 700;
        }

        .cms-textarea {
          resize: vertical;
          line-height: 1.6;
        }

        .cms-textarea.small {
          font-size: 0.82rem;
        }

        .editor-toolbar {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.06);
          padding: 0.4rem 0.65rem;
          border-radius: var(--radius-sm);
        }

        .tool-btn {
          padding: 0.3rem 0.6rem;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-xs);
          color: #E2E8F0;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .tool-btn:hover {
          background: var(--cj-amber-500);
          color: #FFFFFF;
        }

        .word-counter {
          margin-left: auto;
          font-size: 0.75rem;
          color: #94A3B8;
          font-weight: 700;
        }

        /* SEO Pane */
        .editor-right-pane {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          background: rgba(19, 29, 51, 0.9);
        }

        .seo-meter-header {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .meter-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .meter-title {
          font-family: var(--font-ui);
          font-size: 0.95rem;
          font-weight: 800;
          color: #FFFFFF;
        }

        .score-badge {
          font-family: var(--font-ui);
          font-size: 0.9rem;
          font-weight: 900;
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
        }

        .score-badge.good { background: rgba(16, 185, 129, 0.2); color: #10B981; }
        .score-badge.avg { background: rgba(255, 184, 0, 0.2); color: #FFB800; }
        .score-badge.poor { background: rgba(239, 68, 68, 0.2); color: #EF4444; }

        .score-progress-bar {
          width: 100%;
          height: 7px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          transition: width 0.3s ease;
        }

        .good-bg { background: #10B981; }
        .avg-bg { background: #FFB800; }
        .poor-bg { background: #EF4444; }

        .ai-auto-btn {
          font-size: 0.82rem;
          padding: 0.6rem 1rem;
        }

        .seo-checklist {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          background: rgba(0, 0, 0, 0.25);
          padding: 0.85rem;
          border-radius: var(--radius-sm);
        }

        .check-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: #E2E8F0;
        }

        /* Tour Form */
        .tour-form-pane {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-two-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .itinerary-builder-block {
          background: rgba(0, 0, 0, 0.25);
          padding: 1.25rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .itinerary-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .itinerary-header-row label {
          font-family: var(--font-ui);
          font-size: 0.85rem;
          font-weight: 800;
          color: #FFFFFF;
        }

        .add-day-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(255, 107, 0, 0.18);
          color: var(--cj-amber-500);
          border: 1px solid rgba(255, 107, 0, 0.35);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          font-family: var(--font-ui);
          font-size: 0.78rem;
          font-weight: 700;
        }

        .day-edit-row {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.04);
          padding: 0.75rem;
          border-radius: var(--radius-sm);
        }

        .day-num-tag {
          font-family: var(--font-ui);
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--cj-gold-500);
          text-transform: uppercase;
        }

        /* Preview Tab */
        .preview-pane {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .preview-pane h3 {
          font-family: var(--font-ui);
          font-size: 1.1rem;
          color: #FFFFFF;
        }

        .google-preview-card {
          background: #FFFFFF;
          color: #202124;
          padding: 1.25rem;
          border-radius: 8px;
          max-width: 650px;
        }

        .google-url {
          font-size: 0.8rem;
          color: #202124;
          display: block;
          margin-bottom: 0.2rem;
        }

        .google-title {
          font-family: Arial, sans-serif;
          font-size: 1.15rem;
          color: #1a0dab;
          font-weight: 400;
          line-height: 1.3;
          margin-bottom: 0.35rem;
        }

        .google-desc {
          font-family: Arial, sans-serif;
          font-size: 0.88rem;
          color: #4d5156;
          line-height: 1.5;
        }

        .social-preview-card {
          display: flex;
          background: #18191a;
          border: 1px solid #3a3b3c;
          border-radius: 8px;
          overflow: hidden;
          max-width: 550px;
        }

        .social-thumb-mock img {
          width: 140px;
          height: 100%;
          object-fit: cover;
        }

        .social-info {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .social-domain {
          font-size: 0.7rem;
          color: #b0b3b8;
          text-transform: uppercase;
        }

        .social-title {
          font-family: var(--font-ui);
          font-size: 0.95rem;
          color: #E4E6EB;
        }

        .social-desc {
          font-size: 0.8rem;
          color: #B0B3B8;
        }

        .mt-6 {
          margin-top: 1.5rem;
        }

        @media (max-width: 860px) {
          .cms-editor-grid {
            grid-template-columns: 1fr;
          }
          .form-two-cols {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
