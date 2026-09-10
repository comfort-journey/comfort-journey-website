import React from 'react';
import { CheckCircle2, Sparkles, AlertTriangle, ArrowLeft, Edit3, Eye, X, Save, Trash2 } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════
// COMFORT JOURNEY CMS — CONFIRMATION & FEEDBACK POP-UP MODAL
// Handles both:
// 1. Success confirmation on Save / Publish
// 2. Warning confirmation on Back / Close with unsaved changes
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
  onSaveAndExit
}) {
  if (!isOpen) return null;

  const isWarning = type === 'unsaved_warning';
  const isPublish = type === 'published';

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
                : subtitle || `"${title || 'Item'}" has been updated.`}
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

            <div className="cms-confirm-notice">
              {isPublish ? (
                <span>✨ This package/post is immediately live and visible to all visitors.</span>
              ) : (
                <span>🔒 Your updates are saved in local storage and will persist across sessions.</span>
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
