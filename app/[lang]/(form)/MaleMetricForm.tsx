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
import { Entry, LocaleDictionary, Sex } from "@/lib/model";
import { toFeet, toInches, toPounds } from "@/lib/units";
import { getBodyfatResult } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import * as z from "zod";

const getFormSchema = (dictionary: LocaleDictionary) =>
  z.object({
    height: z
      .string()
      .min(1, { message: dictionary.forms.error_messages.required })
      .regex(/^\d+\.?\d*$/, {
        message: dictionary.forms.error_messages.number,
      }),
    weight: z
      .string()
      .min(1, { message: dictionary.forms.error_messages.required })
      .regex(/^\d+\.?\d*$/, {
        message: dictionary.forms.error_messages.number,
      }),
    neck: z
      .string()
      .min(1, { message: dictionary.forms.error_messages.required })
      .regex(/^\d+\.?\d*$/, {
        message: dictionary.forms.error_messages.number,
      }),
    belly: z
      .string()
      .min(1, { message: dictionary.forms.error_messages.required })
      .regex(/^\d+\.?\d*$/, {
        message: dictionary.forms.error_messages.number,
      }),
  });

export default function MaleMetricForm({
  dictionary,
}: {
  dictionary: LocaleDictionary;
}) {
  const router = useRouter();
  const schema = getFormSchema(dictionary);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { height: "", weight: "", neck: "", belly: "" },
  });

  const [history, setHistory] = useAtom(historyAtom);

  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof schema>) {
    const imperialHeight = toFeet(parseFloat(values.height));

    const entry: Entry = {
      created: new Date().toISOString(),
      metric_measurement: {
        sex: Sex.MALE,
        height: parseFloat(values.height),
        weight: parseFloat(values.weight),
        neck: parseFloat(values.neck),
        belly: parseFloat(values.belly),
      },
      imperial_measurement: {
        sex: Sex.MALE,
        height: imperialHeight[0],
        height_inches: imperialHeight[1],
        weight: toPounds(parseFloat(values.weight)),
        neck: toInches(parseFloat(values.neck)),
        belly: toInches(parseFloat(values.belly)),
      },
    };

    setHistory((prev) => [...prev, entry]);
    router.push("/me");
    toast({
      title: `${dictionary.forms.result_message} ${getBodyfatResult(entry)}%!`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.general.height} (cm)</FormLabel>
              <FormControl>
                <Input
                  placeholder="180"
                  {...field}
                  autoComplete="off"
                  type="number"
                  step="0.01"
                />
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
              <FormLabel>{dictionary.general.weight} (kg)</FormLabel>
              <FormControl>
                <Input
                  placeholder="78"
                  {...field}
                  autoComplete="off"
                  type="number"
                  step="0.01"
                />
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
              <FormLabel>{dictionary.general.neck} (cm)</FormLabel>
              <FormControl>
                <Input
                  placeholder="36"
                  {...field}
                  autoComplete="off"
                  type="number"
                  step="0.01"
                />
              </FormControl>
              <FormDescription>
                {dictionary.forms.neck_description}
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
              <FormLabel>{dictionary.general.belly} (cm)</FormLabel>
              <FormControl>
                <Input
                  placeholder="82"
                  {...field}
                  autoComplete="off"
                  type="number"
                  step="0.01"
                />
              </FormControl>
              <FormDescription>
                {dictionary.forms.belly_description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {dictionary.forms.cta}
        </Button>
      </form>
    </Form>
  );
}
