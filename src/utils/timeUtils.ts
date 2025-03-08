import { format, parse } from "date-fns";

export function formatTime(timeString?: string) {
  if (!timeString) {
    return "";
  }
  const time = parse(timeString, "HH:mm", new Date());
  return format(time, "h:mm a"); // Formats to "h:mm AM/PM"
}
