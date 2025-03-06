import { CoreSystemMessage, CoreUserMessage, FilePart, streamObject } from "ai";
import { generateSignedUrls } from "./server/generateSignedUrls";
import { generatedTaskSchema } from "@/app/schemas/generatedTaskSchema";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { aiPrompt } from "./server/ai-prompt";
import { google } from "@ai-sdk/google"

export const dynamic = 'force-dynamic';
// export const maxDuration = 60; // this is the max for the free tier
export const maxDuration = 900; // this is the max for the free tier


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

  const systemMessages: CoreSystemMessage[] = [
    {
      role: "system",
      content: aiPrompt,
    },
  ];

  const messages = [...systemMessages, ...userMessages];

  console.log("messages", messages);
  const model = google("gemini-2.0-flash-001", {
    structuredOutputs: true,
  });

  const result = streamObject({
    model: model,
    temperature: 0.3,
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
