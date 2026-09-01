import React, { useState, useCallback } from 'react';
import {
  LayoutDashboard, Search, Plus, Trash2, Eye, EyeOff, Edit3, Save,
  Download, RefreshCw, X, MapPin, Clock, Tag, ChevronDown, Check,
  ArrowLeft, ImageIcon, DollarSign, List, Calendar, Globe, Video,
  Copy, ExternalLink, Sparkles, Star, Users, Palette
} from 'lucide-react';
import ImageUploadField from './ImageUploadField';
import RichTextEditor from './RichTextEditor';
import SEOAssistant from './SEOAssistant';
import { TOURS_DATA } from '../../data/toursData';
import { slugify } from '../../services/directusClient';

// ═══════════════════════════════════════════════════════════════════
// COMFORT JOURNEY — TOUR PACKAGE MANAGER & STUDIO
// Full tour package listing + comprehensive editor with hero media,
// pricing dynamics, itinerary builder, gallery, and SEO.
// ═══════════════════════════════════════════════════════════════════

const EMPTY_TOUR = {
  id: '', name: '', slug: '', location: '', city: '', state: '', country: 'India', continent: 'Asia',
  duration: '3 Nights & 4 Days', price: 24999, originalPrice: 32999,
  category: 'National Tours', categories: ['National Tours'],
  image: '', heroVideo: '', heroTagline: '', heroOverlayColor: 'rgba(0,0,0,0.4)',
  tagline: '', description: '',
  inclusions: ['Hotel Accommodation', 'Daily Breakfast', 'Private AC Vehicle', 'Sightseeing & Transfers'],
  exclusions: ['Personal Expenses', 'Monument Entry Tickets', 'Anything not in Inclusions'],
  itinerary: [
    { day: 1, title: 'Day 1: Arrival & Welcome', desc: 'VIP greeting and transfer to hotel.', image: '', stayTier: '4-Star Stay', transport: 'Private AC Cab', meals: 'Dinner' }
  ],
  gallery: [],
  seasonalPricing: [],
  groupPricing: [],
  discountBadge: '',
  isVisible: true, status: 'published',
  seo: { metaTitle: '', metaDescription: '', focusKeyword: '' },
  allowIndexing: true, canonicalUrl: '', expertInsights: '', sourceVerification: '', searchIntent: 'transactional',
  rating: 4.95, reviews: 96, revisions: []
};

