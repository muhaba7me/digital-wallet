import { useEffect, useMemo } from "react";
import { EXCHANGE_RATE } from "./constants";
import { clampNonNegative, formatNumber, parseDecimal } from "./utils";

type Currency = "USD" | "ETB";

interface UseCurrencySyncProps {
  activeCurrency: Currency;
  usdInput: string;
  etbInput: string;
  setUsdInput: (val: string) => void;
  setEtbInput: (val: string) => void;
}

export function useCurrencySync({
  activeCurrency,
  usdInput,
  etbInput,
  setUsdInput,
  setEtbInput,
}: UseCurrencySyncProps) {
  // Parse and sanitize inputs - FIXED variable names
  const usd = useMemo(() => clampNonNegative(parseDecimal(usdInput)), [usdInput]);
  const etb = useMemo(() => clampNonNegative(parseDecimal(etbInput)), [etbInput]);

  // Sync ETB when USD changes - FIXED setter name
  useEffect(() => {
    if (activeCurrency === "USD") {
      const nextEtb = usd * EXCHANGE_RATE;
      setEtbInput(formatNumber(nextEtb));
    }
  }, [activeCurrency, usd, setEtbInput]);

  // Sync USD when ETB changes - FIXED setter name
  useEffect(() => {
    if (activeCurrency === "ETB") {
      const nextUsd = etb / EXCHANGE_RATE;
      setUsdInput(nextUsd ? formatNumber(nextUsd) : "0");
    }
  }, [activeCurrency, etb, setUsdInput]);

  return { usd, etb };
}