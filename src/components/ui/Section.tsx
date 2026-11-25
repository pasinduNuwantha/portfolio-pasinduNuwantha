import type { ReactNode } from "react";
import type { SectionId } from "@/data/content";

type SectionProps = {
  id: SectionId;
  /** id of the heading that labels this section (for screen readers) */
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

/** Consistent outer spacing + anchor id for every page section. */
export function Section({ id, labelledBy, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative scroll-mt-4 py-24 sm:py-32 ${className}`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

/** Temporary block shown in sections that are still shells. */
export function ComingSoon({ label }: { label: string }) {
  return (
    <div className="mt-12 flex min-h-[40vh] items-center justify-center rounded-3xl border border-dashed border-ink/15 p-8 text-center">
      <p className="font-mono text-xs tracking-wide text-muted uppercase">{label}</p>
    </div>
  );
}
