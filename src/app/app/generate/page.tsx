"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { GeneratedTask, generatedTaskSchema } from "@/app/schemas/generatedTaskSchema";
import { z } from "zod";
import InputPage from "./InputPage";
import OutputPage from "./OutputPage";
import { useEffect, useState } from "react";
import optimizeImages from "./optimizeImages";
import uploadBlobs from "./uploadBlobs";
import { createClient } from "@/utils/supabase/client";

export default function GeneratePage() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Retrieving session is completely fine in this case because supabase storage has row level security so the user can only upload to their own folder.
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };

    checkAuth();
  }, [supabase]);

  const [generatedTasks, setGeneratedTasks] = useState<GeneratedTask[] | undefined>(undefined);

  const [images, setImages] = useState<File[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>();

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

      // TODO: delete all of the user's (course schedule) image(s) from the server after processing, assuming that i can onnly delete after it's done processing. im not sure if can delete right away after generating urls.
      // deleting is necessary so that no one can access the images after they are done being processed as well as prevent duplicates
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  const handleImageUpdate = async (files: File[]) => {
    console.log("handle image update", files);

    setImages(files);
  };

  const handleCourseSelect = (courseId: string) => {
    console.log("handlecourse select", courseId);
    setSelectedCourseId(courseId);
  };

  const handleGenerateClick = async () => {
    console.log("Generate clicked");

    if (!user) {
      console.error("User not authenticated", user);

      // TODO: redirect to login?
      return;
    } else {
      console.log("User authenticated", user);
    }

    if (!images.length) {
      console.error("No images selected");
      return;
    }

    try {
      const BUCKET_NAME = "schedules";
      const directoryName = user.id;

      console.log("Optimizing images...");
      const compresedImages = await optimizeImages(images);

      console.log("Uploading images...");
      await uploadBlobs(compresedImages, BUCKET_NAME, directoryName);

      console.log("submitting...");
      submit("Images of course schedule");
    } catch (error) {
      console.error("Error generating", error);
      return;
    }

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
    <div className="container">
      {error && <div>Error: {error.message}</div>}
      {object ? (
        <OutputPage
          object={object}
          isLoading={isLoading}
          stop={stop}
          onSaveTasks={handleSaveTasks}
        />
      ) : (
        <InputPage
          isLoading={isLoading}
          handleGenerateClick={handleGenerateClick}
          onImageUpdate={handleImageUpdate}
          onCourseSelect={handleCourseSelect}
        />
      )}
    </div>
  );
}
