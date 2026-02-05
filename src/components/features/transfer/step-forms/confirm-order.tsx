"use client";

import Image from "next/image";
import { useFormikContext } from "formik";
import { MOCK_ACCOUNTS, initialsFromName } from "@/lib/mock-accounts";
import { cn } from "@/lib/utils";
import { TransferFormValues } from "../validation-schemas";

function formatUsd(amount: number) {
  if (!Number.isFinite(amount)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function ConfirmOrderStep() {
  const { values } = useFormikContext<TransferFormValues>();

  const usdAmount = values.usdAmount ?? 0;
  const selectedBankId = values.selectedBankId ?? "";
  const receiverName = values.receiverName ?? "";
  const receiverAccountNumber = values.receiverAccountNumber ?? "";
  const senderFullName = values.senderFullName ?? "";

  const matchedAccount =
    MOCK_ACCOUNTS.find(
      (a) =>
        a.bankId === selectedBankId &&
        a.accountNumber === receiverAccountNumber,
    ) ?? null;

  const receiverDisplayName = matchedAccount?.fullName ?? receiverName;

  return (
    <div className="w-full overflow-hidden ">
      <div className="">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-20 items-center justify-center">
            <Image
              src="/step-5.png"
              alt="Confirm"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h2 className="mt-5 text-2xl font-extrabold tracking-tight">
            Confirm Order Information
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Please enter your information and pay for your merchant
          </p>
        </div>

        <div className="mt-7 space-y-6 rounded-[2rem] bg-white p-6 shadow-[0_30px_70px_-55px_rgba(0,0,0,0.75)]">
          <div>
            <div className="text-sm font-semibold">Gift Info.</div>
            <div className="mt-3 rounded-2xl border bg-white px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-muted/60">
                  <span className="text-xl">💸</span>
                </div>
                <div className="leading-tight">
                  <div className="text-lg font-bold">
                    {formatUsd(usdAmount)}
                  </div>
                  <div className="text-xs text-muted-foreground">Cash Gift</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Receiver&apos;s Info</div>
            <div className="mt-3 rounded-2xl border bg-white px-4 py-4">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full",
                    "bg-emerald-600 text-sm font-bold text-white",
                  )}
                >
                  {initialsFromName(receiverDisplayName || "Receiver")}
                </div>
                <div className="leading-tight">
                  <div className="text-base font-semibold">
                    {receiverDisplayName || "-"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {receiverAccountNumber || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Sender Information</div>
            <div className="mt-3 rounded-2xl border bg-white px-4 py-4">
              <div className="text-xs text-muted-foreground">Sender Name</div>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <span>👤</span>
                </div>
                <div className="text-sm font-semibold">
                  {senderFullName || "-"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
