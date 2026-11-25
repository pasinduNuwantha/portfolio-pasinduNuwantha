"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type { Skill, SkillFamily } from "@/data/content";
import { brandIcons } from "@/lib/brandIcons";
import { SKILL_FAMILIES, familyById, periodicLayout } from "@/lib/skillFamilies";
import { ElementTile } from "@/components/ui/ElementTile";

type Filter = SkillFamily | "all";

export function SkillsTable({ skills }: { skills: Skill[] }) {
  const { placed, rows, columns } = useMemo(() => periodicLayout(skills), [skills]);
  const [filter, setFilter] = useState<Filter>("all");
  const [activeName, setActiveName] = useState<string | null>(null);
  const [canHover, setCanHover] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const active = placed.find((s) => s.name === activeName) ?? null;
  const counts = useMemo(() => {
    const c: Partial<Record<SkillFamily, number>> = {};
    for (const s of skills) c[s.family] = (c[s.family] ?? 0) + 1;
    return c;
  }, [skills]);
  const families = SKILL_FAMILIES.filter((f) => counts[f.id]);

  return (
    <div className="mt-12 sm:mt-14">
      {/* Family filter chips */}
      <div role="group" aria-label="Filter by family" className="flex flex-wrap gap-2">
        <Chip label="All" count={skills.length} pressed={filter === "all"} onClick={() => setFilter("all")} />
        {families.map((f) => (
          <Chip
            key={f.id}
            label={f.label}
            count={counts[f.id] ?? 0}
            dot={f.bg}
            pressed={filter === f.id}
            onClick={() => setFilter((cur) => (cur === f.id ? "all" : f.id))}
          />
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_19rem]">
        {/* Tiles: wrapping grid on small screens, periodic layout from lg up */}
        <div
          ref={gridRef}
          onMouseLeave={() => canHover && setActiveName(null)}
          onBlur={(e) => {
            if (canHover && !gridRef.current?.contains(e.relatedTarget as Node | null)) setActiveName(null);
          }}
          className="grid grid-cols-5 gap-1.5 sm:grid-cols-7 sm:gap-2 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))] lg:[grid-template-rows:repeat(var(--rows),auto)]"
          style={{ "--cols": columns, "--rows": rows } as CSSProperties}
        >
          {placed.map((skill) => (
            <ElementTile
              key={skill.name}
              skill={skill}
              dimmed={filter !== "all" && skill.family !== filter}
              active={activeName === skill.name}
              onActivate={() => setActiveName(skill.name)}
              className="lg:[grid-column:var(--col)] lg:[grid-row:var(--row)]"
              style={{ "--col": skill.col, "--row": skill.row } as CSSProperties}
            />
          ))}
        </div>

        {/* Detail panel */}
        {/* Mobile: compact and pinned to the bottom of the screen while the grid is visible,
            so tapped details are never off-screen. Desktop: sticky column on the right. */}
        <aside
          aria-live="polite"
          className="sticky bottom-3 z-10 rounded-3xl border border-border shadow-soft flex min-h-[6.5rem] flex-col overflow-hidden bg-surface/90 p-4 backdrop-blur-md lg:top-28 lg:bottom-auto lg:min-h-[22rem] lg:self-start lg:bg-surface lg:p-6"
        >
          <AnimatePresence mode="wait" initial={false}>
            {active ? (
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-1 flex-col"
              >
                <Detail skill={active} />
              </motion.div>
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-1 items-center justify-center gap-3 text-center lg:flex-col"
              >
                <div aria-hidden className="grid grid-cols-2 gap-1 opacity-60">
                  {["var(--family-languages)", "var(--family-backend)", "var(--family-tools)", "var(--family-frontend)"].map((c) => (
                    <span key={c} className="h-5 w-5 rounded-md" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <p className="text-sm text-ink-soft">
                  {canHover ? "Hover a tile to see details." : "Tap a tile to see details."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </div>
    </div>
  );
}

function Detail({ skill }: { skill: Skill }) {
  const family = familyById[skill.family];
  const brand = brandIcons[skill.icon];
  const Icon = brand.Icon;

  // Mobile: logo left, text right. Desktop: stacked card.
  return (
    <div className="flex gap-4 lg:flex-col lg:gap-0">
      <div className="flex shrink-0 items-start justify-between">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-white shadow-[0_1px_2px_rgba(30,35,51,0.05)] lg:h-20 lg:w-20">
          <Icon className="h-9 w-9 lg:h-11 lg:w-11" color={brand.color} aria-hidden />
        </div>
        <div
          aria-hidden
          className={`hidden h-12 w-12 flex-col justify-between rounded-lg p-1 lg:flex ${family.fg === "light" ? "text-surface" : "text-ink"}`}
          style={{ backgroundColor: family.bg }}
        >
          <span className="font-mono text-[8px] leading-none">{skill.number}</span>
          <span className="self-center text-sm leading-none font-semibold">{skill.symbol}</span>
          <span />
        </div>
      </div>
      <div className="min-w-0">
        <h3 className="text-lg font-semibold tracking-tight text-ink lg:mt-6 lg:text-2xl">{skill.name}</h3>
        <p className="mt-1 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-muted uppercase lg:mt-2 lg:text-xs">
          <span aria-hidden className="h-2 w-2 rounded-full" style={{ backgroundColor: family.bg }} />
          {family.label}
        </p>
        <p className="mt-1.5 text-sm leading-snug text-ink-soft lg:mt-5 lg:leading-relaxed">{skill.note}</p>
      </div>
    </div>
  );
}

function Chip({
  label,
  count,
  dot,
  pressed,
  onClick,
}: {
  label: string;
  count: number;
  dot?: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={`inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition-colors duration-300 ${
        pressed
          ? "border-ink bg-ink text-surface"
          : "border-ink/15 bg-surface/60 text-ink hover:border-ink/40"
      }`}
    >
      {dot && (
        <span
          aria-hidden
          className={`h-2.5 w-2.5 rounded-full ${pressed ? "ring-1 ring-surface/60" : "ring-1 ring-ink/10"}`}
          style={{ backgroundColor: dot }}
        />
      )}
      {label}
      <span className={`font-mono text-[11px] ${pressed ? "text-surface/70" : "text-muted"}`}>{count}</span>
    </button>
  );
}
