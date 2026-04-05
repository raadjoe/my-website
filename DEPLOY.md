# Deploy to GitHub Pages with a custom domain (`joe-raad.com`)

This project uses a **GitHub Actions** workflow ([`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)) that builds the site and publishes it to the **`gh-pages`** branch. GitHub Pages serves that branch as your website.

The canonical URL in this repo is **`https://joe-raad.com`** (apex only, no `www`). The same hostname must appear in **`public/CNAME`**, **`index.html`**, **`public/sitemap.xml`**, **`public/robots.txt`**, and in the workflow’s `VITE_SITE_URL` build variable.

---

## About the `gh-pages` branch (you usually do not create it by hand)

**You do not need an existing `gh-pages` branch before you start.**

The deploy step uses [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages), which **creates** the `gh-pages` branch automatically the first time the workflow runs successfully. It copies the contents of the built `dist/` folder to that branch.

- **Before the first successful deploy:** the branch list may only show `main` (or `master`). That is normal.
- **After the first successful deploy:** you will see a new branch **`gh-pages`** (e.g. **Code** → branch dropdown).

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

1. Push a commit to **`main`** or **`master`**, or open **Actions** → **Deploy to GitHub Pages** → **Run workflow** (manual runs are enabled).
2. Open **Actions** and wait until the run finishes with a **green** checkmark.

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

## Step 5 — Custom domain and HTTPS on GitHub (apex `joe-raad.com`)

1. Still under **Settings** → **Pages**, find **Custom domain**.
2. Enter **`joe-raad.com`** (must match `public/CNAME` in this repo).
3. Save.

GitHub will show DNS checks. When they pass, enable **Enforce HTTPS** (may take minutes to hours after DNS propagates).

Keeping **`public/CNAME`** in your **source** branch (`main`) ensures each deploy still includes the correct hostname; the build copies `public/` into `dist/`, which the action publishes.

### Optional: redirect `www` to apex

If you also own **`www.joe-raad.com`**, you can point it at GitHub and let Pages redirect to **`https://joe-raad.com`**:

1. In DNS, add a **CNAME** for host **`www`** → **`YOUR_USERNAME.github.io`** (user or org that owns the repo).
2. In **Pages** → **Custom domain**, add **`www.joe-raad.com`** as an additional domain if GitHub prompts you, or rely on a single apex domain and CNAME for `www` only—follow [GitHub’s custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) for the exact UI on your account.

---

## Step 6 — DNS (example: Namecheap)

Log in to your registrar (e.g. [Namecheap](https://www.namecheap.com/)) → **Domain List** → **Manage** for **`joe-raad.com`** → **Advanced DNS**.

### Apex `joe-raad.com` (required for `https://joe-raad.com`)

1. Remove or adjust anything that conflicts (e.g. **URL Redirect** or wrong **A** records for `@`).
2. Add **four A records** for host **`@`** (GitHub may update IPs—verify [GitHub’s apex domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)):

   | Type     | Host | Value             |
   |----------|------|-------------------|
   | A Record | @    | `185.199.108.153` |
   | A Record | @    | `185.199.109.153` |
   | A Record | @    | `185.199.110.153` |
   | A Record | @    | `185.199.111.153` |

3. Save.

Use the **same** GitHub username or organization that owns the repository when interpreting GitHub’s DNS instructions.

### Propagation and HTTPS

- DNS changes can take **a few minutes to 48 hours**.
- After GitHub verifies the domain, **HTTPS** is provided by GitHub; you do not buy or install a certificate at the registrar for Pages.

---

## Step 7 — Ongoing deploys

Every push to **`main`** or **`master`** runs the workflow again, rebuilds `dist/`, and **updates** the `gh-pages` branch. No manual merge to `gh-pages` is required.

---

## Production build URL (`VITE_SITE_URL`)

The workflow sets `VITE_SITE_URL=https://joe-raad.com` during `npm run build` so Open Graph and JSON-LD use your real domain. To change the domain, edit [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) (the `env` block on the build step) and align `index.html`, `public/sitemap.xml`, `public/robots.txt`, `public/CNAME`, and `.env.example`.

---

## SPA routing on GitHub Pages

Direct links such as `/research` work because `npm run build` copies the built **`index.html`** to **`404.html`** in `dist/`. GitHub Pages serves that file for unknown paths, and React Router handles the route in the browser.
