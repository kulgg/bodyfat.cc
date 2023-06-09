import Link from "next/link";
import Forms from "../(form)/Forms";
import History from "../(history)/History";
import Header from "../Header";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <main className="">
      <div className="px-2 my-8 sm:my-16">
        <div className="flex justify-end gap-2">
          <Link href={"/me"}>
            <Button
              variant={"link"}
              className=" text-slate-400 hover:text-slate-200 text-sm"
            >
              {dictionary.landing.history} →
            </Button>
          </Link>
        </div>
        <Forms dictionary={dictionary.landing.forms} />
      </div>
    </main>
  );
}
