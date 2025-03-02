"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { generatedTaskSchema } from "@/app/schemas/generatedTaskSchema";
import { z } from "zod";
import InputPage from "./InputPage";
import OutputPage from "./OutputPage";

export default function GeneratePage() {
  // const [showGeneratedTasks, setShowGeneratedTasks] = useState(false);
  // const [generatedTasks, setGeneratedTasks] = useState<ClassTask[]>([]);

  // const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>();

  const { object, submit, isLoading, stop } = useObject({
    api: "/api/generate",
    schema: z.array(generatedTaskSchema),
  });

  const handleGenerateClick = async () => {
    submit(undefined);

    // TODO: delete the image(s) from the server after processing
  };

  return (
    <div className="container max-w-3xl">
      {object && <OutputPage object={object} isLoading={isLoading} stop={stop} />}
      {!object && <InputPage isLoading={isLoading} handleGenerateClick={handleGenerateClick} />}
    </div>
  );
}
