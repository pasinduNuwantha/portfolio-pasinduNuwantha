import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { ComingSoon, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Achievements() {
  return (
    <Section id="achievements" labelledBy="achievements-heading">
      <Reveal>
        <RevealItem>
          <SectionHeading id="achievements-heading" eyebrow="Achievements" lead="Proud" accent="moments." />
        </RevealItem>
        <RevealItem>
          <ComingSoon label="Achievements — coming soon" />
        </RevealItem>
      </Reveal>
    </Section>
  );
}
