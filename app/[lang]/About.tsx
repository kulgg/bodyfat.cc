"use client";
import { Button } from "@/components/ui/button";
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
import { HeaderDictionary } from "./Header";

export function About({ dictionary }: { dictionary: HeaderDictionary }) {
  const [unitSystem, setUnitSystem] = useAtom(unitSystemAtom);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <HelpCircle className="w-6 h-6 mx-1 cursor-pointer" />
      </SheetTrigger>
      <SheetContent position="right" size="content" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{dictionary.about.formula.title}</SheetTitle>
        </SheetHeader>
        <div className="py-4 max-w-[600px] text-slate-300">
          {dictionary.about.formula.description}
          <div className="my-4"></div>
          {unitSystem === "metric" ? (
            <div>
              Male Formula
              <div className="italic text-sm text-amber-300 bg-slate-800">
                BFP = 86.01 * log10(belly - neck) - 70.041 * log10(height) +
                30.3
              </div>
              Female Formula
              <div className="italic text-sm text-amber-300 bg-slate-800">
                BFP = 163.205 * log10(waist + hip - neck) - 97.684 *
                log10(height) - 104.912
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
          <SheetTitle>{dictionary.about.privacy.title}</SheetTitle>
        </SheetHeader>
        <div className="py-4 max-w-[600px] text-slate-300">
          {dictionary.about.privacy.description}
        </div>
        <div className="my-8"></div>
        <SheetHeader>
          <SheetTitle>{dictionary.about.accuracy.title}</SheetTitle>
        </SheetHeader>
        <div className="py-4 max-w-[600px] text-slate-300">
          {dictionary.about.accuracy.description}
        </div>
        <div className="my-8"></div>
        <SheetHeader>
          <SheetTitle>{dictionary.about.free.title}</SheetTitle>
        </SheetHeader>
        <div className="py-4 max-w-[600px] text-slate-300">
          {dictionary.about.free.description}
        </div>
        <div className="my-8"></div>
        <SheetHeader>
          <SheetTitle>{dictionary.about.opensource.title}</SheetTitle>
        </SheetHeader>
        <div className="py-4 max-w-[600px] text-slate-300">
          {dictionary.about.opensource.description}
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
