import { format, isTomorrow } from "date-fns";

function DateHeading({ date }: { date: Date }) {
  return (
    <div className="flex items-end gap-1">
      <span className="text-3xl font-extrabold dark:text-neutral-300/90 text-neutral-800">{format(date, "d")}</span>
      <span className="text-md font-bold dark:text-neutral-400/80 text-neutral-400">
        {isTomorrow(date) ? "Tomorrow" : format(date, "EEEE")}
      </span>
    </div>
  );
}

export default DateHeading;
