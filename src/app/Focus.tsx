"use client";

import { Breath } from "./(focus-stages)/Breath";
import { Task } from "./(focus-stages)/Task";
import { Visual } from "./(focus-stages)/Visual";
import { useFocusStore } from "@/hooks/useFocusStore";

export function Focus() {
  const { stage, start } = useFocusStore();

  return (
    <div className="flex flex-col h-[80vh] justify-center items-center">
      {stage === "task" && (
        <div className="text-2xl font-bold fixed top-8 text-gray-200 underline underline-offset-4 lowercase">
          Code
        </div>
      )}
      {!stage && (
        <button onClick={start} className="text-3xl font-bold text-orange-400">
          start
        </button>
      )}
      {stage === "breath" && <Breath />}
      {stage === "visual" && <Visual />}
      {stage === "task" && <Task />}
    </div>
  );
}
