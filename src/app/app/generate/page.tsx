"use client";

import { MultiFileUpload } from "@/components/FileUpload";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { generatedTaskSchema } from "@/app/schemas/generatedTaskSchema";
import { z } from "zod";
import { useState } from "react";
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
  ShieldAlertIcon,
  SparkleIcon,
  SparklesIcon,
  WandSparklesIcon,
  Loader2Icon,
  Loader2,
} from "lucide-react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function GeneratePage() {
  const [showGeneratedTasks, setShowGeneratedTasks] = useState(false);

  const { object, submit, isLoading, stop } = useObject({
    api: "/api/generate",
    schema: z.array(generatedTaskSchema),
  });

  const router = useRouter();

  const handleGenerateClick = async () => {
    submit(undefined);

    // TODO: delete the image(s) from the server after processing
  };

  const handleDiscardClick = () => {};

  const handleSaveClick = () => {
    const saveConvertedTasks = async (tasks: any[]) => {
      console.log("saving coonverted tasks");
    };
  };

  return (
    <div>
      <div className="container max-w-4xl">
        {object && (
          <div>
            <h1 className="text-3xl font-bold text-neutral-300">Generated Tasks</h1>
            {object?.map((generatedTask, index) => (
              <div key={index}>
                <p>{generatedTask?.title}</p>
              </div>
            ))}
          </div>
        )}
        {!object && (
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
              <Select>
                <SelectTrigger className="bg-neutral-900 rounded-lg p-6">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="create" className="p-3 hover:cursor-pointer">
                    Create new course
                  </SelectItem>
                </SelectContent>
              </Select>
              <div>
                <MultiFileUpload />
              </div>
            </div>
            {/* <div>Options:</div> */}

            <div className="flex flex-col gap-2 my-7">
              <div className="flex items-center space-x-5 border border-neutral-700 rounded-lg p-4 w-fit">
                <AlertCircleIcon className="size-6 text-yellow-300/80 flex-shrink-0" />
                <p className="text-sm text-neutral-500">
                  Please ensure that you comply with your institution&apos;s AI usage and privacy
                  policies, as well as your instructor&apos;s guidelines when uploading your course
                  schedules. Only proceed if you have the necessary permissions to use this AI tool
                  for task generation.
                </p>
              </div>

              <div className="flex items-center space-x-5 border border-neutral-700 rounded-lg p-4 w-fit">
                <AlertCircleIcon className="size-6 text-yellow-300/80 flex-shrink-0" />
                <p className="text-sm text-neutral-500">
                  Your image(s) will be temporarily stored to be processed by OpenAI to analyze your
                  course schedule and generate the tasks. Your photos are deleted immediately after
                  the tasks are generated. Ensure that your files do not contain any sensitive
                  information and you are not violating any policies by uploading them.
                </p>
              </div>
            </div>
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
        )}
        {isLoading && object && (
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        )}
        {!isLoading && object && (
          <div>
            <button onClick={handleSaveClick} className="bg-orange-400">
              Save tasks
            </button>
            <button onClick={handleDiscardClick} className="border">
              Discard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
