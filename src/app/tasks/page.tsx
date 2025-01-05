"use client";

import dynamic from "next/dynamic";
import TasksNavbar from "./Navbar";
import TaskCreationForm from "./TaskCreationForm";

const TasksList = dynamic(() => import("./TasksList"), { ssr: false }); // used to prevent hydration error when using localStorage to get tasks

function Tasks() {
  // TODO: filter tasks based on selected tab

  return (
    <div className="flex min-h-screen flex-col my-10 mx-3">
      <TasksNavbar/>
      <TaskCreationForm className="border border-gray-500 my-3 p-1"/>
      <TasksList />
    </div>
  );
}

export default Tasks;
