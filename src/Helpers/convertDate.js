export function convertDate(inputDate) {
  let str = String(inputDate);
  const date = new Date(str);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours() % 12 || 12).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  const formattedDate = `${day}/${month}/${year} at ${hours}:${minutes} ${ampm}`;

  return formattedDate;
}
