import { TaskList } from "@/components/TaskList";
import { NavBar } from "../components/NavBar";

export const HomePage = () => {
  return (
    <div className="max-w-5xl mx-auto ">
      <NavBar />
      <main className="mt-12 flex-1 w-full overflow-y-auto transition-colors duration-500 ease-in-out">
        <div className="container w-full h-full mx-auto ">
          <TaskList />
        </div>
      </main>
    </div>
  );
};
