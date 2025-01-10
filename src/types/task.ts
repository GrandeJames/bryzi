import { Subtask } from "./subtask";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  deadline?: Date; // determines urgency
  impact?: string;
  difficulty?: string;
  durationInMinutes?: number; // used for focus sessions
  actualDurationInMinutes?: number; // used for focus sessions
  description?: string;
  time?: {
    startTime: string;
    endTime: string; // end time can be calculated from start time and duration
  };
  recurrence?: {
    frequency?: "once" | "daily" | "weekly" | "monthly";
    occurrences?: number; // e.g., 3 times a week
    daysOfWeek?: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[]; // for weekly tasks
    endDate?: Date;
  };
  subTasks?: Subtask[];
  createdAt?: string;
  updatedAt?: string;
}
