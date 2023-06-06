"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { historyAtom } from "@/lib/atoms";
import { Entry, Sex } from "@/lib/model";
import { toFeet, toInches, toPounds } from "@/lib/units";
import { getBodyfatResult } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

export default function FemaleMetricForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: "",
      weight: "",
      neck: "",
      waist: "",
      hip: "",
    },
  });
  const { toast } = useToast();

  const [history, setHistory] = useAtom(historyAtom);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const imperialHeight = toFeet(parseFloat(values.height));

    const entry: Entry = {
      created: new Date().toISOString(),
      metric_measurement: {
        sex: Sex.FEMALE,
        height: parseFloat(values.height),
        weight: parseFloat(values.weight),
        neck: parseFloat(values.neck),
        waist: parseFloat(values.waist),
        hip: parseFloat(values.hip),
      },
      imperial_measurement: {
        sex: Sex.FEMALE,
        height: imperialHeight[0],
        height_inches: imperialHeight[1],
        weight: toPounds(parseFloat(values.weight)),
        neck: toInches(parseFloat(values.neck)),
        waist: toInches(parseFloat(values.waist)),
        hip: toInches(parseFloat(values.hip)),
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
              <FormLabel>Height (cm)</FormLabel>
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
              <FormLabel>Weight (kg)</FormLabel>
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
              <FormLabel>Neck (cm)</FormLabel>
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
              <FormLabel>Waist (cm)</FormLabel>
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
              <FormLabel>Hip (cm)</FormLabel>
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
