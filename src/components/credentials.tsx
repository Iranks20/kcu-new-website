import { BadgeCheck } from "lucide-react";
import { accreditations } from "@/content/university";

/** The University's charter, accreditation and recognition, shown where applicants decide whether to trust us. */
export function Credentials() {
  return (
    <section aria-label="Accreditation" className="border-b border-slate-200 bg-white">
      <ul className="container-x grid gap-x-8 gap-y-6 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:py-10">
        {accreditations.map((a) => (
          <li key={a.title} className="flex gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold-50 ring-1 ring-gold-200">
              <BadgeCheck className="size-5 text-gold-600" aria-hidden />
            </span>
            <div>
              <p className="font-semibold text-ink">{a.title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{a.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
