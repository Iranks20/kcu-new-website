"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const field = "mt-1.5 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 outline-none transition focus:border-primary-600 focus:ring-4 focus:ring-primary-600/15";

/** Presentation-only form: validates in the browser and shows a confirmation. Wire to the backend later. */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-slate-50 px-6 py-16 text-center">
        <CheckCircle2 className="size-14 text-ink" aria-hidden />
        <h3 className="mt-5 text-2xl">Thank you!</h3>
        <p className="mt-2 max-w-sm text-slate-600">Your message has been received. Our team will get back to you within one working day.</p>
        <button type="button" onClick={() => setSent(false)} className="mt-6 font-semibold text-ink underline-offset-4 hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-5 sm:grid-cols-2"
    >
      <label className="text-sm font-medium text-ink">
        Full name
        <input required name="name" autoComplete="name" className={field} />
      </label>
      <label className="text-sm font-medium text-ink">
        Email address
        <input required type="email" name="email" autoComplete="email" className={field} />
      </label>
      <label className="text-sm font-medium text-ink">
        Phone number
        <input type="tel" name="phone" autoComplete="tel" className={field} />
      </label>
      <label className="text-sm font-medium text-ink">
        I&apos;m enquiring about
        <select name="topic" className={field} defaultValue="Admissions">
          <option>Admissions</option>
          <option>Fees & funding</option>
          <option>International students</option>
          <option>Short courses</option>
          <option>Partnerships</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="text-sm font-medium text-ink sm:col-span-2">
        Message
        <textarea required name="message" rows={5} className={`${field} h-auto py-3`} />
      </label>
      <div className="sm:col-span-2">
        <button type="submit" className="h-12 w-full rounded-full bg-primary-600 px-8 font-semibold text-white transition hover:bg-primary-700 sm:w-auto">
          Send message
        </button>
      </div>
    </form>
  );
}
