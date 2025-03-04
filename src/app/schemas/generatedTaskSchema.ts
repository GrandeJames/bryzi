import { z } from "zod";

export const generatedTaskSchema = z.object({
  title: z.string().describe("The title of the task"),
  deadline: z.object({
    dueDate: z
      .string()
      .describe(
        `The date the task is due in the format YYYY-MM-DD. If no date is found, give an empty response. If no year is found, use the year ${new Date().getFullYear()}`
      ),
    dueTime: z
      .string()
      .describe(
        "The time the task is due in the 24 hour format HH:MM. If none is provided, the task is due at 23:59"
      ),
  }),
  impact: z.number().describe("The estimated grade impact. Min: 1, Max: 4"),
  difficulty: z.number().describe("The estimated difficulty/effort of the task. Min: 1, Max: 4"),
  estimatedDurationInMins: z
    .number()
    .describe(
      "The estimated duration to complete the task, expressed in minutes. For example, a research paper may take 1200 minutes to complete. Higher impact and difficulty/effort tasks should have higher estimated durations."
    ),
});

export type GeneratedTask = z.infer<typeof generatedTaskSchema>;
