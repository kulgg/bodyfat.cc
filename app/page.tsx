import Link from "next/link";
import Forms from "./(form)/Forms";
import History from "./(history)/History";
import Header from "./Header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="">
      <div className="px-2 my-8 sm:my-16">
        <Forms />
        <Link href={"/me"}>
          <Button variant={"outline"} size="default" className="w-full">
            My History →
          </Button>
        </Link>
      </div>
    </main>
  );
}
