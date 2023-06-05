import { Icons } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import React from "react";
import UnitSystemSwitch from "./UnitSystemSwitch";

function Header() {
  return (
    <header className="h-16 mb-8 sm:mb-16 flex flex-col justify-center">
      <div className="justify-between flex items-center">
        <Link href={"/"}>
          <h1 className="text-3xl font-display">bodyfat.io</h1>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <UnitSystemSwitch />
          <a href="https://github.com/kulgg/bodyfat.io" target="_blank">
            <Icons.gitHub className="w-5 h-5" />
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
