import React, { useState, useEffect, useCallback } from 'react';
import {
  TrendingUp, TrendingDown, Users, MousePointerClick, Eye, Clock,
  Search, Star, MessageSquare, ExternalLink, RefreshCw, Settings,
  BarChart3, Globe, Zap, Activity, ArrowUpRight, ArrowDownRight,
  Link2, AlertCircle, CheckCircle, Flame, Target, MonitorSmartphone
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════
// COMFORT JOURNEY — UNIFIED ANALYTICS DASHBOARD
// Aggregates GA4, Search Console, Google Business Profile, and
// Microsoft Clarity data into a single marketer-friendly view.
// ═══════════════════════════════════════════════════════════════════

const STORAGE_KEY_GA4 = 'cj_analytics_ga4';
const STORAGE_KEY_GSC = 'cj_analytics_gsc';
const STORAGE_KEY_GBP = 'cj_analytics_gbp';
const STORAGE_KEY_CLARITY = 'cj_analytics_clarity';
const STORAGE_KEY_CREDENTIALS = 'cj_analytics_credentials';

// Mock data generator for demo/testing
function generateMockGA4() {
  const days = 30;
  const traffic = [];
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    traffic.push({
      date: date.toISOString().split('T')[0],
      users: Math.floor(120 + Math.random() * 280),
      sessions: Math.floor(180 + Math.random() * 350),
      pageviews: Math.floor(400 + Math.random() * 800),
      bounceRate: (35 + Math.random() * 25).toFixed(1)
    });
  }
  return {
    summary: {
      users: traffic.reduce((s, d) => s + d.users, 0),
      sessions: traffic.reduce((s, d) => s + d.sessions, 0),
      pageviews: traffic.reduce((s, d) => s + d.pageviews, 0),
      avgBounceRate: (traffic.reduce((s, d) => s + parseFloat(d.bounceRate), 0) / traffic.length).toFixed(1),
      avgSessionDuration: '2m 34s',
      usersChange: '+12.3%',
      sessionsChange: '+8.7%'
    },
    dailyTraffic: traffic,
    topPages: [
      { path: '/', title: 'Homepage', views: 4823, change: '+15%' },
      { path: '/tour/kashmir-paradise', title: 'Kashmir Paradise Tour', views: 2341, change: '+22%' },
      { path: '/tour/bali-honeymoon', title: 'Bali Honeymoon Package', views: 1876, change: '+8%' },
      { path: '/blog/dharamshala-vs-coorg', title: 'Dharamshala vs Coorg Blog', views: 1543, change: '+45%' },
      { path: '/tour/dubai-luxury', title: 'Dubai Luxury Tour', views: 1201, change: '-3%' },
      { path: '/about', title: 'About Us', views: 987, change: '+5%' },
      { path: '/tour/kerala-backwaters', title: 'Kerala Backwaters', views: 876, change: '+18%' },
    ],
    topSources: [
      { source: 'Google Organic', users: 3421, pct: '42%' },
      { source: 'Direct', users: 2103, pct: '26%' },
      { source: 'WhatsApp Referral', users: 1234, pct: '15%' },
      { source: 'Instagram', users: 876, pct: '11%' },
      { source: 'Facebook', users: 498, pct: '6%' },
    ]
  };
}

function generateMockGSC() {
  return {
    summary: {
      totalClicks: 12453,
      totalImpressions: 287654,
      avgCTR: '4.33%',
      avgPosition: 14.2,
      clicksChange: '+18.5%',
      impressionsChange: '+23.1%'
    },
    topQueries: [
      { query: 'comfort journey tour packages', clicks: 1234, impressions: 8765, ctr: '14.1%', position: 2.3 },
      { query: 'kashmir tour package from bhopal', clicks: 876, impressions: 5432, ctr: '16.1%', position: 3.1 },
      { query: 'best bali honeymoon package india', clicks: 654, impressions: 12345, ctr: '5.3%', position: 8.7 },
      { query: 'dharamshala vs coorg workation', clicks: 543, impressions: 3210, ctr: '16.9%', position: 4.2 },
      { query: 'dubai tour package 2026', clicks: 432, impressions: 9876, ctr: '4.4%', position: 11.5 },
      { query: 'luxury kerala houseboat tour', clicks: 321, impressions: 4567, ctr: '7.0%', position: 6.8 },
      { query: 'swiss alps tour from india price', clicks: 234, impressions: 6789, ctr: '3.4%', position: 15.3 },
    ],
    indexStatus: { indexed: 87, notIndexed: 5, errors: 2 }
  };
}

