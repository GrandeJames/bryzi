"use client";

import ClassTasksSection from "@/app/class-tasks/ClassTasksSection";
import PersonalSection from "@/app/personal-tasks/PersonalSection";
import useTasksStore from "@/stores/tasksStore";
import PlannerCreationMenu from "../components/PlannerCreationMenu";
import { useEffect, useState } from "react";
import AutoPlanToggle from "@/components/AutoPlanToggle";
import TasksNavigation from "../components/TasksNavigation";
import { Timeline } from "../components/Timeline";

export default function Inbox() {
  const tasks = useTasksStore((state) => state.tasks);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  const classTasks = tasks.filter((task) => task.type === "class");
  const personalTasks = tasks.filter((task) => task.type === "personal");

  const classTasksUnscheduled = classTasks.filter((task) => {
    return !task.deadline;
  });

  const personalTasksUnscheduled = personalTasks.filter((task) => {
    return !task.deadline;
  });

  return (
    <div>
      <header>
        <Timeline />
        <div className="flex justify-between items-center">
          <div></div>
          <TasksNavigation />
        </div>
      </header>
      <div className="flex flex-col xl:flex-row gap-5 xl:gap-16">
        <ClassTasksSection
          tasks={classTasksUnscheduled}
          className="w-full max-w-3xl xl:max-w-3xl bg-neutral-900/40 border-neutral-900 border p-5 rounded-3xl h-fit"
        />
        <PersonalSection
          tasks={personalTasksUnscheduled}
          className="w-full max-w-xl xl:max-w-lg bg-neutral-900/40 border-neutral-900 border p-5 rounded-3xl h-fit"
        />
      </div>
      <PlannerCreationMenu />
    </div>
  );
}
