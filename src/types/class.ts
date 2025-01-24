export interface Class {
  id: string;
  name: string;
  abbreviation: string;
  time?: {
    startTime: string;
    endTime: string;
  };
  recurrence?: {
    frequency?: "once" | "daily" | "weekly" | "monthly";
    daysOfWeek?: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[];
  };
}
