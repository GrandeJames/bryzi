"use client";

import { MultiFileUpload } from "@/components/FileUpload";
import { ChevronLeftIcon, SparklesIcon, Loader2 } from "lucide-react";
import CourseSelection from "./CourseSelection";
import Disclaimer from "./Disclaimer";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InputPage({
  isLoading,
  handleGenerateClick,
}: {
  isLoading: boolean;
  handleGenerateClick: () => void;
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
        <h1 className="text-3xl font-bold text-neutral-300">Generate Class Tasks</h1>
      </header>
      <div className="flex flex-col gap-3">
        <CourseSelection
          onSelectCourse={(courseId) => {
            console.log("Course selected", courseId);
            setSelectedCourseId(courseId);
          }}
        />
        <div>
          <MultiFileUpload />
        </div>
      </div>
      {/* <div>Options:</div> */}

      <Disclaimer />

      <div className="flex justify-end my-5">
        <button
          className="bg-orange-500 px-20 py-3 flex gap-2 items-center disabled:bg-opacity-15 disabled:text-neutral-700 rounded-md"
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
