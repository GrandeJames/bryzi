"use client";

import { createClient } from "@/utils/supabase/client";

async function uploadBlobs(blobs: Blob[], bucketName: string, directoryName: string) {
  const supabase = createClient();

  await Promise.all(
    blobs.map(async (blob, index) => {
      const fileExtension = blob.type.split("/")[1];

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(`${directoryName}/${new Date().getTime()}_${index}.${fileExtension}`, blob);

      if (error) {
        console.error("Upload error:", error.message);
        throw error;
      } else {
        console.log("Upload successful:", data.path);
        return data.path;
      }
    })
  );
}

export default uploadBlobs;
