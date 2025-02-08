"use client";

import { useCallback, useEffect, useState } from "react";
import useDialogStore from "@/app/dialogs/dialogStore";
import TasksNavigation from "./components/TasksNavigation";
import TodayView from "./views/TodayView";
import TodayTimeline from "./components/TodayTimeline";
import { useTasksNavStore } from "./stores/tasksNavStore";
import InboxView from "./views/InboxView";
import UpcomingView from "./views/UpcomingView";

function Home() {
  const open = useDialogStore((state) => state.openDialog);
  const openCreateClassTaskDialog = useCallback(() => open("createClassTask"), [open]);
  const activeTaskNavItem = useTasksNavStore((state) => state.activeNavItem);

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

  return (
    <div className="mx-2">
      <header className="mx-2 mt-5">
        <TodayTimeline />
      </header>
      <main className="container">
        <div className="space-y-8">
          <header className="flex justify-between items-center">
            {/* <div className="text-3xl font-bold text-neutral-200">Tasks</div> */}
            <div></div>
            <TasksNavigation />
          </header>
          {activeTaskNavItem === "today" && <TodayView />}
          {activeTaskNavItem === "upcoming" && <UpcomingView />}
          {activeTaskNavItem === "inbox" && <InboxView />}
        </div>
      </main>
    </div>
  );
}

export default Home;
