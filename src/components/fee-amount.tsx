"use client";

import { convertFee, setCurrency, UGX_PER_USD, useCurrency, type Currency } from "@/lib/currency";
import { cn } from "@/lib/utils";

/** A UGX fee that follows the visitor's UGX/USD choice. */
export function FeeAmount({ fee }: { fee: string }) {
  const currency = useCurrency();
  return <>{convertFee(fee, currency)}</>;
}

export function CurrencyToggle({ dark = false, className }: { dark?: boolean; className?: string }) {
  const currency = useCurrency();
  return (
    <div className={cn("inline-flex flex-wrap items-center gap-x-3 gap-y-1", className)}>
      <div role="group" aria-label="Show fees in" className={cn("inline-flex rounded-full p-1", dark ? "bg-white/10" : "bg-slate-100")}>
        {(["UGX", "USD"] as Currency[]).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={currency === c}
            onClick={() => setCurrency(c)}
            className={cn(
              "h-8 rounded-full px-3.5 text-xs font-semibold transition",
              currency === c ? (dark ? "bg-white text-ink" : "bg-primary-600 text-white") : dark ? "text-white/75 hover:text-white" : "text-slate-600 hover:text-ink",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      {currency === "USD" && <span className={cn("text-xs", dark ? "text-white/60" : "text-slate-500")}>Approx. at UGX {UGX_PER_USD.toLocaleString("en-US")} = $1</span>}
    </div>
  );
}
