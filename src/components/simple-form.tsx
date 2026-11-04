"use client";

import { useId, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const field = "mt-1.5 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 outline-none transition focus:border-primary-600 focus:ring-4 focus:ring-primary-600/15";

export type FormField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "select" | "textarea";
  options?: string[];
  required?: boolean;
  autoComplete?: string;
  /** Span both columns. */
  full?: boolean;
};

/** Presentation-only form built from a field list: validates in the browser and shows a confirmation. Wire to the backend later. */
export function SimpleForm({ fields, submitLabel, successTitle, successText }: { fields: FormField[]; submitLabel: string; successTitle: string; successText: string }) {
  const [sent, setSent] = useState(false);
  const id = useId();

  if (sent) {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-slate-200" role="status">
        <CheckCircle2 className="size-14 text-primary-600" aria-hidden />
        <h3 className="mt-5 text-2xl">{successTitle}</h3>
        <p className="mt-2 max-w-sm text-slate-600">{successText}</p>
        <button type="button" onClick={() => setSent(false)} className="mt-6 font-semibold text-ink underline-offset-4 hover:underline">
          Submit another response
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
      {fields.map((f) => {
        const fid = `${id}-${f.name}`;
        const full = f.full || f.type === "textarea";
        return (
          <div key={f.name} className={cn(full && "sm:col-span-2")}>
            <label htmlFor={fid} className="text-sm font-medium text-ink">
              {f.label}
              {!f.required && <span className="font-normal text-slate-500"> (optional)</span>}
            </label>
            {f.type === "select" ? (
              <select id={fid} name={f.name} required={f.required} className={field} defaultValue="">
                <option value="" disabled>
                  Choose…
                </option>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea id={fid} name={f.name} required={f.required} rows={4} className={`${field} h-auto py-3`} />
            ) : (
              <input id={fid} name={f.name} type={f.type ?? "text"} required={f.required} autoComplete={f.autoComplete} className={field} />
            )}
          </div>
        );
      })}
      <div className="sm:col-span-2">
        <button type="submit" className="h-12 w-full rounded-full bg-primary-600 px-8 font-semibold text-white transition hover:bg-primary-700 sm:w-auto">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
