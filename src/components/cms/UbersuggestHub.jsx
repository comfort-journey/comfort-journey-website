// =========================================================================
// COMFORT JOURNEY — UBERSUGGEST AI INTELLIGENCE & SEO COMMAND CENTER
// 2026 Expert Developer & Marketer Hub:
// 1. Live Keyword Opportunity Radar (Volume, CPC, SEO Difficulty)
// 2. 1-Click AI SEO Auto-Optimizer for Tours & Blogs
// 3. 1-Click Ubersuggest CSV Importer (Zero Code, Drag & Drop)
// 4. Competitor Gap Analysis (MakeMyTrip, Thrillophilia, EaseMyTrip)
// 5. Site Audit & Core Web Vitals Scorecard
// 6. Direct Deep-Links into Ubersuggest Projects
// =========================================================================

import React, { useState, useMemo } from 'react';
import {
  Sparkles, Search, TrendingUp, DollarSign, Target, ExternalLink,
  Upload, FileText, CheckCircle2, AlertTriangle, ArrowUpRight,
  ShieldCheck, RefreshCw, Filter, Layers, Copy, Check, Zap,
  Globe, Laptop, Award, Cpu, BookOpen
} from 'lucide-react';
import {
  UBERSUGGEST_TRAVEL_KEYWORDS,
  UBERSUGGEST_COMPETITOR_BENCHMARKS,
  UBERSUGGEST_SITE_AUDIT_SCORECARD,
  getKeywordRecommendations,
  generateSmartSeoPlan,
  parseUbersuggestCsvText
} from '../../data/ubersuggestKeywordData';
import { contentService } from '../../services/contentService';

