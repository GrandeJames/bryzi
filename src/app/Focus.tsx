"use client";

import { TotalProgress } from "@/components/TotalProgress";
import { BreathStage } from "./(focus-stages)/BreathStage";
import { FocusSessionStage } from "./(focus-stages)/FocusSessionStage";
import { VisualStage } from "./(focus-stages)/VisualStage";
import { useFocusStore } from "@/hooks/useFocusStore";
import { PrepareStage } from "./(focus-stages)/PrepareStage";
import { Menu } from "@/components/Menu";

export function Focus() {
  const { stage, start } = useFocusStore();

  return (
    <>
      {!stage && <TotalProgress className="my-3" />}

      <div className="flex flex-col h-[80vh] justify-center items-center">
        {!stage && (
          <>
            <button onClick={start} className="text-3xl font-bold text-orange-400">
              start
            </button>
            <Menu />
          </>
        )}
        {stage === "breath" && <BreathStage />}
        {stage === "visual" && <VisualStage />}
        {stage === "task" && <FocusSessionStage />}
        {stage === "prepare" && <PrepareStage />}
      </div>
    </>
  );
}
