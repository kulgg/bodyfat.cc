"use client";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { unitSystemAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export function About() {
  const tAbout = useTranslations("about");
  const tGeneral = useTranslations("general");
  const [unitSystem, setUnitSystem] = useAtom(unitSystemAtom);

  return (
    <Sheet>
      <SheetTrigger aria-label="Open FAQ">
        <HelpCircle className="w-6 h-6 mx-1 cursor-pointer" />
      </SheetTrigger>
      <SheetContent position="right" size="content" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{tAbout("formula.title")}</SheetTitle>
        </SheetHeader>
        <div className="py-4 max-w-[600px] text-slate-300">
          {tAbout("formula.description")}
          <div className="my-4"></div>
          {unitSystem === "metric" ? (
            <div>
              {tGeneral("male")}
              <div className="italic text-sm text-amber-300 bg-slate-800">
                {tGeneral("bodyfat")} = 86.01 * log10(
                {tGeneral("belly")} - {tGeneral("neck")}) - 70.041 * log10(
                {tGeneral("height")}) + 30.3
              </div>
              {tGeneral("female")}
              <div className="italic text-sm text-amber-300 bg-slate-800">
                {tGeneral("bodyfat")} = 163.205 * log10(
                {tGeneral("waist")} + {tGeneral("hip")} - {tGeneral("neck")}) -
                97.684 * log10(
                {tGeneral("height")}) - 104.912
              </div>
            </div>
          ) : (
            <div>
              Male Formula
              <div className="italic text-sm text-amber-300 bg-slate-800">
                BFP = 86.01 * log10(belly - neck) - 70.041 * log10(height) +
                36.76
              </div>
              Female Formula
              <div className="italic text-sm text-amber-300 bg-slate-800">
                BFP = 163.205 * log10(waist + hip - neck) - 97.684 *
                log10(height) - 78.387
              </div>
            </div>
          )}
        </div>
        <div className="my-8"></div>
        <SheetHeader>
          <SheetTitle>{tAbout("privacy.title")}</SheetTitle>
        </SheetHeader>
        <div className="py-4 max-w-[600px] text-slate-300">
          {tAbout("privacy.description")}
        </div>
        <div className="my-8"></div>
        <SheetHeader>
          <SheetTitle>{tAbout("accuracy.title")}</SheetTitle>
        </SheetHeader>
        <div className="py-4 max-w-[600px] text-slate-300">
          {tAbout("accuracy.description")}
        </div>
        <div className="my-8"></div>
        <SheetHeader>
          <SheetTitle>{tAbout("free.title")}</SheetTitle>
        </SheetHeader>
        <div className="py-4 max-w-[600px] text-slate-300">
          {tAbout("free.description")}
        </div>
        <div className="my-8"></div>
        <SheetHeader>
          <SheetTitle>{tAbout("opensource.title")}</SheetTitle>
        </SheetHeader>
        <div className="py-4 max-w-[600px] text-slate-300">
          {tAbout("opensource.description")}
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
