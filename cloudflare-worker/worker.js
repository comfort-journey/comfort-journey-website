/**
 * =========================================================================
 * COMFORT JOURNEY — CLOUDFLARE WORKER SECURE PUBLISH PROXY
 * =========================================================================
 * 
 * This Worker runs entirely on Cloudflare's global edge network.
 * It holds your GitHub Access Token SECURELY in Cloudflare Environment Secrets.
 * 
 * BENEFITS:
 * 1. Zero GitHub tokens in frontend code or Git history.
 * 2. Hackers cannot steal or decode your token from GitHub.
 * 3. Employees worldwide can 1-click publish with zero configuration.
 * 4. Free forever (up to 100,000 requests/day on Cloudflare Free tier).
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

export default {
  async fetch(request, env) {
    // 1. Handle CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    // 2. Health check endpoint
    const activeToken = env.GITHUB_TOKEN || env.GITHUB_CMS_TOKEN || env.GH_TOKEN;

    if (url.pathname === '/' || url.pathname === '/health' || url.pathname === '/api/health') {
      return jsonResponse({
        status: 'online',
        service: 'Comfort Journey Secure Cloudflare Publisher',
        timestamp: new Date().toISOString(),
        configured: Boolean(activeToken)
      });
    }

    // 3. Secure Publish Endpoint
    if (url.pathname === '/publish' || url.pathname === '/api/publish') {
      if (request.method !== 'POST') {
        return jsonResponse({ error: 'Method Not Allowed' }, 405);
      }

      // Check configured token in Cloudflare Secrets
      const token = activeToken;
      if (!token) {
        return jsonResponse({
          error: 'GITHUB_TOKEN or GITHUB_CMS_TOKEN is not configured in Cloudflare Worker Secrets. Please add GITHUB_CMS_TOKEN or GITHUB_TOKEN in Worker Settings -> Variables.'
        }, 500);
      }

      const repo = env.GITHUB_REPO || 'comfort-journey/comfort-journey-website';
      const branch = env.GITHUB_BRANCH || 'main';
      const filePath = env.CONTENT_PATH || 'public/live-content.json';

      try {
        const body = await request.json();
        const { tours, blogs, commitMessage } = body || {};

        if (!tours && !blogs) {
          return jsonResponse({ error: 'Missing tours or blogs payload in request.' }, 400);
        }

        const apiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;

        // Helper: fetch current SHA of live-content.json
        const fetchCurrentSha = async () => {
          const res = await fetch(apiUrl, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'Comfort-Journey-Cloudflare-Worker'
            }
          });
          if (res.ok) {
            const data = await res.json();
            return data.sha;
          }
          if (res.status === 401) {
            throw new Error('Bad credentials: The GITHUB_TOKEN in Cloudflare Secrets is invalid or expired.');
          }
          return null;
        };

        let sha = await fetchCurrentSha();

        // Build sanitized content object
        const contentObj = {
          lastUpdated: new Date().toISOString(),
          updatedBy: 'Comfort Journey Content Studio (via Secure Cloudflare Proxy)',
          tours: Array.isArray(tours) ? tours : [],
          blogs: Array.isArray(blogs) ? blogs : []
        };

        const jsonStr = JSON.stringify(contentObj, null, 2);
        // Base64 encode in Cloudflare Worker runtime
        const base64Content = btoa(unescape(encodeURIComponent(jsonStr)));

        const message = commitMessage || `Content Studio Publish: ${new Date().toLocaleString()}`;

        // Perform GitHub commit
        let commitRes = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Comfort-Journey-Cloudflare-Worker'
          },
          body: JSON.stringify({
            message,
            content: base64Content,
            branch,
            ...(sha ? { sha } : {})
          })
        });

        // Retry once on 409 conflict
        if (commitRes.status === 409) {
          sha = await fetchCurrentSha();
          commitRes = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'Comfort-Journey-Cloudflare-Worker'
            },
            body: JSON.stringify({
              message,
              content: base64Content,
              branch,
              ...(sha ? { sha } : {})
            })
          });
        }

        if (!commitRes.ok) {
          const errData = await commitRes.json().catch(() => ({}));
          return jsonResponse({
            error: errData.message || `GitHub publish failed with status ${commitRes.status}`
          }, commitRes.status);
        }

        const commitData = await commitRes.json();
        const shortSha = (commitData.commit?.sha || '').slice(0, 7);

        return jsonResponse({
          success: true,
          commitSha: commitData.commit?.sha,
          shortSha,
          message: `Live deployment triggered successfully worldwide! Commit ${shortSha} created via Cloudflare. GitHub is deploying updates now (typically 1-2 minutes).`,
          timestamp: new Date().toISOString()
        });

      } catch (err) {
        return jsonResponse({
          error: `Publish failed: ${err.message}`
        }, 500);
      }
    }

    return jsonResponse({ error: 'Endpoint Not Found' }, 404);
  }
};
