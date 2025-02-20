"use client";

import ClassTasksSection from "@/app/class-tasks/ClassTasksSection";
import PersonalSection from "@/app/personal-tasks/PersonalSection";
import useTasksStore from "@/stores/tasksStore";
import PlannerCreationMenu from "../components/PlannerCreationMenu";
import TasksNavigation from "../components/TasksNavigation";
import TodayTimeline from "../../../timeline/TodayTimeline";
import TasksHeader from "../components/TasksHeader";
import { useHydrated } from "@/hooks/useHydrated";

export default function Inbox() {
  const tasks = useTasksStore((state) => state.tasks);

  const isHydrated = useHydrated();

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
      <div className="flex flex-col gap-5 max-w-3xl xl:max-w-3xl mx-auto">
        <ClassTasksSection tasks={classTasksUnscheduled} />
        <PersonalSection tasks={personalTasksUnscheduled} />
      </div>
      <PlannerCreationMenu />
    </div>
  );
}
