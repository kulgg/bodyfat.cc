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

export function About() {
  const [unitSystem, setUnitSystem] = useAtom(unitSystemAtom);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <HelpCircle className="w-6 h-6 mx-1 cursor-pointer" />
      </SheetTrigger>
      <SheetContent position="right" size="content" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>How does this bodyfat calculator work?</SheetTitle>
        </SheetHeader>
        <div className="py-4 max-w-[600px] text-slate-300">
          The body fat percentage (BFP) is estimated by using the US Navy
          method, which utilizes height and circumferences at different body
          positions. The formula and measurement positions differ for males and
          females.
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
          <SheetTitle>What happens to my data?</SheetTitle>
        </SheetHeader>
        <div className="py-4 max-w-[600px] text-slate-300">
          The data you enter never leaves your device. It is saved locally
          inside of your browser.
        </div>
        <div className="my-8"></div>
        <SheetHeader>
          <SheetTitle>How accurate is this method?</SheetTitle>
        </SheetHeader>
        <div className="py-4 max-w-[600px] text-slate-300">
          It is reported to be accurate within a ~3% error range. This makes it
          significantly more accurate than scales with bioelectrical impedance.
          And all you need is a measuring tape.
        </div>
        <div className="my-8"></div>
        <SheetHeader>
          <SheetTitle>Is this app free?</SheetTitle>
        </SheetHeader>
        <div className="py-4 max-w-[600px] text-slate-300">
          Yes you can measure and keep history of your bodyfat percentage for
          free.
        </div>
        <div className="my-8"></div>
        <SheetHeader>
          <SheetTitle>Is this open source?</SheetTitle>
        </SheetHeader>
        <div className="py-4 max-w-[600px] text-slate-300">
          Yes, this web application is open-sourced under MIT license.
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
