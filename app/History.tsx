"use client";

import { Entry, Sex } from "@/lib/model";
import { useEffect, useState } from "react";
import HistoryEntry from "./HistoryEntry";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

function History() {
  const [history, setHistory] = useState<Entry[]>([]);

  useEffect(() => {
    setHistory([
      {
        created: new Date(),
        measurement: {
          belly: 54,
          sex: Sex.MALE,
          height: 185,
          neck: 32,
          weight: 80.5,
        },
      },
      {
        created: new Date(),
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
            <TableHead>Height</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Neck</TableHead>
            <TableHead>Belly</TableHead>
            <TableHead>Waist</TableHead>
            <TableHead>Hip</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((x, i) => (
            <TableRow key={i}>
              <TableCell className="whitespace-nowrap">
                {formatDate(x.created)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* {history.map((x) => (
        <HistoryEntry entry={x} />
      ))} */}
    </div>
  );
}

export default History;
