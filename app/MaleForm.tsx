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
  belly: z
    .string()
    .min(1, { message: "Required." })
    .regex(/^\d+\.?\d*$/, { message: "Belly must be a number." }),
});

export default function MaleForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { height: "", weight: "", neck: "", belly: "" },
  });

  const [history, setHistory] = useAtom(historyAtom);

  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const entry: Entry = {
      created: new Date().toISOString(),
      measurement: {
        sex: Sex.MALE,
        height: parseFloat(values.height),
        weight: parseFloat(values.weight),
        neck: parseFloat(values.neck),
        belly: parseFloat(values.belly),
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
                <Input placeholder="177" {...field} />
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
                <Input placeholder="75" {...field} />
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
                <Input placeholder="33" {...field} />
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
          name="belly"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Belly (cm)</FormLabel>
              <FormControl>
                <Input placeholder="85" {...field} />
              </FormControl>
              <FormDescription>
                Measure the waist circumference at the belly button. Hold the
                tape parallel to the floor.
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
