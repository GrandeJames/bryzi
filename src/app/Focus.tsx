"use client";

import { TotalProgress } from "@/components/TotalProgress";
import { Breath } from "./(focus-stages)/Breath";
import { Task } from "./(focus-stages)/Task";
import { Visual } from "./(focus-stages)/Visual";
import { useFocusStore } from "@/hooks/useFocusStore";
import { Menu } from "./Menu";
import { Prepare } from "./(focus-stages)/Prepare";

export function Focus() {
  const { stage, start } = useFocusStore();

  return (
    <>
      {!stage && (
        <div className="my-3">
          <TotalProgress />
        </div>
      )}

      <div className="flex flex-col h-[80vh] justify-center items-center">
        {!stage && (
          <>
            <button onClick={start} className="text-3xl font-bold text-orange-400">
              start
            </button>
            <Menu />
          </>
        )}
        {stage === "breath" && <Breath />}
        {stage === "visual" && <Visual />}
        {stage === "task" && <Task />}
        {stage === "prepare" && <Prepare />}
      </div>
    </>
  );
}
