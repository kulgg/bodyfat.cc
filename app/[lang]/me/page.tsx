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
import History from "../(history)/History";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import Chart from "./Chart";

export default async function App({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);

  return (
    <main className="px-2 my-8 sm:my-16">
      <History dictionary={dictionary} />
      <div className="my-20"></div>
      <Chart dictionary={dictionary} />
    </main>
  );
}
