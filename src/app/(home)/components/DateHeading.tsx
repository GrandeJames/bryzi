import { format } from "date-fns";

function DateHeading({ date }: { date: Date }) {
  const dayOfWeek = format(date, "EEEE");
  // const monthAndDay = format(date, "MMM d");
  const day = format(date, "d");

  return (
    <div className="flex items-end gap-1">
      <span className="text-3xl font-extrabold text-neutral-300/90">{day}</span>
      <span className="text-xl font-bold text-neutral-400/80">{dayOfWeek}</span>
    </div>
  );
}

export default DateHeading;