function generateMockGBP() {
  return {
    businessName: 'Comfort Journey — Travel Agency Since 1992',
    rating: 4.8,
    totalReviews: 312,
    profileViews: 8765,
    searchViews: 12453,
    directionsRequests: 432,
    callClicks: 876,
    latestReviews: [
      { author: 'Priya Sharma', rating: 5, text: 'Best Kashmir tour experience! The houseboat was absolutely stunning. Rishabh and team planned everything perfectly.', date: 'Aug 28, 2026', replied: true },
      { author: 'Rohit Verma', rating: 5, text: 'Booked Bali honeymoon package. Every detail was taken care of. Will definitely book again for our anniversary!', date: 'Aug 25, 2026', replied: true },
      { author: 'Ananya Patel', rating: 4, text: 'Good experience overall with Dubai tour. Hotel upgrade was a nice surprise. Slightly delayed on day 3 transfer.', date: 'Aug 22, 2026', replied: false },
      { author: 'Vikram Singh', rating: 5, text: 'Family trip to Kerala was magical. Kids loved the houseboat. Food was amazing. 100% recommend Comfort Journey!', date: 'Aug 18, 2026', replied: true },
      { author: 'Meera Joshi', rating: 5, text: 'Swiss Alps dream trip came true! The Glacier Express was breathtaking. Thank you CJ team!', date: 'Aug 15, 2026', replied: false },
    ]
  };
}

function generateMockClarity() {
  return {
    projectId: 'comfort-journey-site',
    totalSessions: 15432,
    avgScrollDepth: '67%',
    deadClicks: 234,
    rageClicks: 89,
    quickbacks: 156,
    jsErrors: 12,
    topPages: [
      { url: '/', sessions: 4523, scrollDepth: '72%', deadClicks: 45 },
      { url: '/tour/kashmir-paradise', sessions: 2341, scrollDepth: '81%', deadClicks: 12 },
      { url: '/blog/dharamshala-vs-coorg', sessions: 1543, scrollDepth: '88%', deadClicks: 8 },
    ]
  };
}

