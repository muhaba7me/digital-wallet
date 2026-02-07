"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminNavbar } from "@/components/features/admin/components/AdminNavbar";
import { TransactionTable } from "./components/TransactionTable";
import { TransactionFilters } from "./components/TransactionFilters";
import { TransactionPagination } from "./components/TransactionPagination";
import { TransactionListItem, PaymentStatus, TransferStatus } from "@/lib/transactions";
import { transactionsList } from "@/lib/transactions/data-list";
import { paymentOptions, transferOptions, bankOptions } from "@/lib/transactions/filters";
import { Card, CardContent } from "@/components/shared/card";
import { useAuth } from "@/hooks/use-auth";

export default function TransactionsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [transactions] = useState<TransactionListItem[]>(transactionsList);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<"all" | PaymentStatus>("all");
  const [selectedTransfer, setSelectedTransfer] = useState<"all" | TransferStatus>("all");
  const [selectedBank, setSelectedBank] = useState("all");

  // Additional authentication check
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/signin");
    }
  }, [isLoading, isAuthenticated, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">
              You need to sign in to access this page.
            </p>
            <button
              onClick={() => router.push("/admin/signin")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full font-semibold"
            >
              Sign In
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPayment = selectedPayment === "all" || tx.paymentStatus === selectedPayment;
    const matchesTransfer = selectedTransfer === "all" || tx.transferStatus === selectedTransfer;
    const matchesBank = selectedBank === "all" || tx.bankName === selectedBank;

    return matchesSearch && matchesPayment && matchesTransfer && matchesBank;
  });

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleReset = () => {
    setSearchQuery("");
    setSelectedPayment("all");
    setSelectedTransfer("all");
    setSelectedBank("all");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <main className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
              <p className="text-gray-600 mt-1">
                Manage and monitor all money transfer transactions
              </p>
            </div>
          </div>

          {/* Filters */}
          <TransactionFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedPayment={selectedPayment}
            selectedTransfer={selectedTransfer}
            selectedBank={selectedBank}
            onPaymentChange={setSelectedPayment}
            onTransferChange={setSelectedTransfer}
            onBankChange={setSelectedBank}
            onReset={handleReset}
            paymentOptions={paymentOptions}
            transferOptions={transferOptions}
            bankOptions={bankOptions}
          />

          {/* Transactions Table */}
          <Card>
            <CardContent className="p-0">
              {paginatedTransactions.length > 0 ? (
                <TransactionTable transactions={paginatedTransactions} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No transactions found</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pagination */}
          {filteredTransactions.length > 0 && (
            <TransactionPagination
              current={currentPage}
              total={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </main>

      <footer className="text-center py-6 sm:py-8 text-gray-500 text-xs sm:text-sm">
        Copyright © 2024 Gift Ethiopia | All Rights Reserved
      </footer>
    </div>
  );
}
