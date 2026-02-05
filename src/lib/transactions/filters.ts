import type { PaymentStatus, TransferStatus } from "./types";
import { transactionsList } from "./list-mock-data";

export const paymentOptions: Array<PaymentStatus | "all"> = [
  "all",
  "Paid",
  "Pending",
  "Failed",
];

export const transferOptions: Array<TransferStatus | "all"> = [
  "all",
  "Completed",
  "Processing",
  "Failed",
];

export const bankOptions = [
  "all",
  ...Array.from(
    new Set(transactionsList.map((transaction) => transaction.bankName)),
  ),
];
