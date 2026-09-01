import React, { useRef, useCallback, useEffect, useState } from 'react';
import {
  Bold, Italic, Underline, Heading1, Heading2, Heading3, Heading4,
  List, ListOrdered, Quote, Link2, ImageIcon, AlignLeft, AlignCenter,
  AlignRight, Undo2, Redo2, Code, Minus, Type, Palette, Strikethrough,
  Table, Video, FileText, Upload
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════
// COMFORT JOURNEY — WYSIWYG RICH-TEXT EDITOR
// Professional contenteditable editor with full formatting toolbar.
// Outputs clean HTML. Used by Blog Editor & Tour Package descriptions.
// ═══════════════════════════════════════════════════════════════════

const HEADING_OPTIONS = [
  { label: 'Paragraph', tag: 'P' },
  { label: 'Heading 1', tag: 'H1' },
  { label: 'Heading 2', tag: 'H2' },
  { label: 'Heading 3', tag: 'H3' },
  { label: 'Heading 4', tag: 'H4' },
];

const FONT_SIZES = ['12', '14', '16', '18', '20', '24', '28', '32'];

const TEXT_COLORS = [
  '#FFFFFF', '#F9FBE7', '#FF892F', '#6FE6FC', '#10B981',
  '#EF4444', '#F59E0B', '#8B5CF6', '#EC4899', '#94A3B8',
  '#CBD5E1', '#1E293B'
];

export default function RichTextEditor({
  initialContent = '',
  onChange,
  placeholder = 'Start writing your content...',
  minHeight = 300,
  maxHeight = 600,
  readOnly = false
}) {
  const editorRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState('0 min');
  const [showHeadingMenu, setShowHeadingMenu] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [activeFormats, setActiveFormats] = useState({});
  const savedSelectionRef = useRef(null);

  // Initialize content
  useEffect(() => {
    if (editorRef.current && initialContent && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = initialContent;
      updateStats();
    }
  }, [initialContent]);

  // Update word count and reading time
  const updateStats = useCallback(() => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText || '';
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    setWordCount(words);
    setReadingTime(`${Math.max(1, Math.ceil(words / 200))} min read`);
  }, []);

  // Detect active formatting at cursor position
  const detectActiveFormats = useCallback(() => {
    const formats = {};
    try {
      formats.bold = document.queryCommandState('bold');
      formats.italic = document.queryCommandState('italic');
      formats.underline = document.queryCommandState('underline');
      formats.strikethrough = document.queryCommandState('strikeThrough');
      formats.orderedList = document.queryCommandState('insertOrderedList');
      formats.unorderedList = document.queryCommandState('insertUnorderedList');

      const block = document.queryCommandValue('formatBlock');
      formats.blockType = block ? block.toUpperCase() : 'P';

      const align = document.queryCommandValue('justifyLeft') ? 'left'
        : document.queryCommandValue('justifyCenter') ? 'center'
        : document.queryCommandValue('justifyRight') ? 'right' : 'left';
      formats.align = align;
    } catch {}
    setActiveFormats(formats);
  }, []);

  // Execute formatting command
  const exec = useCallback((command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    handleContentChange();
    detectActiveFormats();
  }, []);

  // Handle content changes
  const handleContentChange = useCallback(() => {
    updateStats();
    if (onChange && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange, updateStats]);

  // Save current selection (for modals)
  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelectionRef.current = sel.getRangeAt(0).cloneRange();
      return sel.toString();
    }
    return '';
  }, []);

  // Restore saved selection
  const restoreSelection = useCallback(() => {
    if (savedSelectionRef.current) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedSelectionRef.current);
    }
  }, []);

  // Format as heading
  const formatHeading = useCallback((tag) => {
    exec('formatBlock', tag);
    setShowHeadingMenu(false);
  }, [exec]);

  // Insert link
  const handleInsertLink = useCallback(() => {
    restoreSelection();
    if (linkUrl) {
      const url = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
      const sel = window.getSelection();
      if (sel && sel.toString().length > 0) {
        exec('createLink', url);
      } else if (linkText) {
        document.execCommand('insertHTML', false, `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`);
        handleContentChange();
      }
    }
    setShowLinkModal(false);
    setLinkUrl('');
    setLinkText('');
  }, [linkUrl, linkText, exec, restoreSelection, handleContentChange]);

  // Insert image
  const handleInsertImage = useCallback(() => {
    restoreSelection();
    if (imageUrl) {
      const html = `<figure style="margin:1rem 0;text-align:center;"><img src="${imageUrl}" alt="${imageAlt || 'Image'}" style="max-width:100%;border-radius:8px;" />${imageAlt ? `<figcaption style="font-size:0.8rem;color:#94A3B8;margin-top:0.4rem;">${imageAlt}</figcaption>` : ''}</figure>`;
      document.execCommand('insertHTML', false, html);
      handleContentChange();
    }
    setShowImageModal(false);
    setImageUrl('');
    setImageAlt('');
  }, [imageUrl, imageAlt, restoreSelection, handleContentChange]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b': e.preventDefault(); exec('bold'); break;
        case 'i': e.preventDefault(); exec('italic'); break;
        case 'u': e.preventDefault(); exec('underline'); break;
        case 'k':
          e.preventDefault();
          const selectedText = saveSelection();
          setLinkText(selectedText);
          setShowLinkModal(true);
          break;
        case 'z':
          if (e.shiftKey) { e.preventDefault(); exec('redo'); }
          else { e.preventDefault(); exec('undo'); }
          break;
      }
    }
  }, [exec, saveSelection]);

  // Handle paste - strip formatting for clean HTML
  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const html = e.clipboardData.getData('text/html');
    const text = e.clipboardData.getData('text/plain');
    // Prefer HTML paste but sanitize it
    if (html) {
      const cleaned = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/class="[^"]*"/gi, '')
        .replace(/style="[^"]*"/gi, '')
        .replace(/id="[^"]*"/gi, '');
      document.execCommand('insertHTML', false, cleaned);
    } else {
      document.execCommand('insertText', false, text);
    }
    handleContentChange();
  }, [handleContentChange]);

  // Insert horizontal rule
  const insertHR = useCallback(() => {
    exec('insertHTML', '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.15);margin:1.5rem 0;" />');
  }, [exec]);

  // Insert blockquote
  const toggleBlockquote = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const parentBlock = sel.anchorNode?.parentElement?.closest('blockquote');
      if (parentBlock) {
        // Remove blockquote
        exec('formatBlock', 'P');
      } else {
        exec('formatBlock', 'BLOCKQUOTE');
      }
    }
  }, [exec]);

  // Insert table
  const insertTable = useCallback(() => {
    const html = `<table style="width:100%;border-collapse:collapse;margin:1rem 0;">
      <thead><tr>
        <th style="border:1px solid rgba(255,255,255,0.2);padding:0.5rem;text-align:left;background:rgba(255,255,255,0.05);">Header 1</th>
        <th style="border:1px solid rgba(255,255,255,0.2);padding:0.5rem;text-align:left;background:rgba(255,255,255,0.05);">Header 2</th>
        <th style="border:1px solid rgba(255,255,255,0.2);padding:0.5rem;text-align:left;background:rgba(255,255,255,0.05);">Header 3</th>
      </tr></thead>
      <tbody><tr>
        <td style="border:1px solid rgba(255,255,255,0.15);padding:0.5rem;">Cell 1</td>
        <td style="border:1px solid rgba(255,255,255,0.15);padding:0.5rem;">Cell 2</td>
        <td style="border:1px solid rgba(255,255,255,0.15);padding:0.5rem;">Cell 3</td>
      </tr><tr>
        <td style="border:1px solid rgba(255,255,255,0.15);padding:0.5rem;">Cell 4</td>
        <td style="border:1px solid rgba(255,255,255,0.15);padding:0.5rem;">Cell 5</td>
        <td style="border:1px solid rgba(255,255,255,0.15);padding:0.5rem;">Cell 6</td>
      </tr></tbody>
    </table><p><br/></p>`;
    exec('insertHTML', html);
  }, [exec]);

  // ToolbarButton helper
  const ToolBtn = ({ icon: Icon, label, active, onClick, small }) => (
    <button
      type="button"
      className={`rte-tool-btn ${active ? 'active' : ''} ${small ? 'small' : ''}`}
      onClick={onClick}
      title={label}
      onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
    >
      {typeof Icon === 'string' ? <span>{Icon}</span> : <Icon size={small ? 13 : 15} />}
    </button>
  );

  // Separator
  const Sep = () => <div className="rte-separator" />;

  return (
    <div className="rte-container">
      {/* ═══ Toolbar ═══ */}
      <div className="rte-toolbar">
        {/* Undo / Redo */}
        <ToolBtn icon={Undo2} label="Undo (Ctrl+Z)" onClick={() => exec('undo')} />
        <ToolBtn icon={Redo2} label="Redo (Ctrl+Shift+Z)" onClick={() => exec('redo')} />
        <Sep />

        {/* Block Type Dropdown */}
        <div className="rte-dropdown-wrapper">
          <button
            type="button"
            className="rte-dropdown-btn"
            onClick={() => { setShowHeadingMenu(!showHeadingMenu); setShowColorPicker(false); }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <Type size={14} />
            <span>{HEADING_OPTIONS.find(h => h.tag === (activeFormats.blockType || 'P'))?.label || 'Paragraph'}</span>
          </button>
          {showHeadingMenu && (
            <div className="rte-dropdown-menu">
              {HEADING_OPTIONS.map(h => (
                <button
                  key={h.tag}
                  type="button"
                  className={`rte-dropdown-item ${activeFormats.blockType === h.tag ? 'active' : ''}`}
                  onClick={() => formatHeading(h.tag)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <span style={{ fontSize: h.tag === 'H1' ? '1.3rem' : h.tag === 'H2' ? '1.15rem' : h.tag === 'H3' ? '1rem' : h.tag === 'H4' ? '0.9rem' : '0.85rem', fontWeight: h.tag !== 'P' ? 700 : 400 }}>
                    {h.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        <Sep />

        {/* Inline Formatting */}
        <ToolBtn icon={Bold} label="Bold (Ctrl+B)" active={activeFormats.bold} onClick={() => exec('bold')} />
        <ToolBtn icon={Italic} label="Italic (Ctrl+I)" active={activeFormats.italic} onClick={() => exec('italic')} />
        <ToolBtn icon={Underline} label="Underline (Ctrl+U)" active={activeFormats.underline} onClick={() => exec('underline')} />
        <ToolBtn icon={Strikethrough} label="Strikethrough" active={activeFormats.strikethrough} onClick={() => exec('strikeThrough')} />
        <Sep />

        {/* Text Color */}
        <div className="rte-dropdown-wrapper">
          <button
            type="button"
            className="rte-tool-btn"
            onClick={() => { setShowColorPicker(!showColorPicker); setShowHeadingMenu(false); }}
            onMouseDown={(e) => e.preventDefault()}
            title="Text Color"
          >
            <Palette size={15} />
          </button>
          {showColorPicker && (
            <div className="rte-color-grid">
              {TEXT_COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  className="rte-color-swatch"
                  style={{ background: color }}
                  onClick={() => { exec('foreColor', color); setShowColorPicker(false); }}
                  onMouseDown={(e) => e.preventDefault()}
                  title={color}
                />
              ))}
            </div>
          )}
        </div>
        <Sep />

        {/* Lists */}
        <ToolBtn icon={List} label="Bullet List" active={activeFormats.unorderedList} onClick={() => exec('insertUnorderedList')} />
        <ToolBtn icon={ListOrdered} label="Numbered List" active={activeFormats.orderedList} onClick={() => exec('insertOrderedList')} />
        <ToolBtn icon={Quote} label="Blockquote" onClick={toggleBlockquote} />
        <Sep />

        {/* Alignment */}
        <ToolBtn icon={AlignLeft} label="Align Left" onClick={() => exec('justifyLeft')} small />
        <ToolBtn icon={AlignCenter} label="Align Center" onClick={() => exec('justifyCenter')} small />
        <ToolBtn icon={AlignRight} label="Align Right" onClick={() => exec('justifyRight')} small />
        <Sep />

        {/* Insert */}
        <ToolBtn icon={Link2} label="Insert Link (Ctrl+K)" onClick={() => {
          const selectedText = saveSelection();
          setLinkText(selectedText);
          setShowLinkModal(true);
        }} />
        <ToolBtn icon={ImageIcon} label="Insert Image" onClick={() => {
          saveSelection();
          setShowImageModal(true);
        }} />
        <ToolBtn icon={Minus} label="Horizontal Rule" onClick={insertHR} />
        <ToolBtn icon={Table} label="Insert Table" onClick={insertTable} />
        <ToolBtn icon={Code} label="Code Block" onClick={() => exec('formatBlock', 'PRE')} />

        {/* Stats */}
        <div className="rte-stats">
          <span>{wordCount} words</span>
          <span>·</span>
          <span>{readingTime}</span>
        </div>
      </div>

      {/* ═══ Editor Area ═══ */}
      <div
        ref={editorRef}
        className="rte-editor-area"
        contentEditable={!readOnly}
        suppressContentEditableWarning
        onInput={handleContentChange}
        onKeyDown={handleKeyDown}
        onKeyUp={detectActiveFormats}
        onMouseUp={detectActiveFormats}
        onPaste={handlePaste}
        onClick={() => { setShowHeadingMenu(false); setShowColorPicker(false); }}
        data-placeholder={placeholder}
        style={{ minHeight: `${minHeight}px`, maxHeight: `${maxHeight}px` }}
      />

      {/* ═══ Link Modal ═══ */}
      {showLinkModal && (
        <div className="rte-modal-overlay" onClick={() => setShowLinkModal(false)}>
          <div className="rte-modal-card" onClick={e => e.stopPropagation()}>
            <h4>🔗 Insert Link</h4>
            <div className="rte-modal-field">
              <label>URL</label>
              <input
                type="url"
                placeholder="https://www.example.com"
                value={linkUrl}
                onChange={e => setLinkUrl(e.target.value)}
                autoFocus
                onKeyDown={e => { if (e.key === 'Enter') handleInsertLink(); }}
              />
            </div>
            {!linkText && (
              <div className="rte-modal-field">
                <label>Display Text</label>
                <input
                  type="text"
                  placeholder="Click here"
                  value={linkText}
                  onChange={e => setLinkText(e.target.value)}
                />
              </div>
            )}
            <div className="rte-modal-actions">
              <button type="button" className="rte-btn-cancel" onClick={() => setShowLinkModal(false)}>Cancel</button>
              <button type="button" className="rte-btn-confirm" onClick={handleInsertLink}>Insert Link</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Image Modal ═══ */}
      {showImageModal && (
        <div className="rte-modal-overlay" onClick={() => setShowImageModal(false)}>
          <div className="rte-modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <h4>🖼️ Insert Image</h4>
            <div className="image-upload-header" style={{ marginBottom: '0.75rem' }}>
              <div className="upload-mode-toggle">
                <button
                  type="button"
                  className={`mode-btn ${!imageUrl.startsWith('http') ? 'active' : ''}`}
                  onClick={() => {}}
                >
                  <Upload size={12} />
                  <span>Upload / Drag File</span>
                </button>
                <button
                  type="button"
                  className={`mode-btn ${imageUrl.startsWith('http') ? 'active' : ''}`}
                  onClick={() => {}}
                >
                  <Link2 size={12} />
                  <span>Image URL</span>
                </button>
              </div>
            </div>

            <div
              className="image-dropzone"
              style={{ marginBottom: '0.75rem', padding: '1rem', textAlign: 'center', cursor: 'pointer' }}
              onClick={() => document.getElementById('rte-file-upload-input')?.click()}
            >
              <input
                id="rte-file-upload-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      setImageUrl(ev.target.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {imageUrl ? (
                <div style={{ position: 'relative' }}>
                  <img src={imageUrl} alt={imageAlt || 'Preview'} style={{ maxHeight: '180px', maxWidth: '100%', borderRadius: '6px' }} />
                  <p style={{ fontSize: '0.75rem', color: '#10B981', margin: '0.4rem 0 0 0', fontWeight: 700 }}>✓ Image Selected</p>
                </div>
              ) : (
                <div>
                  <Upload size={24} className="text-amber" style={{ margin: '0 auto 0.4rem auto', display: 'block' }} />
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#E2E8F0', fontWeight: 600 }}>Click to choose image or drag & drop</p>
                  <span style={{ fontSize: '0.72rem', color: '#64748B' }}>PNG, JPG, WebP, SVG</span>
                </div>
              )}
            </div>

            <div className="rte-modal-field">
              <label>Or Paste Image URL</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl.startsWith('data:') ? '' : imageUrl}
                onChange={e => setImageUrl(e.target.value)}
              />
            </div>

            <div className="rte-modal-field">
              <label>Alt Text (for SEO & Accessibility)</label>
              <input
                type="text"
                placeholder="Describe image for search engines"
                value={imageAlt}
                onChange={e => setImageAlt(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleInsertImage(); }}
              />
            </div>

            <div className="rte-modal-actions">
              <button type="button" className="rte-btn-cancel" onClick={() => setShowImageModal(false)}>Cancel</button>
              <button type="button" className="rte-btn-confirm" onClick={handleInsertImage} disabled={!imageUrl}>Insert Image</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══ Get HTML content from editor ref externally ═══
export function getEditorHTML(editorContainerRef) {
  const editor = editorContainerRef?.querySelector?.('.rte-editor-area');
  return editor?.innerHTML || '';
}
