import {
  isSameMonth,
  addMonths,
  startOfMonth,
  format,
  startOfDay,
  parse,
  getDaysInMonth,
} from "date-fns";
import { Sections } from "./Next7Days";

interface RemainingMonthsProps {
  groupedTasksByDate: { [key: string]: any[] };
  currentDate: Date;
  startDate: Date;
}

function RemainingMonths({ groupedTasksByDate, currentDate, startDate }: RemainingMonthsProps) {
  const groupedTasksByDayArr = Object.entries(groupedTasksByDate);

  const next4Months = Array.from({ length: 4 }, (_, i) =>
    addMonths(startOfMonth(currentDate), i + 1)
  );

  return next4Months.map((monthDate) => {
    const tasksForMonth = groupedTasksByDayArr.filter(([date]) => {
      const parsedDate = parse(date, "yyyy-MM-dd", new Date(date));
      return isSameMonth(parsedDate, monthDate) && startOfDay(parsedDate) >= startOfDay(startDate);
    });

    const allTasksForMonth = tasksForMonth.map(([, tasks]) => tasks).flat();

    // TODO: separate section per day
    // TODO: years

    return (
      <div className="flex flex-col gap-10" key={format(monthDate, "MMMM yyyy")}>
        <Header monthDate={monthDate} startDate={startDate} />
        <div>
          <Sections tasks={allTasksForMonth} />
        </div>
      </div>
    );
  });
}

function Header({ monthDate, startDate }: { monthDate: Date; startDate: Date }) {
  return (
    <div className="flex gap-1 items-end pt-2 border-t border-neutral-800">
      <span className="text-2xl text-neutral-300 font-bold">{format(monthDate, "MMMM")}</span>
      <span className="text-2xl text-neutral-400 font-bold">
        {startDate.getDate() > 1 && isSameMonth(monthDate, startDate)
          ? `${startDate.getDate()}-${getDaysInMonth(monthDate)}`
          : ""}
      </span>
    </div>
  );
}

export default RemainingMonths;
