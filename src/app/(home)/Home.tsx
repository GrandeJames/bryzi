"use client";

import { Timeline } from "./components/Timeline";
import AssignmentsSection from "./components/AssignmentsSection";
import PersonalSection from "../personal-tasks/PersonalSection";
import useTasksStore from "@/stores/tasksStore";
import { useCallback, useEffect, useState } from "react";
import useDialogStore from "@/app/dialogs/dialogStore";
import PlannerCreationMenu from "./components/PlannerCreationMenu";
import DateHeading from "./components/DateHeading";
import DateNavigation from "./components/DateSelectionNav";
import { useFocusTrackerStore } from "@/stores/focusTrackerStore";
import { isToday } from "date-fns";

function Home() {
  const tasks = useTasksStore((state) => state.tasks);
  const focusEntries = useFocusTrackerStore((state) => state.focusEntries);

  const open = useDialogStore((state) => state.openDialog);
  const openCreateClassTaskDialog = useCallback(() => open("createClassTask"), [open]);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "n" && event.ctrlKey) {
        event.preventDefault();
        openCreateClassTaskDialog();
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

  const assignments = tasks.filter((task) => task.type === "class");
  const personalTasks = tasks.filter((task) => task.type === "personal");

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
            <div className="flex flex-col xl:flex-row gap-5 xl:gap-16">
              <AssignmentsSection
                tasks={assignments}
                className="w-full max-w-3xl xl:max-w-3xl bg-neutral-900/40 border-neutral-900 border p-5 rounded-3xl h-fit"
              />
              <PersonalSection
                tasks={personalTasks}
                className="w-full max-w-xl xl:max-w-lg bg-neutral-900/40 border-neutral-900 border p-5 rounded-3xl h-fit"
              />
            </div>
          </div>
        </div>
        <PlannerCreationMenu />
      </main>
    </div>
  );
}

export default Home;
