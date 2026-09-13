# 🚀 2-Minute Setup: Secure Cloudflare Worker for Comfort Journey CMS

This setup completely hides your GitHub Token inside Cloudflare. **No secrets are ever visible in GitHub code, commits, or visitor browsers.**

---

### Step 1: Open Cloudflare Dashboard (100% Free)

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com).
2. On the left sidebar, click **Workers & Pages**.
3. Click **Create Application** → **Create Worker**.
4. Name your worker: `comfort-journey-sync` (or anything you prefer).
5. Click **Deploy**.

---

### Step 2: Paste the Worker Code

1. Click **Edit code** in the top right of your worker page.
2. Delete whatever template code is in `worker.js`.
3. Open `cloudflare-worker/worker.js` from this project, **Copy All**, and **Paste** it into the Cloudflare code editor.
4. Click **Deploy** (top right).

---

### Step 3: Add Your Secret GitHub Token

1. Go back to your Worker overview page (click the Worker name at the top left).
2. Click the **Settings** tab.
3. On the left, click **Variables and Secrets**.
4. Under **Secret Variables**, click **Add**:
   - **Variable name**: `GITHUB_TOKEN`
   - **Value**: Your new GitHub Personal Access Token (`ghp_...` from [github.com/settings/tokens](https://github.com/settings/tokens))
   - Click **Save and Deploy**.

*(Optional)* You can also add:
- `GITHUB_REPO` = `comfort-journey/comfort-journey-website`
- `GITHUB_BRANCH` = `main`

---

### Step 4: Copy Your Worker URL & Put into CMS

1. On your Worker overview page, copy your Worker URL (it looks like `https://comfort-journey-sync.<your-name>.workers.dev`).
2. Open your website CMS → click **Global Live Sync** tab.
3. Paste the URL into **Cloudflare Worker Endpoint**.
4. Click **Save Configuration**.

**That's it! All employees worldwide can now 1-click publish live updates with 100% enterprise-grade security.**
