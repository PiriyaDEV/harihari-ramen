const shortMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function getTimes(epoch) {
  const datetime = new Date(epoch);

  const hours = datetime.getHours().toString().padStart(2, 0);
  const minutes = datetime.getMinutes().toString().padStart(2, 0);
  const seconds = datetime.getSeconds().toString().padStart(2, 0);

  return `${hours}:${minutes}:${seconds}`;
}

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

