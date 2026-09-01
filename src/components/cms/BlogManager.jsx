import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  FileText, Plus, Search, Edit3, Trash2, Eye, EyeOff, Copy,
  ExternalLink, Clock, Tag, AlertCircle, CheckCircle, ArrowLeft,
  Save, Sparkles, Calendar, X, ChevronDown, ImageIcon, Link2
} from 'lucide-react';
import ImageUploadField from './ImageUploadField';
import RichTextEditor from './RichTextEditor';
import SEOAssistant from './SEOAssistant';
import { BLOGS_DATA } from '../../data/blogsData';
import { TOURS_DATA } from '../../data/toursData';
import { slugify } from '../../services/directusClient';

// ═══════════════════════════════════════════════════════════════════
// COMFORT JOURNEY — BLOG MANAGER & EDITOR
// Full blog CRUD with WYSIWYG authoring, SEO Assistant, and
// content quality indicators.
// ═══════════════════════════════════════════════════════════════════

const STORAGE_KEY_BLOGS = 'cj_custom_blogs_v2';
const STORAGE_KEY_DRAFTS = 'cj_blog_drafts';

const BLOG_CATEGORIES = [
  'All Articles', 'Destination Guides', 'Honeymoon & Romance',
  'Luxury Stays', 'Solo & Safety', 'Corporate & Offsites', 'Seasonal Tips',
  'Workation', 'Budget Travel', 'Travel Tips'
];

function getContentQuality(content) {
  const text = (content || '').replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount >= 1500) return { label: 'Excellent', color: '#10B981', icon: '🟢', words: wordCount };
  if (wordCount >= 800) return { label: 'Good', color: '#6FE6FC', icon: '🔵', words: wordCount };
  if (wordCount >= 300) return { label: 'Fair', color: '#F59E0B', icon: '🟡', words: wordCount };
  return { label: 'Thin Content', color: '#EF4444', icon: '🔴', words: wordCount };
}

function getReadingTime(content) {
  const text = (content || '').replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
}

