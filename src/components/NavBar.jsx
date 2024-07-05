import { AddTaskButton } from "./AddTaskButton";
import { ChangeMode } from "./ChangeMode";
export const NavBar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="flex justify-end h-14 items-center">
          <div className="flex items-center gap-4">
            <AddTaskButton className="justify-end" />
            <ChangeMode />
          </div>
        </div>
      </div>
    </nav>
  );
};
