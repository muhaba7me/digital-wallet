"use client";

import { PaymentStatus, TransferStatus } from "@/lib/transactions";
import { FC } from "react";
import { Input } from "@/components/shared/input";
import { Select } from "@/components/shared/select";
import { Button } from "@/components/shared/button";

interface Props {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedPayment: "all" | PaymentStatus;
  selectedTransfer: "all" | TransferStatus;
  selectedBank: string;
  onPaymentChange: (value: "all" | PaymentStatus) => void;
  onTransferChange: (value: "all" | TransferStatus) => void;
  onBankChange: (value: string) => void;
  onReset: () => void;
  paymentOptions: PaymentStatus[];
  transferOptions: TransferStatus[];
  bankOptions: string[];
}

export const TransactionFilters: FC<Props> = ({
  searchQuery,
  onSearchChange,
  selectedPayment,
  selectedTransfer,
  selectedBank,
  onPaymentChange,
  onTransferChange,
  onBankChange,
  onReset,
  paymentOptions,
  transferOptions,
  bankOptions,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-end justify-between">
      <div className="flex flex-wrap gap-2">
        {/* Search input */}
        <Input
          placeholder="Search transactions"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {/* Payment status select */}
        <Select
          value={selectedPayment}
          onChange={(e) =>
            onPaymentChange(e.target.value as "all" | PaymentStatus)
          }
          className="w-40"
        >
          <option value="all">All</option>
          {paymentOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>

        {/* Transfer status select */}
        <Select
          value={selectedTransfer}
          onChange={(e) =>
            onTransferChange(e.target.value as "all" | TransferStatus)
          }
          className="w-40"
        >
          <option value="all">All</option>
          {transferOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>

        {/* Bank select */}
        <Select
          value={selectedBank}
          onChange={(e) => onBankChange(e.target.value)}
          className="w-40"
        >
          <option value="all">All</option>
          {bankOptions.map((bank) => (
            <option key={bank} value={bank}>
              {bank}
            </option>
          ))}
        </Select>
      </div>

      {/* Reset button */}
      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
};
