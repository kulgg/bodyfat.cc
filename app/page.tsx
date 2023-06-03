import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import History from "./History";

export default function Home() {
  return (
    <main className="">
      <h1 className="text-4xl font-semibold tracking-tighter">
        Body Fat Calculator
      </h1>
      <div className="my-4"></div>
      <div className="space-y-4">
        <History />
      </div>
    </main>
  );
}
