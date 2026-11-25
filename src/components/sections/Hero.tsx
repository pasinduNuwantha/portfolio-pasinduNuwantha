import { existsSync } from "node:fs";
import path from "node:path";
import { ArrowDown } from "lucide-react";
import { content } from "@/data/content";
import { HeroMedia } from "@/components/sections/hero/HeroMedia";
import { ParallaxName } from "@/components/sections/hero/ParallaxName";

const { site, hero } = content;

/** True if a file exists under /public (checked at build time). */
function publicFileExists(src: string) {
  return existsSync(path.join(process.cwd(), "public", src));
}

export function Hero() {
  // Only reference media that actually exists, so a missing file never
  // causes a 404 or a broken-video flash. Fallback order: video → poster → silhouette.
  const media = {
    webm: publicFileExists(hero.videoWebm) ? hero.videoWebm : undefined,
    mp4: publicFileExists(hero.videoMp4) ? hero.videoMp4 : undefined,
    poster: publicFileExists(hero.poster) ? hero.poster : undefined,
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-dvh flex-col justify-end overflow-hidden pt-24 pb-10 sm:pb-14"
    >
      <ParallaxName text={site.firstName} />

      <HeroMedia {...media} alt={`${site.name}, illustrated`} />

      <div className="relative z-10 container-page">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-5 animate-fade-up" style={{ animationDelay: "200ms" }}>
              {site.name}
            </p>
            <h1
              id="hero-heading"
              className="text-[clamp(3.25rem,11vw,9rem)] leading-[0.88] font-semibold tracking-[-0.05em] text-ink"
            >
              {/* Each line rises in, staggered. Not clipped by a mask: the title is the
                  page's LCP element, and Chrome only records LCP once the whole element
                  is visible — a mask slide would delay LCP until the animation ends. */}
              <span className="block animate-title-in" style={{ animationDelay: "60ms" }}>
                {site.title[0]}
              </span>{" "}
              <span
                className="block pb-[0.06em] animate-title-in font-serif font-normal tracking-[-0.02em] text-ink-soft italic"
                style={{ animationDelay: "160ms" }}
              >
                {site.title[1]}
              </span>
            </h1>
            <p
              className="mt-5 max-w-sm text-base leading-relaxed text-pretty text-ink-soft animate-fade-up sm:text-lg"
              style={{ animationDelay: "650ms" }}
            >
              {site.subtitle}
            </p>
          </div>

          <a
            href="#about"
            className="mb-2 hidden shrink-0 items-center gap-2 rounded-full border border-ink/15 bg-surface/60 py-2 pr-2 pl-4 text-sm font-medium text-ink backdrop-blur-md transition-colors animate-fade-up hover:border-ink/40 sm:inline-flex"
            style={{ animationDelay: "900ms" }}
          >
            Explore
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-surface">
              <ArrowDown size={14} className="animate-nudge-down" aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
