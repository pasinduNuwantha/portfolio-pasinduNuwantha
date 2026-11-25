import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { ComingSoon, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Timeline() {
  return (
    <Section id="experience" labelledBy="experience-heading">
      <Reveal>
        <RevealItem>
          <SectionHeading id="experience-heading" eyebrow="Experience" lead="Education &" accent="experience." />
        </RevealItem>
        <RevealItem>
          <ComingSoon label="Timeline — coming soon" />
        </RevealItem>
      </Reveal>
    </Section>
  );
}
