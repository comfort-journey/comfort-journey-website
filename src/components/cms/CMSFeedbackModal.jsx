import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  ArrowLeft,
  Edit3,
  X,
  Save,
  Trash2,
  UploadCloud,
  Globe,
  Loader2,
  Key,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from 'lucide-react';
import { contentService, isLocalDev } from '../../services/contentService';
import { isPublishConfigured, testGitHubCredentials } from '../../config/syncConfig';

// ═══════════════════════════════════════════════════════════════════
// COMFORT JOURNEY CMS — CONFIRMATION & WORLDWIDE PUBLISH MODAL
// Handles:
// 1. Success confirmation on Save / Publish
// 2. Direct 1-Click Worldwide Publishing (Auto-uses Organization Master Key)
// 3. Zero token hassle for employees — keys are configured once by Admin
// ═══════════════════════════════════════════════════════════════════

export default function CMSFeedbackModal({
  isOpen,
  type = 'saved', // 'saved' | 'published' | 'unsaved_warning'
  title,
  subtitle,
  metaDetails = [],
  statusBadge = 'published',
  onClose,
  onKeepEditing,
  onBackToList,
  onDiscardAndExit,
  onSaveAndExit,
  onOpenGlobalSync
}) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [showAdminDrawer, setShowAdminDrawer] = useState(false);
  const [adminTokenInput, setAdminTokenInput] = useState('');
  const [isTestingToken, setIsTestingToken] = useState(false);
  const [tokenTestFeedback, setTokenTestFeedback] = useState(null);
  const [publishStatus, setPublishStatus] = useState({ isLocalDev: false, hasGithubToken: false });

  // Reset local state when modal opens
  useEffect(() => {
    if (isOpen) {
      const status = contentService.getPublishStatus();
      setPublishStatus(status);
      setAdminTokenInput(contentService.getGithubToken() || '');
      setPublishResult(null);
      setPublishError(null);
      setShowAdminDrawer(false);
      setIsPublishing(false);
      setTokenTestFeedback(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isWarning = type === 'unsaved_warning';
  const isPublish = type === 'published';

  // 1-Click Worldwide Deploy Handler (Uses Organization Master Token automatically)
  const handlePublishWorldwide = async (explicitToken = null) => {
    const tokenToUse = explicitToken || adminTokenInput.trim() || contentService.getGithubToken();

    // If on live website without any token configured anywhere, show Admin setup
    if (!isLocalDev() && !tokenToUse && !isPublishConfigured()) {
      setShowAdminDrawer(true);
      return;
    }

    setIsPublishing(true);
    setPublishError(null);
    setPublishResult(null);

    try {
      if (explicitToken) {
        contentService.setGithubToken(explicitToken);
      }

      const res = await contentService.publishWorldwide({
        token: tokenToUse,
        commitMessage: `Content Studio [${title || 'Tour'}]: ${new Date().toLocaleString()}`
      });

      setPublishResult(res);
      setPublishStatus(contentService.getPublishStatus());
      setShowAdminDrawer(false);
    } catch (err) {
      console.error('[CMS Publish Worldwide Error]:', err);
      const msg = err.message || 'Publish failed. Please verify your connection.';
      setPublishError(msg);
      // Only open Admin drawer if credentials failed or missing
      if (msg.includes('NO_TOKEN') || msg.includes('Bad credentials')) {
        setShowAdminDrawer(true);
      }
    } finally {
      setIsPublishing(false);
    }
  };

  // Test token connection helper for admin
  const handleTestToken = async () => {
    if (!adminTokenInput.trim()) return;
    setIsTestingToken(true);
    setTokenTestFeedback(null);
    const res = await testGitHubCredentials(adminTokenInput.trim());
    setIsTestingToken(false);
    setTokenTestFeedback(res);
  };

  return (
    <div className="cms-confirm-overlay" onClick={onClose}>
      <div className="cms-confirm-modal animate-scale-up" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="cms-confirm-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Icon & Header */}
        <div className="cms-confirm-header">
          {isWarning ? (
            <div className="cms-confirm-icon-circle warning">
              <AlertTriangle size={32} className="text-amber" />
            </div>
          ) : isPublish ? (
            <div className="cms-confirm-icon-circle publish">
              <Sparkles size={32} className="text-sky" />
            </div>
          ) : (
            <div className="cms-confirm-icon-circle save">
              <CheckCircle2 size={32} className="text-emerald" />
            </div>
          )}

          <div className="cms-confirm-title-area">
            <h3 className="cms-confirm-title">
              {isWarning
                ? 'Unsaved Changes Detected'
                : isPublish
                ? '🚀 Published Live to Website!'
                : '💾 Changes Saved Successfully'}
            </h3>
            <p className="cms-confirm-subtitle">
              {isWarning
                ? `You have unsaved edits in "${title || 'this item'}". If you exit now without saving, your recent changes will be discarded.`
                : subtitle || `"${title || 'Item'}" has been updated in your catalog.`}
            </p>
          </div>
        </div>

        {/* Details Card (for save/publish) */}
        {!isWarning && (
          <div className="cms-confirm-details-card">
            <div className="cms-confirm-details-top">
              <span className="cms-confirm-item-name">{title}</span>
              <span className={`status-pill-inline ${statusBadge}`}>
                {statusBadge === 'published' ? '● Live on Website' : '○ Saved as Draft'}
              </span>
            </div>

            {metaDetails.length > 0 && (
              <div className="cms-confirm-meta-grid">
                {metaDetails.map((m, i) => (
                  <div key={i} className="cms-confirm-meta-item">
                    <span className="meta-label">{m.label}:</span>
                    <span className="meta-val">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Clear, positive status notice (No error wording!) */}
            <div className="cms-confirm-notice">
              {isLocalDev() ? (
                <span>🟢 <strong>Saved to Local Codebase:</strong> Synchronized directly to local disk. Changes are active across all website tabs.</span>
              ) : (
                <span>✅ <strong>Saved to Active Catalog:</strong> Changes are immediately active on this device. Click <strong>"Publish Worldwide Now"</strong> below to deploy live for all internet visitors.</span>
              )}
            </div>

            {/* ═══ Direct 1-Click Worldwide Publishing Section ═══ */}
            <div className="cms-worldwide-sync-section">
              <div className="cms-worldwide-sync-header">
                <div className="cms-worldwide-title-row">
                  <Globe size={17} className="text-amber" />
                  <span>Global Live Website Deployment</span>
                </div>
                {publishStatus.hasGithubToken && (
                  <span className="status-pill online" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                    Token Ready
                  </span>
                )}
              </div>

              <p className="cms-worldwide-desc">
                Deploy your latest tour packages and blogs so every traveler and customer worldwide sees them across all devices.
              </p>

              {/* Publish Worldwide Button */}
              {!publishResult ? (
                <button
                  type="button"
                  className="cms-btn-publish-worldwide"
                  onClick={() => handlePublishWorldwide()}
                  disabled={isPublishing}
                >
                  {isPublishing ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Deploying Worldwide to Live Website...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={16} />
                      <span>🚀 Publish Worldwide Now</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="cms-worldwide-feedback success animate-fade-in">
                  <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>🎉 Live Deployment Triggered Worldwide!</strong>
                    <div style={{ marginTop: '0.25rem', fontSize: '0.78rem', color: '#D1FAE5' }}>
                      {publishResult.message}
                    </div>
                  </div>
                </div>
              )}

              {/* Error feedback if any */}
              {publishError && (
                <div className="cms-worldwide-feedback error animate-fade-in">
                  <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Publish Issue:</strong>
                    <div style={{ marginTop: '0.2rem', fontSize: '0.78rem' }}>{publishError}</div>
                  </div>
                </div>
              )}

              {/* Notice when Master Key is not configured yet on live site */}
              {!isLocalDev() && !isPublishConfigured() && !publishResult && (
                <div className="cms-worldwide-feedback warning animate-fade-in" style={{ marginTop: '0.75rem' }}>
                  <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Master Organization Key Not Configured:</strong>
                    <div style={{ marginTop: '0.25rem', fontSize: '0.78rem', color: '#CBD5E1', lineHeight: '1.4' }}>
                      To enable 1-click publishing for all employees without asking anyone for passwords or keys, an Administrator must configure the Master Key once in the <strong>Global Live Sync</strong> settings.
                    </div>
                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      {onOpenGlobalSync && (
                        <button
                          type="button"
                          className="cms-token-help-link"
                          onClick={() => {
                            onClose();
                            onOpenGlobalSync();
                          }}
                        >
                          Open Global Live Sync Tab →
                        </button>
                      )}
                      <button
                        type="button"
                        className="cms-token-help-link"
                        style={{ color: '#FDBA74' }}
                        onClick={() => setShowAdminDrawer(!showAdminDrawer)}
                      >
                        {showAdminDrawer ? 'Hide Admin Setup' : '⚙️ Admin: Setup Key Here'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Master Key Drawer (Only visible when explicitly opened by Admin) */}
              {showAdminDrawer && !publishResult && (
                <div className="cms-quick-token-drawer animate-fade-in" style={{ marginTop: '0.75rem' }}>
                  <label>
                    <Key size={14} className="text-amber" />
                    <span>Admin Master GitHub PAT (Configured once for the entire organization):</span>
                  </label>
                  <div className="cms-quick-token-row">
                    <input
                      type="password"
                      className="cms-input small"
                      placeholder="Paste GitHub Classic Token (ghp_...)"
                      value={adminTokenInput}
                      onChange={e => {
                        setAdminTokenInput(e.target.value);
                        setTokenTestFeedback(null);
                      }}
                    />
                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                      disabled={isTestingToken || !adminTokenInput.trim()}
                      onClick={handleTestToken}
                    >
                      {isTestingToken ? <Loader2 size={13} className="animate-spin" /> : '🔍 Test'}
                    </button>
                    <button
                      type="button"
                      className="btn-primary"
                      style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                      disabled={isPublishing || !adminTokenInput.trim()}
                      onClick={() => handlePublishWorldwide(adminTokenInput.trim())}
                    >
                      Save & Publish
                    </button>
                  </div>

                  {/* Token Diagnostic Feedback */}
                  {tokenTestFeedback && (
                    <div
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.4rem 0.65rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        lineHeight: '1.4',
                        background: tokenTestFeedback.valid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        border: `1px solid ${tokenTestFeedback.valid ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                        color: tokenTestFeedback.valid ? '#6EE7B7' : '#FCA5A5',
                        whiteSpace: 'pre-line'
                      }}
                    >
                      {tokenTestFeedback.valid ? `✅ ${tokenTestFeedback.message}` : `❌ ${tokenTestFeedback.error}`}
                    </div>
                  )}

                  <div className="cms-token-help-text" style={{ marginTop: '0.4rem' }}>
                    <span>Must be a <strong>Classic Token</strong> with <strong>[x] repo</strong> scope checked to prevent "Bad credentials".</span>
                  </div>
                </div>
              )}

              {/* Subtle Admin Setup toggle when token is already active */}
              {isPublishConfigured() && !showAdminDrawer && !publishResult && (
                <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="cms-token-toggle-btn"
                    onClick={() => setShowAdminDrawer(true)}
                    title="Change or update the Organization Master Key"
                  >
                    <Key size={11} />
                    <span>Admin: Update Master Token</span>
                    <ChevronDown size={11} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="cms-confirm-actions">
          {isWarning ? (
            <>
              <button
                type="button"
                className="cms-btn-discard"
                onClick={onDiscardAndExit}
              >
                <Trash2 size={15} /> Discard & Exit
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={onKeepEditing}
              >
                <Edit3 size={15} /> Keep Editing
              </button>
              {onSaveAndExit && (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={onSaveAndExit}
                >
                  <Save size={15} /> Save & Exit
                </button>
              )}
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn-secondary"
                onClick={onKeepEditing || onClose}
              >
                <Edit3 size={15} /> Continue Editing
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={onBackToList}
              >
                <ArrowLeft size={15} /> Back to List
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
