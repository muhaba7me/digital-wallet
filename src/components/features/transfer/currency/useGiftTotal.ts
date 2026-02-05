// currency/useGiftTotal.ts
import { EXCHANGE_RATE, GIFT_PER_USD_ETB, MIN_USD } from "./constants";

export function useGiftTotal(usd: number) {
  const isValid = usd >= MIN_USD;

  if (!isValid) {
    return {
      show: false,
      gift: 0,
      total: 0,
    };
  }

  const gift = usd * GIFT_PER_USD_ETB;
  const total = usd * EXCHANGE_RATE + gift;

  return {
    show: true,
    gift,
    total,
  };
}
