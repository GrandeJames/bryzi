"use client";

import dynamic from "next/dynamic";
import TasksNavbar from "./Navbar";
import TaskCreationForm from "@/components/TaskCreationForm";
import TaskCreationDialog from "@/components/TaskCreationDialog";

const TasksList = dynamic(() => import("./TasksList"), { ssr: false }); // used to prevent hydration error when using localStorage to get tasks

function Tasks() {
  // TODO: filter tasks based on selected tab

  return (
    <div className="flex min-h-screen flex-col my-10 mx-3 w-full">
      <header>
        <TasksNavbar />
      </header>
      <main>
        <div className="w-[40rem]">
          <TasksList className="divide-y-[1px] divide-gray-900"/>
        </div>
        <TaskCreationDialog />
      </main>
    </div>
  );
}

export default Tasks;
