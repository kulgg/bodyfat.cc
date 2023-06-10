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
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormsDictionary } from "./Forms";

export const getFormSchema = (dictionary: FormsDictionary) =>
  z.object({
    height: z
      .string()
      .min(1, { message: dictionary.error_messages.required })
      .regex(/^\d+\.?\d*$/, { message: dictionary.error_messages.number }),
    weight: z
      .string()
      .min(1, { message: dictionary.error_messages.required })
      .regex(/^\d+\.?\d*$/, { message: dictionary.error_messages.number }),
    neck: z
      .string()
      .min(1, { message: dictionary.error_messages.required })
      .regex(/^\d+\.?\d*$/, { message: dictionary.error_messages.number }),
    waist: z
      .string()
      .min(1, { message: dictionary.error_messages.required })
      .regex(/^\d+\.?\d*$/, { message: dictionary.error_messages.number }),
    hip: z
      .string()
      .min(1, { message: dictionary.error_messages.required })
      .regex(/^\d+\.?\d*$/, { message: dictionary.error_messages.number }),
  });

export default function FemaleMetricForm({
  dictionary,
}: {
  dictionary: FormsDictionary;
}) {
  const router = useRouter();
  const formSchema = getFormSchema(dictionary);
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

    setHistory((prev) => [...prev, entry]);
    router.push("/me");
    toast({
      title: `${dictionary.result_message} ${getBodyfatResult(entry)}%!`,
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
              <FormLabel>{dictionary.height} (cm)</FormLabel>
              <FormControl>
                <Input
                  placeholder="167"
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
              <FormLabel>{dictionary.weight} (kg)</FormLabel>
              <FormControl>
                <Input
                  placeholder="63"
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
              <FormLabel>{dictionary.neck} (cm)</FormLabel>
              <FormControl>
                <Input
                  placeholder="34.2"
                  {...field}
                  autoComplete="off"
                  type="number"
                  step="0.01"
                />
              </FormControl>
              <FormDescription>{dictionary.neck_description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="waist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.waist} (cm)</FormLabel>
              <FormControl>
                <Input
                  placeholder="80.5"
                  {...field}
                  autoComplete="off"
                  type="number"
                  step="0.01"
                />
              </FormControl>
              <FormDescription>{dictionary.waist_description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.hip} (cm)</FormLabel>
              <FormControl>
                <Input
                  placeholder="95"
                  {...field}
                  autoComplete="off"
                  type="number"
                  step="0.01"
                />
              </FormControl>
              <FormDescription>{dictionary.hip_description}</FormDescription>
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
