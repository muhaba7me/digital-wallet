import { create } from 'zustand';
import type { AdminState, Transaction } from '@/types';

interface AdminStore extends AdminState {
  setTransactions: (transactions: Transaction[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<AdminState['filters']>) => void;
  setPagination: (pagination: Partial<AdminState['pagination']>) => void;
  fetchTransactions: () => Promise<void>;
  exportTransactions: () => Promise<void>;
  updateTransactionStatus: (id: string, status: Transaction['status']) => Promise<void>;
  clearFilters: () => void;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  transactions: [],
  isLoading: false,
  filters: {},
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
  error: null,

  setTransactions: (transactions) => set({ transactions }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
      pagination: { ...state.pagination, page: 1 },
    })),

  setPagination: (pagination) =>
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    })),

  fetchTransactions: async () => {
    set({ isLoading: true, error: null });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTransactions: Transaction[] = [
        {
          id: '1',
          userId: 'user1',
          amount: 100,
          currency: 'USD',
          bankName: 'Commercial Bank of Ethiopia',
          receiverName: 'John Doe',
          accountNumber: '1234567890',
          status: 'completed',
          paymentStatus: 'paid',
          exchangeRate: 165,
          giftBonus: 50,
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15'),
        },
        // Add more mock transactions as needed
      ];
      
      set({
        transactions: mockTransactions,
        isLoading: false,
        pagination: {
          page: 1,
          limit: 20,
          total: mockTransactions.length,
          totalPages: Math.ceil(mockTransactions.length / 20),
        },
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch transactions',
        isLoading: false,
      });
    }
  },

  exportTransactions: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // TODO: Implement actual CSV export
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock CSV export
      const { transactions } = get();
      const csv = convertToCSV(transactions);
      downloadCSV(csv, 'transactions.csv');
      
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to export transactions',
        isLoading: false,
      });
    }
  },

  updateTransactionStatus: async (id: string, status: Transaction['status']) => {
    set({ isLoading: true, error: null });
    
    try {
      // TODO: Implement actual API call
      // await fetch(`/api/admin/transactions/${id}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status }),
      // });
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set((state) => ({
        transactions: state.transactions.map((transaction) =>
          transaction.id === id
            ? { ...transaction, status, updatedAt: new Date() }
            : transaction
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update transaction',
        isLoading: false,
      });
    }
  },

  clearFilters: () =>
    set({
      filters: {},
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    }),
}));

// Helper functions for CSV export
function convertToCSV(transactions: Transaction[]): string {
  const headers = [
    'ID',
    'User ID',
    'Amount',
    'Currency',
    'Bank Name',
    'Receiver Name',
    'Account Number',
    'Status',
    'Payment Status',
    'Exchange Rate',
    'Gift Bonus',
    'Created At',
  ];
  
  const rows = transactions.map((transaction) => [
    transaction.id,
    transaction.userId,
    transaction.amount.toString(),
    transaction.currency,
    transaction.bankName,
    transaction.receiverName,
    transaction.accountNumber,
    transaction.status,
    transaction.paymentStatus,
    transaction.exchangeRate.toString(),
    transaction.giftBonus.toString(),
    transaction.createdAt.toISOString(),
  ]);
  
  return [headers, ...rows].map((row) => row.join(',')).join('\n');
}

function downloadCSV(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
