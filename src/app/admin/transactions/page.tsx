"use client";

import Link from "next/link";
import { Download, Eye, Table } from "lucide-react";



import { useCallback, useEffect, useMemo, useState } from "react";
import { bankOptions, buildCsv, formatCurrency, paymentOptions, PaymentStatus, statusStyles, transactionsList, transferOptions, TransferStatus } from "@/lib/transactions";
import { AdminNavbar } from "@/components/features/admin/admin-navbar";
import { Button } from "@/components/shared/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/card";
import { TransactionsFilters } from "@/components/features/admin/transactions-filters";
import { TableBody, TableCell, TableHead, TableHeader,  TableRow } from "@/components/shared/table";

export default function AdminTransactionsPage() {
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<"all" | PaymentStatus>(
    "all",
  );
  const [transferFilter, setTransferFilter] = useState<"all" | TransferStatus>(
    "all",
  );
  const [bankFilter, setBankFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return transactionsList.filter((transaction) => {
      const matchesSearch =
        query.length === 0 ||
        [
          transaction.id,
          transaction.senderName,
          transaction.senderPhone,
          transaction.recipientName,
          transaction.recipientAccount,
          transaction.bankName,
        ].some((value) => value.toLowerCase().includes(query));

      const matchesPayment =
        paymentFilter === "all" || transaction.paymentStatus === paymentFilter;

      const matchesTransfer =
        transferFilter === "all" ||
        transaction.transferStatus === transferFilter;

      const matchesBank =
        bankFilter === "all" || transaction.bankName === bankFilter;

      return matchesSearch && matchesPayment && matchesTransfer && matchesBank;
    });
  }, [search, paymentFilter, transferFilter, bankFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, paymentFilter, transferFilter, bankFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / pageSize),
  );
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + pageSize,
  );

  const handlePrev = () => setPage((prev) => Math.max(1, prev - 1));
  const handleNext = () => setPage((prev) => Math.min(totalPages, prev + 1));

  const handleExportCsv = useCallback(() => {
    if (filteredTransactions.length === 0) return;
    const csvContent = buildCsv(filteredTransactions);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }, [filteredTransactions]);

  const handleResetFilters = useCallback(() => {
    setSearch("");
    setPaymentFilter("all");
    setTransferFilter("all");
    setBankFilter("all");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <main className="max-w-9/10 mx-auto px-8 py-10 space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
            <p className="text-sm text-gray-500">
              Monitor all gift-related transactions and filter by status.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              onClick={handleExportCsv}
              disabled={filteredTransactions.length === 0}
            >
              <Download className="h-4 w-4" /> Export CSV
            </Button>
            <Button asChild variant="outline">
              <a href="/admin/dashboard">Back to Dashboard</a>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="space-y-3">
            <div>
              <CardTitle>Transaction List</CardTitle>
              <CardDescription>
                {filteredTransactions.length} results found · Showing{" "}
                {filteredTransactions.length === 0 ? 0 : startIndex + 1}-
                {Math.min(startIndex + pageSize, filteredTransactions.length)}
              </CardDescription>
            </div>
            <TransactionsFilters
              search={search}
              onSearchChange={setSearch}
              paymentValue={paymentFilter}
              transferValue={transferFilter}
              bankValue={bankFilter}
              paymentOptions={paymentOptions}
              transferOptions={transferOptions}
              bankOptions={bankOptions}
              onPaymentChange={(value) =>
                setPaymentFilter(value as PaymentStatus | "all")
              }
              onTransferChange={(value) =>
                setTransferFilter(value as TransferStatus | "all")
              }
              onBankChange={setBankFilter}
              onReset={handleResetFilters}
            />
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Sender Phone</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Recipient Account</TableHead>
                  <TableHead>Bank Name</TableHead>
                  <TableHead className="text-right">Amount (USD)</TableHead>
                  <TableHead className="text-right">Exchange Rate</TableHead>
                  <TableHead className="text-right">Amount (ETB)</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Transfer Status</TableHead>
                  <TableHead>Transaction Date & Time</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-semibold">
                      {transaction.id}
                    </TableCell>
                    <TableCell>{transaction.senderName}</TableCell>
                    <TableCell>{transaction.senderPhone}</TableCell>
                    <TableCell>{transaction.recipientName}</TableCell>
                    <TableCell>{transaction.recipientAccount}</TableCell>
                    <TableCell>{transaction.bankName}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(transaction.amountUsd, "USD")}
                    </TableCell>
                    <TableCell className="text-right">
                      {transaction.exchangeRate.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(transaction.amountEtb, "ETB")}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[transaction.paymentStatus]}`}
                      >
                        {transaction.paymentStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[transaction.transferStatus]}`}
                      >
                        {transaction.transferStatus}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.transactionDate}</TableCell>
                    <TableCell className="min-w-[200px]">
                      {transaction.details}
                    </TableCell>
                    <TableCell className="text-center">
                      <Link href={`/admin/transactions/${transaction.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-primary/10 hover:text-primary"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {paginatedTransactions.length === 0 && (
              <div className="py-12 text-center text-sm text-gray-500">
                No transactions match your search.
              </div>
            )}

            <div className="flex items-center justify-between pt-6">
              <p className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <Button
                      key={pageNumber}
                      variant={
                        pageNumber === currentPage ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="text-center py-8 text-gray-500 text-sm">
        Copyright © 2024 Gift Ethiopia | All Rights Reserved
      </footer>
    </div>
  );
}
