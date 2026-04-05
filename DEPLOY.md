# Deploy to GitHub Pages with a custom domain (`www.joe-raad.com`)

This project ships a **GitHub Actions** workflow (`.github/workflows/deploy.yml`) that builds the site and publishes it to a branch named **`gh-pages`**. GitHub Pages then serves that branch as your website.

The canonical URL used in this repo is **`https://www.joe-raad.com`** (see `.env.example`, `index.html`, and `public/sitemap.xml`). The same hostname must appear in **`public/CNAME`**.

---

## About the `gh-pages` branch (you usually do not create it by hand)

**You do not need an existing `gh-pages` branch in the repository before you start.**

The deploy step uses [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages), which **creates** the `gh-pages` branch automatically the first time the workflow runs successfully. It copies the contents of the built `dist/` folder to that branch.

- **Before the first successful deploy:** the branch list may only show `main` (or `master`). That is normal.
- **After the first successful deploy:** you will see a new branch **`gh-pages`** in the repo (e.g. **Code** → branch dropdown).

**Optional manual creation (not required):** If you ever need an empty `gh-pages` branch for troubleshooting, you can create an orphan branch locally and push it—but for this project, relying on the workflow is the intended path.

---

## Step 1 — Push the repository to GitHub

1. Create a new repository on GitHub (empty is fine—no need to add a README if you already have one locally).
2. Add the remote and push your default branch (usually **`main`**):

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username (or organization) and repository name.

---

## Step 2 — Allow GitHub Actions to push `gh-pages`

The workflow must be allowed to **push a branch** using `GITHUB_TOKEN`.

1. Open the repo on GitHub → **Settings**.
2. **Actions** → **General**.
3. Under **Workflow permissions**, select **Read and write permissions**.
4. Save.

If this stays on “Read repository contents”, the deploy step will fail when it tries to create or update `gh-pages`.

---

## Step 3 — Run the workflow once (this creates `gh-pages`)

1. Push a commit to **`main`** or **`master`** (or use **Actions** → **Deploy to GitHub Pages** → **Run workflow** if you add `workflow_dispatch` later).
2. Open **Actions** and wait until **Deploy to GitHub Pages** finishes with a **green** checkmark.

When it succeeds:

- The **`gh-pages`** branch appears in the repository.
- That branch contains only the **published static files** (from `dist/`), not your full source tree.

If the job fails, open the failed run and read the logs (common issues: workflow permissions from Step 2, or `npm ci` failing).

---

## Step 4 — Point GitHub Pages at the `gh-pages` branch

Do this **after** the first successful workflow run so the **`gh-pages`** branch exists.

1. Repo → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment** → **Source**, choose **Deploy from a branch** (not “GitHub Actions” for this setup).
3. Set:
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`
4. Save.

GitHub will show a URL like:

`https://YOUR_USERNAME.github.io/YOUR_REPO/`

Your site should load there over **HTTPS** before you add a custom domain. Test a few routes (e.g. `/research`) to confirm the SPA `404.html` behavior works.

---

## Step 5 — Custom domain and HTTPS on GitHub

1. Still under **Settings** → **Pages**, find **Custom domain**.
2. Enter **`www.joe-raad.com`** (must match `public/CNAME` in this repo).
3. Save.

GitHub will show DNS checks. When they pass, enable **Enforce HTTPS** (may take minutes to hours after DNS propagates).

Keeping **`public/CNAME`** in your **source** branch (`main`) ensures each deploy still includes the correct hostname; the deploy action publishes `dist/`, which copies `public/CNAME` into the build output.

---

## Step 6 — Namecheap DNS for GitHub Pages

Log in to [Namecheap](https://www.namecheap.com/) → **Domain List** → **Manage** for **`joe-raad.com`** → **Advanced DNS**.

### 6a — `www` subdomain (required for `www.joe-raad.com`)

1. Remove or adjust anything that conflicts:
   - Disable **URL Redirect** records for `www` if you want GitHub to serve the site.
   - Remove duplicate `CNAME`/`ALIAS` for `www` that point elsewhere.
2. Add a **CNAME** record:

   | Type   | Host | Target                         | TTL       |
   |--------|------|---------------------------------|-----------|
   | CNAME Record | **www** | **YOUR_USERNAME.github.io** | Automatic or 30 min |

   Use the **same** GitHub username or organization name that owns the repository (not the repo name). Example: repo `my-academic-website` under user `joeraad` → target is **`joeraad.github.io`**.

3. Save.

### 6b — Apex `joe-raad.com` (optional)

If you want visitors to open **`https://joe-raad.com`** without `www`, add **four A records** for host **`@`** (GitHub may update IPs—verify [GitHub’s apex domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)):

| Type | Host | Value             |
|------|------|-------------------|
| A Record | @ | `185.199.108.153` |
| A Record | @ | `185.199.109.153` |
| A Record | @ | `185.199.110.153` |
| A Record | @ | `185.199.111.153` |

Then in **GitHub Pages** settings you can enable **redirect** from apex to **`www`** so one canonical host matches this project’s URLs (`www.joe-raad.com`).

### 6c — Propagation and HTTPS

- DNS changes can take **a few minutes to 48 hours**.
- After GitHub verifies the domain, **HTTPS** is provided by GitHub; you do not buy or install a certificate on Namecheap for Pages.

---

## Step 7 — Ongoing deploys

Every push to **`main`** or **`master`** runs the workflow again, rebuilds `dist/`, and **updates** the `gh-pages` branch. No manual merge to `gh-pages` is required.

---

## Production build URL (`VITE_SITE_URL`)

The workflow already sets `VITE_SITE_URL=https://www.joe-raad.com` during `npm run build` so Open Graph and JSON-LD use your real domain. To change the domain, edit `.github/workflows/deploy.yml` (the `env` block on the build step) and align `index.html`, `public/sitemap.xml`, `public/robots.txt`, and `public/CNAME`.

---

## SPA routing on GitHub Pages

Direct links such as `/research` work because `npm run build` copies the built **`index.html`** to **`404.html`** in `dist/`. GitHub Pages serves that file for unknown paths, and React Router handles the route in the browser.
