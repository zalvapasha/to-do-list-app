import { useEffect, useState } from "react";

const useGetCompleteTask = () => {
  const [completeTasks, setCompleteTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("complete");
    if (storedTasks) {
      setCompleteTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    console.log("Tasks retrieved:", completeTasks);
  }, [completeTasks]);

  return { completeTasks };
};

export default useGetCompleteTask;
