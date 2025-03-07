"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

type UploadedFile = {
  file: File;
  name: string;
  size: string;
};

export function ImageUploader({
  onFilesUpdated,
  imageLimit = 5,
  totalSizeLimitMB = 5,
}: {
  onFilesUpdated: (files: File[]) => void;
  imageLimit?: number;
  totalSizeLimitMB?: number;
}) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const prevUploadedFiles = useRef<UploadedFile[]>([]);

  const areFilesEqual = (prevFiles: UploadedFile[], newFiles: UploadedFile[]) => {
    if (prevFiles.length !== newFiles.length) return false;
    return prevFiles.every((prevFile, index) => {
      const newFile = newFiles[index];
      return prevFile.name === newFile.name && prevFile.size === newFile.size;
    });
  };

  useEffect(() => {
    if (!areFilesEqual(prevUploadedFiles.current, uploadedFiles)) {
      onFilesUpdated(uploadedFiles.map((file) => file.file));
      prevUploadedFiles.current = uploadedFiles;
    }
  }, [uploadedFiles]);

  const onAdd = (acceptedFiles: File[]) => {
    setError(null);

    if (uploadedFiles.length + acceptedFiles.length > imageLimit) {
      setError(`You can only upload up to ${imageLimit} images`);
      return;
    }

    const formattedFiles = acceptedFiles.map((file) => ({
      file,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    }));

    setUploadedFiles((prev) => {
      const filteredPrev = prev.filter((existingFile) => {
        return !formattedFiles.some((newFile) => newFile.name === existingFile.name);
      });

      return [...filteredPrev, ...formattedFiles];
    });
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onAdd,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    multiple: true,
    onDropRejected: () => {
      setError(
        `Please ensure the files are images and are less than ${totalSizeLimitMB}MB in total`
      );
    },
    maxSize: totalSizeLimitMB * 1024 * 1024,
  });

  return (
    <Card className="w-full dark:bg-neutral-900 dark:border-neutral-800">
      <CardHeader>
        <CardTitle>Upload images of your course schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border border-neutral-800 border-dashed rounded-lg p-16 text-center cursor-pointer transition-colors
            ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/30 hover:border-muted-foreground/50"
            }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the images here...</p>
          ) : (
            <p>Drag & drop images here, or click to select</p>
          )}
          <p className="text-sm text-muted-foreground mt-2">PNG, JPG, or WEBP up to 5MB</p>
        </div>

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">Selected Images:</h3>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-neutral-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{file.size}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(file.name)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
