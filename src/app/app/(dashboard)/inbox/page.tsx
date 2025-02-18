"use client";

import ClassTasksSection from "@/app/class-tasks/ClassTasksSection";
import PersonalSection from "@/app/personal-tasks/PersonalSection";
import useTasksStore from "@/stores/tasksStore";
import PlannerCreationMenu from "../components/PlannerCreationMenu";
import { useEffect, useState } from "react";
import TasksNavigation from "../components/TasksNavigation";
import TodayTimeline from "../components/TodayTimeline";
import TasksHeader from "../components/TasksHeader";

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
      <TasksHeader />
      <div className="flex flex-col xl:flex-row gap-5 xl:gap-16">
        <ClassTasksSection tasks={classTasksUnscheduled} />
        <PersonalSection tasks={personalTasksUnscheduled} />
      </div>
      <PlannerCreationMenu />
    </div>
  );
}
