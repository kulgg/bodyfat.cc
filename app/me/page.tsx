"use client";
import React from "react";
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

export default function App() {
  const [history, setHistory] = useAtom(historyAtom);

  const validDataPoints = history
    .filter((x) => getBodyfatResult(x) !== "Invalid")
    .sort((a, b) => Date.parse(a.created) - Date.parse(b.created));

  const stuff = {
    labels: validDataPoints.map((x) => formatDate(x.created)),
    datasets: [
      {
        label: "Body Fat (%)",
        data: validDataPoints.map((x) => getBodyfat(x)),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <main className="px-2 my-8 sm:my-16">
      <History />
      <div className="my-20"></div>
      <Line options={options} data={stuff} />
    </main>
  );
}
