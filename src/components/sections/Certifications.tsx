import { content } from "@/data/content";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CertificationList } from "@/components/sections/certifications/CertificationList";

function listToText(items: string[]) {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

export function Certifications() {
  const { certifications } = content;
  if (certifications.length === 0) return null;

  const n = certifications.length;
  const issuers = [...new Set(certifications.map((c) => c.issuer))];
  const description =
    `${n} certification${n === 1 ? "" : "s"} from ${listToText(issuers)}` +
    (n < 3 ? " — with more on the way." : ".");

  return (
    <Section id="certifications" labelledBy="certifications-heading">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal>
          <RevealItem>
            <SectionHeading
              id="certifications-heading"
              eyebrow="Certifications"
              lead="Always"
              accent="learning."
              description={description}
            />
          </RevealItem>
        </Reveal>
        <Reveal className="lg:pt-10">
          <RevealItem>
            <CertificationList items={certifications} />
          </RevealItem>
        </Reveal>
      </div>
    </Section>
  );
}
