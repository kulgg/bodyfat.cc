"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { unitSystemAtom } from "@/lib/atoms";
import { capitalize } from "@/lib/utils";
import { useAtom } from "jotai";
import { HeaderDictionary } from "./Header";

function UnitSystemSwitch({ dictionary }: { dictionary: HeaderDictionary }) {
  const [unitSystem, setUnitSystem] = useAtom(unitSystemAtom);

  return (
    <div className="flex items-center space-x-2 scale-90 -mr-1">
      <Switch
        id="unitSwitch"
        checked={unitSystem === "imperial"}
        onClick={() =>
          setUnitSystem((prev) => (prev === "metric" ? "imperial" : "metric"))
        }
      />
      <Label htmlFor="unitSwitch" className="">
        {capitalize(dictionary[unitSystem])}
      </Label>
    </div>
  );
}

export default UnitSystemSwitch;
