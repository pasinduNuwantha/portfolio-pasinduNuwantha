import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Bold sans part, e.g. "Things I've" */
  lead: string;
  /** Italic serif part at the end, e.g. "built." */
  accent?: string;
  /** Tiny uppercase label above the heading, e.g. "Projects" */
  eyebrow?: string;
  /** Optional short line under the heading */
  description?: ReactNode;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
};

/**
 * Editorial heading: bold tight sans + a lighter italic serif word.
 * "Things I've" + "built." → Things I've *built.*
 */
export function SectionHeading({
  lead,
  accent,
  eyebrow,
  description,
  as: Tag = "h2",
  id,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <Tag
        id={id}
        className="text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-balance text-ink"
      >
        {lead}
        {accent && (
          <>
            {" "}
            <span className="font-serif font-normal tracking-[-0.01em] text-ink-soft italic">
              {accent}
            </span>
          </>
        )}
      </Tag>
      {description && (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-ink-soft sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
