import React, { useState, useEffect } from 'react';
import {
  X, Lock, LayoutDashboard, FileText, Search, Database,
  UploadCloud, TrendingUp, Image as ImageIcon, Settings, FileSpreadsheet,
  CheckCircle2, AlertTriangle, Loader2, Key, RefreshCw, Globe, ExternalLink, Sliders, Sparkles, Users, Sun, Moon,
  Shield, LogOut, Eye, EyeOff, UserCheck
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
  getCloudflareWorkerUrl,
  setCloudflareWorkerUrl,
  obfuscateToken,
  MASTER_SYNC_CONFIG
} from '../config/syncConfig';

// ═══ New Content Studio Components ═══
import TourPackageManager from './cms/TourPackageManager';
import BlogManager from './cms/BlogManager';
import AnalyticsDashboard from './cms/AnalyticsDashboard';
import DataHubManager from './cms/DataHubManager';
import SiteCustomizer from './cms/SiteCustomizer';
import LeadsInquiriesManager from './cms/LeadsInquiriesManager';
import TeamAccessManager, { getAuthorizedUsers } from './cms/TeamAccessManager';
import { teamAccessStorageService } from '../services/teamAccessStorageService';
import { triggerGoogleSignInPrompt, getGoogleClientId } from '../utils/googleAuthHelper';
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

