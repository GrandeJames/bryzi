import { format } from "date-fns";

function SecondaryDateHeading({ date }: { date: Date }) {
  return (
    <div className="flex items-baseline gap-1">
      <span className="dark:text-neutral-300 text-neutral-800 font-bold text-md">
        {format(date, "MMM d")}
      </span>
      <span className="text-neutral-500 text-xs">{format(date, "EE")}</span>
    </div>
  );
}

export default SecondaryDateHeading;
