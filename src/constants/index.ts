export const EXCHANGE_RATE = 165; // 1 USD = 165 ETB
export const GIFT_BONUS = 50; // 50 ETB per USD
export const MIN_TRANSFER_AMOUNT = 5; // Minimum $5
export const MAX_TRANSFER_AMOUNT = 25000; // Maximum $25,000

export const TRANSFER_STEPS = [
  { id: 1, title: 'Amount', description: 'Enter transfer amount' },
  { id: 2, title: 'Bank', description: 'Select recipient bank' },
  { id: 3, title: 'Receiver', description: 'Enter receiver details' },
  { id: 4, title: 'Verify', description: 'Verify account details' },
  { id: 5, title: 'Confirm', description: 'Review and confirm' },
  { id: 6, title: 'Payment', description: 'Complete payment' },
];

export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    VERIFY_EMAIL: '/api/auth/verify-email',
  },
  TRANSFER: {
    INITIATE: '/api/transfer/initiate',
    VERIFY_ACCOUNT: '/api/transfer/verify-account',
    PROCESS: '/api/transfer/process',
  },
  ADMIN: {
    TRANSACTIONS: '/api/admin/transactions',
    UPDATE_STATUS: '/api/admin/transactions/:id',
    EXPORT: '/api/admin/export',
  },
} as const;

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export const PAGINATION_LIMITS = {
  DEFAULT: 20,
  MAX: 100,
} as const;
