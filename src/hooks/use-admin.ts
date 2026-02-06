import { useAdminStore } from '@/store/admin';

export const useAdmin = () => {
  const {
    transactions,
    isLoading,
    filters,
    pagination,
    error,
    setTransactions,
    setLoading,
    setError,
    setFilters,
    setPagination,
    fetchTransactions,
    exportTransactions,
    updateTransactionStatus,
    clearFilters,
  } = useAdminStore();

  const filteredTransactions = transactions.filter((transaction) => {
    if (filters.status && transaction.status !== filters.status) return false;
    if (filters.paymentStatus && transaction.paymentStatus !== filters.paymentStatus) return false;
    if (filters.bank && !transaction.bankName.toLowerCase().includes(filters.bank.toLowerCase())) return false;
    if (filters.dateRange) {
      const transactionDate = new Date(transaction.createdAt);
      if (transactionDate < filters.dateRange.start || transactionDate > filters.dateRange.end) return false;
    }
    return true;
  });

  const paginatedTransactions = filteredTransactions.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  );

  const totalPages = Math.ceil(filteredTransactions.length / pagination.limit);

  return {
    transactions: paginatedTransactions,
    allTransactions: transactions,
    isLoading,
    filters,
    pagination: {
      ...pagination,
      totalPages,
      total: filteredTransactions.length,
    },
    error,
    setTransactions,
    setLoading,
    setError,
    setFilters,
    setPagination,
    fetchTransactions,
    exportTransactions,
    updateTransactionStatus,
    clearFilters,
  };
};
