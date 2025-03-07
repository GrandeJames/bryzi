"use client";

import { ImageUploader } from "@/components/ImageUpload";
import { ChevronLeftIcon, SparklesIcon, Loader2 } from "lucide-react";
import CourseSelection from "./CourseSelection";
import Disclaimer from "./Disclaimer";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InputPage({
  isLoading,
  handleGenerateClick,
  onImageUpdate,
  onCourseSelect,
}: {
  isLoading: boolean;
  handleGenerateClick: () => void;
  onImageUpdate: (files: File[]) => void;
  onCourseSelect: (courseId: string) => void;
}) {
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>();

  const router = useRouter();

  return (
    <div>
      <header className="mb-5 mt-5">
        <button
          className="flex gap-1 text-neutral-400 items-center my-5"
          onClick={() => {
            router.back();
          }}
        >
          <ChevronLeftIcon className="size-4" /> <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold dark:text-neutral-300 text-neutral-800">Generate Class Tasks</h1>
      </header>
      <div className="flex flex-col gap-3">
        <CourseSelection
          onSelectCourse={(courseId) => {
            setSelectedCourseId(courseId);
            onCourseSelect(courseId);
          }}
        />
        <div>
          <ImageUploader
            onFilesUpdated={(files: File[]) => {
              onImageUpdate(files);
            }}
          />
        </div>
      </div>
      {/* <div>Options:</div> */}

      <Disclaimer />

      <div className="flex justify-end my-5">
        <button
          className="bg-orange-500 px-20 py-3 flex gap-2 items-center disabled:bg-opacity-15 disabled:text-neutral-700 text-neutral-50 dark:text-neutral-100 rounded-md"
          onClick={handleGenerateClick}
          // disabled={true}
        >
          {isLoading ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
            <SparklesIcon className="size-4" />
          )}

          <span>Generate class tasks</span>
        </button>
      </div>
    </div>
  );
}
