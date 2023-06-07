import Forms from "./(form)/Forms";
import History from "./(history)/History";
import Header from "./Header";

export default function Home() {
  return (
    <main className="">
      <Header />
      <div className="px-2 space-y-32 sm:space-y-40 max-w-[800px] mx-auto my-8 sm:my-16">
        <div>
          <Forms />
        </div>
        <History />
      </div>
    </main>
  );
}
