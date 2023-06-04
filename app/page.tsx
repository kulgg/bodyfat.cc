import Forms from "./Forms";
import History from "./History";

export default function Home() {
  return (
    <main className="">
      <h1 className="text-4xl font-semibold tracking-tighter">bodyfat.io</h1>
      <div className="my-8"></div>
      <div className="space-y-20 px-2">
        <Forms />
        <div>
          <h2 className="text-xl text-slate-100 font-semibold my-2">
            Measurements history
          </h2>
          <History />
        </div>
      </div>
    </main>
  );
}
