"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { capitalize } from "@/lib/utils";

export const unitSystemAtom = atomWithStorage<"metric" | "imperial">(
  "unitSystem",
  "metric"
);

function UnitSystemSwitch() {
  const [unitSystem, setUnitSystem] = useAtom(unitSystemAtom);

  return (
    <div className="flex items-center space-x-2 scale-90">
      <Switch
        id="unitSwitch"
        checked={unitSystem === "imperial"}
        onClick={() =>
          setUnitSystem((prev) => (prev === "metric" ? "imperial" : "metric"))
        }
      />
      <Label htmlFor="unitSwitch" className="">
        {capitalize(unitSystem)}
      </Label>
    </div>
  );
}

export default UnitSystemSwitch;
