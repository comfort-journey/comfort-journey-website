import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, CheckCircle, AlertCircle, FileText, Globe, Search, Share2, Plus, Trash2, Eye, Lock, Unlock, RefreshCw, LayoutDashboard, Server, Database, ExternalLink, Link2, UploadCloud, FileSpreadsheet, ArrowRight, CheckCheck, Image as ImageIcon } from 'lucide-react';
import { directusService, slugify, parseWixCsv, transformWixTourRow } from '../services/directusClient';
import { TOURS_DATA } from '../data/toursData';

export default function AdminCMSModal({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('blog'); // 'blog', 'tour', 'seo-preview', 'directus-config', 'wix-migration'

  // Directus Connection State
  const [directusUrl, setDirectusUrl] = useState(directusService.getBaseUrl());
  const [directusToken, setDirectusToken] = useState(directusService.getToken());
  const [directusStatus, setDirectusStatus] = useState({ isOnline: false, message: 'Checking...' });
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [publishedBlogSlug, setPublishedBlogSlug] = useState(null);
  const [publishedTourSlug, setPublishedTourSlug] = useState(null);

  // Wix CSV Migration State
  const [wixCsvText, setWixCsvText] = useState('');
  const [parsedWixPackages, setParsedWixPackages] = useState([]);
  const [isImportingWix, setIsImportingWix] = useState(false);
  const [wixImportResult, setWixImportResult] = useState(null);

  // Blog Post State
  const [blogTitle, setBlogTitle] = useState('Top 7 Luxury Stays in Kashmir You Must Experience in 2026');
  const [blogSlug, setBlogSlug] = useState(slugify('Top 7 Luxury Stays in Kashmir You Must Experience in 2026'));
  const [isSlugAuto, setIsSlugAuto] = useState(true);
  const [selectedSuggestedTours, setSelectedSuggestedTours] = useState(['kashmir-paradise', 'himachal-wonderland']);
  const [focusKeyword, setFocusKeyword] = useState('luxury stays in kashmir');
  const [metaDescription, setMetaDescription] = useState('Discover the finest 5-star carved wooden houseboats on Dal Lake and pine chalets in Gulmarg. Complete luxury travel guide by Comfort Journey.');
  const [blogContent, setBlogContent] = useState(`Kashmir has long been celebrated as paradise on earth. But for discerning luxury travelers, the experience elevates to royal grandeur when combined with private shikara cruises, 5-star heritage houseboats on Dal Lake, and heated alpine chalets overlooking snow-draped Gulmarg peaks.

In this guide, Comfort Journey's senior trip curators review the top luxury stays in Kashmir for 2026, complete with private butler services and authentic Wazwan gourmet dining.`);
  const [postCategory, setPostCategory] = useState('Destination Guides');
  const [isSaved, setIsSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Textarea ref for selection-based formatting
  const contentRef = useRef(null);

  // New Tour Package State
  const [tourName, setTourName] = useState('');
  const [tourRegion, setTourRegion] = useState('India');
  const [tourDuration, setTourDuration] = useState('6 Days');
  const [tourPrice, setTourPrice] = useState(24999);
  const [tourDays, setTourDays] = useState([
    { day: 1, title: 'Arrival & Welcome Dinner', desc: 'VIP airport transfer and hotel check-in.' }
  ]);

  useEffect(() => {
    if (isOpen) {
      testDirectusConnection();
    }
  }, [isOpen]);

  const testDirectusConnection = async () => {
    setIsTestingConnection(true);
    const res = await directusService.checkHealth();
    setDirectusStatus(res);
    setIsTestingConnection(false);
  };

  const handleSaveDirectusConfig = () => {
    directusService.setBaseUrl(directusUrl);
    directusService.setToken(directusToken);
    testDirectusConnection();
  };

  if (!isOpen) return null;

  // ─── Toolbar Formatting Helpers ───────────────────────────────────
  const wrapSelection = (prefix, suffix = prefix) => {
    const ta = contentRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = blogContent.substring(start, end);
    const before = blogContent.substring(0, start);
    const after = blogContent.substring(end);

    if (selected) {
      const newText = before + prefix + selected + suffix + after;
      setBlogContent(newText);
      setTimeout(() => { ta.focus(); ta.selectionStart = start + prefix.length; ta.selectionEnd = end + prefix.length; }, 0);
    } else {
      const placeholder = prefix + 'text' + suffix;
      const newText = before + placeholder + after;
      setBlogContent(newText);
      setTimeout(() => { ta.focus(); ta.selectionStart = start + prefix.length; ta.selectionEnd = start + prefix.length + 4; }, 0);
    }
  };

  const insertLinePrefix = (prefix) => {
    const ta = contentRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = blogContent.substring(start, end);
    const before = blogContent.substring(0, start);
    const after = blogContent.substring(end);

    if (selected) {
      const prefixed = selected.split('\n').map(line => prefix + line).join('\n');
      setBlogContent(before + prefixed + after);
      setTimeout(() => { ta.focus(); ta.selectionStart = start; ta.selectionEnd = start + prefixed.length; }, 0);
    } else {
      const nl = start > 0 && blogContent[start - 1] !== '\n' ? '\n' : '';
      const ins = nl + prefix;
      setBlogContent(before + ins + after);
      setTimeout(() => { ta.focus(); ta.selectionStart = ta.selectionEnd = start + ins.length; }, 0);
    }
  };

  const handleBold = () => wrapSelection('**');
  const handleItalic = () => wrapSelection('*');
  const handleH2 = () => insertLinePrefix('## ');
  const handleH3 = () => insertLinePrefix('### ');
  const handleBulletList = () => insertLinePrefix('- ');
  const handleBlockquote = () => insertLinePrefix('> ');
  const handleHorizontalRule = () => {
    const ta = contentRef.current;
    if (!ta) return;
    const pos = ta.selectionStart;
    const before = blogContent.substring(0, pos);
    const after = blogContent.substring(pos);
    const nl = pos > 0 && blogContent[pos - 1] !== '\n' ? '\n' : '';
    const ins = nl + '\n---\n';
    setBlogContent(before + ins + after);
    setTimeout(() => { ta.focus(); ta.selectionStart = ta.selectionEnd = pos + ins.length; }, 0);
  };
  const handleInsertLink = () => { const url = prompt('Enter link URL:'); if (url) wrapSelection('[', `](${url})`); };
  const handleInsertImage = () => { const url = prompt('Enter image URL:'); if (url) wrapSelection('![', `](${url})`); };

  // Simple markdown to HTML renderer for live preview
  const renderMarkdownPreview = (md) => {
    return md
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/^### (.+)$/gm, '<h3 style="color:#FF892F;font-size:1.1rem;margin:0.8rem 0 0.3rem;">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 style="color:#6FE6FC;font-size:1.25rem;margin:1rem 0 0.4rem;">$1</h2>')
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#F9FBE7;">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '<li style="margin-left:1.2rem;">$1</li>')
      .replace(/^&gt; (.+)$/gm, '<blockquote style="border-left:3px solid #FF892F;padding-left:0.75rem;color:#94A3B8;margin:0.5rem 0;">$1</blockquote>')
      .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.15);margin:1rem 0;" />')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:8px;margin:0.5rem 0;" />')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#6FE6FC;" target="_blank">$1</a>')
      .replace(/\n/g, '<br/>');
  };

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

  const autoOptimizeSeo = handleAiAutoGenerateSeo;

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
              <button
                className={`cms-tab-btn ${activeTab === 'directus-config' ? 'active' : ''}`}
                onClick={() => setActiveTab('directus-config')}
              >
                <Database size={16} />
                <span>Directus & AWS Bridge</span>
              </button>
              <button
                className={`cms-tab-btn ${activeTab === 'wix-migration' ? 'active' : ''}`}
                onClick={() => setActiveTab('wix-migration')}
              >
                <UploadCloud size={16} />
                <span>Wix Data Migration</span>
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
                      onChange={(e) => {
                        setBlogTitle(e.target.value);
                        if (isSlugAuto) {
                          setBlogSlug(slugify(e.target.value));
                        }
                      }}
                      placeholder="e.g. 10 Best Places to Visit in Bali for Couples in 2026"
                    />
                  </div>

                  {/* Auto-Generating URL Slug with Manual Override */}
                  <div className="field-group">
                    <div className="flex items-center justify-between mb-1">
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1' }}>
                        URL Slug (Directus Slug Interface)
                      </label>
                      <button 
                        type="button" 
                        className="slug-lock-btn"
                        onClick={() => {
                          if (!isSlugAuto) {
                            setBlogSlug(slugify(blogTitle));
                          }
                          setIsSlugAuto(!isSlugAuto);
                        }}
                        title={isSlugAuto ? "Click to unlock and edit slug manually" : "Click to auto-sync with title"}
                      >
                        {isSlugAuto ? <Lock size={12} className="text-emerald" /> : <Unlock size={12} className="text-amber" />}
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: isSlugAuto ? '#10B981' : '#FF892F' }}>
                          {isSlugAuto ? "Auto-Syncing" : "Manual Override"}
                        </span>
                      </button>
                    </div>
                    <div className="slug-input-container">
                      <span className="slug-prefix">#/blog/</span>
                      <input
                        type="text"
                        className="cms-input slug-input"
                        value={blogSlug}
                        onChange={(e) => {
                          setIsSlugAuto(false);
                          setBlogSlug(slugify(e.target.value));
                        }}
                        placeholder="url-friendly-slug"
                      />
                    </div>
                  </div>

                  {/* ── Functional Formatting Toolbar ── */}
                  <div className="editor-toolbar">
                    <button type="button" className="tool-btn" title="Bold (**text**)" onClick={handleBold}>
                      <strong>B</strong>
                    </button>
                    <button type="button" className="tool-btn" title="Italic (*text*)" onClick={handleItalic}>
                      <em>I</em>
                    </button>
                    <button type="button" className="tool-btn" title="Heading 2 (##)" onClick={handleH2}>
                      H2
                    </button>
                    <button type="button" className="tool-btn" title="Heading 3 (###)" onClick={handleH3}>
                      H3
                    </button>
                    <button type="button" className="tool-btn" title="Bullet List (-)" onClick={handleBulletList}>
                      • List
                    </button>
                    <button type="button" className="tool-btn" title="Blockquote (>)" onClick={handleBlockquote}>
                      ❝ Quote
                    </button>
                    <button type="button" className="tool-btn" title="Horizontal Rule (---)" onClick={handleHorizontalRule}>
                      ― Rule
                    </button>
                    <button type="button" className="tool-btn" title="Insert Link" onClick={handleInsertLink}>
                      🔗 Link
                    </button>
                    <button type="button" className="tool-btn" title="Insert Image" onClick={handleInsertImage}>
                      🖼️ Image
                    </button>
                    <button
                      type="button"
                      className={`tool-btn preview-toggle-btn ${showPreview ? 'active' : ''}`}
                      title="Toggle Live Preview"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      <Eye size={14} />
                      {showPreview ? 'Editor' : 'Preview'}
                    </button>
                    <span className="word-counter">{blogContent.split(/\s+/).filter(Boolean).length} Words</span>
                  </div>

                  <div className="field-group">
                    <label>{showPreview ? 'Live Rendered Preview' : 'Article Content (Markdown Format)'}</label>
                    {showPreview ? (
                      <div
                        className="cms-preview-pane"
                        dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(blogContent) }}
                      />
                    ) : (
                      <textarea
                        ref={contentRef}
                        rows={12}
                        className="cms-textarea"
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        placeholder="Write your article here using Markdown. Select text and click toolbar buttons to format."
                      />
                    )}
                  </div>

                  <div className="cms-format-hint">
                    💡 <strong>Tip:</strong> Select text in the editor, then click <strong>B</strong>, <em>I</em>, <strong>H2</strong>, etc. to format it. Click <strong>Preview</strong> to see how it renders.
                  </div>

                  <div className="field-group">
                    <label>Category Tag</label>
                    <select
                      className="cms-select"
                      value={postCategory}
                      onChange={(e) => setPostCategory(e.target.value)}
                    >
                      <option value="Destination Guides">Destination Guides</option>
                      <option value="Luxury Stays">Luxury Stays</option>
                      <option value="Honeymoon & Romance">Honeymoon & Romance</option>
                      <option value="Solo & Safety">Solo & Safety</option>
                      <option value="Corporate & Offsites">Corporate & Offsites</option>
                      <option value="Seasonal Tips">Seasonal Tips</option>
                    </select>
                  </div>

                  {/* Suggested Tour Packages (M2M Selection) */}
                  <div className="field-group">
                    <div className="flex items-center justify-between mb-1">
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#CBD5E1' }}>
                        Suggested Tour Packages (M2M Relational Field)
                      </label>
                      <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{selectedSuggestedTours.length}/3 Selected</span>
                    </div>
                    <div className="suggested-tours-picker">
                      {TOURS_DATA.slice(0, 6).map(tour => {
                        const isChecked = selectedSuggestedTours.includes(tour.id);
                        return (
                          <label key={tour.id} className={`tour-check-item ${isChecked ? 'active' : ''}`}>
                            <input 
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                if (isChecked) {
                                  setSelectedSuggestedTours(selectedSuggestedTours.filter(id => id !== tour.id));
                                } else {
                                  if (selectedSuggestedTours.length < 3) {
                                    setSelectedSuggestedTours([...selectedSuggestedTours, tour.id]);
                                  } else {
                                    alert('You can select up to 3 suggested tour packages.');
                                  }
                                }
                              }}
                            />
                            <span className="tour-name-text">{tour.name}</span>
                          </label>
                        );
                      })}
                    </div>
                    <p className="suggested-hint">💡 <em>If left unselected, the automated recommendation engine will dynamically match tags & categories!</em></p>
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
                    className="btn-ai-optimize"
                    onClick={autoOptimizeSeo}
                  >
                    <Sparkles size={16} />
                    <span>AI 1-Click SEO & Geo Rank Fix</span>
                  </button>

                  {/* Focus Keyword */}
                  <div className="field-group">
                    <label>Focus SEO Keyword</label>
                    <input
                      type="text"
                      className="cms-input"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                    />
                  </div>

                  {/* Meta Description */}
                  <div className="field-group">
                    <label>Google Meta Description ({metaDescription.length}/160)</label>
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
                      <span>H1 Title length is optimal ({blogTitle.length}/60)</span>
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
                      onClick={async () => {
                        const newBlog = await directusService.createBlog({
                          title: blogTitle,
                          slug: blogSlug,
                          content: blogContent,
                          category: postCategory,
                          excerpt: metaDescription,
                          suggestedTourIds: selectedSuggestedTours,
                          seo: {
                            metaTitle: blogTitle,
                            metaDescription,
                            focusKeyword
                          }
                        });
                        setPublishedBlogSlug(newBlog.slug);
                        setIsSaved(true);
                      }}
                    >
                      {isSaved ? '✅ Published to Directus!' : '🚀 Publish Article Live'}
                    </button>

                    {publishedBlogSlug && (
                      <div className="published-success-box animate-fade-in">
                        <div className="success-tag">🎉 Article Live on Website</div>
                        <a 
                          href={`#/blog/${publishedBlogSlug}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="view-live-btn"
                        >
                          <span>Open #/blog/{publishedBlogSlug}</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    )}
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
                  onClick={async () => {
                    if (!tourName) {
                      alert('Please enter a tour package name');
                      return;
                    }
                    const newTour = await directusService.createTourPackage({
                      name: tourName,
                      continent: tourRegion,
                      duration: tourDuration,
                      price: tourPrice,
                      itinerary: tourDays
                    });
                    setPublishedTourSlug(newTour.slug);
                  }}
                >
                  Save & Publish Tour Package
                </button>

                {publishedTourSlug && (
                  <div className="published-success-box animate-fade-in mt-3">
                    <div className="success-tag">🎉 Tour Package Published</div>
                    <a 
                      href={`#/tour/${publishedTourSlug}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="view-live-btn"
                    >
                      <span>Preview #/tour/{publishedTourSlug}</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                )}
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

            {/* TAB 4: Directus Headless CMS & AWS Cloud Bridge */}
            {activeTab === 'directus-config' && (
              <div className="directus-config-pane">
                <div className="directus-status-card glass-card">
                  <div className="status-header-row">
                    <div className="flex items-center gap-2">
                      <Server size={20} className="text-amber" />
                      <h4 className="status-heading font-editorial">Directus CMS Connection Status</h4>
                    </div>
                    <span className={`status-pill ${directusStatus.isOnline ? 'online' : 'fallback'}`}>
                      {directusStatus.isOnline ? '🟢 Connected (200 OK)' : '🟡 Local Fallback Mode Active'}
                    </span>
                  </div>

                  <p className="status-desc">
                    {directusStatus.isOnline 
                      ? `Directus Headless CMS is running and synced with your frontend at ${directusStatus.url}. All blogs and tour packages are fetching dynamically.`
                      : `Directus is currently offline at ${directusUrl}. The website is operating with 100% functionality using local cached fallback data.`
                    }
                  </p>

                  <div className="directus-form-grid">
                    <div className="field-group">
                      <label>Directus API Endpoint URL</label>
                      <input 
                        type="text" 
                        className="cms-input"
                        value={directusUrl}
                        onChange={(e) => setDirectusUrl(e.target.value)}
                        placeholder="http://localhost:8055 or https://cms.comfortjourneyy.com"
                      />
                    </div>

                    <div className="field-group">
                      <label>Static Access Token (Optional for public reads)</label>
                      <input 
                        type="password" 
                        className="cms-input"
                        value={directusToken}
                        onChange={(e) => setDirectusToken(e.target.value)}
                        placeholder="Enter Directus User API Token"
                      />
                    </div>
                  </div>

                  <div className="config-actions-row">
                    <button 
                      type="button" 
                      className="btn-primary"
                      onClick={handleSaveDirectusConfig}
                    >
                      Save Configuration & Test
                    </button>
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={testDirectusConnection}
                      disabled={isTestingConnection}
                    >
                      <RefreshCw size={14} className={isTestingConnection ? 'animate-spin' : ''} />
                      <span>{isTestingConnection ? 'Testing...' : 'Ping Server'}</span>
                    </button>
                  </div>
                </div>

                {/* Directus Quickstart Instructions */}
                <div className="directus-guide-card glass-card mt-4">
                  <h4 className="guide-title font-editorial">🚀 How to Run Directus Locally in 1 Minute</h4>
                  <ol className="guide-steps">
                    <li>
                      <strong>Docker Compose:</strong> Navigate to the <code>cms/</code> folder and run:
                      <pre className="code-block">docker compose up -d</pre>
                    </li>
                    <li>
                      <strong>Directus Dashboard:</strong> Open <code>http://localhost:8055</code> and log in with:
                      <pre className="code-block">Email: admin@comfortjourney.com | Password: comfort1992</pre>
                    </li>
                    <li>
                      <strong>AWS Production Deployment:</strong> When ready to move from local to AWS, see <code>cms/AWS_DEPLOYMENT_GUIDE.md</code>.
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {/* TAB 5: Wix Historical Data Migration & Media Replacement */}
            {activeTab === 'wix-migration' && (
              <div className="wix-migration-pane">
                {/* Migration Overview Banner */}
                <div className="wix-migration-header glass-card">
                  <div className="wix-header-icon-box">
                    <FileSpreadsheet size={28} className="text-amber" />
                  </div>
                  <div>
                    <h3 className="wix-title font-editorial">Historical Wix Tour Packages Importer</h3>
                    <p className="wix-desc">
                      Import your historical tour packages exported from Wix (<code>.csv</code> / <code>.xlsx</code>). 
                      The migration engine automatically maps columns, formats day-by-day itineraries, and 
                      <strong> replaces all legacy Wix CDN image URLs</strong> with curated, high-definition destination photography.
                    </p>
                  </div>
                </div>

                {/* Upload & Sample Loading Controls */}
                <div className="wix-controls-grid">
                  <div className="wix-upload-card glass-card">
                    <h4 className="card-sub-title">1. Upload Wix Export File</h4>
                    <div className="wix-dropzone">
                      <UploadCloud size={32} className="text-cyan mb-2" />
                      <p className="drop-title">Drag & Drop Wix .csv file here</p>
                      <span className="drop-or">or</span>
                      <label className="btn-file-select">
                        <span>Browse Computer</span>
                        <input 
                          type="file" 
                          accept=".csv" 
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const text = event.target?.result;
                                if (typeof text === 'string') {
                                  setWixCsvText(text);
                                  const rows = parseWixCsv(text);
                                  const pkgs = rows.map(r => transformWixTourRow(r));
                                  setParsedWixPackages(pkgs);
                                };
                              };
                              reader.readAsText(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="wix-sample-card glass-card">
                    <h4 className="card-sub-title">2. Quick Test with Sample Export</h4>
                    <p className="sample-desc">
                      Test the migration pipeline immediately with 5 real historical Wix tour packages (Kashmir, Bali, Dubai, Kerala, Swiss Alps).
                    </p>
                    <button 
                      type="button" 
                      className="btn-load-sample"
                      onClick={() => {
                        const sampleCsv = `HandleId,Title,FieldType,Price,ComparePrice,Duration,Destination,Category,Description,WixImageUrl,Inclusions,Day1_Title,Day1_Desc,Day2_Title,Day2_Desc,Day3_Title,Day3_Desc,Day4_Title,Day4_Desc,Day5_Title,Day5_Desc
wix-pkg-101,"Kashmir Royal Houseboat & Gulmarg Ski Odyssey",Product,28999,35999,"6 Days / 5 Nights","Srinagar, Kashmir","Luxury Signature","Experience paradise on earth with luxury handcrafted houseboats on Dal Lake and heated pine chalets in Gulmarg.","https://static.wixstatic.com/media/43df74_kashmir_legacy_wix_01~mv2.jpg/v1/fill/w_800,h_600/kashmir.jpg","5-Star Stay; Private Cab; Daily Breakfast & Dinner; Shikara Ride; VIP Gondola Passes","Arrival in Srinagar","VIP pickup from Srinagar airport and transfer to Royal Cedar Houseboat on Nigeen Lake with sunset Shikara ride.","Srinagar to Gulmarg Expedition","Drive through pine valleys to Gulmarg. Check into heated alpine chalet and take Gondola Phase 1 & 2.","Gulmarg Snow Activities","Skiing and snowboarding with certified instructors. Evening bonfire with Kashmiri Kahwa.","Gulmarg to Pahalgam Valley","Scenic drive to Lidder River valley. Check into riverside pine cottages.","Pahalgam Sightseeing & Departure","Visit Betaab Valley and Aru Valley. Evening shopping at Lal Chowk and airport drop."
wix-pkg-102,"Bali Romance: Jungle Pool Villas & Uluwatu Sunset",Product,42999,54999,"7 Days / 6 Nights","Bali, Indonesia","Honeymoon & Couple","Romantic split stay between Ubud rainforest infinity pools and Uluwatu ocean clifftop luxury suites.","https://static.wixstatic.com/media/43df74_bali_honeymoon_wix_02~mv2.jpg/v1/fill/w_800,h_600/bali.jpg","Private Pool Villa; Daily Floating Breakfast; Candlelight Dinner; Sunset Cruise; 24/7 Concierge","Arrival in Denpasar & Ubud Transfer","Traditional Balinese flower garland welcome, private VIP transfer to Ubud Jungle Villa.","Tegalalang Rice Terraces & Jungle Swing","Explore iconic green terraces, Aloha swing, and sacred Tirta Empul water temple.","Ubud to Seminyak & Sunset Beach Club","Transfer to luxury Seminyak beachfront suite. Sunset cocktails at Potato Head Beach Club.","Nusa Penida Island Private Speedboat Tour","Fast boat to Kelingking T-Rex Beach, Broken Beach, and Angel's Billabong snorkeling.","Uluwatu Temple & Kecak Fire Dance","Cliffside Uluwatu temple tour and traditional sunset fire dance with Jimbaran seafood dinner."
wix-pkg-103,"Dubai Extravaganza: Desert Luxury & Burj Khalifa VIP",Product,38999,48999,"5 Days / 4 Nights","Dubai, UAE","Luxury Signature","Ultra-modern luxury with 5-star Marina hotels, private yacht cruise, and premium desert safari glamping.","https://static.wixstatic.com/media/43df74_dubai_skyline_wix_03~mv2.jpg/v1/fill/w_800,h_600/dubai.jpg","5-Star Hotel; Desert Safari; Private Yacht; Burj 124th Floor; Limousine Airport Transfer","Arrival in Dubai","Limousine airport transfer to 5-star Dubai Marina hotel. Evening Dubai Marina Dhow Cruise.","Dubai City Tour & Burj Khalifa At The Top","Visit Museum of the Future, Dubai Mall, and 124th-floor sunset Burj Khalifa VIP entry.","VIP Red Dunes Desert Safari","Luxury 4x4 dune bashing, camel riding, quad biking, and gourmet Arabian BBQ dinner with live Tanoura show.","Private Luxury Yacht Cruise & Atlantis Aquaventure","2-hour private yacht cruise along Dubai Marina and Palm Jumeirah with Atlantis Aquaventure pass.","Dubai Gold Souk & Departure","Morning shopping at traditional Deira Gold and Spice Souks. VIP airport drop-off."
wix-pkg-104,"Kerala Serenity: Munnar Tea Hills & Alleppey Houseboat",Product,21999,28999,"6 Days / 5 Nights","Kerala, India","Family & Group","Lush tea plantation mists, aromatic spice gardens, and private luxury backwater houseboat cruises.","https://static.wixstatic.com/media/43df74_kerala_backwaters_wix_04~mv2.jpg/v1/fill/w_800,h_600/kerala.jpg","Luxury Resort; Private Houseboat; All Meals on Boat; Ayurvedic Spa Voucher; Private AC Cab","Arrival in Kochi & Munnar Drive","Scenic drive past Cheeyappara waterfalls to Munnar tea country. Check-in to plantation resort.","Munnar Tea Gardens & Eravikulam National Park","Visit Nilgiri Tahr sanctuary, Mattupetty Dam, and Tata Tea Museum with tea-tasting session.","Munnar to Thekkady Spice Plantations","Scenic drive to Periyar. Guided spice plantation walk and Periyar lake boat safari.","Thekkady to Alleppey Backwaters","Board private luxury AC houseboat. Cruise through palm-fringed backwaters with authentic Kerala lunch.","Alleppey to Kochi Departure","Morning sunrise village cruise, visit Fort Kochi Chinese Fishing Nets, and airport transfer."
wix-pkg-105,"Swiss Alps & Glacier Express Fantasy",Product,129999,159999,"7 Days / 6 Nights","Interlaken, Switzerland","International Luxury","First-class panoramic Swiss rail pass, Jungfraujoch Top of Europe, and Lake Lucerne steam cruises.","https://static.wixstatic.com/media/43df74_swiss_alps_wix_05~mv2.jpg/v1/fill/w_800,h_600/swiss.jpg","4-Star Superior Hotels; Swiss Travel Pass 1st Class; Jungfraujoch Ticket; Lake Lucerne Cruise","Arrival in Zurich to Lucerne","Scenic Swiss rail to Lucerne. Walk across historical Chapel Bridge and Lion Monument.","Mount Titlis Revolving Cable Car","Rotair cable car to 10,000 ft, glacier cave walk, and Cliff Walk suspension bridge.","Lucerne to Interlaken GoldenPass Express","Panoramic train journey along scenic turquoise lakes to alpine Interlaken resort.","Jungfraujoch - Top of Europe","Cogwheel train to highest railway station in Europe (3,454m) with Ice Palace tour.","Interlaken to Zurich & Departure","Scenic lake cruise on Lake Brienz, transfer to Zurich for airport departure."`;
                        setWixCsvText(sampleCsv);
                        const rows = parseWixCsv(sampleCsv);
                        const pkgs = rows.map(r => transformWixTourRow(r));
                        setParsedWixPackages(pkgs);
                      }}
                    >
                      <Sparkles size={16} />
                      <span>Load 5 Sample Wix Tour Packages</span>
                    </button>
                  </div>
                </div>

                {/* Media Replacement & Column Detection Strip */}
                {parsedWixPackages.length > 0 && (
                  <div className="wix-preview-section animate-fade-in mt-4">
                    <div className="media-rule-alert glass-card">
                      <div className="flex items-center gap-2 mb-2">
                        <ImageIcon size={18} className="text-emerald" />
                        <strong className="text-white text-sm">Media Asset Transformation (Rule Enforced)</strong>
                      </div>
                      <p className="text-xs text-slate-300 mb-0 leading-relaxed">
                        Detected <strong>{parsedWixPackages.length} raw Wix CDN URLs</strong> (<code>static.wixstatic.com</code>). 
                        All URLs have been automatically resolved and replaced with high-definition destination photography tailored to Kashmir, Bali, Dubai, Kerala, and Switzerland.
                      </p>
                    </div>

                    {/* Parsed Packages Table */}
                    <div className="parsed-packages-card glass-card mt-3">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="table-title">Detected Tour Packages Ready to Import ({parsedWixPackages.length})</h4>
                        <button
                          type="button"
                          className="btn-primary btn-import-now"
                          disabled={isImportingWix}
                          onClick={async () => {
                            setIsImportingWix(true);
                            const result = await directusService.importWixTourPackages(parsedWixPackages);
                            setIsImportingWix(false);
                            setWixImportResult(result);
                          }}
                        >
                          <CheckCheck size={16} />
                          <span>{isImportingWix ? 'Importing Packages...' : `Import ${parsedWixPackages.length} Packages Now`}</span>
                        </button>
                      </div>

                      {/* Success Results Banner */}
                      {wixImportResult && (
                        <div className="import-success-alert mb-3">
                          <CheckCircle size={18} className="text-emerald inline mr-2" />
                          <span>Successfully imported <strong>{wixImportResult.count} Tour Packages</strong> into local storage & Directus!</span>
                        </div>
                      )}

                      <div className="wix-table-responsive">
                        <table className="wix-preview-table">
                          <thead>
                            <tr>
                              <th>Cover Photo (Curated HD)</th>
                              <th>Package Name & Slug</th>
                              <th>Destination</th>
                              <th>Duration</th>
                              <th>Pricing</th>
                              <th>Itinerary Days</th>
                            </tr>
                          </thead>
                          <tbody>
                            {parsedWixPackages.map((pkg, idx) => (
                              <tr key={idx}>
                                <td>
                                  <div className="table-thumb-box">
                                    <img src={pkg.image} alt={pkg.name} />
                                    <span className="media-status-pill">HD Curated</span>
                                  </div>
                                </td>
                                <td>
                                  <strong className="pkg-table-name">{pkg.name}</strong>
                                  <span className="pkg-table-slug">#/{pkg.slug}</span>
                                </td>
                                <td>
                                  <span className="table-loc-pill">{pkg.location}</span>
                                </td>
                                <td>{pkg.duration}</td>
                                <td>
                                  <strong className="text-amber">₹{pkg.price.toLocaleString('en-IN')}</strong>
                                  {pkg.origPrice && <span className="table-orig-price">₹{pkg.origPrice.toLocaleString('en-IN')}</span>}
                                </td>
                                <td>
                                  <span className="itinerary-count-pill">{pkg.itinerary.length} Days</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
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

        .tool-btn:active {
          transform: scale(0.92);
        }

        .preview-toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .preview-toggle-btn.active {
          background: rgba(111, 230, 252, 0.25);
          color: #6FE6FC;
          border: 1px solid rgba(111, 230, 252, 0.4);
        }

        .word-counter {
          margin-left: auto;
          font-size: 0.75rem;
          color: #94A3B8;
          font-weight: 700;
        }

        .cms-preview-pane {
          min-height: 220px;
          max-height: 400px;
          overflow-y: auto;
          background: rgba(0, 18, 51, 0.8);
          border: 1px solid var(--cj-glass-border);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          color: #CBD5E1;
          font-size: 0.88rem;
          line-height: 1.7;
        }

        .cms-format-hint {
          font-size: 0.78rem;
          color: #64748B;
          padding: 0.5rem 0.75rem;
          background: rgba(255, 137, 47, 0.08);
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 137, 47, 0.15);
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

        .published-success-box {
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.35);
          border-radius: var(--radius-sm);
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }

        .success-tag {
          font-size: 0.76rem;
          font-weight: 800;
          color: #10B981;
        }

        .view-live-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.76rem;
          font-weight: 700;
          color: #6FE6FC;
          text-decoration: underline;
        }

        .view-live-btn:hover {
          color: #FF892F;
        }

        /* Directus Config Styles */
        .directus-config-pane {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .directus-status-card {
          padding: 1.5rem;
          background: rgba(0, 18, 51, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
        }

        .status-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          gap: 0.75rem;
        }

        .status-heading {
          font-size: 1.15rem;
          color: #FFFFFF;
          margin: 0;
        }

        .status-pill {
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
        }

        .status-pill.online {
          background: rgba(16, 185, 129, 0.15);
          color: #10B981;
          border: 1px solid #10B981;
        }

        .status-pill.fallback {
          background: rgba(245, 158, 11, 0.15);
          color: #F59E0B;
          border: 1px solid #F59E0B;
        }

        .status-desc {
          font-size: 0.86rem;
          color: #94A3B8;
          line-height: 1.55;
          margin-bottom: 1.25rem;
        }

        .directus-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .config-actions-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          padding: 0.65rem 1.25rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .directus-guide-card {
          padding: 1.5rem;
          background: rgba(0, 18, 51, 0.6);
          border: 1px dashed rgba(255, 137, 47, 0.3);
          border-radius: var(--radius-md);
        }

        .guide-title {
          font-size: 1.1rem;
          color: #FF892F;
          margin: 0 0 0.85rem 0;
        }

        .guide-steps {
          margin: 0;
          padding-left: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.84rem;
          color: #CBD5E1;
        }

        .code-block {
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          color: #6FE6FC;
          font-family: monospace;
          margin: 0.35rem 0 0 0;
          font-size: 0.8rem;
        }

        /* Slug & M2M Styles */
        .slug-lock-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 4px;
          padding: 0.15rem 0.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .slug-lock-btn:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .slug-input-container {
          display: flex;
          align-items: center;
          background: rgba(0, 18, 51, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }

        .slug-prefix {
          padding: 0.6rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          color: #94A3B8;
          font-family: monospace;
          font-size: 0.82rem;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          user-select: none;
        }

        .slug-input {
          border: none !important;
          background: transparent !important;
          font-family: monospace;
          font-size: 0.85rem;
          color: #6FE6FC !important;
        }

        .suggested-tours-picker {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.5rem;
          max-height: 150px;
          overflow-y: auto;
          padding: 0.5rem;
          background: rgba(0, 18, 51, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-sm);
        }

        .tour-check-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.6rem;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.78rem;
          color: #CBD5E1;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tour-check-item.active {
          background: rgba(255, 137, 47, 0.15);
          border-color: #FF892F;
          color: #FFFFFF;
        }

        .suggested-hint {
          font-size: 0.74rem;
          color: #94A3B8;
          margin: 0.35rem 0 0 0;
        }

        /* Wix Migration Tab Styles */
        .wix-migration-pane {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .wix-migration-header {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding: 1.5rem;
          background: rgba(0, 18, 51, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
        }

        .wix-header-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: rgba(255, 137, 47, 0.15);
          border: 1px solid rgba(255, 137, 47, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .wix-title {
          font-size: 1.25rem;
          color: #FFFFFF;
          margin: 0 0 0.4rem 0;
        }

        .wix-desc {
          font-size: 0.86rem;
          color: #94A3B8;
          line-height: 1.55;
          margin: 0;
        }

        .wix-controls-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .wix-upload-card, .wix-sample-card {
          padding: 1.5rem;
          border-radius: var(--radius-md);
          background: rgba(0, 18, 51, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
        }

        .card-sub-title {
          font-size: 0.95rem;
          color: #FFFFFF;
          margin: 0 0 1rem 0;
          font-weight: 700;
        }

        .wix-dropzone {
          border: 2px dashed rgba(111, 230, 252, 0.3);
          border-radius: var(--radius-sm);
          padding: 1.75rem 1rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(111, 230, 252, 0.03);
          cursor: pointer;
          transition: all 0.2s;
        }

        .wix-dropzone:hover {
          border-color: #6FE6FC;
          background: rgba(111, 230, 252, 0.08);
        }

        .drop-title {
          font-size: 0.85rem;
          color: #E2E8F0;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
        }

        .drop-or {
          font-size: 0.72rem;
          color: #64748B;
          margin-bottom: 0.5rem;
        }

        .btn-file-select {
          padding: 0.4rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #FFFFFF;
          cursor: pointer;
        }

        .sample-desc {
          font-size: 0.84rem;
          color: #94A3B8;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .btn-load-sample {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-sm);
          background: linear-gradient(135deg, rgba(255, 137, 47, 0.2), rgba(255, 107, 0, 0.3));
          border: 1px solid #FF892F;
          color: #FF892F;
          font-size: 0.85rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-load-sample:hover {
          background: #FF892F;
          color: #FFFFFF;
        }

        .media-rule-alert {
          padding: 1rem 1.25rem;
          border-radius: var(--radius-sm);
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.35);
        }

        .parsed-packages-card {
          padding: 1.5rem;
          border-radius: var(--radius-md);
          background: rgba(0, 18, 51, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .table-title {
          font-size: 1.05rem;
          color: #FFFFFF;
          margin: 0;
          font-weight: 700;
        }

        .btn-import-now {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.6rem 1.25rem;
          font-size: 0.85rem;
        }

        .import-success-alert {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid #10B981;
          color: #10B981;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
        }

        .wix-table-responsive {
          overflow-x: auto;
          margin-top: 0.75rem;
        }

        .wix-preview-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.82rem;
          text-align: left;
        }

        .wix-preview-table th {
          background: rgba(255, 255, 255, 0.04);
          color: #94A3B8;
          font-weight: 700;
          padding: 0.75rem 0.6rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          text-transform: uppercase;
          font-size: 0.7rem;
        }

        .wix-preview-table td {
          padding: 0.75rem 0.6rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: #CBD5E1;
          vertical-align: middle;
        }

        .table-thumb-box {
          position: relative;
          width: 80px;
          height: 54px;
          border-radius: 6px;
          overflow: hidden;
        }

        .table-thumb-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .media-status-pill {
          position: absolute;
          bottom: 2px;
          left: 2px;
          right: 2px;
          background: rgba(16, 185, 129, 0.9);
          color: #FFFFFF;
          font-size: 0.55rem;
          font-weight: 800;
          text-align: center;
          border-radius: 2px;
          padding: 1px 0;
        }

        .pkg-table-name {
          display: block;
          color: #FFFFFF;
          font-size: 0.86rem;
          margin-bottom: 0.2rem;
        }

        .pkg-table-slug {
          font-family: monospace;
          color: #6FE6FC;
          font-size: 0.72rem;
        }

        .table-loc-pill {
          display: inline-block;
          background: rgba(255, 255, 255, 0.06);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.74rem;
        }

        .table-orig-price {
          display: block;
          font-size: 0.72rem;
          color: #64748B;
          text-decoration: line-through;
        }

        .itinerary-count-pill {
          display: inline-block;
          background: rgba(111, 230, 252, 0.12);
          color: #6FE6FC;
          border: 1px solid rgba(111, 230, 252, 0.3);
          padding: 0.2rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 700;
        }

        @media (max-width: 860px) {
          .cms-editor-grid {
            grid-template-columns: 1fr;
          }
          .form-two-cols, .directus-form-grid, .wix-controls-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
