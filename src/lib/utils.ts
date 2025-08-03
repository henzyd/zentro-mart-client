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
