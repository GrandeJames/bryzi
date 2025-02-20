import { ClassTask } from "@/types/classTask";
import { FocusEntry } from "@/types/focusEntry";
import { differenceInSeconds } from "date-fns";
import {
  addLocalStorageItem,
  updateLocalStorageItem,
  removeLocalStorageItem,
  getLocalStorageData,
} from "./localStorageUtils";
import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import TaskAddNotification from "@/app/notifications/TaskAddNotification";
import TaskUpdateNotification from "@/app/notifications/TaskUpdateNotification";

/*
 * Note: updateTask must be passed as a prop otherwise it causes a hook error
 */

export function handleTaskComplete(task: ClassTask, updateTask: (task: ClassTask) => void) {
  const updatedTask = { ...task, completed: !task.completed };
  updateLocalStorageItem(LOCAL_STORAGE_KEYS.TASKS, updatedTask);
  updateTask(updatedTask);
}

export function handleTaskUpdate(task: ClassTask, updateTask: (task: ClassTask) => void) {
  updateLocalStorageItem(LOCAL_STORAGE_KEYS.TASKS, task);
  updateTask(task);

  TaskUpdateNotification({ task });
}

export function handleTaskAdd(task: ClassTask, addTask: (task: ClassTask) => void) {
  addTask(task);
  addLocalStorageItem(LOCAL_STORAGE_KEYS.TASKS, task);

  TaskAddNotification({ task });
}

export function handleTaskRemove(task: ClassTask, removeTask: (id: string) => void) {
  removeLocalStorageItem(LOCAL_STORAGE_KEYS.TASKS, task.id);
  removeTask(task.id);
}

export function getActualDurationMins(task: ClassTask) {
  const focusEntries = getLocalStorageData<FocusEntry>(LOCAL_STORAGE_KEYS.FOCUS_ENTRIES);

  if (!focusEntries) {
    return 0;
  }
  const taskEntries = focusEntries.filter((entry: FocusEntry) => entry.taskId === task.id);
  const totalDurationInSeconds = taskEntries.reduce(
    (acc, entry) => acc + differenceInSeconds(entry.endDate, entry.startDate),
    0
  );

  const mins = totalDurationInSeconds / 60;

  return mins;
}
