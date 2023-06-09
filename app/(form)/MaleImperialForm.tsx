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
import { footToCm, inchesToCm, poundsToKg } from "@/lib/units";
import { getBodyfatResult } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormsDictionary } from "./Forms";

const getFormSchema = (dictionary: FormsDictionary) =>
  z.object({
    height_foot: z
      .string()
      .min(1, { message: dictionary.error_messages.required })
      .regex(/^\d+$/, { message: dictionary.error_messages.number }),
    height_inches: z
      .string()
      .min(1, { message: dictionary.error_messages.required })
      .regex(/^\d+$/, { message: dictionary.error_messages.number }),
    weight: z
      .string()
      .min(1, { message: dictionary.error_messages.required })
      .regex(/^\d+\.?\d*$/, { message: dictionary.error_messages.number }),
    neck: z
      .string()
      .min(1, { message: dictionary.error_messages.required })
      .regex(/^\d+\.?\d*$/, { message: dictionary.error_messages.number }),
    belly: z
      .string()
      .min(1, { message: dictionary.error_messages.required })
      .regex(/^\d+\.?\d*$/, { message: dictionary.error_messages.number }),
  });

export default function MaleImperialForm({
  dictionary,
}: {
  dictionary: FormsDictionary;
}) {
  const router = useRouter();
  const formSchema = getFormSchema(dictionary);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height_foot: "",
      height_inches: "",
      weight: "",
      neck: "",
      belly: "",
    },
  });

  const [history, setHistory] = useAtom(historyAtom);

  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const entry: Entry = {
      created: new Date().toISOString(),
      metric_measurement: {
        sex: Sex.MALE,
        height: footToCm(
          parseFloat(values.height_foot),
          parseFloat(values.height_inches)
        ),
        weight: poundsToKg(parseFloat(values.weight)),
        neck: inchesToCm(parseFloat(values.neck)),
        belly: inchesToCm(parseFloat(values.belly)),
      },
      imperial_measurement: {
        sex: Sex.MALE,
        height: parseFloat(values.height_foot),
        height_inches: parseFloat(values.height_inches),
        weight: parseFloat(values.weight),
        neck: parseFloat(values.neck),
        belly: parseFloat(values.belly),
      },
    };

    setHistory((prev) => [...prev, entry]);
    router.push("/me");
    toast({
      title: `You have ${getBodyfatResult(entry)}% bodyfat!`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-1">
          <FormField
            control={form.control}
            name="height_foot"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">{dictionary.height} (ft)</FormLabel>
                <FormControl>
                  <Input placeholder="5" {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height_inches"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">(in)</FormLabel>
                <FormControl>
                  <Input placeholder="7" {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.weight} (lb)</FormLabel>
              <FormControl>
                <Input placeholder="75" {...field} autoComplete="off" />
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
              <FormLabel>{dictionary.neck} (in)</FormLabel>
              <FormControl>
                <Input placeholder="33" {...field} autoComplete="off" />
              </FormControl>
              <FormDescription>{dictionary.neck_description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="belly"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.belly} (in)</FormLabel>
              <FormControl>
                <Input placeholder="85" {...field} autoComplete="off" />
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
          {dictionary.cta}
        </Button>
      </form>
    </Form>
  );
}
