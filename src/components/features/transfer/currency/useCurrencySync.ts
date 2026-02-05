// currency/useCurrencySync.ts
import { useEffect } from "react";
import { EXCHANGE_RATE } from "./constants";
import { clampNonNegative, parseDecimal, formatNumber } from "./utils";

type ActiveField = "USD" | "ETB";

export function useCurrencySync({
  activeField,
  usdInput,
  etbInput,
  setUsdInput,
  setEtbInput,
}: {
  activeField: ActiveField;
  usdInput: string;
  etbInput: string;
  setUsdInput: (v: string) => void;
  setEtbInput: (v: string) => void;
}) {
  const usd = clampNonNegative(parseDecimal(usdInput));
  const etb = clampNonNegative(parseDecimal(etbInput));

  useEffect(() => {
    if (activeField !== "USD") return;
    setEtbInput(formatNumber(usd * EXCHANGE_RATE));
  }, [activeField, usd]);

  useEffect(() => {
    if (activeField !== "ETB") return;
    const nextUsd = etb / EXCHANGE_RATE;
    setUsdInput(nextUsd ? formatNumber(nextUsd) : "0");
  }, [activeField, etb]);

  return { usd, etb };
}
