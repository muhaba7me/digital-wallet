import { useTransferStore } from '@/store/transfer';
import { EXCHANGE_RATE, GIFT_BONUS } from '@/constants';

export const useTransfer = () => {
  const {
    currentStep,
    formData,
    isProcessing,
    exchangeRate,
    giftBonus,
    conversionResult,
    error,
    setCurrentStep,
    updateFormData,
    setProcessing,
    setExchangeRate,
    calculateConversion,
    resetTransfer,
    setError,
    nextStep,
    previousStep,
  } = useTransferStore();

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.amount > 0;
      case 2:
        return formData.bank !== null;
      case 3:
        return formData.receiver !== null;
      case 4:
        return formData.verifiedAccount !== null;
      case 5:
        return true; // Confirmation step
      case 6:
        return true; // Payment step
      default:
        return false;
    }
  };

  const getTotalEtb = () => {
    if (!conversionResult) return 0;
    return conversionResult.totalEtb;
  };

  const getUsdAmount = () => {
    if (!conversionResult) return 0;
    return conversionResult.usdAmount;
  };

  const getGiftAmount = () => {
    if (!conversionResult) return 0;
    return conversionResult.giftAmount;
  };

  return {
    currentStep,
    formData,
    isProcessing,
    exchangeRate,
    giftBonus,
    conversionResult,
    error,
    setCurrentStep,
    updateFormData,
    setProcessing,
    setExchangeRate,
    calculateConversion,
    resetTransfer,
    setError,
    nextStep,
    previousStep,
    canProceedToNext,
    getTotalEtb,
    getUsdAmount,
    getGiftAmount,
  };
};
