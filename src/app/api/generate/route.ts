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
You are an AI assistant that helps create a todo list to plan out a student's todos for the whole semester of a course. Provide a sorted todo list from an image or images of a single course calendar/schedule table that is commonly found in a course syllabus.


Be aware of common abbreviations (e.g. "HW" = "Homework", "Asst" = "Assignment").

Definitions:
- Assessment: Used to evaluate a student's understanding of a topic, usually done in class (e.g., exam, quiz). Assignments are not assessments. Non-assessment examples: homework, project, reading.
- Topic: A subject or theme that is covered in class.
- Preparation: Getting ready for a topic or assessment.

Each todo item must have a title, deadline, and estimated duration.


The course is "${"Programming in Mathematics"}".


Multiple image rules:
- If multiple images are provided, they are part of the same course schedule, so use the table header for all images.

Sorting rules:
- Sort the todos by the deadline in ascending order.

Date rules:
- If no date in the image: use 0000-00-00
- If the date is unclear or ambiguous: use 0000-00-00
- If no year is in the date, use the current year: ${currentYear} (e.g., "March 15"): ${currentYear}-03-15
- If a date range is provided: Use the first date as the base date if it's a range (e.g., "8/22 (Tu), 8/24 (Th), 8/28 (Tu)": ${currentYear}-08-22).


Title rules:
- Keep the original text from the image.

Deadline rules:
- Assessments (assessment examples: exam, quiz, assignment; non-assessment examples: homework, project, reading): Set the deadline to the day before the assessment.
- Topic preparations: Set the deadline to the day before the topic is covered.

Estimated duration rules:
- Provide an estimated duration in minutes for each todo item based on the impact, difficulty, and task type base.


Assessment rules:
- A study todo must be created for each assessment, in addition to the assessment todo (e.g., "Midterm 1" = "Study for Midterm 1" and "Midterm 1").
- The study todo must have a deadline one day before the assessment.

Topic Preparation rules:
- A preparation todo must be created for each lecture topic (e.g., "Mathematical background, Introduction of Jupyter notebook" = "Prepare for topic: Mathematical background" and "Prepare for topic: Introduction of Jupyter notebook"


EXAMPLE:

| Week | Date                    | Topics                                                              | Assignment  |
|------------------------------------------------------------------------------------------------------|-------------|
|1, 2  | 8/22 (Tu)               | Introduction, mathematical background                               |             |
|      | 8/24 (Th), 8/28 (Tu),   | Introduction of Jupyter notebook, insertion sort and merge sort     |             |
|      | 8/31 (Th)               |                                                                     |             |
|3, 4  | 9/5 (Tu)                | Growth of functions                                                 | Q1-1 due 9/8|
|      | 9/7 (Th), 9/12 (Tu)     | Divide-and-conquer: maximum-subarray problem, matrix multiplication | P1          |
|4, 5  | 9/14 (Th), 9/19 (Tu)    | Recurrence equations: Substitution method, recursion-tree method,   | *Q1-2       |
|      |                         | Master theorem                                                      |             |
|      | 9/21 (Th)               | **Midterm 1**                                                       |             |

Output:
- Title: Prepare for topic: Mathematical background; Deadline: 2022-08-21; Estimated duration: 60 mins
- Title: Prepare for topic - Introduction of Jupyter notebook; Deadline: 2022-08-23; Estimated duration: 40 mins
- Title: Prepare for topic - Introduction of insertion sort; Deadline: 2022-08-27; Estimated duration: 90 mins
- Title: Prepare for topic - Introduction of merge sort; Deadline: 2022-08-30; Estimated duration: 90 mins
- Title: Prepare for topic - Growth of functions; Deadline: 2022-09-04; Estimated duration: 120 mins
- Title: Q1-1; Deadline: 2022-09-06; Estimated duration: 180 mins
- Title: P1; Deadline: 2022-09-07; Estimated duration: 230 mins
- Title: Q1-2; Deadline: 2022-09-14; Estimated duration: 180 mins
- Title: Study for Midterm 1; Deadline: 2022-09-20; Estimated duration: 360 mins
- Title: Midterm 1; Deadline: 2022-09-21; Estimated duration: 75 mins
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
