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
import { footToCm, inchesToCm, poundsToKg } from "@/lib/units";
import { getBodyfatResult } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const getFormSchema = (dictionary: LocaleDictionary) =>
  z.object({
    height_foot: z
      .string()
      .min(1, { message: dictionary.forms.error_messages.required })
      .regex(/^\d+$/, { message: dictionary.forms.error_messages.number }),
    height_inches: z
      .string()
      .min(1, { message: dictionary.forms.error_messages.required })
      .regex(/^\d+$/, { message: dictionary.forms.error_messages.number }),
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

export default function MaleImperialForm({
  dictionary,
}: {
  dictionary: LocaleDictionary;
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
      title: `${dictionary.forms.result_message} ${getBodyfatResult(entry)}%!`,
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
                <FormLabel className="">
                  {dictionary.general.height} (ft)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="5"
                    {...field}
                    autoComplete="off"
                    type="number"
                  />
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
                  <Input
                    placeholder="11"
                    {...field}
                    autoComplete="off"
                    type="number"
                  />
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
              <FormLabel>{dictionary.general.weight} (lb)</FormLabel>
              <FormControl>
                <Input
                  placeholder="172"
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
              <FormLabel>{dictionary.general.neck} (in)</FormLabel>
              <FormControl>
                <Input
                  placeholder="14.2"
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
              <FormLabel>{dictionary.general.belly} (in)</FormLabel>
              <FormControl>
                <Input
                  placeholder="32.3"
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
