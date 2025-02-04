"use client";

import { Timeline } from "./components/Timeline";
import { tasks } from "@/data/sampleTasks";
import AssignmentsSection from "./components/AssignmentsSection";
import PersonalSection from "./components/PersonalSection";
import useTasksStore from "@/stores/tasksStore";
import { useCallback, useEffect, useState } from "react";
import useDialogStore from "@/stores/dialogStore";
import AddTaskFloatingMenu from "./components/AddTaskFloatingMenu";
import DateHeading from "./components/DateHeading";
import DateNavigation from "./components/DateSelectionNav";
import { useFocusTrackerStore } from "@/stores/focusTrackerStore";
import { isToday } from "date-fns";

function Home() {
  const tasks2 = useTasksStore((state) => state.tasks);
  const focusEntries = useFocusTrackerStore((state) => state.focusEntries);

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

  const todayFocusEntries = focusEntries.filter((entry) => isToday(entry.startDate));
  const focusEvents = todayFocusEntries.map((entry) => ({
    start: new Date(entry.startDate),
    end: new Date(entry.endDate),
    type: "focus" as "focus",
  }));

  return (
    <div className="mx-2">
      <header className="mx-2 mt-5">
        <Timeline
          startTime="6:00"
          endTime="23:00"
          events={[
            {
              start: new Date("2025-02-03T10:30:00"),
              end: new Date("2025-02-03T11:45:00"),
              type: "event" as "focus",
            },
            {
              start: new Date("2025-02-03T12:00:00"),
              end: new Date("2025-02-03T13:15:00"),
              type: "event" as "focus",
            },
            {
              start: new Date("2025-02-03T15:00:00"),
              end: new Date("2025-02-03T16:15:00"),
              type: "event" as "focus",
            },
            ...focusEvents,
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
        <AddTaskFloatingMenu />
      </main>
    </div>
  );
}

export default Home;
