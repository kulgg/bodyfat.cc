import { atomWithStorage } from "jotai/utils";
import { Entry } from "./model";

export const historyAtom = atomWithStorage<Entry[]>("history", []);

export const unitSystemAtom = atomWithStorage<"metric" | "imperial">(
  "unitSystem",
  "metric"
);

export const sexSelectionAtom = atomWithStorage<"Male" | "Female">(
  "sex_selection",
  "Male"
);
