import { Icons } from "@/components/ui/icons";
import { LocaleDictionary } from "@/lib/model";
import Link from "next/link";
import { About } from "./About";
import UnitSystemSwitch from "./UnitSystemSwitch";

function Header() {
  return (
    <header className="h-12 md:h-16 border-b border-b-slate-800 flex flex-col justify-center max-w-4xl mx-auto px-4 lg:px-0">
      <div className="justify-between flex items-center">
        <Link href={"/"}>
          <h1 className="text-2xl text-[26px] md:text-3xl font-display">
            bodyfat.cc
          </h1>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-4">
          <UnitSystemSwitch />
          <About />
          <a
            href="https://github.com/kulgg/bodyfat.cc"
            target="_blank"
            aria-label="bodyfat.cc GitHub"
          >
            <Icons.gitHub className="w-5 h-5" />
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
