import { format, isTomorrow } from "date-fns";

function DateHeading({ date }: { date: Date }) {
  return (
    <div className="flex items-end gap-1">
      <span className="text-3xl font-extrabold text-neutral-300/90">{format(date, "d")}</span>
      <span className="text-md font-bold text-neutral-400/80">
        {isTomorrow(date) ? "Tomorrow" : format(date, "EEEE")}
      </span>
    </div>
  );
}

export default DateHeading;
