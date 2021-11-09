export function getTimes(epoch) {
  const datetime = new Date(epoch);

  const hours = datetime.getHours().toString().padStart(2, 0);
  const minutes = datetime.getMinutes().toString().padStart(2, 0);
  const seconds = datetime.getSeconds().toString().padStart(2, 0);

  return `${hours}:${minutes}:${seconds}`;
}


