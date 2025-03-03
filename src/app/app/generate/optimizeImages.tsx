"use client";

import imageCompression from "browser-image-compression";

async function optimizeImages(images: File[]) {
  let compressedImages: Blob[] = [];

  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp",
    alwaysKeepResolution: true,
  };

  let promises = images.map(async (imageFile) => {
    const compressedFile = await imageCompression(imageFile, options);
    compressedImages.push(compressedFile);

    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    console.error("Error compressing images", error);
  }

  return compressedImages;
}

export default optimizeImages;
