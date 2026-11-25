import { content } from "@/data/content";

const { site } = content;

/** Shell — the video, parallax name and entrance animation come in the next phase. */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-dvh flex-col justify-end overflow-hidden pt-28 pb-12 sm:pb-16"
    >
      {/* Giant faded first name behind everything */}
      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[22vw] leading-none font-semibold tracking-[-0.06em] text-ink/[0.045] uppercase select-none"
      >
        {site.firstName}
      </p>

      <div className="relative container-page">
        <p className="eyebrow mb-6">{site.name}</p>
        <h1
          id="hero-heading"
          className="text-[clamp(3rem,10vw,8.5rem)] leading-[0.9] font-semibold tracking-[-0.045em] text-ink"
        >
          <span className="block">{site.title[0]}</span>
          <span className="block font-serif font-normal tracking-[-0.02em] text-ink-soft italic">
            {site.title[1]}
          </span>
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
          {site.subtitle}
        </p>
      </div>
    </section>
  );
}
