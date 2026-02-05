"use client";

import { useState } from "react";
import { useFormikContext } from "formik";

import { BANKS } from "./banks";
import BankSelectionStep from "./step-forms/bank-selection-step-2";
import TransferMoneyStep from "./step-forms/transfer-money-step-1";
import { STEPS } from "./step-config";

import type { TransferFormValues } from "./validation-schemas";
import ReceiverInfoStep from "./step-forms/receiver-info-step-3";

import ConfirmOrderStep from "./step-forms/confirm-order-step-5";
// import PaymentStep from "./step-forms/payment-step-6";
import SuccessScreen from "./step-forms/success-screen";
import ReceiverAccountStep from "./step-forms/receiver-account-step-4";
import { ChevronLeft } from "lucide-react";
import { MOCK_ACCOUNTS, normalizeAccountNumber } from "@/lib/mock-accounts";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/components/shared/dialog";

function formatDateLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function generatePaymentReference() {
  const n = Math.floor(100000000 + Math.random() * 900000000);
  return `FTX-${n}`;
}

export function TransferMultiStepForm() {
  const [step, setStep] = useState(0);
  const [submittedReceipt, setSubmittedReceipt] = useState<null | {
    usdAmount: number;
    senderName: string;
    receiverName: string;
    receiverAccount: string;
    bankName: string;
    paymentReference: string;
    dateLabel: string;
    totalUsd: number;
  }>(null);

  const {
    validateForm,
    setFieldTouched,
    resetForm,
    values,
  } = useFormikContext<TransferFormValues>();

  const next = async () => {
    const fields = STEPS[step].fields;

    // No validation required for this step
    if (fields.length === 0) {
      setStep((s) => s + 1);
      return;
    }

    const errors = await validateForm();

    let hasError = false;
    for (const name of fields) {
      const fieldName = name as keyof TransferFormValues;
      if ((errors as any)[fieldName]) {
        hasError = true;
      }
      // Mark the field as touched so errors are visible
      setFieldTouched(fieldName as string, true, false);
    }

    if (!hasError) {
      setStep((s) => s + 1);
    }
  };

  const back = () => setStep((s) => s - 1);

  const submit = async (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    const errors = await validateForm();

    // If there are any errors, touch all known fields so they surface in the UI
    if (Object.keys(errors).length > 0) {
      Object.keys(values).forEach((key) => {
        setFieldTouched(key, true, false);
      });
      return;
    }

    const data = values;
    console.log("FINAL SUBMISSION", data);

    const bankName =
      BANKS.find((b) => b.id === data.selectedBankId)?.name ?? "";

    const normalizedAccount = normalizeAccountNumber(
      data.receiverAccountNumber ?? "",
    );

    const matchedAccount =
      MOCK_ACCOUNTS.find(
        (a: (typeof MOCK_ACCOUNTS)[number]) =>
          a.bankId === data.selectedBankId &&
          a.accountNumber === normalizedAccount,
      ) ?? null;

    const receiverDisplayName = matchedAccount?.fullName ?? data.receiverName;

    setSubmittedReceipt({
      usdAmount: data.usdAmount ?? 0,
      senderName: data.senderFullName ?? "",
      receiverName: receiverDisplayName ?? "",
      receiverAccount: normalizedAccount,
      bankName,
      paymentReference: generatePaymentReference(),
      dateLabel: formatDateLabel(new Date()),
      totalUsd: data.usdAmount ?? 0,
    });
  };

  const done = () => {
    resetForm();
    setSubmittedReceipt(null);
    setStep(0);
  };

  const dialogContent = (() => {
    switch (step) {
      case 1:
        return <BankSelectionStep />;
      case 2:
        return <ReceiverInfoStep />;
      case 3:
        return <ReceiverAccountStep />;
      case 4:
        return <ConfirmOrderStep />;
      // case 5:
      //   // return <PaymentStep />;
      default:
        return null;
    }
  })();

  const showDialog = (step > 0 && !submittedReceipt) || !!submittedReceipt;
  const dialogNextLabel = step === 5 ? "Submit" : "Continue";
  const dialogNextAction = step === 5 ? submit : next;

  return (
    <form onSubmit={submit}>
      <TransferMoneyStep onContinue={next} />

      <Dialog
        open={showDialog}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setStep(0);
            if (submittedReceipt) {
              done();
            }
          }
        }}
      >
        {showDialog && (
          <DialogContent
     
            className="fixed inset-0 flex h-full w-full flex-col bg-background data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right sm:inset-y-4 sm:left-auto sm:right-4 sm:h-[calc(100vh-2rem)] sm:w-[min(50vw,42rem)] sm:rounded-l-3xl sm:border sm:shadow-2xl !translate-x-0 !translate-y-0 !top-auto !left-auto !max-w-none !p-0"
          >
            {submittedReceipt ? (
              <SuccessScreen
                receipt={submittedReceipt}
                onDone={() => {
                  done();
                }}
              />
            ) : (
              <>
                <DialogHeader className="sm:hidden pl-4 pt-4">
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground"
                    aria-label="Go back"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-4 pb-6 pt-5 sm:px-6 sm:pt-6">
                  {dialogContent}
                </div>

                <DialogFooter className="px-4 py-4 sm:px-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:w-full">
                    <button
                      type="button"
                      onClick={back}
                      className="hidden h-14 flex-1 rounded-full border border-border bg-card text-base font-semibold text-foreground sm:inline-flex sm:items-center sm:justify-center"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="h-14 w-full rounded-full bg-linear-to-r from-primary via-primary/90 to-primary/80 text-base font-semibold text-primary-foreground shadow-xl transition  sm:flex-1 sm:text-lg"
                      onClick={dialogNextAction}
                    >
                      {dialogNextLabel}
                    </button>
                  </div>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        )}
      </Dialog>
    </form>
  );
}
