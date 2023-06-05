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
import { Sex } from "@/lib/model";
import { formatDate, getBodyfatResult } from "@/lib/utils";
import { useMemo } from "react";

import { useAtom } from "jotai";

import { Badge } from "@/components/ui/badge";
import { toFeet, toInches, toPounds } from "@/lib/units";
import { Trash2 } from "lucide-react";
import { historyAtom } from "@/lib/atoms";

function ImperialHistory() {
  const [history, setHistory] = useAtom(historyAtom);

  const sortedHistory = useMemo(
    () =>
      history
        .sort((a, b) => Date.parse(b.created) - Date.parse(a.created))
        .map((x) => {
          const is_metric =
            x.measurement.height_inches === undefined ||
            x.measurement.height_inches === null;

          if (!is_metric) {
            return { ...x, bodyfat: getBodyfatResult(x, is_metric) };
          }

          const heightFoot = toFeet(x.measurement.height);

          return {
            created: x.created,
            bodyfat: getBodyfatResult(x, is_metric),
            measurement: {
              sex: x.measurement.sex,
              height: heightFoot[0],
              height_inches: heightFoot[1],
              weight: toPounds(x.measurement.weight),
              neck: toInches(x.measurement.neck),
              belly: x.measurement.belly ? toInches(x.measurement.belly) : null,
              waist: x.measurement.waist ? toInches(x.measurement.waist) : null,
              hip: x.measurement.hip ? toInches(x.measurement.hip) : null,
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
            <TableHead>Height (f)</TableHead>
            <TableHead>Weight (lb)</TableHead>
            <TableHead>Neck (in)</TableHead>
            <TableHead>Belly (in)</TableHead>
            <TableHead>Waist (in)</TableHead>
            <TableHead>Hip (in)</TableHead>
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
              <TableCell>{`${x.measurement.height.toFixed(0)}'${
                x.measurement.height_inches
              }"`}</TableCell>
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

export default ImperialHistory;
