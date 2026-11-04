// Visitor's preferred currency for fee displays, shared across components and remembered per browser.

import { useSyncExternalStore } from "react";

export type Currency = "UGX" | "USD";

// PLACEHOLDER: indicative rate for display only; the Finance Office sets the rate used on invoices.
export const UGX_PER_USD = 3700;

const KEY = "kcu-currency";
const listeners = new Set<() => void>();

function read(): Currency {
  try {
    return localStorage.getItem(KEY) === "USD" ? "USD" : "UGX";
  } catch {
    return "UGX";
  }
}

export function setCurrency(c: Currency) {
  try {
    localStorage.setItem(KEY, c);
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useCurrency() {
  return useSyncExternalStore(subscribe, read, () => "UGX" as Currency);
}

/** "UGX 3,500,000" -> "≈ USD 946" when showing dollars; non-UGX amounts pass through unchanged. */
export function convertFee(fee: string, to: Currency) {
  if (to === "UGX" || !/^UGX/i.test(fee)) return fee;
  const n = Number(fee.replace(/[^\d]/g, ""));
  if (!n) return fee;
  return `≈ USD ${Math.round(n / UGX_PER_USD).toLocaleString("en-US")}`;
}
