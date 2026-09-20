// =========================================================================
// COMFORT JOURNEY — SITE SETTINGS & SEO/AEO/GEO SERVICE
// Manages reactive Homepage Hero, Live Booking Toasts, Brand Facts,
// and Per-Page Search Engine Optimization across all pages.
// =========================================================================

import { DEFAULT_SITE_SETTINGS } from '../data/defaultSiteSettings';

export const STORAGE_KEY_SITE_SETTINGS = 'cj_site_settings_v2';
export const EVENT_SETTINGS_UPDATED = 'cj_site_settings_updated';

let activeSettings = null;

// Determine if we are in local development
function isLocalDev() {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.') || host.startsWith('10.');
}

// Initialize active settings from localStorage or defaults
function initSettings() {
  if (activeSettings) return activeSettings;

  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SITE_SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge with defaults to ensure all keys exist
        activeSettings = {
          ...DEFAULT_SITE_SETTINGS,
          ...parsed,
          hero: { ...DEFAULT_SITE_SETTINGS.hero, ...(parsed.hero || {}) },
          liveToasts: { ...DEFAULT_SITE_SETTINGS.liveToasts, ...(parsed.liveToasts || {}) },
          brandAuthority: { ...DEFAULT_SITE_SETTINGS.brandAuthority, ...(parsed.brandAuthority || {}) },
          pageSeo: { ...DEFAULT_SITE_SETTINGS.pageSeo, ...(parsed.pageSeo || {}) }
        };
        return activeSettings;
      }
    } catch (err) {
      console.warn('[SiteSettingsService] Failed to parse localStorage settings:', err);
    }
  }

  activeSettings = JSON.parse(JSON.stringify(DEFAULT_SITE_SETTINGS));
  return activeSettings;
}

// Broadcast event so UI re-renders instantaneously without page reload
function broadcastSettingsUpdated(settings) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(EVENT_SETTINGS_UPDATED, { detail: settings }));
}

export const siteSettingsService = {
  // Get all settings
  getSettings() {
    return initSettings();
  },

  // Get Hero section settings
  getHero() {
    return this.getSettings().hero || DEFAULT_SITE_SETTINGS.hero;
  },

  // Get Live booking toast notifications
  getLiveToasts() {
    return this.getSettings().liveToasts || DEFAULT_SITE_SETTINGS.liveToasts;
  },

  // Get Brand trust facts for GEO (Generative AI search)
  getBrandAuthority() {
    return this.getSettings().brandAuthority || DEFAULT_SITE_SETTINGS.brandAuthority;
  },

  // Get SEO configuration for a specific page (e.g. 'home', 'about', 'blog')
  getPageSeo(pageKey = 'home') {
    const settings = this.getSettings();
    const pageData = settings.pageSeo?.[pageKey];
    if (pageData) return pageData;

    // Fallback: Check if it's a campaign page
    if (pageKey.startsWith('campaign-')) {
      return {
        metaTitle: `${pageKey.replace('campaign-', '').replace(/-/g, ' ').toUpperCase()} Tour Packages | Comfort Journey`,
        metaDescription: `Discover handcrafted ${pageKey.replace('campaign-', '').replace(/-/g, ' ')} vacation packages with 5-star stays and private chauffeurs.`,
        focusKeyword: `${pageKey.replace('campaign-', '').replace(/-/g, ' ')} tour packages`,
        canonicalUrl: `https://www.comfortjourneyy.com/#/campaign/${pageKey.replace('campaign-', '')}`,
        robotsIndex: true,
        robotsFollow: true,
        searchIntent: "Transactional"
      };
    }

    return settings.pageSeo?.home || DEFAULT_SITE_SETTINGS.pageSeo.home;
  },

  // Save all settings to localStorage & broadcast
  async saveSettings(newSettings) {
    activeSettings = {
      ...this.getSettings(),
      ...newSettings,
      lastModified: new Date().toISOString()
    };

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(STORAGE_KEY_SITE_SETTINGS, JSON.stringify(activeSettings));
      } catch (err) {
        console.warn('[SiteSettingsService] LocalStorage save quota error:', err);
      }
    }

    broadcastSettingsUpdated(activeSettings);

    // Sync to local disk if in local dev
    if (isLocalDev()) {
      try {
        await fetch('/api/cms/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ siteSettings: activeSettings })
        });
      } catch {}
    }

    return activeSettings;
  },

  // Update Hero content
  async updateHero(heroUpdates) {
    const current = this.getSettings();
    return await this.saveSettings({
      ...current,
      hero: { ...current.hero, ...heroUpdates }
    });
  },

  // Update Live Toast notifications
  async updateLiveToasts(liveToastsUpdates) {
    const current = this.getSettings();
    return await this.saveSettings({
      ...current,
      liveToasts: { ...current.liveToasts, ...liveToastsUpdates }
    });
  },

  // Update specific page SEO
  async updatePageSeo(pageKey, seoUpdates) {
    const current = this.getSettings();
    const updatedPageSeo = {
      ...current.pageSeo,
      [pageKey]: {
        ...(current.pageSeo?.[pageKey] || {}),
        ...seoUpdates
      }
    };
    return await this.saveSettings({
      ...current,
      pageSeo: updatedPageSeo
    });
  },

  // Update Brand Authority facts
  async updateBrandAuthority(brandUpdates) {
    const current = this.getSettings();
    return await this.saveSettings({
      ...current,
      brandAuthority: { ...current.brandAuthority, ...brandUpdates }
    });
  },

  // Reset to original brand defaults
  resetToDefaults() {
    activeSettings = JSON.parse(JSON.stringify(DEFAULT_SITE_SETTINGS));
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(STORAGE_KEY_SITE_SETTINGS);
    }
    broadcastSettingsUpdated(activeSettings);
    return activeSettings;
  }
};
