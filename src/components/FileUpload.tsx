"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

type UploadedFile = {
  file: File;
  name: string;
  size: string;
};

export function MultiFileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const validFiles = acceptedFiles.map((file) => ({
      file,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    }));
    setUploadedFiles((prev) => [...prev, ...validFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    multiple: true,
    onDropRejected: () => setError("Invalid file type or size"),
  });

  const removeFile = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append("files", file.file);
    });

    // Replace with your API call
    try {
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      alert("Upload functionality to be implemented");
    } catch (err) {
      setError("Upload failed");
    }
  };

  return (
    <Card className="w-full dark:bg-neutral-900 dark:border-neutral-800">
      <CardHeader>
        <CardTitle>Upload images of your course schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border border-neutral-800 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
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
          <p className="text-sm text-muted-foreground mt-2">PNG or JPG up to 5MB</p>
        </div>

        {error && <p className="text-destructive text-sm mt-2">{error}</p>}

        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">Selected Files:</h3>
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between p-3 border rounded-lg"
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

            <Button onClick={handleUpload} className="mt-4 w-full" size="lg">
              Upload {uploadedFiles.length} images
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
