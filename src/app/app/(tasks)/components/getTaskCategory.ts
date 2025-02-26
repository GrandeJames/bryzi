import { addDays, isBefore, startOfDay } from "date-fns";

export default function getTaskCategory(task: any) {
  let taskStatus;

  if (task.deadline) {
    if (isBefore(startOfDay(task.deadline), addDays(startOfDay(new Date()), 1))) {
      taskStatus = "today";
    } else {
      taskStatus = "upcoming";
    }
  } else {
    taskStatus = "inbox";
  }
  return taskStatus;
}
