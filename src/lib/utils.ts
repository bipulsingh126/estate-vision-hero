import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as Indian Rupees currency
 * @param amount - The amount to format
 * @param options - Optional formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, options: { 
  locale?: string; 
  currency?: string;
  notation?: Intl.NumberFormatOptions['notation'];
  maximumFractionDigits?: number;
} = {}) {
  const { 
    locale = 'en-IN', 
    currency = 'INR',
    notation = 'standard',
    maximumFractionDigits = 0 
  } = options;
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits
  }).format(amount);
}

/**
 * Formats a number as a locale string with proper separators
 * @param num - The number to format
 * @param locale - The locale to use for formatting (default: 'en-IN')
 * @returns Formatted number string
 */
export function formatNumber(num: number, locale: string = 'en-IN') {
  return num.toLocaleString(locale);
}
