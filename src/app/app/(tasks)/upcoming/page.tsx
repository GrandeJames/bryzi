"use client";

import useTasksStore from "@/stores/tasksStore";
import { format, isFuture, startOfDay, getTime, addDays, isAfter } from "date-fns";
import AutoPlanToggle from "@/components/AutoPlanToggle";
import PlannerCreationMenu from "../components/PlannerCreationMenu";
import Next7Days from "./Next7Days";
import UpcomingMonths from "./UpcomingMonths";
import TasksHeader from "../components/TasksHeader";
import { useHydrated } from "@/hooks/useHydrated";
import { getCurrentDate } from "@/utils/dateUtils";

const currentDate = getCurrentDate();

export default function Page() {
  const tasks = useTasksStore((state) => state.tasks);

  console.log("Tasks:", tasks);

  const isHydrated = useHydrated();

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  const upcomingTasks = tasks
    .filter((task) => task.deadline && isAfter(task.deadline, currentDate))
    .sort((taskA, taskB) => {
      return getTime(taskA.deadline!) - getTime(taskB.deadline!);
    });

  console.log("Upcoming Tasks:", upcomingTasks);

  const groupedTasksByDate = upcomingTasks.reduce((acc, task) => {
    if (!task.deadline) return acc;
    const taskDate = startOfDay(task.deadline);
    const dateKey = format(taskDate, "yyyy-MM-dd");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(task);
    return acc;
  }, {} as { [key: string]: typeof tasks });

  console.log("0000", groupedTasksByDate);

  return (
    <div>
      <TasksHeader />
      <main className="container max-w-4xl">
        <div className="space-y-4">
          <header>
            <AutoPlanToggle />
          </header>
          <div>
            <Next7Days groupedTasksByDate={groupedTasksByDate} currentDate={currentDate} />
            <UpcomingMonths
              groupedTasksByDate={groupedTasksByDate}
              currentDate={currentDate}
              startDate={addDays(currentDate, 8)}
              tasks={tasks}
            />
          </div>
        </div>
        <PlannerCreationMenu />
      </main>
    </div>
  );
}
