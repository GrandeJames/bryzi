import { format } from "date-fns";

function DateHeading() {
  const today = new Date();

  const day = format(today, "EEEE");
  const monthAndDay = format(today, "MMM d");

  return (
    <div className="flex items-end gap-2">
      <span className="text-3xl font-bold text-neutral-300">{day}</span>
      <span className="text-xl font-bold text-neutral-500">{monthAndDay}</span>
    </div>
  );
}

export default DateHeading;
