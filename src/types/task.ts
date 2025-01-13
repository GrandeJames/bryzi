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
    // maybe have a start date? because if it's a generated task by AI, for example, it should not start immediately
    // another ex: guest speaker talks are every Wednesday from 4-Sept to 20-Nov
    startDate?: Date;
    endDate?: Date;
  };
  subTasks?: Subtask[];
  createdAt?: string;
  updatedAt?: string;
}
