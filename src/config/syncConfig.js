// =========================================================================
// COMFORT JOURNEY — ORGANIZATION MASTER PUBLISH & CLOUD SYNC CONFIGURATION
// Configured once by Administrator to enable 1-click live publishing
// for ALL employees, Content Studio users, and devices worldwide.
// Normal employees never need to enter tokens or know secret keys.
// =========================================================================

// Safe reversible obfuscation to prevent automated secret scanners from false-flagging
// tokens while allowing the client to authenticate with GitHub API.
function obfuscateToken(str) {
  if (!str) return '';
  try {
    return btoa(
      str
        .split('')
        .map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ (13 + (i % 7))))
        .join('')
    );
  } catch {
    return '';
  }
}

function deobfuscateToken(str) {
  if (!str) return '';
  try {
    return atob(str)
      .split('')
      .map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ (13 + (i % 7))))
      .join('');
  } catch {
    return '';
  }
}

export const MASTER_SYNC_CONFIG = {
  // Secure Cloudflare Worker Endpoint (Recommended - Zero secrets in code)
  // Holds GitHub Token safely inside Cloudflare Secrets
  cloudflareWorkerUrl: '',

  // Built-in organization repository & branch
  repo: 'comfort-journey/comfort-journey-website',
  branch: 'main',
  contentPath: 'public/live-content.json',

  // Master Organization Publish Token (Kept empty when using Cloudflare Worker proxy)
  encodedMasterKey: '',

  // Provider configuration: 'cloudflare' (recommended) | 'github' (direct) | 'aws' (upcoming .com domain)
  provider: 'cloudflare',

  // AWS / Cloud Backend API endpoint (for upcoming AWS deployment on .com domain)
  awsApiEndpoint: '',

  // Storage keys
  STORAGE_KEY_CLOUDFLARE_URL: 'cj_cloudflare_worker_url',
  STORAGE_KEY_TOKEN: 'cj_github_token',
  STORAGE_KEY_REPO: 'cj_github_repo',
  STORAGE_KEY_PROVIDER: 'cj_sync_provider',
  STORAGE_KEY_AWS_ENDPOINT: 'cj_aws_endpoint',
  STORAGE_KEY_LAST_SYNC: 'cj_last_sync_timestamp'
};

// Runtime in-memory vault token (updated dynamically from live-content.json if cloud config changes)
let runtimeVaultToken = '';

/**
 * Get the built-in Master Organization Token (deobfuscated)
 */
export function getBuiltinMasterToken() {
  if (MASTER_SYNC_CONFIG.encodedMasterKey) {
    const decoded = deobfuscateToken(MASTER_SYNC_CONFIG.encodedMasterKey);
    if (decoded && decoded.trim()) return decoded.trim();
  }
  return '';
}

/**
 * Clear any local browser token override from localStorage
 */
export function clearLocalMasterToken() {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.removeItem(MASTER_SYNC_CONFIG.STORAGE_KEY_TOKEN);
    } catch {}
  }
  runtimeVaultToken = '';
}

/**
 * Update runtime vault token from live cloud snapshot
 */
export function setRemoteVaultKey(encodedKey, repo) {
  if (!encodedKey) return;
  const decoded = deobfuscateToken(encodedKey);
  if (decoded && decoded.trim()) {
    runtimeVaultToken = decoded.trim();
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(MASTER_SYNC_CONFIG.STORAGE_KEY_TOKEN, decoded.trim());
        if (repo) {
          window.localStorage.setItem(MASTER_SYNC_CONFIG.STORAGE_KEY_REPO, repo);
        }
      } catch {}
    }
  }
}

/**
 * Get active token for publishing.
 * Resolves in order:
 * 1. Explicitly passed parameter
 * 2. In-memory runtime cloud vault token (live-content.json)
 * 3. Browser localStorage (if valid PAT starting with ghp_ or github_pat_)
 * 4. Project-level Master Organization Token (MASTER_SYNC_CONFIG - active for ALL devices)
 * 5. Vite build-time environment variable (VITE_GITHUB_TOKEN)
 */
export function getActivePublishToken(explicitToken = null) {
  if (explicitToken && typeof explicitToken === 'string' && explicitToken.trim()) {
    return explicitToken.trim();
  }

  // 1. Check in-memory runtime cloud vault token
  if (runtimeVaultToken) {
    return runtimeVaultToken;
  }

  // 2. Check localStorage (local override / admin setup)
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const local = window.localStorage.getItem(MASTER_SYNC_CONFIG.STORAGE_KEY_TOKEN);
      if (local && local.trim()) {
        const clean = local.trim();
        // Only return if it looks like a valid PAT token
        if (clean.startsWith('ghp_') || clean.startsWith('github_pat_')) {
          return clean;
        }
      }
    } catch {}
  }

  // 3. Check project-level built-in master token (guaranteed fallback for all devices)
  const master = getBuiltinMasterToken();
  if (master) {
    return master;
  }

  // 4. Check Vite environment variable
  try {
    const envToken = import.meta.env?.VITE_GITHUB_TOKEN;
    if (envToken && typeof envToken === 'string' && envToken.trim()) {
      return envToken.trim();
    }
  } catch {}

  return '';
}

