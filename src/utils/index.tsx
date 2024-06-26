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

export function validateAddress(address: string) {
  const regex = /^0x[0-9a-fA-F]{40}$/;
  return regex.test(address);
}
/**
 *
 * @param timestamp i.e. "MON NOV 13 2023 22:31:35 GMT+0800 (GMT+08:00)"
 */
export function convertDatetimeString(timestamp: string) {
  const date = new Date(timestamp);

  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return formattedDate;
}
