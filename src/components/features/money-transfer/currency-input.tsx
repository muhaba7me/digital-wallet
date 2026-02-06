"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Input } from "@/components/shared/input";

type ActiveField = "USD" | "ETB";

interface CurrencyInputProps {
  value: string;
  currency: ActiveField;
  activeField: ActiveField;
  setActiveField: (v: ActiveField) => void;
  onChange: (v: string) => void;
  max: number;
  flagSrc: string;
}

export function CurrencyInput({
  value,
  currency,
  activeField,
  setActiveField,
  onChange,
  flagSrc,
}: CurrencyInputProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border-2 bg-card shadow-md transition-colors sm:rounded-2xl",
        activeField === currency ? "border-primary" : "border-border"
      )}
    >
      <Input
        value={value}
        onChange={(e) => {
          setActiveField(currency);
          onChange(e.target.value);
        }}
        onFocus={() => setActiveField(currency)}
        placeholder="0"
        type="text"
        inputMode="decimal"
        className={cn(
          "h-24 rounded-xl border-0 bg-transparent pl-14 pr-20 pt-7 text-4xl font-bold leading-none sm:h-28 sm:rounded-2xl sm:pl-16 sm:pr-24 sm:pt-8 sm:text-5xl",
          activeField === currency
            ? "text-primary caret-primary"
            : "text-foreground caret-foreground/60"
        )}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1.5 shadow-sm sm:right-4 sm:gap-2 sm:px-3 sm:py-2">
        <div className="h-6 w-6 rounded-full overflow-hidden border border-border/50 flex items-center justify-center sm:h-7 sm:w-7">
          <Image src={flagSrc} alt={currency} width={28} height={28} className="object-cover" />
        </div>
        <span className="text-base font-bold text-foreground sm:text-lg">{currency}</span>
      </div>
    </div>
  );
}
