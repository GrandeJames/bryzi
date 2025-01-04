'use client';

// TODO: remove a task, update a task, get a task by id

import { Task } from "@/types/task";

const getLocalTasks = () => {
  if (typeof window === "undefined") {
    return [];
  }
  const tasks = localStorage.getItem("tasks");
  if (tasks) {
    return JSON.parse(tasks);
  }
  return [];
};

const addLocalTask = (task: Task) => {
  const tasks = getLocalTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const removeLocalTask = (id: string) => {
  const tasks = getLocalTasks();
  const updatedTasks = tasks.filter((task: Task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
};

export { getLocalTasks, addLocalTask, removeLocalTask };
