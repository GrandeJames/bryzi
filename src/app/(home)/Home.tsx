"use client";

import { Timeline } from "../Timeline";
// import { Progress } from "@/components/ui/progress";
import { tasks } from "@/data/sampleTasks";
import { format } from "date-fns";
import AssignmentsSection from "./AssignmentSection";
import MiscSection from "./MiscSection";
import useTasksStore from "@/stores/tasksStore";
import { useCallback, useEffect, useState } from "react";
import useDialogStore from "@/stores/dialogStore";
import CreateMenu from "./CreateMenu";

function Home() {
  const tasks2 = useTasksStore((state) => state.tasks);

  const open = useDialogStore((state) => state.openDialog);
  const openCreateTaskDialog = useCallback(() => open("create"), [open]);

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
  }, []);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  const assignments = tasks2.filter((task) => task.title);
  const miscTasks = tasks.filter((task) => !task.startTime && !task.expectedDuration);

  return (
    <div className="mx-2">
      <header className="mx-2 mt-5">
        {/* <Progress value={70} label="3/5 Tasks" className="mb-2 text-xs" /> */}
        <Timeline
          startTime="8:00"
          endTime="23:00"
          events={[
            { start: "9:00", end: "10:30", type: "focus" },
            { start: "14:00", end: "15:30", type: "focus" },
            { start: "18:00", end: "19:30", type: "task" },
          ]}
        />
      </header>
      <main>
        <div className="space-y-8">
          <header className="flex justify-between items-center">
            <DateHeading />
            <div className="flex gap-5 mr-5 relative">
              <span className="text-xl font-bold text-neutral-600">Today</span>
              <span className="text-xl font-bold text-neutral-600">Tomorrow</span>
              <span className="text-xl font-bold text-neutral-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-[2px] after:bg-orange-400">
                Next 7 Days
              </span>
            </div>
          </header>
          <div className="space-y-8 flex flex-col">
            <div className="flex flex-col xl:flex-row gap-5">
              <AssignmentsSection
                tasks={assignments}
                className="flex-grow max-w-4xl bg-neutral-900/40 border-neutral-900 border p-5 rounded-3xl"
              />
              <MiscSection
                miscTasks={miscTasks}
                className="flex-grow max-w-md bg-neutral-900/40 border-neutral-900 border p-5 rounded-3xl h-full"
              />
            </div>
          </div>
        </div>
        <CreateMenu />
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
