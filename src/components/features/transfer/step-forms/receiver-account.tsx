"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronRight, Search } from "lucide-react";
import { useFormikContext } from "formik";

import { cn } from "@/lib/utils";
import {
  MOCK_ACCOUNTS,
  normalizeAccountNumber,
  initialsFromName,
} from "@/lib/mock-accounts";
import { TransferFormValues } from "../validation-schemas";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/shared/form";
import { Input } from "@/components/shared/input";
import { BANKS } from "../banks";

export default function ReceiverAccountStep() {
  const { values } = useFormikContext<TransferFormValues>();

  const selectedBankId = values.selectedBankId;
  const selectedBank = BANKS.find((b) => b.id === selectedBankId);
  const bankName = selectedBank?.name;
  const bankLogo = selectedBank?.logo;

  const receiverAccountNumber = values.receiverAccountNumber ?? "";
  const [searched, setSearched] = useState(false);

  const foundAccount = useMemo(() => {
    if (!searched) return null;

    const normalized = normalizeAccountNumber(receiverAccountNumber);
    if (!normalized) return null;

    return (
      MOCK_ACCOUNTS.find(
        (a) => a.bankId === selectedBankId && a.accountNumber === normalized,
      ) ?? null
    );
  }, [receiverAccountNumber, searched, selectedBankId]);

  return (
    <div className="w-full overflow-hidden">
      <div className="">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-20 items-center justify-center">
            <Image
              src="/step-3.png"
              alt="Receiver"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h2 className="mt-5 text-2xl font-extrabold tracking-tight">
            Enter Gift Receiver Info
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Please provide the recipient&apos;s full name, address, and any
            special preferences. This will help us tailor the gift to their
            tastes.
          </p>
        </div>

        <div className="mt-7 rounded-[2rem] bg-card p-6 shadow-[0_30px_70px_-55px_rgba(0,0,0,0.75)]">
          <div className="mb-6 flex items-center gap-3 rounded-2xl bg-muted/40 px-4 py-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-card p-1.5">
              <Image
                src={bankLogo ?? "/image-1.png"}
                alt={bankName ?? "Bank"}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">
                {bankName ?? "Selected Bank"}
              </div>
              <div className="text-xs text-muted-foreground">Selected Bank</div>
            </div>
          </div>

          <FormField
            name="receiverAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receiver&apos;s Account Number</FormLabel>
                <div className="relative">
                  <Input
                    {...field}
                    
                   value={String(field.value ?? "")}
                    placeholder="Enter Account Number"
                    className="h-12 rounded-full pr-14"
                    inputMode="numeric"
                    onChange={(e) => {
                      setSearched(false);
                      field.onChange(e);
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    onClick={() => setSearched(true)}
                    aria-label="Search account"
                  >
                    <Search className="size-5" />
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {searched && !foundAccount && (
            <div className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              Account not found for the selected bank.
            </div>
          )}

          {foundAccount && (
            <div className="mt-4">
              <button
                type="button"
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl border-2 border-primary/20 bg-primary/5 px-4 py-4 transition-all",
                  "hover:border-primary/40 hover:bg-primary/10",
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {initialsFromName(foundAccount.fullName)}
                  </div>
                  <div className="text-left leading-tight">
                    <div className="text-base font-semibold">
                      {foundAccount.fullName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {foundAccount.accountNumber}
                    </div>
                  </div>
                </div>

                <ChevronRight className="size-5 text-muted-foreground" />
              </button>
            </div>
          )}

          <div className="mt-6">
            <FormField
              name="senderFullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sender Name</FormLabel>
                  <Input
                    {...field}
                   value={String(field.value ?? "")}
                    placeholder="Enter Full Name"
                    className="h-12 rounded-2xl"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
