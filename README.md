# Academic website (Joe Raad)

A static, client-side personal academic site: home, research, teaching, publications, and awards. Built with React and deployed as pre-rendered assets from Vite.

## Languages and frameworks

| Layer | Choice |
|--------|--------|
| **Language** | TypeScript |
| **UI** | React 18 |
| **Routing** | React Router 6 (`BrowserRouter`, declarative `Routes`) |
| **Build** | Vite 5 with `@vitejs/plugin-react-swc` |
| **Styling** | Tailwind CSS 3 + CSS variables (design tokens in `src/index.css`) |
| **Components** | shadcn-style primitives (`@radix-ui/react-slot`, `class-variance-authority`, `tailwind-merge`) |
| **Icons** | Lucide React |

There is no backend: the app is a SPA that can be served from any static host (GitHub Pages, Netlify, Vercel static, etc.).

## Architecture

**Entry and shell**

- `index.html` — document shell, font preconnects, Nova Square stylesheet link, favicon.
- `src/main.tsx` — mounts React to `#root` and loads global styles.
- `src/App.tsx` — wraps the app in `BrowserRouter`, renders `Navbar`, `Routes`, and `Footer`.

**Pages** (`src/pages/`)

Each route is a page component. Content is authored in TSX (and in config where noted).

| Route | Page |
|--------|------|
| `/` | `Index.tsx` — hero, about preview |
| `/research` | `Research.tsx` |
| `/publications` | `Publications.tsx` |
| `/teaching` | `Teaching.tsx` |
| `/awards` | `Awards.tsx` |
| `*` | `NotFound.tsx` |

**Layout and UI**

- `Navbar.tsx` / `Footer.tsx` — global chrome and links.
- `PageHero.tsx`, `SectionWrapper.tsx`, `ContentSurface.tsx` — repeated section patterns and frosted surfaces.
- `src/components/ui/` — shared primitives (`button`, `card`, `input`, …).

**Configuration** (`src/config/`)

- `site.ts` — site name, default SEO copy, image path; `absoluteUrl()` uses `VITE_SITE_URL` when set.
- `seo.ts` — per-page titles, descriptions, keywords, JSON-LD helpers.
- `links.ts` — external URLs (e.g. Google Scholar, LinkedIn).
- `routeTheme.ts` — per-route navbar/footer tints and contrast.

**SEO**

- `src/components/seo/PageMeta.tsx` — updates `document.title`, meta tags, and optional JSON-LD per page.

**Assets**

- `public/` — files copied as-is to the build root (e.g. `robots.txt`, `CNAME`, `.nojekyll`, images referenced by path).

**Request flow (conceptual)** — `index.html` loads `main.tsx` → `App.tsx` → shell (`Navbar`, `Footer`) + `Routes` → each page may use `PageMeta` and shared layout components.

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** (comes with Node)

## How to run locally

Install dependencies:

```bash
npm install
```

Start the dev server (default in this project: **port 8080**):

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:8080`).

## Other commands

| Command | Purpose |
|---------|---------|
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the `dist/` build locally |
| `npm run lint` | ESLint on `*.{ts,tsx}` |

## Environment variables

Copy `.env.example` to `.env` or `.env.production` and set:

- **`VITE_SITE_URL`** — canonical origin (no trailing slash), e.g. `https://joe-raad.com`. Used for absolute Open Graph / JSON-LD URLs in production builds. If unset, client code falls back to `window.location.origin` in the browser.

## Build output

`npm run build` emits static files under `dist/`. Deploy that folder to your host; configure the host for SPA fallback to `index.html` if you use client-side routes on deep links.

## Publish with GitHub Pages (`https://joe-raad.com`)

This repo is set up to deploy automatically:

| Piece | Role |
|--------|------|
| [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) | On every push to `main` or `master` (or manual **Run workflow**), runs `npm ci`, `npm run build` with `VITE_SITE_URL=https://joe-raad.com`, and pushes `dist/` to the **`gh-pages`** branch. |
| `public/CNAME` | Tells GitHub Pages the custom hostname is **`joe-raad.com`** (apex, no `www`). |
| `public/.nojekyll` | Disables Jekyll processing on Pages so static assets behave predictably. |

**Quick checklist**

1. Push this repo to GitHub and enable **Settings → Actions → General → Workflow permissions → Read and write permissions** (required so the workflow can update `gh-pages`).
2. After the first successful workflow run, set **Settings → Pages → Build and deployment → Branch** to **`gh-pages`** / **`/(root)`**.
3. Add **Settings → Pages → Custom domain**: **`joe-raad.com`**, then configure DNS at your registrar (A records for the apex to GitHub’s IPs—see below).
4. Turn on **Enforce HTTPS** once DNS verifies.

Full DNS and troubleshooting steps are in **[DEPLOY.md](./DEPLOY.md)**.
