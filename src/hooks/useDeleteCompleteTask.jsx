import { useEffect } from "react";

const useDeleteCompleteTask = () => {
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (!storedTasks) {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
  }, []);

  /**
   * Deletes a completed task from local storage
   * @param {string} taskId - The ID of the task to delete
   */
  const deleteCompleteTask = (taskId) => {
    // Retrieve existing tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem("complete")) || [];

    // Filter out the task with the specified ID
    const updatedTasks = storedTasks.filter((task) => task.id !== taskId);

    // Update localStorage with the updated tasks
    localStorage.setItem("complete", JSON.stringify(updatedTasks));

    // Reload the page to update the task list
    window.location.reload();
  };

  return { deleteCompleteTask };
};

export default useDeleteCompleteTask;
