import * as Yup from "yup";

// Validation field configurations
const VALIDATION_RULES = {
  usdAmount: {
    min: 5,
    max: 25000,
    requiredMessage: "Please enter at least $5 to continue",
    minMessage: "Please enter at least $5 to continue",
    maxMessage: "Amount cannot exceed $25,000 per transaction",
  },
  accountNumber: {
    minLength: 8,
    requiredMessage: "Please enter the receiver's account number",
    minLengthMessage: "Account number seems too short. Please check and try again",
  },
  phoneNumber: {
    minLength: 10,
    requiredMessage: "Please enter the receiver's phone number",
    minLengthMessage: "Please enter a valid phone number",
  },
  fullName: {
    minLength: 2,
    requiredMessage: "Please enter the full name",
    minLengthMessage: "Name must be at least 2 characters",
  },
  cardNumber: {
    minLength: 12,
    requiredMessage: "Please enter your card number",
    minLengthMessage: "Please enter a valid card number",
  },
  cvv: {
    minLength: 3,
    maxLength: 4,
    requiredMessage: "Please enter your CVV",
    minLengthMessage: "CVV must be 3 or 4 digits",
    maxLengthMessage: "CVV must be 3 or 4 digits",
  },
  expiryMonth: {
    pattern: /^(0[1-9]|1[0-2])$/,
    requiredMessage: "Please select the expiry month",
    patternMessage: "Please select a valid month (01-12)",
  },
  expiryYear: {
    requiredMessage: "Please select the expiry year",
  },
  terms: {
    requiredMessage: "Please accept the Terms & Conditions to continue",
  },
} as const;

// Base validation creators
const createAmountValidation = (rules: typeof VALIDATION_RULES.usdAmount) =>
  Yup.number()
    .min(rules.min, rules.minMessage)
    .max(rules.max, rules.maxMessage)
    .required(rules.requiredMessage);

const createStringValidation = (
  minLength: number,
  requiredMessage: string,
  minLengthMessage: string
) =>
  Yup.string()
    .min(minLength, minLengthMessage)
    .required(requiredMessage);

const createAccountValidation = (rules: typeof VALIDATION_RULES.accountNumber) =>
  createStringValidation(rules.minLength, rules.requiredMessage, rules.minLengthMessage);

const createPhoneValidation = (rules: typeof VALIDATION_RULES.phoneNumber) =>
  createStringValidation(rules.minLength, rules.requiredMessage, rules.minLengthMessage);

const createNameValidation = (rules: typeof VALIDATION_RULES.fullName) =>
  createStringValidation(rules.minLength, rules.requiredMessage, rules.minLengthMessage);

const createCardValidation = (rules: typeof VALIDATION_RULES.cardNumber) =>
  createStringValidation(rules.minLength, rules.requiredMessage, rules.minLengthMessage);

const createCvvValidation = (rules: typeof VALIDATION_RULES.cvv) =>
  Yup.string()
    .min(rules.minLength, rules.minLengthMessage)
    .max(rules.maxLength, rules.maxLengthMessage)
    .required(rules.requiredMessage);

const createExpiryMonthValidation = (rules: typeof VALIDATION_RULES.expiryMonth) =>
  Yup.string()
    .matches(rules.pattern, rules.patternMessage)
    .required(rules.requiredMessage);

const createExpiryYearValidation = (rules: typeof VALIDATION_RULES.expiryYear) =>
  Yup.string().required(rules.requiredMessage);

// Main transfer form schema
export const transferFormSchema = Yup.object({
  usdAmount: createAmountValidation(VALIDATION_RULES.usdAmount),
  selectedBankId: Yup.string()
    .min(1, "Please choose a bank to proceed")
    .required("Please choose a bank to proceed"),
  receiverName: createNameValidation(VALIDATION_RULES.fullName),
  receiverPhone: createPhoneValidation(VALIDATION_RULES.phoneNumber),
  dropoffLocation: Yup.string()
    .required("Please specify where the gift should be delivered"),
  note: Yup.string().notRequired(),
  agreeTerms: Yup.boolean()
    .oneOf([true], VALIDATION_RULES.terms.requiredMessage),
  receiverAccountNumber: createAccountValidation(VALIDATION_RULES.accountNumber),
  senderFullName: createNameValidation(VALIDATION_RULES.fullName),
  cardNumber: createCardValidation(VALIDATION_RULES.cardNumber),
  cvv: createCvvValidation(VALIDATION_RULES.cvv),
  expiryMonth: createExpiryMonthValidation(VALIDATION_RULES.expiryMonth),
  expiryYear: createExpiryYearValidation(VALIDATION_RULES.expiryYear),
  billingCountry: Yup.string().notRequired(),
  billingAddress: Yup.string().notRequired(),
  billingCity: Yup.string().notRequired(),
  billingPostalCode: Yup.string().notRequired(),
});

// Additional validation schemas
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

export const passwordSignupSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

// Type definitions
export type TransferFormValues = Yup.InferType<typeof transferFormSchema>;
export interface EmailFormData {
  email: string;
}
export interface PasswordFormData {
  password: string;
}
export interface PasswordSignupFormData extends PasswordFormData {
  confirmPassword: string;
}

// Validation utilities
export const validateField = async (
  fieldName: keyof TransferFormValues,
  value: any,
  schema: Yup.ObjectSchema<any>
): Promise<string | undefined> => {
  try {
    await schema.validateAt(fieldName, { [fieldName]: value });
    return undefined;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return error.message;
    }
    return "Validation error";
  }
};

export const validateFormStep = async (
  stepFields: (keyof TransferFormValues)[],
  formData: Partial<TransferFormValues>,
  schema: Yup.ObjectSchema<any>
): Promise<Record<string, string>> => {
  const errors: Record<string, string> = {};
  
  for (const field of stepFields) {
    const error = await validateField(field, formData[field], schema);
    if (error) {
      errors[field] = error;
    }
  }
  
  return errors;
};

// Validation rule getters for dynamic usage
export const getValidationRule = (ruleName: keyof typeof VALIDATION_RULES) => 
  VALIDATION_RULES[ruleName];

export const getAllValidationRules = () => VALIDATION_RULES;
