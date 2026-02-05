// "use client";

// import { useMemo } from "react";
// import { useFormikContext } from "formik";

// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/shared/form";
// import { Input } from "@/components/shared/input";
// import { Select } from "@/components/shared/select";
// import { TransferFormValues } from "../schema";


// function formatUsd(amount: number) {
//   if (!Number.isFinite(amount)) return "$0.00";

//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(amount);
// }

// function getYearOptions() {
//   const start = new Date().getFullYear();
//   return Array.from({ length: 12 }, (_, i) => String(start + i));
// }

// function getMonthOptions() {
//   return Array.from({ length: 12 }, (_, i) =>
//     String(i + 1).padStart(2, "0")
//   );
// }

// export default function PaymentStep() {
//   const { values } = useFormikContext<TransferFormValues>();

//   const usdAmount = values.usdAmount ?? 0;

//   const months = useMemo(getMonthOptions, []);
//   const years = useMemo(getYearOptions, []);

//   return (
//     <div className="w-full overflow-hidden">
//       {/* Header */}
//       <div className="space-y-1">
//         <h2 className="text-3xl font-extrabold tracking-tight">
//           Payment Informations
//         </h2>
//         <p className="text-sm text-muted-foreground">
//           Please enter your information and pay for your merchant
//         </p>
//       </div>

//       {/* Amount Summary */}
//       <div className="mt-6 rounded-2xl border bg-white px-5 py-4">
//         <div className="flex items-center justify-between gap-4">
//           <div>
//             <div className="text-xs font-medium text-muted-foreground">
//               Payment Amount
//             </div>
//             <div className="mt-1 text-2xl font-extrabold">
//               {formatUsd(usdAmount)}
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="flex size-12 items-center justify-center rounded-xl border bg-white">
//               <div className="relative h-6 w-8">
//                 <div className="absolute left-0 top-0 h-6 w-6 rounded-full bg-red-500/90" />
//                 <div className="absolute right-0 top-0 h-6 w-6 rounded-full bg-orange-400/90" />
//               </div>
//             </div>
//             <div className="text-right leading-tight">
//               <div className="text-xs font-medium text-muted-foreground">
//                 Credit or Debit card
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Card Details */}
//       <div className="mt-6 rounded-3xl p-6 shadow-sm">
//         <div className="text-sm font-semibold">
//           Choose your Payment method
//         </div>

//         <div className="mt-5 space-y-4">
//           <FormField
//             name="cardNumber"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Card Number</FormLabel>
//                 <Input
//                   {...field}
//                   value={field.value ?? ""}
//                   placeholder="Card Number"
//                   className="h-12 rounded-2xl"
//                   inputMode="numeric"
//                   autoComplete="cc-number"
//                 />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             name="cvv"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>CVV</FormLabel>
//                 <Input
//                   {...field}
//                   value={field.value ?? ""}
//                   placeholder="CVV"
//                   className="h-12 rounded-2xl"
//                   inputMode="numeric"
//                   autoComplete="cc-csc"
//                 />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <FormField
//               name="expiryMonth"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Expiry Month</FormLabel>
//                   <Select
//                     name={field.name}
//                     value={field.value ?? ""}
//                     onChange={(e) => field.onChange(e.target.value)}
//                     onBlur={field.onBlur}
//                   >
//                     <option value="" disabled>
//                       Month
//                     </option>
//                     {months.map((m) => (
//                       <option key={m} value={m}>
//                         {m}
//                       </option>
//                     ))}
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               name="expiryYear"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Year</FormLabel>
//                   <Select
//                     name={field.name}
//                     value={field.value ?? ""}
//                     onChange={(e) => field.onChange(e.target.value)}
//                     onBlur={field.onBlur}
//                   >
//                     <option value="" disabled>
//                       Year
//                     </option>
//                     {years.map((y) => (
//                       <option key={y} value={y}>
//                         {y}
//                       </option>
//                     ))}
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Billing Address */}
//       <div className="mt-6 mb-1 rounded-3xl p-6 shadow-sm">
//         <div className="text-sm font-semibold">
//           Billing Address{" "}
//           <span className="text-xs font-normal text-muted-foreground">
//             (Optional)
//           </span>
//         </div>

//         <div className="mt-5 space-y-4">
//           <FormField
//             name="billingCountry"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Country*</FormLabel>
//                 <Input
//                   {...field}
//                   value={field.value ?? ""}
//                   placeholder="Select Country"
//                   className="h-12 rounded-2xl"
//                 />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             name="billingAddress"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Address*</FormLabel>
//                 <Input
//                   {...field}
//                   value={field.value ?? ""}
//                   placeholder="Address"
//                   className="h-12 rounded-2xl"
//                 />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <FormField
//               name="billingCity"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>City*</FormLabel>
//                   <Input
//                     {...field}
//                     value={field.value ?? ""}
//                     placeholder="City"
//                     className="h-12 rounded-2xl"
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               name="billingPostalCode"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Postal code / ZIP Code*</FormLabel>
//                   <Input
//                     {...field}
//                     value={field.value ?? ""}
//                     placeholder="Postal code / ZIP Code"
//                     className="h-12 rounded-2xl"
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
