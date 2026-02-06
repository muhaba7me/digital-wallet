export function formatNumber(value: number, digits = 2) {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function parseDecimal(input: string) {
  const normalized = input.replace(/,/g, "").trim();
  if (!normalized) return 0;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : 0;
}

export function clampNonNegative(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}
