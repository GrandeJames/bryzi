import { openai } from "@ai-sdk/openai";
import { CoreSystemMessage, CoreUserMessage, ImagePart, streamObject } from "ai";
import { generateSignedUrls } from "./server/generateSignedUrls";
import { generatedTaskSchema } from "@/app/schemas/generatedTaskSchema";
import { createClient } from "@/utils/supabase/server";

export const maxDuration = 120;

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const imageUrls = await generateSignedUrls(user.id);

  if (!imageUrls || imageUrls.length === 0) {
    return new Response("No images found", { status: 400 });
  }

  console.log("image urls", imageUrls);

  const imageParts: ImagePart[] = imageUrls
    .filter((url) => typeof url === "string" && url.startsWith("http"))
    .map((url) => ({
      type: "image",
      image: url, // Use string URL directly
      mimeType: "image/webp",
    }));

  if (!imageParts || imageParts.length === 0) {
    return new Response("No valid images to process", { status: 400 });
  }

  console.log("image parts", imageParts);

  console.log("generatedTaskSchema:", generatedTaskSchema);
  if (!generatedTaskSchema) {
    return new Response("Schema is missing", { status: 500 });
  }

  const systemMessages: CoreSystemMessage[] = [
    {
      role: "system",
      content:
        "You are a helpful assistant that generates a list of class tasks from a course schedule using every image provided by the user. Dates should be in yyyy-MM-dd format. Reviews must be created for assessments (exams, quizzes, etc.) and be due the day before the date of the assessment.",
    },
  ];

  const userMessages: CoreUserMessage[] = imageParts.map((imagePart) => ({
    role: "user",
    content: [imagePart],
  }));

  const messages = [...systemMessages, ...userMessages];

  const result = streamObject({
    model: openai("gpt-4o-mini", {
      structuredOutputs: true,
    }),
    mode: "auto",
    schemaName: "tasks",
    schemaDescription: "A list of class tasks.",
    schema: generatedTaskSchema,
    output: "array",
    messages: messages,
  });

  return result.toTextStreamResponse();
}
