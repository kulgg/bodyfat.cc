import { atomWithStorage } from "jotai/utils";
import { Entry } from "./model";

export const historyAtom = atomWithStorage<Entry[]>("history", []);

export const unitSystemAtom = atomWithStorage<"metric" | "imperial">(
  "unitSystem",
  "metric"
);
