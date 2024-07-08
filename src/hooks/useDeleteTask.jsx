import { useCallback } from "react";

const useDeleteTask = () => {
  /**
   * Deletes a task by its ID.
   * @param {string} taskId - The ID of the task to be deleted.
   */
  const deleteTask = useCallback((taskId) => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = storedTasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    window.location.reload();
  }, []);

  return { deleteTask };
};

export default useDeleteTask;
