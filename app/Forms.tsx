"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";
import MaleForm from "./MaleForm";
import FemaleForm from "./FemaleForm";

function Forms() {
  const [sexSelection, setSexSelection] = useState<"Male" | "Female">("Male");

  return (
    <div className="space-y-4">
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
      {sexSelection === "Male" ? <MaleForm /> : <FemaleForm />}
    </div>
  );
}

export default Forms;
