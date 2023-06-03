"use client";

import { Entry, Sex } from "@/lib/model";
import { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState<Entry[]>([]);

  useEffect(() => {
    setHistory([
      {
        created: new Date(),
        measurement: {
          belly: 2,
          sex: Sex.MALE,
          height: 3,
          neck: 2,
          weight: 2,
        },
      },
    ]);
  }, []);

  return (
    <div>
      {history.map((x) => (
        <div key={x.created.toString()}>
          {x.created.toString()}

          <div>{x.measurement.sex === Sex.MALE ? "male" : "female"}</div>
        </div>
      ))}
    </div>
  );
}

export default History;
