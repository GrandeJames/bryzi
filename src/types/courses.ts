export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri";

export interface Courses {
  id: string;
  name: string;
  abbreviation?: string;
  color?: string;
  startTime: string;
  endTime: string;
  daysOfWeek: Weekday[];
}
