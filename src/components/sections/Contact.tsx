import { ArrowUpRight } from "lucide-react";
import { content } from "@/data/content";
import { listSocials } from "@/lib/socialIcons";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { EmailCopy } from "@/components/sections/contact/EmailCopy";
import { ScrollRevealHeading } from "@/components/sections/contact/ScrollRevealHeading";

const { site } = content;

export function Contact() {
  const socials = listSocials(site.socials);

  return (
    <Section id="contact" labelledBy="contact-heading" className="pb-32 sm:pb-40">
      <p className="eyebrow mb-6">Contact</p>
      <ScrollRevealHeading id="contact-heading" lead="Let's build" accent="something together." />

      <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <RevealItem as="p" className="max-w-md text-lg leading-relaxed text-pretty text-ink-soft">
            {site.contactIntro}
          </RevealItem>
          <RevealItem className="mt-8">
            <EmailCopy email={site.email} />
          </RevealItem>
          <RevealItem>
            <ul className="mt-10 flex flex-wrap gap-3" aria-label="Social links">
              {socials.map(({ key, href, label, Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-11 items-center gap-2.5 rounded-full border border-ink/15 pr-4 pl-3 text-sm font-medium text-ink transition-colors hover:border-ink/40 hover:bg-ink/[0.03]"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-surface">
                      <Icon size={13} aria-hidden />
                    </span>
                    {label}
                    <ArrowUpRight
                      size={14}
                      aria-hidden
                      className="text-ink-soft transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>
          <RevealItem as="p" className="mt-10 font-mono text-xs tracking-wide text-muted uppercase">
            Based in {site.location}
          </RevealItem>
        </Reveal>

        <Reveal>
          <RevealItem>
            <ContactForm email={site.email} />
          </RevealItem>
        </Reveal>
      </div>
    </Section>
  );
}
