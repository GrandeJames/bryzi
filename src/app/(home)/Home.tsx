"use client";

import { Timeline } from "./components/Timeline";
import ClassTasksSection from "../class-tasks/ClassTasksSection";
import PersonalSection from "../personal-tasks/PersonalSection";
import useTasksStore from "@/stores/tasksStore";
import { useCallback, useEffect, useState } from "react";
import useDialogStore from "@/app/dialogs/dialogStore";
import PlannerCreationMenu from "./components/PlannerCreationMenu";
import DateNavigation from "./components/DateSelectionNav";
import { useFocusTrackerStore } from "@/stores/focusTrackerStore";
import { isToday } from "date-fns";
import Today from "./views/Today";

const sampleScheduledItems = [
  {
    start: new Date("2025-02-03T10:30:00"),
    end: new Date("2025-02-03T11:45:00"),
    type: "event" as "event",
  },
  {
    start: new Date("2025-02-03T12:00:00"),
    end: new Date("2025-02-03T13:15:00"),
    type: "event" as "event",
  },
  {
    start: new Date("2025-02-03T15:00:00"),
    end: new Date("2025-02-03T16:15:00"),
    type: "event" as "event",
  },
];

function Home() {
  const focusEntries = useFocusTrackerStore((state) => state.focusEntries);
  const open = useDialogStore((state) => state.openDialog);
  const openCreateClassTaskDialog = useCallback(() => open("createClassTask"), [open]);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
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
  }, [openCreateClassTaskDialog]);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

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
          events={[...sampleScheduledItems, ...focusEvents]}
        />
      </header>
      <main className="container">
        <div className="space-y-8">
          <header className="flex justify-between items-center">
            {/* <DateHeading /> */}
            <div className="text-3xl font-bold text-neutral-200">Tasks</div>
            <DateNavigation />
          </header>
          <Today />
        </div>
        <PlannerCreationMenu />
      </main>
    </div>
  );
}

export default Home;
