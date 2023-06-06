"use client";
import { useAtom } from "jotai";
import ImperialHistory from "./ImperialHistory";
import MetricHistory from "./MetricHistory";
import { historyAtom, unitSystemAtom } from "@/lib/atoms";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sex } from "@/lib/model";
import { formatDate, getBodyfatResult } from "@/lib/utils";
import { Badge, Trash2 } from "lucide-react";
import { useMemo } from "react";

function History() {
  const [history, setHistory] = useAtom(historyAtom);
  const [unitSystem, setUnitSystem] = useAtom(unitSystemAtom);

  const sortedHistory = useMemo(
    () => history.sort((a, b) => Date.parse(b.created) - Date.parse(a.created)),
    [history]
  );

  const isMetricSystem = unitSystem === "metric";

  return (
    <div id="history">
      <h2 className="text-xl text-slate-100 font-semibold my-4">History</h2>
      <Table>
        <TableCaption>Measurements History.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead className="whitespace-nowrap">Bodyfat (%)</TableHead>
            <TableHead>Sex</TableHead>
            <TableHead>Height ({isMetricSystem ? "cm" : "foot"})</TableHead>
            <TableHead>Weight ({isMetricSystem ? "kg" : "lb"})</TableHead>
            <TableHead>Neck ({isMetricSystem ? "cm" : "in"})</TableHead>
            <TableHead>Belly ({isMetricSystem ? "cm" : "in"})</TableHead>
            <TableHead>Waist ({isMetricSystem ? "cm" : "in"})</TableHead>
            <TableHead>Hip ({isMetricSystem ? "cm" : "in"})</TableHead>
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
                  ? x.metric_measurement.height
                  : `${x.imperial_measurement.height.toFixed(0)}'${
                      x.imperial_measurement.height_inches
                    }"`}
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
    </div>
  );
}

export default History;
