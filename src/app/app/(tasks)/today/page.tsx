"use client";

import ClassTasksSection from "@/app/class-tasks/ClassTasksSection";
import PersonalSection from "@/app/personal-tasks/PersonalSection";
import useTasksStore from "@/stores/tasksStore";
import { format, isBefore, isToday } from "date-fns";
import AutoPlanToggle from "@/components/AutoPlanToggle";
import PlannerCreationMenu from "../components/PlannerCreationMenu";
import { useFocusSessionStore } from "@/stores/focusSessionStore";
import { BreathStage } from "@/app/focus-stages/BreathStage";
import { VisualStage } from "@/app/focus-stages/VisualStage";
import TimerStage from "@/app/focus-stages/TimerStage";
import { PrepareStage } from "@/app/focus-stages/PrepareStage";
import TasksHeader from "../components/TasksHeader";
import { useHydrated } from "@/hooks/useHydrated";
import { getCurrentDate } from "@/utils/dateUtils";

export default function Page() {
  const tasks = useTasksStore((state) => state.tasks);
  const stage = useFocusSessionStore((state) => state.sessionStage);

  const isHydrated = useHydrated();

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  const classTasks = tasks.filter((task) => task.type === "class");
  const personalTasks = tasks.filter((task) => task.type === "personal");

  const currentDate = getCurrentDate();

  // TODO: actually use the recommended algorithm when auto plan is turned on
  const classTasksToday = classTasks.filter((task) => {
    if (task.deadline === undefined) return false;
    if (isBefore(task.deadline, currentDate) && !task.completed) return true;
    return isToday(task.deadline);
  });

  const personalTasksToday = personalTasks.filter((task) => {
    if (task.deadline === undefined) return false;
    if (isBefore(task.deadline, currentDate) && !task.completed) return true;
    return isToday(task.deadline);
  });

  return (
    <div className="flex-1">
      {!stage && (
        <>
          <TasksHeader leftHeading={<TodayHeading />} />
          <main className="container space-y-4">
            <header>
              <AutoPlanToggle />
            </header>
            <div className="flex flex-col xl:flex-row gap-5 xl:gap-16">
              <ClassTasksSection tasks={classTasksToday} className="max-w-3xl xl:max-w-3xl" />
              <PersonalSection tasks={personalTasksToday} className="max-w-xl xl:max-w-lg" />
            </div>
          </main>
          <PlannerCreationMenu />
        </>
      )}
      {stage === "breath" && <BreathStage />}
      {stage === "visual" && <VisualStage />}
      {stage === "timer" && <TimerStage />}
      {stage === "prepare" && <PrepareStage />}
    </div>
  );
}

function TodayHeading() {
  const currentDate = getCurrentDate();
  const dayOfWeek = format(currentDate, "EEEE");
  return (
    <h1 className="flex gap-2 font-bold items-end ">
      <span className="dark:text-neutral-200 text-neutral-900 text-3xl">{dayOfWeek}</span>
      <span className="dark:text-neutral-500 text-neutral-600 text-lg">
        {format(currentDate, "MMM d")}
      </span>
    </h1>
  );
}
