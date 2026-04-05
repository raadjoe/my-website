import { useMemo } from "react";
import { Clock, Fingerprint, Glasses, Globe2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import SectionWrapper from "@/components/SectionWrapper";
import { PageMeta } from "@/components/seo/PageMeta";
import { getWebPageStructuredData, PAGE_SEO } from "@/config/seo";
import { cn } from "@/lib/utils";

const intro =
  "My research bridges foundations in Knowledge Representation & Reasoning with the development of scalable resources and intelligent applications. By exploring the integration of formal logic with Machine Learning (and recently with Large Language Models), my research aims to enhance machine understanding and facilitate more effective human-AI collaboration.";

const researchSections: {
  title: string;
  body: string;
  icon: typeof Globe2;
}[] = [
  {
    title: "Toward a Reliable Web of Data",
    icon: Globe2,
    body:
      'My research is driven by the Linked Data vision: a Web where logic is not buried within isolated applications or neural networks but incorporated into the fabric of formally interlinked data. This research direction explores scalable methods to enhance the integrity of this global "Web of Data" by addressing error detection and knowledge completion. These efforts leverage reasoning, constraint solving, graph structures, and machine learning to produce practical resources that facilitate data use across diverse domains, including the life and social sciences. This goal has been addressed across several research works, including the co-supervision of Shuai Wang\'s PhD at Vrije Universiteit Amsterdam with Peter Bloem and Frank van Harmelen.',
  },
  {
    title: "Entity Identity",
    icon: Fingerprint,
    body:
      "A core part of my research examines the fundamental question of Entity Identity: how to reliably interlink references across diverse sources, contexts, and time points. This direction explores cases where classical identity principles may reach their limits in modern digital systems, suggesting alternative formalizations that treat identity as context-dependent. My research aims to provide a more flexible framework for global data integration and knowledge management, building upon the foundational research presented in my PhD thesis, Identity Management in Knowledge Graphs, and continues to address how entity interlinking is managed.",
  },
  {
    title: "Semantic Intelligence for Immersive Environments",
    icon: Glasses,
    body:
      'My research investigates how Knowledge Representation can enhance Virtual and Augmented Reality by providing a semantic understanding of user experiences. By combining Knowledge Graphs with LLMs and Deep Learning, this direction seeks to address long-standing challenges such as Bolt\'s "Put-that-there" paradigm—interpreting complex interactions like speech, gesture, and eye gaze. Currently, these efforts aiming at creating formally analyzable immersive scenes that respond to multimodal human intent are being advanced through the PhD of Nicolas Saint-Leger, co-supervised with Nicolas Férey and Patrick Bourdot.',
  },
  {
    title: "Temporal Verification",
    icon: Clock,
    body:
      "In the context of rapid information flow, my research focuses as well on the temporal dimension as a key factor in automated fact-checking. This research direction combines Knowledge Graphs with constraints and rule-based reasoning to improve the accuracy and the explainability of temporal claims. These works seek to develop systems that verify the veracity of facts over time while providing transparent explanations. This research area was established during the co-supervision of Thibaut Soulard's PhD alongside Fatiha Saïs.",
  },
  
];

const Research = () => {
  const jsonLd = useMemo(
    () => getWebPageStructuredData("/research", PAGE_SEO.research.title, PAGE_SEO.research.description),
    []
  );

  return (
    <div>
      <PageMeta
        title={PAGE_SEO.research.title}
        description={PAGE_SEO.research.description}
        keywords={PAGE_SEO.research.keywords}
        path="/research"
        jsonLd={jsonLd}
      />
      <SectionWrapper className="bg-pastel-sage/50">
        <div className="max-w-3xl mx-auto space-y-10">
          <PageHero className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">Research</h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-left md:text-center md:max-w-2xl md:mx-auto">
              {intro}
            </p>
          </PageHero>

          <div className="space-y-5">
            {researchSections.map((section) => {
              const Icon = section.icon;
              return (
                <article
                  key={section.title}
                  className="group rounded-2xl border border-border/50 bg-card/80 p-6 shadow-sm ring-1 ring-foreground/[0.04] transition-shadow hover:shadow-md md:p-8"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
                    <div
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary",
                        "ring-1 ring-primary/15 transition-colors group-hover:bg-primary/15"
                      )}
                      aria-hidden
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1 space-y-3">
                      <h2 className="text-lg font-bold leading-snug text-foreground md:text-xl">{section.title}</h2>
                      <p className="text-base leading-relaxed text-muted-foreground">{section.body}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Research;
