import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Entry } from "./model";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return date.toISOString().split("T")[0].replaceAll("-", "/");
}

export function getBodyfat(entry: Entry) {}
