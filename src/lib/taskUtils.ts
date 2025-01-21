import { Task } from "@/types/task";
import { addLocalTask, removeLocalTask, updateLocalTask } from "./localStorageTasks";
import { FocusEntry } from "@/types/focusEntry";
import { differenceInMinutes } from "date-fns";

/*
 * Note: updateTask must be passed as a prop otherwise it causes a hook error
 * TODO: database integration
 */

export function handleTaskComplete(task: Task, updateTask: (task: Task) => void) {
  const updatedTask = { ...task, completed: !task.completed };
  updateLocalTask(updatedTask);
  updateTask(updatedTask);
}

export function handleTaskUpdate(task: Task, updateTask: (task: Task) => void) {
  updateLocalTask(task);
  updateTask(task);
}

export function handleTaskAdd(task: Task, addTask: (task: Task) => void) {
  addTask(task);
  addLocalTask(task);
}

export function handleTaskRemove(task: Task, removeTask: (id: string) => void) {
  removeLocalTask(task.id);
  removeTask(task.id);
}

// TODO: remove actualDurationInMins from task
export function getActualDuration(task: Task, focusEntries: FocusEntry[]) {
  const taskEntries = focusEntries.filter((entry: FocusEntry) => entry.taskId === task.id);
  const totalDuration = taskEntries.reduce(
    (acc, entry) => acc + differenceInMinutes(entry.endDate, entry.startDate),
    0
  );

  return totalDuration;
}
