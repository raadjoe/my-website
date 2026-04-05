import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { absoluteUrl, SITE } from "@/config/site";

export type PageMetaProps = {
  title: string;
  description: string;
  /** Comma-separated keywords; omit or empty to remove the keywords meta tag */
  keywords?: string;
  /** Path for canonical & og:url (default: current location) */
  path?: string;
  /** e.g. `noindex, nofollow` for error pages */
  robots?: string;
  /** Optional JSON-LD object (replaces `#page-jsonld` script) */
  jsonLd?: Record<string, unknown>;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(attr: "name" | "property", key: string) {
  document.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function removeLink(rel: string) {
  document.querySelector(`link[rel="${rel}"]`)?.remove();
}

/**
 * Updates document title and head tags when the route changes (SPA SEO).
 */
export function PageMeta({ title, description, keywords, path, robots, jsonLd }: PageMetaProps) {
  const location = useLocation();
  const pathname = path ?? location.pathname;
  const pageUrl = absoluteUrl(pathname);
  const imageUrl = absoluteUrl(SITE.defaultImagePath);
  const isNoIndex = Boolean(robots?.toLowerCase().includes("noindex"));

  useEffect(() => {
    document.title = title;

    upsertMeta("name", "description", description);

    if (keywords?.trim()) {
      upsertMeta("name", "keywords", keywords.trim());
    } else {
      removeMeta("name", "keywords");
    }

    if (robots?.trim()) {
      upsertMeta("name", "robots", robots.trim());
    } else {
      removeMeta("name", "robots");
    }

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", pageUrl);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:image:alt", SITE.ogImageAlt);
    upsertMeta("property", "og:site_name", SITE.name);
    upsertMeta("property", "og:locale", SITE.locale);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:site", SITE.twitterHandle);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertMeta("name", "twitter:image:alt", SITE.ogImageAlt);

    if (isNoIndex) {
      removeLink("canonical");
    } else {
      upsertLink("canonical", pageUrl);
    }

    const existing = document.getElementById("page-jsonld");
    if (jsonLd) {
      const script = existing ?? document.createElement("script");
      script.id = "page-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      if (!existing) document.head.appendChild(script);
    } else if (existing) {
      existing.remove();
    }
  }, [title, description, keywords, robots, pathname, pageUrl, imageUrl, jsonLd, isNoIndex]);

  return null;
}
