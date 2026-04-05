import { useEffect, useMemo, useState } from "react";
import { Search, ExternalLink, Loader2 } from "lucide-react";
import { ContentSurface } from "@/components/ContentSurface";
import { PageHero } from "@/components/PageHero";
import { Input } from "@/components/ui/input";
import SectionWrapper from "@/components/SectionWrapper";
import { PageMeta } from "@/components/seo/PageMeta";
import { getWebPageStructuredData, PAGE_SEO } from "@/config/seo";

interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  url: string;
}

const decodeHtml = (html: string): string => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

/** DBLP JSON hit shape (partial) */
interface DblpHit {
  info: {
    title?: string;
    venue?: string;
    year?: string;
    ee?: string;
    url?: string;
    authors?: { author?: string | { text?: string } | Array<string | { text?: string }> };
  };
}

function formatAuthors(authorField: DblpHit["info"]["authors"]): string {
  const raw = authorField?.author;
  if (typeof raw === "string") return raw;
  if (!Array.isArray(raw)) {
    if (raw && typeof raw === "object" && "text" in raw) return raw.text ?? "";
    return "";
  }
  return raw.map((a) => (typeof a === "string" ? a : a?.text ?? "")).join(", ");
}

const fetchFromDBLP = async (): Promise<Publication[]> => {
  try {
    const res = await fetch(
      `https://dblp.org/search/publ/api?q=author:Joe_Raad:&h=200&format=json`
    );
    const data: { result?: { hits?: { hit?: DblpHit[] } } } = await res.json();
    const hits = data?.result?.hits?.hit ?? [];
    return hits.map((hit) => {
      const info = hit.info;
      return {
        title: decodeHtml(info.title ?? ""),
        authors: decodeHtml(formatAuthors(info.authors)),
        venue: decodeHtml(info.venue ?? ""),
        year: parseInt(info.year ?? "", 10) || 0,
        url: info.ee || info.url || "#",
      };
    });
  } catch {
    return [];
  }
};

const fallbackPublications: Publication[] = [
  {
    title: "Constructing and Cleaning Identity Graphs in the LOD Cloud",
    authors: "Joe Raad, Wouter Beek, Frank van Harmelen, Jan Wielemaker, Nathalie Pernelle, Fatiha Saïs",
    venue: "Data Intelligence",
    year: 2020,
    url: "#",
  },
  {
    title: "Detecting Erroneous Identity Links on the Web Using Network Metrics",
    authors: "Joe Raad, Wouter Beek, Frank van Harmelen, Nathalie Pernelle, Fatiha Saïs",
    venue: "ISWC",
    year: 2018,
    url: "#",
  },
  {
    title: "sameAs.cc: The Closure of 500M owl:sameAs Statements",
    authors: "Wouter Beek, Joe Raad, Jan Wielemaker, Frank van Harmelen",
    venue: "ESWC",
    year: 2018,
    url: "#",
  },
  {
    title: "On the Impact of sameAs on Schema Matching",
    authors: "Joe Raad, Erman Acar, Stefan Schlobach",
    venue: "K-CAP",
    year: 2019,
    url: "#",
  },
  {
    title: "MetaLink: A Travel Guide to the LOD Cloud",
    authors: "Wouter Beek, Joe Raad, Erman Acar, Frank van Harmelen",
    venue: "ESWC",
    year: 2020,
    url: "#",
  },
];

const Publications = () => {
  const jsonLd = useMemo(
    () => getWebPageStructuredData("/publications", PAGE_SEO.publications.title, PAGE_SEO.publications.description),
    []
  );
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchFromDBLP().then((pubs) => {
      setPublications(pubs.length > 0 ? pubs : fallbackPublications);
      setLoading(false);
    });
  }, []);

  const searchLower = search.toLowerCase();
  const filtered = publications.filter(
    (p) =>
      p.title.toLowerCase().includes(searchLower) ||
      p.authors.toLowerCase().includes(searchLower) ||
      p.venue.toLowerCase().includes(searchLower)
  );

  const grouped = filtered.reduce<Record<number, Publication[]>>((acc, pub) => {
    (acc[pub.year] = acc[pub.year] || []).push(pub);
    return acc;
  }, {});

  const sortedYears = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div>
      <PageMeta
        title={PAGE_SEO.publications.title}
        description={PAGE_SEO.publications.description}
        keywords={PAGE_SEO.publications.keywords}
        path="/publications"
        jsonLd={jsonLd}
      />
      <SectionWrapper className="bg-pastel-lavender/50">
        <div className="max-w-4xl mx-auto space-y-8">
          <PageHero>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 text-center">
              Publications
            </h1>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-8 leading-relaxed">
              My publications are fetched automatically from{" "}
              <a href="https://dblp.org/pid/172/1627.html" target="_blank" rel="noopener noreferrer">
                DBLP
              </a>. You can search by title, author, or venue.
            </p>

            <div className="relative max-w-md mx-auto">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search publications..."
                className="pl-10 rounded-full bg-background/80"
              />
            </div>
          </PageHero>

          {loading ? (
            <ContentSurface className="flex justify-center py-16">
              <Loader2 className="animate-spin text-primary" size={32} />
            </ContentSurface>
          ) : sortedYears.length === 0 ? (
            <ContentSurface>
              <p className="text-center text-muted-foreground py-6">No publications found.</p>
            </ContentSurface>
          ) : (
            <div className="space-y-8">
              {sortedYears.map((year) => (
                <ContentSurface key={year}>
                  <h2 className="text-2xl font-bold text-foreground mb-4 border-b border-border pb-2">
                    {year}
                  </h2>
                  <ul className="space-y-4">
                    {grouped[year].map((pub, i) => (
                      <li
                        key={i}
                        className="rounded-xl border border-border/40 bg-background/30 p-4 backdrop-blur-sm transition-shadow hover:bg-background/45 hover:shadow-sm"
                      >
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group"
                        >
                          <h3 className="text-base font-semibold text-foreground group-hover:text-link transition-colors flex items-start gap-2 min-w-0 break-words">
                            {pub.title}
                            <ExternalLink size={14} className="mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                        </a>
                        <p className="text-base text-muted-foreground mt-1">{pub.authors}</p>
                        <p className="text-base text-primary/70 mt-0.5 italic">{pub.venue}</p>
                      </li>
                    ))}
                  </ul>
                </ContentSurface>
              ))}
            </div>
          )}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Publications;
