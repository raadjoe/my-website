import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero } from "@/components/PageHero";
import SectionWrapper from "@/components/SectionWrapper";
import { PageMeta } from "@/components/seo/PageMeta";
import { getWebPageStructuredData, PAGE_SEO } from "@/config/seo";

const courses = [
  {
    name: "Semantic Web",
    description:
      "This course covers the fundamentals of Semantic Web technologies, including RDF, RDFS, SPARQL, and GeoSPARQL. Students learn to model and query knowledge graphs while exploring modern tools such as SHACL for data validation and the collaborative knowledge base Wikidata.",
  },
  {
    name: "Knowledge Representation & Reasoning",
    description:
      "This module explores advanced techniques for structured knowledge systems. The curriculum focuses on formalisms like OWL and the use of automated reasoners, while also addressing entity linking to help students integrate disparate data sources into coherent logical frameworks.",
  },
  {
    name: "Relational Databases",
    description:
      "An introductory course focused on the foundations of data modeling and database design. Students study Entity-Relationship models and Relational Schemas, gaining practical experience with SQL for both defining database structures (DDL) and manipulating stored data (DML).",
  },
  {
    name: "Advanced Database Management",
    description:
      "Building on core database concepts, this course introduces advanced management and programming techniques. Topics include procedural logic with PL/SQL, as well as the essential sub-languages for security (SQL-DCL) and transaction management (SQL-TCL) in professional environments.",
  },
  {
    name: "Data Science",
    description:
      "This course is an introduction to the Python data ecosystem and statistical modeling. Students master essential libraries like NumPy, Pandas, and Matplotlib for data manipulation, alongside core analytical methods including linear regression, clustering, and classification.",
  },
  {
    name: "Programming & Web Development",
    description:
      "I have participated in teaching various programming modules covering multiple paradigms and languages. This includes web development as well as Object-Oriented Programming (OOP) using Java, helping students build a strong foundation in software architecture and application design.",
  },
];

const Teaching = () => {
  const jsonLd = useMemo(
    () => getWebPageStructuredData("/teaching", PAGE_SEO.teaching.title, PAGE_SEO.teaching.description),
    []
  );

  return (
    <div>
      <PageMeta
        title={PAGE_SEO.teaching.title}
        description={PAGE_SEO.teaching.description}
        keywords={PAGE_SEO.teaching.keywords}
        path="/teaching"
        jsonLd={jsonLd}
      />
      <SectionWrapper className="bg-pastel-blue/50">
        <div className="max-w-4xl mx-auto space-y-8">
          <PageHero>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 text-center">Teaching</h1>
            <div className="space-y-5 max-w-3xl mx-auto text-left text-lg text-muted-foreground leading-relaxed">
              <p>
                My teaching is based at{" "}
                <a
                  href="https://www.universite-paris-saclay.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  University Paris-Saclay
                </a>
                , specifically within the Computer Science Department at the{" "}
                <a
                  href="https://www.iut-orsay.universite-paris-saclay.fr/informatique-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  IUT of Orsay
                </a>
                , where I also co-manage International Relations.
              </p>
              <p>I also contribute to several specialized programs:</p>
              <ul className="list-disc space-y-0.5 pl-5 marker:text-muted-foreground/70">
              <li>
                  <span className="text-foreground/90">Master 2 Data Science</span> program in contributing to the Web of Data course.
                </li>
                <li>
                  <span className="text-foreground/90">AIDAMS Bachelor</span> (AI, Data &amp; Management Sciences), a joint degree with{" "}
                  <a
                    href="https://www.essec.edu/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    ESSEC Business School
                  </a>
                  .
                </li>
                <li>
                  <span className="text-foreground/90">HEPTA Bachelor</span> (Advanced Multidisciplinary Studies for Top Athletes), in partnership with{" "}
                  <a
                    href="https://www.essec.edu/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    ESSEC
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.sciencespo.fr/en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Sciences Po
                  </a>
                  . For this program, I adapt my teaching through a specialized asynchronous format. I record my lectures as short, modular video capsules, allowing participants to follow the curriculum independently and at their own pace without the constraints of traditional classroom attendance.
                </li>
              </ul>
            </div>
          </PageHero>

          <div className="space-y-4">
            
            <div className="grid gap-6 md:grid-cols-2">
              {courses.map((course) => (
                <Card key={course.name} className="bg-card border-border/70 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl leading-snug">{course.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-base leading-relaxed">{course.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Teaching;
