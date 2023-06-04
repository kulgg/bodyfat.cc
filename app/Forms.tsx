import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import MaleForm from "./MaleForm";

function Forms() {
  return (
    <div>
      <RadioGroup defaultValue="Male" className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Male" id="Male" />
          <Label htmlFor="Male">Male</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Female" id="Female" />
          <Label htmlFor="Female">Female</Label>
        </div>
      </RadioGroup>
      <MaleForm />
    </div>
  );
}

export default Forms;
