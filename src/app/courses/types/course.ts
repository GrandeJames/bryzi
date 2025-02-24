import { z } from "zod";

export const CourseSchema = z
  .object({
    id: z.string(),
    name: z.string().nonempty("Course name is required."),
    abbreviation: z.string().optional(),
    startTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:mm)")
      .optional(),
    endTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:mm)")
      .optional(),
    days: z
      .array(z.number().int().min(1).max(5))
      .min(1, "At least one day must be selected")
      .optional(),
    isAsynchronous: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.isAsynchronous) {
      // If asynchronous, prevent setting startTime, endTime, and days
      if (data.startTime || data.endTime || data.days?.length) {
        ctx.addIssue({
          path: ["isAsynchronous"],
          message: "Asynchronous courses should not have start time, end time, or scheduled days.",
          code: z.ZodIssueCode.custom,
        });
      }
    } else {
      // If NOT asynchronous, these fields are required
      if (!data.startTime) {
        ctx.addIssue({
          path: ["startTime"],
          message: "Start time is required for synchronous courses.",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.endTime) {
        ctx.addIssue({
          path: ["endTime"],
          message: "End time is required for synchronous courses.",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.days || data.days.length === 0) {
        ctx.addIssue({
          path: ["days"],
          message: "At least one day must be selected for synchronous courses.",
          code: z.ZodIssueCode.custom,
        });
      }

      // Ensure endTime is after startTime if the course is NOT asynchronous
      if (data.startTime && data.endTime) {
        const [startHour, startMinute] = data.startTime.split(":").map(Number);
        const [endHour, endMinute] = data.endTime.split(":").map(Number);

        const startDate = new Date(1970, 0, 1, startHour, startMinute);
        const endDate = new Date(1970, 0, 1, endHour, endMinute);

        if (startDate >= endDate) {
          ctx.addIssue({
            path: ["endTime"],
            message: "End time must be after start time.",
            code: z.ZodIssueCode.custom,
          });
        }
      }
    }
  });

export type Course = z.infer<typeof CourseSchema>;
