"use client";

import { useState } from "react";
import Breath from "./breath";
import Visual from "./visual";
import Task from "./task";

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
 * Focus session: 90 mins max
 * Random Intermittent Reward
 * NSDR for learning sessions
 *
 * Note: stages can be optional
 */

// TODO: stages: breathing (inhale, hold, exhale), visual, focus
function Focus() {
  const [stage, setStage] = useState("");

  const handleFocusClick = () => {
    setStage("breath");
  };

  return (
    <div className="flex flex-col items-center content-center bg-neutral-400 h-[400px] w-[400px]">
      <div className="flex flex-col h-full">
        {stage === "breath" && <Breath />}
        {stage === "visual" && <Visual />}
        {stage === "task" && <Task />}
      </div>
      <div>{!stage && <button onClick={handleFocusClick}>Focus</button>}</div>
    </div>
  );
}

export default Focus;
