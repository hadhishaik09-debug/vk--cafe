import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(p: string | number | undefined | null): string {
  if (p === undefined || p === null) return "";
  const num = p.toString().replace(/[^0-9.]/g, '');
  return num ? `₹${num}` : "";
}
