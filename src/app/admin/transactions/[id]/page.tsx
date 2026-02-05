"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Printer } from "lucide-react";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockTransactions, statusStyles } from "@/lib/transactions";

export default function TransactionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const transactionId = params.id as string;

  const transaction = mockTransactions[transactionId];

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <main className="max-w-[1600px] mx-auto px-8 py-10">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600 mb-4">Transaction not found</p>
              <Button onClick={() => router.push("/admin/transactions")}>
                Back to Transactions
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <main className="max-w-[1200px] mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
          >
            <ArrowLeft size={20} />
            Transaction Detail
          </button>
          <Button
            onClick={handlePrint}
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80"
          >
            <Printer size={18} className="mr-2" />
            Print Receipt
          </Button>
        </div>

        <Card className="bg-white">
          <CardContent className="p-8 space-y-8">
            {/* Transaction ID */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Transaction ID:</p>
              <p className="text-xl font-bold">{transaction.id}</p>
            </div>

            {/* Sender Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Sender Info.</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Sender Name:</p>
                  <p className="font-semibold">{transaction.senderName}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">
                    Sender Phone Number:
                  </p>
                  <p className="font-semibold">{transaction.senderPhone}</p>
                </div>
              </div>
            </div>

            {/* Recipient Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Recipient Info.</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Recipient Name:</p>
                  <p className="font-semibold">{transaction.recipientName}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">
                    Recipient Phone Number:
                  </p>
                  <p className="font-semibold">{transaction.recipientPhone}</p>
                </div>
              </div>
            </div>

            {/* Transaction Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Transaction Info.</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">
                    Transaction Amount in USD:
                  </p>
                  <p className="font-semibold">
                    $ {transaction.amountUsd.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">
                    Transaction Amount in ETB:
                  </p>
                  <p className="font-semibold">
                    {transaction.amountEtb.toFixed(2)} ETB
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Exchange Rate:</p>
                  <p className="font-semibold">
                    {transaction.exchangeRate.toFixed(2)} ETB
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">
                    Net Amount to Merchant:
                  </p>
                  <p className="font-semibold">
                    {transaction.netAmountEtb.toFixed(2)} ETB
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">
                    Transaction Date & Time:
                  </p>
                  <p className="font-semibold">{transaction.transactionDate}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Payment Status:</p>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[transaction.paymentStatus]}`}
                  >
                    {transaction.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Order Info.</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Pickup Branch:</p>
                  <p className="font-semibold">{transaction.pickupBranch}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Pickup Code:</p>
                  <p className="font-semibold">{transaction.pickupCode}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between">
          <div className="space-y-2">
            <p className="font-bold text-gray-900">GIFT ETHIOPIA</p>
            <p className="text-sm text-gray-600">
              Email: info@Giftethiopiacontact.com
            </p>
            <p className="text-sm text-gray-600">Phone: +251 11 557 20 80</p>
          </div>
          <div>
            <Image
              src="/admin-page/star-gift-icon.png"
              alt="Star Gift"
              width={120}
              height={120}
              quality={100}
              className="opacity-80"
            />
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-gray-500 text-sm mt-8">
        Copyright © 2024 Gift Ethiopia | All Rights Reserved
      </footer>
    </div>
  );
}
