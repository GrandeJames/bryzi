import { Subtask } from "./subtask";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  type?: "class" | "personal";
  recurrence?: {
    frequency?: "once" | "daily" | "weekly" | "monthly";
    occurrences?: number;
    daysOfWeek?: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[];
    startDate?: Date;
    endDate?: Date;
  };
  subtasks?: Subtask[];
  createdAt?: string;
  updatedAt?: string;
}
