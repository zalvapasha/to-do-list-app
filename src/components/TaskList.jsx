import { useState, useMemo } from "react";

import { TaskCard } from "./TaskCard";
import useGetTask from "../hooks/useGetTask";
import { getCurrentDate } from "@/utils/getCurrentDate";

export const TaskList = () => {
  const { tasks } = useGetTask();

  const [todayTasks, setTodayTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [dueTasks, setDueTasks] = useState([]);

  useMemo(() => {
    const today = getCurrentDate();
    const upcoming = tasks.filter((task) => {
      task.dueDate > today;
    });
    const due = tasks.filter((task) => {
      task.dueDate < today;
    });

    console.log("Today Tasks:", todayTasks);
    console.log("Upcoming Tasks:", upcomingTasks);
    console.log("Due Tasks:", dueTasks);

    setTodayTasks(tasks.filter((task) => task.dueDate === today));
    setUpcomingTasks(upcoming);
    setDueTasks(due);
  }, [tasks]);

  const renderNoTasks = () => {
    if (
      todayTasks.length === 0 &&
      upcomingTasks.length === 0 &&
      dueTasks.length === 0
    ) {
      return (
        <div className="text-center">
          <p>No tasks yet</p>
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

      {renderNoTasks()}
    </section>
  );
};
