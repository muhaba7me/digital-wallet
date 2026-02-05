import type { TransactionListItem } from "./list-mock-data";

export const formatCurrency = (value: number, currency: "USD" | "ETB") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);

export const csvHeaders = [
  "Transaction_ID",
  "SenderName",
  "SenderPhoneNumber",
  "RecipientName",
  "RecipientAccountNumber",
  "BankName",
  "AmountUSD",
  "ExchangeRate",
  "AmountETB",
  "PaymentStatus",
  "TransferStatus",
  "TransactionDateTime",
  "Details",
];

export const escapeCsvValue = (value: string | number) =>
  `"${String(value ?? "").replace(/"/g, '""')}"`;

export const buildCsv = (data: TransactionListItem[]) => {
  const rows = data.map((transaction) =>
    [
      transaction.id,
      transaction.senderName,
      transaction.senderPhone,
      transaction.recipientName,
      transaction.recipientAccount,
      transaction.bankName,
      transaction.amountUsd,
      transaction.exchangeRate,
      transaction.amountEtb,
      transaction.paymentStatus,
      transaction.transferStatus,
      transaction.transactionDate,
      transaction.details,
    ]
      .map(escapeCsvValue)
      .join(","),
  );

  return [csvHeaders.join(","), ...rows].join("\n");
};
