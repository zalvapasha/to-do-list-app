import useDeleteTask from "./useDeleteTask";
import { getCurrentDate } from "@/utils/getCurrentDate";

/**
 * Custom hook to handle completing a task
 * @returns {object} - Object with `addCompleteTask` function
 */

const useCompleteTask = () => {
  const { deleteTask } = useDeleteTask();

  /**
   * Add a task to the complete tasks list
   * @param {object} task - The task to be completed
   */

  const addCompleteTask = (task) => {
    const completedTask = {
      ...task,
      status: "Complete",
      dueDate: getCurrentDate(),
    };

    const storedCompleteTasks =
      JSON.parse(localStorage.getItem("complete")) || [];

    localStorage.setItem(
      "complete",
      JSON.stringify([...storedCompleteTasks, completedTask])
    );

    deleteTask(task.id);
  };

  return { addCompleteTask };
};

export default useCompleteTask;
