import { openai } from "@ai-sdk/openai";
import { CoreSystemMessage, CoreUserMessage, ImagePart, streamObject } from "ai";
import { generateSignedUrls } from "./server/generateSignedUrls";
import { generatedTaskSchema } from "@/app/schemas/generatedTaskSchema";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export const maxDuration = 60; // this is the max for the free tier

export async function POST(req: Request) {
  console.log("POST /api/generate ran");
  const { courseName }: { courseName: string } = await req.json();

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
      content: `
Act as an expert task planning assistant who takes image(s) of a course schedule/calendar table to generate a list of tasks for the student to do to use. This data will be used in a task management system, essentially a digital student planner. Follow all rules and guidelines!

DEFINITION(S):
- Assessment: Exams, quizzes, or other graded evaluations

IMAGE PROCESSING:
1. Analyze ALL images collectively as single schedule
2. Extract LITERAL text values first
3. Flag uncertain dates as 0000-00-00

TASK GENERATION RULES:
1. REQUIRED TASKS TO INCLUDE:
   - All academic tasks, including, but not limited to, course assessments, readings, topics, assignments, projects, and reviews.

2. DATE HANDLING:
   - If no date: Use 0000-00-00
   - If no year: Use ${new Date().getFullYear()}
   - Date ranges → use FIRST date
   - All types of assessments (exams, quizzes, etc.) are due the day before the actual date listed

EXAMPLE OUTPUT:
- Preview Cellular Biology
- Study for Midterm Exam 1
- Study for Final Exam
- Homework 2
- Read Chapter 3
- Write Essay 1
- Research Project
- Prepare for Presentation
- Review for Quiz 1
- Complete Assignment 4
- Submit Discussion Post
- Review for Exam 2
`.trim(),
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
    schemaDescription: "A list of course tasks.",
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
