// ===============================
// Context & Hooks
// ===============================
export {
  TransferFormProvider,
  useTransferForm,
  withTransferForm,
} from './form-context';

// ===============================
// Input / Step Components
// ===============================

export { default as BankOptions } from './components/bank-options';
export { default as ReceiverInfoStep } from './components/receiver-info';
export { default as ReceiverAccountStep } from './components/receiver-account';
export { default as ConfirmOrderStep } from './components/confirm-order';
export { default as PaymentSuccess } from './components/payment-success';

// ===============================
// Validation
// ===============================
export {
  transferFormSchema,
  emailSchema,
  passwordSigninSchema,
  passwordSignupSchema,
  validateField,
  validateFormStep,
  getValidationRule,
  getAllValidationRules,
  type TransferFormValues,
  type EmailFormData,
  type PasswordFormData,
  type PasswordSignupFormData,
} from './form-validation';

// ===============================
// Currency Utilities
// ===============================
export {
  useCurrencySync,
} from './currency/use-currency-sync';

export {
  useGiftTotal,
} from './currency/use-gift-totals';

export {
  formatNumber,
  parseDecimal,
  clampNonNegative,
} from './currency/utils';

export {
  EXCHANGE_RATE,
  GIFT_PER_USD_ETB,
  MIN_USD,
} from './currency/constants';

// ===============================
// Configuration / Constants
// ===============================
export { STEPS } from './step-config';
export { BANKS } from './banks';

// ===============================
// Legacy / Backward Compatibility
// ===============================
export { TransferMultiStepForm } from './transfer-controller';
export { TransferFormProviders as LegacyFormProvider } from './form-provider';
export { transferFormSchema as legacyValidationSchema } from './validation-schemas';
