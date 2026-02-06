"use client";

import { useState, useEffect, useRef } from "react";
import { useFormikContext } from "formik";

import { TransferFormValues } from "../validation-schemas";

import { PinNumpad } from "./pin-num";
import { Button } from "@/components/shared/button";
import { formatNumber } from "../currency/utils";
import { useCurrencySync } from "../currency/use-currency-sync";
import { useGiftTotal } from "../currency/use-gift-totals";

import Image from "next/image";
import { CurrencyInput } from "../currency-input";
import { handleNumpadInput, MAX_ETB, MAX_USD, sanitizeAmountInput } from "../helpers";

type ActiveField = "USD" | "ETB";

export default function TransferStep({ onContinue }: { onContinue?: () => void }) {
  const { values, setFieldValue } = useFormikContext<TransferFormValues>();
  const [activeField, setActiveField] = useState<ActiveField>("USD");
  const [usdInput, setUsdInput] = useState("");
  const [etbInput, setEtbInput] = useState("");
  const [showNumpad, setShowNumpad] = useState(false);

  const { usd } = useCurrencySync({
    activeCurrency: activeField,
    usdInput,
    etbInput,
    setUsdInput,
    setEtbInput,
  });

  const { show, gift, total } = useGiftTotal(usd);

  // Sync Formik value with local USD input
  useEffect(() => {
    if (Number.isFinite(usd)) setFieldValue("usdAmount", usd, true);
  }, [usd, setFieldValue]);

  // Watch for form reset
  const prevUsdRef = useRef(values.usdAmount);
  useEffect(() => {
    if (prevUsdRef.current !== 0 && values.usdAmount === 0) {
      setUsdInput("");
      setEtbInput("");
    }
    prevUsdRef.current = values.usdAmount;
  }, [values.usdAmount]);

  const numpadKeys = ["1","2","3","4","5","6","7","8","9","00","0","backspace"];
  const quickAmounts = [50,100,200,300,500,1000];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-muted/40 via-background to-card shadow-2xl border border-border">

        {/* Header with Exchange Rate and Gift */}
        <div className="relative bg-gradient-to-r from-primary/90 via-primary to-primary/80 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary-foreground">
              <Image src="/dollar (2).png" alt="US" width={24} height={24} className="opacity-70" quality={100}/>
              <span className="text-base font-bold sm:text-lg">
                1 USD = {formatNumber(usd * 1)} ETB
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

        {/* Currency Inputs */}
        <div className="p-4 space-y-5 sm:p-6 sm:space-y-6">
          <CurrencyInput
            value={usdInput}
            currency="USD"
            activeField={activeField}
            setActiveField={setActiveField}
            onChange={(v) => setUsdInput(sanitizeAmountInput(v, MAX_USD))}
            max={MAX_USD}
            flagSrc="/usa.png"
          />
          <CurrencyInput
            value={etbInput}
            currency="ETB"
            activeField={activeField}
            setActiveField={setActiveField}
            onChange={(v) => setEtbInput(sanitizeAmountInput(v, MAX_ETB))}
            max={MAX_ETB}
            flagSrc="/eth.png"
          />

          {show && (
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-muted/40 via-card to-secondary/60 border border-border p-4 sm:rounded-2xl sm:p-6">
              <div className="text-xs font-medium text-muted-foreground mb-2 sm:text-sm">
                Receivable Amount
              </div>
              <div className="text-3xl font-extrabold text-primary sm:text-4xl">
                {formatNumber(total)} ETB
              </div>
            </div>
          )}

          {/* Quick Amount Buttons */}
          <div className="flex flex-wrap gap-2 justify-center sm:gap-3">
            {quickAmounts.map((amount) => (
              <Button
                key={amount}
                type="button"
                variant="outline"
                className={activeField === "USD" && usd === amount
                  ? "bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground border-primary shadow-lg scale-105"
                  : "bg-card border-border text-foreground hover:border-primary/60 hover:text-primary hover:bg-primary/5"}
                onClick={() => {
                  setActiveField("USD");
                  setUsdInput(String(amount));
                }}
              >
                ${amount}
              </Button>
            ))}
          </div>

          <Button
            type="button"
            className="h-12 w-full rounded-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground font-bold text-base shadow-xl hover:shadow-2xl sm:h-16 sm:text-lg"
            onClick={onContinue}
          >
            Send Money
          </Button>
        </div>

        <PinNumpad
          open={showNumpad}
          keys={numpadKeys}
          onKeyPress={(key) => {
            if (activeField === "USD") setUsdInput(handleNumpadInput(key, usdInput, MAX_USD));
            else setEtbInput(handleNumpadInput(key, etbInput, MAX_ETB));
          }}
        />
      </div>
    </div>
  );
}
