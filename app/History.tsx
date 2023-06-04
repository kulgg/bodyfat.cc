"use client";

import { Entry, Sex } from "@/lib/model";
import { useEffect, useState } from "react";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { formatDate, getBodyfatResult } from "@/lib/utils";

import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";

import { Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const historyAtom = atomWithStorage<Entry[]>("history", []);

function History() {
  const [history, setHistory] = useAtom(historyAtom);

  return (
    <div>
      <Table>
        <TableCaption>Measurements History.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>BF%</TableHead>
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
        <TableBody>
          {history.map((x, i) => (
            <TableRow key={i}>
              <TableCell className="whitespace-nowrap">
                {formatDate(x.created)}
              </TableCell>
              <TableCell>{getBodyfatResult(x)}</TableCell>
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

export default History;
