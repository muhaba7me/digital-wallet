"use client";

import { Button } from "@/components/shared/button";
import Image from "next/image";

type Receipt = {
  usdAmount: number;
  senderName: string;
  receiverName: string;
  receiverAccount: string;
  bankName: string;
  paymentReference: string;
  dateLabel: string;
  totalUsd: number;
};

function formatUsd(amount: number) {
  if (!Number.isFinite(amount)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function SuccessScreen({
  receipt,
  onDone,
}: {
  receipt: Receipt;
  onDone: () => void;
}) {
  return (
    <div className="w-full overflow-hidden flex flex-col px-4 py-6 h-full">
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-24 items-center justify-center">
            <Image
              src="/step-7.png"
              alt="Success"
              width={96}
              height={96}
              className="object-contain"
            />
          </div>

          <h2 className="mt-6 text-2xl font-extrabold tracking-tight">
            Cash Gift Sent Successfully!
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Your gift has been sent successfully. The recipient will receive it
            shortly. Thank you for using StarGift.
          </p>
        </div>

        <div className="mt-7 rounded-[2rem] p-6 shadow-sm">
          <div className="rounded-2xl border bg-white px-4 py-4">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-muted/60">
                <span className="text-xl">💸</span>
              </div>
              <div className="leading-tight">
                <div className="text-lg font-bold">
                  {formatUsd(receipt.usdAmount)}
                </div>
                <div className="text-xs text-muted-foreground">Cash Gift</div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-sm font-semibold">Transaction Detail</div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <div className="text-muted-foreground">Sender name:</div>
                <div className="font-medium text-right">
                  {receipt.senderName || "-"}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="text-muted-foreground">Receiver Name:</div>
                <div className="font-medium text-right">
                  {receipt.receiverName || "-"}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="text-muted-foreground">Receiver Account:</div>
                <div className="font-medium text-right">
                  {receipt.receiverAccount || "-"}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="text-muted-foreground">Bank Name:</div>
                <div className="font-medium text-right">
                  {receipt.bankName || "-"}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="text-muted-foreground">Payment Reference:</div>
                <div className="font-medium text-right">
                  {receipt.paymentReference || "-"}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="text-muted-foreground">Date:</div>
                <div className="font-medium text-right">
                  {receipt.dateLabel || "-"}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-base font-bold">Total</div>
              <div className="text-lg font-extrabold">
                {formatUsd(receipt.totalUsd)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Button
          type="button"
          className="h-14 w-full rounded-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary hover:via-primary/80 hover:to-primary/70 text-primary-foreground font-bold text-base shadow-xl hover:shadow-2xl transition-all"
          onClick={onDone}
        >
          Done
        </Button>
      </div>
    </div>
  );
}
