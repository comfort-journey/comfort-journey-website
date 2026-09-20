// =========================================================================
// COMFORT JOURNEY — UNIFIED GLOBAL CONTENT & SYNC SERVICE (v3.0)
// Manages reactive Tour Packages & Blogs across all pages and devices.
//
// Features:
// 1. Unified Single Source of Truth for Tours & Blogs.
// 2. Real-time React Event Broadcasting ('cj_tours_updated', 'cj_blogs_updated').
// 3. LocalStorage persistence with backwards-compatibility key migration.
// 4. Vite Dev Server Auto-Write API (saves directly to disk in development).
// 5. Remote Public Snapshot sync (fetches /live-content.json on load for global parity).
// 6. Direct GitHub Contents API publishing (for 1-click global deployment on live site).
// =========================================================================

import { TOURS_DATA } from '../data/toursData';
import { BLOGS_DATA } from '../data/blogsData';
import {
  getActivePublishToken,
  getActiveRepo,
  isPublishConfigured,
  getCloudflareWorkerUrl,
  setCloudflareWorkerUrl,
  setLocalMasterToken,
  clearLocalMasterToken,
  getBuiltinMasterToken,
  setRemoteVaultKey,
  obfuscateToken,
  testGitHubCredentials,
  MASTER_SYNC_CONFIG
} from '../config/syncConfig';

export const STORAGE_KEY_TOURS = 'cj_custom_tours_dataset';
export const STORAGE_KEY_BLOGS = 'cj_custom_blogs_dataset';
export const STORAGE_KEY_GITHUB_TOKEN = MASTER_SYNC_CONFIG.STORAGE_KEY_TOKEN;
export const STORAGE_KEY_GITHUB_REPO = MASTER_SYNC_CONFIG.STORAGE_KEY_REPO;
export const STORAGE_KEY_LAST_SYNC = MASTER_SYNC_CONFIG.STORAGE_KEY_LAST_SYNC;

// Legacy keys to migrate from
const LEGACY_KEYS_TOURS = ['cj_local_custom_tours'];
const LEGACY_KEYS_BLOGS = ['cj_custom_blogs_v2', 'cj_local_custom_blogs'];

// Helper to determine if we are running in local dev environment
export function isLocalDev() {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.');
}

// In-memory active stores
let activeTours = null;
let activeBlogs = null;
let isRemoteSyncing = false;

// Initialize Tours Store
function initTours() {
  if (activeTours && activeTours.length > 0) return activeTours;

  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      // 1. Try primary key
      const saved = localStorage.getItem(STORAGE_KEY_TOURS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          activeTours = parsed;
          syncToursDataArray(parsed);
          return activeTours;
        }
      }

      // 2. Try legacy fallback keys
      for (const legacyKey of LEGACY_KEYS_TOURS) {
        const legacy = localStorage.getItem(legacyKey);
        if (legacy) {
          const parsed = JSON.parse(legacy);
          if (Array.isArray(parsed) && parsed.length > 0) {
            activeTours = parsed;
            localStorage.setItem(STORAGE_KEY_TOURS, JSON.stringify(parsed));
            syncToursDataArray(parsed);
            return activeTours;
          }
        }
      }
    } catch (e) {
      console.warn('[ContentService] Error reading tours from localStorage:', e);
    }
  }

  // Fallback to bundled seed tours
  activeTours = [...TOURS_DATA];
  return activeTours;
}

// Initialize Blogs Store
function initBlogs() {
  if (activeBlogs && activeBlogs.length > 0) return activeBlogs;

  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      // 1. Try primary key
      const saved = localStorage.getItem(STORAGE_KEY_BLOGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          activeBlogs = parsed;
          syncBlogsDataArray(parsed);
          return activeBlogs;
        }
      }

      // 2. Try legacy fallback keys
      for (const legacyKey of LEGACY_KEYS_BLOGS) {
        const legacy = localStorage.getItem(legacyKey);
        if (legacy) {
          const parsed = JSON.parse(legacy);
          if (Array.isArray(parsed) && parsed.length > 0) {
            activeBlogs = parsed;
            localStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(parsed));
            syncBlogsDataArray(parsed);
            return activeBlogs;
          }
        }
      }
    } catch (e) {
      console.warn('[ContentService] Error reading blogs from localStorage:', e);
    }
  }

  // Fallback to bundled seed blogs
  activeBlogs = [...BLOGS_DATA];
  return activeBlogs;
}

