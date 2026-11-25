import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { ComingSoon, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Projects() {
  return (
    <Section id="work" labelledBy="work-heading">
      <Reveal>
        <RevealItem>
          <SectionHeading id="work-heading" eyebrow="Work" lead="Things I've" accent="built." />
        </RevealItem>
        <RevealItem>
          <ComingSoon label="Projects accordion — coming soon" />
        </RevealItem>
      </Reveal>
    </Section>
  );
}
