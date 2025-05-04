export function toExtendedLocalISOString(date: Date = new Date()): string {
  const pad = (n: number, z: number = 2): string =>
    n.toString().padStart(z, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());

  const milliseconds = date.getMilliseconds();
  const subSecond = pad(milliseconds, 3) + "0000";

  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const offsetHours = pad(Math.floor(Math.abs(offsetMinutes) / 60));
  const offsetMins = pad(Math.abs(offsetMinutes) % 60);

  return `${year}-${month}-${day}T${hour}:${minute}:${second}.${subSecond}${sign}${offsetHours}:${offsetMins}`;
}
