import { content } from "@/data/content";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsAccordion } from "@/components/sections/projects/ProjectsAccordion";

export function Projects() {
  const { projects } = content;
  return (
    <Section id="work" labelledBy="work-heading">
      <Reveal>
        <RevealItem>
          <SectionHeading
            id="work-heading"
            eyebrow="Work"
            lead="Things I've"
            accent="built."
            description={`${projects.length} projects across mobile, web and microservices — open one to see what I built and how.`}
          />
        </RevealItem>
        <RevealItem>
          <ProjectsAccordion projects={projects} />
        </RevealItem>
      </Reveal>
    </Section>
  );
}
