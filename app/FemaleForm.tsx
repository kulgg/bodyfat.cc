"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { historyAtom } from "./History";
import { Entry, Sex } from "@/lib/model";
import { useToast } from "@/components/ui/use-toast";
import { getBodyfatResult } from "@/lib/utils";
import { unitSystemAtom } from "./UnitSystemSwitch";
import { getUnitName } from "@/lib/units";

const formSchema = z.object({
  height: z
    .string()
    .min(1, { message: "Required." })
    .regex(/^\d+\.?\d*$/, { message: "Height must be a number." }),
  weight: z
    .string()
    .min(1, { message: "Required." })
    .regex(/^\d+\.?\d*$/, { message: "Weight must be a number." }),
  neck: z
    .string()
    .min(1, { message: "Required." })
    .regex(/^\d+\.?\d*$/, { message: "Neck must be a number." }),
  waist: z
    .string()
    .min(1, { message: "Required." })
    .regex(/^\d+\.?\d*$/, { message: "Waist must be a number." }),
  hip: z
    .string()
    .min(1, { message: "Required." })
    .regex(/^\d+\.?\d*$/, { message: "Hip must be a number." }),
});

export default function FemaleForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { height: "", weight: "", neck: "", waist: "", hip: "" },
  });
  const { toast } = useToast();

  const [history, setHistory] = useAtom(historyAtom);
  const [unitSystem, setUnitSystem] = useAtom(unitSystemAtom);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const entry: Entry = {
      created: new Date().toISOString(),
      measurement: {
        sex: Sex.FEMALE,
        height: parseFloat(values.height),
        weight: parseFloat(values.weight),
        neck: parseFloat(values.neck),
        waist: parseFloat(values.waist),
        hip: parseFloat(values.hip),
      },
    };
    toast({
      title: `You have ${getBodyfatResult(entry)}% bodyfat!`,
    });

    setHistory((prev) => [...prev, entry]);

    form.reset();

    const element = document.getElementById("history");
    element?.scrollIntoView();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Height ({getUnitName("height", unitSystem)})
              </FormLabel>
              <FormControl>
                <Input placeholder="161" {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Weight ({getUnitName("weight", unitSystem)})
              </FormLabel>
              <FormControl>
                <Input placeholder="70" {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="neck"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Neck ({getUnitName("neck", unitSystem)})</FormLabel>
              <FormControl>
                <Input placeholder="33" {...field} autoComplete="off" />
              </FormControl>
              <FormDescription>
                Measure the neck circumference just below the larynx while
                looking straight ahead.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="waist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Waist ({getUnitName("waist", unitSystem)})</FormLabel>
              <FormControl>
                <Input placeholder="71" {...field} autoComplete="off" />
              </FormControl>
              <FormDescription>
                Measure the waist circumference at the smallest part of the
                waist. Hold the tape parallel to the floor.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hip ({getUnitName("hip", unitSystem)})</FormLabel>
              <FormControl>
                <Input placeholder="88" {...field} autoComplete="off" />
              </FormControl>
              <FormDescription>
                Measure the hip circumference at the biggest part of the rear
                end. Hold the tape parallel to the floor.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Calculate Bodyfat Percentage
        </Button>
      </form>
    </Form>
  );
}
