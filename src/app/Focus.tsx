"use client";

import { useState } from "react";
import Breath from "./(focus-stages)/Breath";
import Task from "./(focus-stages)/Task";
import Visual from "./(focus-stages)/Visual";

export function Focus() {
  const [stage, setStage] = useState("");
  const stages = ["breath", "visual", "task"];

  const handleFocusClick = () => {
    setStage("breath");
  };

  const handleSkipStage = () => {
    const currentStageIndex = stages.indexOf(stage);
    const nextStage = stages[currentStageIndex + 1];

    if (nextStage) {
      setStage(nextStage);
    } else {
      setStage("");
    }
  };

  const handleExitClick = () => {
    setStage("");
  };

  const handleComplete = () => {
    setStage("");
    // TODO: reward points
  };

  return (
    <div className="flex flex-col h-[80vh] justify-center items-center">
      {!stage && (
        <button onClick={handleFocusClick} className="text-3xl font-bold text-orange-400">
          start
        </button>
      )}
      {stage === "breath" && (
        <Breath
          onComplete={handleSkipStage}
          handleExit={handleExitClick}
          handleSkipStage={handleSkipStage}
        />
      )}
      {stage === "visual" && (
        <Visual
          onComplete={handleSkipStage}
          handleExit={handleExitClick}
          handleSkipStage={handleSkipStage}
        />
      )}
      {stage === "task" && <Task onComplete={handleComplete} handleExitStage={handleExitClick} />}
    </div>
  );
}
