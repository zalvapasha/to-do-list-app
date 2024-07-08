import { useEffect } from "react";

/**
 * Custom hook that updates tasks in local storage.
 */
const useUpdateTask = () => {
  /**
   * Checks if there are stored tasks in local storage. If not, initializes an empty array of tasks.
   */
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (!storedTasks) {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
  }, []);

  /**
   * Updates an existing task in local storage.
   * @param {string} taskId - The ID of the task to be updated.
   * @param {Object} updatedTask - The updated task object.
   */
  const updateTask = (taskId, updatedTask) => {
    // Retrieve existing tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Find the index of the task to be updated
    const taskIndex = storedTasks.findIndex((task) => task.id === taskId);

    // If the task is found, update it; otherwise, do nothing
    if (taskIndex !== -1) {
      storedTasks[taskIndex] = { ...storedTasks[taskIndex], ...updatedTask };

      // Update localStorage with the updated tasks
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
      window.location.reload();
    }
  };

  return { updateTask };
};

export default useUpdateTask;
