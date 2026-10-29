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
        const { tours, blogs, siteSettings, authorizedUsers, _masterVault, commitMessage } = body || {};

        if (!tours && !blogs && !siteSettings && !authorizedUsers) {
          return jsonResponse({ error: 'Missing tours, blogs, or siteSettings payload in request.' }, 400);
        }

        const apiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;

        // Helper: fetch current SHA and existing content of live-content.json
        let existingContent = null;
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
            if (data.content) {
              try {
                const decoded = decodeURIComponent(escape(atob(data.content.replace(/\s/g, ''))));
                existingContent = JSON.parse(decoded);
              } catch (e) {
                // Ignore parse error on existing file
              }
            }
            return data.sha;
          }
          if (res.status === 401) {
            throw new Error('Bad credentials: The GITHUB_TOKEN in Cloudflare Secrets is invalid or expired.');
          }
          return null;
        };

        let sha = await fetchCurrentSha();

        // Build sanitized content object, safely preserving existing tours/blogs if not sent in this request
        const resolvedTours = Array.isArray(tours) && tours.length > 0 
          ? tours 
          : (existingContent && Array.isArray(existingContent.tours) ? existingContent.tours : (Array.isArray(tours) ? tours : []));
        
        const resolvedBlogs = Array.isArray(blogs) && blogs.length > 0 
          ? blogs 
          : (existingContent && Array.isArray(existingContent.blogs) ? existingContent.blogs : (Array.isArray(blogs) ? blogs : []));

        const contentObj = {
          lastUpdated: new Date().toISOString(),
          updatedBy: 'Comfort Journey Content Studio (via Secure Cloudflare Proxy)',
          tours: resolvedTours,
          blogs: resolvedBlogs,
          ...(Array.isArray(authorizedUsers) && authorizedUsers.length > 0 
            ? { authorizedUsers } 
            : (existingContent?.authorizedUsers ? { authorizedUsers: existingContent.authorizedUsers } : {})),
          ...(_masterVault && typeof _masterVault === 'object' 
            ? { _masterVault } 
            : (existingContent?._masterVault ? { _masterVault: existingContent._masterVault } : {})),
          ...(siteSettings && typeof siteSettings === 'object' 
            ? { siteSettings } 
            : (existingContent?.siteSettings ? { siteSettings: existingContent.siteSettings } : {}))
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

    // 4. Free Transactional Email OTP Endpoint (Brevo / Resend / Direct)
    if (url.pathname === '/api/send-otp' || url.pathname === '/auth/send-otp') {
      if (request.method !== 'POST') {
        return jsonResponse({ error: 'Method Not Allowed' }, 405);
      }
      try {
        const body = await request.json();
        const { email, code, name } = body || {};
        if (!email || !code) {
          return jsonResponse({ error: 'Email and OTP code are required.' }, 400);
        }

        const brevoKey = env.BREVO_API_KEY || env.SENDINBLUE_API_KEY;
        const resendKey = env.RESEND_API_KEY;
        const senderEmail = env.SENDER_EMAIL || 'care@comfortjourney.in';
        const senderName = 'Comfort Journey';

        const subject = `${code} is your Comfort Journey verification code`;
        const html = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #001233; color: #ffffff; padding: 36px 28px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.12);">
            <div style="text-align: center; margin-bottom: 24px;">
              <span style="display: inline-block; padding: 5px 14px; background: rgba(255,137,47,0.15); border: 1px solid rgba(255,137,47,0.4); border-radius: 999px; font-size: 11px; letter-spacing: 2px; color: #FF892F; text-transform: uppercase; font-weight: 700;">Comfort Journey Member Access</span>
              <h2 style="font-size: 24px; font-weight: 600; margin: 18px 0 6px 0; color: #ffffff;">Sign In Verification Code</h2>
              <p style="color: #94a3b8; font-size: 14px; margin: 0;">Hello ${name ? name : 'Traveler'}, enter this 6-digit code to securely access your travel account.</p>
            </div>
            <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,137,47,0.4); border-radius: 12px; padding: 22px; text-align: center; margin: 24px 0;">
              <div style="font-size: 38px; font-weight: 800; letter-spacing: 10px; color: #FF892F; font-family: monospace;">${code}</div>
              <p style="font-size: 12px; color: #94a3b8; margin: 10px 0 0 0;">Valid for 10 minutes · Keep strictly private</p>
            </div>
            <p style="font-size: 13px; color: #64748b; line-height: 1.6; margin: 0; text-align: center;">
              Comfort Journey (Est. 1992) — Handcrafted luxury travel packages worldwide.<br />
              If you did not request this verification code, you can safely ignore this email.
            </p>
          </div>
        `;

        // 1. Send via Brevo API (Free 300 emails/day = 9,000/mo)
        if (brevoKey) {
          const bRes = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api-key': brevoKey
            },
            body: JSON.stringify({
              sender: { name: senderName, email: senderEmail },
              to: [{ email, name: name || 'Traveler' }],
              subject,
              htmlContent: html
            })
          });
          if (bRes.ok) {
            return jsonResponse({ success: true, provider: 'brevo', message: 'Verification email dispatched successfully via Brevo.' });
          }
        }

        // 2. Send via Resend API (Free 3,000 emails/mo)
        if (resendKey) {
          const rRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${resendKey}`
            },
            body: JSON.stringify({
              from: `${senderName} <${senderEmail.includes('@comfortjourney.in') ? 'onboarding@resend.dev' : senderEmail}>`,
              to: [email],
              subject,
              html
            })
          });
          if (rRes.ok) {
            return jsonResponse({ success: true, provider: 'resend', message: 'Verification email dispatched successfully via Resend.' });
          }
        }

        return jsonResponse({
          success: true,
          provider: 'edge_simulated',
          message: 'OTP processed. To enable live edge email delivery, add BREVO_API_KEY (free 9,000/mo) or RESEND_API_KEY in Cloudflare Worker secrets.',
          code: code
        });
      } catch (err) {
        return jsonResponse({ error: `OTP dispatch failed: ${err.message}` }, 500);
      }
    }

    return jsonResponse({ error: 'Endpoint Not Found' }, 404);
  }
};
