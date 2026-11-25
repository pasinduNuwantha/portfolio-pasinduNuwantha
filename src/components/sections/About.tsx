import { ArrowDown, ArrowUpRight } from "lucide-react";
import { content } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { LanyardBadge } from "@/components/ui/LanyardBadge";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const { site, about } = content;

export function About() {
  return (
    <Section id="about" labelledBy="about-heading">
      <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.75fr)] lg:gap-12 xl:gap-16">
        {/* Left — intro */}
        <Reveal className="lg:pt-10">
          <RevealItem>
            <SectionHeading
              id="about-heading"
              eyebrow="About"
              lead="Hi, I'm"
              accent={`${site.firstName}.`}
            />
          </RevealItem>
          {about.bio.map((p) => (
            <RevealItem
              key={p}
              as="p"
              className="mt-6 max-w-lg text-base leading-relaxed text-pretty text-ink-soft sm:text-lg"
            >
              {p}
            </RevealItem>
          ))}
          <RevealItem className="mt-9 flex flex-wrap gap-3">
            <Button href={site.resumeUrl} download icon={<ArrowDown size={15} />}>
              Resume
            </Button>
            <Button href={site.socials.github} variant="outline" external icon={<ArrowUpRight size={15} />}>
              GitHub
            </Button>
            <Button href={site.socials.linkedin} variant="outline" external icon={<ArrowUpRight size={15} />}>
              LinkedIn
            </Button>
          </RevealItem>
        </Reveal>

        {/* Center — hanging ID badge (sits between bio and facts on mobile) */}
        {/* On desktop the strap reaches up to the top edge of the section */}
        <div className="lg:-mt-32">
          <LanyardBadge
            title="What I am"
            items={about.whatIAm}
            signature={site.name}
            strapText={site.name}
            footnote={site.location}
          />
        </div>

        {/* Right — quick facts */}
        <Reveal className="lg:pt-24">
          <RevealItem>
            <p className="eyebrow mb-4">Quick facts</p>
          </RevealItem>
          <dl className="divide-y divide-ink/10 border-y border-ink/10">
            {about.facts.map((fact) => (
              <RevealItem key={fact.label} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-sm text-ink-soft">{fact.label}</dt>
                <dd className="text-right text-sm font-medium text-ink">{fact.value}</dd>
              </RevealItem>
            ))}
          </dl>
          <RevealItem>
            <blockquote className="mt-8 font-serif text-2xl leading-snug text-balance text-ink-soft italic">
              “{about.quote}”
            </blockquote>
          </RevealItem>
        </Reveal>
      </div>
    </Section>
  );
}
