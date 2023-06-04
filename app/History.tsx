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

const historyAtom = atomWithStorage<Entry[]>("history", []);

function History() {
  const [history, setHistory] = useAtom(historyAtom);
  // const [history, setHistory] = useState<Entry[]>([]);

  useEffect(() => {
    setHistory((x) => [
      ...x,
      {
        created: new Date().toISOString(),
        measurement: {
          belly: 80.5,
          sex: Sex.MALE,
          height: 188,
          neck: 36.5,
          weight: 90.5,
        },
      },
      {
        created: new Date().toISOString(),
        measurement: {
          sex: Sex.FEMALE,
          height: 185,
          weight: 60,
          neck: 32,
          waist: 50,
          hip: 51,
        },
      },
    ]);
  }, []);

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
              <TableCell>{x.measurement.height}</TableCell>
              <TableCell>{x.measurement.weight}</TableCell>
              <TableCell>{x.measurement.neck}</TableCell>
              <TableCell>
                {x.measurement.belly ? x.measurement.belly : "-"}
              </TableCell>
              <TableCell>
                {x.measurement.waist ? x.measurement.waist : "-"}
              </TableCell>
              <TableCell>
                {x.measurement.hip ? x.measurement.hip : "-"}
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
