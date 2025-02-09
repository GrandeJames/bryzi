import { isSameMonth, addMonths, startOfMonth, format, startOfDay, parse } from "date-fns";
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

    return (
      <div className="flex flex-col gap-10">
        <header className="text-neutral-300 font-bold text-2xl border-t pt-2 border-neutral-800">{format(monthDate, "MMMM")}</header>
        <div>
          <Sections tasks={allTasksForMonth} />
        </div>
      </div>
    );
  });

  return <div></div>;
}

export default RemainingMonths;
