"use client";

import { FormField, FormItem, FormMessage } from "@/components/shared/form";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BANKS } from "../banks";
import { useFormikContext } from "formik";

export default function BankOptions() {
  const { values, setFieldValue, errors, touched } = useFormikContext<{
    selectedBankId: string;
  }>();

  return (
    <div className="w-full overflow-hidden">
      <div className="">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight">Banks List</h2>
          <p className="text-sm text-muted-foreground">
            Select one bank to receive the cash gift.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 p-2">
          {BANKS.map((bank) => {
            const selected = bank.id === values.selectedBankId;

            return (
              <button
                key={bank.id}
                type="button"
                onClick={() => setFieldValue("selectedBankId", bank.id)}
                className={cn(
                  "rounded-2xl transition-all shadow-sm hover:shadow-md px-2 py-3 border",
                  "hover:border-primary/40",
                  selected
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border",
                )}
              >
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div className="flex size-16 items-center justify-center p-2 sm:size-20">
                    <Image
                      src={bank.logo}
                      alt={bank.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center text-xs font-medium text-foreground sm:text-sm line-clamp-2">
                    {bank.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {touched.selectedBankId && errors.selectedBankId && (
          <p className="mt-3 text-sm font-medium text-destructive">
            {errors.selectedBankId}
          </p>
        )}
      </div>
    </div>
  );
}