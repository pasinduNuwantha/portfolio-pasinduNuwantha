import { ArrowUp } from "lucide-react";
import { content } from "@/data/content";
import { listSocials } from "@/lib/socialIcons";
import { CurrentYear } from "@/components/ui/CurrentYear";

const { site } = content;

export function Footer() {
  const socials = listSocials(site.socials);

  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-6 py-8 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <CurrentYear /> {site.name}
          <span aria-hidden className="mx-2 text-muted-light">
            ·
          </span>
          Built with Next.js
        </p>

        <div className="flex items-center gap-5">
          <ul className="flex items-center gap-1" aria-label="Social links">
            {socials.map(({ key, href, label, Icon }) => (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  <Icon size={15} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#hero"
            className="group inline-flex items-center gap-1.5 rounded-full font-medium text-ink transition-opacity hover:opacity-70"
          >
            Back to top
            <ArrowUp size={14} aria-hidden className="transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
