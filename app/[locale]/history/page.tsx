import { Metadata } from "next";
import Chart from "./Chart";
import History from "./History";

export const metadata: Metadata = {
  title: "History",
};

export default async function App({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <main className="px-5 lg:px-0 my-8 sm:my-16">
      <History />
      <div className="my-12 md:my-20"></div>
      <Chart />
    </main>
  );
}
