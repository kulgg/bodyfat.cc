"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Entry, Sex } from "@/lib/model";
import { formatDate, getBodyfatResult } from "@/lib/utils";
import { useMemo } from "react";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { Badge } from "@/components/ui/badge";
import { footToCm, inchesToCm, poundsToKg } from "@/lib/units";
import { Trash2 } from "lucide-react";

export const historyAtom = atomWithStorage<Entry[]>("history", []);

function MetricHistory() {
  const [history, setHistory] = useAtom(historyAtom);

  const sortedHistory = useMemo(
    () =>
      history
        .sort((a, b) => Date.parse(b.created) - Date.parse(a.created))
        .map((x) => {
          const is_metric =
            x.measurement.height_inches === undefined ||
            x.measurement.height_inches === null;

          if (is_metric) {
            return { ...x, bodyfat: getBodyfatResult(x, is_metric) };
          }

          return {
            created: x.created,
            bodyfat: getBodyfatResult(x, is_metric),
            measurement: {
              sex: x.measurement.sex,
              height: footToCm(
                x.measurement.height,
                x.measurement.height_inches!
              ),
              weight: poundsToKg(x.measurement.weight),
              neck: inchesToCm(x.measurement.neck),
              belly: x.measurement.belly
                ? inchesToCm(x.measurement.belly)
                : null,
              waist: x.measurement.waist
                ? inchesToCm(x.measurement.waist)
                : null,
              hip: x.measurement.hip ? inchesToCm(x.measurement.hip) : null,
            },
          };
        }),
    [history]
  );

  return (
    <div>
      <Table>
        <TableCaption>Measurements History.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead className="whitespace-nowrap">Bodyfat (%)</TableHead>
            <TableHead>Sex</TableHead>
            <TableHead>Height (cm)</TableHead>
            <TableHead>Weight (kg)</TableHead>
            <TableHead>Neck (cm)</TableHead>
            <TableHead>Belly (cm)</TableHead>
            <TableHead>Waist (cm)</TableHead>
            <TableHead>Hip (cm)</TableHead>
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
                <Badge>{x.bodyfat}</Badge>
              </TableCell>
              <TableCell>
                {x.measurement.sex === Sex.FEMALE ? "👩" : "👨"}
              </TableCell>
              <TableCell>{x.measurement.height.toFixed(1)}</TableCell>
              <TableCell>{x.measurement.weight.toFixed(1)}</TableCell>
              <TableCell>{x.measurement.neck.toFixed(1)}</TableCell>
              <TableCell>
                {x.measurement.belly ? x.measurement.belly.toFixed(1) : "-"}
              </TableCell>
              <TableCell>
                {x.measurement.waist ? x.measurement.waist.toFixed(1) : "-"}
              </TableCell>
              <TableCell>
                {x.measurement.hip ? x.measurement.hip.toFixed(1) : "-"}
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

export default MetricHistory;
