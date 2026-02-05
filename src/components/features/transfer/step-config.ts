import type { TransferFormValues } from "./validation-schemas";

export const STEPS: Array<{
  id: number;
  fields: Array<keyof TransferFormValues>;
}> = [
  {
    id: 1,
    fields: ["usdAmount"],
  },
  {
    id: 2,
    fields: ["selectedBankId"],
  },
  {
    id: 3,
    fields: ["receiverName", "receiverPhone", "dropoffLocation", "agreeTerms"],
  },
  {
    id: 4,
    fields: ["receiverAccountNumber", "senderFullName"],
  },
  {
    id: 5,
    fields: [],
  },
  {
    id: 6,
    fields: ["cardNumber", "cvv", "expiryMonth", "expiryYear"],
  },
];
