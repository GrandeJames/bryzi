import { format, parse, isValid } from "date-fns";

export function formatCustomDate(dateString?: string) {
  if (!dateString || dateString === "0000-00-00") {
    return null;
  }

  const date = parse(dateString, "yyyy-MM-dd", new Date());

  if (!isValid(date)) {
    return null;
  }

  const currentYear = new Date().getFullYear();
  const dateYear = date.getFullYear();

  return dateYear === currentYear ? format(date, "MMM d") : format(date, "MMM d, yyyy");
}

export function getCurrentDate() {
  if (process.env.NODE_ENV === "development") {
    return new Date(2023, 7, 28);
  }
  return new Date();
}
