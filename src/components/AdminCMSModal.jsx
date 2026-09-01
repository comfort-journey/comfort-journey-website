import React, { useState, useEffect } from 'react';
import {
  X, Lock, LayoutDashboard, FileText, Search, Database,
  UploadCloud, TrendingUp, Image as ImageIcon, Settings, FileSpreadsheet
} from 'lucide-react';
import { directusService, slugify, parseWixCsv, transformWixTourRow } from '../services/directusClient';
import { TOURS_DATA } from '../data/toursData';

// ═══ New Content Studio Components ═══
import TourPackageManager from './cms/TourPackageManager';
import BlogManager from './cms/BlogManager';
import AnalyticsDashboard from './cms/AnalyticsDashboard';
import DataHubManager from './cms/DataHubManager';
import './cms/ContentStudio.css';

// ═══════════════════════════════════════════════════════════════════
// COMFORT JOURNEY — CONTENT STUDIO (v2.0)
// Professional CMS dashboard with WYSIWYG editing, full tour package
// management, blog CRUD, SEO assistant, and analytics dashboard.
//
// Refactored from the original 3,318-line monolith into focused
// sub-components. This file is now a thin shell handling:
//   1. Authentication (passcode login)
//   2. Tab routing (delegates to sub-components)
//   3. Modal chrome (header, close, overlay)
//   4. Legacy Directus config & Wix migration (preserved)
// ═══════════════════════════════════════════════════════════════════

