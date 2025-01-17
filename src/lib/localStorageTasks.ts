"use client";

import { Task } from "@/types/task";

const LOCAL_STORAGE_KEY = "tasks";

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
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
};

const removeLocalTask = (id: string) => {
  const tasks = getLocalTasks();
  const updatedTasks = tasks.filter((task: Task) => task.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
};

export { getLocalTasks, addLocalTask, removeLocalTask };
