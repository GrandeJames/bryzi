"use client";

import { GeneratedTask } from "@/app/schemas/generatedTaskSchema";
import GeneratedTaskItem from "./GeneratedTaskItem";
import { useEffect, useRef } from "react";

export default function GeneratedTasksList({
  generatedTasks,
}: {
  generatedTasks: GeneratedTask[];
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log("Generated Tasks:", generatedTasks);
  }, [generatedTasks]);

  return (
    <div className="grid grid-cols-1 gap-3">
      {generatedTasks?.map((generatedTask, index) => (
        <GeneratedTaskItem task={generatedTask} key={index} taskIndex={index} />
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
}
