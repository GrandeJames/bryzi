import { addDays, format, startOfDay } from "date-fns";
import DateHeading from "../../components/DateHeading";
import ClassTasksSection from "@/app/class-tasks/ClassTasksSection";
import PersonalSection from "@/app/personal-tasks/PersonalSection";

function Next7Days({
  CURRENT_DATE,
  groupedTasksByDate,
}: {
  CURRENT_DATE: Date;
  groupedTasksByDate: { [key: string]: any[] };
}) {
  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(startOfDay(CURRENT_DATE), i + 1));

  const next7DaysTasks = next7Days.map((day) => {
    const dateKey = format(day, "yyyy-MM-dd");
    return { date: day, tasks: groupedTasksByDate[dateKey] || [] };
  });

  return (
    <div className="flex flex-col gap-10">
      {next7DaysTasks.map(({ date, tasks }) => (
        <div key={format(date, "yyyy-MM-dd")} className="flex flex-col gap-3">
          <DateHeading date={date} />
          <div className="flex flex-col gap-2">
            {tasks.length > 0 ? (
              <Sections tasks={tasks} />
            ) : (
              <div className="text-neutral-700 text-sm text-center py-6 bg-neutral-900/20 border-neutral-900 border rounded-3xl">
                Nothing to do for this day
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Sections({ tasks }: { tasks: any[] }) {
  return (
    <div className="flex flex-col gap-2">
      {tasks.filter((task) => task.type === "class").length > 0 && (
        <ClassTasksSection
          tasks={tasks.filter((task) => task.type === "class")}
          className="bg-neutral-900/40 border-neutral-900 border p-5 rounded-3xl h-fit"
        />
      )}
      {tasks.filter((task) => task.type === "personal").length > 0 && (
        <PersonalSection
          tasks={tasks.filter((task) => task.type === "personal")}
          className="bg-neutral-900/40 border-neutral-900 border p-5 rounded-3xl h-fit"
        />
      )}
    </div>
  );
}

export default Next7Days;