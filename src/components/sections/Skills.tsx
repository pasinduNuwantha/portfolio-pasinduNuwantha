import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { ComingSoon, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-heading">
      <Reveal>
        <RevealItem>
          <SectionHeading id="skills-heading" eyebrow="Skills" lead="The periodic table of" accent="my stack." />
        </RevealItem>
        <RevealItem>
          <ComingSoon label="Periodic table — coming next" />
        </RevealItem>
      </Reveal>
    </Section>
  );
}
