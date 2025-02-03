"use client";

import { Timeline } from "./components/Timeline";
import { tasks } from "@/data/sampleTasks";
import AssignmentsSection from "./components/AssignmentsSection";
import PersonalSection from "./components/PersonalSection";
import useTasksStore from "@/stores/tasksStore";
import { useCallback, useEffect, useState } from "react";
import useDialogStore from "@/stores/dialogStore";
import CreateMenu from "./components/CreateMenu";
import DateHeading from "./components/DateHeading";
import DateNavigation from "./components/DateSelectionNav";

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
            <DateNavigation />
          </header>
          <div className="space-y-8 flex flex-col">
            <div className="flex flex-col xl:flex-row gap-5">
              <AssignmentsSection
                tasks={assignments}
                className="flex-grow max-w-4xl bg-neutral-900/40 border-neutral-900 border p-5 rounded-3xl"
              />
              <PersonalSection
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

export default Home;
