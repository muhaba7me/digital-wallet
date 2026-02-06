"use client";

import { useFormikContext } from "formik";
import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useCurrencySync } from "../currency/use-currency-sync";
import { useGiftTotal } from "../currency/use-gift-totals";
import { formatNumber } from "../currency/utils";
import { EXCHANGE_RATE } from "../currency/constants";
import { PinNumpad } from "./pin-num";
import Image from "next/image";
import type { TransferFormValues } from "../form-validation";
import { Info } from "lucide-react";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";

// Types and interfaces
type CurrencyType = "USD" | "ETB";

interface AmountInputProps {
  currency: CurrencyType;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  isActive: boolean;
  flagSrc: string;
  currencyCode: string;
}

interface QuickAmountButtonProps {
  amount: number;
  isActive: boolean;
  onClick: () => void;
}

interface ReceivableAmountProps {
  amount: number;
  gift: number;
  show: boolean;
}

// Constants
const TRANSFER_LIMITS = {
  USD: { min: 5, max: 25000 },
  ETB: { min: 0, max: 25000 * 165 },
};

const QUICK_AMOUNTS = [50, 100, 200, 300, 500, 1000];

const NUMPAD_KEYS: string[] = [
  "1", "2", "3",
  "4", "5", "6",
  "7", "8", "9",
  "00", "0", "backspace"
];

// Utility functions
const sanitizeCurrencyInput = (input: string, max: number): string => {
  const numericOnly = input.replace(/[^\d.]/g, "");
  if (!numericOnly) return "";

  const [wholePart, ...decimalParts] = numericOnly.split(".");
  const decimalPart = decimalParts.join("");

  const formatted = numericOnly.includes(".")
    ? `${wholePart}.${decimalPart.slice(0, 2)}`
    : wholePart;

  const numericValue = Number(formatted);
  if (!Number.isFinite(numericValue) || numericValue > max) {
    return String(max);
  }

  return formatted;
};

// Sub-components
const CurrencyFlag: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className="h-6 w-6 rounded-full overflow-hidden border border-border/50 flex items-center justify-center sm:h-7 sm:w-7">
    <Image src={src} alt={alt} width={28} height={28} className="object-cover" />
  </div>
);

const AmountInput: React.FC<AmountInputProps> = ({
  currency,
  value,
  onChange,
  onFocus,
  isActive,
  flagSrc,
  currencyCode,
}) => (
  <div
    className={cn(
      "relative rounded-xl border-2 bg-card shadow-md transition-colors sm:rounded-2xl",
      isActive ? "border-primary" : "border-border",
    )}
  >
    <div className="pointer-events-none absolute left-5 top-3 text-xs font-medium text-muted-foreground sm:left-6 sm:top-4 sm:text-sm">
      Enter Amount
    </div>

    {currency === "USD" && (
      <div className="absolute left-5 bottom-5 flex items-baseline gap-2 sm:left-6 sm:bottom-6">
        <span
          className={cn(
            "text-4xl font-bold leading-none transition-colors sm:text-5xl",
            isActive ? "text-primary" : "text-foreground/70",
          )}
        >
          $
        </span>
      </div>
    )}

    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      className={cn(
        "h-24 rounded-xl border-0 bg-transparent pt-7 text-4xl font-bold leading-none shadow-none sm:h-28 sm:rounded-2xl sm:pt-8 sm:text-5xl md:text-5xl",
        "focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-0 focus-visible:outline-none",
        isActive ? "text-primary caret-primary" : "text-foreground caret-foreground/60",
        currency === "USD" ? "pl-14 pr-20" : "pl-6 pr-20",
      )}
      placeholder="0"
      type="text"
      inputMode="decimal"
    />

    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1.5 shadow-sm sm:right-4 sm:gap-2 sm:px-3 sm:py-2">
      <CurrencyFlag src={flagSrc} alt={`${currencyCode} flag`} />
      <span className="text-base font-bold text-foreground sm:text-lg">
        {currencyCode}
      </span>
    </div>
  </div>
);

const QuickAmountButton: React.FC<QuickAmountButtonProps> = ({ amount, isActive, onClick }) => (
  <Button
    type="button"
    variant="outline"
    className={cn(
      "h-10 px-4 rounded-full font-semibold text-sm transition-all border-2 sm:h-12 sm:px-6 sm:text-base",
      isActive
        ? "bg-linear-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground border-primary shadow-lg scale-105"
        : "bg-card border-border text-foreground hover:border-primary/60 hover:text-primary hover:bg-primary/5",
    )}
    onClick={onClick}
  >
    ${amount}
  </Button>
);

const ReceivableAmount: React.FC<ReceivableAmountProps> = ({ amount, gift, show }) => {
  if (!show) return null;

  return (
    <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-muted/40 via-card to-secondary/60 border border-border p-4 sm:rounded-2xl sm:p-6">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 text-6xl">💰</div>
        <div className="absolute bottom-4 left-4 text-4xl">💵</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl">🎁</div>
      </div>

      <div className="relative">
        <div className="text-xs font-medium text-muted-foreground mb-2 sm:text-sm">
          Receivable Amount
        </div>
        <div className="text-3xl font-extrabold text-primary sm:text-4xl">
          {formatNumber(amount)} ETB
        </div>
        {gift > 0 && (
          <div className="text-sm text-muted-foreground mt-1">
            Includes {formatNumber(gift)} ETB gift
          </div>
        )}
      </div>
    </div>
  );
};

