import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import {
  LayoutDashboard, Search, Plus, Trash2, Eye, EyeOff, Edit3, Save,
  Download, RefreshCw, X, MapPin, Clock, Tag, ChevronDown, Check,
  ArrowLeft, ImageIcon, DollarSign, List, Calendar, Globe, Video,
  Copy, ExternalLink, Sparkles, Star, Users, Palette, Undo2, Redo2,
  FolderTree, Layers, ChevronRight, Flame, Heart, Compass, Sun, Snowflake,
  CloudRain, CheckSquare, Square, Ticket, Filter, AlertCircle, Sparkle
} from 'lucide-react';
import ImageUploadField from './ImageUploadField';
import RichTextEditor from './RichTextEditor';
import SEOAssistant from './SEOAssistant';
import CMSFeedbackModal from './CMSFeedbackModal';
import { TOURS_DATA } from '../../data/toursData';
import { slugify } from '../../services/directusClient';
import { contentService } from '../../services/contentService';
import { CARD_FEATURE_OPTIONS, FEATURE_ICONS_MAP } from '../CardInclusionsStrip';

// ═══════════════════════════════════════════════════════════════════
// COMFORT JOURNEY — CATEGORY TAXONOMY & BIFURCATION SYSTEM
// Multi-category classification across Scope, Seasons, Travel Styles,
// and Specialized Formats (Fixed Departures, Weekend Breaks, etc.)
// ═══════════════════════════════════════════════════════════════════

export const CMS_CATEGORIES = [
  // Scope / Destination Type
  { id: 'national', name: 'National Tours', group: 'Scope', icon: '🇮🇳', color: 'amber', matchKeywords: ['national', 'domestic', 'india', 'india tours'] },
  { id: 'international', name: 'International Tours', group: 'Scope', icon: '✈️', color: 'emerald', matchKeywords: ['international', 'global', 'abroad', 'overseas', 'passport'] },
  
  // Seasons
  { id: 'winter', name: 'Winter', group: 'Season', icon: '❄️', color: 'sky', matchKeywords: ['winter', 'snow', 'alpine', 'winter wonderland', 'december', 'january', 'february'] },
  { id: 'summer', name: 'Summer', group: 'Season', icon: '☀️', color: 'amber', matchKeywords: ['summer', 'may', 'june', 'july', 'sunny'] },
  { id: 'autumn', name: 'Autumn', group: 'Season', icon: '🍁', color: 'orange', matchKeywords: ['autumn', 'fall', 'september', 'october', 'november', 'golden chinar'] },
  { id: 'monsoon', name: 'Monsoon', group: 'Season', icon: '🌧️', color: 'cyan', matchKeywords: ['monsoon', 'rain', 'waterfalls', 'rainy', 'august', 'lush green'] },
  { id: 'spring', name: 'Spring', group: 'Season', icon: '🌸', color: 'pink', matchKeywords: ['spring', 'bloom', 'march', 'april', 'cherry', 'tulip'] },

  // Travel Styles & Companions
  { id: 'couple', name: 'Couple & Honeymoon', group: 'Travel Style', icon: '💍', color: 'rose', matchKeywords: ['couple', 'honeymoon', 'romantic', 'couple trips', 'honeymoon & romantic'] },
  { id: 'family', name: 'Family Trips', group: 'Travel Style', icon: '👨‍👩‍👧', color: 'blue', matchKeywords: ['family', 'family & group', 'family tours', 'kids'] },
  { id: 'group', name: 'Group Tours', group: 'Travel Style', icon: '👥', color: 'indigo', matchKeywords: ['group', 'friends', 'batch', 'group tours', 'tribe'] },
  { id: 'solo', name: 'Solo Trips', group: 'Travel Style', icon: '🎒', color: 'violet', matchKeywords: ['solo', 'backpacker', 'self-discovery', 'solo trips', 'solo travelers'] },
  { id: 'budget', name: 'Budget Friendly Trips', group: 'Travel Style', icon: '💰', color: 'emerald', matchKeywords: ['budget', 'budget friendly', 'affordable', 'value', 'pocket friendly'] },

  // Specialized Formats & Themes
  { id: 'fixed-departure', name: 'Fixed Departure', group: 'Travel Format', icon: '📅', color: 'orange', matchKeywords: ['fixed departure', 'guaranteed departure', 'batch', 'upcoming batches', 'tribe departure'] },
  { id: 'weekend-getaway', name: 'Weekend Getaway', group: 'Travel Format', icon: '⚡', color: 'lime', matchKeywords: ['weekend', 'weekend getaway', 'quick getaway', 'short break', '48-hour', 'weekend trip'] },
  { id: 'luxury', name: 'Luxury Signature', group: 'Travel Theme', icon: '👑', color: 'gold', matchKeywords: ['luxury', 'palace', 'vip', 'royal', 'heritage luxury', 'signature'] },
  { id: 'adventure', name: 'Adventure & Trekking', group: 'Travel Theme', icon: '🏔️', color: 'teal', matchKeywords: ['adventure', 'trek', 'hiking', 'rafting', 'mountain pass', 'extreme'] },
  { id: 'beach', name: 'Beach & Coastal', group: 'Travel Theme', icon: '🏖️', color: 'cyan', matchKeywords: ['beach', 'coastal', 'island', 'tropical', 'ocean', 'azure waters'] },
  { id: 'heritage', name: 'Heritage & Culture', group: 'Travel Theme', icon: '🏰', color: 'amber', matchKeywords: ['heritage', 'culture', 'monument', 'fort', 'history', 'royal desi'] },
  { id: 'spiritual', name: 'Pilgrimage & Spiritual', group: 'Travel Theme', icon: '🕉️', color: 'yellow', matchKeywords: ['pilgrimage', 'spiritual', 'temple', 'char dham', 'sacred', 'puja'] },
  { id: 'wildlife', name: 'Wildlife Safari', group: 'Travel Theme', icon: '🦁', color: 'green', matchKeywords: ['wildlife', 'safari', 'nature', 'jungle', 'national park'] },
];

/**
 * Robust multi-category matcher: checks tour.categories, tour.category,
 * location, country, tags, and special fields (e.g. fixedDeparture dates).
 */
export function doesTourMatchCategory(tour, catId) {
  if (!tour) return false;
  const targetCat = CMS_CATEGORIES.find(c => c.id === catId);
  if (!targetCat) return false;

  const tourCategories = Array.isArray(tour.categories) ? tour.categories : [];
  
  // 1. Direct match on selected categories array
  const directMatch = tourCategories.some(c => {
    if (typeof c !== 'string') return false;
    const cLower = c.toLowerCase().trim();
    return cLower === targetCat.name.toLowerCase() || 
           cLower === targetCat.id.toLowerCase() ||
           targetCat.matchKeywords.some(kw => cLower.includes(kw));
  });
  if (directMatch) return true;

  // 2. Direct match on primary category
  if (tour.category) {
    const catLower = tour.category.toLowerCase();
    if (catLower === targetCat.name.toLowerCase() || targetCat.matchKeywords.some(kw => catLower.includes(kw))) {
      return true;
    }
  }

  // 3. Scope specifics (India vs Global)
  if (catId === 'national') {
    if (tour.country && tour.country.toLowerCase() === 'india') return true;
    if (tour.category === 'National Tours') return true;
  }
  if (catId === 'international') {
    if (tour.country && tour.country.toLowerCase() !== 'india') return true;
    if (tour.category === 'International Tours') return true;
  }

  // 4. Fixed Departure specific checks
  if (catId === 'fixed-departure') {
    if (tour.fixedDeparture?.dates || tour.dates) return true;
  }

  // 5. Weekend Getaway specific checks (<= 3 Nights or named weekend)
  if (catId === 'weekend-getaway') {
    if (tour.duration && (tour.duration.includes('1 Night') || tour.duration.includes('2 Night') || tour.duration.includes('3 Night'))) return true;
  }

  // 6. Fallback tag & keyword scan
  const allTags = [
    ...(tour.tags || []),
    ...(tour.vibeTags || []),
    tour.name || '',
    tour.location || '',
    tour.duration || ''
  ].join(' ').toLowerCase();

  return targetCat.matchKeywords.some(kw => allTags.includes(kw));
}

