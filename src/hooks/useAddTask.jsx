import { useEffect } from "react";

/**
 * Custom hook that adds a task to local storage and reloads the page.
 */
const useAddTask = () => {
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
   * Adds a new task to local storage and reloads the page.
   * @param {Object} newTask - The new task object to be added.
   */
  const addTask = (newTask) => {
    // Retrieve existing tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Update localStorage with the updated tasks
    localStorage.setItem("tasks", JSON.stringify([...storedTasks, newTask]));

    // Reload the page to update the task list
    window.location.reload();
  };

  return { addTask };
};

export default useAddTask;
