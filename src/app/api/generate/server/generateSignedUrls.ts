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

  const fileUrls = await Promise.all(
    files.map(async (file) => {
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
