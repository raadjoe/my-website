import { GOOGLE_SCHOLAR_URL, LINKEDIN_URL } from "./links";
import { absoluteUrl, SITE } from "./site";

/** Per-route SEO copy — used for document title, meta description, and keywords. */
export const PAGE_SEO = {
  home: {
    title: `${SITE.name} | Associate Prof.`,
    description:
      "Joe Raad — Associate Professor at Université Paris-Saclay (LISN / LaHDAK). Research on knowledge representation, the web of data, and intelligent systems; teaching in computer science at the IUT of Orsay and graduate programmes.",
    keywords:
      "Joe Raad, Université Paris-Saclay, Paris-Saclay, LISN, LaHDAK, knowledge graphs, semantic web, linked data, knowledge representation, artificial intelligence, identity management, sameAs, RDF, OWL",
  },
  research: {
    title: `Research | ${SITE.name}`,
    description:
      "Research areas: knowledge graph refinement, identity management in the web of data, semantic web and linked data — Joe Raad, Associate Professor at Université Paris-Saclay.",
    keywords:
      "Joe Raad research, knowledge graph refinement, identity graphs, LOD cloud, semantic web, linked open data, KRR, AI",
  },
  publications: {
    title: `Publications | ${SITE.name}`,
    description:
      "Peer-reviewed publications and papers by Joe Raad (DBLP): semantic web, knowledge graphs, identity links, and related topics — with links to venues and full text where available.",
    keywords:
      "Joe Raad publications, DBLP, semantic web papers, ISWC, ESWC, knowledge graphs publications",
  },
  teaching: {
    title: `Teaching | ${SITE.name}`,
    description:
      "Teaching at Université Paris-Saclay (IUT Orsay, international relations), AIDAMS, HEPTA, and M2 Data Science: semantic web, knowledge representation, databases, data science, and programming.",
    keywords:
      "Joe Raad teaching, Paris-Saclay, IUT Orsay, AIDAMS, HEPTA, ESSEC, semantic web, knowledge representation, databases, data science, M2 Data Science",
  },
  awards: {
    title: `Awards & honors | ${SITE.name}`,
    description:
      "Awards and honors: AFIA PhD thesis recognition, Best Paper at IC/PFIA, Best Resource Paper at ESWC — Joe Raad (Paris-Saclay).",
    keywords:
      "Joe Raad awards, ESWC, IC PFIA, AFIA, Best Resource Paper, Ingénierie des Connaissances, semantic web, knowledge graphs",
  },
  notFound: {
    title: `Page not found | ${SITE.name}`,
    description: "The requested page could not be found.",
    keywords: "",
  },
} as const;

/** JSON-LD for inner pages (AboutPage-style clarity for crawlers). */
export function getWebPageStructuredData(pathname: string, title: string, description: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    inLanguage: "en",
    url: absoluteUrl(pathname),
    isPartOf: {
      "@type": "WebSite",
      name: SITE.shortTitle,
      url: absoluteUrl("/"),
    },
  };
}

/** JSON-LD for the home page (Person + WebSite) — helps search engines and AI assistants. */
export function getHomeStructuredData(): Record<string, unknown> {
  const url = absoluteUrl("/");
  const image = absoluteUrl(SITE.defaultImagePath);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        name: SITE.shortTitle,
        url,
        description: PAGE_SEO.home.description,
        inLanguage: "en",
        author: { "@id": `${url}#person` },
      },
      {
        "@type": "Person",
        "@id": `${url}#person`,
        name: SITE.name,
        url,
        image: { "@type": "ImageObject", url: image },
        jobTitle: "Associate Professor of Computer Science",
        worksFor: {
          "@type": "CollegeOrUniversity",
          name: "Université Paris-Saclay",
          sameAs: "https://www.universite-paris-saclay.fr/",
        },
        sameAs: [LINKEDIN_URL, GOOGLE_SCHOLAR_URL],
        knowsAbout: [
          "Knowledge graphs",
          "Semantic Web",
          "Linked data",
          "Identity management",
          "Knowledge representation and reasoning",
        ],
      },
    ],
  };
}
