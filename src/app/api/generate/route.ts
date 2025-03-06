import { CoreSystemMessage, CoreUserMessage, FilePart, streamObject } from "ai";
import { generateSignedUrls } from "./server/generateSignedUrls";
import { generatedTaskSchema } from "@/app/schemas/generatedTaskSchema";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { google } from "@ai-sdk/google"

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

  if (!generatedTaskSchema) {
    return new Response("Schema is missing", { status: 500 });
  }

  const imageUrls = await generateSignedUrls(user.id);

  if (!imageUrls || imageUrls.length === 0) {
    return new Response("No images found", { status: 400 });
  }

  const imageParts: FilePart[] = imageUrls
    .filter((url) => typeof url === "string" && url.startsWith("http"))
    .map((url) => ({
      type: "file",
      data: url,
      mimeType: "image/webp",
    }));

  if (!imageParts || imageParts.length === 0) {
    return new Response("No valid images to process", { status: 400 });
  }

  const userMessages: CoreUserMessage[] = imageParts.map((imagePart) => ({
    role: "user",
    content: [imagePart],
  }));

  const currentYear = new Date().getFullYear();

  const systemMessages: CoreSystemMessage[] = [
    {
      role: "system",
      content: `
You are an AI assistant who helps create a student's semester-long to-do list for a course. 
Provide a sorted to-do list from an image or images of a single course calendar/schedule (typically found in a course syllabus).

Be aware of common abbreviations (e.g. "HW" = "Homework", "Asst" = "Assignment", "Chp" = "Chapter", "Chap" = "Chapter", "Ch" = "Chapter").

Follow the steps and rules below to generate the to-do list!

##Step-by-step Process:##
1. Extract All Tasks:
  - Parse every table row, bullet point, or text block.
  - DO NOT SKIP items with unclear dates or formats.
2. Categorize each task:
  - Assessment: explicitly labeled evaluations like "Exam," "Quiz," "Midterm," "Final," or "Test." Non-examples: Homework, labs, projects, readings, presentations.
  - Assignment: tasks assigned to students with deadlines to complete (e.g., "HW 1," "Essay 2", "Worksheet").
  - Lecture topic: (e.g., "Mathematical background").
  - Reading: reading materials like "Chapter 1," "Chapters 4-6," "Article on climate change."
  - Uncategorized: Everything else, except for lectures.
3. Create a to-do item(s) for each task with a title, deadline, and estimated duration.
  - Assessment tasks have both a study and an assessment to-do (e.g., "Midterm 1" = "Study for Midterm 1" and "Assessment: Midterm 1").
  - No other tasks has multiple to-dos.
4. Sort the to-dos by deadline in ascending order.
5. Provide the to-do list as a structured output.

##Multiple image rules:##
- If multiple images are provided, they are part of the same course schedule, so assume all images use the same table format.
- Combine all images into a single to-do list.

##Date rules:##
- Dates have month, day, and year (e.g., "8/22/2023" = "2023-08-22"). Weeks are not dates.
- If no year is in the date, use the current year: ${currentYear} (e.g., "March 15") = ${currentYear}-03-15).
- If no date is provided or is unclear: use 0000-00-00 (e.g., "Week 2" = "0000-00-00").
- DO NOT infer or assume a date from weeks or any other text. If no explicit date is provided, set the deadline as "0000-00-00"
- DO NOT INVENT OR ESTIMATE DATES FROM CONTEXT.
- If a date range is provided: Use the first date as the base date if it's a range (e.g., "8/22 (Tu), 8/24 (Th), 8/28 (Tu)": ${currentYear}-08-22).

##Sorting rules:##
- For to-dos with dates, sort them by deadline in ascending order.
- If no date is provided, sort from top to bottom but ensure the image order is maintained.
- Add to-dos with dates first, then to-dos without dates.

##Separation rules:##
- Separate each to-do item into individual to-dos (e.g., "HW 1, HW 2" = "HW 1" and "HW 2").
- Separate to-dos by the type of task (e.g., assessment, assignment, topic preparation, reading)


##To-do Title rules:##
- Use the original text from the image, though may be adjusted if separate items are in a single cell, and prefix with the todo type.

##To-do Deadline rules:##
- Only provide a deadline if a date is provided in the image.
- Follow the deadline rules for each to-do item, while following the date rules.

##To-do Estimated duration rules:##
- Provide an estimated duration in minutes for each to-do item based on the impact, difficulty, and task type base.


##Assessment task rules:##
- An assessment to-do must be created for each assessment (e.g., "Midterm 1" = "Assessment: Midterm 1").
- Study to-dos and assessment to-dos must be created for assessments.
- Assessment to-dos use the original due date from the image.

##Study task rules:##
- An additional study to-do must be created for each assessment (e.g., "Midterm 1" = "Study for Midterm 1").
- Only create study to-dos for assessments: "Exam," "Quiz," "Test," "Midterm," "Final," or "Assessment."
- Never create study to-dos for assignments, preparations, readings, or uncategorized tasks.
- Study to-dos must have a deadline of one day before the assessment.

##Assignment task rules:##
- An assignment to-do must be created for each assignment (e.g., "HW 1" = "Assignment: HW 1").
- Assignment to-dos uses the original due date from the image.

##Preparation task rules:##
- A preparation to-do must be created for lecture topics (e.g., "Mathematical background" = "Preparation: Mathematical background").
- Topic preparation to-dos must have a deadline of one day before the topic is covered.

##Reading task rules:##
- A reading to-do must be created for each reading, usually where chapters are provided (e.g., "Chapter 1" = "Read: Chapter 1").
- Reading to-dos must have a deadline of one day before the reading is covered.

##Uncategorized task rules:##
- An uncategorized to-do must be created for each task that does not fit the above categories (e.g., "Lab 1" = "Other: Lab 1").
- Uncategorized to-dos use the original due date from the image.
`.trim(),
    },
  ];

  const messages = [...systemMessages, ...userMessages];

  console.log("messages", messages);
  const model = google("gemini-2.0-flash-001", {
    structuredOutputs: true,
  });

  const result = streamObject({
    model: model,
    schemaName: "tasks",
    schemaDescription: "A list of course tasks.",
    schema: generatedTaskSchema,
    messages: messages,
    output: "array",
    onFinish: () => deleteUserImages(user.id, supabase),
    onError: (error) => {
      handleGenerationError(`${error}`, user.id, supabase);
    },
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

function handleGenerationError(errorMessage: string, userId: string, supabase: SupabaseClient) {
  console.error(errorMessage);
  deleteUserImages(userId, supabase);
  return new Response(errorMessage, { status: 500 });
}
