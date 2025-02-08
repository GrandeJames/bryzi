import ClassTasksSection from "@/app/class-tasks/ClassTasksSection";
import useTasksStore from "@/stores/tasksStore";
import { isFuture, isSameDay, startOfDay } from "date-fns";
import PlannerCreationMenu from "../components/PlannerCreationMenu";
import DateHeading from "../components/DateHeading";
import PersonalSection from "@/app/personal-tasks/PersonalSection";

function UpcomingView() {
  // TODO: show events

  const tasks = useTasksStore((state) => state.tasks);
  const upcomingTasks = tasks.filter((task) => task.deadline && isFuture(task.deadline));

  const getUpcomingUniqueDates = () => {
    const dates = upcomingTasks
      .filter((task) => task.deadline)
      .map((task) => task.deadline && startOfDay(task.deadline));
    return new Set(dates);
  };

  const upcomingUniqueDates = Array.from(getUpcomingUniqueDates());

  const sortedUpcomingDates = upcomingUniqueDates.sort((a, b) => {
    return (a?.getTime() ?? 0) - (b?.getTime() ?? 0);
  });

  const classTasks = tasks.filter((task) => task.type === "class");
  const personalTasks = tasks.filter((task) => task.type === "personal");

  return (
    <>
      {upcomingUniqueDates.length > 0 && (
        <div className="flex flex-col gap-24 max-w-3xl mx-auto pb-28">
          {sortedUpcomingDates.map((upcomingDate) => {
            const classTasksForDate = classTasks.filter((classTask) => {
              return classTask.deadline && isSameDay(classTask.deadline, upcomingDate!);
            });
            const personalTasksForDate = personalTasks.filter((classTask) => {
              return classTask.deadline && isSameDay(classTask.deadline, upcomingDate!);
            });

            return (
              <div key={upcomingDate!.toString()}>
                <h2 className="flex gap-1 mb-5">
                  <DateHeading date={upcomingDate!} />
                </h2>

                <div className="flex flex-col gap-2">
                  {classTasksForDate.length > 0 && (
                    <ClassTasksSection
                      tasks={[...classTasksForDate]}
                      className="bg-neutral-900/40 border-neutral-900 border p-5 rounded-3xl h-fit"
                    />
                  )}
                  {personalTasksForDate.length > 0 && (
                    <PersonalSection
                      tasks={[...personalTasksForDate]}
                      className="bg-neutral-900/40 border-neutral-900 border p-5 rounded-3xl h-fit"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <PlannerCreationMenu />
    </>
  );
}

export default UpcomingView;
