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
      console.log("Optimizing images...");
      const compresedImages = await optimizeImages(images);
      console.log("Compressed images", compresedImages);

      console.log("Uploading images...");
      const BUCKET_NAME = "schedules";
      const directoryName = user.id;
      const data = await uploadBlobs(compresedImages, BUCKET_NAME, directoryName);
      console.log("Uploaded images", data);

      console.log("Submitting...");
      // submit(undefined); // this will call the internal API route and start the process
      console.log("Submitted");
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
