'use client';

import TasksNavbar from "./Navbar";
import TaskCreationForm from "./TaskCreationForm";
import { getLocalTasks } from "@/lib/localStorageTasks";
import { Task } from "@/types/task";

function Tasks() {
  // TODO: obtain all of users tasks
  // TODO: filter tasks based on selected tab

  return (
    <div className="flex min-h-screen flex-col">
      <TasksNavbar />
      <TaskCreationForm />
      <TasksList />
    </div>
  );
}

function TasksList() {
  const tasks = getLocalTasks();

  return (
    <div className="flex flex-col gap-1">
      {tasks.map((task: Task) => (
        <div key={task.id} className="border border-gray-800 p-3 rounded-lg">
          <div>{task.title}</div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
