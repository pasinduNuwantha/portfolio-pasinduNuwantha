"use client";

import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";

/**
 * Simple contact form — UI only for now. Submitting opens the visitor's
 * email app with the message filled in (mailto:). Swap `onSubmit` for
 * Formspree/Resend later without touching the markup.
 */
export function ContactForm({ email }: { email: string }) {
  const [opened, setOpened] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `Portfolio message from ${name}`;
    const body = `${message}\n\n— ${name}${from ? ` (${from})` : ""}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  const field =
    "mt-2 w-full rounded-2xl border border-ink/15 bg-bg/60 px-4 py-3 text-[15px] text-ink placeholder:text-muted transition-[border-color,box-shadow] outline-none focus:border-ink focus:ring-4 focus:ring-ink/10 focus-visible:outline-none";

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8" aria-describedby="contact-form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Name
          <input name="name" type="text" required autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block text-sm font-medium text-ink">
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label className="mt-5 block text-sm font-medium text-ink">
        Message
        <textarea
          name="message"
          required
          rows={5}
          className={`${field} resize-y`}
          placeholder="Tell me about the role or project…"
        />
      </label>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p id="contact-form-note" className="text-xs text-ink-soft">
          {opened ? "Your email app should have opened — just hit send." : "Opens your email app with the message ready."}
        </p>
        <button
          type="submit"
          className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-surface transition-colors hover:bg-ink/85 active:scale-[0.97]"
        >
          Send message
          <Send size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </form>
  );
}
