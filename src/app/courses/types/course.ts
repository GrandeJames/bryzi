import { z } from "zod";

export const CourseSchema = z
  .object({
    id: z.string(),
    name: z.string().nonempty("Course name is required."),
    abbreviation: z.string().optional(),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:mm)."),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:mm)."),
    days: z
      .array(z.number().int().min(1).max(5))
      .min(1, { message: "At least one day must be selected" }),
  })
  .refine(
    (data) => {
      const [startHour, startMinute] = data.startTime.split(":").map(Number);
      const [endHour, endMinute] = data.endTime.split(":").map(Number);

      const startDate = new Date(1970, 0, 1, startHour, startMinute); // Arbitrary date, just comparing time
      const endDate = new Date(1970, 0, 1, endHour, endMinute);

      return startDate < endDate;
    },
    {
      message: "End time must be after start time.",
      path: ["endTime"], // This attaches the error to the endTime field
    }
  );

export type Course = z.infer<typeof CourseSchema>;
