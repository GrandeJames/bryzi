import { openai } from "@ai-sdk/openai";
import { generateObject, generateText, streamText } from "ai";
import { generateSignedUrl } from "./server/generateSignedUrl";
import { z } from "zod";

export const maxDuration = 60;

export async function POST(req: Request) {
  // 'data' contains the additional data that you have sent:
  //   const { data } = await req.json();

  const imageUrl = await generateSignedUrl();

  if (!imageUrl) {
    return new Response("Failed to generate signed URL", { status: 500 });
  }

  console.log("imageUrl", imageUrl);

  const result = await generateObject({
    model: openai("gpt-4o-mini", {
      structuredOutputs: true,
    }),
    schemaName: "tasks",
    schemaDescription: "A list of class tasks.",
    schema: z.object({
      tasks: z.array(
        z.object({
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
        })
      ),
    }),
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that generates a list of class tasks from an image of a schedule. Dates should be in yyyy-MM-dd format. Reviews must be created for assessments (exams, quizzes, etc.) and be due the day before the date of the assessment.",
      },
      {
        role: "user",
        content: [{ type: "image", image: new URL(imageUrl) }],
      },
    ],
  });

  console.log("result", JSON.stringify(result.object, null, 2));

  return new Response(JSON.stringify(result.object), { status: 200 });
}
