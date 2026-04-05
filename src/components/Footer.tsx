import { Linkedin, GraduationCap } from "lucide-react";
import { useLocation } from "react-router-dom";
import { GOOGLE_SCHOLAR_URL, LINKEDIN_URL } from "@/config/links";
import { getRouteChrome } from "@/config/routeTheme";
import { cn } from "@/lib/utils";

const Footer = () => {
  const { pathname } = useLocation();
  const chrome = getRouteChrome(pathname);

  const socialIconClass = cn(
    "inline-flex items-center justify-center rounded-lg p-1.5 text-link ring-1 ring-link/20 transition-colors hover:text-link-hover hover:ring-link/40",
    chrome.socialIcon
  );

  return (
    <footer className={cn("py-4 md:py-0 md:min-h-[3rem]", chrome.footer)}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 md:h-12">
          <p className="text-xs md:text-sm text-muted-foreground">© {new Date().getFullYear()} Joe Raad</p>
          <div className="flex items-center gap-2">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={socialIconClass} aria-label="LinkedIn">
              <Linkedin size={20} strokeWidth={2.25} />
            </a>
            <a href={GOOGLE_SCHOLAR_URL} target="_blank" rel="noopener noreferrer" className={socialIconClass} aria-label="Google Scholar">
              <GraduationCap size={20} strokeWidth={2.25} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
