import { content } from "@/data/content";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillsTable } from "@/components/sections/skills/SkillsTable";

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];

export function Skills() {
  const { skills } = content;
  const familyCount = new Set(skills.map((s) => s.family)).size;
  const familyWord = NUMBER_WORDS[familyCount] ?? String(familyCount);

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
          <SkillsTable skills={skills} />
        </RevealItem>
      </Reveal>
    </Section>
  );
}