export default function AdminCMSModal({ isOpen, onClose, isStandalonePage = false }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('cj_cms_session_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(sessionStorage.getItem('cj_cms_session_user'));
  });
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('manage-tours');
  const [cmsTheme, setCmsTheme] = useState(() => {
    return localStorage.getItem('cj_cms_theme') || (document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  });

  const toggleCmsTheme = () => {
    const next = cmsTheme === 'dark' ? 'light' : 'dark';
    setCmsTheme(next);
    localStorage.setItem('cj_cms_theme', next);
  };

  // Directus Connection State (preserved from v1)
  const [directusUrl, setDirectusUrl] = useState(directusService.getBaseUrl());
  const [directusToken, setDirectusToken] = useState(directusService.getToken());
  const [showDirectusToken, setShowDirectusToken] = useState(false);
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

  // Single-Click Google SSO for Staff & Admin
  // Single-Click Google SSO for Staff & Admin (Strict: only pre-authorized team accounts permitted)
  const handleStaffGoogleSSO = async () => {
    setAuthError('');
    try {
      const clientId = getGoogleClientId();
      if (!clientId || !clientId.includes('.apps.googleusercontent.com')) {
        setAuthError('Google Sign-In is not configured.');
        return;
      }

      showToast('Connecting with Google...');
      const info = await triggerGoogleSignInPrompt();
      if (!info?.email) {
        setAuthError('No email returned from Google authentication.');
        return;
      }

      const staffEmail = info.email.toLowerCase().trim();
      
      // REAL-TIME SECURITY CHECK VIA AWS DIRECTUS:
      // Instantly verifies whether the employee has active access or has been revoked
      const authResult = await teamAccessStorageService.verifyStaffLoginRealtime(staffEmail);

      if (!authResult.allowed) {
        setAuthError(authResult.error || `⛔ Access Denied: The Google account "${staffEmail}" does not have staff permissions.`);
        return;
      }

      const userMatch = authResult.user;

      const sessionUser = {
        id: userMatch.id || `staff-g-${Date.now()}`,
        name: userMatch.name || info.name || 'Team Member',
        email: userMatch.email,
        role: userMatch.role || 'CONTENT_EDITOR',
        allowedSections: userMatch.allowedSections || (userMatch.role === 'SUPER_ADMIN' ? ['*'] : ['manage-blogs']),
        provider: 'google'
      };

      sessionStorage.setItem('cj_cms_session_user', JSON.stringify(sessionUser));
      setCurrentUser(sessionUser);
      setIsAuthenticated(true);
      const isSuper = sessionUser.role === 'SUPER_ADMIN';
      const firstSection = isSuper ? 'manage-tours' : (sessionUser.allowedSections?.[0] || 'manage-blogs');
      setActiveTab(firstSection);
      showToast(`✅ Welcome, ${sessionUser.name}! (${isSuper ? 'Super Admin' : 'Staff Access'})`);
    } catch (err) {
      const msg = err?.message || '';
      if (msg.includes('closed') || msg.includes('cancel') || msg.includes('POPUP_CLOSED')) {
        setAuthError('Google sign-in was closed or cancelled.');
      } else if (msg.includes('origin') || msg.includes('mismatch')) {
        setAuthError('Domain origin error in Google Cloud Console. Please ensure https://comfort-journey.github.io is in Authorized JavaScript Origins.');
      } else {
        setAuthError(msg || 'Google authentication failed.');
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    if (!cleanEmail || !cleanPass) {
      setAuthError('Please enter both your company email address and password.');
      return;
    }

    // REAL-TIME SECURITY CHECK VIA AWS DIRECTUS
    const authResult = await teamAccessStorageService.verifyStaffLoginRealtime(cleanEmail);

    if (!authResult.allowed) {
      setAuthError(authResult.error || `⛔ Access Denied: "${cleanEmail}" is not recognized as an authorized staff account.`);
      return;
    }

    const userMatch = authResult.user;

    if (userMatch.password && userMatch.password !== cleanPass) {
      setAuthError('❌ Incorrect password. Please verify your credentials or sign in with authorized Google SSO.');
      return;
    }

    const sessionUser = {
      id: userMatch.id || `staff-${Date.now()}`,
      name: userMatch.name,
      email: userMatch.email,
      role: userMatch.role || 'CONTENT_EDITOR',
      allowedSections: userMatch.allowedSections || (userMatch.role === 'SUPER_ADMIN' ? ['*'] : ['manage-blogs']),
      provider: 'password'
    };

    setCurrentUser(sessionUser);
    setIsAuthenticated(true);
    sessionStorage.setItem('cj_cms_session_user', JSON.stringify(sessionUser));
    const isSuper = sessionUser.role === 'SUPER_ADMIN';
    const firstSection = isSuper ? 'manage-tours' : (sessionUser.allowedSections?.[0] || 'manage-blogs');
    setActiveTab(firstSection);
    showToast(`👋 Welcome back, ${sessionUser.name}! (${isSuper ? 'Super Admin' : 'Staff Access'})`);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('cj_cms_session_user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setEmailInput('');
    setPasswordInput('');
    showToast('🔒 You have been securely logged out.');
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
  const [cloudflareUrl, setCloudflareUrl] = useState(() => getCloudflareWorkerUrl() || '');
  const [isTestingCloudflare, setIsTestingCloudflare] = useState(false);
  const [cloudflareStatus, setCloudflareStatus] = useState(null);

  const [githubToken, setGithubToken] = useState(() => getActivePublishToken() || '');
  const [githubRepo, setGithubRepo] = useState(() => getActiveRepo() || 'comfort-journey/comfort-journey-website');
  const [isPublishingGitHub, setIsPublishingGitHub] = useState(false);
  const [isTestingGitHubToken, setIsTestingGitHubToken] = useState(false);
  const [isSyncingFromCloud, setIsSyncingFromCloud] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState(null);
  const [tokenDiagnostic, setTokenDiagnostic] = useState(null);

  const handleTestCloudflare = async () => {
    let cleanUrl = cloudflareUrl.trim().replace(/\/+$/, '');
    if (!cleanUrl) {
      showToast('⚠️ Please enter your Cloudflare Worker URL.');
      return;
    }
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
      setCloudflareUrl(cleanUrl);
    }
    setIsTestingCloudflare(true);
    setCloudflareStatus(null);
    try {
      const res = await fetch(`${cleanUrl}/health`);
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        if (data.configured) {
          setCloudflareStatus({ valid: true, message: `✅ Cloudflare Worker is active and GITHUB_TOKEN is configured! Ready to publish worldwide.` });
          showToast('✅ Cloudflare Worker verified and online!');
        } else {
          setCloudflareStatus({
            valid: true,
            warning: true,
            message: `⚠️ Cloudflare Worker is active and online, but GITHUB_TOKEN is not yet set in Cloudflare Secrets!\n👉 Please go to Cloudflare Worker Settings → Variables and Secrets → Add "GITHUB_TOKEN" with your GitHub PAT.`
          });
          showToast('⚠️ Worker online, but GITHUB_TOKEN needed in Cloudflare.');
        }
      } else {
        setCloudflareStatus({ valid: false, error: data.error || `HTTP ${res.status}` });
        showToast('❌ Cloudflare Worker returned error.');
      }
    } catch (e) {
      setCloudflareStatus({ valid: false, error: `Connection failed: ${e.message}` });
      showToast(`❌ Error connecting to Cloudflare: ${e.message}`);
    } finally {
      setIsTestingCloudflare(false);
    }
  };

  const handleSaveCloudflareConfig = () => {
    let cleanUrl = cloudflareUrl.trim().replace(/\/+$/, '');
    if (cleanUrl && !cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
      setCloudflareUrl(cleanUrl);
    }
    setCloudflareWorkerUrl(cleanUrl);
    showToast('🎉 Cloudflare Worker URL saved! Live publishing is now 100% token-free.');
    setSyncFeedback({
      type: 'success',
      message: '🎉 Cloudflare Worker configured! Employees worldwide can publish live without any tokens in the browser or GitHub.'
    });
  };

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
    const hasCloudflare = Boolean(getCloudflareWorkerUrl());
    const tokenToUse = githubToken.trim() || getActivePublishToken();
    if (!hasCloudflare && !tokenToUse && !isLocalDev()) {
      showToast('⚠️ Please configure the Cloudflare Worker URL or GitHub Token.');
      return;
    }
    setIsPublishingGitHub(true);
    setSyncFeedback({
      type: 'info',
      message: '🚀 Pushing updated live content to cloud and deploying worldwide...'
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

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

  // ─── Granular Section-Based Access Control ───
  // Ensure fresh permissions are retrieved for currentUser
  const freshUsersList = getAuthorizedUsers();
  const matchedUser = freshUsersList.find(u => (u.email || '').toLowerCase() === (currentUser?.email || '').toLowerCase());
  const activeAllowedSections = matchedUser?.allowedSections || currentUser?.allowedSections || (
    isSuperAdmin ? ['*'] : (
      currentUser?.role === 'SALES_CRM' ? ['leads-inquiries', 'manage-tours'] :
      currentUser?.role === 'BLOG_WRITER' ? ['manage-blogs'] :
      currentUser?.role === 'TOUR_MANAGER' ? ['manage-tours'] :
      ['manage-blogs'] // Safe default: never expose CRM database by default
    )
  );

  const canAccessSection = (sectionId) => {
    if (isSuperAdmin) return true;
    if (activeAllowedSections.includes('*')) return true;
    return activeAllowedSections.includes(sectionId);
  };

  // ─── Tab Definitions with Role-Based Access Control ───
  const allTabs = [
    { id: 'manage-tours', label: 'Tour Packages', icon: LayoutDashboard, adminOnly: false },
    { id: 'leads-inquiries', label: 'Leads & Inquiries CRM', icon: Users, adminOnly: false },
    { id: 'manage-blogs', label: 'Blog & Magazine', icon: FileText, adminOnly: false },
    { id: 'site-customizer', label: 'Site & SEO Customizer', icon: Sliders, adminOnly: false },
    { id: 'analytics', label: 'Growth Hub', icon: TrendingUp, adminOnly: false },
    { id: 'data-hub', label: 'Data Hub (Import & Export)', icon: FileSpreadsheet, adminOnly: false },
    { id: 'global-sync', label: 'Global Live Sync', icon: UploadCloud, adminOnly: true },
    { id: 'directus-config', label: 'Directus & AWS', icon: Database, adminOnly: true },
    { id: 'team-access', label: 'Team & Access Control', icon: Shield, adminOnly: true },
  ];

  // Only display tabs the employee is authorized to view
  const tabs = allTabs.filter(tab => {
    if (isSuperAdmin) return true;
    if (tab.adminOnly) return false;
    return canAccessSection(tab.id);
  });

  // Auto-switch to first authorized tab if current activeTab is not permitted for this user
  useEffect(() => {
    if (isAuthenticated && tabs.length > 0 && !tabs.some(t => t.id === activeTab)) {
      setActiveTab(tabs[0].id);
    }
  }, [isAuthenticated, tabs, activeTab]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-content admin-modal-content content-studio-modal ${cmsTheme === 'light' ? 'cms-theme-light' : 'cms-theme-dark'}`} 
        data-cms-theme={cmsTheme}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ═══ Header ═══ */}
        <div className="admin-header">
          <div className="admin-title-row">
            <LayoutDashboard size={22} className="text-amber" />
            <div>
              <h2 className="admin-title">Comfort Journey — Content Studio</h2>
              <span className="admin-subtitle">Tour Manager · Blog Editor · SEO Assistant · Growth Hub Analytics</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Logged in User Pill */}
            {isAuthenticated && currentUser && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.25rem 0.65rem', borderRadius: '9999px', background: isSuperAdmin ? 'rgba(255, 137, 47, 0.15)' : 'rgba(111, 230, 252, 0.15)', border: `1px solid ${isSuperAdmin ? 'rgba(255, 137, 47, 0.4)' : 'rgba(111, 230, 252, 0.4)'}` }}>
                {isSuperAdmin ? <Shield size={13} color="#FF892F" /> : <Users size={13} color="#6FE6FC" />}
                <span style={{ fontSize: '0.76rem', fontWeight: 700, color: isSuperAdmin ? '#FF892F' : '#6FE6FC' }}>
                  {isSuperAdmin ? 'Super Admin' : 'Editor'}: {currentUser.name || currentUser.email}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Log out of CMS"
                  style={{ marginLeft: '0.25rem', background: 'transparent', border: 'none', color: '#CBD5E1', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <LogOut size={13} />
                </button>
              </div>
            )}

            {/* Studio Theme Switcher Button */}
            <button
              type="button"
              className="btn-cms-theme-toggle"
              onClick={toggleCmsTheme}
              title={`Switch to ${cmsTheme === 'dark' ? 'Light' : 'Dark'} Studio Mode`}
            >
              {cmsTheme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              <span>{cmsTheme === 'dark' ? 'Light Studio' : 'Dark Studio'}</span>
            </button>

            {isAuthenticated && isSuperAdmin && (
              <button
                type="button"
                className="btn-cms-header-publish"
                onClick={handlePublishToLiveGitHub}
                disabled={isPublishingGitHub}
                title="Publish all tour and content changes live to the website worldwide"
              >
                {isPublishingGitHub ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Deploying Live...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud size={15} />
                    <span>🚀 Publish to Live Site</span>
                  </>
                )}
              </button>
            )}
            {isStandalonePage && (
              <button 
                type="button" 
                className="btn-cms-theme-toggle"
                onClick={onClose}
                title="Return to Comfort Journey Main Website"
                style={{ background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <span>← Back to Website</span>
              </button>
            )}
            <button className="admin-close-btn" onClick={onClose} aria-label="Close" title="Close CMS">
              <X size={20} />
            </button>
          </div>
        </div>

        {!isAuthenticated ? (
          /* ═══ Login Screen ═══ */
          <div className="admin-auth-box">
            <div className="lock-icon-circle">
              <Shield size={32} color="#FF892F" />
            </div>
            <h3 className="admin-auth-title">Comfort Journey Staff Portal</h3>
            <p className="admin-auth-desc">
              Secure portal for Comfort Journey administrators, travel designers, and operations staff.
            </p>

            {/* 1-Click Fast SSO Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', width: '100%', marginBottom: '1.25rem' }}>
              <button
                type="button"
                onClick={handleStaffGoogleSSO}
                className="btn-staff-sso-google"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: '#FFFFFF',
                  color: '#1F2937',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google (Work Gmail)</span>
              </button>
            </div>

            <div className="auth-divider-row" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', margin: '1.25rem 0' }}>
              <div className="auth-divider-line" style={{ flex: 1, height: '1px' }} />
              <span className="auth-divider-text" style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                or sign in with password
              </span>
              <div className="auth-divider-line" style={{ flex: 1, height: '1px' }} />
            </div>

            <form onSubmit={handleLogin} className="auth-form" style={{ width: '100%' }}>
              <div style={{ textAlign: 'left', marginBottom: '0.85rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>Staff / Admin Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your registered work email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  autoFocus
                  required
                  style={{ width: '100%', padding: '0.75rem 0.95rem', borderRadius: '8px', fontSize: '0.9rem' }}
                />
              </div>
              <div style={{ textAlign: 'left', marginBottom: '1.15rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>Password / Access Key</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.75rem 0.95rem', borderRadius: '8px', fontSize: '0.9rem' }}
                />
              </div>
              {authError && <p className="auth-error-msg" style={{ marginBottom: '1rem', color: '#EF4444', fontSize: '0.84rem', fontWeight: 600 }}>{authError}</p>}
              <button type="submit" className="btn-primary w-full" style={{ width: '100%', padding: '0.8rem', justifyContent: 'center', fontWeight: 800 }}>
                Sign In to Content Studio
              </button>
            </form>
            <div className="auth-footer-notice" style={{ marginTop: '1.25rem', padding: '0.85rem 1rem', borderRadius: '8px', fontSize: '0.78rem', lineHeight: '1.45', textAlign: 'left', width: '100%' }}>
              <strong style={{ display: 'block', marginBottom: '0.25rem' }}>🔒 Strict Staff Access Control:</strong>
              <div>
                • Only active staff accounts authorized in the CMS Admin directory can log in.<br />
                • Use <strong>Continue with Google</strong> if your work account is authorized, or enter your registered email & password above.<br />
                • Staff access can be granted, modified, or revoked anytime by a Super Admin in the <em>Team & Access Control</em> panel.
              </div>
            </div>
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
              {/* ── Team & Access Management (Super Admin Only) ── */}
              {activeTab === 'team-access' && isSuperAdmin && (
                <TeamAccessManager currentUser={currentUser} showToast={showToast} />
              )}
              {/* ── Tour Package Manager ── */}
              {activeTab === 'manage-tours' && canAccessSection('manage-tours') && (
                <TourPackageManager onOpenGlobalSync={() => setActiveTab('global-sync')} />
              )}

              {/* ── Leads & Inquiries CRM Dashboard (Sales & Admin Only) ── */}
              {activeTab === 'leads-inquiries' && canAccessSection('leads-inquiries') && (
                <LeadsInquiriesManager showToast={showToast} />
              )}
              {activeTab === 'leads-inquiries' && !canAccessSection('leads-inquiries') && (
                <div style={{ padding: '3rem 1.5rem', textAlign: 'center', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.25)', margin: '1.5rem' }}>
                  <Shield size={44} color="#EF4444" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ color: '#EF4444', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Access Restricted: Sales CRM Database</h3>
                  <p style={{ color: '#94A3B8', maxWidth: '480px', margin: '0 auto', fontSize: '0.88rem' }}>
                    You do not have permission to view customer inquiries or the CRM database. This section is strictly restricted to authorized Sales Team members and Administrators.
                  </p>
                </div>
              )}

              {/* ── Blog Manager (Content Writers & Admin) ── */}
              {activeTab === 'manage-blogs' && canAccessSection('manage-blogs') && (
                <BlogManager onOpenGlobalSync={() => setActiveTab('global-sync')} />
              )}

              {/* ── Site & SEO Customizer (Homepage, Popups, Meta, AEO/GEO) ── */}
              {activeTab === 'site-customizer' && canAccessSection('site-customizer') && (
                <SiteCustomizer onToast={showToast} />
              )}

              {/* ── Analytics Dashboard ── */}
              {activeTab === 'analytics' && canAccessSection('analytics') && (
                <AnalyticsDashboard />
              )}

              {/* ── Data Hub (Import & Export) ── */}
              {activeTab === 'data-hub' && (isSuperAdmin || canAccessSection('data-hub')) && (
                <DataHubManager />
              )}

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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                          <label style={{ margin: 0 }}>API Token</label>
                          <button
                            type="button"
                            onClick={() => setShowDirectusToken(!showDirectusToken)}
                            style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '3px' }}
                          >
                            {showDirectusToken ? <EyeOff size={13} /> : <Eye size={13} />}
                            <span>{showDirectusToken ? 'Hide' : 'Reveal'}</span>
                          </button>
                        </div>
                        <input
                          type={showDirectusToken ? 'text' : 'password'}
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

                  {/* ── Option A: Cloudflare Worker Secure Proxy (Recommended) ── */}
                  <div
                    style={{
                      marginTop: '1.25rem',
                      background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%)',
                      border: '1px solid rgba(249, 115, 22, 0.3)',
                      borderRadius: '12px',
                      padding: '1.35rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h4 style={{ margin: 0, color: '#FF892F', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        🛡️ Cloudflare Worker Secure Proxy (Recommended & 100% Token-Free)
                      </h4>
                      <span className={`status-pill ${cloudflareUrl ? 'online' : 'fallback'}`}>
                        {cloudflareUrl ? '● Cloudflare Proxy Active' : '○ Not Configured'}
                      </span>
                    </div>

                    <p style={{ color: '#CBD5E1', fontSize: '0.84rem', margin: '0.5rem 0 1rem', lineHeight: '1.55' }}>
                      Keeps your GitHub Token <strong>100% private</strong> inside Cloudflare's secure cloud secrets. Zero tokens in your GitHub repository, zero tokens in browser DevTools. All employees worldwide can 1-click publish without any password or key prompts.
                    </p>

                    <div className="field-group" style={{ marginBottom: '1rem' }}>
                      <label style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Your Cloudflare Worker Endpoint URL:</label>
                      <input
                        type="url"
                        className="cms-input"
                        value={cloudflareUrl}
                        onChange={(e) => {
                          setCloudflareUrl(e.target.value);
                          setCloudflareStatus(null);
                        }}
                        placeholder="https://comfort-journey-sync.<your-subdomain>.workers.dev"
                        style={{ fontFamily: 'monospace' }}
                      />
                    </div>

                    {cloudflareStatus && (
                      <div
                        style={{
                          marginBottom: '1rem',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          fontSize: '0.82rem',
                          background: cloudflareStatus.valid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          border: `1px solid ${cloudflareStatus.valid ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
                          color: cloudflareStatus.valid ? '#A7F3D0' : '#FECACA'
                        }}
                      >
                        {cloudflareStatus.valid ? cloudflareStatus.message : `❌ Error: ${cloudflareStatus.error}`}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={handleTestCloudflare}
                        disabled={isTestingCloudflare || !cloudflareUrl.trim()}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.84rem' }}
                      >
                        {isTestingCloudflare ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} />}
                        <span>{isTestingCloudflare ? 'Testing Endpoint...' : '🔍 Test Cloudflare Connection'}</span>
                      </button>

                      <button
                        type="button"
                        className="btn-primary"
                        onClick={handleSaveCloudflareConfig}
                        disabled={!cloudflareUrl.trim()}
                        style={{ background: '#10B981', borderColor: '#059669', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.84rem' }}
                      >
                        <CheckCircle2 size={14} />
                        <span>💾 Save Cloudflare Endpoint for All Devices</span>
                      </button>
                    </div>

                    <p style={{ marginTop: '0.75rem', fontSize: '0.76rem', color: '#94A3B8', lineHeight: '1.4' }}>
                      💡 <em>Setup takes 2 minutes in your free Cloudflare dashboard. See <code>cloudflare-worker/CLOUDFLARE_SETUP.md</code> for the step-by-step guide.</em>
                    </p>
                  </div>

                  {/* ── Option B: Direct GitHub Publishing (Alternative) ── */}
                  <div className="directus-config-form" style={{ marginTop: '1.5rem' }}>
                    <h4 className="config-heading" style={{ color: '#94A3B8' }}>
                      Alternative: Direct GitHub Token (Local Dev / Fallback)
                    </h4>
                    <p style={{ color: '#94A3B8', fontSize: '0.82rem', marginBottom: '1rem' }}>
                      Direct Personal Access Token (Classic with <code>repo</code> scope) for local development or direct publishing.
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
                  <div className="sync-guide-box" style={{ marginTop: '1.5rem', borderRadius: '10px', padding: '1.25rem', fontSize: '0.84rem', lineHeight: '1.6' }}>
                    <strong style={{ color: '#FF892F', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                      🔑 Why "Bad credentials" occurs & How to generate a working token:
                    </strong>
                    <ol style={{ margin: '0.6rem 0 0 1.25rem', padding: 0 }}>
                      <li style={{ marginBottom: '0.35rem' }}>
                        Visit your GitHub token page: <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>github.com/settings/tokens</a> (Select <strong>Personal access tokens → Tokens (classic)</strong>).
                      </li>
                      <li style={{ marginBottom: '0.35rem' }}>
                        Click <strong>"Generate new token (classic)"</strong>.
                      </li>
                      <li style={{ marginBottom: '0.35rem' }}>
                        Note name: e.g. <code>Comfort Journey Master CMS</code>.
                      </li>
                      <li style={{ marginBottom: '0.35rem' }}>
                        <strong>Crucial Checkbox:</strong> Check the <strong><code>repo</code></strong> box (Full control of private and public repositories). Without this, GitHub will reject publishes with <em>"Bad credentials"</em> or <em>"Not Found"</em>.
                      </li>
                      <li style={{ marginBottom: '0.35rem' }}>
                        Scroll to the bottom, click <strong>"Generate token"</strong>, and copy the string starting with <code>ghp_...</code>.
                      </li>
                      <li style={{ marginBottom: '0.35rem' }}>
                        Paste it in the box above, click <strong>"Test Connection"</strong>, and then click <strong>"Save & Enable for All Employees Worldwide"</strong>.
                      </li>
                    </ol>
                    <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', fontStyle: 'italic' }}>
                      💡 Once saved, no other employee or device will ever be asked to enter a token. Normal employees only need to click "Publish" and changes go live worldwide.
                    </p>
                  </div>

                  {/* Future AWS .com Production Notice */}
                  <div className="aws-notice-box" style={{ marginTop: '1.25rem', borderRadius: '10px', padding: '1.15rem', fontSize: '0.83rem' }}>
                    <strong style={{ fontSize: '0.9rem', display: 'block', marginBottom: '0.35rem' }}>🚀 Upcoming AWS .com Production Setup:</strong>
                    <p style={{ margin: 0, lineHeight: '1.55' }}>
                      When you host your website on AWS with your official <code>.com</code> domain, you can connect your AWS Directus database or API endpoint (under the <strong>Directus & AWS</strong> tab). Once connected, employees won't even need GitHub tokens—every click of <strong>"Save"</strong> or <strong>"Publish"</strong> will sync directly into the AWS cloud database in real time!
                    </p>
                  </div>

                  {/* Manual Backup / Export */}
                  <div className="directus-guide-card" style={{ marginTop: '1.5rem', padding: '1.25rem', borderRadius: '10px' }}>
                    <h4 className="guide-title" style={{ margin: '0 0 0.5rem 0' }}>📦 Manual Backup & JSON Export</h4>
                    <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
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

          .btn-cms-header-publish {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            color: #FFFFFF;
            border: 1px solid rgba(16, 185, 129, 0.6);
            border-radius: 8px;
            padding: 0.5rem 1.1rem;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
            transition: all 0.2s ease;
          }

          .btn-cms-header-publish:hover:not(:disabled) {
            background: linear-gradient(135deg, #34D399 0%, #10B981 100%);
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5);
          }

          .btn-cms-header-publish:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .btn-cms-theme-toggle {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 8px;
            padding: 0.48rem 0.85rem;
            font-size: 0.8rem;
            font-weight: 700;
            color: #E2E8F0;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .btn-cms-theme-toggle:hover {
            background: rgba(255, 137, 47, 0.2);
            border-color: #FF892F;
            color: #FF892F;
          }

          .cms-theme-light .btn-cms-theme-toggle {
            background: #F1F5F9;
            border-color: #CBD5E1;
            color: #1E293B;
          }
          .cms-theme-light .btn-cms-theme-toggle:hover {
            background: #FFF7ED;
            border-color: #FF892F;
            color: #EA580C;
          }
          .cms-theme-light .admin-close-btn {
            background: #F1F5F9;
            border-color: #CBD5E1;
            color: #475569;
          }
          .cms-theme-light .admin-close-btn:hover {
            background: #FEE2E2;
            color: #EF4444;
            border-color: #FCA5A5;
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
            color: var(--cj-text-heading, #FFFFFF);
            margin: 0 0 0.5rem;
          }

          .cms-theme-light .admin-auth-box h3 {
            color: #0F172A !important;
          }

          .cms-theme-light .admin-auth-box p {
            color: #475569 !important;
          }

          .cms-theme-light .admin-auth-box label {
            color: #334155 !important;
          }

          .cms-theme-light .admin-auth-box input {
            background: #FFFFFF !important;
            color: #0F172A !important;
            border-color: #CBD5E1 !important;
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