export default function TourPackageManager() {
  const [view, setView] = useState('list');
  const [toursList, setToursList] = useState(() => {
    try {
      const saved = localStorage.getItem('cj_custom_tours_dataset');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return TOURS_DATA;
  });
  const [editingTour, setEditingTour] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');
  const [newIncTag, setNewIncTag] = useState('');
  const [newExcTag, setNewExcTag] = useState('');
  const [editorTab, setEditorTab] = useState('details'); // details, itinerary, pricing, gallery, seo

  const showToast = (msg) => { setToastMessage(msg); setTimeout(() => setToastMessage(''), 3500); };

  const persistTours = useCallback((updated) => {
    setToursList(updated);
    try { localStorage.setItem('cj_custom_tours_dataset', JSON.stringify(updated)); } catch {}
    TOURS_DATA.length = 0;
    TOURS_DATA.push(...updated);
  }, []);

  // ─── CRUD ───
  const handleSave = useCallback(() => {
    if (!editingTour?.name) { alert('Package title is required.'); return; }
    if (!editingTour.slug) editingTour.slug = slugify(editingTour.name);

    const rev = { timestamp: new Date().toISOString(), name: editingTour.name, price: editingTour.price };
    editingTour.revisions = [...(editingTour.revisions || []).slice(-10), rev];

    const idx = toursList.findIndex(t => t.id === editingTour.id);
    const updated = idx >= 0
      ? toursList.map(t => t.id === editingTour.id ? editingTour : t)
      : [editingTour, ...toursList];
    persistTours(updated);
    showToast(`✅ Package "${editingTour.name}" saved!`);
  }, [editingTour, toursList, persistTours]);

  const handlePublish = useCallback(() => {
    if (!editingTour) return;
    setEditingTour(prev => ({ ...prev, status: 'published', isVisible: true }));
    setTimeout(() => handleSave(), 0);
    showToast(`🚀 Package "${editingTour.name}" published live!`);
  }, [editingTour, handleSave]);

  const handleToggleVisibility = (tourId) => {
    const updated = toursList.map(t => {
      if (t.id === tourId) {
        const next = t.isVisible === false;
        return { ...t, isVisible: next, status: next ? 'published' : 'hidden' };
      }
      return t;
    });
    persistTours(updated);
    showToast('Visibility updated.');
  };

  const handleDelete = (tourId, name) => {
    if (window.confirm(`Delete "${name}"? Cannot be undone.`)) {
      persistTours(toursList.filter(t => t.id !== tourId));
      showToast(`🗑️ "${name}" deleted.`);
    }
  };

  const handleDuplicate = (tour) => {
    const dup = { ...JSON.parse(JSON.stringify(tour)), id: `tour-custom-${Date.now()}`, name: `${tour.name} (Copy)`, slug: `${tour.slug}-copy`, status: 'draft', isVisible: false };
    persistTours([dup, ...toursList]);
    showToast(`📋 Duplicated as draft.`);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(toursList, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'comfort_journey_tours.json';
    a.click();
  };

  const openEditor = (tour, adding = false) => {
    setEditingTour(JSON.parse(JSON.stringify(tour)));
    setIsAddingNew(adding);
    setEditorTab('details');
    setView('editor');
  };

  const openNewTour = () => {
    openEditor({ ...EMPTY_TOUR, id: `tour-custom-${Date.now()}` }, true);
  };

  // Filter tours
  const filteredTours = toursList.filter(tour => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!tour.name?.toLowerCase().includes(q) && !tour.location?.toLowerCase().includes(q) && !tour.city?.toLowerCase().includes(q)) return false;
    }
    if (categoryFilter === 'National') return tour.category === 'National Tours' || tour.country === 'India';
    if (categoryFilter === 'International') return tour.category === 'International Tours' || (tour.country && tour.country !== 'India');
    if (categoryFilter === 'Hidden') return tour.isVisible === false;
    return true;
  });

  // ═══════════════════════════════════════════════════════════════
  // EDITOR VIEW
  // ═══════════════════════════════════════════════════════════════
  if (view === 'editor' && editingTour) {
    const editorTabs = [
      { id: 'details', label: 'Details & Hero', icon: Edit3 },
      { id: 'itinerary', label: `Itinerary (${editingTour.itinerary?.length || 0})`, icon: Calendar },
      { id: 'pricing', label: 'Pricing & Tiers', icon: DollarSign },
      { id: 'inclusions', label: 'Inclusions', icon: List },
      { id: 'gallery', label: `Gallery (${editingTour.gallery?.length || 0})`, icon: ImageIcon },
      { id: 'seo', label: 'SEO & Meta', icon: Search },
    ];

    return (
      <div className="tour-editor-view">
        {/* Header */}
        <div className="tour-editor-header-bar">
          <button type="button" className="btn-back" onClick={() => { handleSave(); setView('list'); }}>
            <ArrowLeft size={16} /> Back
          </button>
          <h3 className="editor-tour-title">{isAddingNew ? '➕ New Tour Package' : `✏️ ${editingTour.name || 'Untitled'}`}</h3>
          <div className="editor-header-actions">
            <span className={`status-pill-inline ${editingTour.status || 'draft'}`}>
              {editingTour.status === 'published' ? '● Live' : '○ Draft'}
            </span>
            <button type="button" className="btn-secondary" onClick={handleSave}><Save size={14} /> Save</button>
            <button type="button" className="btn-primary" onClick={handlePublish}><Sparkles size={14} /> Publish</button>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="tour-editor-subtabs">
          {editorTabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`tour-subtab-btn ${editorTab === tab.id ? 'active' : ''}`}
              onClick={() => setEditorTab(tab.id)}
            >
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>

        <div className="tour-editor-body">
          {/* ── Details & Hero Tab ── */}
          {editorTab === 'details' && (
            <div className="editor-section">
              <div className="form-grid-2">
                <div className="field-group">
                  <label>Package Title *</label>
                  <input type="text" className="cms-input" value={editingTour.name || ''} onChange={e => setEditingTour({ ...editingTour, name: e.target.value, slug: editingTour._slugManual ? editingTour.slug : slugify(e.target.value) })} placeholder="e.g. Kashmir Valley Paradise" required />
                </div>
                <div className="field-group">
                  <label>Category</label>
                  <select className="cms-select" value={editingTour.category || 'National Tours'} onChange={e => setEditingTour({ ...editingTour, category: e.target.value })}>
                    <option value="National Tours">National Tours (India)</option>
                    <option value="International Tours">International Tours</option>
                  </select>
                </div>
              </div>
              <div className="form-grid-4">
                <div className="field-group">
                  <label>Location / City</label>
                  <input type="text" className="cms-input" value={editingTour.location || ''} onChange={e => setEditingTour({ ...editingTour, location: e.target.value, city: e.target.value })} placeholder="Manali, Himachal" />
                </div>
                <div className="field-group">
                  <label>State</label>
                  <input type="text" className="cms-input" value={editingTour.state || ''} onChange={e => setEditingTour({ ...editingTour, state: e.target.value })} placeholder="Himachal Pradesh" />
                </div>
                <div className="field-group">
                  <label>Country</label>
                  <input type="text" className="cms-input" value={editingTour.country || 'India'} onChange={e => setEditingTour({ ...editingTour, country: e.target.value })} />
                </div>
                <div className="field-group">
                  <label>Duration</label>
                  <input type="text" className="cms-input" value={editingTour.duration || ''} onChange={e => setEditingTour({ ...editingTour, duration: e.target.value })} placeholder="4 Nights & 5 Days" />
                </div>
              </div>

              {/* Hero Section */}
              <div className="editor-sub-heading"><ImageIcon size={16} /> Cinematic Hero Media & Overlay</div>
              <ImageUploadField
                label="Hero Cover Image (High Resolution)"
                value={editingTour.image || ''}
                onChange={val => setEditingTour({ ...editingTour, image: val })}
                placeholder="Paste hero image URL or upload from device..."
              />
              <div className="form-grid-3">
                <div className="field-group">
                  <label>Hero Video URL (optional)</label>
                  <input type="text" className="cms-input" value={editingTour.heroVideo || ''} onChange={e => setEditingTour({ ...editingTour, heroVideo: e.target.value })} placeholder="https://youtube.com/..." />
                </div>
                <div className="field-group">
                  <label>Hero Tagline Overlay</label>
                  <input type="text" className="cms-input" value={editingTour.heroTagline || editingTour.tagline || ''} onChange={e => setEditingTour({ ...editingTour, heroTagline: e.target.value, tagline: e.target.value })} placeholder="Experience the beauty of..." />
                </div>
                <div className="field-group">
                  <label>Overlay Color</label>
                  <input type="text" className="cms-input" value={editingTour.heroOverlayColor || 'rgba(0,0,0,0.4)'} onChange={e => setEditingTour({ ...editingTour, heroOverlayColor: e.target.value })} />
                </div>
              </div>
              {editingTour.image && (
                <div className="hero-preview-box" style={{ marginTop: '0.5rem' }}>
                  <img src={editingTour.image} alt="Hero preview" />
                  <div className="hero-overlay-text" style={{ background: editingTour.heroOverlayColor || 'rgba(0,0,0,0.4)' }}>
                    <span>{editingTour.heroTagline || editingTour.tagline || editingTour.name}</span>
                  </div>
                </div>
              )}

              {/* Rich Description */}
              <div className="editor-sub-heading"><Edit3 size={16} /> Package Description</div>
              <RichTextEditor
                initialContent={editingTour.description || ''}
                onChange={html => setEditingTour(prev => ({ ...prev, description: html }))}
                placeholder="Write a compelling description of this tour package..."
                minHeight={200}
                maxHeight={400}
              />
            </div>
          )}

          {/* ── Itinerary Tab ── */}
          {editorTab === 'itinerary' && (
            <div className="editor-section">
              <div className="itin-header-row">
                <h4>📅 Day-by-Day Itinerary ({editingTour.itinerary?.length || 0} Days)</h4>
                <button type="button" className="add-day-btn" onClick={() => {
                  const nextDay = (editingTour.itinerary?.length || 0) + 1;
                  setEditingTour({
                    ...editingTour,
                    itinerary: [...(editingTour.itinerary || []), {
                      day: nextDay, title: `Day ${nextDay}: Sightseeing & Excursions`,
                      desc: 'Guided tour with personal chauffeur.', image: '',
                      stayTier: '4-Star Stay', transport: 'Private AC Cab', meals: 'Breakfast & Dinner'
                    }]
                  });
                }}><Plus size={14} /> Add Day</button>
              </div>

              <div className="itin-days-list">
                {editingTour.itinerary?.map((day, idx) => (
                  <div key={idx} className="itin-day-card">
                    <div className="day-card-header">
                      <span className="day-badge">Day {day.day || idx + 1}</span>
                      <input type="text" className="cms-input day-title" value={day.title || ''} onChange={e => {
                        const upd = [...editingTour.itinerary]; upd[idx].title = e.target.value;
                        setEditingTour({ ...editingTour, itinerary: upd });
                      }} placeholder="Day title" />
                      <button type="button" className="btn-del-day" onClick={() => {
                        const upd = editingTour.itinerary.filter((_, i) => i !== idx).map((d, i) => ({ ...d, day: i + 1 }));
                        setEditingTour({ ...editingTour, itinerary: upd });
                      }}><Trash2 size={14} /></button>
                    </div>
                    <textarea rows={2} className="cms-textarea small" value={day.desc || ''} onChange={e => {
                      const upd = [...editingTour.itinerary]; upd[idx].desc = e.target.value;
                      setEditingTour({ ...editingTour, itinerary: upd });
                    }} placeholder="Activities and schedule details..." />
                    <div className="day-meta-row">
                      <div className="day-meta-field">
                        <label>Stay</label>
                        <input type="text" className="cms-input small" value={day.stayTier || ''} onChange={e => {
                          const upd = [...editingTour.itinerary]; upd[idx].stayTier = e.target.value;
                          setEditingTour({ ...editingTour, itinerary: upd });
                        }} placeholder="4-Star Stay" />
                      </div>
                      <div className="day-meta-field">
                        <label>Transport</label>
                        <input type="text" className="cms-input small" value={day.transport || ''} onChange={e => {
                          const upd = [...editingTour.itinerary]; upd[idx].transport = e.target.value;
                          setEditingTour({ ...editingTour, itinerary: upd });
                        }} placeholder="Private AC Cab" />
                      </div>
                      <div className="day-meta-field">
                        <label>Meals</label>
                        <input type="text" className="cms-input small" value={day.meals || ''} onChange={e => {
                          const upd = [...editingTour.itinerary]; upd[idx].meals = e.target.value;
                          setEditingTour({ ...editingTour, itinerary: upd });
                        }} placeholder="Breakfast & Dinner" />
                      </div>
                      <div className="day-meta-field">
                        <label>Day Image URL</label>
                        <input type="text" className="cms-input small" value={day.image || ''} onChange={e => {
                          const upd = [...editingTour.itinerary]; upd[idx].image = e.target.value;
                          setEditingTour({ ...editingTour, itinerary: upd });
                        }} placeholder="https://..." />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Pricing Tab ── */}
          {editorTab === 'pricing' && (
            <div className="editor-section">
              <div className="editor-sub-heading"><DollarSign size={16} /> Price Dynamics</div>
              <div className="form-grid-3">
                <div className="field-group">
                  <label>Offer Price (₹ INR) *</label>
                  <input type="number" className="cms-input" value={editingTour.price || ''} onChange={e => setEditingTour({ ...editingTour, price: Number(e.target.value) })} required />
                </div>
                <div className="field-group">
                  <label>Original / Strike Price (₹)</label>
                  <input type="number" className="cms-input" value={editingTour.originalPrice || ''} onChange={e => setEditingTour({ ...editingTour, originalPrice: Number(e.target.value) })} />
                </div>
                <div className="field-group">
                  <label>Discount Badge</label>
                  <input type="text" className="cms-input" value={editingTour.discountBadge || ''} onChange={e => setEditingTour({ ...editingTour, discountBadge: e.target.value })} placeholder="20% OFF, Early Bird, etc." />
                </div>
              </div>

              {/* Seasonal Pricing */}
              <div className="editor-sub-heading"><Calendar size={14} /> Seasonal Pricing</div>
              <div className="seasonal-pricing-list">
                {(editingTour.seasonalPricing || []).map((sp, idx) => (
                  <div key={idx} className="seasonal-row">
                    <input type="text" className="cms-input small" value={sp.season} onChange={e => { const upd = [...editingTour.seasonalPricing]; upd[idx].season = e.target.value; setEditingTour({ ...editingTour, seasonalPricing: upd }); }} placeholder="Peak Season" />
                    <input type="number" className="cms-input small" value={sp.price} onChange={e => { const upd = [...editingTour.seasonalPricing]; upd[idx].price = Number(e.target.value); setEditingTour({ ...editingTour, seasonalPricing: upd }); }} placeholder="₹ Price" />
                    <input type="text" className="cms-input small" value={sp.months || ''} onChange={e => { const upd = [...editingTour.seasonalPricing]; upd[idx].months = e.target.value; setEditingTour({ ...editingTour, seasonalPricing: upd }); }} placeholder="Oct-Mar" />
                    <button type="button" className="btn-del-day" onClick={() => { const upd = editingTour.seasonalPricing.filter((_, i) => i !== idx); setEditingTour({ ...editingTour, seasonalPricing: upd }); }}><X size={14} /></button>
                  </div>
                ))}
                <button type="button" className="add-day-btn" onClick={() => setEditingTour({ ...editingTour, seasonalPricing: [...(editingTour.seasonalPricing || []), { season: '', price: 0, months: '' }] })}><Plus size={14} /> Add Season</button>
              </div>

              {/* Group Pricing */}
              <div className="editor-sub-heading"><Users size={14} /> Group Pricing Tiers</div>
              <div className="seasonal-pricing-list">
                {(editingTour.groupPricing || []).map((gp, idx) => (
                  <div key={idx} className="seasonal-row">
                    <input type="text" className="cms-input small" value={gp.label} onChange={e => { const upd = [...editingTour.groupPricing]; upd[idx].label = e.target.value; setEditingTour({ ...editingTour, groupPricing: upd }); }} placeholder="2 Pax" />
                    <input type="number" className="cms-input small" value={gp.pricePerPerson} onChange={e => { const upd = [...editingTour.groupPricing]; upd[idx].pricePerPerson = Number(e.target.value); setEditingTour({ ...editingTour, groupPricing: upd }); }} placeholder="₹ Per Person" />
                    <button type="button" className="btn-del-day" onClick={() => { const upd = editingTour.groupPricing.filter((_, i) => i !== idx); setEditingTour({ ...editingTour, groupPricing: upd }); }}><X size={14} /></button>
                  </div>
                ))}
                <button type="button" className="add-day-btn" onClick={() => setEditingTour({ ...editingTour, groupPricing: [...(editingTour.groupPricing || []), { label: '', pricePerPerson: 0 }] })}><Plus size={14} /> Add Tier</button>
              </div>
            </div>
          )}

          {/* ── Inclusions Tab ── */}
          {editorTab === 'inclusions' && (
            <div className="editor-section">
              {/* Inclusions */}
              <div className="editor-sub-heading inc-heading">✓ Inclusions ({editingTour.inclusions?.length || 0})</div>
              <div className="tag-add-row">
                <input type="text" className="cms-input" value={newIncTag} onChange={e => setNewIncTag(e.target.value)} placeholder="Add inclusion..." onKeyDown={e => {
                  if (e.key === 'Enter' && newIncTag.trim()) {
                    e.preventDefault();
                    setEditingTour({ ...editingTour, inclusions: [...(editingTour.inclusions || []), newIncTag.trim()] });
                    setNewIncTag('');
                  }
                }} />
                <button type="button" className="btn-add-tag" onClick={() => { if (newIncTag.trim()) { setEditingTour({ ...editingTour, inclusions: [...(editingTour.inclusions || []), newIncTag.trim()] }); setNewIncTag(''); } }}>+ Add</button>
              </div>
              <div className="tags-flex">
                {editingTour.inclusions?.map((inc, idx) => (
                  <span key={idx} className="tag-chip inc">
                    ✓ {inc}
                    <button type="button" onClick={() => setEditingTour({ ...editingTour, inclusions: editingTour.inclusions.filter((_, i) => i !== idx) })}><X size={12} /></button>
                  </span>
                ))}
              </div>

              {/* Exclusions */}
              <div className="editor-sub-heading exc-heading" style={{ marginTop: '1.5rem' }}>✕ Exclusions ({editingTour.exclusions?.length || 0})</div>
              <div className="tag-add-row">
                <input type="text" className="cms-input" value={newExcTag} onChange={e => setNewExcTag(e.target.value)} placeholder="Add exclusion..." onKeyDown={e => {
                  if (e.key === 'Enter' && newExcTag.trim()) {
                    e.preventDefault();
                    setEditingTour({ ...editingTour, exclusions: [...(editingTour.exclusions || []), newExcTag.trim()] });
                    setNewExcTag('');
                  }
                }} />
                <button type="button" className="btn-add-tag" onClick={() => { if (newExcTag.trim()) { setEditingTour({ ...editingTour, exclusions: [...(editingTour.exclusions || []), newExcTag.trim()] }); setNewExcTag(''); } }}>+ Add</button>
              </div>
              <div className="tags-flex">
                {editingTour.exclusions?.map((exc, idx) => (
                  <span key={idx} className="tag-chip exc">
                    ✕ {exc}
                    <button type="button" onClick={() => setEditingTour({ ...editingTour, exclusions: editingTour.exclusions.filter((_, i) => i !== idx) })}><X size={12} /></button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Gallery Tab ── */}
          {editorTab === 'gallery' && (
            <div className="editor-section">
              <div className="editor-sub-heading"><ImageIcon size={16} /> Gallery & Experience Photography</div>
              
              <div className="gallery-upload-actions-bar" style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <label className="btn-primary" style={{ cursor: 'pointer', margin: 0 }}>
                  <Plus size={15} /> Upload Photos from Device
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length === 0) return;
                      files.forEach(file => {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setEditingTour(prev => ({
                            ...prev,
                            gallery: [...(prev.gallery || []), { url: ev.target.result, alt: file.name.replace(/\.[^/.]+$/, '') }]
                          }));
                        };
                        reader.readAsDataURL(file);
                      });
                    }}
                  />
                </label>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    const url = prompt('Enter image URL:');
                    if (url) {
                      setEditingTour({
                        ...editingTour,
                        gallery: [...(editingTour.gallery || []), { url, alt: '' }]
                      });
                    }
                  }}
                >
                  <ExternalLink size={14} /> Add by Image URL
                </button>
              </div>

              <div className="gallery-grid">
                {(editingTour.gallery || []).map((img, idx) => (
                  <div key={idx} className="gallery-item">
                    <img src={img.url} alt={img.alt || 'Gallery image'} />
                    <div className="gallery-item-controls">
                      <input type="text" className="cms-input small" value={img.alt || ''} placeholder="Alt text..." onChange={e => {
                        const upd = [...editingTour.gallery]; upd[idx].alt = e.target.value;
                        setEditingTour({ ...editingTour, gallery: upd });
                      }} />
                      <button type="button" className="btn-del-day" onClick={() => {
                        setEditingTour({ ...editingTour, gallery: editingTour.gallery.filter((_, i) => i !== idx) });
                      }}><Trash2 size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SEO Tab ── */}
          {editorTab === 'seo' && (
            <div className="editor-section">
              <SEOAssistant
                title={editingTour.name}
                slug={editingTour.slug}
                content={editingTour.description || ''}
                metaTitle={editingTour.seo?.metaTitle || editingTour.name}
                metaDescription={editingTour.seo?.metaDescription || editingTour.tagline}
                focusKeyword={editingTour.seo?.focusKeyword || ''}
                canonicalUrl={editingTour.canonicalUrl || ''}
                coverImage={editingTour.image || ''}
                allowIndexing={editingTour.allowIndexing !== false}
                contentType="tour"
                expertInsights={editingTour.expertInsights || ''}
                sourceVerification={editingTour.sourceVerification || ''}
                searchIntent={editingTour.searchIntent || 'transactional'}
                onMetaTitleChange={v => setEditingTour({ ...editingTour, seo: { ...editingTour.seo, metaTitle: v } })}
                onMetaDescriptionChange={v => setEditingTour({ ...editingTour, seo: { ...editingTour.seo, metaDescription: v } })}
                onFocusKeywordChange={v => setEditingTour({ ...editingTour, seo: { ...editingTour.seo, focusKeyword: v } })}
                onCanonicalUrlChange={v => setEditingTour({ ...editingTour, canonicalUrl: v })}
                onSlugChange={v => setEditingTour({ ...editingTour, slug: slugify(v), _slugManual: true })}
                onAllowIndexingChange={v => setEditingTour({ ...editingTour, allowIndexing: v })}
                onExpertInsightsChange={v => setEditingTour({ ...editingTour, expertInsights: v })}
                onSourceVerificationChange={v => setEditingTour({ ...editingTour, sourceVerification: v })}
                onSearchIntentChange={v => setEditingTour({ ...editingTour, searchIntent: v })}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // LIST VIEW
  // ═══════════════════════════════════════════════════════════════
  return (
    <div className="tour-manager-view">
      {toastMessage && <div className="admin-toast-banner animate-fade-in"><span>{toastMessage}</span></div>}

      {/* Stats */}
      <div className="admin-stats-strip">
        <div className="admin-stat-card">
          <span className="stat-label">Total Packages</span>
          <span className="stat-value">{toursList.length}</span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-label">National</span>
          <span className="stat-value text-amber">{toursList.filter(t => t.category === 'National Tours' || t.country === 'India').length}</span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-label">International</span>
          <span className="stat-value text-emerald">{toursList.filter(t => t.category === 'International Tours').length}</span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-label">Live</span>
          <span className="stat-value text-sky">{toursList.filter(t => t.isVisible !== false).length}</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar-strip">
        <div className="admin-search-wrapper">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search packages..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="admin-search-input" />
          {searchQuery && <button className="search-clear-btn" onClick={() => setSearchQuery('')}><X size={14} /></button>}
        </div>
        <div className="admin-filter-pills">
          {['All', 'National', 'International', 'Hidden'].map(f => (
            <button key={f} className={`admin-pill-btn ${categoryFilter === f ? 'active' : ''}`} onClick={() => setCategoryFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="admin-actions-row">
          <button type="button" className="btn-primary btn-add-pkg" onClick={openNewTour}><Plus size={15} /> Add Package</button>
          <button type="button" className="btn-admin-action" onClick={handleExportJson}><Download size={14} /> Export</button>
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-container">
        <table className="admin-packages-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Package & Destination</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Itinerary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTours.map(tour => {
              const isLive = tour.isVisible !== false && tour.status !== 'hidden';
              return (
                <tr key={tour.id} className={!isLive ? 'row-hidden' : ''}>
                  <td className="cell-thumb">
                    <div className="pkg-thumb-wrapper">
                      <img src={tour.image} alt={tour.name} />
                      <span className={`thumb-cat-badge ${tour.category === 'International Tours' ? 'cat-intl' : 'cat-nat'}`}>
                        {tour.category === 'International Tours' ? 'INTL' : 'NAT'}
                      </span>
                    </div>
                  </td>
                  <td className="cell-info">
                    <strong className="pkg-name-text">{tour.name}</strong>
                    <div className="pkg-meta-sub">
                      <MapPin size={12} className="text-amber" />
                      <span>{tour.location || tour.city}</span>
                    </div>
                  </td>
                  <td><span className="duration-pill"><Clock size={12} />{tour.duration}</span></td>
                  <td className="cell-price">
                    <strong className="current-price-val">₹{Number(tour.price).toLocaleString('en-IN')}</strong>
                    {tour.originalPrice > tour.price && <span className="strike-price-val">₹{Number(tour.originalPrice).toLocaleString('en-IN')}</span>}
                  </td>
                  <td><span className="itin-days-badge">📅 {tour.itinerary?.length || 0} Days</span></td>
                  <td>
                    <button type="button" className={`visibility-toggle-btn ${isLive ? 'live' : 'hidden'}`} onClick={() => handleToggleVisibility(tour.id)}>
                      {isLive ? <Eye size={15} /> : <EyeOff size={15} />}
                      <span>{isLive ? 'Live' : 'Hidden'}</span>
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons-row">
                      <button type="button" className="btn-table-action edit" onClick={() => openEditor(tour)} title="Edit"><Edit3 size={15} /></button>
                      <button type="button" className="btn-table-action" onClick={() => handleDuplicate(tour)} title="Duplicate"><Copy size={15} /></button>
                      <button type="button" className="btn-table-action delete" onClick={() => handleDelete(tour.id, tour.name)} title="Delete"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