export default function BlogManager({ onViewBlog }) {
  const [view, setView] = useState('list'); // 'list' | 'editor'
  const [blogs, setBlogs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BLOGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return BLOGS_DATA.map(b => ({ ...b, status: b.status || 'published' }));
  });
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Articles');
  const [toastMessage, setToastMessage] = useState('');
  const autoSaveTimerRef = useRef(null);

  // Persist blogs
  const persistBlogs = useCallback((updated) => {
    setBlogs(updated);
    try { localStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(updated)); } catch {}
  }, []);

  // Show toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // ─── CRUD Operations ───

  const handleCreateNew = () => {
    const newBlog = {
      id: `blog-custom-${Date.now()}`,
      slug: '',
      title: '',
      excerpt: '',
      coverImage: '',
      category: 'Destination Guides',
      author: { name: 'Rishabh Mishra', role: 'Founder & Lead Curator', avatar: '' },
      publishedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: '1 min read',
      featured: false,
      tags: [],
      suggestedTourIds: [],
      seo: { metaTitle: '', metaDescription: '', focusKeyword: '' },
      content: '',
      status: 'draft',
      allowIndexing: true,
      canonicalUrl: '',
      expertInsights: '',
      sourceVerification: '',
      searchIntent: 'informational',
      revisions: []
    };
    setEditingBlog(newBlog);
    setView('editor');
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(JSON.parse(JSON.stringify(blog)));
    setView('editor');
  };

  const handleDuplicateBlog = (blog) => {
    const dup = {
      ...JSON.parse(JSON.stringify(blog)),
      id: `blog-custom-${Date.now()}`,
      title: `${blog.title} (Copy)`,
      slug: `${blog.slug}-copy`,
      status: 'draft',
      publishedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    const updated = [dup, ...blogs];
    persistBlogs(updated);
    showToast(`📋 Blog duplicated as draft: "${dup.title}"`);
  };

  const handleDeleteBlog = (blogId, title) => {
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      const updated = blogs.filter(b => b.id !== blogId);
      persistBlogs(updated);
      showToast(`🗑️ Blog "${title}" deleted.`);
    }
  };

  const handleToggleStatus = (blogId) => {
    const updated = blogs.map(b => {
      if (b.id === blogId) {
        const next = b.status === 'published' ? 'draft' : 'published';
        return { ...b, status: next };
      }
      return b;
    });
    persistBlogs(updated);
    showToast('Blog status updated.');
  };

  const handleSaveBlog = useCallback(() => {
    if (!editingBlog) return;
    if (!editingBlog.title) {
      alert('Blog title is required.');
      return;
    }

    // Auto-generate slug if empty
    if (!editingBlog.slug) {
      editingBlog.slug = slugify(editingBlog.title);
    }

    // Update reading time
    editingBlog.readTime = getReadingTime(editingBlog.content);

    // Save revision
    const revision = {
      timestamp: new Date().toISOString(),
      content: editingBlog.content,
      title: editingBlog.title
    };
    editingBlog.revisions = [...(editingBlog.revisions || []).slice(-10), revision];

    const existingIndex = blogs.findIndex(b => b.id === editingBlog.id);
    let updated;
    if (existingIndex >= 0) {
      updated = blogs.map(b => b.id === editingBlog.id ? editingBlog : b);
    } else {
      updated = [editingBlog, ...blogs];
    }

    persistBlogs(updated);
    showToast(`✅ Blog "${editingBlog.title}" saved successfully!`);
  }, [editingBlog, blogs, persistBlogs]);

  const handlePublishBlog = useCallback(() => {
    if (!editingBlog) return;
    editingBlog.status = 'published';
    handleSaveBlog();
    showToast(`🚀 Blog "${editingBlog.title}" published live!`);
  }, [editingBlog, handleSaveBlog]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (view === 'editor' && editingBlog) {
      autoSaveTimerRef.current = setInterval(() => {
        try {
          localStorage.setItem(STORAGE_KEY_DRAFTS, JSON.stringify(editingBlog));
        } catch {}
      }, 30000);
    }
    return () => { if (autoSaveTimerRef.current) clearInterval(autoSaveTimerRef.current); };
  }, [view, editingBlog]);

  // Filter blogs
  const filteredBlogs = blogs.filter(b => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!b.title?.toLowerCase().includes(q) && !b.category?.toLowerCase().includes(q) && !b.slug?.toLowerCase().includes(q)) return false;
    }
    if (categoryFilter !== 'All Articles' && b.category !== categoryFilter) return false;
    return true;
  });

  // ═══════════════════════════════════════════════════════════════
  // EDITOR VIEW
  // ═══════════════════════════════════════════════════════════════
  if (view === 'editor' && editingBlog) {
    const isNew = !blogs.find(b => b.id === editingBlog.id);
    const quality = getContentQuality(editingBlog.content);

    return (
      <div className="blog-editor-view">
        {/* Editor Header */}
        <div className="blog-editor-header">
          <button type="button" className="btn-back" onClick={() => { handleSaveBlog(); setView('list'); }}>
            <ArrowLeft size={16} />
            <span>Back to Blogs</span>
          </button>
          <div className="editor-header-actions">
            <div className="content-quality-badge" style={{ background: `${quality.color}15`, border: `1px solid ${quality.color}40`, color: quality.color }}>
              <span>{quality.icon}</span>
              <span>{quality.words} words — {quality.label}</span>
            </div>
            <span className={`status-pill-inline ${editingBlog.status}`}>
              {editingBlog.status === 'published' ? '● Published' : editingBlog.status === 'scheduled' ? '◐ Scheduled' : '○ Draft'}
            </span>
            <button type="button" className="btn-secondary" onClick={handleSaveBlog}>
              <Save size={14} /> Save Draft
            </button>
            <button type="button" className="btn-primary" onClick={handlePublishBlog}>
              <Sparkles size={14} /> Publish Live
            </button>
          </div>
        </div>

        {/* Editor + SEO Split Layout */}
        <div className="blog-editor-split">
          {/* Left: Main Editor */}
          <div className="blog-editor-main">
            {/* Title */}
            <input
              type="text"
              className="blog-title-input"
              value={editingBlog.title}
              onChange={e => {
                const title = e.target.value;
                const updates = { ...editingBlog, title };
                if (!editingBlog._slugManual) {
                  updates.slug = slugify(title);
                  if (updates.seo) updates.seo.metaTitle = title;
                }
                setEditingBlog(updates);
              }}
              placeholder="Enter your blog headline..."
            />

            {/* Slug */}
            <div className="blog-slug-row">
              <span className="slug-prefix-text">#/blog/</span>
              <input
                type="text"
                className="blog-slug-input"
                value={editingBlog.slug}
                onChange={e => setEditingBlog({ ...editingBlog, slug: slugify(e.target.value), _slugManual: true })}
                placeholder="url-slug"
              />
            </div>

            {/* Cover Image Upload / URL */}
            <ImageUploadField
              label="Blog Cover Image"
              value={editingBlog.coverImage || ''}
              onChange={val => setEditingBlog({ ...editingBlog, coverImage: val })}
              placeholder="Paste image URL or click above to upload from device..."
              altText={editingBlog.coverImageAlt || ''}
              onAltTextChange={val => setEditingBlog({ ...editingBlog, coverImageAlt: val })}
              showAltField={true}
            />

            {/* WYSIWYG Editor */}
            <RichTextEditor
              initialContent={editingBlog.content}
              onChange={html => setEditingBlog(prev => ({ ...prev, content: html }))}
              placeholder="Start writing your article. Use the toolbar for formatting, or press Ctrl+B for Bold, Ctrl+I for Italic..."
              minHeight={350}
              maxHeight={700}
            />

            {/* Category & Tags */}
            <div className="blog-meta-row">
              <div className="blog-meta-field">
                <label><Tag size={12} /> Category</label>
                <select
                  className="seo-select"
                  value={editingBlog.category}
                  onChange={e => setEditingBlog({ ...editingBlog, category: e.target.value })}
                >
                  {BLOG_CATEGORIES.filter(c => c !== 'All Articles').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="blog-meta-field">
                <label><Calendar size={12} /> Publish Date</label>
                <input
                  type="text"
                  className="seo-input"
                  value={editingBlog.publishedDate}
                  onChange={e => setEditingBlog({ ...editingBlog, publishedDate: e.target.value })}
                />
              </div>
            </div>

            {/* Excerpt / Meta Description */}
            <div className="blog-meta-field" style={{ marginTop: '0.75rem' }}>
              <label>Excerpt / Summary</label>
              <textarea
                rows={2}
                className="seo-textarea"
                value={editingBlog.excerpt}
                onChange={e => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                placeholder="Brief summary shown in blog cards and search results..."
              />
            </div>

            {/* Suggested Tour Packages */}
            <div className="blog-meta-field" style={{ marginTop: '0.75rem' }}>
              <label>
                <Link2 size={12} /> Suggested Tour Packages ({editingBlog.suggestedTourIds?.length || 0}/3)
              </label>
              <div className="suggested-tours-grid">
                {TOURS_DATA.slice(0, 12).map(tour => {
                  const isChecked = (editingBlog.suggestedTourIds || []).includes(tour.id);
                  return (
                    <label key={tour.id} className={`tour-check-box ${isChecked ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          const current = editingBlog.suggestedTourIds || [];
                          if (isChecked) {
                            setEditingBlog({ ...editingBlog, suggestedTourIds: current.filter(id => id !== tour.id) });
                          } else if (current.length < 3) {
                            setEditingBlog({ ...editingBlog, suggestedTourIds: [...current, tour.id] });
                          }
                        }}
                      />
                      <span>{tour.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Revision History */}
            {editingBlog.revisions && editingBlog.revisions.length > 0 && (
              <div className="revision-history-section">
                <label><Clock size={12} /> Revision History ({editingBlog.revisions.length})</label>
                <div className="revision-list">
                  {editingBlog.revisions.slice().reverse().slice(0, 5).map((rev, i) => (
                    <div key={i} className="revision-item">
                      <span className="rev-time">{new Date(rev.timestamp).toLocaleString()}</span>
                      <button
                        type="button"
                        className="btn-restore"
                        onClick={() => {
                          if (window.confirm('Restore this version? Current content will be replaced.')) {
                            setEditingBlog({ ...editingBlog, content: rev.content, title: rev.title });
                          }
                        }}
                      >
                        Restore
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: SEO Assistant */}
          <div className="blog-editor-sidebar">
            <SEOAssistant
              title={editingBlog.title}
              slug={editingBlog.slug}
              content={editingBlog.content}
              metaTitle={editingBlog.seo?.metaTitle || editingBlog.title}
              metaDescription={editingBlog.seo?.metaDescription || editingBlog.excerpt}
              focusKeyword={editingBlog.seo?.focusKeyword || ''}
              canonicalUrl={editingBlog.canonicalUrl || ''}
              coverImage={editingBlog.coverImage || ''}
              allowIndexing={editingBlog.allowIndexing !== false}
              contentType="blog"
              expertInsights={editingBlog.expertInsights || ''}
              sourceVerification={editingBlog.sourceVerification || ''}
              searchIntent={editingBlog.searchIntent || 'informational'}
              onMetaTitleChange={v => setEditingBlog({ ...editingBlog, seo: { ...editingBlog.seo, metaTitle: v } })}
              onMetaDescriptionChange={v => setEditingBlog({ ...editingBlog, seo: { ...editingBlog.seo, metaDescription: v }, excerpt: v })}
              onFocusKeywordChange={v => setEditingBlog({ ...editingBlog, seo: { ...editingBlog.seo, focusKeyword: v } })}
              onCanonicalUrlChange={v => setEditingBlog({ ...editingBlog, canonicalUrl: v })}
              onSlugChange={v => setEditingBlog({ ...editingBlog, slug: slugify(v), _slugManual: true })}
              onAllowIndexingChange={v => setEditingBlog({ ...editingBlog, allowIndexing: v })}
              onExpertInsightsChange={v => setEditingBlog({ ...editingBlog, expertInsights: v })}
              onSourceVerificationChange={v => setEditingBlog({ ...editingBlog, sourceVerification: v })}
              onSearchIntentChange={v => setEditingBlog({ ...editingBlog, searchIntent: v })}
            />
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // LIST VIEW
  // ═══════════════════════════════════════════════════════════════
  return (
    <div className="blog-manager-view">
      {/* Toast */}
      {toastMessage && (
        <div className="admin-toast-banner animate-fade-in"><span>{toastMessage}</span></div>
      )}

      {/* Stats Strip */}
      <div className="blog-stats-strip">
        <div className="blog-stat-card">
          <span className="stat-label">Total Articles</span>
          <span className="stat-value">{blogs.length}</span>
        </div>
        <div className="blog-stat-card">
          <span className="stat-label">Published</span>
          <span className="stat-value text-emerald">{blogs.filter(b => b.status === 'published').length}</span>
        </div>
        <div className="blog-stat-card">
          <span className="stat-label">Drafts</span>
          <span className="stat-value text-amber">{blogs.filter(b => b.status !== 'published').length}</span>
        </div>
        <div className="blog-stat-card">
          <span className="stat-label">Thin Content (need update)</span>
          <span className="stat-value text-red">{blogs.filter(b => getContentQuality(b.content).words < 300).length}</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="blog-toolbar">
        <div className="blog-search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search blogs by title, category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="blog-search-input"
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery('')}><X size={14} /></button>
          )}
        </div>
        <div className="blog-filter-pills">
          {['All Articles', 'Destination Guides', 'Honeymoon & Romance', 'Luxury Stays'].map(cat => (
            <button
              key={cat}
              className={`blog-pill ${categoryFilter === cat ? 'active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <button type="button" className="btn-primary btn-create-blog" onClick={handleCreateNew}>
          <Plus size={15} /> New Blog Post
        </button>
      </div>

      {/* Blog Table */}
      <div className="blog-table-container">
        <table className="blog-table">
          <thead>
            <tr>
              <th>Article</th>
              <th>Category</th>
              <th>Content Quality</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map(blog => {
              const quality = getContentQuality(blog.content);
              const isLive = blog.status === 'published';
              return (
                <tr key={blog.id} className={!isLive ? 'row-draft' : ''}>
                  <td className="cell-article">
                    <div className="blog-article-cell">
                      {blog.coverImage && (
                        <div className="blog-thumb">
                          <img src={blog.coverImage} alt={blog.title} />
                        </div>
                      )}
                      <div className="blog-article-info">
                        <strong className="blog-title-text">{blog.title}</strong>
                        <span className="blog-slug-text">#/blog/{blog.slug}</span>
                        <span className="blog-readtime">{blog.readTime || getReadingTime(blog.content)}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="category-badge">{blog.category}</span></td>
                  <td>
                    <span className="quality-badge" style={{ color: quality.color, background: `${quality.color}15`, border: `1px solid ${quality.color}30` }}>
                      {quality.icon} {quality.words}w — {quality.label}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`status-toggle-btn ${isLive ? 'published' : 'draft'}`}
                      onClick={() => handleToggleStatus(blog.id)}
                    >
                      {isLive ? <Eye size={14} /> : <EyeOff size={14} />}
                      <span>{isLive ? 'Published' : 'Draft'}</span>
                    </button>
                  </td>
                  <td><span className="date-text">{blog.publishedDate}</span></td>
                  <td>
                    <div className="blog-actions-row">
                      <button type="button" className="btn-table-action edit" onClick={() => handleEditBlog(blog)} title="Edit">
                        <Edit3 size={14} />
                      </button>
                      <button type="button" className="btn-table-action" onClick={() => handleDuplicateBlog(blog)} title="Duplicate">
                        <Copy size={14} />
                      </button>
                      <button type="button" className="btn-table-action delete" onClick={() => handleDeleteBlog(blog.id, blog.title)} title="Delete">
                        <Trash2 size={14} />
                      </button>
                      {isLive && (
                        <a href={`#/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer" className="btn-table-action view" title="View on Site">
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
