"use client";

import { BreathStage } from "./(focus-stages)/BreathStage";
import { FocusSessionStage } from "./(focus-stages)/FocusSessionStage";
import { VisualStage } from "./(focus-stages)/VisualStage";
import { useFocusStore } from "@/stores/focusSessionStore";
import { PrepareStage } from "./(focus-stages)/PrepareStage";
import Home from "./(home)/Home";

export function Focus() {
  const stage = useFocusStore((state) => state.stage);

  return (
    <>
      {!stage && <Home />}
      {stage === "breath" && <BreathStage />}
      {stage === "visual" && <VisualStage />}
      {stage === "task" && <FocusSessionStage />}
      {stage === "prepare" && <PrepareStage />}
    </>
  );
}
