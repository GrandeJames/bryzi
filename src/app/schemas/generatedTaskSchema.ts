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
  impact: z
    .number()
    .describe(
      "Grade impact (1-4): 1=Low, 2=Medium, 3=High, 4=Critical\nExamples: Exam=4, Essay=4, Quiz=3, Discussion Post=1, Reading=1"
    ),
  difficulty: z.number().describe("The estimated difficulty/effort of the task. Min: 1, Max: 4"),
  estimatedDurationInMins: z.number().describe(
    `Calculate duration using this MATRIX (impact × difficulty) × TASK TYPE BASE:
  TASK TYPE BASE MINUTES:
  1. Readings/Short Assignments: 30-60
  2. Homework Problems: 45-90
  3. Quizzes/Short Exams: 15-45
  4. Essays/Papers: 
     - 1-2 pages: 90-120
     - 3-5 pages: 180-300
     - 5+ pages: 300-600
  5. Projects:
     - Small: 120-180
     - Medium: 240-360
     - Large: 480-720
  6. Exam Preparation:
     - Quiz: 30-60
     - Midterm: 90-180
     - Final: 180-360
  7. Administrative Tasks: 5-15
  
  FORMULA:
  (Impact + Difficulty) / 2 × Base Duration
  
  EXAMPLE CALCULATIONS:
  - Research paper (Impact 4, Difficulty 4) → (4+4)/2 × 300 = 4 × 300 = 1200min
  - Math homework (Impact 2, Difficulty 3) → (2+3)/2 × 60 = 2.5 × 60 = 150min
  - Quick quiz (Impact 1, Difficulty 1) → (1+1)/2 × 30 = 1 × 30 = 30min
  
  ADJUST BASED ON:
  - Word/page count
  - Complexity indicators
  - Course`
  ),
});

export type GeneratedTask = z.infer<typeof generatedTaskSchema>;
