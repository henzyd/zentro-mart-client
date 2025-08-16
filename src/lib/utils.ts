import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function simulateApiCall<T = unknown>(
  responseData: T,
  delay = 1000,
  shouldFail = false,
) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Simulated API failure"));
      } else {
        resolve(responseData);
      }
    }, delay);
  });
}

export const formatPrice = (amount: number, currencyCode: string) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
};
