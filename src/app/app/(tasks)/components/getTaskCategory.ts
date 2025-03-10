import { getCurrentDate } from "@/utils/dateUtils";
import { addDays, isBefore, startOfDay } from "date-fns";

export default function getTaskCategory(task: any) {
  let taskStatus;

  if (task.deadline) {
    if (isBefore(startOfDay(task.deadline), addDays(startOfDay(getCurrentDate()), 1))) {
      taskStatus = "today";
    } else {
      taskStatus = "upcoming";
    }
  } else {
    taskStatus = "inbox";
  }
  return taskStatus;
}
