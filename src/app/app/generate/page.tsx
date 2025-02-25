"use client";

import { MultiFileUpload } from "@/components/FileUpload";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { generatedTaskSchema } from "@/app/schemas/generatedTaskSchema";
import { z } from "zod";
import { useState } from "react";
import { AlertCircleIcon, ChevronLeftIcon, SparklesIcon, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { ClassTask } from "@/types/classTask";
import { v4 as uuidv4 } from "uuid";
import CourseSelection from "./CourseSelection";

export default function GeneratePage() {
  const [showGeneratedTasks, setShowGeneratedTasks] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState<ClassTask[]>([]);

  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>();

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
    const convertedClassTasks = object?.map((task) => ({
      ...task,
      id: uuidv4(),
      completed: false,
      actualDurationInMins: 0,
    }));

    // console.log("generatedClassTasks", generatedClassTasks);

    console.log("object", object);
  };

  const handleGeneratedTaskClick = (generatedTask: any) => {
    console.log("generatedTask clicked", generatedTask);
  };

  return (
    <div>
      <div className="container max-w-3xl">
        {object && (
          <div>
            <header>
              <h1 className="text-3xl font-bold text-neutral-300">Generated Tasks</h1>
              <h2 className="text-md text-neutral-400">
                Please ensure that the information is correct
              </h2>
            </header>
            <div className="grid grid-cols-1 gap-3">
              {object?.map((generatedTask, index) => (
                <div
                  key={index}
                  className="border border-neutral-800 bg-neutral-900/70 rounded-2xl p-4 col-span-1 grid grid-cols-12 relative"
                  onClick={() => handleGeneratedTaskClick(generatedTask)}
                >
                  <div className="col-span-11">
                    <div className="font-semibold text-base">{generatedTask?.title}</div>
                    <div className="flex gap-4">
                      <div className="text-sm flex gap-1 items-center text-neutral-400">
                        {/* <FlagIcon className="size-3" /> {generatedTask?.deadline?.dueDate}{" "} */}
                        Due: {generatedTask?.deadline?.dueDate} {generatedTask?.deadline?.dueTime}{" "}
                        3:30 PM
                      </div>
                      <div className="text-sm flex gap-1 items-center text-neutral-400">
                        Duration: {generatedTask?.estimatedDurationInMins} m
                      </div>
                      <div className="text-sm flex gap-1 items-center text-neutral-400">
                        {generatedTask?.difficulty} Effort
                      </div>
                      <div className="text-sm flex gap-1 items-center text-neutral-400">
                        {generatedTask?.impact} Impact
                      </div>
                    </div>
                  </div>
                  <Checkbox
                    defaultChecked={true}
                    className="absolute right-3 top-3 rounded-lg size-5 dark:data-[state=checked]:bg-orange-500/80 dark:data-[state=checked]:text-white data-[state=checked]:border-none data-[state=unchecked]:bg-neutral-800 data-[state=unchecked]:text-neutral-400"
                  />
                </div>
              ))}
            </div>
            {!isLoading && (
              <div className="flex justify-end gap-8 my-5">
                <button onClick={handleDiscardClick} className="">
                  Discard
                </button>
                <button onClick={handleSaveClick} className="bg-orange-400 py-3 px-8 rounded-lg">
                  Save checked tasks
                </button>
              </div>
            )}
            {isLoading && (
              <button type="button" onClick={() => stop()}>
                Stop
              </button>
            )}
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

            <div className="flex items-center space-x-5 border border-neutral-700 rounded-lg p-4 w-fit my-8">
              <AlertCircleIcon className="size-5 text-yellow-300/80 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-sm text-neutral-500">
                  Ensure compliance with your institution’s AI usage and privacy policies, as well
                  as your instructor’s guidelines when uploading your course schedules to be
                  processed by OpenAI (creator of ChatGPT). Only proceed if you have permission to
                  use this AI tool for task generation.
                </p>
                <p className="text-sm text-neutral-500">
                  Your images will be temporarily stored for analysis and task generation. They’re
                  deleted after task generation. Ensure your files are sensitive information-free
                  and comply with policies.
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
      </div>
    </div>
  );
}
