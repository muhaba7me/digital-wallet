// transfer-form/FormProvider.tsx
"use client";

import * as React from "react";
import { FormikProvider, useFormik } from "formik";
import { transferFormSchema, type TransferFormValues } from "./validation-schemas";

export function TransferFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const formik = useFormik<TransferFormValues>({
    initialValues: {
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
    },
    validationSchema: transferFormSchema,
    validateOnBlur: true,
    validateOnChange: false,
    // Final submission is handled manually inside TransferMultiStepForm
    onSubmit: () => {},
  });

  return <FormikProvider value={formik}>{children}</FormikProvider>;
}
