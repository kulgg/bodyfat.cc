import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Entry, Sex } from "./model";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return date.toISOString().split("T")[0].replaceAll("-", "/");
}

export function getBodyfat(entry: Entry) {
  switch (entry.measurement.sex) {
    case Sex.MALE:
      return (
        86.01 * Math.log10(entry.measurement.belly - entry.measurement.neck) -
        70.041 * Math.log10(entry.measurement.height) +
        30.3
      );
    case Sex.FEMALE:
      return (
        163.205 *
          Math.log10(
            entry.measurement.waist +
              entry.measurement.hip -
              entry.measurement.neck
          ) -
        97.684 * Math.log10(entry.measurement.height) -
        104.912
      );
  }
}
