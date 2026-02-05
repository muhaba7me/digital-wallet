"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import { useFormikContext } from "formik";


import { cn } from "@/lib/utils";

import { BANKS } from "../banks";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/shared/form";
import { Input } from "@/components/shared/input";
import { Textarea } from "@/components/shared/textarea";
import { TransferFormValues } from "../validation-schemas";


export default function ReceiverInfoStep() {
const { values, setFieldValue } = useFormikContext<TransferFormValues>();


  const selectedBankId = values.selectedBankId;
  const selectedBank = BANKS.find((b) => b.id === selectedBankId);
  const bankName = selectedBank?.name;
  const bankLogo = selectedBank?.logo;


  return (
    <div className="w-full overflow-hidden ">
      <div className="">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-20 items-center justify-center">
            <Image
              src="/step-3.png"
              alt="Receiver"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h2 className="mt-5 text-2xl font-extrabold tracking-tight">
            Enter Gift Receiver Info
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Please provide the recipient&apos;s full name, address, and any
            special preferences. This will help us tailor the gift to their
            tastes.
          </p>
        </div>

        <div className="mt-7 rounded-[2rem] bg-white p-6 shadow-[0_30px_70px_-55px_rgba(0,0,0,0.75)]">
          <div className="mb-6 flex items-center gap-3 rounded-2xl bg-muted/40 px-4 py-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-card p-1.5">
              <Image
                src={bankLogo ?? "/image-1.png"}
                alt={bankName ?? "Bank"}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">
                {bankName ?? "Selected Bank"}
              </div>
              <div className="text-xs text-muted-foreground">Selected Bank</div>
            </div>
          </div>

          <div className="space-y-5">
            <FormField
              name="receiverName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver&apos;s Name</FormLabel>
                  <Input
                    {...field}
                 value={String(field.value ?? "")}
                    placeholder="Enter Full Name"
                    className="h-11 rounded-xl"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
  name="receiverPhone"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Receiver&apos;s Phone Number</FormLabel>
      <PhoneInput
        defaultCountry="ET"
        international
        value={values.receiverPhone ?? ""}
        onChange={(v) => setFieldValue(field.name, v ?? "")} 
        inputComponent={Input as any}
        numberInputProps={{
          className: "h-11 rounded-xl",
          placeholder: "+2519-00101010",
        }}
        className={cn(
          "w-full",
          "[&_.PhoneInputCountry]:mr-2 [&_.PhoneInputCountrySelect]:h-11 [&_.PhoneInputCountrySelect]:rounded-xl [&_.PhoneInputCountrySelect]:border [&_.PhoneInputCountrySelect]:border-input [&_.PhoneInputCountrySelect]:bg-muted/40 [&_.PhoneInputCountrySelect]:px-3",
        )}
      />
      <FormMessage />
    </FormItem>
  )}
/>


            <FormField
              name="dropoffLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drop off Location</FormLabel>
                  <div className="relative">
                    <Input
                      {...field}
                        value={String(field.value ?? "")}
                      placeholder="Enter Drop off Location"
                      className="h-11 rounded-xl pr-11"
                    />
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <MapPin className="size-5" />
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-medium text-amber-700">
              <span>📍</span>
              <span>Delivery available only within Addis Ababa.</span>
            </div>

            <FormField
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <Textarea
                    {...field}
                    value={String(field.value ?? "")}
                    placeholder="Add Note"
                    className="min-h-[110px] rounded-xl"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
<FormField
  name="agreeTerms"
  render={({ field }) => (
    <FormItem className="pt-2">
      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          className="mt-1 size-4 rounded border-input"
          checked={Boolean(field.value)}
          onChange={(e) => setFieldValue(field.name, e.target.checked)}
        />
        <span className="text-muted-foreground">
          I have read &amp; agree to the{" "}
          <span className="font-semibold text-foreground">
            Terms &amp; Conditions
          </span>
          .
        </span>
      </label>
      <FormMessage />
    </FormItem>
  )}
/>

          </div>
        </div>
      </div>
    </div>
  );
}
