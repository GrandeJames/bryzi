import { format } from "date-fns";

function SecondaryDateHeading({ date }: { date: Date }) {
  return (
    <div className="flex items-end gap-1 text-md font-bold">
      <span className="text-neutral-300">{format(date, "MMM d")}</span>
      <span className="text-neutral-400">{format(date, "EEEE")}</span>
    </div>
  );
}

export default SecondaryDateHeading;
