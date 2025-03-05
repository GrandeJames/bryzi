import { z } from "zod";

export const generatedTaskSchema = z.object({
  title: z.string().describe("The title of the task"),
  deadline: z.object({
    dueDate: z.string().describe(`The due date of the task.`),
    dueTime: z.string().describe("Time in HH:MM format. Default: 23:59 if missing"),
  }),
  // impact: z
  //   .number()
  //   .describe(
  //     "Grade impact (1-4): 1=Low, 2=Medium, 3=High, 4=Critical\nExamples: Exam=4, Essay=4, Quiz=3, Discussion Post=1, Reading=1"
  //   ),
  // difficulty: z.number().describe("The estimated difficulty/effort of the task. Min: 1, Max: 4"),
  estimatedDurationInMins: z
    .number()
    .describe(`The estimated duration in minutes to complete the task.`),
});

export type GeneratedTask = z.infer<typeof generatedTaskSchema>;
