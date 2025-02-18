"use client";

import useTasksStore from "@/stores/tasksStore";
import { format, isFuture, startOfDay, getTime, addDays } from "date-fns";
import AutoPlanToggle from "@/components/AutoPlanToggle";
import PlannerCreationMenu from "../components/PlannerCreationMenu";
import { useState, useEffect } from "react";
import TasksNavigation from "../components/TasksNavigation";
import Next7Days from "./Next7Days";
import RemainingMonths from "./RemainingMonths";
import TodayTimeline from "../../../timeline/TodayTimeline";
import TasksHeader from "../components/TasksHeader";

const CURRENT_DATE = new Date();

export default function Page() {
  const tasks = useTasksStore((state) => state.tasks);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

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
