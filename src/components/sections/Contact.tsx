import { content } from "@/data/content";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const { site } = content;

/** Shell — scroll-linked heading reveal, copy button and form come later. */
export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-heading" className="min-h-[70vh]">
      <Reveal>
        <RevealItem>
          <SectionHeading
            id="contact-heading"
            eyebrow="Contact"
            lead="Let's build"
            accent="something together."
          />
        </RevealItem>
        <RevealItem>
          <a
            href={`mailto:${site.email}`}
            className="mt-10 inline-block text-[clamp(1.5rem,4vw,2.75rem)] font-medium tracking-tight text-ink underline decoration-ink/20 underline-offset-8 transition-colors hover:decoration-ink"
          >
            {site.email}
          </a>
        </RevealItem>
      </Reveal>
    </Section>
  );
}
