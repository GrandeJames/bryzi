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
  impact: z.number().describe("The estimated grade impact. Min: 1, Max: 4"),
  difficulty: z.number().describe("The estimated difficulty/effort of the task. Min: 1, Max: 4"),
  estimatedDurationInMins: z
    .number()
    .describe(
      "The estimated duration to complete the task, expressed in minutes. For example, a research paper may take 1200 minutes to complete. Higher impact and difficulty/effort tasks should have higher estimated durations."
    ),
});

export type GeneratedTask = z.infer<typeof generatedTaskSchema>;
