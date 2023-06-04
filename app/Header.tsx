import { Icons } from "@/components/ui/icons";
import React from "react";

function Header() {
  return (
    <header className="h-16 mb-8 sm:mb-16 flex flex-col justify-center">
      <div className="justify-between flex items-center">
        <h1 className="text-3xl font-display">bodyfat.io</h1>
        <nav className="">
          <a href="https://github.com/kulgg/bodyfat" target="_blank">
            <Icons.gitHub className="w-5 h-5" />
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
