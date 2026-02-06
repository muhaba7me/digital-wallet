export type PaymentStatus = "Pending" | "Completed" | "Failed";
export type TransferStatus = "Pending" | "Processed" | "Failed";

export interface Transaction {
  id: string;
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientAccount: string;
  bankName: string;
  amountUsd: number;
  amountEtb: number;
  exchangeRate: number;
  paymentStatus: PaymentStatus;
  transferStatus: TransferStatus;
  transactionDate: string;
  details: string;
}

export const bankOptions = ["Bank A", "Bank B", "Bank C"];
export const paymentOptions: PaymentStatus[] = ["Pending", "Completed", "Failed"];
export const transferOptions: TransferStatus[] = ["Pending", "Processed", "Failed"];

export const statusStyles: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
  Processed: "bg-blue-100 text-blue-800",
  Failed: "bg-red-100 text-red-800",
};

export const transactionsList: Transaction[] = Array.from({ length: 32 }, (_, i) => ({
  id: `TXN-${1000 + i}`,
  senderName: `Sender ${i + 1}`,
  senderPhone: `+251900000${i}`,
  recipientName: `Recipient ${i + 1}`,
  recipientAccount: `ACCT-${1000 + i}`,
  bankName: bankOptions[i % bankOptions.length],
  amountUsd: Math.floor(Math.random() * 1000) + 50,
  amountEtb: Math.floor(Math.random() * 50000) + 5000,
  exchangeRate: 55.5,
  paymentStatus: paymentOptions[i % paymentOptions.length],
  transferStatus: transferOptions[i % transferOptions.length],
  transactionDate: new Date().toLocaleString(),
  details: "Sample transaction details",
}));

export const formatCurrency = (amount: number, currency: "USD" | "ETB") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

export const generateCsv = (transactions: Transaction[]) => {
  const header = Object.keys(transactions[0]).join(",");
  const rows = transactions.map((t) =>
    Object.values(t)
      .map((v) => `"${v}"`)
      .join(",")
  );
  return [header, ...rows].join("\n");
};
