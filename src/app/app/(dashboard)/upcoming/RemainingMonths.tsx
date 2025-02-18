import {
  isSameMonth,
  addMonths,
  startOfMonth,
  format,
  startOfDay,
  parse,
  getDaysInMonth,
  parseISO,
} from "date-fns";
import { Sections } from "./Next7Days";
import { ClassTask } from "@/types/classTask";
import { PersonalTask } from "@/types/personalTask";

import groupBy from "@/utils/groupBy";
import SecondaryDateHeading from "../components/SecondayDateHeading";

interface RemainingMonthsProps {
  groupedTasksByDate: { [key: string]: any[] };
  currentDate: Date;
  startDate: Date;
}

function RemainingMonths({ groupedTasksByDate, currentDate, startDate }: RemainingMonthsProps) {
  const groupedTasksByDayArr = Object.entries(groupedTasksByDate);

  const isCurrentMonth = isSameMonth(currentDate, startDate);

  const remainingDaysOfCurrentMonth = isCurrentMonth
    ? Array.from({ length: getDaysInMonth(currentDate) - startDate.getDate() + 1 }, (_, i) => {
        const date = new Date(currentDate);
        date.setDate(startDate.getDate() + i);
        return date;
      })
    : [];

  const next4Months = Array.from({ length: 4 }, (_, i) =>
    addMonths(startOfMonth(currentDate), i + 1)
  );

  // Combine remaining days of the current month with the next 4 months
  const allMonths = [...(isCurrentMonth ? [currentDate] : []), ...next4Months];

  return allMonths.map((monthDate) => {
    const tasksForMonth = groupedTasksByDayArr.filter(([date]) => {
      const parsedDate = parse(date, "yyyy-MM-dd", new Date(date));
      return isSameMonth(parsedDate, monthDate) && startOfDay(parsedDate) >= startOfDay(startDate);
    });

    const allTasksForMonth: (ClassTask | PersonalTask)[] = tasksForMonth
      .map(([, tasks]) => tasks)
      .flat();

    // TODO: years

    const groupedByDate: { [key: string]: (ClassTask | PersonalTask)[] } = groupBy(
      allTasksForMonth,
      "deadline"
    );

    const groupedByDateArr = Object.entries(groupedByDate);

    return (
      <div className="flex flex-col gap-10" key={format(monthDate, "MMMM yyyy")}>
        <Header monthDate={monthDate} startDate={startDate} />
        <div className="flex flex-col gap-10">
          {groupedByDateArr.map(([date, tasks]) => (
            <div key={date} className="flex flex-col gap-2">
              <SecondaryDateHeading date={parseISO(date)} />
              <Sections tasks={tasks || []} />
            </div>
          ))}
        </div>
      </div>
    );
  });
}

function Header({ monthDate, startDate }: { monthDate: Date; startDate: Date }) {
  return (
    <div className="flex gap-1 items-end pt-2 border-t dark:border-neutral-800 border-neutral-200 mt-14">
      <span className="text-2xl dark:text-neutral-300 text-neutral-800 font-bold">
        {format(monthDate, "MMMM")}
      </span>
      <span className="text-2xl text-neutral-400 font-bold">
        {startDate.getDate() > 1 && isSameMonth(monthDate, startDate)
          ? `${startDate.getDate()}-${getDaysInMonth(monthDate)}`
          : ""}
      </span>
    </div>
  );
}

export default RemainingMonths;
