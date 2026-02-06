export type PaymentStatus = "Paid" | "Pending" | "Failed";
export type TransferStatus = "Completed" | "Processing" | "Failed";

export type Transaction = {
  id: string;
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientPhone: string;
  recipientAccount: string;
  bankName: string;
  amountUsd: number;
  exchangeRate: number;
  amountEtb: number;
  netAmountEtb: number;
  paymentStatus: PaymentStatus;
  transferStatus: TransferStatus;
  transactionDate: string;
  pickupBranch: string;
  pickupCode: string;
};
export type TransactionListItem = {
  id: string;
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientAccount: string;
  bankName: string;
  amountUsd: number;
  exchangeRate: number;
  amountEtb: number;
  paymentStatus: PaymentStatus;
  transferStatus: TransferStatus;
  transactionDate: string;
  details: string;
};