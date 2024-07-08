import { AddTaskButton } from "./AddTaskButton";
import { ChangeMode } from "./ChangeMode";

import logo from "../assets/ease.svg";

export const NavBar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white border-b-[1px] dark:bg-neutral-950">
      <div className="flex flex-row justify-between  w-full max-w-5xl mx-auto px-4">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/zalvapasha/to-do-list-app"
          className="flex items-center"
        >
          <img src={logo} className="w-8 h-8" />
          <h1 className="text-xl font-bold italic text-blue-500">ase</h1>
        </a>
        <div className="flex h-14 items-center">
          <div className="flex items-center gap-4">
            <AddTaskButton />
            <ChangeMode />
          </div>
        </div>
      </div>
    </nav>
  );
};
