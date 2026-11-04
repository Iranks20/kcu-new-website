"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

/** Presentation-only newsletter sign-up for the footer. Wire to the mailing list later. */
export function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="flex items-center gap-2 font-medium text-white" role="status">
        <CheckCircle2 className="size-5 text-gold-400" aria-hidden /> You&apos;re subscribed. Look out for our next update.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="newsletter-email" className="text-sm font-semibold uppercase tracking-wider text-white">
        Stay in the loop
      </label>
      <p className="mt-2 text-[0.9375rem]">Intake deadlines, open days and news, once a month.</p>
      <div className="mt-4 flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="h-11 min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 text-white outline-none transition placeholder:text-white/40 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20"
        />
        <button type="submit" className="h-11 shrink-0 rounded-full bg-gold-400 px-5 text-sm font-semibold text-ink transition hover:bg-gold-300">
          Subscribe
        </button>
      </div>
      <p className="mt-2 text-xs text-primary-300">
        See our <Link href="/privacy" className="underline underline-offset-2 hover:text-white">Privacy Policy</Link>. Unsubscribe any time.
      </p>
    </form>
  );
}
