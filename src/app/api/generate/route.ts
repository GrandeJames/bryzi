import { CoreSystemMessage, CoreUserMessage, FilePart, streamObject } from "ai";
import { generateSignedUrls } from "./server/generateSignedUrls";
import { generatedTaskSchema } from "@/app/schemas/generatedTaskSchema";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { aiPrompt } from "./server/ai-prompt";
import { google } from "@ai-sdk/google";

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

  let imageUrls;

  try {
    imageUrls = await generateSignedUrls(user.id);
  } catch (error) {
    console.error("Error generating signed urls", error);
    return new Response("Error generating signed URLs", { status: 500 });
  }

  // Using FileParts instead of ImageParts because ImageParts is not supported by Gemini model
  const fileParts: FilePart[] = imageUrls.map((url) => ({
    type: "file",
    data: url,
    mimeType: "image/webp",
  }));

  if (!fileParts || fileParts.length === 0) {
    return new Response("No valid images to process", { status: 400 });
  }

  const userMessages: CoreUserMessage[] = fileParts.map((filePart) => ({
    role: "user",
    content: [filePart],
  }));

  const systemMessages: CoreSystemMessage[] = [
    {
      role: "system",
      content: aiPrompt,
    },
  ];

  const messages = [...systemMessages, ...userMessages];

  const handleStreamComplete = () => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_STORAGE_SCHEDULES_TEST_FOLDER) {
      deleteUserImages(user.id, supabase);
    }
  };

  let streamError: any = null;

  const handleStreamError = (error: any) => {
    deleteUserImages(user.id, supabase);

    streamError = error;
  };

  const result = streamObject({
    model: google("gemini-2.0-flash-001", {
      structuredOutputs: true,
    }),
    temperature: 0.3,
    schemaName: "tasks",
    schemaDescription: "A list of course tasks.",
    schema: generatedTaskSchema,
    messages: messages,
    output: "array",
    onFinish: handleStreamComplete,
    onError: handleStreamError,
  });

  if (streamError) {
    return new Response(streamError.message, { status: 500 });
  }

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
