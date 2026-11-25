import type { Skill, SkillFamily } from "@/data/content";

/** Display order, labels and colors (dark → light) for skill families. */
export const SKILL_FAMILIES: {
  id: SkillFamily;
  label: string;
  /** Tile background (CSS variable) */
  bg: string;
  /** Text color with enough contrast on `bg` */
  fg: "light" | "dark";
}[] = [
  { id: "languages", label: "Languages", bg: "var(--family-languages)", fg: "light" },
  { id: "frontend", label: "Frontend", bg: "var(--family-frontend)", fg: "light" },
  { id: "backend", label: "Backend", bg: "var(--family-backend)", fg: "dark" },
  { id: "databases", label: "Databases", bg: "var(--family-databases)", fg: "dark" },
  { id: "tools", label: "Tools", bg: "var(--family-tools)", fg: "dark" },
  { id: "other", label: "Other", bg: "var(--family-other)", fg: "dark" },
];

export const familyById = Object.fromEntries(SKILL_FAMILIES.map((f) => [f.id, f])) as Record<
  SkillFamily,
  (typeof SKILL_FAMILIES)[number]
>;

const familyOrder = Object.fromEntries(SKILL_FAMILIES.map((f, i) => [f.id, i])) as Record<SkillFamily, number>;

/** Skills sorted by family (dark → light), then by their number. */
export function sortSkills(skills: Skill[]) {
  return [...skills].sort(
    (a, b) => familyOrder[a.family] - familyOrder[b.family] || a.number - b.number,
  );
}

export type PlacedSkill = Skill & { col: number; row: number };

/**
 * Lays tiles out like a periodic table: tall columns at both edges, a
 * shallow "transition metal" block in the middle, every column resting on
 * the bottom row. Tiles fill column by column, so families read as
 * vertical bands that fade from dark (left) to light (right).
 *
 * Works for any number of skills — the shape adapts to fit exactly.
 */
export function periodicLayout(skills: Skill[], columns = 9) {
  const n = skills.length;
  if (n === 0) return { placed: [] as PlacedSkill[], rows: 0, columns };

  // Height template for a given number of rows: edges full height,
  // second-from-edge columns one shorter, middle block 2 tall.
  const template = (rows: number) =>
    Array.from({ length: columns }, (_, c) => {
      if (c === 0 || c === columns - 1) return rows;
      const inMiddle = c >= 2 && c <= columns - 5; // e.g. cols 3–5 of 9
      return inMiddle ? Math.min(2, rows) : rows - 1;
    });

  let rows = 2;
  let heights = template(rows);
  while (heights.reduce((s, h) => s + h, 0) < n) heights = template(++rows);

  // Trim surplus from the inside out so the outline stays symmetric-ish.
  const trimOrder = [4, 2, 3, 1, 7, 6, 5].filter((c) => c < columns);
  let surplus = heights.reduce((s, h) => s + h, 0) - n;
  for (let i = 0; surplus > 0 && i < 100; i++) {
    const c = trimOrder[i % trimOrder.length];
    if (heights[c] > 1) {
      heights[c]--;
      surplus--;
    }
  }

  const sorted = sortSkills(skills);
  const placed: PlacedSkill[] = [];
  let k = 0;
  heights.forEach((h, col) => {
    for (let r = 0; r < h && k < n; r++) {
      placed.push({ ...sorted[k++], col: col + 1, row: rows - h + r + 1 });
    }
  });

  return { placed, rows, columns };
}
