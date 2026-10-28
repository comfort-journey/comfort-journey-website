// =========================================================================
// COMFORT JOURNEY — REAL-TIME CLOUD TEAM ACCESS & PERMISSIONS SERVICE
// Powered directly by AWS Directus Cloud Database (https://www.comfortjourney.in/cms)
//
// Features:
// 1. Real-time verification of staff accounts on Google SSO and Password logins.
// 2. Instant employee revocation (takes effect immediately across all devices).
// 3. Granular section permissions (Sales sees CRM; Blog Writers see Blogs).
// 4. Safe offline fallback caching to localStorage.
// =========================================================================

import { isLocalDev } from './contentService';

const DEFAULT_DIRECTUS_URL = 'https://www.comfortjourney.in/cms';
const DIRECTUS_MASTER_TOKEN = 'cj_directus_master_token_2026_vip';
const STORAGE_KEY_USERS = 'cj_authorized_users';

export function getDirectusAuthHeaders() {
  const isLocal = isLocalDev();
  const url = (typeof window !== 'undefined' && localStorage.getItem('cj_directus_url'))
    || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_DIRECTUS_URL)
    || (isLocal ? 'http://localhost:8055' : DEFAULT_DIRECTUS_URL);

  const token = (typeof window !== 'undefined' && localStorage.getItem('cj_directus_token'))
    || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_DIRECTUS_TOKEN)
    || DIRECTUS_MASTER_TOKEN;

  return {
    url: url.replace(/\/+$/, ''),
    token: token.trim()
  };
}

export const DEFAULT_SUPER_ADMINS = [
  {
    id: 'user-admin-marcom',
    email: 'comfortjourneymarcom@gmail.com',
    name: 'Comfort Journey Operations',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    allowedSections: ['*'],
    password: 'Admin@CJ2026#',
    createdAt: '2026-01-01'
  },
  {
    id: 'user-admin-1',
    email: 'rishabhmishra@comfortjourneyy.onmicrosoft.com',
    name: 'Rishabh Mishra',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    allowedSections: ['*'],
    password: 'Admin@CJ2026#',
    createdAt: '2026-01-01'
  }
];

// Helper to normalize Directus fields to frontend model
function normalizeUserFromDirectus(item) {
  if (!item) return null;
  return {
    id: item.id,
    email: (item.email || '').toLowerCase().trim(),
    name: item.name || 'Team Member',
    role: item.role || 'BLOG_WRITER',
    status: (item.status || 'ACTIVE').toUpperCase(),
    allowedSections: Array.isArray(item.allowed_sections) 
      ? item.allowed_sections 
      : (item.role === 'SUPER_ADMIN' ? ['*'] : ['manage-blogs']),
    password: item.password || '',
    createdAt: item.date_created || item.createdAt || new Date().toISOString()
  };
}

// Helper to convert frontend model to Directus fields
function formatUserForDirectus(user) {
  return {
    id: user.id,
    email: (user.email || '').toLowerCase().trim(),
    name: user.name || 'Team Member',
    role: user.role || 'BLOG_WRITER',
    status: (user.status || 'ACTIVE').toUpperCase(),
    allowed_sections: Array.isArray(user.allowedSections) ? user.allowedSections : ['manage-blogs'],
    password: user.password || ''
  };
}