// MetricCard component
function MetricCard({ icon: Icon, label, value, change, changeType, color = '#6FE6FC' }) {
  const isPositive = changeType === 'up' || (change && change.startsWith('+'));
  return (
    <div className="analytics-metric-card">
      <div className="metric-icon-box" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div className="metric-info">
        <span className="metric-label">{label}</span>
        <strong className="metric-value">{value}</strong>
        {change && (
          <span className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

// Mini SVG bar chart
function MiniBarChart({ data, height = 60, color = '#6FE6FC' }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const barWidth = Math.max(2, Math.floor(280 / data.length) - 1);
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${data.length * (barWidth + 1)} ${height}`} preserveAspectRatio="none">
      {data.map((val, i) => {
        const barH = (val / max) * (height - 4);
        return (
          <rect
            key={i}
            x={i * (barWidth + 1)}
            y={height - barH}
            width={barWidth}
            height={barH}
            rx={1}
            fill={color}
            opacity={0.7 + (i / data.length) * 0.3}
          />
        );
      })}
    </svg>
  );
}

// Star rating display
function StarRating({ rating, size = 16 }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="star-rating-display">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < full || (i === full && half) ? '#F59E0B' : 'transparent'}
          stroke={i < full || (i === full && half) ? '#F59E0B' : '#64748B'}
        />
      ))}
      <span className="star-value">{rating}</span>
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [credentials, setCredentials] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY_CREDENTIALS) || '{}'); } catch { return {}; }
  });
  const [ga4Data, setGa4Data] = useState(null);
  const [gscData, setGscData] = useState(null);
  const [gbpData, setGbpData] = useState(null);
  const [clarityData, setClarityData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeSection, setActiveSection] = useState('overview'); // overview, search, reviews, clarity

  // Settings form state
  const [formCreds, setFormCreds] = useState({ ...credentials });

  // Load data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = useCallback(() => {
    setIsLoading(true);
    // In production, these would be API calls through a server-side proxy
    // For now, use mock data for demonstration
    setTimeout(() => {
      setGa4Data(generateMockGA4());
      setGscData(generateMockGSC());
      setGbpData(generateMockGBP());
      setClarityData(generateMockClarity());
      setIsLoading(false);
    }, 800);
  }, []);

  const saveCredentials = () => {
    localStorage.setItem(STORAGE_KEY_CREDENTIALS, JSON.stringify(formCreds));
    setCredentials(formCreds);
    setShowSettings(false);
    loadAllData();
  };

  const sectionTabs = [
    { id: 'overview', label: 'Traffic Overview', icon: BarChart3 },
    { id: 'search', label: 'Search Console', icon: Search },
    { id: 'reviews', label: 'Google Reviews', icon: Star },
    { id: 'clarity', label: 'Microsoft Clarity', icon: Activity },
  ];

  return (
    <div className="analytics-dashboard">
      {/* ═══ Header ═══ */}
      <div className="analytics-header">
        <div className="analytics-title-row">
          <TrendingUp size={20} className="text-emerald" />
          <div>
            <h3>Growth Hub — Analytics Dashboard</h3>
            <span className="analytics-subtitle">GA4 · Search Console · Google Business Profile · Microsoft Clarity</span>
          </div>
        </div>
        <div className="analytics-header-actions">
          <button
            type="button"
            className="btn-analytics-action"
            onClick={loadAllData}
            disabled={isLoading}
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            <span>{isLoading ? 'Loading...' : 'Refresh'}</span>
          </button>
          <button
            type="button"
            className="btn-analytics-action"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={14} />
            <span>Connect</span>
          </button>
        </div>
      </div>

      {/* ═══ Settings Panel ═══ */}
      {showSettings && (
        <div className="analytics-settings-card">
          <h4>🔑 Analytics Credentials</h4>
          <p className="settings-note">All credentials are stored locally in your browser. Never committed to code.</p>
          <div className="settings-grid">
            <div className="settings-field">
              <label>GA4 Measurement ID</label>
              <input
                type="text"
                className="seo-input"
                placeholder="G-XXXXXXXXXX"
                value={formCreds.ga4Id || ''}
                onChange={e => setFormCreds({ ...formCreds, ga4Id: e.target.value })}
              />
            </div>
            <div className="settings-field">
              <label>GA4 Property ID</label>
              <input
                type="text"
                className="seo-input"
                placeholder="properties/XXXXXXXXX"
                value={formCreds.ga4Property || ''}
                onChange={e => setFormCreds({ ...formCreds, ga4Property: e.target.value })}
              />
            </div>
            <div className="settings-field">
              <label>Search Console Site URL</label>
              <input
                type="text"
                className="seo-input"
                placeholder="https://www.comfortjourneyy.com"
                value={formCreds.gscSite || ''}
                onChange={e => setFormCreds({ ...formCreds, gscSite: e.target.value })}
              />
            </div>
            <div className="settings-field">
              <label>Google Business Profile ID</label>
              <input
                type="text"
                className="seo-input"
                placeholder="accounts/XXXX/locations/XXXX"
                value={formCreds.gbpId || ''}
                onChange={e => setFormCreds({ ...formCreds, gbpId: e.target.value })}
              />
            </div>
            <div className="settings-field">
              <label>Microsoft Clarity Project ID</label>
              <input
                type="text"
                className="seo-input"
                placeholder="xxxxxxxxxx"
                value={formCreds.clarityId || ''}
                onChange={e => setFormCreds({ ...formCreds, clarityId: e.target.value })}
              />
            </div>
            <div className="settings-field">
              <label>Google API Key (Server-side)</label>
              <input
                type="password"
                className="seo-input"
                placeholder="AIzaSy..."
                value={formCreds.googleApiKey || ''}
                onChange={e => setFormCreds({ ...formCreds, googleApiKey: e.target.value })}
              />
            </div>
          </div>
          <div className="settings-actions">
            <button type="button" className="btn-secondary" onClick={() => setShowSettings(false)}>Cancel</button>
            <button type="button" className="btn-primary" onClick={saveCredentials}>Save & Connect</button>
          </div>
        </div>
      )}

      {/* ═══ Section Tabs ═══ */}
      <div className="analytics-section-tabs">
        {sectionTabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`analytics-tab-btn ${activeSection === tab.id ? 'active' : ''}`}
            onClick={() => setActiveSection(tab.id)}
          >
            <tab.icon size={15} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ═══ Overview Section ═══ */}
      {activeSection === 'overview' && ga4Data && (
        <div className="analytics-section">
          {/* Key Metrics Grid */}
          <div className="metrics-grid">
            <MetricCard icon={Users} label="Total Users (30d)" value={ga4Data.summary.users.toLocaleString()} change={ga4Data.summary.usersChange} color="#6FE6FC" />
            <MetricCard icon={Eye} label="Page Views" value={ga4Data.summary.pageviews.toLocaleString()} change="+15.2%" color="#10B981" />
            <MetricCard icon={MousePointerClick} label="Sessions" value={ga4Data.summary.sessions.toLocaleString()} change={ga4Data.summary.sessionsChange} color="#FF892F" />
            <MetricCard icon={Clock} label="Avg Session" value={ga4Data.summary.avgSessionDuration} color="#8B5CF6" />
            <MetricCard icon={TrendingDown} label="Bounce Rate" value={`${ga4Data.summary.avgBounceRate}%`} changeType="down" color="#F59E0B" />
          </div>

          {/* Traffic Chart */}
          <div className="analytics-chart-card">
            <h4 className="chart-title">Daily Users (Last 30 Days)</h4>
            <MiniBarChart data={ga4Data.dailyTraffic.map(d => d.users)} height={80} color="#6FE6FC" />
          </div>

          {/* Top Pages + Traffic Sources */}
          <div className="analytics-two-cols">
            <div className="analytics-table-card">
              <h4 className="chart-title">Top Pages by Views</h4>
              <div className="analytics-table-scroll">
                <table className="analytics-table">
                  <thead>
                    <tr><th>Page</th><th>Views</th><th>Trend</th></tr>
                  </thead>
                  <tbody>
                    {ga4Data.topPages.map((page, i) => (
                      <tr key={i}>
                        <td>
                          <span className="page-title-cell">{page.title}</span>
                          <span className="page-path-cell">{page.path}</span>
                        </td>
                        <td><strong>{page.views.toLocaleString()}</strong></td>
                        <td>
                          <span className={`trend-badge ${page.change.startsWith('+') ? 'up' : 'down'}`}>
                            {page.change}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="analytics-table-card">
              <h4 className="chart-title">Traffic Sources</h4>
              <div className="analytics-table-scroll">
                {ga4Data.topSources.map((src, i) => (
                  <div key={i} className="source-bar-row">
                    <div className="source-info">
                      <span className="source-name">{src.source}</span>
                      <span className="source-stats">{src.users.toLocaleString()} users ({src.pct})</span>
                    </div>
                    <div className="source-bar-track">
                      <div className="source-bar-fill" style={{ width: src.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Search Console Section ═══ */}
      {activeSection === 'search' && gscData && (
        <div className="analytics-section">
          <div className="metrics-grid">
            <MetricCard icon={MousePointerClick} label="Total Clicks" value={gscData.summary.totalClicks.toLocaleString()} change={gscData.summary.clicksChange} color="#6FE6FC" />
            <MetricCard icon={Eye} label="Impressions" value={gscData.summary.totalImpressions.toLocaleString()} change={gscData.summary.impressionsChange} color="#10B981" />
            <MetricCard icon={Target} label="Avg CTR" value={gscData.summary.avgCTR} color="#FF892F" />
            <MetricCard icon={TrendingUp} label="Avg Position" value={gscData.summary.avgPosition.toFixed(1)} color="#8B5CF6" />
          </div>

          {/* Index Status */}
          <div className="analytics-index-status">
            <div className="index-item ok">
              <CheckCircle size={16} />
              <span>{gscData.indexStatus.indexed} pages indexed</span>
            </div>
            <div className="index-item warn">
              <AlertCircle size={16} />
              <span>{gscData.indexStatus.notIndexed} pages not indexed</span>
            </div>
            <div className="index-item error">
              <AlertCircle size={16} />
              <span>{gscData.indexStatus.errors} indexing errors</span>
            </div>
          </div>

          {/* Top Queries */}
          <div className="analytics-table-card">
            <h4 className="chart-title">Top Search Queries</h4>
            <div className="analytics-table-scroll">
              <table className="analytics-table">
                <thead>
                  <tr><th>Query</th><th>Clicks</th><th>Impressions</th><th>CTR</th><th>Position</th></tr>
                </thead>
                <tbody>
                  {gscData.topQueries.map((q, i) => (
                    <tr key={i}>
                      <td><span className="query-text">{q.query}</span></td>
                      <td><strong>{q.clicks.toLocaleString()}</strong></td>
                      <td>{q.impressions.toLocaleString()}</td>
                      <td><span className="ctr-badge">{q.ctr}</span></td>
                      <td><span className={`pos-badge ${q.position <= 5 ? 'top5' : q.position <= 10 ? 'top10' : 'below'}`}>{q.position.toFixed(1)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Google Reviews Section ═══ */}
      {activeSection === 'reviews' && gbpData && (
        <div className="analytics-section">
          {/* Business Profile Card */}
          <div className="gbp-profile-card">
            <div className="gbp-rating-display">
              <StarRating rating={gbpData.rating} size={24} />
              <span className="gbp-review-count">{gbpData.totalReviews} reviews on Google</span>
            </div>
            <div className="gbp-stats-row">
              <MetricCard icon={Eye} label="Profile Views" value={gbpData.profileViews.toLocaleString()} color="#6FE6FC" />
              <MetricCard icon={Search} label="Search Views" value={gbpData.searchViews.toLocaleString()} color="#10B981" />
              <MetricCard icon={Globe} label="Direction Requests" value={gbpData.directionsRequests.toLocaleString()} color="#FF892F" />
              <MetricCard icon={Zap} label="Call Clicks" value={gbpData.callClicks.toLocaleString()} color="#8B5CF6" />
            </div>
          </div>

          {/* Latest Reviews */}
          <div className="gbp-reviews-list">
            <h4 className="chart-title">Latest Google Reviews</h4>
            {gbpData.latestReviews.map((review, i) => (
              <div key={i} className="review-card">
                <div className="review-header">
                  <div className="review-author-info">
                    <div className="review-avatar">{review.author.charAt(0)}</div>
                    <div>
                      <strong className="review-author">{review.author}</strong>
                      <span className="review-date">{review.date}</span>
                    </div>
                  </div>
                  <div className="review-rating-row">
                    <StarRating rating={review.rating} size={14} />
                    {review.replied && (
                      <span className="replied-badge">
                        <CheckCircle size={12} /> Replied
                      </span>
                    )}
                  </div>
                </div>
                <p className="review-text">{review.text}</p>
                {!review.replied && (
                  <button type="button" className="btn-reply-review">
                    <MessageSquare size={13} /> Reply to Review
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ Microsoft Clarity Section ═══ */}
      {activeSection === 'clarity' && clarityData && (
        <div className="analytics-section">
          <div className="metrics-grid">
            <MetricCard icon={MonitorSmartphone} label="Total Sessions" value={clarityData.totalSessions.toLocaleString()} color="#6FE6FC" />
            <MetricCard icon={TrendingUp} label="Avg Scroll Depth" value={clarityData.avgScrollDepth} color="#10B981" />
            <MetricCard icon={MousePointerClick} label="Dead Clicks" value={clarityData.deadClicks.toLocaleString()} color="#EF4444" />
            <MetricCard icon={Flame} label="Rage Clicks" value={clarityData.rageClicks.toLocaleString()} color="#F59E0B" />
            <MetricCard icon={TrendingDown} label="Quick Backs" value={clarityData.quickbacks.toLocaleString()} color="#8B5CF6" />
          </div>

          {/* Page Analysis */}
          <div className="analytics-table-card">
            <h4 className="chart-title">Page-Level Session Analysis</h4>
            <div className="analytics-table-scroll">
              <table className="analytics-table">
                <thead>
                  <tr><th>Page</th><th>Sessions</th><th>Scroll Depth</th><th>Dead Clicks</th><th>Heatmap</th></tr>
                </thead>
                <tbody>
                  {clarityData.topPages.map((page, i) => (
                    <tr key={i}>
                      <td><span className="query-text">{page.url}</span></td>
                      <td><strong>{page.sessions.toLocaleString()}</strong></td>
                      <td>{page.scrollDepth}</td>
                      <td><span className="dead-click-val">{page.deadClicks}</span></td>
                      <td>
                        <a
                          href={`https://clarity.microsoft.com/projects/${clarityData.projectId}/heatmaps?url=${encodeURIComponent(page.url)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="heatmap-link"
                        >
                          <ExternalLink size={12} /> View Heatmap
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="clarity-note">
            <Activity size={16} className="text-sky" />
            <p>View full session recordings and heatmaps on the <a href="https://clarity.microsoft.com" target="_blank" rel="noopener noreferrer">Microsoft Clarity Dashboard</a></p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="analytics-loading">
          <RefreshCw size={24} className="animate-spin text-amber" />
          <span>Loading analytics data...</span>
        </div>
      )}
    </div>
  );
}
