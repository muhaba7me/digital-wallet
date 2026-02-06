import { EXCHANGE_RATE } from "@/constants";

export const MAX_USD = 25000;
export const MAX_ETB = MAX_USD * EXCHANGE_RATE;

export function sanitizeAmountInput(value: string, max?: number) {
  const normalized = value.replace(/[^\d.]/g, "");
  if (!normalized) return "";
  const [whole, ...rest] = normalized.split(".");
  const decimal = rest.join("");
  const next = normalized.includes(".") ? `${whole}.${decimal.slice(0, 2)}` : whole;
  const asNumber = Number(next);
  if (!Number.isFinite(asNumber)) return "";
  if (max != null && asNumber > max) return String(max);
  return next;
}

export function handleNumpadInput(key: string, currentValue: string, max: number) {
  const rawValue = currentValue.replace(/,/g, "");
  const nextValue = key === "backspace" ? rawValue.slice(0, -1) : `${rawValue}${key}`;
  return sanitizeAmountInput(nextValue, max);
}
