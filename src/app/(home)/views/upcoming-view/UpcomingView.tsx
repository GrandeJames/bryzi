import useTasksStore from "@/stores/tasksStore";
import { format, isFuture, startOfDay, getTime, addDays } from "date-fns";
import PlannerCreationMenu from "../../components/PlannerCreationMenu";
import Next7Days from "./Next7Days";
import RemainingMonths from "./RemainingMonths";
import AutoPlanToggle from "@/components/AutoPlanToggle";

const CURRENT_DATE = new Date();

function UpcomingView() {
  const tasks = useTasksStore((state) => state.tasks);

  const upcomingTasks = tasks
    .filter((task) => task.deadline && isFuture(task.deadline))
    .sort((taskA, taskB) => {
      return getTime(taskA.deadline!) - getTime(taskB.deadline!);
    });

  const groupedTasksByDate = upcomingTasks.reduce((acc, task) => {
    if (!task.deadline) return acc;
    const taskDate = startOfDay(task.deadline);
    const dateKey = format(taskDate, "yyyy-MM-dd");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(task);
    return acc;
  }, {} as { [key: string]: typeof tasks });

  return (
    <div className="flex flex-col gap-5 max-w-3xl mx-auto">
      <header>
        <AutoPlanToggle />
      </header>
      <div className="flex flex-col gap-12">
        <Next7Days groupedTasksByDate={groupedTasksByDate} CURRENT_DATE={CURRENT_DATE} />
        <RemainingMonths
          groupedTasksByDate={groupedTasksByDate}
          currentDate={CURRENT_DATE}
          startDate={addDays(CURRENT_DATE, 8)}
        />
        <PlannerCreationMenu />
      </div>
    </div>
  );
}

export default UpcomingView;
