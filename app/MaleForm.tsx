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
import { Sex } from "@/lib/model";

const formSchema = z.object({
  height: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({ invalid_type_error: "Height must be a number" })
      .positive("Height must be positive")
  ),
  weight: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({ invalid_type_error: "Weight must be a number" })
      .positive("Weight must be positive")
  ),
  neck: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({ invalid_type_error: "Neck must be a number" })
      .positive("Neck must be positive")
  ),
  belly: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({ invalid_type_error: "Belly must be a number" })
      .positive("Belly must be positive")
  ),
});

export default function MaleForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [history, setHistory] = useAtom(historyAtom);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setHistory((prev) => [
      ...prev,
      {
        created: new Date().toISOString(),
        measurement: {
          sex: Sex.MALE,
          height: values.height,
          weight: values.weight,
          neck: values.neck,
          belly: values.belly,
        },
      },
    ]);
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
