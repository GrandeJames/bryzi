/**
 * Focus work are tasks that have a duration.
 * 
 */
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  deadline?: string; // determines urgency
  impact?: number;
  estimatedDuration?: number; // used for focus sessions
  actualDuration?: number; // used for focus sessions
  subtasks?: Task[];
  startTime?: string; // used for scheduled tasks
  endTime?: string;
}
