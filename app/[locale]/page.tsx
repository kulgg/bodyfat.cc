"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import Forms from "./(form)/Forms";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations();

  return (
    <main className="">
      <div className="px-5 lg:px-0 my-8 sm:my-16">
        <div className="flex justify-between">
          <h1 className="text-lg md:text-xl my-3 bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-100 via-green-200 to-rose-500 bg-clip-text text-transparent">
            <Balancer>{t("title")}</Balancer>
          </h1>
          <Link href={"/history"} className="mt-[6px]">
            <Button
              variant={"link"}
              className=" text-slate-400 hover:text-slate-200 text-sm"
            >
              {t("general.history")} →
            </Button>
          </Link>
        </div>
        <Forms />
      </div>
    </main>
  );
}
