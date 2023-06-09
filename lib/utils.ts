import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Entry, Sex } from "./model";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return date.split("T")[0].replaceAll("-", "/");
}

export function getBodyfat(entry: Entry) {
  switch (entry.metric_measurement.sex) {
    case Sex.MALE:
      return (
        86.01 *
          Math.log10(
            entry.metric_measurement.belly - entry.metric_measurement.neck
          ) -
        70.041 * Math.log10(entry.metric_measurement.height) +
        30.3
      );
    case Sex.FEMALE:
      return (
        163.205 *
          Math.log10(
            entry.metric_measurement.waist +
              entry.metric_measurement.hip -
              entry.metric_measurement.neck
          ) -
        97.684 * Math.log10(entry.metric_measurement.height) -
        104.912
      );
  }
}

export function getBodyfatResult(entry: Entry) {
  let percentage = getBodyfat(entry);

  if (percentage < 0) return "Invalid";

  return percentage.toFixed(2);
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
