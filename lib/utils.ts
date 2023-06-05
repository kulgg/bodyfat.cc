import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Entry, Sex } from "./model";
import { footToInches } from "./units";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return date.split("T")[0].replaceAll("-", "/");
}

export function getBodyfat(entry: Entry, is_metric: boolean) {
  if (is_metric) {
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

  const height =
    footToInches(entry.measurement.height) + entry.measurement.height_inches!;

  switch (entry.measurement.sex) {
    case Sex.MALE:
      return (
        86.01 * Math.log10(entry.measurement.belly - entry.measurement.neck) -
        70.041 * Math.log10(height) +
        36.76
      );
    case Sex.FEMALE:
      return (
        163.205 *
          Math.log10(
            entry.measurement.waist +
              entry.measurement.hip -
              entry.measurement.neck
          ) -
        97.684 * Math.log10(height) -
        78.387
      );
  }
}

export function getBodyfatResult(entry: Entry, is_metric: boolean) {
  let percentage = getBodyfat(entry, is_metric);

  if (percentage < 0) return "Invalid";

  return percentage.toFixed(2);
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
