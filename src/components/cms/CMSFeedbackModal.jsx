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
  ChevronUp
} from 'lucide-react';
import { contentService, isLocalDev } from '../../services/contentService';

// ═══════════════════════════════════════════════════════════════════
// COMFORT JOURNEY CMS — CONFIRMATION & WORLDWIDE PUBLISH MODAL
// Handles:
// 1. Success confirmation on Save / Publish
// 2. Direct 1-Click Worldwide Publishing (GitHub Pages & Cloud CI/CD)
// 3. Warning confirmation on Back / Close with unsaved changes
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
  const [showTokenDrawer, setShowTokenDrawer] = useState(false);
  const [tokenInput, setTokenInput] = useState('');
  const [repoInput, setRepoInput] = useState('comfort-journey/comfort-journey-website');
  const [publishStatus, setPublishStatus] = useState({ isLocalDev: false, hasGithubToken: false });

  // Reset local state when modal opens
  useEffect(() => {
    if (isOpen) {
      const status = contentService.getPublishStatus();
      setPublishStatus(status);
      setTokenInput(contentService.getGithubToken() || '');
      setRepoInput(contentService.getGithubRepo() || 'comfort-journey/comfort-journey-website');
      setPublishResult(null);
      setPublishError(null);
      setShowTokenDrawer(false);
      setIsPublishing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isWarning = type === 'unsaved_warning';
  const isPublish = type === 'published';

  // 1-Click Worldwide Deploy Handler
  const handlePublishWorldwide = async (providedToken = null) => {
    const activeToken = providedToken || tokenInput.trim() || contentService.getGithubToken();

    // If on live website without token, open drawer first
    if (!isLocalDev() && !activeToken) {
      setShowTokenDrawer(true);
      return;
    }

    setIsPublishing(true);
    setPublishError(null);
    setPublishResult(null);

    try {
      if (activeToken) {
        contentService.setGithubToken(activeToken);
        if (repoInput.trim()) contentService.setGithubRepo(repoInput.trim());
      }

      const res = await contentService.publishWorldwide({
        token: activeToken,
        repo: repoInput.trim(),
        commitMessage: `Content Studio [${title || 'Item'}]: ${new Date().toLocaleString()}`
      });

      setPublishResult(res);
      setPublishStatus(contentService.getPublishStatus());
      setShowTokenDrawer(false);
    } catch (err) {
      console.error('[CMS Publish Worldwide Error]:', err);
      const msg = err.message || 'Publishing failed. Please check your GitHub token or network connection.';
      setPublishError(msg);
      if (msg.includes('NO_TOKEN') || msg.includes('401') || msg.includes('Bad credentials')) {
        setShowTokenDrawer(true);
      }
    } finally {
      setIsPublishing(false);
    }
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
                    <strong>Deployment Notice:</strong>
                    <div style={{ marginTop: '0.2rem', fontSize: '0.78rem' }}>{publishError}</div>
                  </div>
                </div>
              )}

              {/* Quick Inline Token Drawer (Expands if token is needed or user wants to update) */}
              {(!publishStatus.hasGithubToken || showTokenDrawer) && !publishResult && (
                <div className="cms-quick-token-drawer animate-fade-in">
                  <label>
                    <Key size={14} className="text-amber" />
                    <span>GitHub Personal Access Token (One-time setup for live site):</span>
                  </label>
                  <div className="cms-quick-token-row">
                    <input
                      type="password"
                      className="cms-input small"
                      placeholder="ghp_... or github_pat_..."
                      value={tokenInput}
                      onChange={e => setTokenInput(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn-primary"
                      style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                      disabled={isPublishing || !tokenInput.trim()}
                      onClick={() => handlePublishWorldwide(tokenInput.trim())}
                    >
                      Save & Publish
                    </button>
                  </div>
                  <div className="cms-token-help-text">
                    <span>Token is remembered in this browser.</span>
                    {onOpenGlobalSync && (
                      <button
                        type="button"
                        className="cms-token-help-link"
                        onClick={() => {
                          onClose();
                          onOpenGlobalSync();
                        }}
                      >
                        Open Full Global Sync Settings →
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Toggle token config button if token already exists */}
              {publishStatus.hasGithubToken && !showTokenDrawer && !publishResult && (
                <button
                  type="button"
                  className="cms-token-toggle-btn"
                  onClick={() => setShowTokenDrawer(true)}
                >
                  <Key size={12} />
                  <span>Update GitHub Token</span>
                  <ChevronDown size={12} />
                </button>
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
