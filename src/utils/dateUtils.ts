import { format, parse } from "date-fns";

export function formatCustomDate(dateString: string) {
  const date = parse(dateString, "yyyy-MM-dd", new Date());
  const currentYear = new Date().getFullYear();
  const dateYear = date.getFullYear();

  return dateYear === currentYear ? format(date, "MMM d") : format(date, "MMM d, yyyy");
}
