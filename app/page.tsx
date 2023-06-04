import Forms from "./Forms";
import Header from "./Header";
import History from "./History";

export default function Home() {
  return (
    <main className="px-2">
      <Header />
      <div className="space-y-32 sm:space-y-40">
        <div>
          <Forms />
        </div>
        <div id="history">
          <h2 className="text-xl text-slate-100 font-semibold my-4">History</h2>
          <History />
        </div>
      </div>
    </main>
  );
}
