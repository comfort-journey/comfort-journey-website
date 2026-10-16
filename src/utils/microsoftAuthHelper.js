// =========================================================================
// COMFORT JOURNEY - MICROSOFT IDENTITY (MSAL / OAUTH 2.0) AUTH HELPER
// Official Microsoft Entra ID / Microsoft Account Web Integration (100% Free)
// =========================================================================

export function getMicrosoftClientId() {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_MICROSOFT_CLIENT_ID) {
    return import.meta.env.VITE_MICROSOFT_CLIENT_ID.trim();
  }
  if (typeof window !== 'undefined') {
    return (localStorage.getItem('cj_microsoft_client_id') || '').trim();
  }
  return '';
}

/**
 * Triggers official Microsoft OAuth 2.0 popup for 1-click account selection
 * Compatible with personal accounts (@outlook.com, @hotmail.com) and work/school accounts.
 * Returns user profile: { id, name, email, avatar }
 */
export async function triggerMicrosoftSignInPrompt() {
  const clientId = getMicrosoftClientId();
  if (!clientId || clientId.length < 10) {
    throw new Error('MISSING_MICROSOFT_CLIENT_ID');
  }

  const redirectUri = window.location.origin + window.location.pathname;
  const state = Math.random().toString(36).substring(2, 15);
  const nonce = Math.random().toString(36).substring(2, 15);

  const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
    `client_id=${encodeURIComponent(clientId)}` +
    `&response_type=token` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent('openid profile email User.Read')}` +
    `&state=${encodeURIComponent(state)}` +
    `&nonce=${encodeURIComponent(nonce)}` +
    `&prompt=select_account`;

  const width = 500;
  const height = 650;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const popup = window.open(
    authUrl,
    'microsoft_sso_popup',
    `width=${width},height=${height},left=${left},top=${top},status=no,toolbar=no,menubar=no`
  );

  if (!popup) {
    throw new Error('POPUP_BLOCKED');
  }

  return new Promise((resolve, reject) => {
    let resolved = false;

    // Polling interval to check if popup redirected back with access token in URL hash
    const interval = setInterval(async () => {
      try {
        if (!popup || popup.closed) {
          clearInterval(interval);
          if (!resolved) {
            reject(new Error('POPUP_CLOSED'));
          }
          return;
        }

        const currentUrl = popup.location.href;
        if (currentUrl && currentUrl.includes(redirectUri) && currentUrl.includes('#')) {
          const hash = popup.location.hash.substring(1);
          const params = new URLSearchParams(hash);
          const accessToken = params.get('access_token');
          const error = params.get('error_description') || params.get('error');

          clearInterval(interval);
          popup.close();
          resolved = true;

          if (error) {
            return reject(new Error(error));
          }

          if (accessToken) {
            try {
              // Fetch user profile from Microsoft Graph
              const graphRes = await fetch('https://graph.microsoft.com/v1.0/me', {
                headers: { Authorization: `Bearer ${accessToken}` }
              });

              if (graphRes.ok) {
                const graphUser = await graphRes.json();
                resolve({
                  id: graphUser.id,
                  name: graphUser.displayName || graphUser.givenName || 'Traveler',
                  email: graphUser.mail || graphUser.userPrincipalName || '',
                  avatar: ''
                });
              } else {
                resolve({
                  id: `ms-${Date.now()}`,
                  name: 'Microsoft Traveler',
                  email: 'traveler@outlook.com',
                  avatar: ''
                });
              }
            } catch {
              resolve({
                id: `ms-${Date.now()}`,
                name: 'Microsoft Traveler',
                email: 'traveler@outlook.com',
                avatar: ''
              });
            }
          } else {
            reject(new Error('NO_ACCESS_TOKEN'));
          }
        }
      } catch {
        // Cross-origin restriction until popup redirects back to redirectUri
      }
    }, 500);

    // Timeout after 2 minutes
    setTimeout(() => {
      if (!resolved) {
        clearInterval(interval);
        try { popup.close(); } catch {}
        reject(new Error('AUTH_TIMEOUT'));
      }
    }, 120000);
  });
}
