import * as Yup from "yup";


export const transferFormSchema = Yup.object({
  usdAmount: Yup.number()
    .min(5, "Please enter at least $5 to continue")
    .max(25000, "Amount cannot exceed $25,000 per transaction")
    .required("Please enter at least $5 to continue"),


  selectedBankId: Yup.string()
    .min(1, "Please choose a bank to proceed")
    .required("Please choose a bank to proceed"),


  receiverName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Please enter the receiver's full name"),
  receiverPhone: Yup.string()
    .min(10, "Please enter a valid phone number")
    .required("Please enter the receiver's phone number"),
  dropoffLocation: Yup.string()
    .required("Please specify where the gift should be delivered"),
  note: Yup.string().notRequired(),
  agreeTerms: Yup.boolean().oneOf(
    [true],
    "Please accept the Terms & Conditions to continue"
  ),


  receiverAccountNumber: Yup.string()
    .min(8, "Account number seems too short. Please check and try again")
    .required("Please enter the receiver's account number"),
  senderFullName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Please enter your full name"),


  cardNumber: Yup.string()
    .min(12, "Please enter a valid card number")
    .required("Please enter your card number"),
  cvv: Yup.string()
    .min(3, "CVV must be 3 or 4 digits")
    .max(4, "CVV must be 3 or 4 digits")
    .required("Please enter your CVV"),
  expiryMonth: Yup.string()
    .matches(/^(0[1-9]|1[0-2])$/, "Please select a valid month (01-12)")
    .required("Please select the expiry month"),
  expiryYear: Yup.string()
    .required("Please select the expiry year"),
  billingCountry: Yup.string().notRequired(),
  billingAddress: Yup.string().notRequired(),
  billingCity: Yup.string().notRequired(),
  billingPostalCode: Yup.string().notRequired(),
});

export type TransferFormValues = Yup.InferType<typeof transferFormSchema>;

export const emailSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});


export const passwordSigninSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});


export interface EmailFormData {
  email: string;
}

export interface PasswordFormData {
  password: string;
}

export interface PasswordSignupFormData extends PasswordFormData {
  confirmPassword: string;
}

export const passwordSignupSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});