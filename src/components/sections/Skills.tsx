import type { ReactNode } from "react";
import { content } from "@/data/content";
import { brandIcons } from "@/lib/brandIcons";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillsTable } from "@/components/sections/skills/SkillsTable";

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];

export function Skills() {
  const { skills } = content;
  const familyCount = new Set(skills.map((s) => s.family)).size;
  const familyWord = NUMBER_WORDS[familyCount] ?? String(familyCount);

  // Render the brand logos here on the server and hand them to the client
  // table as ready-made SVG, so react-icons never ships to the browser.
  const logos: Record<string, ReactNode> = Object.fromEntries(
    skills.map((s) => {
      const { Icon, color } = brandIcons[s.icon];
      return [s.name, <Icon key={s.name} className="h-9 w-9 lg:h-11 lg:w-11" color={color} aria-hidden />];
    }),
  );

  return (
    <Section id="skills" labelledBy="skills-heading">
      <Reveal>
        <RevealItem>
          <SectionHeading
            id="skills-heading"
            eyebrow="Skills"
            lead="The periodic table of"
            accent="my stack."
            description={`${skills.length} technologies in ${familyWord} families. Hover a tile to see it; pick a family to light it up.`}
          />
        </RevealItem>
        <RevealItem>
          <SkillsTable skills={skills} logos={logos} />
        </RevealItem>
      </Reveal>
    </Section>
  );
}
