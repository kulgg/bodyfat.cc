import Link from "next/link";
import Forms from "../(form)/Forms";
import History from "../(history)/History";
import Header from "../Header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="">
      <div className="px-2 my-8 sm:my-16">
        <div className="flex justify-end gap-2">
          <Link href={"/me"}>
            <Button
              variant={"link"}
              className=" text-slate-400 hover:text-slate-200 text-sm"
            >
              My History →
            </Button>
          </Link>
        </div>
        <Forms />
      </div>
    </main>
  );
}
