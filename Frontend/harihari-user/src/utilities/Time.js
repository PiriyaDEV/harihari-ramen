// initial a Month name.
const shortMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// This function used to return the epoch time in the hours:minutes:second format.
export function getTimes(epoch) {
  const datetime = new Date(epoch);

  const hours = datetime.getHours().toString().padStart(2, 0);
  const minutes = datetime.getMinutes().toString().padStart(2, 0);
  const seconds = datetime.getSeconds().toString().padStart(2, 0);

  return `${hours}:${minutes}:${seconds}`;
}

// This function used to return the epoch time in the date:month:year hours:minutes:second format.
export function getDateTimes(epoch) {
  const datetime = new Date(epoch);

  const year = datetime.getFullYear();
  const month = shortMonth[datetime.getMonth()];
  const date = datetime.getDate().toString().padStart(2, 0);

  const hours = datetime.getHours().toString().padStart(2, 0);
  const minutes = datetime.getMinutes().toString().padStart(2, 0);
  const seconds = datetime.getSeconds().toString().padStart(2, 0);

  return `${date} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}

