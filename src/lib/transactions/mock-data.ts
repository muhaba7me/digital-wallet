import type { Transaction } from "./types";

export const mockTransactions: Record<string, Transaction> = {
  "TRX-10421": {
    id: "TRX-10421",
    senderName: "Solomon Kebede",
    senderPhone: "+251 9 (9833) (8321)",
    recipientName: "Filimon Mebari",
    recipientPhone: "+251 9 (9833) (8321)",
    recipientAccount: "1002003004",
    bankName: "Dashen Bank",
    amountUsd: 5000.0,
    exchangeRate: 136.0,
    amountEtb: 75000.0,
    netAmountEtb: 4990.0,
    paymentStatus: "Paid",
    transferStatus: "Completed",
    transactionDate: "May 12,2024 05:30 PM",
    pickupBranch: "Dashen Bank",
    pickupCode: "7364874389",
  },
};
