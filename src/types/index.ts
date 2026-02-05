export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface TransferFormData {
  amount: number;
  currency: 'USD' | 'ETB';
  bank: {
    id: string;
    name: string;
    code: string;
    logo: string;
  } | null;
  receiver: {
    fullName: string;
    accountNumber: string;
    phoneNumber: string;
    email?: string;
  } | null;
  verifiedAccount: {
    accountNumber: string;
    accountName: string;
    bankName: string;
  } | null;
}

export interface TransferState {
  currentStep: number;
  formData: TransferFormData;
  isProcessing: boolean;
  exchangeRate: number;
  giftBonus: number;
  conversionResult: {
    usdAmount: number;
    etbAmount: number;
    giftAmount: number;
    totalEtb: number;
  } | null;
  error: string | null;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  bankName: string;
  receiverName: string;
  accountNumber: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  exchangeRate: number;
  giftBonus: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminState {
  transactions: Transaction[];
  isLoading: boolean;
  filters: {
    status?: string;
    paymentStatus?: string;
    bank?: string;
    dateRange?: {
      start: Date;
      end: Date;
    };
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error: string | null;
}

export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: Date;
  }>;
}

export interface Bank {
  id: string;
  name: string;
  code: string;
  logo: string;
  swiftCode?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
