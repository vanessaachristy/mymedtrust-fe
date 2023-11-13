export function getCurrentDateTime() {
  const currentDateTime = new Date();

  // Get year, month, day, hours, and minutes
  const year = currentDateTime.getFullYear();
  const month = String(currentDateTime.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(currentDateTime.getDate()).padStart(2, "0");
  const hours = String(currentDateTime.getHours()).padStart(2, "0");
  const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");

  // Format the date and time as 'YYYY-MM-DD HH:mm'
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDateTime;
}
