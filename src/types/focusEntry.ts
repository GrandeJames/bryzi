import { Task } from "./task";

export interface FocusEntry {
  startDate: Date;
  endDate: Date;
  taskId: Task["id"];
}
