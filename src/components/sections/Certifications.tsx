import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { ComingSoon, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Certifications() {
  return (
    <Section id="certifications" labelledBy="certifications-heading">
      <Reveal>
        <RevealItem>
          <SectionHeading id="certifications-heading" eyebrow="Certifications" lead="Always" accent="learning." />
        </RevealItem>
        <RevealItem>
          <ComingSoon label="Certifications — coming soon" />
        </RevealItem>
      </Reveal>
    </Section>
  );
}
