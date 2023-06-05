"use client";
import { useAtom } from "jotai";
import ImperialHistory from "./ImperialHistory";
import MetricHistory from "./MetricHistory";
import { unitSystemAtom } from "./UnitSystemSwitch";

function History() {
  const [unitSystem, setUnitSystem] = useAtom(unitSystemAtom);

  return (
    <div id="history">
      <h2 className="text-xl text-slate-100 font-semibold my-4">History</h2>
      {unitSystem === "metric" ? <MetricHistory /> : <ImperialHistory />}
    </div>
  );
}

export default History;
