import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, FlaskConical, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentSurface } from "@/components/ContentSurface";
import SectionWrapper from "@/components/SectionWrapper";
import { PageMeta } from "@/components/seo/PageMeta";
import { getHomeStructuredData, PAGE_SEO } from "@/config/seo";

const Home = () => {
  const jsonLd = useMemo(() => getHomeStructuredData(), []);

  return (
    <div>
      <PageMeta
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        keywords={PAGE_SEO.home.keywords}
        path="/"
        jsonLd={jsonLd}
      />

      {/* Hero — same base as navbar (bg-shell) + layered grid */}
      <section className="relative overflow-hidden rounded-b-xl md:rounded-b-2xl border-b border-shell-muted/60 bg-shell shadow-[0_6px_24px_-12px_hsl(38_18%_45%/0.08)]">
        <div className="shell-grid shell-grid--fade" aria-hidden />
        <div className="shell-grid-fine shell-grid-fine--fade" aria-hidden />
        <div className="relative z-10 container mx-auto px-4 md:px-8 py-6 md:py-8 lg:py-9">
          <div className="flex flex-col-reverse md:flex-row items-center gap-5 md:gap-6 max-w-5xl mx-auto">
            {/* Text */}
            <div className="flex-1 text-center md:text-left animate-fade-in-up">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-2 md:mb-3">
                <span className="nova-square-regular font-normal text-primary tracking-tight">
                  Joe Raad
                </span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-lg mb-5 leading-relaxed">
                Associate Professor at the University of Paris-Saclay
              </p>
              <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
                <Button asChild size="default" className="rounded-full gap-2">
                  <Link to="/research">
                    <FlaskConical size={18} />
                    My Research
                  </Link>
                </Button>
                <Button asChild variant="outline" size="default" className="rounded-full gap-2 border-primary/25 bg-card/60 hover:bg-card">
                  <Link to="/publications">
                    <BookOpen size={18} />
                    Publications
                  </Link>
                </Button>
              </div>
            </div>

            {/* Photo */}
            <div className="flex-shrink-0 animate-fade-in-up md:-ml-1 lg:-ml-2" style={{ animationDelay: "0.2s" }}>
              <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-[3px] border-primary shadow-md">
                <img
                  src="/myphoto.jpg"
                  alt="Portrait of Joe Raad smiling, seated outdoors with a city skyline in the background."
                  className="h-full w-full min-h-full min-w-full object-cover object-[25%_1%] scale-[1.18]"
                  width={288}
                  height={288}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <SectionWrapper className="bg-shell pt-8 pb-16 md:pt-10 md:pb-24" shellFadedGrid>
        <ContentSurface className="max-w-2xl mx-auto text-center md:text-left">
          
          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
            <p>
              I work as an associate professor in computer science at{" "}
              <a href="https://www.universite-paris-saclay.fr/en" target="_blank" rel="noopener noreferrer">
                Université Paris-Saclay
              </a>
              . My research is based in the{" "}
              <a href="https://www.lisn.upsaclay.fr/" target="_blank" rel="noopener noreferrer">
                LISN
              </a>{" "}
              laboratory with the{" "}
              <a
                href="https://www.lisn.upsaclay.fr/research/research-departments/science-des-donnees-2/donnees-et-connaissances-massives-et-heterogenes-lahdak-2/?lang=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                LaHDAK
              </a>{" "}
              team. Alongside research, I mainly teach at the{" "}
              <a
                href="https://www.iut-orsay.universite-paris-saclay.fr/informatique-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                IUT of Orsay
              </a>{" "}
              in the computer science department, where I also coordinate study abroad programs and international relations.
            </p>
            <p>
            My work sits where Knowledge Representation meets the web and intelligent systems. I focus on strengthening the reliability of this web, addressing challenges such as data integrity, knowledge completion, and the scalable integration of linked resources across diverse domains. Another focus is entity identity: how references are interlinked across sources, contexts, and time when classical notions of sameness reach their limits. I also work on facts verification in its temporal aspect using knowledge graphs and constraint-based systems to assess claims over time with transparent explanations. Finally, I explore semantic intelligence for immersive environments (virtual and augmented reality), where knowledge graphs meet deep learning and multimodal interaction.

Throughout, I ask how formal knowledge representation can work together with machine learning (and more recently with Large Language Models) toward systems that are both efficient and explainable.
           </p>
            <p>
              Finally, teaching is central to what I do, from semantic web, knowledge representation and databases, to data science and software development across different programs with formats that fit each audience.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:justify-start">
            <Link
              to="/research"
              className="inline-flex items-center gap-2 font-medium text-link hover:text-link-hover underline-offset-4 hover:underline"
            >
              <FlaskConical size={18} className="shrink-0 opacity-90" aria-hidden />
              Research
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              to="/teaching"
              className="inline-flex items-center gap-2 font-medium text-link hover:text-link-hover underline-offset-4 hover:underline"
            >
              <GraduationCap size={18} className="shrink-0 opacity-90" aria-hidden />
              Teaching
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </ContentSurface>
      </SectionWrapper>
    </div>
  );
};

export default Home;