export const teamAccessStorageService = {
  /**
   * Fetch all team users from AWS Directus in real-time.
   */
  async fetchTeamUsersFromDirectus() {
    const { url, token } = getDirectusAuthHeaders();
    if (!url || !token) return DEFAULT_SUPER_ADMINS;

    try {
      const endpoint = `${url}/items/team_users?limit=100&sort=-date_created`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        signal: controller.signal,
        cache: 'no-store'
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Directus returned HTTP ${res.status}`);
      }

      const json = await res.json();
      const items = json.data || [];

      // Map to frontend user format
      const normalized = items.map(normalizeUserFromDirectus).filter(Boolean);

      // Guarantee default Super Admins always exist
      const userMap = new Map();
      DEFAULT_SUPER_ADMINS.forEach(u => userMap.set(u.email.toLowerCase().trim(), u));
      normalized.forEach(u => userMap.set(u.email.toLowerCase().trim(), u));

      const finalUsers = Array.from(userMap.values());

      // Cache locally for instant next load
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(finalUsers));
        } catch {}
      }

      return finalUsers;
    } catch (err) {
      console.warn('[teamAccessStorageService] Could not fetch remote team users from Directus:', err.message);
      // Fallback to localStorage or default admins
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          const raw = localStorage.getItem(STORAGE_KEY_USERS);
          if (raw) return JSON.parse(raw);
        } catch {}
      }
      return DEFAULT_SUPER_ADMINS;
    }
  },

  /**
   * Check user permission in REAL TIME on login (Google SSO or password).
   * Queries Directus directly so revoked users are locked out instantly.
   */
  async verifyStaffLoginRealtime(email) {
    const cleanEmail = (email || '').toLowerCase().trim();
    if (!cleanEmail) {
      return { allowed: false, error: 'Email address is required.' };
    }

    const { url, token } = getDirectusAuthHeaders();

    try {
      // 1. Direct query to Directus
      const filter = encodeURIComponent(JSON.stringify({ email: { _eq: cleanEmail } }));
      const endpoint = `${url}/items/team_users?filter=${filter}&limit=1`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        signal: controller.signal,
        cache: 'no-store'
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        const userItem = json.data?.[0];

        if (userItem) {
          const user = normalizeUserFromDirectus(userItem);

          if (user.status === 'REVOKED' || user.status === 'INACTIVE') {
            return {
              allowed: false,
              user,
              error: '❌ Access Denied: Staff access for this account has been REVOKED or deactivated by an administrator in AWS Directus.'
            };
          }

          return { allowed: true, user };
        }
      }
    } catch (err) {
      console.warn('[teamAccessStorageService] Real-time Directus auth query error, falling back to local list:', err.message);
    }

    // Fallback: Check local cache or default super admins
    let cachedList = DEFAULT_SUPER_ADMINS;
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_USERS);
        if (raw) cachedList = JSON.parse(raw);
      } catch {}
    }

    const matched = cachedList.find(u => (u.email || '').toLowerCase().trim() === cleanEmail);
    if (!matched) {
      return {
        allowed: false,
        error: `⛔ Access Denied: "${cleanEmail}" is not recognized as an authorized staff account in the Comfort Journey Directory.`
      };
    }

    if (matched.status === 'REVOKED' || matched.status === 'INACTIVE') {
      return {
        allowed: false,
        user: matched,
        error: '❌ Access Denied: Staff access for this account has been REVOKED or deactivated.'
      };
    }

    return { allowed: true, user: matched };
  },

  /**
   * Save (Create or Update) team user in AWS Directus
   */
  async saveTeamUserToDirectus(user) {
    if (!user || !user.email) throw new Error('User email is required.');

    const { url, token } = getDirectusAuthHeaders();
    const payload = formatUserForDirectus(user);

    // Update local cache immediately
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_USERS);
        let list = raw ? JSON.parse(raw) : [];
        const idx = list.findIndex(u => (u.email || '').toLowerCase() === payload.email);
        if (idx >= 0) {
          list[idx] = { ...list[idx], ...user };
        } else {
          list.unshift(user);
        }
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(list));
      } catch {}
    }

    // Sync to AWS Directus
    if (url && token) {
      try {
        // Check if user already exists in Directus
        const checkFilter = encodeURIComponent(JSON.stringify({ email: { _eq: payload.email } }));
        const checkRes = await fetch(`${url}/items/team_users?filter=${checkFilter}&limit=1`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (checkRes.ok) {
          const checkData = await checkRes.json();
          const existing = checkData.data?.[0];

          if (existing && existing.id) {
            // PATCH existing user
            await fetch(`${url}/items/team_users/${existing.id}`, {
              method: 'PATCH',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
            });
            return user;
          }
        }

        // POST new user
        await fetch(`${url}/items/team_users`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('[teamAccessStorageService] Directus save error:', err.message);
      }
    }

    return user;
  },

  /**
   * Revoke or Deactivate team user in AWS Directus
   */
  async revokeTeamUserInDirectus(userId, email) {
    const cleanEmail = (email || '').toLowerCase().trim();
    const { url, token } = getDirectusAuthHeaders();

    // 1. Update local cache
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_USERS);
        let list = raw ? JSON.parse(raw) : [];
        list = list.map(u => {
          if (u.id === userId || (cleanEmail && (u.email || '').toLowerCase() === cleanEmail)) {
            return { ...u, status: 'REVOKED' };
          }
          return u;
        });
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(list));
      } catch {}
    }

    // 2. Update Directus Cloud in real-time
    if (url && token) {
      try {
        if (userId) {
          await fetch(`${url}/items/team_users/${userId}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'REVOKED' })
          });
        } else if (cleanEmail) {
          const checkFilter = encodeURIComponent(JSON.stringify({ email: { _eq: cleanEmail } }));
          const checkRes = await fetch(`${url}/items/team_users?filter=${checkFilter}&limit=1`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (checkRes.ok) {
            const json = await checkRes.json();
            const existing = json.data?.[0];
            if (existing?.id) {
              await fetch(`${url}/items/team_users/${existing.id}`, {
                method: 'PATCH',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'REVOKED' })
              });
            }
          }
        }
      } catch (err) {
        console.warn('[teamAccessStorageService] Directus revoke error:', err.message);
      }
    }
  },

  /**
   * Delete team user permanently from Directus
   */
  async deleteTeamUserFromDirectus(userId) {
    const { url, token } = getDirectusAuthHeaders();

    // 1. Update local cache
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_USERS);
        let list = raw ? JSON.parse(raw) : [];
        list = list.filter(u => u.id !== userId);
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(list));
      } catch {}
    }

    // 2. Delete from Directus
    if (url && token && userId) {
      try {
        await fetch(`${url}/items/team_users/${userId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (err) {
        console.warn('[teamAccessStorageService] Directus delete error:', err.message);
      }
    }
  }
};
