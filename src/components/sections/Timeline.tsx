import { content } from "@/data/content";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineTrack } from "@/components/sections/timeline/TimelineTrack";

export function Timeline() {
  return (
    <Section id="experience" labelledBy="experience-heading">
      <Reveal>
        <RevealItem>
          <SectionHeading
            id="experience-heading"
            eyebrow="Experience"
            lead="Education &"
            accent="experience."
          />
        </RevealItem>
      </Reveal>
      <TimelineTrack entries={content.timeline} availability={content.site.availability} />
    </Section>
  );
}
