"use server";

import { supabase } from "@/lib/supabaseClient";

export async function generateSignedUrls(userId: string) {
  const BUCKET = "schedules";

  const testingFolder = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_SCHEDULES_TEST_FOLDER;
  const folder = testingFolder ? testingFolder : userId;

  console.log("Using folder:", folder);

  const { data: filesInFolder, error } = await supabase.storage.from(BUCKET).list(folder, {
    limit: 4,
  });

  if (error) {
    throw new Error("Error listing files in folder");
  }

  console.log("FilesInFolder list:", filesInFolder);

  const images = filesInFolder.filter((file) => {
    console.log("File", file);
    console.log("file metadata", file.metadata);
    console.log("file mimetype", file.metadata["mimetype"]);
    return file?.metadata["mimetype"]?.startsWith("image/");
  });

  if (!images || images.length === 0) {
    throw new Error("No images found");
  }

  const sortedImages = images?.sort((a, b) => {
    const [timestampA, indexA] = a.name.split("_").map((num) => parseInt(num, 10));
    const [timestampB, indexB] = b.name.split("_").map((num) => parseInt(num, 10));

    return timestampA - timestampB || indexA - indexB;
  });

  console.log("sortedImages", sortedImages);

  const signedUrls = await Promise.all(
    sortedImages.map(async (file) => {
      const { data: signedUrlData, error } = await supabase.storage
        .from("schedules")
        .createSignedUrl(`${folder}/${file.name}`, 60);

      if (error) {
        throw new Error(`Error signing ${file.name}`);
      }

      return signedUrlData?.signedUrl;
    })
  );

  if (!signedUrls || signedUrls.length === 0) {
    throw new Error("No signed URLs created");
  }

  return signedUrls;
}
