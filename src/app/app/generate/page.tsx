"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { GeneratedTask, generatedTaskSchema } from "@/app/schemas/generatedTaskSchema";
import { z } from "zod";
import InputPage from "./InputPage";
import OutputPage from "./OutputPage";
import { useState } from "react";

export default function GeneratePage() {
  const [generatedTasks, setGeneratedTasks] = useState<GeneratedTask[] | undefined>(undefined);

  // const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>();

  const { object, submit, isLoading, stop, error } = useObject({
    api: "/api/generate",
    schema: z.array(generatedTaskSchema),
    onFinish(result) {
      console.log("Finished", result);

      const { object, error } = result;

      if (error) {
        console.error("Error", error);
        return;
      }

      setGeneratedTasks(object);
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  const handleGenerateClick = async () => {
    // TODO: save the image(s) to the server

    submit("hi test"); // this will call the internal API route and start the process

    // TODO: delete all of the user's (course schedule) image(s) from the server after processing
  };

  const handleSaveTasks = () => {
    console.log("Accepted and saved tasks");

    // const convertedClassTasks = object?.map((task: any) => ({
    //   ...task,
    //   id: uuidv4(),
    //   completed: false,
    //   actualDurationInMins: 0,
    // }));
  };

  return (
    <div className="container max-w-3xl">
      {error && <div>Error: {error.message}</div>}
      {object ? (
        <OutputPage
          object={object}
          isLoading={isLoading}
          stop={stop}
          onSaveTasks={handleSaveTasks}
        />
      ) : (
        <InputPage isLoading={isLoading} handleGenerateClick={handleGenerateClick} />
      )}
    </div>
  );
}
