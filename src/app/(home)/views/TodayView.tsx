import ClassTasksSection from "@/app/class-tasks/ClassTasksSection";
import PersonalSection from "@/app/personal-tasks/PersonalSection";
import useTasksStore from "@/stores/tasksStore";
import { isToday } from "date-fns";
import PlannerCreationMenu from "../components/PlannerCreationMenu";
import DateHeading from "../components/DateHeading";

function TodayView() {
  const tasks = useTasksStore((state) => state.tasks);

  const classTasks = tasks.filter((task) => task.type === "class");
  const personalTasks = tasks.filter((task) => task.type === "personal");

  // TODO: actually use the recommended algorithm when auto plan is turned on
  const classTasksToday = classTasks.filter((task) => {
    if (task.deadline === undefined) return false;
    return isToday(task.deadline);
  });

  const personalTasksToday = personalTasks.filter((task) => {
    if (task.deadline === undefined) return false;
    return isToday(task.deadline);
  });

  return (
    <>
      <div className="flex flex-col xl:flex-row gap-5 xl:gap-16">
        <ClassTasksSection
          tasks={classTasksToday}
          className="w-full max-w-3xl xl:max-w-3xl bg-neutral-900/40 border-neutral-900 border p-5 rounded-3xl h-fit"
        />
        <PersonalSection
          tasks={personalTasksToday}
          className="w-full max-w-xl xl:max-w-lg bg-neutral-900/40 border-neutral-900 border p-5 rounded-3xl h-fit"
        />
      </div>
      <PlannerCreationMenu />
    </>
  );
}

export default TodayView;
