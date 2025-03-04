"use server";

import { supabase } from "@/lib/supabaseClient";

export async function generateSignedUrls(userId: string) {
  const { data: files, error } = await supabase.storage.from("schedules").list(userId, {
    limit: 1000,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });

  console.log("Files list:", files);

  if (error) {
    console.error("Error:", error);
    return null;
  }

  if (!files || files.length === 0) {
    console.error("No files found");
    return [];
  }

  // This is necessary to ensure the generated URLs are in the correct order and thus the image messages are in the correct order.
  const sortedFilesByIndex = files.sort((a, b) => {
    // I'll need to update this if I ever change the file naming convention. A way to solve this is to store the index in the metadata of the file.
    const aIndex = parseInt(a.name.split("_")[1].split(".")[0]);
    const bIndex = parseInt(b.name.split("_")[1].split(".")[0]);

    return aIndex - bIndex;
  });

  const fileUrls = await Promise.all(
    sortedFilesByIndex.map(async (file) => {
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from("schedules")
        .createSignedUrl(`${userId}/${file.name}`, 60);

      if (signedUrlError) {
        console.error(`Error signing ${file.name}:`, signedUrlError);
        return null;
      }

      return signedUrlData?.signedUrl;
    })
  );

  return fileUrls.filter((url): url is string => !!url);
}
