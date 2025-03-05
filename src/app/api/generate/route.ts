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

  if (!generatedTaskSchema) {
    return new Response("Schema is missing", { status: 500 });
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

  const userMessages: CoreUserMessage[] = imageParts.map((imagePart) => ({
    role: "user",
    content: [imagePart],
  }));

  const currentYear = new Date().getFullYear();

  const systemMessages: CoreSystemMessage[] = [
    {
      role: "system",
      content: `
You are an AI assistant that helps create a student's semester-long todo list for a course. Provide a sorted todo list from an image or images of a single course calendar/schedule (typically found in a course syllabus).


Be aware of common abbreviations (e.g. "HW" = "Homework", "Asst" = "Assignment", "Chp" = "Chapter", "Chap" = "Chapter", "Ch" = "Chapter").

Definitions:
- Assessment: Used to evaluate a student's understanding of a topic, usually done in class (e.g., exam, quiz). Assignments are not assessments. Non-assessment examples: homework, project, reading.
- Topic: A subject or theme that is covered in class.
- Preparation: Getting ready for a topic or assessment.

Assignments are not assessments.

Each todo item must have a title, deadline, and estimated duration.

Multiple image rules:
- If multiple images are provided, they are part of the same course schedule, so use the table header for all images.

Date rules:
- Dates have month, day, and year (e.g., "8/22/2023" = "2023-08-22"). Weeks are not dates.
- If no year is provided: use the current year.
- If no date is provided or is unclear: use 0000-00-00 (e.g., "Week 2" = "0000-00-00").
- DO NOT infer or assume a date from weeks or any other text. If no explicit date is provided, set the deadline as "0000-00-00"
- DO NOT INVENT OR ESTIMATE DATES FROM CONTEXT.
- If no year is in the date, use the current year: ${currentYear} (e.g., "March 15") = ${currentYear}-03-15).
- If a date range is provided: Use the first date as the base date if it's a range (e.g., "8/22 (Tu), 8/24 (Th), 8/28 (Tu)": ${currentYear}-08-22).

Sorting rules:
- For todos with dates, sort them by deadline in ascending order.
- If no date is provided, sort from top to bottom but ensure the image order is maintained.
- Add todos with dates first, then todos without dates.

Separation rules:
- Separate each todo item into individual todos (e.g., "HW 1, HW 2" = "HW 1" and "HW 2").
- Separate todos by the type of task (e.g., assessment, assignment, topic preparation, reading)


Title rules:
- Use the original text from the image, though may be adjusted if separate items are in a single cell.

Deadline rules:
- Only provide a deadline if a date is provided in the image.
- Follow the deadline rules for each todo item, while following the date rules.

Estimated duration rules:
- Provide an estimated duration in minutes for each todo item based on the impact, difficulty, and task type base.


Assessment rules:
- A study todo must be created for each assessment, in addition to the assessment todo (e.g., "Midterm 1" = "Study for Midterm 1" and "Midterm 1"). A study todo should not be created for non-assessments (e.g., homework, project).
- DO NOT CREATE A STUDY TODO FOR NON-ASSESSMENTS.
- Study todos must have a deadline one day before the assessment.
- Assessment todos use the original due date from the image.

Assignment rules:
- An assignment todo must be created for each assignment (e.g., "HW 1" = "HW 1").
- Assignment todos uses the original due date from the image.

Topic Preparation rules:
- Preparation todos must be created for every lecture topic (e.g., "Mathematical background; Introduction of Jupyter notebook" = "Preparation: Mathematical background" and "Preparation: Introduction of Jupyter notebook").
- Topic preparation todos must have a deadline one day before the topic is covered.

Reading rules:
- A reading todo must be created for every reading, usually where chapters are provided (e.g., "Chapter 1" = "Read Chapter 1").
- Reading todos must have a deadline one day before the reading is covered.
`.trim(),
    },
  ];

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
