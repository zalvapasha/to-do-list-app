/**
 * Get the current date in the format "YYYY-MM-DD".
 *
 * @returns {string} The formatted date.
 */
export function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  // Months are zero-based, so add 1
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  // "YYYY-MM-DD" format
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  return formattedDate;
}
