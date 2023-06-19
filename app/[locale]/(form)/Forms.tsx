"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { sexSelectionAtom, unitSystemAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import FemaleImperialForm from "./FemaleImperialForm";
import FemaleMetricForm from "./FemaleMetricForm";
import MaleImperialForm from "./MaleImperialForm";
import MaleMetricForm from "./MaleMetricForm";

function Forms() {
  const t = useTranslations("general");
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
            <RadioGroupItem value="Male" id="Male" aria-label="Male" />
            <Label htmlFor="Male" className="cursor-pointer">
              {t("male")}
            </Label>
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setSexSelection("Female")}
          >
            <RadioGroupItem value="Female" id="Female" aria-label="Female" />
            <Label htmlFor="Female" className="cursor-pointer">
              {t("female")}
            </Label>
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
