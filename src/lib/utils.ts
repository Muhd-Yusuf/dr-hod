import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely (conditional + dedupe). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
