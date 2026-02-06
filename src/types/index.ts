// -------------------------
// User & Authentication
// -------------------------
export interface User {
  id: string;
  email: string;
  name?: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// -------------------------
// Transfer Form & State
// -------------------------
export interface BankInfo {
  id: string;
  name: string;
  code: string;
  logo: string;
  swiftCode?: string;
}

export interface ReceiverInfo {
  fullName: string;
  accountNumber: string;
  phoneNumber: string;
  email?: string;
}

export interface VerifiedAccount {
  accountNumber: string;
  accountName: string;
  bankName: string;
}

export interface TransferFormData {
  amount: number;
  currency: "USD" | "ETB";
  bank: BankInfo | null;
  receiver: ReceiverInfo | null;
  verifiedAccount: VerifiedAccount | null;
}

export interface ConversionResult {
  usdAmount: number;
  etbAmount: number;
  giftAmount: number;
  totalEtb: number;
}

export interface TransferState {
  currentStep: number;
  formData: TransferFormData;
  isProcessing: boolean;
  exchangeRate: number;
  giftBonus: number;
  conversionResult: ConversionResult | null;
  error: string | null;
}

// -------------------------
// Transactions
// -------------------------
export type TransactionStatus = 
  | "pending" 
  | "processing" 
  | "completed" 
  | "failed" 
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  bankName: string;
  receiverName: string;
  accountNumber: string;
  status: TransactionStatus;
  paymentStatus: PaymentStatus;
  exchangeRate: number;
  giftBonus: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminFilters {
  status?: TransactionStatus | "all";
  paymentStatus?: PaymentStatus | "all";
  bank?: string;
  dateRange?: { start: Date; end: Date };
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminState {
  transactions: Transaction[];
  isLoading: boolean;
  filters: AdminFilters;
  pagination: Pagination;
  error: string | null;
}

// -------------------------
// UI State
// -------------------------
export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: Date;
}

export interface UIState {
  sidebarOpen: boolean;
  theme: "light" | "dark";
  notifications: Notification[];
}

// -------------------------
// API Response
// -------------------------
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
