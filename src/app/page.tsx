"use client";

import { useFocusSessionStore } from "@/stores/focusSessionStore";
import { BreathStage } from "./focus-stages/BreathStage";
import { PrepareStage } from "./focus-stages/PrepareStage";
import TimerStage from "./focus-stages/TimerStage";
import { VisualStage } from "./focus-stages/VisualStage";
import Home from "./(home)/Home";

export default function Page() {
    const stage = useFocusSessionStore((state) => state.sessionStage);
  
  return (
    <>
      <div className="flex-1 px-5">
        {!stage && <Home />}
        {stage === "breath" && <BreathStage />}
        {stage === "visual" && <VisualStage />}
        {stage === "timer" && <TimerStage />}
        {stage === "prepare" && <PrepareStage />}
      </div>
    </>
  );
}
