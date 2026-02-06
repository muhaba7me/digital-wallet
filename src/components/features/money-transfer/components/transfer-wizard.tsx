"use client";

import { useState, useCallback } from "react";
import { useFormikContext } from "formik";

import { MOCK_ACCOUNTS, normalizeAccountNumber } from "@/lib/mock-accounts";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/components/shared/dialog";
import { ChevronLeft } from "lucide-react";
import { TransferFormValues } from "../form-validation";
import { STEPS } from "../step-config";
import { BANKS } from "../banks";
import BankSelectionStep from "./bank-options";
import ReceiverInfoStep from "./receiver-info";
import ReceiverAccountStep from "./receiver-account";

import ConfirmOrderStep from "./confirm-order";
import PaymentSuccess from "./payment-success";
import ExchangeCalculator from "./exchange-calculator";
import BankOptions from "./bank-options";
import PaymentStep from "./payment";


// Step components

// Utility functions
const createPaymentReference = (): string => {
  const randomId = Math.floor(100000000 + Math.random() * 900000000);
  return `FTX-${randomId}`;
};

const formatDateLabel = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

// Types
interface TransferReceipt {
  usdAmount: number;
  senderName: string;
  receiverName: string;
  receiverAccount: string;
  bankName: string;
  paymentReference: string;
  dateLabel: string;
  totalUsd: number;
}

interface TransferWizardProps {
  onTransferComplete?: (receipt: TransferReceipt) => void;
}

// Custom hook for transfer wizard logic
const useTransferWizard = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [receipt, setReceipt] = useState<TransferReceipt | null>(null);

  const { validateForm, setFieldTouched, resetForm, values } = useFormikContext<TransferFormValues>();

  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    const currentStepFields = STEPS[currentStepIndex].fields;

    if (currentStepFields.length === 0) {
      return true;
    }

    const errors = await validateForm();
    const hasErrors = currentStepFields.some(fieldName => {
      const fieldKey = fieldName as keyof TransferFormValues;
      return (errors as any)[fieldKey];
    });

    // Mark fields as touched to show errors
    currentStepFields.forEach(fieldName => {
      setFieldTouched(fieldName as string, true, false);
    });

    return !hasErrors;
  }, [currentStepIndex, validateForm, setFieldTouched]);

  const proceedToNextStep = useCallback(async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setCurrentStepIndex(prev => prev + 1);
    }
  }, [validateCurrentStep]);

  const goToPreviousStep = useCallback(() => {
    setCurrentStepIndex(prev => Math.max(0, prev - 1));
  }, []);

  const generateReceipt = useCallback((): TransferReceipt => {
    const bankData = BANKS.find(bank => bank.id === values.selectedBankId);
    const bankName = bankData?.name ?? "Unknown Bank";

    const normalizedAccount = normalizeAccountNumber(values.receiverAccountNumber ?? "");
    const matchedAccount = MOCK_ACCOUNTS.find(
      account => account.bankId === values.selectedBankId &&
        account.accountNumber === normalizedAccount
    );

    const receiverDisplayName = matchedAccount?.fullName ?? values.receiverName ?? "";

    return {
      usdAmount: values.usdAmount ?? 0,
      senderName: values.senderFullName ?? "",
      receiverName: receiverDisplayName,
      receiverAccount: normalizedAccount,
      bankName,
      paymentReference: createPaymentReference(),
      dateLabel: formatDateLabel(new Date()),
      totalUsd: values.usdAmount ?? 0,
    };
  }, [values]);

  const submitTransfer = useCallback(async () => {
    const isValid = await validateCurrentStep();

    if (!isValid) {
      // Touch all fields to show validation errors
      Object.keys(values).forEach(key => {
        setFieldTouched(key, true, false);
      });
      return;
    }

    const transferReceipt = generateReceipt();
    console.log("Congratulations ✨", values, transferReceipt);
    setReceipt(transferReceipt);
  }, [validateCurrentStep, values, setFieldTouched, generateReceipt]);

  const resetWizard = useCallback(() => {
    resetForm();
    setReceipt(null);
    setCurrentStepIndex(0);
  }, [resetForm]);

  return {
    currentStepIndex,
    receipt,
    proceedToNextStep,
    goToPreviousStep,
    submitTransfer,
    resetWizard,
    isLastStep: currentStepIndex === STEPS.length - 1,
  };
};

// Step renderer component
const StepRenderer: React.FC<{ stepIndex: number }> = ({ stepIndex }) => {
  const stepComponents = {
    1: <BankOptions />,
    2: <ReceiverInfoStep />,
    3: <ReceiverAccountStep />,
    4:< ConfirmOrderStep />,
    5: <PaymentStep />,
  };

  return stepComponents[stepIndex as keyof typeof stepComponents] ?? null;
};

// Main Transfer Wizard Component
export function TransferWizard({ onTransferComplete }: TransferWizardProps) {
  const {
    currentStepIndex,
    receipt,
    proceedToNextStep,
    goToPreviousStep,
    submitTransfer,
    resetWizard,
    isLastStep,
  } = useTransferWizard();

  const showWizardDialog = currentStepIndex > 0 || receipt !== null;
  const nextActionLabel = isLastStep ? "Submit" : "Continue";
  const handleNextAction = isLastStep ? submitTransfer : proceedToNextStep;

  const handleDialogClose = (isOpen: boolean) => {
    if (!isOpen) {
      if (receipt) {
        resetWizard();
      } else {
        resetWizard();
      }
    }
  };

  return (
    <form onSubmit={submitTransfer}>
      <ExchangeCalculator onContinue={proceedToNextStep} />

      <Dialog open={showWizardDialog} onOpenChange={handleDialogClose}>
        {showWizardDialog && (
          <DialogContent className="fixed inset-0 flex h-full w-full flex-col bg-background data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right sm:inset-y-4 sm:left-auto sm:right-4 sm:h-[calc(100vh-2rem)] sm:w-[min(50vw,42rem)] sm:rounded-l-3xl sm:border sm:shadow-2xl translate-x-0! translate-y-0! top-auto! left-auto! max-w-none! p-0!">
              <DialogTitle className="sr-only">Transfer Money Step</DialogTitle> 
            {receipt ? (
              <PaymentSuccess
                receipt={receipt}
                onDone={() => {
                  onTransferComplete?.(receipt);
                  resetWizard();
                }}
              />
            ) : (
              <>
                <DialogHeader className="sm:hidden pl-4 pt-4">
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground"
                    aria-label="Go back to previous step"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-4 pb-6 pt-5 sm:px-6 sm:pt-6">
                  <StepRenderer stepIndex={currentStepIndex} />
                </div>

                <DialogFooter className="px-4 py-4 sm:px-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:w-full">
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      className="hidden h-14 flex-1 rounded-full border border-border bg-card text-base font-semibold text-foreground sm:inline-flex sm:items-center sm:justify-center"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="h-14 w-full rounded-full bg-linear-to-r from-primary via-primary/90 to-primary/80 text-base font-semibold text-primary-foreground shadow-xl transition sm:flex-1 sm:text-lg"
                      onClick={handleNextAction}
                    >
                      {nextActionLabel}
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

export default TransferWizard;