export default function AdminCMSModal({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('manage-tours');

  // Directus Connection State (preserved from v1)
  const [directusUrl, setDirectusUrl] = useState(directusService.getBaseUrl());
  const [directusToken, setDirectusToken] = useState(directusService.getToken());
  const [directusStatus, setDirectusStatus] = useState({ isOnline: false, message: 'Checking...' });
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  // Wix CSV Migration State (preserved from v1)
  const [wixCsvText, setWixCsvText] = useState('');
  const [parsedWixPackages, setParsedWixPackages] = useState([]);
  const [isImportingWix, setIsImportingWix] = useState(false);
  const [wixImportResult, setWixImportResult] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  useEffect(() => {
    if (isOpen) testDirectusConnection();
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'comfort1992' || passwordInput === 'admin' || passwordInput === '1234') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect VIP Access Code. (Use comfort1992)');
    }
  };

  // Wix CSV parsing (preserved)
  const handleParseWixCsv = () => {
    if (!wixCsvText.trim()) return;
    try {
      const rows = parseWixCsv(wixCsvText);
      const transformed = rows.map(r => transformWixTourRow(r));
      setParsedWixPackages(transformed);
    } catch (err) {
      showToast(`❌ CSV parse error: ${err.message}`);
    }
  };

  const handleImportWixPackages = () => {
    if (parsedWixPackages.length === 0) return;
    setIsImportingWix(true);
    try {
      const saved = localStorage.getItem('cj_custom_tours_dataset');
      const existing = saved ? JSON.parse(saved) : TOURS_DATA;
      const existingIds = new Set(existing.map(t => t.id));
      const newPkgs = parsedWixPackages.filter(p => !existingIds.has(p.id));
      const updated = [...newPkgs, ...existing];
      localStorage.setItem('cj_custom_tours_dataset', JSON.stringify(updated));
      TOURS_DATA.length = 0;
      TOURS_DATA.push(...updated);
      setWixImportResult({ total: parsedWixPackages.length, added: newPkgs.length, skipped: parsedWixPackages.length - newPkgs.length });
      showToast(`✅ Imported ${newPkgs.length} packages!`);
    } catch (err) {
      showToast(`❌ Import error: ${err.message}`);
    }
    setIsImportingWix(false);
  };

  const handleResetToWixSeed = () => {
    if (window.confirm('Reset all packages to the original Wix CSV dataset? Any custom changes in browser cache will be refreshed.')) {
      try { localStorage.removeItem('cj_custom_tours_dataset'); } catch {}
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  // ─── Tab Definitions ───
  const tabs = [
    { id: 'manage-tours', label: 'Tour Packages', icon: LayoutDashboard },
    { id: 'manage-blogs', label: 'Blog & Magazine', icon: FileText },
    { id: 'analytics', label: 'Growth Hub', icon: TrendingUp },
    { id: 'directus-config', label: 'Directus & AWS', icon: Database },
    { id: 'data-hub', label: 'Data Hub (Import & Export)', icon: FileSpreadsheet },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content admin-modal-content content-studio-modal" onClick={(e) => e.stopPropagation()}>
        {/* ═══ Header ═══ */}
        <div className="admin-header">
          <div className="admin-title-row">
            <LayoutDashboard size={22} className="text-amber" />
            <div>
              <h2 className="admin-title">Comfort Journey — Content Studio</h2>
              <span className="admin-subtitle">Tour Manager · Blog Editor · SEO Assistant · Growth Hub Analytics</span>
            </div>
          </div>
          <button className="admin-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {!isAuthenticated ? (
          /* ═══ Login Screen ═══ */
          <div className="admin-auth-box">
            <div className="lock-icon-circle">
              <Lock size={32} className="text-amber" />
            </div>
            <h3>Marketing Team Portal</h3>
            <p>Enter your team passcode to access the Content Studio — blog editor, tour manager, SEO assistant, and analytics dashboard.</p>
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
                Unlock Content Studio
              </button>
            </form>
          </div>
        ) : (
          /* ═══ Content Studio Dashboard ═══ */
          <div className="content-studio-body">
            {/* Toast */}
            {toastMessage && (
              <div className="admin-toast-banner animate-fade-in"><span>{toastMessage}</span></div>
            )}

            {/* Navigation Tabs */}
            <div className="cs-main-tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`cs-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content Area */}
            <div className="cs-tab-content">
              {/* ── Tour Package Manager ── */}
              {activeTab === 'manage-tours' && <TourPackageManager />}

              {/* ── Blog Manager ── */}
              {activeTab === 'manage-blogs' && <BlogManager />}

              {/* ── Analytics Dashboard ── */}
              {activeTab === 'analytics' && <AnalyticsDashboard />}

              {/* ── Directus & AWS Configuration (preserved) ── */}
              {activeTab === 'directus-config' && (
                <div className="directus-config-pane">
                  <div className="directus-status-card">
                    <div className="status-header-row">
                      <h3 className="status-heading">⚙️ Directus CMS Connection</h3>
                      <span className={`status-pill ${directusStatus.isOnline ? 'online' : 'fallback'}`}>
                        {directusStatus.isOnline ? '● Connected' : '○ Fallback Mode'}
                      </span>
                    </div>
                    <p className="status-desc">
                      {directusStatus.isOnline
                        ? `Connected to Directus at ${directusStatus.url}. Content edits will sync to the headless CMS.`
                        : `Directus is offline or unreachable. The site uses local/fallback data. Start Docker or connect to your AWS deployment.`
                      }
                    </p>

                    <div className="directus-form-grid">
                      <div className="field-group">
                        <label>Directus URL</label>
                        <input
                          type="text"
                          className="cms-input"
                          value={directusUrl}
                          onChange={(e) => setDirectusUrl(e.target.value)}
                          placeholder="http://localhost:8055"
                        />
                      </div>
                      <div className="field-group">
                        <label>API Token</label>
                        <input
                          type="password"
                          className="cms-input"
                          value={directusToken}
                          onChange={(e) => setDirectusToken(e.target.value)}
                          placeholder="Bearer token (optional for public)"
                        />
                      </div>
                    </div>

                    <div className="config-actions-row">
                      <button type="button" className="btn-primary" onClick={handleSaveDirectusConfig} disabled={isTestingConnection}>
                        <Database size={14} />
                        {isTestingConnection ? 'Testing...' : 'Save & Test Connection'}
                      </button>
                      <button type="button" className="btn-secondary" onClick={testDirectusConnection}>
                        <Search size={14} /> Ping Server
                      </button>
                    </div>
                  </div>

                  <div className="directus-guide-card">
                    <h4 className="guide-title">🚀 Setup Guide</h4>
                    <ol className="guide-steps">
                      <li>
                        <strong>Local Development:</strong> Start Docker Desktop, then run:
                        <pre className="code-block">cd cms && docker-compose up -d</pre>
                      </li>
                      <li>
                        <strong>Access Directus Admin:</strong> Visit{' '}
                        <a href="http://localhost:8055" target="_blank" rel="noopener noreferrer" style={{ color: '#6FE6FC' }}>
                          http://localhost:8055
                        </a>
                        <br />Login: admin@comfortjourney.com / comfort_admin_pass_1992!
                      </li>
                      <li>
                        <strong>AWS Production:</strong> Deploy the Docker stack to EC2/ECS and update the URL above to your AWS domain.
                      </li>
                      <li>
                        <strong>Schema:</strong> Import <code>cms/directus-schema-seed.json</code> via Directus Settings → Schema → Import.
                      </li>
                    </ol>
                  </div>
                </div>
              )}

              {/* ── Data Hub: Bulk Import & Export ── */}
              {activeTab === 'data-hub' && <DataHubManager />}
            </div>
          </div>
        )}

        {/* ═══ Styles ═══ */}
        <style>{`
          .admin-modal-content {
            max-width: 1280px;
            width: 96vw;
          }

          .admin-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            background: linear-gradient(135deg, rgba(0,18,51,0.95), rgba(15,23,42,0.95));
          }

          .admin-title-row {
            display: flex;
            align-items: center;
            gap: 0.85rem;
          }

          .admin-title {
            font-family: var(--font-ui);
            font-size: 1.3rem;
            background: linear-gradient(135deg, #FF892F, #6FE6FC);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0;
          }

          .admin-subtitle {
            font-size: 0.78rem;
            color: #94A3B8;
            display: block;
            margin-top: 0.15rem;
          }

          .admin-close-btn {
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.12);
            color: #CBD5E1;
            width: 36px;
            height: 36px;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
          }

          .admin-close-btn:hover {
            background: rgba(239,68,68,0.15);
            color: #EF4444;
            border-color: rgba(239,68,68,0.3);
          }

          .admin-auth-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 3rem 2rem;
            max-width: 400px;
            margin: 0 auto;
          }

          .lock-icon-circle {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            background: rgba(255,137,47,0.1);
            border: 1px solid rgba(255,137,47,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.25rem;
          }

          .admin-auth-box h3 {
            font-family: var(--font-ui);
            font-size: 1.4rem;
            color: #FFFFFF;
            margin: 0 0 0.5rem;
          }

          .admin-auth-box p {
            font-size: 0.88rem;
            color: #94A3B8;
            line-height: 1.55;
            margin: 0 0 1.5rem;
          }

          .auth-form {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .auth-form input {
            width: 100%;
            padding: 0.85rem 1rem;
            border-radius: var(--radius-sm);
            background: rgba(0,18,51,0.6);
            border: 1px solid rgba(255,255,255,0.15);
            color: #FFFFFF;
            font-size: 0.95rem;
            text-align: center;
            outline: none;
          }

          .auth-form input:focus {
            border-color: #FF892F;
          }

          .auth-error-msg {
            color: #EF4444;
            font-size: 0.82rem;
            margin: 0;
          }

          .w-full {
            width: 100%;
            justify-content: center;
          }

          /* Directus Config Styles (preserved) */
          .directus-config-pane {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .directus-status-card {
            padding: 1.5rem;
            background: rgba(0, 18, 51, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
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

          .directus-guide-card {
            padding: 1.5rem;
            background: rgba(0, 18, 51, 0.6);
            border: 1px dashed rgba(255, 137, 47, 0.3);
            border-radius: 10px;
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

          /* Wix Migration Styles (preserved) */
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
            border-radius: 10px;
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
            border-radius: 10px;
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

          .sample-desc {
            font-size: 0.84rem;
            color: #94A3B8;
            line-height: 1.5;
            margin-bottom: 1.5rem;
            flex-grow: 1;
          }

          .parsed-packages-card {
            padding: 1.5rem;
            border-radius: 10px;
            background: rgba(0, 18, 51, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .table-title {
            font-size: 1.05rem;
            color: #FFFFFF;
            margin: 0;
            font-weight: 700;
          }

          .media-rule-alert {
            padding: 1rem 1.25rem;
            border-radius: 8px;
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.35);
          }

          @media (max-width: 860px) {
            .directus-form-grid, .wix-controls-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
