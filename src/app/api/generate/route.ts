import { openai } from "@ai-sdk/openai";
import { generateText, streamText } from "ai";
import { generateSignedUrl } from "./server/generateSignedUrl";

export const maxDuration = 60;

export async function POST(req?: Request) {
  // 'data' contains the additional data that you have sent:
  //   const { data } = await req.json();

  const imageUrl = await generateSignedUrl();

  if (!imageUrl) {
    return new Response("Failed to generate signed URL", { status: 500 });
  }

  console.log("imageUrl", imageUrl);

  let generateTextResult;
  try {
    generateTextResult = await generateText({
      model: openai("gpt-4o-mini"),
      messages: [
        {
          role: "system",
          content: "Describe the image in detail.",
        },
        {
          role: "user",
          content: [{ type: "image", image: new URL(imageUrl) }],
        },
      ],
    });
  } catch (error) {
    console.error("Error generating text:", error);
    return new Response("Error generating text", { status: 500 });
  }

  console.log("generateTextResult", generateTextResult);

  // Call the language model
  //   const result = streamText({
  //     model: openai("gpt-4o-mini"),
  //     messages: [
  //       ...initialMessages,
  //       {
  //         role: "user",
  //         content: [
  //           { type: "text", text: currentMessage.content },
  //           //   { type: "image", image: new URL(data.imageUrl) },
  //           { type: "image", image: new URL(imageUrl) },
  //         ],
  //       },
  //     ],
  //   });

  // Respond with the stream
  //   return result.toDataStreamResponse();

  return new Response(JSON.stringify({ generateTextResult }), { status: 200 });
}