// ═══════════════════════════════════════════════════════════════════
// DEFAULT EMPTY TOUR PACKAGE TEMPLATE
// ═══════════════════════════════════════════════════════════════════

const EMPTY_TOUR = {
  id: '', name: '', slug: '', location: '', city: '', state: '', country: 'India', continent: 'Asia',
  duration: '3 Nights & 4 Days', price: 24999, originalPrice: 32999,
  category: 'National Tours', 
  categories: ['National Tours'],
  
  // Fixed Departure Customization Fields
  dates: 'Every Friday Departure',
  seatsLeft: 4,
  totalSeats: 16,
  badge: '🔥 Filling Fast',
  vibe: 'Community Travel Tribe',
  fixedDeparture: {
    dates: 'Every Friday Departure',
    seatsLeft: 4,
    totalSeats: 16,
    badge: '🔥 Filling Fast',
    vibe: 'Community Travel Tribe',
    status: 'Open for Booking'
  },

  image: '', heroVideo: '', heroTagline: '', heroOverlayColor: 'rgba(0,0,0,0.4)',
  tagline: '', description: '',
  inclusions: ['Hotel Accommodation', 'Daily Breakfast', 'Private AC Vehicle', 'Sightseeing & Transfers'],
  exclusions: ['Personal Expenses', 'Monument Entry Tickets', 'Anything not in Inclusions'],
  cardFeatures: ['stay', 'cab', 'meals', 'sightseeing', 'vip'],
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
  const [toursList, setToursList] = useState(() => contentService.getTours());
  const [editingTour, setEditingTour] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Category-First Navigation & View Modes
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all', cat.id, or 'hidden'
  const [activeCatGroup, setActiveCatGroup] = useState('all'); // 'all', 'Scope', 'Season', 'Travel Style', 'Travel Format', 'Travel Theme'
  const [categoryViewMode, setCategoryViewMode] = useState('sections'); // 'sections' (grouped by category) | 'table' (flat table)
  const [expandedCats, setExpandedCats] = useState({}); // { [catId]: boolean }
  const [customCatInput, setCustomCatInput] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [newIncTag, setNewIncTag] = useState('');
  const [newExcTag, setNewExcTag] = useState('');
  const [editorTab, setEditorTab] = useState('details'); // details, itinerary, pricing, inclusions, gallery, seo
  const [previewDays, setPreviewDays] = useState({});

  // ─── Confirmation & Unsaved Changes Modal State ───
  const [feedbackModal, setFeedbackModal] = useState({
    isOpen: false,
    type: 'saved', // 'saved' | 'published' | 'unsaved_warning'
    title: '',
    subtitle: '',
    statusBadge: 'published',
    metaDetails: []
  });

  // ─── Undo / Redo & Dirty State Tracking ───
  const initialTourJsonRef = useRef(null);
  const tourHistoryRef = useRef([]);
  const tourHistoryIndexRef = useRef(0);
  const [canUndoTour, setCanUndoTour] = useState(false);
  const [canRedoTour, setCanRedoTour] = useState(false);
  const isTourHistoryActionRef = useRef(false);
  const tourTypingTimerRef = useRef(null);

  const updateTourUndoRedoButtons = useCallback(() => {
    setCanUndoTour(tourHistoryIndexRef.current > 0);
    setCanRedoTour(tourHistoryIndexRef.current < tourHistoryRef.current.length - 1);
  }, []);

  const pushTourSnapshot = useCallback((tourObj) => {
    if (!tourObj || isTourHistoryActionRef.current) return;
    const currentJson = JSON.stringify(tourObj);
    const lastJson = tourHistoryRef.current[tourHistoryIndexRef.current] 
      ? JSON.stringify(tourHistoryRef.current[tourHistoryIndexRef.current]) 
      : '';
    if (currentJson === lastJson) return;

    const newHistory = tourHistoryRef.current.slice(0, tourHistoryIndexRef.current + 1);
    newHistory.push(JSON.parse(currentJson));
    if (newHistory.length > 40) newHistory.shift();
    tourHistoryRef.current = newHistory;
    tourHistoryIndexRef.current = newHistory.length - 1;
    updateTourUndoRedoButtons();
  }, [updateTourUndoRedoButtons]);

  const handleTourUndo = useCallback(() => {
    if (tourHistoryIndexRef.current > 0) {
      isTourHistoryActionRef.current = true;
      tourHistoryIndexRef.current -= 1;
      const targetTour = JSON.parse(JSON.stringify(tourHistoryRef.current[tourHistoryIndexRef.current]));
      setEditingTour(targetTour);
      setTimeout(() => {
        isTourHistoryActionRef.current = false;
        updateTourUndoRedoButtons();
      }, 50);
      showToast('↶ Undone last change');
    }
  }, [updateTourUndoRedoButtons]);

  const handleTourRedo = useCallback(() => {
    if (tourHistoryIndexRef.current < tourHistoryRef.current.length - 1) {
      isTourHistoryActionRef.current = true;
      tourHistoryIndexRef.current += 1;
      const targetTour = JSON.parse(JSON.stringify(tourHistoryRef.current[tourHistoryIndexRef.current]));
      setEditingTour(targetTour);
      setTimeout(() => {
        isTourHistoryActionRef.current = false;
        updateTourUndoRedoButtons();
      }, 50);
      showToast('↷ Redone change');
    }
  }, [updateTourUndoRedoButtons]);

  // Track field changes and push snapshots with debouncing
  useEffect(() => {
    if (view === 'editor' && editingTour) {
      if (isTourHistoryActionRef.current) return;
      if (tourTypingTimerRef.current) clearTimeout(tourTypingTimerRef.current);
      tourTypingTimerRef.current = setTimeout(() => {
        pushTourSnapshot(editingTour);
      }, 400);
    }
  }, [editingTour, view, pushTourSnapshot]);

  const isTourDirty = useCallback(() => {
    if (!editingTour || !initialTourJsonRef.current) return false;
    return JSON.stringify(editingTour) !== initialTourJsonRef.current;
  }, [editingTour]);

  const toggleDayPreview = (idx) => {
    setPreviewDays(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const insertDayFormatting = (idx, tagOpen, tagClose, placeholderText = 'heading') => {
    const textarea = document.getElementById(`day-desc-textarea-${idx}`);
    const dayObj = editingTour?.itinerary?.[idx];
    const currentDesc = dayObj?.desc || '';

    if (textarea && textarea.selectionStart !== undefined) {
      textarea.focus();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = currentDesc.substring(start, end);
      const textToWrap = selected || placeholderText;
      const inserted = `${tagOpen}${textToWrap}${tagClose}`;

      let execSuccess = false;
      try {
        execSuccess = document.execCommand('insertText', false, inserted);
      } catch {}

      if (execSuccess) {
        const upd = [...editingTour.itinerary];
        upd[idx].desc = textarea.value;
        setEditingTour({ ...editingTour, itinerary: upd });
      } else {
        const newDesc = currentDesc.substring(0, start) + inserted + currentDesc.substring(end);
        const upd = [...editingTour.itinerary];
        upd[idx].desc = newDesc;
        setEditingTour({ ...editingTour, itinerary: upd });
      }
    } else {
      const newDesc = currentDesc ? `${currentDesc}\n${tagOpen}${placeholderText}${tagClose}` : `${tagOpen}${placeholderText}${tagClose}`;
      const upd = [...editingTour.itinerary];
      upd[idx].desc = newDesc;
      setEditingTour({ ...editingTour, itinerary: upd });
    }
  };

  // Aggregates full tour content for SEO analysis (Overview, Day-by-day H3s & descriptions, Inclusions H2, Exclusions H2)
  const getFullTourContentForSEO = useCallback((tour) => {
    if (!tour) return '';
    const parts = [];

    if (tour.description) {
      parts.push(`<h2>Tour Overview & Experience</h2>`);
      parts.push(tour.description);
    }
    if (tour.tagline) {
      parts.push(`<p>${tour.tagline}</p>`);
    }

    if (tour.itinerary && tour.itinerary.length > 0) {
      parts.push(`<h2>Day-by-Day Itinerary (${tour.itinerary.length} Days)</h2>`);
      tour.itinerary.forEach((day, i) => {
        const dayNum = day.day || i + 1;
        const title = day.title || `Day ${dayNum}`;
        parts.push(`<h3>${title}</h3>`);
        if (day.desc) {
          parts.push(day.desc);
        }
        const logistics = [
          day.stayTier ? `Stay: ${day.stayTier}` : '',
          day.transport ? `Transport: ${day.transport}` : '',
          day.meals ? `Meals: ${day.meals}` : ''
        ].filter(Boolean).join(' | ');
        if (logistics) {
          parts.push(`<p><em>${logistics}</em></p>`);
        }
        if (day.image) {
          parts.push(`<img src="${day.image}" alt="${title}" />`);
        }
      });
    }

    if (tour.inclusions && tour.inclusions.length > 0) {
      parts.push(`<h2>Package Inclusions & Privileges</h2>`);
      parts.push(`<ul>` + tour.inclusions.map(inc => `<li>${inc}</li>`).join('') + `</ul>`);
    }

    if (tour.exclusions && tour.exclusions.length > 0) {
      parts.push(`<h2>Package Exclusions</h2>`);
      parts.push(`<ul>` + tour.exclusions.map(exc => `<li>${exc}</li>`).join('') + `</ul>`);
    }

    return parts.join('\n');
  }, []);

  const showToast = (msg) => { setToastMessage(msg); setTimeout(() => setToastMessage(''), 3500); };

  const persistTours = useCallback((updated) => {
    setToursList(updated);
    contentService.saveAllTours(updated);
  }, []);

  // ─── CRUD ───
  const handleSave = useCallback((overrideTour = null, andExit = false) => {
    const targetTour = overrideTour || editingTour;
    if (!targetTour?.name) { alert('Package title is required.'); return; }
    if (!targetTour.slug) targetTour.slug = slugify(targetTour.name);

    // Sync fixed departure fields if Fixed Departure is present
    const isFixedDep = (targetTour.categories || []).some(c => typeof c === 'string' && c.toLowerCase().includes('fixed departure'));
    if (isFixedDep) {
      targetTour.dates = targetTour.dates || targetTour.fixedDeparture?.dates || 'Every Friday Departure';
      targetTour.seatsLeft = Number(targetTour.seatsLeft ?? targetTour.fixedDeparture?.seatsLeft ?? 4);
      targetTour.totalSeats = Number(targetTour.totalSeats ?? targetTour.fixedDeparture?.totalSeats ?? 16);
      targetTour.badge = targetTour.badge || targetTour.fixedDeparture?.badge || '🔥 Filling Fast';
      targetTour.vibe = targetTour.vibe || targetTour.fixedDeparture?.vibe || 'Community Travel Tribe';
      targetTour.fixedDeparture = {
        dates: targetTour.dates,
        seatsLeft: targetTour.seatsLeft,
        totalSeats: targetTour.totalSeats,
        badge: targetTour.badge,
        vibe: targetTour.vibe,
        status: targetTour.fixedDeparture?.status || 'Open for Booking'
      };
    }

    const rev = { timestamp: new Date().toISOString(), name: targetTour.name, price: targetTour.price };
    targetTour.revisions = [...(targetTour.revisions || []).slice(-10), rev];

    const idx = toursList.findIndex(t => t.id === targetTour.id);
    const updated = idx >= 0
      ? toursList.map(t => t.id === targetTour.id ? targetTour : t)
      : [targetTour, ...toursList];
    persistTours(updated);
    initialTourJsonRef.current = JSON.stringify(targetTour); // Mark as clean

    const categoriesList = (targetTour.categories && targetTour.categories.length > 0)
      ? targetTour.categories.join(', ')
      : (targetTour.category || 'National Tours');

    const metaList = [
      { label: 'Price', value: `₹${Number(targetTour.price || 0).toLocaleString('en-IN')}` },
      { label: 'Duration', value: targetTour.duration || 'N/A' },
      { label: 'Categories', value: categoriesList },
      { label: 'Itinerary Days', value: `${targetTour.itinerary?.length || 0} Days` },
      { label: 'Inclusion Badges', value: `${targetTour.cardFeatures?.length || 5} Icons` },
    ];

    if (isFixedDep) {
      metaList.push({
        label: 'Fixed Batches',
        value: `${targetTour.dates} (${targetTour.seatsLeft}/${targetTour.totalSeats} seats)`
      });
    }

    if (andExit) {
      setFeedbackModal(prev => ({ ...prev, isOpen: false }));
      setView('list');
      setEditingTour(null);
      showToast(`✅ Package "${targetTour.name}" saved!`);
    } else {
      setFeedbackModal({
        isOpen: true,
        type: 'saved',
        title: targetTour.name,
        statusBadge: targetTour.status || 'draft',
        metaDetails: metaList
      });
    }
  }, [editingTour, toursList, persistTours]);

  const handlePublish = useCallback(() => {
    if (!editingTour) return;
    const publishedTour = { ...editingTour, status: 'published', isVisible: true };

    const isFixedDep = (publishedTour.categories || []).some(c => typeof c === 'string' && c.toLowerCase().includes('fixed departure'));
    if (isFixedDep) {
      publishedTour.dates = publishedTour.dates || publishedTour.fixedDeparture?.dates || 'Every Friday Departure';
      publishedTour.seatsLeft = Number(publishedTour.seatsLeft ?? publishedTour.fixedDeparture?.seatsLeft ?? 4);
      publishedTour.totalSeats = Number(publishedTour.totalSeats ?? publishedTour.fixedDeparture?.totalSeats ?? 16);
      publishedTour.badge = publishedTour.badge || publishedTour.fixedDeparture?.badge || '🔥 Filling Fast';
      publishedTour.vibe = publishedTour.vibe || publishedTour.fixedDeparture?.vibe || 'Community Travel Tribe';
      publishedTour.fixedDeparture = {
        dates: publishedTour.dates,
        seatsLeft: publishedTour.seatsLeft,
        totalSeats: publishedTour.totalSeats,
        badge: publishedTour.badge,
        vibe: publishedTour.vibe,
        status: publishedTour.fixedDeparture?.status || 'Open for Booking'
      };
    }

    setEditingTour(publishedTour);

    const idx = toursList.findIndex(t => t.id === publishedTour.id);
    const updated = idx >= 0
      ? toursList.map(t => t.id === publishedTour.id ? publishedTour : t)
      : [publishedTour, ...toursList];
    persistTours(updated);
    initialTourJsonRef.current = JSON.stringify(publishedTour);

    const categoriesList = (publishedTour.categories && publishedTour.categories.length > 0)
      ? publishedTour.categories.join(', ')
      : (publishedTour.category || 'National Tours');

    const metaList = [
      { label: 'Price', value: `₹${Number(publishedTour.price || 0).toLocaleString('en-IN')}` },
      { label: 'Duration', value: publishedTour.duration || 'N/A' },
      { label: 'Categories', value: categoriesList },
      { label: 'Itinerary Days', value: `${publishedTour.itinerary?.length || 0} Days` },
      { label: 'Live Badges', value: `${publishedTour.cardFeatures?.length || 5} Card Icons` },
    ];

    if (isFixedDep) {
      metaList.push({
        label: 'Fixed Batches',
        value: `${publishedTour.dates} (${publishedTour.seatsLeft}/${publishedTour.totalSeats} seats)`
      });
    }

    setFeedbackModal({
      isOpen: true,
      type: 'published',
      title: publishedTour.name,
      statusBadge: 'published',
      metaDetails: metaList
    });
  }, [editingTour, toursList, persistTours]);

  const handleBackClick = () => {
    if (isTourDirty()) {
      setFeedbackModal({
        isOpen: true,
        type: 'unsaved_warning',
        title: editingTour?.name || 'Tour Package'
      });
    } else {
      setView('list');
      setEditingTour(null);
    }
  };

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
    const cloned = JSON.parse(JSON.stringify(tour));
    if (!cloned.categories || !Array.isArray(cloned.categories) || cloned.categories.length === 0) {
      cloned.categories = [cloned.category || 'National Tours'];
    }
    initialTourJsonRef.current = JSON.stringify(cloned);
    tourHistoryRef.current = [JSON.parse(JSON.stringify(cloned))];
    tourHistoryIndexRef.current = 0;
    setCanUndoTour(false);
    setCanRedoTour(false);
    setEditingTour(cloned);
    setIsAddingNew(adding);
    setEditorTab('details');
    setView('editor');
  };

  const openNewTour = (presetCat = null) => {
    let initialCategories = ['National Tours'];
    let initialScope = 'National Tours';
    let initialCountry = 'India';

    if (presetCat) {
      if (presetCat.id === 'international') {
        initialCategories = ['International Tours'];
        initialScope = 'International Tours';
        initialCountry = 'Switzerland';
      } else if (presetCat.id === 'national') {
        initialCategories = ['National Tours'];
        initialScope = 'National Tours';
        initialCountry = 'India';
      } else {
        initialCategories = ['National Tours', presetCat.name];
      }
    }

    openEditor({
      ...EMPTY_TOUR,
      id: `tour-custom-${Date.now()}`,
      category: initialScope,
      country: initialCountry,
      categories: initialCategories
    }, true);
  };

  // Filter tours based on search keyword and active category selection
  const filteredTours = useMemo(() => {
    return toursList.filter(tour => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = tour.name?.toLowerCase().includes(q);
        const matchLoc = tour.location?.toLowerCase().includes(q) || tour.city?.toLowerCase().includes(q);
        const matchCats = (tour.categories || []).some(c => typeof c === 'string' && c.toLowerCase().includes(q));
        if (!matchName && !matchLoc && !matchCats) return false;
      }
      if (categoryFilter === 'all') return true;
      if (categoryFilter === 'hidden') return tour.isVisible === false || tour.status === 'hidden';
      return doesTourMatchCategory(tour, categoryFilter);
    });
  }, [toursList, searchQuery, categoryFilter]);

  // Filtered categories for section accordions (must be called before any early return)
  const visibleCategories = useMemo(() => {
    let cats = CMS_CATEGORIES;
    if (activeCatGroup !== 'all') {
      cats = cats.filter(c => c.group === activeCatGroup);
    }
    if (categoryFilter !== 'all' && categoryFilter !== 'hidden') {
      cats = cats.filter(c => c.id === categoryFilter);
    }
    return cats;
  }, [activeCatGroup, categoryFilter]);

  const activeFocusCategory = CMS_CATEGORIES.find(c => c.id === categoryFilter);

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
          <button type="button" className="btn-back" onClick={handleBackClick}>
            <ArrowLeft size={16} /> Back
          </button>
          <h3 className="editor-tour-title">{isAddingNew ? '➕ New Tour Package' : `✏️ ${editingTour.name || 'Untitled'}`}</h3>
          <div className="editor-header-actions">
            {/* Undo / Redo Group */}
            <div className="btn-undo-redo-group" title="Undo / Redo form edits">
              <button
                type="button"
                className="btn-header-undo"
                onClick={handleTourUndo}
                disabled={!canUndoTour}
                title="Undo last change (Ctrl+Z)"
              >
                <Undo2 size={13} /> Undo
              </button>
              <div className="header-undo-sep" />
              <button
                type="button"
                className="btn-header-undo"
                onClick={handleTourRedo}
                disabled={!canRedoTour}
                title="Redo change (Ctrl+Y)"
              >
                <Redo2 size={13} /> Redo
              </button>
            </div>

            <span className={`status-pill-inline ${editingTour.status || 'draft'}`}>
              {editingTour.status === 'published' ? '● Live' : '○ Draft'}
            </span>
            <button type="button" className="btn-secondary" onClick={() => handleSave()}><Save size={14} /> Save</button>
            <button type="button" className="btn-primary" onClick={() => handlePublish()}><Sparkles size={14} /> Publish</button>
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
              {/* Package Title */}
              <div className="field-group" style={{ marginBottom: '1.25rem' }}>
                <label>Package Title *</label>
                <input type="text" className="cms-input" value={editingTour.name || ''} onChange={e => setEditingTour({ ...editingTour, name: e.target.value, slug: editingTour._slugManual ? editingTour.slug : slugify(e.target.value) })} placeholder="e.g. Kashmir Valley Paradise" required />
              </div>

              {/* Multi-Category Assignment Panel */}
              <div className="cms-multicat-editor-panel">
                <div className="cms-multicat-header">
                  <div className="cms-multicat-title">
                    <Tag size={16} className="text-amber" />
                    <span>Package Categories & Section Placement</span>
                  </div>
                  <span className="cms-multicat-assigned-count">
                    {(editingTour.categories || []).length} Categories Assigned
                  </span>
                </div>
                <p className="cms-multicat-sub">
                  Assign this tour to multiple sections. 1 tour package can lie under multiple categories (e.g. <em>Winter</em>, <em>Couple & Honeymoon</em>, <em>National Tours</em>, and <em>Fixed Departure</em>) and will appear under each section in the CMS dashboard.
                </p>

                {/* Active Categories Tray */}
                <div className="cms-active-cats-tray">
                  {(editingTour.categories || []).length === 0 ? (
                    <span style={{ fontSize: '0.78rem', color: '#64748B', fontStyle: 'italic' }}>
                      No categories assigned yet. Click chips below to add.
                    </span>
                  ) : (
                    (editingTour.categories || []).map((catName, idx) => (
                      <span key={idx} className="cms-active-cat-pill">
                        <span>{catName}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (editingTour.categories || []).filter(c => c !== catName);
                            setEditingTour({
                              ...editingTour,
                              categories: updated.length > 0 ? updated : ['National Tours']
                            });
                          }}
                          title="Remove category"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))
                  )}
                </div>

                {/* Grouped Category Options */}
                <div className="cms-cat-groups-stack">
                  {['Scope', 'Season', 'Travel Style', 'Travel Format', 'Travel Theme'].map(groupName => {
                    const groupCats = CMS_CATEGORIES.filter(c => c.group === groupName);
                    return (
                      <div key={groupName} className="cms-cat-group-block">
                        <span className="cms-cat-group-label">
                          {groupName === 'Scope' && '🌐 Destination Scope'}
                          {groupName === 'Season' && '❄️ Seasons & Weather'}
                          {groupName === 'Travel Style' && '👥 Travel Style & Companions'}
                          {groupName === 'Travel Format' && '⚡ Formats & Batches'}
                          {groupName === 'Travel Theme' && '✨ Experiences & Themes'}
                        </span>
                        <div className="cms-cat-chips-row">
                          {groupCats.map(cat => {
                            const isSelected = (editingTour.categories || []).includes(cat.name);
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                className={`cms-cat-chip-toggle ${isSelected ? 'selected' : ''}`}
                                onClick={() => {
                                  const current = editingTour.categories || [];
                                  let next = [];
                                  if (isSelected) {
                                    next = current.filter(c => c !== cat.name);
                                    if (next.length === 0) next = ['National Tours'];
                                  } else {
                                    next = [...current, cat.name];
                                  }

                                  // If scope toggled, sync primary category & country defaults
                                  let newScope = editingTour.category;
                                  let newCountry = editingTour.country;
                                  if (cat.id === 'national') {
                                    newScope = 'National Tours';
                                    if (newCountry !== 'India') newCountry = 'India';
                                  } else if (cat.id === 'international') {
                                    newScope = 'International Tours';
                                    if (newCountry === 'India') newCountry = 'Switzerland';
                                  }

                                  setEditingTour({
                                    ...editingTour,
                                    categories: next,
                                    category: newScope,
                                    country: newCountry
                                  });
                                }}
                              >
                                <span>{cat.icon}</span>
                                <span>{cat.name}</span>
                                <span className="cms-cat-chip-check">{isSelected ? '✓' : '+'}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add Custom Category Tag */}
                <div className="cms-custom-cat-row">
                  <input
                    type="text"
                    className="cms-input small"
                    placeholder="Add custom category tag..."
                    value={customCatInput}
                    onChange={e => setCustomCatInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && customCatInput.trim()) {
                        e.preventDefault();
                        const tag = customCatInput.trim();
                        if (!(editingTour.categories || []).includes(tag)) {
                          setEditingTour({
                            ...editingTour,
                            categories: [...(editingTour.categories || []), tag]
                          });
                        }
                        setCustomCatInput('');
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ whiteSpace: 'nowrap', padding: '0.4rem 0.85rem' }}
                    onClick={() => {
                      if (customCatInput.trim()) {
                        const tag = customCatInput.trim();
                        if (!(editingTour.categories || []).includes(tag)) {
                          setEditingTour({
                            ...editingTour,
                            categories: [...(editingTour.categories || []), tag]
                          });
                        }
                        setCustomCatInput('');
                      }
                    }}
                  >
                    + Add Custom Tag
                  </button>
                </div>
              </div>

              {/* Conditional Fixed Departure Configuration Panel */}
              {(editingTour.categories || []).some(c => typeof c === 'string' && c.toLowerCase().includes('fixed departure')) && (
                <div className="cms-fixed-dep-panel">
                  <div className="cms-fixed-dep-header">
                    <div className="cms-fixed-dep-title">
                      <Flame size={18} className="text-orange" />
                      <span>Fixed Departure Batch Configuration (Active)</span>
                    </div>
                    <span className="cms-fixed-dep-badge">
                      🔥 Live on Fixed Departure Tribe Showcase
                    </span>
                  </div>
                  <p className="cms-fixed-dep-sub">
                    Because this tour is categorized under <strong>Fixed Departure</strong>, customize upcoming batch dates to show and how many seats are left:
                  </p>

                  <div className="form-grid-2">
                    <div className="field-group">
                      <label>Fixed Departure Dates to Show *</label>
                      <input
                        type="text"
                        className="cms-input"
                        value={editingTour.dates || editingTour.fixedDeparture?.dates || ''}
                        onChange={e => {
                          const val = e.target.value;
                          setEditingTour({
                            ...editingTour,
                            dates: val,
                            fixedDeparture: { ...(editingTour.fixedDeparture || {}), dates: val }
                          });
                        }}
                        placeholder="e.g. 18 Sep • 02 Oct • 16 Oct or Every Friday Departure"
                      />
                      {/* Date Presets */}
                      <div className="cms-presets-strip">
                        <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Quick Presets:</span>
                        {['Every Friday Departure', 'Every Weekend', '1st & 3rd Saturday', '18 Sep • 02 Oct • 16 Oct', '05 Oct • 19 Oct • 02 Nov'].map(preset => (
                          <button
                            key={preset}
                            type="button"
                            className="cms-preset-chip-btn"
                            onClick={() => {
                              setEditingTour({
                                ...editingTour,
                                dates: preset,
                                fixedDeparture: { ...(editingTour.fixedDeparture || {}), dates: preset }
                              });
                            }}
                          >
                            + {preset}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="field-group">
                      <label>Urgency Status Badge</label>
                      <select
                        className="cms-select"
                        value={editingTour.badge || editingTour.fixedDeparture?.badge || '🔥 Filling Fast'}
                        onChange={e => {
                          const val = e.target.value;
                          setEditingTour({
                            ...editingTour,
                            badge: val,
                            fixedDeparture: { ...(editingTour.fixedDeparture || {}), badge: val }
                          });
                        }}
                      >
                        <option value="🔥 Filling Fast">🔥 Filling Fast</option>
                        <option value="⚡ Almost Full">⚡ Almost Full</option>
                        <option value="🌿 New Batch Announced">🌿 New Batch Announced</option>
                        <option value="♨️ Weekend Batch">♨️ Weekend Batch</option>
                        <option value="👑 VIP Exclusive Batch">👑 VIP Exclusive Batch</option>
                        <option value="🌴 Island Tribe Batch">🌴 Island Tribe Batch</option>
                        <option value="✅ 100% Guaranteed Go">✅ 100% Guaranteed Go</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-3" style={{ marginTop: '0.85rem' }}>
                    <div className="field-group">
                      <label>Seats Left Remaining *</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="cms-input"
                        value={editingTour.seatsLeft ?? editingTour.fixedDeparture?.seatsLeft ?? 4}
                        onChange={e => {
                          const val = parseInt(e.target.value, 10) || 0;
                          setEditingTour({
                            ...editingTour,
                            seatsLeft: val,
                            fixedDeparture: { ...(editingTour.fixedDeparture || {}), seatsLeft: val }
                          });
                        }}
                      />
                    </div>

                    <div className="field-group">
                      <label>Total Batch Size (Capacity)</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        className="cms-input"
                        value={editingTour.totalSeats ?? editingTour.fixedDeparture?.totalSeats ?? 16}
                        onChange={e => {
                          const val = parseInt(e.target.value, 10) || 16;
                          setEditingTour({
                            ...editingTour,
                            totalSeats: val,
                            fixedDeparture: { ...(editingTour.fixedDeparture || {}), totalSeats: val }
                          });
                        }}
                      />
                    </div>

                    <div className="field-group">
                      <label>Batch Vibe / Theme Note</label>
                      <input
                        type="text"
                        className="cms-input"
                        value={editingTour.vibe || editingTour.fixedDeparture?.vibe || ''}
                        onChange={e => {
                          const val = e.target.value;
                          setEditingTour({
                            ...editingTour,
                            vibe: val,
                            fixedDeparture: { ...(editingTour.fixedDeparture || {}), vibe: val }
                          });
                        }}
                        placeholder="e.g. High Mountain Pass Expedition"
                      />
                    </div>
                  </div>

                  {/* Visual Seat Capacity Progress Preview */}
                  {(() => {
                    const total = Number(editingTour.totalSeats ?? editingTour.fixedDeparture?.totalSeats ?? 16);
                    const left = Number(editingTour.seatsLeft ?? editingTour.fixedDeparture?.seatsLeft ?? 4);
                    const booked = Math.max(0, total - left);
                    const pct = Math.min(100, Math.round((booked / total) * 100));
                    return (
                      <div className="cms-seats-progress-card">
                        <div className="cms-seats-progress-labels">
                          <span style={{ color: '#CBD5E1', fontWeight: 700 }}>
                            Live Seat Availability Meter
                          </span>
                          <span style={{ color: left <= 3 ? '#EF4444' : '#FF892F', fontWeight: 800 }}>
                            {left} seats remaining of {total} ({pct}% booked)
                          </span>
                        </div>
                        <div className="cms-seats-progress-bar-track">
                          <div className="cms-seats-progress-fill" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <h4>📅 Day-by-Day Itinerary ({editingTour.itinerary?.length || 0} Days)</h4>
                  <span className="section-h2-tag" title="Main Itinerary section functions as H2 in page hierarchy">H2 Section</span>
                </div>
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
                      <div className="day-title-wrap">
                        <span className="day-h3-tag" title="Treated as H3 Heading in SEO">H3 Day Title</span>
                        <input type="text" className="cms-input day-title" value={day.title || ''} onChange={e => {
                          const upd = [...editingTour.itinerary]; upd[idx].title = e.target.value;
                          setEditingTour({ ...editingTour, itinerary: upd });
                        }} placeholder="Day title (e.g. Day 1: Arrival & Bangalore City Palace)" />
                      </div>
                      <button type="button" className="btn-del-day" onClick={() => {
                        const upd = editingTour.itinerary.filter((_, i) => i !== idx).map((d, i) => ({ ...d, day: i + 1 }));
                        setEditingTour({ ...editingTour, itinerary: upd });
                      }}><Trash2 size={14} /></button>
                    </div>

                    {/* Rich Formatting Toolbar */}
                    <div className="day-rich-box">
                      <div className="day-rich-toolbar">
                        <button type="button" className="day-tool-btn" onClick={() => insertDayFormatting(idx, '<h4>', '</h4>', 'Sightseeing / Activity Subheading')} title="Insert H4 Subheading (proper child of Day H3)">
                          <strong>H4 Subheading</strong>
                        </button>
                        <button type="button" className="day-tool-btn" onClick={() => insertDayFormatting(idx, '<strong>', '</strong>', 'highlighted text')} title="Bold Text">
                          <strong>B</strong>
                        </button>
                        <button type="button" className="day-tool-btn" onClick={() => insertDayFormatting(idx, '<em>', '</em>', 'special note')} title="Italic Text">
                          <em>I</em>
                        </button>
                        <button type="button" className="day-tool-btn" onClick={() => insertDayFormatting(idx, '<ul>\n  <li>', '</li>\n</ul>', 'Key attraction')} title="Bullet List">
                          • List
                        </button>
                        <button type="button" className="day-tool-btn" onClick={() => insertDayFormatting(idx, '<p><strong>🌅 Morning:</strong> ', '</p>', 'Breakfast & departure for sightseeing')} title="Morning Slot">
                          🌅 Morning
                        </button>
                        <button type="button" className="day-tool-btn" onClick={() => insertDayFormatting(idx, '<p><strong>☀️ Afternoon:</strong> ', '</p>', 'Guided monument tour & cultural visits')} title="Afternoon Slot">
                          ☀️ Afternoon
                        </button>
                        <button type="button" className="day-tool-btn" onClick={() => insertDayFormatting(idx, '<p><strong>🌙 Evening:</strong> ', '</p>', 'Hotel check-in & dinner')} title="Evening Slot">
                          🌙 Evening
                        </button>
                        <button 
                          type="button" 
                          className="day-tool-btn btn-preview-toggle" 
                          onClick={() => toggleDayPreview(idx)}
                          title="Toggle between editing HTML/text and previewing the rendered card"
                        >
                          {previewDays[idx] ? '✏️ Edit Mode' : '👁 Rendered Preview'}
                        </button>
                      </div>

                      {previewDays[idx] ? (
                        <div 
                          className="day-rendered-preview"
                          dangerouslySetInnerHTML={{ 
                            __html: day.desc || '<em style="color:#64748b">No description written yet. Click "✏️ Edit Mode" to write schedule & activities.</em>' 
                          }}
                        />
                      ) : (
                        <textarea 
                          id={`day-desc-textarea-${idx}`}
                          rows={3} 
                          className="cms-textarea small day-desc-textarea" 
                          value={day.desc || ''} 
                          onChange={e => {
                            const upd = [...editingTour.itinerary]; upd[idx].desc = e.target.value;
                            setEditingTour({ ...editingTour, itinerary: upd });
                          }} 
                          placeholder="Day schedule, activities, and highlights (supports H2, H3, Bold, and HTML formatting)..." 
                        />
                      )}
                    </div>

                    {/* Logistics Row */}
                    <div className="day-meta-row">
                      <div className="day-meta-field">
                        <label>Stay Tier</label>
                        <input type="text" className="cms-input small" value={day.stayTier || ''} onChange={e => {
                          const upd = [...editingTour.itinerary]; upd[idx].stayTier = e.target.value;
                          setEditingTour({ ...editingTour, itinerary: upd });
                        }} placeholder="4-Star / 5-Star Stay" />
                      </div>
                      <div className="day-meta-field">
                        <label>Transport</label>
                        <input type="text" className="cms-input small" value={day.transport || ''} onChange={e => {
                          const upd = [...editingTour.itinerary]; upd[idx].transport = e.target.value;
                          setEditingTour({ ...editingTour, itinerary: upd });
                        }} placeholder="Dedicated Private AC Cab" />
                      </div>
                      <div className="day-meta-field">
                        <label>Meals</label>
                        <input type="text" className="cms-input small" value={day.meals || ''} onChange={e => {
                          const upd = [...editingTour.itinerary]; upd[idx].meals = e.target.value;
                          setEditingTour({ ...editingTour, itinerary: upd });
                        }} placeholder="Daily Breakfast & Dinner" />
                      </div>
                    </div>

                    {/* Day Photo with Device Upload + URL */}
                    <div className="day-photo-section">
                      <ImageUploadField
                        compact={true}
                        label={`Day ${day.day || idx + 1} Featured Photo`}
                        placeholder="Paste image URL or upload from device"
                        value={day.image || ''}
                        onChange={val => {
                          const upd = [...editingTour.itinerary];
                          upd[idx].image = val;
                          setEditingTour({ ...editingTour, itinerary: upd });
                        }}
                      />
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
              {/* Tour Card Inclusion Icons Selector */}
              <div className="card-icons-selector-box">
                <div className="card-icons-header">
                  <div className="editor-sub-heading" style={{ margin: 0 }}>
                    <Sparkles size={16} className="text-amber" /> Tour Card Inclusion Icons
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#94A3B8', margin: '0.25rem 0 0.65rem 0' }}>
                    Select which feature icons appear on cards across the website (e.g. Stay, Hotel, Cab, Flight, Train, Meals, Sightseeing, 24/7 VIP, Guide, Cruise, Visa, Activities).
                  </p>
                </div>

                {/* Live Card Icon Strip Preview */}
                <div className="card-icons-live-preview">
                  <span className="live-preview-tag">Card Preview:</span>
                  <div className="compact-inclusions-icon-bar" style={{ margin: 0 }}>
                    {(editingTour.cardFeatures || ['stay', 'cab', 'meals', 'sightseeing', 'vip']).map(featId => {
                      const feat = CARD_FEATURE_OPTIONS.find(f => f.id === featId);
                      if (!feat) return null;
                      const IconComp = feat.icon;
                      return (
                        <div key={feat.id} className="inc-icon-item" title={feat.title}>
                          <div className="inc-svg-badge">
                            <IconComp size={13} className={`text-${feat.color}`} />
                          </div>
                          <span className="inc-text">{feat.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Available Icon Options Grid */}
                <div className="card-icons-picker-grid">
                  {CARD_FEATURE_OPTIONS.map(opt => {
                    const isSelected = (editingTour.cardFeatures || ['stay', 'cab', 'meals', 'sightseeing', 'vip']).includes(opt.id);
                    const IconComp = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`card-icon-toggle-chip ${isSelected ? 'active' : ''}`}
                        onClick={() => {
                          const current = editingTour.cardFeatures || ['stay', 'cab', 'meals', 'sightseeing', 'vip'];
                          const next = isSelected 
                            ? current.filter(id => id !== opt.id)
                            : [...current, opt.id];
                          setEditingTour({ ...editingTour, cardFeatures: next });
                        }}
                      >
                        <div className="chip-icon-box">
                          <IconComp size={15} className={`text-${opt.color}`} />
                        </div>
                        <div className="chip-info">
                          <span className="chip-label">{opt.label}</span>
                          <span className="chip-title">{opt.title}</span>
                        </div>
                        <span className="chip-status-check">
                          {isSelected ? '✓' : '+'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

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
                content={getFullTourContentForSEO(editingTour)}
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

        {/* Confirmation & Unsaved Changes Modal */}
        <CMSFeedbackModal
          isOpen={feedbackModal.isOpen}
          type={feedbackModal.type}
          title={feedbackModal.title}
          subtitle={feedbackModal.subtitle}
          statusBadge={feedbackModal.statusBadge}
          metaDetails={feedbackModal.metaDetails}
          onClose={() => setFeedbackModal(prev => ({ ...prev, isOpen: false }))}
          onKeepEditing={() => setFeedbackModal(prev => ({ ...prev, isOpen: false }))}
          onBackToList={() => {
            setFeedbackModal(prev => ({ ...prev, isOpen: false }));
            setView('list');
            setEditingTour(null);
          }}
          onDiscardAndExit={() => {
            setFeedbackModal(prev => ({ ...prev, isOpen: false }));
            setView('list');
            setEditingTour(null);
          }}
          onSaveAndExit={() => {
            handleSave(editingTour, true);
          }}
        />
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // LIST VIEW — CATEGORY-FIRST TOUR EXPLORER & MANAGEMENT
  // ═══════════════════════════════════════════════════════════════

  // Render a standard table row for a tour package
  const renderTourRow = (tour) => {
    const isLive = tour.isVisible !== false && tour.status !== 'hidden';
    const isFixedDep = (tour.categories || []).some(c => typeof c === 'string' && c.toLowerCase().includes('fixed departure')) || Boolean(tour.dates);
    const seatsRemaining = tour.seatsLeft ?? tour.fixedDeparture?.seatsLeft ?? 4;
    const departureDates = tour.dates || tour.fixedDeparture?.dates || 'Every Friday Departure';

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
          {/* Multi-Category Assigned Chips */}
          <div className="pkg-assigned-cats-row">
            {(tour.categories || [tour.category || 'National Tours']).map((catName, cIdx) => {
              const isFixed = typeof catName === 'string' && catName.toLowerCase().includes('fixed departure');
              const isNat = typeof catName === 'string' && catName.toLowerCase().includes('national');
              const isIntl = typeof catName === 'string' && catName.toLowerCase().includes('international');
              return (
                <span
                  key={cIdx}
                  className={`pkg-mini-cat-chip ${isFixed ? 'cat-fixed' : isIntl ? 'cat-intl' : isNat ? 'cat-nat' : ''}`}
                >
                  {catName}
                </span>
              );
            })}
          </div>
        </td>
        <td><span className="duration-pill"><Clock size={12} />{tour.duration}</span></td>
        <td className="cell-price">
          <strong className="current-price-val">₹{Number(tour.price).toLocaleString('en-IN')}</strong>
          {tour.originalPrice > tour.price && <span className="strike-price-val">₹{Number(tour.originalPrice).toLocaleString('en-IN')}</span>}
        </td>
        <td>
          {isFixedDep ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span className="pkg-fixed-dep-info-pill" title="Upcoming Fixed Departure Batches">
                <Calendar size={11} /> {departureDates}
              </span>
              <span style={{ fontSize: '0.7rem', color: seatsRemaining <= 3 ? '#EF4444' : '#FF892F', fontWeight: 700 }}>
                ⚡ {seatsRemaining} seats left
              </span>
            </div>
          ) : (
            <span className="itin-days-badge">📅 {tour.itinerary?.length || 0} Days</span>
          )}
        </td>
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
  };

  return (
    <div className="tour-manager-view">
      {toastMessage && <div className="admin-toast-banner animate-fade-in"><span>{toastMessage}</span></div>}

      {/* Top Stats Strip */}
      <div className="admin-stats-strip">
        <div className="admin-stat-card">
          <span className="stat-label">Total Packages</span>
          <span className="stat-value">{toursList.length}</span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-label">National (India)</span>
          <span className="stat-value text-amber">{toursList.filter(t => doesTourMatchCategory(t, 'national')).length}</span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-label">International</span>
          <span className="stat-value text-emerald">{toursList.filter(t => doesTourMatchCategory(t, 'international')).length}</span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-label">Fixed Departures</span>
          <span className="stat-value" style={{ color: '#FF892F' }}>
            🔥 {toursList.filter(t => doesTourMatchCategory(t, 'fixed-departure')).length}
          </span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-label">Live Packages</span>
          <span className="stat-value text-sky">{toursList.filter(t => t.isVisible !== false).length}</span>
        </div>
      </div>

      {/* Category Navigation & Ribbon Bar */}
      <div className="cms-cat-ribbon-wrapper">
        <div className="cms-cat-ribbon-top">
          {/* Category Group Filter Tabs */}
          <div className="cms-cat-groups-tabs">
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginRight: '0.2rem' }}>
              Filter by:
            </span>
            {[
              { id: 'all', label: 'All Groups' },
              { id: 'Scope', label: '🌐 Scope' },
              { id: 'Season', label: '❄️ Seasons' },
              { id: 'Travel Style', label: '👥 Travel Styles' },
              { id: 'Travel Format', label: '⚡ Batches & Formats' },
              { id: 'Travel Theme', label: '✨ Themes' }
            ].map(group => (
              <button
                key={group.id}
                type="button"
                className={`cms-cat-group-filter-btn ${activeCatGroup === group.id ? 'active' : ''}`}
                onClick={() => setActiveCatGroup(group.id)}
              >
                {group.label}
              </button>
            ))}
          </div>

          {/* View Mode Switcher */}
          <div className="cms-view-mode-toggle">
            <button
              type="button"
              className={`cms-view-mode-btn ${categoryViewMode === 'sections' ? 'active' : ''}`}
              onClick={() => setCategoryViewMode('sections')}
              title="Show categories as sections with packages grouped underneath"
            >
              <FolderTree size={14} /> Category Sections View
            </button>
            <button
              type="button"
              className={`cms-view-mode-btn ${categoryViewMode === 'table' ? 'active' : ''}`}
              onClick={() => setCategoryViewMode('table')}
              title="Show unified table filtered by active category"
            >
              <Layers size={14} /> Unified Table View
            </button>
          </div>
        </div>

        {/* Scrollable Category Filter Pills with Live Package Counts */}
        <div className="cms-cat-pills-scroll-row">
          <button
            type="button"
            className={`cms-cat-pill-tab ${categoryFilter === 'all' ? 'active' : ''}`}
            onClick={() => setCategoryFilter('all')}
          >
            <span>✨</span>
            <span>All Packages</span>
            <span className="cms-cat-badge-count">{toursList.length}</span>
          </button>

          {(activeCatGroup === 'all' ? CMS_CATEGORIES : CMS_CATEGORIES.filter(c => c.group === activeCatGroup)).map(cat => {
            const count = toursList.filter(t => doesTourMatchCategory(t, cat.id)).length;
            const isActive = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`cms-cat-pill-tab ${isActive ? 'active' : ''}`}
                onClick={() => setCategoryFilter(cat.id)}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="cms-cat-badge-count">{count}</span>
              </button>
            );
          })}

          <button
            type="button"
            className={`cms-cat-pill-tab ${categoryFilter === 'hidden' ? 'active' : ''}`}
            onClick={() => setCategoryFilter('hidden')}
          >
            <span>👁️‍🗨️</span>
            <span>Hidden / Drafts</span>
            <span className="cms-cat-badge-count">
              {toursList.filter(t => t.isVisible === false || t.status === 'hidden').length}
            </span>
          </button>
        </div>
      </div>

      {/* Active Section Focus Banner (When category is selected) */}
      {activeFocusCategory && (
        <div className="cms-section-focus-banner">
          <div className="cms-section-focus-info">
            <span className="cms-section-focus-tag">
              <Filter size={12} /> SECTION FOCUSED
            </span>
            <div className="cms-section-focus-title">
              <span>{activeFocusCategory.icon}</span>
              <span>{activeFocusCategory.name}</span>
            </div>
            <span className="cms-section-focus-sub">
              Editing packages assigned to the <strong>{activeFocusCategory.name}</strong> category ({filteredTours.length} packages active).
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn-add-to-cat"
              onClick={() => openNewTour(activeFocusCategory)}
            >
              <Plus size={14} /> Add {activeFocusCategory.name} Package
            </button>
            <button
              type="button"
              className="btn-admin-action"
              style={{ padding: '0.35rem 0.65rem', fontSize: '0.74rem' }}
              onClick={() => setCategoryFilter('all')}
            >
              <X size={12} /> Show All Categories
            </button>
          </div>
        </div>
      )}

      {/* Toolbar: Search, Add Package, Export */}
      <div className="admin-toolbar-strip">
        <div className="admin-search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search packages by name, destination, city or category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="admin-search-input"
          />
          {searchQuery && <button className="search-clear-btn" onClick={() => setSearchQuery('')}><X size={14} /></button>}
        </div>

        <div className="admin-actions-row">
          <button type="button" className="btn-primary btn-add-pkg" onClick={() => openNewTour(activeFocusCategory)}>
            <Plus size={15} /> Add Package
          </button>
          <button type="button" className="btn-admin-action" onClick={handleExportJson}>
            <Download size={14} /> Export JSON
          </button>
        </div>
      </div>

      {/* ── MODE 1: CATEGORY SECTIONS VIEW ── */}
      {categoryViewMode === 'sections' && (
        <div className="cms-category-sections-wrapper">
          {visibleCategories.map(cat => {
            const catTours = toursList.filter(t => {
              if (searchQuery) {
                const q = searchQuery.toLowerCase();
                const matchName = t.name?.toLowerCase().includes(q);
                const matchLoc = t.location?.toLowerCase().includes(q) || t.city?.toLowerCase().includes(q);
                const matchCats = (t.categories || []).some(c => typeof c === 'string' && c.toLowerCase().includes(q));
                if (!matchName && !matchLoc && !matchCats) return false;
              }
              return doesTourMatchCategory(t, cat.id);
            });

            const isExpanded = expandedCats[cat.id] !== false; // default open
            const isTargetFocused = categoryFilter === cat.id;

            return (
              <div key={cat.id} className={`cms-cat-section-card ${isTargetFocused ? 'focused' : ''}`}>
                {/* Accordion Header */}
                <div
                  className="cms-cat-section-header"
                  onClick={() => setExpandedCats(prev => ({ ...prev, [cat.id]: !isExpanded }))}
                >
                  <div className="cms-cat-title-group">
                    <div className="cms-cat-icon-badge">{cat.icon}</div>
                    <div className="cms-cat-name-box">
                      <div className="cms-cat-main-title">
                        <span>{cat.name}</span>
                        <span className="cms-cat-badge-count">{catTours.length}</span>
                      </div>
                      <span className="cms-cat-type-sub">{cat.group} Category</span>
                    </div>
                  </div>

                  <div className="cms-cat-header-actions" onClick={e => e.stopPropagation()}>
                    <button
                      type="button"
                      className="btn-add-to-cat"
                      onClick={() => openNewTour(cat)}
                      title={`Add a new package directly into ${cat.name}`}
                    >
                      <Plus size={13} /> Add {cat.name}
                    </button>
                    <button
                      type="button"
                      className={`cms-cat-toggle-arrow ${isExpanded ? 'open' : ''}`}
                      onClick={() => setExpandedCats(prev => ({ ...prev, [cat.id]: !isExpanded }))}
                      aria-label="Toggle section"
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>
                </div>

                {/* Accordion Body */}
                {isExpanded && (
                  <div className="cms-cat-section-body">
                    {catTours.length === 0 ? (
                      <div className="cms-cat-empty-state">
                        <AlertCircle size={24} style={{ opacity: 0.5 }} />
                        <p>No tour packages are currently assigned to <strong>{cat.name}</strong>.</p>
                        <button
                          type="button"
                          className="btn-secondary"
                          style={{ marginTop: '0.4rem', fontSize: '0.78rem' }}
                          onClick={() => openNewTour(cat)}
                        >
                          <Plus size={13} /> Add first package to {cat.name}
                        </button>
                      </div>
                    ) : (
                      <div className="admin-table-container" style={{ margin: 0, border: 'none' }}>
                        <table className="admin-packages-table">
                          <thead>
                            <tr>
                              <th>Preview</th>
                              <th>Package & Categories</th>
                              <th>Duration</th>
                              <th>Price</th>
                              <th>Batches / Itinerary</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {catTours.map(tour => renderTourRow(tour))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── MODE 2: UNIFIED FILTERED TABLE VIEW ── */}
      {categoryViewMode === 'table' && (
        <div className="admin-table-container">
          <table className="admin-packages-table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Package & Destination</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Batches / Itinerary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
                    No packages match the selected category and search criteria.
                  </td>
                </tr>
              ) : (
                filteredTours.map(tour => renderTourRow(tour))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

