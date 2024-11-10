"use client";

import { BreathStage } from "./(focus-stages)/BreathStage";
import { FocusSessionStage } from "./(focus-stages)/FocusSessionStage";
import { VisualStage } from "./(focus-stages)/VisualStage";
import { useFocusStore } from "@/hooks/useFocusStore";
import { PrepareStage } from "./(focus-stages)/PrepareStage";
import { HomeStage } from "./(focus-stages)/HomeStage";

export function Focus() {
  const { stage } = useFocusStore();

  return (
    <>
      {!stage && <HomeStage />}
      {stage === "breath" && <BreathStage />}
      {stage === "visual" && <VisualStage />}
      {stage === "task" && <FocusSessionStage />}
      {stage === "prepare" && <PrepareStage />}
    </>
  );
}
