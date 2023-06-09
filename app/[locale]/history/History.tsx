"use client";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { historyAtom, unitSystemAtom } from "@/lib/atoms";
import { Entry, Sex } from "@/lib/model";
import { cn, getBodyfatResult } from "@/lib/utils";
import { saveAs } from "file-saver";
import { useAtom } from "jotai";
import { Trash2 } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { ChangeEvent, useMemo } from "react";
import { z } from "zod";

const schema = z.array(
  z.object({
    created: z.string(),
    metric_measurement: z.object({
      sex: z.number(),
      height: z.number(),
      weight: z.number(),
      neck: z.number(),
      belly: z.number().optional(),
      waist: z.number().optional(),
      hip: z.number().optional(),
    }),
    imperial_measurement: z.object({
      sex: z.number(),
      height: z.number(),
      height_inches: z.number(),
      weight: z.number(),
      neck: z.number(),
      belly: z.number().optional(),
      waist: z.number().optional(),
      hip: z.number().optional(),
    }),
  })
);

function History() {
  const t = useTranslations("general");
  const format = useFormatter();
  const [history, setHistory] = useAtom(historyAtom);
  const [unitSystem, setUnitSystem] = useAtom(unitSystemAtom);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      e.target.files[0].text().then((x) => {
        const parsed = schema.safeParse(JSON.parse(x));

        if (!parsed.success) return;

        setHistory(parsed.data as Entry[]);

        toast({
          title: `Import successful!`,
        });
      });
    }
  };

  const downloadHistory = () => {
    const fileBlob = new Blob([JSON.stringify(history)], {
      type: "application/json",
    });
    saveAs(fileBlob, "body_history.json");
  };

  const sortedHistory = useMemo(
    () => history.sort((a, b) => Date.parse(b.created) - Date.parse(a.created)),
    [history]
  );

  const isMetricSystem = unitSystem === "metric";

  return (
    <div id="history">
      <div className="flex justify-between my-4">
        <h2 className="text-xl text-slate-100 font-semibold">{t("history")}</h2>
        <div className="mt-2 flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger aria-label="Import History">
                <Input
                  type="file"
                  id="history_upload"
                  className="hidden"
                  accept="application/JSON"
                  onChange={handleFileChange}
                />
                <Label htmlFor="history_upload" className="cursor-pointer">
                  <Icons.upload className="w-5 h-5" />
                </Label>
              </TooltipTrigger>
              <TooltipContent>
                <p>Import</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger aria-label="Download History">
                <div onClick={downloadHistory} className="cursor-pointer">
                  <Icons.download className="w-5 h-5" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Table className="hidden md:block">
        <TableCaption>{t("measurements_history")}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{t("date")}</TableHead>
            <TableHead className="whitespace-nowrap">{t("bodyfat")}</TableHead>
            <TableHead>{t("sex")}</TableHead>
            <TableHead>
              {t("height")} ({isMetricSystem ? "cm" : "foot"})
            </TableHead>
            <TableHead>
              {t("weight")} ({isMetricSystem ? "kg" : "lb"})
            </TableHead>
            <TableHead>
              {t("neck")} ({isMetricSystem ? "cm" : "in"})
            </TableHead>
            <TableHead>
              {t("belly")} ({isMetricSystem ? "cm" : "in"})
            </TableHead>
            <TableHead>
              {t("waist")} ({isMetricSystem ? "cm" : "in"})
            </TableHead>
            <TableHead>
              {t("hip")} ({isMetricSystem ? "cm" : "in"})
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-slate-200">
          {sortedHistory.map((x, i) => (
            <TableRow key={i}>
              <TableCell className="whitespace-nowrap text-slate-400">
                {format.dateTime(new Date(x.created), {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                <Badge>{getBodyfatResult(x)}</Badge>
              </TableCell>
              <TableCell>
                {x.metric_measurement.sex === Sex.FEMALE ? "👩" : "👨"}
              </TableCell>
              <TableCell>
                {isMetricSystem
                  ? x.metric_measurement.height.toFixed(1)
                  : `${x.imperial_measurement.height.toFixed(
                      0
                    )}'${x.imperial_measurement.height_inches?.toFixed(0)}"`}
              </TableCell>
              <TableCell>
                {isMetricSystem
                  ? x.metric_measurement.weight.toFixed(1)
                  : x.imperial_measurement.weight.toFixed(1)}
              </TableCell>
              <TableCell>
                {isMetricSystem
                  ? x.metric_measurement.neck.toFixed(1)
                  : x.imperial_measurement.neck.toFixed(1)}
              </TableCell>
              <TableCell>
                {isMetricSystem
                  ? x.metric_measurement.belly
                    ? x.metric_measurement.belly.toFixed(1)
                    : "-"
                  : x.imperial_measurement.belly
                  ? x.imperial_measurement.belly.toFixed(1)
                  : "-"}
              </TableCell>
              <TableCell>
                {isMetricSystem
                  ? x.metric_measurement.waist
                    ? x.metric_measurement.waist.toFixed(1)
                    : "-"
                  : x.imperial_measurement.waist
                  ? x.imperial_measurement.waist.toFixed(1)
                  : "-"}
              </TableCell>
              <TableCell>
                {isMetricSystem
                  ? x.metric_measurement.hip
                    ? x.metric_measurement.hip.toFixed(1)
                    : "-"
                  : x.imperial_measurement.hip
                  ? x.imperial_measurement.hip.toFixed(1)
                  : "-"}
              </TableCell>
              <TableCell>
                <Trash2
                  className="w-4 h-4 text-slate-100 cursor-pointer"
                  onClick={() => {
                    setHistory((x) => x.filter((v, j) => j !== i));
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col md:hidden text-sm mt-2">
        {sortedHistory.map((x, i) => (
          <div
            key={x.created}
            className={cn(
              "py-5",
              i !== sortedHistory.length - 1 && "border-b  border-slate-800"
            )}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-slate-400 text-xs">
                {format.dateTime(new Date(x.created), {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </div>
              <Trash2
                className="w-4 h-4 text-slate-100 cursor-pointer"
                onClick={() => {
                  setHistory((y) => y.filter((v, j) => j !== i));
                }}
              />
            </div>
            <div className="flex items-center gap-3 mb-2 text-sm">
              <div>{x.metric_measurement.sex === Sex.FEMALE ? "👩" : "👨"}</div>
              <Badge variant={"default"}>{getBodyfatResult(x)}%</Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 gap-x-5 sm:gap-x-16 sm:px-8 sm:grid-cols-3">
              <div className="flex items-center justify-between gap-1">
                <Badge variant={"outline"}>{t("height")}</Badge>
                <span className="font-mono text-slate-300">
                  {isMetricSystem
                    ? `${x.metric_measurement.height.toFixed(1)} cm`
                    : `${x.imperial_measurement.height.toFixed(
                        0
                      )}'${x.imperial_measurement.height_inches?.toFixed(0)}"`}
                </span>
              </div>
              <div className="flex items-center justify-between gap-1">
                <Badge variant={"outline"}>{t("weight")}</Badge>
                <span className="font-mono text-slate-300">
                  {isMetricSystem
                    ? `${x.metric_measurement.weight.toFixed(1)} kg`
                    : `${x.imperial_measurement.weight.toFixed(1)} lb`}
                </span>
              </div>
              <div className="flex items-center justify-between gap-1">
                <Badge variant={"outline"}>{t("neck")}</Badge>
                <span className="font-mono text-slate-300">
                  {isMetricSystem
                    ? `${x.metric_measurement.neck.toFixed(1)} cm`
                    : `${x.imperial_measurement.neck?.toFixed(1)} in`}
                </span>
              </div>
              {x.metric_measurement.belly ? (
                <div className="flex items-center justify-between gap-1">
                  <Badge variant={"outline"}>{t("belly")}</Badge>
                  <span className="font-mono text-slate-300 text-sm">
                    {isMetricSystem
                      ? `${x.metric_measurement.belly.toFixed(1)} cm`
                      : `${x.imperial_measurement.belly?.toFixed(1)} in`}
                  </span>
                </div>
              ) : null}
              {x.metric_measurement.waist ? (
                <div className="flex items-center justify-between gap-1">
                  <Badge variant={"outline"}>{t("waist")}</Badge>
                  <span className="font-mono text-slate-300">
                    {isMetricSystem
                      ? `${x.metric_measurement.waist.toFixed(1)} cm`
                      : `${x.imperial_measurement.waist?.toFixed(1)} in`}
                  </span>
                </div>
              ) : null}
              {x.metric_measurement.hip ? (
                <div className="flex items-center justify-between gap-1">
                  <Badge variant={"outline"}>{t("hip")}</Badge>
                  <span className="font-mono">
                    {isMetricSystem
                      ? `${x.metric_measurement.hip.toFixed(1)} cm`
                      : `${x.imperial_measurement.hip?.toFixed(1)} in`}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
