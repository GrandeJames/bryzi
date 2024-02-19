"use client";

import { useState } from "react";

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

const INHALE_TIME_SECONDS = 4;
const HOLD_TIME_SECONDS = 7;
const EXHALE_TIME_SECONDS = 8;
const BREATHING_CYCLES = 4;
const VISUAL_FOCUS_TIME_SECONDS = 60;
const FOCUS_SESSION_TIME_SECONDS = 90 * 60;

function Focus() {
  const [stage, setStage] = useState(""); // inhale, hold, exhale, visual, focus

  const totalBreathingTime =
    (INHALE_TIME_SECONDS + HOLD_TIME_SECONDS + EXHALE_TIME_SECONDS) * BREATHING_CYCLES;

  const handleFocusClick = () => {
    for (let i = 0; i < BREATHING_CYCLES; i++) {
      setTimeout(() => {
        setStage("inhale");
        console.log("inhale");
      }, i * (INHALE_TIME_SECONDS + HOLD_TIME_SECONDS + EXHALE_TIME_SECONDS) * 1000);

      setTimeout(() => {
        setStage("hold");
        console.log("hold");
      }, i * (INHALE_TIME_SECONDS + HOLD_TIME_SECONDS + EXHALE_TIME_SECONDS) * 1000 + INHALE_TIME_SECONDS * 1000);

      setTimeout(() => {
        setStage("exhale");
        console.log("exhale");
      }, i * (INHALE_TIME_SECONDS + HOLD_TIME_SECONDS + EXHALE_TIME_SECONDS) * 1000 + (INHALE_TIME_SECONDS + HOLD_TIME_SECONDS) * 1000);
    }

    setTimeout(() => {
      setStage("visual");
      console.log("visual");
    }, totalBreathingTime * 1000);

    setTimeout(() => {
      setStage("focus");
      console.log("focus");
    }, (totalBreathingTime + VISUAL_FOCUS_TIME_SECONDS) * 1000);

    setTimeout(() => {
      setStage("");
      console.log("done");
    }, (totalBreathingTime + VISUAL_FOCUS_TIME_SECONDS + FOCUS_SESSION_TIME_SECONDS) * 1000);
  };

  return (
    <div className="flex flex-col items-center content-center bg-neutral-400 h-[400px] w-[400px]">
      <div className="flex flex-col h-full">
        {stage === "inhale" && <div>Inhale through your nose</div>}
        {stage === "hold" && <div>Hold your breath</div>}
        {stage === "exhale" && <div>Exhale completely with a woosh sound</div>}
        {stage === "visual" && (
          <>
            <h1>Focus on the object for {VISUAL_FOCUS_TIME_SECONDS} seconds </h1>
            <div className="flex items-center justify-center h-full">
              <div className="rounded-full bg-orange-300 w-10 h-10"></div>
            </div>
          </>
        )}
        {stage === "focus" && <div>Focus on the task for 90 minutes</div>}
      </div>
      <div>{!stage && <button onClick={handleFocusClick}>Focus</button>}</div>
    </div>
  );
}

export default Focus;
