"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { sexSelectionAtom, unitSystemAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import FemaleImperialForm from "./FemaleImperialForm";
import FemaleMetricForm from "./FemaleMetricForm";
import MaleImperialForm from "./MaleImperialForm";
import MaleMetricForm from "./MaleMetricForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface FormsDictionary {
  date: string;
  bodyfat: string;
  sex: string;
  male: string;
  female: string;
  height: string;
  weight: string;
  neck: string;
  belly: string;
  waist: string;
  hip: string;
  cta: string;
  neck_description: string;
  waist_description: string;
  hip_description: string;
  error_messages: {
    required: string;
    number: string;
  };
  result_message: string;
}

function Forms({ dictionary }: { dictionary: FormsDictionary }) {
  const [sexSelection, setSexSelection] = useAtom(sexSelectionAtom);
  const [unitSystem, setUnitSystem] = useAtom(unitSystemAtom);

  return (
    <div>
      <Label>Sex</Label>
      <div className="my-2"></div>
      <div className="space-y-6">
        <RadioGroup className="flex items-center gap-4" value={sexSelection}>
          <div
            className="flex items-center space-x-2"
            onClick={() => setSexSelection("Male")}
          >
            <RadioGroupItem value="Male" id="Male" />
            <Label htmlFor="Male" className="cursor-pointer">
              {dictionary.male}
            </Label>
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setSexSelection("Female")}
          >
            <RadioGroupItem value="Female" id="Female" />
            <Label htmlFor="Female" className="cursor-pointer">
              {dictionary.female}
            </Label>
          </div>
        </RadioGroup>
        {sexSelection === "Male" ? (
          unitSystem === "metric" ? (
            <MaleMetricForm dictionary={dictionary} />
          ) : (
            <MaleImperialForm dictionary={dictionary} />
          )
        ) : unitSystem === "metric" ? (
          <FemaleMetricForm dictionary={dictionary} />
        ) : (
          <FemaleImperialForm dictionary={dictionary} />
        )}
      </div>
    </div>
  );
}

export default Forms;
