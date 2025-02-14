import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { generateSignedUrl } from "./server/generateSignedUrl";
import { generatedTaskSchema } from "@/app/schemas/generatedTaskSchema";

export const maxDuration = 60;

export async function POST(req: Request) {
  // 'data' contains the additional data that you have sent:
  //   const { data } = await req.json();

  const imageUrl = await generateSignedUrl();

  if (!imageUrl) {
    return new Response("Failed to generate signed URL", { status: 500 });
  }

  console.log("imageUrl", imageUrl);

  const result = streamObject({
    model: openai("gpt-4o-mini", {
      structuredOutputs: true,
    }),
    schemaName: "tasks",
    schemaDescription: "A list of class tasks.",
    schema: generatedTaskSchema,
    output: "array",
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

  //   console.log("result", JSON.stringify(result.object, null, 2));

  return result.toTextStreamResponse();
}
