import { ArrowUp } from "lucide-react";
import { content } from "@/data/content";
import { CurrentYear } from "@/components/ui/CurrentYear";

const { site } = content;

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-4 py-8 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <CurrentYear /> {site.name} · Built with Next.js
        </p>
        <a
          href="#hero"
          className="inline-flex items-center gap-1.5 self-start rounded-full font-medium text-ink transition-opacity hover:opacity-70 sm:self-auto"
        >
          Back to top <ArrowUp size={14} aria-hidden />
        </a>
      </div>
    </footer>
  );
}
