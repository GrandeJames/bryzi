"use client";

import { GeneratedTask } from "@/app/schemas/generatedTaskSchema";
import GeneratedTaskItem from "./GeneratedTaskItem";
import { useEffect, useRef } from "react";

export default function GeneratedTasksList({ object }: { object: GeneratedTask[] }) {
  console.log("object", object);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [object]);

  return (
    <div className="grid grid-cols-1 gap-3">
      {object?.map((generatedTask, index) => (
        <GeneratedTaskItem task={generatedTask} key={index} />
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
}
