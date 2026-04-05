import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Linkedin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GOOGLE_SCHOLAR_URL, LINKEDIN_URL } from "@/config/links";
import { getRouteChrome } from "@/config/routeTheme";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/research", label: "Research" },
  { to: "/teaching", label: "Teaching" },
  { to: "/publications", label: "Publications" },
  { to: "/awards", label: "Awards" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const chrome = getRouteChrome(location.pathname);

  const socialIconClass = cn(
    "inline-flex items-center justify-center rounded-xl p-2 text-link ring-1 ring-link/20 transition-colors hover:text-link-hover hover:ring-link/40",
    chrome.socialIcon
  );

  return (
    <nav className={cn("sticky top-0 z-50 shadow-sm", chrome.nav)}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link
            to="/"
            className="nova-square-regular text-2xl text-foreground tracking-tight"
          >
            Joe Raad
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-link/10 text-link"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={socialIconClass} aria-label="LinkedIn">
              <Linkedin size={22} strokeWidth={2.25} />
            </a>
            <a href={GOOGLE_SCHOLAR_URL} target="_blank" rel="noopener noreferrer" className={socialIconClass} aria-label="Google Scholar">
              <GraduationCap size={22} strokeWidth={2.25} />
            </a>
            <Button size="sm" className="ml-2 rounded-full text-base" asChild>
              <a href="mailto:joe.raad@universite-paris-saclay.fr">Contact</a>
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isOpen && (
          <div className={cn("md:hidden pb-3 border-t pt-3 space-y-1", chrome.mobileNavDivider)}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-link/10 text-link"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 px-3 pt-3">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={socialIconClass} aria-label="LinkedIn">
                <Linkedin size={22} strokeWidth={2.25} />
              </a>
              <a href={GOOGLE_SCHOLAR_URL} target="_blank" rel="noopener noreferrer" className={socialIconClass} aria-label="Google Scholar">
                <GraduationCap size={22} strokeWidth={2.25} />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
