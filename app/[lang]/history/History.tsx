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
import { Entry, LocaleDictionary, Sex } from "@/lib/model";
import { formatDate, getBodyfatResult } from "@/lib/utils";
import { saveAs } from "file-saver";
import { useAtom } from "jotai";
import { Trash2 } from "lucide-react";
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

function History({ dictionary }: { dictionary: LocaleDictionary }) {
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
        <h2 className="text-xl text-slate-100 font-semibold">
          {dictionary.general.history}
        </h2>
        <div className="mt-2 flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
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
              <TooltipTrigger>
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
        <TableCaption>{dictionary.general.measurements_history}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{dictionary.general.date}</TableHead>
            <TableHead className="whitespace-nowrap">
              {dictionary.general.bodyfat}
            </TableHead>
            <TableHead>{dictionary.general.sex}</TableHead>
            <TableHead>
              {dictionary.general.height} ({isMetricSystem ? "cm" : "foot"})
            </TableHead>
            <TableHead>
              {dictionary.general.weight} ({isMetricSystem ? "kg" : "lb"})
            </TableHead>
            <TableHead>
              {dictionary.general.neck} ({isMetricSystem ? "cm" : "in"})
            </TableHead>
            <TableHead>
              {dictionary.general.belly} ({isMetricSystem ? "cm" : "in"})
            </TableHead>
            <TableHead>
              {dictionary.general.waist} ({isMetricSystem ? "cm" : "in"})
            </TableHead>
            <TableHead>
              {dictionary.general.hip} ({isMetricSystem ? "cm" : "in"})
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-slate-200">
          {sortedHistory.map((x, i) => (
            <TableRow key={i}>
              <TableCell className="whitespace-nowrap text-slate-400">
                {formatDate(x.created)}
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
      <div className="flex flex-col gap-10 md:hidden font-mono text-sm">
        {sortedHistory.map((x, i) => (
          <div key={x.created}>
            <div className="flex justify-between items-center mb-2">
              <div className="text-slate-400">{formatDate(x.created)}</div>
              <Trash2
                className="w-4 h-4 text-slate-100 cursor-pointer"
                onClick={() => {
                  setHistory((y) => y.filter((v, j) => j !== i));
                }}
              />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div>{x.metric_measurement.sex === Sex.FEMALE ? "👩" : "👨"}</div>
              <Badge variant={"default"}>{getBodyfatResult(x)}%</Badge>
            </div>
            <div className="flex items-center gap-5">
              <div className="">
                Height:{" "}
                {isMetricSystem
                  ? `${x.metric_measurement.height.toFixed(1)} cm`
                  : `${x.imperial_measurement.height.toFixed(
                      0
                    )}'${x.imperial_measurement.height_inches?.toFixed(0)}"`}
              </div>
              <div className="">
                Weight:{" "}
                <span className="text-sm">
                  {isMetricSystem
                    ? `${x.metric_measurement.weight.toFixed(1)} kg`
                    : `${x.imperial_measurement.weight.toFixed(1)} lb`}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div>
                Neck:{" "}
                {isMetricSystem
                  ? `${x.metric_measurement.neck.toFixed(1)} cm`
                  : `${x.metric_measurement.neck?.toFixed(1)} in`}
              </div>
              {x.metric_measurement.belly ? (
                <div>
                  Belly:{" "}
                  {isMetricSystem
                    ? `${x.metric_measurement.belly.toFixed(1)} cm`
                    : `${x.metric_measurement.belly.toFixed(1)} in`}
                </div>
              ) : null}
              {x.metric_measurement.waist ? (
                <div>
                  Waist:{" "}
                  {isMetricSystem
                    ? `${x.metric_measurement.waist.toFixed(1)} cm`
                    : `${x.metric_measurement.waist.toFixed(1)} in`}
                </div>
              ) : null}
              {x.metric_measurement.hip ? (
                <div>
                  Hip:{" "}
                  {isMetricSystem
                    ? `${x.metric_measurement.hip.toFixed(1)} cm`
                    : `${x.metric_measurement.hip.toFixed(1)} in`}
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
