"use client";

import { Timeline } from "../Timeline";
import { Progress } from "@/components/ui/progress";
import { tasks } from "@/lib/data";
import { format } from "date-fns";
import AssignmentsSection from "./AssignmentSection";
import ScheduleSection from "./ScheduleSection";
import MiscSection from "./MiscSection";
import useTasksStore from "@/stores/tasksStore";
import { useEffect, useState } from "react";
import useDialogStore from "@/stores/dialogStore";
import { PlusIcon } from "lucide-react";

function Home() {
  const open = useDialogStore((state) => state.openDialog);
  const openCreateTaskDialog = () => open("create");

  const tasks2 = useTasksStore((state) => state.tasks);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "n" && event.ctrlKey) {
        event.preventDefault();
        openCreateTaskDialog();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openCreateTaskDialog]);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  const assignments = tasks2.filter((task) => task.title);

  const scheduledTasks = tasks.filter((task) => task.startTime);
  const miscTasks = tasks.filter((task) => !task.startTime && !task.expectedDuration);

  return (
    <div className="">
      <header>
        <Progress value={70} label="3/5 Tasks" className="mb-2 mt-5 text-xs" />
        <Timeline className="mb-4" />
      </header>
      <main className="space-y-10">
        <div className="pb-20 pt-5 space-y-5">
          <DateHeading />
          <div className="space-y-3 w-full flex flex-col">
            <ScheduleSection scheduledTasks={scheduledTasks} />
            <div className="grid grid-cols-12 gap-10">
              <AssignmentsSection tasks={assignments} />
              <MiscSection miscTasks={miscTasks} />
            </div>
          </div>
        </div>
        <button
          onClick={openCreateTaskDialog}
          className="fixed right-5 bottom-5 bg-orange-500 rounded-full p-4"
        >
          <PlusIcon className="size-6" />
        </button>
      </main>
    </div>
  );
}

function DateHeading() {
  const today = new Date();

  const day = format(today, "EEEE");
  const monthAndDay = format(today, "MMM d");

  return (
    <header className="flex items-end gap-2">
      <span className="text-2xl font-bold text-neutral-200">{day}</span>
      <span className="text-xl font-bold text-neutral-500">{monthAndDay}</span>
    </header>
  );
}

export default Home;