// Main component renamed to match file
interface ExchangeCalculatorProps {
  onContinue?: () => void;
}

export default function ExchangeCalculator({ onContinue }: ExchangeCalculatorProps) {
  const { values, setFieldValue } = useFormikContext<TransferFormValues>();
  const [activeCurrency, setActiveCurrency] = useState<CurrencyType>("USD");
  const [usdInput, setUsdInput] = useState("");
  const [etbInput, setEtbInput] = useState("");
  const [showNumpad, setShowNumpad] = useState(false);

  // Currency synchronization
  const { usd } = useCurrencySync({
    activeCurrency,
    usdInput,
    etbInput,
    setUsdInput,
    setEtbInput,
  });

  // Gift calculation
  const { show, gift, total } = useGiftTotal(usd);

  // Form reset handling
  const formUsdAmount = values.usdAmount;
  const prevFormUsdAmountRef = useRef(formUsdAmount);

  useEffect(() => {
    if (prevFormUsdAmountRef.current !== 0 && formUsdAmount === 0) {
      setUsdInput("");
      setEtbInput("");
    }
    prevFormUsdAmountRef.current = formUsdAmount;
  }, [formUsdAmount]);

  // Update form value when USD changes
  useEffect(() => {
    setFieldValue("usdAmount", usd, true);
  }, [setFieldValue, usd]);

  // Event handlers
  const handleCurrencyFocus = useCallback((currency: CurrencyType) => {
    setActiveCurrency(currency);
    setShowNumpad(true);
  }, []);

  const handleNumpadInput = useCallback((key: string) => {
    const currentInput = activeCurrency === "USD" ? usdInput : etbInput;
    const rawValue = currentInput.replace(/,/g, "");
    const nextValue = key === "backspace"
      ? rawValue.slice(0, -1)
      : `${rawValue}${key}`;

    const maxLimit = activeCurrency === "USD"
      ? TRANSFER_LIMITS.USD.max
      : TRANSFER_LIMITS.ETB.max;

    const sanitizedValue = sanitizeCurrencyInput(nextValue, maxLimit);

    if (activeCurrency === "USD") {
      setUsdInput(sanitizedValue);
    } else {
      setEtbInput(sanitizedValue);
    }
  }, [activeCurrency, usdInput, etbInput]);

  const handleQuickAmount = useCallback((amount: number) => {
    setActiveCurrency("USD");
    setUsdInput(String(amount));
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-muted/40 via-background to-card shadow-2xl border border-border">
        {/* Header with Exchange Rate and Gift */}
        <div className="relative bg-linear-to-r from-primary/90 via-primary to-primary/80 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary-foreground">
              <Image
                src="/dollar (2).png"
                alt="US Dollar"
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
        <div className={cn("p-4 space-y-5 sm:p-6 sm:space-y-6", showNumpad && "pb-16 sm:pb-6")}>
          {/* USD Input */}
          <div className="space-y-3">
            <AmountInput
              currency="USD"
              value={usdInput}
              onChange={(value) => setUsdInput(sanitizeCurrencyInput(value, TRANSFER_LIMITS.USD.max))}
              onFocus={() => handleCurrencyFocus("USD")}
              isActive={activeCurrency === "USD"}
              flagSrc="/usa.png"
              currencyCode="USD"
            />
            <div className="flex items-center gap-1 text-xs text-primary sm:text-sm">
              <Info className="h-4 w-4" />
              <span className="md:text-base">Minimum Amount: ${TRANSFER_LIMITS.USD.min}.00</span>
            </div>
          </div>

          {/* ETB Input */}
          <div className="space-y-3">
            <AmountInput
              currency="ETB"
              value={etbInput}
              onChange={(value) => setEtbInput(sanitizeCurrencyInput(value, TRANSFER_LIMITS.ETB.max))}
              onFocus={() => handleCurrencyFocus("ETB")}
              isActive={activeCurrency === "ETB"}
              flagSrc="/eth.png"
              currencyCode="ETB"
            />
          </div>

          {/* Receivable Amount */}
          <ReceivableAmount amount={total} gift={gift} show={show} />

          {/* Quick Amount Buttons */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 justify-center sm:gap-3">
              {QUICK_AMOUNTS.map((amount) => (
                <QuickAmountButton
                  key={amount}
                  amount={amount}
                  isActive={usd === amount && activeCurrency === "USD"}
                  onClick={() => handleQuickAmount(amount)}
                />
              ))}
            </div>
          </div>
          
          {/* Action Button */}
          <Button
            type="button"
            className="h-12 w-full rounded-full bg-linear-to-r from-primary via-primary/90 to-primary/80 hover:from-primary hover:via-primary/80 hover:to-primary/70 text-primary-foreground font-bold text-base shadow-xl hover:shadow-2xl transition-all sm:h-16 sm:text-lg"
            onClick={onContinue}
          >
            Send Money
          </Button>
        </div>

        {/* Mobile Numpad */}
        <PinNumpad
          open={showNumpad}
          keys={NUMPAD_KEYS}
          onKeyPress={handleNumpadInput}
        />
      </div>
    </div>
  );
}