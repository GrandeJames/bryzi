"use client";

import { Timeline } from "../Timeline";
import { Progress } from "@/components/ui/progress";
import { tasks } from "@/data/sampleTasks";
import { format } from "date-fns";
import AssignmentsSection from "./AssignmentSection";
import ScheduleSection from "./ScheduleSection";
import MiscSection from "./MiscSection";
import useTasksStore from "@/stores/tasksStore";
import { useCallback, useEffect, useState } from "react";
import useDialogStore from "@/stores/dialogStore";
import {
  CalendarIcon,
  CircleCheckIcon,
  NotebookPenIcon,
  PlusIcon,
  SparklesIcon,
} from "lucide-react";

function Home() {
  const open = useDialogStore((state) => state.openDialog);
  const openCreateTaskDialog = useCallback(() => open("create"), [open]);

  const tasks2 = useTasksStore((state) => state.tasks);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "n" && event.ctrlKey) {
        event.preventDefault();
        // openCreateTaskDialog();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
          <div className="flex justify-between items-center mb-10">
            <DateHeading />
            <div className="flex gap-5 mr-5 relative">
              <span className="text-xl font-bold text-neutral-600">Today</span>
              <span className="text-xl font-bold text-neutral-600">Tomorrow</span>
              <span className="text-xl font-bold text-neutral-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-[2px] after:bg-orange-400">
                This week
              </span>
            </div>
          </div>
          <div className="space-y-8 flex flex-col">
            {/* <ScheduleSection scheduledTasks={scheduledTasks} /> */}
            <div className="flex flex-col xl:flex-row gap-10">
              <AssignmentsSection tasks={assignments} className="flex-grow max-w-3xl" />
              <MiscSection miscTasks={miscTasks} className="flex-grow max-w-md" />
            </div>
          </div>
        </div>
        <div className="fixed bottom-5 right-5 flex flex-col items-center gap-3">
          <button className="group bg-neutral-900 rounded-full p-3 shadow-lg shadow-neutral-950 transition-all duration-300 hover:scale-110 relative">
            <PlusIcon className="size-5 text-neutral-300" />

            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 flex flex-col items-center gap-6 bg-neutral-900 px-3 py-5 rounded-full shadow-lg shadow-neutral-950 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
              <CircleCheckIcon className="size-5 text-neutral-300" />
              <button onClick={openCreateTaskDialog}>
                <NotebookPenIcon className="size-5 text-neutral-300" />
              </button>
              <CalendarIcon className="size-5 text-neutral-300" />
              <SparklesIcon className="size-5 text-neutral-300" />
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}

function DateHeading() {
  const today = new Date();

  const day = format(today, "EEEE");
  const monthAndDay = format(today, "MMM d");

  return (
    <div className="flex items-end gap-2">
      <span className="text-3xl font-bold text-neutral-200">{day}</span>
      <span className="text-xl font-bold text-neutral-500">{monthAndDay}</span>
    </div>
  );
}

export default Home;
