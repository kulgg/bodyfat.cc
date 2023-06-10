import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Chart from "./Chart";
import History from "./History";

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
