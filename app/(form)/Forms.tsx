"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { unitSystemAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { useState } from "react";
import FemaleImperialForm from "./FemaleImperialForm";
import FemaleMetricForm from "./FemaleMetricForm";
import MaleImperialForm from "./MaleImperialForm";
import MaleMetricForm from "./MaleMetricForm";

function Forms() {
  const [sexSelection, setSexSelection] = useState<"Male" | "Female">("Male");
  const [unitSystem, setUnitSystem] = useAtom(unitSystemAtom);

  return (
    <div>
      <Label>Sex</Label>
      <div className="my-2"></div>
      <div className="space-y-6">
        <RadioGroup className="flex items-center gap-4" value={sexSelection}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Male"
              id="Male"
              onClick={() => setSexSelection("Male")}
            />
            <Label htmlFor="Male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Female"
              id="Female"
              onClick={() => setSexSelection("Female")}
            />
            <Label htmlFor="Female">Female</Label>
          </div>
        </RadioGroup>
        {sexSelection === "Male" ? (
          unitSystem === "metric" ? (
            <MaleMetricForm />
          ) : (
            <MaleImperialForm />
          )
        ) : unitSystem === "metric" ? (
          <FemaleMetricForm />
        ) : (
          <FemaleImperialForm />
        )}
      </div>
    </div>
  );
}

export default Forms;
