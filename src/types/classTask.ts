import { Task } from "./task";

export interface ClassTask extends Task {
  deadline?: Date; // determines urgency
  impact?: number;
  difficulty?: number;
  actualDurationInMins?: number;
  estimatedDurationInMins?: number; // used for focus sessions
  description?: string;
  time?: {
    startTime: string;
    endTime: string; // end time can be calculated from start time and duration
  };
  class?: {
    name: string;
    abbreviation?: string;
  };
}
