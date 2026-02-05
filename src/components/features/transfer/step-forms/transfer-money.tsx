"use client";

import { useFormikContext } from "formik";

import { cn } from "@/lib/utils";
import { useCurrencySync } from "../currency/useCurrencySync";
import { useGiftTotal } from "../currency/useGiftTotal";
import { formatNumber } from "../currency/utils";
import { EXCHANGE_RATE } from "../currency/constants";
import { MobileNumpad } from "../components/pin-num";
import Image from "next/image";
import type { TransferFormValues } from "../validation-schemas";
import { Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";

type ActiveField = "USD" | "ETB";

const MAX_USD = 25000;

export default function TransferStep({
  onContinue,
}: {
  onContinue?: () => void;
}) {
  const { values, setFieldValue } = useFormikContext<TransferFormValues>();
  const [activeField, setActiveField] = useState<ActiveField>("USD");
  const [usdInput, setUsdInput] = useState("");
  const [etbInput, setEtbInput] = useState("");
  const [showNumpad, setShowNumpad] = useState(false);

  const { usd } = useCurrencySync({
    activeField,
    usdInput,
    etbInput,
    setUsdInput,
    setEtbInput,
  });

  const { show, gift, total } = useGiftTotal(usd);

  // Watch for form reset and clear local state
  const formUsdAmount = values.usdAmount;
  const prevFormUsdAmountRef = useRef(formUsdAmount);

  useEffect(() => {
    // Only clear if form was reset (went from non-zero to zero)
    if (prevFormUsdAmountRef.current !== 0 && formUsdAmount === 0) {
      setUsdInput("");
      setEtbInput("");
    }
    prevFormUsdAmountRef.current = formUsdAmount;
  }, [formUsdAmount]);

  useEffect(() => {
    setFieldValue("usdAmount", usd, true);
  }, [setFieldValue, usd]);

  const sanitizeAmountInput = (value: string, max?: number) => {
    const normalized = value.replace(/[^\d.]/g, "");
    if (!normalized) return "";
    const [whole, ...rest] = normalized.split(".");
    const decimal = rest.join("");

    const next = normalized.includes(".")
      ? `${whole}.${decimal.slice(0, 2)}`
      : whole;

    if (max == null) return next;
    const asNumber = Number(next);
    if (!Number.isFinite(asNumber)) return "";
    if (asNumber > max) return String(max);
    return next;
  };

  const MAX_ETB = MAX_USD * EXCHANGE_RATE;

  const numpadKeys = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "00",
    "0",
    "backspace",
  ];

  const handleNumpadInput = (value: string) => {
    const currentValue = activeField === "USD" ? usdInput : etbInput;
    const rawValue = currentValue.replace(/,/g, "");
    const nextValue =
      value === "backspace" ? rawValue.slice(0, -1) : `${rawValue}${value}`;

    if (activeField === "USD") {
      setUsdInput(sanitizeAmountInput(nextValue, MAX_USD));
      return;
    }

    setEtbInput(sanitizeAmountInput(nextValue, MAX_ETB));
  };

  const quickAmounts = [50, 100, 200, 300, 500, 1000];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-muted/40 via-background to-card shadow-2xl border border-border">
        {/* Header with Exchange Rate and Gift */}
        <div className="relative bg-gradient-to-r from-primary/90 via-primary to-primary/80 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary-foreground">
              <Image
                src="/dollar (2).png"
                alt="US"
                width={24}
                height={24}
                className="opacity-70"
                quality={100}
              />
              <span className="text-base font-bold sm:text-lg">
                1 USD = {formatNumber(EXCHANGE_RATE)} ETB
              </span>
            </div>
            {show && (
              <div className="bg-card/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg border border-border sm:px-4 sm:py-2">
                <span className="text-xs font-semibold text-primary sm:text-sm">
                  Gift: {formatNumber(gift)} ETB
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Form Content */}
        <div
          className={cn(
            "p-4 space-y-5 sm:p-6 sm:space-y-6",
            showNumpad && "pb-16 sm:pb-6",
          )}
        >
          {/* USD Input Section */}
          <div className="space-y-3">
            <div
              className={cn(
                "relative rounded-xl border-2 bg-card shadow-md transition-colors sm:rounded-2xl",
                activeField === "USD" ? "border-primary" : "border-border",
              )}
            >
              <div className="pointer-events-none absolute left-5 top-3 text-xs font-medium text-muted-foreground sm:left-6 sm:top-4 sm:text-sm">
                Enter Amount
              </div>
              <div className="absolute left-5 bottom-5 flex items-baseline gap-2 sm:left-6 sm:bottom-6">
                <span
                  className={cn(
                    "text-4xl font-bold leading-none transition-colors sm:text-5xl",
                    activeField === "USD"
                      ? "text-primary"
                      : "text-foreground/70",
                  )}
                >
                  $
                </span>
              </div>
              <Input
                value={usdInput}
                onChange={(e) => {
                  setActiveField("USD");
                  setUsdInput(sanitizeAmountInput(e.target.value, MAX_USD));
                }}
                onFocus={() => {
                  setActiveField("USD");
                  setShowNumpad(true);
                }}
                onBlur={() => setShowNumpad(false)}
                className={cn(
                  "h-24 rounded-xl border-0 bg-transparent pl-14 pr-20 pt-7 text-4xl font-bold leading-none shadow-none sm:h-28 sm:rounded-2xl sm:pl-16 sm:pr-24 sm:pt-8 sm:text-5xl md:text-5xl",
                  "focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-0 focus-visible:outline-none",
                  activeField === "USD"
                    ? "text-primary caret-primary"
                    : "text-foreground caret-foreground/60",
                )}
                placeholder="0"
                type="text"
                inputMode="decimal"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1.5 shadow-sm sm:right-4 sm:gap-2 sm:px-3 sm:py-2">
                <div className="h-6 w-6 rounded-full overflow-hidden border border-border/50 flex items-center justify-center sm:h-7 sm:w-7">
                  <Image
                    src="/usa.png"
                    alt="US"
                    width={28}
                    height={28}
                    className="object-cover"
                  />
                </div>
                <span className="text-base font-bold text-foreground sm:text-lg">
                  USD
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-primary sm:text-sm">
              <Info className="h-4 w-4" />
              <span className="md:text-base">Minimum Amount: $5.00</span>
            </div>
          </div>

          {/* ETB Input Section */}
          <div className="space-y-3">
            <div
              className={cn(
                "relative rounded-xl border-2 bg-card shadow-md transition-colors sm:rounded-2xl",
                activeField === "ETB" ? "border-primary" : "border-border",
              )}
            >
              <div className="pointer-events-none absolute left-5 top-3 text-xs font-medium text-muted-foreground sm:left-6 sm:top-4 sm:text-sm">
                Enter Amount
              </div>
              <Input
                value={etbInput}
                onChange={(e) => {
                  setActiveField("ETB");
                  setEtbInput(sanitizeAmountInput(e.target.value, MAX_ETB));
                }}
                onFocus={() => {
                  setActiveField("ETB");
                  setShowNumpad(true);
                }}
                onBlur={() => setShowNumpad(false)}
                className={cn(
                  "h-24 rounded-xl border-0 bg-transparent pl-6 pr-20 pt-7 text-4xl font-bold leading-none shadow-none sm:h-28 sm:rounded-2xl sm:pr-24 sm:pt-8 sm:text-5xl md:text-5xl",
                  "focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-0 focus-visible:outline-none",
                  activeField === "ETB"
                    ? "text-primary caret-primary"
                    : "text-foreground caret-foreground/60",
                )}
                placeholder="0.00"
                type="text"
                inputMode="decimal"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1.5 shadow-sm sm:right-4 sm:gap-2 sm:px-3 sm:py-2">
                <div className="h-6 w-6 rounded-full overflow-hidden border border-border/50 flex items-center justify-center sm:h-7 sm:w-7">
                  <Image
                    src="/eth.png"
                    alt="ET"
                    width={28}
                    height={28}
                    className="object-cover"
                  />
                </div>
                <span className="text-base font-bold text-foreground sm:text-lg">
                  ETB
                </span>
              </div>
            </div>
          </div>

          {/* Receivable Amount (conditionally rendered) */}
          {show && (
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-muted/40 via-card to-secondary/60 border border-border p-4 sm:rounded-2xl sm:p-6">
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-4 text-6xl">💰</div>
                <div className="absolute bottom-4 left-4 text-4xl">💵</div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl">
                  🎁
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-xs font-medium text-muted-foreground mb-2 sm:text-sm">
                  Receivable Amount
                </div>
                <div className="text-3xl font-extrabold text-primary sm:text-4xl">
                  {formatNumber(total)} ETB
                </div>
              </div>
            </div>
          )}

          {/* Quick Amount Buttons */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 justify-center sm:gap-3">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-10 px-4 rounded-full font-semibold text-sm transition-all border-2 sm:h-12 sm:px-6 sm:text-base",
                    usd === amount && activeField === "USD"
                      ? "bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground border-primary shadow-lg scale-105"
                      : "bg-card border-border text-foreground hover:border-primary/60 hover:text-primary hover:bg-primary/5",
                  )}
                  onClick={() => {
                    setActiveField("USD");
                    setUsdInput(String(amount));
                  }}
                >
                  ${amount}
                </Button>
              ))}
            </div>
          </div>


          {/* Send Money Button */}
          <Button
            type="button"
            className="h-12 w-full rounded-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary hover:via-primary/80 hover:to-primary/70 text-primary-foreground font-bold text-base shadow-xl hover:shadow-2xl transition-all sm:h-16 sm:text-lg"
            onClick={onContinue}
          >
            Send Money
          </Button>
        </div>

        <MobileNumpad
          open={showNumpad}
          keys={numpadKeys}
          onKeyPress={(key) =>
            handleNumpadInput(key === "backspace" ? "backspace" : key)
          }
        />
      </div>
    </div>
  );
}
