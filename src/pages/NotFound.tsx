import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ContentSurface } from "@/components/ContentSurface";
import { PageMeta } from "@/components/seo/PageMeta";
import { PAGE_SEO } from "@/config/seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <PageMeta
        title={PAGE_SEO.notFound.title}
        description={PAGE_SEO.notFound.description}
        path={location.pathname}
        robots="noindex, nofollow"
      />
      <div className="relative min-h-[60vh] overflow-hidden bg-muted">
        <div className="shell-grid" aria-hidden />
        <div className="shell-grid-fine" aria-hidden />
        <div className="relative z-10 flex min-h-[60vh] items-center justify-center px-4">
          <ContentSurface className="max-w-md text-center">
            <h1 className="mb-4 text-4xl font-bold">404</h1>
            <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
            <a href="/">Return to Home</a>
          </ContentSurface>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
