import { openai } from "@ai-sdk/openai";
import { CoreSystemMessage, CoreUserMessage, ImagePart, streamObject } from "ai";
import { generateSignedUrls } from "./server/generateSignedUrls";
import { generatedTaskSchema } from "@/app/schemas/generatedTaskSchema";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export const maxDuration = 60; // this is the max for the free tier

export async function POST(req: Request) {
  console.log("POST /api/generate ran");

  // TODO: sort the images. this is broken because the images are processed in parallel.

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

  const imageParts: ImagePart[] = imageUrls
    .filter((url) => typeof url === "string" && url.startsWith("http"))
    .map((url) => ({
      type: "image",
      image: url,
      mimeType: "image/webp",
    }));

  if (!imageParts || imageParts.length === 0) {
    return new Response("No valid images to process", { status: 400 });
  }

  if (!generatedTaskSchema) {
    return new Response("Schema is missing", { status: 500 });
  }

  const systemMessages: CoreSystemMessage[] = [
    {
      role: "system",
      content:
        "You are a helpful assistant that generates a list of school tasks from a course schedule using all the images provided by the user. The course schedule may be split into multiple images. Only relevant tasks should be generated. Additional tasks must be generated to review for assessments (including, but not limited to, exams and quizzes) and have a due date before the date of the actual assessment. A student may spend 6-9 hours on a 3-credit course per week, so the total weekly estimated duration should be proportional to the credit hours. Sort the tasks by the due date in ascending order. Dates are in the format YYYY-MM-DD.",
    },
  ];

  const userMessages: CoreUserMessage[] = imageParts.map((imagePart) => ({
    role: "user",
    content: [imagePart],
  }));

  const messages = [...systemMessages, ...userMessages];

  console.log("messages", messages);

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
    onFinish: () => deleteUserImages(user.id, supabase),
  });

  return result.toTextStreamResponse();
}

async function deleteUserImages(userId: string, supabase: SupabaseClient) {
  const BUCKET = "schedules";
  const folder = userId;

  const { data, error } = await supabase.storage.from(BUCKET).list(folder);

  if (error) {
    console.error("Error", error);
    return;
  }

  const files = data || [];

  for (const file of files) {
    const fileName = file.name;

    const { data: deletionData, error: deletionError } = await supabase.storage
      .from(BUCKET)
      .remove([`${folder}/${fileName}`]);

    if (deletionError) {
      console.error(`Error deleting file ${fileName}`, deletionError);
      return;
    }
  }
}
