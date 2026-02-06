"use client";

import { Transaction, statusStyles, formatCurrency } from "@/lib/transactions";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/shared/table";
import { Button } from "@/components/shared/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import { FC } from "react";

interface Props {
  transactions: Transaction[];
}

export const TransactionTable: FC<Props> = ({ transactions }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Sender</TableHead>
        <TableHead>Sender Phone</TableHead>
        <TableHead>Recipient</TableHead>
        <TableHead>Recipient Account</TableHead>
        <TableHead>Bank</TableHead>
        <TableHead className="text-right">USD</TableHead>
        <TableHead className="text-right">Exchange</TableHead>
        <TableHead className="text-right">ETB</TableHead>
        <TableHead>Payment</TableHead>
        <TableHead>Transfer</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Details</TableHead>
        <TableHead className="text-center">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {transactions.map((tx) => (
        <TableRow key={tx.id}>
          <TableCell>{tx.id}</TableCell>
          <TableCell>{tx.senderName}</TableCell>
          <TableCell>{tx.senderPhone}</TableCell>
          <TableCell>{tx.recipientName}</TableCell>
          <TableCell>{tx.recipientAccount}</TableCell>
          <TableCell>{tx.bankName}</TableCell>
          <TableCell className="text-right">{formatCurrency(tx.amountUsd, "USD")}</TableCell>
          <TableCell className="text-right">{tx.exchangeRate.toFixed(2)}</TableCell>
          <TableCell className="text-right">{formatCurrency(tx.amountEtb, "ETB")}</TableCell>
          <TableCell>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[tx.paymentStatus]}`}>
              {tx.paymentStatus}
            </span>
          </TableCell>
          <TableCell>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[tx.transferStatus]}`}>
              {tx.transferStatus}
            </span>
          </TableCell>
       
          <TableCell className="text-center">
            <Link href={`/admin/transactions/${tx.id}`}>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-1" /> View
              </Button>
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
