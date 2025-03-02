import { z } from "zod";

export const generatedTaskSchema = z.object({
  title: z.string(),
  frequency: z.object({
    frequency: z.enum(["once", "daily", "weekly", "monthly"]),
    occurrences: z.number(),
    daysOfWeek: z.array(z.enum(["mon", "tue", "wed", "thu", "fri", "sat", "sun"])),
  }),
  deadline: z.object({
    dueDate: z.string(),
    dueTime: z.string(),
  }),
  impact: z.number(),
  difficulty: z.number(),
  estimatedDurationInMins: z.number(),
  description: z.string(),
});

export type GeneratedTask = z.infer<typeof generatedTaskSchema>;
