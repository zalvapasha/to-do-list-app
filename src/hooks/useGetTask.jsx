import { useEffect, useState } from "react";

const useGetTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    console.log("Tasks retrieved:", tasks);
  }, [tasks]);

  return { tasks };
};

export default useGetTask;
