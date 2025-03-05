import { z } from "zod";

export const generatedTaskSchema = z.object({
  title: z.string().describe("The title of the task"),
  deadline: z.object({
    dueDate: z.string().describe(
      `STRICT RULES! Date in YYYY-MM-DD format. Follow EXACTLY:
        1. If NO DATE in image: 0000-00-00
        2. If PARTIAL DATE (e.g., "March 15"): ${new Date().getFullYear()}-03-15
        3. If UNCLEAR/AMBIGUOUS: 0000-00-00
        NEVER INVENT DATES! Current year: ${new Date().getFullYear()}`
    ),
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
