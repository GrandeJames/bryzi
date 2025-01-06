export interface Task {
  id: string;
  title: string;
  completed: boolean;
  deadline?: string; // determines urgency
  impact?: number;
  durationInMinutes?: number; // used for focus sessions
  actualDurationInMinutes?: number; // used for focus sessions
  description?: string;
  time?: {
    startTime: string;
    endTime: string; // end time can be calculated from start time and duration
  };
  recurrence?: {
    frequency?: "daily" | "weekly" | "monthly" | "yearly";
    occurrences?: number; // e.g., 3 times a week
    daysOfWeek?: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[]; // for weekly tasks
    endDate?: string; // when the recurrence ends
  };
  subTasks?: Task[]; // TODO: limit to a depth of 3 subtasks
  createdAt: string;
  updatedAt: string;
}
