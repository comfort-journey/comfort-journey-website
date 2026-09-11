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

// Helper for intelligent, resilient keyword matching (exact, normalized, and multi-word key terms)
function checkKeywordMatch(text, keyword) {
  if (!text || !keyword) return { matched: false };
  const t = String(text).toLowerCase();
  const kw = String(keyword).toLowerCase().trim();
  if (!kw) return { matched: false };

  // 1. Direct exact phrase match
  if (t.includes(kw)) return { matched: true, type: 'exact' };

  // 2. Normalized alphanumeric match (ignores punctuation, dashes, slashes, extra spaces)
  const normT = t.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const normKw = kw.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  if (normT.includes(normKw)) return { matched: true, type: 'normalized' };

  // 3. Multi-word phrase check (if keyword has 2+ words of >=3 chars)
  const words = normKw.split(' ').filter(w => w.length >= 3);
  if (words.length >= 2) {
    const matchedWords = words.filter(w => normT.includes(w));
    // If at least 70% of key words match or both first & last key word match
    if (matchedWords.length / words.length >= 0.7 || (normT.includes(words[0]) && normT.includes(words[words.length - 1]))) {
      return { matched: true, type: 'key-terms', matchedCount: matchedWords.length };
    }
  }

  return { matched: false };
}

export default function SEOAssistant({
  title = '',
  slug = '',
  content = '',
  contentBreakdown = null, // { totalWords, overviewWords, itinWords, incWords, highlightsWords }
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
    const kw = (focusKeyword || '').trim();
    const isTour = contentType === 'tour';

    const contentText = (content || '').replace(/<[^>]*>/g, ' ');
    const wordCount = contentBreakdown?.totalWords || contentText.split(/\s+/).filter(Boolean).length;

    // Extract headings from HTML content (H2, H3, and H4)
    const h2Matches = content.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [];
    const h3Matches = content.match(/<h3[^>]*>(.*?)<\/h3>/gi) || [];
    const h4Matches = content.match(/<h4[^>]*>(.*?)<\/h4>/gi) || [];
    const subheadings = [...h2Matches, ...h3Matches, ...h4Matches].map(h => h.replace(/<[^>]*>/g, '').trim());

    // Extract images
    const imgMatches = content.match(/<img[^>]*>/gi) || [];
    const imgsWithAlt = imgMatches.filter(img => /alt="[^"]+"/i.test(img));

    const metaTitleLen = (metaTitle || title || '').length;
    const metaDescLen = (metaDescription || '').length;

    // Keyword match tests
    const kwInTitle = kw ? checkKeywordMatch(metaTitle || title, kw).matched : false;
    const kwInH1 = kw ? checkKeywordMatch(title, kw).matched : false;
    const matchedSubheading = kw ? subheadings.find(h => checkKeywordMatch(h, kw).matched) : null;
    const kwInSubheading = !!matchedSubheading;
    const kwInBody = kw ? checkKeywordMatch(contentText, kw).matched : false;
    const kwInMeta = kw ? checkKeywordMatch(metaDescription, kw).matched : false;
    const kwInSlug = kw ? checkKeywordMatch((slug || '').replace(/[-_]/g, ' '), kw).matched : false;

    // Target word counts: Tours are modular (overview + days + inclusions), so 250 words is standard Google depth; Blogs need 300+
    const wordTarget = isTour ? 250 : 300;
    const isWordCountPassed = wordCount >= wordTarget;

    const checks = [];

    // CRITICAL: Indexing
    checks.push({
      id: 'indexing',
      label: isTour ? 'Allow this tour package to get indexed' : 'Allow this post to get indexed',
      detail: allowIndexing 
        ? 'Search engines (Google, Bing) are allowed to index this page (robots="index, follow" and included in sitemap)' 
        : 'Search engines are blocked from indexing (robots="noindex, nofollow")',
      priority: 'CRITICAL',
      passed: allowIndexing
    });

    // HIGH: Title Tag
    checks.push({
      id: 'kw-in-title',
      label: 'Add focus keyword to SEO title tag',
      detail: kw 
        ? (kwInTitle ? `"${focusKeyword}" found in SEO title tag` : `"${focusKeyword}" not found in title tag. (Customize in SEO & Meta tab, or include in Package Name)`) 
        : 'Set a focus keyword in SEO & Meta tab first',
      priority: 'HIGH',
      passed: kw ? kwInTitle : false
    });

    // HIGH: H1 Heading
    checks.push({
      id: 'kw-in-h1',
      label: isTour ? 'Add focus keyword to Package Name (H1)' : "Add focus keyword to Article Title (H1)",
      detail: kw 
        ? (kwInH1 ? `"${focusKeyword}" found in ${isTour ? 'Package Name' : 'title'}` : `"${focusKeyword}" not found in ${isTour ? 'Package Name (Edit in Details & Hero tab)' : 'title'}`) 
        : 'Set a focus keyword first',
      priority: 'HIGH',
      passed: kw ? kwInH1 : false
    });

    // HIGH: Media Assets
    checks.push({
      id: 'image-video',
      label: isTour ? 'Add cover image & gallery photos' : 'Add an image or video to this post',
      detail: coverImage || imgMatches.length > 0 
        ? `${imgMatches.length + (coverImage ? 1 : 0)} media asset(s) detected across cover, schedule & gallery` 
        : `No images detected. Please upload a cover image in Details & Hero tab`,
      priority: 'HIGH',
      passed: !!(coverImage || imgMatches.length > 0)
    });

    // MEDIUM: Subheadings (H2/H3/H4)
    checks.push({
      id: 'kw-in-subheading',
      label: isTour ? 'Add focus keyword to an Itinerary Day Title (H3) or Subheading' : 'Add focus keyword to at least one H2 or H3 (subheading)',
      detail: kw 
        ? (kwInSubheading 
            ? `Focus keyword found in subheading: "${matchedSubheading.length > 36 ? matchedSubheading.slice(0, 36) + '...' : matchedSubheading}"` 
            : (isTour 
                ? `Keyword not found in subheadings. Include "${focusKeyword}" in any Day Title (H3), an itinerary activity subheading (H4), or customize the Itinerary Section Title (H2).`
                : `Keyword not found in subheadings. Include it in an H2 or H3 section heading.`)) 
        : 'Set a focus keyword in SEO & Meta tab first',
      priority: 'MEDIUM',
      passed: kw ? kwInSubheading : false
    });

    // MEDIUM: Alt text
    checks.push({
      id: 'alt-text',
      label: isTour ? 'Image accessibility & descriptive alt text' : 'Write alt text for all images',
      detail: isTour 
        ? 'All images have accessible descriptive alt text auto-generated from tour & day schedule titles'
        : (imgMatches.length === 0 ? 'No images to check' : `${imgsWithAlt.length}/${imgMatches.length} images have alt text`),
      priority: 'MEDIUM',
      passed: isTour ? true : (imgMatches.length === 0 || imgsWithAlt.length === imgMatches.length)
    });

    // MEDIUM: Body text
    checks.push({
      id: 'kw-in-body',
      label: isTour ? 'Add focus keyword to Tour Overview or Day descriptions' : 'Add focus keyword to body text',
      detail: kw 
        ? (kwInBody 
            ? `Focus keyword "${focusKeyword}" found in body content.` 
            : (isTour 
                ? `Keyword "${focusKeyword}" not found. Add it into your Tour Overview (Details & Hero tab) or in any Day description (Itinerary tab).`
                : `Keyword "${focusKeyword}" not found in article body content.`)) 
        : 'Set a focus keyword in SEO & Meta tab first',
      priority: 'MEDIUM',
      passed: kw ? kwInBody : false
    });

    // MEDIUM: Content Length & Breakdown
    let lengthDetail = '';
    if (isTour) {
      if (contentBreakdown) {
        lengthDetail = `Total: ${wordCount} words (Overview: ${contentBreakdown.overviewWords || 0}w • Itinerary: ${contentBreakdown.itinWords || 0}w • Inclusions: ${contentBreakdown.incWords || 0}w • Highlights: ${contentBreakdown.highlightsWords || 0}w). ${isWordCountPassed ? '✓ Meets recommended depth for Google ranking!' : `Need ~${wordTarget - wordCount} more words. Add detail to your Tour Overview or Day descriptions.`}`;
      } else {
        lengthDetail = `Current: ${wordCount} words (calculated from Overview, Day-by-Day schedule & Inclusions). ${isWordCountPassed ? '✓ Meets recommended depth for Google ranking!' : `Need ~${wordTarget - wordCount} more words in your Overview or Day descriptions.`}`;
      }
    } else {
      lengthDetail = `Current: ${wordCount} words (target: 300+ words for comprehensive editorial quality). ${isWordCountPassed ? '✓ Great editorial length!' : `Need ~${300 - wordCount} more words.`}`;
    }

    checks.push({
      id: 'content-length',
      label: isTour ? `Write comprehensive tour content (${wordTarget}+ words)` : 'Write at least 300 words of content',
      detail: lengthDetail,
      priority: 'MEDIUM',
      passed: isWordCountPassed
    });

    // LOW: Meta Description Keyword
    checks.push({
      id: 'kw-in-meta',
      label: 'Write meta description with focus keyword',
      detail: kw 
        ? (kwInMeta ? `Keyword found in meta description` : `Keyword not found in meta description. (Add in SEO & Meta tab)`) 
        : 'Set a focus keyword first',
      priority: 'LOW',
      passed: kw ? kwInMeta : false
    });

    // LOW: URL Slug Keyword
    checks.push({
      id: 'kw-in-slug',
      label: 'Add focus keyword to URL slug',
      detail: kw 
        ? (kwInSlug ? `Keyword found in slug (/${isTour ? 'tour' : 'blog'}/${slug})` : `Keyword not found in slug. (Customize in SEO & Meta tab)`) 
        : 'Set a focus keyword first',
      priority: 'LOW',
      passed: kw ? kwInSlug : false
    });

    // LOW: Meta Title Length
    checks.push({
      id: 'meta-title-length',
      label: 'Optimize title tag length (35-65 chars)',
      detail: `Current: ${metaTitleLen} characters (target: 35-65 chars for search engine results)`,
      priority: 'LOW',
      passed: metaTitleLen >= 35 && metaTitleLen <= 70
    });

    // LOW: Meta Description Length
    checks.push({
      id: 'meta-desc-length',
      label: 'Optimize meta description length (80-165 chars)',
      detail: `Current: ${metaDescLen} characters (target: 80-165 chars)`,
      priority: 'LOW',
      passed: metaDescLen >= 80 && metaDescLen <= 175
    });

    // LOW: Structured Data
    checks.push({
      id: 'structured-data',
      label: 'Include markup to be eligible for rich results',
      detail: isTour 
        ? 'TouristTrip & Product JSON-LD structured data is auto-generated for Google Rich Snippets'
        : 'BlogPosting JSON-LD structured data is auto-generated for Google Rich Snippets',
      priority: 'LOW',
      passed: true
    });

    // Sort by priority, then by passed status
    checks.sort((a, b) => {
      if (a.passed !== b.passed) return a.passed ? 1 : -1;
      return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    });

    // Count by priority
    const counts = { critical: 0, high: 0, medium: 0, low: 0 };
    checks.forEach(c => {
      if (c.passed) counts[c.priority.toLowerCase()] = (counts[c.priority.toLowerCase()] || 0) + 1;
    });

    const passedCount = checks.filter(c => c.passed).length;
    const totalCount = checks.length;
    const score = Math.round((passedCount / totalCount) * 100);

    return { checks, passedCount, totalCount, score, wordCount };
  }, [title, slug, content, contentBreakdown, metaTitle, metaDescription, focusKeyword, coverImage, allowIndexing, contentType]);

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
            <p className="seo-score-subtitle">
              Follow tasks to optimize this {contentType === 'tour' ? 'tour package' : 'article'} for search engines and travellers
            </p>

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
              <CheckCircle size={14} className={focusKeyword ? "text-emerald" : "text-amber"} />
              <span className="kw-label">Focus keyword</span>
              <span className="kw-value">{focusKeyword || '(not set — enter in Basics or SEO & Meta)'}</span>
            </div>

            {!focusKeyword && (
              <div style={{ background: 'rgba(255, 137, 47, 0.08)', border: '1px solid rgba(255, 137, 47, 0.25)', borderRadius: '8px', padding: '0.65rem 0.85rem', marginTop: '0.65rem', fontSize: '0.78rem', color: '#FFB347', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={15} style={{ flexShrink: 0 }} />
                <span>
                  💡 <strong>Tip:</strong> Set a <strong>Focus Keyword</strong> in the <em>SEO & Meta</em> tab (e.g. "{title ? title.split(' ').slice(0, 3).join(' ') : 'kashmir luxury tour'}") to check keyword placement across titles, subheadings, and body content.
                </span>
              </div>
            )}
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
              <span>Allow search engines to index this page (Recommended for published tours)</span>
            </label>
            <div style={{ fontSize: '0.75rem', color: allowIndexing ? '#10B981' : '#F59E0B', marginTop: '0.4rem', paddingLeft: '1.75rem' }}>
              {allowIndexing 
                ? '✓ robots="index, follow" active — Google will crawl, index, and rank this page in search results.'
                : '⚠ robots="noindex, nofollow" active — Page is hidden from Google and search results (useful for drafts).'}
            </div>
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
