import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { About } from "./About";
import UnitSystemSwitch from "./UnitSystemSwitch";

export interface HeaderDictionary {
  metric: string;
  imperial: string;
  about: {
    formula: {
      title: string;
      description: string;
    };
    privacy: {
      title: string;
      description: string;
    };
    accuracy: {
      title: string;
      description: string;
    };
    free: {
      title: string;
      description: string;
    };
    opensource: {
      title: string;
      description: string;
    };
  };
}

function Header({ dictionary }: { dictionary: HeaderDictionary }) {
  return (
    <header className="h-16 border-b border-b-slate-800 flex flex-col justify-center max-w-4xl mx-auto px-1">
      <div className="justify-between flex items-center">
        <Link href={"/"}>
          <h1 className="text-3xl font-display">bodyfat.io</h1>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <UnitSystemSwitch dictionary={dictionary} />
          <About dictionary={dictionary} />
          <a href="https://github.com/kulgg/bodyfat.io" target="_blank">
            <Icons.gitHub className="w-5 h-5" />
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
