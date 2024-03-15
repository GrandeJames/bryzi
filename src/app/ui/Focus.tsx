"use client";

import { useState } from "react";
import Breath from "./Breath";
import Task from "./Task";
import Visual from "./Visual";

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

  const handleExitClick = () => {
    setStage("");
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {!stage && <button onClick={handleFocusClick}>Start</button>}
      {stage && <button onClick={handleExitClick}>x</button>}

      {stage === "breath" && <Breath onComplete={handleNextStage} />}
      {stage === "visual" && <Visual onComplete={handleNextStage} />}
      {stage === "task" && <Task onComplete={handleNextStage} />}

      {stage && stage !== "task" && <button onClick={handleNextStage}>Skip</button>}
    </div>
  );
}

export default Focus;
