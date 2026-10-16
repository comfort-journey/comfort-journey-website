// =========================================================================
// COMFORT JOURNEY - GOOGLE IDENTITY SERVICES (GIS) AUTH HELPER
// Official Google OAuth 2.0 Web Client Integration
// =========================================================================

export const DEFAULT_GOOGLE_CLIENT_ID = '992442447975-k67k82jnvrcj4covrshjjglvgfo8ol3c.apps.googleusercontent.com';

export function getGoogleClientId() {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_CLIENT_ID) {
    return import.meta.env.VITE_GOOGLE_CLIENT_ID.trim();
  }
  if (typeof window !== 'undefined' && window.localStorage?.getItem('cj_google_client_id')) {
    return (window.localStorage.getItem('cj_google_client_id') || '').trim();
  }
  return DEFAULT_GOOGLE_CLIENT_ID;
}

export function loadGoogleGsiScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('Window unavailable'));
    if (window.google?.accounts?.oauth2) {
      return resolve(window.google);
    }
    const existing = document.getElementById('google-gsi-client');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google));
      existing.addEventListener('error', (err) => reject(err));
      return;
    }
    const script = document.createElement('script');
    script.id = 'google-gsi-client';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
}

/**
 * Triggers official Google OAuth 2.0 popup for 1-click account selection
 * Returns user profile: { email, name, picture, sub }
 */
export async function triggerGoogleSignInPrompt() {
  const clientId = getGoogleClientId();
  if (!clientId || !clientId.includes('.apps.googleusercontent.com')) {
    throw new Error('MISSING_CLIENT_ID');
  }

  const google = await loadGoogleGsiScript();
  if (!google?.accounts?.oauth2) {
    throw new Error('GIS_INIT_FAILED');
  }

  return new Promise((resolve, reject) => {
    try {
      const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'email profile openid',
        callback: async (tokenResponse) => {
          if (tokenResponse?.error) {
            return reject(new Error(tokenResponse.error_description || tokenResponse.error));
          }
          if (!tokenResponse?.access_token) {
            return reject(new Error('NO_ACCESS_TOKEN'));
          }

          try {
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
            });
            if (res.ok) {
              const info = await res.json();
              resolve({
                sub: info.sub,
                name: info.name || info.given_name || 'Traveler',
                email: info.email || '',
                picture: info.picture || ''
              });
            } else {
              reject(new Error(`USERINFO_HTTP_${res.status}`));
            }
          } catch (fetchErr) {
            reject(fetchErr);
          }
        },
        error_callback: (err) => {
          const msg = err?.message || err?.type || (typeof err === 'string' ? err : 'GOOGLE_POPUP_CLOSED');
          reject(new Error(msg));
        }
      });

      tokenClient.requestAccessToken({ prompt: 'select_account' });
    } catch (err) {
      reject(err);
    }
  });
}