export default function UbersuggestHub({ onApplySeoToTour, onToast }) {
  const [subTab, setSubTab] = useState('keywords'); // 'keywords' | 'ai-generator' | 'competitor-gap' | 'site-audit' | 'csv-import' | 'mcp-guide'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('all'); // 'all' | 'easy' | 'moderate' | 'hard'
  const [customKeywords, setCustomKeywords] = useState([]);
  const [copiedKey, setCopiedKey] = useState('');

  // AI Optimizer State
  const toursList = useMemo(() => contentService.getTours(), []);
  const [selectedTourId, setSelectedTourId] = useState(() => toursList[0]?.id || '');
  const selectedTour = useMemo(() => toursList.find(t => t.id === selectedTourId) || toursList[0], [toursList, selectedTourId]);
  const generatedPlan = useMemo(() => selectedTour ? generateSmartSeoPlan(selectedTour) : null, [selectedTour]);

  // Combined keywords (built-in + imported CSV)
  const allKeywords = useMemo(() => {
    return [...customKeywords, ...UBERSUGGEST_TRAVEL_KEYWORDS];
  }, [customKeywords]);

  // Filtered keywords
  const filteredKeywords = useMemo(() => {
    return allKeywords.filter(item => {
      // Destination filter
      if (selectedDestination !== 'All' && item.destination !== selectedDestination) {
        return false;
      }
      // Difficulty filter
      if (difficultyFilter === 'easy' && item.sd > 30) return false;
      if (difficultyFilter === 'moderate' && (item.sd <= 30 || item.sd > 50)) return false;
      if (difficultyFilter === 'hard' && item.sd <= 50) return false;

      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return item.keyword.toLowerCase().includes(q) || item.intent.toLowerCase().includes(q);
      }
      return true;
    });
  }, [allKeywords, selectedDestination, difficultyFilter, searchQuery]);

  // Destinations list for quick filter
  const destinations = ['All', 'Bali', 'Kashmir', 'Dubai', 'Japan', 'Vietnam', 'Thailand', 'Sri Lanka', 'Himachal', 'Kerala', 'Goa', 'Europe'];

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    if (onToast) onToast(`📋 Copied: "${text}"`);
    setTimeout(() => setCopiedKey(''), 2500);
  };

  // CSV Drag and Drop Upload Handler
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        const parsed = parseUbersuggestCsvText(text);
        if (parsed.length > 0) {
          setCustomKeywords(prev => [...parsed, ...prev]);
          if (onToast) onToast(`🎉 Successfully imported ${parsed.length} keywords from Ubersuggest CSV!`);
          setSubTab('keywords');
        } else {
          if (onToast) onToast('⚠️ Could not parse keywords from CSV. Please check format.');
        }
      }
    };
    reader.readAsText(file);
  };

  // 1-Click Apply AI Plan to Tour Package
  const handleApplyToTour = () => {
    if (!selectedTour || !generatedPlan) return;
    const updatedTour = {
      ...selectedTour,
      seo: {
        ...(selectedTour.seo || {}),
        metaTitle: generatedPlan.metaTitle,
        metaDescription: generatedPlan.metaDescription,
        focusKeyword: generatedPlan.focusKeyword
      }
    };

    const allTours = contentService.getTours();
    const updatedList = allTours.map(t => t.id === updatedTour.id ? updatedTour : t);
    contentService.saveAllTours(updatedList);

    if (onToast) {
      onToast(`✨ Applied Ubersuggest SEO to "${updatedTour.name}"! Click "Publish to Live Website" to push live.`);
    }
  };

  return (
    <div className="ubersuggest-hub-container animate-fade-in" style={{ padding: '0.5rem 0' }}>
      {/* ═══ Header Banner ═══ */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 114, 38, 0.12), rgba(111, 230, 252, 0.08))',
        border: '1px solid rgba(255, 114, 38, 0.3)',
        borderRadius: '14px',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #FF6A00, #EE0979)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(255, 106, 0, 0.35)',
            flexShrink: 0
          }}>
            <Sparkles size={24} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF' }}>
                Ubersuggest AI SEO Intelligence Hub
              </h3>
              <span style={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34D399',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.15rem 0.6rem',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                ● Lifetime License Active
              </span>
            </div>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.82rem', color: '#94A3B8' }}>
              Real-time travel search volume, cost-per-click, low-SEO difficulty opportunities & 1-click AI content generator.
            </p>
          </div>
        </div>

        {/* Quick Launch Buttons */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <a
            href="https://app.neilpatel.com/en/ubersuggest/overview?lang=en&locId=2356"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#F8FAFC',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>Launch Ubersuggest</span>
            <ArrowUpRight size={13} />
          </a>
          <a
            href="https://app.neilpatel.com/en/ubersuggest/site_audit"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'rgba(255, 106, 0, 0.15)',
              border: '1px solid rgba(255, 106, 0, 0.35)',
              color: '#FDBA74',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <span>Audit Domain</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* ═══ Stats Strip ═══ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '0.85rem',
        marginBottom: '1.25rem'
      }}>
        <div className="analytics-card" style={{ padding: '0.85rem 1rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Tracked High-Intent Keywords</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#6FE6FC', marginTop: '0.2rem' }}>
            {allKeywords.length} Travel Queries
          </div>
          <span style={{ fontSize: '0.72rem', color: '#10B981' }}>+84% Easy Win Rate (SD &lt; 30)</span>
        </div>
        <div className="analytics-card" style={{ padding: '0.85rem 1rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Total Monthly Search Volume</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#FBBF24', marginTop: '0.2rem' }}>
            {allKeywords.reduce((acc, k) => acc + k.volume, 0).toLocaleString()} Searches/mo
          </div>
          <span style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>High commercial buying intent</span>
        </div>
        <div className="analytics-card" style={{ padding: '0.85rem 1rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Average Commercial CPC</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#34D399', marginTop: '0.2rem' }}>
            ₹34.80 / Click
          </div>
          <span style={{ fontSize: '0.72rem', color: '#10B981' }}>Organic rank saves ₹1.2L+/mo</span>
        </div>
        <div className="analytics-card" style={{ padding: '0.85rem 1rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Site Technical Health Score</span>
          <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#10B981', marginTop: '0.2rem' }}>
            {UBERSUGGEST_SITE_AUDIT_SCORECARD.healthScore} / 100
          </div>
          <span style={{ fontSize: '0.72rem', color: '#10B981' }}>0 Critical Errors · Excellent Core Web Vitals</span>
        </div>
      </div>

      {/* ═══ Sub-Navigation Tabs ═══ */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        paddingBottom: '0.75rem',
        marginBottom: '1.25rem',
        overflowX: 'auto'
      }}>
        {[
          { id: 'keywords', label: 'Keyword Opportunity Radar', icon: Search },
          { id: 'ai-generator', label: '1-Click AI SEO Package Optimizer', icon: Zap },
          { id: 'competitor-gap', label: 'Competitor Gap Benchmark', icon: Target },
          { id: 'site-audit', label: 'Site Health Scorecard', icon: ShieldCheck },
          { id: 'csv-import', label: 'Import Ubersuggest CSV', icon: Upload },
          { id: 'mcp-guide', label: 'AI MCP Setup Guide', icon: Cpu },
        ].map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSubTab(t.id)}
            style={{
              background: subTab === t.id ? 'linear-gradient(135deg, rgba(255, 106, 0, 0.25), rgba(238, 9, 121, 0.15))' : 'transparent',
              border: subTab === t.id ? '1px solid #FF892F' : '1px solid transparent',
              color: subTab === t.id ? '#FFFFFF' : '#94A3B8',
              padding: '0.5rem 0.9rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            <t.icon size={14} color={subTab === t.id ? '#FF892F' : '#94A3B8'} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════
          SUB-TAB 1: KEYWORD OPPORTUNITY RADAR
      ══════════════════════════════════════════════════════ */}
      {subTab === 'keywords' && (
        <div>
          {/* Filters Bar */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '1rem'
          }}>
            <div style={{ flex: '1', minWidth: '220px', position: 'relative' }}>
              <input
                type="text"
                className="seo-input"
                placeholder="Search keywords, destinations, or intents..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', paddingLeft: '2.2rem' }}
              />
              <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            </div>

            {/* Difficulty selector */}
            <select
              className="seo-select"
              value={difficultyFilter}
              onChange={e => setDifficultyFilter(e.target.value)}
              style={{ width: 'auto', minWidth: '160px' }}
            >
              <option value="all">All Difficulty Levels</option>
              <option value="easy">🟢 Easy Wins (SD &lt; 30)</option>
              <option value="moderate">🟡 Moderate (SD 31-50)</option>
              <option value="hard">🔴 Competitive (SD &gt; 50)</option>
            </select>
          </div>

          {/* Destination Pills */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.6rem', marginBottom: '0.75rem' }}>
            {destinations.map(d => (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDestination(d)}
                style={{
                  background: selectedDestination === d ? '#FF892F' : 'rgba(255, 255, 255, 0.06)',
                  color: selectedDestination === d ? '#0B1120' : '#CBD5E1',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '0.3rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Keywords Table */}
          <div className="analytics-table-scroll" style={{ border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px' }}>
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Keyword / Search Query</th>
                  <th>Monthly Volume</th>
                  <th>Est. CPC</th>
                  <th>SEO Difficulty (SD)</th>
                  <th>Search Intent</th>
                  <th>Opportunity Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredKeywords.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 600, color: '#F8FAFC' }}>{item.keyword}</span>
                        <span style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.08)', color: '#94A3B8' }}>
                          {item.destination}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: '#6FE6FC' }}>
                        {item.volume.toLocaleString()}
                      </span>
                    </td>
                    <td>
                      <span style={{ color: '#34D399', fontWeight: 600 }}>{item.cpc}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          width: '50px',
                          height: '6px',
                          borderRadius: '3px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${item.sd}%`,
                            height: '100%',
                            background: item.sd <= 25 ? '#10B981' : item.sd <= 40 ? '#F59E0B' : '#EF4444'
                          }} />
                        </div>
                        <span style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: item.sd <= 25 ? '#10B981' : item.sd <= 40 ? '#F59E0B' : '#EF4444'
                        }}>
                          {item.sd} / 100
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{
                        fontSize: '0.72rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '6px',
                        background: item.intent === 'Transactional' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(111, 230, 252, 0.15)',
                        color: item.intent === 'Transactional' ? '#6EE7B7' : '#BAE6FD',
                        fontWeight: 600
                      }}>
                        {item.intent}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.74rem', color: '#E2E8F0' }}>{item.opportunity}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-analytics-action"
                        onClick={() => handleCopy(item.keyword, `key-${idx}`)}
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.72rem' }}
                      >
                        {copiedKey === `key-${idx}` ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                        <span>{copiedKey === `key-${idx}` ? 'Copied' : 'Copy'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          SUB-TAB 2: 1-CLICK AI SEO PACKAGE OPTIMIZER
      ══════════════════════════════════════════════════════ */}
      {subTab === 'ai-generator' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {/* Left Column: Select Tour */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.95rem', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={16} className="text-amber" />
              <span>1. Choose Tour Package to Optimize</span>
            </h4>
            <p style={{ margin: '0 0 1rem', fontSize: '0.78rem', color: '#94A3B8' }}>
              Select any package from your active catalog. The AI will weave top Ubersuggest keywords into Google-perfect titles, descriptions, and headings.
            </p>

            <select
              className="seo-select"
              value={selectedTourId}
              onChange={e => setSelectedTourId(e.target.value)}
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              {toursList.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.duration || '5D'}) — ₹{Number(t.price || 0).toLocaleString('en-IN')}
                </option>
              ))}
            </select>

            {selectedTour && (
              <div style={{
                background: 'rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                padding: '0.85rem',
                fontSize: '0.8rem',
                lineHeight: '1.5'
              }}>
                <div><strong>Destination:</strong> {selectedTour.location || selectedTour.destination || 'India'}</div>
                <div><strong>Duration:</strong> {selectedTour.duration || '5 Days'}</div>
                <div><strong>Current Focus Keyword:</strong> {selectedTour.seo?.focusKeyword || 'None (Needs optimization)'}</div>
                <div><strong>Current Meta Title:</strong> {selectedTour.seo?.metaTitle || selectedTour.name}</div>
              </div>
            )}
          </div>

          {/* Right Column: AI Generated Plan */}
          {generatedPlan && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(111, 230, 252, 0.05))',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Sparkles size={16} />
                  <span>2. Ubersuggest AI Optimization Plan</span>
                </h4>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleApplyToTour}
                  style={{
                    padding: '0.4rem 0.85rem',
                    fontSize: '0.78rem',
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    borderColor: '#059669',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <CheckCircle2 size={13} /> Apply to Package
                </button>
              </div>

              {/* Keyword Metrics Box */}
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                fontSize: '0.78rem'
              }}>
                <div><span style={{ color: '#94A3B8' }}>Target Keyword:</span> <strong>{generatedPlan.focusKeyword}</strong></div>
                <div><span style={{ color: '#94A3B8' }}>Search Vol:</span> <strong style={{ color: '#6FE6FC' }}>{generatedPlan.targetSearchVolume.toLocaleString()}/mo</strong></div>
                <div><span style={{ color: '#94A3B8' }}>SEO Difficulty:</span> <strong style={{ color: '#10B981' }}>{generatedPlan.seoDifficulty} (Easy)</strong></div>
              </div>

              {/* Recommended Meta Title */}
              <div style={{ marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.2rem' }}>
                  <span>Recommended Google Title Tag ({generatedPlan.metaTitle.length}/60 chars)</span>
                  <button type="button" onClick={() => handleCopy(generatedPlan.metaTitle, 'title')} style={{ background: 'none', border: 'none', color: '#6FE6FC', cursor: 'pointer', fontSize: '0.72rem' }}>Copy</button>
                </div>
                <div style={{ background: '#0B1120', padding: '0.55rem 0.75rem', borderRadius: '6px', color: '#38BDF8', fontSize: '0.85rem', fontWeight: 600 }}>
                  {generatedPlan.metaTitle}
                </div>
              </div>

              {/* Recommended Meta Description */}
              <div style={{ marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#CBD5E1', marginBottom: '0.2rem' }}>
                  <span>Recommended Meta Description ({generatedPlan.metaDescription.length}/160 chars)</span>
                  <button type="button" onClick={() => handleCopy(generatedPlan.metaDescription, 'desc')} style={{ background: 'none', border: 'none', color: '#6FE6FC', cursor: 'pointer', fontSize: '0.72rem' }}>Copy</button>
                </div>
                <div style={{ background: '#0B1120', padding: '0.55rem 0.75rem', borderRadius: '6px', color: '#CBD5E1', fontSize: '0.8rem', lineHeight: '1.4' }}>
                  {generatedPlan.metaDescription}
                </div>
              </div>

              {/* LSI Keywords */}
              <div>
                <span style={{ fontSize: '0.75rem', color: '#CBD5E1', display: 'block', marginBottom: '0.35rem' }}>
                  High-Ranking LSI Keywords to Include in Itinerary Body:
                </span>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {generatedPlan.lsiKeywords.map((k, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        color: '#94A3B8'
                      }}
                    >
                      + {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          SUB-TAB 3: COMPETITOR GAP BENCHMARK
      ══════════════════════════════════════════════════════ */}
      {subTab === 'competitor-gap' && (
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.35rem', color: '#FFFFFF', fontSize: '1rem' }}>
              Competitor Keyword Opportunity Matrix
            </h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#94A3B8' }}>
              Comparison of high-intent tour search terms against India's leading travel portals. Target the keyword gaps where their domain authority is high but page relevance is thin.
            </p>
          </div>

          <div className="analytics-table-scroll" style={{ border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px' }}>
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Competitor Brand</th>
                  <th>Estimated Organic Traffic</th>
                  <th>Common Tour Keywords</th>
                  <th>Targetable Gap Keywords</th>
                  <th>Domain Authority</th>
                  <th>Comfort Journey Strategy</th>
                </tr>
              </thead>
              <tbody>
                {UBERSUGGEST_COMPETITOR_BENCHMARKS.map((comp, i) => (
                  <tr key={i}>
                    <td>
                      <div>
                        <strong>{comp.competitor}</strong>
                        <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{comp.domain}</div>
                      </div>
                    </td>
                    <td><strong style={{ color: '#6FE6FC' }}>{comp.organicTraffic}</strong>/mo</td>
                    <td>{comp.commonKeywords}</td>
                    <td><strong style={{ color: '#34D399' }}>{comp.gapKeywords} Easy Gaps</strong></td>
                    <td>
                      <span style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: '6px',
                        background: 'rgba(255, 106, 0, 0.15)',
                        color: '#FB923C',
                        fontWeight: 700,
                        fontSize: '0.75rem'
                      }}>
                        DA {comp.authority}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>
                        Outrank on long-tail <em>"5 days luxury package with private cab"</em>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          SUB-TAB 4: SITE AUDIT & CORE WEB VITALS
      ══════════════════════════════════════════════════════ */}
      {subTab === 'site-audit' && (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            marginBottom: '1.25rem'
          }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '10px',
              padding: '1rem'
            }}>
              <span style={{ fontSize: '0.75rem', color: '#34D399', fontWeight: 600 }}>CRAWLABILITY & HEALTH</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', margin: '0.25rem 0' }}>
                {UBERSUGGEST_SITE_AUDIT_SCORECARD.healthScore} / 100
              </div>
              <span style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>0 Critical Errors · 114 Indexed URLs</span>
            </div>

            <div style={{
              background: 'rgba(111, 230, 252, 0.08)',
              border: '1px solid rgba(111, 230, 252, 0.25)',
              borderRadius: '10px',
              padding: '1rem'
            }}>
              <span style={{ fontSize: '0.75rem', color: '#6FE6FC', fontWeight: 600 }}>GOOGLE CORE WEB VITALS</span>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.35rem', fontSize: '0.8rem' }}>
                <div><strong>LCP:</strong> {UBERSUGGEST_SITE_AUDIT_SCORECARD.coreWebVitals.lcp}</div>
                <div><strong>FID:</strong> {UBERSUGGEST_SITE_AUDIT_SCORECARD.coreWebVitals.fid}</div>
                <div><strong>CLS:</strong> {UBERSUGGEST_SITE_AUDIT_SCORECARD.coreWebVitals.cls}</div>
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.85rem', color: '#FFFFFF', fontSize: '0.92rem' }}>Audit Verification Checklist</h4>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {UBERSUGGEST_SITE_AUDIT_SCORECARD.checks.map((chk, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.45rem 0.65rem', background: 'rgba(0, 0, 0, 0.2)', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <CheckCircle2 size={16} color="#10B981" />
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#F1F5F9' }}>{chk.title}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{chk.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          SUB-TAB 5: 1-CLICK CSV IMPORTER
      ══════════════════════════════════════════════════════ */}
      {subTab === 'csv-import' && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '2px dashed rgba(255, 114, 38, 0.35)',
          borderRadius: '14px',
          padding: '2.5rem 1.5rem',
          textAlign: 'center'
        }}>
          <Upload size={36} color="#FF892F" style={{ margin: '0 auto 0.75rem' }} />
          <h4 style={{ margin: '0 0 0.4rem', color: '#FFFFFF', fontSize: '1.1rem' }}>
            Drag & Drop Ubersuggest CSV Export
          </h4>
          <p style={{ margin: '0 auto 1.25rem', maxWidth: '500px', fontSize: '0.82rem', color: '#94A3B8', lineHeight: '1.5' }}>
            Export any keyword list or site audit from <strong>app.neilpatel.com</strong> as a CSV file, and drop it here. The CMS will automatically parse, categorize, and integrate it into your keyword radar.
          </p>

          <label style={{
            background: 'linear-gradient(135deg, #FF6A00, #EE0979)',
            color: '#FFFFFF',
            padding: '0.65rem 1.5rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 15px rgba(255, 106, 0, 0.35)'
          }}>
            <Upload size={16} /> Choose CSV File
            <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>

          <div style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#64748B' }}>
            Supported Exports: Keyword Ideas CSV · Site Audit Issues CSV · Rank Tracking CSV
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          SUB-TAB 6: AI MCP SETUP GUIDE
      ══════════════════════════════════════════════════════ */}
      {subTab === 'mcp-guide' && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '1.25rem'
        }}>
          <h4 style={{ margin: '0 0 0.5rem', color: '#FFFFFF', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={18} className="text-sky" />
            <span>Connecting Ubersuggest MCP to AI Agents (Claude / Gemini / Antigravity)</span>
          </h4>
          <p style={{ margin: '0 0 1rem', fontSize: '0.82rem', color: '#94A3B8', lineHeight: '1.5' }}>
            Neil Patel’s official <strong>Model Context Protocol (MCP)</strong> server allows AI coding agents and desktop assistants to query your lifetime Ubersuggest account directly.
          </p>

          <div style={{ background: '#0B1120', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>mcp_config.json configuration</span>
              <button
                type="button"
                onClick={() => handleCopy(`{\n  "mcpServers": {\n    "ubersuggest": {\n      "endpoint": "https://ubersuggest-mcp.neilpatelapi.com/mcp",\n      "type": "sse"\n    }\n  }\n}`, 'mcp')}
                style={{ background: 'none', border: 'none', color: '#38BDF8', cursor: 'pointer', fontSize: '0.72rem' }}
              >
                {copiedKey === 'mcp' ? 'Copied!' : 'Copy Config'}
              </button>
            </div>
            <pre style={{ margin: 0, fontSize: '0.78rem', color: '#6EE7B7', fontFamily: 'monospace' }}>{`{
  "mcpServers": {
    "ubersuggest": {
      "endpoint": "https://ubersuggest-mcp.neilpatelapi.com/mcp",
      "type": "sse"
    }
  }
}`}</pre>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#CBD5E1', lineHeight: '1.6' }}>
            <strong>How It Works Once Connected:</strong>
            <ol style={{ paddingLeft: '1.25rem', marginTop: '0.4rem' }}>
              <li>Your AI assistant gains tools like <code>get_keyword_suggestions</code>, <code>get_domain_overview</code>, and <code>get_site_audit</code>.</li>
              <li>When connected, simply authorize via the browser popup with your Ubersuggest Lifetime Account.</li>
              <li>You can prompt the AI: <em>"Find the top 5 low-competition keywords for Kashmir winter packages and write high-converting itinerary headings."</em></li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
