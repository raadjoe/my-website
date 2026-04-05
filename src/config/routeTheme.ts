/**
 * Navbar/footer chrome colors per route — matches each page’s main section background.
 * Home (`/`) keeps the shell beige; other routes mirror SectionWrapper classes.
 */
export type RouteChrome = {
  nav: string;
  footer: string;
  mobileNavDivider: string;
  socialIcon: string;
};

const home: RouteChrome = {
  nav: "bg-shell border-b border-shell-muted/60",
  footer: "border-t border-shell-muted/70 bg-shell",
  mobileNavDivider: "border-shell-muted/60",
  socialIcon:
    "bg-shell-muted/40 hover:bg-shell-muted/70 hover:text-link-hover hover:ring-link/40",
};

const research: RouteChrome = {
  nav: "bg-pastel-sage/95 backdrop-blur-md border-b border-border/50 shadow-md",
  footer: "border-t border-border/50 bg-pastel-sage/50",
  mobileNavDivider: "border-border/50",
  socialIcon: "bg-muted/35 hover:bg-muted/55 hover:text-link-hover hover:ring-link/40",
};

const publications: RouteChrome = {
  nav: "bg-pastel-lavender/95 backdrop-blur-md border-b border-border/50 shadow-md",
  footer: "border-t border-border/50 bg-pastel-lavender/50",
  mobileNavDivider: "border-border/50",
  socialIcon: "bg-muted/35 hover:bg-muted/55 hover:text-link-hover hover:ring-link/40",
};

const teaching: RouteChrome = {
  nav: "bg-pastel-blue/95 backdrop-blur-md border-b border-border/50 shadow-md",
  footer: "border-t border-border/50 bg-pastel-blue/50",
  mobileNavDivider: "border-border/50",
  socialIcon: "bg-muted/35 hover:bg-muted/55 hover:text-link-hover hover:ring-link/40",
};

const awards: RouteChrome = {
  nav: "bg-pastel-mustard/95 backdrop-blur-md border-b border-border/50 shadow-md",
  footer: "border-t border-border/50 bg-pastel-mustard/50",
  mobileNavDivider: "border-border/50",
  socialIcon: "bg-muted/35 hover:bg-muted/55 hover:text-link-hover hover:ring-link/40",
};

/** 404 and unknown paths — matches NotFound `bg-muted` */
const fallback: RouteChrome = {
  nav: "bg-muted border-b border-border/60",
  footer: "border-t border-border/60 bg-muted",
  mobileNavDivider: "border-border/60",
  socialIcon: "bg-background/50 hover:bg-background/70 hover:text-link-hover hover:ring-link/40",
};

const byPath: Record<string, RouteChrome> = {
  "/": home,
  "/research": research,
  "/publications": publications,
  "/teaching": teaching,
  "/awards": awards,
};

export function getRouteChrome(pathname: string): RouteChrome {
  return byPath[pathname] ?? fallback;
}
