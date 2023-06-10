"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { sexSelectionAtom, unitSystemAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import FemaleImperialForm from "./FemaleImperialForm";
import FemaleMetricForm from "./FemaleMetricForm";
import MaleImperialForm from "./MaleImperialForm";
import MaleMetricForm from "./MaleMetricForm";
import { LocaleDictionary } from "@/lib/model";

function Forms({ dictionary }: { dictionary: LocaleDictionary }) {
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
              {dictionary.general.male}
            </Label>
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setSexSelection("Female")}
          >
            <RadioGroupItem value="Female" id="Female" />
            <Label htmlFor="Female" className="cursor-pointer">
              {dictionary.general.female}
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