// Keep TOURS_DATA array in sync for legacy direct imports
function syncToursDataArray(newList) {
  try {
    TOURS_DATA.length = 0;
    TOURS_DATA.push(...newList);
  } catch (e) {
    // Array might be frozen in strict mode
  }
}

// Keep BLOGS_DATA array in sync for legacy direct imports
function syncBlogsDataArray(newList) {
  try {
    BLOGS_DATA.length = 0;
    BLOGS_DATA.push(...newList);
  } catch (e) {
    // Array might be frozen in strict mode
  }
}

// Dispatch real-time events across components & tabs
function broadcastToursUpdated(tours) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('cj_tours_updated', { detail: tours }));
  window.dispatchEvent(new CustomEvent('cj_content_updated', { detail: { type: 'tours', data: tours } }));
}

function broadcastBlogsUpdated(blogs) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('cj_blogs_updated', { detail: blogs }));
  window.dispatchEvent(new CustomEvent('cj_content_updated', { detail: { type: 'blogs', data: blogs } }));
}

export const contentService = {
  // ─── TOURS API ───
  getTours() {
    return initTours();
  },

  getTourById(id) {
    const list = this.getTours();
    return list.find(t => t.id === id) || null;
  },

  getTourBySlug(slug) {
    if (!slug) return null;
    const clean = slug.replace(/^#\/?/, '').replace(/^tour\/?/, '').toLowerCase().trim();
    const list = this.getTours();
    return list.find(t => 
      (t.slug && t.slug.toLowerCase() === clean) || 
      (t.id && t.id.toLowerCase() === clean)
    ) || null;
  },

  async saveTour(tour) {
    if (!tour || !tour.name) throw new Error('Tour package name is required.');
    
    const list = [...this.getTours()];
    const idx = list.findIndex(t => t.id === tour.id || (tour.slug && t.slug === tour.slug));
    
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...tour, lastModified: new Date().toISOString() };
    } else {
      list.unshift({ ...tour, lastModified: new Date().toISOString() });
    }

    return await this.saveAllTours(list);
  },

  async saveAllTours(newList) {
    activeTours = [...newList];
    syncToursDataArray(activeTours);

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(STORAGE_KEY_TOURS, JSON.stringify(activeTours));
      } catch (e) {
        console.warn('[ContentService] LocalStorage save quota exceeded or error:', e);
      }
    }

    broadcastToursUpdated(activeTours);

    // If running in local dev server, automatically persist to files on disk
    if (isLocalDev()) {
      this.syncToLocalDisk({ tours: activeTours }).catch(() => {});
    }

    return activeTours;
  },

  async deleteTour(tourId) {
    const list = this.getTours().filter(t => t.id !== tourId);
    return await this.saveAllTours(list);
  },

  // ─── BLOGS API ───
  getBlogs() {
    return initBlogs();
  },

  getBlogBySlug(slug) {
    if (!slug) return null;
    const clean = slug.replace(/^#\/?/, '').replace(/^blog\/?/, '').toLowerCase().trim();
    const list = this.getBlogs();
    return list.find(b => b.slug && b.slug.toLowerCase() === clean) || null;
  },

  async saveBlog(blog) {
    if (!blog || !blog.title) throw new Error('Blog title is required.');

    const list = [...this.getBlogs()];
    const idx = list.findIndex(b => b.id === blog.id || (blog.slug && b.slug === blog.slug));

    if (idx >= 0) {
      list[idx] = { ...list[idx], ...blog, lastModified: new Date().toISOString() };
    } else {
      list.unshift({ ...blog, lastModified: new Date().toISOString() });
    }

    return await this.saveAllBlogs(list);
  },

  async saveAllBlogs(newList) {
    activeBlogs = [...newList];
    syncBlogsDataArray(activeBlogs);

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(activeBlogs));
      } catch (e) {
        console.warn('[ContentService] LocalStorage save quota exceeded or error:', e);
      }
    }

    broadcastBlogsUpdated(activeBlogs);

    // If running in local dev server, automatically persist to files on disk
    if (isLocalDev()) {
      this.syncToLocalDisk({ blogs: activeBlogs }).catch(() => {});
    }

    return activeBlogs;
  },

  async deleteBlog(blogId) {
    const list = this.getBlogs().filter(b => b.id !== blogId);
    return await this.saveAllBlogs(list);
  },

  // ─── LOCAL VITE DEV SERVER AUTO-FILE-WRITER ───
  async syncToLocalDisk({ tours, blogs }) {
    if (!isLocalDev()) return { success: false, reason: 'Not in local dev' };

    try {
      const payload = {};
      if (tours) payload.tours = tours;
      if (blogs) payload.blogs = blogs;

      const res = await fetch('/api/cms/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        return { success: true, message: data.message };
      }
      return { success: false, message: `Server returned ${res.status}` };
    } catch (e) {
      return { success: false, message: e.message };
    }
  },

  // ─── REMOTE LIVE CONTENT HYDRATION (FOR MULTI-DEVICE PARITY) ───
  async checkRemoteLiveContent(force = false) {
    if (isRemoteSyncing || typeof window === 'undefined') return { updated: false };
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return { updated: false };
    isRemoteSyncing = true;

    try {
      const basePrefix = (import.meta.env.BASE_URL || './').replace(/\/$/, '') + '/';
      const liveJsonUrl = `${basePrefix}live-content.json?_t=${Date.now()}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(liveJsonUrl, { signal: controller.signal, cache: 'no-store' });
      clearTimeout(timeoutId);

      if (res.ok) {
        const remote = await res.json();
        let updatedAny = false;

        // 1. Synchronize remote master vault if present in live cloud content
        if (remote._masterVault?.encodedKey) {
          setRemoteVaultKey(remote._masterVault.encodedKey, remote._masterVault.repo);
        }

        const currentLocal = localStorage.getItem(STORAGE_KEY_TOURS);
        const remoteTime = new Date(remote.lastUpdated || 0).getTime();
        const localTime = Number(localStorage.getItem(STORAGE_KEY_LAST_SYNC) || 0);

        // Sync if forced, if local is empty, or if remote is newer / different
        const shouldSync = force || !currentLocal || remoteTime > localTime;

        if (shouldSync) {
          if (remote.tours && Array.isArray(remote.tours) && remote.tours.length > 0) {
            activeTours = remote.tours;
            syncToursDataArray(remote.tours);
            localStorage.setItem(STORAGE_KEY_TOURS, JSON.stringify(remote.tours));
            broadcastToursUpdated(activeTours);
            updatedAny = true;
          }

          if (remote.blogs && Array.isArray(remote.blogs) && remote.blogs.length > 0) {
            activeBlogs = remote.blogs;
            syncBlogsDataArray(remote.blogs);
            localStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(remote.blogs));
            broadcastBlogsUpdated(activeBlogs);
            updatedAny = true;
          }

          if (remote.lastUpdated) {
            localStorage.setItem(STORAGE_KEY_LAST_SYNC, String(new Date(remote.lastUpdated).getTime()));
          }
        }

        return { updated: updatedAny, toursCount: remote.tours?.length || 0, lastUpdated: remote.lastUpdated };
      }
      return { updated: false };
    } catch (e) {
      return { updated: false, error: e.message };
    } finally {
      isRemoteSyncing = false;
    }
  },

  // Force manual sync from live cloud snapshot
  async forceSyncFromCloud() {
    return await this.checkRemoteLiveContent(true);
  },

  // ─── GITHUB REST API DIRECT COMMIT (FOR LIVE GITHUB PAGES DEPLOYMENT) ───
  async publishToGitHub({ token, repo, commitMessage }) {
    let activeToken = (token || getActivePublishToken() || '').trim();
    const activeRepo = (repo || getActiveRepo() || '').trim();

    if (!activeToken) {
      throw new Error('NO_TOKEN: Organization Master Publish Key is not configured. Please enter the Master Key once in the CMS Global Sync settings.');
    }

    const path = 'public/live-content.json';
    const apiUrl = `https://api.github.com/repos/${activeRepo}/contents/${path}`;

    // Helper to get current file SHA
    const fetchLatestSha = async () => {
      try {
        const getRes = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${activeToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Comfort-Journey-CMS'
          },
          cache: 'no-store'
        });
        if (getRes.ok) {
          const fileData = await getRes.json();
          return fileData.sha;
        }
        if (getRes.status === 401) {
          throw new Error('Bad credentials: The GitHub access token is invalid, expired, or revoked. Please update the Organization Master Key in CMS Settings.');
        }
      } catch (err) {
        if (err.message.includes('Bad credentials')) throw err;
      }
      return null;
    };

    let sha = await fetchLatestSha();

    // Prepare content payload including the organization master sync vault
    const contentObj = {
      lastUpdated: new Date().toISOString(),
      updatedBy: 'Comfort Journey Content Studio',
      _masterVault: {
        encodedKey: obfuscateToken(activeToken),
        repo: activeRepo,
        updatedAt: new Date().toISOString()
      },
      tours: this.getTours(),
      blogs: this.getBlogs()
    };
    const jsonStr = JSON.stringify(contentObj, null, 2);
    const base64Content = btoa(unescape(encodeURIComponent(jsonStr)));

    // Perform commit with automatic single retry on 409 conflict
    let commitRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${activeToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Comfort-Journey-CMS'
      },
      body: JSON.stringify({
        message: commitMessage || `CMS Live Update: ${new Date().toLocaleString()}`,
        content: base64Content,
        ...(sha ? { sha } : {})
      })
    });

    // If 409 conflict, refetch latest sha and retry once
    if (commitRes.status === 409) {
      sha = await fetchLatestSha();
      commitRes = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${activeToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Comfort-Journey-CMS'
        },
        body: JSON.stringify({
          message: commitMessage || `CMS Live Update: ${new Date().toLocaleString()}`,
          content: base64Content,
          ...(sha ? { sha } : {})
        })
      });
    }

    if (!commitRes.ok) {
      const errJson = await commitRes.json().catch(() => ({}));
      if (commitRes.status === 401) {
        // Automatic fallback: if this device had a corrupted or outdated local token in localStorage,
        // test if built-in master organization key can recover the publish seamlessly
        const master = getBuiltinMasterToken();
        if (master && master !== activeToken) {
          console.warn('[ContentService] Token failed 401. Falling back to built-in Organization Master Token...');
          clearLocalMasterToken();
          return await this.publishToGitHub({ token: master, repo: activeRepo, commitMessage });
        }
        throw new Error('Bad credentials: GitHub rejected this token. Please check that your token is active and has the "repo" (Contents: Read & Write) scope enabled.');
      }
      if (commitRes.status === 404) {
        throw new Error(`Repository "${activeRepo}" not found. Verify your organization repository name in CMS Settings.`);
      }
      throw new Error(errJson.message || `GitHub publish failed with status ${commitRes.status}`);
    }

    localStorage.setItem(STORAGE_KEY_LAST_SYNC, String(Date.now()));
    return await commitRes.json();
  },

  // ─── MASTER VAULT CLOUD SYNCHRONIZATION ───
  async publishMasterVault({ token, repo }) {
    const activeToken = (token || getActivePublishToken() || '').trim();
    const activeRepo = (repo || getActiveRepo() || '').trim();
    if (!activeToken) throw new Error('Cannot publish master vault: Token is empty.');

    return await this.publishToGitHub({
      token: activeToken,
      repo: activeRepo,
      commitMessage: `Organization Master Key Synced Worldwide: ${new Date().toLocaleString()}`
    });
  },

  // ─── CLOUD PUBLISH STATUS & TOKEN HELPERS ───
  getGithubToken() {
    return getActivePublishToken();
  },

  setGithubToken(token) {
    setLocalMasterToken(token);
  },

  getGithubRepo() {
    return getActiveRepo();
  },

  setGithubRepo(repo) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY_GITHUB_REPO, (repo || '').trim());
  },

  getPublishStatus() {
    const isLocal = isLocalDev();
    const hasCloudflare = Boolean(getCloudflareWorkerUrl());
    const hasToken = isPublishConfigured();
    const directusUrl = (typeof window !== 'undefined' && localStorage.getItem('cj_directus_url')) || import.meta.env?.VITE_DIRECTUS_URL || '';
    const hasDirectusConfigured = Boolean(directusUrl && directusUrl !== 'http://localhost:8055');
    
    return {
      isLocalDev: isLocal,
      hasCloudflare,
      hasGithubToken: hasToken,
      isMasterConfigured: hasToken,
      hasDirectusConfigured,
      canPublishWorldwide: isLocal || hasCloudflare || hasToken || hasDirectusConfigured,
      activeRepo: this.getGithubRepo(),
      cloudflareUrl: getCloudflareWorkerUrl()
    };
  },

  // ─── UNIFIED WORLDWIDE PUBLISH (CLOUDFLARE WORKER PROXY OR GITHUB OR LOCAL) ───
  async publishWorldwide(options = {}) {
    const { token, repo, commitMessage = 'Publish Worldwide from Content Studio' } = options;
    const isLocal = isLocalDev();

    // 1. If running locally in Vite dev server, write directly to disk
    if (isLocal) {
      const diskRes = await this.syncToLocalDisk({ tours: this.getTours(), blogs: this.getBlogs() });
      return {
        success: true,
        method: 'local_disk',
        message: 'Synchronized directly to local codebase (public/live-content.json)! Ready to deploy.',
        details: diskRes
      };
    }

    // 2. If Cloudflare Worker is configured, publish via the Secure Cloudflare Proxy!
    // (Zero tokens in browser or code — 100% secure)
    const cloudflareUrl = getCloudflareWorkerUrl();
    if (cloudflareUrl) {
      const endpoint = cloudflareUrl.replace(/\/+$/, '') + '/publish';
      const cfRes = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tours: this.getTours(),
          blogs: this.getBlogs(),
          commitMessage: `${commitMessage} [${new Date().toLocaleTimeString()}]`
        })
      });

      if (!cfRes.ok) {
        const errJson = await cfRes.json().catch(() => ({}));
        throw new Error(errJson.error || `Cloudflare Publish failed with status ${cfRes.status}`);
      }

      const cfData = await cfRes.json();
      return {
        success: true,
        method: 'cloudflare_proxy',
        commitSha: cfData.shortSha || 'live',
        message: cfData.message || 'Successfully published worldwide via Secure Cloudflare Proxy!',
        raw: cfData
      };
    }

    // 3. Fallback: Direct GitHub API Publish (if token is provided or configured)
    const activeToken = (token || getActivePublishToken() || '').trim();
    const activeRepo = (repo || getActiveRepo() || '').trim();

    if (!activeToken) {
      throw new Error('NO_TOKEN: Organization Master Publish Key or Cloudflare Worker URL is not configured. Please configure in CMS Global Sync settings.');
    }

    const ghRes = await this.publishToGitHub({
      token: activeToken,
      repo: activeRepo,
      commitMessage: `${commitMessage} [${new Date().toLocaleTimeString()}]`
    });

    const sha = ghRes.commit?.sha ? ghRes.commit.sha.slice(0, 7) : 'latest';
    return {
      success: true,
      method: 'github',
      commitSha: sha,
      message: `Successfully published worldwide! Commit ${sha} created. GitHub Actions is now deploying updates to all visitors worldwide (typically takes 1-2 minutes).`,
      raw: ghRes
    };
  }
};

// Auto-run remote hydration on initialization in browser and cross-tab/focus sync
if (typeof window !== 'undefined') {
  // Listen for storage events across browser tabs
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY_TOURS && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        if (Array.isArray(parsed)) {
          activeTours = parsed;
          syncToursDataArray(parsed);
          broadcastToursUpdated(parsed);
        }
      } catch {}
    }
    if (e.key === STORAGE_KEY_BLOGS && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        if (Array.isArray(parsed)) {
          activeBlogs = parsed;
          syncBlogsDataArray(parsed);
          broadcastBlogsUpdated(parsed);
        }
      } catch {}
    }
  });

  // Automatically check for cloud updates whenever user returns to the tab
  window.addEventListener('focus', () => {
    contentService.checkRemoteLiveContent();
  });

  // Initial cloud sync on load
  setTimeout(() => {
    contentService.checkRemoteLiveContent();
  }, 1000);

  // Periodic multi-device heartbeat check (only in production / remote hosting)
  if (!isLocalDev()) {
    setInterval(() => {
      if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
      contentService.checkRemoteLiveContent();
    }, 120000);
  }
}
