import type { PaymentStatus, TransferStatus, Transaction, TransactionListItem } from "./types";
import {  transactionsList } from "./data-list";

/**
 * Available payment filter options including "all"
 */
export const paymentOptions: Array<PaymentStatus | "all"> = [
  "all",
  "Paid",
  "Pending",
  "Failed",
];

/**
 * Available transfer filter options including "all"
 */
export const transferOptions: Array<TransferStatus | "all"> = [
  "all",
  "Completed",
  "Processing",
  "Failed",
];

/**
 * Generates bank options dynamically from transactions, including "all"
 */
export const bankOptions: string[] = [
  "all",
  ...Array.from(
    new Set(
      transactionsList.map((transaction: TransactionListItem) => transaction.bankName)
    )
  ),
];