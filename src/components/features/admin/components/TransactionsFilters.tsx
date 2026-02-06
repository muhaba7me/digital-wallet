"use client";

import { ChangeEvent, FC, ReactNode } from "react";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Select } from "@/components/shared/select";

type OptionSelectorProps = {
  labelAll: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

const OptionSelector: FC<OptionSelectorProps> = ({ labelAll, value, options, onChange }) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value);

  return (
    <Select value={value} onChange={handleSelectChange}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt === "all" ? labelAll : opt}
        </option>
      ))}
    </Select>
  );
};

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

export const TransactionsFilters: FC<TransactionsFiltersProps> = ({
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
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value);
const filters: { component: ReactNode }[] = [
  { component: (
    <Input
      value={search}
      onChange={handleInputChange}
      placeholder="Search by ID, sender, recipient, or bank"
    />
  )},
  { component: (
    <OptionSelector
      labelAll="All Payment Status"
      value={paymentValue}
      options={paymentOptions}
      onChange={onPaymentChange}
    />
  )},
  { component: (
    <OptionSelector
      labelAll="All Transfer Status"
      value={transferValue}
      options={transferOptions}
      onChange={onTransferChange}
    />
  )},
  { component: (
    <OptionSelector
      labelAll="All Banks"
      value={bankValue}
      options={bankOptions}
      onChange={onBankChange}
    />
  )},
];

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
      {filters.map((filter) => filter.component)}
      {onReset && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="justify-self-start text-gray-500 hover:text-gray-700"
        >
          Reset
        </Button>
      )}
    </div>
  );
};
