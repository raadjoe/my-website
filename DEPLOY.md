# Deploy to GitHub Pages (`www.joe-raad.com`)

This repo is set up for **GitHub Pages** from the **`gh-pages` branch** (built by GitHub Actions). The canonical site URL in code is **`https://www.joe-raad.com`** (see `.env.example`, `index.html`, and `public/sitemap.xml`).

## 1. GitHub repository

1. Push this project to a GitHub repository (e.g. `https://github.com/YOUR_USERNAME/my-academic-website`).
2. Open the repo → **Settings** → **Actions** → **General** → ensure **Workflow permissions** allows **Read and write** (so the workflow can push to `gh-pages`).

## 2. Enable GitHub Pages

1. Repo → **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
3. Branch: **`gh-pages`**, folder **`/ (root)`**.
4. After the first successful workflow run, the site will be available at  
   `https://YOUR_USERNAME.github.io/REPO_NAME/` until a custom domain is configured.

## 3. Custom domain + HTTPS on GitHub

1. Still under **Settings** → **Pages**, in **Custom domain**, enter: **`www.joe-raad.com`**  
   (must match `public/CNAME` in this repo).
2. Save. Check **Enforce HTTPS** once DNS has propagated and GitHub shows the certificate as ready (can take up to 24–48 hours after DNS is correct).

GitHub automatically commits a `CNAME` file on `gh-pages`; keeping `public/CNAME` in the source repo avoids it being overwritten incorrectly on the next deploy.

## 4. Namecheap DNS for `www.joe-raad.com`

Log in to [Namecheap](https://www.namecheap.com/) → **Domain List** → **Manage** next to `joe-raad.com` → **Advanced DNS**.

1. **Remove** conflicting records for `@` or `www` if you were using URL redirect or parking only (disable **URL Redirect Record** for the same host if it conflicts).
2. Add a **CNAME** record:
   - **Host**: `www`
   - **Target**: `YOUR_USERNAME.github.io`  
     (replace `YOUR_USERNAME` with your GitHub username or organization name that owns the repo.)
   - **TTL**: Automatic or 30 min.

Save.

**Apex domain `joe-raad.com` (optional):**  
If you want bare `joe-raad.com` to work, add **A records** for host **`@`** pointing to GitHub Pages IPs (see [GitHub’s current list](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)):

- `185.199.108.153`  
- `185.199.109.153`  
- `185.199.110.153`  
- `185.199.111.153`

Then in GitHub **Pages** you can enable **Redirect** from apex to `www` if you want a single canonical host (recommended to match this project’s `www` URLs).

## 5. Production SEO URL in builds (optional)

For Open Graph / JSON-LD absolute URLs in the built JS, set in GitHub **Secrets** (or **Variables**) for Actions:

- Name: `VITE_SITE_URL`  
- Value: `https://www.joe-raad.com`

Then add to the workflow before `npm run build`:

```yaml
env:
  VITE_SITE_URL: ${{ vars.VITE_SITE_URL }}
```

Or hardcode for a personal site:

```yaml
env:
  VITE_SITE_URL: https://www.joe-raad.com
```

If you skip this, the app still works; `absoluteUrl()` falls back to `window.location.origin` in the browser.

## 6. Trigger deploy

Push to **`main`** (or **`master`**). The workflow **Deploy to GitHub Pages** builds the site and updates the **`gh-pages`** branch.

---

### SPA routing on GitHub Pages

Direct links like `/research` are handled by copying the built `index.html` to **`404.html`** in `dist/` during `npm run build`, so GitHub Pages serves your app shell for unknown paths and React Router can take over.
