import ClassTasksSection from "@/app/class-tasks/ClassTasksSection";
import useTasksStore from "@/stores/tasksStore";
import {
  format,
  isFuture,
  startOfDay,
  getTime,
  addDays,
  isSameDay,
  parse,
  getDaysInMonth,
  startOfMonth,
  addMonths,
} from "date-fns";
import PlannerCreationMenu from "../../components/PlannerCreationMenu";
import DateHeading from "../../components/DateHeading";
import PersonalSection from "@/app/personal-tasks/PersonalSection";
import { isThisYear, isThisMonth, isSameMonth } from "date-fns";
import Next7Days from "./Next7Days";
import RemainingMonths from "./RemainingMonths";

const CURRENT_DATE = new Date(2025, 7, 26, 14, 0, 0);

function UpcomingView() {
  const tasks = useTasksStore((state) => state.tasks);

  const upcomingTasks = tasks
    .filter((task) => task.deadline && isFuture(task.deadline))
    .sort((taskA, taskB) => {
      return getTime(taskA.deadline!) - getTime(taskB.deadline!);
    });

  // Generate the NEXT 7 days explicitly (starting from tomorrow)
  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(startOfDay(CURRENT_DATE), i + 1));

  const getNextFourMonths = () => {
    return Array.from({ length: 4 }, (_, i) => startOfMonth(addMonths(CURRENT_DATE, i)));
  };
  // console.log("getNextFourMonths", getNextFourMonths());

  // console.log("next7Days", next7Days);

  const groupedTasksByDate = upcomingTasks.reduce((acc, task) => {
    if (!task.deadline) return acc;
    const taskDate = startOfDay(task.deadline);
    const dateKey = format(taskDate, "yyyy-MM-dd");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(task);
    return acc;
  }, {} as { [key: string]: typeof tasks });

  // console.log("groupedTasksByDate", groupedTasksByDate);

  const groupedTasksByYear = upcomingTasks.reduce((acc, task) => {
    if (!task.deadline) return acc;
    const taskDate = startOfDay(task.deadline);
    const yearKey = format(taskDate, "yyyy");
    if (!acc[yearKey]) acc[yearKey] = [];
    acc[yearKey].push(task);
    return acc;
  }, {} as { [key: string]: typeof tasks });

  console.log("groupedTasksByYear", groupedTasksByYear);

  const remainingTasks = upcomingTasks.filter(
    (task) => !next7Days.some((day) => isSameDay(day, task.deadline!))
  );

  console.log("remainingTasks", remainingTasks);

  // Group remaining tasks by month and year
  const remainingTasksByMonth = remainingTasks.reduce((acc, task) => {
    if (!task.deadline) return acc;
    const taskDate = startOfDay(task.deadline);
    const monthYearKey = format(taskDate, "MMMM yyyy");
    if (!acc[monthYearKey]) acc[monthYearKey] = [];
    acc[monthYearKey].push(task);
    return acc;
  }, {} as { [key: string]: typeof tasks });

  // console.log("remainingTasksByMonth", remainingTasksByMonth);

  return (
    <div className="flex flex-col gap-12 max-w-3xl mx-auto">
      {/* Display the next 7 days */}
      <Next7Days groupedTasksByDate={groupedTasksByDate} CURRENT_DATE={CURRENT_DATE} />
      
      <RemainingMonths
        groupedTasksByDate={groupedTasksByDate}
        currentDate={CURRENT_DATE}
        startDate={addDays(CURRENT_DATE, 8)}
      />

      {/* Display remaining tasks grouped by month */}
      {/* {Object.entries(remainingTasksByMonth).map(([monthYear, tasks]) => {
        return (
          <div key={monthYear} className="flex flex-col gap-7">
            <h1 className="text-3xl font-extrabold text-neutral-300">
              {getMonthYearLabel(parse(monthYear, "MMMM yyyy", CURRENT_DATE))}
            </h1>
            <Days tasks={tasks} />
          </div>
        );
      })} */}

      <PlannerCreationMenu />
    </div>
  );
}

function Days({ tasks }: { tasks: any[] }) {
  const groupedTasks = tasks.reduce((acc: { [key: string]: any[] }, task) => {
    if (!task.deadline) return acc;
    const taskDate = startOfDay(task.deadline);
    const dateKey = format(taskDate, "yyyy-MM-dd");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(task);
    return acc;
  }, {} as { [key: string]: typeof tasks });

  return (
    <div className="flex flex-col gap-10">
      {Object.entries(groupedTasks).map(([date, tasks]) => {
        return <Day date={parse(date, "yyyy-MM-dd", CURRENT_DATE)} tasks={tasks} />;
      })}
    </div>
  );
}

function Day({ date, tasks }: { date: Date; tasks: any[] }) {
  const classTasksForDay = tasks.filter((task) => task.type === "class");
  const personalTasksForDay = tasks.filter((task) => task.type === "personal");

  return (
    <div className="flex flex-col gap-3">
      <DateHeading date={date} />
      <div className="flex flex-col gap-2">
        {classTasksForDay.length > 0 && (
          <ClassTasksSection
            tasks={classTasksForDay}
            className="bg-neutral-900/40 border-neutral-900 border p-5 rounded-3xl h-fit"
          />
        )}
        {personalTasksForDay.length > 0 && (
          <PersonalSection
            tasks={personalTasksForDay}
            className="bg-neutral-900/40 border-neutral-900 border p-5 rounded-3xl h-fit"
          />
        )}
      </div>
    </div>
  );
}

function getMonthYearLabel(date: Date) {
  const dateAfterWeek = addDays(CURRENT_DATE, 8);

  // TODO: ensure date after week  does not exceed the current month

  if (isThisMonth(date)) {
    return `${format(date, "MMMM")} ${format(dateAfterWeek, "d")}-${getDaysInMonth(date)}`;
  }
  return isThisYear(date) ? format(date, "MMMM") : format(date, "MMMM yyyy");
}

export default UpcomingView;
