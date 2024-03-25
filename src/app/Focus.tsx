"use client";

import { Breath } from "./(focus-stages)/Breath";
import { Task } from "./(focus-stages)/Task";
import { Visual } from "./(focus-stages)/Visual";
import { useFocus } from "@/hooks/useFocus";

export function Focus() {
  const { stage, start, exit, complete, skipStage } = useFocus();

  return (
    <div className="flex flex-col h-[80vh] justify-center items-center">
      {!stage && (
        <button onClick={start} className="text-3xl font-bold text-orange-400">
          start
        </button>
      )}
      {stage === "breath" && (
        <Breath onComplete={skipStage} handleExit={exit} handleSkipStage={skipStage} />
      )}
      {stage === "visual" && (
        <Visual onComplete={skipStage} handleExit={exit} handleSkipStage={skipStage} />
      )}
      {stage === "task" && <Task onComplete={complete} handleExitStage={exit} />}
    </div>
  );
}
