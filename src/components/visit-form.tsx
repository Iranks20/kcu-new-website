"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const field = "mt-1.5 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 outline-none transition focus:border-primary-600 focus:ring-4 focus:ring-primary-600/15";

/** Presentation-only campus tour booking: validates in the browser and shows a confirmation. Wire to the backend later. */
export function VisitForm() {
  const [sent, setSent] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-slate-200">
        <CheckCircle2 className="size-14 text-primary-600" aria-hidden />
        <h3 className="mt-5 text-2xl">Your visit request is in</h3>
        <p className="mt-2 max-w-sm text-slate-600">The admissions team will confirm your tour time by phone or email within one working day.</p>
        <button type="button" onClick={() => setSent(false)} className="mt-6 font-semibold text-ink underline-offset-4 hover:underline">
          Book another visit
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
      className="grid gap-5 rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:grid-cols-2 sm:p-8"
    >
      <label className="text-sm font-medium text-ink">
        Full name
        <input required name="name" autoComplete="name" className={field} />
      </label>
      <label className="text-sm font-medium text-ink">
        Phone number
        <input required type="tel" name="phone" autoComplete="tel" className={field} />
      </label>
      <label className="text-sm font-medium text-ink sm:col-span-2">
        Email address
        <input required type="email" name="email" autoComplete="email" className={field} />
      </label>
      <label className="text-sm font-medium text-ink">
        Preferred date
        <input required type="date" name="date" min={today} className={field} />
      </label>
      <label className="text-sm font-medium text-ink">
        Number of visitors
        <select name="group" className={field} defaultValue="1–2">
          <option>1–2</option>
          <option>3–5</option>
          <option>6–15</option>
          <option>School group (16+)</option>
        </select>
      </label>
      <label className="text-sm font-medium text-ink sm:col-span-2">
        Programmes you&apos;re interested in <span className="font-normal text-slate-500">(optional)</span>
        <input name="interests" placeholder="e.g. Medicine, Law, Cyber security" className={field} />
      </label>
      <div className="sm:col-span-2">
        <button type="submit" className="h-12 w-full rounded-full bg-primary-600 px-8 font-semibold text-white transition hover:bg-primary-700 sm:w-auto">
          Request a campus tour
        </button>
        <p className="mt-3 text-sm text-slate-500">Tours run Monday to Friday, 9:00 AM to 4:00 PM, and on Saturday mornings.</p>
      </div>
    </form>
  );
}
