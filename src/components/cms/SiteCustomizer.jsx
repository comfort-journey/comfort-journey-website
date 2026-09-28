import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles, Globe, Search, Share2, Eye, Sliders, CheckCircle2,
  Trash2, Plus, RefreshCw, AlertCircle, Phone, MessageCircle,
  Video, Image as ImageIcon, ShieldCheck, HelpCircle, Save, ExternalLink,
  Laptop, Smartphone, Layers, Check, Copy, UploadCloud, Loader2,
  Compass, DollarSign, Hotel, Car, Tag, Edit3, MapPin
} from 'lucide-react';
import { siteSettingsService } from '../../services/siteSettingsService';
import { contentService } from '../../services/contentService';
import './SiteCustomizer.css';

export default function SiteCustomizer({ onToast }) {
  const [activeSubTab, setActiveSubTab] = useState('studio'); // 'studio' | 'toasts' | 'hero' | 'seo' | 'brand'
  const [settings, setSettings] = useState(() => siteSettingsService.getSettings());
  const [selectedPage, setSelectedPage] = useState('home');
  const [serpViewMode, setSerpViewMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [isSaved, setIsSaved] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [newBooking, setNewBooking] = useState({ name: '', from: '', tour: '', time: 'Just now' });

  // ── Trip Studio & Add-on Handlers ──
  const [newAddon, setNewAddon] = useState({
    label: '',
    price: '',
    destination: 'All',
    icon: '✨',
    desc: ''
  });
  const [studioSearch, setStudioSearch] = useState('');
  const [studioDestFilter, setStudioDestFilter] = useState('All_Filters');

  const filteredStudioAddons = useMemo(() => {
    const addons = settings.tripStudio?.addons || [];
    return addons.filter(addon => {
      const matchesSearch = !studioSearch.trim() || 
        addon.label.toLowerCase().includes(studioSearch.toLowerCase()) ||
        (addon.destination && addon.destination.toLowerCase().includes(studioSearch.toLowerCase()));
      const matchesDest = studioDestFilter === 'All_Filters' || addon.destination === studioDestFilter;
      return matchesSearch && matchesDest;
    });
  }, [settings.tripStudio?.addons, studioSearch, studioDestFilter]);

  // Update local state if settings change externally
  useEffect(() => {
    setSettings(siteSettingsService.getSettings());
  }, []);

  const showFeedback = (msg) => {
    if (onToast) onToast(msg);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleSave = async () => {
    await siteSettingsService.saveSettings(settings);
    showFeedback('✅ Settings saved in this browser & local dev disk!');
  };

  // 1-Click Live Worldwide Publishing to GitHub / Cloudflare
  const handlePublishWorldwide = async () => {
    setIsPublishing(true);
    showFeedback('🚀 Publishing to live website worldwide...');
    try {
      // 1. Save locally and to local dev disk first
      await siteSettingsService.saveSettings(settings);

      // 2. Publish to live site repository
      const res = await contentService.publishWorldwide({
        commitMessage: `Site & SEO Customizer Update: ${new Date().toLocaleString()}`
      });

      showFeedback(`🎉 Published Live Worldwide! ${res.message || 'Live site is updated for all visitors.'}`);
    } catch (err) {
      console.warn('[SiteCustomizer] Publish error:', err);
      showFeedback(`⚠️ Saved locally! Note: ${err.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all site customizations & SEO back to original brand defaults?')) {
      const reset = siteSettingsService.resetToDefaults();
      setSettings(reset);
      showFeedback('🔄 Restored all settings to brand defaults.');
    }
  };

  // Helper for live toasts management
  const handleToggleToasts = (enabled) => {
    setSettings(prev => ({
      ...prev,
      liveToasts: { ...prev.liveToasts, enabled }
    }));
  };

  const handleToastIntervalChange = (val) => {
    const num = Math.max(5, Math.min(60, Number(val) || 12));
    setSettings(prev => ({
      ...prev,
      liveToasts: { ...prev.liveToasts, intervalSeconds: num }
    }));
  };

  const handleAddBooking = (e) => {
    e?.preventDefault();
    if (!newBooking.name || !newBooking.tour) {
      alert('Please enter at least Guest Name and Tour Name.');
      return;
    }
    const item = {
      id: `b-${Date.now()}`,
      name: newBooking.name.trim(),
      from: newBooking.from.trim() || 'India',
      tour: newBooking.tour.trim(),
      time: newBooking.time.trim() || 'Few mins ago'
    };
    setSettings(prev => ({
      ...prev,
      liveToasts: {
        ...prev.liveToasts,
        bookings: [item, ...prev.liveToasts.bookings]
      }
    }));
    setNewBooking({ name: '', from: '', tour: '', time: 'Just now' });
    showFeedback('✨ New live booking alert added!');
  };

  const handleDeleteBooking = (id) => {
    setSettings(prev => ({
      ...prev,
      liveToasts: {
        ...prev.liveToasts,
        bookings: prev.liveToasts.bookings.filter(b => b.id !== id)
      }
    }));
  };

  const handlePreFillBooking = (preset) => {
    setNewBooking(preset);
  };

  // ── Trip Studio Mutation Handlers ──
  const handleAddStudioAddon = (e) => {
    e?.preventDefault();
    if (!newAddon.label.trim()) {
      alert('Please enter an Add-on Perk Name.');
      return;
    }
    const priceNum = Number(newAddon.price) || 0;
    if (priceNum <= 0) {
      alert('Please enter a valid price in ₹.');
      return;
    }

    const item = {
      id: `addon-${Date.now()}`,
      label: newAddon.label.trim(),
      price: priceNum,
      destination: newAddon.destination || 'All',
      icon: newAddon.icon || '✨',
      ...(newAddon.desc ? { desc: newAddon.desc.trim() } : {})
    };

    setSettings(prev => {
      const currentStudio = prev.tripStudio || {};
      const currentAddons = currentStudio.addons || [];
      return {
        ...prev,
        tripStudio: {
          ...currentStudio,
          addons: [...currentAddons, item]
        }
      };
    });

    setNewAddon({ label: '', price: '', destination: 'All', icon: '✨', desc: '' });
    showFeedback(`✨ Added VIP Add-on: "${item.label}" (+₹${item.price.toLocaleString('en-IN')})`);
  };

  const handleUpdateAddonPrice = (id, newPrice) => {
    const priceVal = Math.max(0, Number(newPrice) || 0);
    setSettings(prev => {
      const currentStudio = prev.tripStudio || {};
      const updatedAddons = (currentStudio.addons || []).map(a =>
        a.id === id ? { ...a, price: priceVal } : a
      );
      return {
        ...prev,
        tripStudio: {
          ...currentStudio,
          addons: updatedAddons
        }
      };
    });
  };

  const handleDeleteAddon = (id) => {
    setSettings(prev => {
      const currentStudio = prev.tripStudio || {};
      return {
        ...prev,
        tripStudio: {
          ...currentStudio,
          addons: (currentStudio.addons || []).filter(a => a.id !== id)
        }
      };
    });
    showFeedback('🗑️ Add-on removed.');
  };

  const handleUpdateHotelMultiplier = (tierId, multVal) => {
    const val = Math.max(0.5, Math.min(5.0, parseFloat(multVal) || 1.0));
    setSettings(prev => {
      const currentStudio = prev.tripStudio || {};
      const updated = (currentStudio.hotelTiers || []).map(h =>
        h.id === tierId ? { ...h, mult: val } : h
      );
      return {
        ...prev,
        tripStudio: { ...currentStudio, hotelTiers: updated }
      };
    });
  };

  const handleUpdateVehiclePrice = (vehicleId, priceVal) => {
    const val = Math.max(0, parseInt(priceVal) || 0);
    setSettings(prev => {
      const currentStudio = prev.tripStudio || {};
      const updated = (currentStudio.vehicles || []).map(v =>
        v.id === vehicleId ? { ...v, price: val } : v
      );
      return {
        ...prev,
        tripStudio: { ...currentStudio, vehicles: updated }
      };
    });
  };

  // Helper for Hero fields
  const handleHeroChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  // Helper for Page SEO fields
  const handlePageSeoChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      pageSeo: {
        ...prev.pageSeo,
        [selectedPage]: {
          ...(prev.pageSeo[selectedPage] || {}),
          [field]: value
        }
      }
    }));
  };

  // Helper for Brand authority fields
  const handleBrandChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      brandAuthority: { ...prev.brandAuthority, [field]: value }
    }));
  };

  const currentSeo = settings.pageSeo[selectedPage] || {
    metaTitle: '',
    metaDescription: '',
    focusKeyword: '',
    canonicalUrl: '',
    robotsIndex: true,
    robotsFollow: true,
    ogImage: '',
    aeoSummary: ''
  };

  const titleLength = (currentSeo.metaTitle || '').length;
  const descLength = (currentSeo.metaDescription || '').length;

  const getTitleStatus = () => {
    if (titleLength === 0) return { label: 'Empty', color: '#EF4444' };
    if (titleLength >= 45 && titleLength <= 65) return { label: 'Optimal (Google Perfect)', color: '#10B981' };
    if (titleLength < 45) return { label: 'A bit short', color: '#F59E0B' };
    return { label: 'Too long (Will truncate)', color: '#EF4444' };
  };

  const getDescStatus = () => {
    if (descLength === 0) return { label: 'Empty', color: '#EF4444' };
    if (descLength >= 130 && descLength <= 165) return { label: 'Optimal (Google Perfect)', color: '#10B981' };
    if (descLength < 130) return { label: 'A bit short', color: '#F59E0B' };
    return { label: 'Too long (Will truncate)', color: '#EF4444' };
  };

  const pageOptions = [
    { key: 'home', label: '🏠 Homepage (/)' },
    { key: 'about', label: '📖 About Us (/#/about)' },
    { key: 'blog', label: '📰 Travel Magazine (/#/blog)' },
    { key: 'landing-hub', label: '🌟 Campaign Hub (/#/landing-hub)' },
    { key: 'campaign-couple-honeymoon', label: '💍 Couple & Honeymoon Campaign' },
    { key: 'campaign-family-travel', label: '👨‍👩‍👧‍👦 Family Vacations Campaign' },
    { key: 'campaign-solo-travel', label: '🧭 Mindful Solo Travel Campaign' },
    { key: 'campaign-weekend-getaways', label: '🏖️ Weekend Getaways Campaign' },
    { key: 'campaign-india-packages', label: '🇮🇳 India Luxury Packages' },
    { key: 'campaign-international-packages', label: '✈️ International Tours' }
  ];

  return (
    <div className="site-customizer-root">
      {/* ═══ Customizer Sub-Nav ═══ */}
      <div className="customizer-subnav">
        <button
          className={`subnav-btn ${activeSubTab === 'studio' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('studio')}
        >
          <Compass size={16} />
          <span>Trip Studio & Add-ons</span>
          <span className="badge-count">{settings.tripStudio?.addons?.length || 0}</span>
        </button>

        <button
          className={`subnav-btn ${activeSubTab === 'toasts' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('toasts')}
        >
          <Sparkles size={16} />
          <span>Live Booking Popups</span>
          <span className="badge-count">{settings.liveToasts?.bookings?.length || 0}</span>
        </button>

        <button
          className={`subnav-btn ${activeSubTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('hero')}
        >
          <Sliders size={16} />
          <span>Homepage Hero & Headings</span>
        </button>

        <button
          className={`subnav-btn ${activeSubTab === 'seo' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('seo')}
        >
          <Search size={16} />
          <span>Page SEO & AEO/GEO Studio</span>
        </button>

        <button
          className={`subnav-btn ${activeSubTab === 'brand' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('brand')}
        >
          <ShieldCheck size={16} />
          <span>Brand Authority (AI Entities)</span>
        </button>

        <div className="subnav-actions">
          <button className="btn-secondary btn-sm" onClick={handleResetDefaults} title="Reset to brand defaults">
            <RefreshCw size={14} />
            <span>Reset</span>
          </button>
          <button className="btn-secondary btn-sm" onClick={handleSave} title="Save in browser">
            <Save size={14} />
            <span>Save Locally</span>
          </button>
          <button
            className="btn-primary btn-sm save-all-btn"
            onClick={handlePublishWorldwide}
            disabled={isPublishing}
            title="Publish live to GitHub / Cloudflare for all visitors worldwide"
          >
            {isPublishing ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
            <span>{isPublishing ? 'Publishing...' : '🚀 Publish Live (Worldwide)'}</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SUB-TAB 0: TRIP STUDIO & DESTINATION-SPECIFIC ADD-ONS
          ══════════════════════════════════════════════════════ */}
      {activeSubTab === 'studio' && (
        <div className="customizer-pane animate-fade-in">
          <div className="pane-header-box">
            <div>
              <h3 className="pane-title">🧭 Trip Studio & Destination Add-ons Manager</h3>
              <p className="pane-desc">
                Add and customize destination-specific perks (e.g. Shikara in Kashmir, Floating breakfast in Bali, Desert safari in Dubai), 
                and update live prices in real time. Changes immediately update the homepage Trip Studio and publish worldwide with 1 click.
              </p>
            </div>
            <div className="toggle-lockup">
              <span className="toggle-label">Trip Studio Status:</span>
              <label className="switch-pill">
                <input
                  type="checkbox"
                  checked={settings.tripStudio?.enabled !== false}
                  onChange={(e) => {
                    const enabled = e.target.checked;
                    setSettings(prev => ({
                      ...prev,
                      tripStudio: { ...(prev.tripStudio || {}), enabled }
                    }));
                  }}
                />
                <span className="slider-pill round" />
              </label>
              <span className={`status-badge-text ${settings.tripStudio?.enabled !== false ? 'text-green' : 'text-gray'}`}>
                {settings.tripStudio?.enabled !== false ? 'ACTIVE ON SITE' : 'DISABLED'}
              </span>
            </div>
          </div>

          {/* Form: Add New VIP Perk */}
          <div className="studio-cms-add-card">
            <h4 className="section-subtitle">
              <Plus size={16} className="text-amber" />
              <span>Add New Luxury Perk / Destination Add-on</span>
            </h4>
            <form onSubmit={handleAddStudioAddon} className="studio-add-form-grid">
              <div className="input-group">
                <label>Perk Title / Experience Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Private Sunset Yacht & Champagne Cruise"
                  value={newAddon.label}
                  onChange={(e) => setNewAddon({ ...newAddon, label: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label>Extra Price (₹ INR Per Person / Couple) *</label>
                <input
                  type="number"
                  placeholder="e.g. 4500"
                  value={newAddon.price}
                  onChange={(e) => setNewAddon({ ...newAddon, price: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label>Destination Filter (Where to show this add-on?)</label>
                <select
                  value={newAddon.destination}
                  onChange={(e) => setNewAddon({ ...newAddon, destination: e.target.value })}
                >
                  <option value="All">🌐 All Destinations (Universal Perk)</option>
                  <option value="Kashmir">🏔️ Kashmir (Srinagar, Gulmarg, Pahalgam)</option>
                  <option value="Bali">🌴 Bali (Ubud, Seminyak, Nusa Penida)</option>
                  <option value="Dubai">🏙️ Dubai (Marina, Desert, Downtown)</option>
                  <option value="Kerala">⛵ Kerala (Alleppey, Munnar, Kovalam)</option>
                  <option value="Andaman">🤿 Andaman (Havelock, Neil, Port Blair)</option>
                  <option value="Himachal">❄️ Himachal (Manali, Shimla, Dalhousie)</option>
                  <option value="Rajasthan">🏰 Rajasthan (Jaipur, Udaipur, Jodhpur)</option>
                  <option value="Goa">🏖️ Goa (North & South Goa)</option>
                  <option value="Karnataka">🌿 Karnataka (Coorg, Kabini, Chikmagalur)</option>
                  <option value="MP">🐅 Madhya Pradesh (Jabalpur, Khajuraho, Bandhavgarh)</option>
                  <option value="Thailand">🇹🇭 Thailand (Phuket, Krabi, Bangkok)</option>
                  <option value="Singapore">🦁 Singapore</option>
                  <option value="Europe">🏰 Europe / Switzerland</option>
                </select>
              </div>

              <div className="input-group">
                <label>Icon / Emoji</label>
                <div className="emoji-picker-row">
                  <input
                    type="text"
                    style={{ width: '60px', textAlign: 'center', fontSize: '1.25rem' }}
                    value={newAddon.icon}
                    onChange={(e) => setNewAddon({ ...newAddon, icon: e.target.value })}
                    maxLength={3}
                  />
                  <div className="emoji-quick-picks">
                    {['🛶', '🚠', '🍳', '🕯️', '🏜️', '🏙️', '⛵', '🤿', '🪂', '🥂', '🚁', '💆', '🎟️', '📸', '🐘', '🚤'].map(em => (
                      <button
                        key={em}
                        type="button"
                        className="emoji-mini-btn"
                        onClick={() => setNewAddon({ ...newAddon, icon: em })}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="input-group full-width">
                <label>Short Inclusions / Description (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Includes private roundtrip chauffeur transfer, VIP lane access, and souvenir video."
                  value={newAddon.desc}
                  onChange={(e) => setNewAddon({ ...newAddon, desc: e.target.value })}
                />
              </div>

              <div className="form-submit-row">
                <button type="submit" className="btn-primary">
                  <Plus size={16} />
                  <span>Add Perk to Trip Studio</span>
                </button>
              </div>
            </form>
          </div>

          {/* Manage Existing Add-ons */}
          <div className="studio-addons-manager-card">
            <div className="manager-toolbar">
              <div className="toolbar-left">
                <h4 className="section-subtitle">
                  <Tag size={16} className="text-amber" />
                  <span>Active Add-ons Master Catalog ({filteredStudioAddons.length})</span>
                </h4>
                <p className="subtext">
                  Directly edit prices below in real-time. Changes save locally and publish live worldwide with 1 click.
                </p>
              </div>

              <div className="toolbar-filters">
                <div className="search-pill-box">
                  <Search size={14} className="text-gray" />
                  <input
                    type="text"
                    placeholder="Search perks..."
                    value={studioSearch}
                    onChange={(e) => setStudioSearch(e.target.value)}
                  />
                </div>

                <select
                  value={studioDestFilter}
                  onChange={(e) => setStudioDestFilter(e.target.value)}
                  className="filter-dest-select"
                >
                  <option value="All_Filters">Filter: All Destinations</option>
                  <option value="All">🌐 Universal (All Places)</option>
                  <option value="Kashmir">🏔️ Kashmir</option>
                  <option value="Bali">🌴 Bali</option>
                  <option value="Dubai">🏙️ Dubai</option>
                  <option value="Kerala">⛵ Kerala</option>
                  <option value="Andaman">🤿 Andaman</option>
                  <option value="Himachal">❄️ Himachal</option>
                  <option value="Rajasthan">🏰 Rajasthan</option>
                  <option value="Goa">🏖️ Goa</option>
                  <option value="Karnataka">🌿 Karnataka</option>
                  <option value="MP">🐅 MP</option>
                </select>
              </div>
            </div>

            {/* Addons List Grid */}
            <div className="addons-admin-grid">
              {filteredStudioAddons.map((addon) => (
                <div key={addon.id} className="addon-admin-item">
                  <div className="addon-icon-badge">{addon.icon || '✨'}</div>
                  <div className="addon-info">
                    <div className="addon-top-row">
                      <span className="addon-title">{addon.label}</span>
                      <span className={`dest-tag-badge ${addon.destination === 'All' ? 'badge-universal' : 'badge-dest'}`}>
                        {addon.destination === 'All' ? '🌐 All Places' : addon.destination}
                      </span>
                    </div>
                    {addon.desc && <p className="addon-desc-text">{addon.desc}</p>}
                  </div>

                  <div className="addon-pricing-actions">
                    <div className="price-input-wrap">
                      <span className="currency-prefix">₹</span>
                      <input
                        type="number"
                        className="inline-price-input"
                        value={addon.price}
                        onChange={(e) => handleUpdateAddonPrice(addon.id, e.target.value)}
                        title="Edit price in INR"
                      />
                    </div>
                    <button
                      type="button"
                      className="btn-trash-icon"
                      onClick={() => handleDeleteAddon(addon.id)}
                      title="Remove this add-on"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hotel & Vehicle Standards Multipliers */}
          <div className="grid-two-cols" style={{ marginTop: '1.5rem' }}>
            {/* Hotel Standards */}
            <div className="studio-card-box">
              <h4 className="section-subtitle">
                <Hotel size={16} className="text-amber" />
                <span>Accommodation Star Multipliers</span>
              </h4>
              <p className="subtext">Multiplier applied to base tour per-night stay rate.</p>
              <div className="multiplier-list">
                {(settings.tripStudio?.hotelTiers || []).map((h) => (
                  <div key={h.id} className="multiplier-row">
                    <div>
                      <strong>{h.label}</strong>
                      <span className="desc-sub">{h.desc}</span>
                    </div>
                    <div className="multiplier-input-wrap">
                      <input
                        type="number"
                        step="0.05"
                        min="0.5"
                        max="5.0"
                        value={h.mult}
                        onChange={(e) => handleUpdateHotelMultiplier(h.id, e.target.value)}
                      />
                      <span>× Multiplier</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Fleet */}
            <div className="studio-card-box">
              <h4 className="section-subtitle">
                <Car size={16} className="text-amber" />
                <span>Private Transport Fleet Base Rates (₹/Day)</span>
              </h4>
              <p className="subtext">Chauffeur day-rate factored into total itinerary estimation.</p>
              <div className="multiplier-list">
                {(settings.tripStudio?.vehicles || []).map((v) => (
                  <div key={v.id} className="multiplier-row">
                    <div>
                      <strong>{v.label}</strong>
                      <span className="desc-sub">{v.capacity} • {v.desc}</span>
                    </div>
                    <div className="multiplier-input-wrap">
                      <span className="currency-prefix">₹</span>
                      <input
                        type="number"
                        step="100"
                        min="500"
                        value={v.price}
                        onChange={(e) => handleUpdateVehiclePrice(v.id, e.target.value)}
                      />
                      <span>/ day</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          SUB-TAB 1: LIVE BOOKING TOASTS POPUP (Social Proof)
          ══════════════════════════════════════════════════════ */}
      {activeSubTab === 'toasts' && (
        <div className="customizer-pane animate-fade-in">
          <div className="pane-header-box">
            <div>
              <h3 className="pane-title">🔔 Recent Booking Social Proof Notifications</h3>
              <p className="pane-desc">
                Control the real-time booking alert that pops up in the bottom-left corner of the website. 
                Add real customer bookings to build trust and urgency for travelers.
              </p>
            </div>
            <div className="toggle-lockup">
              <span className="toggle-label">Popup Status:</span>
              <label className="switch-pill">
                <input
                  type="checkbox"
                  checked={settings.liveToasts.enabled}
                  onChange={(e) => handleToggleToasts(e.target.checked)}
                />
                <span className="slider-pill round" />
              </label>
              <span className={`status-badge-text ${settings.liveToasts.enabled ? 'text-green' : 'text-gray'}`}>
                {settings.liveToasts.enabled ? 'ACTIVE ON SITE' : 'MUTED / DISABLED'}
              </span>
            </div>
          </div>

          <div className="grid-two-cols">
            {/* Left: Live Interactive Preview */}
            <div className="preview-card-section">
              <h4 className="section-subtitle">📱 Live Visual Preview (How travelers see it)</h4>
              <p className="section-note">Pops up in the bottom left, cycling through your active bookings.</p>
              
              <div className="live-toast-preview-container">
                <div className="mock-screen-bg">
                  <div className="live-toast-card-preview">
                    <div className="toast-icon-pulse">
                      <Sparkles size={16} style={{ color: '#FFB800' }} />
                    </div>
                    <div className="toast-text-block">
                      <div className="toast-top-row">
                        <span className="user-info">
                          <strong>{settings.liveToasts.bookings[0]?.name || 'Dr. Sanjeev Kapoor'}</strong> from {settings.liveToasts.bookings[0]?.from || 'Indore'}
                        </span>
                        <span className="time-ago">{settings.liveToasts.bookings[0]?.time || '14 mins ago'}</span>
                      </div>
                      <p className="tour-booked">
                        <CheckCircle2 size={13} style={{ color: '#FF892F' }} />
                        <span>Booked <strong>{settings.liveToasts.bookings[0]?.tour || 'Swiss Alps & Titlis Glacier Pass'}</strong></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timing Controls */}
              <div className="timing-controls-card">
                <label className="field-label">Display Cycle Interval (Seconds)</label>
                <div className="slider-row">
                  <input
                    type="range"
                    min="6"
                    max="30"
                    step="1"
                    value={settings.liveToasts.intervalSeconds}
                    onChange={(e) => handleToastIntervalChange(e.target.value)}
                  />
                  <span className="interval-value-pill">{settings.liveToasts.intervalSeconds} seconds</span>
                </div>
                <span className="field-hint">A booking notification appears, stays visible for 6s, then cycles to the next traveler after {settings.liveToasts.intervalSeconds}s.</span>
              </div>

              {/* Quick Preset Generators */}
              <div className="preset-suggestions">
                <label className="field-label">⚡ 1-Click Popular Booking Presets</label>
                <div className="preset-pill-group">
                  <button
                    type="button"
                    className="preset-btn"
                    onClick={() => handlePreFillBooking({ name: 'Rahul & Sneha', from: 'Bhopal', tour: 'Kashmir Luxury Pines & Houseboat', time: '5 mins ago' })}
                  >
                    + Kashmir Honeymoon
                  </button>
                  <button
                    type="button"
                    className="preset-btn"
                    onClick={() => handlePreFillBooking({ name: 'Mehta Family (6 Guests)', from: 'Indore', tour: 'Kedarnath VIP Helicopter Darshan', time: '12 mins ago' })}
                  >
                    + Kedarnath Yatra
                  </button>
                  <button
                    type="button"
                    className="preset-btn"
                    onClick={() => handlePreFillBooking({ name: 'Vikram & Friends', from: 'Delhi', tour: 'Bali 7-Day Private Pool Villa', time: '20 mins ago' })}
                  >
                    + Bali Villa Escape
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Add New & Existing List */}
            <div className="bookings-management-section">
              <h4 className="section-subtitle">➕ Add Real Customer Booking</h4>
              <form onSubmit={handleAddBooking} className="add-booking-form">
                <div className="form-row-2">
                  <div className="field-group">
                    <label>Guest / Family Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Sanjeev Kapoor or Sharma Family"
                      value={newBooking.name}
                      onChange={(e) => setNewBooking(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <label>City / Location *</label>
                    <input
                      type="text"
                      placeholder="e.g. Indore, Bhopal, Mumbai"
                      value={newBooking.from}
                      onChange={(e) => setNewBooking(prev => ({ ...prev, from: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="field-group">
                    <label>Tour Package Booked *</label>
                    <input
                      type="text"
                      placeholder="e.g. Swiss Alps & Glacier Express Pass"
                      value={newBooking.tour}
                      onChange={(e) => setNewBooking(prev => ({ ...prev, tour: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <label>Time Ago Display</label>
                    <input
                      type="text"
                      placeholder="e.g. 14 mins ago, 2 hours ago"
                      value={newBooking.time}
                      onChange={(e) => setNewBooking(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full">
                  <Plus size={16} />
                  <span>Add To Live Feed</span>
                </button>
              </form>

              {/* Active Bookings List */}
              <h4 className="section-subtitle mt-6">
                📋 Active Booking Alerts ({settings.liveToasts.bookings.length})
              </h4>
              <div className="active-bookings-list">
                {settings.liveToasts.bookings.map((booking, idx) => (
                  <div key={booking.id || idx} className="booking-list-item">
                    <div className="booking-item-left">
                      <span className="booking-index">#{idx + 1}</span>
                      <div>
                        <div className="booking-user-title">
                          <strong>{booking.name}</strong> from <span className="city-pill">{booking.from}</span>
                        </div>
                        <div className="booking-tour-desc">
                          Booked: <span>{booking.tour}</span> • <em className="text-gray">{booking.time}</em>
                        </div>
                      </div>
                    </div>
                    <button
                      className="delete-item-btn"
                      onClick={() => handleDeleteBooking(booking.id)}
                      title="Delete this alert"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          SUB-TAB 2: HOMEPAGE HERO & HEADINGS
          ══════════════════════════════════════════════════════ */}
      {activeSubTab === 'hero' && (
        <div className="customizer-pane animate-fade-in">
          <div className="pane-header-box">
            <div>
              <h3 className="pane-title">✨ Homepage Hero, Headings & Media</h3>
              <p className="pane-desc">
                Customize your primary homepage headline, subheadings, background drone video, top announcement banner, and instant concierge numbers.
              </p>
            </div>
          </div>

          <div className="grid-two-cols">
            {/* Left: Text & Headings */}
            <div className="hero-fields-left">
              <h4 className="section-subtitle">🎯 Main Brand Headline & Hook</h4>

              <div className="field-group">
                <label>Primary Headline (White Text)</label>
                <input
                  type="text"
                  value={settings.hero.headlineMain}
                  onChange={(e) => handleHeroChange('headlineMain', e.target.value)}
                  placeholder="YOUR JOURNEY"
                />
              </div>

              <div className="field-group">
                <label>Highlight Tagline (Orange Glowing Text)</label>
                <input
                  type="text"
                  value={settings.hero.headlineHighlight}
                  onChange={(e) => handleHeroChange('headlineHighlight', e.target.value)}
                  placeholder="Your Comfort!"
                />
              </div>

              <div className="field-group">
                <label>Sub-headline Description (Below Headings)</label>
                <textarea
                  rows={3}
                  value={settings.hero.subheadline}
                  onChange={(e) => handleHeroChange('subheadline', e.target.value)}
                  placeholder="Explore 2,000+ handpicked journeys by Continents, Weather & Season, or Personalized Style"
                />
              </div>

              <div className="field-group">
                <label>Question Heading (Above Discovery Gateways)</label>
                <input
                  type="text"
                  value={settings.hero.questionHeading || ''}
                  onChange={(e) => handleHeroChange('questionHeading', e.target.value)}
                  placeholder="How Do You Want to Travel?"
                />
                <span className="field-hint">Heading text right above Continents, Weather & Season tabs.</span>
              </div>

              <h4 className="section-subtitle mt-6">📢 Seasonal Announcement Bar</h4>
              <div className="field-group">
                <div className="toggle-inline">
                  <input
                    type="checkbox"
                    id="announcementToggle"
                    checked={settings.hero.announcementActive}
                    onChange={(e) => handleHeroChange('announcementActive', e.target.checked)}
                  />
                  <label htmlFor="announcementToggle" className="cursor-pointer">Show top announcement banner</label>
                </div>
              </div>

              <div className="form-row-2">
                <div className="field-group">
                  <label>Announcement Badge</label>
                  <input
                    type="text"
                    value={settings.hero.announcementBadge}
                    onChange={(e) => handleHeroChange('announcementBadge', e.target.value)}
                    placeholder="2026 Signature"
                  />
                </div>
                <div className="field-group">
                  <label>Announcement Message</label>
                  <input
                    type="text"
                    value={settings.hero.announcementText}
                    onChange={(e) => handleHeroChange('announcementText', e.target.value)}
                    placeholder="🌸 Early Bird Specials: Flat 20% Off on Summer 2026 Tours!"
                  />
                </div>
              </div>
            </div>

            {/* Right: Media & Contact Concierge */}
            <div className="hero-fields-right">
              <h4 className="section-subtitle">🎥 Background Video & Media</h4>

              <div className="field-group">
                <label>Ambient Background Video URL (.mp4)</label>
                <input
                  type="text"
                  value={settings.hero.bgVideoUrl}
                  onChange={(e) => handleHeroChange('bgVideoUrl', e.target.value)}
                  placeholder="https://...mp4"
                />
                <span className="field-hint">High-definition drone footage that loops quietly behind the hero.</span>
              </div>

              <div className="field-group">
                <label>Video Poster Image (Fallback if video is offline)</label>
                <input
                  type="text"
                  value={settings.hero.videoPoster}
                  onChange={(e) => handleHeroChange('videoPoster', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <h4 className="section-subtitle mt-6">📞 Concierge Hotline & WhatsApp</h4>
              <div className="form-row-2">
                <div className="field-group">
                  <label>Primary Phone Hotline</label>
                  <input
                    type="text"
                    value={settings.hero.supportPhone}
                    onChange={(e) => handleHeroChange('supportPhone', e.target.value)}
                    placeholder="+91 8770403315"
                  />
                </div>
                <div className="field-group">
                  <label>WhatsApp Number (without +)</label>
                  <input
                    type="text"
                    value={settings.hero.whatsappNumber}
                    onChange={(e) => handleHeroChange('whatsappNumber', e.target.value)}
                    placeholder="918770403315"
                  />
                </div>
              </div>

              <div className="field-group">
                <label>Default WhatsApp Pre-filled Message</label>
                <textarea
                  rows={2}
                  value={settings.hero.whatsappDefaultMessage}
                  onChange={(e) => handleHeroChange('whatsappDefaultMessage', e.target.value)}
                  placeholder="Hi Comfort Journey! I'm planning a bespoke luxury trip..."
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          SUB-TAB 3: PAGE SEO & AEO/GEO STUDIO
          ══════════════════════════════════════════════════════ */}
      {activeSubTab === 'seo' && (
        <div className="customizer-pane animate-fade-in">
          <div className="pane-header-box">
            <div>
              <h3 className="pane-title">🔍 2026 Page-by-Page SEO & AI Discovery Studio</h3>
              <p className="pane-desc">
                Fine-tune titles, meta descriptions, canonical URLs, and robots directives for Google search and AI answer engines (ChatGPT, Perplexity, Google AI Overviews).
              </p>
            </div>

            {/* Page Selector */}
            <div className="page-selector-lockup">
              <label>Select Page to Edit:</label>
              <select
                className="page-select-dropdown"
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
              >
                {pageOptions.map(p => (
                  <option key={p.key} value={p.key}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid-two-cols">
            {/* Left: Input Fields */}
            <div className="seo-inputs-column">
              {/* Meta Title */}
              <div className="field-group">
                <div className="label-with-badge">
                  <label>Meta Title Tag (Google Headline) *</label>
                  <span className="length-badge" style={{ color: getTitleStatus().color }}>
                    {titleLength} chars • {getTitleStatus().label}
                  </span>
                </div>
                <input
                  type="text"
                  value={currentSeo.metaTitle || ''}
                  onChange={(e) => handlePageSeoChange('metaTitle', e.target.value)}
                  placeholder="Comfort Journey | Tour Packages Worldwide | Since 1992"
                />
                <span className="field-hint">Optimal length: 50–60 characters. Place your strongest keyword near the beginning.</span>
              </div>

              {/* Meta Description */}
              <div className="field-group">
                <div className="label-with-badge">
                  <label>Meta Description (Search Snippet) *</label>
                  <span className="length-badge" style={{ color: getDescStatus().color }}>
                    {descLength} chars • {getDescStatus().label}
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={currentSeo.metaDescription || ''}
                  onChange={(e) => handlePageSeoChange('metaDescription', e.target.value)}
                  placeholder="Comfort Journey is a trusted luxury travel agency with 30+ years of expertise. Tailored holidays, 5★ stays, private chauffeurs & 24/7 care..."
                />
                <span className="field-hint">Optimal length: 140–160 characters. Include clear benefits and a call-to-action.</span>
              </div>

              {/* Keywords & Intent */}
              <div className="form-row-2">
                <div className="field-group">
                  <label>Focus Keyword Target</label>
                  <input
                    type="text"
                    value={currentSeo.focusKeyword || ''}
                    onChange={(e) => handlePageSeoChange('focusKeyword', e.target.value)}
                    placeholder="e.g. luxury tour packages"
                  />
                </div>
                <div className="field-group">
                  <label>Search Intent Type</label>
                  <select
                    value={currentSeo.searchIntent || 'Commercial'}
                    onChange={(e) => handlePageSeoChange('searchIntent', e.target.value)}
                  >
                    <option value="Commercial">Commercial (Comparing holiday packages)</option>
                    <option value="Transactional">Transactional (Ready to book)</option>
                    <option value="Informational">Informational (Guides & advice)</option>
                    <option value="Navigational">Navigational (Brand searches)</option>
                  </select>
                </div>
              </div>

              {/* Canonical URL & Robots Directives */}
              <div className="form-row-2">
                <div className="field-group">
                  <label>Canonical URL</label>
                  <input
                    type="text"
                    value={currentSeo.canonicalUrl || ''}
                    onChange={(e) => handlePageSeoChange('canonicalUrl', e.target.value)}
                    placeholder="https://www.comfortjourneyy.com/..."
                  />
                </div>
                <div className="field-group">
                  <label>Robots Indexing</label>
                  <select
                    value={currentSeo.robotsIndex ? 'index' : 'noindex'}
                    onChange={(e) => handlePageSeoChange('robotsIndex', e.target.value === 'index')}
                  >
                    <option value="index">🟢 Index & Follow (Rank in Search)</option>
                    <option value="noindex">🔴 Noindex (Hide from Search Engines)</option>
                  </select>
                </div>
              </div>

              {/* OpenGraph Image */}
              <div className="field-group">
                <label>OpenGraph Social Share Image URL</label>
                <input
                  type="text"
                  value={currentSeo.ogImage || ''}
                  onChange={(e) => handlePageSeoChange('ogImage', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                />
                <span className="field-hint">Preview image displayed when link is shared on WhatsApp, Facebook, or LinkedIn (1200x630px recommended).</span>
              </div>

              {/* 2026 AEO AI Summary */}
              <div className="field-group">
                <label>🤖 2026 AEO Engine Summary (For ChatGPT & Perplexity Citations)</label>
                <textarea
                  rows={2}
                  value={currentSeo.aeoSummary || ''}
                  onChange={(e) => handlePageSeoChange('aeoSummary', e.target.value)}
                  placeholder="Clear factual summary about Comfort Journey that AI models quote directly when answering traveler queries..."
                />
              </div>
            </div>

            {/* Right: Live Google & Social Preview */}
            <div className="seo-previews-column">
              <div className="preview-mode-switch">
                <span className="preview-label">Live Google Snippet Preview</span>
                <div className="btn-group-toggle">
                  <button
                    className={`toggle-icon-btn ${serpViewMode === 'desktop' ? 'active' : ''}`}
                    onClick={() => setSerpViewMode('desktop')}
                    title="Desktop Preview"
                  >
                    <Laptop size={14} /> Desktop
                  </button>
                  <button
                    className={`toggle-icon-btn ${serpViewMode === 'mobile' ? 'active' : ''}`}
                    onClick={() => setSerpViewMode('mobile')}
                    title="Mobile Preview"
                  >
                    <Smartphone size={14} /> Mobile
                  </button>
                </div>
              </div>

              {/* Google SERP Card */}
              <div className={`google-serp-mock ${serpViewMode}`}>
                <div className="serp-site-info">
                  <img
                    src="https://static.wixstatic.com/media/43df74_c248c4fdb5bf421aa3465ca1f6846ba0~mv2.jpg"
                    alt="Favicon"
                    className="serp-favicon"
                  />
                  <div>
                    <span className="serp-brand-name">Comfort Journey</span>
                    <span className="serp-url-display">{currentSeo.canonicalUrl || 'https://www.comfortjourneyy.com'}</span>
                  </div>
                </div>
                <h4 className="serp-title">{currentSeo.metaTitle || 'Comfort Journey | Tour Packages Worldwide'}</h4>
                <p className="serp-description">
                  {currentSeo.metaDescription || 'Comfort Journey is a trusted luxury travel agency with 30+ years of expertise based in Bhopal. Tailored holidays, 5★ stays, and 24/7 care.'}
                </p>
                <div className="serp-rating-strip">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">Rating: 4.9 · 1,480+ reviews · 30+ Years in Business</span>
                </div>
              </div>

              {/* WhatsApp / Social Card Preview */}
              <h4 className="section-subtitle mt-6">💬 WhatsApp & Social Share Preview</h4>
              <div className="social-card-mock">
                {currentSeo.ogImage ? (
                  <div
                    className="social-image-header"
                    style={{ backgroundImage: `url(${currentSeo.ogImage})` }}
                  />
                ) : (
                  <div className="social-image-placeholder">
                    <Share2 size={24} />
                    <span>No image set (Uses default hero image)</span>
                  </div>
                )}
                <div className="social-card-content">
                  <span className="social-card-domain">comfortjourneyy.com</span>
                  <h5 className="social-card-title">{currentSeo.metaTitle || 'Comfort Journey Luxury Holidays'}</h5>
                  <p className="social-card-desc">{currentSeo.metaDescription || 'Handcrafting bespoke luxury vacations worldwide since 1992.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          SUB-TAB 4: BRAND TRUST & GEO (AI ENTITY FACTS)
          ══════════════════════════════════════════════════════ */}
      {activeSubTab === 'brand' && (
        <div className="customizer-pane animate-fade-in">
          <div className="pane-header-box">
            <div>
              <h3 className="pane-title">🏛️ Brand Authority & Verified Factual Knowledge (GEO)</h3>
              <p className="pane-desc">
                In 2026, AI search engines (ChatGPT Search, Perplexity, Gemini, Claude) crawl structured entities to verify your agency's credibility and experience.
              </p>
            </div>
          </div>

          <div className="grid-two-cols">
            <div className="brand-fields-left">
              <h4 className="section-subtitle">🏢 Verified Business Entity Data</h4>
              
              <div className="form-row-2">
                <div className="field-group">
                  <label>Brand Name</label>
                  <input
                    type="text"
                    value={settings.brandAuthority.brandName}
                    onChange={(e) => handleBrandChange('brandName', e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Founding Year</label>
                  <input
                    type="text"
                    value={settings.brandAuthority.foundingYear}
                    onChange={(e) => handleBrandChange('foundingYear', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="field-group">
                  <label>Destinations Covered</label>
                  <input
                    type="text"
                    value={settings.brandAuthority.destinationsCount}
                    onChange={(e) => handleBrandChange('destinationsCount', e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Travelers Served</label>
                  <input
                    type="text"
                    value={settings.brandAuthority.travelersServed}
                    onChange={(e) => handleBrandChange('travelersServed', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="field-group">
                  <label>Customer Rating</label>
                  <input
                    type="text"
                    value={settings.brandAuthority.averageRating}
                    onChange={(e) => handleBrandChange('averageRating', e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label>Total Reviews Count</label>
                  <input
                    type="text"
                    value={settings.brandAuthority.reviewCount}
                    onChange={(e) => handleBrandChange('reviewCount', e.target.value)}
                  />
                </div>
              </div>

              <div className="field-group">
                <label>Official Headquarters & Address</label>
                <input
                  type="text"
                  value={settings.brandAuthority.postalAddress}
                  onChange={(e) => handleBrandChange('postalAddress', e.target.value)}
                />
              </div>
            </div>

            <div className="brand-fields-right">
              <h4 className="section-subtitle">🧠 AI Core Entity Directive (GEO Optimization)</h4>
              <p className="field-hint">
                This canonical description is automatically placed inside your Schema.org/TravelAgency JSON-LD script, 
                instructing AI web indexers on how to describe Comfort Journey.
              </p>

              <div className="field-group">
                <textarea
                  rows={5}
                  value={settings.brandAuthority.aiCorePhilosophy}
                  onChange={(e) => handleBrandChange('aiCorePhilosophy', e.target.value)}
                />
              </div>

              <div className="schema-code-preview">
                <div className="code-header">
                  <span>Structured Schema.org Generator Output (Live)</span>
                  <span className="badge-valid">JSON-LD Valid</span>
                </div>
                <pre className="code-block">
{`{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "${settings.brandAuthority.brandName}",
  "foundingDate": "${settings.brandAuthority.foundingYear}",
  "address": "${settings.brandAuthority.postalAddress}",
  "aggregateRating": {
    "ratingValue": "${settings.brandAuthority.averageRating}",
    "reviewCount": "${settings.brandAuthority.reviewCount}"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Floating Bottom Save Bar ═══ */}
      <div className="customizer-bottom-bar">
        <div className="bottom-bar-left">
          <span className="text-gray text-sm">
            💡 Click <strong>Save Locally</strong> to test in your browser, or <strong>Publish Live (Worldwide)</strong> to push changes to the live site on GitHub.
          </span>
        </div>
        <div className="bottom-bar-actions">
          <button className="btn-secondary" onClick={handleResetDefaults}>
            <RefreshCw size={15} />
            <span>Reset Defaults</span>
          </button>
          <button className="btn-secondary" onClick={handleSave}>
            <Save size={15} />
            <span>Save Locally</span>
          </button>
          <button
            className={`btn-primary ${isSaved ? 'btn-success-flash' : ''}`}
            onClick={handlePublishWorldwide}
            disabled={isPublishing}
          >
            {isPublishing ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
            <span>{isPublishing ? 'Publishing Live to GitHub...' : '🚀 Publish Live (Worldwide)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
