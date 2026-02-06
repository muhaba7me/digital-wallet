"use client";

import { useMemo } from "react";
import { useFormikContext } from "formik";

import { Input } from "@/components/shared/input";
import { Select } from "@/components/shared/select";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/shared/form";
import { TransferFormValues } from "../form-validation";

const formatUsd = (amount: number) =>
  Number.isFinite(amount)
    ? new Intl.NumberFormat("en-US", { 
        style: "currency", 
        currency: "USD", 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      }).format(amount)
    : "$0.00";

const getMonthOptions = () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const getYearOptions = () => {
  const start = new Date().getFullYear();
  return Array.from({ length: 12 }, (_, i) => String(start + i));
};

export default function PaymentStep() {
  const { values } = useFormikContext<TransferFormValues>();

  const usdAmount = values.usdAmount ?? 0;
  const months = useMemo(getMonthOptions, []);
  const years = useMemo(getYearOptions, []);

 
  const renderInput = (name: keyof TransferFormValues, label: string, type: string = "text", autoComplete?: string) => (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Input 
            {...field} 
            value={(field.value as string | number) ?? ""}
            type={type} 
            placeholder={label} 
            autoComplete={autoComplete} 
            className="rounded-xl"
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderSelect = (name: keyof TransferFormValues, options: string[], label: string) => (
    <FormField
      name={name} 
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select 
            {...field} 
            value={String(field.value) || ""}
          >
            <option value="" disabled>
              {label}
            </option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="w-full overflow-hidden space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-3xl font-extrabold tracking-tight">Payment Information</h2>
        <p className="text-sm text-muted-foreground">
          Please enter your information and pay for your merchant
        </p>
      </div>

      {/* Amount Summary */}
      <div className="rounded-2xl border bg-white px-5 py-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-muted-foreground">Payment Amount</div>
          <div className="mt-1 text-2xl font-extrabold">{formatUsd(usdAmount)}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-white relative">
            <div className="absolute left-0 top-0 h-6 w-6 rounded-full bg-red-500/90" />
            <div className="absolute right-0 top-0 h-6 w-6 rounded-full bg-orange-400/90" />
          </div>
          <div className="text-right leading-tight">
            <div className="text-xs font-medium text-muted-foreground">Credit or Debit card</div>
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className="rounded-3xl p-6 shadow-sm border space-y-5">
        <div className="text-sm font-semibold">Choose your Payment method</div>
        {renderInput("cardNumber", "Card Number", "text", "cc-number")}
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-1">
            {renderInput("cvv", "CVV", "text", "cc-csc")}
          </div>
          <div className="md:col-span-1">
            {renderSelect("expiryMonth", months, "Month")}
          </div>
          <div className="md:col-span-1">
            {renderSelect("expiryYear", years, "Year")}
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="rounded-3xl p-6 shadow-sm border space-y-5">
        <div className="text-sm font-semibold">
          Billing Address <span className="text-xs font-normal text-muted-foreground">(Optional)</span>
        </div>

        {renderInput("billingCountry", "Country")}
        {renderInput("billingAddress", "Address")}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {renderInput("billingCity", "City")}
          {renderInput("billingPostalCode", "Postal code / ZIP Code")}
        </div>
      </div>
    </div>
  );
}