import { z } from "zod";

export const generatedTaskSchema = z.object({
  title: z.string().describe("The title of the task"),
  category: z
    .string()
    .describe(
      `The task's category: "assignment", "assessment", "reading", "preparation", "study", or "uncategorized".`
    ),
  deadline: z.object({
    dueDate: z
      .string()
      .describe(
        `The due date of the task. Preparation, reading, and study tasks must be due one day before the corresponding assessment or lecture.`
      ),
    dueTime: z.string().describe("Time in 24 hour HH:MM format. Default: 23:59 if missing"),
  }),
  additionalDetails: z.string().optional().describe(`Optional additional details about the task.`),
  estimatedDurationInMins: z
    .number()
    .describe(`The estimated duration in minutes to complete the task.`),
});

export type GeneratedTask = z.infer<typeof generatedTaskSchema>;
