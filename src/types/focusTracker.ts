import { Task } from "./task";

export interface FocusHistory {
  entries: FocusEntry[];
}

export interface FocusEntry {
  id: string;
  start: Date;
  end: Date;
  taskId: Task["id"];
}
