import React, { useState, useMemo } from 'react';
import {
  CheckCircle, AlertCircle, XCircle, Search, Globe, Share2,
  ExternalLink, Shield, Sparkles, ChevronDown, Eye, Tag,
  FileText, Link2, ImageIcon, Code, Zap, Brain, Target, TrendingUp
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════
// COMFORT JOURNEY — WIX-LEVEL SEO ASSISTANT
// Live SEO analysis panel with checklist, structured data, AEO/GEO.
// Mirrors the Wix SEO Settings UI from the screenshots.
// ═══════════════════════════════════════════════════════════════════

const PRIORITY_ORDER = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
const PRIORITY_COLORS = {
  CRITICAL: { bg: 'rgba(239,68,68,0.15)', text: '#EF4444', border: 'rgba(239,68,68,0.4)' },
  HIGH: { bg: 'rgba(255,137,47,0.15)', text: '#FF892F', border: 'rgba(255,137,47,0.4)' },
  MEDIUM: { bg: 'rgba(245,158,11,0.15)', text: '#F59E0B', border: 'rgba(245,158,11,0.4)' },
  LOW: { bg: 'rgba(16,185,129,0.15)', text: '#10B981', border: 'rgba(16,185,129,0.4)' }
};

export default function SEOAssistant({
  title = '',
  slug = '',
  content = '',
  metaTitle = '',
  metaDescription = '',
  focusKeyword = '',
  canonicalUrl = '',
  coverImage = '',
  onMetaTitleChange,
  onMetaDescriptionChange,
  onFocusKeywordChange,
  onCanonicalUrlChange,
  onSlugChange,
  // AEO/GEO fields
  expertInsights = '',
  sourceVerification = '',
  searchIntent = 'informational',
  onExpertInsightsChange,
  onSourceVerificationChange,
  onSearchIntentChange,
  // Robots
  allowIndexing = true,
  onAllowIndexingChange,
  // Structured Data
  contentType = 'blog', // 'blog' | 'tour'
  structuredData = null,
  siteUrl = 'https://www.comfortjourneyy.com'
}) {
  const [activeTab, setActiveTab] = useState('assistant'); // 'assistant' | 'basics' | 'advanced' | 'social'

  // ─── Analyze Content for SEO Checks ───
  const analysis = useMemo(() => {
    const kw = (focusKeyword || '').toLowerCase().trim();
    const titleLower = (title || '').toLowerCase();
    const metaTitleLower = (metaTitle || title || '').toLowerCase();
    const metaDescLower = (metaDescription || '').toLowerCase();
    const contentLower = (content || '').toLowerCase();
    const contentText = (content || '').replace(/<[^>]*>/g, '');
    const wordCount = contentText.split(/\s+/).filter(Boolean).length;

    // Extract headings from HTML content
    const h2Matches = content.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [];
    const h3Matches = content.match(/<h3[^>]*>(.*?)<\/h3>/gi) || [];
    const subheadings = [...h2Matches, ...h3Matches].map(h => h.replace(/<[^>]*>/g, '').toLowerCase());

    // Extract images
    const imgMatches = content.match(/<img[^>]*>/gi) || [];
    const imgsWithAlt = imgMatches.filter(img => /alt="[^"]+"/i.test(img));

    const metaTitleLen = (metaTitle || title || '').length;
    const metaDescLen = (metaDescription || '').length;

    const checks = [];

    // CRITICAL
    checks.push({
      id: 'indexing',
      label: 'Allow this post to get indexed',
      detail: allowIndexing ? 'Page is set to be indexed by search engines' : 'Page is set to noindex — search engines will NOT crawl it',
      priority: 'CRITICAL',
      passed: allowIndexing
    });

    // HIGH
    checks.push({
      id: 'kw-in-title',
      label: 'Add focus keyword to title tag',
      detail: kw ? (metaTitleLower.includes(kw) ? `"${focusKeyword}" found in title` : `"${focusKeyword}" not found in title`) : 'Set a focus keyword first',
      priority: 'HIGH',
      passed: kw ? metaTitleLower.includes(kw) : false
    });

    checks.push({
      id: 'kw-in-h1',
      label: "Add focus keyword to H1 (post's title)",
      detail: kw ? (titleLower.includes(kw) ? `"${focusKeyword}" found in H1` : `"${focusKeyword}" not found in H1`) : 'Set a focus keyword first',
      priority: 'HIGH',
      passed: kw ? titleLower.includes(kw) : false
    });

    checks.push({
      id: 'image-video',
      label: 'Add an image or video to this post',
      detail: coverImage || imgMatches.length > 0 ? `${imgMatches.length + (coverImage ? 1 : 0)} media asset(s) detected` : 'No images or videos found',
      priority: 'HIGH',
      passed: !!(coverImage || imgMatches.length > 0)
    });

    // MEDIUM
    checks.push({
      id: 'kw-in-subheading',
      label: 'Add focus keyword to at least one H2 or H3 (subheading)',
      detail: kw ? (subheadings.some(h => h.includes(kw)) ? 'Keyword found in subheading' : 'Keyword not found in any H2/H3') : 'Set a focus keyword first',
      priority: 'MEDIUM',
      passed: kw ? subheadings.some(h => h.includes(kw)) : false
    });

    checks.push({
      id: 'alt-text',
      label: 'Write alt text for all images',
      detail: imgMatches.length === 0 ? 'No images to check' : `${imgsWithAlt.length}/${imgMatches.length} images have alt text`,
      priority: 'MEDIUM',
      passed: imgMatches.length === 0 || imgsWithAlt.length === imgMatches.length
    });

    checks.push({
      id: 'kw-in-body',
      label: 'Add focus keyword to body text',
      detail: kw ? (contentLower.includes(kw) ? 'Keyword found in body content' : 'Keyword not found in body') : 'Set a focus keyword first',
      priority: 'MEDIUM',
      passed: kw ? contentLower.includes(kw) : false
    });

    checks.push({
      id: 'content-length',
      label: 'Write at least 300 words of content',
      detail: `Current word count: ${wordCount}`,
      priority: 'MEDIUM',
      passed: wordCount >= 300
    });

    // LOW
    checks.push({
      id: 'kw-in-meta',
      label: 'Write meta description with focus keyword',
      detail: kw ? (metaDescLower.includes(kw) ? 'Keyword found in meta description' : 'Keyword not in meta description') : 'Set a focus keyword first',
      priority: 'LOW',
      passed: kw ? metaDescLower.includes(kw) : false
    });

    checks.push({
      id: 'kw-in-slug',
      label: 'Add focus keyword to URL slug',
      detail: kw ? ((slug || '').toLowerCase().includes(kw.replace(/\s+/g, '-')) ? 'Keyword found in slug' : 'Keyword not in slug') : 'Set a focus keyword first',
      priority: 'LOW',
      passed: kw ? (slug || '').toLowerCase().includes(kw.replace(/\s+/g, '-')) : false
    });

    checks.push({
      id: 'meta-title-length',
      label: 'Optimize title tag length (50-60 chars)',
      detail: `Current: ${metaTitleLen} characters (target: 50-60)`,
      priority: 'LOW',
      passed: metaTitleLen >= 40 && metaTitleLen <= 65
    });

    checks.push({
      id: 'meta-desc-length',
      label: 'Optimize meta description length (120-160 chars)',
      detail: `Current: ${metaDescLen} characters (target: 120-160)`,
      priority: 'LOW',
      passed: metaDescLen >= 100 && metaDescLen <= 165
    });

    checks.push({
      id: 'structured-data',
      label: 'Include markup to be eligible for rich results',
      detail: 'Structured data (JSON-LD) will be auto-generated from your content',
      priority: 'LOW',
      passed: true // We auto-generate it
    });

    // Sort by priority, then by passed status
    checks.sort((a, b) => {
      if (a.passed !== b.passed) return a.passed ? 1 : -1;
      return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    });

    // Count by priority
    const counts = { critical: 0, high: 0, medium: 0, low: 0 };
    checks.forEach(c => {
      if (c.passed) counts[c.priority.toLowerCase()] = (counts[c.priority.toLowerCase()] || 0);
    });

    const passedCount = checks.filter(c => c.passed).length;
    const totalCount = checks.length;
    const score = Math.round((passedCount / totalCount) * 100);

    return { checks, passedCount, totalCount, score, wordCount };
  }, [title, slug, content, metaTitle, metaDescription, focusKeyword, coverImage, allowIndexing]);

  // ─── Generate JSON-LD Structured Data ───
  const generatedJsonLd = useMemo(() => {
    if (contentType === 'tour') {
      return {
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: title,
        description: metaDescription,
        url: `${siteUrl}/tour/${slug}`,
        provider: {
          '@type': 'TravelAgency',
          name: 'Comfort Journey',
          url: siteUrl,
          telephone: '+91-9111-55-3778',
          address: { '@type': 'PostalAddress', addressLocality: 'Bhopal', addressCountry: 'IN' }
        }
      };
    }
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: metaDescription,
      url: `${siteUrl}/blog/${slug}`,
      author: { '@type': 'Organization', name: 'Comfort Journey' },
      publisher: {
        '@type': 'Organization',
        name: 'Comfort Journey',
        url: siteUrl
      }
    };
  }, [title, metaDescription, slug, contentType, siteUrl]);

  const scoreColor = analysis.score >= 80 ? '#10B981' : analysis.score >= 50 ? '#F59E0B' : '#EF4444';

  // Tab buttons
  const tabs = [
    { id: 'assistant', label: 'Assistant' },
    { id: 'basics', label: 'Basics' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'social', label: 'Social s...' }
  ];

  return (
    <div className="seo-assistant-container">
      {/* ═══ Header with tabs ═══ */}
      <div className="seo-header-row">
        <div className="seo-title-row">
          <Search size={18} className="text-sky" />
          <h4>SEO Settings</h4>
        </div>
      </div>

      <div className="seo-tabs-row">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`seo-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ═══ Assistant Tab ═══ */}
      {activeTab === 'assistant' && (
        <div className="seo-tab-content">
          <div className="seo-score-card">
            <div className="seo-score-header">
              <Sparkles size={16} className="text-amber" />
              <span className="seo-score-title">SEO Assistant</span>
            </div>
            <p className="seo-score-subtitle">Follow tasks to optimize this post for search engines and visitors</p>

            {/* Score Summary Badges */}
            <div className="seo-score-badges">
              {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(priority => {
                const total = analysis.checks.filter(c => c.priority === priority);
                const passed = total.filter(c => c.passed).length;
                const color = PRIORITY_COLORS[priority];
                return (
                  <div key={priority} className="seo-score-badge-item">
                    {passed === total.length ? (
                      <CheckCircle size={16} style={{ color: color.text }} />
                    ) : (
                      <AlertCircle size={16} style={{ color: color.text }} />
                    )}
                    <span style={{ color: color.text, fontWeight: 700 }}>
                      {passed}/{total.length}
                    </span>
                    <span className="badge-label">{priority.charAt(0) + priority.slice(1).toLowerCase()}</span>
                  </div>
                );
              })}
            </div>

            {/* Focus Keyword Display */}
            <div className="seo-focus-kw-display">
              <CheckCircle size={14} className="text-emerald" />
              <span className="kw-label">Focus keyword</span>
              <span className="kw-value">{focusKeyword || '(not set)'}</span>
            </div>
          </div>

          {/* Checklist */}
          <div className="seo-checklist-container">
            {analysis.checks.map(check => {
              const color = PRIORITY_COLORS[check.priority];
              return (
                <div key={check.id} className="seo-check-row">
                  <div className="seo-check-status">
                    {check.passed ? (
                      <CheckCircle size={16} className="text-emerald" />
                    ) : (
                      <AlertCircle size={16} style={{ color: color.text }} />
                    )}
                  </div>
                  <div className="seo-check-info">
                    <span className="seo-check-label">{check.label}</span>
                    {!check.passed && <span className="seo-check-detail">{check.detail}</span>}
                  </div>
                  <span
                    className="seo-priority-badge"
                    style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}
                  >
                    {check.priority}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Score Bar */}
          <div className="seo-overall-score">
            <div className="seo-score-bar-header">
              <span>Overall SEO Score</span>
              <strong style={{ color: scoreColor }}>{analysis.score}/100</strong>
            </div>
            <div className="seo-score-bar-track">
              <div className="seo-score-bar-fill" style={{ width: `${analysis.score}%`, background: scoreColor }} />
            </div>
          </div>
        </div>
      )}

      {/* ═══ Basics Tab ═══ */}
      {activeTab === 'basics' && (
        <div className="seo-tab-content">
          <div className="seo-field-group">
            <div className="seo-field-label-row">
              <label>SEO Title</label>
              <span className={`char-count ${(metaTitle || title || '').length > 60 ? 'over' : ''}`}>
                {(metaTitle || title || '').length}/60
              </span>
            </div>
            <input
              type="text"
              className="seo-input"
              value={metaTitle || title}
              onChange={e => onMetaTitleChange?.(e.target.value)}
              placeholder="SEO-optimized title for search results"
            />
            <div className="seo-char-bar">
              <div
                className="seo-char-fill"
                style={{
                  width: `${Math.min(100, ((metaTitle || title || '').length / 60) * 100)}%`,
                  background: (metaTitle || title || '').length > 60 ? '#EF4444' : (metaTitle || title || '').length >= 40 ? '#10B981' : '#F59E0B'
                }}
              />
            </div>
          </div>

          <div className="seo-field-group">
            <div className="seo-field-label-row">
              <label>Meta Description</label>
              <span className={`char-count ${(metaDescription || '').length > 160 ? 'over' : ''}`}>
                {(metaDescription || '').length}/160
              </span>
            </div>
            <textarea
              rows={3}
              className="seo-textarea"
              value={metaDescription}
              onChange={e => onMetaDescriptionChange?.(e.target.value)}
              placeholder="Compelling description for search engine results (120-160 chars ideal)"
            />
            <div className="seo-char-bar">
              <div
                className="seo-char-fill"
                style={{
                  width: `${Math.min(100, ((metaDescription || '').length / 160) * 100)}%`,
                  background: (metaDescription || '').length > 160 ? '#EF4444' : (metaDescription || '').length >= 120 ? '#10B981' : '#F59E0B'
                }}
              />
            </div>
          </div>

          <div className="seo-field-group">
            <label>Focus Keyword</label>
            <input
              type="text"
              className="seo-input"
              value={focusKeyword}
              onChange={e => onFocusKeywordChange?.(e.target.value)}
              placeholder="Primary keyword to target (e.g. kashmir luxury tour)"
            />
          </div>

          <div className="seo-field-group">
            <label>URL Slug</label>
            <div className="seo-slug-row">
              <span className="seo-slug-prefix">{siteUrl}/{contentType === 'tour' ? 'tour' : 'blog'}/</span>
              <input
                type="text"
                className="seo-input seo-slug-input"
                value={slug}
                onChange={e => onSlugChange?.(e.target.value)}
                placeholder="url-friendly-slug"
              />
            </div>
          </div>
        </div>
      )}

      {/* ═══ Advanced Tab ═══ */}
      {activeTab === 'advanced' && (
        <div className="seo-tab-content">
          {/* Structured Data */}
          <div className="seo-advanced-section">
            <div className="seo-section-header" onClick={() => {}}>
              <Code size={16} className="text-amber" />
              <div>
                <strong>Structured data markup</strong>
                <p>Make your posts eligible for rich results and improve how LLMs like ChatGPT process your content.</p>
              </div>
            </div>
            <pre className="seo-json-preview">
              {JSON.stringify(generatedJsonLd, null, 2)}
            </pre>
          </div>

          {/* Robots Meta */}
          <div className="seo-advanced-section">
            <div className="seo-section-header">
              <Shield size={16} className="text-sky" />
              <div>
                <strong>Robots meta tag</strong>
                <p>Select the relevant instructions, so bots know what info to display after crawling this page.</p>
              </div>
            </div>
            <label className="seo-toggle-row">
              <input
                type="checkbox"
                checked={allowIndexing}
                onChange={e => onAllowIndexingChange?.(e.target.checked)}
              />
              <span>Allow search engines to index this page</span>
            </label>
          </div>

          {/* Canonical URL */}
          <div className="seo-advanced-section">
            <div className="seo-section-header">
              <Link2 size={16} className="text-emerald" />
              <div>
                <strong>Canonical URL</strong>
                <p>Set the preferred URL for this page to avoid duplicate content issues.</p>
              </div>
            </div>
            <input
              type="url"
              className="seo-input"
              value={canonicalUrl}
              onChange={e => onCanonicalUrlChange?.(e.target.value)}
              placeholder={`${siteUrl}/${contentType === 'tour' ? 'tour' : 'blog'}/${slug}`}
            />
          </div>

          {/* AEO / GEO / AIO Readiness */}
          <div className="seo-advanced-section seo-aeo-section">
            <div className="seo-section-header">
              <Brain size={16} className="text-purple" />
              <div>
                <strong>AEO / GEO / AIO Readiness</strong>
                <p>Optimize for AI-driven search engines (Google SGE, ChatGPT, Perplexity, Gemini).</p>
              </div>
            </div>

            <div className="seo-field-group">
              <label>
                <Target size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />
                Search Intent
              </label>
              <select
                className="seo-select"
                value={searchIntent}
                onChange={e => onSearchIntentChange?.(e.target.value)}
              >
                <option value="informational">Informational — User wants to learn</option>
                <option value="navigational">Navigational — User looking for specific page</option>
                <option value="transactional">Transactional — User wants to book/buy</option>
                <option value="commercial">Commercial Investigation — User comparing options</option>
              </select>
            </div>

            <div className="seo-field-group">
              <label>
                <Zap size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />
                Expert Insights (E-E-A-T Signal)
              </label>
              <textarea
                rows={3}
                className="seo-textarea"
                value={expertInsights}
                onChange={e => onExpertInsightsChange?.(e.target.value)}
                placeholder="Add unique expert knowledge, first-hand experience, or proprietary data that AI models can cite as authoritative..."
              />
            </div>

            <div className="seo-field-group">
              <label>
                <Shield size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />
                Source Verification
              </label>
              <textarea
                rows={2}
                className="seo-textarea"
                value={sourceVerification}
                onChange={e => onSourceVerificationChange?.(e.target.value)}
                placeholder="List data sources, credentials, or references that verify the expertise behind this content..."
              />
            </div>
          </div>
        </div>
      )}

      {/* ═══ Social Sharing Tab ═══ */}
      {activeTab === 'social' && (
        <div className="seo-tab-content">
          {/* Google Preview */}
          <h5 className="seo-preview-heading">Google Search Preview</h5>
          <div className="seo-google-preview">
            <span className="seo-google-url">{siteUrl} › {contentType === 'tour' ? 'tour' : 'blog'} › {slug || 'your-page'}</span>
            <h4 className="seo-google-title">{metaTitle || title || 'Page Title'} | Comfort Journey</h4>
            <p className="seo-google-desc">{metaDescription || 'Add a meta description to see how your page will appear in search results...'}</p>
          </div>

          {/* WhatsApp / Social Preview */}
          <h5 className="seo-preview-heading" style={{ marginTop: '1.5rem' }}>WhatsApp / Social Share Preview</h5>
          <div className="seo-social-preview">
            {coverImage && (
              <div className="seo-social-thumb">
                <img src={coverImage} alt="OG Preview" />
              </div>
            )}
            <div className="seo-social-info">
              <span className="seo-social-domain">COMFORTJOURNEYY.COM</span>
              <h4 className="seo-social-title">{metaTitle || title || 'Page Title'}</h4>
              <p className="seo-social-desc">{metaDescription || 'Meta description preview...'}</p>
            </div>
          </div>

          {/* Twitter Preview */}
          <h5 className="seo-preview-heading" style={{ marginTop: '1.5rem' }}>Twitter / X Card Preview</h5>
          <div className="seo-twitter-preview">
            {coverImage && (
              <div className="seo-twitter-thumb">
                <img src={coverImage} alt="Twitter Card" />
              </div>
            )}
            <div className="seo-twitter-info">
              <span className="seo-twitter-domain">comfortjourneyy.com</span>
              <h4 className="seo-twitter-title">{metaTitle || title || 'Page Title'}</h4>
              <p className="seo-twitter-desc">{metaDescription || 'Meta description...'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
