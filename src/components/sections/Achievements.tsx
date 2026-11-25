import { content } from "@/data/content";
import { brandIcons } from "@/lib/brandIcons";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";

type Stat = (typeof content.achievements.stats)[number];

function StatIcon({ stat }: { stat: Stat }) {
  if (stat.icon) {
    const { Icon, color } = brandIcons[stat.icon];
    return (
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white">
        <Icon size={20} color={color} aria-hidden />
      </span>
    );
  }
  // No brand logo — show a tiny periodic-table tile instead
  return (
    <span
      aria-hidden
      className="flex h-11 w-11 items-center justify-center rounded-xl bg-family-languages text-sm font-semibold text-surface"
    >
      {stat.symbol ?? stat.label.slice(0, 2)}
    </span>
  );
}

export function Achievements() {
  const { stats, rankings } = content.achievements;

  return (
    <Section id="achievements" labelledBy="achievements-heading">
      <Reveal>
        <RevealItem>
          <SectionHeading id="achievements-heading" eyebrow="Achievements" lead="Proud" accent="moments." />
        </RevealItem>
      </Reveal>

      {/* Stat cards: swipeable row on small screens, grid on desktop */}
      <Reveal
        as="ul"
        className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {stats.map((stat) => (
          <RevealItem as="li" key={stat.label} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
            <TiltCard className="h-full">
              <div className="card flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <StatIcon stat={stat} />
                  <span className="font-mono text-[11px] text-muted">{stat.platform}</span>
                </div>
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  className="mt-8 text-[clamp(3rem,5vw,4.25rem)] leading-none font-semibold tracking-[-0.05em] text-ink"
                />
                <p className="mt-3 font-mono text-xs tracking-[0.14em] text-ink uppercase">{stat.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{stat.description}</p>
              </div>
            </TiltCard>
          </RevealItem>
        ))}
      </Reveal>

      {/* Rankings / highlights */}
      {rankings.length > 0 && (
        <Reveal as="ul" className="mt-6 grid gap-4 md:grid-cols-3">
          {rankings.map((r) => (
            <RevealItem as="li" key={r.event}>
              <TiltCard className="h-full">
                <div className="flex h-full flex-col rounded-3xl bg-ink p-7 text-surface shadow-soft">
                  <p className="leading-none">
                    {r.prefix ? (
                      <>
                        <span className="font-serif text-2xl text-surface/70 italic">{r.prefix}</span>{" "}
                        <span className="text-6xl font-semibold tracking-[-0.05em]">{r.rank}</span>
                      </>
                    ) : (
                      <span className="font-serif text-5xl italic">{r.rank}</span>
                    )}
                  </p>
                  <p className="mt-6 text-lg font-semibold tracking-tight">{r.event}</p>
                  {r.year && <p className="mt-1 font-mono text-xs text-surface/70">{r.year}</p>}
                  <p className="mt-3 text-sm leading-relaxed text-surface/80">{r.description}</p>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </Reveal>
      )}
    </Section>
  );
}
