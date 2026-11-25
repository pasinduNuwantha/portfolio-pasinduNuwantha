import { content } from "@/data/content";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { ComingSoon, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const { site, about } = content;

/** Shell — the lanyard badge, buttons and quick facts come in the next phase. */
export function About() {
  return (
    <Section id="about" labelledBy="about-heading">
      <Reveal>
        <RevealItem>
          <SectionHeading
            id="about-heading"
            eyebrow="About"
            lead="Hi, I'm"
            accent={`${site.firstName}.`}
          />
        </RevealItem>
        {about.bio.map((p) => (
          <RevealItem key={p} as="p" className="mt-6 max-w-xl leading-relaxed text-ink-soft">
            {p}
          </RevealItem>
        ))}
        <RevealItem>
          <ComingSoon label="Lanyard badge & quick facts — coming next" />
        </RevealItem>
      </Reveal>
    </Section>
  );
}
