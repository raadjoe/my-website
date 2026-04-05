import { useMemo } from "react";
import { Award, ExternalLink, GraduationCap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentSurface } from "@/components/ContentSurface";
import { PageHero } from "@/components/PageHero";
import SectionWrapper from "@/components/SectionWrapper";
import { PageMeta } from "@/components/seo/PageMeta";
import { getWebPageStructuredData, PAGE_SEO } from "@/config/seo";

const THESIS_URL = "https://hal.science/tel-02073961/document";

const thesisRecognition = {
  year: "2019",
  headline: "Runner-up — Best French PhD Thesis in Artificial Intelligence",
  organization: "Association française pour l'intelligence artificielle (AFIA)",
  thesisTitle: "Identity Management in Knowledge Graphs",
  summary:
    "Recognition for doctoral thesis among national submissions in Artificial Intelligence.",
};

type ConferenceAward = {
  year: string;
  distinction: string;
  venue: string;
  paperTitle: string;
  authors: string;
  bibliographicNote?: string;
};

/** Newest first */
const conferenceAwards: ConferenceAward[] = [
  {
    year: "2023",
    distinction: "Best Paper Award",
    venue: "Journées francophones d'Ingénierie des Connaissances (IC - PFIA 2023)",
    paperTitle:
      "Étude de transférabilité des clés pour le liage de données entre graphes de connaissances",
    authors: "Thibaut Soulard, Fatiha Saïs, Joe Raad, and Gianluca Quercini",
  },
  {
    year: "2020",
    distinction: "Best Resource Paper Award",
    venue: "Extended Semantic Web Conference (ESWC 2020)",
    paperTitle: "MetaLink: A Travel Guide to the LOD Cloud",
    authors: "Wouter Beek, Joe Raad, Erman Acar, and Frank van Harmelen",
  },
  {
    year: "2018",
    distinction: "Best Resource Paper Award",
    venue: "Extended Semantic Web Conference (ESWC 2018)",
    paperTitle: "sameAs.cc: The Closure of 500M owl:sameAs Statements",
    authors: "Wouter Beek, Joe Raad, Jan Wielemaker, and Frank van Harmelen",
  },
  {
    year: "2017",
    distinction: "Best Paper Award",
    venue: "Journées francophones d'Ingénierie des Connaissances (IC - PFIA 2017)",
    paperTitle: "Détection de liens d'identité contextuels dans une base de connaissances",
    authors: "Joe Raad, Nathalie Pernelle, and Fatiha Saïs",
  },
];

const Awards = () => {
  const jsonLd = useMemo(
    () => getWebPageStructuredData("/awards", PAGE_SEO.awards.title, PAGE_SEO.awards.description),
    []
  );

  return (
    <div>
      <PageMeta
        title={PAGE_SEO.awards.title}
        description={PAGE_SEO.awards.description}
        keywords={PAGE_SEO.awards.keywords}
        path="/awards"
        jsonLd={jsonLd}
      />
      <SectionWrapper className="bg-pastel-mustard/50">
        <div className="max-w-3xl mx-auto space-y-8">
          <PageHero>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 text-center">
              Awards &amp; honors
            </h1>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">

            Glad to have contributed to research that was recognized by international and national conferences, and the French AI association (AFIA)</p>
          </PageHero>

          {/* PhD thesis — distinct featured block */}
          <ContentSurface
            aria-labelledby="phd-recognition-heading"
            className="border-primary/25 bg-gradient-to-br from-primary/[0.06] to-card"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-200/55 text-slate-600 ring-1 ring-inset ring-slate-300/40 shadow-sm">
                <GraduationCap className="h-6 w-6" aria-hidden />
              </div>
              <div className="min-w-0 flex-1 space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">{thesisRecognition.year}</p>
                  <h2 id="phd-recognition-heading" className="text-xl md:text-2xl font-bold text-foreground mt-1">
                    {thesisRecognition.headline}
                  </h2>
                  <p className="text-base text-muted-foreground mt-1">{thesisRecognition.organization}</p>
                </div>
                <p className="text-foreground leading-relaxed">
                  <span className="font-medium">Thesis:</span>{" "}
                  <cite className="not-italic font-semibold text-foreground">{thesisRecognition.thesisTitle}</cite>
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">{thesisRecognition.summary}</p>
                <div className="pt-2">
                  <Button asChild className="rounded-full gap-2">
                    <a href={THESIS_URL} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} aria-hidden />
                      View PhD thesis
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </ContentSurface>

          {/* Conference paper awards */}
          <ContentSurface className="relative">
            <section aria-labelledby="conference-awards-heading">
            <div className="flex items-center gap-2 justify-center mb-10">
              <Trophy className="h-5 w-5 shrink-0 text-amber-800/75 drop-shadow-[0_1px_1px_rgba(180,83,9,0.12)]" aria-hidden />
              <h2 id="conference-awards-heading" className="text-2xl font-bold text-foreground text-center">
                Conference paper awards
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-[1.375rem] top-3 bottom-3 w-px bg-border md:left-6" aria-hidden />
              <ul className="space-y-10">
                {conferenceAwards.map((item) => (
                  <li key={`${item.year}-${item.paperTitle}`} className="relative flex gap-5 md:gap-6 pl-1 md:pl-0">
                    <div className="flex shrink-0 flex-col items-center pt-1">
                      <div className="z-10 flex h-11 w-11 items-center justify-center rounded-full border border-amber-200/45 bg-amber-50/50 shadow-sm ring-1 ring-amber-200/30">
                        <Award className="h-5 w-5 text-amber-800/80" aria-hidden />
                      </div>
                    </div>
                    <article className="min-w-0 flex-1 rounded-xl border border-border/60 bg-card p-5 md:p-6 shadow-sm transition-shadow hover:shadow-md">
                      <p className="text-xs font-semibold text-primary tabular-nums">{item.year}</p>
                      <h3 className="mt-1 text-lg font-bold text-foreground">{item.distinction}</h3>
                      <p className="text-base text-muted-foreground mt-1 leading-snug">{item.venue}</p>
                      <p className="mt-4 text-base leading-snug text-foreground">
                        <span className="sr-only">Paper title: </span>
                        <cite className="not-italic font-medium">&ldquo;{item.paperTitle}&rdquo;</cite>
                      </p>
                      <p className="mt-3 text-base text-muted-foreground">
                        <span className="font-medium text-foreground/90">Authors:</span> {item.authors}
                      </p>
                      {item.bibliographicNote ? (
                        <p className="mt-2 text-xs text-muted-foreground/90 italic">{item.bibliographicNote}</p>
                      ) : null}
                    </article>
                  </li>
                ))}
              </ul>
            </div>
            </section>
          </ContentSurface>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Awards;
