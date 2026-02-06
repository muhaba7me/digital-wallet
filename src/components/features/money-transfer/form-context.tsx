"use client";

import * as React from "react";
import { useFormik, FormikProvider } from "formik";
import { transferFormSchema, type TransferFormValues } from "./form-validation";

// ==========================
// Types
// ==========================
interface TransferFormContextProps {
  formik: ReturnType<typeof useFormik<TransferFormValues>>;
  resetFormToInitial: () => void;
}

// ==========================
// Context & Hook
// ==========================
const TransferFormContext = React.createContext<TransferFormContextProps | null>(null);


export const useTransferForm = (): TransferFormContextProps => {
  const context = React.useContext(TransferFormContext);
  if (!context) {
    throw new Error("useTransferForm must be used within TransferFormProvider");
  }
  return context;
};

// ==========================
// Initial Values Factory
// ==========================
const getInitialTransferValues = (): TransferFormValues => ({
  usdAmount: 0,
  selectedBankId: "",
  receiverName: "",
  receiverPhone: "",
  dropoffLocation: "Addis Ababa",
  note: "",
  agreeTerms: false,
  receiverAccountNumber: "",
  senderFullName: "",
  cardNumber: "",
  cvv: "",
  expiryMonth: "",
  expiryYear: "",
  billingCountry: "",
  billingAddress: "",
  billingCity: "",
  billingPostalCode: "",
});

// ==========================
// Provider Component
// ==========================
interface TransferFormProviderProps {
  children: React.ReactNode;
}

export const TransferFormProvider: React.FC<TransferFormProviderProps> = ({ children }) => {
  const formik = useFormik<TransferFormValues>({
    initialValues: getInitialTransferValues(),
    validationSchema: transferFormSchema,
    validateOnChange: false,
    validateOnBlur: true,
     // Submission handled externally
    onSubmit: () => {
     
    },
  });

  const resetFormToInitial = React.useCallback(() => {
    formik.resetForm({ values: getInitialTransferValues() });
  }, [formik]);

  const contextValue = React.useMemo(
    () => ({ formik, resetFormToInitial }),
    [formik, resetFormToInitial]
  );

  return (
    <TransferFormContext.Provider value={contextValue}>
      <FormikProvider value={formik}>{children}</FormikProvider>
    </TransferFormContext.Provider>
  );
};

// ==========================
// Higher-order Component
// ==========================
export function withTransferForm<T extends object>(
  Component: React.ComponentType<T & { formContext: TransferFormContextProps }>
) {
  return function WithTransferForm(props: T) {
    const formContext = useTransferForm();
    return <Component {...props} formContext={formContext} />;
  };
}
