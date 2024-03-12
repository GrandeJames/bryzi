"use client";

import { useState } from "react";
import Breath from "./breath";
import Task from "./task";
import Visual from "./visual";

/**
 * TODO:
 * - All stages should be optional
 * - I should be able to skip to the next stage
 * - Refactor: use useEffect
 */

/**
 * Different Stage:
 * Get alert: deep breaths (inhale, hold, exhale). Can be in any order
 * Get focused: visual focus on an object for 30-60 seconds
 * Random Intermittent Reward
 * NSDR for learning sessions
 *
 * Note: stages can be optional
 */

function Focus() {
  const [stage, setStage] = useState("");
  const stages = ["breath", "visual", "task"];

  const handleFocusClick = () => {
    setStage("breath");
  };

  const handleNextStage = () => {
    const currentStageIndex = stages.indexOf(stage);
    const nextStage = stages[currentStageIndex + 1];

    if (nextStage) {
      setStage(nextStage);
    } else {
      setStage("");
    }
  };

  return (
    <div className="flex flex-col items-center content-center bg-neutral-400 h-[400px] w-[400px]">
      <div className="flex flex-col h-full">
        {stage === "breath" && <Breath onComplete={handleNextStage} />}
        {stage === "visual" && <Visual onComplete={handleNextStage} />}
        {stage === "task" && <Task onComplete={handleNextStage} />}
      </div>
      <div>
        {!stage && (
          <button onClick={handleFocusClick} className="bg-blue-500">
            Focus
          </button>
        )}
      </div>
    </div>
  );
}

export default Focus;
