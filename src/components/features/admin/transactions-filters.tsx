"use client";

import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Select } from "@/components/shared/select";

type TransactionsFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  paymentValue: string;
  transferValue: string;
  bankValue: string;
  paymentOptions: string[];
  transferOptions: string[];
  bankOptions: string[];
  onPaymentChange: (value: string) => void;
  onTransferChange: (value: string) => void;
  onBankChange: (value: string) => void;
  onReset?: () => void;
};

export function TransactionsFilters({
  search,
  onSearchChange,
  paymentValue,
  transferValue,
  bankValue,
  paymentOptions,
  transferOptions,
  bankOptions,
  onPaymentChange,
  onTransferChange,
  onBankChange,
  onReset,
}: TransactionsFiltersProps) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
      <Input
        value={search}
        onChange={(event: { target: { value: string; }; }) => onSearchChange(event.target.value)}
        placeholder="Search by ID, sender, recipient, or bank"
      />
      <Select
        value={paymentValue}
        onChange={(event: { target: { value: string; }; }) => onPaymentChange(event.target.value)}
      >
        {paymentOptions.map((option) => (
          <option key={option} value={option}>
            {option === "all" ? "All Payment Status" : option}
          </option>
        ))}
      </Select>
      <Select
        value={transferValue}
        onChange={(event: { target: { value: string; }; }) => onTransferChange(event.target.value)}
      >
        {transferOptions.map((option) => (
          <option key={option} value={option}>
            {option === "all" ? "All Transfer Status" : option}
          </option>
        ))}
      </Select>
      <Select value={bankValue} onChange={(event: { target: { value: string; }; }) => onBankChange(event.target.value)}>
        {bankOptions.map((option) => (
          <option key={option} value={option}>
            {option === "all" ? "All Banks" : option}
          </option>
        ))}
      </Select>
      {onReset ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="justify-self-start text-gray-500 hover:text-gray-700"
        >
          Reset
        </Button>
      ) : null}
    </div>
  );
}