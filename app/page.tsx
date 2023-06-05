import Forms from "./(form)/Forms";
import Header from "./Header";
import History from "./(history)/History";

export default function Home() {
  return (
    <main className="px-2">
      <Header />
      <div className="space-y-32 sm:space-y-40">
        <div>
          <Forms />
        </div>
        <History />
      </div>
    </main>
  );
}
