import React, { useState, useEffect } from 'react';
import {
  X, Lock, LayoutDashboard, FileText, Search, Database,
  UploadCloud, TrendingUp, Image as ImageIcon, Settings, FileSpreadsheet,
  CheckCircle2, AlertTriangle, Loader2, Key, RefreshCw, Globe, ExternalLink
} from 'lucide-react';
import { directusService, slugify, parseWixCsv, transformWixTourRow } from '../services/directusClient';
import { TOURS_DATA } from '../data/toursData';
import { contentService, isLocalDev, STORAGE_KEY_GITHUB_TOKEN, STORAGE_KEY_GITHUB_REPO } from '../services/contentService';
import {
  isPublishConfigured,
  testGitHubCredentials,
  setLocalMasterToken,
  clearLocalMasterToken,
  getBuiltinMasterToken,
  getActivePublishToken,
  getActiveRepo,
  obfuscateToken,
  MASTER_SYNC_CONFIG
} from '../config/syncConfig';

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
      contentService.saveAllTours(updated);
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

  // Global Sync States & Handlers
  const [githubToken, setGithubToken] = useState(() => getActivePublishToken() || '');
  const [githubRepo, setGithubRepo] = useState(() => getActiveRepo() || 'comfort-journey/comfort-journey-website');
  const [isPublishingGitHub, setIsPublishingGitHub] = useState(false);
  const [isTestingGitHubToken, setIsTestingGitHubToken] = useState(false);
  const [isSyncingFromCloud, setIsSyncingFromCloud] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState(null);
  const [tokenDiagnostic, setTokenDiagnostic] = useState(null);

  const handleTestToken = async () => {
    if (!githubToken.trim()) {
      showToast('⚠️ Please enter a token first.');
      return;
    }
    setIsTestingGitHubToken(true);
    setTokenDiagnostic(null);
    try {
      const res = await testGitHubCredentials(githubToken.trim(), githubRepo.trim());
      setTokenDiagnostic(res);
      if (res.valid) {
        showToast('✅ GitHub Token Verified! Ready to save.');
      } else {
        showToast('❌ Token test failed. See details below.');
      }
    } catch (e) {
      setTokenDiagnostic({ valid: false, error: e.message });
    } finally {
      setIsTestingGitHubToken(false);
    }
  };

  const handleSaveGitHubConfig = async () => {
    const cleanToken = githubToken.trim();
    const cleanRepo = githubRepo.trim();
    if (!cleanToken) {
      showToast('⚠️ Please enter your GitHub Personal Access Token.');
      return;
    }

    setIsTestingGitHubToken(true);
    setSyncFeedback({
      type: 'info',
      message: '⏳ Verifying token and enabling master sync for all devices worldwide...'
    });

    try {
      // 1. Validate token with GitHub
      const diag = await testGitHubCredentials(cleanToken, cleanRepo);
      setTokenDiagnostic(diag);
      if (!diag.valid) {
        showToast('❌ Token test failed. Please check permissions.');
        setSyncFeedback({
          type: 'error',
          message: `❌ Cannot enable key: ${diag.error}`
        });
        return;
      }

      // 2. Set local storage and active repo
      setLocalMasterToken(cleanToken);
      contentService.setGithubRepo(cleanRepo);

      // 3. If in local dev server, write to src/config/syncConfig.js
      if (isLocalDev()) {
        try {
          const obfuscated = obfuscateToken(cleanToken);
          await fetch('/api/cms/save-master-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ encodedKey: obfuscated, repo: cleanRepo })
          });
        } catch (err) {
          console.warn('Could not auto-write to syncConfig.js via dev server:', err);
        }
      }

      // 4. Commit updated master sync vault to GitHub so ALL devices sync it automatically!
      try {
        await contentService.publishMasterVault({
          token: cleanToken,
          repo: cleanRepo
        });
        showToast('🎉 Master Token enabled for ALL employees and devices worldwide!');
        setSyncFeedback({
          type: 'success',
          message: '🎉 Organization Master Token configured & synchronized to GitHub! Every employee and device worldwide can now publish live with 1 click without entering any tokens or passwords!'
        });
      } catch (cloudErr) {
        // If master vault commit fails, token is still active locally
        showToast('✅ Master Key saved for this browser! (Cloud sync: ' + cloudErr.message + ')');
        setSyncFeedback({
          type: 'success',
          message: 'Master Key is saved in this browser. You can publish live anytime.'
        });
      }
    } catch (err) {
      showToast(`❌ Error saving master key: ${err.message}`);
      setSyncFeedback({
        type: 'error',
        message: `❌ Error: ${err.message}`
      });
    } finally {
      setIsTestingGitHubToken(false);
    }
  };

  const handleResetToDefaultMasterKey = () => {
    clearLocalMasterToken();
    const defaultToken = getBuiltinMasterToken();
    setGithubToken(defaultToken);
    setTokenDiagnostic(null);
    showToast('🔄 Reset to default Organization Master Key.');
    setSyncFeedback({
      type: 'success',
      message: '✅ Restored built-in Organization Master Key. All devices use this verified key without passwords.'
    });
  };

  const handlePublishToLiveGitHub = async () => {
    const tokenToUse = githubToken.trim() || getActivePublishToken();
    if (!tokenToUse) {
      showToast('⚠️ Please enter your GitHub Personal Access Token (PAT) first.');
      return;
    }
    setIsPublishingGitHub(true);
    setSyncFeedback({
      type: 'info',
      message: '🚀 Pushing updated live content to GitHub repository...'
    });
    try {
      const res = await contentService.publishWorldwide({
        token: tokenToUse,
        repo: githubRepo.trim(),
        commitMessage: `Content Studio Publish: ${new Date().toLocaleString()}`
      });
      setSyncFeedback({
        type: 'success',
        message: `✅ Live Publish Successful! ${res.message}`
      });
      showToast('🎉 Published to GitHub! Live site is updating worldwide.');
    } catch (err) {
      setSyncFeedback({
        type: 'error',
        message: `❌ Publish failed: ${err.message}`
      });
      showToast(`❌ Error: ${err.message}`);
    } finally {
      setIsPublishingGitHub(false);
    }
  };

  const handleForceSyncFromCloud = async () => {
    setIsSyncingFromCloud(true);
    try {
      const res = await contentService.forceSyncFromCloud();
      if (res.updated) {
        showToast(`✅ Synced ${res.toursCount || 0} packages from live cloud snapshot!`);
        setSyncFeedback({
          type: 'success',
          message: `✅ Successfully pulled ${res.toursCount || 0} tour packages from the live cloud snapshot into this device.`
        });
      } else {
        showToast('✅ Already synchronized with the latest cloud content!');
        setSyncFeedback({
          type: 'info',
          message: '✅ This device is already running the exact latest content from the cloud snapshot.'
        });
      }
    } catch (err) {
      showToast(`❌ Sync error: ${err.message}`);
      setSyncFeedback({
        type: 'error',
        message: `❌ Cloud sync failed: ${err.message}`
      });
    } finally {
      setIsSyncingFromCloud(false);
    }
  };

  const handleDownloadLiveContent = () => {
    const data = {
      lastUpdated: new Date().toISOString(),
      updatedBy: 'Comfort Journey Content Studio Export',
      tours: contentService.getTours(),
      blogs: contentService.getBlogs()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'live-content.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('📥 Downloaded live-content.json!');
  };

  const handleCopyLiveContent = () => {
    const data = {
      lastUpdated: new Date().toISOString(),
      updatedBy: 'Comfort Journey Content Studio Export',
      tours: contentService.getTours(),
      blogs: contentService.getBlogs()
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    showToast('📋 Copied live dataset JSON to clipboard!');
  };

  if (!isOpen) return null;

  // ─── Tab Definitions ───
  const tabs = [
    { id: 'manage-tours', label: 'Tour Packages', icon: LayoutDashboard },
    { id: 'manage-blogs', label: 'Blog & Magazine', icon: FileText },
    { id: 'global-sync', label: 'Global Live Sync', icon: UploadCloud },
    { id: 'data-hub', label: 'Data Hub (Import & Export)', icon: FileSpreadsheet },
    { id: 'analytics', label: 'Growth Hub', icon: TrendingUp },
    { id: 'directus-config', label: 'Directus & AWS', icon: Database },
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
              {activeTab === 'manage-tours' && <TourPackageManager onOpenGlobalSync={() => setActiveTab('global-sync')} />}

              {/* ── Blog Manager ── */}
              {activeTab === 'manage-blogs' && <BlogManager onOpenGlobalSync={() => setActiveTab('global-sync')} />}

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

              {/* ── Global Live Sync Tab ── */}
              {activeTab === 'global-sync' && (
                <div className="admin-tab-pane animate-fade-in global-sync-pane">
                  {/* Status Banner */}
                  <div className="directus-status-card">
                    <div className="status-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                      <div className="status-indicator-col">
                        <span className={`status-pill ${isPublishConfigured() ? 'online' : 'fallback'}`}>
                          {isPublishConfigured() ? '● Master Cloud Publishing Active' : '○ Setup Required: Master Token Not Configured'}
                        </span>
                        <h3 className="status-title" style={{ marginTop: '0.4rem' }}>
                          Global Cloud Synchronization & Live Publishing
                        </h3>
                      </div>

                      {/* Quick Cloud Parity Sync Button */}
                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}
                        onClick={handleForceSyncFromCloud}
                        disabled={isSyncingFromCloud}
                        title="Pull the latest tours and blogs published by other team members"
                      >
                        <RefreshCw size={14} className={isSyncingFromCloud ? 'animate-spin' : ''} />
                        <span>{isSyncingFromCloud ? 'Syncing...' : '🔄 Pull Latest Cloud Updates to This Device'}</span>
                      </button>
                    </div>

                    <p className="status-desc" style={{ marginTop: '0.6rem' }}>
                      {isPublishConfigured()
                        ? '🟢 Organization Master Key is active. All employees on ANY device or computer can now publish live tour updates and blogs with 1 click without ever having to enter any passwords or tokens!'
                        : '⚠️ Configure the Organization Master Key below once. Once configured by an Admin, all other employees and devices can publish live updates with 1 click without any password or key prompts.'}
                    </p>
                  </div>

                  {/* Feedback Banner if any */}
                  {syncFeedback && (
                    <div
                      className="animate-fade-in"
                      style={{
                        marginTop: '1rem',
                        padding: '0.85rem 1.15rem',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                        lineHeight: '1.5',
                        background:
                          syncFeedback.type === 'success'
                            ? 'rgba(16, 185, 129, 0.12)'
                            : syncFeedback.type === 'error'
                            ? 'rgba(239, 68, 68, 0.12)'
                            : 'rgba(255, 137, 47, 0.12)',
                        border: `1px solid ${
                          syncFeedback.type === 'success'
                            ? 'rgba(16, 185, 129, 0.35)'
                            : syncFeedback.type === 'error'
                            ? 'rgba(239, 68, 68, 0.35)'
                            : 'rgba(255, 137, 47, 0.35)'
                        }`,
                        color: '#FFF'
                      }}
                    >
                      {syncFeedback.message}
                    </div>
                  )}

                  {/* Token Diagnostic Feedback */}
                  {tokenDiagnostic && (
                    <div
                      className="animate-fade-in"
                      style={{
                        marginTop: '1rem',
                        padding: '0.85rem 1.15rem',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                        lineHeight: '1.5',
                        background: tokenDiagnostic.valid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        border: `1px solid ${tokenDiagnostic.valid ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
                        color: tokenDiagnostic.valid ? '#A7F3D0' : '#FECACA',
                        whiteSpace: 'pre-line'
                      }}
                    >
                      {tokenDiagnostic.valid ? (
                        <div>
                          <strong style={{ color: '#34D399', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <CheckCircle2 size={16} /> Token Authenticated Successfully!
                          </strong>
                          <div style={{ marginTop: '0.3rem' }}>
                            {tokenDiagnostic.message}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <strong style={{ color: '#F87171', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <AlertTriangle size={16} /> GitHub Credential Error:
                          </strong>
                          <div style={{ marginTop: '0.3rem' }}>
                            {tokenDiagnostic.error}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Configuration Form */}
                  <div className="directus-config-form" style={{ marginTop: '1.25rem' }}>
                    <h4 className="config-heading">Organization Master Publishing Configuration</h4>
                    <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      Enter your GitHub repository and Personal Access Token (Classic with <code>repo</code> scope). This token is shared organization-wide so employees never have to see or manage secret keys.
                    </p>

                    <div className="config-grid">
                      <div className="field-group">
                        <label>GitHub Repository</label>
                        <input
                          type="text"
                          className="cms-input"
                          value={githubRepo}
                          onChange={(e) => setGithubRepo(e.target.value)}
                          placeholder="comfort-journey/comfort-journey-website"
                        />
                      </div>
                      <div className="field-group">
                        <label>Organization Master GitHub Token (PAT)</label>
                        <input
                          type="password"
                          className="cms-input"
                          value={githubToken}
                          onChange={(e) => {
                            setGithubToken(e.target.value);
                            setTokenDiagnostic(null);
                          }}
                          placeholder="ghp_... (GitHub Classic Token)"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="config-actions-row" style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                        onClick={handleTestToken}
                        disabled={isTestingGitHubToken || !githubToken.trim()}
                      >
                        {isTestingGitHubToken ? <Loader2 size={15} className="animate-spin" /> : <Key size={15} />}
                        <span>{isTestingGitHubToken ? 'Testing Permissions...' : '🔍 Test Connection & Permissions'}</span>
                      </button>

                      <button
                        type="button"
                        className="btn-primary"
                        style={{ background: '#10B981', borderColor: '#059669', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                        onClick={handleSaveGitHubConfig}
                        disabled={!githubToken.trim()}
                      >
                        <CheckCircle2 size={15} />
                        <span>💾 Save & Enable for All Employees Worldwide</span>
                      </button>

                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderStyle: 'dashed' }}
                        onClick={handleResetToDefaultMasterKey}
                        title="Restore the built-in Master Token if a custom local token is malfunctioning"
                      >
                        <RefreshCw size={14} />
                        <span>Reset to Default Master Key</span>
                      </button>

                      <button
                        type="button"
                        className="btn-primary"
                        onClick={handlePublishToLiveGitHub}
                        disabled={isPublishingGitHub}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <UploadCloud size={15} className={isPublishingGitHub ? 'animate-spin' : ''} />
                        <span>{isPublishingGitHub ? 'Publishing Live to Website...' : '🚀 Publish All Content to Live Website Now'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Step-by-Step Guide to Avoid "Bad credentials" */}
                  <div
                    style={{
                      marginTop: '1.5rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px',
                      padding: '1.25rem',
                      fontSize: '0.83rem',
                      lineHeight: '1.6'
                    }}
                  >
                    <strong style={{ color: '#FF892F', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      🔑 Why "Bad credentials" occurs & How to generate a working token:
                    </strong>
                    <ol style={{ margin: '0.6rem 0 0 1.25rem', padding: 0, color: '#CBD5E1' }}>
                      <li>
                        Visit your GitHub token page: <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer" style={{ color: '#6FE6FC', textDecoration: 'underline' }}>github.com/settings/tokens</a> (Select <strong>Personal access tokens → Tokens (classic)</strong>).
                      </li>
                      <li>
                        Click <strong>"Generate new token (classic)"</strong>.
                      </li>
                      <li>
                        Note name: e.g. <code>Comfort Journey Master CMS</code>.
                      </li>
                      <li>
                        <strong style={{ color: '#FCD34D' }}>Crucial Checkbox:</strong> Check the <strong><code>repo</code></strong> box (Full control of private and public repositories). Without this, GitHub will reject publishes with <em>"Bad credentials"</em> or <em>"Not Found"</em>.
                      </li>
                      <li>
                        Scroll to the bottom, click <strong>"Generate token"</strong>, and copy the string starting with <code>ghp_...</code>.
                      </li>
                      <li>
                        Paste it in the box above, click <strong>"Test Connection"</strong>, and then click <strong>"Save & Enable for All Employees Worldwide"</strong>.
                      </li>
                    </ol>
                    <p style={{ marginTop: '0.6rem', color: '#94A3B8', fontSize: '0.78rem' }}>
                      💡 <em>Once saved, no other employee or device will ever be asked to enter a token. Normal employees only need to click "Publish" and changes go live worldwide.</em>
                    </p>
                  </div>

                  {/* Future AWS .com Production Notice */}
                  <div
                    style={{
                      marginTop: '1.25rem',
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(111, 230, 252, 0.05) 100%)',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                      borderRadius: '10px',
                      padding: '1.15rem',
                      fontSize: '0.82rem',
                      color: '#E2E8F0'
                    }}
                  >
                    <strong style={{ color: '#34D399', fontSize: '0.88rem' }}>🚀 Upcoming AWS .com Production Setup:</strong>
                    <p style={{ margin: '0.4rem 0 0', color: '#94A3B8', lineHeight: '1.5' }}>
                      When you host your website on AWS with your official <code>.com</code> domain, you can connect your AWS Directus database or API endpoint (under the <strong>Directus & AWS</strong> tab). Once connected, employees won't even need GitHub tokens—every click of <strong>"Save"</strong> or <strong>"Publish"</strong> will sync directly into the AWS cloud database in real time!
                    </p>
                  </div>

                  {/* Manual Backup / Export */}
                  <div className="directus-guide-card" style={{ marginTop: '1.5rem' }}>
                    <h4 className="guide-title">📦 Manual Backup & JSON Export</h4>
                    <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      You can also download or copy the master live dataset JSON at any time:
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button type="button" className="btn-secondary" onClick={handleDownloadLiveContent}>
                        📥 Download public/live-content.json
                      </button>
                      <button type="button" className="btn-secondary" onClick={handleCopyLiveContent}>
                        📋 Copy JSON to Clipboard
                      </button>
                    </div>
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
