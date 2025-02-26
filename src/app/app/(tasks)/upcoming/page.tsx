"use client";

import useTasksStore from "@/stores/tasksStore";
import { format, isFuture, startOfDay, getTime, addDays } from "date-fns";
import AutoPlanToggle from "@/components/AutoPlanToggle";
import PlannerCreationMenu from "../components/PlannerCreationMenu";
import Next7Days from "./Next7Days";
import RemainingMonths from "./RemainingMonths";
import TasksHeader from "../components/TasksHeader";
import { useHydrated } from "@/hooks/useHydrated";

// const CURRENT_DATE = new Date(2025, 1, 13);
const CURRENT_DATE = new Date();

export default function Page() {
  const tasks = useTasksStore((state) => state.tasks);

  const isHydrated = useHydrated();

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

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
    <div>
      <TasksHeader />
      <main className="container max-w-3xl">
        <div className="space-y-4">
          <header>
            <AutoPlanToggle />
          </header>
          <div>
            <Next7Days groupedTasksByDate={groupedTasksByDate} CURRENT_DATE={CURRENT_DATE} />
            <RemainingMonths
              groupedTasksByDate={groupedTasksByDate}
              currentDate={CURRENT_DATE}
              startDate={addDays(CURRENT_DATE, 8)}
            />
          </div>
        </div>
        <PlannerCreationMenu />
      </main>
    </div>
  );
}
