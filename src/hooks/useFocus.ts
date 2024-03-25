import { useState } from "react";

export function useFocus() {
  const [stage, setStage] = useState("");
  const stages = ["breath", "visual", "task"];

  const start = () => {
    setStage("breath");
  };

  const skipStage = () => {
    const currentStageIndex = stages.indexOf(stage);
    const nextStage = stages[currentStageIndex + 1];

    if (nextStage) {
      setStage(nextStage);
    } else {
      setStage("");
    }
  };

  const exit = () => {
    setStage("");
  };

  const complete = () => {
    setStage("");
    // TODO: reward points
  };

  return { stage, start, skipStage, exit, complete };
}
