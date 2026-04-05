/** Canonical site origin for SEO (Open Graph, JSON-LD). Set in `.env` as VITE_SITE_URL for production builds. */
export const SITE_ORIGIN = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ?? "";

/**
 * Absolute URL for a path (e.g. `/research`). In the browser without VITE_SITE_URL, uses `window.location.origin`.
 */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (SITE_ORIGIN) return `${SITE_ORIGIN}${normalized}`;
  if (typeof window !== "undefined") return `${window.location.origin}${normalized}`;
  return normalized;
}

export const SITE = {
  name: "Joe Raad",
  shortTitle: "Joe Raad — Academic website",
  defaultDescription:
    "Joe Raad is Associate Professor (Maître de Conférences) in Computer Science at Université Paris-Saclay (LISN / LaHDAK). Research on knowledge graphs, semantic web, identity management, and knowledge representation.",
  defaultImagePath: "/myphoto.jpg",
  /** Used for og:image:alt and twitter:image:alt (social previews + accessibility). */
  ogImageAlt: "Portrait of Joe Raad",
  twitterHandle: "@joeraad",
  locale: "en_US",
} as const;
