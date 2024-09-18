import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const formatted = new Intl.DateTimeFormat("es", {
    hour12: true,
  }).format(date);

  return formatted;
}