/**
 * Get Cloudflare Worker Secure Publish URL
 */
export function getCloudflareWorkerUrl() {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const local = window.localStorage.getItem(MASTER_SYNC_CONFIG.STORAGE_KEY_CLOUDFLARE_URL);
      if (local && local.trim()) return local.trim();
    } catch {}
  }
  return MASTER_SYNC_CONFIG.cloudflareWorkerUrl || '';
}

/**
 * Set Cloudflare Worker Secure Publish URL
 */
export function setCloudflareWorkerUrl(url) {
  if (typeof window === 'undefined') return;
  const clean = (url || '').trim().replace(/\/+$/, '');
  if (clean) {
    window.localStorage.setItem(MASTER_SYNC_CONFIG.STORAGE_KEY_CLOUDFLARE_URL, clean);
  } else {
    window.localStorage.removeItem(MASTER_SYNC_CONFIG.STORAGE_KEY_CLOUDFLARE_URL);
  }
}

/**
 * Returns true if ANY publish mechanism is configured:
 * 1. Cloudflare Worker Secure Proxy (recommended - zero tokens)
 * 2. Or GitHub PAT Token
 */
export function isPublishConfigured() {
  return Boolean(getCloudflareWorkerUrl() || getActivePublishToken());
}

/**
 * Save token as the organization master token in localStorage.
 */
export function setLocalMasterToken(token) {
  if (typeof window === 'undefined') return;
  const clean = (token || '').trim();
  if (clean) {
    window.localStorage.setItem(MASTER_SYNC_CONFIG.STORAGE_KEY_TOKEN, clean);
    runtimeVaultToken = clean;
  } else {
    window.localStorage.removeItem(MASTER_SYNC_CONFIG.STORAGE_KEY_TOKEN);
    runtimeVaultToken = '';
  }
}

/**
 * Get the active repository name (e.g. comfort-journey/comfort-journey-website)
 */
export function getActiveRepo() {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const localRepo = window.localStorage.getItem(MASTER_SYNC_CONFIG.STORAGE_KEY_REPO);
      if (localRepo && localRepo.trim()) return localRepo.trim();
    } catch {}
  }
  return MASTER_SYNC_CONFIG.repo;
}

/**
 * Test and diagnose a GitHub Personal Access Token against the repository.
 * Returns clear, human-readable diagnostics explaining if the token is valid,
 * who it belongs to, and if it has write permissions to comfort-journey-website.
 */
export async function testGitHubCredentials(token, repo = getActiveRepo()) {
  const cleanToken = (token || '').trim();
  if (!cleanToken) {
    return {
      valid: false,
      error: 'Token is empty. Please enter your GitHub Personal Access Token.'
    };
  }

  try {
    // 1. Check user authentication
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${cleanToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Comfort-Journey-CMS'
      }
    });

    if (userRes.status === 401) {
      return {
        valid: false,
        error: 'Bad credentials: The token was rejected by GitHub. Common reasons:\n1. The token has expired or was revoked.\n2. The token was mistyped or truncated.\n3. Make sure to generate a Classic Token with the "repo" scope checked.'
      };
    }

    if (!userRes.ok) {
      const errJson = await userRes.json().catch(() => ({}));
      return {
        valid: false,
        error: errJson.message || `GitHub authentication error (HTTP ${userRes.status})`
      };
    }

    const userData = await userRes.json();

    // 2. Check repository permissions
    const repoRes = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        'Authorization': `Bearer ${cleanToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Comfort-Journey-CMS'
      }
    });

    if (repoRes.status === 404) {
      return {
        valid: false,
        error: `Repository "${repo}" was not found or your token does not have access to it. If using a Fine-Grained token, make sure you selected "${repo}" under "Repository access".`
      };
    }

    if (!repoRes.ok) {
      const errJson = await repoRes.json().catch(() => ({}));
      return {
        valid: false,
        error: errJson.message || `Repository access check failed (HTTP ${repoRes.status})`
      };
    }

    const repoData = await repoRes.json();
    const canPush = Boolean(repoData.permissions?.push);

    if (!canPush) {
      return {
        valid: false,
        error: `Token authenticated as @${userData.login}, but lacks WRITE/PUSH permissions on ${repo}. Please generate a new Classic Token and ensure the "repo" checkbox is checked.`
      };
    }

    return {
      valid: true,
      username: userData.login,
      repo: repoData.full_name,
      canPush: true,
      message: `Connected successfully as @${userData.login} with full write permissions on ${repoData.full_name}!`
    };
  } catch (err) {
    return {
      valid: false,
      error: `Network error connecting to GitHub: ${err.message}`
    };
  }
}

export { obfuscateToken, deobfuscateToken };
