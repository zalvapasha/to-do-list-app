/**
 * Returns a string indicating the remaining days or days late for a given due date.
 * @param {string} dueDate - The due date of the task.
 * @returns {string} A string indicating the remaining days or days late.
 */
export function getRemainingDay(dueDate) {
  const dueDateDate = new Date(dueDate);
  const currentDate = new Date();

  if (
    dueDateDate.getDate() === currentDate.getDate() &&
    dueDateDate.getMonth() === currentDate.getMonth() &&
    dueDateDate.getFullYear() === currentDate.getFullYear()
  ) {
    return "Today";
  }

  const differenceInMs = dueDateDate.getTime() - currentDate.getTime();
  if (differenceInMs < 0) {
    const remainingDays = Math.ceil(
      Math.abs(differenceInMs) / (1000 * 60 * 60 * 24)
    );
    return `Overdue by ${remainingDays} days`;
  } else {
    const daysLate = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    return `Due in ${daysLate} days`;
  }
}
