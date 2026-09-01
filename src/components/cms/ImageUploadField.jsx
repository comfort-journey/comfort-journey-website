import React, { useState, useRef } from 'react';
import { Upload, Link2, X, Image as ImageIcon, Check, RefreshCw, FolderOpen } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════
// COMFORT JOURNEY — REUSABLE IMAGE UPLOAD & URL COMPONENT
// 1. Instant File Explorer Trigger on "Upload / Replace Image"
// 2. Clear Visual Controls for Existing & New Images
// 3. Dual Mode: Device File Upload (Base64) & External Image URL
// ═══════════════════════════════════════════════════════════════════

export default function ImageUploadField({
  value = '',
  onChange,
  label = 'Image',
  placeholder = 'https://images.unsplash.com/...',
  altText = '',
  onAltTextChange = null,
  showAltField = false,
  compact = false
}) {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const fileInputRef = useRef(null);

  // Convert uploaded file to base64 Data URL
  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP, SVG, etc.)');
      return;
    }
    // Limit to 8MB
    if (file.size > 8 * 1024 * 1024) {
      alert('Image size exceeds 8MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setPreviewError(false);
      setShowUrlInput(false);
      onChange?.(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleClear = () => {
    onChange?.('');
    setPreviewError(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFilePicker = (e) => {
    e?.stopPropagation?.();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`image-upload-wrapper ${compact ? 'compact' : ''}`}>
      {/* Hidden File Input for Native File Explorer */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif, image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0]);
        }}
      />

      <div className="image-upload-header">
        <label className="upload-main-label">
          <ImageIcon size={14} className="text-amber" />
          <span>{label}</span>
        </label>
        <div className="upload-actions-top">
          <button
            type="button"
            className="action-btn-top primary"
            onClick={triggerFilePicker}
            title="Open file explorer to choose photo"
          >
            <FolderOpen size={13} />
            <span>{value ? 'Replace from Device' : 'Upload from Device'}</span>
          </button>
          <button
            type="button"
            className={`action-btn-top ${showUrlInput ? 'active' : ''}`}
            onClick={() => setShowUrlInput(!showUrlInput)}
            title="Toggle paste URL field"
          >
            <Link2 size={13} />
            <span>{showUrlInput ? 'Hide URL' : 'Paste URL'}</span>
          </button>
        </div>
      </div>

      {/* URL Input Bar (collapsible or toggled) */}
      {showUrlInput && (
        <div className="url-bar-container animate-fade-in">
          <div className="url-input-box">
            <input
              type="text"
              className="cms-input url-input"
              value={value.startsWith('data:') ? '' : value}
              onChange={(e) => {
                setPreviewError(false);
                onChange?.(e.target.value);
              }}
              placeholder={placeholder}
              autoFocus
            />
            {value && (
              <button
                type="button"
                className="btn-clear-url"
                onClick={handleClear}
                title="Clear image"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Preview & Dropzone */}
      {value && !previewError ? (
        <div className="uploaded-preview-container">
          <img
            src={value}
            alt={altText || 'Selected preview'}
            className="uploaded-img-preview"
            onError={() => setPreviewError(true)}
          />
          <div className="uploaded-overlay-bar">
            <div className="preview-status-pill">
              <Check size={12} className="text-emerald" />
              <span>{value.startsWith('data:') ? 'Uploaded File' : 'Linked URL'}</span>
            </div>
            <div className="preview-btn-group">
              <button
                type="button"
                className="btn-overlay-action replace"
                onClick={triggerFilePicker}
                title="Choose another photo from device"
              >
                <Upload size={13} />
                <span>Replace Photo</span>
              </button>
              <button
                type="button"
                className="btn-overlay-action remove"
                onClick={handleClear}
                title="Remove image"
              >
                <X size={13} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`image-dropzone ${dragOver ? 'drag-over' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={triggerFilePicker}
        >
          <div className="dropzone-empty-state">
            <div className="dropzone-icon-circle">
              <Upload size={22} className="text-amber" />
            </div>
            <p className="dropzone-primary-text">Click to choose photo from device or drag & drop</p>
            <span className="dropzone-sub-text">PNG, JPG, WebP, SVG up to 8MB</span>
          </div>
        </div>
      )}

      {showAltField && (
        <div className="alt-text-field-row" style={{ marginTop: '0.4rem' }}>
          <label className="alt-label">Alt Text (SEO & Accessibility)</label>
          <input
            type="text"
            className="cms-input small"
            value={altText}
            onChange={(e) => onAltTextChange?.(e.target.value)}
            placeholder="Describe image for search engines (e.g. Luxury houseboat in Kashmir Dal Lake)"
          />
        </div>
      )}

      <style>{`
        .image-upload-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 0.75rem;
        }

        .image-upload-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .upload-main-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #94A3B8;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .upload-actions-top {
          display: flex;
          gap: 0.35rem;
        }

        .action-btn-top {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.3rem 0.65rem;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.05);
          color: #CBD5E1;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
        }

        .action-btn-top:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
        }

        .action-btn-top.primary {
          background: rgba(255, 137, 47, 0.15);
          border-color: rgba(255, 137, 47, 0.35);
          color: #FF892F;
        }

        .action-btn-top.primary:hover {
          background: rgba(255, 137, 47, 0.25);
          color: #FFA559;
        }

        .action-btn-top.active {
          background: rgba(111, 230, 252, 0.15);
          border-color: rgba(111, 230, 252, 0.35);
          color: #6FE6FC;
        }

        .url-bar-container {
          margin-bottom: 0.25rem;
        }

        .url-input-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .url-input {
          padding-right: 2rem;
          font-size: 0.82rem;
        }

        .btn-clear-url {
          position: absolute;
          right: 0.5rem;
          background: none;
          border: none;
          color: #64748B;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0.25rem;
        }

        .btn-clear-url:hover {
          color: #EF4444;
        }

        .image-dropzone {
          border: 2px dashed rgba(255, 255, 255, 0.18);
          border-radius: 8px;
          background: rgba(0, 18, 51, 0.4);
          cursor: pointer;
          transition: all 0.2s;
          overflow: hidden;
        }

        .image-dropzone:hover, .image-dropzone.drag-over {
          border-color: #FF892F;
          background: rgba(255, 137, 47, 0.08);
        }

        .dropzone-empty-state {
          padding: 1.5rem 1rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .dropzone-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 137, 47, 0.12);
          border: 1px solid rgba(255, 137, 47, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }

        .dropzone-primary-text {
          font-size: 0.85rem;
          color: #E2E8F0;
          font-weight: 600;
          margin: 0 0 0.2rem 0;
        }

        .dropzone-sub-text {
          font-size: 0.72rem;
          color: #64748B;
        }

        .uploaded-preview-container {
          position: relative;
          max-height: 200px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .uploaded-img-preview {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .uploaded-overlay-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.92) 20%, rgba(0,0,0,0.4) 80%, transparent 100%);
          padding: 1rem 0.85rem 0.6rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .preview-status-pill {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: #CBD5E1;
          background: rgba(0, 0, 0, 0.5);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .preview-btn-group {
          display: flex;
          gap: 0.4rem;
        }

        .btn-overlay-action {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.3rem 0.65rem;
          border-radius: 5px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
          border: 1px solid transparent;
        }

        .btn-overlay-action.replace {
          background: rgba(255, 137, 47, 0.9);
          color: #FFFFFF;
          border-color: #FF892F;
        }

        .btn-overlay-action.replace:hover {
          background: #FF892F;
          box-shadow: 0 2px 8px rgba(255,107,0,0.4);
        }

        .btn-overlay-action.remove {
          background: rgba(239, 68, 68, 0.8);
          color: #FFFFFF;
          border-color: #EF4444;
        }

        .btn-overlay-action.remove:hover {
          background: #EF4444;
        }

        .alt-text-field-row {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .alt-label {
          font-size: 0.72rem;
          font-weight: 600;
          color: #64748B;
        }

        .compact .dropzone-empty-state {
          padding: 0.85rem;
        }
        .compact .dropzone-icon-circle {
          width: 32px;
          height: 32px;
          margin-bottom: 0.25rem;
        }
        .compact .uploaded-img-preview {
          height: 120px;
        }
      `}</style>
    </div>
  );
}
