/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical site URL for SEO (no trailing slash), e.g. https://joe-raad.com */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
