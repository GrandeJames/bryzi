import { z } from "zod";

export const todoItemSchema = z
  .object({
    title: z.string().describe("Todo item title (e.g. 'Read Chapter 1' or 'Study for Midterm 1')."),
    category: z
      .enum(["Preparation", "Reading", "Study", "Assignment", "Assessment", "Uncategorized"])
      .optional()
      .describe("Todo item category/type."),
    deadline: z
      .object({
        date: z.string().describe(`Todo item due date in YYYY-MM-DD format`).optional(),
        time: z
          .string()
          .describe(
            "Todo item due time in 24 hour HH:MM format. Use 23:59 if no time is specified."
          )
          .optional()
          .default("23:59"),
      })
      .describe("Todo item deadline.")
      .optional(),
    details: z
      .string()
      .optional()
      .describe(`Optional additional details about the todo item (e.g. "Sections 9.3-9.5").`),
    duration: z
      .number()
      .optional()
      .describe(`The estimated duration, in minutes, to complete the todo item.`),
  })
  .describe("Generated to-do item.");

export type GeneratedTask = z.infer<typeof todoItemSchema>;
