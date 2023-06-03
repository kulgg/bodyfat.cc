"use client";

import { Entry, Sex } from "@/lib/model";
import { useEffect, useState } from "react";
import HistoryEntry from "./HistoryEntry";

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
      {history.map((x) => (
        <HistoryEntry entry={x} key={x.created.getUTCMilliseconds()} />
      ))}
    </div>
  );
}

export default History;
