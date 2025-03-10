import {
  isSameMonth,
  addMonths,
  startOfMonth,
  format,
  startOfDay,
  getDaysInMonth,
  parseISO,
} from "date-fns";
import { Sections } from "./Next7Days";
import { ClassTask } from "@/types/classTask";
import { PersonalTask } from "@/types/personalTask";
import SecondaryDateHeading from "../components/SecondaryDateHeading";

interface RemainingMonthsProps {
  groupedTasksByDate: { [key: string]: any[] };
  currentDate: Date;
  startDate: Date;
  tasks: (ClassTask | PersonalTask)[];
}

function UpcomingMonths({ currentDate, startDate, tasks }: RemainingMonthsProps) {
  const sortedTasks = tasks.sort((a, b) => {
    console.log("a", a);
    console.log("b", b);

    const aDeadline = new Date(a.deadline || 0);
    const bDeadline = new Date(b.deadline || 0);
    if (!aDeadline || !bDeadline) return 0;
    return aDeadline.getTime() - bDeadline.getTime();
  });

  const isMatchingCurrentMonth = isSameMonth(currentDate, startDate);
  const next4Months: Date[] = Array.from({ length: 4 }, (_, i) =>
    addMonths(startOfMonth(currentDate), i + 1)
  );
  const upcomingMonths = isMatchingCurrentMonth ? [startDate, ...next4Months] : next4Months;

  return upcomingMonths.map((monthDate) => {
    const tasksForMonth = sortedTasks.filter((task) => {
      if (!task.deadline) return false;
      const taskDate = startOfDay(task.deadline);
      return isSameMonth(taskDate, monthDate) && taskDate >= startOfDay(startDate);
    });

    return (
      <div className="flex flex-col gap-10" key={format(monthDate, "MMMM yyyy")}>
        <MonthHeader monthDate={monthDate} startDate={startDate} />
        <div className="flex flex-col gap-10">
          <Days tasksForMonth={tasksForMonth} />
        </div>
      </div>
    );
  });
}

function Days({ tasksForMonth }: { tasksForMonth: (ClassTask | PersonalTask)[] }) {
  const groupedByDate: { [key: string]: (ClassTask | PersonalTask)[] } = groupByDate(tasksForMonth);
  const dayEntries = Object.entries(groupedByDate);

  return (
    <div className="flex flex-col gap-10">
      {dayEntries.map(([date, tasks]) => (
        <Day key={date} date={date} tasks={tasks || []} />
      ))}
    </div>
  );
}

function Day({ date, tasks }: { date: string; tasks: (ClassTask | PersonalTask)[] }) {
  return (
    <div className="flex flex-col gap-2">
      <SecondaryDateHeading date={parseISO(date)} />
      <Sections tasks={tasks || []} />
    </div>
  );
}

function MonthHeader({ monthDate, startDate }: { monthDate: Date; startDate: Date }) {
  const monthDays = getDaysInMonth(monthDate);
  const isStartDateInSameMonth = isSameMonth(monthDate, startDate);
  const isStartDateAfterFirstDay = startDate.getDate() > 1;
  const isStartDateNotLastDay = startDate.getDate() !== monthDays;

  const shouldShowRange =
    isStartDateInSameMonth && isStartDateAfterFirstDay && isStartDateNotLastDay;

  const getFormattedDateRange = () => {
    if (shouldShowRange) {
      return `${startDate.getDate()}-${monthDays}`;
    }
    if (isStartDateInSameMonth && isStartDateAfterFirstDay) {
      return startDate.getDate().toString();
    }
    return "";
  };

  return (
    <div className="flex gap-1 items-end pt-2 border-t dark:border-neutral-800 border-neutral-200 mt-14">
      <span className="text-2xl dark:text-neutral-300 text-neutral-800 font-bold">
        {format(monthDate, "MMMM")}
      </span>
      <span className="text-2xl text-neutral-400 font-bold">{getFormattedDateRange()}</span>
    </div>
  );
}

function groupByDate(tasks: (ClassTask | PersonalTask)[]) {
  return tasks.reduce((acc, task) => {
    if (!task.deadline) return acc;
    const taskDate = startOfDay(task.deadline);
    const dateKey = format(taskDate, "yyyy-MM-dd");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(task);
    return acc;
  }, {} as { [key: string]: (ClassTask | PersonalTask)[] });
}

export default UpcomingMonths;
