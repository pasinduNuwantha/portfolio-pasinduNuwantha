import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/content";
import { Button } from "@/components/ui/Button";

/** Everything shown inside an open project: meta, text, features, tech and links. */
export function ProjectDetails({
  project,
  headingId,
  showTitle = true,
  number,
}: {
  project: Project;
  headingId?: string;
  /** e.g. "01" — shown at the start of the meta line */
  number?: string;
  /** Mobile cards show the title in their header instead */
  showTitle?: boolean;
}) {
  return (
    <div className="@container flex min-w-0 flex-col">
      <p className="font-mono text-[11px] tracking-wide text-muted uppercase">
        {number && <span className="mr-2 text-ink">{number}</span>}
        {project.role} · {project.year} · {project.category}
      </p>

      {showTitle && (
        <>
          <h3
            id={headingId}
            tabIndex={headingId ? -1 : undefined}
            className="mt-4 rounded-lg text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-ink"
          >
            {project.title}
          </h3>
          <p className="mt-2 font-serif text-xl text-ink-soft italic sm:text-2xl">{project.subtitle}</p>
        </>
      )}

      <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-pretty text-ink-soft">
        {project.description}
      </p>

      <ul className="mt-6 grid gap-x-6 gap-y-2.5 @md:grid-cols-2">
        {project.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-sm leading-snug text-ink">
            <span aria-hidden className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-mauve" />
            {f}
          </li>
        ))}
      </ul>

      <ul aria-label="Tech used" className="mt-6 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded-full border border-ink/10 bg-bg/70 px-2.5 py-1 font-mono text-[11px] text-ink-soft"
          >
            {t}
          </li>
        ))}
      </ul>

      {(project.github || project.live) && (
        <div className="mt-7 flex flex-wrap gap-3">
          {project.github && (
            <Button href={project.github} external icon={<ArrowUpRight size={15} />}>
              View on GitHub
            </Button>
          )}
          {project.live && (
            <Button href={project.live} variant="outline" external icon={<ArrowUpRight size={15} />}>
              Live demo
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Project preview: the screenshot if one exists, otherwise a styled mock —
 * a phone frame for mobile apps, a browser window for everything else.
 */
export function ProjectPreview({ project, index }: { project: Project; index: number }) {
  const isMobile = /mobile/i.test(project.category);
  const tones = [
    { bg: "var(--family-languages)", fg: "var(--surface)" },
    { bg: "var(--family-frontend)", fg: "var(--surface)" },
    { bg: "var(--accent-mauve)", fg: "var(--ink)" },
    { bg: "var(--family-databases)", fg: "var(--ink)" },
    { bg: "var(--accent-sand)", fg: "var(--ink)" },
  ];
  const tone = tones[index % tones.length];

  return (
    <div className="relative flex h-full min-h-[16rem] items-center justify-center overflow-hidden rounded-3xl border border-border bg-bg/70 p-6">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 1280px) 30vw, 90vw"
          className="object-cover"
        />
      ) : isMobile ? (
        <div className="relative aspect-[9/18] h-full max-h-[22rem] rounded-[2rem] border-[6px] border-ink bg-surface p-3 shadow-[0_24px_48px_-24px_rgba(30,35,51,0.45)]">
          <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-ink/15" />
          <MockBlocks tone={tone} title={project.title} compact />
        </div>
      ) : (
        <div className="w-full max-w-[26rem] overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_48px_-24px_rgba(30,35,51,0.35)]">
          <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2 w-2 rounded-full bg-ink/15" />
            ))}
            <span className="ml-3 h-3 flex-1 rounded-full bg-ink/[0.06]" />
          </div>
          <div className="p-4">
            <MockBlocks tone={tone} title={project.title} />
          </div>
        </div>
      )}
    </div>
  );
}

function MockBlocks({
  tone,
  title,
  compact = false,
}: {
  tone: { bg: string; fg: string };
  title: string;
  compact?: boolean;
}) {
  return (
    <div aria-hidden className="flex flex-col gap-2">
      <div className="flex items-center justify-center rounded-xl py-6" style={{ backgroundColor: tone.bg }}>
        <span className="font-serif text-3xl italic" style={{ color: tone.fg }}>
          {title
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)}
        </span>
      </div>
      <div className="h-2.5 w-3/4 rounded-full bg-ink/10" />
      <div className="h-2.5 w-1/2 rounded-full bg-ink/[0.07]" />
      <div className={`mt-1 grid gap-2 ${compact ? "grid-cols-2" : "grid-cols-3"}`}>
        {Array.from({ length: compact ? 4 : 3 }, (_, i) => (
          <div key={i} className="h-12 rounded-lg bg-ink/[0.05]" />
        ))}
      </div>
    </div>
  );
}
