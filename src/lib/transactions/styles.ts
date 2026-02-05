import type { PaymentStatus, TransferStatus } from "./types";

export const statusStyles: Record<PaymentStatus | TransferStatus, string> = {
  Paid: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Failed: "bg-rose-100 text-rose-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Processing: "bg-blue-100 text-blue-700",
};
