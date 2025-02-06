import { Task } from "./task";

export interface PersonalTask extends Task {
  deadline?: Date;
  description?: string;
  time?: {
    startTime: string;
    endTime: string;
  };
}
