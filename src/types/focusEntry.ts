import { ClassTask } from "./classTask";

export interface FocusEntry {
  startDate: Date;
  endDate: Date;
  taskId: ClassTask["id"];
}
