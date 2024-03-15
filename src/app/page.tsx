"use client";

import { useState } from "react";
import Menu from "./ui/Menu";
import Breath from "./ui/Breath";
import Task from "./ui/Task";
import Visual from "./ui/Visual";

export default function Page() {
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
    <div className="max-w-screen-lg mx-auto space-y-5">
      <main>
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
          {stage === "task" && (
            <Task onComplete={handleComplete} handleExitStage={handleExitClick} />
          )}
        </div>
      </main>
      <Menu />
    </div>
  );
}
