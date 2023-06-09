"use client";
import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useAtom } from "jotai";
import { historyAtom } from "@/lib/atoms";
import { formatDate, getBodyfat, getBodyfatResult } from "@/lib/utils";
import History from "../(history)/History";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { FormsDictionary } from "../(form)/Forms";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        color: "#94a3b8",
        font: { size: 13 },
      },
    },
    x: {
      ticks: {
        color: "#94a3b8",
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "#f1f5f9",
      },
    },
    title: {
      display: false,
      text: "",
    },
  },
};

export default function Chart({ dictionary }: { dictionary: FormsDictionary }) {
  const [history, setHistory] = useAtom(historyAtom);

  const validDataPoints = useMemo(
    () =>
      history
        .filter((x) => getBodyfatResult(x) !== "Invalid")
        .sort((a, b) => Date.parse(a.created) - Date.parse(b.created)),
    [history]
  );

  const stuff = {
    labels: validDataPoints.map((x) => formatDate(x.created)),
    datasets: [
      {
        label: dictionary.bodyfat,
        data: validDataPoints.map((x) => getBodyfat(x)),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      {history.length > 0 ? <Line options={options} data={stuff} /> : null}
    </div>
  );
}
