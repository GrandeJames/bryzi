"use client";

import dynamic from "next/dynamic";
import TasksNavbar from "./Navbar";
import TaskCreationForm from "./TaskCreationForm";

const TasksList = dynamic(() => import("./TasksList"), { ssr: false }); // used to prevent hydration error when using localStorage to get tasks

function Tasks() {
  // TODO: filter tasks based on selected tab

  return (
    <div className="flex min-h-screen flex-col">
      <TasksNavbar />
      <TasksList />
      <TaskCreationForm />
    </div>
  );
}

export default Tasks;
