import { useState, useEffect } from "react";

import { TaskCard } from "./TaskCard";
import useGetTask from "../hooks/useGetTask";
import { getCurrentDate } from "@/utils/getCurrentDate";
import useGetCompleteTask from "../hooks/useGetCompleteTask";

export const TaskList = () => {
  const { tasks } = useGetTask();
  const { completeTasks } = useGetCompleteTask();

  const [todayTasks, setTodayTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [dueTasks, setDueTasks] = useState([]);

  useEffect(() => {
    const today = getCurrentDate();

    const todayTasks = tasks.filter((task) => task.dueDate === today);
    const upcomingTasks = tasks.filter((task) => task.dueDate > today);
    const dueTasks = tasks.filter((task) => task.dueDate < today);

    setTodayTasks(todayTasks);
    setUpcomingTasks(upcomingTasks);
    setDueTasks(dueTasks);
  }, [tasks]);

  const renderNoTasks = () => {
    if (
      todayTasks.length === 0 &&
      upcomingTasks.length === 0 &&
      dueTasks.length === 0 &&
      completeTasks.length === 0
    ) {
      return (
        <div className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <p className="text-lg text-center font-light">
            No worries, you don't have any tasks.
          </p>
        </div>
      );
    }
  };

  return (
    <section className="grid gap-3 py-10 md:grid-cols-2 lg:grid-cols-3 md:mx-0 ">
      {todayTasks.length > 0 && (
        <TaskCard taskType="Today" taskData={todayTasks} />
      )}
      {upcomingTasks.length > 0 && (
        <TaskCard taskType="Upcoming" taskData={upcomingTasks} />
      )}
      {dueTasks.length > 0 && <TaskCard taskType="Due" taskData={dueTasks} />}
      {completeTasks.length > 0 && (
        <TaskCard taskType="Complete" taskData={completeTasks} />
      )}
      {renderNoTasks()}
    </section>
  );
};
