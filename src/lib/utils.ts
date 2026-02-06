import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind CSS classes safely with merging.
 * 
 * - Accepts any number of class names, conditional expressions, or arrays.
 * - Automatically deduplicates conflicting Tailwind classes.
 * 
 * @example
 * cn("bg-red-500", isActive && "text-white", ["p-4", "rounded-lg"])
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(...classes));
}
