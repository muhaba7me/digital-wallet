import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TransferState, TransferFormData } from '@/types';

interface TransferStore extends TransferState {
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<TransferFormData>) => void;
  setProcessing: (processing: boolean) => void;
  setExchangeRate: (rate: number) => void;
  calculateConversion: (usdAmount: number) => void;
  resetTransfer: () => void;
  setError: (error: string | null) => void;
  nextStep: () => void;
  previousStep: () => void;
  // Add state properties that were missing
  currentStep: number;
  formData: TransferFormData;
  isProcessing: boolean;
  exchangeRate: number;
  giftBonus: number;
  conversionResult: TransferState['conversionResult'];
  error: string | null;
}

const EXCHANGE_RATE = 165; // 1 USD = 165 ETB
const GIFT_BONUS = 50; // 50 ETB per USD

export const useTransferStore = create<TransferStore>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      formData: {
        amount: 0,
        currency: 'USD',
        bank: null,
        receiver: null,
        verifiedAccount: null,
      },
      isProcessing: false,
      exchangeRate: EXCHANGE_RATE,
      giftBonus: GIFT_BONUS,
      conversionResult: null,
      error: null,

      setCurrentStep: (currentStep) => set({ currentStep }),

      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
          error: null,
        })),

      setProcessing: (isProcessing) => set({ isProcessing }),

      setExchangeRate: (exchangeRate) => set({ exchangeRate }),

      calculateConversion: (usdAmount) => {
        const etbAmount = usdAmount * EXCHANGE_RATE;
        const giftAmount = usdAmount * GIFT_BONUS;
        const totalEtb = etbAmount + giftAmount;

        set({
          conversionResult: {
            usdAmount,
            etbAmount,
            giftAmount,
            totalEtb,
          },
        });
      },

      resetTransfer: () =>
        set({
          currentStep: 1,
          formData: {
            amount: 0,
            currency: 'USD',
            bank: null,
            receiver: null,
            verifiedAccount: null,
          },
          isProcessing: false,
          conversionResult: null,
          error: null,
        }),

      setError: (error) => set({ error }),

      nextStep: () => {
        const { currentStep } = get();
        if (currentStep < 6) {
          set({ currentStep: currentStep + 1 });
        }
      },

      previousStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },
    }),
    {
      name: 'transfer-storage',
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
      }),
    }
  )
);
